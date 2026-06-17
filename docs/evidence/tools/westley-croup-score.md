# Westley Croup Score

Date: 2026-06-17

## Current PedsCore status

- id: `westley_croup`
- slug: `westley-croup-score`
- category: `respiratory`
- type: `score`
- current implementationStatus: `implemented`
- current calculationStatus: `active`
- current evidenceLevel: `moderate`

## Evidence validation status

- final evidence status: `implemented_qa_hardened`
- reason: Sprint 2A reviewed the active implementation against the cited primary record, corrected severity bands to the common Westley grouping, and added safety tests. No therapeutic recommendations are encoded.

## Clinical purpose

ES: estimar de forma descriptiva la gravedad observacional del crup mediante signos clínicos del Westley Croup Score.

EN: descriptively estimate observed croup severity using Westley Croup Score clinical signs.

## Target population

Children with croup in clinical assessment contexts. PedsCore displays an educational, descriptive score only.

## Version / variant

- exact version: Westley Croup Score using consciousness, cyanosis, stridor, air entry, and retractions.
- known variants: institutional severity categories and pathway adaptations.
- selected version for PedsCore: Westley score based on the cited Westley et al. primary record and common severity bands.
- variant risk: medium if severity bands are mixed with local pathway thresholds.

## Primary source

- primary source found: yes.
- citation: Westley CR, Cotton EK, Brooks JG. Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study. Am J Dis Child. 1978;132(5):484-487.
- DOI: `10.1001/archpedi.1978.02120300044008`
- PMID: `347921`
- URL: https://pubmed.ncbi.nlm.nih.gov/347921/

## Complete scoring table availability

- complete table available in PedsCore metadata: yes.
- implementation status: active.
- licensing/copyright risk: medium; use compact structured scoring and cite source, avoid copying long pathway text.

## Variables and scoring

| variable | score/value | source | notes |
|---|---:|---|---|
| Level of consciousness | 0 or 5 | Westley source trail | Normal or disoriented. |
| Cyanosis | 0, 4, or 5 | Westley source trail | Absent, with agitation, or at rest. |
| Stridor | 0, 1, or 2 | Westley source trail | Absent, with agitation, or at rest. |
| Air entry | 0, 1, or 2 | Westley source trail | Normal to markedly decreased. |
| Retractions | 0-3 | Westley source trail | None to severe. |

## Interpretation bands / cutoffs

| range | category | interpretation |
|---:|---|---|
| 0-2 | Mild | Descriptive severity band only. |
| 3-7 | Moderate | Descriptive severity band only. |
| 8-11 | Severe | Descriptive severity band only. |
| 12-17 | Impending respiratory failure | Descriptive severity band only; no management instruction. |

## Formula / algorithm

Add domain scores for a total from 0 to 17.

## Safety and regulatory notes

- risk level: medium.
- should provide recommendations: no.
- forbidden outputs: medication, oxygen, admission, discharge, escalation, airway, or treatment instructions.
- Sprint 2A adds anti-recommendation tests for output wording.

## Implementation recommendation

`keep_implemented_with_qa`

## Test coverage after Sprint 2A

- minimum score.
- intermediate score by boundary bands.
- maximum score.
- missing input.
- invalid option.
- trace coverage for all Westley domains.
- forbidden therapeutic/disposition wording.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/347921/
- https://doi.org/10.1001/archpedi.1978.02120300044008
