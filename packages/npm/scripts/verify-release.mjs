import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const packageJson = JSON.parse(await readFile(join(packageRoot, "package.json"), "utf8"));

const expectedTag = `v${packageJson.version}`;
const suppliedTag = process.argv[2] || expectedTag;
const tag = suppliedTag.startsWith("v") ? suppliedTag : `v${suppliedTag}`;
if (tag !== expectedTag) {
  throw new Error(`release tag ${tag} does not match npm package version ${packageJson.version}`);
}

const url =
  `https://github.com/Serbyte-Development/view-as-ai/releases/download/${tag}/checksums.txt`;
const response = await fetch(url, {
  redirect: "follow",
  headers: {
    "user-agent": "view-as-ai-npm-release-check"
  }
});
if (!response.ok) {
  throw new Error(`could not download ${url}: HTTP ${response.status}`);
}

const releaseChecksums = new Map();
for (const line of (await response.text()).split(/\r?\n/)) {
  const match = line.match(/^([a-f0-9]{64})\s+\*?(.+)$/);
  if (match) {
    releaseChecksums.set(match[2], match[1]);
  }
}

const expectedAssets = [
  "view-as-ai-darwin-arm64",
  "view-as-ai-darwin-x64",
  "view-as-ai-linux-arm64",
  "view-as-ai-linux-x64",
  "view-as-ai-windows-arm64.exe",
  "view-as-ai-windows-x64.exe"
];

for (const asset of expectedAssets) {
  if (!releaseChecksums.has(asset)) {
    throw new Error(`release ${tag} is missing checksum for ${asset}`);
  }
}

console.log(`npm package can resolve all standalone assets from GitHub Release ${tag}`);
