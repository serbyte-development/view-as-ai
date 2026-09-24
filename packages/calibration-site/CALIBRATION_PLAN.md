# View as AI Calibration Plan

This file is the canonical test plan for the public calibration site at
`https://view-as-ai.vercel.app/`.

The purpose of the site is to answer a specific question with controlled evidence:

> What information does native ChatGPT web browsing expose to the model for a real public website,
> and which parts of that behavior can View as AI reproduce from origin HTML?

The site should not be built as a demo or a realistic marketing website. It is an experimental
fixture. Every route, element, class, repeated block, and deployment state should exist because it
tests a specific hypothesis.

## Evidence levels

Use these labels when documenting a behavior:

- **NV — Native verified:** current raw native `web.run` evidence exists in the active repository.
- **NH — Native historical:** observed during prior broad native calibration, but the large raw
  corpus is archived rather than active.
- **S — Synthetic only:** View as AI has a regression test or implementation for the behavior, but
  the active repository does not contain direct native evidence for that exact case.
- **U — Unknown:** no reliable controlled native conclusion yet.
- **B — Boundary:** intentionally outside the current stable View as AI runtime, but still useful to
  measure so the boundary is explicit.

A behavior can have more than one label. For example, a parser transformation can be **S** while
the broader native extraction rule around it remains **U**.

## What is known today

These are the strongest conclusions available before building the controlled fixture site.

### Fetch and rendering model

| Behavior | Status | Current understanding |
| --- | --- | --- |
| Origin HTML is a strong approximation of native input | NH | Broad calibration found direct HTTP origin HTML consistently closer to native output than browser-rendered DOM. |
| JavaScript rendering is generally not required for the stable runtime | NH/B | Browser rendering usually reduced resemblance during broad calibration. Client-only content remains an explicit boundary. |
| Native output can contain downstream semantic enrichment not present in origin HTML | NV | A Python docs capture exposed a semantic annotation for the keyword-only separator that was not literal origin text. |
| Exact Markdown/blank-line/reference-number parity is secondary to information presence | NH | Broad calibration showed exact layout parity overstated meaningful differences. |

### Active-content and document text

| Behavior | Status | Current understanding |
| --- | --- | --- |
| `script` text is excluded | S/NH | Implemented and regression tested; historically consistent with native captures. |
| `style` text is excluded | S/NH | Implemented and regression tested; historically consistent with native captures. |
| Math markup is currently removed | S | Implemented, but needs a controlled native fixture. |
| Unicode text and HTML entities survive | S | Implemented and regression tested. |
| Literal citation delimiters `【 】` are rewritten by View as AI | S | Formatter protection behavior; native behavior should be rechecked deliberately. |
| Malformed but parseable HTML remains readable | S | Local parser behavior is tested; native tolerance is not systematically mapped. |

### Forms and controls

| Behavior | Status | Current understanding |
| --- | --- | --- |
| Text input becomes an input marker | NV | Exact public form captures support input markers. |
| Input placeholder can be exposed | NV | Public form captures support placeholder text in the marker. |
| Input value is omitted | NV/NH | Observed during control calibration. |
| Checked state is omitted | NH | Observed during control calibration. |
| Hidden native input can still produce an input marker | NH | This corrected an earlier assumption that hidden controls were always removed. |
| Select becomes a generic select marker | NV/NH | Public control captures support the marker. |
| Select option text is omitted | NH | Observed during control calibration. |
| Text-only button uses visible button text | NV/NH | Supported by form/control captures. |
| ARIA label does not automatically replace visible button text | S/NH | Current implementation intentionally avoids inventing this rule. Needs controlled revalidation. |
| Complex button children may be exposed as their child content | S/NH | Implemented from prior observations, but should be isolated. |

### Links, images, iframes, and tables

| Behavior | Status | Current understanding |
| --- | --- | --- |
| Internal and external HTTP(S) links receive references | NV/S | Exact fixture output covers normal links; more edge cases are synthetic. |
| External references can include the source domain | NV/S | Seen in formatter behavior and fixtures. |
| Duplicate destinations can reuse one reference | S/NH | Implemented and synthetic-tested. |
| Relative URLs and `base href` resolution | S | Implemented locally; controlled native verification needed. |
| Fragment links can survive as references | S/NH | Historically observed; active direct fixture should be added. |
| Image labels primarily derive from title/alt | S/NH | Implemented from observed native behavior. |
| HTTP(S) image-only anchors can disappear | NH | Specifically observed on Serbyte and encoded in the parser. |
| Iframes can be represented as references rather than fetched body text | S/NH | Current formatter behavior; iframe-fetch behavior needs controlled verification. |
| Table cells retain boundaries | NV/S | Native fixture excerpts and regression tests support this. |
| A header-only first row can produce a separator | NV/S | Native table calibration supports this. |

### Pruning and boilerplate

The current pruner contains intentionally narrow rules derived from broad native observations. These
are valuable hypotheses, not proof that native extraction uses the same local selectors.

| Behavior | Status | Current understanding |
| --- | --- | --- |
| Explicit `role="navigation"` regions can be omitted | NH/S | Current pruner removes them. |
| Plain `<nav>` is not universally omitted | NH/S | Broad pruning of all nav was too destructive; current pruner keeps ordinary nav without stronger signals. |
| Breadcrumb regions can be omitted | NH/S | Current pruner recognizes breadcrumb labels/classes. |
| `role="complementary"` sidebars can be omitted | NH/S | Observed across article-like pages. |
| `role="contentinfo"` regions can be omitted | NH/S | One of the stronger cross-site pruning signals found in broad calibration. |
| Utility/secondary/contextual navigation can be omitted | NH/S | Current rules cover several explicit patterns. |
| Navbar-like chrome can be omitted while other nav remains | NH/S | Current bounded navbar rule comes from native comparisons. |
| Explicit carousel clones can be omitted | NH/S | Current pruner removes known framework clone classes. |
| Some preference/social widgets can be omitted | NH/S | Current rules are narrow and framework-specific. |
| Broad hidden-element pruning is unsafe | NH | Earlier broad hidden pruning removed legitimate native-visible information and was rolled back. |
| CSS class `hidden` alone does not justify removal | S/NH | Current regression intentionally preserves a plain hidden wrapper without a stronger signal. |

## Highest-value unknowns

The calibration site should prioritize these because they materially affect View as AI's core
architecture.

1. **Does native extraction use information from other pages on the same website to identify
   boilerplate?**
2. **If site-wide recurrence matters, what properties matter: exact text, DOM structure, semantic
   role, link destinations, placement, or repetition count?**
3. **Does native extraction evaluate CSS visibility, and if so, does it evaluate inline styles,
   embedded stylesheets, external stylesheets, media queries, or computed layout?**
