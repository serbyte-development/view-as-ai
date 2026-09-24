# View as AI Calibration Site Build Plan

This is the implementation checklist for the public calibration site.

`CALIBRATION_PLAN.md` defines **what we need to learn**. This file defines **what must be built,
where it lives, and in what order**. `CALIBRATION_RESULTS.md` remains the execution/results ledger.

Do not record native findings here.

## Definition of built

A checklist item is complete only when:

- [ ] the fixture source exists;
- [ ] the static build emits the intended public route/resource;
- [ ] every assigned test ID has one stable unique sentinel when the test can use a sentinel;
- [ ] the treatment DOM contains no unrelated instrumentation that could change extraction behavior;
- [ ] the private build manifest maps the test ID to its route and sentinel;
- [ ] local validation confirms the expected sentinel exists in the emitted origin where applicable;
- [ ] `npm run check:calibration` passes.

Deployment and native capture are separate steps. A built test stays `planned` in
`CALIBRATION_RESULTS.md` until it is actually deployed.

## Experimental page rules

- [ ] Experimental routes have no shared site header, nav, sidebar, footer, cookie banner, or other
  chrome unless that chrome is the test.
- [ ] The homepage may be human-friendly, but experimental routes must remain minimal.
- [ ] Do not wrap every experiment in `<main>`; several pruning rules depend on whether content is
  inside or outside `main`.
- [ ] Do not add `data-test-id`, ARIA labels, semantic classes, or other instrumentation to the
  treatment element unless the attribute itself is being tested.
- [ ] Test metadata lives in source-side registries and the private build manifest, not in extra
  rendered DOM.
- [ ] A reusable `TestCase` helper, if used, must render a React fragment only and add no DOM.
- [ ] Do not emit test IDs as visible labels solely for debugging. The unique sentinel already
  identifies the case.
- [ ] No generated manifest containing sentinel strings is deployed under `dist/`. A public
  manifest could itself contaminate site-context tests.
- [ ] General experimental pages use no global CSS unless required by the experiment.
- [ ] CSS rules target only the intended test case.
- [ ] JavaScript is shipped only on `ACTIVE-*`, JSON-LD mutation, or explicitly JavaScript-driven
  routes.
- [ ] Malformed/raw-HTTP experiments bypass React rendering when React would normalize the behavior
  being tested.
- [ ] External assets use stable URLs and are documented in source.

---

# Phase 0 — Build infrastructure

## Static route builder

- [x] Refactor `src/build.tsx` into a route registry that can emit many static routes.
- [x] Support normal TSX routes rendered with `renderToStaticMarkup()`.
- [x] Support raw HTML routes for malformed/parser tests.
- [x] Support copying static CSS, JS, image, media, JSON, robots, and sitemap assets.
- [x] Support route-local assets without content hashes or bundler-generated markup.
- [x] Preserve trailing-slash routes as `dist/<route>/index.html`.
- [x] Keep `dist/` as the only Vercel public output directory.
- [x] Fail the build on duplicate route paths.

## Minimal document primitives

- [x] Add a minimal document component that emits only doctype/html/head/body essentials.
- [x] Allow each route to fully override `<head>` for `HEAD-*` and metadata tests.
- [x] Allow body children to render directly without an automatic `main`, header, or footer.
- [x] Add a source-only fixture metadata type: test IDs, route, sentinels, phase, and notes.
- [x] Add a fragment-only test helper or equivalent authoring primitive that adds zero rendered DOM.

## Sentinel system

- [x] Define deterministic sentinel naming, e.g. `VAI_SENTINEL_VIS_008_OPACITY_ZERO_...`.
- [x] Give every content-presence test a unique sentinel.
- [x] Ensure sentinels never repeat across test IDs.
- [x] Keep sentinels stable after first public capture.
- [x] Add a build validation that fails if a sentinel appears in more than one generated route unless
  the calibration plan explicitly requires repetition.
- [x] Add a build validation that confirms each expected sentinel exists in its emitted origin.

