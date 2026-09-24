# Decision Log

## 2026-09-24 — Pin TypeScript 6 for Vercel functions

The calibration package pins TypeScript 6.0.3 even though TypeScript 7 is available. Vercel's
standalone function compiler failed with TypeScript 7.0.2 while the same functions built correctly
with 6.0.3. The static site build was also changed to compile TSX with `tsc` and execute plain
CommonJS output so production builds do not depend on the host-specific esbuild binary used by
`tsx`. Local developer/check scripts may continue using `tsx`.

Preserve major historical reasoning that helps a future agent understand why the project took its current direction.

Add an entry when a significant decision, reversal, discovery, rejected approach, validation, or lesson from real usage would be useful to understand later and its reasoning is not obvious from the current code, wiki, or Git history.

Do not use this as a changelog. Routine implementation changes, wiki maintenance, generated output, and tests run do not belong here.

## 2026-09-24 — Use static TSX rendering as the calibration baseline

The calibration site uses React and TypeScript for fixture authoring, but renders pages with
`react-dom/server` and `renderToStaticMarkup()` into static files. Vite, Next.js, and default
client hydration were intentionally excluded from the baseline so framework runtime output does
not become an uncontrolled extraction variable. The generated site is deployed to
`https://view-as-ai.vercel.app/`.

Format:

```markdown
## YYYY-MM-DD — Short description

[What changed in the project's direction or understanding, why, and any rejected alternative or discovered constraint worth preserving.]
```

<!--
Examples:

## 2026-09-03 — Moved background jobs to a durable queue

Background jobs were moved out of the web process because serverless instances could terminate before work completed and retries could cause duplicate execution.

-->
