# Wood-Downes-Ferrés

## Current PedsCore status

- id: `wood_downes_ferres`
- slug: `wood-downes-ferres`
- category: `respiratory`
- type: `score`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_variant_selection`
- reason: Downes/Wood source trail found, but exact Wood-Downes-Ferrés modified version, complete table, and age cutoffs remain unresolved.

## Clinical purpose

ES: valoración de gravedad respiratoria obstructiva/bronquiolitis. EN: assessment of obstructive respiratory distress/bronchiolitis severity.

## Target population

Infants/children with bronchiolitis or wheezing depending on selected variant.

## Version / variant

- exact version: not selected.
- known variants: Downes, Wood-Downes, Wood-Downes-Ferrés.
- selected version for PedsCore: none yet.
- variant risk: high.

## Primary source

- found: partial.
- citation: Downes JJ, Wood DW, Striker TW, Haddad C. Acute respiratory failure in infants with bronchiolitis. Anesthesiology. 1968;29(3):426-434.
- DOI: not confirmed.
- PMID: `5647493`
- URL: https://pubmed.ncbi.nlm.nih.gov/5647493/
- access: `abstract_only`
- notes: source anchor for Downes/Wood, not sufficient for Ferres-modified WDF.

## External validation

Modern bronchiolitis studies use WDF, but many are not primary sources for the score.

## Guidelines / official sources

No official WDF manual found in this pass.

## Complete scoring table availability

- complete table found: no.
- source: secondary/research supplements exist but primary Ferres table not verified.
- copyright/licensing risk: unknown.
- notes: respiratory-rate by age and interpretation vary across sources.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Wheezing | Pending | Pending | Ferres variant needed | Exact scale pending. |
| Retractions | Pending | Pending | Ferres variant needed | Exact scale pending. |
| Air entry | Pending | Pending | Ferres variant needed | Exact scale pending. |
| Respiratory rate | Pending | Pending | Ferres variant needed | Age cutoffs pending. |
| Heart rate | Pending | Pending | Ferres variant needed | Age cutoffs pending. |
| Cyanosis | Pending | Pending | Ferres variant needed | Exact scoring pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Pending | Bands differ by variant/source. | Exact variant needed. |

## Formula / algorithm

Additive score in selected variant; exact table pending.

## Unit handling

Respiratory and heart rates require age-specific cutoffs if included.

## Safety and regulatory notes

- risk level: medium.
- why: bronchiolitis severity score may be linked to escalation decisions.
- should provide recommendations: no.
- forbidden outputs: oxygen, HFNC, admission, ICU, or bronchodilator recommendations.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: unknown.
- requires permission: unknown.
- unknown: Ferres-modified table source and rights.
- notes: keep pending.

## Implementation recommendation

`select_variant_first`

## Proposed test cases

- minimum: no distress.
- maximum: source-verified maximum.
- intermediate: mild/moderate/severe examples.
- missing input: missing age or vital signs.
- invalid input: impossible rates.
- edge cases: age cutoffs.
- forbidden wording tests: no treatment/escalation advice.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/5647493/

## Notes

Do not implement from local summaries.
