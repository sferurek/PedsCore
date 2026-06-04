# Brighton PEWS

## Current PedsCore status

- id: `brighton_pews`
- slug: `brighton-pews`
- category: `emergency`
- type: `score`
- current implementationStatus: `pending_validation`
- current calculationStatus: not active
- current evidenceLevel: `original_derivation_study`

## Maintainer decision

- decision block: `PEWS-IMPLEMENTATION-1`
- decision: Brighton/Monaghan PEWS is the preferred candidate variant.
- implementation decision in this block: do not implement.
- reason: a complete Brighton PEWS table was not found in a source that is both traceable and reusable.

## Evidence validation status

- final evidence status: `pending_reusable_original_table`
- source located: yes.
- complete table located in an acceptable implementation source: no.
- accessible table fragments/summaries located: yes, but in calculators, mirrors, secondary summaries or modified-variant articles.
- reuse basis: not sufficient.

## Clinical purpose

ES: variante Brighton/Monaghan de alerta temprana pediatrica.

EN: Brighton/Monaghan pediatric early warning score variant.

## Target population

Hospitalized children in the original critical care outreach context.

## Version / variant

- exact version reviewed: Monaghan/Brighton PEWS, 2005.
- known related variants: modified Brighton PEWS, Akre/Skaletzky adaptations and local institutional versions.
- selected version for future PedsCore implementation: Brighton/Monaghan PEWS only.
- variant risk: high if modified tables are mixed with the original.

## Primary source

- citation: Monaghan A. Detecting and managing deterioration in children: Critical Care Outreach and Paediatric Early Warning Score. Nursing Children and Young People. 2005;17(1):32-35.
- DOI: `10.7748/paed2005.02.17.1.32.c964`
- PMID: not confirmed.
- URL: https://research.brighton.ac.uk/en/publications/detecting-and-managing-deterioration-in-children-critical-care-ou
- access: `paywalled`
- notes: traceable source for the Brighton/Monaghan family, but the complete table was not available from this source during this pass.

## Additional sources reviewed

- MDCalc PEWS calculator: complete-looking domain options but not an acceptable reusable source for PedsCore implementation.
- R `cliot::pews_score` documentation: describes Monaghan/Brighton-style arguments and risk/action output, but it is not a primary or official reusable table source.
- PLOS One modified PEWS article: includes a modified Brighton PEWS table for a local department, not the original Brighton table and not the selected variant.
- Systematic review in BMJ Open/PMC: confirms heterogeneity and modified Brighton variants, but does not provide a reusable original Brighton scoring table.

## Complete scoring table availability

- complete original Brighton table found: no.
- complete modified Brighton table found: yes in secondary/modified contexts, not accepted for original Brighton implementation.
- source acceptable for PedsCore implementation: no.
- copyright/licensing risk: unresolved.
- implementation decision: keep pending until a reusable original table or permission path is documented.

## Variables and scoring

| variable | option | score/value | source | implementation note |
|---|---|---|---|---|
| Behaviour | not copied | pending | Monaghan/Brighton source needed | blocked pending reusable table |
| Cardiovascular | not copied | pending | Monaghan/Brighton source needed | blocked pending reusable table |
| Respiratory | not copied | pending | Monaghan/Brighton source needed | blocked pending reusable table |
| Add-on items | not copied | pending | Monaghan/Brighton source needed | blocked pending reusable table and protocol separation |

## Interpretation bands / cutoffs

Not implemented. Any escalation or monitoring thresholds must be separated from the score and reviewed as local protocol content.

## Formula / algorithm

Not implemented.

## Safety and regulatory notes

- risk level: medium/high.
- no runtime calculator is registered for `brighton_pews`.
- future implementation must be descriptive only.
- do not mix with Bedside PEWS or generic PEWS.

## Licensing / copyright

- appears implementable now: no.
- license-sensitive: yes.
- next gate: obtain original table from a stable source with reuse rights, open-license publication, institutional permission or publisher permission.

## Implementation recommendation

`keep_pending_until_reusable_original_table`

## Tests

- `packages/core/tests/block6aEvidenceGate.test.ts`
- `packages/core/tests/catalog.test.ts`

## Direct links

- https://doi.org/10.7748/paed2005.02.17.1.32.c964
- https://research.brighton.ac.uk/en/publications/detecting-and-managing-deterioration-in-children-critical-care-ou
- https://www.mdcalc.com/calc/3901/pediatric-early-warning-score-pews
- https://www.rdocumentation.org/packages/cliot/versions/1.0.0/topics/pews_score
- https://pmc.ncbi.nlm.nih.gov/articles/PMC6502038/
