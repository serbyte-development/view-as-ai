import type { ReactNode } from "react";

import { Document } from "../components/Document";
import type { FixtureRoute, StaticAsset } from "../fixture-types";
import { sentinel } from "../sentinel";

interface HeadCase {
  body?: ReactNode;
  head?: ReactNode;
  id: string;
  sentinel?: string;
}

const s = (id: string) => sentinel(id);

const headCases: HeadCase[] = [
  {
    id: "HEAD-001",
    head: <title>{s("HEAD-001")}</title>,
    sentinel: s("HEAD-001"),
  },
  {
    id: "HEAD-002",
  },
  {
    id: "HEAD-003",
    head: <meta name="description" content={s("HEAD-003")} />,
    sentinel: s("HEAD-003"),
  },
  {
    id: "HEAD-004",
    head: <meta name="keywords" content={s("HEAD-004")} />,
    sentinel: s("HEAD-004"),
  },
  {
    id: "HEAD-005",
    head: <meta name="author" content={s("HEAD-005")} />,
    sentinel: s("HEAD-005"),
  },
  {
    id: "HEAD-006",
    head: (
      <link
        rel="canonical"
        href={`https://view-as-ai.vercel.app/canonical/${encodeURIComponent(s("HEAD-006"))}/`}
      />
    ),
    sentinel: s("HEAD-006"),
  },
  {
    id: "HEAD-007",
    head: <meta name="robots" content="index,follow" />,
  },
  {
    id: "HEAD-008",
    head: <meta name="robots" content="noindex" />,
  },
  {
    id: "HEAD-009",
    head: <meta name="robots" content="nofollow" />,
  },
  {
    id: "HEAD-010",
    head: (
      <>
        <meta property="og:title" content={s("HEAD-010")} />
        <meta property="og:description" content="Open Graph calibration description" />
      </>
    ),
    sentinel: s("HEAD-010"),
  },
  {
    id: "HEAD-011",
    head: (
      <>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={s("HEAD-011")} />
      </>
    ),
    sentinel: s("HEAD-011"),
  },
  {
    id: "HEAD-012",
    head: (
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Thing",
          name: s("HEAD-012"),
        })}
      </script>
    ),
    sentinel: s("HEAD-012"),
  },
  {
    id: "HEAD-013",
    body: (
      <div itemScope itemType="https://schema.org/Organization">
        <span itemProp="name">{s("HEAD-013")}</span>
      </div>
    ),
    sentinel: s("HEAD-013"),
  },
  {
    id: "HEAD-014",
    body: (
      <div vocab="https://schema.org/" typeof="Organization">
        <span property="name">{s("HEAD-014")}</span>
      </div>
    ),
    sentinel: s("HEAD-014"),
  },
  {
    id: "HEAD-015",
    head: <link rel="alternate" hrefLang="fr" href={`/fr/${encodeURIComponent(s("HEAD-015"))}/`} />,
    sentinel: s("HEAD-015"),
  },
  {
    id: "HEAD-016",
    head: <link rel="icon" href={`/icon.svg?marker=${encodeURIComponent(s("HEAD-016"))}`} />,
    sentinel: s("HEAD-016"),
  },
  {
    id: "HEAD-017",
    head: (
      <meta
        httpEquiv="refresh"
        content={`0;url=/head-refresh-target/?marker=${encodeURIComponent(s("HEAD-017"))}`}
      />
    ),
    sentinel: s("HEAD-017"),
  },
];

function HeadFixturePage({ fixture }: { fixture: HeadCase }) {
  return <Document head={fixture.head} body={fixture.body ?? <p>Neutral body content.</p>} />;
}

export const headMetadataRoutes: FixtureRoute[] = [
  ...headCases.map<FixtureRoute>((fixture) => ({
    kind: "tsx",
    path: `/experiments/head/${fixture.id}/`,
    render: () => <HeadFixturePage fixture={fixture} />,
    metadata: {
      phase: 5,
      source: "src/fixtures/head-metadata.tsx",
      testIds: [fixture.id],
      sentinels: fixture.sentinel ? { [fixture.id]: fixture.sentinel } : undefined,
    },
  })),
  {
    kind: "tsx",
    path: "/head-refresh-target/",
    render: () => (
      <Document head={<title>Meta refresh target</title>} body={<p>Meta refresh destination.</p>} />
    ),
    metadata: {
      phase: 5,
      source: "src/fixtures/head-metadata.tsx",
      testIds: [],
      notes: "Supporting destination for HEAD-017.",
    },
  },
  {
    kind: "tsx",
    path: `/canonical/${s("HEAD-006")}/`,
    render: () => (
      <Document
        head={<title>Canonical metadata target</title>}
        body={<p>Stable canonical metadata target.</p>}
      />
    ),
    metadata: {
      phase: 5,
      source: "src/fixtures/head-metadata.tsx",
      testIds: [],
      notes: "Supporting canonical destination for HEAD-006.",
    },
  },
  {
    kind: "tsx",
    path: `/fr/${s("HEAD-015")}/`,
    render: () => (
      <Document
        lang="fr"
        head={<title>Cible de langue alternative</title>}
        body={<p>Destination stable de langue alternative.</p>}
      />
    ),
    metadata: {
      phase: 5,
      source: "src/fixtures/head-metadata.tsx",
      testIds: [],
      notes: "Supporting alternate-language destination for HEAD-015.",
    },
  },
];

export const headMetadataAssets: StaticAsset[] = [
  {
    path: "/icon.svg",
    source: "src/assets/baseline.svg",
  },
];
