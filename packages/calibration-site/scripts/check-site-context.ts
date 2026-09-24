import { createHash } from "node:crypto";

import {
  siteContextRoutesFor,
  siteContextScenarioNames,
  siteContextTargetHtml,
  siteContextTestIds,
  siteTemplateParityHtml,
} from "../src/fixtures/site-context";

const expectedIds = [
  "SITE-BASE",
  "SITE-CHANGE",
  "SITE-CLASS",
  "SITE-CONVERSATION",
  "SITE-COUNT",
  "SITE-NAV-LINKAGE",
  "SITE-REGION",
  "SITE-SUBDOMAIN",
  "SITE-TEMPLATE",
  "SITE-TEXT",
  "SITE-UNIQUE-CHILD",
];

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

const problems: string[] = [];
const actualIds = siteContextTestIds();
if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) {
  problems.push(
    `site-context test IDs differ: expected ${expectedIds.join(", ")}, got ${actualIds.join(", ")}`,
  );
}

if (siteContextRoutesFor("default").length !== 0) {
  problems.push("default scenario must emit no site-context routes");
}

const countScenarios = [
  "site-count-target-only",
  "site-count-plus-1",
  "site-count-plus-2",
  "site-count-plus-4",
  "site-count-plus-9",
];
const countHashes = countScenarios.map((scenario) => {
  const html = siteContextTargetHtml(scenario);
  if (!html) throw new Error(`missing target for ${scenario}`);
  return hash(html);
});
if (new Set(countHashes).size !== 1) {
  problems.push("SITE-COUNT target HTML must be byte-identical across count scenarios");
}

const changeA = siteContextTargetHtml("site-change-a");
const changeB = siteContextTargetHtml("site-change-b");
if (!changeA || !changeB || changeA !== changeB) {
  problems.push("SITE-CHANGE target HTML must be byte-identical between A and B");
}

const [sharedTemplate, independentTemplate] = siteTemplateParityHtml();
if (sharedTemplate !== independentTemplate) {
  problems.push("SITE-TEMPLATE shared and independently authored pages must emit identical HTML");
}

for (const scenario of siteContextScenarioNames) {
  const ids = siteContextRoutesFor(scenario).flatMap((route) => route.metadata.testIds);
  if (ids.length !== 1) {
    problems.push(
      `${scenario} should have exactly one primary SITE test ID, found ${ids.join(", ")}`,
    );
  }
}

if (problems.length) {
  console.error("Site-context validation failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log(
    `Site-context validation OK: ${siteContextScenarioNames.length} scenarios cover ${actualIds.length} SITE IDs.`,
  );
  console.log(`SITE-COUNT target sha256: ${countHashes[0]}`);
  console.log(`SITE-CHANGE target sha256: ${hash(changeA ?? "")}`);
}
