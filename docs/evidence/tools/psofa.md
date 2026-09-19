# pSOFA — Pediatric Sequential Organ Failure Assessment

## Status
- id: `psofa`
- implementationStatus: `implemented`
- calculationStatus: `active`

## Version
Original pediatric adaptation by Matics and Sanchez-Pinto.

Six organ systems:
1. respiratory (P/F or S/F)
2. coagulation
3. hepatic
4. cardiovascular
5. neurologic
6. renal

Total range: 0-24.

## Evidence
Matics TJ, Sanchez-Pinto LN. JAMA Pediatr. 2017;171(10):e172352.
- DOI: 10.1001/jamapediatrics.2017.2352
- PMID: 28783810
- https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/

The open full text contains the complete scoring table and pediatric age adaptations.

## Current-context safeguard
pSOFA is retained as a validated historical organ-dysfunction/prognostic instrument. PedsCore does not present it as the current definition of pediatric sepsis and points users toward contemporary criteria such as Phoenix where appropriate.

## Safety
No treatment, escalation, admission/discharge, or limitation-of-care recommendation is generated.

## Final decision
`implemented / local_active`
