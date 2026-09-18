# Pediatric KDIGO 2012 Acute Kidney Injury

## Current PedsCore status

- id: `kdigo_pediatric`
- slug: `kdigo-pediatric`
- category: `nephrology`
- type: `clinical_rule`
- implementationStatus: `implemented`
- calculationStatus: `active`
- selected version: KDIGO 2012 AKI criteria, pediatric non-neonatal application
- scope: 28 days to <18 years

## Primary source

KDIGO Acute Kidney Injury Work Group. KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney International Supplements. 2012;2:1-138.

- official guideline PDF: https://kdigo.org/wp-content/uploads/2016/10/KDIGO-2012-AKI-Guideline-English.pdf
- official KDIGO AKI hub: https://kdigo.org/guidelines/acute-kidney-injury/

PedsCore remains explicitly versioned to the published 2012 criteria pending a final newer KDIGO AKI/AKD guideline.

## AKI definition implemented

AKI diagnostic criteria are met when any of the following is present:

- serum creatinine rise >=0.3 mg/dL within 48 h
- serum creatinine >=1.5 times baseline/reference within the prior 7 days
- urine output <0.5 mL/kg/h for at least 6 h

PedsCore does not invent a baseline creatinine when it is unknown.

## Staging

### Stage 1
- SCr 1.5-1.9 times baseline, or
- SCr rise >=0.3 mg/dL, or
- urine output <0.5 mL/kg/h for 6-12 h

### Stage 2
- SCr 2.0-2.9 times baseline, or
- urine output <0.5 mL/kg/h for >=12 h

### Stage 3
- SCr >=3 times baseline, or
- SCr >=4.0 mg/dL, or
- renal replacement therapy initiated, or
- in patients <18 years: eGFR <35 mL/min/1.73 m², or
- urine output <0.3 mL/kg/h for >=24 h, or
- anuria >=12 h

The overall KDIGO stage is the highest fulfilled criterion.

## Creatinine units

PedsCore accepts:

- mg/dL
- µmol/L

Internal staging uses mg/dL after conversion when needed.

## Baseline handling

Two explicit modes are supported:

1. baseline/reference creatinine available
2. baseline unknown

When baseline is unknown:

- PedsCore does not impute one
- the 1.5x/2x/3x baseline criteria may be unevaluable
- the 48-hour absolute rise criterion can still be assessed if a recent value exists
- urine-output criteria can still be assessed
- independent stage-3 criteria such as eGFR <35 or RRT can still be assessed

## Urine-output handling

Urine-output data may be marked unavailable.

When unavailable, PedsCore warns that the overall stage may be underestimated rather than silently treating urine output as normal.

## eGFR

PedsCore accepts an externally determined current eGFR.

It does not silently choose a Schwartz equation inside this KDIGO tool. Bedside Schwartz and Revised Schwartz remain separate tools so the method used to derive eGFR stays explicit.

## Neonatal scope

Infants under 28 days are deliberately excluded from this tool because neonatal AKI definitions require separate handling of postnatal creatinine physiology and neonatal KDIGO modifications.

Selecting the neonatal age group returns an out-of-scope warning rather than a misleading pediatric KDIGO stage.

## Output

The result reports separately:

- creatinine/eGFR stage
- urine-output stage
- overall KDIGO stage
- whether an AKI diagnostic criterion is demonstrated by the entered data
- warnings for incomplete baseline or urine-output information

## Copyright / reuse

PedsCore independently encodes the published clinical criteria and uses independently drafted ES/EN wording.

It does not reproduce the original KDIGO table design, typography, or editorial text.

## Safety

This is a descriptive classification tool.

PedsCore does not generate:

- fluid or bolus instructions
- diuretic recommendations
- dialysis initiation recommendations
- ICU disposition
- admission/discharge decisions
- medication or treatment recommendations

## Implementation files

- `packages/core/src/calculators/kdigoPediatric.ts`
- `packages/core/tests/kdigoPediatric.test.ts`
- `packages/core/src/catalog/clinicalTools.ts`
