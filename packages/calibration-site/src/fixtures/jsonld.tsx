import type { ReactNode } from "react";

import { Document } from "../components/Document";
import type { FixtureMetadata, FixtureRoute } from "../fixture-types";
import { sentinel } from "../sentinel";

type JsonValue = Record<string, unknown> | unknown[];

interface JsonLdProps {
  id?: string;
  raw?: string;
  value?: JsonValue;
}

function JsonLd({ id, raw, value }: JsonLdProps) {
  const json = raw ?? JSON.stringify(value);
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: raw JSON-LD bytes are the calibration subject.
    <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}

function RawScript({ code }: { code: string }) {
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: executable script source is the calibration subject.
    <script dangerouslySetInnerHTML={{ __html: code }} />
  );
}

function visibleMarker(id: string) {
  return sentinel(id, "VISIBLE");
}

function jsonMarker(id: string) {
  return sentinel(id, "JSONLD");
}

function jsonUrl(id: string, label = "URL", external = false): string {
  const marker = sentinel(id, label);
  const host = external ? "https://example.com" : "https://view-as-ai.vercel.app";
  return `${host}/jsonld/${encodeURIComponent(marker)}/`;
}

function route(
  id: string,
  body: ReactNode,
  options: {
    head?: ReactNode;
    primarySentinel?: string;
    sentinelGroups?: Record<string, string[]>;
    notes?: string;
  } = {},
): FixtureRoute {
  const metadata: FixtureMetadata = {
    phase: 5,
    source: "src/fixtures/jsonld.tsx",
    testIds: [id],
    sentinels: options.primarySentinel ? { [id]: options.primarySentinel } : undefined,
    sentinelGroups: options.sentinelGroups,
    notes: options.notes,
  };
  return {
    kind: "tsx",
    path: `/experiments/jsonld/${id}/`,
    render: () => (
      <Document
        head={
          <>
            <title>{`${id} JSON-LD fixture`}</title>
            {options.head}
          </>
        }
        body={body}
      />
    ),
    metadata,
  };
}

const routes: FixtureRoute[] = [];

// JSONLD-BASIC
routes.push(
  route("JSONLD-001", <p>{sentinel("JSONLD-001")} visible control without JSON-LD</p>, {
    primarySentinel: sentinel("JSONLD-001"),
    sentinelGroups: { visible: [sentinel("JSONLD-001")] },
  }),
);

{
  const id = "JSONLD-002";
  const marker = jsonMarker(id);
  routes.push(
    route(id, <p>Neutral body.</p>, {
      head: <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", marker }} />,
      primarySentinel: marker,
      sentinelGroups: { jsonldOnly: [marker] },
    }),
  );
}

{
  const id = "JSONLD-003";
  const marker = sentinel(id);
  routes.push(
    route(
      id,
      <>
        <script type="application/json">{JSON.stringify({ marker })}</script>
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { nonJsonLdScript: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-004";
  const marker = sentinel(id);
  routes.push(
    route(
      id,
      <>
        <RawScript code={`window.__VAI_JSON_CONTROL__ = ${JSON.stringify(marker)};`} />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { executableScriptOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-005";
  const marker = jsonMarker(id);
  routes.push(
    route(id, <p>Neutral body.</p>, {
      head: <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: marker }} />,
      primarySentinel: marker,
      sentinelGroups: { jsonldOnly: [marker] },
    }),
  );
}

{
  const id = "JSONLD-006";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: marker }} />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-007";
  const first = sentinel(id, "FIRST");
  const second = jsonMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: first }} />
        <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: second }} />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: second,
        sentinelGroups: { jsonldOnly: [first, second] },
      },
    ),
  );
}

{
  const id = "JSONLD-008";
  const marker = jsonMarker(id);
  const value = { "@context": "https://schema.org", "@type": "Thing", name: marker };
  routes.push(
    route(
      id,
      <>
        <JsonLd raw={JSON.stringify(value)} />
        <JsonLd raw={JSON.stringify(value, null, 2)} />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-009";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd raw={`{"@context":"https://schema.org","name":"${marker}",`} />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { malformedJsonLd: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-010";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd value={{ marker }} />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-011";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd value={{ "@context": "https://schema.org", name: marker }} />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-012";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "Thing", name: "Graph node one" },
              { "@type": "Thing", name: marker },
            ],
          }}
        />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-013";
  const marker = jsonMarker(id);
  const nested = sentinel(id, "NESTED");
  routes.push(
    route(
      id,
      <>
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "Thing",
            name: marker,
            nested: { array: [{ value: nested }] },
          }}
        />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker, nested] },
      },
    ),
  );
}

