# Growth Architecture — Sprint 2B

Sprint 2B defines a single WHO Growth engine as the active growth/percentile module in PedsCore.

## Architecture Decision

- `who_growth_module` is the central calculation and display workflow.
- `who_growth_percentiles` is a catalog entry pointing to the same WHO Growth workflow.
- `bmi_percentile` is a BMI-for-age preset over the WHO Growth workflow.
- `head_circumference_percentile` is a head-circumference-for-age preset over the WHO Growth workflow.
- CDC percentiles and Fenton neonatal growth remain deferred and are not implemented in this sprint.

This avoids duplicate percentile engines and keeps growth calculations behind one reviewed LMS lookup, z-score and percentile conversion pathway.

## Supported WHO Scope

PedsCore only exposes indicators when the corresponding WHO LMS dataset is present in the repository and wired to the common engine.

### WHO Child Growth Standards 0-5 Years

- Weight-for-age.
- Length/height-for-age.
- Weight-for-length.
- Weight-for-height.
- BMI-for-age.
- Head circumference-for-age.

### WHO Growth Reference 5-19 Years

- BMI-for-age.
- Height-for-age.

Unsupported indicators return a clear unavailable or out-of-range state instead of silently estimating from missing data.

## Presets

### BMI Percentile

- Uses the common WHO Growth engine.
- Does not create a separate BMI percentile calculation pathway.
- Outputs BMI-for-age z-score and percentile when WHO data and age range support the request.
- Uses descriptive wording only.

### Head Circumference Percentile

- Uses the common WHO Growth engine.
- Does not create a separate head circumference percentile pathway.
- Limited to WHO 0-5 years head-circumference-for-age data.
- Returns explicit out-of-range wording outside the supported WHO 0-5 scope.

## Safety Wording

Growth outputs remain educational and descriptive:

- z-score;
- percentile;
- indicator;
- source;
- supported reference range;
- unavailable or out-of-range warnings.

PedsCore does not diagnose malnutrition, obesity, failure to thrive, microcephaly or macrocephaly, and does not provide nutritional or treatment recommendations.

## Data And License Notes

- PedsCore source code is MIT licensed.
- WHO growth datasets are third-party source material and are kept under separate WHO licensing and attribution terms.
- WHO logos are not used.
- PedsCore does not imply WHO endorsement.
- Source links must point to official WHO pages or official WHO data files where applicable.

## Deferred References

CDC and Fenton are intentionally deferred:

- CDC requires a separate source policy, age-range policy and data reuse review.
- Fenton requires preterm-specific governance, source/version selection and data reuse review.
- Neither CDC nor Fenton is activated by Sprint 2B.
