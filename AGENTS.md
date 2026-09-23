# View as AI

Read `wiki/AGENTS.md` before substantial changes.

View as AI is a stable tool. Prefer maintenance over further reverse-engineering:

- Runtime is direct HTTP origin HTML -> conservative pruning -> formatter.
- Do not add JavaScript rendering back without a concrete product requirement.
- Information presence matters more than exact Markdown, whitespace, or line layout.
- Keep the installed package small; calibration/oracle tooling belongs in the archived research bundle.
- Preserve OpenAI attribution in `THIRD_PARTY_NOTICES.md` and `licenses/`.
