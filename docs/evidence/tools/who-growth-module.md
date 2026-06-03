# WHO Growth Module

## Current PedsCore status

- id: `who_growth_module`
- slug: `who-growth`
- category: `growth_nutrition`
- type: `percentile`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `official_manual_or_institutional_protocol`

## Evidence validation status

- final evidence status: `pending_validation`
- blocking reason: core WHO 0-5 indicators plus WHO 5-19 BMI-for-age and height-for-age are normalized and available, but remaining 5-19 scope, interpolation policy, and final maintainer review remain pending.
- depends on maintainer decision: yes
- maintainer decision needed: confirm remaining 5-19 scope, interpolation policy, chart percentile set, and print-output wording before marking the unified module fully implemented.

## Clinical purpose

ES: modulo unificado para valorar indicadores antropometricos OMS aplicables desde una entrada comun de datos.

EN: unified module to evaluate applicable WHO anthropometric indicators from one common data entry.

## Official WHO sources

### WHO Child Growth Standards, 0-5 years

- source: World Health Organization. WHO Child Growth Standards.
- direct URL: https://www.who.int/tools/child-growth-standards
- indicators imported in PedsCore after WHO-GROWTH-3B:
  - BMI-for-age
  - weight-for-age
  - length/height-for-age
  - head circumference-for-age
  - weight-for-length
  - weight-for-height
- access date for imported XLSX files: 2026-06-03.
- license status: imported under separate WHO data terms, not under the MIT code license.
- decision: import as separate lazy dataset modules, without copying WHO chart images or implying WHO endorsement.

### WHO BMI-for-age 0-5 years

- source page: https://www.who.int/toolkits/child-growth-standards/standards/body-mass-index-for-age-bmi-for-age
- boys XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/body-mass-index-for-age/expanded-tables/bfa-boys-zscore-expanded-tables.xlsx?sfvrsn=f8e1fbe2_10
- girls XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/body-mass-index-for-age/expanded-tables/bfa-girls-zscore-expanded-tables.xlsx?sfvrsn=ae4cb8d1_12
- imported fields: Day, L, M, S.
- age range: 0-1856 days.
- units: BMI kg/m2.

### WHO weight-for-age 0-5 years

- source page: https://www.who.int/toolkits/child-growth-standards/standards/weight-for-age
- boys XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-age/expanded-tables/wfa-boys-zscore-expanded-tables.xlsx?sfvrsn=65cce121_10
- girls XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-age/expanded-tables/wfa-girls-zscore-expanded-tables.xlsx?sfvrsn=f01bc813_10
- imported fields: Day, L, M, S.
- age range: 0-1856 days.
- units: weight in kg.

### WHO length/height-for-age 0-5 years

- source page: https://www.who.int/toolkits/child-growth-standards/standards/length-height-for-age
- boys XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/length-height-for-age/expandable-tables/lhfa-boys-zscore-expanded-tables.xlsx?sfvrsn=7b4a3428_12
- girls XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/length-height-for-age/expandable-tables/lhfa-girls-zscore-expanded-tables.xlsx?sfvrsn=27f1e2cb_10
- imported fields: Day, L, M, S.
- age range: 0-1856 days.
- units: cm.

### WHO head circumference-for-age 0-5 years

- source page: https://www.who.int/toolkits/child-growth-standards/standards/head-circumference-for-age
- boys XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/head-circumference-for-age/expanded-tables/hcfa-boys-zscore-expanded-tables.xlsx?sfvrsn=2ab1bec8_8
- girls XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/head-circumference-for-age/expanded-tables/hcfa-girls-zscore-expanded-tables.xlsx?sfvrsn=3a34b8b0_8
- imported fields: Day, L, M, S.
- age range: 0-1856 days.
- units: cm.

### WHO weight-for-length / weight-for-height 0-5 years

- source page: https://www.who.int/toolkits/child-growth-standards/standards/weight-for-length-height
- weight-for-length boys XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-length-height/expanded-tables/wfl-boys-zscore-expanded-table.xlsx?sfvrsn=d307434f_8
- weight-for-length girls XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-length-height/expanded-tables/wfl-girls-zscore-expanded-table.xlsx?sfvrsn=db7b5d6b_8
- weight-for-height boys XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-length-height/expanded-tables/wfh-boys-zscore-expanded-tables.xlsx?sfvrsn=ac60cb13_8
- weight-for-height girls XLSX: https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-length-height/expanded-tables/wfh-girls-zscore-expanded-tables.xlsx?sfvrsn=daac732c_8
- imported fields: Length/Height, L, M, S.
- range: weight-for-length 45-110 cm; weight-for-height 65-120 cm.
- units: weight in kg.

### WHO Growth Reference 2007, 5-19 years

- source: World Health Organization. Growth reference data for 5-19 years.
- direct URL: https://www.who.int/tools/growth-reference-data-for-5to19-years
- imported indicators after WHO-GROWTH-4A:
  - BMI-for-age.
  - height-for-age.
