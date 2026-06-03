# Gorelick Dehydration Scale

## Current PedsCore status
- id: gorelick_dehydration
- slug: gorelick-dehydration
- category: emergency
- type: score
- current implementationStatus: pending_validation
- current evidenceLevel: original_derivation_study

## Evidence validation status
- final evidence status: pending_complete_scoring_table
- reason: Primary source found, but exact 4-item/10-item implementation variant and table need selection.

## Clinical purpose
ES: Clinical signs for pediatric dehydration assessment.
EN: Clinical signs for pediatric dehydration assessment.

## Target population
Children with suspected dehydration in acute care.

## Version / variant
- exact version: Gorelick clinical signs; exact PedsCore variant not yet selected.
- known variants: variant-specific review required before implementation.
- selected version for PedsCore: Gorelick clinical signs; exact PedsCore variant not yet selected.
- variant risk: medium

## Primary source
- found: yes
- citation: Gorelick MH, Shaw KN, Murphy KO. Validity and reliability of clinical signs in the diagnosis of dehydration in children. Pediatrics. 1997;99(5):E6.
- DOI: 10.1542/peds.99.5.e6
- PMID: 9113963
- URL: https://pubmed.ncbi.nlm.nih.gov/9113963/
- access: abstract_only
- notes: Source recorded for traceability only; implementation still follows the evidence gate.

## External validation
Add validation studies only after source-specific review.

## Guidelines / official sources
No official guideline implementation is created in this block.

## Complete scoring table availability
- complete table found: no
- source: No. Complete sign set and cutoffs must be selected from source.
- copyright/licensing risk: unknown.
- notes: Do not reconstruct tables from memory or secondary calculators.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/9113963/ | Complete table must be verified before calculator activation. |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/9113963/ |

## Formula / algorithm
Not applicable or pending complete scoring table.

## Unit handling
Units, age bands, and edge cases remain pending unless explicitly documented above.

## Safety and regulatory notes
- risk level: medium/high
- why: Clinical outputs could influence care if worded as recommendations.
- should provide recommendations: no; descriptive outputs only.
- forbidden outputs: treatment, discharge, admission, CT instruction, medication, resuscitation instruction.

## Licensing / copyright
- appears implementable: not yet determined
- license-sensitive: yes
- requires permission: unknown
- unknown: yes
- notes: unknown.

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
- https://pubmed.ncbi.nlm.nih.gov/9113963/
- https://doi.org/10.1542/peds.99.5.e6
- https://pubmed.ncbi.nlm.nih.gov/9113963/

## Notes
This fiche was updated in Block 8B-3. Validation does not mean implementation.
