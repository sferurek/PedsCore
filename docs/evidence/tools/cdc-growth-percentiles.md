# CDC Growth Percentiles - Evidence Review

Date: 2026-09-19

## Decision

- Priority: A
- Final decision: `implemented`
- Catalog status: `implemented`
- Calculation status: `active`
- Scope: children and adolescents aged 2 to 20 years.
- Rationale: official CDC/NCHS LMS data for weight-for-age, stature-for-age, and BMI-for-age are bundled and tested. The current CDC Extended BMI method is applied automatically above the BMI-for-age 95th percentile.

## Current CDC Recommendation

CDC recommends:

- WHO Child Growth Standards from birth to 2 years.
- CDC 2000 Growth Charts from age 2 years onward.
- CDC 2022 Extended BMI-for-Age Growth Charts for very high BMI.

PedsCore therefore does not silently use the historical CDC infant charts below age 2 in this tool. Users under age 2 are directed to the WHO growth module.

Official recommendation:
https://www.cdc.gov/growth-chart-training/hcp/overview/recommended.html

## Official Sources

1. CDC/NCHS Growth Charts Data Files:
   https://www.cdc.gov/growthcharts/cdc-data-files.htm
2. CDC Growth Chart Training - 2000 CDC Growth Charts:
   https://www.cdc.gov/growth-chart-training/hcp/overview/features-and-data.html
3. CDC Extended BMI data/method:
   https://www.cdc.gov/growthcharts/extended-bmi-data-files.htm
4. CDC SAS program guidance:
   https://www.cdc.gov/growth-chart-training/hcp/computer-programs/sas.html
5. Wei R, Ogden CL, Parsons VL, Freedman DS, Hales CM. A method for calculating BMI z-scores and percentiles above the 95th percentile of the CDC growth charts:
   https://pmc.ncbi.nlm.nih.gov/articles/PMC11232929/

## Implemented Indicators

For ages 24-240 months:

- Weight-for-age: CDC 2000 LMS.
- Stature-for-age: CDC 2000 LMS.
- BMI-for-age: CDC 2000 LMS through P95.
- BMI-for-age above P95: CDC Extended BMI 2022 half-normal method.

The primary displayed result is BMI-for-age percentile; weight-for-age and stature-for-age percentiles and z-scores are also returned.

## Age Handling And Interpolation

The official CDC tables use sex-specific LMS reference points by age, commonly represented at half-month points. CDC explicitly states that interpolation may be used for age intervals finer than the tabulated points.

PedsCore accepts exact decimal age in months and linearly interpolates L, M, and S between the bracketing official CDC rows. Exact tabulated ages use the corresponding official row.

Users should enter the most accurate age available rather than a rounded year value.

## LMS Method

For a measurement X and LMS parameters L, M, and S:

- if L != 0:
  `z = ((X / M)^L - 1) / (L * S)`
- if L = 0:
  `z = ln(X / M) / S`

Percentiles are obtained from the standard normal cumulative distribution.

## CDC Extended BMI 2022

For BMI above the sex- and age-specific CDC P95, PedsCore uses the published half-normal extension.

The CDC P95 is derived from the official LMS parameters at z = 1.6448536269.

For BMI > P95:

`BMI percentile = 90 + 10 * Phi((BMI - P95) / sigma)`

The sex-specific smoothed sigma regressions from Wei et al. are:

- Boys: `sigma = 0.3728 + 0.5196 * ageYears - 0.0091 * ageYears^2`
- Girls: `sigma = 0.8334 + 0.3712 * ageYears - 0.0011 * ageYears^2`

The extended percentile is converted back to an extended z-score with the inverse standard normal CDF.

PedsCore also reports BMI as a percentage of the CDC P95.

## BMI Categories

PedsCore uses CDC category thresholds:

- <P5: underweight.
- P5 to <P85: healthy weight.
- P85 to <P95: overweight.
- >=P95: obesity.
- Severe obesity: BMI >=120% of the sex/age-specific P95 or BMI >=35 kg/m2.

These are descriptive reference classifications and do not replace clinical assessment.

## Licensing / Reuse

The LMS source files are CDC/NCHS U.S. government data. PedsCore records provenance and attribution and does not imply CDC endorsement.

No chart image or CDC branding is redistributed.

## Safety Constraints

- No use below 2 years; the tool directs users to WHO.
- No silent substitution between WHO and CDC.
- No sole-diagnosis wording.
- High BMI uses the current CDC extended method instead of relying on the compressed upper tail of the original LMS BMI z-score.
- Exact source, age, sex, and method are traceable in calculation output.

## Verification

Tests cover:

- official 24-month male median fixtures;
- exact LMS points;
- interpolation between official age points;
- rejection below the 2-year scope;
- current Extended BMI calculations;
- percent-of-P95 output;
- severe-obesity threshold behavior;
- calculator registry and catalog activation.

## Final State

`implemented / local_active`

CDC Growth Percentiles is an operational local tool for the current recommended CDC 2-20-year scope. Historical CDC infant charts remain intentionally outside this surface because current CDC guidance recommends WHO standards below age 2.
