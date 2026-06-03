# PELOD-2

## Current PedsCore status
- id: `pelod_2`
- slug: `pelod-2`
- category: intensive_care
- type: score
- current implementationStatus: `coming_soon`
- current evidenceLevel: `external_validation_study`

## Evidence validation status
- final evidence status: `blocked_missing_complete_scoring_table`
- blocking reason: source paper identified, but full criteria and permission review are incomplete for safe catalog-to-calculation path.
- depends on maintainer decision: no
- maintainer decision needed: no

## Clinical purpose
ES: puntuación de disfunción orgánica pediátrica.
EN: pediatric organ dysfunction score update.

## Target population
Children in intensive care; severity and risk contextualization.

## Version / variant
- exact version: PELOD-2.
- known variants: original PELOD versus PELOD-2.
- selected version for PedsCore: PELOD-2.
- variant risk: high

## Primary source
- found: partial
- citation: Leteurtre S, et al. PELOD-2.
- PMID: `23685639`
- DOI: `10.1097/CCM.0b013e31828a2bbd`
- URL: https://pubmed.ncbi.nlm.nih.gov/23685639/
- access: abstract_only
- notes: Source known, full table extraction not yet complete.

## External validation
Further validation and implementation mapping pending.

## Guidelines / official sources
No direct guidance for implementation style beyond literature source.

## Complete scoring table availability
- complete table found: no
- source: primary paper exists; table extraction incomplete.
- copyright/licensing risk: unknown
- notes: confirm exact scoring matrix and unit conventions.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/23685639/ | complete variable set pending |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/23685639/ |

## Formula / algorithm
Summation-based score with organ-system components (exact mapping pending).

## Unit handling
Pending age and lab-unit normalization verification.

## Safety and regulatory notes
- risk level: high
- why: high acuity and prognostic implications.
- should provide recommendations: no.
- forbidden outputs: treatment, discharge, admission, medication.

## Licensing / copyright
- appears implementable: unknown
- license-sensitive: unknown
- requires permission: no
- unknown: yes
- notes: high regulatory burden.

## Implementation recommendation
pending_complete_scoring_table

## Proposed test cases
- minimum
- maximum
- intermediate
- missing input
- invalid input
- edge cases
- forbidden wording tests

## Direct links
- https://doi.org/10.1097/CCM.0b013e31828a2bbd
- https://pubmed.ncbi.nlm.nih.gov/23685639/

## Notes
Needs complete score mapping and maintainer/governance before implementation.
