# Gorelick Dehydration Scale

## Current PedsCore status

- id: `gorelick_dehydration`
- slug: `gorelick-dehydration`
- category: `emergency`
- type: `score`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_variant_selection`
- reason: Sprint 1 confirmed the primary source, but did not find a sufficiently reusable complete 4-item versus 10-item table from a direct source. No calculator was implemented.

## Clinical purpose

ES: valoración descriptiva de signos clínicos de deshidratación pediátrica.  
EN: descriptive assessment of pediatric clinical dehydration signs.

## Target population

Children with suspected dehydration in acute care, as reflected by the Gorelick source population.

## Version / variant

- exact version: not selected.
- known variants: clinical sign set from Gorelick 1997; derivative 4-sign and 10-sign interpretations in later reviews.
- selected version for PedsCore: none yet.
- variant risk: high if 4-item and 10-item sets are mixed.

## Primary source

- found: yes.
- citation: Gorelick MH, Shaw KN, Murphy KO. Validity and reliability of clinical signs in the diagnosis of dehydration in children. Pediatrics. 1997;99(5):E6.
- DOI: `10.1542/peds.99.5.e6`
- PMID: `9113963`
- URL: https://pubmed.ncbi.nlm.nih.gov/9113963/
- access: `abstract_only`
- notes: direct source located, but complete reusable scoring table and variant choice remain unresolved.

## External validation

Later dehydration reviews compare clinical signs and dehydration scales, but Sprint 1 did not use those as a primary table source.

## Guidelines / official sources

No guideline implementation was created.

## Complete scoring table availability

- complete table found: no.
- source: primary source likely defines assessed signs, but accessible/reusable implementation table was not confirmed.
- copyright/licensing risk: unknown.
- notes: do not reconstruct 4-item or 10-item scale from memory or secondary calculators.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Pending | Pending | Pending | Gorelick 1997 | Exact sign set and scoring variant must be selected. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Pending | Cutoffs differ by derivative variant. | Gorelick 1997 and later validation review needed. |

## Formula / algorithm

Not implemented. Candidate future algorithm would count source-verified clinical signs only after selecting one variant.

## Unit handling

No units; all signs are clinical observations. Missing/unknown signs require explicit handling.

## Safety and regulatory notes

- risk level: medium.
- why: dehydration categorization can be linked to fluid management.
- should provide recommendations: no.
- forbidden outputs: oral/IV fluid instructions, admission/discharge, treatment, medication, or escalation advice.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: unknown.
- requires permission: unknown.
- unknown: complete table/form reuse.
- notes: keep blocked until variant and table are traceable.

## Implementation recommendation

`select_variant_first`

## Proposed test cases

- minimum: no source-verified signs.
- maximum: all source-verified signs.
- intermediate: representative sign count.
- missing input: unknown sign.
- invalid input: non-boolean sign.
- edge cases: 4-item versus 10-item mismatch.
- forbidden wording tests: no fluid therapy, admission, discharge, medication, or escalation advice.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/9113963/
- https://doi.org/10.1542/peds.99.5.e6

## Notes

Blocked in Sprint 1 because the evidence gate for complete table and variant selection was not met.
