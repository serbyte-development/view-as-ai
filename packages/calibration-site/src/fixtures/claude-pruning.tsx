import { createElement, type ReactNode } from "react";

import { Document } from "../components/Document";
import type { FixtureRoute } from "../fixture-types";

function Case({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <h2>{label}</h2>
      {children}
    </section>
  );
}

function ClaudePruningPage() {
  return (
    <Document
      head={<title>Claude pruning kitchen sink</title>}
      body={
        <>
          <div>
            <h1>CLAUDE_PRUNING_START</h1>
            <p>
              Each case title sits outside the candidate subtree. The CLAUDE_* marker sits inside
              the subtree being tested.
            </p>
          </div>

          <Case label="role=navigation on div">
            <div role="navigation">CLAUDE_PRUNE_ROLE_NAVIGATION_DIV</div>
          </Case>

          <Case label="role=navigation on nav">
            <nav role="navigation">CLAUDE_PRUNE_ROLE_NAVIGATION_NAV</nav>
          </Case>

          <Case label="role=menu">
            <div role="menu">CLAUDE_PRUNE_ROLE_MENU</div>
          </Case>

          <Case label="role=menubar">
            <div role="menubar">CLAUDE_PRUNE_ROLE_MENUBAR</div>
          </Case>

          <Case label="role=complementary">
            <aside role="complementary">CLAUDE_PRUNE_ROLE_COMPLEMENTARY</aside>
          </Case>

          <Case label="role=contentinfo">
            <footer role="contentinfo">CLAUDE_PRUNE_ROLE_CONTENTINFO</footer>
          </Case>

          <Case label="class=hidden">
            <div className="hidden">CLAUDE_PRUNE_CLASS_HIDDEN</div>
          </Case>

          <Case label="class=hide">
            <div className="hide">CLAUDE_PRUNE_CLASS_HIDE</div>
          </Case>

          <Case label="class=d-none">
            <div className="d-none">CLAUDE_PRUNE_CLASS_D_NONE</div>
          </Case>

          <Case label="class=hidden-xs">
            <div className="hidden-xs">CLAUDE_PRUNE_CLASS_HIDDEN_XS</div>
          </Case>

          <Case label="class=hidden-sm">
            <div className="hidden-sm">CLAUDE_PRUNE_CLASS_HIDDEN_SM</div>
          </Case>

          <Case label="class=hidden-md">
            <div className="hidden-md">CLAUDE_PRUNE_CLASS_HIDDEN_MD</div>
          </Case>

          <Case label="class=hidden-lg">
            <div className="hidden-lg">CLAUDE_PRUNE_CLASS_HIDDEN_LG</div>
          </Case>

          <Case label="class=breadcrumb">
            <nav className="breadcrumb">
              <a href="/claude/breadcrumb">CLAUDE_PRUNE_CLASS_BREADCRUMB</a>
            </nav>
          </Case>

          <Case label="class=breadcrumbs">
            <nav className="breadcrumbs">
              <a href="/claude/breadcrumbs">CLAUDE_PRUNE_CLASS_BREADCRUMBS</a>
            </nav>
          </Case>

          <Case label="id=breadcrumb on nav">
            <nav id="breadcrumb">
              <a href="/claude/breadcrumb-id">CLAUDE_PRUNE_ID_BREADCRUMB</a>
            </nav>
          </Case>

          <Case label="class=related-navigation">
            <nav className="related-navigation">
              <a href="/claude/related">CLAUDE_PRUNE_RELATED_NAVIGATION</a>
            </nav>
          </Case>

          <Case label="class=banner outside main">
            <div className="banner">CLAUDE_PRUNE_CLASS_BANNER</div>
          </Case>

          <Case label="id=promo-banner outside main">
            <div id="promo-banner">CLAUDE_PRUNE_ID_PROMO_BANNER</div>
          </Case>

          <Case label="class=cookie-notice">
            <aside className="cookie-notice">CLAUDE_PRUNE_COOKIE_NOTICE</aside>
          </Case>

          <Case label="class=cookie_notice">
            <aside className="cookie_notice">CLAUDE_PRUNE_COOKIE_NOTICE_UNDERSCORE</aside>
          </Case>

          <Case label="class=social-links">
            <ul className="social-links">
              <li>
                <a href="https://example.com/social">CLAUDE_PRUNE_SOCIAL_LINKS</a>
              </li>
            </ul>
          </Case>

          <Case label="class=share-buttons with link">
            <div className="share-buttons">
              <a href="https://example.com/share">CLAUDE_PRUNE_SHARE_BUTTONS</a>
            </div>
          </Case>

          <Case label="class=skip-link">
            <a className="skip-link" href="#claude-main">
              CLAUDE_PRUNE_SKIP_LINK
            </a>
          </Case>

          <Case label="class=ad">
            <div className="ad">CLAUDE_PRUNE_CLASS_AD</div>
          </Case>

          <Case label="class=ad-slot">
            <div className="ad-slot">CLAUDE_PRUNE_CLASS_AD_SLOT</div>
          </Case>

          <Case label="Divi social widget class">
            <ul className="et_pb_social_media_follow">
              <li>CLAUDE_PRUNE_DIVI_SOCIAL_WIDGET</li>
            </ul>
          </Case>

          <Case label="Elementor social icon class">
            <a className="elementor-social-icon" href="https://example.com/elementor-social">
              CLAUDE_PRUNE_ELEMENTOR_SOCIAL_ICON
            </a>
          </Case>

          <Case label="navbar search utility outside main">
            <div className="navbar">
              <form action="/claude/search">
                <label>
                  CLAUDE_PRUNE_NAVBAR_SEARCH
                  <input name="q" />
                </label>
              </form>
            </div>
          </Case>

          <Case label="nav class=navbar">
            <nav className="navbar">
              <a href="/claude/nav-one">CLAUDE_PRUNE_NAVBAR_LINK_ONE</a>
              <a href="/claude/nav-two">CLAUDE_PRUNE_NAVBAR_LINK_TWO</a>
            </nav>
          </Case>

          <Case label="nav class=navbar-nav">
            <nav className="navbar-nav">
              <a href="/claude/navbar-nav">CLAUDE_PRUNE_NAVBAR_NAV</a>
            </nav>
          </Case>

          <main id="claude-main">
            <Case label="class=promo-banner inside main">
              <div className="promo-banner">CLAUDE_PRUNE_PROMO_BANNER_IN_MAIN</div>
            </Case>

            <Case label="script subtree">
              <script type="application/json">CLAUDE_PRUNE_SCRIPT_SUBTREE</script>
            </Case>

            <Case label="style subtree">
              <style>{".claude-style::before { content: 'CLAUDE_PRUNE_STYLE_SUBTREE'; }"}</style>
            </Case>

            <Case label="template subtree">
              <template>CLAUDE_PRUNE_TEMPLATE_SUBTREE</template>
            </Case>

            <Case label="math subtree">
              {createElement(
                "math",
                null,
                createElement("mtext", null, "CLAUDE_PRUNE_MATH_SUBTREE"),
              )}
            </Case>

            <Case label="svg subtree">
              <svg viewBox="0 0 100 20">
                <text x="0" y="15">
                  CLAUDE_PRUNE_SVG_SUBTREE
                </text>
              </svg>
            </Case>

            <h2>Known keep controls</h2>

            <Case label="plain navigation">
              <nav>
                <a href="/claude/plain-nav">CLAUDE_KEEP_PLAIN_NAV</a>
              </nav>
            </Case>

            <Case label="aria-label=Breadcrumb">
              <nav aria-label="Breadcrumb">
                <a href="/claude/blog">CLAUDE_KEEP_ARIA_BREADCRUMB_FIRST</a>
                <span aria-hidden="true">/</span>
                <a href="/claude/blog#web-design">CLAUDE_KEEP_ARIA_BREADCRUMB_SECOND</a>
              </nav>
            </Case>

            <Case label="hidden attribute">
              <div hidden>CLAUDE_KEEP_HIDDEN_ATTRIBUTE</div>
            </Case>

            <Case label="aria-hidden=true">
              <div aria-hidden="true">CLAUDE_KEEP_ARIA_HIDDEN</div>
            </Case>

            <Case label="style=display:none">
              <div style={{ display: "none" }}>CLAUDE_KEEP_DISPLAY_NONE</div>
            </Case>

            <Case label="style=visibility:hidden">
              <div style={{ visibility: "hidden" }}>CLAUDE_KEEP_VISIBILITY_HIDDEN</div>
            </Case>

            <Case label="style=opacity:0">
              <div style={{ opacity: 0 }}>CLAUDE_KEEP_OPACITY_ZERO</div>
            </Case>

            <Case label="class=invisible">
              <div className="invisible">CLAUDE_KEEP_CLASS_INVISIBLE</div>
            </Case>

            <Case label="class=opacity-0">
              <div className="opacity-0">CLAUDE_KEEP_CLASS_OPACITY_ZERO</div>
            </Case>

            <Case label="class=hidden with inline style">
              <div className="hidden" style={{ display: "none" }}>
                CLAUDE_KEEP_HIDDEN_WITH_INLINE_STYLE
              </div>
            </Case>

            <Case label="class=share-buttons without links">
              <div className="share-buttons">CLAUDE_KEEP_SHARE_BUTTONS_WITHOUT_LINK</div>
            </Case>

            <Case label="class=contextual-sidebar">
              <aside className="contextual-sidebar">CLAUDE_KEEP_CONTEXTUAL_SIDEBAR</aside>
            </Case>

            <Case label="class=utility-nav">
              <nav className="utility-nav">CLAUDE_KEEP_UTILITY_NAV</nav>
            </Case>

            <Case label="role=banner">
              <header role="banner">CLAUDE_KEEP_ROLE_BANNER</header>
            </Case>
          </main>

          <div>
            <p>CLAUDE_PRUNING_END</p>
          </div>
        </>
      }
    />
  );
}

export const claudePruningRoutes: FixtureRoute[] = [
  {
    path: "/experiments/claude-pruning/",
    kind: "tsx",
    render: () => <ClaudePruningPage />,
    metadata: {
      phase: 10,
      source: "src/fixtures/claude-pruning.tsx",
      testIds: [],
      notes:
        "Diagnostic kitchen sink for comparing Claude crawl output against known native web.run pruning signals and keep controls.",
    },
  },
];
