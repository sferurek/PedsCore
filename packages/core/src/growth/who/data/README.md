# WHO Growth Data

This directory contains normalized official WHO LMS data files under a separate
license from the MIT-licensed PedsCore source code.

These WHO data files are governed by a separate license and are not relicensed
as MIT.

Current status: core WHO 0-5 years indicators imported:

- BMI-for-age.
- Weight-for-age.
- Length/height-for-age.
- Head circumference-for-age.
- Weight-for-length.
- Weight-for-height.

WHO Growth Reference 2007 5-19 years indicators imported:

- BMI-for-age.
- Height-for-age.

WHO growth data can be incorporated under the applicable WHO terms. For WHO
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
- Length/height-for-age boys expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/length-height-for-age/expandable-tables/lhfa-boys-zscore-expanded-tables.xlsx?sfvrsn=7b4a3428_12
- Length/height-for-age girls expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/length-height-for-age/expandable-tables/lhfa-girls-zscore-expanded-tables.xlsx?sfvrsn=27f1e2cb_10
- Head circumference-for-age boys expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/head-circumference-for-age/expanded-tables/hcfa-boys-zscore-expanded-tables.xlsx?sfvrsn=2ab1bec8_8
- Head circumference-for-age girls expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/head-circumference-for-age/expanded-tables/hcfa-girls-zscore-expanded-tables.xlsx?sfvrsn=3a34b8b0_8
- Weight-for-length boys expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-length-height/expanded-tables/wfl-boys-zscore-expanded-table.xlsx?sfvrsn=d307434f_8
- Weight-for-length girls expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-length-height/expanded-tables/wfl-girls-zscore-expanded-table.xlsx?sfvrsn=db7b5d6b_8
- Weight-for-height boys expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-length-height/expanded-tables/wfh-boys-zscore-expanded-tables.xlsx?sfvrsn=ac60cb13_8
- Weight-for-height girls expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-length-height/expanded-tables/wfh-girls-zscore-expanded-tables.xlsx?sfvrsn=daac732c_8
- BMI-for-age 5-19 boys expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/bmi-for-age-(5-19-years)/bmi-boys-z-who-2007-exp.xlsx?sfvrsn=a84bca93_2
- BMI-for-age 5-19 girls expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/bmi-for-age-(5-19-years)/bmi-girls-z-who-2007-exp.xlsx?sfvrsn=79222875_2
- Height-for-age 5-19 boys expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/height-for-age-(5-19-years)/hfa-boys-z-who-2007-exp.xlsx?sfvrsn=7fa263d_2
- Height-for-age 5-19 girls expanded z-score table:
  https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/height-for-age-(5-19-years)/hfa-girls-z-who-2007-exp.xlsx?sfvrsn=79d310ee_2

Imported data:

- Age-based indicators use daily LMS records, range 0-1856 days.
- 5-19 BMI-for-age and height-for-age use monthly LMS records, range
  61-228 completed months.
- Weight-for-length uses length in cm, range 45-110 cm.
- Weight-for-height uses height in cm, range 65-120 cm.
- Sex: boys and girls, normalized as `male` and `female`.
- Units: kg, cm, and BMI kg/m2 according to indicator.
- LMS fields: L, M, S.
- Access date: 2026-06-03.

Excluded sources in this module:

- CDC growth references.
- Orbegozo growth references.
- Any third-party calculator, copied chart image, or reconstructed table.

No additional 5-19 LMS coefficient is stored here until the source file,
indicator, age range, sex mapping, license/terms, interpolation policy, and test
fixtures have been verified.

The data license policy is documented in `LICENSE.md`.

Suggested WHO attribution is documented in `ATTRIBUTION.md`.