4. **How do HTML hidden state, ARIA state, and visual hidden state interact?**
5. **Does native extraction execute JavaScript or consume any post-load DOM state?**
6. **Does native extraction fetch iframe documents, or only expose the iframe reference?**
7. **How much of `<head>` metadata is model-facing, and is it exposed as body text, tool metadata,
   or not at all?**
8. **Does native browsing consume JSON-LD/structured data even though it is inside script tags, and
   if so, is it surfaced literally or converted into semantic annotations?**
9. **Does native extraction deduplicate repeated content within a page?**
10. **What causes navigation/footer/sidebar/banner content to be retained versus removed?**
11. **Does visual layout or CSS ordering affect output order, or is output DOM ordered?**
12. **What are the page-size/truncation limits and which content is favored when limits are hit?**
13. **Which fetch-layer signals affect direct open behavior: redirects, status codes, robots,
    canonical tags, content type, charset, or response headers?**

## Experimental rules

### One variable at a time

Every important hypothesis needs a control and a treatment. Do not put two meaningful changes into
the same comparison unless the test is specifically about their interaction.

Bad:

```html
<nav role="navigation" style="display:none">...</nav>
```

That simultaneously tests tag semantics, ARIA role, and CSS visibility.

Better:

- plain `div` control;
- `nav` only;
- `role="navigation"` only;
- `display:none` only;
- explicit interaction test after the individual effects are known.

### Stable test IDs and sentinel text

Every test case must have:

- a stable test ID such as `VIS-001`;
- a unique sentinel string that cannot appear anywhere else;
- human-readable explanatory text outside the treatment when useful.

Recommended sentinel form:

```text
VAI_SENTINEL_VIS_001_DISPLAY_NONE_7QK2
```

The random-looking suffix reduces accidental collisions with generated labels or other tests.

Do not reuse sentinel text between routes.

### Positive and negative controls

Each test family should include:

- a plainly visible ordinary-text control that must survive;
- a clearly non-reading-content control such as `script` text that should not survive;
- the actual treatments being studied.

This makes a failed capture distinguishable from a real extraction result.

### Preserve raw native evidence

Use `capture/code-mode-prompt.md` for text-faithful native captures. The native result is the
oracle and must never be manually transcribed, paraphrased, omitted, or reordered. Incidental
text-file differences such as a terminal newline or CRLF/LF normalization are acceptable.

For every capture, record at least:

- deployed URL;
- Git commit/deployment version;
- UTC timestamp;
- raw native model-facing output;
- origin HTML fetched independently;
- View as AI output from that origin HTML;
- test manifest/version if the route contains multiple cases.

### Freshness and caching

When a fixture changes, do not treat a prior web result as evidence for the new deployment.

For experiments where caching could change the conclusion:

- use new unique sentinel values;
- record the deployment commit;
- verify the public origin contains the new sentinel before native capture;
- prefer a fresh ChatGPT conversation/session for each independent condition;
- avoid opening treatment sibling pages in the same conversation before the target unless that is
  itself the variable being tested.

### Separate extraction from formatting

Primary outcome:

- sentinel/content present or absent;
- content ordering;
- whether a reference exists;
- whether another page's content appears.

Secondary outcome:

- exact Markdown;
- heading depth;
- blank lines;
- reference numbering;
- table separator formatting.

Record formatting differences, but do not let them obscure an information-level conclusion.

## Site structure

The site should eventually contain four kinds of routes.

### 1. Baseline

`/baseline/`

A very small page containing only ordinary headings, paragraphs, links, an image, and basic form
controls. It verifies that the deployment and capture path are functioning before interpreting more
complex results.

### 2. Kitchen sink

`/kitchen-sink/`

A dense page that tests many independent, low-interaction HTML behaviors efficiently. This is the
first broad pass and should use stable sentinels for every case.

The kitchen sink is appropriate for:

- ordinary DOM semantics;
- common CSS visibility cases;
- basic controls;
- links/images;
- text/formatting elements;
- simple metadata;
- simple iframe references.

It is **not** authoritative for cases where neighboring tests could affect each other, page size
could cause truncation, or site-wide context is the variable.

### 3. Isolated experiments

`/experiments/<family>/<case>/`

Use one route per control/treatment when isolation matters. These pages should be extremely small.

Examples:

- `/experiments/visibility/display-none/`
- `/experiments/semantics/role-navigation/`
- `/experiments/javascript/client-inserted/`
- `/experiments/ordering/flex-order/`

### 4. Site-context experiments

`/site-context/<experiment>/...`

These use several pages and, in some cases, sequential deployments to determine whether native
extraction uses site-level recurrence or sibling-page information.

These experiments must be designed separately from the kitchen sink because adding all recurrence
conditions to one deployment can contaminate the variable being measured.

---

# Single-page test matrix

## TEXT — Basic document text and structure

- **TEXT-001:** plain paragraph.
- **TEXT-002:** adjacent inline text nodes.
- **TEXT-003:** adjacent block elements.
- **TEXT-004:** `br` line break.
- **TEXT-005:** `hr`.
- **TEXT-006:** headings `h1` through `h6`.
- **TEXT-007:** multiple `h1` elements.
- **TEXT-008:** `section` with and without heading.
- **TEXT-009:** `article`.
- **TEXT-010:** `address`.
- **TEXT-011:** `blockquote` and `cite`.
- **TEXT-012:** unordered list.
- **TEXT-013:** ordered list.
- **TEXT-014:** nested lists.
- **TEXT-015:** definition list.
- **TEXT-016:** `pre`.
- **TEXT-017:** inline `code`.
- **TEXT-018:** code inside `pre`.
- **TEXT-019:** emphasis tags `strong`, `b`, `em`, `i`.
- **TEXT-020:** `sup` and `sub`.
- **TEXT-021:** `mark`, `small`, `del`, `ins`, `s`.
- **TEXT-022:** HTML comments between words.
- **TEXT-023:** comments containing unique sentinel text.
- **TEXT-024:** `template` contents.
- **TEXT-025:** `noscript` contents.
- **TEXT-026:** `details` closed.
- **TEXT-027:** `details open`.
- **TEXT-028:** `summary`.
- **TEXT-029:** `dialog` without `open`.
- **TEXT-030:** `dialog open`.
- **TEXT-031:** empty elements around visible text.
- **TEXT-032:** whitespace-only nodes.
- **TEXT-033:** repeated spaces/tabs/newlines.

## VIS — Visibility and layout

This family is high priority because broad hidden-element assumptions were previously unreliable.

Test the same ordinary text block under each condition.

