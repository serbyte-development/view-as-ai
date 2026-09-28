import { Document } from "../components/Document";
import type { FixtureRoute } from "../fixture-types";
import { sentinel } from "../sentinel";

const TOKEN_ID = "TOKEN-001";
const CHANNEL_ID = "CHAN-001";

const neutralVocabulary = [
  "amber",
  "anchor",
  "apricot",
  "atlas",
  "autumn",
  "basil",
  "beacon",
  "birch",
  "brook",
  "canvas",
  "cedar",
  "chalk",
  "cinder",
  "cobalt",
  "copper",
  "coral",
  "delta",
  "drift",
  "elm",
  "ember",
  "fern",
  "field",
  "flint",
  "forest",
  "garden",
  "granite",
  "harbor",
  "hazel",
  "indigo",
  "island",
  "ivory",
  "juniper",
  "lagoon",
  "lantern",
  "laurel",
  "linen",
  "maple",
  "marble",
  "meadow",
  "mint",
  "moss",
  "notebook",
  "oasis",
  "ocean",
  "olive",
  "orchard",
  "paper",
  "pebble",
  "pine",
  "plum",
  "quartz",
  "reed",
  "river",
  "robin",
  "sage",
  "sand",
  "slate",
  "spruce",
  "stone",
  "studio",
  "timber",
  "valley",
  "violet",
  "walnut",
  "willow",
  "winter",
];

function denseWords(seed: number, count = 750): string {
  let state = seed >>> 0;
  const words: string[] = [];
  for (let index = 0; index < count; index += 1) {
    state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0;
    words.push(neutralVocabulary[state % neutralVocabulary.length]);
  }
  return words.join(" ");
}

function Filler({ segment }: { segment: number }) {
  return <p>{denseWords(10_000 + segment)}</p>;
}

const tokenMarker = (label: string) => sentinel(TOKEN_ID, label);
const channelMarker = (label: string) => sentinel(CHANNEL_ID, label);

