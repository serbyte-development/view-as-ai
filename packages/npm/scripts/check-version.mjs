import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const repositoryRoot = join(packageRoot, "..", "..");

const packageJson = JSON.parse(await readFile(join(packageRoot, "package.json"), "utf8"));

const packageVersion = packageJson.version;

try {
  const pyproject = await readFile(join(repositoryRoot, "pyproject.toml"), "utf8");
  const pythonVersion = pyproject.match(/^version = "([^"]+)"$/m)?.[1];
  if (!pythonVersion) {
    throw new Error("could not read View as AI version from pyproject.toml");
  }
  if (packageVersion !== pythonVersion) {
    throw new Error(`version mismatch: npm=${packageVersion}, python=${pythonVersion}`);
  }
} catch (error) {
  if (error?.code !== "ENOENT") {
    throw error;
  }
}

console.log(`npm package and Python package aligned at v${packageVersion}`);
