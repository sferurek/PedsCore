# PIPP-R

## Current PedsCore status

- id: `pipp_r`
- slug: `pipp-r`
- category: `pain`
- type: `scale`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_complete_scoring_table`
- reason: PIPP-R sources are located, but the complete table, interpretation, adjustment rules, and license status need confirmation.

## Clinical purpose

ES: versión revisada del PIPP para valorar dolor neonatal. EN: revised PIPP tool for neonatal pain assessment.

## Target population

Preterm and term neonates as described in PIPP-R validation studies; exact implementation population pending.

## Version / variant

- exact version: Premature Infant Pain Profile-Revised, 2014.
- known variants: PIPP, PIPP-R; translated/adapted versions.
- selected version for PedsCore: PIPP-R as separate tool from PIPP.
- variant risk: high if translated or original PIPP tables are mixed.

## Primary source

- found: yes.
- citation: Stevens BJ, Gibbins S, Yamada J, Dionne K, Lee G, Johnston C, Taddio A. The premature infant pain profile-revised (PIPP-R): initial validation and feasibility. Clin J Pain. 2014;30(3):238-243.
- DOI: `10.1097/AJP.0b013e3182906aed`
- PMID: `24503979`
- URL: https://pubmed.ncbi.nlm.nih.gov/24503979/
- access: `abstract_only`
- notes: initial validation located.

## External validation

- Gibbins S, Stevens BJ, Yamada J, et al. Validation of the Premature Infant Pain Profile-Revised (PIPP-R). Early Hum Dev. 2014;90(4):189-193. DOI `10.1016/j.earlhumdev.2014.01.005`.

## Guidelines / official sources

No official open implementation manual found in this pass.

## Complete scoring table availability

- complete table found: no.
- source: primary/validation articles likely define it, but reusable table not verified.
- copyright/licensing risk: medium/high.
- notes: translations may require author permission.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Gestational-age/context adjustment | Pending | Pending | PIPP-R article | Must verify revised rules. |
| Behavioral state | Pending | Pending | PIPP-R article | Exact categories pending. |
| Heart rate | Pending | Pending | PIPP-R article | Exact scoring pending. |
| Oxygen saturation | Pending | Pending | PIPP-R article | Exact scoring pending. |
| Facial indicators | Pending | Pending | PIPP-R article | Exact scoring pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Pending | Cutoffs not source-confirmed for PedsCore. | Primary/validation articles. |

## Formula / algorithm

Additive revised score; exact item scoring and adjustment pending.

## Unit handling

Gestational age, physiologic changes, and observation timing require precise source definitions.

## Safety and regulatory notes

- risk level: medium.
- why: neonatal pain scoring may affect care escalation.
- should provide recommendations: no.
- forbidden outputs: analgesia, sedation, opioid, or procedural recommendations.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes.
- requires permission: unknown.
- unknown: official item table reuse.
- notes: keep pending until permission/reuse terms are documented.

## Implementation recommendation

`keep_catalog_only`

## Proposed test cases

- minimum: source-verified minimum.
- maximum: source-verified maximum.
- intermediate: moderate example.
- missing input: missing gestational age.
- invalid input: impossible physiologic values.
- edge cases: gestational-age boundary handling.
- forbidden wording tests: no direct pain treatment advice.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/24503979/
- https://doi.org/10.1097/AJP.0b013e3182906aed
- https://www.sciencedirect.com/science/article/pii/S0378378214000140

## Notes

PIPP-R remains blocked by table and licensing review.