const classTokens: Array<[string, string]> = [
  ["CLASS_HIDDEN", "hidden"],
  ["CLASS_HIDE", "hide"],
  ["CLASS_INVISIBLE", "invisible"],
  ["CLASS_COLLAPSE", "collapse"],
  ["CLASS_COLLAPSED", "collapsed"],
  ["CLASS_VISIBLE", "visible"],
  ["CLASS_HIDDEN_XS", "hidden-xs"],
  ["CLASS_HIDDEN_SM", "hidden-sm"],
  ["CLASS_HIDDEN_MD", "hidden-md"],
  ["CLASS_HIDDEN_LG", "hidden-lg"],
  ["CLASS_VISIBLE_XS", "visible-xs"],
  ["CLASS_VISIBLE_SM", "visible-sm"],
  ["CLASS_VISIBLE_MD", "visible-md"],
  ["CLASS_VISIBLE_LG", "visible-lg"],
  ["CLASS_D_NONE", "d-none"],
  ["CLASS_D_SM_NONE", "d-sm-none"],
  ["CLASS_D_MD_NONE", "d-md-none"],
  ["CLASS_D_LG_NONE", "d-lg-none"],
  ["CLASS_VISUALLY_HIDDEN", "visually-hidden"],
  ["CLASS_VISUALLY_HIDDEN_FOCUSABLE", "visually-hidden-focusable"],
  ["CLASS_SR_ONLY", "sr-only"],
  ["CLASS_SR_ONLY_FOCUSABLE", "sr-only-focusable"],
  ["CLASS_MD_HIDDEN", "md:hidden"],
  ["CLASS_LG_HIDDEN", "lg:hidden"],
  ["CLASS_MD_INVISIBLE", "md:invisible"],
  ["CLASS_LG_BLOCK", "lg:block"],
  ["CLASS_OPACITY_0", "opacity-0"],
  ["CLASS_W_0", "w-0"],
  ["CLASS_H_0", "h-0"],
  ["CLASS_OVERFLOW_HIDDEN", "overflow-hidden"],
  ["CLASS_IS_HIDDEN", "is-hidden"],
  ["CLASS_IS_INVISIBLE", "is-invisible"],
  ["CLASS_IS_SR_ONLY", "is-sr-only"],
  ["CLASS_SHOW_FOR_SR", "show-for-sr"],
  ["CLASS_HIDE_FOR_SMALL_ONLY", "hide-for-small-only"],
  ["CLASS_HIDE_FOR_MEDIUM_ONLY", "hide-for-medium-only"],
  ["CLASS_SHOW_FOR_MEDIUM", "show-for-medium"],
  ["CLASS_SCREEN_READER_TEXT", "screen-reader-text"],
  ["CLASS_ELEMENTOR_SCREEN_ONLY", "elementor-screen-only"],
  ["CLASS_DIVI_HIDDEN_PHONE", "et_pb_hidden_phone"],
  ["CLASS_DIVI_HIDDEN_TABLET", "et_pb_hidden_tablet"],
  ["CLASS_NAVBAR", "navbar"],
  ["CLASS_NAVBAR_NAV", "navbar-nav"],
  ["CLASS_BREADCRUMB", "breadcrumb"],
  ["CLASS_BREADCRUMBS", "breadcrumbs"],
  ["CLASS_UTILITY_NAV", "utility-nav"],
  ["CLASS_RELATED_NAVIGATION", "related-navigation"],
  ["CLASS_CONTEXTUAL_SIDEBAR", "contextual-sidebar"],
  ["CLASS_BANNER", "banner"],
  ["CLASS_PROMO_BANNER", "promo-banner"],
  ["CLASS_SIDEBAR", "sidebar"],
  ["CLASS_SITE_FOOTER", "site-footer"],
  ["CLASS_SITE_HEADER", "site-header"],
  ["CLASS_COOKIE_NOTICE", "cookie-notice"],
  ["CLASS_COOKIE_BANNER", "cookie-banner"],
  ["CLASS_SOCIAL_LINKS", "social-links"],
  ["CLASS_SHARE_BUTTONS", "share-buttons"],
  ["CLASS_SKIP_LINK", "skip-link"],
  ["CLASS_MENU", "menu"],
  ["CLASS_MENUBAR", "menubar"],
  ["CLASS_MODAL", "modal"],
  ["CLASS_DIALOG", "dialog"],
  ["CLASS_CAROUSEL", "carousel"],
  ["CLASS_SLICK_CLONED", "slick-cloned"],
  ["CLASS_SWIPER_DUPLICATE", "swiper-slide-duplicate"],
  ["CLASS_AD", "ad"],
  ["CLASS_AD_SLOT", "ad-slot"],
  ["CLASS_ADVERTISEMENT", "advertisement"],
  ["CLASS_SEARCH_BAR", "search-bar"],
];

const mutationTokens: Array<[string, string]> = [
  ["MUTATION_EXACT", "hidden-md"],
  ["MUTATION_CASE", "Hidden-MD"],
  ["MUTATION_UNDERSCORE", "hidden_md"],
  ["MUTATION_JOINED", "hiddenmd"],
  ["MUTATION_SUFFIX", "hidden-md-x"],
  ["MUTATION_PREFIX", "x-hidden-md"],
  ["MUTATION_WRAPPED", "foo-hidden-md-bar"],
  ["MUTATION_DOUBLE_DASH", "hidden--md"],
  ["MUTATION_DIGIT_SUFFIX", "hidden-md2"],
  ["MUTATION_TAILWIND_SM", "sm:hidden"],
  ["MUTATION_TAILWIND_XL", "xl:hidden"],
  ["MUTATION_NEGATED", "not-hidden"],
];

