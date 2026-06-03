# Head Circumference Percentile

## Current PedsCore status
- id: `head_circumference_percentile`
- slug: `head-circumference-percentile`
- category: growth_nutrition
- type: percentile
- current implementationStatus: `pending_validation`
- current evidenceLevel: `pending_verification`

## Evidence validation status
- final evidence status: `blocked_missing_primary_source`
- blocking reason: growth-reference selection and LMS import not finalized.
- depends on maintainer decision: yes
- maintainer decision needed: source default for reference and age strata.

## Clinical purpose
ES: percentil de perímetro craneal pediátrico por edad y sexo.
EN: pediatric head circumference percentile by age and sex.

## Target population
Infants and young children (age range not finalized).

## Version / variant
- exact version: pending.
- known variants: WHO, CDC, and local chart options.
- selected version for PedsCore: pending.
- variant risk: medium

## Primary source
- found: partial
- citation: WHO/CDC growth frameworks.
- DOI: 
- PMID: 
- URL: https://www.who.int/tools/child-growth-standards
- access: open_access
- notes: no finalized implementation policy in this pass.

## External validation
No.

## Guidelines / official sources
- WHO Child Growth Standards
- CDC growth references

## Complete scoring table availability
- complete table found: no
- source: tables depend on selected reference policy.
- copyright/licensing risk: unknown
- notes: pending source-policy resolution.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| head circumference | computed | numeric | pending | reference-dependent |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | pending |

## Formula / algorithm
No implementation yet.

## Unit handling
Age and sex-specific LMS handling pending.

## Safety and regulatory notes
- risk level: medium
- why: growth interpretation can affect follow-up decisions.
- should provide recommendations: no.
- forbidden outputs: treatment or admission directives.

## Licensing / copyright
- appears implementable: unknown
- license-sensitive: unknown
- requires permission: no
- unknown: yes
- notes: maintain pending until policy settled.

## Implementation recommendation
blocked_variant_selection

## Proposed test cases
- minimum
- maximum
- missing input
- invalid input
- edge cases

## Direct links
- https://www.who.int/tools/child-growth-standards

## Notes
Pending implementation due reference selection.
