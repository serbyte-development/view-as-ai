# Code Mode web.run Capture Prompt

Use this file as the handoff for a fresh ChatGPT session that needs to capture native ChatGPT
`web.run` output for View as AI calibration.

## Required environment: Work Mode with delegated native-web capture

Use Work Mode so a delegated subagent can call native `web.run` from Code Mode. Repository writes,
origin fetching, finalization, and validation happen in the parent agent through `@[...] Macbook`.

**Do not let the delegated capture subagent call any connector tool.** During calibration we
confirmed that once the capture subagent touches a connector such as `@[...] Macbook`, Shellby,
`fetch_url`, Files, or another MCP connector, native `web.run` may stop being able to open
previously unknown hosts such as `view-as-ai.vercel.app` for the rest of that subagent session.
The parent agent may use connectors while the delegated capture subagent is working.

The public calibration site is:

`https://view-as-ai.vercel.app/`

Use the exact deployed fixture URL requested by the capture task.

## Capture contract

The authoritative source is the live native OpenAI web-browsing result for the public fixture URL.
The goal is to preserve the returned model-facing page text faithfully.

Do not manually retype, reconstruct, paraphrase, summarize, omit, reorder, or otherwise alter the
page body through the model. Do not rebuild the expected output from the local HTML or from View as
AI. The native capture is the oracle.

The important fidelity requirement is the actual returned text: characters, punctuation, Unicode,
content, and ordering. Incidental file-transport formatting is not part of the oracle. A terminal
newline added by a patch/write tool, CRLF/LF normalization, or an equivalent text-file terminator
does not invalidate a capture.

The preferred data path is:

```text
delegated subagent native web/open result
  -> text() inside the subagent's Code Mode turn
  -> same subagent returns retained batch in a quadruple-backtick block
  -> parent subagent_result result
  -> parent Code Mode extracts only that fenced block
  -> parent @[...] Macbook apply_patch
  -> capture/turn-N.md
  -> capture:import-batch
  -> captures/<capture-id>/native.web.txt
```

The native result must not be manually copied, summarized, reconstructed, or retyped by the parent
agent. The parent should chain the returned subagent response directly into `apply_patch` from Code
Mode.

## Procedure

1. Initialize `@[...] Macbook` in the **parent** conversation with `start_here` in coding mode
   once per conversation. Reuse that initialized connection for repository work.
2. Start or reuse a delegated capture subagent that has **never used a connector**. Tell it only to:
   - use native `web.run` from Code Mode;
   - open the exact requested public URLs;
   - immediately UTF-8/base64 encode each complete model-facing native result in Code Mode, then
     pass `text(JSON.stringify({ url, result_base64 }))`, where `url` is the exact requested URL;
   - preserve the exact URL/result association;
   - avoid summarizing or interpreting the result;
   - avoid every connector/MCP tool other than the native web capability.

   A batch of about 10 URLs is a safe default. Larger batches may be reasonable for known one-line
   fixtures, but keep the returned response comfortably below tool/context limits.
3. Verify in the parent that the requested fixture URLs are public deployed URLs under
   `https://view-as-ai.vercel.app/`. Verify the intended production commit using deployment
   metadata. Keep the deployment stable while the batch is being captured.
4. **Capture turn:** let the delegated subagent call native `web.run/open` for every URL. In the
   same Code Mode execution, encode the complete returned model-facing text as UTF-8 base64 and emit
   `text(JSON.stringify({ url, result_base64 }))`. Base64 is the preferred relay because native
   citation tokens can otherwise be interpreted or merged when the retained text is reproduced on
   the next turn. Native access failures may appear as `Internal Error` /
   `URL ... is not accessible via this tool.`; retain those results too. An intentionally tested
   HTTP error remains an experiment outcome rather than a capture-system failure.
5. **Return turn:** continue with the **same subagent** and make **no new tool calls**. Ask it to
   reproduce the already-retained `text()` outputs in original order inside one
   quadruple-backtick fenced block, one JSON string per line:

   ```text
   {"url":"https://view-as-ai.vercel.app/...","result_base64":"<base64>"}
   ```

   Do not ask the model to rebuild JSON or base64 manually; the capture turn should have produced
   each JSON string and base64 payload programmatically before passing it to `text()`. Do not
   start a fresh subagent between the capture and return turns; turn history is what preserves the
   `text()` output.
