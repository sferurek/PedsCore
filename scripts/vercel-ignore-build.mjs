import { execFileSync } from "node:child_process";

// Vercel: exit 0 skips a build; exit 1 requests a build.
// Keep this allowlist small: unknown or uninspectable changes always build.
const previous = process.env.VERCEL_GIT_PREVIOUS_SHA;
const current = process.env.VERCEL_GIT_COMMIT_SHA || "HEAD";
if (!previous) {
  console.log("No previous deployment SHA; build required.");
  process.exit(1);
}

let files;
try {
  files = execFileSync("git", ["diff", "--name-only", "--no-renames", "-z", previous, current, "--"], { encoding: "utf8" })
    .split("\0").filter(Boolean);
} catch {
  console.log("Cannot inspect deployment diff; build required.");
  process.exit(1);
}

const isNonRuntimeFile = (file) =>
  /^(?:docs\/.*\.(?:md|txt)|[^/]+\.md)$/.test(file) ||
  file.startsWith("packages/core/tests/") ||
  /^apps\/web\/src\/.*\.test\.(?:ts|tsx)$/.test(file) ||
  file === ".github/dependabot.yml";

const skip = files.every(isNonRuntimeFile);
console.log(skip ? "Documentation/test-only changes; skip build." : "Runtime or unknown change; build required.");
process.exit(skip ? 0 : 1);
