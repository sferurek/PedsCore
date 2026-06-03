# Ballard / New Ballard - Evidence Review

Date: 2026-06-03

## Decision

- Priority: A
- Final decision: `pending_complete_scoring_table`
- Catalog status: keep `pending_validation`
- Rationale: primary New Ballard source is verified, but PedsCore still needs a usable complete scoring form/table, exact conversion mapping, licensing review, and tests before implementation.

## Source

- Primary source: Ballard JL, Khoury JC, Wedig K, Wang L, Eilers-Walsman BL, Lipp R. New Ballard Score, expanded to include extremely premature infants. The Journal of Pediatrics. 1991;119(3):417-423.
- DOI: `10.1016/S0022-3476(05)82056-6`
- PMID: `1880657`
- Direct URL: https://pubmed.ncbi.nlm.nih.gov/1880657/
- Access: PubMed abstract; article appears journal-copyrighted/paywalled.

## Version And Population

- Version selected for future review: New Ballard Score.
- Population: newborn infants, including extremely premature infants; validation sample included infants from 20 to 44 weeks gestational age.
- Use context: postnatal physical and neuromuscular maturity assessment when gestational age is uncertain.

## Variables And Scoring

- Variables: physical maturity and neuromuscular maturity domains.
- Complete scoring table: no, not yet usable in PedsCore.
- Formula/algorithm: summed maturity score maps to estimated gestational age; exact conversion table must be validated from a usable source.
- Ranges/units: gestational age in weeks; score-to-week mapping pending table review.

## Interpretation And Licensing

- Interpretation: estimated gestational age in weeks.
- Copyright/licensing: likely license-sensitive for reproducing the official scoring form/table; do not copy the form until reuse terms are clear.
- Test cases needed: minimum/maximum score, representative premature/term values, missing item handling, table-conversion examples from source.

## Implementation Gate

- Primary source: yes.
- Complete table: pending.
- Interpretation: partial.
- Variant selected: yes, New Ballard, pending confirmation.
- Licensing: pending review.
- Ready for implementation: no.
