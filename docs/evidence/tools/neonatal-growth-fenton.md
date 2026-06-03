# Fenton Neonatal Growth

## Current PedsCore status
- id: neonatal_growth_fenton
- slug: neonatal-growth-fenton
- category: neonatology
- type: percentile
- current implementationStatus: pending_validation
- current evidenceLevel: systematic_review

## Evidence validation status
- final evidence status: pending_complete_scoring_table
- reason: Open source article found, but reusable LMS data files and exact implementation dataset are not yet selected.

## Clinical purpose
ES: Preterm infant growth percentile/z-score reference.
EN: Preterm infant growth percentile/z-score reference.

## Target population
Preterm infants, typically 22 to 50 weeks postmenstrual age depending on selected dataset.

## Version / variant
- exact version: Fenton 2013 revised preterm growth chart.
- known variants: variant-specific review required before implementation.
- selected version for PedsCore: Fenton 2013 revised preterm growth chart.
- variant risk: medium

## Primary source
- found: yes
- citation: Fenton TR, Kim JH. A systematic review and meta-analysis to revise the Fenton growth chart for preterm infants. BMC Pediatr. 2013;13:59.
- DOI: 10.1186/1471-2431-13-59
- PMID: not located
- URL: https://link.springer.com/article/10.1186/1471-2431-13-59
- access: open_access
- notes: Source recorded for traceability only; implementation still follows the evidence gate.

## External validation
Add validation studies only after source-specific review.

## Guidelines / official sources
No official guideline implementation is created in this block.

## Complete scoring table availability
- complete table found: no
- source: Partial. Article reports LMS methodology; implementation needs official/reusable LMS data source.
- copyright/licensing risk: appears implementable with attribution only after data/source terms are verified.
- notes: Do not reconstruct tables from memory or secondary calculators.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://link.springer.com/article/10.1186/1471-2431-13-59 | Complete table must be verified before calculator activation. |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://link.springer.com/article/10.1186/1471-2431-13-59 |

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
- license-sensitive: no
- requires permission: unknown
- unknown: no
- notes: appears implementable with attribution only after data/source terms are verified.

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
- https://link.springer.com/article/10.1186/1471-2431-13-59
- https://doi.org/10.1186/1471-2431-13-59


## Notes
This fiche was updated in Block 8B-3. Validation does not mean implementation.
