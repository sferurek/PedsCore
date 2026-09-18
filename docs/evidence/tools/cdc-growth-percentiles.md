# CDC Growth Percentiles - Evidence and Implementation

Date reviewed: 2026-09-18

## Decision

- Catalog id: `cdc_growth_percentiles`
- Slug: `cdc-growth-percentiles`
- Status: `implemented`
- Calculation status: `active`
- Selected scope: CDC 2000 Growth Charts for ages 24 to <240 months
- Indicators implemented:
  - weight-for-age
  - stature-for-age
  - BMI-for-age
- High-BMI extension: CDC 2022 Extended BMI-for-Age method above the classic P95

## Official sources

### CDC 2000 LMS data

Centers for Disease Control and Prevention; National Center for Health Statistics. CDC Growth Charts Data Files with LMS Values.

- https://www.cdc.gov/growthcharts/cdc-data-files.htm
- canonical CSVs:
  - https://www.cdc.gov/growthcharts/data/zscore/wtage.csv
  - https://www.cdc.gov/growthcharts/data/zscore/statage.csv
  - https://www.cdc.gov/growthcharts/data/zscore/bmiagerev.csv

CDC documents the LMS equation:

- if L != 0: `z = ((X/M)^L - 1) / (L*S)`
- if L = 0: `z = ln(X/M) / S`

Percentiles are obtained from the standard normal CDF.

### Current CDC chart recommendation

CDC recommends:

- WHO growth standards from birth to 2 years
- CDC 2000 growth charts from age 2 years onward
- CDC 2022 Extended BMI-for-Age charts for children and adolescents with very high BMI

Source:
https://www.cdc.gov/growth-chart-training/hcp/overview/recommended.html

### Extended BMI 2022

Official source:
https://www.cdc.gov/growthcharts/extended-bmi-data-files.htm

For BMI above the classic CDC 2000 P95, PedsCore uses the upper-tail extended method documented by CDC instead of silently extrapolating the classic LMS relation.

The implemented percentile relation is independently encoded from the published functional rule:

- calculate the sex- and age-specific P95
- calculate sigma from sex and age
- calculate the upper-tail probability from the standardized distance above P95
- map it to the extended percentile scale

The implementation was cross-checked against the CDC-supported `cdcanthro` methodology, which CDC lists among its R resources.

## Age handling

The active PedsCore surface is intentionally restricted to:

`24 <= ageMonths < 240`

This aligns with current CDC use of the 2000 charts for children aged 2 years and older and with the current CDC-supported analytical tooling.

Age may be entered with decimals.

When an input age falls between published reference ages, PedsCore linearly interpolates L, M, S and the relevant BMI percentile anchors. CDC explicitly permits interpolation for finer age intervals.

## Local data policy

The required CDC reference data are vendored in the repository so the calculator performs no network call at runtime.

Files:

- `packages/core/src/growth/cdc/data/cdcWeightForAge.ts`
- `packages/core/src/growth/cdc/data/cdcStatureForAge.ts`
- `packages/core/src/growth/cdc/data/cdcBmiForAge.ts`

The canonical source for every data file remains the CDC URL above. Public mirrors were used only to transfer immutable CSV rows into the repository when the CDC endpoint was not directly consumable through the development connector; row schema and representative values were checked against the official CDC documentation.

## Output

For every valid assessment PedsCore returns:

- weight-for-age z-score and percentile
- stature-for-age z-score and percentile
- calculated BMI
- BMI-for-age percentile
- classic BMI z-score when the CDC 2000 LMS method applies
- explicit indication when the CDC 2022 extended BMI method is used

## Interpretation

Growth percentiles are descriptive reference values.

PedsCore does not use the percentile result alone to:

- diagnose a disease
- recommend treatment
- recommend admission or discharge
- make an automated nutrition or obesity diagnosis

Longitudinal trajectory and clinical context remain important.

## Copyright / reuse

The underlying CDC/NCHS reference data and mathematical rules are U.S. government materials.

PedsCore:

- stores only the numeric reference parameters needed for calculation
- independently implements the mathematical logic
- uses independently authored ES/EN interface text
- does not reproduce CDC chart artwork, layout, or editorial presentation

## Tests

Coverage includes:

- exact LMS median checks
- both sexes
- interpolation between age anchors
- 2-to-<20-year boundaries
- weight-for-age
- stature-for-age
- BMI-for-age
- CDC 2022 extended BMI path
- invalid inputs
- safety wording

## Implementation files

- `packages/core/src/calculators/cdcGrowthPercentiles.ts`
- `packages/core/tests/cdcGrowthPercentiles.test.ts`
- `packages/core/src/catalog/clinicalTools.ts`
- `packages/core/src/growth/cdc/data/cdcWeightForAge.ts`
- `packages/core/src/growth/cdc/data/cdcStatureForAge.ts`
- `packages/core/src/growth/cdc/data/cdcBmiForAge.ts`