{
  const id = "JSONLD-014";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "Thing",
            name: marker,
            text: "😀 café 中文 &amp; <b>markup-like</b>",
          }}
        />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-015";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "Thing",
            description: `${marker}:${"L".repeat(4096)}`,
          }}
        />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

// JSONLD-TYPES
const schemaTypes = [
  "WebSite",
  "WebPage",
  "Organization",
  "LocalBusiness",
  "Person",
  "Article",
  "NewsArticle",
  "BlogPosting",
  "Product",
  "Offer",
  "AggregateRating",
  "Review",
  "FAQPage",
  "HowTo",
  "BreadcrumbList",
  "ItemList",
  "Event",
  "JobPosting",
  "SoftwareApplication",
  "VideoObject",
  "ImageObject",
];

for (const [index, type] of schemaTypes.entries()) {
  const id = `JSONLD-${String(16 + index).padStart(3, "0")}`;
  const jsonOnly = jsonMarker(id);
  const visible = visibleMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": type,
            name: jsonOnly,
            description: visible,
          }}
        />
        <p>{visible}</p>
      </>,
      {
        primarySentinel: jsonOnly,
        sentinelGroups: { jsonldOnly: [jsonOnly], visible: [visible] },
      },
    ),
  );
}

// JSONLD-CONFLICT
{
  const id = "JSONLD-037";
  const shared = sentinel(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: shared }} />
        <h1>{shared}</h1>
      </>,
      {
        primarySentinel: shared,
        sentinelGroups: { jsonldAndVisible: [shared] },
      },
    ),
  );
}

{
  const id = "JSONLD-038";
  const jsonOnly = jsonMarker(id);
  const visible = visibleMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: jsonOnly }} />
        <h1>{visible}</h1>
      </>,
      {
        primarySentinel: jsonOnly,
        sentinelGroups: { jsonldOnly: [jsonOnly], visible: [visible] },
      },
    ),
  );
}

{
  const id = "JSONLD-039";
  const shared = sentinel(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "Product",
            offers: { "@type": "Offer", price: shared },
          }}
        />
        <p>Price: {shared}</p>
      </>,
      {
        primarySentinel: shared,
        sentinelGroups: { jsonldAndVisible: [shared] },
      },
    ),
  );
}

const conflictSpecs: Array<{
  id: string;
  json: JsonValue;
  jsonSentinel: string;
  visible: ReactNode;
  visibleSentinel?: string;
}> = [
  {
    id: "JSONLD-040",
    jsonSentinel: jsonMarker("JSONLD-040"),
    json: {
      "@context": "https://schema.org",
      "@type": "Product",
      offers: { "@type": "Offer", price: jsonMarker("JSONLD-040") },
    },
    visible: <p>Price: {visibleMarker("JSONLD-040")}</p>,
    visibleSentinel: visibleMarker("JSONLD-040"),
  },
  {
    id: "JSONLD-041",
    jsonSentinel: jsonMarker("JSONLD-041"),
    json: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      address: {
        "@type": "PostalAddress",
        streetAddress: jsonMarker("JSONLD-041"),
      },
    },
    visible: <p>Address: {visibleMarker("JSONLD-041")}</p>,
    visibleSentinel: visibleMarker("JSONLD-041"),
  },
  {
    id: "JSONLD-042",
    jsonSentinel: jsonMarker("JSONLD-042"),
    json: {
      "@context": "https://schema.org",
      "@type": "Organization",
      telephone: jsonMarker("JSONLD-042"),
    },
    visible: <p>Phone: {visibleMarker("JSONLD-042")}</p>,
    visibleSentinel: visibleMarker("JSONLD-042"),
  },
  {
    id: "JSONLD-043",
    jsonSentinel: jsonMarker("JSONLD-043"),
    json: {
      "@context": "https://schema.org",
      "@type": "Product",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: jsonMarker("JSONLD-043"),
      },
    },
    visible: <p>Rating: {visibleMarker("JSONLD-043")}</p>,
    visibleSentinel: visibleMarker("JSONLD-043"),
  },
  {
    id: "JSONLD-044",
    jsonSentinel: jsonMarker("JSONLD-044"),
    json: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Calibration question",
          acceptedAnswer: {
            "@type": "Answer",
            text: jsonMarker("JSONLD-044"),
          },
        },
      ],
    },
    visible: <p>FAQ answer: {visibleMarker("JSONLD-044")}</p>,
    visibleSentinel: visibleMarker("JSONLD-044"),
  },
  {
    id: "JSONLD-045",
    jsonSentinel: jsonMarker("JSONLD-045"),
    json: {
      "@context": "https://schema.org",
      "@type": "Thing",
      description: jsonMarker("JSONLD-045"),
    },
    visible: <p>Neutral body with no structured-data fact.</p>,
  },
  {
    id: "JSONLD-046",
    jsonSentinel: sentinel("JSONLD-046", "JSON_CONTROL"),
    json: {
      "@context": "https://schema.org",
      "@type": "Thing",
      description: sentinel("JSONLD-046", "JSON_CONTROL"),
    },
    visible: <p>{visibleMarker("JSONLD-046")}</p>,
    visibleSentinel: visibleMarker("JSONLD-046"),
  },
];

