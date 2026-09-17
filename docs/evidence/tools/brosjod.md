# BROSJOD

## Current PedsCore status

- id: `brosjod`
- slug: `brosjod`
- category: `respiratory`
- type: `score`
- implementationStatus: `implemented`
- calculationStatus: `active`
- population: children younger than 24 months with bronchiolitis
- score range: 0–16

## Clinical source

Primary validation:

- Balaguer M, Alejandre C, Vila D, Esteban E, Carrasco JL, Cambra FJ, Jordan I.
- *Bronchiolitis Score of Sant Joan de Déu: BROSJOD Score, validation and usefulness.*
- Pediatric Pulmonology. 2017;52(4):533-539.
- DOI: `10.1002/ppul.23546`
- PMID: `28328090`

The prospective validation study included 112 children under 2 years and reported high inter-rater reliability. It also reassessed the original severity cut-offs.

## Version implemented

PedsCore implements the validated BROSJOD scoring logic with six components:

1. wheeze/rales
2. retractions/accessory muscle use
3. air entry
4. oxygenation
5. respiratory rate adjusted for age
6. heart rate adjusted for age

Maximum total: 16.

PedsCore uses the revised validation bands documented after the 2017 validation:

- 0–6: mild
- 7–9: moderate
- 10–16: severe

The earlier 0–5 / 6–10 / 11–16 bands are retained only as historical context and are not the active interpretation.

## Copyright / reuse decision

The original Wiley article is copyright-protected. PedsCore therefore does **not** reproduce its Table 1, typography, layout, graphical form, or editorial wording.

The score's functional rules are independently encoded as software logic. User-facing Spanish and English descriptions were independently drafted for PedsCore rather than copied from Wiley, Pediatría Integral, AEP protocols, or other reproductions.

Several independent publications and institutional/clinical sources reproduce or operationally use the same score structure, which supports factual traceability of the algorithm. These sources are used as verification, not as a basis for copying their protected expression.

This implementation decision is intentionally narrower than claiming that the original table is openly licensed.

## Oxygenation edge case

Published BROSJOD tables explicitly classify:

- room air oxygen saturation categories;
- supplemental oxygen with SpO2 >94% and FiO2 ≤40%;
- supplemental oxygen with SpO2 ≤94% and FiO2 >40%.

Some possible SpO2/FiO2 combinations are not expressed unambiguously in the published table. PedsCore does not infer a point value for those combinations; it returns an explicit warning instead.

## Safety

BROSJOD is presented as a descriptive severity score. PedsCore does not attach treatment, admission, discharge, HFNC, CPAP, or PICU recommendations to the result.

Clinical decisions must incorporate the full patient assessment and local bronchiolitis guidance.

## Secondary validation / clinical-use sources

- Sant Joan de Déu cohort using revised severity bands: European Journal of Pediatrics 2022, DOI `10.1007/s00431-022-04616-3`, open-access via PMC.
- Later publications reproduce the score structure and/or revised bands, but PedsCore does not copy their table formatting or wording.

## Implementation files

- `packages/core/src/calculators/brosjod.ts`
- `packages/core/tests/brosjod.test.ts`
- `packages/core/src/catalog/clinicalTools.ts`
