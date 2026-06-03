# PIM3

## Current PedsCore status
- id: `pim3`
- slug: `pim3`
- category: intensive_care
- type: score
- current implementationStatus: `coming_soon`
- current evidenceLevel: `external_validation_study`

## Evidence validation status
- final evidence status: `blocked_missing_complete_scoring_table`
- blocking reason: source model found, but coefficients and clinical governance steps remain blocked pending review.
- depends on maintainer decision: yes
- maintainer decision needed: decide inclusion for MVP phase.

## Clinical purpose
ES: índice de mortalidad pediátrica de tercera generación.
EN: pediatric mortality risk score.

## Target population
Children in pediatric critical care.

## Version / variant
- exact version: PIM3.
- known variants: PIM2/PIM3; possible local recalibration.
- selected version for PedsCore: pending.
- variant risk: high

## Primary source
- found: partial
- citation: Straney et al., Pediatric Index of Mortality 3.
- PMID: `23863821`
- DOI: `10.1097/PCC.0b013e31829760cf`
- URL: https://pubmed.ncbi.nlm.nih.gov/23863821/
- access: abstract_only
- notes: model use and coefficients pending safe implementation review.

## External validation
No implementation path yet.

## Guidelines / official sources
No.

## Complete scoring table availability
- complete table found: no
- source: source article identified, mapping not yet extracted.
- copyright/licensing risk: high
- notes: requires terms and expert review.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/23863821/ | score matrix pending |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/23863821/ |

## Formula / algorithm
Prognostic model coefficients not yet extracted.

## Unit handling
Pending.

## Safety and regulatory notes
- risk level: high
- why: high-stakes predictive output.
- should provide recommendations: no.
- forbidden outputs: treatment or admission directives.

## Licensing / copyright
- appears implementable: no
- license-sensitive: yes
- requires permission: unknown
- unknown: yes
- notes: blocked until policy review.

## Implementation recommendation
requires_domain_expert_review

## Proposed test cases
- minimum
- maximum
- missing input
- invalid input
- edge cases
- forbidden wording tests

## Direct links
- https://doi.org/10.1097/PCC.0b013e31829760cf
- https://pubmed.ncbi.nlm.nih.gov/23863821/

## Notes
No calculator logic added.
