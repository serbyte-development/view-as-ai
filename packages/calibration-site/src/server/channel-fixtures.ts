import type { FixtureEndpoint } from "../fixture-types";
import { sentinel } from "../sentinel.js";

const ID = "CHAN-002";
const marker = (label: string) => sentinel(ID, label);

export function handleChannelFixture(): Response {
  const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body><p>${sentinel(
    ID,
    "BODY_CONTROL",
  )}</p></body></html>\n`;

  return new Response(body, {
    status: 200,
    statusText: marker("STATUS_TEXT"),
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-VAI-Marker": marker("HEADER_CUSTOM"),
      "Content-Disposition": `inline; filename="${marker("HEADER_FILENAME")}.html"`,
      "Content-Location": `/channel/${marker("HEADER_CONTENT_LOCATION")}`,
      Link: `<https://view-as-ai.vercel.app/channel/${marker("HEADER_LINK")}>; rel="canonical"`,
      ETag: `"${marker("HEADER_ETAG")}"`,
      "Server-Timing": `vai;desc="${marker("HEADER_SERVER_TIMING")}"`,
      "X-Robots-Tag": `noindex, ${marker("HEADER_ROBOTS")}`,
    },
  });
}

export const channelEndpointFixtures: FixtureEndpoint[] = [
  {
    path: "/api/channels",
    metadata: {
      phase: 10,
      source: "src/server/channel-fixtures.ts",
      testIds: [ID],
      sentinels: { [ID]: sentinel(ID, "BODY_CONTROL") },
      sentinelGroups: {
        response_metadata: [
          marker("STATUS_TEXT"),
          marker("HEADER_CUSTOM"),
          marker("HEADER_FILENAME"),
          marker("HEADER_CONTENT_LOCATION"),
          marker("HEADER_LINK"),
          marker("HEADER_ETAG"),
          marker("HEADER_SERVER_TIMING"),
          marker("HEADER_ROBOTS"),
        ],
      },
      notes:
        "Header-only sentinels test whether native model-facing output exposes HTTP response metadata that never enters the HTML DOM.",
    },
  },
];
