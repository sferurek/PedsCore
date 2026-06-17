# BMI Percentile

## Current PedsCore status

- id: `bmi_percentile`
- slug: `bmi-percentile`
- category: growth_nutrition
- type: percentile
- current implementationStatus: `partially_implemented`
- current evidenceLevel: `official_manual_or_institutional_protocol`

## Evidence validation status

- final evidence status: `partially_implemented`
- blocking reason: exposed as a WHO Growth preset, not as a fully independent tool; final growth-module review and interpolation policy remain pending.
- depends on maintainer decision: yes
- maintainer decision needed: confirm final WHO Growth module policy before promoting from partial to implemented.

## Clinical purpose

ES: acceso rápido al cálculo descriptivo IMC-para-la-edad usando el motor WHO Growth.

EN: shortcut to descriptive BMI-for-age calculation through the WHO Growth engine.

## Target population

- WHO Child Growth Standards 0-5 years when age is supplied in days.
- WHO Growth Reference 2007 5-19 years when age is supplied in completed months.
- PedsCore returns an explicit unsupported/out-of-range state outside the available WHO datasets.

## Version / variant

- exact version: WHO Child Growth Standards BMI-for-age 0-5 years and WHO Growth Reference 2007 BMI-for-age 5-19 years.
- known variants: WHO, CDC, local references.
- selected version for PedsCore Sprint 2B: WHO only.
- variant risk: low for WHO preset; CDC and local references deferred.

## Primary source

- WHO BMI-for-age 0-5 years: https://www.who.int/toolkits/child-growth-standards/standards/body-mass-index-for-age-bmi-for-age
- WHO BMI-for-age 5-19 years: https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age
- WHO Child Growth Standards: https://www.who.int/tools/child-growth-standards
- WHO Growth Reference 5-19 years: https://www.who.int/tools/growth-reference-data-for-5to19-years

## Complete scoring table availability

- complete table found: yes for imported WHO BMI-for-age LMS datasets in the active scope.
- source: official WHO LMS data files imported by the central WHO Growth module.
- copyright/licensing risk: medium; WHO data are third-party source material under separate WHO terms.
- notes: PedsCore code is MIT, but WHO datasets are not relicensed as MIT.

## Variables and scoring

| variable | unit | source | notes |
|---|---|---|---|
| sex | male/female | WHO LMS data split | required |
| age | days or completed months | WHO range-specific datasets | 0-5 uses days; 5-19 uses months |
| weight | kg | user input | required to calculate BMI |
| stature | cm | user input | length/height measurement mode kept visible |
| BMI | kg/m2 | computed | routed to WHO BMI-for-age LMS lookup |

## Formula / algorithm

- BMI = weight kg / height m².
- z-score is calculated from the WHO LMS record for sex, age and BMI.
- percentile is derived from z-score.
- No separate BMI percentile engine is created.

## Safety and regulatory notes

- Output is descriptive: BMI, z-score, percentile, source and range warnings.
- No obesity, malnutrition or growth diagnosis is generated.
- No diet, nutrition or treatment advice is generated.

## Licensing / copyright

- appears implementable: yes, as WHO-attributed data/preset with separate data terms.
- license-sensitive: yes.
- requires permission: unknown for downstream redistribution contexts; keep attribution and no WHO endorsement.
- notes: no WHO logos or chart image copies.

## Implementation recommendation

Partial wrapper over WHO Growth module; do not create separate calculation logic.

## Proposed test cases

- BMI preset routes to WHO Growth.
- male/female split.
- 0-5 lower/upper age boundaries.
- 5-19 lower/upper month boundaries.
- missing weight or stature.
- out-of-range age.
- no diagnosis or treatment language.

## Direct links

- https://www.who.int/toolkits/child-growth-standards/standards/body-mass-index-for-age-bmi-for-age
- https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age
