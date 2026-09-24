import type { CSSProperties, ReactNode } from "react";

import { Document } from "../components/Document";
import type { FixtureRoute, StaticAsset } from "../fixture-types";
import { sentinel } from "../sentinel";

interface VisibilityCase {
  body?: ReactNode;
  head?: ReactNode;
  id: string;
}

const s = (id: string) => sentinel(id);

function CaseBody({ id, style }: { id: string; style?: CSSProperties }) {
  return (
    <div className="case" style={style}>
      {s(id)}
    </div>
  );
}

function Style({ children }: { children: string }) {
  return <style>{children}</style>;
}

const cases: VisibilityCase[] = [
  {
    id: "VIS-031",
    body: (
      <div style={{ opacity: 0 }}>
        <CaseBody id="VIS-031" />
      </div>
    ),
  },
  { id: "VIS-032", body: <CaseBody id="VIS-032" style={{ opacity: 0.001 }} /> },
  { id: "VIS-033", body: <CaseBody id="VIS-033" style={{ filter: "opacity(0)" }} /> },
  {
    id: "VIS-034",
    body: (
      <div style={{ visibility: "hidden" }}>
        <CaseBody id="VIS-034" style={{ visibility: "visible" }} />
      </div>
    ),
  },
  {
    id: "VIS-035",
    body: <CaseBody id="VIS-035" style={{ width: 0, height: 0, overflow: "visible" }} />,
  },
  {
    id: "VIS-036",
    body: <CaseBody id="VIS-036" style={{ width: 0, height: 0, overflow: "hidden" }} />,
  },
  {
    id: "VIS-037",
    body: <CaseBody id="VIS-037" style={{ maxHeight: 0, overflow: "hidden" }} />,
  },
  {
    id: "VIS-038",
    body: <CaseBody id="VIS-038" style={{ maxWidth: 0, overflow: "hidden" }} />,
  },
  {
    id: "VIS-039",
    body: (
      <CaseBody
        id="VIS-039"
        style={{ position: "absolute", clip: "rect(0 0 0 0)", width: 1, height: 1 }}
      />
    ),
  },
  { id: "VIS-040", body: <CaseBody id="VIS-040" style={{ clipPath: "circle(0)" }} /> },
  {
    id: "VIS-041",
    body: (
      <CaseBody id="VIS-041" style={{ maskImage: "linear-gradient(transparent, transparent)" }} />
    ),
  },
  { id: "VIS-042", body: <CaseBody id="VIS-042" style={{ textIndent: "-9999px" }} /> },
  { id: "VIS-043", body: <CaseBody id="VIS-043" style={{ marginLeft: "-10000px" }} /> },
  {
    id: "VIS-044",
    body: <CaseBody id="VIS-044" style={{ position: "absolute", left: "-10000px" }} />,
  },
  {
    id: "VIS-045",
    body: <CaseBody id="VIS-045" style={{ position: "absolute", top: "-10000px" }} />,
  },
  {
    id: "VIS-046",
    body: <CaseBody id="VIS-046" style={{ position: "absolute", left: "calc(100vw + 10000px)" }} />,
  },
  {
    id: "VIS-047",
    body: <CaseBody id="VIS-047" style={{ position: "fixed", left: "-10000px" }} />,
  },
  {
    id: "VIS-048",
    body: <CaseBody id="VIS-048" style={{ position: "relative", left: "-10000px" }} />,
  },
  { id: "VIS-049", body: <CaseBody id="VIS-049" style={{ transform: "translateX(-200vw)" }} /> },
  { id: "VIS-050", body: <CaseBody id="VIS-050" style={{ transform: "translateX(200vw)" }} /> },
  { id: "VIS-051", body: <CaseBody id="VIS-051" style={{ transform: "translateY(-200vh)" }} /> },
  { id: "VIS-052", body: <CaseBody id="VIS-052" style={{ transform: "translateY(200vh)" }} /> },
  {
    id: "VIS-053",
    body: <CaseBody id="VIS-053" style={{ transform: "translate3d(-200vw, -200vh, 0)" }} />,
  },
  { id: "VIS-054", body: <CaseBody id="VIS-054" style={{ translate: "-200vw 0" }} /> },
  { id: "VIS-055", body: <CaseBody id="VIS-055" style={{ scale: 0 }} /> },
  { id: "VIS-056", body: <CaseBody id="VIS-056" style={{ transform: "rotate(180deg)" }} /> },
  { id: "VIS-057", body: <CaseBody id="VIS-057" style={{ transform: "scale(0.001)" }} /> },
  {
    id: "VIS-058",
    body: (
      <div style={{ width: 100, overflow: "hidden" }}>
        <CaseBody id="VIS-058" style={{ transform: "translateX(-200vw)" }} />
      </div>
    ),
  },
  {
    id: "VIS-059",
    body: (
      <div style={{ width: 100, overflow: "visible" }}>
        <CaseBody id="VIS-059" style={{ transform: "translateX(-200vw)" }} />
      </div>
    ),
  },
  { id: "VIS-060", body: <CaseBody id="VIS-060" style={{ position: "sticky", top: 0 }} /> },
  { id: "VIS-061", body: <CaseBody id="VIS-061" style={{ position: "fixed", top: 0 }} /> },
  {
    id: "VIS-062",
    body: (
      <div style={{ position: "relative" }}>
        <CaseBody id="VIS-062" />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "white" }}>
          opaque cover
        </div>
      </div>
    ),
  },
  { id: "VIS-063", body: <CaseBody id="VIS-063" style={{ pointerEvents: "none" }} /> },
  { id: "VIS-064", body: <CaseBody id="VIS-064" style={{ userSelect: "none" }} /> },
  {
    id: "VIS-065",
    body: (
      <>
        <div style={{ height: "500vh" }}>spacer</div>
        <CaseBody id="VIS-065" style={{ contentVisibility: "auto" }} />
      </>
    ),
  },
  { id: "VIS-066", body: <CaseBody id="VIS-066" style={{ contain: "layout paint" }} /> },
  {
    id: "VIS-067",
    head: <Style>{".case[hidden] { display: block !important; }"}</Style>,
    body: (
      <div className="case" hidden>
        {s("VIS-067")}
      </div>
    ),
  },
  {
    id: "VIS-068",
    head: <Style>{".case { display: none !important; }"}</Style>,
    body: <CaseBody id="VIS-068" style={{ display: "block" }} />,
  },
  {
    id: "VIS-069",
    head: <Style>{".case { display: none; } .case { display: block; }"}</Style>,
  },
  {
    id: "VIS-070",
    head: <Style>{".case { display: block; } .case { display: none; }"}</Style>,
  },
  {
    id: "VIS-071",
    head: <Style>{".case { --vai-display: none; display: var(--vai-display); }"}</Style>,
  },
  {
    id: "VIS-072",
    head: <link rel="stylesheet" href="/assets/visibility/importer.css" />,
  },
  {
    id: "VIS-073",
    head: <link rel="stylesheet" href="/assets/visibility/media-hide.css" media="print" />,
  },
  {
    id: "VIS-074",
    head: <link rel="stylesheet" href="/assets/visibility/media-hide.css" media="screen" />,
  },
  {
    id: "VIS-075",
    head: <Style>{"@supports (display: grid) { .case { display: none; } }"}</Style>,
  },
  {
    id: "VIS-076",
    body: <CaseBody id="VIS-076" style={{ transition: "opacity 1s linear" }} />,
  },
  {
    id: "VIS-077",
    body: (
      <CaseBody
        id="VIS-077"
        style={{ transform: "translateX(-200vw)", transition: "transform 1s linear" }}
      />
    ),
  },
  {
    id: "VIS-078",
    body: <CaseBody id="VIS-078" style={{ opacity: 0, transition: "opacity 1s linear" }} />,
  },
  {
    id: "VIS-079",
    head: (
      <Style>
        {"@keyframes vai79 { to { opacity: 0; } } .case { animation: vai79 0s forwards; }"}
      </Style>
    ),
  },
  {
    id: "VIS-080",
    head: (
      <Style>
        {
          "@keyframes vai80 { from { opacity: 0; } to { opacity: 1; } } .case { animation: vai80 0s forwards; }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-081",
    head: (
      <Style>
        {
          "@keyframes vai81 { to { transform: translateX(-200vw); } } .case { animation: vai81 0s forwards; }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-082",
    head: (
      <Style>
        {
          "@keyframes vai82 { from { transform: translateX(-200vw); } to { transform: translateX(0); } } .case { animation: vai82 0s forwards; }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-083",
    head: (
      <Style>
        {"@keyframes vai83 { to { opacity: 0; } } .case { animation: vai83 1s linear forwards; }"}
      </Style>
    ),
  },
  {
    id: "VIS-084",
    head: (
      <Style>
        {
          "@keyframes vai84 { from { opacity: 0; } to { opacity: 1; } } .case { animation: vai84 1s linear forwards; }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-085",
    head: (
      <Style>
        {
          "@keyframes vai85 { to { transform: translateX(-200vw); } } .case { animation: vai85 1s linear forwards; }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-086",
    head: (
      <Style>
        {
          "@keyframes vai86 { from { transform: translateX(-200vw); } to { transform: translateX(0); } } .case { animation: vai86 1s linear forwards; }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-087",
    head: (
      <Style>
        {
          "@keyframes vai87 { to { opacity: 0; } } .case { animation: vai87 1s linear 60s forwards; }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-088",
    head: (
      <Style>
        {
          "@keyframes vai88 { from { opacity: 1; } to { opacity: 0; } } .case { animation: vai88 10s linear -5s forwards; }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-089",
    head: (
      <Style>
        {
          "@keyframes vai89 { from { opacity: 1; } to { opacity: 0; } } .case { animation: vai89 1s linear infinite alternate; }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-090",
    head: (
      <Style>
        {
          "@keyframes vai90 { from { transform: translateX(0); } to { transform: translateX(-200vw); } } .case { animation: vai90 1s linear infinite alternate; }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-091",
    head: (
      <Style>
        {
          "@keyframes vai91 { to { opacity: 0; } } .case { animation: vai91 0s forwards; } @media (prefers-reduced-motion: reduce) { .case { animation: none; } }"
        }
      </Style>
    ),
  },
  {
    id: "VIS-092",
    head: (
      <Style>{".content { display: none; } .trigger:hover .content { display: inline; }"}</Style>
    ),
    body: (
      <div className="trigger">
        hover trigger <span className="content">{s("VIS-092")}</span>
      </div>
    ),
  },
  {
    id: "VIS-093",
    head: <Style>{".trigger:hover .content { display: none; }"}</Style>,
    body: (
      <div className="trigger">
        hover trigger <span className="content">{s("VIS-093")}</span>
      </div>
    ),
  },
  {
    id: "VIS-094",
    head: (
      <Style>{".content { display: none; } .trigger:focus + .content { display: inline; }"}</Style>
    ),
    body: (
      <>
        <button className="trigger" type="button">
          focus trigger
        </button>
        <span className="content">{s("VIS-094")}</span>
      </>
    ),
  },
  {
    id: "VIS-095",
    head: (
      <Style>
        {".content { display: none; } .trigger:focus-within .content { display: inline; }"}
      </Style>
    ),
    body: (
      <div className="trigger">
        <input aria-label="focus-within trigger" />
        <span className="content">{s("VIS-095")}</span>
      </div>
    ),
  },
  {
    id: "VIS-096",
    head: <Style>{".case { display: none; } .case:target { display: block; }"}</Style>,
    body: (
      <div className="case" id="target">
        {s("VIS-096")}
      </div>
    ),
  },
  {
    id: "VIS-097",
    head: <Style>{".case { display: none; } .case:target { display: block; }"}</Style>,
    body: (
      <div className="case" id="target">
        {s("VIS-097")}
      </div>
    ),
  },
  {
    id: "VIS-098",
    head: (
      <Style>
        {".content { display: none; } .trigger:checked + .content { display: inline; }"}
      </Style>
    ),
    body: (
      <>
        <input className="trigger" type="checkbox" />
        <span className="content">{s("VIS-098")}</span>
      </>
    ),
  },
  {
    id: "VIS-099",
    head: (
      <Style>
        {".content { display: none; } .trigger:checked + .content { display: inline; }"}
      </Style>
    ),
    body: (
      <>
        <input className="trigger" type="checkbox" checked readOnly />
        <span className="content">{s("VIS-099")}</span>
      </>
    ),
  },
  {
    id: "VIS-100",
    head: <Style>{".parent:has(.marker) { display: none; }"}</Style>,
    body: (
      <div className="parent">
        {s("VIS-100")}
        <span className="marker" />
      </div>
    ),
  },
  {
    id: "VIS-101",
    head: <Style>{"@media (max-width: 320px) { .case { display: none; } }"}</Style>,
  },
  {
    id: "VIS-102",
    head: <Style>{"@media (max-width: 768px) { .case { display: none; } }"}</Style>,
  },
  {
    id: "VIS-103",
    head: <Style>{"@media (min-width: 769px) { .case { display: none; } }"}</Style>,
  },
  {
    id: "VIS-104",
    head: <Style>{"@media (min-width: 1280px) { .case { display: none; } }"}</Style>,
  },
  {
    id: "VIS-105",
    head: <Style>{"@media (orientation: portrait) { .case { display: none; } }"}</Style>,
  },
  {
    id: "VIS-106",
    head: <Style>{"@media (orientation: landscape) { .case { display: none; } }"}</Style>,
  },
  {
    id: "VIS-107",
    body: (
      <>
        <div style={{ height: "100vh" }}>viewport spacer</div>
        <CaseBody id="VIS-107" />
      </>
    ),
  },
  {
    id: "VIS-108",
    body: (
      <>
        <div style={{ height: "500vh" }}>deep spacer</div>
        <CaseBody id="VIS-108" />
      </>
    ),
  },
  {
    id: "VIS-109",
    body: (
      <div style={{ width: "200vw" }}>
        <div style={{ marginLeft: "110vw" }}>{s("VIS-109")}</div>
      </div>
    ),
  },
  {
    id: "VIS-110",
    head: (
      <Style>
        {
          ".container { container-type: inline-size; width: 200px; } @container (max-width: 300px) { .case { display: none; } }"
        }
      </Style>
    ),
    body: (
      <div className="container">
        <CaseBody id="VIS-110" />
      </div>
    ),
  },
];

function VisibilityPage({ fixture }: { fixture: VisibilityCase }) {
  return (
    <Document
      head={
        <>
          <title>{`${fixture.id} visibility fixture`}</title>
          {fixture.head}
        </>
      }
      body={fixture.body ?? <CaseBody id={fixture.id} />}
    />
  );
}

export const isolatedVisibilityRoutes: FixtureRoute[] = cases.map((fixture) => ({
  kind: "tsx",
  path: `/experiments/visibility/${fixture.id}/`,
  render: () => <VisibilityPage fixture={fixture} />,
  metadata: {
    phase: 3,
    source: "src/fixtures/visibility-isolated.tsx",
    testIds: [fixture.id],
    sentinels: { [fixture.id]: s(fixture.id) },
    notes:
      fixture.id === "VIS-097"
        ? "Capture this route with #target appended to the public URL."
        : undefined,
  },
}));

export const isolatedVisibilityAssets: StaticAsset[] = [
  {
    path: "/assets/visibility/importer.css",
    source: "src/assets/visibility/importer.css",
  },
  {
    path: "/assets/visibility/imported.css",
    source: "src/assets/visibility/imported.css",
  },
  {
    path: "/assets/visibility/media-hide.css",
    source: "src/assets/visibility/media-hide.css",
  },
];