- status: partial import and validation; remaining 5-19 scope and interpolation policy remain pending.

### WHO BMI-for-age 5-19 years

- source page: https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age
- boys XLSX: https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/bmi-for-age-(5-19-years)/bmi-boys-z-who-2007-exp.xlsx?sfvrsn=a84bca93_2
- girls XLSX: https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/bmi-for-age-(5-19-years)/bmi-girls-z-who-2007-exp.xlsx?sfvrsn=79222875_2
- imported fields: Month, L, M, S.
- age range: 61-228 completed months.
- units: BMI kg/m2.

### WHO height-for-age 5-19 years

- source page: https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/height-for-age
- boys XLSX: https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/height-for-age-(5-19-years)/hfa-boys-z-who-2007-exp.xlsx?sfvrsn=7fa263d_2
- girls XLSX: https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/height-for-age-(5-19-years)/hfa-girls-z-who-2007-exp.xlsx?sfvrsn=79d310ee_2
- imported fields: Month, L, M, S.
- age range: 61-228 completed months.
- units: cm.

## Target population

- Children 0-5 years for the imported WHO Child Growth Standards indicators.
- Children/adolescents 5-19 years for imported WHO Growth Reference 2007 BMI-for-age and height-for-age.
- PedsCore shows an explicit not-applicable state when an indicator is outside its WHO range or required data are missing.
- PedsCore does not mix WHO with CDC or Orbegozo inside this module.

## Common input

Current common input:

- sex
- age input mode
- date of birth and measurement date for WHO 0-5 indicators
- exact age in days for WHO 0-5 indicators as an advanced option
- structured years/months/days for WHO 0-5 indicators as an approximate operational option
- exact age in completed months for WHO 5-19 indicators
- weight
- recumbent length / standing height
- measurement mode: recumbent length or standing height
- optional head circumference

No entered value is stored, persisted, sent to analytics, or sent to a backend.

## Age input policy

For WHO 0-5 indicators:

- Recommended mode: date of birth plus measurement date.
- This calculates exact age in days and uses the exact daily WHO record.
- Advanced mode: exact age in days, when already known.
- Convenience mode: years/months/days. PedsCore converts this to days using
  `round(years * 365.25 + months * 30.4375 + days)`.
- The structured-age conversion is operational and approximate; the UI warns
  users to use dates for maximum precision.
- The age used is shown back to the user in the result summary.

For WHO 5-19 indicators:

- Required mode: completed months according to WHO Growth Reference 2007.
- PedsCore does not automatically convert 0-5 days or dates into 5-19 months.
- No interpolation is active.
- BMI-for-age and height-for-age are the only 5-19 indicators currently
  available.

## Indicator policy

- Calculate all applicable WHO indicators from the same input when official data are loaded.
- Mark unavailable indicators as not applicable with a reason.
- Do not silently coerce source.
- No interpolation is active yet; lookup uses exact daily records, exact 0.1 cm measure records, or exact completed-month records for WHO 5-19.
- Do not mix WHO, CDC, and Orbegozo references.

## LMS formula

```text
if L != 0:
  z = ((value / M)^L - 1) / (L * S)

if L == 0:
  z = ln(value / M) / S
```

PedsCore uses only official WHO L, M, and S coefficients.

## Percentile method

Percentile is derived from the standard normal cumulative distribution function:

```text
percentile = Phi(z) * 100
```

The UI shows reasonable decimals and keeps z-score traceability.

## Complete table availability

- complete table found: official WHO expanded z-score XLSX tables contain L, M and S values for boys and girls for all imported 0-5 indicators and imported 5-19 BMI-for-age/height-for-age indicators.
- source: WHO official source files listed above.
- copyright/licensing risk: manageable for non-commercial OSS use only if the WHO/source license is kept separate from MIT and attribution/share-alike/adaptation requirements are followed.
- notes: no chart image has been copied into PedsCore. The normalized LMS data are stored under the separate WHO data license policy in `packages/core/src/growth/who/data/`.

## Variables and scoring

This module is not a score table. It requires official LMS records by:

| variable | role | source | notes |
|---|---|---|---|
| sex | LMS stratum | WHO official data | male/female mapping must match source file. |
| age in days | LMS lookup | WHO official data | used for age-based 0-5 indicators. |
| age in completed months | LMS lookup | WHO official data | used for age-based 5-19 indicators. |
| length/height cm | LMS lookup | WHO official data | used for length/height-for-age and for 0-5 weight-for-length/height only when exact 0-5 age in days is provided. |
| head circumference cm | value | WHO official data | used for head circumference-for-age. |
| L | LMS coefficient | WHO official data | imported for all core WHO 0-5 indicators. |
| M | LMS coefficient | WHO official data | imported for all core WHO 0-5 indicators. |
| S | LMS coefficient | WHO official data | imported for all core WHO 0-5 indicators. |

