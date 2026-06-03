# CDC Growth Percentiles - Evidence Review

Date: 2026-06-03

## Decision

- Priority: A
- Final decision: `pending_complete_scoring_table`
- Catalog status: keep `pending_validation`
- Rationale: official CDC LMS data source is verified, but chart selection, interpolation, age bounds, attribution, and tests must be finalized before implementation.

## Source

- Official source: Centers for Disease Control and Prevention; National Center for Health Statistics. CDC Growth Charts Data Files.
- Direct URL: https://www.cdc.gov/growthcharts/cdc-data-files.htm
- Access: official open CDC site.
- Data note: CDC page provides LMS parameters and selected smoothed percentiles.

## Version And Population

- Version selected for future review: CDC 2000 Growth Charts with LMS data.
- Population: CDC chart-dependent; includes birth-to-36-month curves and 2-to-20-year curves.
- Use context: growth percentile/z-score reference, not diagnosis alone.

## Variables And Scoring

- Variables: sex, age or length/stature, anthropometric measurement, chart type.
- Complete scoring table/data: official files located, not imported into PedsCore.
- Formula/algorithm: LMS z-score and percentile calculation described by CDC; implementation requires exact chart selection and interpolation policy.
- Units: kg, cm, BMI kg/m2 depending on chart.

## Interpretation And Licensing

- Copyright/licensing: official U.S. government source, but attribution and file-use assumptions must still be documented.
- Test cases needed: birth/half-month age handling, sex-specific lookup, BMI-for-age, head circumference, interpolation, extreme values.

## Implementation Gate

- Official source: yes.
- Complete data: pending import/fixture selection.
- Interpretation: partial.
- Variant selected: partial.
- Licensing: pending attribution review.
- Ready for implementation: no.
