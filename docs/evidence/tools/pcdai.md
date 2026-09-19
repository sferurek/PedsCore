# PCDAI — Pediatric Crohn's Disease Activity Index

## Current PedsCore status

- id: `pcdai`
- slug: `pcdai`
- implementationStatus: `implemented`
- calculationStatus: `active`

## Clinical purpose

PCDAI is a clinical disease-activity index for children and adolescents with Crohn's disease. It is intended for activity assessment and longitudinal monitoring.

It is not a diagnostic test for Crohn's disease and does not replace endoscopic, imaging, biochemical, nutritional, or specialist assessment when clinically indicated.

## Original source

Hyams JS, Ferry GD, Mandel FS, et al. Development and Validation of a Pediatric Crohn's Disease Activity Index. J Pediatr Gastroenterol Nutr. 1991.

- PMID: 1678008
- PubMed: https://pubmed.ncbi.nlm.nih.gov/1678008/

## Open scoring source

Brazilian consensus on the management of inflammatory bowel diseases in pediatric patients (2023) reproduces the complete PCDAI scoring table in open-access form:

https://www.scielo.br/j/ag/a/KL5Vpy5S8QWgVtfH73vdG7h/abstract/?lang=en

## Current guideline context

ECCO-ESPGHAN 2026 uses:

- PCDAI decrease >=12.5 points as a clinical response target;
- PCDAI <=10 as a clinical remission target.

Guideline:
https://academic.oup.com/ecco-jcc/article/20/8/jjag084/8766823

PedsCore does not present later mild/moderate/severe bands as if they had been defined in the original derivation paper.

## Components

The original PCDAI includes 11 components:

1. abdominal pain;
2. stools;
3. general well-being / functioning;
4. hematocrit;
5. ESR;
6. albumin;
7. weight;
8. linear growth;
9. abdominal examination;
10. perirectal disease;
11. extraintestinal manifestations.

Total range: 0-100.

Hematocrit and growth are entered by published category in PedsCore because the reference interpretation depends on age/sex and longitudinal context.

## Laboratory thresholds implemented

### ESR

- <20 mm/h: 0
- 20-50 mm/h: 2.5
- >50 mm/h: 5

### Albumin

- >=3.5 g/dL: 0
- 3.1-3.4 g/dL: 5
- <=3.0 g/dL: 10

## Safety constraints

PedsCore returns the PCDAI score and traceable component contributions only.

It does not automatically generate:

- a diagnosis of Crohn's disease;
- treatment escalation;
- corticosteroid, biologic, or nutritional-therapy recommendations;
- admission/discharge instructions;
- surgery recommendations.

Clinical activity indices are only one component of modern treat-to-target Crohn's disease management.

## Tests

Tests cover:

- minimum and maximum score;
- ESR boundaries;
- albumin boundaries;
- missing components;
- avoidance of invented original severity bands;
- dispatcher registration.

## Final decision

`implemented / local_active`