for (const spec of conflictSpecs) {
  routes.push(
    route(
      spec.id,
      <>
        <JsonLd value={spec.json} />
        {spec.visible}
      </>,
      {
        primarySentinel: spec.jsonSentinel,
        sentinelGroups: {
          jsonldOnly: [spec.jsonSentinel],
          ...(spec.visibleSentinel ? { visible: [spec.visibleSentinel] } : {}),
        },
      },
    ),
  );
}

// JSONLD-URL
const urlSpecs: Array<[string, JsonValue]> = [
  [
    "JSONLD-047",
    { "@context": "https://schema.org", "@type": "Thing", url: jsonUrl("JSONLD-047") },
  ],
  [
    "JSONLD-048",
    {
      "@context": "https://schema.org",
      "@type": "Thing",
      url: jsonUrl("JSONLD-048", "URL", true),
    },
  ],
  [
    "JSONLD-049",
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      sameAs: [
        jsonUrl("JSONLD-049", "SAME_AS_ONE", true),
        jsonUrl("JSONLD-049", "SAME_AS_TWO", true),
      ],
    },
  ],
  [
    "JSONLD-050",
    {
      "@context": "https://schema.org",
      "@type": "Thing",
      image: jsonUrl("JSONLD-050", "IMAGE"),
    },
  ],
  [
    "JSONLD-051",
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      logo: jsonUrl("JSONLD-051", "LOGO"),
    },
  ],
  [
    "JSONLD-052",
    {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: jsonUrl("JSONLD-052", "MAIN_ENTITY"),
    },
  ],
  [
    "JSONLD-053",
    {
      "@context": "https://schema.org",
      "@type": "Product",
      offers: {
        "@type": "Offer",
        url: jsonUrl("JSONLD-053", "OFFER_URL"),
      },
    },
  ],
  [
    "JSONLD-054",
    {
      "@context": "https://schema.org",
      "@type": "Thing",
      url: jsonUrl("JSONLD-054", "JSONLD_ONLY_URL"),
    },
  ],
];

for (const [id, value] of urlSpecs) {
  const markerValues = JSON.stringify(value).match(/VAI_SENTINEL_[A-Z0-9_]+/g) ?? [];
  routes.push(
    route(
      id,
      <>
        <JsonLd value={value} />
        <p>Neutral body with no matching anchor.</p>
      </>,
      {
        primarySentinel: markerValues[0],
        sentinelGroups: { jsonldOnly: markerValues },
      },
    ),
  );
}

