import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { prepareBinary } from "../lib/launcher.js";

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const repositoryRoot = join(packageRoot, "..", "..");

// The release asset does not exist yet while developing this workspace. Published
// installs run after the matching GitHub Release exists and prefetch the binary.
let isRepositoryWorkspace = false;
try {
  const workspace = JSON.parse(await readFile(join(repositoryRoot, "package.json"), "utf8"));
  isRepositoryWorkspace = workspace.name === "view-as-ai-workspace";
} catch (error) {
  if (error?.code !== "ENOENT") {
    throw error;
  }
}

if (!isRepositoryWorkspace) {
  await prepareBinary();
}
