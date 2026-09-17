# pRIFLE

## Current PedsCore status

- id: `prifle`
- slug: `prifle`
- category: `nephrology`
- type: `clinical_rule`
- implementationStatus: `implemented`
- calculationStatus: `active`
- selected version: original pediatric RIFLE modification by Akcan-Arikan et al. (2007)

## Primary source

Akcan-Arikan A, Zappitelli M, Loftis LL, Washburn KK, Jefferson LS, Goldstein SL. Modified RIFLE criteria in critically ill children with acute kidney injury. Kidney Int. 2007;71(10):1028-1035.

- DOI: `10.1038/sj.ki.5002231`
- PMID: `17396113`

The original cohort included critically ill children in a PICU setting.

## Acute pRIFLE classification

Classification uses the worse fulfilled criterion between estimated creatinine clearance (eCCl) change and urine output.

### Risk
- eCCl decrease >=25%, or
- urine output <0.5 mL/kg/h for >=8 h

### Injury
- eCCl decrease >=50%, or
- urine output <0.5 mL/kg/h for >=16 h

### Failure
- eCCl decrease >=75%, or
- current eCCl <35 mL/min/1.73 m², or
- urine output <0.3 mL/kg/h for >=24 h, or
- anuria for >=12 h

## Persistent categories

### Loss
Persistent renal Failure for >4 weeks.

### ESKD
Persistent renal Failure for >3 months.

PedsCore does not infer Loss or ESKD from a single acute assessment. These states are shown only when persistent Failure is explicitly declared.

## Baseline eCCl

pRIFLE classification depends on baseline eCCl.

PedsCore supports two explicit modes:

1. **Known baseline**: user enters the measured/estimated baseline eCCl.
2. **Unknown baseline, impute 120**: user deliberately selects the published methodological assumption of 120 mL/min/1.73 m².

The 120 value is never inserted silently. When used, PedsCore displays a warning that the baseline is imputed rather than measured and may affect classification.

PedsCore accepts eCCl directly rather than silently choosing a historical or modern Schwartz equation. This avoids mixing renal-function equations without the user knowing which method generated the value.

## Output

The result reports:

- eCCl criterion
- urine-output criterion
- overall acute category = worse criterion
- persistent category when explicitly declared

Example:

`eCCl: Risk · urine output: Injury · acute overall: Injury`

## Copyright / reuse decision

PedsCore independently encodes the functional clinical criteria and uses independently drafted ES/EN wording. It does not reproduce the original Kidney International table, layout, typography, or editorial wording.

Open-access review material is used as a secondary verification source for the threshold structure:

- https://pmc.ncbi.nlm.nih.gov/articles/PMC4238883/

## Safety

pRIFLE is a classification system, not a treatment algorithm.

PedsCore does not generate:

- fluid or bolus instructions
- diuretic instructions
- dialysis / renal-replacement recommendations
- ICU disposition
- admission or discharge decisions
- medication or treatment recommendations

## Implementation files

- `packages/core/src/calculators/prifle.ts`
- `packages/core/tests/prifle.test.ts`
- `packages/core/src/catalog/clinicalTools.ts`
