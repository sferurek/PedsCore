# Discrete score input guard — technical/source review, 7 November 2026

## Reproduced defect

Baseline main: fba367fc76cf2aef7229291f9e82bf245f49fba5. The shared `getNumericScore` validates descriptor IDs but accepts any finite numeric input. Several callers apply only broad ranges. Thus numeric clients can bypass the catalog's exact scoring options.

Examples reproduced with complete synthetic inputs:

- Apgar heart-rate domain `0.5`: returns a fractional total, even though its declared choices award 0, 1 or 2.
- PAS anorexia `2`: accepts two points for a field whose choices award only 0 or 1.
- PAS with all eight numeric inputs set to 2: returns **16 with maxScore 10**, without a warning. Descriptor-based inputs cannot produce this result.

Controlled web selectors normally prevent these values; direct core/MCP clients are exposed to the contract inconsistency. This is not a claim that a patient was affected.

## Source check and correction boundary

The [joint AAP/ACOG Apgar statement](https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/10/the-apgar-score) describes five domains with discrete 0, 1 or 2 points. Its official indexed text was available; a direct fetch returned 403 and was not bypassed. [Samuel's original PAS abstract](https://pubmed.ncbi.nlm.nih.gov/12037754/), DOI 10.1053/jpsu.2002.32893, assigns one point to six variables and two to the two physical signs, totaling 10. These checks support the catalog's existing point sets; no new clinical cutoffs are selected.

Numeric inputs now must match a score already declared among that field's options, just as descriptor inputs do. Do not apply a blanket integer check: PCDAI legitimately declares fractional points such as 2.5. Finite continuous inputs without a scored-option set retain their previous behavior. The shared invalid-input message references the field's options, avoiding the previous universal 0–2 claim for instruments with other ranges.

No option IDs, descriptors, point weights, interpretation bands, model formulas, populations, timing definitions, evidence/rights classifications or independent-review outcomes change. This is an AI technical/source desk review, not a clinician's independent sign-off or a full validation of all 23 tools with scored options. Source access does not establish table reuse permissions.

## Verification

Thirteen new core cases were run on the unchanged baseline: seven failed and six passed. The seven failures expose unsupported-number acceptance; the positive cases already passed. After the correction:

- Five direct-engine invalid-field regressions and the PAS 16/10 reproduction return warnings without a score/interpretation.
- Across the catalog, 505 declared options in 154 fields map identically from descriptor IDs and numeric points, including legitimate fractions; numeric points outside each set are rejected.
- All 1,066 supported combinations across Apgar (both supported timing values), Silverman-Andersen, Clinical Dehydration Scale and PAS preserve numeric/descriptor score, interpretation and warnings. Trace retains the original input representation.
- Finite continuous inputs and non-finite rejection are covered separately.
- Two real local Streamable HTTP MCP cases check unsupported numeric inputs reach validation warnings instead of numeric results. Existing valid MCP Apgar output remains covered.

The branch's full core/web/API suite, build-gate fixtures, lint, TypeScript and local MCP suite are checked. Main's current CI does not yet run the MCP Vitest suite: the existing separate #180/#183 change adds that step. This PR does not duplicate that CI change; its local MCP result and remote SIM smoke are reported separately. CI performs the necessary full production build; no local full web build or production probe is required.

## Release and follow-up

Independent branch from main; #183 remains unchanged. Reconcile the branch-disable entry when integrating; candidate/source previews stay disabled. No merge, deployment, source-PR closure or clinical sign-off. Supported direct numeric clients retain their values; clients sending unsupported point values now receive validation warnings and must correct their inputs. Broader catalog/source reconciliation and non-score enum checks remain separate reviews.