- **VIS-001:** no hiding, positive control.
- **VIS-002:** HTML `hidden` attribute.
- **VIS-003:** `style="display:none"`.
- **VIS-004:** CSS class with `display:none` in embedded `<style>`.
- **VIS-005:** CSS class with `display:none` in external stylesheet.
- **VIS-006:** `visibility:hidden`.
- **VIS-007:** `visibility:collapse`.
- **VIS-008:** `opacity:0`.
- **VIS-009:** `color:transparent`.
- **VIS-010:** `font-size:0`.
- **VIS-011:** zero width/height plus overflow hidden.
- **VIS-012:** `clip-path:inset(100%)`.
- **VIS-013:** classic screen-reader-only clipping pattern.
- **VIS-014:** absolute positioning far offscreen.
- **VIS-015:** transform far offscreen.
- **VIS-016:** `transform:scale(0)`.
- **VIS-017:** negative z-index behind another element.
- **VIS-018:** `content-visibility:hidden`.
- **VIS-019:** parent hidden, child attempts visible override.
- **VIS-020:** hidden ancestor with nested link/control.
- **VIS-021:** `display:contents`.
- **VIS-022:** overflow-clipped text beyond fixed height.
- **VIS-023:** text visually covered by another opaque element.
- **VIS-024:** media-query hidden at narrow viewport.
- **VIS-025:** media-query hidden at wide viewport.
- **VIS-026:** print-only content.
- **VIS-027:** CSS `::before` generated content.
- **VIS-028:** CSS `::after` generated content.
- **VIS-029:** Tailwind-style class name with no CSS definition.
- **VIS-030:** same class name with actual CSS hiding rule.
- **VIS-031:** ancestor with `opacity:0`.
- **VIS-032:** `opacity:0.001` as a near-invisible control.
- **VIS-033:** `filter:opacity(0)`.
- **VIS-034:** `visibility:hidden` on parent with child `visibility:visible`.
- **VIS-035:** zero width/height with `overflow:visible`.
- **VIS-036:** zero width/height with `overflow:hidden`.
- **VIS-037:** `max-height:0; overflow:hidden`.
- **VIS-038:** `max-width:0; overflow:hidden`.
- **VIS-039:** legacy `clip:rect(0 0 0 0)` absolute-positioned hiding.
- **VIS-040:** `clip-path:circle(0)`.
- **VIS-041:** `mask-image` that makes the element fully transparent.
- **VIS-042:** `text-indent:-9999px`.
- **VIS-043:** negative margin moves element completely outside the viewport.
- **VIS-044:** absolute `left:-10000px`.
- **VIS-045:** absolute `top:-10000px`.
- **VIS-046:** absolute `left:calc(100vw + 10000px)`.
- **VIS-047:** fixed positioning far offscreen.
- **VIS-048:** relative positioning far offscreen.
- **VIS-049:** `transform:translateX(-200vw)`.
- **VIS-050:** `transform:translateX(200vw)`.
- **VIS-051:** `transform:translateY(-200vh)`.
- **VIS-052:** `transform:translateY(200vh)`.
- **VIS-053:** `transform:translate3d(-200vw, -200vh, 0)`.
- **VIS-054:** individual `translate:-200vw 0` property.
- **VIS-055:** individual `scale:0` property.
- **VIS-056:** `transform:rotate(180deg)` visible transform control.
- **VIS-057:** `transform:scale(0.001)` near-zero control.
- **VIS-058:** offscreen transformed child inside `overflow:hidden` parent.
- **VIS-059:** offscreen transformed child inside `overflow:visible` parent.
- **VIS-060:** `position:sticky` ordinary visible control.
- **VIS-061:** `position:fixed` ordinary visible control.
- **VIS-062:** element fully obscured by higher z-index opaque sibling.
- **VIS-063:** `pointer-events:none` visible control.
- **VIS-064:** `user-select:none` visible control.
- **VIS-065:** `content-visibility:auto` far below initial viewport.
- **VIS-066:** `contain:layout paint` visible control.
- **VIS-067:** HTML `hidden` overridden by author CSS `display:block !important`.
- **VIS-068:** `display:none !important` overriding an inline/display rule.
- **VIS-069:** conflicting CSS rules where the later rule makes content visible.
- **VIS-070:** conflicting CSS rules where the later rule hides content.
- **VIS-071:** CSS custom property resolves to `display:none`.
- **VIS-072:** external stylesheet loaded through `@import` hides content.
- **VIS-073:** stylesheet `media="print"` hides/shows unique content.
- **VIS-074:** stylesheet `media="screen"` hides/shows unique content.
- **VIS-075:** `@supports` condition applies a hiding rule.

### VIS-TIME — Transitions, animations, and time-dependent CSS

These must use isolated routes. They are timing-sensitive and should not be mixed into the kitchen
sink because a capture at an unknown instant can produce misleading conclusions.

- **VIS-076:** `transition` property present but no state change, visible control.
- **VIS-077:** element statically offscreen with a transition declared, but no trigger occurs.
- **VIS-078:** element statically `opacity:0` with an opacity transition declared, but no trigger occurs.
- **VIS-079:** zero-duration CSS animation ends at `opacity:0` with `animation-fill-mode:forwards`.
- **VIS-080:** zero-duration CSS animation ends at `opacity:1` from an initially transparent state.
- **VIS-081:** zero-duration CSS animation ends translated far offscreen.
- **VIS-082:** zero-duration CSS animation ends translated onscreen from an initially offscreen state.
- **VIS-083:** one-second animation from visible to `opacity:0`, forwards fill.
- **VIS-084:** one-second animation from `opacity:0` to visible, forwards fill.
- **VIS-085:** one-second animation from onscreen to far offscreen.
- **VIS-086:** one-second animation from far offscreen to onscreen.
- **VIS-087:** animation with a long delay before hiding.
- **VIS-088:** animation with negative delay so capture begins partway through the timeline.
- **VIS-089:** infinite alternating visible/transparent animation.
- **VIS-090:** infinite alternating onscreen/offscreen translation.
- **VIS-091:** `prefers-reduced-motion` changes whether hiding animation runs.

For VIS-083 through VIS-091, capture multiple fresh runs and record the native result time. These
cases are intended to determine whether the browsing pipeline reads source HTML, computed style at
one instant, a rendered snapshot after a fixed wait, or something else. A single capture is not
enough evidence for a timing-sensitive conclusion.

### VIS-STATE — CSS state and pseudo-class visibility

These help determine whether the browsing environment creates interactive state.

- **VIS-092:** content hidden by default and revealed by `:hover`.
- **VIS-093:** content visible by default and hidden by `:hover`.
- **VIS-094:** content hidden by default and revealed by `:focus`.
- **VIS-095:** content hidden by default and revealed by `:focus-within`.
- **VIS-096:** content hidden by default and revealed by `:target`.
- **VIS-097:** same `:target` page opened with the matching URL fragment.
- **VIS-098:** checkbox-driven CSS disclosure using `:checked`, unchecked initial state.
- **VIS-099:** checkbox-driven CSS disclosure with `checked` attribute in origin HTML.
- **VIS-100:** `:has()` rule hides a parent based on a static descendant.

