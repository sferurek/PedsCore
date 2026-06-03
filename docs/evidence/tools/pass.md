# Pediatric Asthma Severity Score

## Current PedsCore status
- id: pass
- slug: pass
- category: respiratory
- type: score
- current implementationStatus: pending_validation
- current evidenceLevel: original_derivation_study

## Evidence validation status
- final evidence status: pending_complete_scoring_table
- reason: Primary source found, but PedsCore still needs complete table, interpretation, and permission review.

## Clinical purpose
ES: Acute pediatric asthma severity scoring.
EN: Acute pediatric asthma severity scoring.

## Target population
Children aged 1 to 18 years in acute care settings in the original study.

## Version / variant
- exact version: Original PASS by Gorelick et al. 2004.
- known variants: variant-specific review required before implementation.
- selected version for PedsCore: Original PASS by Gorelick et al. 2004.
- variant risk: medium

## Primary source
- found: yes
- citation: Gorelick MH, Stevens MW, Schultz TR, Scribano PV. Performance of a novel clinical score, the Pediatric Asthma Severity Score (PASS), in the evaluation of acute asthma. Acad Emerg Med. 2004;11(1):10-18.
- DOI: 10.1197/j.aem.2003.07.015
- PMID: 14709423
- URL: https://pubmed.ncbi.nlm.nih.gov/14709423/
- access: open_access
- notes: Source recorded for traceability only; implementation still follows the evidence gate.

## External validation
Add validation studies only after source-specific review.

## Guidelines / official sources
No official guideline implementation is created in this block.

## Complete scoring table availability
- complete table found: no
- source: No. Full table must be verified from the article before implementation.
- copyright/licensing risk: unknown; likely implementable after table and reuse review.
- notes: Do not reconstruct tables from memory or secondary calculators.

## Variables and scoring
| variable | option | score/value | source | notes |
|---|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/14709423/ | Complete table must be verified before calculator activation. |

## Interpretation bands / cutoffs
| range/value | category | interpretation | source |
|---|---|---|---|
| pending | pending | pending | https://pubmed.ncbi.nlm.nih.gov/14709423/ |

## Formula / algorithm
Not applicable or pending complete scoring table.

## Unit handling
Units, age bands, and edge cases remain pending unless explicitly documented above.

## Safety and regulatory notes
- risk level: medium
- why: Clinical outputs could influence care if worded as recommendations.
- should provide recommendations: no; descriptive outputs only.
- forbidden outputs: treatment, discharge, admission, CT instruction, medication, resuscitation instruction.

## Licensing / copyright
- appears implementable: not yet determined
- license-sensitive: yes
- requires permission: unknown
- unknown: yes
- notes: unknown; likely implementable after table and reuse review.

## Implementation recommendation
implement_after_expert_review

## Proposed test cases
- minimum
- maximum
- intermediate
- missing input
- invalid input
- edge cases
- forbidden wording tests: no treatment, CT, admission, discharge, medication, or resuscitation instructions.

## Direct links
- https://pubmed.ncbi.nlm.nih.gov/14709423/
- https://doi.org/10.1197/j.aem.2003.07.015
- https://pubmed.ncbi.nlm.nih.gov/14709423/

## Notes
This fiche was updated in Block 8B-3. Validation does not mean implementation.
