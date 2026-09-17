# Pediatric Asthma Severity Score (PASS)

## Current PedsCore status

- id: `pass`
- slug: `pass`
- category: `respiratory`
- type: `score`
- implementationStatus: `implemented`
- calculationStatus: `active`
- score range: 0–6
- population: children aged 1–18 years with acute asthma in the original study

## Version implemented

PedsCore implements the original three-domain PASS described by Gorelick et al. (2004).

Domains:

1. work of breathing
2. wheezing
3. prolongation of expiration

Each domain scores 0, 1, or 2 points. Total range: 0–6.

This is intentionally distinguished from other pediatric asthma scores that are also called PAS or PASS and use different variables and ranges.

## Primary source

Gorelick MH, Stevens MW, Schultz TR, Scribano PV. Performance of a novel clinical score, the Pediatric Asthma Severity Score (PASS), in the evaluation of acute asthma. Acad Emerg Med. 2004;11(1):10-18.

- DOI: `10.1197/j.aem.2003.07.015`
- PMID: `14709423`
- population: children 1–18 years treated for acute asthma in two pediatric emergency departments
- selected score: three clinical findings
- interobserver reliability reported as kappa 0.72–0.83
- hospitalization discrimination reported with ROC AUC 0.82

## Scoring logic

### Work of breathing

- 0: no clear increase or only mild increase
- 1: moderate increase
- 2: marked increase

### Wheezing

- 0: absent or faint
- 1: intermediate intensity
- 2: marked wheeze, or absent wheeze when air exchange is severely reduced

### Prolongation of expiration

- 0: normal or only slightly prolonged
- 1: clearly prolonged
- 2: markedly prolonged

The wording above is independently authored for PedsCore. It is not copied from the Wiley table.

## Interpretation policy

The primary result is the raw PASS value, `0–6`.

PedsCore does **not** activate generic mild / moderate / severe bands because those bands are not sufficiently traced to the original 2004 study.

A later study by Gorelick et al. (2008) evaluated PASS as part of a disposition prediction model and studied a threshold of PASS ≥5. That threshold is not implemented as a stand-alone admission or discharge rule because the model incorporated additional variables and was designed for prediction rather than direct treatment guidance.

## Additional validation / comparison source

Johnson MD, Nkoy FL, Sheng X, Greene T, Stone BL, Garvin J. Direct concurrent comparison of multiple pediatric acute asthma scoring instruments. J Asthma. 2017;54(7):741-753.

- DOI: `10.1080/02770903.2016.1258081`
- PMID: `27831833`
- PMCID: `PMC5425314`
- open-access full text
- reproduces the three-domain PASS structure and 0–2 scoring categories

## Copyright / reuse decision

The original 2004 Academic Emergency Medicine / Wiley publication is not treated as open-licensed source material.

PedsCore therefore does not reproduce the original table, typography, layout, graphical design, or editorial wording. The software independently encodes the functional scoring rules and uses independently drafted Spanish and English descriptors.

This implementation does not claim that the source table itself is openly licensed.

## Safety

PASS is displayed as a descriptive acute-asthma severity measure.

PedsCore does not attach:

- medication instructions
- bronchodilator dosing
- corticosteroid recommendations
- oxygen targets
- admission or discharge instructions
- PICU disposition rules

The score must be interpreted with the full clinical assessment and local acute-asthma pathway.

## Implementation files

- `packages/core/src/calculators/pass.ts`
- `packages/core/tests/pass.test.ts`
- `packages/core/src/catalog/clinicalTools.ts`