### VIS-VIEWPORT — Viewport and responsive geometry

Responsive tests need paired rules whose only difference is breakpoint or viewport-relative
geometry. The actual browsing viewport, if any, is currently unknown.

- **VIS-101:** `@media (max-width: 320px)`.
- **VIS-102:** `@media (max-width: 768px)`.
- **VIS-103:** `@media (min-width: 769px)`.
- **VIS-104:** `@media (min-width: 1280px)`.
- **VIS-105:** portrait orientation query.
- **VIS-106:** landscape orientation query.
- **VIS-107:** `100vh` spacer places sentinel just below first viewport.
- **VIS-108:** `500vh` spacer places sentinel far below first viewport.
- **VIS-109:** `100vw` horizontal overflow places sentinel outside initial horizontal viewport.
- **VIS-110:** container-query rule hides a child based on a controlled container width.

For external CSS tests, use identical DOM to the inline/embedded variants. This can reveal whether
native extraction actually fetches/applies CSS or reacts only to markup/class heuristics.

For positional tests, distinguish **outside the initial viewport** from **actually clipped away**.
For example, an absolutely positioned element at `left:-10000px` is still part of the document and
may remain paintable in an expanded canvas, while the same element inside an
`overflow:hidden` container is genuinely clipped. We need both cases.

Also compare equivalent hiding through:

- inline `style`;
- embedded stylesheet;
- external stylesheet;
- external stylesheet through `@import`;
- inherited/ancestor state;
- CSS custom properties;
- cascade/`!important`.

If native results differ between equivalent computed styles produced through different mechanisms,
that is evidence that the pipeline may be using source-level heuristics rather than a complete
computed-style/rendering model.

## SEM — Semantic HTML, ARIA, and landmarks

Use identical sentinel blocks while changing only the element/role/attribute under test.

- **SEM-001:** plain `div`.
- **SEM-002:** `header`.
- **SEM-003:** `nav`.
- **SEM-004:** plain `div role="navigation"`.
- **SEM-005:** `nav role="navigation"`.
- **SEM-006:** `main`.
- **SEM-007:** `article`.
- **SEM-008:** `aside`.
- **SEM-009:** `aside role="complementary"`.
- **SEM-010:** `footer`.
- **SEM-011:** `footer role="contentinfo"`.
- **SEM-012:** `div role="banner"`.
- **SEM-013:** `header role="banner"`.
- **SEM-014:** `role="search"`.
- **SEM-015:** `role="menu"`.
- **SEM-016:** `role="menubar"`.
- **SEM-017:** `role="dialog"`.
- **SEM-018:** `role="alert"`.
- **SEM-019:** `role="status"`.
- **SEM-020:** `aria-hidden="true"`.
- **SEM-021:** `aria-hidden="false"`.
- **SEM-022:** hidden ancestor plus `aria-hidden="false"` child.
- **SEM-023:** `aria-label` on textless element.
- **SEM-024:** `aria-label` conflicting with visible text.
- **SEM-025:** `aria-labelledby` pointing to visible label.
- **SEM-026:** `aria-describedby`.
- **SEM-027:** `aria-expanded="false"` disclosure content still in DOM.
- **SEM-028:** `aria-expanded="true"`.
- **SEM-029:** `aria-controls`.
- **SEM-030:** `aria-current="page"`.
- **SEM-031:** `inert`.
- **SEM-032:** `contenteditable`.
- **SEM-033:** `tabindex="-1"`.
- **SEM-034:** breadcrumb via `aria-label="Breadcrumb"`.
- **SEM-035:** breadcrumb class only.
- **SEM-036:** breadcrumb text only, no semantic hint.

## BOIL — Common boilerplate/chrome patterns on one page

These test whether local signals are sufficient before introducing site-wide recurrence.

- **BOIL-001:** ordinary primary navigation.
- **BOIL-002:** navigation with `class="navbar"`.
- **BOIL-003:** navigation with `aria-label="Primary"`.
- **BOIL-004:** navigation with `aria-label="Utility"`.
- **BOIL-005:** `utility-nav` class.
- **BOIL-006:** `secondary-navigation-menu-items` class.
- **BOIL-007:** related-navigation class.
- **BOIL-008:** contextual-sidebar class.
- **BOIL-009:** contextual-footer class.
- **BOIL-010:** promo/banner class outside main.
- **BOIL-011:** same banner class inside main.
- **BOIL-012:** site alert/banner with important unique content.
- **BOIL-013:** cookie notice.
- **BOIL-014:** newsletter signup.
- **BOIL-015:** social link list.
- **BOIL-016:** framework social-widget class.
- **BOIL-017:** skip link.
- **BOIL-018:** search-only utility bar.
- **BOIL-019:** search form inside main.
- **BOIL-020:** language switcher.
- **BOIL-021:** theme switcher.
- **BOIL-022:** related-content links.
- **BOIL-023:** table of contents.
- **BOIL-024:** pagination.
- **BOIL-025:** author box.
- **BOIL-026:** tags/categories.
- **BOIL-027:** share buttons.
- **BOIL-028:** comments section.
- **BOIL-029:** copyright footer.
- **BOIL-030:** footer containing unique substantive text.

## CTRL — Forms and controls

- **CTRL-001:** text input, no placeholder/value.
- **CTRL-002:** text input with placeholder.
- **CTRL-003:** text input with value.
- **CTRL-004:** text input with placeholder and value.
- **CTRL-005:** password input.
- **CTRL-006:** email input.
- **CTRL-007:** search input.
- **CTRL-008:** number input.
- **CTRL-009:** date input.
- **CTRL-010:** file input.
- **CTRL-011:** hidden input.
- **CTRL-012:** checkbox unchecked.
- **CTRL-013:** checkbox checked.
- **CTRL-014:** radio unchecked.
- **CTRL-015:** radio checked.
- **CTRL-016:** disabled input.
- **CTRL-017:** readonly input.
- **CTRL-018:** input with associated `label for`.
- **CTRL-019:** input wrapped by `label`.
- **CTRL-020:** text-only button.
- **CTRL-021:** empty button with `aria-label`.
- **CTRL-022:** button containing span text.
- **CTRL-023:** button containing image.
- **CTRL-024:** submit input.
- **CTRL-025:** select with one option.
- **CTRL-026:** select with selected option.
- **CTRL-027:** multiple select.
- **CTRL-028:** textarea with initial text.
- **CTRL-029:** fieldset/legend.
- **CTRL-030:** datalist.
- **CTRL-031:** output.
- **CTRL-032:** progress.
- **CTRL-033:** meter.
- **CTRL-034:** form inside hidden wrapper.
- **CTRL-035:** form inside `role="search"`.

## LINK — Links and URL resolution