## Interpretation bands / cutoffs

No diagnostic interpretation bands are activated.

Allowed output:

- z-score
- percentile
- source/version
- applicability warning
- safety disclaimer

Forbidden output:

- definitive nutritional diagnosis
- treatment recommendation
- discharge/admission recommendation
- hidden source substitution

## Graphs

Current graph status: implemented for imported WHO 0-5 indicators and imported WHO 5-19 BMI-for-age/height-for-age as PedsCore-generated SVG charts using official LMS data.

Graph behavior:

- No copied WHO chart images.
- Curves labeled directly in each graph: P3, P15, P50, P85, P97.
- Patient point visible and printable.
- Age-based indicators use age in months on the x-axis.
- Weight-for-length and weight-for-height use length/height in cm on the x-axis and are limited to the 0-5 module context.
- Source and disclaimer remain visible in the result section and print output.

## Data loading architecture

Current strategy:

- The root `@peds-core/core` export keeps WHO growth functions data-light.
- Heavy WHO LMS datasets are loaded through `loadWhoLmsRecords(indicator)` from `@peds-core/core/growth/who/loaders`.
- Each loader branch imports an indicator-specific subpath internally:
  - `@peds-core/core/growth/who/bmiForAge`
  - `@peds-core/core/growth/who/weightForAge`
  - `@peds-core/core/growth/who/lengthHeightForAge`
  - `@peds-core/core/growth/who/headCircumferenceForAge`
  - `@peds-core/core/growth/who/weightForLengthHeight`
  - `@peds-core/core/growth/who/bmiForAge5To19`
  - `@peds-core/core/growth/who/heightForAge5To19`
- The web lazily imports the WHO Growth result panel only on the `who-growth` tool page.
- The loader accepts an explicit range option for shared indicators, for example `loadWhoLmsRecords("bmi_for_age", { ageRange: "5_19" })`.
- Future 5-19 indicators must follow the same pattern: one official dataset module per indicator/family plus one explicit loader branch.

Bundle effect measured across WHO-GROWTH-2B/2C/3A:

- Before lazy loading: the main web chunk was 510.67 kB minified.
- After page-level lazy loading: the main web chunk was 383.45 kB minified.
- After indicator loader split: BMI-for-age and weight-for-age are emitted as separate lazy data chunks of approximately 120 kB each.
- WHO-GROWTH-4A keeps the same architecture and adds lazy chunks for WHO 5-19 BMI-for-age and height-for-age.

## Print

Current print status: implemented with browser-native print output for SVG charts, percentile labels, patient point, source, result summary, and disclaimer. No PDF backend is used.

## Safety and regulatory notes

- risk level: medium.
- why: anthropometric percentiles can influence clinical interpretation; source/version and longitudinal context matter.
- should provide recommendations: no.
- required wording ES: "Estos resultados son informativos y deben interpretarse junto con la valoración clínica, la evolución longitudinal y los protocolos locales."
- required wording EN: "These results are informational and should be interpreted together with clinical assessment, longitudinal growth pattern and local protocols."

## Licensing / copyright

- appears implementable: yes for non-commercial OSS use if the applicable WHO/source license is preserved separately from MIT.
- license-sensitive: yes.
- requires permission: commercial use of WHO materials may require WHO permission.
- unknown: confirm each official file-specific license before import.
- notes: do not copy WHO images. Do not use the WHO logo. Do not imply WHO endorsement. Do not commit WHO data as MIT-licensed material.

## Implementation recommendation

`implement_after_remaining_5_19_and_interpolation_review`

Rationale: core WHO 0-5 LMS data plus WHO 5-19 BMI-for-age and height-for-age are imported under separate WHO data licensing and can generate z-scores, percentiles, printable SVG charts, written percentile labels, and patient points. The unified module remains pending because remaining WHO 5-19 scope, interpolation policy, and final maintainer review are not complete.

## Proposed test cases

- BMI calculation.
- age in days/months.
- LMS z-score using known official fixture.
- percentile conversion.
- male/female lookup.
- boundary ages.
- missing required measurement.
- outside official age/measure range.
- weight-for-length x-axis in cm.
- weight-for-height x-axis in cm.
- no Orbegozo data in WHO module.
- no CDC data in WHO module.
- no localStorage persistence.
- no analytics payload with anthropometric values.
- printable chart includes written percentile labels and patient point.

## Direct links

- https://www.who.int/tools/child-growth-standards
- https://www.who.int/tools/growth-reference-data-for-5to19-years
- https://www.who.int/about/policies/publishing/copyright

## Notes

WHO-GROWTH-3B imports the core WHO 0-5 LMS coefficient families from official WHO XLSX files. SVG charts and browser-native print workflow are available for imported 0-5 indicators; WHO 5-19 data and interpolation policy remain pending.
