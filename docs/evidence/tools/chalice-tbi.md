# CHALICE

## Current PedsCore status
- id: chalice_tbi
- slug: chalice-tbi
- category: emergency
- type: clinical_rule
- current implementationStatus: ready_for_implementation
- current evidenceLevel: original_derivation_study

## Evidence validation status
- final evidence status: ready_for_implementation
- reason: Primary open source found with DOI/PMID/PMCID and published rule. Future output must classify criteria only and avoid CT recommendations.

## Clinical purpose
ES: Clinical decision rule criteria for pediatric head injury risk classification.
EN: Clinical decision rule criteria for pediatric head injury risk classification.

## Target population
Children with head injury matching original CHALICE inclusion criteria.

## Version / variant
- exact version: Original CHALICE rule.
- known variants: variant-specific review required before implementation.
- selected version for PedsCore: Original CHALICE rule.
- variant risk: medium

## Primary source
- found: yes
- citation: Dunning J, Daly JP, Lomas JP, Lecky F, Batchelor J, Mackway-Jones K. Derivation of the children's head injury algorithm for the prediction of important clinical events decision rule for head injury in children. Arch Dis Child. 2006;91(11):885-891.
- DOI: 10.1136/adc.2005.083980
- PMID: 17056862
- URL: https://pubmed.ncbi.nlm.nih.gov/17056862/
- access: open_access
- notes: Source recorded for traceability only; implementation still follows the evidence gate.

## External validation
Add validation studies only after source-specific review.

## Guidelines / official sources
No official guideline implementation is created in this block.

## Complete scoring table availability
- complete table found: yes
- source: Yes, rule criteria are published in the open article; do not copy long text verbatim.
- copyright/licensing risk: appears implementable with citation; avoid reproducing copyrighted layouts.
- notes: Do not reconstruct tables from memory or secondary calculators.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/17056862/ | Complete table must be verified before calculator activation. |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/17056862/ |

## Formula / algorithm
Exact formula/rule criteria must be encoded only after final source review and tests.

## Unit handling
Units, age bands, and edge cases remain pending unless explicitly documented above.

## Safety and regulatory notes
- risk level: medium/high
- why: Clinical outputs could influence care if worded as recommendations.
- should provide recommendations: no; descriptive outputs only.
- forbidden outputs: treatment, discharge, admission, CT instruction, medication, resuscitation instruction.

## Licensing / copyright
- appears implementable: yes, with citation and paraphrased criteria
- license-sensitive: no
- requires permission: unknown
- unknown: no
- notes: appears implementable with citation; avoid reproducing copyrighted layouts.

## Implementation recommendation
implement_now

## Proposed test cases
- minimum
- maximum
- intermediate
- missing input
- invalid input
- edge cases
- forbidden wording tests: no treatment, CT, admission, discharge, medication, or resuscitation instructions.

## Direct links
- https://pubmed.ncbi.nlm.nih.gov/17056862/
- https://doi.org/10.1136/adc.2005.083980
- https://pubmed.ncbi.nlm.nih.gov/17056862/

## Notes
This fiche was updated in Block 8B-3. Validation does not mean implementation.
