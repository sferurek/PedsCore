# November sprint release candidate — 2026-11-05

Prepared for maintainer approval; main and production remain unchanged. Public-alpha scope and pending independent clinical review remain explicit.

## Included reviewed changes

| PR | Source head | Scope |
| --- | --- | --- |
| #167 | 55042ac | Nine runtime hubs, rendered/static SEO parity, invalid tool ID repair, JS test collection |
| #168 | 5efa3a2 | Deterministic CI installation |
| #169 | 8a17c65 | Conservative ignored-build gate and contract tests |
| #170 | 48797e4 | Accessible ES/EN clinical flows, score/probability presentation, review and teaching documents |
| #171 | 1f57a29 | Reject unknown PIM3 categories; valid calculations unchanged |
| #172 | 104b0ee | International briefing, README and Search Console/source evidence |
| #154 | 01f958f | Monthly routine Dependabot updates; security-update handling remains separate |

Changes were applied to an isolated branch from main `f8537dd211c9d2b61e54834f4669be5f2ad50345`. The conflicting `vercel.json` edits are consolidated: preserve redirects/rewrites, add the conservative ignoreCommand, and disable automatic deployments for the five source branches plus this release branch. Main is not disabled by these branch-specific entries. No source PR has been merged or closed.

## Verification

Joint local validation: 88 application test files / 634 tests passed, plus 17 build-gate contract tests. ESLint, web TypeScript (no emit), governance and Alexa manifest checks passed. Core compilation and sitemap generation were required test preparation; no full local production web build was run. Generated public sitemap output was restored after tests. Necessary production-build and dist-based SEO checks run in the release PR's CI.

## Intended release and rollback boundary

Target: Vercel project `peds-core` / `prj_HfAtRzeAntN9tLMNd2Z9IFLtUsCI`, team `team_9Ueuj2gif8kSkMFplJF1NtnF`, canonical domain `pedscore.app`.

Last READY production baseline returned by Vercel: `dpl_EThwP1fAk49KB4JXFhaxGLfS3NG4`, source main `f8537dd211c9d2b61e54834f4669be5f2ad50345`, marked rollback candidate. Recheck the current production alias immediately before any authorized release/rollback; a historical candidate is not proof of the live alias at a later time.

The eventual authorized main merge can trigger the repository's GitHub Pages redirect workflow and configured Git integrations. A local git pull alone does not deploy Vercel. Keep project security and Search Console verification settings unchanged. Do not enable previews, merge or deploy on the strength of this document alone.

After explicit maintainer authorization and release: confirm the deployed source matches the approved merge tree, check the 18 localized topic routes through JavaScript, canonical/hreflang/sitemap, representative PRAM/PELOD-2 synthetic flows and warnings, and critical public API/MCP smoke. Stop or roll back on a material regression. No production smoke was run during candidate preparation.

## Remaining independent work

Search Console's canonical property still needs owner verification/access; an existing HTML verification file is publicly served and may permit URL-prefix verification without DNS changes, subject to Google's account/token check. This does not block the application's technical deployment, but canonical-domain indexing cannot be certified from the legacy property.

PELOD-2 source/rights reconciliation and pSOFA boundary/acquisition conditions require named clinical review. This release does not change those algorithms or claim independent product validation. LITFL outreach remains an unsent draft.
