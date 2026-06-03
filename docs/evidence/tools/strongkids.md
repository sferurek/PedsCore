# STRONGkids

## Current PedsCore status

- id: `strongkids`
- slug: `strongkids`
- category: `growth_nutrition`
- type: `score`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_complete_scoring_table`
- reason: source located, but complete tool wording/table, interpretation, and reuse terms are pending.

## Clinical purpose

ES: cribado de riesgo nutricional en niños hospitalizados. EN: nutritional-risk screening in hospitalized children.

## Target population

Hospitalized children in Dutch multicentre source context; exact age range/exclusions pending.

## Version / variant

- exact version: STRONGkids, 2010 Clinical Nutrition source.
- known variants: translations and local adaptations.
- selected version for PedsCore: original STRONGkids only, pending license.
- variant risk: medium.

## Primary source

- found: yes.
- citation: Hulst JM, Zwart H, Hop WC, Joosten KFM. Dutch national survey to test the STRONGkids nutritional risk screening tool in hospitalized children. Clin Nutr. 2010;29(1):106-111.
- DOI: `10.1016/j.clnu.2009.07.006`
- PMID: `19682776`
- URL: https://pubmed.ncbi.nlm.nih.gov/19682776/
- access: `abstract_only`
- notes: repository pages identify DOI/PMID; source article likely contains item descriptions.

## External validation

Multiple country validation studies exist; not used as primary table source.

## Guidelines / official sources

No official open implementation manual/license found in this pass.

## Complete scoring table availability

- complete table found: no.
- source: original article/tool materials.
- copyright/licensing risk: medium/unknown.
- notes: item wording and points cannot be reconstructed from secondary summaries.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Subjective clinical assessment | Pending | Pending | Original article | Exact wording pending. |
| High-risk disease | Pending | Pending | Original article | Exact disease list pending. |
| Nutritional intake/losses | Pending | Pending | Original article | Exact scoring pending. |
| Weight loss/growth | Pending | Pending | Original article | Exact scoring pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Low/moderate/high risk pending | Must verify from source. | Original article. |

## Formula / algorithm

Additive screening score; exact score values pending.

## Unit handling

Growth/weight-loss criteria need exact source definitions.

## Safety and regulatory notes

- risk level: medium.
- why: nutritional screening may influence care pathways.
- should provide recommendations: no.
- forbidden outputs: nutrition prescriptions, admission/referral advice, feeding plans.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes.
- requires permission: unknown.
- unknown: tool wording reuse.
- notes: keep pending.

## Implementation recommendation

`keep_catalog_only`

## Proposed test cases

- minimum: no criteria.
- maximum: all criteria/source max.
- intermediate: one moderate-risk criterion.
- missing input: missing growth data.
- invalid input: impossible anthropometry.
- edge cases: high-risk disease list.
- forbidden wording tests: no nutrition treatment recommendations.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/19682776/
- https://doi.org/10.1016/j.clnu.2009.07.006

## Notes

Implement only after official table/reuse review.
