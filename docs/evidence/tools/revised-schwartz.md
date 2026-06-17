# Revised Schwartz

## Current PedsCore status

- id: `revised_schwartz`
- slug: `revised-schwartz`
- category: `nephrology`
- type: `calculator`
- current implementationStatus: `implemented`
- current evidenceLevel: `original_derivation_study`

## Evidence validation status

- final evidence status: `implemented`
- reason: Sprint 1 selected and implemented the multivariable 2009 CKiD equation, which is directly traceable to Schwartz et al. 2009 and distinct from the already implemented bedside creatinine-only Schwartz approximation.

## Clinical purpose

ES: estimar eGFR pediátrico de forma descriptiva usando talla, creatinina, cistatina C, BUN y sexo.  
EN: descriptively estimate pediatric eGFR using height, creatinine, cystatin C, BUN, and sex.

## Target population

Children with variables available for the CKiD 2009 equation. The source population was children with chronic kidney disease in the CKiD cohort; PedsCore displays an educational estimate only.

## Version / variant

- exact version: 2009 multivariable CKiD equation.
- known variants: bedside Schwartz creatinine-only equation; CKiD creatinine-cystatin equations; historical k-factor Schwartz equations.
- selected version for PedsCore: multivariable CKiD 2009 equation from Schwartz et al. 2009.
- variant risk: medium if confused with bedside Schwartz; PedsCore keeps both as separate tools.

## Primary source

- found: yes.
- citation: Schwartz GJ, Muñoz A, Schneider MF, Mak RH, Kaskel F, Warady BA, Furth SL. New equations to estimate GFR in children with CKD. J Am Soc Nephrol. 2009;20(3):629-637.
- DOI: `10.1681/ASN.2008030287`
- PMID: `19158356`
- URL: https://pubmed.ncbi.nlm.nih.gov/19158356/
- access: `open_access`
- notes: source provides the selected multivariable equation.

## External validation

Future review may compare later CKiD/creatinine-cystatin equations, but Sprint 1 intentionally implements only the 2009 multivariable equation.

## Guidelines / official sources

No guideline recommendation is encoded. Output is descriptive and educational.

## Complete scoring table availability

- complete table found: formula, not scoring table.
- source: Schwartz et al. 2009.
- copyright/licensing risk: low for encoding the mathematical equation with citation.
- notes: no copyrighted table or form is copied.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Height | numeric | meters in formula | Schwartz 2009 | PedsCore accepts cm and converts to m. |
| Serum creatinine | numeric | mg/dL in formula | Schwartz 2009 | PedsCore accepts mg/dL or µmol/L and converts µmol/L to mg/dL using 88.4. |
| Cystatin C | numeric | mg/L | Schwartz 2009 | Required. |
| BUN | numeric | mg/dL | Schwartz 2009 | Required as blood urea nitrogen, not urea mmol/L. |
| Sex | female/male | male factor 1.099 | Schwartz 2009 | Female factor is 1. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| Numeric eGFR | Estimated mL/min/1.73 m² | Descriptive estimate only; no CKD staging or treatment recommendation. | Schwartz 2009 |

## Formula / algorithm

`eGFR = 39.1 × (height_m / Scr_mg_dL)^0.516 × (1.8 / cystatinC_mg_L)^0.294 × (30 / BUN_mg_dL)^0.169 × 1.099(if male) × (height_m / 1.4)^0.188`

## Unit handling

- Height input: cm, converted to meters.
- Serum creatinine: mg/dL or µmol/L; µmol/L is divided by `88.4`.
- Cystatin C: mg/L.
- BUN: mg/dL.
- Output: `mL/min/1.73 m2`.

## Safety and regulatory notes

- risk level: medium.
- why: eGFR can influence clinical interpretation, but PedsCore output is descriptive only.
- should provide recommendations: no.
- forbidden outputs: CKD diagnosis, staging, nephrology referral, medication adjustment, dialysis, admission, discharge, or treatment instructions.

## Licensing / copyright

- appears implementable: yes.
- license-sensitive: no clear blocker for formula encoding.
- requires permission: no clear permission requirement identified.
- unknown: future guideline wording and newer equation variants.
- notes: cite the primary source and avoid embedding clinical management advice.

## Implementation recommendation

`implemented_sprint_1`

## Proposed test cases

- minimum: missing required inputs returns safe warning.
- maximum/extreme: extreme values return warning but no management advice.
- intermediate: female reference case with height 140 cm, Scr 1 mg/dL, cystatin C 1.8 mg/L, BUN 30 mg/dL.
- conversion: creatinine 88.4 µmol/L equals 1 mg/dL.
- invalid input: zero/negative biomarker values.
- edge cases: sex factor male versus female.
- forbidden wording tests: no treatment, diagnosis, referral, medication, admission, discharge, or resuscitation instructions.

## Direct links

- https://pubmed.ncbi.nlm.nih.gov/19158356/
- https://doi.org/10.1681/ASN.2008030287

## Notes

Implemented in Sprint 1 as a distinct tool from Bedside Schwartz.
