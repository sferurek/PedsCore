# Bedside PEWS - Evidence Review

Date: 2026-06-04

## Current PedsCore status

- id: `bedside_pews`
- slug: `bedside-pews`
- category: `emergency`
- type: `score`
- current implementationStatus: `pending_validation`
- current calculationStatus: not active
- current evidenceLevel: `original_derivation_study`

## Maintainer decision

- decision block: `PEWS-IMPLEMENTATION-1`
- decision: keep Bedside PEWS blocked.
- reason: Bedside PEWS is distinct from Brighton PEWS and requires its own table, inventor/licensing review and protocol separation before implementation.
- selected candidate for this block: Brighton PEWS, not Bedside PEWS.

## Source

- Primary source: Parshuram CS, Hutchison J, Middaugh K. Development and initial validation of the Bedside Paediatric Early Warning System score. Critical Care. 2009;13(4):R135.
- DOI: `10.1186/cc7998`
- PMID: `19678924`
- PMCID: `PMC2750193`
- Direct URL: https://pubmed.ncbi.nlm.nih.gov/19678924/
- Access: open access via BioMed Central/PMC.

## Version and population

- version selected: Bedside Paediatric Early Warning System score, original development/initial validation.
- population: hospitalized pediatric patients in the derivation/validation setting.
- use context: severity-of-illness / early-warning score; no automatic protocol or clinical conduct recommendation.

## Variables and scoring

- source-located: yes.
- reproduced in PedsCore: no.
- reason: named score with inventor/licensing considerations and local protocol separation remain unresolved.
- do not mix with Brighton/Monaghan PEWS.

## Interpretation and licensing

- copyright/licensing: open article access exists, but tool reuse and inventor/licensing review are still required before implementation.
- interpretation/cutoffs: must separate score performance from local escalation policies.

## Implementation gate

- primary source: yes.
- complete table: source-located but not cleared for reuse.
- interpretation: pending local-protocol separation.
- variant selected: yes, but not selected for this implementation block.
- licensing: pending review.
- ready for implementation: no.

## Safety notes

- no calculator is registered for `bedside_pews`.
- future implementation must be descriptive only.
- no local escalation protocol or clinical conduct wording should be implemented.

## Tests

- `packages/core/tests/block6aEvidenceGate.test.ts`
- `packages/core/tests/catalog.test.ts`

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/19678924/
- https://doi.org/10.1186/cc7998
