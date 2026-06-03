# WHO Growth Percentiles - Evidence Review

Date: 2026-06-03

## Decision

- Priority: A
- Final decision: `pending_complete_scoring_table`
- Catalog status: keep `pending_validation`
- Rationale: official WHO source is verified, but exact indicators, age ranges, data files, license terms, interpolation, and tests must be selected before implementation.

## Source

- Official source: World Health Organization. WHO Child Growth Standards.
- Direct URL: https://www.who.int/tools/child-growth-standards
- Access: official open WHO site.
- Development basis: WHO Multicentre Growth Reference Study.

## Version And Population

- Version selected for future review: WHO Child Growth Standards for children up to 5 years, pending indicator selection.
- Population: infants and children covered by WHO standards; exact age bounds vary by indicator.
- Use context: growth percentile/z-score reference, not diagnosis alone.

## Variables And Scoring

- Variables: age, sex, anthropometric measurement, and selected indicator.
- Complete scoring table/data: pending direct selection of official WHO files.
- Formula/algorithm: LMS/z-score percentile workflow expected, but exact official file set and interpolation rules must be documented before implementation.
- Units: indicator-specific, e.g. kg, cm, BMI.

## Interpretation And Licensing

- Copyright/licensing: use official data files and WHO attribution; avoid copying chart images.
- Test cases needed: male/female, boundary ages, median percentile, extreme z-score, invalid units, missing values.

## Implementation Gate

- Official source: yes.
- Complete data: pending.
- Interpretation: pending.
- Variant selected: partial.
- Licensing: pending terms review.
- Ready for implementation: no.
