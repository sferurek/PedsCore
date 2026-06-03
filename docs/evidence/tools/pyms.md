# PYMS

## Current PedsCore status

- id: `pyms`
- slug: `pyms`
- category: `growth_nutrition`
- type: `score`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_complete_scoring_table`
- reason: source located, but full form/table and reuse terms are not verified.

## Clinical purpose

ES: cribado pediátrico de riesgo de malnutrición. EN: pediatric malnutrition risk screening.

## Target population

Hospitalized pediatric patients in tertiary and district hospital settings; exact age/exclusions pending.

## Version / variant

- exact version: Paediatric Yorkhill Malnutrition Score, 2010 evaluation.
- known variants: local routine-use adaptations.
- selected version for PedsCore: original PYMS, pending table/license.
- variant risk: medium.

## Primary source

- found: yes.
- citation: Gerasimidis K, Keane O, Macleod I, Flynn DM, Wright CM. A four-stage evaluation of the Paediatric Yorkhill Malnutrition Score in a tertiary paediatric hospital and a district general hospital. Br J Nutr. 2010;104(5):751-756.
- DOI: `10.1017/S0007114510001121`
- PMID: `20398432`
- URL: https://pubmed.ncbi.nlm.nih.gov/20398432/
- access: `open_access`
- notes: source located; form/table reuse remains pending.

## External validation

Later studies use PYMS routinely; not reviewed as source for table reproduction.

## Guidelines / official sources

No official open tool license identified in this pass.

## Complete scoring table availability

- complete table found: no.
- source: original article/tool form.
- copyright/licensing risk: medium/unknown.
- notes: do not reconstruct from secondary summaries.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| BMI/anthropometry | Pending | Pending | Original article | Exact method pending. |
| Recent weight loss | Pending | Pending | Original article | Exact scoring pending. |
| Recent intake | Pending | Pending | Original article | Exact scoring pending. |
| Expected nutritional effect of condition | Pending | Pending | Original article | Exact scoring pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Low/medium/high risk pending | Must verify from source. | Original article. |

## Formula / algorithm

Four-stage additive/evaluation workflow; exact scoring pending.

## Unit handling

Anthropometry and BMI reference handling must be source-defined.

## Safety and regulatory notes

- risk level: medium.
- why: nutrition screening can trigger care actions.
- should provide recommendations: no.
- forbidden outputs: dietetic referral, feeding plan, supplementation advice.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes.
- requires permission: unknown.
- unknown: official form reuse.
- notes: keep pending.

## Implementation recommendation

`keep_catalog_only`

## Proposed test cases

- minimum: no risk.
- maximum: maximum risk if source defines it.
- intermediate: one risk factor.
- missing input: no anthropometry.
- invalid input: impossible BMI/age.
- edge cases: incomplete intake history.
- forbidden wording tests: no dietetic treatment advice.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/20398432/
- https://doi.org/10.1017/S0007114510001121

## Notes

PYMS is source-located but not implementation-ready.
