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

Fixtures therefore use both:

- dense single-page matrix cases with unique sentinel text for each behavior;
- multiple related pages designed to test recurrence, shared templates, navigation, and other
  site-level signals.

For independent page-local hypotheses, prefer a dense matrix over many one-case routes. Current
follow-up matrices target roughly 5,000 to 10,000 words with treatments distributed through the
page and position sentinels that reveal truncation. Multi-deployment testing is reserved for
questions that genuinely depend on site-wide recurrence or deployment state.

When a native behavior is established from this public site, preserve the smallest useful evidence
in the active regression suite and summarize durable findings in the wiki.

For text-faithful native ChatGPT captures, follow
`packages/calibration-site/capture/code-mode-prompt.md`. That procedure keeps the live OpenAI-side
result on a programmatic path from the web tool response to the repository instead of manually
transcribing or paraphrasing it through the model. A terminal newline or line-ending normalization
is acceptable; substantive text changes are not.

The end-to-end agent workflow is
`packages/calibration-site/capture/README.md`: capture native output, finalize the evidence bundle,
compare the saved origin with the current parser, then record the finding in the results ledger.
Finalized captures preserve both the origin body and response headers so fetch-metadata experiments
have fixed paired evidence.

## Request telemetry

The public calibration deployment uses Vercel Routing Middleware to log a structured request
fingerprint before routing/cache handling. Each log line begins with `VAI_REQUEST_TELEMETRY` and
contains the request method, path/query, host, sorted incoming headers, deployment/runtime metadata,
timestamp, and a generated telemetry ID. Authorization, cookie, secret, token, and bypass-header
values are redacted while their presence remains visible.

Use Vercel runtime logs to inspect a native capture's request without modifying fixture HTML:

```bash
vercel logs --project view-as-ai --scope serbyte-development \
  --environment production --since 30m --query 'VAI_REQUEST_TELEMETRY' --expand
```

### Native `web.run` telemetry workflow

Use a unique query marker when opening a fixture so the request can be found unambiguously in the
runtime logs. The query value itself is calibration-neutral unless the test is specifically about
URLs or query strings.

For example, open this URL through native ChatGPT `web.run`:

```text
https://view-as-ai.vercel.app/baseline/?telemetry_probe=native-2026-09-28-01
```

Then retrieve only the matching request:

```bash
vercel logs \
  --project view-as-ai \
  --scope serbyte-development \
  --environment production \
  --since 30m \
  --query 'native-2026-09-28-01' \
  --expand
```

To inspect all recent telemetry instead:

```bash
vercel logs \
  --project view-as-ai \
  --scope serbyte-development \
  --environment production \
  --since 30m \
  --query 'VAI_REQUEST_TELEMETRY' \
  --expand
```

For a live capture, start log streaming before opening the URL:

```bash
vercel logs \
  --project view-as-ai \
  --scope serbyte-development \
  --environment production \
  --follow \
  --json
```

Look for a `VAI_REQUEST_TELEMETRY` message whose `pathname` and `search` match the requested fixture.
The JSON payload records the caller's HTTP headers plus Vercel-provided request metadata. Useful
fields include `user-agent`, `accept*`, `x-request-id`, Vercel region/geolocation fields, and
`x-vercel-ja4-digest`. Treat Vercel geolocation as the network egress location seen by Vercel, not
as evidence of a physical client device or user location.

If multiple requests hit the same URL, use the unique query marker first, then preserve the
telemetry ID, Vercel request ID, timestamp, deployment Git SHA, and relevant header values with the
capture notes. Credential-like header values are redacted by middleware before logging.

Do not render request telemetry into calibration pages. That would alter the origin being measured
and could change native extraction behavior.

The complete test inventory and experiment design live in
`packages/calibration-site/CALIBRATION_PLAN.md`. In particular, site-wide recurrence must be tested
with controlled multi-page and sequential-deployment experiments rather than inferred from one
kitchen-sink page.

The concrete implementation checklist is `packages/calibration-site/BUILD_PLAN.md`. It maps every
calibration ID to the route/resource/scenario that must be built and is coverage-checked by the
package tooling.

Execution status and findings live in `packages/calibration-site/CALIBRATION_RESULTS.md`. The
package check verifies that every planned test ID has exactly one results row.
