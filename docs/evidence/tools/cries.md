# CRIES - Evidence Review

Date: 2026-06-03

## Decision

- Priority: A
- Final decision: `pending_complete_scoring_table`
- Catalog status: keep `pending_validation`
- Rationale: original source is verified, but PedsCore still needs a complete validated 0/1/2 table and licensing review before activating calculation.

## Source

- Primary source: Krechel SW, Bildner J. CRIES: a new neonatal postoperative pain measurement score. Initial testing of validity and reliability. Paediatric Anaesthesia. 1995;5(1):53-61.
- DOI: `10.1111/j.1460-9592.1995.tb00242.x`
- PMID: `8521311`
- Direct URL: https://pubmed.ncbi.nlm.nih.gov/8521311/
- Access: PubMed abstract; Wiley full text likely paywalled.

## Version And Population

- Version selected: original CRIES neonatal postoperative pain score.
- Population: newborn infants in postoperative pain assessment context.
- Use context: observational neonatal pain measurement.

## Variables And Scoring

- Variables: Crying, Requires oxygen, Increased vital signs, Expression, Sleeplessness.
- Complete scoring table: no, not yet usable from primary source.
- Formula/algorithm: additive 10-point scale, each variable 0-2, pending exact option wording and conditions.
- Interpretation bands: local threshold `>=4` remains pending source-level confirmation.

## Interpretation And Licensing

- Copyright/licensing: item wording/table may be journal-copyrighted; avoid copying long table text until reuse is clear.
- Test cases needed: all-zero score, maximum score, threshold example, missing domain handling.

## Implementation Gate

- Primary source: yes.
- Complete table: pending.
- Interpretation: pending source confirmation.
- Variant selected: yes.
- Licensing: pending review.
- Ready for implementation: no.
