# PIPP

## Current PedsCore status

- id: `pipp`
- slug: `pipp`
- category: `pain`
- type: `scale`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_complete_scoring_table`
- reason: primary source located, but complete table, gestational-age adjustment details, interpretation, and reuse permissions are not cleared.

## Clinical purpose

ES: escala observacional para dolor neonatal/procedural en prematuros. EN: observational scale for neonatal/procedural pain in preterm infants.

## Target population

Preterm infants; exact gestational-age and clinical setting boundaries must be confirmed from source before implementation.

## Version / variant

- exact version: original Premature Infant Pain Profile, 1996.
- known variants: PIPP, PIPP-R.
- selected version for PedsCore: keep PIPP separate from PIPP-R.
- variant risk: high if PIPP and PIPP-R item scoring are mixed.

## Primary source

- found: yes.
- citation: Stevens B, Johnston C, Petryshen P, Taddio A. Premature Infant Pain Profile: Development and Initial Validation. Clin J Pain. 1996;12(1):13-22.
- DOI: `10.1097/00002508-199603000-00004`
- PMID: not confirmed.
- URL: https://journals.lww.com/clinicalpain/fulltext/1996/03000/premature_infant_pain_profile__development_and.4.aspx
- access: `paywalled`
- notes: source located via journal page; table reuse and exact item wording are not cleared.

## External validation

PIPP-R validation exists separately; do not use it to implement original PIPP table.

## Guidelines / official sources

No official implementation manual with open reuse terms found in this pass.

## Complete scoring table availability

- complete table found: no.
- source: primary source likely contains table, but usable/reusable table not verified.
- copyright/licensing risk: medium/high.
- notes: do not reconstruct from secondary PDFs.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Gestational age | Pending source table | Pending | Primary article | Adjustment must be verified. |
| Behavioral state | Pending source table | Pending | Primary article | Exact options pending. |
| Heart rate | Pending source table | Pending | Primary article | Physiologic change scoring pending. |
| Oxygen saturation | Pending source table | Pending | Primary article | Physiologic change scoring pending. |
| Facial actions | Pending source table | Pending | Primary article | Exact facial indicators pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Pending | Published cutoffs not confirmed from usable source. | Primary article needed. |

## Formula / algorithm

Additive score with gestational-age adjustment; exact scoring algorithm pending.

## Unit handling

Requires gestational age and physiologic changes; units and timing windows pending.

## Safety and regulatory notes

- risk level: medium.
- why: neonatal pain assessment can influence care pathways.
- should provide recommendations: no, descriptive scoring only.
- forbidden outputs: analgesia, sedation, opioid, or intervention recommendations.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes.
- requires permission: unknown.
- unknown: table/form reuse.
- notes: avoid copying table text until permissions are clear.

## Implementation recommendation

`keep_catalog_only`

## Proposed test cases

- minimum: all lowest source-verified item scores.
- maximum: all highest source-verified item scores.
- intermediate: representative moderate score.
- missing input: missing gestational age or physiologic value.
- invalid input: impossible gestational age or saturation.
- edge cases: boundary gestational ages.
- forbidden wording tests: no analgesia/treatment directions.

## Direct links

- https://journals.lww.com/clinicalpain/fulltext/1996/03000/premature_infant_pain_profile__development_and.4.aspx
- https://doi.org/10.1097/00002508-199603000-00004

## Notes

PIPP remains blocked until the full source table and licensing are confirmed.