const tokenGroupValues = {
  class_tokens: classTokens.map(([label]) => tokenMarker(label)),
  token_mutations: mutationTokens.map(([label]) => tokenMarker(label)),
  attribute_locations: [
    "ATTR_ID_HIDDEN_MD",
    "ATTR_DATA_HIDDEN_MD",
    "ATTR_NAME_HIDDEN_MD",
    "ATTR_TITLE_HIDDEN_MD",
    "ATTR_ARIA_HIDDEN_MD",
    "ATTR_ID_NAVBAR",
    "ATTR_DATA_NAVBAR",
    "ATTR_ID_BREADCRUMB",
    "ATTR_DATA_BREADCRUMB",
    "ATTR_ID_BANNER",
    "ATTR_DATA_BANNER",
    "ATTR_ID_COOKIE_NOTICE",
    "ATTR_DATA_COOKIE_NOTICE",
  ].map(tokenMarker),
  element_types: [
    "TAG_DIV",
    "TAG_SPAN",
    "TAG_A",
    "TAG_NAV",
    "TAG_SECTION",
    "TAG_P",
    "TAG_BUTTON",
    "TAG_FORM",
    "TAG_HEADER",
    "TAG_FOOTER",
    "TAG_ASIDE",
    "TAG_MAIN",
    "TAG_UL",
    "TAG_LI",
  ].map(tokenMarker),
  interactions: [
    "INTERACTION_HIDDEN_MD_DISPLAY_BLOCK",
    "INTERACTION_HIDDEN_MD_DISPLAY_NONE",
    "INTERACTION_HIDDEN_DISPLAY_BLOCK",
    "INTERACTION_D_NONE_DISPLAY_BLOCK",
    "INTERACTION_NAVBAR_IN_MAIN",
    "INTERACTION_NAVBAR_OUTSIDE_MAIN",
    "INTERACTION_BREADCRUMB_SCHEMA",
    "INTERACTION_BREADCRUMB_PLAIN",
    "INTERACTION_BANNER_HEADER",
    "INTERACTION_BANNER_DIV",
  ].map(tokenMarker),
  position_controls: ["POS_10", "POS_25", "POS_50", "POS_75", "POS_95"].map(tokenMarker),
};

function TokenClassCases() {
  return (
    <>
      {classTokens.map(([label, className]) => (
        <div className={className} key={label}>
          {tokenMarker(label)}
        </div>
      ))}
    </>
  );
}

function TokenMutationCases() {
  return (
    <>
      {mutationTokens.map(([label, className]) => (
        <div className={className} key={label}>
          {tokenMarker(label)}
        </div>
      ))}
    </>
  );
}

function TokenAttributeCases() {
  return (
    <>
      <div id="hidden-md">{tokenMarker("ATTR_ID_HIDDEN_MD")}</div>
      <div data-token="hidden-md">{tokenMarker("ATTR_DATA_HIDDEN_MD")}</div>
      <button name="hidden-md" type="button">
        {tokenMarker("ATTR_NAME_HIDDEN_MD")}
      </button>
      <div title="hidden-md">{tokenMarker("ATTR_TITLE_HIDDEN_MD")}</div>
      {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: exact div/attribute placement is the calibration variable. */}
      <div aria-label="hidden-md">{tokenMarker("ATTR_ARIA_HIDDEN_MD")}</div>
      <div id="navbar">{tokenMarker("ATTR_ID_NAVBAR")}</div>
      <div data-token="navbar">{tokenMarker("ATTR_DATA_NAVBAR")}</div>
      <div id="breadcrumb">{tokenMarker("ATTR_ID_BREADCRUMB")}</div>
      <div data-token="breadcrumb">{tokenMarker("ATTR_DATA_BREADCRUMB")}</div>
      <div id="banner">{tokenMarker("ATTR_ID_BANNER")}</div>
      <div data-token="banner">{tokenMarker("ATTR_DATA_BANNER")}</div>
      <div id="cookie-notice">{tokenMarker("ATTR_ID_COOKIE_NOTICE")}</div>
      <div data-token="cookie-notice">{tokenMarker("ATTR_DATA_COOKIE_NOTICE")}</div>
    </>
  );
}