- **LINK-001:** relative same-origin link.
- **LINK-002:** absolute same-origin link.
- **LINK-003:** external HTTP(S) link.
- **LINK-004:** protocol-relative link.
- **LINK-005:** fragment link.
- **LINK-006:** query-only link.
- **LINK-007:** empty href.
- **LINK-008:** no href.
- **LINK-009:** duplicate destination, same label.
- **LINK-010:** duplicate destination, different label.
- **LINK-011:** same label, different destinations.
- **LINK-012:** nested inline markup in anchor.
- **LINK-013:** block elements inside anchor.
- **LINK-014:** code inside anchor.
- **LINK-015:** textless anchor.
- **LINK-016:** `aria-label` only anchor.
- **LINK-017:** image-only HTTP(S) anchor.
- **LINK-018:** image plus visible text anchor.
- **LINK-019:** `mailto:` text link.
- **LINK-020:** `mailto:` image-only link.
- **LINK-021:** `tel:` text link.
- **LINK-022:** `tel:` image link.
- **LINK-023:** `javascript:` link.
- **LINK-024:** `data:` link.
- **LINK-025:** malformed href.
- **LINK-026:** `target="_blank"`.
- **LINK-027:** `rel="nofollow"`.
- **LINK-028:** `rel="sponsored"`.
- **LINK-029:** `download`.
- **LINK-030:** alternate `hreflang`.
- **LINK-031:** valid `base href`.
- **LINK-032:** invalid `base href`.
- **LINK-033:** external `base href`.

## IMG — Images and visual media

- **IMG-001:** image with alt.
- **IMG-002:** image with title.
- **IMG-003:** image with title and conflicting alt.
- **IMG-004:** image with empty alt.
- **IMG-005:** image without alt/title.
- **IMG-006:** relative image URL.
- **IMG-007:** external image URL.
- **IMG-008:** duplicate image URL with different alt.
- **IMG-009:** `loading="lazy"`.
- **IMG-010:** width/height zero attributes.
- **IMG-011:** hidden image with meaningful alt.
- **IMG-012:** hidden decorative image with empty alt.
- **IMG-013:** `picture` with source and img fallback.
- **IMG-014:** `srcset`.
- **IMG-015:** inline SVG with text.
- **IMG-016:** inline SVG with title/desc.
- **IMG-017:** external SVG through img.
- **IMG-018:** figure plus figcaption.
- **IMG-019:** canvas fallback text.
- **IMG-020:** video with fallback text.
- **IMG-021:** audio with fallback text.

## FRAME — Embedded documents/resources

- **FRAME-001:** same-origin iframe with title.
- **FRAME-002:** same-origin iframe without title.
- **FRAME-003:** cross-origin iframe with title.
- **FRAME-004:** iframe with fallback body text.
- **FRAME-005:** hidden iframe.
- **FRAME-006:** iframe pointing to a page with a unique sentinel; determine whether child body text is
  fetched or only the frame reference is exposed.
- **FRAME-007:** `object` with fallback content.
- **FRAME-008:** `embed`.

## TABLE — Tables

- **TABLE-001:** header row plus body.
- **TABLE-002:** no header row.
- **TABLE-003:** row headers.
- **TABLE-004:** `thead/tbody/tfoot`.
- **TABLE-005:** caption.
- **TABLE-006:** empty cells.
- **TABLE-007:** colspan.
- **TABLE-008:** rowspan.
- **TABLE-009:** nested inline markup in cells.
- **TABLE-010:** links/images in cells.
- **TABLE-011:** nested table.
- **TABLE-012:** malformed table markup.
- **TABLE-013:** visually hidden header cells.
- **TABLE-014:** `scope` attributes.

## HEAD — Head metadata and document metadata

For these tests, capture the full native tool result if possible, not only visible body text. Some
metadata may be exposed outside the model-facing body.

- **HEAD-001:** document title.
- **HEAD-002:** title absent.
- **HEAD-003:** meta description.
- **HEAD-004:** meta keywords.
- **HEAD-005:** meta author.
- **HEAD-006:** canonical URL.
- **HEAD-007:** robots `index,follow`.
- **HEAD-008:** robots `noindex`.
- **HEAD-009:** robots `nofollow`.
- **HEAD-010:** Open Graph title/description.
- **HEAD-011:** Twitter card metadata.
- **HEAD-012:** JSON-LD presence smoke test with unique sentinel values.
- **HEAD-013:** microdata in body.
- **HEAD-014:** RDFa in body.
- **HEAD-015:** alternate language links.
- **HEAD-016:** favicon/icon metadata.
- **HEAD-017:** meta refresh.

## JSONLD — JSON-LD and structured-data extraction

This family needs its own isolated block because View as AI currently removes all `<script>`
content before formatting. If native browsing consumes `application/ld+json`, that would be a
meaningful architectural difference rather than a formatting detail.

Primary questions:

- Is JSON-LD ignored completely?
- Is raw JSON-LD text exposed directly?
- Is selected JSON-LD content converted into readable/model-facing text?
- Is JSON-LD used only as hidden semantic context or metadata?
- Does schema type affect whether it is consumed?
- Does native output prefer visible page text when it conflicts with JSON-LD?
- Are URLs/entities from JSON-LD turned into references?

### JSONLD-BASIC — Presence and syntax

- **JSONLD-001:** no JSON-LD, positive body-text control.
- **JSONLD-002:** one valid `<script type="application/ld+json">` containing a unique sentinel in
  a plain custom property.
- **JSONLD-003:** same JSON object inside ordinary `<script type="application/json">`.
- **JSONLD-004:** same JSON object inside ordinary executable `<script>` as a string literal.
- **JSONLD-005:** JSON-LD in `<head>`.
- **JSONLD-006:** JSON-LD in `<body>`.
- **JSONLD-007:** two JSON-LD script blocks.
- **JSONLD-008:** whitespace/minified JSON-LD versus pretty-printed equivalent.
- **JSONLD-009:** malformed JSON-LD.
- **JSONLD-010:** syntactically valid JSON without `@context` or `@type`.
- **JSONLD-011:** JSON-LD with `@context: "https://schema.org"` and no type-specific fields.
- **JSONLD-012:** JSON-LD using an `@graph`.
- **JSONLD-013:** nested objects and arrays containing unique sentinels at multiple depths.
- **JSONLD-014:** JSON-LD containing Unicode, HTML entities-as-strings, and literal markup-like text.
- **JSONLD-015:** JSON-LD containing a very long string value.

### JSONLD-TYPES — Common schema.org entity types

Each schema should contain one value that also appears visibly in the page and one value that exists
only in JSON-LD. This lets us tell whether the structured data contributes new model-facing
information.

