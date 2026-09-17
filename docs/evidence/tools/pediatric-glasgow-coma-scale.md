# Pediatric Glasgow Coma Scale (pGCS)

## Current PedsCore status

- id: `pediatric_gcs`
- slug: `pediatric-glasgow-coma-scale`
- category: `neurology`
- type: `scale`
- implementationStatus: `implemented`
- calculationStatus: `active`
- total range: 3–15

## Variant selected

PedsCore uses an explicit age-based split that matches PECARN validation:

- **<2 years:** preverbal pediatric GCS adaptation
- **>=2 years:** standard GCS response set

This avoids presenting a single “universal” pediatric modification when several pediatric adaptations exist.

## Components

The score is always documented as:

- Eye opening (E): 1–4
- Verbal response (V): 1–5
- Motor response (M): 1–6
- Total: E + V + M = 3–15

The individual E/V/M components should be retained alongside the total.

## Preverbal adaptation (<2 years)

### Eye opening
Same 1–4 structure as standard GCS.

### Verbal response
- 5: age-appropriate cooing/babbling or interaction
- 4: irritable crying
- 3: crying to painful stimulus
- 2: moaning to painful stimulus
- 1: no verbal response

### Motor response
- 6: spontaneous purposeful movement
- 5: withdrawal to touch
- 4: withdrawal from pain
- 3: abnormal flexion
- 2: abnormal extension
- 1: no motor response

## Standard response set (>=2 years in PECARN)

### Verbal response
- 5: oriented / appropriate
- 4: confused
- 3: inappropriate words
- 2: incomprehensible sounds
- 1: no verbal response

### Motor response
- 6: obeys commands
- 5: localizes pain
- 4: withdraws from pain
- 3: abnormal flexion
- 2: abnormal extension
- 1: no motor response

## Evidence

### James pediatric adaptation
James HE. Neurologic evaluation and support in the child with an acute brain insult. Pediatr Ann. 1986;15(1):16-22.

- DOI: `10.3928/0090-4481-19860101-05`
- PMID: `3951884`

### PECARN multicenter validation
Borgialli DA, Mahajan P, Hoyle JD Jr, et al. Performance of the Pediatric Glasgow Coma Scale Score in the Evaluation of Children With Blunt Head Trauma. Acad Emerg Med. 2016;23(8):878-884.

- DOI: `10.1111/acem.13014`
- PMID: `27197686`
- cohort: 42,041 children with blunt head trauma
- pGCS used for children <2 years
- standard GCS used for children >=2 years
- pGCS and standard GCS had similar discrimination for clinically important TBI

### Glasgow Coma Scale educational source
The Glasgow Coma Scale Foundation documents the historical Adelaide pediatric adaptation and notes that multiple pediatric modifications have been proposed.

## Copyright / reuse decision

PedsCore does not reproduce protected source tables, layout, typography, or editorial wording.

The score's functional rules are independently encoded in software and the ES/EN descriptors are independently authored. This implementation does not claim that any source table itself is openly licensed.

## Interpretation policy

PedsCore reports the component scores and total only.

It does **not** attach automatic management decisions to total-score thresholds, including:

- intubation or airway intervention
- CT or other neuroimaging
- ICU admission
- hospital admission or discharge
- treatment decisions

Total GCS/pGCS must be interpreted with the clinical context, trajectory, confounders, and the individual E/V/M components.

## Important limitations

Sedation, neuromuscular blockade, intubation, severe developmental impairment, language barriers, and other factors may make one or more components non-testable or difficult to interpret. PedsCore does not invent a numerical replacement for an untestable component.

## Implementation files

- `packages/core/src/calculators/pediatricGcs.ts`
- `packages/core/tests/pediatricGcs.test.ts`
- `packages/core/src/catalog/clinicalTools.ts`
