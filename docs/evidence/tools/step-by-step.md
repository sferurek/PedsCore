# Step-by-Step Approach for Young Febrile Infants

## Current PedsCore status

- id: `step_by_step`
- slug: `step-by-step-febrile-infant`
- implementationStatus: `implemented`
- calculationStatus: `active`

## Selected population

Infants up to 90 days old with fever without an apparent source, in the emergency-department context used by the published Step-by-Step approach.

## Core evidence

Gómez B, Mintegi S, Bressan S, et al. Validation of the "Step-by-Step" Approach in the Management of Young Febrile Infants. Pediatrics. 2016;138(2):e20154381.

- DOI: 10.1542/peds.2015-4381
- PMID: 27382134
- PubMed: https://pubmed.ncbi.nlm.nih.gov/27382134/

Open review reproducing the thresholds:
https://pmc.ncbi.nlm.nih.gov/articles/PMC5679412/

## Sequential classification implemented

High risk if any of the following is present:

1. ill appearance;
2. age <=21 days;
3. leukocyturia;
4. procalcitonin >=0.5 ng/mL.

If none of the high-risk criteria is present, intermediate risk if either is present:

5. CRP >20 mg/L;
6. ANC >10,000/mm3.

Low risk only if all of the above are negative.

Boundary policy:

- age 21 days is high risk;
- PCT exactly 0.5 ng/mL is high risk;
- CRP exactly 20 mg/L is not intermediate by this rule;
- ANC exactly 10,000/mm3 is not intermediate by this rule.

## Output policy

PedsCore returns only the risk stratum and the criterion/criteria responsible.

It does not automatically translate the result into:

- discharge;
- admission;
- lumbar puncture;
- antibiotic treatment;
- other therapeutic instructions.

Those decisions depend on the full clinical context and current local/national guidance.

## Safety constraints

- do not apply outside the selected age/population;
- do not treat a low-risk result as a guarantee that invasive bacterial infection is absent;
- do not silently substitute PECARN or another febrile-infant rule;
- retain the sequential ordering of the published method.

## Final decision

`implemented / local_active`
