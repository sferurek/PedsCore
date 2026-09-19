# Yale Observation Scale / Acute Illness Observation Scale

## Current PedsCore status

- id: `yos`
- slug: `yale-observation-scale`
- implementationStatus: `implemented`
- calculationStatus: `active`

## Selected version

PedsCore implements the classic six-domain Yale Observation Scale (YOS / AIOS).

Each domain is scored 1, 3, or 5:

1. quality of cry;
2. reaction to parent stimulation;
3. state variation;
4. color;
5. hydration;
6. social response.

Total range: 6-30.

Interpretation used by PedsCore:

- <=10: normal appearance range;
- 11-15: intermediate;
- >=16: markedly abnormal appearance.

## Primary evidence

McCarthy PL, Sharpe MR, Spiesel SZ, et al. Observation scales to identify serious illness in febrile children. Pediatrics. 1982;70(5):802-809.

- PMID: 7133831
- PubMed: https://pubmed.ncbi.nlm.nih.gov/7133831/

Additional prospective evaluation:
McCarthy PL, Lembo RM, Fink HD, Baron MA, Cicchetti DV. Observation, history, and physical examination in diagnosis of serious illnesses in febrile children <=24 months. J Pediatr. 1987;110(1):26-30.

- DOI: 10.1016/S0022-3476(87)80282-2
- PMID: 3540248

Young-infant limitation:
Nigrovic et al. The Yale Observation Scale Score and the Risk of Serious Bacterial Infections in Febrile Infants. Pediatrics. 2017.

- https://pmc.ncbi.nlm.nih.gov/articles/PMC5495524/

## Population selected for PedsCore

Operational use is limited to children aged 3-24 months with febrile illness.

This is deliberately narrower than some historical uses because the score performs poorly as a rule-out instrument in very young infants.

## Safety constraints

YOS measures clinical appearance. It is not a stand-alone rule for excluding serious or invasive bacterial infection.

PedsCore does not convert YOS into:

- discharge;
- admission;
- lumbar puncture;
- antibiotic treatment;
- reassurance that serious bacterial infection is absent.

A low score in a young infant must not be treated as a safety criterion.

## Final decision

`implemented / local_active`
