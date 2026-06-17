# CRIES - Evidence Review

Date: 2026-06-17

## Current PedsCore status

- id: `cries`
- slug: `cries`
- category: `pain`
- type: `scale`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `pending_verification`

## Evidence validation status

- final evidence status: `pending_licensing_review`
- reason: primary source is verified and the 0-10 structure is clear, but the complete item table is copyright-marked in available copies and no permission/reuse terms were verified. No calculator was implemented in Sprint 1.

## Clinical purpose

ES: valoración descriptiva de dolor postoperatorio neonatal.  
EN: descriptive neonatal postoperative pain assessment.

## Target population

Neonates in postoperative pain assessment contexts; exact gestational-age scope must be confirmed from the source before implementation.

## Version / variant

- exact version: original CRIES neonatal postoperative pain score.
- known variants: translated/local CRIES forms.
- selected version for PedsCore: original CRIES only, pending licensing review.
- variant risk: medium if local forms add treatment instructions or altered wording.

## Primary source

- found: yes.
- citation: Krechel SW, Bildner J. CRIES: a new neonatal postoperative pain measurement score. Initial testing of validity and reliability. Paediatric Anaesthesia. 1995;5(1):53-61.
- DOI: `10.1111/j.1460-9592.1995.tb00242.x`
- PMID: `8521311`
- URL: https://pubmed.ncbi.nlm.nih.gov/8521311/
- access: `abstract_only`
- notes: the accessible table copies identify CRIES as copyright S. Krechel and J. Bildner; reuse terms are not clear.

## External validation

Not selected for implementation in Sprint 1.

## Guidelines / official sources

No open official implementation source with reuse permission found in Sprint 1.

## Complete scoring table availability

- complete table found: seen in secondary/archived copies, but not reusable.
- source: CRIES table copies carry copyright notice.
- copyright/licensing risk: high enough to block implementation.
- notes: do not copy table text or encode item wording until permission/reuse status is clear.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Crying | Pending | 0-2 | CRIES source | Exact wording blocked by licensing review. |
| Requires oxygen | Pending | 0-2 | CRIES source | Exact thresholds blocked by licensing review. |
| Increased vital signs | Pending | 0-2 | CRIES source | Exact thresholds blocked by licensing review. |
| Expression | Pending | 0-2 | CRIES source | Exact wording blocked by licensing review. |
| Sleeplessness | Pending | 0-2 | CRIES source | Exact wording blocked by licensing review. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| 0-10 | Total range | Higher score reflects greater observed pain expression. | Krechel/Bildner 1995 |
| Pending | Action threshold | Treatment-linked thresholds must not be encoded without source/licensing review. | Pending |

## Formula / algorithm

Additive 5-domain score, each domain 0-2, total 0-10. Not implemented because item wording/threshold reuse is not cleared.

## Unit handling

Uses observations and percentage/relative change thresholds; exact thresholds remain blocked by licensing review.

## Safety and regulatory notes

- risk level: medium.
- why: neonatal pain scores can be linked to analgesia workflows.
- should provide recommendations: no.
- forbidden outputs: analgesia, opioid, medication, sedation, admission/discharge, or escalation recommendations.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes.
- requires permission: likely/unknown.
- unknown: permission to reuse table wording and thresholds.
- notes: keep blocked until reuse terms are confirmed.

## Implementation recommendation

`keep_catalog_only`

## Proposed test cases

- minimum: all domains score 0.
- maximum: all domains score 2.
- intermediate: one domain at 1/2.
- missing input: missing domain.
- invalid input: unsupported option.
- edge cases: thresholds around oxygen/vital-sign changes.
- forbidden wording tests: no analgesia, opioid, sedation, medication, admission, discharge, or escalation wording.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/8521311/
- https://doi.org/10.1111/j.1460-9592.1995.tb00242.x

## Notes

Blocked in Sprint 1 because table licensing/reuse gates were not met.
