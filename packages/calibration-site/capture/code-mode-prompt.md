# Code Mode web.run Capture Prompt

Use this file as the handoff for a fresh ChatGPT session that needs to capture native ChatGPT
`web.run` output for View as AI calibration.

## Required tools

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

1. Initialize `@[...] Macbook` with `start_here` in coding mode.
2. In Code Mode, inspect `ALL_TOOLS` and identify the live OpenAI web-browsing callable that can
   open/fetch a URL. Do not assume a specific tool name; use the callable and schema actually
   exposed in the current session.
3. Verify that the requested fixture URL is the public deployed URL under
   `https://view-as-ai.vercel.app/` and that the web result is for that exact URL before writing
   any evidence.
4. Invoke the web/open callable from Code Mode. Keep the returned result in JavaScript.
5. Inspect the returned value programmatically and select the model-facing page text. Preserve its
   characters, punctuation, Unicode, content, and ordering. Do not paraphrase or reconstruct it.
   Incidental line-ending normalization or a terminal file newline is acceptable.
6. Build the repository patch entirely in the same Code Mode execution from that captured string.
   A typical write path is:

   ```js
   const repoDir = "/Users/austinserb/Desktop/agent-workspace/projects/modelview"
   const fixture = "packages/calibration-site/captures/<capture-id>/native.web.txt"

   // `capturedText` must come directly from the live web/open tool result.
   const patch = [
     "*** Begin Patch",
     `*** Delete File: ${fixture}`,
     `*** Add File: ${fixture}`,
     ...capturedText.split("\n").map((line) => `+${line}`),
     "*** End Patch",
   ].join("\n")

   const applyPatchTool = ALL_TOOLS.find(
     (tool) => tool.name.endsWith("__apply_patch") && tool.name.includes("Macbook"),
   )
   if (!applyPatchTool) throw new Error("Macbook apply_patch tool not found")

   await tools[applyPatchTool.name]({
     cwd: repoDir,
     patch,
   })
   ```

   If the target file does not already exist, omit the delete section. Do not spend effort correcting
   a harmless terminal newline added or removed by the patch/write mechanism.
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
