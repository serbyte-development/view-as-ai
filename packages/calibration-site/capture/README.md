# Calibration Capture Workflow

Use this workflow for every authoritative comparison between native ChatGPT `web.run` and View as
AI.

## 1. Deploy and verify

Deploy the fixture to `https://view-as-ai.vercel.app/` and verify the public URL contains the
expected test sentinels.

For ordinary deployments, push the validated commit to GitHub and let the linked Vercel project's
Git integration deploy it. Capture only after verifying that the public site is serving the
intended commit. Manual Vercel CLI deployments are reserved for experiments that explicitly need a
special deployment scenario.

Use an immutable capture ID:

```text
YYYY-MM-DD-<route>-<short-git-sha>
```

Example:

```text
2026-09-24-kitchen-sink-a1b2c3d
```

## 2. Capture native web.run

Follow `code-mode-prompt.md`. The native model-facing page text should move programmatically from
the live OpenAI web tool result to:

```text
captures/<capture-id>/native.web.txt
```

Do not manually transcribe, paraphrase, omit, reorder, or alter the returned text. Preserve the
actual characters, punctuation, Unicode, and content ordering. Incidental storage differences such
as one terminal newline or CRLF/LF line-ending normalization are acceptable and do not invalidate
the capture.

If a Work Mode capture batch was returned through chat and saved as a markdown file containing
`URL: ...` followed by fenced native results, import it mechanically with
`calibration-capture.py import-batch` before finalization. The importer creates one immutable
`native.web.txt` per URL and refuses partial parses, duplicate URLs, and existing destinations.

From the repository root:

```bash
npm run capture:import-batch --workspace @serbyte/view-as-ai-calibration-site -- \
  packages/calibration-site/capture/turn-2.md \
  --capture-date 2026-09-24 \
  --deployment-commit <verified-deployed-sha> \
  --batch-label turn-2
```

## 3. Finalize the evidence bundle

From the repository root:

```bash
npm run capture:finalize --workspace @serbyte/view-as-ai-calibration-site -- \
  <capture-id> \
  <public-url> \
  [TEST-ID...] \
  --deployment-commit <verified-deployed-sha> \
  --fixture-scenario <verified-scenario>
```

Example:

```bash
npm run capture:finalize --workspace @serbyte/view-as-ai-calibration-site -- \
  2026-09-24-kitchen-sink-a1b2c3d \
  https://view-as-ai.vercel.app/kitchen-sink/ \
  TEXT-001 VIS-001 SEM-003 \
  --deployment-commit a1b2c3d \
  --fixture-scenario default
```

Omit test IDs for `/baseline/`; its metadata records `test_ids: []`. Always pass the independently
verified deployed commit. `local_commit` records the working repository HEAD separately. The
scenario defaults to the private built manifest; an explicit scenario must agree with that manifest.
Build the matching scenario before finalizing its captures.

This creates:

```text
captures/<capture-id>/
├── native.web.txt   # authoritative native capture; never generated locally
├── origin.html      # public origin response used for the parser comparison
├── capture.json     # URL, commits, scenario, hashes, fixture/sentinel definitions, comparison
├── view-as-ai.txt   # generated from origin.html by the current parser
└── diff.txt         # generated native-vs-parser unified diff
```

`native.web.txt` is the oracle. `origin.html` is the paired public input. The parser output and
diff are derived artifacts and may be regenerated after parser changes.

Finalization refuses to overwrite an existing origin or capture metadata. Use `capture:compare`
for saved evidence and a new capture ID for another native run. Relevant fixture definitions,
including JSON-LD-only and visible sentinel groups, are preserved in `capture.json`.

The comparison treats one final LF used as a normal text-file terminator as transport rather than
page content. The stored `native.web.txt` remains authoritative evidence and should not be edited
after capture. Its SHA identifies the stored artifact; the research contract is text fidelity, not
byte identity with the in-memory tool value.

## 4. Recompare after parser changes

Do not refetch or replace the raw evidence. Run:

```bash
npm run capture:compare --workspace @serbyte/view-as-ai-calibration-site -- <capture-id>
```

This reruns the current parser against the saved `origin.html` and refreshes
`view-as-ai.txt`, `diff.txt`, and the comparison fields in `capture.json`. It checks saved evidence
hashes before comparison. A failed initial parser render can be retried using the origin and
metadata already saved by finalization.

## 5. Record the finding

Update the applicable rows in `CALIBRATION_RESULTS.md`:

- exact public URL;
- native outcome;
- View as AI outcome;
- match status;
- evidence path, normally `captures/<capture-id>/`;
- deployment/commit;
- concise finding.

Use `verified` only when the native capture is understood. Use `mismatch`, `follow-up`, or
`inconclusive` when the evidence requires more work.

## 6. Validate

```bash
npm run check:calibration
```

The plan defines the experiment. The raw native capture records what ChatGPT saw. The saved origin
records what was publicly served. The comparison script measures the current View as AI parser
against those fixed inputs. The results ledger records the conclusion.
