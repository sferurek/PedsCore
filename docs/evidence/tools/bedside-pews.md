# Bedside PEWS - Evidence Review

Date: 2026-06-03

## Decision

- Priority: A
- Final decision: `pending_licensing_review`
- Catalog status: keep `pending_validation`
- Rationale: primary open-access source is verified, but the score has inventor/licensing considerations and must be separated from local escalation protocols before implementation.

## Source

- Primary source: Parshuram CS, Hutchison J, Middaugh K. Development and initial validation of the Bedside Paediatric Early Warning System score. Critical Care. 2009;13(4):R135.
- DOI: `10.1186/cc7998`
- PMID: `19678924`
- PMCID: `PMC2750193`
- Direct URL: https://pubmed.ncbi.nlm.nih.gov/19678924/
- Access: open access via BioMed Central/PMC.

## Version And Population

- Version selected: Bedside Paediatric Early Warning System score, original development/initial validation.
- Population: hospitalized pediatric patients in the derivation/validation setting.
- Use context: severity-of-illness/early warning score; no automatic escalation or treatment recommendation.

## Variables And Scoring

- Variables/options: score table exists in the source article, but PedsCore should not reproduce full table until licensing/reuse is reviewed.
- Complete scoring table: source located, but reuse review pending.
- Formula/algorithm: additive score from bedside observations; exact table and edge rules pending implementation review.
- Interpretation/cutoffs: must separate published score performance from local escalation thresholds.

## Interpretation And Licensing

- Copyright/licensing: open article access, but named inventors and tool reuse terms require review before implementation.
- Test cases needed: all-normal score, high-risk representative score, age/observation boundaries, missing-domain handling.

## Implementation Gate

- Primary source: yes.
- Complete table: source-located but not cleared for reuse.
- Interpretation: pending local-protocol separation.
- Variant selected: yes.
- Licensing: pending review.
- Ready for implementation: no.
