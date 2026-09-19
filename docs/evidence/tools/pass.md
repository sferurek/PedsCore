# Pediatric Asthma Severity Score (PASS)

## PedsCore status
- id: `pass`
- implementationStatus: `implemented`
- calculationStatus: `active`
- discovery: `local_active`

## Selected version
Original Gorelick PASS for acute pediatric asthma, ages 1-18 years.

Three clinical domains are scored 0, 1, or 2:
1. work of breathing;
2. wheezing;
3. prolonged expiration.

Total: 0-6.

## Evidence
Primary source:
Gorelick MH, Stevens MW, Schultz TR, Scribano PV. Acad Emerg Med. 2004;11(1):10-18.
- DOI: 10.1197/j.aem.2003.07.015
- PMID: 14709423
- https://pubmed.ncbi.nlm.nih.gov/14709423/

The complete three-domain scoring table is independently reproduced in open peer-reviewed literature and was used to verify the local implementation.

## Interpretation and safety
PASS is returned as a descriptive severity score. PedsCore does not impose a universal treatment band because the original validation does not define a universal treatment protocol from the score alone.

No medication, admission, discharge, or escalation instruction is generated.

## Reuse
Functional scoring facts are implemented as independently structured data. PedsCore does not reproduce article layout or protected artwork.

## Final decision
`implemented / local_active`
