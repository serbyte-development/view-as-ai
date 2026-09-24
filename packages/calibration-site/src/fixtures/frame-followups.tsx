import { Document } from "../components/Document";
import type { FixtureRoute } from "../fixture-types";
import { sentinel } from "../sentinel";

const frameSixChildSentinel = sentinel("FRAME-006");
const frameEightChildSentinel = sentinel("FRAME-008");

function FrameSixParent() {
  return (
    <Document
      head={<title>FRAME-006 parent</title>}
      body={<iframe src="/frame/child-six/" title="FRAME-006 child document" />}
    />
  );
}

function FrameSevenPage() {
  return (
    <Document
      head={<title>FRAME-007 object fallback</title>}
      body={
        <object data="/frame/object-target/" type="text/html">
          {sentinel("FRAME-007")} object fallback content
        </object>
      }
    />
  );
}

function FrameEightPage() {
  return (
    <Document
      head={<title>FRAME-008 embed</title>}
      body={<embed src="/frame/embed-target/" type="text/html" />}
    />
  );
}

export const frameFollowupRoutes: FixtureRoute[] = [
  {
    kind: "tsx",
    path: "/experiments/frame/FRAME-006/",
    render: () => <FrameSixParent />,
    metadata: {
      phase: 4,
      source: "src/fixtures/frame-followups.tsx",
      testIds: ["FRAME-006"],
      notes: "The FRAME-006 sentinel exists only in the same-origin iframe child.",
    },
  },
  {
    kind: "tsx",
    path: "/frame/child-six/",
    render: () => (
      <Document
        head={<title>FRAME-006 child</title>}
        body={<p>{frameSixChildSentinel} iframe child-only content</p>}
      />
    ),
    metadata: {
      phase: 4,
      source: "src/fixtures/frame-followups.tsx",
      testIds: [],
      notes: "Supporting child for FRAME-006.",
    },
  },
  {
    kind: "tsx",
    path: "/experiments/frame/FRAME-007/",
    render: () => <FrameSevenPage />,
    metadata: {
      phase: 4,
      source: "src/fixtures/frame-followups.tsx",
      testIds: ["FRAME-007"],
      sentinels: { "FRAME-007": sentinel("FRAME-007") },
    },
  },
  {
    kind: "tsx",
    path: "/frame/object-target/",
    render: () => (
      <Document head={<title>Object target</title>} body={<p>object target document</p>} />
    ),
    metadata: {
      phase: 4,
      source: "src/fixtures/frame-followups.tsx",
      testIds: [],
    },
  },
  {
    kind: "tsx",
    path: "/experiments/frame/FRAME-008/",
    render: () => <FrameEightPage />,
    metadata: {
      phase: 4,
      source: "src/fixtures/frame-followups.tsx",
      testIds: ["FRAME-008"],
      notes: "The FRAME-008 sentinel exists only in the embedded same-origin target.",
    },
  },
  {
    kind: "tsx",
    path: "/frame/embed-target/",
    render: () => (
      <Document
        head={<title>FRAME-008 embedded target</title>}
        body={<p>{frameEightChildSentinel} embedded target content</p>}
      />
    ),
    metadata: {
      phase: 4,
      source: "src/fixtures/frame-followups.tsx",
      testIds: [],
      notes: "Supporting embedded document for FRAME-008.",
    },
  },
];
