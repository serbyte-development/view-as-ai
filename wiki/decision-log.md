# Decision Log

Preserve major historical reasoning that helps a future agent understand why the project took its current direction.

Add an entry when a significant decision, reversal, discovery, rejected approach, validation, or lesson from real usage would be useful to understand later and its reasoning is not obvious from the current code, wiki, or Git history.

Do not use this as a changelog. Routine implementation changes, wiki maintenance, generated output, and tests run do not belong here.

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

## 2026-09-12 — Calibrate parser against production web.run

ModelView starts from copied OpenAI `gpt-oss` formatter code and treats production ChatGPT `web.run` output as empirical calibration target. Development uses a small set of real URLs, local raw HTML, parser output, and repeated diffs. Broader crawler or rendering infrastructure waits until observed differences require it.

## 2026-09-12: Native control serialization evidence

Selenium and OpenAI docs comparisons showed that basic tag preprocessing explains
the observed controls. A hidden native input still produced `[Input]`; select
options disappeared; the visible `Docs Overview` came from an adjacent span.
These observations corrected the earlier assumption of a full accessibility
tree serializer. Keep the implementation as copied formatter functions plus
tested transformations. Preserve provider extraction differences as explicit
limits instead of adding site-specific cleanup rules.

## 2026-09-14 — Stabilized runtime and removed browser rendering

Large calibration runs showed that native `web.run` is much closer to origin
HTML with conservative boilerplate removal than to a main-content extractor or
JavaScript-rendered DOM. Exact formatter/layout parity also overstated practical
differences, so information presence became the primary success criterion.
After reaching roughly 99% average information-level resemblance, the project
was stabilized around direct HTTP origin fetch, conservative pruning, and the
adapted formatter. CloakBrowser/Playwright and the large calibration corpus were
removed from the active runtime/repository.

## 2026-09-14 — Selected public identity as View as AI

The working name ModelView was replaced before public release. The selected public identity is
**View as AI**, with package/repository slug `view-as-ai`, Python module `view_as_ai`, and CLI
`view-as-ai`. The main explanatory tagline is **“View Website As AI”**, with ChatGPT as the first
calibrated browsing system. Keeping “as” in the name communicates perspective rather than generic
AI visualization or model inspection.
