import { Document } from "../components/Document";
import type { FixtureRoute } from "../fixture-types";

function BreadcrumbContextPage() {
  return (
    <Document
      head={<title>Breadcrumb context matrix</title>}
      body={
        <main>
          <h1>BREADCRUMB_CONTEXT_CONTROL</h1>
          <p>Six isolated aria-label breadcrumb structures.</p>

          <h2>Case A: one link</h2>
          <nav aria-label="Breadcrumb">
            <a href="/breadcrumb/a">BREAD_A_ONE_LINK</a>
          </nav>

          <h2>Case B: two adjacent links</h2>
          <nav aria-label="Breadcrumb">
            <a href="/breadcrumb/b-first">BREAD_B_FIRST</a>
            <a href="/breadcrumb/b-second">BREAD_B_SECOND</a>
          </nav>

          <h2>Case C: two links with literal slash</h2>
          <nav aria-label="Breadcrumb">
            <a href="/breadcrumb/c-first">BREAD_C_FIRST</a> /{" "}
            <a href="/breadcrumb/c-second">BREAD_C_SECOND</a>
          </nav>

          <h2>Case D: two links with span slash</h2>
          <nav aria-label="Breadcrumb">
            <a href="/breadcrumb/d-first">BREAD_D_FIRST</a>
            <span>/</span>
            <a href="/breadcrumb/d-second">BREAD_D_SECOND</a>
          </nav>

          <h2>Case E: two links with aria-hidden span slash</h2>
          <nav aria-label="Breadcrumb">
            <a href="/blog">BREAD_E_BLOG</a>
            <span aria-hidden="true">/</span>
            <a href="/blog#web-design">BREAD_E_WEB_DESIGN_UX</a>
          </nav>

          <h2>Case F: text plus one link</h2>
          <nav aria-label="Breadcrumb">
            BREAD_F_TEXT / <a href="/breadcrumb/f-link">BREAD_F_LINK</a>
          </nav>

          <p>BREADCRUMB_CONTEXT_END</p>
        </main>
      }
    />
  );
}

export const breadcrumbContextRoutes: FixtureRoute[] = [
  {
    path: "/experiments/breadcrumb-context/",
    kind: "tsx",
    render: () => <BreadcrumbContextPage />,
    metadata: {
      phase: 10,
      source: "src/fixtures/breadcrumb-context.tsx",
      testIds: [],
      notes:
        "Diagnostic follow-up isolating which child structures cause aria-label=Breadcrumb navigation to survive native web.run pruning.",
    },
  },
];
