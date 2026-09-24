import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const calibrationPlan = readFileSync(resolve(packageRoot, "CALIBRATION_PLAN.md"), "utf8");
const buildPlan = readFileSync(resolve(packageRoot, "BUILD_PLAN.md"), "utf8");

const numberedPlanIds = [...calibrationPlan.matchAll(/\*\*([A-Z][A-Z0-9-]*-\d{3}):\*\*/g)].map(
  (match) => match[1],
);
const sitePlanIds = [...calibrationPlan.matchAll(/^## (SITE-[A-Z-]+) —/gm)].map(
  (match) => match[1],
);
const planIds = [...numberedPlanIds, ...sitePlanIds];

function expandCoverage(value: string): string[] {
  return value.split(",").flatMap((rawEntry) => {
    const entry = rawEntry.trim();
    const range = entry.match(/^([A-Z][A-Z0-9-]*-)(\d{3})\.\.\1(\d{3})$/);
    if (!range) return [entry];

    const [, prefix, rawStart, rawEnd] = range;
    const start = Number(rawStart);
    const end = Number(rawEnd);
    if (end < start) throw new Error(`invalid descending coverage range: ${entry}`);

    return Array.from(
      { length: end - start + 1 },
      (_, offset) => `${prefix}${String(start + offset).padStart(3, "0")}`,
    );
  });
}

const buildIds = [...buildPlan.matchAll(/^Coverage: `([^\n]+)`$/gm)].flatMap((match) =>
  expandCoverage(match[1]),
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
const buildSet = new Set(buildIds);
const missing = [...planSet].filter((id) => !buildSet.has(id)).sort();
const extra = [...buildSet].filter((id) => !planSet.has(id)).sort();
const duplicateBuildIds = duplicates(buildIds);

const problems: string[] = [];
if (missing.length) problems.push(`missing build coverage: ${missing.join(", ")}`);
if (extra.length) problems.push(`unknown build coverage: ${extra.join(", ")}`);
if (duplicateBuildIds.length)
  problems.push(`duplicate build coverage: ${duplicateBuildIds.join(", ")}`);

if (problems.length) {
  console.error("Calibration build-plan coverage check failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log(`Calibration build-plan coverage OK: ${planIds.length} test IDs assigned.`);
}
