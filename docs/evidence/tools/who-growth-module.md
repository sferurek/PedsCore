# WHO Growth Module

## Current PedsCore status

- id: `who_growth_module`
- slug: `who-growth`
- category: `growth_nutrition`
- type: `percentile`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `official_manual_or_institutional_protocol`

## Evidence validation status

- final evidence status: `pending_complete_scoring_table`
- blocking reason: BMI-for-age 0-5 LMS data are normalized and licensed separately; remaining WHO indicators, interpolation policy, and full multi-indicator validation are still pending.
- depends on maintainer decision: yes
- maintainer decision needed: confirm data-source scope, interpolation policy, chart percentiles, and print-output wording before activation.

## Clinical purpose

ES: modulo unificado para valorar indicadores antropometricos OMS aplicables desde una entrada comun de datos.

EN: unified module to evaluate applicable WHO anthropometric indicators from one common data entry.

## Official WHO sources

### WHO Child Growth Standards, 0-5 years

- source: World Health Organization. WHO Child Growth Standards.
- direct URL: https://www.who.int/tools/child-growth-standards
- indicators:
  - weight-for-age
  - length/height-for-age
  - head circumference-for-age
  - weight-for-length
  - weight-for-height
  - BMI-for-age

### WHO BMI-for-age 0-5 years, Block WHO-GROWTH-2A review

- source page: World Health Organization. Body mass index-for-age (BMI-for-age).
- direct URL: https://www.who.int/toolkits/child-growth-standards/standards/body-mass-index-for-age-bmi-for-age
- official downloadable files located: BMI-for-age z-score tables, percentile tables, and expanded tables for constructing national health cards.
- LMS source located: WHO official `anthro` package repository, `data-raw/growthstandards/bmianthro.txt`.
- direct LMS URL: https://raw.githubusercontent.com/WorldHealthOrganization/anthro/master/data-raw/growthstandards/bmianthro.txt
- package repository: https://github.com/WorldHealthOrganization/anthro
- license status: imported under separate WHO data terms, not under the MIT code license. WHO publications commonly use CC BY-NC-SA 3.0 IGO for non-commercial use with attribution, share-alike, adaptation disclaimer, no WHO logo, and no implied WHO endorsement. The `anthro` package repository is avoided as the data source for this block.
- decision: do not relicense WHO LMS data as MIT. Keep WHO data/materials under the applicable WHO/source license and document attribution.

### WHO Growth Reference 2007, 5-19 years

- source: World Health Organization. Growth reference data for 5-19 years.
- direct URL: https://www.who.int/tools/growth-reference-data-for-5to19-years
- indicators:
  - BMI-for-age
  - height-for-age
  - weight-for-age when applicable in the official reference.

## Target population

- Children from birth through adolescence according to the exact age ranges in each WHO indicator.
- PedsCore must show an explicit "not applicable" state when an indicator is outside its WHO range or when required data are missing.
- PedsCore must not mix WHO with CDC or Orbegozo inside this module.

## Common input

Planned common input:

- sex
- date of birth or exact age
- measurement date
- weight
- recumbent length / standing height
- head circumference
- measurement mode: recumbent length or standing height

No entered value is stored, persisted, sent to analytics, or sent to a backend.

## Indicator policy

- Calculate all applicable WHO indicators from the same input when official data are available.
- Mark unavailable indicators as "not applicable" with a reason.
- Do not silently coerce age, measurement mode, or source.
- Do not mix WHO, CDC, and Orbegozo references.

## LMS formula

The standard LMS z-score formula is planned:

```text
if L != 0:
  z = ((value / M)^L - 1) / (L * S)

if L == 0:
  z = ln(value / M) / S
```

PedsCore must use only official WHO L, M, and S coefficients.

## Percentile method

Percentile is derived from the standard normal cumulative distribution function:

```text
percentile = Phi(z) * 100
```

Do not round in a way that implies false precision. The UI should show reasonable decimals and retain z-score traceability.

## Complete scoring table availability

