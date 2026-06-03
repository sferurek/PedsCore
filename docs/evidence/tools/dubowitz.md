# Dubowitz Score

## Current PedsCore status
- id: dubowitz
- slug: dubowitz
- category: neonatology
- type: score
- current implementationStatus: pending_validation
- current evidenceLevel: original_derivation_study

## Evidence validation status
- final evidence status: pending_complete_scoring_table
- reason: Primary source found, but complete scoring form/table, conversion graph/formula, and reuse permissions are not cleared.

## Clinical purpose
ES: Gestational age estimation from physical and neuromuscular maturity signs.
EN: Gestational age estimation from physical and neuromuscular maturity signs.

## Target population
Newborn infants; exact applicability depends on the original Dubowitz version.

## Version / variant
- exact version: Original Dubowitz clinical assessment described by Dubowitz, Dubowitz and Goldberg (1970).
- known variants: variant-specific review required before implementation.
- selected version for PedsCore: Original Dubowitz clinical assessment described by Dubowitz, Dubowitz and Goldberg (1970).
- variant risk: medium

## Primary source
- found: yes
- citation: Dubowitz LM, Dubowitz V, Goldberg C. Clinical assessment of gestational age in the newborn infant. J Pediatr. 1970;77(1):1-10.
- DOI: 10.1016/S0022-3476(70)80038-5
- PMID: 5430794
- URL: https://pubmed.ncbi.nlm.nih.gov/5430794/
- access: abstract_only
- notes: Source recorded for traceability only; implementation still follows the evidence gate.

## External validation
Add validation studies only after source-specific review.

## Guidelines / official sources
No official guideline implementation is created in this block.

## Complete scoring table availability
- complete table found: no
- source: No. Full form/table and graph/conversion are not cleared for reuse.
- copyright/licensing risk: license-sensitive until table/form reuse is reviewed.
- notes: Do not reconstruct tables from memory or secondary calculators.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/5430794/ | Complete table must be verified before calculator activation. |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/5430794/ |

## Formula / algorithm
Not applicable or pending complete scoring table.

## Unit handling
Units, age bands, and edge cases remain pending unless explicitly documented above.

## Safety and regulatory notes
- risk level: medium
- why: Clinical outputs could influence care if worded as recommendations.
- should provide recommendations: no; descriptive outputs only.
- forbidden outputs: treatment, discharge, admission, CT instruction, medication, resuscitation instruction.

## Licensing / copyright
- appears implementable: not yet determined
- license-sensitive: yes
- requires permission: unknown
- unknown: no
- notes: license-sensitive until table/form reuse is reviewed.

## Implementation recommendation
keep_pending_until_source_found

## Proposed test cases
- minimum
- maximum
- intermediate
- missing input
- invalid input
- edge cases
- forbidden wording tests: no treatment, CT, admission, discharge, medication, or resuscitation instructions.

## Direct links
- https://pubmed.ncbi.nlm.nih.gov/5430794/
- https://doi.org/10.1016/S0022-3476(70)80038-5
- https://pubmed.ncbi.nlm.nih.gov/5430794/

## Notes
This fiche was updated in Block 8B-3. Validation does not mean implementation.
