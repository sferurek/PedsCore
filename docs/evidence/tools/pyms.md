# PYMS — Paediatric Yorkhill Malnutrition Score

## Status
- id: `pyms`
- implementationStatus: `implemented`
- calculationStatus: `active`

## Selected implementation
Four functional PYMS steps with independent PedsCore wording:

1. BMI below the applicable PYMS pediatric cut-off: 0 or 2 points.
2. Recent weight loss / relevant poor weight gain: 0 or 1 point.
3. Intake during the preceding week: 0, 1, or 2 points.
4. Expected nutritional impact of the current condition during the next week: 0, 1, or 2 points.

Total range: 0-7.

Risk bands:
- 0: low risk
- 1: moderate risk
- >=2: high risk

## Evidence
Gerasimidis K, Keane O, Macleod I, Flynn DM, Wright CM. Br J Nutr. 2010;104(5):751-756.
- DOI: 10.1017/S0007114510001121
- PMID: 20398432

Open scoring/reuse source:
Tuokkola J, Hilpi J, Kolho KL, et al. Nutritional risk screening—a cross-sectional study in a tertiary pediatric hospital. J Health Popul Nutr. 2019;38:8.
- DOI: 10.1186/s41043-019-0166-4
- CC BY 4.0
- Supplementary Table S1 reproduces the PYMS questions and scoring.

PedsCore uses the functional scoring facts from the open source and independently worded prompts; it does not reproduce the original NHS form or layout.

## BMI reference
The original PYMS used the UK 1990 BMI reference/cut-off. PedsCore asks the user to determine whether BMI is below the applicable PYMS cut-off rather than embedding a potentially mismatched growth-reference table.

## Safety
PYMS is a nutritional-risk screening tool. PedsCore does not diagnose malnutrition or generate feeding, supplementation, dietetic-referral, or treatment instructions.

## Final decision
`implemented / local_active / attribution_required`
