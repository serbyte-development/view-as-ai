# View as AI Calibration Site

Read `wiki/AGENTS.md` before making substantial changes to this package.

This package is a controlled public test site for native AI web browsing behavior. Keep baseline
pages static and avoid introducing client runtime or framework behavior unless a fixture is
specifically designed to test it.

For byte-for-byte native ChatGPT captures, follow `capture/code-mode-prompt.md`. Do not manually
transcribe `web.run` output into fixtures.

For the complete operational sequence and capture artifact layout, follow `capture/README.md`.

Before adding or changing calibration fixtures, read `CALIBRATION_PLAN.md`. It is the canonical
inventory of known behavior, open questions, experimental controls, and planned test families.

Use `BUILD_PLAN.md` as the implementation checklist. Every calibration test ID must be assigned to
exactly one primary build unit before fixture work is considered complete.

Record execution state and findings in `CALIBRATION_RESULTS.md`. Every plan test ID must have
exactly one ledger row; `npm run check:results` enforces coverage.