- **JSONLD-016:** `WebSite`.
- **JSONLD-017:** `WebPage`.
- **JSONLD-018:** `Organization`.
- **JSONLD-019:** `LocalBusiness`.
- **JSONLD-020:** `Person`.
- **JSONLD-021:** `Article`.
- **JSONLD-022:** `NewsArticle`.
- **JSONLD-023:** `BlogPosting`.
- **JSONLD-024:** `Product`.
- **JSONLD-025:** `Offer`.
- **JSONLD-026:** `AggregateRating`.
- **JSONLD-027:** `Review`.
- **JSONLD-028:** `FAQPage`.
- **JSONLD-029:** `HowTo`.
- **JSONLD-030:** `BreadcrumbList`.
- **JSONLD-031:** `ItemList`.
- **JSONLD-032:** `Event`.
- **JSONLD-033:** `JobPosting`.
- **JSONLD-034:** `SoftwareApplication`.
- **JSONLD-035:** `VideoObject`.
- **JSONLD-036:** `ImageObject`.

The purpose is not to exhaust schema.org. These types cover common classes where a browsing system
might plausibly extract useful factual structure.

### JSONLD-CONFLICT — Structured data versus visible content

These are high-value tests because they reveal whether JSON-LD can influence what the model sees
without being literal rendered text.

- **JSONLD-037:** visible title and JSON-LD `name` are identical.
- **JSONLD-038:** visible title and JSON-LD `name` deliberately conflict.
- **JSONLD-039:** visible price and JSON-LD price are identical.
- **JSONLD-040:** visible price and JSON-LD price deliberately conflict.
- **JSONLD-041:** visible address and JSON-LD address conflict.
- **JSONLD-042:** visible phone number and JSON-LD telephone conflict.
- **JSONLD-043:** visible rating and JSON-LD aggregate rating conflict.
- **JSONLD-044:** visible FAQ answer and JSON-LD FAQ answer conflict.
- **JSONLD-045:** JSON-LD contains a unique fact that has no visible counterpart anywhere in the
  document.
- **JSONLD-046:** body contains a unique fact that is absent from JSON-LD.

Do not infer precedence from a conversational answer alone. The native page capture must faithfully
show whether the conflicting structured value entered the model-facing page representation.

### JSONLD-URL — URLs and entity references

- **JSONLD-047:** same-origin `url`.
- **JSONLD-048:** external `url`.
- **JSONLD-049:** `sameAs` array with external URLs.
- **JSONLD-050:** `image` URL.
- **JSONLD-051:** `logo` URL.
- **JSONLD-052:** `mainEntityOfPage`.
- **JSONLD-053:** nested `offers.url`.
- **JSONLD-054:** URL appearing only in JSON-LD and nowhere in DOM links.

Check separately whether:

- the URL text appears;
- it becomes a numbered native reference;
- its hostname appears;
- it remains entirely absent.

### JSONLD-VISIBILITY — Interaction with script/DOM treatment

- **JSONLD-055:** JSON-LD script nested in `display:none` container.
- **JSONLD-056:** JSON-LD script nested in element with HTML `hidden`.
- **JSONLD-057:** JSON-LD script nested in `aria-hidden="true"`.
- **JSONLD-058:** JSON-LD inserted into the DOM by JavaScript after load.
- **JSONLD-059:** existing JSON-LD modified by JavaScript after load.
- **JSONLD-060:** JSON-LD removed by JavaScript after load.

These distinguish source-HTML parsing from post-load DOM inspection.

### JSONLD-MULTI — Multiple schemas, references, and deduplication

- **JSONLD-061:** independent `Organization` and `WebPage` scripts.
- **JSONLD-062:** one `@graph` containing multiple typed nodes.
- **JSONLD-063:** two schemas repeat the same unique fact.
- **JSONLD-064:** two schemas contain conflicting values for the same conceptual field.
- **JSONLD-065:** entities linked using `@id`.
- **JSONLD-066:** `@id` references another node in the same graph.
- **JSONLD-067:** repeated identical JSON-LD block twice.
- **JSONLD-068:** repeated near-identical JSON-LD blocks differing by one unique sentinel.

### JSONLD-SIZE — Structured-data size limits

Keep these isolated from the ordinary large-page tests.

- **JSONLD-069:** tiny schema, less than 1 KB.
- **JSONLD-070:** approximately 10 KB schema.
- **JSONLD-071:** approximately 100 KB schema.
- **JSONLD-072:** large `ItemList` with many entries.
- **JSONLD-073:** large `@graph` with many entities.
- **JSONLD-074:** unique sentinel only near the beginning of a large schema.
- **JSONLD-075:** unique sentinel only near the end of a large schema.

### JSONLD-MICRODATA — Equivalent structured-data encodings

For a few representative entities, encode the same facts three ways:

1. JSON-LD;
2. schema.org microdata;
3. RDFa.

Suggested paired cases:

- **JSONLD-076:** Organization JSON-LD versus microdata versus RDFa.
- **JSONLD-077:** Product/Offer JSON-LD versus microdata versus RDFa.
- **JSONLD-078:** BreadcrumbList JSON-LD versus visible breadcrumb markup/microdata.
- **JSONLD-079:** FAQPage JSON-LD versus visible FAQ + microdata.

This can reveal whether native browsing has a general structured-data layer or special treatment for
JSON-LD specifically.

### JSONLD capture requirements

For every JSON-LD case, preserve four separate artifacts/observations:

1. exact origin HTML;
2. exact raw native `web.run` model-facing output;
3. View as AI output from that origin HTML;
4. a machine-readable manifest listing the sentinel values that exist only in JSON-LD versus those
   repeated visibly in the body.

If a JSON-LD-only sentinel appears in native model-facing output, immediately follow up with an
isolated minimal route before changing View as AI. That result would imply native extraction has a
structured-data path that our current unconditional script removal does not reproduce.

## ACTIVE — Script and client-side behavior

Keep these routes isolated so JavaScript behavior does not contaminate baseline pages.

- **ACTIVE-001:** inline script containing sentinel only in source.
- **ACTIVE-002:** external script containing sentinel only in source.
- **ACTIVE-003:** inline script inserts sentinel immediately.
- **ACTIVE-004:** script inserts sentinel on `DOMContentLoaded`.
- **ACTIVE-005:** script inserts sentinel with zero-delay timeout.
- **ACTIVE-006:** script inserts sentinel after 1 second.
- **ACTIVE-007:** script modifies existing visible sentinel.
- **ACTIVE-008:** script removes existing sentinel.
- **ACTIVE-009:** script changes `display:none` to visible.
- **ACTIVE-010:** script changes visible content to hidden.
- **ACTIVE-011:** `document.write`.
- **ACTIVE-012:** script fetches same-origin JSON and inserts result.
- **ACTIVE-013:** custom element with light DOM only.
- **ACTIVE-014:** custom element attaches shadow DOM containing sentinel.
- **ACTIVE-015:** declarative shadow DOM if supported by origin markup.
- **ACTIVE-016:** SPA-style client route content with empty initial shell.
- **ACTIVE-017:** `noscript` paired with client-rendered equivalent.

