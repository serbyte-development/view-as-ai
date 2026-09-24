import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";

import { HomePage } from "./pages/HomePage";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = join(packageRoot, "src");
const outputRoot = join(packageRoot, "dist");

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const html = `<!doctype html>${renderToStaticMarkup(<HomePage />)}\n`;

await Promise.all([
  writeFile(join(outputRoot, "index.html"), html, "utf8"),
  copyFile(join(sourceRoot, "styles.css"), join(outputRoot, "styles.css")),
]);

console.log(`Built calibration site at ${outputRoot}`);
