import { Document } from "../components/Document";
import type { FixtureRoute, StaticAsset } from "../fixture-types";
import { renderFixtureRoute } from "../render";
import { sentinel } from "../sentinel";

const TARGET_PATH = "/site-context/target/";
const SIBLING_PREFIX = "/site-context/sibling-";

const s = (id: string, label = "PRIMARY") => sentinel(id, label);

function rawDocument(title: string, body: string, head = ""): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>${head}</head><body>${body}</body></html>\n`;
}

function rawRoute(
  path: string,
  html: string,
  options: {
    id?: string;
    primarySentinel?: string;
    sentinelGroups?: Record<string, string[]>;
    notes?: string;
  } = {},
): FixtureRoute {
  return {
    kind: "raw",
    path,
    render: () => html,
    metadata: {
      phase: 8,
      source: "src/fixtures/site-context.tsx",
      testIds: options.id ? [options.id] : [],
      sentinels:
        options.id && options.primarySentinel
          ? { [options.id]: options.primarySentinel }
          : undefined,
      sentinelGroups: options.sentinelGroups,
      notes: options.notes,
    },
  };
}

function siblingPath(index: number): string {
  return `${SIBLING_PREFIX}${index}/`;
}

function repeatedSibling(index: number, title: string, block: string, head = ""): FixtureRoute {
  return rawRoute(
    siblingPath(index),
    rawDocument(
      `${title} sibling ${index}`,
      `${block}<main><p>Sibling ${index} body.</p></main>`,
      head,
    ),
  );
}

const scenarioNames = [
  "site-base",
  "site-count-target-only",
  "site-count-plus-1",
  "site-count-plus-2",
  "site-count-plus-4",
  "site-count-plus-9",
  "site-text-same-markup-same-text",
  "site-text-same-markup-different-text",
  "site-text-different-markup-same-text",
  "site-text-same-destination-different-label",
  "site-text-same-label-different-destination",
  "site-region-header",
  "site-region-nav",
  "site-region-div-before-main",
  "site-region-aside",
  "site-region-div-after-main",
  "site-region-footer",
  "site-region-main",
  "site-region-role-navigation",
  "site-region-role-complementary",
  "site-region-role-contentinfo",
  "site-unique-child-text",
  "site-unique-child-link",
  "site-unique-child-heading",
  "site-unique-child-alert",
  "site-nav-linkage-nav",
  "site-nav-linkage-sibling",
  "site-nav-linkage-sitemap",
  "site-nav-linkage-unlinked",
  "site-nav-linkage-noindex",
  "site-nav-linkage-robots",
  "site-template",
  "site-class-neutral-unique",
  "site-class-neutral-repeated",
  "site-class-navbar-unique",
  "site-class-navbar-repeated",
  "site-class-breadcrumb-unique",
  "site-class-breadcrumb-repeated",
  "site-class-utility-nav-unique",
  "site-class-utility-nav-repeated",
  "site-class-related-navigation-unique",
  "site-class-related-navigation-repeated",
  "site-class-contextual-sidebar-unique",
  "site-class-contextual-sidebar-repeated",
  "site-class-banner-unique",
  "site-class-banner-repeated",
  "site-change-a",
  "site-change-b",
  "site-conversation",
  "site-subdomain",
] as const;

export type SiteContextScenario = (typeof scenarioNames)[number];
export const siteContextScenarioNames: readonly SiteContextScenario[] = scenarioNames;

function siteBaseRoutes(): FixtureRoute[] {
  const header = s("SITE-BASE", "HEADER");
  const nav = s("SITE-BASE", "NAV");
  const main = s("SITE-BASE", "MAIN");
  const sidebar = s("SITE-BASE", "SIDEBAR");
  const footer = s("SITE-BASE", "FOOTER");
  return [
    rawRoute(
      TARGET_PATH,
      rawDocument(
        "SITE-BASE target",
        `<header>${header}</header><nav>${nav}</nav><main>${main}</main><aside>${sidebar}</aside><footer>${footer}</footer>`,
      ),
      {
        id: "SITE-BASE",
        primarySentinel: main,
        sentinelGroups: { regions: [header, nav, main, sidebar, footer] },
      },
    ),
  ];
}

const countBlock = `<nav class="site-count-block"><a href="/site-context/count-link/">${s(
  "SITE-COUNT",
  "REPEATED",
)}</a></nav>`;
const countTargetHtml = rawDocument(
  "SITE-COUNT target",
  `${countBlock}<main><p>Stable count target body.</p></main>`,
);

function countRoutes(siblings: number): FixtureRoute[] {
  return [
    rawRoute(TARGET_PATH, countTargetHtml, {
      id: "SITE-COUNT",
      primarySentinel: s("SITE-COUNT", "REPEATED"),
      sentinelGroups: { repeated: [s("SITE-COUNT", "REPEATED")] },
      notes: `Target plus ${siblings} repeating siblings.`,
    }),
    ...Array.from({ length: siblings }, (_, index) =>
      repeatedSibling(index + 1, "SITE-COUNT", countBlock),
    ),
  ];
}

const textMarker = s("SITE-TEXT", "REPEATED");
const textTargetBlock = `<div class="site-text-block"><a href="/site-context/common-destination/">${textMarker}</a></div>`;
const textTarget = rawDocument(
  "SITE-TEXT target",
  `${textTargetBlock}<main><p>Stable text target body.</p></main>`,
);

function textRoutes(kind: string): FixtureRoute[] {
  let siblingBlock: string;
  switch (kind) {
    case "same-markup-same-text":
      siblingBlock = textTargetBlock;
      break;
    case "same-markup-different-text":
      siblingBlock =
        '<div class="site-text-block"><a href="/site-context/common-destination/">DIFFERENT_SIBLING_LABEL</a></div>';
      break;
    case "different-markup-same-text":
      siblingBlock = `<section class="different-structure"><p>${textMarker}</p></section>`;
      break;
    case "same-destination-different-label":
      siblingBlock =
        '<div class="other-link"><a href="/site-context/common-destination/">DIFFERENT_DESTINATION_LABEL</a></div>';
      break;
    case "same-label-different-destination":
      siblingBlock = `<div class="other-link"><a href="/site-context/different-destination/">${textMarker}</a></div>`;
      break;
    default:
      throw new Error(`unknown SITE-TEXT variant: ${kind}`);
  }
  return [
    rawRoute(TARGET_PATH, textTarget, {
      id: "SITE-TEXT",
      primarySentinel: textMarker,
      sentinelGroups: { target: [textMarker] },
    }),
    repeatedSibling(1, "SITE-TEXT", siblingBlock),
  ];
}

const regionMarker = s("SITE-REGION", "REPEATED");

function regionBody(kind: string): string {
  switch (kind) {
    case "header":
      return `<header><div>${regionMarker}</div></header><main><p>body</p></main>`;
    case "nav":
      return `<nav><a href="/site-context/region/">${regionMarker}</a></nav><main><p>body</p></main>`;
    case "div-before-main":
      return `<div class="neutral-before">${regionMarker}</div><main><p>body</p></main>`;
    case "aside":
      return `<main><p>body</p></main><aside>${regionMarker}</aside>`;
    case "div-after-main":
      return `<main><p>body</p></main><div class="neutral-after">${regionMarker}</div>`;
    case "footer":
      return `<main><p>body</p></main><footer>${regionMarker}</footer>`;
    case "main":
      return `<main><div>${regionMarker}</div><p>body</p></main>`;
    case "role-navigation":
      return `<div role="navigation">${regionMarker}</div><main><p>body</p></main>`;
    case "role-complementary":
      return `<main><p>body</p></main><div role="complementary">${regionMarker}</div>`;
    case "role-contentinfo":
      return `<main><p>body</p></main><div role="contentinfo">${regionMarker}</div>`;
    default:
      throw new Error(`unknown SITE-REGION variant: ${kind}`);
  }
}

function regionRoutes(kind: string): FixtureRoute[] {
  const body = regionBody(kind);
  return [
    rawRoute(TARGET_PATH, rawDocument("SITE-REGION target", body), {
      id: "SITE-REGION",
      primarySentinel: regionMarker,
    }),
    rawRoute(siblingPath(1), rawDocument("SITE-REGION sibling", body)),
  ];
}

function uniqueChildRoutes(kind: string): FixtureRoute[] {
  const targetMarker = s("SITE-UNIQUE-CHILD", kind.toUpperCase());
  const siblingMarker = `VAI_SITE_UNIQUE_CHILD_SIBLING_${kind.toUpperCase()}`;
  const common = "Repeated wrapper common text and common link";
  const child = (marker: string) => {
    switch (kind) {
      case "text":
        return `<span>${marker}</span>`;
      case "link":
        return `<a href="/site-context/unique-child/">${marker}</a>`;
      case "heading":
        return `<h3>${marker}</h3>`;
      case "alert":
        return `<div role="alert">${marker}</div>`;
      default:
        throw new Error(`unknown unique-child variant: ${kind}`);
    }
  };
  const wrapper = (marker: string) =>
    `<div class="site-wide-wrapper"><p>${common}</p><a href="/common/">Common</a>${child(
      marker,
    )}</div>`;
  return [
    rawRoute(TARGET_PATH, rawDocument("SITE-UNIQUE-CHILD target", wrapper(targetMarker)), {
      id: "SITE-UNIQUE-CHILD",
      primarySentinel: targetMarker,
      sentinelGroups: { targetUnique: [targetMarker] },
    }),
    rawRoute(siblingPath(1), rawDocument("SITE-UNIQUE-CHILD sibling", wrapper(siblingMarker))),
  ];
}

const linkageMarker = s("SITE-NAV-LINKAGE", "REPEATED");
const linkageBlock = `<div class="linkage-repeat">${linkageMarker}</div>`;

function linkageRoutes(kind: string): { routes: FixtureRoute[]; assets: StaticAsset[] } {
  const siblingHead = kind === "noindex" ? '<meta name="robots" content="noindex">' : "";
  const targetExtra =
    kind === "nav" ? '<nav><a href="/site-context/sibling-1/">Discover sibling</a></nav>' : "";
  const routes = [
    rawRoute(
      TARGET_PATH,
      rawDocument(
        "SITE-NAV-LINKAGE target",
        `${targetExtra}${linkageBlock}<main><p>target body</p></main>`,
      ),
      {
        id: "SITE-NAV-LINKAGE",
        primarySentinel: linkageMarker,
      },
    ),
    rawRoute(
      siblingPath(1),
      rawDocument(
        "SITE-NAV-LINKAGE sibling",
        `${linkageBlock}<main><p>sibling body</p></main>`,
        siblingHead,
      ),
    ),
  ];
  if (kind === "sibling") {
    routes.push(
      rawRoute(
        siblingPath(2),
        rawDocument(
          "SITE-NAV-LINKAGE linker",
          '<main><a href="/site-context/sibling-1/">Sibling-only discovery link</a></main>',
        ),
      ),
    );
  }
  const assets: StaticAsset[] = [];
  if (kind === "sitemap") {
    assets.push({
      path: "/sitemap.xml",
      content:
        '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://view-as-ai.vercel.app/site-context/sibling-1/</loc></url></urlset>\n',
    });
  }
  if (kind === "robots") {
    assets.push({
      path: "/robots.txt",
      content: "User-agent: *\nDisallow: /site-context/sibling-1/\n",
    });
  }
  return { routes, assets };
}

const templateMarker = s("SITE-TEMPLATE", "IDENTICAL");

function SharedTemplatePage() {
  return (
    <Document
      head={<title>Template parity fixture</title>}
      body={
        <>
          <header>
            <p>{templateMarker}</p>
          </header>
          <main>
            <p>Template body</p>
          </main>
        </>
      }
    />
  );
}

function IndependentlyAuthoredTemplatePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Template parity fixture</title>
      </head>
      <body>
        <header>
          <p>{templateMarker}</p>
        </header>
        <main>
          <p>Template body</p>
        </main>
      </body>
    </html>
  );
}

function templateRoutes(): FixtureRoute[] {
  return [
    {
      kind: "tsx",
      path: "/site-context/template/shared-a/",
      render: () => <SharedTemplatePage />,
      metadata: {
        phase: 8,
        source: "src/fixtures/site-context.tsx",
        testIds: ["SITE-TEMPLATE"],
        sentinels: { "SITE-TEMPLATE": templateMarker },
      },
    },
    {
      kind: "tsx",
      path: "/site-context/template/shared-b/",
      render: () => <SharedTemplatePage />,
      metadata: {
        phase: 8,
        source: "src/fixtures/site-context.tsx",
        testIds: [],
      },
    },
    {
      kind: "tsx",
      path: "/site-context/template/independent-a/",
      render: () => <IndependentlyAuthoredTemplatePage />,
      metadata: {
        phase: 8,
        source: "src/fixtures/site-context.tsx",
        testIds: [],
      },
    },
    {
      kind: "tsx",
      path: "/site-context/template/independent-b/",
      render: () => <IndependentlyAuthoredTemplatePage />,
      metadata: {
        phase: 8,
        source: "src/fixtures/site-context.tsx",
        testIds: [],
      },
    },
  ];
}

function classBlock(token: string, marker: string): string {
  if (token === "neutral") return `<div class="neutral-block">${marker}</div>`;
  if (token === "navbar") return `<nav class="navbar">${marker}</nav>`;
  if (token === "breadcrumb") return `<nav class="breadcrumb">${marker}</nav>`;
  if (token === "utility-nav") return `<nav class="utility-nav">${marker}</nav>`;
  if (token === "related-navigation") return `<div class="related-navigation">${marker}</div>`;
  if (token === "contextual-sidebar") return `<aside class="contextual-sidebar">${marker}</aside>`;
  if (token === "banner") return `<section class="promo-banner">${marker}</section>`;
  throw new Error(`unknown SITE-CLASS token: ${token}`);
}

function classRoutes(token: string, repeated: boolean): FixtureRoute[] {
  const marker = s("SITE-CLASS", token.toUpperCase().replaceAll("-", "_"));
  const block = classBlock(token, marker);
  return [
    rawRoute(
      TARGET_PATH,
      rawDocument("SITE-CLASS target", `${block}<main><p>target body</p></main>`),
      {
        id: "SITE-CLASS",
        primarySentinel: marker,
      },
    ),
    ...(repeated ? [repeatedSibling(1, "SITE-CLASS", block)] : []),
  ];
}

const changeMarker = s("SITE-CHANGE", "REPEATED");
const changeBlock = `<div class="site-change-block">${changeMarker}</div>`;
const changeTargetHtml = rawDocument(
  "SITE-CHANGE target",
  `${changeBlock}<main><p>Byte-stable target body.</p></main>`,
);

function changeRoutes(repeated: boolean): FixtureRoute[] {
  return [
    rawRoute(TARGET_PATH, changeTargetHtml, {
      id: "SITE-CHANGE",
      primarySentinel: changeMarker,
    }),
    ...(repeated
      ? Array.from({ length: 5 }, (_, index) =>
          repeatedSibling(index + 1, "SITE-CHANGE", changeBlock),
        )
      : []),
  ];
}

function conversationRoutes(): FixtureRoute[] {
  const marker = s("SITE-CONVERSATION", "REPEATED");
  const block = `<div class="conversation-repeat">${marker}</div>`;
  return [
    rawRoute(TARGET_PATH, rawDocument("SITE-CONVERSATION target", block), {
      id: "SITE-CONVERSATION",
      primarySentinel: marker,
    }),
    ...Array.from({ length: 3 }, (_, index) =>
      repeatedSibling(index + 1, "SITE-CONVERSATION", block),
    ),
  ];
}

function subdomainRoutes(): FixtureRoute[] {
  const marker = s("SITE-SUBDOMAIN", "REPEATED");
  const block = `<div class="subdomain-repeat">${marker}</div>`;
  return [
    rawRoute(TARGET_PATH, rawDocument("SITE-SUBDOMAIN target", block), {
      id: "SITE-SUBDOMAIN",
      primarySentinel: marker,
      notes:
        "Deploy this same scenario to the primary Vercel host and a sibling-subdomain deployment for host-scope comparison.",
    }),
    rawRoute("/site-context/subdomain-peer/", rawDocument("SITE-SUBDOMAIN peer", block)),
  ];
}

export function siteContextRoutesFor(scenario: string): FixtureRoute[] {
  if (scenario === "default") return [];
  if (!siteContextScenarioNames.includes(scenario as SiteContextScenario)) {
    throw new Error(`unknown CALIBRATION_SITE_SCENARIO: ${scenario}`);
  }

  if (scenario === "site-base") return siteBaseRoutes();
  if (scenario.startsWith("site-count-")) {
    const counts: Record<string, number> = {
      "site-count-target-only": 0,
      "site-count-plus-1": 1,
      "site-count-plus-2": 2,
      "site-count-plus-4": 4,
      "site-count-plus-9": 9,
    };
    return countRoutes(counts[scenario]);
  }
  if (scenario.startsWith("site-text-")) {
    return textRoutes(scenario.replace("site-text-", ""));
  }
  if (scenario.startsWith("site-region-")) {
    return regionRoutes(scenario.replace("site-region-", ""));
  }
  if (scenario.startsWith("site-unique-child-")) {
    return uniqueChildRoutes(scenario.replace("site-unique-child-", ""));
  }
  if (scenario.startsWith("site-nav-linkage-")) {
    return linkageRoutes(scenario.replace("site-nav-linkage-", "")).routes;
  }
  if (scenario === "site-template") return templateRoutes();
  if (scenario.startsWith("site-class-")) {
    const match = scenario.match(/^site-class-(.+)-(unique|repeated)$/);
    if (!match) throw new Error(`invalid SITE-CLASS scenario: ${scenario}`);
    return classRoutes(match[1], match[2] === "repeated");
  }
  if (scenario === "site-change-a") return changeRoutes(false);
  if (scenario === "site-change-b") return changeRoutes(true);
  if (scenario === "site-conversation") return conversationRoutes();
  if (scenario === "site-subdomain") return subdomainRoutes();
  throw new Error(`unhandled site-context scenario: ${scenario}`);
}

export function siteContextAssetsFor(scenario: string): StaticAsset[] {
  if (scenario === "default") return [];
  if (scenario.startsWith("site-nav-linkage-")) {
    return linkageRoutes(scenario.replace("site-nav-linkage-", "")).assets;
  }
  return [];
}

export function siteContextTestIds(): string[] {
  return [
    ...new Set(
      siteContextScenarioNames.flatMap((scenario) =>
        siteContextRoutesFor(scenario).flatMap((route) => route.metadata.testIds),
      ),
    ),
  ].sort();
}

export function siteContextTargetHtml(scenario: string): string | null {
  const target = siteContextRoutesFor(scenario).find((route) => route.path === TARGET_PATH);
  return target ? renderFixtureRoute(target) : null;
}

export function siteTemplateParityHtml(): [string, string] {
  const routes = templateRoutes();
  return [renderFixtureRoute(routes[0]), renderFixtureRoute(routes[2])];
}