// JSONLD-VISIBILITY / post-load mutation.
for (const id of ["JSONLD-055", "JSONLD-056", "JSONLD-057"]) {
  const marker = jsonMarker(id);
  const script = (
    <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: marker }} />
  );
  const body =
    id === "JSONLD-055" ? (
      <div style={{ display: "none" }}>{script}</div>
    ) : id === "JSONLD-056" ? (
      <div hidden>{script}</div>
    ) : (
      <div aria-hidden="true">{script}</div>
    );
  routes.push(
    route(id, body, {
      primarySentinel: marker,
      sentinelGroups: { jsonldOnly: [marker] },
    }),
  );
}

{
  const id = "JSONLD-058";
  const marker = jsonMarker(id);
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Thing",
    name: marker,
  });
  routes.push(
    route(
      id,
      <>
        <RawScript
          code={`const s=document.createElement("script");s.type="application/ld+json";s.textContent=${JSON.stringify(
            json,
          )};document.body.appendChild(s);`}
        />
        <p>Neutral body.</p>
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { executableScriptSource: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-059";
  const marker = jsonMarker(id);
  const replacement = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Thing",
    name: marker,
  });
  routes.push(
    route(
      id,
      <>
        <JsonLd
          id="jsonld-target"
          value={{ "@context": "https://schema.org", "@type": "Thing", name: "INITIAL_VALUE" }}
        />
        <RawScript
          code={`document.getElementById("jsonld-target").textContent=${JSON.stringify(replacement)};`}
        />
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { executableScriptSource: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-060";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd
          id="jsonld-remove-target"
          value={{ "@context": "https://schema.org", "@type": "Thing", name: marker }}
        />
        <RawScript code={'document.getElementById("jsonld-remove-target").remove();'} />
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

// JSONLD-MULTI
{
  const id = "JSONLD-061";
  const org = jsonMarker(id);
  const page = sentinel(id, "WEBPAGE");
  routes.push(
    route(
      id,
      <>
        <JsonLd value={{ "@context": "https://schema.org", "@type": "Organization", name: org }} />
        <JsonLd value={{ "@context": "https://schema.org", "@type": "WebPage", name: page }} />
      </>,
      {
        primarySentinel: org,
        sentinelGroups: { jsonldOnly: [org, page] },
      },
    ),
  );
}

{
  const id = "JSONLD-062";
  const first = jsonMarker(id);
  const second = sentinel(id, "SECOND");
  routes.push(
    route(
      id,
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", name: first },
            { "@type": "WebPage", name: second },
          ],
        }}
      />,
      {
        primarySentinel: first,
        sentinelGroups: { jsonldOnly: [first, second] },
      },
    ),
  );
}

{
  const id = "JSONLD-063";
  const marker = jsonMarker(id);
  const data = { "@context": "https://schema.org", "@type": "Thing", name: marker };
  routes.push(
    route(
      id,
      <>
        <JsonLd value={data} />
        <JsonLd value={data} />
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-064";
  const one = jsonMarker(id);
  const two = sentinel(id, "CONFLICT");
  routes.push(
    route(
      id,
      <>
        <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: one }} />
        <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: two }} />
      </>,
      {
        primarySentinel: one,
        sentinelGroups: { jsonldOnly: [one, two] },
      },
    ),
  );
}

{
  const id = "JSONLD-065";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@graph": [
            { "@id": "#org", "@type": "Organization", name: marker },
            { "@type": "WebPage", publisher: { "@id": "#org" } },
          ],
        }}
      />,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-066";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@graph": [
            { "@id": "#entity", "@type": "Thing", name: marker },
            { "@type": "WebPage", mainEntity: { "@id": "#entity" } },
          ],
        }}
      />,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-067";
  const marker = jsonMarker(id);
  const value = { "@context": "https://schema.org", "@type": "Thing", name: marker };
  routes.push(
    route(
      id,
      <>
        <JsonLd value={value} />
        <JsonLd value={value} />
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-068";
  const base = sentinel(id, "BASE");
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <>
        <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: base }} />
        <JsonLd value={{ "@context": "https://schema.org", "@type": "Thing", name: marker }} />
      </>,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [base, marker] },
      },
    ),
  );
}

// JSONLD-SIZE
function largeThing(
  id: string,
  size: number,
  markerPosition: "start" | "end" = "start",
): JsonValue {
  const marker = jsonMarker(id);
  return markerPosition === "start"
    ? {
        "@context": "https://schema.org",
        "@type": "Thing",
        marker,
        payload: "X".repeat(size),
      }
    : {
        "@context": "https://schema.org",
        "@type": "Thing",
        payload: "X".repeat(size),
        marker,
      };
}

