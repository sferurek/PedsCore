# Conservative Vercel build gate — November 2026

Draft recovery of #122 on `f8537dd`; no merge or deployment authorized.

`vercel.json` runs `node scripts/vercel-ignore-build.mjs`. Vercel exit code 0 means skip; 1 means build. Only documentation Markdown/text, root Markdown, core test files, web unit test files, and Dependabot configuration may skip. All other paths require a build, including unknown files, API, MCP, scripts, package manifests, lockfiles, compiler config and web/core runtime. Renames include the deleted source path. A missing previous deployment SHA or failed diff always requests a build. The first deployment may therefore build; safety takes precedence over cost reduction.

Run `node --test scripts/tests/vercel-ignore-build.test.mjs` (17 cases, temporary Git fixture). The script is also included in `npm test`. The gate does not skip GitHub CI and does not grant release authorization.

This sprint branch explicitly disables Git deployments for its own branch with `git.deploymentEnabled`. Existing project-level deployment restrictions must remain until Sergio authorizes a rollout. The ignore command is a future cost-control mechanism; it does not deploy anything itself.

Dependabot: keep existing #154 rather than duplicate it. Its monthly routine version updates, two-open-PR cap, minor/patch group scoped to `version-updates`, and restored default labels are compatible with this branch. Security-update handling remains separate. Do not close or merge existing PRs automatically.

Sources: [Vercel ignored build step](https://vercel.com/docs/project-configuration/project-settings#ignored-build-step), [branch deployment controls](https://vercel.com/docs/project-configuration/git-configuration), [Dependabot options](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference).
