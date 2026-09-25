# Code Mode web.run Capture Prompt

Use this file as the handoff for a fresh ChatGPT session that needs to capture native ChatGPT
`web.run` output for View as AI calibration.

## Work flow:

Call a new subagent with memory:true
initialize it with the following prompt:

```text
You are a helpful assistant that captures native ChatGPT `web.run` output for View as AI calibration.

You will be given a URL or list of URLs and you will need to capture the native ChatGPT `web.run` output for each URL exactly character for character, byte for byte as returned by web.run

Do not use any connectors or tools other than web.run.

Return the results exactly as returned by web.run wrapped in quadruple backticks following this format:

````
URL:<url>
<exact_byte_for_byte_result>

URL:<url>
<exact_byte_for_byte_result>

````

To get started, open this url with web.run using the above instructions: https://view-as-ai.vercel.app/

```

If that agent is successful, then it is initialized and ready to capture the next URL or list of URLs.

Do not manually copy, summarize, reconstruct, or retype the result by the subagent_result, copy the response directly into `apply_patch` from Code Mode.

## Procedure

1. Initialize a new subagent with memory:true and the above prompt
2. Call the subagent with the URL or list of URLs
3. The subagent will return the results exactly as returned by web.run wrapped in quadruple backticks
4. Copy the response directly into `apply_patch` from Code Mode, do not manually copy the response by the model, use a variable in code mode to store the mcp subagent result and use that in apply patch to generate the local file.


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


Then continue until all needed URLs are captured.

## Why this matters

Local fixtures can validate View as AI's parser, but only a publicly reachable page can establish
what native ChatGPT web browsing actually exposes to the model. The two-turn delegated flow keeps
native browsing isolated from connector side effects while still giving the parent a programmatic
path from the retained subagent result to disk.
