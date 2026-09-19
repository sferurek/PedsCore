# FNAST / 21-item Finnegan Neonatal Abstinence Score Tool

## PedsCore status
- id: `fnass_21`
- implementationStatus: `implemented`
- calculationStatus: `active`
- discovery: `local_active`

## Selected protocol
PedsCore implements the 21-symptom FNAST/Finnegan protocol published by the PhenX Toolkit as the 2019 Final protocol.

PhenX states that this protocol is freely available and that permission is not required for use.

- PhenX protocol: https://www.phenxtoolkit.org/protocols/view/300701
- DOI: 10.82568/phenx_toolkit/300701

Original source:
Finnegan LP, Connaughton JF Jr, Kron RE, Emich JP. Neonatal abstinence syndrome: assessment and management. Addict Dis. 1975;2(1-2):141-158.
- PMID: 1163358
- https://pubmed.ncbi.nlm.nih.gov/1163358/

## Implementation
The form contains the 21 symptoms represented in the PhenX protocol. Mutually exclusive severity alternatives are grouped into one single-choice field per symptom. The selected item scores are summed.

Maximum theoretical item total: 46.

## Population and administration
The source protocol was designed for hospitalized full-term newborns exposed in utero to psychoactive drugs, particularly opioids. PhenX notes that modification may be needed in preterm infants.

Administration requires clinically trained staff and ongoing attention to inter-observer reliability.

## Safety
PedsCore returns the score and trace only.

It does not convert historical thresholds into an instruction to:
- start medication;
- increase or decrease medication;
- admit or discharge;
- stop observation.

## Reuse
PhenX explicitly labels the protocol as freely available with permission not required for use.

## Final decision
`implemented / local_active`
