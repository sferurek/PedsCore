# PIM3

## PedsCore status
- id: `pim3`
- implementationStatus: `implemented`
- calculationStatus: `active`
- discovery: `local_active`

## Evidence
Original model:
Straney L, Clements A, Parslow RC, et al. Paediatr Crit Care. 2013.
- DOI: 10.1097/PCC.0b013e31829760cf
- PMID: 23863821
- https://pubmed.ncbi.nlm.nih.gov/23863821/

Open peer-reviewed validation literature reproduces the complete PIM3 equation, coefficients, and diagnostic risk groups:
- https://pmc.ncbi.nlm.nih.gov/articles/PMC5220006/

## Implementation
PedsCore applies the complete published equation, including documented handling for unknown base excess, blood pressure, oxygenation, procedure category, and diagnostic risk group.

## Safety
PIM3 is a population-level PICU mortality model. The result is not an individual prognosis and produces no treatment, admission, discharge, or limitation-of-care instruction.

## Final decision
`implemented / local_active`
