# PECARN Febrile Infant Rule

## Current PedsCore status

- id: `pecarn_febrile_infant`
- slug: `pecarn-febrile-infant`
- implementationStatus: `implemented`
- calculationStatus: `active`

## Primary source

Kuppermann N, Dayan PS, Levine DA, et al.; PECARN. A Clinical Prediction Rule to Identify Febrile Infants 60 Days and Younger at Low Risk for Serious Bacterial Infections. JAMA Pediatr. 2019;173(4):342-351.

- DOI: 10.1001/jamapediatrics.2018.5501
- Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC6450281/

## Population implemented

The original study enrolled previously healthy febrile infants <=60 days evaluated for serious bacterial infection.

Fever was defined as rectal temperature >=38 C in the ED, another health care setting, or at home within the preceding 24 hours.

The original cohort excluded infants with:

- critically ill appearance;
- prematurity <=36 weeks gestation;
- pre-existing medical conditions;
- antibiotics in the preceding 48 hours;
- indwelling devices;
- soft-tissue infection.

PedsCore exposes these eligibility checks before calculation.

## Canonical low-risk rule

Low risk requires all three:

1. negative urinalysis;
2. ANC <=4,090/mm3;
3. serum procalcitonin <=1.71 ng/mL.

PedsCore uses these primary derived and validated thresholds.

The article also reported rounded exploratory alternatives, including ANC 4,000/mm3 and PCT 0.5 ng/mL. These are not used as the main PedsCore algorithm because they were secondary simplified analyses rather than the canonical derivation thresholds.

## Outcome

The original rule was derived to identify infants at low risk for serious bacterial infection, defined as urinary tract infection, bacteremia, or bacterial meningitis.

PedsCore returns only whether all low-risk criteria are satisfied and which criterion fails when they are not.

## Safety constraints

- No automatic discharge recommendation.
- No automatic admission recommendation.
- No lumbar puncture instruction.
- No antibiotic recommendation.
- No statement that low risk means zero risk.
- Do not apply outside the original eligible population.

## Tests

Tests cover:

- canonical low-risk case;
- ANC = 4,090 boundary;
- PCT = 1.71 boundary;
- values immediately above both boundaries;
- abnormal urinalysis;
- prematurity exclusion;
- age >60 days;
- calculator dispatcher registration.

## Final decision

`implemented / local_active`