## Private build manifest

- [x] Generate a local manifest outside `dist/`.
- [x] Record test ID → route → sentinel → fixture kind → source module.
- [x] Record the active site-context scenario.
- [x] Ensure the private manifest is ignored from deployment output.
- [x] Make capture/verification tooling able to read the private manifest later without scraping the
  HTML.

## Local verification

- [x] Add a fixture coverage check that compares built test IDs with `CALIBRATION_PLAN.md`.
- [x] Add a check that no unknown test ID is emitted.
- [x] Add a check that no test ID has two primary routes unless explicitly marked as a paired case.
- [x] Add a check for duplicate sentinels.
- [x] Add `check:build-plan` so this document must cover every calibration-plan ID.
- [x] Include fixture/build validation in `npm run check`.

---

# Phase 1 — Homepage and baseline

## Homepage

Route: `/`

- [x] Keep the existing human-readable calibration-site homepage.
- [x] Link to `/baseline/` and `/kitchen-sink/` only after those routes exist.
- [x] Do not reuse homepage chrome/components on experimental routes.
- [x] Keep the homepage out of calibration result IDs.

## Baseline

Route: `/baseline/`

- [x] Build a very small static page containing one heading.
- [x] Add one ordinary paragraph sentinel.
- [x] Add one same-origin text link.
- [x] Add one external text link.
- [x] Add one image with alt text.
- [x] Add one text input with placeholder.
- [x] Add one text-only button.
- [x] Add one small table.
- [x] Add no JavaScript.
- [x] Add no hiding/layout CSS.
- [x] Add no nav/footer/sidebar landmarks.
- [x] Designate this route as the capture/finalize/recompare sanity target before broad native
  captures.

---

# Phase 2 — Broad kitchen-sink page

Route: `/kitchen-sink/`

The kitchen sink is the broad first pass. Cases here must remain independently identifiable by
sentinel. Surprising results move to isolated follow-up routes before changing View as AI.

## TEXT

Coverage: `TEXT-001..TEXT-033`

- [x] Build all `TEXT-001` through `TEXT-033` on the kitchen-sink page.
- [x] Keep comment/template/noscript/dialog/details cases literal and source-verifiable.
- [x] Ensure TEXT-023's comment sentinel exists only in an HTML comment.
- [x] Avoid formatting helpers that normalize the whitespace cases before HTML is emitted.

## Common visibility cases

Coverage: `VIS-001..VIS-030`

- [x] Build `VIS-001` through `VIS-029` on the kitchen-sink page and VIS-030 as the isolated
  same-class/CSS treatment needed to avoid contaminating VIS-029.
- [x] Use explicit case-specific CSS for each CSS-driven treatment.
- [x] Include separate inline, embedded, and external-stylesheet cases exactly as specified.
- [x] Add the external visibility stylesheet as a stable unhashed asset.
- [x] Ensure generated `::before`/`::after` text exists only in CSS, not in DOM text.
- [x] Keep the Tailwind-like class-name control free of any actual Tailwind dependency.

## Semantics and ARIA

Coverage: `SEM-001..SEM-036`

- [x] Build `SEM-001` through `SEM-036` on the kitchen-sink page.
- [x] Preserve the exact semantic element/role distinction for every pair.
- [x] Put cases that are specified outside `main` outside any `main` ancestor.
- [x] Do not add helper ARIA attributes to unrelated cases.

## Controls

Coverage: `CTRL-001..CTRL-035`

- [x] Build `CTRL-001` through `CTRL-035` on the kitchen-sink page.
- [x] Preserve initial values, checked state, disabled/read-only state, labels, options, and
  placeholders exactly as specified.
- [x] Keep the hidden-wrapper case separate from the role-search case.

## Links

Coverage: `LINK-001..LINK-033`

- [x] Build `LINK-001` through `LINK-030` on the kitchen-sink page and LINK-031..033 as
  dedicated base-href documents.
