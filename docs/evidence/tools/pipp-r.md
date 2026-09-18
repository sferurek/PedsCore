# PIPP-R

## Current PedsCore status

- id: `pipp_r`
- slug: `pipp-r`
- category: `pain`
- type: `scale`
- implementationStatus: `implemented`
- calculationStatus: `active`
- selected version: Premature Infant Pain Profile-Revised (PIPP-R), 2014
- original PIPP remains a separate non-active historical catalog entry

## Primary source

Stevens BJ, Gibbins S, Yamada J, Dionne K, Lee G, Johnston C, Taddio A. The premature infant pain profile-revised (PIPP-R): initial validation and feasibility. Clin J Pain. 2014;30(3):238-243.

- DOI: `10.1097/AJP.0b013e3182906aed`
- PMID: `24503979`

External validation:

Gibbins S, Stevens BJ, Yamada J, et al. Validation of the Premature Infant Pain Profile-Revised (PIPP-R). Early Hum Dev. 2014;90(4):189-193.

- DOI: `10.1016/j.earlhumdev.2014.01.005`

## Structure

PIPP-R contains seven components:

- corrected gestational age
- baseline behavioral state
- heart-rate increase
- oxygen-saturation decrease
- brow bulge duration
- eye-squeeze duration
- nasolabial-furrow duration

Each component can contribute 0-3 points.

## Revised contextual rule

The defining PIPP-R change is preserved:

1. Calculate the subtotal from the two physiologic and three facial-response indicators.
2. If that subtotal is 0, corrected gestational age and baseline behavioral state are **not added**.
3. If the subtotal is >0, the two contextual scores are added.

This prevents prematurity or a quiet baseline state from generating a pain score when there is no physiologic/behavioral pain response.

## Functional scoring

### Corrected gestational age
- >=36 weeks: 0
- 32 to <36 weeks: 1
- 28 to <32 weeks: 2
- <28 weeks: 3

### Baseline behavioral state
- active awake: 0
- quiet awake: 1
- active sleep: 2
- quiet sleep: 3

### Heart-rate increase
- 0-4 bpm: 0
- 5-14 bpm: 1
- 15-24 bpm: 2
- >=25 bpm: 3

### Oxygen saturation
PIPP-R rounded the original decimal saturation bands for clinical feasibility.

- decrease 0-2 percentage points: 0
- decrease 3-5 points: 1
- decrease 6-8 points: 2
- decrease >8 points: 3
- if supplemental oxygen had to be increased during the assessment: 3

### Facial actions during the 30-second response window
For each of brow bulge, eye squeeze, and nasolabial furrow:

- <3 seconds: 0
- 3-10 seconds: 1
- 11-20 seconds: 2
- >20 seconds: 3

## Descriptive interpretation

PedsCore uses the interpretation reported in subsequent PIPP-R validation literature:

- 0: no pain response detected
- 1-6: low pain
- 7-12: moderate pain
- >=13: severe pain

The maximum theoretical score is 21.

## Observation workflow

The PIPP-R literature uses:

- approximately 15 seconds of baseline observation
- approximately 30 seconds after the painful/procedural stimulus

PedsCore asks for the resulting objective changes/durations rather than reproducing the original paper form.

## Copyright / reuse

PedsCore independently encodes functional scoring facts and uses independently drafted ES/EN wording.

It does not reproduce:

- the original PIPP-R form
- the original layout
- verbatim item instructions
- copyrighted translated forms

## Safety

PIPP-R is used as a descriptive neonatal pain-assessment score.

PedsCore does not generate:

- analgesic recommendations
- opioid recommendations
- sedation recommendations
- medication doses
- procedural treatment instructions

## Implementation files

- `packages/core/src/calculators/pippR.ts`
- `packages/core/tests/pippR.test.ts`
- `packages/core/src/catalog/clinicalTools.ts`
