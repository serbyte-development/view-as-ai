import assert from "node:assert/strict";
import { mkdtemp, readFile, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { assetName, ensureBinary, sha256 } from "../lib/launcher.js";

test("maps supported Node platforms to release assets", () => {
  assert.equal(assetName("darwin", "arm64"), "view-as-ai-darwin-arm64");
  assert.equal(assetName("darwin", "x64"), "view-as-ai-darwin-x64");
  assert.equal(assetName("linux", "arm64"), "view-as-ai-linux-arm64");
  assert.equal(assetName("linux", "x64"), "view-as-ai-linux-x64");
  assert.equal(assetName("win32", "arm64"), "view-as-ai-windows-arm64.exe");
  assert.equal(assetName("win32", "x64"), "view-as-ai-windows-x64.exe");
  assert.throws(() => assetName("freebsd", "x64"), /unsupported platform/);
});

test("downloads, verifies, caches, and reuses a standalone binary", async () => {
  const cacheRoot = await mkdtemp(join(tmpdir(), "view-as-ai-npm-test-"));
  const binary = Buffer.from("fake standalone binary");
  const expected = sha256(binary);
  const requests = [];
  const fetchImpl = async (url) => {
    requests.push(url);
    return {
      ok: true,
      status: 200,
      arrayBuffer: async () => binary
    };
  };

  const options = {
    version: "9.8.7",
    expectedHash: expected,
    platform: "linux",
    arch: "x64",
    cacheRoot,
    fetchImpl,
    log: () => {}
  };

  const first = await ensureBinary(options);
  assert.equal(await readFile(first, "utf8"), binary.toString("utf8"));
  assert.ok((await stat(first)).mode & 0o111);
  assert.equal(requests.length, 1);

  const second = await ensureBinary({
    ...options,
    fetchImpl: async () => {
      throw new Error("cache miss");
    }
  });
  assert.equal(second, first);
});

test("rejects a binary that does not match the trusted checksum", async () => {
  const cacheRoot = await mkdtemp(join(tmpdir(), "view-as-ai-npm-test-"));
  await assert.rejects(
    ensureBinary({
      version: "9.8.7",
      expectedHash: "0".repeat(64),
      platform: "linux",
      arch: "x64",
      cacheRoot,
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        arrayBuffer: async () => Buffer.from("unexpected")
      }),
      log: () => {}
    }),
    /checksum verification failed/
  );
});