- [x] Provide stable same-origin targets for relative/absolute/query/fragment cases.
- [x] Use a stable external HTTPS target for external-link cases.
- [x] Keep malformed/non-web schemes literal in source.
- [x] Ensure the `base href` cases are emitted in documents where the intended base does not
  affect unrelated kitchen-sink links.

## Images and media

Coverage: `IMG-001..IMG-021`

- [x] Build `IMG-001` through `IMG-021`.
- [x] Add stable same-origin PNG/SVG fixtures.
- [x] Add a stable external-image URL for external-source behavior.
- [x] Include picture/srcset variants without JavaScript.
- [x] Include inline SVG title/desc/text variants.
- [x] Include canvas/video/audio fallback text without client rendering.

## Basic iframe/reference behavior

Coverage: `FRAME-001..FRAME-005`

- [x] Build `FRAME-001` through `FRAME-005` on the kitchen-sink page.
- [x] Add same-origin iframe child documents with stable URLs.
- [x] Use a stable cross-origin iframe URL for FRAME-003.
- [x] Keep iframe body/fallback sentinels unique from parent-page sentinels.

## Tables

Coverage: `TABLE-001..TABLE-014`

- [x] Build `TABLE-001` through `TABLE-014` on the kitchen-sink page.
- [x] Preserve malformed-table intent where React can represent it faithfully; otherwise emit the
  affected case through a raw fixture document.
- [x] Keep hidden-header CSS scoped only to TABLE-013.

## International text

Coverage: `I18N-001..I18N-013`

- [x] Build `I18N-001` through `I18N-013` on the kitchen-sink page.
- [x] Preserve Unicode code points exactly, especially combining characters, zero-width characters,
  soft hyphens, bidi controls, and literal citation delimiters.
- [x] Validate emitted origin bytes, not only visually rendered text.

---

# Phase 3 — Isolated CSS and visual-state experiments

These routes are one-case-per-route unless a pair is explicitly part of the test.

Route pattern: `/experiments/visibility/<test-id>/`

## Static computed-style and geometry

Coverage: `VIS-031..VIS-075`

- [x] Build one isolated route for each `VIS-031` through `VIS-075`.
- [x] Use the same base text/sentinel structure across cases.
- [x] Build distinct overflow-visible and overflow-hidden geometry controls.
- [x] Build offscreen positioning for absolute, relative, fixed, transform, translate, and margin
  mechanisms.
- [x] Build cascade/`!important` pairs without unrelated stylesheet differences.
- [x] Add stable external stylesheet and `@import` resources.
- [x] Add media attribute and `@supports` variants.

## Time-dependent transitions and animations

Coverage: `VIS-076..VIS-091`

- [x] Build one isolated route for each `VIS-076` through `VIS-091`.
- [x] Keep animation keyframes deterministic.
- [x] Use exact documented durations/delays.
- [x] Add zero-duration final-state controls.
- [x] Add one-second enter/exit opacity and translation cases.
- [x] Add delayed, negative-delay, infinite, and reduced-motion cases.
- [x] Do not add JavaScript to CSS-only timing routes.

## CSS state/pseudo-class behavior

Coverage: `VIS-092..VIS-100`

- [x] Build isolated hover/focus/focus-within routes.
- [x] Build the `:target` base route and matching-fragment capture URL.
- [x] Build unchecked and checked CSS-disclosure variants.
- [x] Build the static `:has()` case.

## Viewport and responsive behavior

Coverage: `VIS-101..VIS-110`

- [x] Build isolated breakpoint cases for 320, 768/769, and 1280 widths.
- [x] Build portrait/landscape media-query cases.
- [x] Build 100vh/500vh vertical placement cases.
- [x] Build horizontal overflow case.
- [x] Build the container-query case with explicit container sizing.

---

# Phase 4 — Isolated boilerplate and embedded-resource experiments

## Local boilerplate/chrome signals

Route pattern: `/experiments/boilerplate/<test-id>/`

Coverage: `BOIL-001..BOIL-030`

