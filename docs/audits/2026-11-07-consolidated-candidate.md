# Consolidated November night-sprint candidate

Sergio confirmed on 7 November that the hackathon entry was not made and authorized continuing the sprint and integrating local corrections. The earlier Devpost precaution is superseded. This is a draft review candidate, not permission to merge or deploy.

## One review vehicle

Branch `sprint/night-verified-candidate-20261107`, based on main `fba367fc76cf2aef7229291f9e82bf245f49fba5`, consolidates the previously reviewed work of draft #183, #184 and #185 plus the local follow-ups. Source branches and PRs remain unchanged. Review/merge this combined change as an alternative to individually merging those overlapping PRs; do not apply both release paths. Existing source-PR histories are retained in their branches.

- #183: compatible security updates, analytics repair, sitemap lastmod, Gorelick copy and accessible calculator flows.
- #184: discrete score contracts, negative BMS labs, supported Apgar timing IDs, malformed supplied optional Phoenix values.
- #185: stable catalogue-search keyboard listener and unique label/input relationships after scroll.
- Local follow-ups: integer GCS in four tools, malformed supplied pSOFA ratios, Modified Sarnat's declared form IDs, nonnegative PCDAI/wPCDAI laboratory values.

The consolidated code snapshot before this documentation and branch guard is local commit `37ef10b6e7853d218718a2cb95f21034455e5731`. It passed **753 application tests +17 build-gate cases +37 local MCP tests =807**, lint and web TypeScript. The local tests use Node 26; remote CI validates Node 22 and performs the full production build once for the draft. No unnecessary full local web build. Final exact-head workflow evidence belongs in the draft description and private handoff report, not an unverified claim here.

Detailed regression evidence is in the linked audit files. The four GCS models preserve 52 complete baseline outputs; Sarnat preserves all 4,096 complete numeric/descriptor combinations. Browser checks use synthetic data on localhost in ES/EN. These are technical preservation tests, not independent clinical validation or source-derived clinical gold standards.

## Decisions still open

- BMS source population (29 days–19 years) and the catalog's 6575-day upper limit require clinical reconciliation and exact day/year semantics. No new eligibility threshold is guessed.
- PELOD-2 full-table/source rights and specific pSOFA boundary ambiguities remain documented in the existing source follow-up. No thresholds are reinterpreted.
- PRISM IV collection windows and age/month/year encoding need clinical sign-off. No independent clinical-review status is claimed.
- Measured-zero and unavailable-data behavior are preserved; implementing an existing numeric type/lower-bound contract is not a new clinical plausibility definition.
- The remaining moderate minimatch advisory is inherited through development TypeScript-ESLint; no incompatible forced major, suppression or arbitrary override is included.

## Publication and verification limits

The candidate branch has `git.deploymentEnabled=false`, retaining all earlier branch guards. No branch-protection changes, automatic merge, deployment, DNS, access grant or invalid-input probe against production. Main and the prior frozen local integration `e56bb3d2c11d942912379c7ac2dd42693d715da1` remain untouched. Static-web publication and an actual MCP service release are separate future operations.

Search Console's last checked data remains tiny and delayed, with historical canonical-duplicate inspections awaiting recrawl. No ranking gain or indexing resolution is inferred from this candidate. No mass indexing request is included.

## Detailed audits

- [GCS integer contract](2026-11-07-gcs-integer-local.md)
- [pSOFA supplied ratios](2026-11-07-psofa-ratio-local.md)
- [Sarnat form adapter and IBD labs](2026-11-07-sarnat-ibd-local.md)
- [Discrete score contracts](2026-11-07-discrete-score-inputs.md)
- [BMS validation](2026-11-07-bms-input-validation.md)
- [Supplied-value validity](2026-11-07-supplied-input-validity.md)
- [Search accessibility](2026-11-07-search-accessibility.md)
- [Night UX implementation](2026-11-07-night-sprint.md)
