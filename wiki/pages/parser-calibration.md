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

## Known residuals

Native results can prune navigation differently and use different blank lines,
Markdown structure, or reference numbering. Those formatting differences are
not primary. Avoid selectors specific to individual sites. Client-rendered-only
content, shadow DOM, and fetched iframe documents are outside the stable runtime.

Usage and checks live in `README.md`; concise durable state lives in this wiki.