6. In the parent's Code Mode call, retrieve that return turn using `subagent_result`. The response
   may include MCP/subagent metadata before or after the assistant content. Programmatically extract
   only the single quadruple-backtick block. Do not manually copy the block through the model.
7. In that same parent Code Mode execution, build an `apply_patch` request from the extracted block
   and write it to:

   `packages/calibration-site/capture/turn-N.md`

   Example parent-side extraction/write:

   ```js
   const result = await tools.<subagent_result>({
     turn_ids: ["<return-turn-id>"],
     wait_ms: 30000,
   })

   const raw = result.text ?? String(result)
   const match = raw.match(/````(?:[^\n]*)\n([\s\S]*?)\n````/)
   if (!match) throw new Error("Expected one quadruple-backtick capture block")

   const capturedBatch = match[1]
   const patch = [
     "*** Begin Patch",
     "*** Add File: packages/calibration-site/capture/turn-N.md",
     ...capturedBatch.split("\n").map((line) => `+${line}`),
     "*** End Patch",
   ].join("\n")

   await tools.<macbook_apply_patch>({
     cwd: "/Users/austinserb/Desktop/agent-workspace/projects/modelview",
     patch,
   })
   ```

8. Import the saved batch mechanically with `capture:import-batch`. The importer prefers the
   canonical JSON-lines/base64 relay format, decodes each `result_base64` back to UTF-8, and also
   accepts the older JSON `result`, per-URL triple-fenced, and raw `URL:`-delimited formats. It
   rejects partial parses, duplicate URLs, unexpected hosts, malformed base64, and existing
   destinations, then creates one immutable `native.web.txt` per URL.
9. Finalize each capture against the verified deployed commit/scenario, generate
   `origin.html`, `view-as-ai.txt`, `diff.txt`, and `capture.json`, then update
   `CALIBRATION_RESULTS.md`.
10. Validate and commit coherent completed batches locally. Do not push capture-only commits while
    the production fixture deployment must remain pinned to an earlier verified commit.
11. The same connector-free subagent may be reused for later native-web batches. Parent connector
    usage does not contaminate the delegated subagent session; only connector use **inside the
    delegated subagent** is known to trigger the web-access problem.

After the raw native file exists, return to `capture/README.md` and run the finalize step. That
fetches the paired origin HTML and generates the current View as AI output and diff.

## Fidelity rules

- Capture the exact public fixture URL that was requested. Do not substitute localhost, a preview
  deployment, cached HTML, or another route.
- Preserve the native page text faithfully: no altered characters, punctuation, Unicode,
  citation/reference notation, omitted text, inserted text, or reordered content.
- Preserve meaningful internal whitespace and line structure when practical, but do not treat a
  terminal newline or CRLF/LF line-ending normalization as a capture failure.
- Do not derive native output from View as AI. View as AI is what the capture is validating.
- Do not use the local origin HTML as the expected result.
- Do not use a stale conversation's earlier web result after the deployed fixture changes. Capture
  again from the live public URL.
- Keep raw native captures separate from normalized or derived comparison fixtures. Generate derived
  artifacts with repository code rather than editing the raw capture by hand.
- Do not make the delegated native-web subagent read repository files or call repository connectors
  before/during its capture work. Give it the URLs and capture instructions directly in the prompt.
- Connector/subagent metadata returned by `subagent_result` is not part of the native capture.
  Strip it programmatically by extracting only the fenced capture block before writing the batch
  file.
- If the live web/open callable is unavailable, inaccessible, stale, or returns the wrong URL, stop
  and report that condition instead of creating misleading evidence.

## Why this matters

Local fixtures can validate View as AI's parser, but only a publicly reachable page can establish
what native ChatGPT web browsing actually exposes to the model. The two-turn delegated flow keeps
native browsing isolated from connector side effects while still giving the parent a programmatic
path from the retained subagent result to disk.
