import {
  crawlAssetsForScenario,
  crawlEndpointFixtures,
  handleCrawlFixture,
} from "../src/server/crawl-fixtures";
import {
  handleHttpChainFinal,
  handleHttpChainStepTwo,
  handleHttpFixture,
  handleHttpRedirectTarget,
  httpEndpointFixtures,
} from "../src/server/http-fixtures";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const expectedHttpStatuses: Record<string, number> = {
  "HTTP-001": 200,
  "HTTP-002": 301,
  "HTTP-003": 302,
  "HTTP-004": 307,
  "HTTP-005": 308,
  "HTTP-006": 302,
  "HTTP-007": 302,
  "HTTP-008": 204,
  "HTTP-009": 404,
  "HTTP-010": 410,
  "HTTP-011": 500,
  "HTTP-012": 200,
  "HTTP-013": 200,
  "HTTP-014": 200,
  "HTTP-015": 200,
  "HTTP-016": 200,
  "HTTP-017": 200,
  "HTTP-018": 200,
  "HTTP-019": 200,
  "HTTP-020": 200,
};

for (const [id, status] of Object.entries(expectedHttpStatuses)) {
  const started = performance.now();
  const response = await handleHttpFixture(
    new Request(`https://view-as-ai.vercel.app/api/http?case=${id}`),
  );
  assert(response.status === status, `${id}: expected status ${status}, got ${response.status}`);

  if (id === "HTTP-014") {
    assert(response.headers.get("content-type") === null, "HTTP-014 must omit Content-Type");
  }
  if (id === "HTTP-012") {
    assert(
      response.headers.get("content-type")?.startsWith("text/plain"),
      "HTTP-012 must be text/plain",
    );
  }
  if (id === "HTTP-013") {
    assert(
      response.headers.get("content-type")?.startsWith("application/xhtml+xml"),
      "HTTP-013 must be application/xhtml+xml",
    );
  }
  if (id === "HTTP-018") {
    assert(response.headers.get("content-encoding") === "gzip", "HTTP-018 must declare gzip");
  }
  if (id === "HTTP-019") {
    assert((await response.text()).length > 1_000_000, "HTTP-019 body must exceed 1 MB");
  }
  if (id === "HTTP-020") {
    assert(performance.now() - started >= 1_400, "HTTP-020 must delay its response");
  }
}

const redirectTarget = handleHttpRedirectTarget(
  new Request("https://view-as-ai.vercel.app/api/http-redirect-target?case=HTTP-002"),
);
assert((await redirectTarget.text()).includes("VAI_SENTINEL_HTTP_002"), "redirect target marker");
assert(handleHttpChainStepTwo().status === 307, "HTTP-006 step two must be 307");
assert(
  (await handleHttpChainFinal().text()).includes("VAI_SENTINEL_HTTP_006"),
  "HTTP-006 final marker",
);

for (let index = 1; index <= 11; index += 1) {
  const id = `CRAWL-${String(index).padStart(3, "0")}`;
  const path =
    id === "CRAWL-005"
      ? "/api/crawl-005"
      : id === "CRAWL-006"
        ? "/api/crawl-006"
        : `/api/crawl?case=${id}`;
  const response = handleCrawlFixture(new Request(`https://view-as-ai.vercel.app${path}`));
  assert(response.status === 200, `${id}: expected 200`);
  const body = await response.text();
  assert(body.includes(`VAI_SENTINEL_${id.replace("-", "_")}`), `${id}: missing marker`);
  if (id === "CRAWL-004") {
    assert(response.headers.get("x-robots-tag") === "noindex", "CRAWL-004 header");
  }
  if (id === "CRAWL-002") assert(body.includes('content="noindex"'), "CRAWL-002 meta");
  if (id === "CRAWL-003") assert(body.includes('content="nofollow"'), "CRAWL-003 meta");
}

const crawlEleven = handleCrawlFixture(
  new Request("https://view-as-ai.vercel.app/api/crawl?case=CRAWL-011"),
);
const crawlElevenDuplicate = handleCrawlFixture(
  new Request("https://view-as-ai.vercel.app/api/crawl-011-duplicate"),
);
assert(
  (await crawlEleven.text()) === (await crawlElevenDuplicate.text()),
  "CRAWL-011 canonical pair must have byte-identical bodies",
);

const crawlAssets = crawlAssetsForScenario("default");
const robots = crawlAssets.find((asset) => asset.path === "/robots.txt")?.content;
const sitemap = crawlAssets.find((asset) => asset.path === "/sitemap.xml")?.content;
assert(typeof robots === "string" && robots.includes("Allow: /api/crawl-005"), "robots allow");
assert(
  typeof robots === "string" && robots.includes("Disallow: /api/crawl-006"),
  "robots disallow",
);
assert(
  typeof sitemap === "string" && sitemap.includes("api/crawl?case=CRAWL-007"),
  "sitemap must include CRAWL-007",
);
assert(
  typeof sitemap === "string" && !sitemap.includes("CRAWL-008"),
  "sitemap must omit CRAWL-008",
);
assert(crawlAssetsForScenario("site-base").length === 0, "site scenarios must omit crawl assets");

assert(httpEndpointFixtures.length === 20, "expected 20 HTTP endpoint fixtures");
assert(crawlEndpointFixtures.length === 11, "expected 11 CRAWL endpoint fixtures");

console.log("Server fixture validation OK: 20 HTTP and 11 CRAWL cases.");
