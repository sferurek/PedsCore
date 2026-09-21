import { build } from "esbuild";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, process.argv[2] || "artifacts/mobile/pedscore-clinical-runtime.js");
mkdirSync(dirname(output), { recursive: true });

await build({
  entryPoints: [resolve(root, "scripts/mobile-clinical-runtime-entry.mjs")],
  outfile: output,
  bundle: true,
  platform: "browser",
  format: "iife",
  target: ["es2020"],
  minify: true,
  legalComments: "none"
});

console.log(`Wrote bundled offline PedsCore clinical runtime to ${output}`);
