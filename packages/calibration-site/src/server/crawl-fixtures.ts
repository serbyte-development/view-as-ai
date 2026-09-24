import type { FixtureEndpoint, StaticAsset } from "../fixture-types";
import { sentinel } from "../sentinel.js";

const BASE_URL = "https://view-as-ai.vercel.app";
const s = (id: string) => sentinel(id);

function document(id: string, head = ""): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${id}</title>${head}</head><body><p>${s(
    id,
  )}</p></body></html>\n`;
}

function response(id: string, head = "", headers: HeadersInit = {}): Response {
  return new Response(document(id, head), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      ...Object.fromEntries(new Headers(headers)),
    },
  });
}

function caseFromRequest(request: Request): string {
  const url = new URL(request.url);
  if (url.pathname.endsWith("/crawl-005")) return "CRAWL-005";
  if (url.pathname.endsWith("/crawl-006")) return "CRAWL-006";
  if (url.pathname.endsWith("/crawl-011-duplicate")) return "CRAWL-011";
  return url.searchParams.get("case") ?? "";
}

export function handleCrawlFixture(request: Request): Response {
  const id = caseFromRequest(request);
  switch (id) {
    case "CRAWL-001":
      return response(id);
    case "CRAWL-002":
      return response(id, '<meta name="robots" content="noindex">');
    case "CRAWL-003":
      return response(id, '<meta name="robots" content="nofollow">');
    case "CRAWL-004":
      return response(id, "", { "X-Robots-Tag": "noindex" });
    case "CRAWL-005":
    case "CRAWL-006":
    case "CRAWL-007":
    case "CRAWL-008":
      return response(id);
    case "CRAWL-009":
      return response(id, `<link rel="canonical" href="${BASE_URL}/api/crawl?case=CRAWL-009">`);
    case "CRAWL-010":
      return response(id, `<link rel="canonical" href="${BASE_URL}/api/crawl?case=CRAWL-001">`);
    case "CRAWL-011":
      return response(id, `<link rel="canonical" href="${BASE_URL}/api/crawl?case=CRAWL-011">`);
    default:
      return new Response("Unknown crawl calibration case", { status: 400 });
  }
}

export const crawlEndpointFixtures: FixtureEndpoint[] = Array.from({ length: 11 }, (_, index) => {
  const id = `CRAWL-${String(index + 1).padStart(3, "0")}`;
  const path =
    id === "CRAWL-005"
      ? "/api/crawl-005"
      : id === "CRAWL-006"
        ? "/api/crawl-006"
        : `/api/crawl?case=${id}`;
  return {
    path,
    metadata: {
      phase: 9,
      source: "src/server/crawl-fixtures.ts",
      testIds: [id],
      sentinels: { [id]: s(id) },
    },
  };
});

export function crawlAssetsForScenario(scenario: string): StaticAsset[] {
  if (scenario !== "default") return [];
  return [
    {
      path: "/robots.txt",
      content:
        "User-agent: *\nAllow: /api/crawl-005\nDisallow: /api/crawl-006\nSitemap: https://view-as-ai.vercel.app/sitemap.xml\n",
    },
    {
      path: "/sitemap.xml",
      content:
        '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://view-as-ai.vercel.app/api/crawl?case=CRAWL-007</loc></url></urlset>\n',
    },
  ];
}
