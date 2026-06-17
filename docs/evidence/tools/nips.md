# NIPS - Neonatal Infant Pain Scale

Date: 2026-06-17

## Current PedsCore status

- id: `nips`
- slug: `nips`
- category: `pain`
- type: `scale`
- current implementationStatus: `implemented`
- current calculationStatus: `active`
- current evidenceLevel: `moderate`

## Evidence validation status

- final evidence status: `implemented_qa_hardened`
- reason: Sprint 2A reviewed the active implementation against the cited primary record, confirmed range and threshold handling, and retained anti-recommendation tests. No analgesia, sedation, or treatment recommendation is encoded.

## Clinical purpose

ES: estimar de forma descriptiva la expresión observacional de dolor neonatal mediante dominios conductuales NIPS.

EN: descriptively estimate observed neonatal pain expression using NIPS behavioral domains.

## Target population

Neonates in observational pain assessment contexts. PedsCore displays an educational, descriptive score only.

## Version / variant

- exact version: NIPS with six behavioral domains.
- known variants: translated/local forms and institutional documentation.
- selected version for PedsCore: NIPS structure traced to Lawrence et al. 1993.
- variant risk: low/medium if local wording or action thresholds are mixed into the score.

## Primary source

- primary source found: yes.
- citation: Lawrence J, Alcock D, McGrath P, Kay J, MacMurray SB, Dulberg C. The development of a tool to assess neonatal pain. Neonatal Netw. 1993;12(6):59-66.
- PMID: `8413140`
- URL: https://pubmed.ncbi.nlm.nih.gov/8413140/

## Complete scoring table availability

- complete table available in PedsCore metadata: yes.
- implementation status: active.
- licensing/copyright risk: medium; use compact structured scoring and cite source, avoid copying long form text.

## Variables and scoring

| variable | score/value | source | notes |
|---|---:|---|---|
| Facial expression | 0-1 | NIPS source trail | Relaxed or grimace. |
| Cry | 0-2 | NIPS source trail | Absent, whimper, vigorous cry. |
| Breathing pattern | 0-1 | NIPS source trail | Regular or altered. |
| Arms | 0-1 | NIPS source trail | Relaxed or flexed/extended. |
| Legs | 0-1 | NIPS source trail | Relaxed or flexed/extended. |
| State of arousal | 0-1 | NIPS source trail | Asleep/awake or agitated. |

## Interpretation bands / cutoffs

| range | category | interpretation |
|---:|---|---|
| 0-3 | Below documented threshold | Descriptive band only. |
| 4-7 | Above documented threshold | Descriptive band only. |

## Formula / algorithm

Add domain scores for a total from 0 to 7.

## Safety and regulatory notes

- risk level: low/medium.
- should provide recommendations: no.
- forbidden outputs: analgesia, sedation, medication, admission, discharge, escalation, or treatment instructions.
- Sprint 2A keeps anti-recommendation tests for output wording.

## Implementation recommendation

`keep_implemented_with_qa`

## Test coverage after Sprint 2A

- minimum score.
- intermediate threshold behavior.
- maximum score.
- missing input.
- invalid option and invalid numeric score.
- trace coverage for all NIPS domains.
- forbidden therapeutic/disposition wording.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/8413140/
