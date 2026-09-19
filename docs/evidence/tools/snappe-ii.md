# SNAPPE-II

## Current PedsCore status

- id: `snappii`
- slug: `snappe-ii`
- implementationStatus: `implemented`
- calculationStatus: `active`
- discovery: `local_active`
- reuse: `attribution_required`

## Selected version

SNAPPE-II (Score for Neonatal Acute Physiology with Perinatal Extension II), using the worst physiologic values during the first 12 hours plus three perinatal factors.

Nine components:

1. lowest mean blood pressure;
2. lowest temperature;
3. PaO2/FiO2;
4. lowest serum pH;
5. multiple seizures;
6. urine output;
7. 5-minute Apgar;
8. birth weight;
9. small for gestational age below the 3rd percentile.

Total range: 0-162.

## Sources

Primary:
- Richardson DK, Corcoran JD, Escobar GJ, Lee SK. SNAP-II and SNAPPE-II: Simplified newborn illness severity and mortality risk scores. J Pediatr. 2001;138(1):92-100.
- DOI: 10.1067/mpd.2001.109608
- PMID: 11148519
- https://pubmed.ncbi.nlm.nih.gov/11148519/

Open complete scoring table:
- SNAPPE II: analysis of accuracy and determination of the cutoff point as a death predictor in a Brazilian neonatal intensive care unit.
- https://pmc.ncbi.nlm.nih.gov/articles/PMC7747781/
- Open-access CC BY article reproducing the full nine-component table.

## Safety

PedsCore reports only the severity/risk score. It does not generate an individual mortality probability or treatment, transfer, escalation, or limitation-of-support recommendations.

## Final decision

`implemented / local_active`