- [x] Build one isolated route for each `BOIL-001` through `BOIL-030`.
- [x] Keep the treatment block unique to that page during this phase.
- [x] Use neutral surrounding content so local class/role semantics are the variable.
- [x] Preserve inside-main versus outside-main distinctions.
- [x] Do not share boilerplate components across these routes yet.

## Embedded-resource follow-ups

Route pattern: `/experiments/frame/<test-id>/`

Coverage: `FRAME-006..FRAME-008`

- [x] Build FRAME-006 parent plus same-origin iframe child with child-only sentinel.
- [x] Build FRAME-007 object/fallback page.
- [x] Build FRAME-008 embed page.

---

# Phase 5 — Document metadata and structured data

## Head metadata

Route pattern: `/experiments/head/<test-id>/`

Coverage: `HEAD-001..HEAD-017`

- [x] Build one document per HEAD test so metadata fields cannot contaminate one another.
- [x] Implement title absent/present variants with custom document heads.
- [x] Add canonical and alternate-language targets.
- [x] Add robots/noindex/nofollow variants.
- [x] Add Open Graph and Twitter card metadata.
- [x] Add microdata and RDFa body fixtures.
- [x] Isolate meta-refresh because it can change fetch behavior.

## JSON-LD basic/syntax

Route pattern: `/experiments/jsonld/<test-id>/`

Coverage: `JSONLD-001..JSONLD-015`

- [x] Build one isolated route per JSONLD-001 through JSONLD-015.
- [x] Keep JSON-LD-only sentinels absent from visible DOM.
- [x] Build head/body, valid/invalid, graph/nested, minified/pretty, Unicode, and large-string
  variants.
- [x] Include ordinary `application/json` and executable-script controls.

## JSON-LD schema types

Coverage: `JSONLD-016..JSONLD-036`

- [x] Build one route per listed schema.org type.
- [x] Include one fact repeated visibly and one fact available only in JSON-LD.
- [x] Keep schema values unique per route.

## JSON-LD conflicts

Coverage: `JSONLD-037..JSONLD-046`

- [x] Build isolated visible-vs-JSON-LD conflict routes.
- [x] Use deliberately unmistakable conflicting values for title, price, address, phone, rating,
  and FAQ.
- [x] Include JSON-LD-only and body-only fact controls.

## JSON-LD URLs

Coverage: `JSONLD-047..JSONLD-054`

- [x] Build URL/sameAs/image/logo/mainEntity/offers URL cases.
- [x] Ensure JSON-LD-only URLs do not appear in normal DOM anchors.

## JSON-LD visibility and JavaScript mutation

Coverage: `JSONLD-055..JSONLD-060`

- [x] Build hidden/aria-hidden JSON-LD source cases.
- [x] Build JS-inserted, JS-modified, and JS-removed JSON-LD routes with route-local scripts.
- [x] Preserve original source JSON separately in fixture source for review.

## JSON-LD multi-entity/deduplication

Coverage: `JSONLD-061..JSONLD-068`

- [x] Build multiple-script, graph, duplicate, conflicting, and `@id` relationship cases.

## JSON-LD size

Coverage: `JSONLD-069..JSONLD-075`

- [x] Generate deterministic <1 KB, ~10 KB, and ~100 KB structured-data payloads.
- [x] Generate large ItemList and graph variants.
- [x] Place unique beginning/end sentinels exactly as specified.

## JSON-LD vs microdata vs RDFa

Coverage: `JSONLD-076..JSONLD-079`

- [x] Build paired Organization encodings.
- [x] Build paired Product/Offer encodings.
- [x] Build paired breadcrumb encodings.
- [x] Build paired FAQ encodings.
- [x] Add private manifest metadata distinguishing JSON-LD-only and visible sentinel sets.

---

# Phase 6 — JavaScript, ordering, and duplication

## Active/client behavior

Route pattern: `/experiments/active/<test-id>/`

Coverage: `ACTIVE-001..ACTIVE-017`