function TokenElementCases() {
  return (
    <>
      <div className="hidden-md">{tokenMarker("TAG_DIV")}</div>
      <span className="hidden-md">{tokenMarker("TAG_SPAN")}</span>
      <a className="hidden-md" href="/token-target/">
        {tokenMarker("TAG_A")}
      </a>
      <nav className="hidden-md">{tokenMarker("TAG_NAV")}</nav>
      <section className="hidden-md">{tokenMarker("TAG_SECTION")}</section>
      <p className="hidden-md">{tokenMarker("TAG_P")}</p>
      <button className="hidden-md" type="button">
        {tokenMarker("TAG_BUTTON")}
      </button>
      <form className="hidden-md">{tokenMarker("TAG_FORM")}</form>
      <header className="hidden-md">{tokenMarker("TAG_HEADER")}</header>
      <footer className="hidden-md">{tokenMarker("TAG_FOOTER")}</footer>
      <aside className="hidden-md">{tokenMarker("TAG_ASIDE")}</aside>
      <main className="hidden-md">{tokenMarker("TAG_MAIN")}</main>
      <ul className="hidden-md">
        <li>{tokenMarker("TAG_UL")}</li>
      </ul>
      <ul>
        <li className="hidden-md">{tokenMarker("TAG_LI")}</li>
      </ul>
    </>
  );
}

function TokenInteractionCases() {
  return (
    <>
      <div className="hidden-md" style={{ display: "block" }}>
        {tokenMarker("INTERACTION_HIDDEN_MD_DISPLAY_BLOCK")}
      </div>
      <div className="hidden-md" style={{ display: "none" }}>
        {tokenMarker("INTERACTION_HIDDEN_MD_DISPLAY_NONE")}
      </div>
      <div className="hidden" style={{ display: "block" }}>
        {tokenMarker("INTERACTION_HIDDEN_DISPLAY_BLOCK")}
      </div>
      <div className="d-none" style={{ display: "block" }}>
        {tokenMarker("INTERACTION_D_NONE_DISPLAY_BLOCK")}
      </div>
      <main>
        <div className="navbar">{tokenMarker("INTERACTION_NAVBAR_IN_MAIN")}</div>
      </main>
      <div className="navbar">{tokenMarker("INTERACTION_NAVBAR_OUTSIDE_MAIN")}</div>
      <nav className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
        {tokenMarker("INTERACTION_BREADCRUMB_SCHEMA")}
      </nav>
      <nav className="breadcrumb">{tokenMarker("INTERACTION_BREADCRUMB_PLAIN")}</nav>
      <header className="banner">{tokenMarker("INTERACTION_BANNER_HEADER")}</header>
      <div className="banner">{tokenMarker("INTERACTION_BANNER_DIV")}</div>
    </>
  );
}

function TokenMatrixPage() {
  return (
    <Document
      head={<title>Dense token semantics matrix</title>}
      body={
        <>
          <p>{sentinel(TOKEN_ID, "BODY_CONTROL")}</p>
          <Filler segment={1} />
          <p>{tokenMarker("POS_10")}</p>
          <TokenClassCases />
          <Filler segment={2} />
          <p>{tokenMarker("POS_25")}</p>
          <TokenMutationCases />
          <Filler segment={3} />
          <TokenAttributeCases />
          <Filler segment={4} />
          <p>{tokenMarker("POS_50")}</p>
          <TokenElementCases />
          <Filler segment={5} />
          <TokenInteractionCases />
          <Filler segment={6} />
          <p>{tokenMarker("POS_75")}</p>
          <Filler segment={7} />
          <p>{tokenMarker("POS_95")}</p>
          <Filler segment={8} />
        </>
      }
    />
  );
}

