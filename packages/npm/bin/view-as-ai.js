#!/usr/bin/env node

import { main } from "../lib/launcher.js";

try {
  process.exitCode = await main(process.argv.slice(2));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`view-as-ai: ${message}`);
  process.exitCode = 1;
}
