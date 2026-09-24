import type { ReactNode } from "react";

import { Document } from "../components/Document";
import type { FixtureRoute } from "../fixture-types";
import { sentinel } from "../sentinel";

interface BoilerplateCase {
  body: ReactNode;
  id: string;
}

const s = (id: string) => sentinel(id);

const cases: BoilerplateCase[] = [
  {
    id: "BOIL-001",
    body: (
      <nav>
        <a href="/docs/">{s("BOIL-001")}</a>
      </nav>
    ),
  },
  {
    id: "BOIL-002",
    body: (
      <nav className="navbar">
        <a href="/about/">{s("BOIL-002")}</a>
      </nav>
    ),
  },
  {
    id: "BOIL-003",
    body: (
      <nav aria-label="Primary">
        <a href="/primary/">{s("BOIL-003")}</a>
      </nav>
    ),
  },
  {
    id: "BOIL-004",
    body: (
      <nav aria-label="Utility">
        <a href="/utility/">{s("BOIL-004")}</a>
      </nav>
    ),
  },
  {
    id: "BOIL-005",
    body: (
      <ul className="site-utility-nav">
        <li>
          <a href="/alerts/">{s("BOIL-005")}</a>
        </li>
      </ul>
    ),
  },
  {
    id: "BOIL-006",
    body: (
      <div className="hds-secondary-navigation-menu-items">
        <nav>
          <a href="/secondary/">{s("BOIL-006")}</a>
        </nav>
      </div>
    ),
  },
  {
    id: "BOIL-007",
    body: (
      <div className="gem-c-related-navigation">
        <a href="/related/">{s("BOIL-007")}</a>
      </div>
    ),
  },
  {
    id: "BOIL-008",
    body: (
      <aside className="contextual-sidebar">
        <a href="/context/">{s("BOIL-008")}</a>
      </aside>
    ),
  },
  {
    id: "BOIL-009",
    body: <div className="contextual-footer">{s("BOIL-009")}</div>,
  },
  {
    id: "BOIL-010",
    body: <section className="promo-banner">{s("BOIL-010")}</section>,
  },
  {
    id: "BOIL-011",
    body: (
      <main>
        <section className="promo-banner">{s("BOIL-011")}</section>
      </main>
    ),
  },
  {
    id: "BOIL-012",
    body: (
      <div className="site-banner" role="alert">
        {s("BOIL-012")} Important unique site alert
      </div>
    ),
  },
  {
    id: "BOIL-013",
    body: <div className="cookie-notice">{s("BOIL-013")} Cookie preferences</div>,
  },
  {
    id: "BOIL-014",
    body: (
      <form className="newsletter-signup">
        <label htmlFor="newsletter-email">{s("BOIL-014")}</label>
        <input id="newsletter-email" type="email" />
      </form>
    ),
  },
  {
    id: "BOIL-015",
    body: (
      <ul className="social-links">
        <li>
          <a href="https://example.com/social">{s("BOIL-015")}</a>
        </li>
      </ul>
    ),
  },
  {
    id: "BOIL-016",
    body: (
      <ul className="et_pb_social_media_follow">
        <li>
          <a href="https://example.com/framework-social">{s("BOIL-016")}</a>
        </li>
      </ul>
    ),
  },
  {
    id: "BOIL-017",
    body: (
      <>
        <a className="skip-link" href="#boil-017-main">
          {s("BOIL-017")}
        </a>
        <main id="boil-017-main">main content</main>
      </>
    ),
  },
  {
    id: "BOIL-018",
    body: (
      <div className="navbar">
        <form>
          <input placeholder={s("BOIL-018")} />
        </form>
      </div>
    ),
  },
  {
    id: "BOIL-019",
    body: (
      <main>
        <form>
          <input placeholder={s("BOIL-019")} />
        </form>
      </main>
    ),
  },
  {
    id: "BOIL-020",
    body: (
      <div className="language-switcher">
        <a href="/fr/">{s("BOIL-020")}</a>
      </div>
    ),
  },
  {
    id: "BOIL-021",
    body: (
      <div className="color-theme">
        <button type="button">{s("BOIL-021")}</button>
      </div>
    ),
  },
  {
    id: "BOIL-022",
    body: (
      <aside>
        <h2>Related content</h2>
        <a href="/related-content/">{s("BOIL-022")}</a>
      </aside>
    ),
  },
  {
    id: "BOIL-023",
    body: (
      <nav aria-label="Table of contents">
        <a href="#section">{s("BOIL-023")}</a>
      </nav>
    ),
  },
  {
    id: "BOIL-024",
    body: (
      <nav aria-label="Pagination">
        <a href="?page=2">{s("BOIL-024")}</a>
      </nav>
    ),
  },
  {
    id: "BOIL-025",
    body: <section className="author-box">{s("BOIL-025")} Author biography</section>,
  },
  {
    id: "BOIL-026",
    body: <div className="post-tags">{s("BOIL-026")} calibration-tag</div>,
  },
  {
    id: "BOIL-027",
    body: (
      <div className="share-buttons">
        <a href="https://example.com/share">{s("BOIL-027")}</a>
      </div>
    ),
  },
  {
    id: "BOIL-028",
    body: (
      <section className="comments">
        <h2>Comments</h2>
        <p>{s("BOIL-028")} Comment body</p>
      </section>
    ),
  },
  {
    id: "BOIL-029",
    body: <footer>© 2026 {s("BOIL-029")}</footer>,
  },
  {
    id: "BOIL-030",
    body: (
      <footer>
        {s("BOIL-030")} Unique substantive footer fact: calibration office closes at 4:17 PM.
      </footer>
    ),
  },
];

function BoilerplatePage({ fixture }: { fixture: BoilerplateCase }) {
  return (
    <Document
      head={<title>{`${fixture.id} boilerplate fixture`}</title>}
      body={
        <>
          <p>Neutral page content.</p>
          {fixture.body}
        </>
      }
    />
  );
}

export const boilerplateRoutes: FixtureRoute[] = cases.map((fixture) => ({
  kind: "tsx",
  path: `/experiments/boilerplate/${fixture.id}/`,
  render: () => <BoilerplatePage fixture={fixture} />,
  metadata: {
    phase: 4,
    source: "src/fixtures/boilerplate.tsx",
    testIds: [fixture.id],
    sentinels: { [fixture.id]: s(fixture.id) },
  },
}));
