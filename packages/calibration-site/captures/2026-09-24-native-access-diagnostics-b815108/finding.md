# Native calibration access blocker

Status: blocked before successful baseline pipeline validation on 2026-09-24.

## Observations

- Native callable: `mcp__codex_apps__search_service_web_run` from Work Mode Code Mode.
- Exact baseline URL: `https://view-as-ai.vercel.app/baseline/`.
- Initial baseline request and one retry both returned:
  `URL https://view-as-ai.vercel.app/baseline/ is not accessible via this tool.`
- A native request for `https://view-as-ai.vercel.app/` also returned an access failure.
- The same diagnostic tool call successfully opened `https://example.com/`.
- The MCP wrapper reported `isError: false` while its returned text reported the access failure.
- Independent origin verification and both finalizations received baseline HTTP 200.
- Public baseline HTML matched the local build: 829 bytes, SHA-256
  `546d8dfcb2b06f029758832e8cbc7100e039a15b930a11de052e9358823264e4`.

Production deployment: `dpl_6WFSw2kxGbndjYUp1Gna6h4E3Gsu`, Git commit
`b8151082d794b71bc4b1a54f6b1eb6195ee86a36`, scenario `default`.
Local execution commit: `a9818f7a81c25dc056dbab96a25c6a198703c27a`.
The local/deployed difference changes capture documentation; fixture source is identical.

## Evidence

- `../2026-09-24-baseline-b815108/`: initial returned native error, exact origin HTML,
  parser output, diagnostic diff, capture metadata, full tool response, request, and timestamps.
- `../2026-09-24-baseline-b815108-retry-1/`: independent native retry with the same bundle.
- This directory: complete native homepage/control response and exact request metadata.

All native text was transferred directly from the live tool response through Code Mode into
Macbook `apply_patch`. Origin fetches supplied only the paired public HTML. Native error text
remains unchanged. The generated baseline diffs compare an access failure with parser output;
they support no extraction/parity classification and no parser changes.

## Unfinished work and resumption

No calibration ID has completed native evidence. All 531 IDs remain unexecuted: 520 default
cases across 305 primary URLs, followed by the 11 SITE experiments and their sequential scenarios.
Timing repeats, fragment controls, paired URLs, and required follow-ups remain pending.

This meets the campaign stop condition for native access failure preventing valid oracle captures.
The available responses identify an access failure for the calibration host; they do not explain
its underlying cause. No deployment or parser change was made to work around the failure.

Resume only after the native callable can return the public baseline page content. Use a fresh
capture ID, reverify the deployed commit/scenario, prove the baseline pipeline, then proceed through
the current plan. Keep these diagnostic captures as the record of this interrupted attempt.
