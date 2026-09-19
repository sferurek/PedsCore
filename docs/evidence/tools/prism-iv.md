# PRISM IV

## Current PedsCore status
- id: `prism_iv`
- implementationStatus: `implemented`
- calculationStatus: `active`
- discovery: `local_active`
- reuse: `public_domain`

## Evidence and rights
Pollack et al. explicitly state that the PRISM IV prediction algorithms were opened to the public domain.

Primary source:
- Pollack MM, Holubkov R, Funai T, et al. The Pediatric Risk of Mortality Score: Update 2015. Pediatr Crit Care Med. 2016;17(1):2-9.
- DOI: 10.1097/PCC.0000000000000558
- PMID: 26492059
- https://pmc.ncbi.nlm.nih.gov/articles/PMC5048467/

Open verification of variables, collection windows and model:
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11554295/

## Implementation
PedsCore derives neurologic and non-neurologic PRISM physiologic subscores from the full input set and applies the published PRISM IV mortality model.

The defined collection windows are integral to interpretation.

## Safety
Population-level risk adjustment / benchmarking model. It is not an individual prognosis and must not drive treatment or limitation-of-support decisions.

## Final decision
`implemented / local_active`
