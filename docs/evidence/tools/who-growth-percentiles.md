# WHO Growth Percentiles - Evidence Review

Date: 2026-06-17

## Decision

- Priority: A
- Final decision: `partially_implemented`
- Catalog status: `partially_implemented`
- Rationale: WHO Growth Percentiles now acts as a source-specific catalog entry into the central WHO Growth module. It does not own a separate percentile engine.

## Source

- Official source: World Health Organization. WHO Child Growth Standards.
- Direct URL: https://www.who.int/tools/child-growth-standards
- Official source: World Health Organization. Growth reference data for 5-19 years.
- Direct URL: https://www.who.int/tools/growth-reference-data-for-5to19-years
- Development basis: WHO Multicentre Growth Reference Study and WHO Growth Reference 2007.

## Version And Population

- WHO Child Growth Standards 0-5 years for imported 0-5 LMS indicators.
- WHO Growth Reference 2007 5-19 years for imported BMI-for-age and height-for-age LMS indicators.
- PedsCore shows explicit unavailable/out-of-range states when a requested indicator is outside imported WHO scope.

## Variables And Scoring

- Variables: age, sex, anthropometric measurement and selected indicator.
- Complete scoring table/data: present for indicators imported into the central WHO Growth module.
- Formula/algorithm: LMS z-score and percentile conversion through the shared WHO Growth engine.
- Units: indicator-specific, e.g. kg, cm, BMI kg/m2.

## Active Sprint 2B Architecture

- `who_growth_module`: central WHO calculation and display workflow.
- `who_growth_percentiles`: source-specific entry to the central workflow.
- `bmi_percentile`: BMI-for-age preset over the central workflow.
- `head_circumference_percentile`: head-circumference-for-age preset over the central workflow.
- CDC and Fenton remain deferred.

## Interpretation And Licensing

- Output is descriptive only: z-score, percentile, indicator, source and supported range.
- No nutritional, neurologic or growth diagnosis is generated.
- No treatment, diet, imaging or referral recommendation is generated.
- WHO data remain under separate WHO licensing and attribution terms, not under the MIT code license.
- PedsCore does not use WHO logos or imply WHO endorsement.

## Implementation Gate

- Official source: yes.
- Complete data: yes for imported WHO scope; unavailable state for missing scope.
- Interpretation: descriptive only.
- Variant selected: WHO central engine with presets.
- Licensing: separate WHO data terms documented.
- Ready for full implementation: no; final maintainer review and interpolation policy remain pending.
