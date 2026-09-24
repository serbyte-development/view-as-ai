import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const target = resolve("dist/site-context/target/index.html");
const bytes = readFileSync(target);
const hash = createHash("sha256").update(bytes).digest("hex");
console.log(`${hash}  ${target}`);
