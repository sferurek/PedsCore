# pSOFA

## Current PedsCore status
- id: `psofa`
- slug: `psofa`
- category: intensive_care
- type: score
- current implementationStatus: `coming_soon`
- current evidenceLevel: `pending_verification`

## Evidence validation status
- final evidence status: `blocked_missing_primary_source`
- blocking reason: scoring and organ thresholds require complete primary score table, age-specific bands, and data model.
- depends on maintainer decision: no
- maintainer decision needed: no

## Clinical purpose
ES: puntuación de disfunción orgánica pediátrica para investigación y estratificación.
EN: pediatric multi-organ dysfunction assessment framework.

## Target population
Children in critical care where organ dysfunction scoring is evaluated.

## Version / variant
- exact version: pSOFA original pediatric adaptation.
- known variants: adult SOFA adaptations, other pediatric organ-failure sets.
- selected version for PedsCore: pending.
- variant risk: high

## Primary source
- found: partial
- citation: Matics TJ, Sanchez-Pinto LN. External validity of pSOFA score in pediatric sepsis. Pediatrics.
- PMID: `28783810`
- DOI: `10.1001/jamapediatrics.2017.2352`
- URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/
- access: abstract_only
- notes: Source anchor is located in literature, but full reusable model and tables remain pending.

## External validation
No direct implementation-grade validation matrix has been added in core yet.

## Guidelines / official sources
No consensus guideline mapping yet for direct score derivation.

## Complete scoring table availability
- complete table found: no
- source: not fully extracted.
- copyright/licensing risk: unknown
- notes: cannot implement without exact thresholds and organ definitions.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/ | primary table extraction required |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/ |

## Formula / algorithm
No formula-only implementation; score summation and missing data handling pending.

## Unit handling
Pending until exact pediatric ranges, age thresholds, and unit conventions are sourced.

## Safety and regulatory notes
- risk level: high
- why: high-acuity context and potential indirect treatment influence.
- should provide recommendations: no.
- forbidden outputs: treatment, discharge, admission, medication, or escalation directives.

## Licensing / copyright
- appears implementable: unknown
- license-sensitive: unknown
- requires permission: no
- unknown: yes
- notes: keep in blocked state until implementation-ready evidence is complete.

## Implementation recommendation
implement_after_expert_review

## Proposed test cases
- minimum
- maximum
- intermediate
- missing input
- invalid input
- edge cases
- forbidden wording tests

## Direct links
- https://doi.org/10.1001/jamapediatrics.2017.2352
- https://pubmed.ncbi.nlm.nih.gov/28783810/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/

## Notes
Blocker for Block 8B-4: requires full table + maintainer/regulatory decision.
