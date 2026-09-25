---
summary: "Formatter lineage, native web.run evidence, regression workflow, and boundaries that govern parity changes."
paths:
  - src/view_as_ai/
  - tests/
  - pyproject.toml
---

# Parser Calibration

## Source and boundaries

`src/view_as_ai/parser.py` adapts the small formatter from OpenAI's public
`gpt-oss` revision `750cfe908fdc9dd1f0e9bfcd92a4bb1adb0aa81c`.
`THIRD_PARTY_NOTICES.md` records attribution and dependency licenses.
`src/view_as_ai/cli.py` owns file, stdin, HTTP, output, and failure handling.
The parser owns pure HTML-to-text conversion. Fetching stays outside it.

## Evidence and maintenance

The original calibration used native ChatGPT `web.run` captures across a broad
set of real pages. That research corpus and its oracle tooling were archived
after View as AI stabilized; the active repo keeps only compact golden fixtures
and synthetic regressions.

New controlled native experiments should use the public calibration site at
`https://view-as-ai.vercel.app/`. The site is generated from
`packages/calibration-site/` and provides public origin HTML that native
browsing systems can fetch. Local synthetic HTML remains useful for regressions,
but localhost-only behavior is not evidence of native `web.run` extraction.

Do not restart broad calibration for routine maintenance. If native behavior
changes enough to matter, reproduce the mismatch against current native output
and add the smallest generic fix. Keep large oracle/calibration corpora outside
the active repository.

## Findings that affect implementation

- Inputs expose placeholders; values and checked state stay absent. Hidden input markers can remain.
- Selects become `[Select]`; options disappear. OpenAI docs' adjacent `Docs Overview` is separate DOM text.
- Native buttons use their text. A `role` or ARIA label alone has no inferred transformation rule.
- Fragment links stay references. Reference IDs are local to a particular extracted document.
- Image descriptions refer to image URLs. Tables need cell boundaries; mixed row-header tables have no invented header divider.
- Preserve preformatted indentation and surrounding text when removing a node. Global converter mutation is unnecessary.
- Template contents, including declarative shadow-DOM templates, are omitted from model-visible text.
- U+200B zero-width spaces survive native extraction and should be preserved.
- `slick-cloned` and `swiper-slide-duplicate` class tokens alone do not justify pruning.
- Controlled fixtures preserve utility-navigation, secondary-navigation, contextual-sidebar/footer,
  language-switcher, and color-theme blocks. Related-navigation, controlled promo-banner,
  cookie-notice, social-links, and share-buttons fixtures are omitted.
- The responsive `hidden-md` token is omitted in controlled captures even without a CSS rule.
- Ordinary breadcrumb signals are pruned, while visible schema.org `BreadcrumbList` microdata is
  retained.
- Remote fetch behavior parses `text/html`, exposes `text/plain` or missing `Content-Type`
  literally, and rejects `application/xhtml+xml`.

## Known residuals

Native results can prune navigation differently and use different blank lines,
Markdown structure, or reference numbering. Those formatting differences are
not primary. Avoid selectors specific to individual sites. Client-rendered-only
content, shadow DOM, and fetched iframe documents are outside the stable runtime.
Large-response truncation remains a native-tool boundary. The broad link/image/iframe omissions
seen on the kitchen-sink page require isolated follow-up before changing formatter behavior.

Usage and checks live in `README.md`; concise durable state lives in this wiki.