## ORDER — DOM order versus visual/accessibility order

- **ORDER-001:** ordinary DOM order control.
- **ORDER-002:** flexbox `order` reverses visible order.
- **ORDER-003:** `flex-direction:row-reverse`.
- **ORDER-004:** CSS grid placement changes visual order.
- **ORDER-005:** absolute positioning reverses visual positions.
- **ORDER-006:** `direction:rtl`.
- **ORDER-007:** positive tabindex order differs from DOM.
- **ORDER-008:** `aria-flowto`.
- **ORDER-009:** visually fixed/sticky header appears after main in DOM.

## DUP — Duplication and within-page boilerplate

- **DUP-001:** identical paragraph twice.
- **DUP-002:** identical paragraph ten times.
- **DUP-003:** identical linked block twice.
- **DUP-004:** identical navigation block twice.
- **DUP-005:** visible carousel item plus exact clone.
- **DUP-006:** clone with `slick-cloned`.
- **DUP-007:** clone with `swiper-slide-duplicate`.
- **DUP-008:** near-duplicate blocks differing by one word.
- **DUP-009:** repeated wrapper with unique child sentinel.
- **DUP-010:** repeated text once in header and once in main.
- **DUP-011:** repeated text once in footer and once in main.

## I18N — Unicode, language, and text normalization

- **I18N-001:** Latin accented text.
- **I18N-002:** CJK.
- **I18N-003:** Arabic with `dir="rtl"`.
- **I18N-004:** Hebrew.
- **I18N-005:** emoji.
- **I18N-006:** non-breaking spaces.
- **I18N-007:** zero-width space.
- **I18N-008:** soft hyphen.
- **I18N-009:** combining Unicode sequence versus precomposed character.
- **I18N-010:** bidi control characters.
- **I18N-011:** literal `【】` and `†`.
- **I18N-012:** HTML named/numeric entities.
- **I18N-013:** page `lang` differing from content language.

## MAL — Parser/error tolerance

- **MAL-001:** unclosed paragraph.
- **MAL-002:** unclosed anchor.
- **MAL-003:** invalid nesting.
- **MAL-004:** duplicate IDs.
- **MAL-005:** duplicate attributes.
- **MAL-006:** invalid URL attribute.
- **MAL-007:** XML declaration before HTML.
- **MAL-008:** XHTML syntax.
- **MAL-009:** unknown/custom elements.
- **MAL-010:** text outside body.
- **MAL-011:** multiple body tags.
- **MAL-012:** multiple title tags.

## SIZE — Large-page behavior and truncation

Do not mix these into the main kitchen sink. Each must be isolated.

- **SIZE-001:** sentinel at beginning, middle, and end of a moderately long page.
- **SIZE-002:** same at 25 KB text.
- **SIZE-003:** same at 100 KB text.
- **SIZE-004:** same at 500 KB text.
- **SIZE-005:** large navigation followed by small main content.
- **SIZE-006:** small navigation followed by large main content.
- **SIZE-007:** large code block.
- **SIZE-008:** large table.
- **SIZE-009:** hundreds of links.
- **SIZE-010:** hundreds of images.
- **SIZE-011:** large repeated boilerplate plus small unique article.

The goal is to find information-loss thresholds and whether truncation favors particular regions.

---

# Site-wide and cross-page test matrix

This is the most important later phase because it can determine whether View as AI needs any notion
of site context rather than purely page-local pruning.

## SITE-BASE — Establish the page-local baseline

Create a target page containing:

- unique header sentinel;
- unique nav sentinel;
- unique main sentinel;
- unique sidebar sentinel;
- unique footer sentinel.

Capture native output before adding any sibling pages that repeat those blocks.

This establishes what happens when every block is unique to one page.

## SITE-COUNT — Does repetition count change trimming?

Use the same target page structure across sequential controlled deployments.

Repeat the exact same nav/footer/sidebar block on:

1. target only;
2. target + 1 sibling;
3. target + 2 siblings;
4. target + 4 siblings;
5. target + 9 siblings.

Capture the target after each deployment.

Questions:

- Is there a threshold where repeated content starts disappearing?
- Does header/nav/footer/sidebar behave differently?
- Is exact text repetition required?

## SITE-TEXT — Exact text versus structural repetition

Compare:

- same markup + same text across pages;
- same markup + different text;
- different markup + same text;
- same links/destinations + different labels;
- same labels + different link destinations.

This separates textual deduplication from template/DOM recognition.

## SITE-REGION — Does repeated location/landmark matter?

Repeat the same sentinel-bearing block across pages as:

- `header`;
- `nav`;
- ordinary `div` before main;
- `aside`;
- ordinary `div` after main;
- `footer`;
- inside `main`;
- `role="navigation"`;
- `role="complementary"`;
- `role="contentinfo"`.

The main-content variant is particularly important: if identical text is preserved in main but
removed in footer, region semantics likely matter independently of recurrence.

## SITE-UNIQUE-CHILD — Unique content inside repeated wrappers

Create a repeated site-wide footer/nav wrapper whose majority is identical but each page contains
one unique item.

Test whether native output:

- drops the whole wrapper;
- keeps only the unique child;
- keeps the entire wrapper because part is unique.

Variants:

- unique plain text;
- unique link;
- unique heading;
- unique alert/status message.

This directly tests how dangerous container-level pruning is.

## SITE-NAV-LINKAGE — Does discoverability matter?

Compare sibling pages that are:

- linked from the target's nav;
- linked only from another sibling;
- present in sitemap only;
- completely unlinked but directly reachable;
- marked `noindex`;
- excluded by robots if direct open still permits capture.

If site context exists, this can reveal how sibling pages enter that context.

## SITE-TEMPLATE — Shared layout versus copied text

Create two sets of pages:

- generated from one shared TSX layout component;
- generated independently but producing byte-identical HTML.

The HTTP output is what native systems can observe. If behavior differs, there is likely some
deployment/caching confound because source-component identity is not public.

This serves as a sanity check against attributing invisible implementation details to native
behavior.

## SITE-CLASS — Local class signals versus recurrence

Repeat identical blocks with:

- neutral class names;
- `navbar`;
- `breadcrumb`;
- `utility-nav`;
- `related-navigation`;
- `contextual-sidebar`;
- `banner`.

Run each both unique-to-one-page and repeated site-wide.

This can distinguish:

- class/token heuristics;
- recurrence heuristics;
- interactions between the two.

## SITE-CHANGE — Before/after deployment experiment

For the strongest recurrence test:

1. deploy target page with a block unique to that page;
2. verify and capture target;
3. deploy several siblings repeating the exact block without changing target HTML;
4. verify target origin bytes are unchanged;
5. capture target again in a fresh session.

