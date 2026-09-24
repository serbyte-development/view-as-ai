import { createElement, type ReactNode } from "react";

import { Document } from "../components/Document";
import type { FixtureRoute, StaticAsset } from "../fixture-types";
import { sentinel } from "../sentinel";

const s = (id: string, label = "PRIMARY") => sentinel(id, label);

function RawScript({ code, src }: { code?: string; src?: string }) {
  if (src) return <script src={src} />;
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: script source is the calibration subject.
    <script dangerouslySetInnerHTML={{ __html: code ?? "" }} />
  );
}

function activeRoute(
  id: string,
  body: ReactNode,
  options: {
    primarySentinel?: string;
    sentinelGroups?: Record<string, string[]>;
    notes?: string;
  } = {},
): FixtureRoute {
  return {
    kind: "tsx",
    path: `/experiments/active/${id}/`,
    render: () => <Document head={<title>{`${id} active fixture`}</title>} body={body} />,
    metadata: {
      phase: 6,
      source: "src/fixtures/active.tsx",
      testIds: [id],
      sentinels: options.primarySentinel ? { [id]: options.primarySentinel } : undefined,
      sentinelGroups: options.sentinelGroups,
      notes: options.notes,
    },
  };
}

export const activeRoutes: FixtureRoute[] = [
  activeRoute(
    "ACTIVE-001",
    <>
      <RawScript code={`window.__VAI_ACTIVE_001__=${JSON.stringify(s("ACTIVE-001"))};`} />
      <p>Neutral body.</p>
    </>,
    {
      primarySentinel: s("ACTIVE-001"),
      sentinelGroups: { inlineScriptOnly: [s("ACTIVE-001")] },
    },
  ),
  activeRoute(
    "ACTIVE-002",
    <>
      <RawScript src="/assets/active/external.js" />
      <p>Neutral body.</p>
    </>,
    {
      sentinelGroups: { externalScriptOnly: [s("ACTIVE-002")] },
      notes: "The sentinel exists only in /assets/active/external.js.",
    },
  ),
  activeRoute(
    "ACTIVE-003",
    <>
      <div id="active-target" />
      <RawScript
        code={`document.getElementById("active-target").textContent=${JSON.stringify(
          s("ACTIVE-003"),
        )};`}
      />
    </>,
    {
      primarySentinel: s("ACTIVE-003"),
      sentinelGroups: { executableScriptSource: [s("ACTIVE-003")] },
    },
  ),
  activeRoute(
    "ACTIVE-004",
    <>
      <div id="active-target" />
      <RawScript
        code={`document.addEventListener("DOMContentLoaded",()=>{document.getElementById("active-target").textContent=${JSON.stringify(
          s("ACTIVE-004"),
        )};});`}
      />
    </>,
    {
      primarySentinel: s("ACTIVE-004"),
      sentinelGroups: { executableScriptSource: [s("ACTIVE-004")] },
    },
  ),
  activeRoute(
    "ACTIVE-005",
    <>
      <div id="active-target" />
      <RawScript
        code={`setTimeout(()=>{document.getElementById("active-target").textContent=${JSON.stringify(
          s("ACTIVE-005"),
        )};},0);`}
      />
    </>,
    {
      primarySentinel: s("ACTIVE-005"),
      sentinelGroups: { executableScriptSource: [s("ACTIVE-005")] },
    },
  ),
  activeRoute(
    "ACTIVE-006",
    <>
      <div id="active-target" />
      <RawScript
        code={`setTimeout(()=>{document.getElementById("active-target").textContent=${JSON.stringify(
          s("ACTIVE-006"),
        )};},1000);`}
      />
    </>,
    {
      primarySentinel: s("ACTIVE-006"),
      sentinelGroups: { executableScriptSource: [s("ACTIVE-006")] },
    },
  ),
  activeRoute(
    "ACTIVE-007",
    <>
      <div id="active-target">ACTIVE_007_INITIAL_VALUE</div>
      <RawScript
        code={`document.getElementById("active-target").textContent=${JSON.stringify(
          s("ACTIVE-007"),
        )};`}
      />
    </>,
    {
      primarySentinel: s("ACTIVE-007"),
      sentinelGroups: { executableScriptSource: [s("ACTIVE-007")] },
    },
  ),
  activeRoute(
    "ACTIVE-008",
    <>
      <div id="active-target">{s("ACTIVE-008")}</div>
      <RawScript code={'document.getElementById("active-target").remove();'} />
    </>,
    {
      primarySentinel: s("ACTIVE-008"),
      sentinelGroups: { originVisible: [s("ACTIVE-008")] },
    },
  ),
  activeRoute(
    "ACTIVE-009",
    <>
      <div id="active-target" style={{ display: "none" }}>
        {s("ACTIVE-009")}
      </div>
      <RawScript code={'document.getElementById("active-target").style.display="block";'} />
    </>,
    {
      primarySentinel: s("ACTIVE-009"),
      sentinelGroups: { originHidden: [s("ACTIVE-009")] },
    },
  ),
  activeRoute(
    "ACTIVE-010",
    <>
      <div id="active-target">{s("ACTIVE-010")}</div>
      <RawScript code={'document.getElementById("active-target").style.display="none";'} />
    </>,
    {
      primarySentinel: s("ACTIVE-010"),
      sentinelGroups: { originVisible: [s("ACTIVE-010")] },
    },
  ),
  activeRoute(
    "ACTIVE-011",
    <RawScript code={`document.write(${JSON.stringify(s("ACTIVE-011"))});`} />,
    {
      primarySentinel: s("ACTIVE-011"),
      sentinelGroups: { executableScriptSource: [s("ACTIVE-011")] },
    },
  ),
  activeRoute(
    "ACTIVE-012",
    <>
      <div id="active-target" />
      <RawScript
        code={
          'fetch("/assets/active/fetch.json").then((response)=>response.json()).then((data)=>{document.getElementById("active-target").textContent=data.value;});'
        }
      />
    </>,
    {
      sentinelGroups: { fetchedResourceOnly: [s("ACTIVE-012")] },
      notes: "The sentinel exists only in /assets/active/fetch.json.",
    },
  ),
  activeRoute(
    "ACTIVE-013",
    <>
      {createElement("vai-light", null, s("ACTIVE-013"))}
      <RawScript code={'customElements.define("vai-light",class extends HTMLElement{});'} />
    </>,
    {
      primarySentinel: s("ACTIVE-013"),
      sentinelGroups: { lightDom: [s("ACTIVE-013")] },
    },
  ),
  activeRoute(
    "ACTIVE-014",
    <>
      {createElement("vai-shadow")}
      <RawScript
        code={`customElements.define("vai-shadow",class extends HTMLElement{connectedCallback(){this.attachShadow({mode:"open"}).textContent=${JSON.stringify(
          s("ACTIVE-014"),
        )};}});`}
      />
    </>,
    {
      primarySentinel: s("ACTIVE-014"),
      sentinelGroups: { executableScriptSource: [s("ACTIVE-014")] },
    },
  ),
  {
    kind: "raw",
    path: "/experiments/active/ACTIVE-015/",
    render: () =>
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>ACTIVE-015 declarative shadow DOM</title></head><body><vai-dsd><template shadowrootmode="open"><span>${s(
        "ACTIVE-015",
      )}</span></template></vai-dsd></body></html>\n`,
    metadata: {
      phase: 6,
      source: "src/fixtures/active.tsx",
      testIds: ["ACTIVE-015"],
      sentinels: { "ACTIVE-015": s("ACTIVE-015") },
      sentinelGroups: { declarativeShadowDom: [s("ACTIVE-015")] },
    },
  },
  activeRoute(
    "ACTIVE-016",
    <>
      <div id="app" />
      <RawScript
        code={`document.getElementById("app").textContent=${JSON.stringify(s("ACTIVE-016"))};`}
      />
    </>,
    {
      primarySentinel: s("ACTIVE-016"),
      sentinelGroups: { executableScriptSource: [s("ACTIVE-016")] },
    },
  ),
  activeRoute(
    "ACTIVE-017",
    <>
      <noscript>{s("ACTIVE-017", "NOSCRIPT")}</noscript>
      <div id="active-target" />
      <RawScript
        code={`document.getElementById("active-target").textContent=${JSON.stringify(
          s("ACTIVE-017", "CLIENT"),
        )};`}
      />
    </>,
    {
      primarySentinel: s("ACTIVE-017", "NOSCRIPT"),
      sentinelGroups: {
        noscript: [s("ACTIVE-017", "NOSCRIPT")],
        executableScriptSource: [s("ACTIVE-017", "CLIENT")],
      },
    },
  ),
];

export const activeAssets: StaticAsset[] = [
  {
    path: "/assets/active/external.js",
    content: `window.__VAI_ACTIVE_002__=${JSON.stringify(s("ACTIVE-002"))};\n`,
  },
  {
    path: "/assets/active/fetch.json",
    content: `${JSON.stringify({ value: s("ACTIVE-012") })}\n`,
  },
];