const channelLabels = {
  attributes: [
    "ATTR_DIV_TITLE",
    "ATTR_DIV_ARIA_LABEL",
    "ATTR_DIV_DATA",
    "ATTR_DIV_ID",
    "ATTR_DIV_CLASS",
    "ATTR_ABBR_TITLE",
    "ATTR_TIME_DATETIME",
    "ATTR_DATA_VALUE",
    "ATTR_INPUT_PLACEHOLDER",
    "ATTR_INPUT_VALUE",
    "ATTR_INPUT_NAME",
    "ATTR_TEXTAREA_PLACEHOLDER",
    "ATTR_BUTTON_ARIA_LABEL",
    "ATTR_BUTTON_VALUE",
    "ATTR_OPTION_VALUE",
    "ATTR_IMG_ALT",
    "ATTR_IMG_TITLE",
    "ATTR_IMG_SRC",
    "ATTR_ANCHOR_HREF",
    "ATTR_ANCHOR_TITLE",
    "ATTR_IFRAME_TITLE",
    "ATTR_IFRAME_SRC",
    "ATTR_OBJECT_DATA",
    "ATTR_EMBED_SRC",
    "ATTR_SOURCE_SRCSET",
    "ATTR_BLOCKQUOTE_CITE",
    "ATTR_DOWNLOAD_FILENAME",
    "ATTR_FORM_ACTION",
    "ATTR_BUTTON_FORMACTION",
    "ATTR_MICRODATA_CONTENT",
    "ATTR_RDFA_CONTENT",
    "ATTR_ITEMID",
  ],
  head: ["HEAD_TITLE", "HEAD_DESCRIPTION", "HEAD_OG_TITLE", "HEAD_CANONICAL", "HEAD_ALTERNATE"],
  css_source_only: [
    "CSS_BEFORE",
    "CSS_AFTER",
    "CSS_ATTR_CONTENT",
    "CSS_CUSTOM_PROPERTY",
    "CSS_BACKGROUND_URL",
    "CSS_FONT_FAMILY",
  ],
  source_only: [
    "SOURCE_COMMENT",
    "SOURCE_TEMPLATE",
    "SOURCE_APPLICATION_JSON",
    "SOURCE_JSON_LD",
    "SOURCE_EXECUTABLE_SCRIPT",
  ],
  position_controls: ["POS_10", "POS_25", "POS_50", "POS_75", "POS_95"],
};

const channelSentinelGroups = Object.fromEntries(
  Object.entries(channelLabels).map(([group, labels]) => [group, labels.map(channelMarker)]),
);

