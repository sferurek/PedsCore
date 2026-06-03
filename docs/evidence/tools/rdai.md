# Respiratory Distress Assessment Instrument

## Current PedsCore status
- id: rdai
- slug: rdai
- category: respiratory
- type: score
- current implementationStatus: pending_validation
- current evidenceLevel: pending_primary_source

## Evidence validation status
- final evidence status: pending_primary_source
- reason: Lowell source trail found, but DOI/PMID and primary reusable scoring table are not verified.

## Clinical purpose
ES: Bronchiolitis respiratory distress assessment focused on wheezing and retractions.
EN: Bronchiolitis respiratory distress assessment focused on wheezing and retractions.

## Target population
Infants/young children with bronchiolitis or wheezing illness depending on original source.

## Version / variant
- exact version: Lowell RDAI; RACS derived uses should remain separate.
- known variants: variant-specific review required before implementation.
- selected version for PedsCore: Lowell RDAI; RACS derived uses should remain separate.
- variant risk: medium

## Primary source
- found: yes
- citation: Lowell DI, Lister G, Von Koss H, McCarthy P. Wheezing in infants: the response to epinephrine. Pediatrics. 1987;79(6):939-945.
- DOI: not located
- PMID: not located
- URL: https://hero.epa.gov/hero/index.cfm/reference/details/reference_id/2748279
- access: unknown
- notes: Source recorded for traceability only; implementation still follows the evidence gate.

## External validation
Add validation studies only after source-specific review.

## Guidelines / official sources
No official guideline implementation is created in this block.

## Complete scoring table availability
- complete table found: no
- source: No. Secondary articles reproduce/adapt a table, but primary reusable table not verified.
- copyright/licensing risk: unknown/license-sensitive for table reuse.
- notes: Do not reconstruct tables from memory or secondary calculators.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://hero.epa.gov/hero/index.cfm/reference/details/reference_id/2748279 | Complete table must be verified before calculator activation. |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://hero.epa.gov/hero/index.cfm/reference/details/reference_id/2748279 |

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
- notes: unknown/license-sensitive for table reuse.

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
- https://hero.epa.gov/hero/index.cfm/reference/details/reference_id/2748279



## Notes
This fiche was updated in Block 8B-3. Validation does not mean implementation.
