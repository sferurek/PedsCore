import { after, test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

const dir = mkdtempSync(join(tmpdir(), "pedscore-build-gate-"));
const script = resolve("scripts/vercel-ignore-build.mjs");
const git = (...args) => execFileSync("git", args, { cwd: dir, encoding: "utf8" }).trim();
git("init", "-q");
git("config", "user.email", "fixture@example.invalid");
git("config", "user.name", "Build gate fixture");
git("commit", "--allow-empty", "-qm", "base");
const base = git("rev-parse", "HEAD");
after(() => rmSync(dir, { recursive: true, force: true }));
const run = (previous, current = "HEAD") => spawnSync(process.execPath, [script], {
  cwd: dir, env: { ...process.env, VERCEL_GIT_PREVIOUS_SHA: previous, VERCEL_GIT_COMMIT_SHA: current }
}).status;

test("missing or unknown baseline requests a build", () => {
  assert.equal(run(""), 1);
  assert.equal(run("missing-commit"), 1);
});
test("unchanged deployment skips", () => assert.equal(run(base, base), 0));
for (const [file, expected] of [
  ["docs/guide.md", 0], ["README.md", 0], ["packages/core/tests/a.test.ts", 0],
  ["apps/web/src/components/a.test.tsx", 0], [".github/dependabot.yml", 0],
  ["apps/web/src/main.tsx", 1], ["packages/core/src/index.ts", 1],
  ["packages/core/tsconfig.json", 1], ["scripts/generate-data.mjs", 1],
  ["api/test.js", 1], ["package-lock.json", 1], ["vercel.json", 1],
  ["apps/mcp-server/package.json", 1], ["unknown-file", 1]
]) {
  test(`${file}: ${expected === 0 ? "skip" : "build"}`, () => {
    const previous = git("rev-parse", "HEAD");
    const path = join(dir, file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, "fixture\n");
    git("add", "."); git("commit", "-qm", file);
    assert.equal(run(previous), expected);
  });
}
test("runtime rename to docs still requests a build", () => {
  const previous = git("rev-parse", "HEAD");
  git("mv", "apps/web/src/main.tsx", "docs/moved.md");
  git("commit", "-qm", "rename");
  assert.equal(run(previous), 1);
});
