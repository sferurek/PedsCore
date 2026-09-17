# Gorelick Dehydration Scale

## Current PedsCore status

- id: `gorelick_dehydration`
- slug: `gorelick-dehydration`
- category: `emergency`
- type: `score`
- implementationStatus: `implemented`
- calculationStatus: `active`
- population: children aged 1 month to 5 years with diarrhea, vomiting, or poor oral intake and suspected dehydration
- primary score: Gorelick-10, 0–10
- automatic subscore: Gorelick-4, 0–4

## Primary source

Gorelick MH, Shaw KN, Murphy KO. Validity and reliability of clinical signs in the diagnosis of dehydration in children. Pediatrics. 1997;99(5):e6.

- DOI: `10.1542/peds.99.5.e6`
- PMID: `9113963`

The prospective cohort included 186 children aged 1 month to 5 years. The reference standard was fluid deficit estimated from serial weight gain after treatment.

## Gorelick-10

PedsCore records the presence or absence of these 10 clinical findings:

1. ill general appearance
2. capillary refill >2 seconds
3. absent tears
4. dry mucous membranes
5. sunken eyes
6. deep or deep-and-rapid breathing
7. weak/thready/impalpable pulse
8. reduced skin elasticity / delayed recoil
9. tachycardia
10. reduced urine output

Each present sign contributes 1 point. Total range: 0–10.

### Original-study thresholds

- 0–2 signs: below the study threshold associated with >=5% weight deficit
- >=3 signs: associated with >=5% weight deficit
- >=7 signs: associated with >=10% weight deficit

The original study reported sensitivity 87% and specificity 82% for the presence of any 3 or more signs to detect >=5% deficit.

## Gorelick-4 subset

The original study identified a four-sign subset with similar performance:

1. capillary refill >2 seconds
2. absent tears
3. dry mucous membranes
4. ill general appearance

PedsCore calculates this automatically from the 10-item assessment.

### Subscore thresholds

- 0–1 signs: below the >=5% threshold
- >=2 signs: associated with >=5% weight deficit
- >=3 signs: associated with >=10% weight deficit

## Interpretation policy

PedsCore reports both:

- `Gorelick-10: X/10`
- `Gorelick-4: Y/4`

The output describes ranges associated with weight deficit in the derivation study. It does **not** claim that a child has an exact measured dehydration percentage.

External validation of dehydration scales is heterogeneous, so the score should be interpreted with the complete clinical assessment and, when available, measured change in body weight.

## Copyright / reuse decision

The original Pediatrics article is not treated as an openly licensed table.

PedsCore independently encodes the functional scoring rules and uses independently drafted ES/EN descriptors. It does not reproduce the source table, typography, layout, or editorial wording.

An open-access review in Frontiers in Pediatrics reproduces the ten signs and the 10-sign / 4-sign thresholds and is used as a secondary verification source:

- Management of Diarrhoeal Dehydration in Childhood: A Review for Clinicians in Developing Countries.
- PMCID: PMC5829087.

## Safety

PedsCore does not attach the score to:

- oral or intravenous fluid volumes
- bolus instructions
- medication
- admission or discharge
- ICU disposition
- any automatic treatment pathway

## Implementation files

- `packages/core/src/calculators/gorelickDehydration.ts`
- `packages/core/tests/gorelickDehydration.test.ts`
- `packages/core/src/catalog/clinicalTools.ts`