- [x] Build inline-script and external-script source-only controls.
- [x] Build immediate, DOMContentLoaded, zero-delay, and one-second insertion routes.
- [x] Build modification and removal routes.
- [x] Build display/visibility mutation routes.
- [x] Build `document.write` route.
- [x] Add stable same-origin JSON resource for fetch-and-insert case.
- [x] Build light-DOM custom element.
- [x] Build imperative shadow-DOM custom element.
- [x] Build declarative-shadow-DOM route.
- [x] Build SPA shell route with empty initial body target and client-only content.
- [x] Build paired noscript/client-rendered route.

## DOM order versus visual/accessibility order

Route pattern: `/experiments/order/<test-id>/`

Coverage: `ORDER-001..ORDER-009`

- [x] Build one isolated route per ORDER case.
- [x] Keep DOM source order identical across comparable pairs.
- [x] Apply only the intended flex/grid/absolute/RTL/tabindex/ARIA/fixed-position change.

## Within-page duplication

Route pattern: `/experiments/duplicate/<test-id>/`

Coverage: `DUP-001..DUP-011`

- [x] Build one isolated route per DUP case.
- [x] Generate exact duplicates from one canonical string to avoid accidental textual drift.
- [x] Build framework clone-class cases exactly.
- [x] Keep header/main and footer/main repeated-text comparisons otherwise structurally equivalent.

---

# Phase 7 — Raw parser-tolerance and large-page fixtures

## Malformed HTML

Route pattern: `/experiments/malformed/<test-id>/`

Coverage: `MAL-001..MAL-012`

- [x] Emit MAL-001 through MAL-012 from raw HTML strings instead of React when React would repair the
  markup.
- [x] Verify emitted bytes before deployment.
- [x] Preserve duplicate attributes, multiple body/title tags, XML declarations, and invalid nesting
  exactly where the platform permits.
- [x] Preserve the results-ledger `blocked` path for any later case where Vercel/CDN normalization
  makes the intended origin impossible.

## Large-page/truncation

Route pattern: `/experiments/size/<test-id>/`

Coverage: `SIZE-001..SIZE-011`

- [x] Generate deterministic moderate, 25 KB, 100 KB, and 500 KB text fixtures.
- [x] Put beginning/middle/end sentinels at deterministic byte/content positions.
- [x] Generate large-nav/small-main and small-nav/large-main paired cases.
- [x] Generate large code block.
- [x] Generate large table.
- [x] Generate hundreds-of-links case.
- [x] Generate hundreds-of-images case with stable same-origin assets.
- [x] Generate repeated-boilerplate plus small-unique-article case.
- [x] Keep large fixture generation deterministic across rebuilds.

---

# Phase 8 — Site-context / cross-page experiments

These are sequential deployment scenarios. Do **not** deploy all variants simultaneously.

## Scenario build mode

- [ ] Add `CALIBRATION_SITE_SCENARIO` (or equivalent) as a build-time selector.
- [ ] Default normal deployment excludes site-context sibling corpora unless actively testing them.
- [ ] Write the active scenario into the private build manifest.
- [ ] Keep the target page source and emitted bytes stable across scenarios that require an unchanged
  target.
- [ ] Add a local command that prints/hashes the site-context target HTML before deployment.

## Page-local baseline

Coverage: `SITE-BASE`

- [ ] Build target page with unique header/nav/main/sidebar/footer blocks.
- [ ] Build no sibling containing those blocks in the SITE-BASE scenario.

## Repetition-count scenarios

Coverage: `SITE-COUNT`

- [ ] Build target-only scenario.
- [ ] Build target + 1 sibling scenario.
- [ ] Build target + 2 siblings scenario.
- [ ] Build target + 4 siblings scenario.
- [ ] Build target + 9 siblings scenario.
- [ ] Keep target bytes identical across all five scenarios.

## Text versus structural repetition

Coverage: `SITE-TEXT`

