# Modified Brighton PEWS

## Current PedsCore status

- id: `modified_brighton_pews`
- slug: `modified-brighton-pews`
- category: `emergency`
- type: `score`
- implementationStatus: `implemented`
- calculationStatus: `active`
- selected version: Solevåg et al. 2013 modified Brighton PEWS
- original Monaghan/Brighton PEWS remains a separate non-active catalog entry

## Primary implementation source

Solevåg AL, Eggen EH, Schröder J, Nakstad B. Use of a Modified Pediatric Early Warning Score in a Department of Pediatric and Adolescent Medicine. PLoS One. 2013;8(8):e72534.

- DOI: `10.1371/journal.pone.0072534`
- URL: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0072534
- license: Creative Commons Attribution (CC BY)

The article publishes the complete locally modified Brighton PEWS table and the age-specific resting heart-rate and respiratory-rate ranges used in that implementation.

## Why this is separate from Brighton PEWS

The original Brighton/Monaghan PEWS is retained separately because its original 2005 scoring table is not available to PedsCore from a source with sufficiently clear reuse rights.

The 2013 Solevåg implementation is explicitly a modified Brighton PEWS and changes important elements, including use of AVPU and the ordering/definition of the three domains.

PedsCore therefore does not label this calculator as the original Brighton PEWS.

## Scoring

Three main domains each score 0-3:

- respiration
- circulation
- disability / AVPU

Two add-on criteria each contribute 2 points:

- continuous inhaled medication or CPAP
- persistent postoperative vomiting

Total range: 0-13.

## Respiratory domain

The published table combines respiratory rate relative to age-specific normal ranges with retractions/grunting and oxygen/positive-pressure support.

PedsCore presents the four published score categories directly to avoid silently selecting among overlapping respiratory criteria.

Age-specific physiologic ranges published in the source:

| Age | Resting HR | Resting RR |
|---|---:|---:|
| 0-1 month | 100-180 | 40-60 |
| 1-12 months | 100-180 | 35-40 |
| 13 months-3 years | 70-110 | 25-30 |
| 4-6 years | 70-110 | 21-23 |
| 7-12 years | 70-110 | 19-21 |
| 13-19 years | 55-90 | 16-18 |

## Circulation domain

The score combines:

- skin color
- capillary refill
- age-relative tachycardia
- bradycardia

with a maximum domain score of 3.

## Disability domain

The modified version uses AVPU:

- Alert = 0
- Voice = 1
- Pain = 2
- Unresponsive = 3

## Interpretation

The 2013 study compared patients with:

- PEWS 0-2
- PEWS >=3

A score >=3 was associated with markers of more severe illness in that cohort.

PedsCore reports this threshold descriptively only.

It does **not** reproduce a local escalation protocol or automatically recommend:

- medical review
- transfer
- PICU/ICU admission
- increased observation frequency
- treatment

## Copyright / reuse

The implementation source is CC BY and permits reuse with attribution.

PedsCore still uses independently drafted ES/EN interface wording and preserves explicit attribution to Solevåg et al.

## Safety

This is an early-warning score, not a diagnosis and not a treatment algorithm.

Trends, repeated assessment, and clinical context remain important.

## Implementation files

- `packages/core/src/calculators/modifiedBrightonPews.ts`
- `packages/core/tests/modifiedBrightonPews.test.ts`
- `packages/core/src/catalog/clinicalTools.ts`
