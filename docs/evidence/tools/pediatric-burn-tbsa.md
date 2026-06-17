# Pediatric Burn TBSA Estimate

## Current PedsCore status

- id: `pediatric_burn_tbsa`
- slug: `pediatric-burn-tbsa`
- category: emergency
- type: calculator
- current implementationStatus: `implemented`
- current evidenceLevel: `official_manual_or_institutional_protocol`

## Evidence validation status

- final evidence status: `implemented_descriptive_only`
- implementation decision: implement as a descriptive TBSA estimator only.
- hard exclusions: descriptive TBSA estimation only; no automated care decisions.
- legal posture: numeric table values only; no Lund-Browder diagrams, silhouettes, institutional forms, PDF layouts, or images are copied.

## Clinical purpose

ES: estimar de forma descriptiva el porcentaje de superficie corporal total quemada en pacientes pediatricos usando porcentajes regionales ajustados por edad.

EN: descriptively estimate pediatric burned total body surface area using age-adjusted regional percentages.

## Included and excluded burn depths

Included in TBSA:

- partial-thickness burns;
- full-thickness burns.

Excluded from TBSA:

- erythema;
- superficial epidermal burns;
- first-degree/superficial redness without skin loss or blistering.

## Primary numeric table source

PedsCore uses one primary numeric source table:

- Vanderbilt University Medical Center / Monroe Carell Jr. Children's Hospital. Pediatric Burn Fluid Resuscitation. March 2025.
- Direct URL: https://www.vumc.org/burn/sites/default/files/public_files/Protocols/Pediatric-Burn-Fluid-Resuscitation-3.2025.pdf
- Used only for the modified Lund-Browder numeric regional percentages.
- Not used for admission, alert, transfer, or care-action logic.

## Comparator and context sources

- Royal Children's Hospital Melbourne, Burns - acute management: supports use of pediatric-specific TBSA tools and exclusion of epidermal burns/erythema.
  - https://www.rch.org.au/clinicalguide/guideline_index/burns/
- Joint Trauma System, Pediatric Lund Browder Burn Estimate & Diagram, June 2025: comparator for pediatric regional values.
  - https://jts.health.mil/assets/docs/forms/PEDIATRIC_LUND_BROWDER_BURN_ESTIMATE_DIAGRAM.pdf
- Perth Children's Hospital, Burns Surface Area Sheet: comparator for age-adjusted A/B/C Lund-Browder values.
  - https://pch.health.wa.gov.au/-/media/Files/Hospitals/PCH/General-documents/Health-professionals/ED-Guidelines/Flowchart-PDF/Burns-Surface-Area-sheet-PCH.pdf

## Source comparison decision

- Vanderbilt provides a complete numeric table including `Birth-1yr`, `1-4yrs`, `5-9yrs`, `10-14yrs`, and `15yrs` with separated head, neck, trunk, buttocks, genitalia, upper arm, lower arm, hand, thigh, lower leg, and foot regions.
- JTS 2025 provides a similar child table for `1-4`, `5-9`, `10-14`, and `15` years, but not the infant/birth-to-1 band in the opened one-page child form.
- PCH provides the classic Lund-Browder A/B/C age-adjusted values and an institutional form layout; PedsCore does not copy the form.
- PedsCore does not average or blend sources. Vanderbilt is the primary numeric source because it is complete for the intended pediatric age bands.

## Implemented age bands

- Infant / 0 years (`birth_to_1_year`).
- 1-4 years.
- 5-9 years.
- 10-14 years.
- 15 years.

No adult/adolescent band is implemented because the primary Vanderbilt table used for this tool does not include an adult band.

## Implemented regions

- head;
- neck;
- anterior trunk;
- posterior trunk;
- right/left buttock;
- genitalia/perineum;
- right/left upper arm;
- right/left lower arm;
- right/left hand;
- right/left thigh;
- right/left lower leg;
- right/left foot.

## Formula / algorithm

For each region:

```text
regionContribution = regionalPercentForAge * fractionBurned
```

Total TBSA:

```text
totalTBSA = sum(regionContribution)
```

Supported fractions in the UI:

- 0;
- 0.25;
- 0.5;
- 0.75;
- 1.

## Output

- total estimated TBSA percent;
- age band used;
- per-region trace with regional contribution;
- explicit reminder to include only partial-thickness and full-thickness burns;
- explicit reminder that the tool only estimates TBSA and does not generate care decisions.

## Legal / copyright notes

- Numeric regional percentages are implemented as source-traced data.
- PedsCore does not copy diagrams, silhouettes, institutional forms, PDF layouts, images, or chart artwork.
- PedsCore source code remains MIT licensed, but third-party source materials are not relicensed.
- Attribution is kept through source metadata and this evidence note.

## Clinical limitations

- TBSA is an estimate and can vary between assessors.
- Burn depth evolves over time; this tool does not determine depth.
- The tool does not replace local burn protocols, specialist assessment, or institutional documentation.
- The tool must not be used to automate care, transfer, or admission decisions.

## Validation examples

- Infant full head = 19% TBSA.
- 10-14 years, 50% anterior trunk = 6.5% TBSA.
- 5-9 years, 50% head + 100% right hand + 25% left foot = 9.88% TBSA after rounding.
- All regions at 100% in a valid age band = 100% TBSA.

## Test requirements

Implemented tests cover:

- complete single region;
- partial region;
- multiple-region sum;
- age-band effect on head and thigh contribution;
- 0-100% total bound;
- invalid fraction rejection;
- age-band required;
- registry routing;
- no therapeutic output wording.
