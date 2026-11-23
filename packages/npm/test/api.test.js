import assert from "node:assert/strict";
import { chmod, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { viewAsAI } from "../lib/index.js";

test("viewAsAI returns structured JSON from the standalone binary", async () => {
  const directory = await mkdtemp(join(tmpdir(), "view-as-ai-api-test-"));
  const binary = join(directory, "fake-view-as-ai");
  await writeFile(
    binary,
    "#!/bin/sh\nprintf '%s\\n' '{\"url\":\"https://example.test/\",\"text\":\"# Example\",\"urls\":{},\"title\":\"Example\"}'\n",
    { mode: 0o755 }
  );
  await chmod(binary, 0o755);

  const result = await viewAsAI("https://example.test/", { binaryPath: binary });
  assert.deepEqual(result, {
    url: "https://example.test/",
    text: "# Example",
    urls: {},
    title: "Example"
  });
});

test("viewAsAI validates timeout before launching", async () => {
  await assert.rejects(
    viewAsAI("https://example.test/", { timeout: 0, binaryPath: "/unused" }),
    /finite positive number/
  );
});
