import type { FixtureRoute } from "../fixture-types";
import { sentinel } from "../sentinel";

const s = (id: string, label = "PRIMARY") => sentinel(id, label);

function raw(id: string, html: string, primary = s(id)): FixtureRoute {
  return {
    kind: "raw",
    path: `/experiments/malformed/${id}/`,
    render: () => html,
    metadata: {
      phase: 7,
      source: "src/fixtures/malformed.ts",
      testIds: [id],
      sentinels: { [id]: primary },
    },
  };
}

export const malformedRoutes: FixtureRoute[] = [
  raw(
    "MAL-001",
    `<!doctype html><html><head></head><body><p>${s("MAL-001")} unclosed paragraph</body></html>\n`,
  ),
  raw(
    "MAL-002",
    `<!doctype html><html><head></head><body><a href="/malformed-link">${s("MAL-002")} unclosed anchor<p>following paragraph</body></html>\n`,
  ),
  raw(
    "MAL-003",
    `<!doctype html><html><head></head><body><p>${s("MAL-003")} paragraph<div>invalid block inside paragraph<span>tail</p></div></body></html>\n`,
  ),
  raw(
    "MAL-004",
    `<!doctype html><html><head></head><body><div id="duplicate">${s("MAL-004")}</div><div id="duplicate">second duplicate id</div></body></html>\n`,
  ),
  raw(
    "MAL-005",
    `<!doctype html><html><head></head><body><div class="first" class="second">${s("MAL-005")}</div></body></html>\n`,
  ),
  raw(
    "MAL-006",
    `<!doctype html><html><head></head><body><a href="http://[invalid">${s("MAL-006")}</a></body></html>\n`,
  ),
  raw(
    "MAL-007",
    `<?xml version="1.0" encoding="UTF-8"?><html><head></head><body><p>${s("MAL-007")} XML declaration</p></body></html>\n`,
  ),
  raw(
    "MAL-008",
    `<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><p>${s("MAL-008")} XHTML syntax<br /></p></body></html>\n`,
  ),
  raw(
    "MAL-009",
    `<!doctype html><html><head></head><body><vai-unknown><future-element>${s("MAL-009")} custom elements</future-element></vai-unknown></body></html>\n`,
  ),
  raw(
    "MAL-010",
    `<!doctype html>${s("MAL-010")} text before html<html><head></head><body><p>body text</p></body></html>text after html\n`,
  ),
  raw(
    "MAL-011",
    `<!doctype html><html><head></head><body><p>${s("MAL-011")} first body</p></body><body><p>second body</p></body></html>\n`,
  ),
  raw(
    "MAL-012",
    `<!doctype html><html><head><title>${s("MAL-012", "FIRST_TITLE")}</title><title>${s("MAL-012", "SECOND_TITLE")}</title></head><body><p>body</p></body></html>\n`,
    s("MAL-012", "FIRST_TITLE"),
  ),
];
