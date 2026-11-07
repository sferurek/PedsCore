# Supplied values versus unavailable data — 7 November 2026

## Phoenix: malformed optional values are not missing measurements

The existing Phoenix engine intentionally supports unavailable optional measurements and warns that a partial result is a minimum based on available data. However, the same null parsing result represented malformed supplied values. A synthetic eligible input with lactate_mmol_l="INVALID" returned score 0 and a below-threshold classification, with only the ordinary partial-data warning. Non-finite numbers and invalid types in other optional fields behaved similarly.

Preserve omission, null and blank optional values, but reject supplied values that cannot be parsed according to their existing number/boolean type. The guard covers the eleven optional numeric fields and the optional pupils response. It returns `invalid_phoenix_inputs`, offending-field trace and no score/classification. Existing numeric ranges, partial-data warning, scoring and population gates are unchanged. Finite numeric strings and the existing yes/no boolean encodings remain accepted.

[Schlapbach et al., JAMA 2024](https://jamanetwork.com/journals/jama/fullarticle/2814297), DOI 10.1001/jama.2024.0179, is the primary consensus source already used for this tool. The publisher page was accessible in this session. This patch checks the application's declared input types and preserves its existing partial-data policy; it does not rederive that policy or certify every table/footnote or the clinical validity of a partial result. No new treatment or diagnostic threshold is introduced.

## Apgar: reject unsupported assessment identifiers

Apgar required a non-empty assessment_time but did not reject identifiers outside the two declared options. Direct callers could pass an unknown string, number, boolean or array and still receive a score. Validate against the existing catalog option IDs before scoring and return `invalid_apgar_assessment_time` for unsupported identifiers.

The original one- and five-minute values and their interpretation behavior are unchanged. The [AAP/ACOG statement](https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/10/the-apgar-score) describes repeated assessments too; this patch does not deny their clinical use or add unsupported ten-/fifteen-/twenty-minute UI choices. It refuses to guess a caller's unknown identifier.

## Verification and boundaries

Nineteen new core cases: seventeen failed on the original behavior and two positive compatibility cases passed. After the guard all pass. Each numeric field is checked with NaN/infinity, malformed numeric strings, boolean, array and object values. Optional pupils invalid encodings are rejected; blank/unmeasured inputs, finite/zero measurements and supported boolean/string encodings preserve their outputs. Five unsupported Apgar timing identifiers receive warnings. Existing exhaustive valid Apgar combinations still pass.

Two further real local MCP regressions cover malformed Phoenix lactate and unsupported Apgar timing. All requests are synthetic and local. No patient data or production invalid-input probes. This extends the same clinical-input draft as the discrete-point and BMS guards; independent clinical review, source/rights uncertainties and BMS upper-age reconciliation remain separate. No model weights, thresholds, interpretation bands or population definitions are changed.
