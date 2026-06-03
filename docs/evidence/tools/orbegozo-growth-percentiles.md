# Orbegozo Growth Percentiles

## Current PedsCore status

- id: `orbegozo_growth_percentiles`
- slug: `orbegozo-growth-percentiles`
- category: `growth_nutrition`
- type: `percentile`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `official_manual_or_institutional_protocol`

## Evidence validation status

- final evidence status: `pending_licensing_review`
- reason: official tables page is located, but data/LMS availability and reuse terms are unclear.

## Clinical purpose

ES: referencia española de crecimiento pediátrico. EN: Spanish pediatric growth reference.

## Target population

Pediatric population covered by Fundación Orbegozo tables; exact study version/age ranges pending.

## Version / variant

- exact version: 2011 transverse study tables as official page states.
- known variants: 1988, 2004 longitudinal, 2011 transverse tables.
- selected version for PedsCore: not selected.
- variant risk: high if versions are mixed.

## Primary source

- found: official source found.
- citation: Fundación Faustino Orbegozo Eizaguirre. Gráficas y tablas de crecimiento. Publicación 2011 del estudio transversal.
- DOI: not applicable/confirmed.
- PMID: not confirmed.
- URL: https://www.fundacionorbegozo.com/el-instituto-de-investigacion-del-crecimiento-y-desarrollo/graficas-y-tablas/
- access: `open_access`
- notes: official downloads exist, but machine-readable LMS/data and license terms are not confirmed.

## External validation

Spanish growth-study publications exist; not resolved into implementable data in this pass.

## Guidelines / official sources

Fundación Orbegozo official page and downloadable tables.

## Complete scoring table availability

- complete table found: partial.
- source: official PDF/tables.
- copyright/licensing risk: medium/unknown.
- notes: PDF charts/tables are not equivalent to open machine-readable LMS data.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Sex | male/female | Pending | Official tables | Exact labels pending. |
| Age | 0-18 years depending table | Pending | Official tables | Version-specific. |
| Measure | height/weight/head circumference/BMI | Pending | Official tables | Data import pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Percentile values | Growth reference | Descriptive only. | Official tables. |

## Formula / algorithm

Percentile lookup/interpolation; LMS formula unavailable/not confirmed.

## Unit handling

Age, sex, kg, cm, and BMI units require exact table metadata.

## Safety and regulatory notes

- risk level: medium.
- why: growth interpretation may trigger clinical concern.
- should provide recommendations: no.
- forbidden outputs: diagnosis, nutrition treatment, referral, or endocrine recommendations.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes.
- requires permission: unknown.
- unknown: data reuse.
- notes: do not implement until terms are clear.

## Implementation recommendation

`keep_catalog_only`

## Proposed test cases

- minimum: youngest table age.
- maximum: oldest table age.
- intermediate: median percentile.
- missing input: missing sex/age/measure.
- invalid input: invalid age or unit.
- edge cases: table version switch.
- forbidden wording tests: no diagnosis/treatment.

## Direct links

- https://www.fundacionorbegozo.com/el-instituto-de-investigacion-del-crecimiento-y-desarrollo/graficas-y-tablas/
- https://www.fundacionorbegozo.com/wp-content/uploads/pdf/estudios_2011.pdf

## Notes

This is not ready without legal/data review.
