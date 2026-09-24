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

## Global Invariants

- The baseline output is static origin HTML in `dist/`.
- Client JavaScript belongs only in fixtures whose purpose is to test JavaScript behavior.
- Visibility and layout experiments should use small explicit CSS rules whose behavior is obvious
  from the source.
- Native-browser conclusions require testing the deployed public URL, not only localhost output.
- Individual fixture cases should eventually use stable IDs and unique sentinel text so native
  output can be checked mechanically.
- Byte-for-byte native ChatGPT captures must follow `capture/code-mode-prompt.md` so the live
  OpenAI-side result is written to disk programmatically rather than transcribed by the model.
