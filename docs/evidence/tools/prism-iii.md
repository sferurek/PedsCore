# PRISM III

## Current PedsCore status
- id: `prism_iii`
- slug: `prism-iii`
- category: intensive_care
- type: score
- current implementationStatus: `coming_soon`
- current evidenceLevel: `external_validation_study`

## Evidence validation status
- final evidence status: `blocked_licensing_or_copyright`
- blocking reason: high mortality-risk scoring model and likely proprietary/clinical implementation constraints.
- depends on maintainer decision: yes
- maintainer decision needed: policy on mortality-risk tools.

## Clinical purpose
ES: score pronóstico en UCI pediátrica.
EN: pediatric ICU mortality risk scoring.

## Target population
Children admitted to pediatric critical care.

## Version / variant
- exact version: PRISM III.
- known variants: PRISM IV and other risk models.
- selected version for PedsCore: pending.
- variant risk: high

## Primary source
- found: yes
- citation: Pollack MM, et al. PRISM III source.
- PMID: `8706448`
- DOI: `10.1097/00003246-199605000-00004`
- URL: https://pubmed.ncbi.nlm.nih.gov/8706448/
- access: abstract_only
- notes: Primary source is identified; implementation policy blocked due licensing/regulatory risk.

## External validation
No implementation path due high clinical impact.

## Guidelines / official sources
No official open implementation license review in this pass.

## Complete scoring table availability
- complete table found: no
- source: source anchor available but table integration pending.
- copyright/licensing risk: high
- notes: confirm terms before calculator expansion.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/8706448/ | full variable table missing |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/8706448/ |

## Formula / algorithm
Prognostic model implementation pending exact criteria and licensing confirmation.

## Unit handling
Physiologic variables and lab units pending.

## Safety and regulatory notes
- risk level: high
- why: mortality framing and high clinical consequence.
- should provide recommendations: no.
- forbidden outputs: treatment, admission/discharge directives.

## Licensing / copyright
- appears implementable: unknown
- license-sensitive: yes
- requires permission: unknown
- unknown: yes
- notes: marked blocked for now.

## Implementation recommendation
requires_domain_expert_review

## Proposed test cases
- minimum
- maximum
- missing input
- invalid input
- edge cases
- forbidden wording tests

## Direct links
- https://doi.org/10.1097/00003246-199605000-00004
- https://pubmed.ncbi.nlm.nih.gov/8706448/

## Notes
No implementation change in this block.
