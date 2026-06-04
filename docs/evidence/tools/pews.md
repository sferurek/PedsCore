# PEWS

## Current PedsCore status

- id: `pews`
- slug: `pews`
- category: `emergency`
- type: `score`
- current implementationStatus: `pending_validation`
- current calculationStatus: not active
- current evidenceLevel: `pending_verification`

## Maintainer decision

- decision block: `PEWS-IMPLEMENTATION-1`
- decision: do not implement generic PEWS.
- reason: PEWS is not a single score. It is a family of related early-warning variants with different tables, local modifications and protocol links.
- selected path: keep `pews` as catalog umbrella only; evaluate variant-specific entries separately.
- candidate variant: `brighton_pews`.
- separately blocked variant: `bedside_pews`.

## Clinical purpose

ES: familia de sistemas de alerta temprana pediatrica para descripcion de deterioro clinico.

EN: family of pediatric early-warning systems for descriptive clinical deterioration scoring.

## Target population

Hospitalized or emergency pediatric patients depending on the selected variant and local use context.

## Version / variant

- exact version for generic `pews`: none.
- known variants: Brighton/Monaghan PEWS, Bedside PEWS, modified institutional PEWS and national/local PEWS charts.
- selected version for PedsCore generic `pews`: none.
- variant risk: very high.

## Source trail

- Brighton/Monaghan source: Monaghan A. Detecting and managing deterioration in children: Critical Care Outreach and Paediatric Early Warning Score. Nursing Children and Young People. 2005;17(1):32-35.
- DOI: `10.7748/paed2005.02.17.1.32.c964`
- URL: https://research.brighton.ac.uk/en/publications/detecting-and-managing-deterioration-in-children-critical-care-ou
- Bedside PEWS source: Parshuram CS, Hutchison J, Middaugh K. Development and initial validation of the Bedside Paediatric Early Warning System score. Crit Care. 2009;13(4):R135.
- DOI: `10.1186/cc7998`
- PMID: `19678924`
- URL: https://pubmed.ncbi.nlm.nih.gov/19678924/

## Complete scoring table availability

- complete generic table found: not applicable.
- implementation blocker: a generic table would mix variants and create a misleading tool.
- licensing/copyright risk: variant-specific.

## Variables and scoring

Not implemented for generic `pews`. Variables must be defined only inside a specific variant.

## Interpretation bands / cutoffs

Not implemented for generic `pews`. Thresholds and responses are often institutional or system-specific.

## Formula / algorithm

No generic algorithm is implemented.

## Safety and regulatory notes

- risk level: medium/high.
- no runtime calculator is registered for `pews`.
- output should remain catalog/evidence-only until a specific variant is implemented.
- future variant implementations must be descriptive and must not include protocol activation language.

## Licensing / copyright

- appears implementable as generic PEWS: no.
- license-sensitive: yes, because published and institutional variants differ.
- required path: variant-specific source and table review.

## Implementation recommendation

`keep_catalog_umbrella_only`

## Tests

- `packages/core/tests/block6aEvidenceGate.test.ts`
- `packages/core/tests/catalog.test.ts`
- `packages/core/tests/calculatorRegistry.test.ts`

## Direct links

- https://doi.org/10.7748/paed2005.02.17.1.32.c964
- https://research.brighton.ac.uk/en/publications/detecting-and-managing-deterioration-in-children-critical-care-ou
- https://pubmed.ncbi.nlm.nih.gov/19678924/
