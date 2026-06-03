# COMFORTneo

## Current PedsCore status

- id: `comfortneo`
- slug: `comfortneo`
- category: `neonatology`
- type: `scale`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_complete_scoring_table`
- reason: sources located, but complete official table, ventilated/non-ventilated handling, interpretation, licensing, and expert review remain pending.

## Clinical purpose

ES: escala de dolor/distress prolongado en neonatos. EN: neonatal prolonged pain/distress assessment scale.

## Target population

NICU neonates; applicability to extremely preterm infants requires caution.

## Version / variant

- exact version: COMFORTneo, 2009 source anchor.
- known variants: COMFORT, COMFORT behavior, COMFORTneo, translated adaptations.
- selected version for PedsCore: COMFORTneo only.
- variant risk: high if COMFORT behavior or translated versions are mixed.

## Primary source

- found: yes.
- citation: van Dijk M, Roofthooft DWE, Anand KJS, et al. Taking Up the Challenge of Measuring Prolonged Pain in (Premature) Neonates: The COMFORTneo Scale Seems Promising. Clin J Pain. 2009;25(7):607-616.
- DOI: `10.1097/AJP.0b013e3181a5b52a`
- PMID: not confirmed.
- URL: https://journals.lww.com/clinicalpain/toc/2009/09000
- access: `paywalled`
- notes: source trail verified; table reuse not cleared.

## External validation

- Meesters NJ, Dilles T, van Rosmalen J, et al. COMFORTneo scale: a reliable and valid instrument to measure prolonged pain in neonates? J Perinatol. 2023;43(5):595-600. DOI `10.1038/s41372-023-01628-1`.

## Guidelines / official sources

No open official manual with reuse permissions found in this pass.

## Complete scoring table availability

- complete table found: no.
- source: source articles/clinical materials.
- copyright/licensing risk: medium/high.
- notes: ventilated/non-ventilated item substitution must be source-verified.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Alertness | Pending | Pending | Primary/validation source | Exact options pending. |
| Calmness/agitation | Pending | Pending | Primary/validation source | Exact options pending. |
| Respiratory response or crying | Pending | Pending | Primary/validation source | Depends on ventilation status. |
| Body movement | Pending | Pending | Primary/validation source | Exact options pending. |
| Facial tension | Pending | Pending | Primary/validation source | Exact options pending. |
| Muscle tone | Pending | Pending | Primary/validation source | Exact options pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Pending | Published thresholds need source/license confirmation. | Source articles. |

## Formula / algorithm

Additive behavioral/physiologic score; exact rules pending.

## Unit handling

Ventilation status changes the applicable respiratory/crying item; must be explicit.

## Safety and regulatory notes

- risk level: medium/high.
- why: pain/distress assessment in NICU can influence care.
- should provide recommendations: no.
- forbidden outputs: analgesic, sedative, opioid, ventilation, or escalation recommendations.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes.
- requires permission: unknown.
- unknown: official scale form/table reuse.
- notes: keep blocked.

## Implementation recommendation

`implement_after_expert_review`

## Proposed test cases

- minimum: lowest source-verified total.
- maximum: highest source-verified total.
- intermediate: ventilated and non-ventilated examples.
- missing input: ventilation status missing.
- invalid input: incompatible crying/respiratory item.
- edge cases: extremely preterm infants.
- forbidden wording tests: no treatment advice.

## Direct links

- https://doi.org/10.1097/AJP.0b013e3181a5b52a
- https://doi.org/10.1038/s41372-023-01628-1

## Notes

COMFORTneo remains blocked by table, licensing, and expert-review gates.
