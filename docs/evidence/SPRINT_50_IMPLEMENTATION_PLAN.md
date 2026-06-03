# SPRINT 50 Implementation Plan

Generated from the current PedsCore catalog during BLOQUE SPRINT-50.

## Sprint Decision

No new tools were promoted to `implemented` in this sprint. The audit found 17 currently implemented tools and no additional unimplemented tool that satisfied all required gates simultaneously: direct traceable source, complete formula/table, exact variant, active inputs, unit tests, safe non-therapeutic output, and no clear licensing/copyright blocker.

This is an intentional safety decision. The sprint improves traceability and prevents false implementation counts rather than inflating status.

## Counts

- Total catalog tools: 79.
- Implemented before sprint: 17.
- Implemented after sprint: 17.
- Registry calculators/rules: 17.

## Classification Counts

- already_implemented: 17
- do_not_implement: 19
- implement_if_table_complete: 20
- requires_license_review: 2
- requires_maintainer_decision: 13
- requires_source_review: 8

## Selected For Implementation

None.

Reason: CATCH and CHALICE were the only previously documented ready-for-implementation head trauma rules and are already implemented. WHO Growth has substantial functional coverage but remains `pending_validation` by documented policy because remaining 5-19 scope, interpolation policy, and final maintainer/expert review are pending.

## Deferred With Reason

| id | slug | status | classification | reason |
|---|---|---|---|---|
| `combined_apgar` | `combined-apgar` | `needs_primary_reference` | `requires_source_review` | Primary source, complete table/formula, exact variant, or tests are still missing. |
| `wood_downes_ferres` | `wood-downes-ferres` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `ballard` | `ballard` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `dubowitz` | `dubowitz` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `sarnat` | `sarnat` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `thompson_hie` | `thompson-hie-score` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `modified_finnegan` | `modified-finnegan` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `eat_sleep_console` | `eat-sleep-console` | `coming_soon` | `requires_source_review` | Primary source, complete table/formula, exact variant, or tests are still missing. |
| `pipp` | `pipp` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `pipp_r` | `pipp-r` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `cries` | `cries` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `comfortneo` | `comfortneo` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `bhutani_nomogram` | `bhutani-nomogram` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `neonatal_growth_fenton` | `neonatal-growth-fenton` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `pews` | `pews` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `brighton_pews` | `brighton-pews` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `bedside_pews` | `bedside-pews` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `rdai` | `rdai` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `brosjod` | `brosjod` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `pass` | `pass` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `risc` | `risc` | `coming_soon` | `requires_source_review` | Primary source, complete table/formula, exact variant, or tests are still missing. |
| `mrisc` | `mrisc` | `coming_soon` | `requires_source_review` | Primary source, complete table/formula, exact variant, or tests are still missing. |
| `pediatric_gcs` | `pediatric-glasgow-coma-scale` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `benes` | `benes` | `needs_primary_reference` | `requires_source_review` | Primary source, complete table/formula, exact variant, or tests are still missing. |
| `glasgow_adapted` | `glasgow-adapted` | `needs_primary_reference` | `requires_source_review` | Primary source, complete table/formula, exact variant, or tests are still missing. |
| `gorelick_dehydration` | `gorelick-dehydration` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `regional_sepsis_scores` | `regional-sepsis-scores` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `revised_schwartz` | `revised-schwartz` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `prifle` | `prifle` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `kdigo_pediatric` | `kdigo-pediatric` | `pending_validation` | `requires_source_review` | Primary source, complete table/formula, exact variant, or tests are still missing. |
| `psofa` | `psofa` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `pelod` | `pelod` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `pelod_2` | `pelod-2` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `prism_iii` | `prism-iii` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `prism_iv` | `prism-iv` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `pim2` | `pim2` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `pim3` | `pim3` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `who_growth_module` | `who-growth` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `who_growth_percentiles` | `who-growth-percentiles` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `cdc_growth_percentiles` | `cdc-growth-percentiles` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `orbegozo_growth_percentiles` | `orbegozo-growth-percentiles` | `pending_validation` | `requires_license_review` | License/copyright/data reuse terms remain blocking. |
| `bmi_percentile` | `bmi-percentile` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `head_circumference_percentile` | `head-circumference-percentile` | `pending_validation` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `stamp` | `stamp` | `pending_validation` | `requires_license_review` | License/copyright/data reuse terms remain blocking. |
| `strongkids` | `strongkids` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `pyms` | `pyms` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `rflacc` | `rflacc` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `cheops` | `cheops` | `pending_validation` | `implement_if_table_complete` | Source may be located, but complete reusable table/formula and/or interpretation remains incomplete. |
| `wong_baker_faces` | `wong-baker-faces` | `not_implemented_due_to_licensing` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `visual_analogue_scale` | `visual-analogue-scale` | `needs_primary_reference` | `requires_source_review` | Primary source, complete table/formula, exact variant, or tests are still missing. |
| `pediatric_cpr` | `pediatric-cpr` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `neonatal_cpr` | `neonatal-cpr` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `pediatric_bradycardia` | `pediatric-bradycardia` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `pediatric_tachycardia` | `pediatric-tachycardia` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `shockable_rhythm_algorithm` | `shockable-rhythm-algorithm` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `non_shockable_rhythm_algorithm` | `non-shockable-rhythm-algorithm` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `resuscitation_weight_dose_energy` | `resuscitation-weight-dose-energy` | `pending_validation` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `bayley` | `bayley` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `denver_ii` | `denver-ii` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `mass_casualty_triage` | `mass-casualty-triage` | `coming_soon` | `do_not_implement` | High-risk therapeutic, resuscitation, ICU/prognostic, proprietary, or protected algorithm scope. |
| `adolescent_depression_risk` | `adolescent-depression-risk` | `coming_soon` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |
| `adolescent_behavior_risk` | `adolescent-behavior-risk` | `coming_soon` | `requires_maintainer_decision` | Variant, source policy, interpolation, output scope, or clinical governance decision required. |

