import { execFileSync } from "node:child_process";

const prev = process.env.VERCEL_GIT_PREVIOUS_SHA;
const current = process.env.VERCEL_GIT_COMMIT_SHA || "HEAD";

if (!prev) {
  console.error("No VERCEL_GIT_PREVIOUS_SHA; build required.");
  process.exit(1);
}

let files;
try {
  const output = execFileSync("git", ["diff", "--name-only", prev, current], { encoding: "utf8" });
  files = output.split("\n").map((value) => value.trim()).filter(Boolean);
} catch {
  console.error("Unable to determine changed files; build required.");
  process.exit(1);
}

if (files.length === 0) {
  console.log("No changed files; skip Vercel build.");
  process.exit(0);
}

const alwaysBuildPrefixes = [
  "apps/web/",
  "packages/core/src/",
  "packages/core/package.json",
  "package.json",
  "package-lock.json",
  "vercel.json",
  "scripts/vercel-ignore-build.mjs"
];

const alwaysBuildFiles = new Set([
  ".vercel-force-deploy",
  ".vercel-redeploy"
]);

const shouldBuild = files.some((file) =>
  alwaysBuildFiles.has(file) ||
  alwaysBuildPrefixes.some((prefix) => file === prefix || file.startsWith(prefix))
);

if (shouldBuild) {
  console.log("Web-affecting change detected; Vercel build required.");
  for (const file of files) console.log(file);
  process.exit(1);
}

console.log("Changes are CI/docs/mobile-test only; skip Vercel build.");
for (const file of files) console.log(file);
process.exit(0);
