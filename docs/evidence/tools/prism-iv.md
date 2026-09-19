# PRISM IV

## PedsCore status
- id: `prism_iv`
- implementationStatus: `implemented`
- calculationStatus: `active`
- discovery: `local_active`
- reuse: `public_domain`

## Evidence and rights
Pollack MM, Holubkov R, Funai T, et al. The Pediatric Risk of Mortality Score: Update 2015. Pediatr Crit Care Med. 2016.
- https://pmc.ncbi.nlm.nih.gov/articles/PMC5048467/

The original PRISM IV publication explicitly places the prediction algorithms in the public domain.

Open critical-care literature was additionally used to verify the physiologic PRISM component ranges used by the PRISM IV equation:
- https://pmc.ncbi.nlm.nih.gov/articles/PMC9004120/

## Implementation
PedsCore calculates the neurologic and non-neurologic physiologic subscores and applies the published PRISM IV model. Required collection windows are surfaced as a safety warning.

## Safety
PRISM IV is a population-level PICU mortality-risk model. The output is not an individual prognosis and must not be used as a treatment, admission, discharge, or limitation-of-care instruction.

## Final decision
`implemented / local_active`
