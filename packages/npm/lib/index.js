import { execFile } from "node:child_process";

import { prepareBinary, resolveBinary } from "./launcher.js";

export { prepareBinary };

export async function viewAsAI(source, options = {}) {
  if (typeof source !== "string" || !source.trim()) {
    throw new TypeError("viewAsAI source must be a non-empty string");
  }

  const timeout = options.timeout ?? 30;
  if (!Number.isFinite(timeout) || timeout <= 0) {
    throw new TypeError("viewAsAI timeout must be a finite positive number");
  }

  const binary = await resolveBinary({ binaryPath: options.binaryPath });
  const args = [source, "--format", "json", "--timeout", String(timeout)];
  if (options.markdownLinks) {
    args.push("--markdown-links");
  }

  const stdout = await new Promise((resolve, reject) => {
    execFile(
      binary,
      args,
      {
        encoding: "utf8",
        maxBuffer: options.maxBuffer ?? 8 * 1024 * 1024,
        signal: options.signal
      },
      (error, output, stderr) => {
        if (error) {
          const message = stderr.trim() || error.message;
          const wrapped = new Error(message, { cause: error });
          reject(wrapped);
          return;
        }
        resolve(output);
      }
    );
  });

  return JSON.parse(stdout);
}
