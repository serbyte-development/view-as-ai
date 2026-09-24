---
summary: "Startup context for the View as AI public calibration site: purpose, static rendering model, deployment host, and experiment boundaries."
---

# Project Overview

## What This Is

This package builds the public fixture site used to test how native AI web browsing systems see
controlled webpages. The deployed site is `https://view-as-ai.vercel.app/`.

The package is part of the View as AI repository but is not part of the Python runtime or public
Python distribution.

## Engineering Approach

Keep the site experimentally controlled. Prefer explicit HTML and CSS over framework behavior that
could become another variable in extraction tests.

TSX is an authoring convenience only. Pages are rendered with `renderToStaticMarkup()` and written
as static files. Normal fixture pages should not hydrate or ship client JavaScript.

The package pins TypeScript `6.0.3` for Vercel function compilation. TypeScript `7.0.2` passed
local checks but failed Vercel's function compiler path during calibration-site deployment. The
static build itself uses a small compiler-only wrapper rather than executing `tsx` on Vercel, so
the production build does not depend on a platform-specific esbuild binary.

## Global Invariants

- The baseline output is static origin HTML in `dist/`.
- Client JavaScript belongs only in fixtures whose purpose is to test JavaScript behavior.
- Visibility and layout experiments should use small explicit CSS rules whose behavior is obvious
  from the source.
- Native-browser conclusions require testing the deployed public URL, not only localhost output.
- Individual fixture cases should eventually use stable IDs and unique sentinel text so native
  output can be checked mechanically.
- Text-faithful native ChatGPT captures must follow `capture/code-mode-prompt.md` so the live
  OpenAI-side result is written to disk programmatically rather than transcribed or paraphrased by
  the model. Incidental terminal-newline or line-ending differences are acceptable.
- `capture/README.md` is the concise operational runbook: native capture, paired origin fetch,
  parser comparison, evidence bundle, then results-ledger update.
- `CALIBRATION_PLAN.md` is the canonical experimental plan. New fixture routes should map to a
  documented test family and use the controls/sentinel conventions defined there.
- `BUILD_PLAN.md` turns that research plan into the concrete route/component/asset checklist and
  assigns every calibration test ID to one primary build unit.
- `CALIBRATION_RESULTS.md` is the authoritative execution ledger. It tracks every plan ID from
  planned through verified/mismatch and links to the corresponding raw evidence.

## Deployment

The package is connected to the Vercel project `serbyte-development/view-as-ai`. The project
settings are:

- Root Directory: `packages/calibration-site`
- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: `24.x`

The normal deployment path is GitHub, not a manual CLI deployment:

1. complete and validate the phase locally;
2. commit it;
3. push the commit to GitHub;
4. let the Vercel Git integration deploy that commit;
5. verify the deployed commit/fixture before starting a native capture.

The Vercel CLI may be used to inspect the linked project, synchronize environment configuration,
or perform a deliberate special-scenario deployment when a calibration experiment requires one.
