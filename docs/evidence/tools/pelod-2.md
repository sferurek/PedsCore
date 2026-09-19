# PELOD-2

## Current PedsCore status
- id: `pelod_2`
- implementationStatus: `implemented`
- calculationStatus: `active`
- discovery: `local_active`
- reuse: `open`

## Evidence and reuse
Leteurtre et al. developed and validated PELOD-2 in 2013. The original publication explicitly states that the score will be in the public domain and may be freely used in clinical trials.

Primary source:
- Leteurtre S, Duhamel A, Salleron J, et al. Crit Care Med. 2013;41(7):1761-1773.
- DOI: 10.1097/CCM.0b013e31828a2bbd
- PMID: 23685639

Open verification:
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11554295/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC4570178/

## Implementation
Ten variables across five organ systems, age-dependent MAP and creatinine cutoffs, total score 0-33.

Mortality model:
`logit(P) = -6.61 + 0.47 * PELOD-2`.

The probability is retained as a population-level prognostic output only.

## Safety
Not an individual prediction and never used by PedsCore to recommend treatment, limitation of support, admission, or discharge.

## Final decision
`implemented / local_active`
