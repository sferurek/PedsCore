# BROSJOD

## Current PedsCore status
- id: brosjod
- slug: brosjod
- category: respiratory
- type: score
- current implementationStatus: pending_validation
- current evidenceLevel: external_validation_study

## Evidence validation status
- final evidence status: pending_complete_scoring_table
- reason: Validation paper found, but complete original table and reuse terms remain pending.

## Clinical purpose
ES: Bronchiolitis severity score from Sant Joan de Deu.
EN: Bronchiolitis severity score from Sant Joan de Deu.

## Target population
Infants/children with acute bronchiolitis in hospital settings.

## Version / variant
- exact version: BROSJOD validation score.
- known variants: variant-specific review required before implementation.
- selected version for PedsCore: BROSJOD validation score.
- variant risk: medium

## Primary source
- found: yes
- citation: Balaguer M, Alejandre C, Vila D, Esteban E, Carrasco JL, Cambra FJ, Jordan I. Bronchiolitis Score of Sant Joan de Deu: BROSJOD Score, validation and usefulness. Pediatr Pulmonol. 2017;52(4):533-539.
- DOI: 10.1002/ppul.23546
- PMID: 28328090
- URL: https://pubmed.ncbi.nlm.nih.gov/28328090/
- access: abstract_only
- notes: Source recorded for traceability only; implementation still follows the evidence gate.

## External validation
Add validation studies only after source-specific review.

## Guidelines / official sources
No official guideline implementation is created in this block.

## Complete scoring table availability
- complete table found: no
- source: No. Variables are described in secondary sources, but full table must be checked against source.
- copyright/licensing risk: unknown/license-sensitive.
- notes: Do not reconstruct tables from memory or secondary calculators.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/28328090/ | Complete table must be verified before calculator activation. |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/28328090/ |

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
- unknown: yes
- notes: unknown/license-sensitive.

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
- https://pubmed.ncbi.nlm.nih.gov/28328090/
- https://doi.org/10.1002/ppul.23546
- https://pubmed.ncbi.nlm.nih.gov/28328090/

## Notes
This fiche was updated in Block 8B-3. Validation does not mean implementation.
