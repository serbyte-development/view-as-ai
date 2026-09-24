import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";

import type { FixtureManifest, FixtureManifestEntry, FixtureRoute } from "./fixture-types";
import { assets, calibrationScenario, routes } from "./registry";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = join(packageRoot, "dist");
const privateRoot = join(packageRoot, ".calibration");
const manifestPath = join(privateRoot, "manifest.json");

function normalizePublicPath(path: string): string {
  if (!path.startsWith("/")) throw new Error(`public path must start with /: ${path}`);
  return path.replace(/\/+/g, "/");
}

function routeOutputPath(path: string): string {
  const normalized = normalizePublicPath(path);
  if (normalized === "/") return join(outputRoot, "index.html");
  if (!normalized.endsWith("/")) {
    throw new Error(`fixture route must use a trailing slash: ${normalized}`);
  }
  return join(outputRoot, normalized.slice(1), "index.html");
}

function assetOutputPath(path: string): string {
  const normalized = normalizePublicPath(path);
  if (normalized.endsWith("/")) throw new Error(`asset path must name a file: ${normalized}`);
  return join(outputRoot, normalized.slice(1));
}

function renderRoute(route: FixtureRoute): string {
  if (route.kind === "raw") return route.render();
  const rendered = renderToStaticMarkup(route.render());
  // React 19 injects image preload hints during server rendering. Calibration
  // origin HTML must contain only resource hints we author deliberately.
  const controlled = rendered.replace(/<link rel="preload" as="image"[^>]*\/>/g, "");
  return `<!doctype html>${controlled}\n`;
}

function validateRouteRegistry(): void {
  const seenPaths = new Set<string>();
  const seenPrimaryIds = new Map<string, FixtureRoute>();
  const seenSentinels = new Map<string, FixtureRoute>();

  for (const route of routes) {
    const path = normalizePublicPath(route.path);
    if (seenPaths.has(path)) throw new Error(`duplicate fixture route: ${path}`);
    seenPaths.add(path);

    for (const testId of route.metadata.testIds) {
      const first = seenPrimaryIds.get(testId);
      if (
        first &&
        !(first.metadata.allowDuplicateTestIds && route.metadata.allowDuplicateTestIds)
      ) {
        throw new Error(`duplicate primary test ID ${testId}: ${first.path}, ${route.path}`);
      }
      if (!first) seenPrimaryIds.set(testId, route);
    }

    for (const value of Object.values(route.metadata.sentinels ?? {})) {
      const first = seenSentinels.get(value);
      if (
        first &&
        !(first.metadata.allowRepeatedSentinels && route.metadata.allowRepeatedSentinels)
      ) {
        throw new Error(`sentinel reused across routes: ${value}`);
      }
      if (!first) seenSentinels.set(value, route);
    }
  }

  const assetPaths = new Set<string>();
  for (const asset of assets) {
    const path = normalizePublicPath(asset.path);
    if (assetPaths.has(path) || seenPaths.has(path)) {
      throw new Error(`duplicate public asset/route path: ${path}`);
    }
    assetPaths.add(path);
  }
}

async function buildRoute(route: FixtureRoute): Promise<FixtureManifestEntry> {
  const html = renderRoute(route);
  const target = routeOutputPath(route.path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");

  for (const [testId, expectedSentinel] of Object.entries(route.metadata.sentinels ?? {})) {
    if (!route.metadata.testIds.includes(testId)) {
      throw new Error(`sentinel metadata references unassigned ID ${testId} on ${route.path}`);
    }
    if (!html.includes(expectedSentinel)) {
      throw new Error(`expected sentinel ${expectedSentinel} missing from ${route.path}`);
    }
  }

  return {
    allowDuplicateTestIds: route.metadata.allowDuplicateTestIds ?? false,
    allowRepeatedSentinels: route.metadata.allowRepeatedSentinels ?? false,
    kind: route.kind,
    notes: route.metadata.notes,
    path: route.path,
    phase: route.metadata.phase,
    source: route.metadata.source,
    testIds: route.metadata.testIds,
    sentinels: route.metadata.sentinels ?? {},
    sentinelGroups: route.metadata.sentinelGroups ?? {},
  };
}

async function buildAsset(asset: (typeof assets)[number]): Promise<void> {
  const target = assetOutputPath(asset.path);
  await mkdir(dirname(target), { recursive: true });
  if (asset.content !== undefined) {
    await writeFile(target, asset.content);
    return;
  }
  if (!asset.source) throw new Error(`asset must provide source or content: ${asset.path}`);
  await copyFile(join(packageRoot, asset.source), target);
}

validateRouteRegistry();
await rm(outputRoot, { recursive: true, force: true });
await rm(privateRoot, { recursive: true, force: true });
await Promise.all([
  mkdir(outputRoot, { recursive: true }),
  mkdir(privateRoot, { recursive: true }),
]);

const manifestEntries: FixtureManifestEntry[] = [];
for (const route of routes) manifestEntries.push(await buildRoute(route));
for (const asset of assets) await buildAsset(asset);

const manifest: FixtureManifest = {
  generatedAt: new Date().toISOString(),
  scenario: calibrationScenario,
  routes: manifestEntries,
};
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(
  `Built ${routes.length} routes and ${assets.length} assets at ${relative(process.cwd(), outputRoot)}`,
);
console.log(`Private fixture manifest: ${relative(process.cwd(), manifestPath)}`);
