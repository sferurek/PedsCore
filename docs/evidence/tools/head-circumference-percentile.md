# Head Circumference Percentile

## Current PedsCore status

- id: `head_circumference_percentile`
- slug: `head-circumference-percentile`
- category: growth_nutrition
- type: percentile
- current implementationStatus: `partially_implemented`
- current evidenceLevel: `official_manual_or_institutional_protocol`

## Evidence validation status

- final evidence status: `partially_implemented`
- blocking reason: exposed as a WHO Growth preset limited to available WHO 0-5 head-circumference-for-age LMS data; final growth-module review remains pending.
- depends on maintainer decision: yes
- maintainer decision needed: confirm final WHO Growth module policy before promoting from partial to implemented.

## Clinical purpose

ES: acceso rápido al cálculo descriptivo perímetro-craneal-para-la-edad usando el motor WHO Growth.

EN: shortcut to descriptive head-circumference-for-age calculation through the WHO Growth engine.

## Target population

- Infants and children 0-5 years covered by WHO Child Growth Standards head-circumference-for-age data.
- PedsCore returns an explicit unsupported/out-of-range state beyond the imported WHO 0-5 dataset.

## Version / variant

- exact version: WHO Child Growth Standards head circumference-for-age 0-5 years.
- known variants: WHO, CDC, local references.
- selected version for PedsCore Sprint 2B: WHO 0-5 only.
- variant risk: low for WHO preset; non-WHO references deferred.

## Primary source

- WHO head circumference-for-age 0-5 years: https://www.who.int/toolkits/child-growth-standards/standards/head-circumference-for-age
- WHO Child Growth Standards: https://www.who.int/tools/child-growth-standards

## Complete scoring table availability

- complete table found: yes for imported WHO 0-5 head-circumference-for-age LMS dataset.
- source: official WHO LMS data files imported by the central WHO Growth module.
- copyright/licensing risk: medium; WHO data are third-party source material under separate WHO terms.
- notes: PedsCore code is MIT, but WHO datasets are not relicensed as MIT.

## Variables and scoring

| variable | unit | source | notes |
|---|---|---|---|
| sex | male/female | WHO LMS data split | required |
| age | days | WHO Child Growth Standards | required for 0-5 scope |
| head circumference | cm | user input | routed to WHO LMS lookup |

## Formula / algorithm

- z-score is calculated from the WHO LMS record for sex, age and head circumference.
- percentile is derived from z-score.
- No separate head circumference percentile engine is created.

## Safety and regulatory notes

- Output is descriptive: z-score, percentile, source and range warnings.
- No microcephaly, macrocephaly or developmental diagnosis is generated.
- No treatment, referral or imaging recommendation is generated.

## Licensing / copyright

- appears implementable: yes, as WHO-attributed data/preset with separate data terms.
- license-sensitive: yes.
- requires permission: unknown for downstream redistribution contexts; keep attribution and no WHO endorsement.
- notes: no WHO logos or chart image copies.

## Implementation recommendation

Partial wrapper over WHO Growth module; do not create separate calculation logic.

## Proposed test cases

- head circumference preset routes to WHO Growth.
- male/female split.
- 0-5 lower/upper day boundaries.
- missing head circumference.
- out-of-range age.
- no diagnosis or treatment language.

## Direct links

- https://www.who.int/toolkits/child-growth-standards/standards/head-circumference-for-age
- https://www.who.int/tools/child-growth-standards
