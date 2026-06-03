# Finnegan / Modified Finnegan

## Current PedsCore status

- id: `modified_finnegan`
- slug: `modified-finnegan`
- category: `neonatology`
- type: `score`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_variant_selection`
- reason: original source is located, but modified versions, long table, licensing, and therapeutic threshold handling are unresolved.

## Clinical purpose

ES: escala descriptiva de signos de abstinencia neonatal. EN: descriptive scoring of neonatal abstinence signs.

## Target population

Newborns with suspected neonatal abstinence/withdrawal; exact exposure and version context pending.

## Version / variant

- exact version: original Finnegan source located.
- known variants: Finnegan, modified Finnegan, simplified Finnegan.
- selected version for PedsCore: not selected.
- variant risk: high.

## Primary source

- found: yes.
- citation: Finnegan LP, Connaughton JF Jr, Kron RE, Emich JP. Neonatal abstinence syndrome: assessment and management. Addict Dis. 1975;2(1-2):141-158.
- DOI: not confirmed.
- PMID: `1163358`
- URL: https://pubmed.ncbi.nlm.nih.gov/1163358/
- access: `abstract_only`
- notes: original source explicitly includes management context; PedsCore must not reproduce treatment recommendations.

## External validation

Multiple later analyses and modified/simplified variants exist; not selected in this pass.

## Guidelines / official sources

No open official table/license source selected in this pass.

## Complete scoring table availability

- complete table found: no.
- source: original/full scale likely in article or derivative manuals.
- copyright/licensing risk: high.
- notes: long item table and thresholds need legal/expert review.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| CNS signs | Pending | Pending | Primary/variant source | Exact modified version pending. |
| Metabolic/vasomotor/respiratory signs | Pending | Pending | Primary/variant source | Exact item wording pending. |
| Gastrointestinal signs | Pending | Pending | Primary/variant source | Exact item scoring pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Descriptive only | Treatment thresholds must not be output as recommendations. | Source/expert review. |

## Formula / algorithm

Additive item score in selected variant; exact formula pending.

## Unit handling

Observation timing and repeated-score handling are variant/protocol dependent and must not be automated yet.

## Safety and regulatory notes

- risk level: high.
- why: scoring is commonly tied to pharmacologic protocols.
- should provide recommendations: no.
- forbidden outputs: opioid dosing, pharmacologic treatment, admission/discharge, or escalation directions.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes.
- requires permission: likely/unknown.
- unknown: full modified table reuse.
- notes: keep blocked.

## Implementation recommendation

`select_variant_first`

## Proposed test cases

- minimum: source-verified zero/lowest score.
- maximum: source-verified maximum if defined.
- intermediate: representative signs.
- missing input: omitted item.
- invalid input: incompatible repeated-score logic.
- edge cases: non-opioid exposure and comorbidity.
- forbidden wording tests: no pharmacologic recommendations.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/1163358/

## Notes

Do not implement until exact version and table are selected.
