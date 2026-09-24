---
summary: "Public calibration site used to expose controlled HTML fixtures to native AI web browsing systems and compare their output with View as AI."
paths:
  - packages/calibration-site/src/
  - packages/calibration-site/package.json
  - packages/calibration-site/tsconfig.json
  - packages/calibration-site/biome.json
---

# Calibration Site

## Purpose

View as AI has a dedicated public test site at:

`https://view-as-ai.vercel.app/`

The site exists so controlled fixture pages can be fetched by native AI browsing systems such as
ChatGPT `web.run`. Localhost-only fixtures are useful for parser regressions, but they cannot answer
how a remote browsing system actually fetches, interprets, or trims a page.

The calibration site should therefore be treated as the public experimental surface for future
behavioral tests.

## Architecture

The site lives in `packages/calibration-site/` and is intentionally simpler than a production web
application:

- React and TypeScript/TSX are used for maintainable fixture authoring.
- `react-dom/server` and `renderToStaticMarkup()` generate origin HTML.
- A small `tsx` build script writes static files directly to `dist/`.
- There is no hydration or client JavaScript unless a fixture explicitly tests JavaScript behavior.
- CSS used to test visibility or layout behavior should be explicit and minimal.
- Vercel serves the generated `dist/` directory as the public site.

Avoid adding framework behavior that would become an uncontrolled variable in baseline tests.

## Calibration Model

The main fixture can test many DOM-level behaviors on one page, but a single page cannot answer
every extraction question. Site-level behavior may depend on repeated navigation, shared
boilerplate, sibling pages, internal links, or other cross-page signals.

Future fixtures may therefore include both:

- dense single-page "kitchen sink" cases with unique sentinel text for each behavior;
- multiple related pages designed to test recurrence, shared templates, navigation, and other
  site-level signals.

When a native behavior is established from this public site, preserve the smallest useful evidence
in the active regression suite and summarize durable findings in the wiki.

For byte-for-byte native ChatGPT captures, follow
`packages/calibration-site/capture/code-mode-prompt.md`. That procedure keeps the live OpenAI-side
result on a programmatic path from the web tool response to the repository instead of manually
transcribing it through the model.
