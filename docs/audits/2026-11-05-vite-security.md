# Vite security update review

## Finding and scope

The main lockfile resolves Vite **6.4.3** as a development dependency. A live npm audit on 2026-11-05 reports Vite at high severity through **CVE-2026-112942 / GHSA-587h-7wmj-h5pm**, a launch-editor Windows existence-check bypass affecting Vite <=6.4.3. The original advisory states Windows-only impact; the first fixed Vite 6 release is 6.4.4. This specific high-severity path does not affect the Mac host or Linux CI. Other moderate/low development-server advisories also affect 6.4.3, so an update is still warranted.

Primary references:

- [High launch-editor advisory](https://github.com/advisories/GHSA-587h-7wmj-h5pm)
- [Non-Windows development-server path authorization issue](https://github.com/vitejs/vite/security/advisories/GHSA-rq7h-c2jc-7f22), fixed in 6.4.4.
- [Vite 6.4.4 deny-list regression](https://github.com/vitejs/vite/security/advisories/GHSA-8g5g-mxqh-grgj), fixed in **6.4.5**.
- [Official 6.4.5 release](https://github.com/vitejs/vite/releases/tag/v6.4.5).

Production uses `vite build` to create `apps/web/dist`, served by Vercel as static assets with separate API functions. The Vite development server and launch-editor are not the production request handler. These specific findings concern development tooling, not demonstrated exploitation of the published clinical site. Build-time tooling still deserves patching; a devDependency classification alone is not a blanket security guarantee.

The committed web config has no explicit network host binding, custom Vite middleware or transformIndexHtml integration. Previous sprint dev checks explicitly bound 127.0.0.1. No exploit, secret file access or editor-launch test was performed.

## Dependabot proposal and compatibility

PR #150 (8.3.4) is already closed without merging; PR #175 proposes **8.3.5** and remains open. Neither was closed or edited by this investigation.

For PR #175 head `020b85b590f603a8b58ec4db2b9a56ac8262e50a`, both [CI](https://github.com/sferurek/PedsCore/actions/runs/42042809025) and [MCP smoke](https://github.com/sferurek/PedsCore/actions/runs/42042808991) fail. CI fails at dependency installation before tests or build. Its logs show `ERESOLVE`: `@vitejs/plugin-react@4.7.0` accepts Vite 4/5/6/7, not Vite 8. Upgrading that plugin and migrating the bundler is a larger compatibility change than needed for this advisory.

## Proposed correction and verification

Raise the manifest floor to `vite: ^6.4.5` and lock **6.4.5**, keeping the existing React plugin and Vitest versions. This avoids the intermediate 6.4.4 regression and resolves the identified Vite advisories without a major bundler migration. Lockfile diff changes only Vite's root requirement, version, tarball URL and integrity; no unrelated package upgrades.

Local `npm ci` succeeds without legacy-peer-deps or force; `npm ls vite @vitejs/plugin-react` reports Vite 6.4.5 consistently deduplicated through the React plugin, Vitest and its mocker. The existing full tests and ESLint pass. No extra implementation-mirroring version tests are added; full build, SEO, governance and MCP compatibility are checked by GitHub CI.

Fresh npm audit no longer lists Vite. Overall audit totals fall from 19 to 18 findings, high from 8 to 7; unrelated advisories remain and are not claimed fixed. Raw local audit evidence: `../vite-baseline-audit.json` and `../vite-patched-audit.json` in the task workspace (not committed).

No local production build or Vercel deployment is needed for this preparation. Automatic Vercel deployment is disabled for this branch; merging or deploying requires new user authorization. This draft is an alternative to #175 for the security fix, not a claim that a future Vite 8 migration is unnecessary. Existing blocked PR closures were not retried.
