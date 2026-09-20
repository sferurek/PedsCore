import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createMobileClinicalBundle } from "../packages/core/dist/index.js";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRevision = process.env.PEDSCORE_SOURCE_REVISION?.trim() ||
  execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
const generatedAt = process.env.PEDSCORE_GENERATED_AT?.trim() || new Date().toISOString();
const outputPath = resolve(
  repoRoot,
  process.argv[2] || "artifacts/mobile/pedscore-clinical-bundle.json"
);

const bundle = createMobileClinicalBundle({ sourceRevision, generatedAt });
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(bundle, null, 2)}\n`, "utf8");
console.log(`Wrote PedsCore mobile clinical bundle to ${outputPath}`);
console.log(`sourceRevision=${sourceRevision}`);
console.log(`tools=${bundle.tools.length}`);
console.log(`calculatorToolIds=${bundle.calculatorToolIds.length}`);
