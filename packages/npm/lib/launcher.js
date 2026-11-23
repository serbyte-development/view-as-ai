import { createHash } from "node:crypto";
import { chmod, mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPOSITORY = "Serbyte-Development/view-as-ai";
const PACKAGE_ROOT = fileURLToPath(new URL("..", import.meta.url));

export function assetName(platform = process.platform, arch = process.arch) {
  const key = `${platform}-${arch}`;
  const assets = {
    "darwin-arm64": "view-as-ai-darwin-arm64",
    "darwin-x64": "view-as-ai-darwin-x64",
    "linux-arm64": "view-as-ai-linux-arm64",
    "linux-x64": "view-as-ai-linux-x64",
    "win32-arm64": "view-as-ai-windows-arm64.exe",
    "win32-x64": "view-as-ai-windows-x64.exe"
  };
  const asset = assets[key];
  if (!asset) {
    throw new Error(`unsupported platform: ${platform}-${arch}`);
  }
  return asset;
}

export function sha256(data) {
  return createHash("sha256").update(data).digest("hex");
}

export function defaultCacheRoot(
  platform = process.platform,
  env = process.env,
  home = homedir()
) {
  if (env.VIEW_AS_AI_CACHE_DIR) {
    return env.VIEW_AS_AI_CACHE_DIR;
  }
  if (platform === "win32") {
    return join(env.LOCALAPPDATA || home, "view-as-ai", "Cache");
  }
  if (platform === "darwin") {
    return join(home, "Library", "Caches", "view-as-ai");
  }
  return join(env.XDG_CACHE_HOME || join(home, ".cache"), "view-as-ai");
}

async function readPackageMetadata() {
  return JSON.parse(await readFile(join(PACKAGE_ROOT, "package.json"), "utf8"));
}

async function download(url, fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== "function") {
    throw new Error("Node.js 20 or newer is required");
  }
  const response = await fetchImpl(url, {
    redirect: "follow",
    headers: {
      "user-agent": "view-as-ai-npm"
    }
  });
  if (!response.ok) {
    throw new Error(`download failed (${response.status}): ${url}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function releaseChecksum(version, asset, fetchImpl = globalThis.fetch) {
  const url = `https://github.com/${REPOSITORY}/releases/download/v${version}/checksums.txt`;
  const response = await fetchImpl(url, {
    redirect: "follow",
    headers: {
      "user-agent": "view-as-ai-npm"
    }
  });
  if (!response.ok) {
    throw new Error(`download failed (${response.status}): ${url}`);
  }
  for (const line of (await response.text()).split(/\r?\n/)) {
    const match = line.match(/^([a-f0-9]{64})\s+\*?(.+)$/);
    if (match?.[2] === asset) {
      return match[1];
    }
  }
  throw new Error(`release v${version} is missing checksum for ${asset}`);
}

async function cachedBinaryIsValid(binaryPath, expectedHash) {
  try {
    return sha256(await readFile(binaryPath)) === expectedHash;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

export async function ensureBinary({
  version,
  platform = process.platform,
  arch = process.arch,
  cacheRoot = defaultCacheRoot(platform),
  fetchImpl = globalThis.fetch,
  log = (message) => console.error(message),
  expectedHash
}) {
  const asset = assetName(platform, arch);
  const trustedHash = expectedHash ?? (await releaseChecksum(version, asset, fetchImpl));
  if (!/^[a-f0-9]{64}$/.test(trustedHash || "")) {
    throw new Error(`missing trusted checksum for ${asset}`);
  }

  const binaryPath = join(cacheRoot, version, asset);
  if (await cachedBinaryIsValid(binaryPath, trustedHash)) {
    return binaryPath;
  }

  await rm(binaryPath, { force: true });
  await mkdir(dirname(binaryPath), { recursive: true });

  const base = `https://github.com/${REPOSITORY}/releases/download/v${version}`;
  log(`view-as-ai: downloading standalone binary v${version} for ${platform}-${arch}...`);
  const binary = await download(`${base}/${asset}`, fetchImpl);
  const actualHash = sha256(binary);
  if (actualHash !== trustedHash) {
    throw new Error(
      `checksum verification failed for ${asset} (expected ${trustedHash}, got ${actualHash})`
    );
  }

  const temporaryPath = `${binaryPath}.${process.pid}.${Date.now()}.tmp`;
  try {
    await writeFile(temporaryPath, binary, { mode: 0o755 });
    if (platform !== "win32") {
      await chmod(temporaryPath, 0o755);
    }
    await rename(temporaryPath, binaryPath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
  return binaryPath;
}

export function packageBinaryRoot() {
  return join(PACKAGE_ROOT, "vendor");
}

async function existingPackageBinary(version, platform = process.platform, arch = process.arch) {
  const binaryPath = join(packageBinaryRoot(), version, assetName(platform, arch));
  try {
    const info = await stat(binaryPath);
    return info.isFile() ? binaryPath : null;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function prepareBinary(options = {}) {
  const packageJson = await readPackageMetadata();
  return ensureBinary({
    version: packageJson.version,
    cacheRoot: packageBinaryRoot(),
    ...options
  });
}

export async function resolveBinary(options = {}) {
  const override = options.binaryPath ?? process.env.VIEW_AS_AI_BINARY;
  if (override) {
    return override;
  }

  const packageJson = await readPackageMetadata();
  const installed = await existingPackageBinary(
    packageJson.version,
    options.platform,
    options.arch
  );
  if (installed) {
    return installed;
  }

  return ensureBinary({
    version: packageJson.version,
    ...options
  });
}

export function runBinary(binaryPath, args, spawn = spawnSync) {
  const result = spawn(binaryPath, args, {
    stdio: "inherit",
    windowsHide: false
  });
  if (result.error) {
    throw result.error;
  }
  if (result.signal) {
    throw new Error(`standalone binary exited after signal ${result.signal}`);
  }
  return result.status ?? 1;
}

export async function main(args) {
  const binary = await resolveBinary();
  return runBinary(binary, args);
}