- complete table found: official WHO BMI-for-age expanded z-score XLSX tables contain daily L, M and S values for boys and girls.
- source: WHO official source files listed above.
- copyright/licensing risk: manageable for non-commercial OSS use only if the WHO/source license is kept separate from MIT and attribution/share-alike/adaptation requirements are followed.
- notes: no chart image has been copied into PedsCore. The normalized LMS data are stored under the separate WHO data license policy in `packages/core/src/growth/who/data/`.

## Variables and scoring

This module is not a score table. It requires official LMS records by:

| variable | role | source | notes |
|---|---|---|---|
| sex | LMS stratum | WHO official data | male/female mapping must match source file. |
| age | LMS lookup | WHO official data | days/months handling must match indicator. |
| measure cm | LMS lookup | WHO official data | used for weight-for-length/height. |
| L | LMS coefficient | WHO official data | imported for BMI-for-age 0-5 only. |
| M | LMS coefficient | WHO official data | imported for BMI-for-age 0-5 only. |
| S | LMS coefficient | WHO official data | imported for BMI-for-age 0-5 only. |

## Interpretation bands / cutoffs

No diagnostic interpretation bands are activated in this scaffold.

Allowed output after implementation:

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

Planned graph behavior:

- Generated by PedsCore from official tabular WHO data.
- No copied WHO chart images.
- Curves labeled directly in the graph: P3, P15, P50, P85, P97 or selected WHO-equivalent labels.
- Patient point visible and printable.
- Source, calculation date, and disclaimer visible in print.

Current full-module graph status: pending completion for all WHO indicators.

Current BMI-for-age 0-5 graph status: implemented as a PedsCore-generated SVG chart using the imported WHO LMS data, with directly labeled P3, P15, P50, P85, and P97 curves and a visible patient point.

Block WHO-GROWTH-2B/printable-chart decision: BMI-for-age 0-5 can show the first printable chart slice. Other WHO indicators, interpolation policy, and full multi-indicator growth module completion remain pending.

## Data loading architecture

Current strategy:

- The root `@peds-core/core` export keeps WHO growth functions data-light.
- Heavy WHO LMS datasets are loaded from indicator-specific subpath exports, currently `@peds-core/core/growth/who/bmiForAge`.
- The web lazily imports the WHO Growth result panel only on the `who-growth` tool page.
- BMI-for-age 0-5 remains the only imported dataset in this block.
- Future indicators should follow the same pattern: one official dataset module per indicator/family, imported only by the UI or calculator slice that needs it.

Bundle effect measured in this block:

- Before lazy loading: the main web chunk was 510.67 kB minified.
- After lazy loading: the main web chunk was 383.45 kB minified, with WHO growth isolated in a dedicated lazy chunk at 129.13 kB minified.

This avoids loading WHO growth LMS data for users who never open the growth module and prepares the module for additional official WHO indicators without inflating the initial bundle.

## Print

Planned print output:

- entered measurements
- applicable results
- chart with percentile labels
- patient point
- WHO source
- PedsCore disclaimer
- calculation date

Current full-module print status: pending completion for all WHO indicators.

Current BMI-for-age 0-5 print status: implemented with browser-native print output for the SVG chart, percentile labels, patient point, source, result summary, and disclaimer. No PDF backend is used.

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

`implement_after_chart_and_ui_review`

Rationale: BMI-for-age 0-5 LMS data are now imported under separate WHO data licensing, and core calculation can compute BMI-for-age when exact age, sex, weight and stature are available. The first dedicated UI slice, printable SVG chart, written percentile labels and patient point are available. The full module remains pending because interpolation policy and the remaining indicators are not complete.

## Proposed test cases

- BMI calculation.
- age in days/months.
- LMS z-score using known official fixture.
- percentile conversion.
- male/female lookup.
- boundary ages.
- missing required measurement.
- outside official age/measure range.
- no Orbegozo data in WHO module.
- no CDC data in WHO module.
- no localStorage persistence.
- no analytics payload with anthropometric values.
- printable chart includes written percentile labels and patient point.

## Direct links

- https://www.who.int/tools/child-growth-standards
- https://www.who.int/tools/growth-reference-data-for-5to19-years

## Notes

WHO-GROWTH-2B imports only BMI-for-age 0-5 LMS coefficients from official WHO XLSX files. The BMI-for-age 0-5 SVG chart and browser-native print workflow are available; remaining indicators and interpolation policy remain pending.
