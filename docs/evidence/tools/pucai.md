# PUCAI — Pediatric Ulcerative Colitis Activity Index

## Current PedsCore status

- id: `pucai`
- slug: `pucai`
- implementationStatus: `implemented`
- calculationStatus: `active`

## Clinical purpose

PUCAI is a noninvasive clinical activity index for pediatric ulcerative colitis. It is intended for disease-activity assessment and longitudinal monitoring.

It is not a diagnostic test for inflammatory bowel disease and does not replace endoscopic, laboratory, or specialist assessment when clinically indicated.

## Original source

Turner D, Otley AR, Mack D, et al. Development, validation, and evaluation of a pediatric ulcerative colitis activity index: a prospective multicenter study. Gastroenterology. 2007;133(2):423-432.

- DOI: 10.1053/j.gastro.2007.05.029
- PMID: 17681163
- PubMed: https://pubmed.ncbi.nlm.nih.gov/17681163/

## Current guideline support

The 2025 ESPGHAN/ECCO pediatric ulcerative-colitis guideline recommends monitoring disease activity at each visit using PUCAI.

Guideline:
https://pmc.ncbi.nlm.nih.gov/articles/PMC12408984/

## Six domains

1. abdominal pain: 0 / 5 / 10
2. rectal bleeding: 0 / 10 / 20 / 30
3. stool consistency: 0 / 5 / 10
4. stool frequency per 24 hours: 0 / 5 / 10 / 15
5. nocturnal stool causing waking: 0 / 10
6. activity level: 0 / 5 / 10

Total range: 0-85.

## Interpretation

- <10: clinical remission
- 10-34: mild activity
- 35-64: moderate activity
- >=65: severe activity

PedsCore implements the exact boundary behavior:

- 9 remains remission;
- 10 is mild;
- 35 is moderate;
- 65 is severe.

## Safety constraints

PedsCore returns the score and activity category only.

It does not automatically produce:

- a treatment escalation order;
- corticosteroid or biologic recommendations;
- admission/discharge instructions;
- colectomy recommendations;
- a diagnosis of ulcerative colitis.

Current guidelines use PUCAI as one part of disease monitoring and clinical decision-making.

## Reuse / implementation

The complete scoring table is available in open peer-reviewed literature. PedsCore implements the functional scoring system as structured data and does not reproduce protected article layout or figures.

## Tests

Tests cover:

- zero score;
- remission/mild boundary;
- moderate boundary;
- severe boundary;
- maximum score;
- missing domains;
- dispatcher registration.

## Final decision

`implemented / local_active`
