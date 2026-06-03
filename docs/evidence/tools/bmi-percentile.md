# BMI Percentile

## Current PedsCore status
- id: `bmi_percentile`
- slug: `bmi-percentile`
- category: growth_nutrition
- type: percentile
- current implementationStatus: `pending_validation`
- current evidenceLevel: `pending_verification`

## Evidence validation status
- final evidence status: `blocked_missing_primary_source`
- blocking reason: selected growth reference and exact LMS implementation are not fixed in this pass.
- depends on maintainer decision: yes
- maintainer decision needed: choose default WHO/CDC source strategy.

## Clinical purpose
ES: cálculo de percentil de IMC pediátrico según curva seleccionada.
EN: pediatric BMI percentile calculation based on selected growth reference.

## Target population
Children and adolescents (age-policy dependent).

## Version / variant
- exact version: pending reference selection.
- known variants: WHO, CDC, local references.
- selected version for PedsCore: pending.
- variant risk: medium

## Primary source
- found: partial
- citation: WHO/CDC growth chart standards are potential source families.
- DOI: 
- PMID: 
- URL: https://www.cdc.gov/growthcharts/
- access: abstract_only
- notes: exact selectable reference not decided.

## External validation
Not yet because source not fixed.

## Guidelines / official sources
- WHO growth standards
- CDC growth charts

## Complete scoring table availability
- complete table found: no
- source: reference tables need import and policy selection.
- copyright/licensing risk: unknown
- notes: no implementation until reference policy is defined.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| BMI value | computed | numeric | https://www.cdc.gov/growthcharts/ | requires chosen LMS data |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | pending |

## Formula / algorithm
Not implemented; percentile interpolation pending source policy.

## Unit handling
Age unit, sex, and height/weight units to be standardized with chosen source.

## Safety and regulatory notes
- risk level: medium
- why: growth interpretation requires context and growth-source transparency.
- should provide recommendations: no.
- forbidden outputs: treatment and growth-management directives.

## Licensing / copyright
- appears implementable: unknown
- license-sensitive: unknown
- requires permission: no
- unknown: yes
- notes: pending source-policy decision.

## Implementation recommendation
blocked_variant_selection

## Proposed test cases
- minimum
- maximum
- missing input
- invalid input
- edge cases

## Direct links
- https://www.cdc.gov/growthcharts/technical-manual/

## Notes
No implementation this pass.
