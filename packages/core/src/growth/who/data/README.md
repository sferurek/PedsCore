# WHO Growth Data

This directory is reserved for normalized official WHO LMS data files.

Current status: BMI-for-age 0-5 years and weight-for-age 0-5 years imported.
Other WHO indicators remain pending.

WHO growth data can be incorporated under the applicable WHO terms, with a
separate license from the MIT-licensed PedsCore source code. For WHO
publications, this is commonly CC BY-NC-SA 3.0 IGO, including attribution,
non-commercial use, share-alike obligations where applicable, adaptation
disclaimers, no WHO logo use, and no suggestion of WHO endorsement.

Before importing each file, confirm the specific license and terms attached to
that file or official WHO source.

Allowed sources:

- WHO Child Growth Standards, 0-5 years.
- WHO Growth Reference 2007, 5-19 years.

Imported source files:

- BMI-for-age boys expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/body-mass-index-for-age/expanded-tables/bfa-boys-zscore-expanded-tables.xlsx?sfvrsn=f8e1fbe2_10
- BMI-for-age girls expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/body-mass-index-for-age/expanded-tables/bfa-girls-zscore-expanded-tables.xlsx?sfvrsn=ae4cb8d1_12
- Weight-for-age boys expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-age/expanded-tables/wfa-boys-zscore-expanded-tables.xlsx?sfvrsn=65cce121_10
- Weight-for-age girls expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-age/expanded-tables/wfa-girls-zscore-expanded-tables.xlsx?sfvrsn=f01bc813_10

Imported data:

- Indicator: BMI-for-age.
- Indicator: weight-for-age.
- Age range: 0-1856 days.
- Sex: boys and girls, normalized as `male` and `female`.
- Units: BMI in kg/m2; weight in kg.
- LMS fields: L, M, S.
- Access date: 2026-06-03.

Excluded sources in this module:

- CDC growth references.
- Orbegozo growth references.
- Any third-party calculator, copied chart image, or reconstructed table.

No additional LMS coefficient is stored here until the source file, indicator,
age range, sex mapping, license/terms, interpolation policy, and test fixtures
have been verified.

The data license policy is documented in `LICENSE.md`.

Suggested WHO attribution is documented in `ATTRIBUTION.md`.
