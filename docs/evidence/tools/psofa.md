# pSOFA

## PedsCore status
- id: `psofa`
- implementationStatus: `implemented`
- calculationStatus: `active`
- discovery: `local_active`

## Evidence
Matics TJ, Sanchez-Pinto LN. Adaptation and Validation of a Pediatric Sequential Organ Failure Assessment Score and Evaluation of the Sepsis-3 Definitions in Critically Ill Children. JAMA Pediatr. 2017.
- DOI: 10.1001/jamapediatrics.2017.2352
- PMID: 28783810
- https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/

The open-access original article contains the complete pediatric scoring table.

## Implementation
Six organ systems, 0-4 points each, total 0-24:
- respiratory: PaO2/FiO2 or SpO2/FiO2 with respiratory-support conditions;
- coagulation: platelets;
- hepatic: bilirubin;
- cardiovascular: age-specific MAP and vasoactive support;
- neurologic: GCS;
- renal: age-specific creatinine.

## Safety
pSOFA quantifies organ dysfunction in critically ill children. It is descriptive and does not generate treatment, admission/discharge, or individual-prognosis instructions.

## Final decision
`implemented / local_active`
