import { spawnSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const packageRoot = process.cwd();
const outputRoot = resolve(packageRoot, ".calibration-build");
const tsc = resolve(packageRoot, "node_modules/typescript/bin/tsc");

rmSync(outputRoot, { recursive: true, force: true });

const compile = spawnSync(process.execPath, [tsc, "-p", "tsconfig.build.json"], {
  cwd: packageRoot,
  stdio: "inherit",
});
if (compile.status !== 0) process.exit(compile.status ?? 1);

writeFileSync(resolve(outputRoot, "package.json"), '{"type":"commonjs"}\n', "utf8");

const build = spawnSync(process.execPath, [resolve(outputRoot, "src/build.js")], {
  cwd: packageRoot,
  stdio: "inherit",
});
process.exit(build.status ?? 1);
