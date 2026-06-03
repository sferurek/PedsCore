# pRIFLE

## Current PedsCore status
- id: prifle
- slug: prifle
- category: nephrology
- type: clinical_rule
- current implementationStatus: pending_validation
- current evidenceLevel: original_derivation_study

## Evidence validation status
- final evidence status: requires_domain_expert_review
- reason: Primary source found, but AKI criteria require baseline eCCl, urine-output handling and expert review.

## Clinical purpose
ES: Pediatric modification of RIFLE criteria for acute kidney injury classification.
EN: Pediatric modification of RIFLE criteria for acute kidney injury classification.

## Target population
Critically ill children in PICU settings in original validation.

## Version / variant
- exact version: Akcan-Arikan pediatric modified RIFLE.
- known variants: variant-specific review required before implementation.
- selected version for PedsCore: Akcan-Arikan pediatric modified RIFLE.
- variant risk: medium

## Primary source
- found: yes
- citation: Akcan-Arikan A, Zappitelli M, Loftis LL, Washburn KK, Jefferson LS, Goldstein SL. Modified RIFLE criteria in critically ill children with acute kidney injury. Kidney Int. 2007;71(10):1028-1035.
- DOI: 10.1038/sj.ki.5002231
- PMID: 17396113
- URL: https://pubmed.ncbi.nlm.nih.gov/17396113/
- access: open_access
- notes: Source recorded for traceability only; implementation still follows the evidence gate.

## External validation
Add validation studies only after source-specific review.

## Guidelines / official sources
No official guideline implementation is created in this block.

## Complete scoring table availability
- complete table found: no
- source: Criteria table exists in source, but implementation needs unit handling and expert review.
- copyright/licensing risk: appears implementable with citation after expert review.
- notes: Do not reconstruct tables from memory or secondary calculators.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/17396113/ | Complete table must be verified before calculator activation. |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/17396113/ |

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
- notes: appears implementable with citation after expert review.

## Implementation recommendation
implement_after_expert_review

## Proposed test cases
- minimum
- maximum
- intermediate
- missing input
- invalid input
- edge cases
- forbidden wording tests: no treatment, CT, admission, discharge, medication, or resuscitation instructions.

## Direct links
- https://pubmed.ncbi.nlm.nih.gov/17396113/
- https://doi.org/10.1038/sj.ki.5002231
- https://pubmed.ncbi.nlm.nih.gov/17396113/

## Notes
This fiche was updated in Block 8B-3. Validation does not mean implementation.