- [ ] Build same markup + same text scenario.
- [ ] Build same markup + different text scenario.
- [ ] Build different markup + same text scenario.
- [ ] Build same link destinations + different labels scenario.
- [ ] Build same labels + different link destinations scenario.

## Region/landmark recurrence

Coverage: `SITE-REGION`

- [ ] Build repeated header variant.
- [ ] Build repeated nav variant.
- [ ] Build repeated neutral div before main.
- [ ] Build repeated aside variant.
- [ ] Build repeated neutral div after main.
- [ ] Build repeated footer variant.
- [ ] Build repeated block inside main.
- [ ] Build role-navigation variant.
- [ ] Build role-complementary variant.
- [ ] Build role-contentinfo variant.

## Unique child inside repeated wrapper

Coverage: `SITE-UNIQUE-CHILD`

- [ ] Build repeated wrapper + unique plain text child.
- [ ] Build repeated wrapper + unique link child.
- [ ] Build repeated wrapper + unique heading child.
- [ ] Build repeated wrapper + unique alert/status child.

## Discoverability/linkage

Coverage: `SITE-NAV-LINKAGE`

- [ ] Build sibling linked from target nav.
- [ ] Build sibling linked only from another sibling.
- [ ] Build sitemap-only sibling.
- [ ] Build completely unlinked sibling.
- [ ] Build noindex sibling.
- [ ] Build robots-excluded sibling scenario where direct capture remains testable.

## Template sanity check

Coverage: `SITE-TEMPLATE`

- [ ] Build one shared-component page set.
- [ ] Build one independently authored page set that emits byte-identical HTML.
- [ ] Add an assertion proving the compared origin bytes are identical.

## Class-signal versus recurrence

Coverage: `SITE-CLASS`

- [ ] Build neutral-class unique and repeated variants.
- [ ] Build navbar unique and repeated variants.
- [ ] Build breadcrumb unique and repeated variants.
- [ ] Build utility-nav unique and repeated variants.
- [ ] Build related-navigation unique and repeated variants.
- [ ] Build contextual-sidebar unique and repeated variants.
- [ ] Build banner unique and repeated variants.

## Before/after unchanged-target experiment

Coverage: `SITE-CHANGE`

- [ ] Build scenario A: target block unique.
- [ ] Build scenario B: sibling pages repeat exact target block.
- [ ] Add build-time assertion that target HTML hash is identical between A and B.
- [ ] Make sibling sentinel family unique to this experiment.

## Conversation/session-context corpus

Coverage: `SITE-CONVERSATION`

- [ ] Build stable target and sibling pages that can be opened in different conversation orders.
- [ ] Do not require deployment mutation between conversation-order captures.

## Host/subdomain scope

Coverage: `SITE-SUBDOMAIN`

- [ ] Build the same repeatable block corpus for the Vercel hostname.
- [ ] Prepare a sibling-subdomain deployment target when this phase is reached.
- [ ] Prepare a different-host control only if the same-host/sibling-subdomain results justify it.

---

# Phase 9 — HTTP/fetch-layer endpoints

These may use Vercel Functions or route configuration. Keep them isolated from the static baseline.

## HTTP response behavior

Coverage: `HTTP-001..HTTP-020`

- [ ] Build ordinary 200 HTML endpoint.
- [ ] Build 301, 302, 307, and 308 redirect endpoints.
- [ ] Build redirect-chain endpoint.
- [ ] Build cross-origin redirect endpoint.
- [ ] Build 204 endpoint.
- [ ] Build 404, 410, and 500 responses with deterministic HTML bodies.
- [ ] Build `text/plain` HTML body endpoint.
- [ ] Build `application/xhtml+xml` endpoint.
- [ ] Build missing-content-type endpoint if Vercel permits it.
- [ ] Build header-declared charset endpoint.
- [ ] Build meta-only charset page.
- [ ] Build conflicting HTTP/meta charset endpoint.
- [ ] Build controlled compressed-response endpoint if Vercel permits exact encoding control.
- [ ] Build very-large-response endpoint.
- [ ] Build controlled slow-response endpoint.
- [ ] Document/mark platform-blocked cases rather than approximating them inaccurately.

