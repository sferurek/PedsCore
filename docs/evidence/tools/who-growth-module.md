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
- blocking reason: official WHO LMS/data files are not yet normalized, versioned, licensed, and verified in the repository.
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
- license status: blocked pending maintainer/legal decision. The `anthro` package is GPL-3.0, and WHO website terms restrict substantial reproduction without authorization outside permitted educational/non-commercial uses.
- decision: do not import the full LMS table into the MIT PedsCore repository until license compatibility is explicitly accepted or permission/terms are clarified.

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

- complete table found: BMI-for-age LMS file located in the WHO `anthro` package source tree.
- source: WHO official sources listed above, including `bmianthro.txt`.
- copyright/licensing risk: medium/high until maintainers decide whether GPL-3 data or WHO website terms are acceptable for this MIT repository.
- notes: no chart image, LMS table, or long protected table has been copied into PedsCore.

## Variables and scoring

This module is not a score table. It requires official LMS records by:

| variable | role | source | notes |
|---|---|---|---|
| sex | LMS stratum | WHO official data | male/female mapping must match source file. |
| age | LMS lookup | WHO official data | days/months handling must match indicator. |
| measure cm | LMS lookup | WHO official data | used for weight-for-length/height. |
| L | LMS coefficient | WHO official data | not yet imported. |
| M | LMS coefficient | WHO official data | not yet imported. |
| S | LMS coefficient | WHO official data | not yet imported. |

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

Current graph status: pending official data import.

Block WHO-GROWTH-2A decision: graph implementation remains pending because importing enough LMS/curve data to draw P3, P15, P50, P85 and P97 would require committing a substantial official data table or generated derivative. That must wait for license approval.

## Print

Planned print output:

- entered measurements
- applicable results
- chart with percentile labels
- patient point
- WHO source
- PedsCore disclaimer
- calculation date

Current print status: pending official data import and chart implementation.

## Safety and regulatory notes

- risk level: medium.
- why: anthropometric percentiles can influence clinical interpretation; source/version and longitudinal context matter.
- should provide recommendations: no.
- required wording ES: "Estos resultados son informativos y deben interpretarse junto con la valoración clínica, la evolución longitudinal y los protocolos locales."
- required wording EN: "These results are informational and should be interpreted together with clinical assessment, longitudinal growth pattern and local protocols."

## Licensing / copyright

- appears implementable: technically yes, legally pending.
- license-sensitive: yes.
- requires permission: unknown for direct WHO website tables; GPL-3 obligations apply to the official `anthro` package repository.
- notes: do not copy WHO images. Do not commit the full WHO BMI LMS table into the MIT repository until licensing is accepted or permission is clarified.

## Implementation recommendation

`implement_after_maintainer_decision`

Rationale: math scaffold is safe, and the BMI-for-age 0-5 LMS source is now located, but active percentiles and charts require a maintainer/legal decision on WHO/GPL data redistribution, plus source versioning, interpolation policy, data-license review, and test fixtures.

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

This scaffold deliberately does not include LMS coefficients. Active calculation should be blocked until official data files are imported, normalized, versioned, attributed, and covered with tests.
