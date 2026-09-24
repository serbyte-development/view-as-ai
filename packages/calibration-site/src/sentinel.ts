import { createHash } from "node:crypto";

function token(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function sentinel(testId: string, label = "PRIMARY"): string {
  const suffix = createHash("sha256").update(`${testId}:${label}`).digest("hex").slice(0, 8);
  return `VAI_SENTINEL_${token(testId)}_${token(label)}_${suffix.toUpperCase()}`;
}
