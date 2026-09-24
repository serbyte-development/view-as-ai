# View as AI Calibration Site

Read `wiki/AGENTS.md` before making substantial changes to this package.

This package is a controlled public test site for native AI web browsing behavior. Keep baseline
pages static and avoid introducing client runtime or framework behavior unless a fixture is
specifically designed to test it.

For text-faithful native ChatGPT captures, follow `capture/code-mode-prompt.md`. Preserve the
actual model-facing text, characters, Unicode, punctuation, and ordering. Do not manually
transcribe or paraphrase `web.run` output into fixtures. Incidental file-transport differences
such as a terminal newline or CRLF/LF normalization are acceptable.

For the complete operational sequence and capture artifact layout, follow `capture/README.md`.

Before adding or changing calibration fixtures, read `CALIBRATION_PLAN.md`. It is the canonical
inventory of known behavior, open questions, experimental controls, and planned test families.

Use `BUILD_PLAN.md` as the implementation checklist. Every calibration test ID must be assigned to
exactly one primary build unit before fixture work is considered complete.

Record execution state and findings in `CALIBRATION_RESULTS.md`. Every plan test ID must have
exactly one ledger row; `npm run check:results` enforces coverage.

## Deployment

The Vercel CLI resolves this package to the existing
`serbyte-development/view-as-ai` project. That project uses
`packages/calibration-site` as its Root Directory, the `Other` framework preset,
`npm run build`, `dist`, and Node.js 24.x.

Normal deployments are Git-driven: commit the completed work, push it to GitHub, and let the
project's Vercel Git integration deploy that commit. Do not run a manual `vercel deploy` for
ordinary phase work. Use the Vercel CLI for inspection, environment synchronization, or a
deliberate special-scenario deployment when the calibration procedure specifically requires it.
