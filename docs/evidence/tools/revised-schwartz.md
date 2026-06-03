# Revised Schwartz

## Current PedsCore status
- id: revised_schwartz
- slug: revised-schwartz
- category: nephrology
- type: calculator
- current implementationStatus: pending_validation
- current evidenceLevel: original_derivation_study

## Evidence validation status
- final evidence status: pending_variant_selection
- reason: CKiD source found, but PedsCore must choose exact equation distinct from the already implemented bedside Schwartz.

## Clinical purpose
ES: Pediatric eGFR estimation using Schwartz/CKiD equations.
EN: Pediatric eGFR estimation using Schwartz/CKiD equations.

## Target population
Children with CKD cohort characteristics in the original paper.

## Version / variant
- exact version: CKiD 2009 equations; bedside approximation already implemented separately.
- known variants: variant-specific review required before implementation.
- selected version for PedsCore: CKiD 2009 equations; bedside approximation already implemented separately.
- variant risk: high

## Primary source
- found: yes
- citation: Schwartz GJ, Munoz A, Schneider MF, Mak RH, Kaskel F, Warady BA, Furth SL. New equations to estimate GFR in children with CKD. J Am Soc Nephrol. 2009;20(3):629-637.
- DOI: 10.1681/ASN.2008030287
- PMID: 19158356
- URL: https://pubmed.ncbi.nlm.nih.gov/19158356/
- access: open_access
- notes: Source recorded for traceability only; implementation still follows the evidence gate.

## External validation
Add validation studies only after source-specific review.

## Guidelines / official sources
No official guideline implementation is created in this block.

## Complete scoring table availability
- complete table found: no
- source: Formula exists, but exact selected equation and required biomarkers must be selected.
- copyright/licensing risk: appears implementable after variant selection.
- notes: Do not reconstruct tables from memory or secondary calculators.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/19158356/ | Complete table must be verified before calculator activation. |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/19158356/ |

## Formula / algorithm
Exact formula/rule criteria must be encoded only after final source review and tests.

## Unit handling
Units, age bands, and edge cases remain pending unless explicitly documented above.

## Safety and regulatory notes
- risk level: medium/high
- why: Clinical outputs could influence care if worded as recommendations.
- should provide recommendations: no; descriptive outputs only.
- forbidden outputs: treatment, discharge, admission, CT instruction, medication, resuscitation instruction.

## Licensing / copyright
- appears implementable: not yet determined
- license-sensitive: no
- requires permission: unknown
- unknown: no
- notes: appears implementable after variant selection.

## Implementation recommendation
select_variant_first

## Proposed test cases
- minimum
- maximum
- intermediate
- missing input
- invalid input
- edge cases
- forbidden wording tests: no treatment, CT, admission, discharge, medication, or resuscitation instructions.

## Direct links
- https://pubmed.ncbi.nlm.nih.gov/19158356/
- https://doi.org/10.1681/ASN.2008030287
- https://pubmed.ncbi.nlm.nih.gov/19158356/

## Notes
This fiche was updated in Block 8B-3. Validation does not mean implementation.
