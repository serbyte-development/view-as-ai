import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { FixtureManifest } from "../src/fixture-types";
import { requireFullCalibrationCoverage } from "../src/registry";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const plan = readFileSync(resolve(packageRoot, "CALIBRATION_PLAN.md"), "utf8");
const manifest = JSON.parse(
  readFileSync(resolve(packageRoot, ".calibration/manifest.json"), "utf8"),
) as FixtureManifest;

const numberedPlanIds = [...plan.matchAll(/\*\*([A-Z][A-Z0-9-]*-\d{3}):\*\*/g)].map(
  (match) => match[1],
);
const sitePlanIds = [...plan.matchAll(/^## (SITE-[A-Z-]+) —/gm)].map((match) => match[1]);
const planIds = [...numberedPlanIds, ...sitePlanIds];
const planSet = new Set(planIds);

const builtIds = [
  ...manifest.routes.flatMap((route) => route.testIds),
  ...manifest.endpoints.flatMap((endpoint) => endpoint.testIds),
];
const builtSet = new Set(builtIds);
const unknown = [...builtSet].filter((id) => !planSet.has(id)).sort();
const missing = [...planSet].filter((id) => !builtSet.has(id)).sort();

type AssignedFixture = {
  allowDuplicateTestIds?: boolean;
  allowRepeatedSentinels?: boolean;
  path: string;
};

const routesByTestId = new Map<string, AssignedFixture[]>();
for (const route of manifest.routes) {
  for (const id of route.testIds) {
    routesByTestId.set(id, [...(routesByTestId.get(id) ?? []), route]);
  }
}
for (const endpoint of manifest.endpoints) {
  for (const id of endpoint.testIds) {
    routesByTestId.set(id, [...(routesByTestId.get(id) ?? []), endpoint]);
  }
}
const duplicatePrimaryIds = [...routesByTestId.entries()]
  .filter(([, assignedRoutes]) => {
    return (
      assignedRoutes.length > 1 && !assignedRoutes.every((route) => route.allowDuplicateTestIds)
    );
  })
  .map(([id]) => id)
  .sort();

const sentinelToRoutes = new Map<string, AssignedFixture[]>();
for (const route of manifest.routes) {
  for (const value of Object.values(route.sentinels)) {
    sentinelToRoutes.set(value, [...(sentinelToRoutes.get(value) ?? []), route]);
  }
}
for (const endpoint of manifest.endpoints) {
  for (const value of Object.values(endpoint.sentinels)) {
    sentinelToRoutes.set(value, [...(sentinelToRoutes.get(value) ?? []), endpoint]);
  }
}
const duplicateSentinels = [...sentinelToRoutes.entries()]
  .filter(([, assignedRoutes]) => {
    return (
      assignedRoutes.length > 1 && !assignedRoutes.every((route) => route.allowRepeatedSentinels)
    );
  })
  .map(
    ([value, assignedRoutes]) =>
      `${value} => ${assignedRoutes.map((route) => route.path).join(",")}`,
  )
  .sort();

const problems: string[] = [];
if (unknown.length) problems.push(`unknown built test IDs: ${unknown.join(", ")}`);
if (duplicatePrimaryIds.length)
  problems.push(`duplicate primary test IDs: ${duplicatePrimaryIds.join(", ")}`);
if (duplicateSentinels.length)
  problems.push(`duplicate sentinels: ${duplicateSentinels.join("; ")}`);
if (requireFullCalibrationCoverage && missing.length) {
  problems.push(`missing built test IDs: ${missing.join(", ")}`);
}

if (problems.length) {
  console.error("Built-fixture validation failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log(
    `Built-fixture validation OK: ${builtSet.size}/${planSet.size} calibration IDs available; scenario=${manifest.scenario}.`,
  );
}
