# BROSJOD

## Current PedsCore status

- id: `brosjod`
- slug: `brosjod`
- category: `respiratory`
- type: `score`
- current implementationStatus: `pending_validation`
- current calculationStatus: not active
- current evidenceLevel: `external_validation_study`

## Evidence validation status

- final evidence status: `pending_reusable_original_table`
- decision: do not implement in this block.
- reason: the validation source is traceable by DOI/PMID, and a complete table was located in a third-party copy of the Wiley article, but PedsCore does not have a clearly reusable original table or licensing/permission basis.

## Clinical purpose

ES: puntuacion de gravedad de bronquiolitis del Hospital Sant Joan de Deu.

EN: bronchiolitis severity score from Hospital Sant Joan de Deu.

## Target population

Children younger than 2 years with acute bronchiolitis in the validation study setting.

## Version / variant

- exact version: BROSJOD validation score.
- selected version for PedsCore: none activated.
- variant risk: medium.

## Source trail

### Validation source

- citation: Balaguer M, Alejandre C, Vila D, Esteban E, Carrasco JL, Cambra FJ, Jordan I. Bronchiolitis Score of Sant Joan de Deu: BROSJOD Score, validation and usefulness. Pediatr Pulmonol. 2017;52(4):533-539.
- DOI: `10.1002/ppul.23546`
- PMID: `28328090`
- URL: https://pubmed.ncbi.nlm.nih.gov/28328090/
- access: `abstract_only`
- role: validation traceability source.

### Table location found but not accepted for implementation

- third-party PDF mirror: https://www.fichier-pdf.fr/2017/07/27/bronchiolitis-score-of-sant-joan-de-deu/
- observed content: Table 1 appears to include wheezes/rales, indrawing, air entry, oxygen saturation with/without FiO2, age-banded respiratory rate, and age-banded heart rate.
- blocker: the table is from a Wiley article copy hosted outside the publisher/author/institutional source path; reuse terms are not clear.

## Complete scoring table availability

- complete table found: yes in a third-party mirrored copy.
- complete reusable table found: no.
- source acceptable for PedsCore implementation: no.
- copyright/licensing risk: unresolved.
- implementation decision: keep pending until a reusable table or permission path is documented.

## Variables and scoring

| variable | option | score/value | source | implementation note |
|---|---|---|---|---|
| Wheezes/rales | located in mirrored Table 1 | not copied into code | DOI `10.1002/ppul.23546` / third-party mirror | blocked pending reusable source |
| Indrawing | located in mirrored Table 1 | not copied into code | DOI `10.1002/ppul.23546` / third-party mirror | blocked pending reusable source |
| Air entry | located in mirrored Table 1 | not copied into code | DOI `10.1002/ppul.23546` / third-party mirror | blocked pending reusable source |
| Oxygen saturation / FiO2 | located in mirrored Table 1 | not copied into code | DOI `10.1002/ppul.23546` / third-party mirror | blocked pending reusable source |
| Respiratory rate by age | located in mirrored Table 1 | not copied into code | DOI `10.1002/ppul.23546` / third-party mirror | blocked pending reusable source |
| Heart rate by age | located in mirrored Table 1 | not copied into code | DOI `10.1002/ppul.23546` / third-party mirror | blocked pending reusable source |

## Interpretation bands / cutoffs

Not implemented. The mirrored article indicates descriptive bands, but PedsCore does not copy or activate them until reuse rights are clear.

## Formula / algorithm

Not implemented.

## Safety and regulatory notes

- risk level: medium.
- output remains unavailable through the calculator registry.
- no runtime clinical wording is generated for BROSJOD.
- future implementation must be descriptive and traceable only.

## Licensing / copyright

- appears implementable: not yet.
- license-sensitive: yes.
- requires permission: unknown.
- next gate: confirm table reuse through publisher terms, author/institutional source, open-license table, or explicit permission.

## Implementation recommendation

`keep_pending_until_reusable_table_or_permission`

## Tests

- `packages/core/tests/block6aEvidenceGate.test.ts`
- `packages/core/tests/catalog.test.ts`

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/28328090/
- https://doi.org/10.1002/ppul.23546
- https://www.fichier-pdf.fr/2017/07/27/bronchiolitis-score-of-sant-joan-de-deu/
