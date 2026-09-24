import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { FixtureManifest } from "../src/fixture-types";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const resultsPath = resolve(packageRoot, "CALIBRATION_RESULTS.md");
const manifestPath = resolve(packageRoot, ".calibration/manifest.json");
const baseUrl = "https://view-as-ai.vercel.app";

const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as FixtureManifest;

const urls = new Map<string, string>();
for (const fixture of [...manifest.routes, ...manifest.endpoints]) {
  for (const id of fixture.testIds) {
    if (!urls.has(id)) urls.set(id, `${baseUrl}${fixture.path}`);
  }
}

let changed = 0;
const updated = readFileSync(resultsPath, "utf8")
  .split("\n")
  .map((line) => {
    const match = line.match(
      /^\| ([A-Z][A-Z0-9-]*) \| ([a-z-]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/,
    );
    if (!match) return line;

    const [, id, status, currentUrl, native, viewAsAi, comparison, evidence, lastTested, finding] =
      match;
    const url = urls.get(id);
    if (!url || !["planned", "deployed"].includes(status)) return line;

    const next = `| ${id} | deployed | ${url} | ${native.trim()} | ${viewAsAi.trim()} | ${comparison.trim()} | ${evidence.trim()} | ${lastTested.trim()} | ${finding.trim()} |`;
    if (status !== "deployed" || currentUrl.trim() !== url) changed += 1;
    return next;
  })
  .join("\n");

writeFileSync(resultsPath, updated, "utf8");
console.log(
  `Marked ${urls.size} default-build calibration IDs deployed; ${changed} ledger rows changed.`,
);
