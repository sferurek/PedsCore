# PedsCore night sprint — 7 November 2026

## Scope and provenance

Isolated candidate `sprint/night-quality-20261107`, based on main `fba367fc76cf2aef7229291f9e82bf245f49fba5`. Main and the habitual development checkout are untouched. This candidate carries the existing pending patches from #179, both commits of stacked #180, #178, #181 and #182, in that order. They were not reimplemented. The only integration conflicts were branch deployment guards in vercel.json; all guards and the existing conservative build-ignore command are retained. Candidate previews are disabled too. No source PR was closed or merged.

## New verified improvements

- Required numeric form fields reject non-finite values and partially parsed text. Finite zero, decimals/scientific notation and existing catalog ranges retain their semantics. No clinical scoring algorithm or cutoff changes.
- Sequential forms move keyboard focus to the next open question after explicit completion; finishing moves focus to the result after the React update. Initial loading, typing, manual toggles and reset do not steal focus. Open accordion triggers reference their actual panels, and errors remain associated with fields.
- Numeric error text describes a valid number and the existing min/max when defined, rather than calling an out-of-range answer missing data.
- Deduplicate clinical guide tags in order before taking the first seven. Nine catalog tools had repeated IDs across problem/function/setting lists; ES/EN rendered coverage checks all 137 tools for duplicate visible labels and React duplicate-key warnings.
- Seven technically active tools inherited the old generic “automatic calculation remains inactive” notice: Silverman-Andersen, Clinical Dehydration Scale, the four QTc formulas and Bedside Schwartz. Only that shared stale notice is replaced when the registry already marks the tool active. Tool-specific cautions and independent clinical review limitations remain.
- Mobile QA found that long units inherited the giant numeric typography. Show the complete unit in its own smaller line immediately after the prominent number, without conversions or clipboard changes. Score/probability separation remains intact.

## Security recheck

Fresh npm registry audit on 2026-11-07: **0 critical, 0 high, 7 moderate** in the combined candidate. All seven package findings propagate from minimatch advisory [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) through development TypeScript-ESLint. Current registry TypeScript-ESLint/estree is still 8.72.1 and requires minimatch ^10.2.2; no compatible upstream fix is available in that version. No forced major, override, advisory suppression or dependency removal was introduced. Audit data is time-specific, not a claim about unknown vulnerabilities or deployed services.

The runtime body-parser/fast-uri and compatible tooling patches from #180 are retained. MCP parser/auth regressions use small local synthetic requests, never production probes. Publishing the static website in a later authorized release would not prove that a separately running MCP service was updated.

## Validation

Local combined suite: 664 core/web/API tests and 17 build-ignore contract cases passed before the final two unit-presentation cases; those two then passed with the four existing result-presentation cases. The final exact candidate is checked again in CI, including full build, governance, SEO, Alexa manifest and MCP auth/protocol. Local MCP suite: 23 passed. ESLint and web TypeScript no-emit checks passed. No local full production web build was run.

Manual local browser QA used synthetic values only:

- ES/EN Bedside Schwartz: initial state, empty-field error, error association, Enter advance, Tab into next control, final result focus, reset. Example 150 cm / 0.8 mg/dL remains 77.4 mL/min/1.73 m2.
- Step-by-Step adaptive flow: relevant questions appear; switching an earlier answer hides/clears downstream inputs and updates result/focus. This checks form mechanics, not independent validation of the clinical rule.
- Widths 390, 768 and 1440 px: no horizontal document overflow for the checked calculator. Mobile long-unit rendering was reviewed after the correction.

Private raw audit, test logs and browser evidence remain in the task's sprint-handoff directory. Necessary remote CI results and final SHA are recorded in the draft PR. Historical Search Console findings in the carried 5 November audits remain dated evidence, not newly observed 7 November indexing results.

## Release boundaries and remaining work

No merge, deployment, production smoke, DNS/security change, indexing request, outreach or clinical sign-off. Existing source/rights/independent-review uncertainties for high-risk tools remain under the documented review program. Optional-input validation semantics are unchanged; widening those requires calculator-specific review. This integration draft is an alternative review/release vehicle for the pending patches, not a request to merge it and all source PRs independently. Recheck main, candidate head, CI, deployment configuration and the actual MCP hosting target before any later approved release.
