# PIM3

## Current PedsCore status
- id: `pim3`
- implementationStatus: `implemented`
- calculationStatus: `active`
- discovery: `local_active`

## Evidence
Primary source:
- Straney L, Clements A, Parslow RC, et al. Paediatric Index of Mortality 3. Pediatr Crit Care Med. 2013;14(7):673-681.
- DOI: 10.1097/PCC.0b013e31829760cf
- PMID: 23863821

Open-access reproduction of the complete formula and diagnostic risk groups:
- https://pmc.ncbi.nlm.nih.gov/articles/PMC5220006/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11554295/

## Implementation
The complete published logistic equation is implemented, including:
- pupillary reaction;
- elective admission;
- mechanical ventilation in the first hour;
- absolute base excess;
- systolic blood pressure and squared term;
- FiO2/PaO2 term;
- recovery-from-procedure categories;
- low/high/very-high-risk diagnostic categories.

## Safety
PIM3 is a population-level PICU mortality model. Calibration varies by setting and era. PedsCore does not present the result as an individual prognosis or management instruction.

## Final decision
`implemented / local_active`