## Crawl/indexing directives

Coverage: `CRAWL-001..CRAWL-011`

- [ ] Build ordinary control route.
- [ ] Build meta noindex route.
- [ ] Build meta nofollow route.
- [ ] Build `X-Robots-Tag: noindex` response.
- [ ] Generate robots.txt allow scenario.
- [ ] Generate robots.txt disallow scenario.
- [ ] Generate sitemap with included route.
- [ ] Generate sitemap-absent control.
- [ ] Build self-canonical route.
- [ ] Build canonical-to-other route.
- [ ] Build two identical-content URLs with canonical relationship.
- [ ] Keep direct-open behavior separate from search/indexing conclusions in later results.

---

# Phase 10 — Cross-framework follow-up

No calibration IDs are assigned yet; build this only after the static baseline results justify it.

- [ ] Preserve the static TSX site as the reference implementation.
- [ ] Build an equivalent Next.js server/static-rendered page set.
- [ ] Build an equivalent client-rendered React SPA shell/page set.
- [ ] If useful, build one additional common framework control.
- [ ] Keep content/sentinels logically equivalent across frameworks.
- [ ] Compare origin HTML first before interpreting native differences.

---

# Supporting assets/resources checklist

- [ ] Same-origin PNG fixture.
- [ ] Same-origin SVG fixture.
- [ ] Same-origin image used by hundreds-of-images generator.
- [ ] External-image target chosen and documented.
- [ ] Same-origin iframe child pages.
- [ ] Cross-origin iframe target chosen and documented.
- [ ] External visibility stylesheet.
- [ ] Imported stylesheet.
- [ ] External ACTIVE script.
- [ ] Same-origin JSON resource for ACTIVE fetch test.
- [ ] Minimal audio/video fallback fixture resources if needed.
- [ ] Stable canonical/alternate-language target pages.
- [ ] Stable redirect targets.
- [ ] Deterministic large-text/code/table/link/image generators.
- [ ] robots.txt generator/scenario support.
- [ ] sitemap.xml generator/scenario support.

---

# Deployment-readiness checklist

- [ ] `npm run build` succeeds from `packages/calibration-site`.
- [ ] `npm run check` succeeds.
- [ ] Every test ID built in the current phase is present in the private build manifest.
- [ ] No unexpected test sentinel appears in another route.
- [ ] No private manifest or source metadata is present under `dist/`.
- [ ] No experimental route accidentally inherits homepage CSS/chrome.
- [ ] Vercel serves emitted HTML without an application runtime/hydration layer for static routes.
- [ ] Public origin bytes for representative routes match local `dist/` bytes where CDN/header
  behavior does not intentionally differ.
- [ ] The deployed commit/scenario is known before capture begins.
- [ ] Only after these checks move applicable rows in `CALIBRATION_RESULTS.md` from `planned` to
  `deployed`.

---

# Recommended implementation order

- [ ] **Build 1:** infrastructure + private manifest + baseline.
- [ ] **Build 2:** kitchen sink: TEXT, VIS-001..030, SEM, CTRL, LINK, IMG, FRAME-001..005, TABLE,
  I18N.
- [ ] **Build 3:** isolated static visibility + local boilerplate + FRAME-006..008.
- [ ] **Build 4:** HEAD + JSON-LD.
- [ ] **Build 5:** ACTIVE + ORDER + DUP.
- [ ] **Build 6:** MAL + SIZE.
- [ ] **Build 7:** site-context scenario machinery and SITE experiments.
- [ ] **Build 8:** HTTP + CRAWL infrastructure.
- [ ] **Build 9:** optional cross-framework follow-up after static findings are understood.

Do not jump to later phases because they are interesting. The capture pipeline should be proven on
`/baseline/`, then the broad static cases should establish which expensive isolated experiments
are actually necessary.
