# BMS laboratory input guard — 7 November 2026

## Reproduction and technical correction

The existing BMS catalog sets a lower bound of zero for CSF WBC/RBC/ANC, CSF protein and peripheral ANC. The engine checks missing/finite data but did not reject negative laboratory values before classifying risk. With otherwise complete synthetic eligibility inputs, negative CSF RBC, CSF ANC, protein or peripheral ANC could return score 0 and “Very low risk by BMS”. Negative CSF WBC followed the out-of-population branch instead of a numeric validation warning.

Reject entered negative values in those five laboratory fields with `invalid_bms_inputs`, the offending field trace and no score/classification. Zero is retained. Do not require unavailable scoring labs for a patient already excluded by the existing eligibility rules. No derived “normal” values are substituted.

This is a technical validation fix against the existing input contract. It does not modify any diagnostic threshold, criterion weight, classification wording, population rule, evidence/rights status or independent clinical-review outcome.

## Source check and limits

[Nigrovic et al., JAMA 2007, PMID 17200475](https://pubmed.ncbi.nlm.nih.gov/17200475/), DOI 10.1001/jama.297.1.52, is a primary multicenter validation study of BMS. Its abstract identifies the clinical criteria and the CSF ANC 1000/µL, protein 80 mg/dL and peripheral ANC 10000/µL thresholds already used in the engine. Those boundaries are retained and tested. The non-negative input guard follows the existing laboratory-unit/catalog contract; it does not derive a new clinical cutoff from this study.

This review accessed the primary abstract, not a newly licensed full table. No sensitivity/NPV claim, patient recommendation or independent clinician sign-off is introduced.

Separate source-reconciliation issue: the abstract describes ages 29 days to 19 years, while the catalog's age-in-days maximum is 6575 and the engine currently has no corresponding upper-age guard. Exact age boundary and day/year encoding need a dedicated source/clinical review; this correction does not silently choose a new eligibility cutoff. Other published exclusions and tool applicability still require the established clinical review program.

## Verification

Nineteen new core cases: on the unchanged BMS baseline, ten negative-value cases failed and nine positive/boundary/eligibility cases passed. All pass after the correction. Coverage includes each laboratory field as a negative number and numeric string; zero; values on either side of the three unchanged numeric thresholds; all 32 combinations of the five existing criteria; and eligibility-first behavior without scoring labs.

A real local MCP protocol case verifies that a negative ANC produces the validation warning and no numeric result. Full core/web/API, build-gate and local MCP results are recorded in the PR and task handoff. No requests with invalid clinical values were sent to production. This remains a draft alongside the discrete-score input hardening; clinical high-impact scope changes are outside the patch.