function ChannelAttributeCases() {
  const imgSrc = `/channel-image-${channelMarker("ATTR_IMG_SRC")}.png`;
  const href = `/channel-link/?marker=${channelMarker("ATTR_ANCHOR_HREF")}`;
  const iframeSrc = `/channel-frame/?marker=${channelMarker("ATTR_IFRAME_SRC")}`;
  const objectData = `/channel-object-${channelMarker("ATTR_OBJECT_DATA")}.html`;
  const embedSrc = `/channel-embed-${channelMarker("ATTR_EMBED_SRC")}.html`;
  const srcSet = `/channel-srcset-${channelMarker("ATTR_SOURCE_SRCSET")}.png 1x`;
  const cite = `/channel-cite/?marker=${channelMarker("ATTR_BLOCKQUOTE_CITE")}`;
  const formAction = `/channel-form/?marker=${channelMarker("ATTR_FORM_ACTION")}`;
  const formActionButton = `/channel-button/?marker=${channelMarker("ATTR_BUTTON_FORMACTION")}`;
  const itemId = `https://view-as-ai.vercel.app/entity/${channelMarker("ATTR_ITEMID")}`;

  return (
    <>
      <div title={channelMarker("ATTR_DIV_TITLE")}>neutral title control</div>
      {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: exact div/attribute placement is the calibration variable. */}
      <div aria-label={channelMarker("ATTR_DIV_ARIA_LABEL")}>neutral aria control</div>
      <div data-vai={channelMarker("ATTR_DIV_DATA")}>neutral data control</div>
      <div id={channelMarker("ATTR_DIV_ID")}>neutral id control</div>
      <div className={channelMarker("ATTR_DIV_CLASS")}>neutral class control</div>
      <abbr title={channelMarker("ATTR_ABBR_TITLE")}>abbr</abbr>
      <time dateTime={channelMarker("ATTR_TIME_DATETIME")}>neutral time</time>
      <data value={channelMarker("ATTR_DATA_VALUE")}>neutral data element</data>
      <input placeholder={channelMarker("ATTR_INPUT_PLACEHOLDER")} />
      <input value={channelMarker("ATTR_INPUT_VALUE")} readOnly />
      <input name={channelMarker("ATTR_INPUT_NAME")} />
      <textarea placeholder={channelMarker("ATTR_TEXTAREA_PLACEHOLDER")} />
      <button type="button" aria-label={channelMarker("ATTR_BUTTON_ARIA_LABEL")} />
      <button type="button" value={channelMarker("ATTR_BUTTON_VALUE")}>
        neutral button
      </button>
      <select defaultValue="neutral">
        <option value={channelMarker("ATTR_OPTION_VALUE")}>neutral option</option>
        <option value="neutral">selected neutral option</option>
      </select>
      <img alt={channelMarker("ATTR_IMG_ALT")} src="/fixture-pixel.png" />
      <img alt="neutral image" src="/fixture-pixel.png" title={channelMarker("ATTR_IMG_TITLE")} />
      <img alt="neutral source image" src={imgSrc} />
      <a href={href}>neutral link text</a>
      <a href="/channel-title/" title={channelMarker("ATTR_ANCHOR_TITLE")}>
        neutral titled link
      </a>
      <iframe src="/baseline/" title={channelMarker("ATTR_IFRAME_TITLE")} />
      <iframe src={iframeSrc} title="neutral frame" />
      <object data={objectData}>neutral object fallback</object>
      <embed src={embedSrc} />
      <picture>
        <source srcSet={srcSet} />
        <img alt="neutral srcset image" src="/fixture-pixel.png" />
      </picture>
      <blockquote cite={cite}>neutral quote</blockquote>
      <a download={channelMarker("ATTR_DOWNLOAD_FILENAME")} href="/fixture-pixel.png">
        neutral download
      </a>
      <form action={formAction}>
        <button type="submit">neutral form submit</button>
      </form>
      <form action="/channel-default-form/">
        <button formAction={formActionButton} type="submit">
          neutral alternate submit
        </button>
      </form>
      <meta itemProp="name" content={channelMarker("ATTR_MICRODATA_CONTENT")} />
      <span property="schema:name" content={channelMarker("ATTR_RDFA_CONTENT")}>
        neutral RDFa content
      </span>
      <div itemScope itemID={itemId}>
        neutral item id
      </div>
    </>
  );
}

function ChannelSourceCases() {
  const comment = channelMarker("SOURCE_COMMENT");
  const applicationJson = channelMarker("SOURCE_APPLICATION_JSON");
  const jsonLd = channelMarker("SOURCE_JSON_LD");
  const executable = channelMarker("SOURCE_EXECUTABLE_SCRIPT");
  return (
    <>
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: source-only calibration case.
        dangerouslySetInnerHTML={{ __html: `<!-- ${comment} -->` }}
      />
      <template>{channelMarker("SOURCE_TEMPLATE")}</template>
      <script type="application/json">{JSON.stringify({ marker: applicationJson })}</script>
      <script type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", marker: jsonLd })}
      </script>
      <script>{`const vaiMarker = ${JSON.stringify(executable)};`}</script>
    </>
  );
}