for (const [id, size] of [
  ["JSONLD-069", 256],
  ["JSONLD-070", 10_000],
  ["JSONLD-071", 100_000],
] as const) {
  const marker = jsonMarker(id);
  routes.push(
    route(id, <JsonLd value={largeThing(id, size)} />, {
      primarySentinel: marker,
      sentinelGroups: { jsonldOnly: [marker] },
    }),
  );
}

{
  const id = "JSONLD-072";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: marker,
          itemListElement: Array.from({ length: 500 }, (_, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `Item ${index + 1}`,
          })),
        }}
      />,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

{
  const id = "JSONLD-073";
  const marker = jsonMarker(id);
  routes.push(
    route(
      id,
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Thing", name: marker },
            ...Array.from({ length: 500 }, (_, index) => ({
              "@type": "Thing",
              name: `Graph entity ${index + 1}`,
            })),
          ],
        }}
      />,
      {
        primarySentinel: marker,
        sentinelGroups: { jsonldOnly: [marker] },
      },
    ),
  );
}

for (const [id, position] of [
  ["JSONLD-074", "start"],
  ["JSONLD-075", "end"],
] as const) {
  const marker = jsonMarker(id);
  routes.push(
    route(id, <JsonLd value={largeThing(id, 100_000, position)} />, {
      primarySentinel: marker,
      sentinelGroups: { jsonldOnly: [marker] },
    }),
  );
}

// JSONLD-MICRODATA — equivalent encodings.
function EquivalentStructuredData({ id, type }: { id: string; type: "Organization" | "Product" }) {
  const json = sentinel(id, "JSONLD");
  const microdata = sentinel(id, "MICRODATA");
  const rdfa = sentinel(id, "RDFA");
  return (
    <>
      <JsonLd value={{ "@context": "https://schema.org", "@type": type, name: json }} />
      <div itemScope itemType={`https://schema.org/${type}`}>
        <span itemProp="name">{microdata}</span>
      </div>
      <div vocab="https://schema.org/" typeof={type}>
        <span property="name">{rdfa}</span>
      </div>
    </>
  );
}

for (const [id, type] of [
  ["JSONLD-076", "Organization"],
  ["JSONLD-077", "Product"],
] as const) {
  const json = sentinel(id, "JSONLD");
  routes.push(
    route(id, <EquivalentStructuredData id={id} type={type} />, {
      primarySentinel: json,
      sentinelGroups: {
        jsonldOnly: [json],
        microdata: [sentinel(id, "MICRODATA")],
        rdfa: [sentinel(id, "RDFA")],
      },
    }),
  );
}

{
  const id = "JSONLD-078";
  const json = sentinel(id, "JSONLD");
  const microdata = sentinel(id, "MICRODATA");
  const visible = sentinel(id, "VISIBLE");
  routes.push(
    route(
      id,
      <>
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: json,
                item: "/",
              },
            ],
          }}
        />
        <nav aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
          <span itemProp="name">{microdata}</span>
          <a href="/">{visible}</a>
        </nav>
      </>,
      {
        primarySentinel: json,
        sentinelGroups: {
          jsonldOnly: [json],
          microdata: [microdata],
          visible: [visible],
        },
      },
    ),
  );
}

{
  const id = "JSONLD-079";
  const json = sentinel(id, "JSONLD");
  const microdata = sentinel(id, "MICRODATA");
  const visible = sentinel(id, "VISIBLE");
  routes.push(
    route(
      id,
      <>
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "FAQ question",
                acceptedAnswer: { "@type": "Answer", text: json },
              },
            ],
          }}
        />
        <div itemScope itemType="https://schema.org/FAQPage">
          <span itemProp="text">{microdata}</span>
        </div>
        <p>{visible}</p>
      </>,
      {
        primarySentinel: json,
        sentinelGroups: {
          jsonldOnly: [json],
          microdata: [microdata],
          visible: [visible],
        },
      },
    ),
  );
}

export const jsonLdRoutes = routes;
