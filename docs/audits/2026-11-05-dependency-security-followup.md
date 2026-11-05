# Dependency security follow-up

This branch is stacked on the unmerged Vite patch in #179 (`ed5af82`). It does not include the unrelated analytics fix #178. All findings below concern the npm lockfile inspected on 2026-11-05, not proof of compromise or a guarantee of security.

## Exposure and remediation

| Dependency / chain | Severity and relationship | Exposure in this repository | Compatible correction |
| --- | --- | --- | --- |
| MCP → Express → body-parser | High, transitive runtime; [GHSA-27r3-jxmh-p828](https://github.com/advisories/GHSA-27r3-jxmh-p828) | SDK `createMcpExpressApp()` installs `express.json()` before routes and bearer authentication. Default inflation accepts compressed bodies. The advisory describes an unauthenticated process crash from trailing compressed-body bytes. Relevant to a running MCP service; not the static Vercel website handler. | 2.3.0 → 2.4.0, within Express's `^2.3.0`. No SDK/Express major change. |
| MCP SDK → AJV → fast-uri | Moderate, transitive runtime; [scheme/host normalization](https://github.com/advisories/GHSA-w74x-v6f9-j3xg) plus related advisories | URI parsing used by schema validation. No evidence that PedsCore uses this parser as an authorization boundary, but it is reachable infrastructure rather than solely a build dependency. | 3.1.8 → 3.1.9. |
| Vite → PostCSS | High plus moderate, transitive development; [source map disclosure](https://github.com/advisories/GHSA-r28c-9q8g-f849) and [follow-up](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) | Build-time processing of repository/dependency CSS and maps, not visitor-supplied CSS. Untrusted source/dependencies can still threaten a build environment. | 8.5.15 → 8.5.32. |
| PostCSS → nanoid | High, transitive development; [zero-size custom generator](https://github.com/advisories/GHSA-2v37-7h3g-55p8) and negative-size advisory | Build dependency; no clinical input drives a custom nanoid size in repository code. | 3.3.12 → 3.3.20. |
| PostCSS → source-map-js | High, transitive development; [indexed-map DoS](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) | Source maps consumed during tooling; no uploaded maps endpoint identified. | 1.2.1 → 1.2.2. |
| React plugin → Babel → browserslist → baseline-browser-mapping | High for browserslist, moderate for mapping; transitive development; [query cache OOM](https://github.com/advisories/GHSA-c83g-rgw3-j3cx), [stats handling](https://github.com/advisories/GHSA-73wf-gq98-2v4g), [invalid-input termination](https://github.com/advisories/GHSA-w5vr-8v7q-w6rv) | Browser targeting during build. Repository configuration is the input; no public browser-query API. | browserslist 4.28.2 → 4.29.5; mapping 2.10.33 → 2.11.35; associated compatibility data refreshes. |
| ESLint → js-yaml | High, transitive development; [merge CPU exhaustion](https://github.com/advisories/GHSA-2883-xcg3-v3hh), plus earlier merge/omap advisories | Lint configuration parsing; not a production YAML upload feature. | 4.2.0 → 4.3.2. |
| ESLint / TypeScript-ESLint → minimatch → brace-expansion | High for brace-expansion, transitive development; multiple expansion/recursion DoS advisories, including [latest recursion](https://github.com/advisories/GHSA-qhr7-859c-m2p7) | Lint/project file globbing on repository configuration. Untrusted repositories can affect tooling; no public clinical glob input. | brace-expansion 1.1.15 → 1.1.21 and 5.0.6 → 5.0.12. |
| Vitest → @vitest/mocker | Moderate; Vitest direct development, mocker transitive; [manual mock registration](https://github.com/advisories/GHSA-qxg6-89mg-rqv8), [redirect file read](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) | Potential development WebSocket exposure if mocker plugins are served. PedsCore uses `vitest run`, not a public mock registration service. | Vitest/mocker 4.1.8 → 4.1.12; manifest minimum raised to patched 4.1.12. |
| typescript-eslint and five internal packages → minimatch | Moderate; direct development umbrella plus transitive propagation; [globparts amplification](https://github.com/advisories/GHSA-g3hv-75wg-m249) | Lint/project include/exclude glob processing. Not in runtime production dependencies. | Upstream TypeScript-ESLint 8.72.1 still requires minimatch `^10.2.2`; installed 10.2.6 remains affected. Fixed minimatch is >=11.0.1. **Unresolved without upstream range change or separately validated major migration.** |

The seven remaining npm package findings are this one minimatch advisory plus propagation through TypeScript-ESLint, not seven independently demonstrated runtime vulnerabilities. Neither overrides, advisory ignores, dependency removal, `--force` nor legacy peer resolution is used to hide the finding. The normal compatible update already advances TypeScript-ESLint from 8.60.1 to 8.72.1; repeating `npm audit fix` cannot satisfy its minimatch major constraint.

## Changes and checks

`npm audit fix --ignore-scripts` selected versions inside existing declared ranges; review of the lockfile shows 38 version changes, including accompanying Vitest/TypeScript-ESLint packages and browser compatibility data. The direct manifest minimum for Vitest is raised to its patched version. The Vite major and React plugin remain unchanged from #179. No clinical calculation source changes.

Fresh audit: after #179, 18 package findings (7 high, 11 moderate); after this branch, **7 moderate, 0 high, 0 critical**. `npm audit --omit=dev` returns **0 findings**. These are date-specific registry audit results, not proof that every vulnerability is known or all deployed services use this lockfile.

Clean offline `npm ci`, the full core/web/API suite, lint and MCP suite are checked. Two MCP auth integration cases send small, local gzip requests: a valid compressed RPC must still receive 401 without a token; trailing bytes after compressed JSON must not terminate the process, and a subsequent health check must succeed. These tests exercise the real SDK/Express parser path. No exploit or load test was sent to production.

Raw audit/test evidence remains in the task workspace: `security-after-audit.json`, `security-runtime-audit.json`, `security-tests.log`, `security-mcp-tests.log`. Build/governance/SEO and MCP smoke are verified by GitHub checks instead of another local production build.

## Release boundaries and blockers

This PR targets #179's branch so the changes can be reviewed separately; #179 must be released first or the stack deliberately reconciled before this follow-up reaches main. No merge or deployment is authorized here. Vercel automatic deployment is disabled for this branch. A future authorized release must update the actual MCP service too: publishing the static website alone does not establish that the running MCP service has body-parser 2.4.0.

Remaining blocker: a compatible upstream TypeScript-ESLint/minimatch fix. Keep lint runs limited to trusted repository configuration while tracking it. Previously blocked source PR closures were not retried; no dependency was changed merely to suppress the audit output.
