import type { FixtureRoute } from "../fixture-types";
import { sentinel } from "../sentinel";

const s = (id: string, label = "PRIMARY") => sentinel(id, label);

function htmlDocument(_title: string, body: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>${body}</body></html>\n`;
}

function filler(length: number): string {
  const unit = "calibration-text-0123456789 ";
  return unit.repeat(Math.ceil(length / unit.length)).slice(0, length);
}

function positionedText(
  id: string,
  targetSize: number,
): { html: string; groups: Record<string, string[]> } {
  const beginning = s(id, "BEGINNING");
  const middle = s(id, "MIDDLE");
  const end = s(id, "END");
  const half = Math.max(1, Math.floor(targetSize / 2));
  const body = `<p>${beginning}</p><p>${filler(half)}</p><p>${middle}</p><p>${filler(
    targetSize - half,
  )}</p><p>${end}</p>`;
  return {
    html: htmlDocument(id, body),
    groups: { positions: [beginning, middle, end] },
  };
}

function rawRoute(
  id: string,
  html: string,
  primarySentinel: string,
  sentinelGroups?: Record<string, string[]>,
): FixtureRoute {
  return {
    kind: "raw",
    path: `/experiments/size/${id}/`,
    render: () => html,
    metadata: {
      phase: 7,
      source: "src/fixtures/size.ts",
      testIds: [id],
      sentinels: { [id]: primarySentinel },
      sentinelGroups,
    },
  };
}

const size1 = positionedText("SIZE-001", 8 * 1024);
const size2 = positionedText("SIZE-002", 25 * 1024);
const size3 = positionedText("SIZE-003", 100 * 1024);
const size4 = positionedText("SIZE-004", 500 * 1024);

const largeNav = Array.from(
  { length: 800 },
  (_, index) => `<a href="/large-nav/${index}/">Navigation item ${index}</a>`,
).join("");

const largeMain = Array.from(
  { length: 800 },
  (_, index) => `<p>Main content paragraph ${index}: ${filler(60)}</p>`,
).join("");

const largeCode = Array.from(
  { length: 2500 },
  (_, index) => `line_${String(index).padStart(4, "0")} = "${filler(40)}";`,
).join("\n");

const largeTableRows = Array.from(
  { length: 1000 },
  (_, index) => `<tr><td>row-${index}</td><td>${filler(40)}</td></tr>`,
).join("");

const hundredsOfLinks = Array.from(
  { length: 500 },
  (_, index) => `<a href="/many-links/${index}/">Link ${index}</a>`,
).join("");

const hundredsOfImages = Array.from(
  { length: 500 },
  (_, index) => `<img src="/assets/pixel.png?size-image=${index}" alt="Size image ${index}">`,
).join("");

const repeatedBoilerplate = Array.from(
  { length: 500 },
  () =>
    '<div class="repeated-boilerplate">Repeated boilerplate navigation and utility content</div>',
).join("");

export const sizeRoutes: FixtureRoute[] = [
  rawRoute("SIZE-001", size1.html, s("SIZE-001", "BEGINNING"), size1.groups),
  rawRoute("SIZE-002", size2.html, s("SIZE-002", "BEGINNING"), size2.groups),
  rawRoute("SIZE-003", size3.html, s("SIZE-003", "BEGINNING"), size3.groups),
  rawRoute("SIZE-004", size4.html, s("SIZE-004", "BEGINNING"), size4.groups),
  rawRoute(
    "SIZE-005",
    htmlDocument(
      "SIZE-005",
      `<nav>${largeNav}</nav><main><p>${s("SIZE-005")} small main content</p></main>`,
    ),
    s("SIZE-005"),
  ),
  rawRoute(
    "SIZE-006",
    htmlDocument(
      "SIZE-006",
      `<nav><a href="/">Small navigation</a></nav><main>${largeMain}<p>${s(
        "SIZE-006",
      )} end of large main</p></main>`,
    ),
    s("SIZE-006"),
  ),
  rawRoute(
    "SIZE-007",
    htmlDocument("SIZE-007", `<pre><code>${s("SIZE-007")}\n${largeCode}</code></pre>`),
    s("SIZE-007"),
  ),
  rawRoute(
    "SIZE-008",
    htmlDocument(
      "SIZE-008",
      `<table><thead><tr><th>${s(
        "SIZE-008",
      )} Key</th><th>Value</th></tr></thead><tbody>${largeTableRows}</tbody></table>`,
    ),
    s("SIZE-008"),
  ),
  rawRoute(
    "SIZE-009",
    htmlDocument("SIZE-009", `<p>${s("SIZE-009")}</p><nav>${hundredsOfLinks}</nav>`),
    s("SIZE-009"),
  ),
  rawRoute(
    "SIZE-010",
    htmlDocument(
      "SIZE-010",
      `<p>${s("SIZE-010")}</p><div class="many-images">${hundredsOfImages}</div>`,
    ),
    s("SIZE-010"),
  ),
  rawRoute(
    "SIZE-011",
    htmlDocument(
      "SIZE-011",
      `<header>${repeatedBoilerplate}</header><main><article><h1>${s(
        "SIZE-011",
      )}</h1><p>Small unique article content.</p></article></main>`,
    ),
    s("SIZE-011"),
  ),
];
