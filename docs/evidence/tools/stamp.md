# STAMP

## Current PedsCore status

- id: `stamp`
- slug: `stamp`
- category: `growth_nutrition`
- type: `score`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_licensing_review`
- reason: source located, but STAMP© materials, scoring table, and reuse terms need review.

## Clinical purpose

ES: cribado de riesgo de malnutrición pediátrica hospitalaria. EN: pediatric inpatient malnutrition risk screening.

## Target population

Hospitalized pediatric patients; exact age range and exclusions pending source review.

## Version / variant

- exact version: STAMP© development/evaluation, 2012.
- known variants: translated/local adaptations.
- selected version for PedsCore: not selected.
- variant risk: medium.

## Primary source

- found: yes.
- citation: McCarthy H, Dixon M, Crabtree I, Eaton-Evans MJ, McNulty H. The development and evaluation of the Screening Tool for the Assessment of Malnutrition in Paediatrics (STAMP©) for use by healthcare staff. J Hum Nutr Diet. 2012;25(4):311-318.
- DOI: `10.1111/j.1365-277X.2012.01234.x`
- PMID: `22568534`
- URL: https://pubmed.ncbi.nlm.nih.gov/22568534/
- access: `abstract_only`
- notes: STAMP uses copyright mark in source title.

## External validation

Additional validation studies exist for selected populations; not reviewed as implementation source.

## Guidelines / official sources

STAMP tool website/materials may exist, but permissions were not resolved.

## Complete scoring table availability

- complete table found: no.
- source: primary/tool materials.
- copyright/licensing risk: high.
- notes: no implementation until tool terms are clear.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Diagnosis/disease risk | Pending | Pending | STAMP source | Exact wording pending. |
| Nutritional intake | Pending | Pending | STAMP source | Exact wording pending. |
| Anthropometry/growth | Pending | Pending | STAMP source | Exact scoring pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Low/medium/high risk pending | Must verify from source. | STAMP materials. |

## Formula / algorithm

Additive screening score; exact table pending.

## Unit handling

Anthropometry, weight/height/BMI references depend on source instructions.

## Safety and regulatory notes

- risk level: medium.
- why: nutritional screening may imply follow-up actions.
- should provide recommendations: no.
- forbidden outputs: dietetic prescriptions, referral instructions, feeding plans.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes.
- requires permission: likely/unknown.
- unknown: tool form reuse.
- notes: keep blocked.

## Implementation recommendation

`do_not_implement_license_risk`

## Proposed test cases

- minimum: no risk.
- maximum: highest source-verified risk.
- intermediate: medium-risk example.
- missing input: missing anthropometry.
- invalid input: impossible measurements.
- edge cases: age/reference mismatch.
- forbidden wording tests: no nutrition treatment plan.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/22568534/
- https://doi.org/10.1111/j.1365-277X.2012.01234.x

## Notes

Catalog reference only until permission/table are resolved.
