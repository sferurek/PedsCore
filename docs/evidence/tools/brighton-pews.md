# Brighton PEWS

## Current PedsCore status

- id: `brighton_pews`
- slug: `brighton-pews`
- category: `emergency`
- type: `score`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `pending_complete_scoring_table`
- reason: source located, but reusable table, protocol separation, and licensing remain pending.

## Clinical purpose

ES: variante Brighton/Monaghan de alerta temprana pediátrica. EN: Brighton/Monaghan pediatric early warning score variant.

## Target population

Hospitalized children in the original critical care outreach context.

## Version / variant

- exact version: Monaghan/Brighton PEWS, 2005.
- known variants: modified Brighton PEWS and local adaptations.
- selected version for PedsCore: Brighton PEWS only, not generic PEWS.
- variant risk: high if modified versions are mixed.

## Primary source

- found: yes.
- citation: Monaghan A. Detecting and managing deterioration in children: Critical Care Outreach and Paediatric Early Warning Score. Nursing Children and Young People. 2005;17(1):32-35.
- DOI: `10.7748/paed2005.02.17.1.32.c964`
- PMID: not confirmed.
- URL: https://research.brighton.ac.uk/en/publications/detecting-and-managing-deterioration-in-children-critical-care-ou
- access: `paywalled`
- notes: author institutional page identifies original Brighton PEWS.

## External validation

Later studies use modified Brighton PEWS; not enough to copy original table.

## Guidelines / official sources

No universal official guideline selected.

## Complete scoring table availability

- complete table found: no usable source in this pass.
- source: primary article/institutional materials.
- copyright/licensing risk: medium.
- notes: do not copy from secondary tables until source/reuse is clear.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Behavior | Pending | Pending | Primary article | Exact wording pending. |
| Cardiovascular | Pending | Pending | Primary article | Exact wording pending. |
| Respiratory | Pending | Pending | Primary article | Exact wording pending. |
| Add-ons | Pending | Pending | Primary article | Protocol elements pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Pending | Pending | Escalation cutoffs must be separated from scoring. | Primary article. |

## Formula / algorithm

Additive score, exact table pending.

## Unit handling

May require age-normal vital signs; source verification pending.

## Safety and regulatory notes

- risk level: medium/high.
- why: often tied to escalation protocols.
- should provide recommendations: no.
- forbidden outputs: rapid response, ICU, admission, discharge, or treatment advice.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: yes.
- requires permission: unknown.
- unknown: table/protocol reuse.
- notes: keep pending.

## Implementation recommendation

`keep_catalog_only`

## Proposed test cases

- minimum: normal behavior/cardiovascular/respiratory.
- maximum: source-verified maximum.
- intermediate: representative moderate score.
- missing input: missing domain.
- invalid input: impossible vital signs.
- edge cases: protocol add-ons.
- forbidden wording tests: no escalation recommendations.

## Direct links

- https://doi.org/10.7748/paed2005.02.17.1.32.c964
- https://research.brighton.ac.uk/en/publications/detecting-and-managing-deterioration-in-children-critical-care-ou

## Notes

Brighton PEWS should remain separate from Bedside PEWS.
