import { gzipSync } from "node:zlib";

import type { FixtureEndpoint } from "../fixture-types";
import { sentinel } from "../sentinel.js";

const BASE_URL = "https://view-as-ai.vercel.app";
const s = (id: string) => sentinel(id);

function htmlDocument(_id: string, body: string, head = ""): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">${head}</head><body>${body}</body></html>\n`;
}

function htmlResponse(
  body: string,
  status = 200,
  contentType = "text/html; charset=utf-8",
  extraHeaders: HeadersInit = {},
): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": contentType,
      ...Object.fromEntries(new Headers(extraHeaders)),
    },
  });
}

function redirect(location: string, status: 301 | 302 | 307 | 308): Response {
  return new Response(null, { status, headers: { Location: location } });
}

export async function handleHttpFixture(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get("case");
  if (!id?.match(/^HTTP-\d{3}$/)) {
    return new Response("Unknown HTTP calibration case", { status: 400 });
  }

  const marker = s(id);
  switch (id) {
    case "HTTP-001":
      return htmlResponse(htmlDocument(id, `<p>${marker}</p>`));
    case "HTTP-002":
      return redirect(`${BASE_URL}/api/http-redirect-target?case=HTTP-002`, 301);
    case "HTTP-003":
      return redirect(`${BASE_URL}/api/http-redirect-target?case=HTTP-003`, 302);
    case "HTTP-004":
      return redirect(`${BASE_URL}/api/http-redirect-target?case=HTTP-004`, 307);
    case "HTTP-005":
      return redirect(`${BASE_URL}/api/http-redirect-target?case=HTTP-005`, 308);
    case "HTTP-006":
      return redirect(`${BASE_URL}/api/http-chain-step-2`, 302);
    case "HTTP-007":
      return redirect(`https://example.com/?vai=${encodeURIComponent(marker)}`, 302);
    case "HTTP-008":
      return new Response(null, { status: 204 });
    case "HTTP-009":
      return htmlResponse(htmlDocument(id, `<p>${marker}</p>`), 404);
    case "HTTP-010":
      return htmlResponse(htmlDocument(id, `<p>${marker}</p>`), 410);
    case "HTTP-011":
      return htmlResponse(htmlDocument(id, `<p>${marker}</p>`), 500);
    case "HTTP-012":
      return new Response(htmlDocument(id, `<p>${marker}</p>`), {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    case "HTTP-013":
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><p>${marker}</p></body></html>\n`,
        {
          status: 200,
          headers: { "Content-Type": "application/xhtml+xml; charset=utf-8" },
        },
      );
    case "HTTP-014":
      return new Response(new TextEncoder().encode(htmlDocument(id, `<p>${marker}</p>`)), {
        status: 200,
      });
    case "HTTP-015":
      return htmlResponse(
        htmlDocument(id, `<p>${marker} café 中文</p>`),
        200,
        "text/html; charset=utf-8",
      );
    case "HTTP-016":
      return new Response(
        `<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body><p>${marker} café</p></body></html>\n`,
        {
          status: 200,
          headers: { "Content-Type": "text/html" },
        },
      );
    case "HTTP-017":
      return new Response(
        `<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body><p>${marker} café</p></body></html>\n`,
        {
          status: 200,
          headers: { "Content-Type": "text/html; charset=iso-8859-1" },
        },
      );
    case "HTTP-018": {
      const compressed = gzipSync(Buffer.from(htmlDocument(id, `<p>${marker}</p>`), "utf8"));
      return new Response(compressed, {
        status: 200,
        headers: {
          "Content-Encoding": "gzip",
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    }
    case "HTTP-019":
      return htmlResponse(
        htmlDocument(id, `<p>${marker}</p><p>${"large-response ".repeat(80_000)}</p>`),
      );
    case "HTTP-020":
      await new Promise((resolve) => setTimeout(resolve, 1_500));
      return htmlResponse(htmlDocument(id, `<p>${marker}</p>`));
    default:
      return new Response("Unhandled HTTP calibration case", { status: 500 });
  }
}

export function handleHttpRedirectTarget(request: Request): Response {
  const id = new URL(request.url).searchParams.get("case") ?? "HTTP-002";
  return htmlResponse(htmlDocument(id, `<p>${s(id)} redirect destination</p>`));
}

export function handleHttpChainStepTwo(): Response {
  return redirect(`${BASE_URL}/api/http-chain-final`, 307);
}

export function handleHttpChainFinal(): Response {
  return htmlResponse(
    htmlDocument("HTTP-006", `<p>${s("HTTP-006")} redirect-chain destination</p>`),
  );
}

export const httpEndpointFixtures: FixtureEndpoint[] = Array.from({ length: 20 }, (_, index) => {
  const id = `HTTP-${String(index + 1).padStart(3, "0")}`;
  return {
    path: `/api/http?case=${id}`,
    metadata: {
      phase: 9,
      source: "src/server/http-fixtures.ts",
      testIds: [id],
      sentinels: id === "HTTP-008" ? undefined : { [id]: s(id) },
      notes:
        id === "HTTP-007"
          ? "Primary sentinel is encoded in the cross-origin redirect Location URL."
          : undefined,
    },
  };
});
