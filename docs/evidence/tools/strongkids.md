# STRONGkids

## Current PedsCore status

- id: `strongkids`
- slug: `strongkids`
- category: `growth_nutrition`
- type: `score`
- implementationStatus: `implemented`
- calculationStatus: `active`
- selected version: original STRONGkids functional scoring structure

## Primary source

Hulst JM, Zwart H, Hop WC, Joosten KFM. Dutch national survey to test the STRONGkids nutritional risk screening tool in hospitalized children. Clinical Nutrition. 2010;29(1):106-111.

- DOI: `10.1016/j.clnu.2009.07.006`
- PMID: `19682776`

The original tool contains four screening domains:

1. subjective clinical assessment
2. high-risk disease
3. nutritional intake / losses
4. weight loss

## Functional scoring implemented

PedsCore independently encodes the scoring facts:

- subjective clinical assessment: 0 or 1 point
- high-risk disease: 0 or 2 points
- reduced intake / clinically relevant losses: 0 or 1 point
- weight loss or poor expected weight gain: 0 or 1 point

Total range: 0-5.

## Risk bands

- 0: low nutritional risk
- 1-3: moderate nutritional risk
- 4-5: high nutritional risk

These bands are corroborated by multiple open-access external validation studies.

## Open validation sources

### Italian multicentre validation

Application of a score system to evaluate the risk of malnutrition in a multiple hospital setting.

Open access:
https://pmc.ncbi.nlm.nih.gov/articles/PMC3901031/

This source confirms the four-domain structure, 1/2/1/1 weighting and 0 / 1-3 / 4-5 risk bands.

### Additional validation

STRONGkids validation: tool accuracy.

Open access:
https://pmc.ncbi.nlm.nih.gov/articles/PMC9432264/

This source confirms the 0-5 total and low/moderate/high categories.

## Copyright / reuse decision

The original questionnaire wording and complete high-risk disease list are not treated as openly licensed project content.

PedsCore therefore:

- independently encodes only the functional scoring rules
- uses independently drafted ES/EN descriptors
- does not reproduce the original questionnaire layout
- does not reproduce the complete editorial high-risk disease list
- does not reproduce original treatment or follow-up instructions

This keeps the implementation focused on functional clinical facts rather than protected editorial expression.

## Safety

STRONGkids is a nutritional-risk screening tool.

It is **not** used in PedsCore as:

- a diagnosis of malnutrition
- a feeding prescription
- an indication for supplements, enteral or parenteral nutrition
- an admission/discharge rule
- a replacement for dietetic or clinical nutritional assessment

PedsCore returns only the score and descriptive risk category.

## Implementation files

- `packages/core/src/calculators/strongkids.ts`
- `packages/core/tests/strongkids.test.ts`
- `packages/core/src/catalog/clinicalTools.ts`
