# PRAM - Pediatric Respiratory Assessment Measure

Date: 2026-06-17

## Current PedsCore status

- id: `pram`
- slug: `pram`
- category: `respiratory`
- type: `score`
- current implementationStatus: `implemented`
- current calculationStatus: `active`
- current evidenceLevel: `moderate`

## Evidence validation status

- final evidence status: `implemented_qa_hardened`
- reason: Sprint 2A reviewed the existing active implementation against the cited original and validation records, tightened descriptive wording, and added safety tests. No therapeutic recommendations are encoded.

## Clinical purpose

ES: estimar de forma descriptiva la gravedad observacional de una crisis asmática/sibilancias pediátrica mediante dominios clínicos PRAM.

EN: descriptively estimate observed pediatric asthma/wheezing severity using PRAM clinical domains.

## Target population

The original PRAM publication focused on preschool children with acute asthma; later validation extended assessment across a broader pediatric age range. PedsCore output remains educational and descriptive.

## Version / variant

- exact version: PRAM clinical score using oxygen saturation, suprasternal retractions, scalene muscle contraction, air entry, and wheezing.
- known variants: institutional asthma pathway variants and local adaptations.
- selected version for PedsCore: PRAM as represented by the cited original and validation studies.
- variant risk: medium if mixed with other pediatric asthma scores such as PASS or local pathway scores.

## Primary and validation sources

- primary source found: yes.
- citation: Chalut DS, Ducharme FM, Davis GM. The Preschool Respiratory Assessment Measure (PRAM): a responsive index of acute asthma severity. J Pediatr. 2000;137(6):762-768.
- DOI: `10.1067/mpd.2000.110121`
- PMID: `11113831`
- URL: https://pubmed.ncbi.nlm.nih.gov/11113831/
- validation source: Ducharme FM et al. The Pediatric Respiratory Assessment Measure: a valid clinical score for assessing acute asthma severity from toddlers to teenagers. J Pediatr. 2008;152(4):476-480.e1.
- PMID: `18346499`

## Complete scoring table availability

- complete table available in PedsCore metadata: yes.
- implementation status: active.
- licensing/copyright risk: medium; use compact structured scoring and cite sources, avoid copying long copyrighted pathway text.

## Variables and scoring

| variable | score/value | source | notes |
|---|---:|---|---|
| Oxygen saturation | 0-2 | PRAM source trail | `>=95` = 0; `92-94` = 1; `<92` = 2. |
| Suprasternal retractions | 0 or 2 | PRAM source trail | Absent/present. |
| Scalene muscle contraction | 0 or 2 | PRAM source trail | Absent/present. |
| Air entry | 0-3 | PRAM source trail | Normal through minimal/absent. |
| Wheezing | 0-3 | PRAM source trail | Absent through audible/silent chest. |

## Interpretation bands / cutoffs

| range | category | interpretation |
|---:|---|---|
| 0-3 | Mild | Descriptive severity band only. |
| 4-7 | Moderate | Descriptive severity band only. |
| 8-12 | Severe | Descriptive severity band only. |

## Formula / algorithm

Add domain scores for a total from 0 to 12.

## Safety and regulatory notes

- risk level: medium.
- should provide recommendations: no.
- forbidden outputs: medication, oxygen, admission, discharge, escalation, or treatment instructions.
- Sprint 2A adds anti-recommendation tests for output wording.

## Implementation recommendation

`keep_implemented_with_qa`

## Test coverage after Sprint 2A

- minimum score.
- intermediate score by boundary bands.
- maximum score.
- missing input.
- invalid oxygen saturation and invalid option.
- trace coverage for all PRAM domains.
- forbidden therapeutic/disposition wording.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/11113831/
- https://pubmed.ncbi.nlm.nih.gov/18346499/
