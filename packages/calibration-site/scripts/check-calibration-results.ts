import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const plan = readFileSync(resolve(packageRoot, "CALIBRATION_PLAN.md"), "utf8");
const results = readFileSync(resolve(packageRoot, "CALIBRATION_RESULTS.md"), "utf8");

const numberedPlanIds = [...plan.matchAll(/\*\*([A-Z][A-Z0-9-]*-\d{3}):\*\*/g)].map(
  (match) => match[1],
);
const sitePlanIds = [...plan.matchAll(/^## (SITE-[A-Z-]+) —/gm)].map((match) => match[1]);
const planIds = [...numberedPlanIds, ...sitePlanIds];

const allowedStatuses = new Set([
  "planned",
  "deployed",
  "captured",
  "verified",
  "mismatch",
  "inconclusive",
  "follow-up",
  "blocked",
  "deferred",
]);

const resultRows = [...results.matchAll(/^\| ([A-Z][A-Z0-9-]*) \| ([a-z-]+) \|/gm)].map(
  (match) => ({ id: match[1], status: match[2] }),
);

function duplicates(values: string[]): string[] {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value]) => value)
    .sort();
}

const planSet = new Set(planIds);
const resultIds = resultRows.map((row) => row.id);
const resultSet = new Set(resultIds);

const problems: string[] = [];
const duplicatePlanIds = duplicates(planIds);
const duplicateResultIds = duplicates(resultIds);
const missing = [...planSet].filter((id) => !resultSet.has(id)).sort();
const extra = [...resultSet].filter((id) => !planSet.has(id)).sort();
const badStatuses = resultRows
  .filter((row) => !allowedStatuses.has(row.status))
  .map((row) => `${row.id}=${row.status}`);

if (duplicatePlanIds.length) problems.push(`duplicate plan IDs: ${duplicatePlanIds.join(", ")}`);
if (duplicateResultIds.length)
  problems.push(`duplicate result IDs: ${duplicateResultIds.join(", ")}`);
if (missing.length) problems.push(`missing result rows: ${missing.join(", ")}`);
if (extra.length) problems.push(`unknown result rows: ${extra.join(", ")}`);
if (badStatuses.length) problems.push(`unsupported statuses: ${badStatuses.join(", ")}`);

if (problems.length) {
  console.error("Calibration result coverage check failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log(`Calibration result coverage OK: ${planIds.length} test IDs tracked.`);
}