## Full Catalog Audit

| id | slug | name | category | type | status | calculationStatus | evidenceLevel | risk | inputs | direct reference | evidence file | candidate classification |
|---|---|---|---|---|---|---|---|---|---:|---:|---:|---|
| `apgar` | `apgar` | Apgar Score | neonatology | score | `implemented` | `active` | moderate | low | yes | yes | no | `already_implemented` |
| `combined_apgar` | `combined-apgar` | Expanded / Combined Apgar | neonatology | score | `needs_primary_reference` | `-` | primary_reference_needed | medium | no | no | no | `requires_source_review` |
| `silverman_andersen` | `silverman-andersen` | Silverman-Andersen Score | neonatology | score | `implemented` | `active` | moderate | low | yes | yes | no | `already_implemented` |
| `wood_downes_ferres` | `wood-downes-ferres` | Wood-Downes-Ferres Score | respiratory | score | `pending_validation` | `-` | pending_verification | medium | no | yes | yes | `requires_maintainer_decision` |
| `ballard` | `ballard` | Ballard / New Ballard | neonatology | score | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `dubowitz` | `dubowitz` | Dubowitz Score | neonatology | score | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `sarnat` | `sarnat` | Sarnat Staging | neonatology | scale | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `thompson_hie` | `thompson-hie-score` | Thompson HIE Score | neonatology | score | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `modified_finnegan` | `modified-finnegan` | Modified Finnegan NAS Score | neonatology | score | `pending_validation` | `-` | pending_verification | medium | no | yes | yes | `implement_if_table_complete` |
| `eat_sleep_console` | `eat-sleep-console` | Eat Sleep Console | neonatology | algorithm | `coming_soon` | `-` | pending_verification | medium | no | no | no | `requires_source_review` |
| `nips` | `nips` | Neonatal Infant Pain Scale | pain | scale | `implemented` | `active` | moderate | low | yes | yes | no | `already_implemented` |
| `pipp` | `pipp` | Premature Infant Pain Profile | pain | scale | `pending_validation` | `-` | pending_verification | medium | no | yes | yes | `implement_if_table_complete` |
| `pipp_r` | `pipp-r` | Premature Infant Pain Profile-Revised | pain | scale | `pending_validation` | `-` | pending_verification | medium | no | yes | yes | `implement_if_table_complete` |
| `cries` | `cries` | CRIES | pain | scale | `pending_validation` | `-` | pending_verification | low | no | yes | yes | `implement_if_table_complete` |
| `comfortneo` | `comfortneo` | COMFORTneo | neonatology | scale | `pending_validation` | `-` | pending_verification | medium | no | yes | yes | `implement_if_table_complete` |
| `bhutani_nomogram` | `bhutani-nomogram` | Bhutani Nomogram | neonatology | nomogram | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `neonatal_growth_fenton` | `neonatal-growth-fenton` | Fenton Neonatal Growth | neonatology | percentile | `pending_validation` | `-` | systematic_review | medium | no | yes | yes | `implement_if_table_complete` |
| `pews` | `pews` | Pediatric Early Warning Score | emergency | score | `pending_validation` | `-` | pending_verification | medium | no | yes | yes | `requires_maintainer_decision` |
| `brighton_pews` | `brighton-pews` | Brighton PEWS | emergency | score | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `requires_maintainer_decision` |
| `bedside_pews` | `bedside-pews` | Bedside PEWS | emergency | score | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `requires_maintainer_decision` |
| `westley_croup` | `westley-croup-score` | Westley Croup Score | respiratory | score | `implemented` | `active` | moderate | medium | yes | yes | no | `already_implemented` |
| `pram` | `pram` | Pediatric Respiratory Assessment Measure | respiratory | score | `implemented` | `active` | moderate | medium | yes | yes | no | `already_implemented` |
| `rdai` | `rdai` | Respiratory Distress Assessment Instrument | respiratory | score | `pending_validation` | `-` | pending_primary_source | medium | no | yes | yes | `implement_if_table_complete` |
| `brosjod` | `brosjod` | BROSJOD | respiratory | score | `pending_validation` | `-` | external_validation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `pass` | `pass` | Pediatric Asthma Severity Score | respiratory | score | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `risc` | `risc` | RISC | respiratory | score | `coming_soon` | `-` | pending_verification | medium | no | no | no | `requires_source_review` |
| `mrisc` | `mrisc` | mRISC | respiratory | score | `coming_soon` | `-` | pending_verification | medium | no | no | no | `requires_source_review` |
| `pediatric_gcs` | `pediatric-glasgow-coma-scale` | Pediatric Glasgow Coma Scale | neurology | scale | `pending_validation` | `-` | pending_verification | medium | no | yes | yes | `requires_maintainer_decision` |
| `benes` | `benes` | Benes | neurology | scale | `needs_primary_reference` | `-` | primary_reference_needed | medium | no | no | no | `requires_source_review` |
| `glasgow_adapted` | `glasgow-adapted` | Adapted Glasgow | neurology | scale | `needs_primary_reference` | `-` | primary_reference_needed | medium | no | no | no | `requires_source_review` |
| `clinical_dehydration_scale` | `clinical-dehydration-scale` | Clinical Dehydration Scale | emergency | score | `implemented` | `active` | moderate | low | yes | yes | no | `already_implemented` |
| `gorelick_dehydration` | `gorelick-dehydration` | Gorelick Dehydration Scale | emergency | score | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `pecarn_tbi_under_2` | `pecarn-tbi-under-2` | PECARN TBI Under 2 Years | emergency | clinical_rule | `implemented` | `active` | high | medium | yes | yes | no | `already_implemented` |
| `pecarn_tbi_2_or_more` | `pecarn-tbi-2-or-more` | PECARN TBI 2 Years or Older | emergency | clinical_rule | `implemented` | `active` | high | medium | yes | yes | no | `already_implemented` |
| `catch_tbi` | `catch-tbi` | CATCH | emergency | clinical_rule | `implemented` | `active` | original_derivation_study | medium | yes | yes | yes | `already_implemented` |
| `chalice_tbi` | `chalice-tbi` | CHALICE | emergency | clinical_rule | `implemented` | `active` | original_derivation_study | medium | yes | yes | yes | `already_implemented` |
| `sipa` | `sipa` | Shock Index Pediatric Age-adjusted | emergency | calculator | `implemented` | `active` | moderate | medium | yes | yes | no | `already_implemented` |
| `regional_sepsis_scores` | `regional-sepsis-scores` | Regional Sepsis Scores | emergency | score | `coming_soon` | `-` | pending_verification | high | no | no | no | `do_not_implement` |
| `qtc_bazett` | `qtc-bazett` | QTc Bazett | cardiology | calculator | `implemented` | `active` | moderate | medium | yes | yes | no | `already_implemented` |
| `qtc_fridericia` | `qtc-fridericia` | QTc Fridericia | cardiology | calculator | `implemented` | `active` | moderate | medium | yes | yes | no | `already_implemented` |
| `qtc_framingham` | `qtc-framingham` | QTc Framingham | cardiology | calculator | `implemented` | `active` | moderate | medium | yes | yes | no | `already_implemented` |
| `qtc_hodges` | `qtc-hodges` | QTc Hodges | cardiology | calculator | `implemented` | `active` | moderate | medium | yes | yes | no | `already_implemented` |
| `bedside_schwartz` | `bedside-schwartz` | Bedside Schwartz | nephrology | calculator | `implemented` | `active` | moderate | medium | yes | yes | no | `already_implemented` |
| `revised_schwartz` | `revised-schwartz` | Revised Schwartz | nephrology | calculator | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `requires_maintainer_decision` |
| `prifle` | `prifle` | pRIFLE | nephrology | clinical_rule | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `kdigo_pediatric` | `kdigo-pediatric` | Pediatric KDIGO | nephrology | clinical_rule | `pending_validation` | `-` | pending_verification | medium | no | no | no | `requires_source_review` |
| `psofa` | `psofa` | Pediatric Sequential Organ Failure Assessment | intensive_care | score | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `pelod` | `pelod` | PELOD | intensive_care | score | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `pelod_2` | `pelod-2` | PELOD-2 | intensive_care | score | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `prism_iii` | `prism-iii` | PRISM III | intensive_care | score | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `prism_iv` | `prism-iv` | PRISM IV | intensive_care | score | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `pim2` | `pim2` | PIM2 | intensive_care | score | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `pim3` | `pim3` | PIM3 | intensive_care | score | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `who_growth_module` | `who-growth` | WHO Growth | growth_nutrition | percentile | `pending_validation` | `metadata_ready` | official_manual_or_institutional_protocol | medium | yes | yes | no | `requires_maintainer_decision` |
| `who_growth_percentiles` | `who-growth-percentiles` | WHO Growth Percentiles | growth_nutrition | percentile | `pending_validation` | `-` | official_manual_or_institutional_protocol | medium | no | yes | yes | `requires_maintainer_decision` |
| `cdc_growth_percentiles` | `cdc-growth-percentiles` | CDC Growth Percentiles | growth_nutrition | percentile | `pending_validation` | `-` | official_manual_or_institutional_protocol | medium | no | yes | yes | `requires_maintainer_decision` |
| `orbegozo_growth_percentiles` | `orbegozo-growth-percentiles` | Orbegozo Growth Percentiles | growth_nutrition | percentile | `pending_validation` | `-` | official_manual_or_institutional_protocol | medium | no | yes | yes | `requires_license_review` |
| `bmi_percentile` | `bmi-percentile` | BMI Percentile | growth_nutrition | percentile | `pending_validation` | `-` | pending_verification | medium | no | no | yes | `requires_maintainer_decision` |
| `head_circumference_percentile` | `head-circumference-percentile` | Head Circumference Percentile | growth_nutrition | percentile | `pending_validation` | `-` | pending_verification | medium | no | no | yes | `requires_maintainer_decision` |
| `stamp` | `stamp` | STAMP | growth_nutrition | score | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `requires_license_review` |
| `strongkids` | `strongkids` | STRONGkids | growth_nutrition | score | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `pyms` | `pyms` | PYMS | growth_nutrition | score | `pending_validation` | `-` | original_derivation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `flacc` | `flacc` | FLACC | pain | scale | `implemented` | `active` | moderate | low | yes | yes | no | `already_implemented` |
| `rflacc` | `rflacc` | rFLACC | pain | scale | `pending_validation` | `-` | external_validation_study | medium | no | yes | yes | `implement_if_table_complete` |
| `cheops` | `cheops` | CHEOPS | pain | scale | `pending_validation` | `-` | original_derivation_study | medium | no | no | yes | `implement_if_table_complete` |
| `wong_baker_faces` | `wong-baker-faces` | Wong-Baker Faces | pain | scale | `not_implemented_due_to_licensing` | `-` | pending_verification | medium | no | no | no | `do_not_implement` |
| `visual_analogue_scale` | `visual-analogue-scale` | Visual Analogue Scale | pain | scale | `needs_primary_reference` | `-` | primary_reference_needed | low | no | no | yes | `requires_source_review` |
| `pediatric_cpr` | `pediatric-cpr` | Pediatric CPR | resuscitation | algorithm | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `neonatal_cpr` | `neonatal-cpr` | Neonatal CPR | resuscitation | algorithm | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `pediatric_bradycardia` | `pediatric-bradycardia` | Pediatric Bradycardia | resuscitation | algorithm | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `pediatric_tachycardia` | `pediatric-tachycardia` | Pediatric Tachycardia | resuscitation | algorithm | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `shockable_rhythm_algorithm` | `shockable-rhythm-algorithm` | Shockable Rhythm Algorithm | resuscitation | algorithm | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `non_shockable_rhythm_algorithm` | `non-shockable-rhythm-algorithm` | Non-shockable Rhythm Algorithm | resuscitation | algorithm | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `resuscitation_weight_dose_energy` | `resuscitation-weight-dose-energy` | Resuscitation Dose, Weight, and Energy Calculator | resuscitation | calculator | `pending_validation` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `bayley` | `bayley` | Bayley Scales | adolescent_medicine | scale | `coming_soon` | `-` | pending_verification | medium | no | no | yes | `do_not_implement` |
| `denver_ii` | `denver-ii` | Denver II | adolescent_medicine | scale | `coming_soon` | `-` | pending_verification | medium | no | no | yes | `do_not_implement` |
| `mass_casualty_triage` | `mass-casualty-triage` | Mass Casualty Triage Algorithms | emergency | algorithm | `coming_soon` | `-` | pending_verification | high | no | no | yes | `do_not_implement` |
| `adolescent_depression_risk` | `adolescent-depression-risk` | Adolescent Depression Risk | adolescent_medicine | scale | `coming_soon` | `-` | pending_verification | medium | no | no | yes | `requires_maintainer_decision` |
| `adolescent_behavior_risk` | `adolescent-behavior-risk` | Adolescent Risk Behaviors | adolescent_medicine | scale | `coming_soon` | `-` | pending_verification | medium | no | no | yes | `requires_maintainer_decision` |

## Safety Gates Applied

A tool was not eligible for implementation unless all of the following were true:

- source traceable by DOI, PMID, official URL, or stable primary/official source;
- complete formula or scoring table available and reusable;
- exact variant selected;
- inputs defined in catalog;
- unit tests planned and implementable;
- output can be descriptive without therapeutic recommendations;
- no clear licensing/copyright blocker;
- no pending maintainer or expert-review decision.

## Explicit Non-implementation Decisions

- Resuscitation algorithms and dose/energy calculators remain blocked because they overlap therapeutic recommendations and protected guideline algorithms.
- ICU/prognostic scores remain blocked pending expert review and complete reusable model/table policy.
- Proprietary/license-sensitive instruments remain blocked.
- WHO Growth remains available as a partial guided module but not promoted to fully implemented until final module policy is complete.
- CDC and Orbegozo were not used in this sprint.
- Toxicology remains out of scope.
