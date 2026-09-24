# Code Mode web.run Capture Prompt

Use this file as the handoff for a fresh ChatGPT session that needs to capture native ChatGPT
`web.run` output for View as AI calibration.

## Required tools: Work Mode not Chat Mode

Enable native web browsing and `@[...] Macbook`. Use Code Mode (`functions.exec`) for the
OpenAI-side web capture and `@[...] Macbook` for repository writes and validation.

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

The data path must remain programmatic:

```text
live native web/open result
  -> JavaScript string in Code Mode
  -> programmatically constructed patch text
  -> @[...] Macbook apply_patch
  -> captures/<capture-id>/native.web.txt
```

The model should never be the transport layer for the captured page body.

## Procedure

1. Initialize `@[...] Macbook` with `start_here` in coding mode once per conversation. Reuse an
   existing initialized connection.
2. In Code Mode, inspect `ALL_TOOLS` and identify the live OpenAI web-browsing callable that can
   open a URL, plus the selected Macbook's `apply_patch` callable. Use their exposed names and
   schemas. During the 2026-09-24 preflight, the native callable was
   `tools.mcp__codex_apps__search_service_web_run`, with an `open` argument such as
   `{ open: [{ ref_id: fixtureUrl }], response_length: "long" }`. The Macbook writer was
   `tools.mcp__codex_apps__austins_macbook_apply_patch`. These exposed names use lowercase;
   matching `"Macbook"` or requiring an `"__apply_patch"` suffix misses this writer.
   Confirm discovery in each new environment. Use the native OpenAI callable for the oracle;
   curl, HTTP clients, browser automation, and Shellby `fetch_url` can verify the origin separately.
3. Verify that the requested fixture URL is the public deployed URL under
   `https://view-as-ai.vercel.app/`. Verify the intended production commit using deployment
   metadata, and choose an unused capture directory. Check that `native.web.txt` does not already
   exist before writing; preserve existing evidence and use a new capture ID for another run.
4. Invoke the native `open` callable from Code Mode and keep its returned value in JavaScript.
   After the call, check both the tool error flag and the returned text. Native access failures can
   appear as `Internal Error` / `URL ... is not accessible via this tool.` even when `isError` is
   false. Preserve those responses as diagnostic evidence and record the access failure.
   An unexpected baseline access failure blocks pipeline validation. An HTTP error deliberately
   tested by an experiment remains an experiment outcome to interpret.

   Verify the result's reported source/resolved URL against the requested URL and the experiment's
   documented redirect behavior. Inspect source metadata or the returned header; a matching URL in
   an ordinary body link is insufficient. Preserve both requested and resolved URLs for intended
   redirects. Stop on an unexplained different source URL.
5. Inspect the result structure programmatically and select the complete model-facing text directly
   from it. An MCP response uses a `content` array; when its sole block has type `text`, the string
   is `result.content[0].text`. Check the structure before using that path. For a different
   response shape, identify the returned text fields without guessing, silently dropping blocks,
   or serializing the whole response object as page text.

   Preserve tool-supplied headers, citation/reference notation, line labels, and truncation notices
   when they are part of the returned text. Preserve characters, punctuation, Unicode, content,
   and ordering. Incidental line-ending normalization or a terminal file newline is acceptable.
   Record any returned truncation or partial output when interpreting the capture.
6. Build the repository patch entirely in the same Code Mode execution from that captured string.
   The following write fragment assumes steps 3–5 have verified a fresh destination and selected
   `capturedText` directly from the live result:

   ```js
   const repoDir = "/Users/austinserb/Desktop/agent-workspace/projects/modelview"
   const fixture = "packages/calibration-site/captures/<capture-id>/native.web.txt"

   const applyPatchTool = ALL_TOOLS.find(
     ({ name }) =>
       name.toLowerCase().includes("austins_macbook") && name.endsWith("_apply_patch"),
   )
   if (!applyPatchTool) throw new Error("Macbook apply_patch tool not found")
   if (typeof capturedText !== "string" || capturedText.length === 0) {
     throw new Error("Expected model-facing text directly from the native result")
   }

   // Keep the returned text. A terminal newline added by apply_patch is acceptable.
   const patch = [
     "*** Begin Patch",
     `*** Add File: ${fixture}`,
     ...capturedText.split("\n").map((line) => `+${line}`),
     "*** End Patch",
   ].join("\n")

   const writeResult = await tools[applyPatchTool.name]({
     cwd: repoDir,
     patch,
   })
   if (writeResult.isError) throw new Error("Native capture write failed")
   text(writeResult)
   ```

   Confirm the write succeeded and the file exists. Do not delete an earlier capture, trim the
   returned text, or add an EOF-repair step for a harmless terminal newline. Hashes may identify
   the saved artifact; byte equality with the in-memory string is not a capture requirement.
7. Keep the entire capture, extraction, and patch construction in that Code Mode execution path.
   Do not print the raw capture into chat and then copy it into a later tool call.
8. After the raw capture is persisted, use `@[...] Macbook` to fetch/save the corresponding origin
   HTML independently when the task requires a paired comparison.
9. Run the repository checks or comparison scripts requested by the task only after the raw native
   capture is safely persisted.

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
- If the live web/open callable is unavailable, inaccessible, stale, or returns the wrong URL, stop
  and report that condition instead of creating misleading evidence.

## Why this matters

Local fixtures can validate View as AI's parser, but only a publicly reachable page can establish
what native ChatGPT web browsing actually exposes to the model. Keeping the native result on a
programmatic path from the OpenAI tool response to disk avoids substantive transcription changes
introduced by the assistant itself.