If the target output changes while target HTML is byte-identical, that is strong evidence for a
cross-page or external-state signal.

Potential confounders:

- native fetch caches;
- search/crawl indexes updating on a different schedule;
- Vercel/CDN caching;
- nondeterministic provider extraction.

Therefore repeat the experiment, use new sentinel families, and record timing.

## SITE-CONVERSATION — Session context versus site context

Use identical deployments with fresh ChatGPT sessions:

- capture target directly;
- open siblings first, then target in the same conversation;
- capture target in a fresh conversation after siblings have been opened elsewhere.

This can distinguish session/tool context from server-side site-level extraction.

Do not mix these observations into normal calibration until the effect is reproducible.

## SITE-SUBDOMAIN — Scope of site context

Later, if needed, repeat a shared block across:

- same hostname;
- sibling subdomain;
- completely different hostname.

This asks whether any recurrence signal is scoped to exact host, registrable domain, or broader
indexing context.

---

# Fetch and HTTP-layer experiments

These are important but should come after the first HTML/extraction rounds. Some require Vercel
configuration or a purpose-built serverless endpoint rather than plain static files.

## HTTP — Response behavior

- **HTTP-001:** normal 200 HTML.
- **HTTP-002:** 301 redirect.
- **HTTP-003:** 302 redirect.
- **HTTP-004:** 307 redirect.
- **HTTP-005:** 308 redirect.
- **HTTP-006:** redirect chain.
- **HTTP-007:** cross-origin redirect.
- **HTTP-008:** 204.
- **HTTP-009:** 404 with HTML body.
- **HTTP-010:** 410 with HTML body.
- **HTTP-011:** 500 with HTML body.
- **HTTP-012:** HTML served as `text/plain`.
- **HTTP-013:** HTML served as `application/xhtml+xml`.
- **HTTP-014:** missing content type.
- **HTTP-015:** UTF-8 declared in header.
- **HTTP-016:** charset declared only in meta tag.
- **HTTP-017:** conflicting HTTP/meta charset.
- **HTTP-018:** compressed response.
- **HTTP-019:** very large response.
- **HTTP-020:** slow response if a controlled endpoint is available.

## CRAWL — Crawl/indexing directives

- **CRAWL-001:** ordinary route.
- **CRAWL-002:** meta `noindex`.
- **CRAWL-003:** meta `nofollow`.
- **CRAWL-004:** `X-Robots-Tag: noindex`.
- **CRAWL-005:** robots.txt allow.
- **CRAWL-006:** robots.txt disallow.
- **CRAWL-007:** present in sitemap.
- **CRAWL-008:** absent from sitemap.
- **CRAWL-009:** canonical to self.
- **CRAWL-010:** canonical to another route.
- **CRAWL-011:** two URLs with identical content and canonical relationship.

These tests must be interpreted carefully: direct-open fetch policy, search indexing policy, and
content extraction are different layers.

---

# Suggested execution phases

## Phase 0 — Capture pipeline validation

Before adding a large fixture:

1. deploy `/baseline/`;
2. capture it using `capture/code-mode-prompt.md`;
3. independently save origin HTML;
4. run View as AI on the same origin;
5. verify that raw capture bytes survive the capture pipeline unchanged.

Do not proceed until this is repeatable.

## Phase 1 — Kitchen sink

Build one broad route covering the safe, mostly independent first-pass cases:

- TEXT;
- common VIS;
- SEM;
- CTRL;
- LINK;
- IMG;
- TABLE;
- basic HEAD;
- simple FRAME.

Goal: cheaply discover which areas already match our assumptions and which families need isolated
follow-up.

## Phase 2 — Isolated discriminating experiments

Create tiny route pairs for every surprising or ambiguous kitchen-sink result.

Priority:

1. visibility/CSS;
2. semantic landmarks and ARIA;
3. boilerplate classes/roles;
4. JavaScript;
5. iframe behavior;
6. ordering;
7. metadata.

This is where conclusions should become strong enough to change View as AI.

## Phase 3 — Site-wide recurrence and boilerplate

Run the SITE experiments through deliberate sequential deployments.

Do not begin this phase by publishing every recurrence variant simultaneously. If native extraction
uses whole-host context, doing so can contaminate all variants.

The strongest experiment is SITE-CHANGE: keep target HTML byte-identical and alter only sibling
pages across deployments.

## Phase 4 — Large-page and truncation

Determine whether content length changes extraction decisions or simply truncates output.

## Phase 5 — HTTP/crawl layer

Add Vercel route configuration or controlled serverless endpoints only for the cases that cannot be
expressed as static HTML.

Keep these implementation details isolated from the baseline fixture routes.

## Phase 6 — Cross-framework validation

Only after the static baseline is understood, consider equivalent pages generated by:

- Next.js server/static rendering;
- a client-rendered React SPA;
- another common framework.

The purpose would be to test framework-produced origin markup and client behavior, not to replace
the controlled static baseline.

---

# What would justify changing View as AI

A single surprising capture is not enough for a broad pruning rule.

Prefer a code change when:

1. the behavior reproduces in a minimal controlled route;
2. the control behaves differently from the treatment;
3. the result reproduces in a fresh capture/session;
4. the rule is generic rather than tied to one website's arbitrary class names;
5. applying the rule does not erase information that native output retains in a paired case.

For site-wide behavior, require stronger evidence because it could imply a major architecture change.
At minimum:

1. target HTML is unchanged;
2. only sibling/site context changes;
3. native target output changes reproducibly;
4. caching/session effects have been tested;
5. the effect repeats with a second independent sentinel/block family.

Until then, View as AI should remain page-local and conservative.

# Open questions to resolve before claiming broad parity

- Is boilerplate detection page-local, site-aware, or a combination?
- Does repetition frequency across sibling pages affect trimming?
- Does the extractor evaluate computed CSS?
- Does it fetch external CSS?
- Does it use a fixed viewport for responsive styles?
- Does it use accessibility-tree-like semantics for any elements?
- Are ARIA labels exposed selectively?
- Does it execute any JavaScript?
- Does it inspect or fetch iframe contents?
- Does it use search/crawl indexes when directly opening a URL?
- Are `robots`, `noindex`, canonical, or sitemap signals relevant to direct open?
- Are repeated blocks deduplicated within a single page?
- Are repeated blocks deduplicated across pages?
- Does placement in header/nav/aside/footer influence removal independently of repetition?
- Can unique content inside an otherwise repeated site-wide container survive?
- Is DOM order always the model-facing order?
- Where are size/truncation boundaries?
- Is `<head>` metadata available to the model through a channel not represented in visible body text?
- Which current View as AI pruning rules are genuine native rules versus approximations that happen to
  fit the historical corpus?

The calibration site exists to turn these questions into controlled observations rather than
assumptions.