function ChannelMatrixPage() {
  const title = channelMarker("HEAD_TITLE");
  const before = channelMarker("CSS_BEFORE");
  const after = channelMarker("CSS_AFTER");
  const cssAttr = channelMarker("CSS_ATTR_CONTENT");
  const cssCustom = channelMarker("CSS_CUSTOM_PROPERTY");
  const cssBackground = channelMarker("CSS_BACKGROUND_URL");
  const cssFont = channelMarker("CSS_FONT_FAMILY");
  return (
    <Document
      head={
        <>
          <title>{title}</title>
          <meta name="description" content={channelMarker("HEAD_DESCRIPTION")} />
          <meta property="og:title" content={channelMarker("HEAD_OG_TITLE")} />
          <link
            rel="canonical"
            href={`https://view-as-ai.vercel.app/canonical/${channelMarker("HEAD_CANONICAL")}`}
          />
          <link
            rel="alternate"
            hrefLang="x-vai"
            href={`https://view-as-ai.vercel.app/alternate/${channelMarker("HEAD_ALTERNATE")}`}
          />
          <style>{`
            .chan-before::before { content: "${before}"; }
            .chan-after::after { content: "${after}"; }
            .chan-attr::before { content: attr(data-vai); }
            .chan-custom { --vai-marker: "${cssCustom}"; }
            .chan-background { background-image: url('/${cssBackground}.png'); }
            .chan-font { font-family: "${cssFont}", sans-serif; }
          `}</style>
        </>
      }
      body={
        <>
          <p>{sentinel(CHANNEL_ID, "BODY_CONTROL")}</p>
          <Filler segment={21} />
          <p>{channelMarker("POS_10")}</p>
          <ChannelAttributeCases />
          <Filler segment={22} />
          <p>{channelMarker("POS_25")}</p>
          <div className="chan-before">neutral before control</div>
          <div className="chan-after">neutral after control</div>
          <div className="chan-attr" data-vai={cssAttr}>
            neutral attr content control
          </div>
          <div className="chan-custom">neutral custom property control</div>
          <div className="chan-background">neutral background control</div>
          <div className="chan-font">neutral font control</div>
          <Filler segment={23} />
          <ChannelSourceCases />
          <Filler segment={24} />
          <p>{channelMarker("POS_50")}</p>
          <Filler segment={25} />
          <Filler segment={26} />
          <p>{channelMarker("POS_75")}</p>
          <Filler segment={27} />
          <p>{channelMarker("POS_95")}</p>
          <Filler segment={28} />
        </>
      }
    />
  );
}

export const denseMatrixRoutes: FixtureRoute[] = [
  {
    path: "/experiments/dense/token-semantics/",
    kind: "tsx",
    render: () => <TokenMatrixPage />,
    metadata: {
      phase: 10,
      source: "src/fixtures/dense-matrices.tsx",
      testIds: [TOKEN_ID],
      sentinels: { [TOKEN_ID]: sentinel(TOKEN_ID, "BODY_CONTROL") },
      sentinelGroups: tokenGroupValues,
      notes:
        "Dense 6k-word page testing class-token dictionaries, mutations, attribute placement, element type, and CSS/context interactions in one native capture.",
    },
  },
  {
    path: "/experiments/dense/non-text-channels/",
    kind: "tsx",
    render: () => <ChannelMatrixPage />,
    metadata: {
      phase: 10,
      source: "src/fixtures/dense-matrices.tsx",
      testIds: [CHANNEL_ID],
      sentinels: { [CHANNEL_ID]: sentinel(CHANNEL_ID, "BODY_CONTROL") },
      sentinelGroups: channelSentinelGroups,
      notes:
        "Dense 6k-word page testing values outside ordinary DOM text nodes: attributes, head metadata, CSS-generated/source-only content, and source-only script/comment channels.",
    },
  },
];
