# PEWS

## Current PedsCore status

- id: `pews`
- slug: `pews`
- category: `emergency`
- type: `score`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_variant_selection`
- reason: PEWS is a family of scores; Brighton/Monaghan and Bedside PEWS are separate variants and generic PEWS must not be implemented.

## Clinical purpose

ES: detección descriptiva de deterioro clínico pediátrico. EN: descriptive pediatric deterioration early-warning scoring.

## Target population

Hospitalized or emergency pediatric patients depending on selected variant.

## Version / variant

- exact version: not selected for generic PEWS.
- known variants: Brighton/Monaghan PEWS, Bedside PEWS, modified institutional PEWS.
- selected version for PedsCore: none for generic `pews`.
- variant risk: very high.

## Primary source

- found: for Brighton PEWS only.
- citation: Monaghan A. Detecting and managing deterioration in children: Critical Care Outreach and Paediatric Early Warning Score. Nursing Children and Young People. 2005;17(1):32-35.
- DOI: `10.7748/paed2005.02.17.1.32.c964`
- PMID: not confirmed.
- URL: https://research.brighton.ac.uk/en/publications/detecting-and-managing-deterioration-in-children-critical-care-ou
- access: `paywalled`
- notes: this source should support `brighton_pews`, not generic PEWS implementation.

## External validation

Many PEWS validation studies exist; variant heterogeneity remains the central blocker.

## Guidelines / official sources

Institutional protocols vary and should not be copied as universal recommendations.

## Complete scoring table availability

- complete table found: no for generic PEWS.
- source: variant-specific.
- copyright/licensing risk: medium.
- notes: choose variant first.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Behavior | Variant-dependent | Pending | Variant source | Not generic. |
| Cardiovascular | Variant-dependent | Pending | Variant source | Not generic. |
| Respiratory | Variant-dependent | Pending | Variant source | Not generic. |
| Add-on criteria | Variant-dependent | Pending | Variant source | Often institutional. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Pending | Escalation thresholds are institutional. | Variant source. |

## Formula / algorithm

Variant-specific additive score; generic algorithm forbidden.

## Unit handling

Age-specific vital sign thresholds may vary by variant.

## Safety and regulatory notes

- risk level: medium/high.
- why: PEWS often links to escalation workflows.
- should provide recommendations: no.
- forbidden outputs: admission, rapid response, ICU, or treatment escalation directions.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes for institutional protocols.
- requires permission: unknown.
- unknown: table reuse per variant.
- notes: split variants.

## Implementation recommendation

`select_variant_first`

## Proposed test cases

- minimum: selected variant normal.
- maximum: selected variant maximum.
- intermediate: representative score.
- missing input: missing age/vital domain.
- invalid input: impossible vital signs.
- edge cases: protocol add-ons.
- forbidden wording tests: no escalation recommendations.

## Direct links

- https://doi.org/10.7748/paed2005.02.17.1.32.c964
- https://research.brighton.ac.uk/en/publications/detecting-and-managing-deterioration-in-children-critical-care-ou

## Notes

Generic PEWS remains a catalog umbrella only.
