# Sarnat Staging - Evidence Review

Date: 2026-06-03

## Decision

- Priority: A
- Final decision: `requires_domain_expert_review`
- Catalog status: keep `pending_validation`
- Rationale: original source is verified, but classic versus modified Sarnat variant, table wording, classification handling, and neonatal neurology review must be resolved before implementation.

## Source

- Primary source: Sarnat HB, Sarnat MS. Neonatal encephalopathy following fetal distress. A clinical and electroencephalographic study. Archives of Neurology. 1976;33(10):696-705.
- DOI: `10.1001/archneur.1976.00500100030012`
- PMID: `987769`
- Direct URL: https://pubmed.ncbi.nlm.nih.gov/987769/
- Access: PubMed abstract; full source access/reuse remains pending.

## Version And Population

- Version selected: original Sarnat and Sarnat staging as source anchor.
- Population: neonates over 36 weeks gestation with perinatal asphyxia in the original report.
- Use context: staging neonatal encephalopathy severity.

## Variables And Scoring

- Variables: clinical and electroencephalographic features across staged neonatal encephalopathy domains.
- Complete scoring table: no, not yet usable in PedsCore.
- Formula/algorithm: classification, not additive scoring; exact rule for mixed-stage findings must be specified.
- Ranges/units: stages I, II, III; duration and EEG context require expert review.

## Interpretation And Licensing

- Interpretation: mild/moderate/severe stage labels are source-anchored but exact implementation rules remain pending.
- Copyright/licensing: table reuse must be reviewed; avoid copying the original table verbatim.
- Test cases needed: clear stage I/II/III examples, mixed-domain edge cases, incomplete-domain handling.

## Implementation Gate

- Primary source: yes.
- Complete table: pending.
- Interpretation: partial.
- Variant selected: pending classic versus modified Sarnat decision.
- Licensing: pending review.
- Ready for implementation: no.
