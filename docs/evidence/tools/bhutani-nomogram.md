# Bhutani Nomogram - Evidence Review

Date: 2026-06-03

## Decision

- Priority: A
- Final decision: `pending_complete_scoring_table`
- Catalog status: keep `pending_validation`
- Rationale: original hour-specific bilirubin nomogram source is verified, but implementable curve values/data and current guideline context are not yet available in a reusable form.

## Source

- Primary source: Bhutani VK, Johnson L, Sivieri EM. Predictive ability of a predischarge hour-specific serum bilirubin for subsequent significant hyperbilirubinemia in healthy term and near-term newborns. Pediatrics. 1999;103(1):6-14.
- DOI: `10.1542/peds.103.1.6`
- PMID: `9917432`
- Direct URL: https://pubmed.ncbi.nlm.nih.gov/9917432/
- Access: PubMed abstract; Pediatrics article access/reuse must be checked.

## Version And Population

- Version selected: original 1999 hour-specific predischarge total serum bilirubin risk nomogram.
- Population: healthy term and near-term newborns in the original study; exclusions included direct Coombs-positive infants and those requiring phototherapy before age 60 hours.
- Use context: risk designation after bilirubin measurement by postnatal age.

## Variables And Scoring

- Variables: total serum bilirubin and postnatal age in hours.
- Complete scoring table: no; the nomogram is curve-based and exact reusable values are pending.
- Formula/algorithm: percentile/risk-zone lookup by hour-specific bilirubin, not yet implementable without source values.
- Interpretation bands: risk zones described in source; exact cutoffs by hour pending usable data.

## Interpretation And Licensing

- Copyright/licensing: do not redraw or digitize curves from a copyrighted figure without permission/clear data source.
- Current-context note: future implementation must account for modern AAP hyperbilirubinemia guideline context without generating direct treatment recommendations.
- Test cases needed: age-hour boundaries, bilirubin unit handling, representative risk zones, missing/invalid age.

## Implementation Gate

- Primary source: yes.
- Complete table/curve values: pending.
- Interpretation: partial.
- Variant selected: yes, 1999 Bhutani nomogram.
- Licensing: pending review.
- Ready for implementation: no.
