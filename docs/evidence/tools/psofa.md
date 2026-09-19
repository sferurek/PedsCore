# pSOFA — Pediatric Sequential Organ Failure Assessment

## Current PedsCore status

- id: `psofa`
- implementationStatus: `implemented`
- calculationStatus: `active`
- discovery: `local_active`
- reuse: `attribution_required`

## Selected version

PedsCore implements the pediatric adaptation of SOFA published by Matics and Sanchez-Pinto.

Six organ systems are scored from 0 to 4, for a total of 0-24:

1. respiratory;
2. coagulation;
3. hepatic;
4. cardiovascular;
5. neurologic;
6. renal.

Age-specific mean arterial pressure and creatinine thresholds are used. The respiratory component accepts PaO2/FiO2 and, when SpO2 is <=97%, the published SpO2/FiO2 substitution.

## Sources

Primary:
- Matics TJ, Sanchez-Pinto LN. Adaptation and Validation of a Pediatric Sequential Organ Failure Assessment Score and Evaluation of the Sepsis-3 Definitions in Critically Ill Children. JAMA Pediatr. 2017.
- DOI: 10.1001/jamapediatrics.2017.2352
- PMID: 28783810
- https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/

Open complete table:
- Malik A, Taksande A, Meshram R. Pediatric Sequential Organ Assessment Score: A Comprehensive Review of the Prognostic Marker in the Pediatric Intensive Care Unit. Cureus. 2024.
- DOI: 10.7759/cureus.60034
- PMID: 38854197
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11162817/
- License: CC BY 4.0.

## Safety

pSOFA is implemented as a descriptive organ-dysfunction score. PedsCore does not use it as a substitute for current pediatric sepsis definitions, does not convert it into an individual mortality prediction, and does not generate treatment or limitation-of-support recommendations.

## Final decision

`implemented / local_active`
