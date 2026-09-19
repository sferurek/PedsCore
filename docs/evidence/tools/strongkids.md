# STRONGkids

## Current PedsCore status

- id: `strongkids`
- slug: `strongkids`
- category: `growth_nutrition`
- type: `score`
- implementationStatus: `implemented`
- calculationStatus: `active`
- evidenceLevel: `original_derivation_study`

## Clinical purpose

STRONGkids is a nutritional-risk screening tool for hospitalized children. It identifies risk; it does not diagnose malnutrition and does not prescribe a feeding or treatment plan.

## Primary source

Hulst JM, Zwart H, Hop WC, Joosten KFM. Dutch national survey to test the STRONGkids nutritional risk screening tool in hospitalized children. Clin Nutr. 2010;29(1):106-111.

- DOI: `10.1016/j.clnu.2009.07.006`
- PMID: `19682776`
- PubMed: https://pubmed.ncbi.nlm.nih.gov/19682776/

The primary source identifies the four screening domains.

## Open validation sources used for scoring verification

1. Application of a score system to evaluate the risk of malnutrition in a multiple hospital setting:
   https://pmc.ncbi.nlm.nih.gov/articles/PMC3901031/
2. Screening for Pediatric Malnutrition at Hospital Admission: Which Screening Tool Is Best?:
   https://pmc.ncbi.nlm.nih.gov/articles/PMC7539919/

These open sources verify the additive 5-point structure and original risk bands.

## Independent PedsCore implementation

PedsCore does not reproduce the original questionnaire layout or proprietary wording. The interface uses independently worded yes/no domains representing the published constructs:

| Domain | Positive score |
|---|---:|
| Subjective evidence of poor nutritional state | 1 |
| Underlying high nutritional-risk disease or anticipated major surgery | 2 |
| Recent reduced intake and/or clinically relevant gastrointestinal losses | 1 |
| Recent weight loss or inadequate weight gain | 1 |

Maximum score: 5.

## Interpretation

| Score | Classification |
|---|---|
| 0 | Low nutritional risk |
| 1-3 | Moderate nutritional risk |
| 4-5 | High nutritional risk |

These are the original STRONGkids screening categories.

## Population and scope

The tool was developed for hospitalized pediatric patients and validated in multiple hospital cohorts. PedsCore exposes it only as inpatient nutritional-risk screening.

It should not be interpreted as an anthropometric diagnosis of malnutrition.

## Licensing and reuse approach

The original Clinical Nutrition article is not treated as reusable form content. PedsCore implements only the functional scoring facts and independently worded domain concepts, corroborated by open-access publications.

PedsCore does not reproduce:

- the original questionnaire layout;
- original item wording verbatim;
- branded artwork or a facsimile form;
- any disease-list presentation copied from the original tool.

## Safety constraints

- Screening only.
- No nutritional prescription.
- No feeding-plan recommendation.
- No admission/discharge recommendation.
- No claim that score alone diagnoses malnutrition.
- Clinical and anthropometric assessment remain necessary.

## Tests

Tests cover:

- score 0 / low risk;
- complete 1+2+1+1 weighting / maximum score 5;
- moderate-risk boundary;
- missing-domain handling;
- calculator registry dispatch;
- catalog/discovery activation.

## Final decision

`implemented / local_active`
