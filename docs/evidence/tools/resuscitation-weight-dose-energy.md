# Pediatric Resuscitation Dose, Weight and Energy Calculations

## Current PedsCore status
- id: `resuscitation_weight_dose_energy`
- slug: `resuscitation-weight-dose-energy`
- category: resuscitation
- type: calculator
- current implementationStatus: `pending_validation`
- current evidenceLevel: `pending_verification`

## Evidence validation status
- final evidence status: `blocked_licensing_or_copyright`
- blocking reason: output scope overlaps therapeutic dosing and drug/energy recommendations that require strict policy and license review.
- depends on maintainer decision: yes
- maintainer decision needed: define reference-only vs calculator scope and therapeutic exclusion policy.

## Clinical purpose
ES: herramienta de apoyo documental para cálculo de dosis/energía/medidas basadas en peso y edad durante parada.
EN: reference-oriented support entry for emergency calculation lookup for weight-, age-, or energy-based resuscitation parameters.

## Target population
Pediatric and neonatal patients in resuscitation contexts; any automatic output must avoid direct treatment directives.

## Version / variant
- exact version: none selected
- known variants: multiple algorithm families (PALS/ILCOR/National protocols, region-specific formulas)
- selected version for PedsCore: none
- variant risk: high

## Primary source
- found: partial
- citation: AHA/ILCOR pediatric advanced life support sources and AAP/NRP guidance for resuscitation context.
- DOI: not always applicable
- PMID: not universally applicable to all tables/formulas
- URL: https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support
- access: paywalled
- notes: guideline landing pages are official sources; full formula tables or exact institutional defaults must be confirmed individually.

## External validation
No open implementation-grade validation package has been completed for this catalog entry in this pass.

## Guidelines / official sources
- AHA pediatric and neonatal resuscitation pages.
- ILCOR/AAP consensus documents for resuscitation science.

## Complete scoring table availability
- complete table found: no
- source: official pages locate guidance but not a single unified, open implementation-ready table for all listed calculation categories.
- copyright/licensing risk: high
- notes: avoid reproducing guideline schematics; keep as reference-only until governance and scope decision is completed.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support | Keep blocked until output model and scope are approved. |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support |

## Formula / algorithm
No unified formula is defined in this block for this entry because dosing/size outputs depend on policy, drug/age scope, and regional protocols.

## Unit handling
Units and age/weight assumptions must be explicit before any output model exists.

## Safety and regulatory notes
- risk level: very high
- why: direct implication for high-acuity treatment contexts.
- should provide recommendations: no.
- forbidden outputs: treatment, drug, dosing, device sizing, or escalation recommendations.

## Licensing / copyright
- appears implementable: no
- license-sensitive: yes
- requires permission: yes
- unknown: no
- notes: resuscitation algorithm publications and local protocol content are not a direct API/SDK source for direct calculators.

## Implementation recommendation
implement_after_maintainer_decision

## Proposed test cases
- minimum
- maximum
- intermediate
- missing input
- invalid input
- edge cases
- forbidden wording tests

## Direct links
- https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support
- https://www.ilcor.org/policy

## Notes
This tool remains blocked until product policy and maintainer approval define whether only educational references are exposed, or whether any non-therapeutic, non-recommendatory calculator mode is acceptable.
