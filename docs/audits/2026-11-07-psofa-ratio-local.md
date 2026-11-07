# Local-only pSOFA supplied-ratio guard — 7 November 2026

**No push, no PR, no deployment.** This follow-up is kept in `audit/night-local-candidate-20261107`, after the coordinator's unverified Devpost/material-scope notice. No general freeze or completed entry is asserted; linked repository/demo materials remain unchanged pending clarification.

## Reproduced input-contract issue

The existing pSOFA engine permits either PaO2/FiO2 or its SpO2/FiO2 surrogate. Both are optional numeric fields, but at least one usable ratio is needed. A supplied malformed ratio was parsed to null and silently ignored whenever the other was usable. For example, a synthetic normal profile with PaO2/FiO2="INVALID" and SpO2/FiO2=292 still returned a numeric score without a value-validation warning.

Keep genuine omission/null/blank behavior and existing ratio selection, but reject malformed supplied numeric values when the remaining data would otherwise allow calculation. The existing missing-data guard still runs first. It returns `invalid_psofa_inputs`, the offending-field trace and no score/classification. Numeric strings and fractional **ratios** remain valid; no integer rule is applied to these continuous measurements.

No respiratory cutoffs, support gates, oxygenation preference, organ weights, age bands, other physiology bounds or model classifications change. Existing ambiguities noted in [the prior source follow-up](2026-11-05-clinical-source-followup.md) are not resolved or reinterpreted. This is an application type-contract fix, not an independent clinical validation or a rederivation of the source model.

## Verification

Five new core cases: two malformed-input groups failed on the preceding local candidate and three compatibility cases passed. After the guard all pass. Each direction is checked with malformed strings, non-finite values and incorrect boolean/array/object types; the alternate ratio is usable. Missing/blank ratios, numeric strings, finite fractions and completely missing oxygenation retain their behavior. A real local MCP case exercises malformed primary ratio plus usable surrogate.

The final combined local suite and exact tree/SHA are recorded in the private night report. Core compilation, tests, lint and TypeScript are run locally; no full local production web build or new GitHub workflow is triggered. The earlier #183/#184/#185 public snapshots and their 768-test integration remain untouched.
