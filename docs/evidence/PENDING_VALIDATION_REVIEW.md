# Pending Validation Review

Date: 2026-06-03

Scope: Block 8B-1 reviewed all catalog tools currently marked `pending_validation` and fully audited a Priority A batch of 8 tools. No clinical calculator was implemented, no scoring table was copied into code, and no tool was promoted to `ready_for_implementation`.

## Priority Rules

- Priority A: high clinical utility, frequent use, source likely traceable, feasible implementation path, and manageable licensing risk.
- Priority B: useful but variant selection, complexity, or source access makes implementation less immediate.
- Priority C: high licensing risk, high regulatory risk, broad/unclear scope, or lower MVP urgency.

## Full Pending Validation List

| Priority | Tool ID | Slug | Category | Current blocker | Batch decision |
|---|---|---|---|---|---|
| B | `wood_downes_ferres` | `wood-downes-ferres` | respiratory | Downes/Wood source located, but Ferres-modified variant/table and age cutoffs unresolved. | `pending_variant_selection` |
| A | `ballard` | `ballard` | neonatology | Complete New Ballard table/form, conversion, and license pending. | `pending_complete_scoring_table` |
| B | `dubowitz` | `dubowitz` | neonatology | Full version/table and source path unresolved. | Not reviewed in detail. |
| A | `sarnat` | `sarnat` | neonatology | Classic versus modified variant, full table, and expert review pending. | `requires_domain_expert_review` |
| A | `thompson_hie` | `thompson-hie-score` | neonatology | Complete table and source access pending; PubMed not confirmed. | `pending_complete_scoring_table` |
| B | `modified_finnegan` | `modified-finnegan` | neonatology | Original Finnegan source located; modified variant, long table, licensing, and therapeutic threshold wording unresolved. | `pending_variant_selection` |
| B | `pipp` | `pipp` | pain | Original PIPP source located; complete table, gestational-age adjustment, interpretation, and licensing pending. | `pending_complete_scoring_table` |
| B | `pipp_r` | `pipp-r` | pain | PIPP-R validation sources located; complete table, adjustment, interpretation, and licensing pending. | `pending_complete_scoring_table` |
| A | `cries` | `cries` | pain | Full 0/1/2 item table and licensing pending. | `pending_complete_scoring_table` |
| B | `comfortneo` | `comfortneo` | neonatology | COMFORTneo sources located; official table, ventilated/non-ventilated handling, licensing, and expert review pending. | `pending_complete_scoring_table` |
| A | `bhutani_nomogram` | `bhutani-nomogram` | neonatology | Reusable hour-specific curve values and current guideline context pending. | `pending_complete_scoring_table` |
| B | `pews` | `pews` | emergency | Generic PEWS remains an umbrella; Brighton and Bedside variants must stay separate. | `pending_variant_selection` |
| B | `brighton_pews` | `brighton-pews` | emergency | Brighton/Monaghan source located; complete reusable table, protocol separation, and license pending. | `pending_complete_scoring_table` |
| A | `bedside_pews` | `bedside-pews` | emergency | Full table reuse, inventor/licensing review, and protocol separation pending. | `pending_licensing_review` |
| B | `rdai` | `rdai` | respiratory | Direct primary source/table pending. | Not reviewed in detail. |
| B | `pediatric_gcs` | `pediatric-glasgow-coma-scale` | neurology | Guideline source trail found; primary pediatric adaptation and complete verbal table unresolved. | `pending_primary_source` |
| B | `revised_schwartz` | `revised-schwartz` | nephrology | Needs distinction from existing bedside Schwartz and exact formula variant. | Not reviewed in detail. |
| B | `prifle` | `prifle` | nephrology | Pediatric RIFLE source and exact criteria pending. | Not reviewed in detail. |
| B | `kdigo_pediatric` | `kdigo-pediatric` | nephrology | Official guideline criteria and pediatric adaptation require careful implementation. | Not reviewed in detail. |
| A | `who_growth_percentiles` | `who-growth-percentiles` | growth_nutrition | Official files/indicator selection, terms, and tests pending. | `pending_complete_scoring_table` |
| A | `cdc_growth_percentiles` | `cdc-growth-percentiles` | growth_nutrition | Official LMS file import, interpolation, and tests pending. | `pending_complete_scoring_table` |
| C | `orbegozo_growth_percentiles` | `orbegozo-growth-percentiles` | growth_nutrition | Official tables page located; data/LMS availability and license terms unclear. | `pending_licensing_review` |
| B | `bmi_percentile` | `bmi-percentile` | growth_nutrition | Depends on selected WHO/CDC/other reference and age range. | Not reviewed in detail. |
| B | `head_circumference_percentile` | `head-circumference-percentile` | growth_nutrition | Depends on selected WHO/CDC/other reference and age range. | Not reviewed in detail. |
| C | `stamp` | `stamp` | growth_nutrition | Primary source located; STAMP copyright/mark, full table, and reuse terms pending. | `pending_licensing_review` |
| B | `strongkids` | `strongkids` | growth_nutrition | Original source located; complete table/item wording and reuse terms pending. | `pending_complete_scoring_table` |
| B | `pyms` | `pyms` | growth_nutrition | Original evaluation source located; full form/table and reuse terms pending. | `pending_complete_scoring_table` |
| B | `cheops` | `cheops` | pain | Complete table and primary source pending. | Not reviewed in detail. |
| C | `resuscitation_weight_dose_energy` | `resuscitation-weight-dose-energy` | resuscitation | High regulatory and therapeutic risk; official sources/license pending. | Not reviewed in detail. |

## Reviewed Batch Summary

| Tool | Primary/official source | Complete table/data | Licensing risk | Decision |
|---|---|---|---|---|
| Ballard / New Ballard | DOI/PMID verified. | Pending. | Medium. | `pending_complete_scoring_table` |
| Sarnat | DOI/PMID verified. | Pending. | Medium. | `requires_domain_expert_review` |
| Thompson HIE | DOI verified; PMID not confirmed. | Pending. | Medium. | `pending_complete_scoring_table` |
| CRIES | DOI/PMID verified. | Pending. | Medium. | `pending_complete_scoring_table` |
| Bhutani Nomogram | DOI/PMID verified. | Pending curve/data values. | Medium. | `pending_complete_scoring_table` |
| Bedside PEWS | DOI/PMID/PMCID verified. | Source-located, reuse review pending. | Medium. | `pending_licensing_review` |
| WHO Growth Percentiles | Official WHO source verified. | Official files not selected/imported. | Low/medium. | `pending_complete_scoring_table` |
| CDC Growth Percentiles | Official CDC LMS source verified. | Official files not selected/imported. | Low. | `pending_complete_scoring_table` |

## Reviewed Batch 8B-2 Summary

| Tool | Category | Primary source found | DOI/PMID/URL | Complete scoring table | Interpretation cutoffs | License risk | Evidence decision | Next action |
|---|---|---|---|---|---|---|---|---|
| PIPP | pain | Yes | DOI `10.1097/00002508-199603000-00004` | No | Pending | Medium/high | `pending_complete_scoring_table` | Verify table, adjustment, interpretation, and permissions. |
| PIPP-R | pain | Yes | DOI `10.1097/AJP.0b013e3182906aed`; PMID `24503979` | No | Pending | Medium/high | `pending_complete_scoring_table` | Verify PIPP-R table, adjustment, and permissions. |
| COMFORTneo | neonatology | Yes | DOI `10.1097/AJP.0b013e3181a5b52a` | No | Pending | Medium/high | `pending_complete_scoring_table` | Obtain official table and expert/license review. |
| Modified Finnegan | neonatology | Yes | PMID `1163358` | No | Treatment-linked thresholds blocked | High | `pending_variant_selection` | Select exact version and avoid treatment recommendations. |
| Wood-Downes-Ferres | respiratory | Partial | PMID `5647493` for Downes/Wood source | No | Pending | Unknown | `pending_variant_selection` | Locate Ferres-modified source/table. |
| Pediatric GCS | neurology | No primary adaptation | Guideline/source trail only | No | Pending | Unknown | `pending_primary_source` | Locate primary pediatric adaptation and verbal table. |
| PEWS | emergency | Variant source only | Brighton DOI `10.7748/paed2005.02.17.1.32.c964` | No | Institutional | Medium/high | `pending_variant_selection` | Keep generic PEWS as umbrella; select variant first. |
| Brighton PEWS | emergency | Yes | DOI `10.7748/paed2005.02.17.1.32.c964` | No | Protocol-linked | Medium | `pending_complete_scoring_table` | Verify table and separate escalation protocol. |
| Bedside PEWS | emergency | Yes | DOI `10.1186/cc7998`; PMID `19678924` | Source-located, not cleared | Protocol-linked | Medium | `pending_licensing_review` | Confirm reuse/inventor terms. |
| Orbegozo Growth | growth_nutrition | Official source | Official URL | Partial PDF tables | Percentile lookup | Medium/unknown | `pending_licensing_review` | Clarify data/LMS availability and license. |
| STAMP | growth_nutrition | Yes | DOI `10.1111/j.1365-277X.2012.01234.x`; PMID `22568534` | No | Pending | High | `pending_licensing_review` | Verify STAMP© permissions. |
| STRONGkids | growth_nutrition | Yes | DOI `10.1016/j.clnu.2009.07.006`; PMID `19682776` | No | Pending | Medium/unknown | `pending_complete_scoring_table` | Verify item table and reuse terms. |
| PYMS | growth_nutrition | Yes | DOI `10.1017/S0007114510001121`; PMID `20398432` | No | Pending | Medium/unknown | `pending_complete_scoring_table` | Verify full form/table and reuse terms. |

## Safety Notes

- No `pending_validation` tool was changed to `ready_for_implementation`.
- No clinical calculation, score table, percentile engine, nomogram, or therapeutic recommendation was added.
- No toxicology content was added.
- Future implementation must create tests before activation.
- Block 8B-2 also keeps all reviewed tools out of `ready_for_implementation` because at least one gate remains incomplete for each.

## Reviewed Batch 8B-3 Summary

| Tool | Category | Primary source found | DOI/PMID/URL | Complete scoring table | Interpretation cutoffs | License risk | Evidence decision | Next action |
|---|---|---|---|---|---|---|---|---|
| Dubowitz | neonatology | Yes | DOI `10.1016/S0022-3476(70)80038-5`; PMID `5430794` | No | Conversion/form pending | Medium | `pending_complete_scoring_table` | Verify full form/table, graph conversion, and reuse permissions. |
| Fenton neonatal growth | neonatology | Yes | DOI `10.1186/1471-2431-13-59` | Data pending | Percentile/z-score data pending | Low/medium | `pending_complete_scoring_table` | Locate reusable LMS data files and attribution requirements. |
| RDAI | respiratory | Partial | Bibliographic URL only; DOI/PMID not verified | No | Pending | Unknown | `pending_primary_source` | Locate primary Lowell paper/table; do not use secondary calculators. |
| BROSJOD | respiratory | Yes | DOI `10.1002/ppul.23546`; PMID `28328090` | No | Pending | Unknown | `pending_complete_scoring_table` | Verify original/full table and reuse terms. |
| PASS | respiratory | Yes | DOI `10.1197/j.aem.2003.07.015`; PMID `14709423` | No | Pending | Unknown | `pending_complete_scoring_table` | Verify complete table and interpretation from source. |
| Gorelick dehydration | emergency | Yes | DOI `10.1542/peds.99.5.e6`; PMID `9113963` | No | Variant pending | Unknown | `pending_variant_selection` | Select exact 4-item/10-item implementation and table. |
| CATCH | emergency | Yes | DOI `10.1503/cmaj.091421`; PMID `20142371` | Yes, in open article | Rule criteria published | Low/medium | `ready_for_implementation` | Implement only as informational predictor classification; no CT recommendation. |
| CHALICE | emergency | Yes | DOI `10.1136/adc.2005.083980`; PMID `17056862` | Yes, in open article | Rule criteria published | Low/medium | `ready_for_implementation` | Implement only as informational predictor classification; no CT recommendation. |
| Revised Schwartz | nephrology | Yes | DOI `10.1681/ASN.2008030287`; PMID `19158356` | Formula source found | Variant pending | Low | `pending_variant_selection` | Select exact CKiD equation distinct from Bedside Schwartz. |
| pRIFLE | nephrology | Yes | DOI `10.1038/sj.ki.5002231`; PMID `17396113` | Criteria source found | Requires unit/expert review | Medium | `requires_domain_expert_review` | Verify eCCl baseline, urine-output windows, units, and expert review. |
| rFLACC | pain | Yes | DOI `10.1111/j.1460-9592.2005.01773.x`; PMID `16490089` | No | Pending | Unknown | `pending_complete_scoring_table` | Verify revised descriptors and reuse/licensing. |
| CHEOPS | pain | Citation trail only | No DOI/PMID confirmed for 1985 chapter | No | Pending | Unknown | `pending_primary_source` | Locate primary chapter/table or permissioned source. |
| Visual Analogue Scale / EVA | pain | No selected pediatric source | Pending | Format pending | Pending | Low/unknown | `pending_variant_selection` | Select 0-10, 0-100 mm, or pediatric validated format before implementation. |

## Block 8B-3 Safety Notes

- `CATCH` and `CHALICE` were promoted only to `ready_for_implementation`; no calculator or clinical rule engine was created.
- Future CATCH/CHALICE outputs must classify predictors only and must not say to perform or avoid CT, discharge, admit, observe, or treat.
- No tool was marked `implemented`.
- No scoring table was copied into code.
- No toxicology content was added.

## Remaining unresolved after 8B-3

| Tool ID | Slug | Current status | Why it remains unresolved |
|---|---|---|---|
| `combined_apgar` | `combined-apgar` | `needs_primary_reference` | Expanded/combined Apgar variant requires exact source and version selection. |
| `benes` | `benes` | `needs_primary_reference` | Tool identity and primary source remain unclear; likely overlaps neurological/GCS variants. |
| `glasgow_adapted` | `glasgow-adapted` | `needs_primary_reference` | Adapted Glasgow variant needs exact source and relation to pediatric GCS. |
| `visual_analogue_scale` | `visual-analogue-scale` | `needs_primary_reference` | Generic VAS needs selected pediatric operating format and source before implementation. |
| `kdigo_pediatric` | `kdigo-pediatric` | `pending_validation` | Official KDIGO criteria require pediatric adaptation, unit handling, and treatment-separation review. |
| `bmi_percentile` | `bmi-percentile` | `pending_validation` | Depends on selected WHO/CDC source, age range, LMS data and locale policy. |
| `head_circumference_percentile` | `head-circumference-percentile` | `pending_validation` | Depends on selected WHO/CDC source, age range, LMS data and locale policy. |
| `resuscitation_weight_dose_energy` | `resuscitation-weight-dose-energy` | `pending_validation` | High regulatory/therapeutic risk; requires official sources, legal review and non-recommendation UX. |

## Block 8B-4 — Advanced Pending Classification

This block separates unresolved tools into decision classes:

- `blocked_missing_primary_source`
- `blocked_missing_complete_scoring_table`
- `blocked_missing_interpretation_cutoffs`
- `blocked_variant_selection_needed`
- `blocked_licensing_or_copyright`
- `blocked_requires_domain_expert_review`
- `blocked_regulatory_risk`
- `ready_for_implementation_candidate`
- `catalog_only_recommended`

| Tool ID | Slug | Category | Current status | Pending blocker | Evidence source | Decision type | Depends on maintainer |
|---|---|---|---|---|---|---|---|
| `psofa` | `psofa` | intensive_care | `coming_soon` | `blocked_missing_complete_scoring_table` | `10.1001/jamapediatrics.2017.2352` | `blocked_regulatory_risk` | no |
| `pelod` | `pelod` | intensive_care | `coming_soon` | `blocked_missing_primary_source` | `23685639` | `blocked_requires_domain_expert_review` | no |
| `pelod_2` | `pelod-2` | intensive_care | `coming_soon` | `blocked_missing_complete_scoring_table` | `10.1097/CCM.0b013e31828a2bbd` | `blocked_regulatory_risk` | no |
| `prism_iii` | `prism-iii` | intensive_care | `coming_soon` | `blocked_licensing_or_copyright` | `10.1097/00003246-199605000-00004` | `blocked_licensing_or_copyright` | yes |
| `prism_iv` | `prism-iv` | intensive_care | `coming_soon` | `blocked_licensing_or_copyright` | pending | `blocked_licensing_or_copyright` | yes |
| `pim2` | `pim2` | intensive_care | `coming_soon` | `blocked_missing_primary_source` | pending primary source extraction | `blocked_variant_selection_needed` | yes |
| `pim3` | `pim3` | intensive_care | `coming_soon` | `blocked_missing_complete_scoring_table` | `10.1097/PCC.0b013e31829760cf` | `requires_domain_expert_review` | yes |
| `pediatric_cpr` | `pediatric-cpr` | resuscitation | `coming_soon` | `blocked_licensing_or_copyright` | official AHA guidance | `blocked_licensing_or_copyright` | yes |
| `neonatal_cpr` | `neonatal-cpr` | resuscitation | `coming_soon` | `blocked_licensing_or_copyright` | official AHA guidance | `blocked_licensing_or_copyright` | yes |
| `pediatric_bradycardia` | `pediatric-bradycardia` | resuscitation | `coming_soon` | `blocked_licensing_or_copyright` | official AHA guidance | `blocked_licensing_or_copyright` | yes |
| `pediatric_tachycardia` | `pediatric-tachycardia` | resuscitation | `coming_soon` | `blocked_licensing_or_copyright` | official AHA guidance | `blocked_licensing_or_copyright` | yes |
| `shockable_rhythm_algorithm` | `shockable-rhythm-algorithm` | resuscitation | `coming_soon` | `blocked_licensing_or_copyright` | official AHA guidance | `blocked_licensing_or_copyright` | yes |
| `non_shockable_rhythm_algorithm` | `non-shockable-rhythm-algorithm` | resuscitation | `coming_soon` | `blocked_licensing_or_copyright` | official AHA guidance | `blocked_licensing_or_copyright` | yes |
| `resuscitation_weight_dose_energy` | `resuscitation-weight-dose-energy` | resuscitation | `pending_validation` | `blocked_licensing_or_copyright` | paywalled guideline references | `blocked_regulatory_risk` | yes |
| `wood_downes_ferres` | `wood-downes-ferres` | respiratory | `pending_validation` | `blocked_variant_selection_needed` | `5647493` + partial sources | `blocked_variant_selection_needed` | yes |
| `pediatric_gcs` | `pediatric-glasgow-coma-scale` | neurology | `pending_validation` | `blocked_missing_complete_scoring_table` | source trail only | `blocked_variant_selection_needed` | yes |
| `bmi_percentile` | `bmi-percentile` | growth_nutrition | `pending_validation` | `blocked_variant_selection_needed` | WHO/CDC strategy pending | `blocked_variant_selection_needed` | yes |
| `head_circumference_percentile` | `head-circumference-percentile` | growth_nutrition | `pending_validation` | `blocked_variant_selection_needed` | WHO/CDC strategy pending | `blocked_variant_selection_needed` | yes |
| `adolescent_depression_risk` | `adolescent-depression-risk` | adolescent_medicine | `coming_soon` | `blocked_missing_primary_source` | no unified instrument selected | `catalog_only_recommended` | yes |
| `adolescent_behavior_risk` | `adolescent-behavior-risk` | adolescent_medicine | `coming_soon` | `blocked_missing_primary_source` | no unified instrument selected | `catalog_only_recommended` | yes |
| `cries` | `cries` | pain | `pending_validation` | `blocked_missing_complete_scoring_table` | primary citation trail exists; table incomplete | `blocked_missing_complete_scoring_table` | no |
| `cheops` | `cheops` | pain | `pending_validation` | `blocked_missing_primary_source` | 1985 chapter not directly linked | `catalog_only_recommended` | no |
| `visual_analogue_scale` | `visual-analogue-scale` | pain | `needs_primary_reference` | `blocked_variant_selection_needed` | format not selected | `catalog_only_recommended` | yes |
| `thompson_hie` | `thompson-hie-score` | neonatology | `pending_validation` | `blocked_missing_complete_scoring_table` | tables and cutoffs not fully extracted | `blocked_missing_complete_scoring_table` | no |
| `rflacc` | `rflacc` | pain | `pending_validation` | `blocked_missing_complete_scoring_table` | table/license confirmation pending | `blocked_missing_complete_scoring_table` | no |
| `gorelick_dehydration` | `gorelick-dehydration` | emergency | `pending_validation` | `blocked_variant_selection_needed` | 4-item vs 10-item variant decision | `blocked_variant_selection_needed` | yes |
| `who_growth_percentiles` | `who-growth-percentiles` | growth_nutrition | `pending_validation` | `blocked_missing_complete_scoring_table` | official source located, LMS mapping pending | `catalog_only_recommended` | yes |
| `cdc_growth_percentiles` | `cdc-growth-percentiles` | growth_nutrition | `pending_validation` | `blocked_missing_complete_scoring_table` | official source located, data/model pending | `catalog_only_recommended` | yes |
| `orbegozo_growth_percentiles` | `orbegozo-growth-percentiles` | growth_nutrition | `pending_validation` | `blocked_licensing_or_copyright` | official data and usage terms not confirmed | `blocked_licensing_or_copyright` | yes |
| `stamp` | `stamp` | growth_nutrition | `pending_validation` | `blocked_licensing_or_copyright` | copyright-marked tool | `blocked_licensing_or_copyright` | yes |
| `pyms` | `pyms` | growth_nutrition | `pending_validation` | `blocked_missing_complete_scoring_table` | table/reuse verification pending | `blocked_missing_complete_scoring_table` | no |
| `strongkids` | `strongkids` | growth_nutrition | `pending_validation` | `blocked_missing_complete_scoring_table` | licensing and table details pending | `blocked_missing_complete_scoring_table` | no |
| `pews` | `pews` | emergency | `pending_validation` | `blocked_variant_selection_needed` | multiple PEWS families exist | `blocked_variant_selection_needed` | yes |
| `mass_casualty_triage` | `mass-casualty-triage` | emergency | `coming_soon` | `blocked_variant_selection_needed` | algorithm family selection unresolved | `catalog_only_recommended` | yes |

## 8B-5 Maintainer Decision Crosswalk

| Tool ID | maintainer_decision_required | recommended_decision_pack_section |
|---|---|---|
| `wood_downes_ferres` | yes | Wood-Downes-Ferrés |
| `pediatric_gcs` | yes | Pediatric Glasgow Coma Scale |
| `pews` | yes | PEWS / Brighton PEWS / Bedside PEWS |
| `brighton_pews` | yes | PEWS / Brighton PEWS / Bedside PEWS |
| `bedside_pews` | yes | PEWS / Brighton PEWS / Bedside PEWS |
| `pediatric_cpr` | yes | RCP pediátrica y neonatal / algoritmos |
| `neonatal_cpr` | yes | RCP pediátrica y neonatal / algoritmos |
| `pediatric_bradycardia` | yes | RCP pediátrica y neonatal / algoritmos |
| `pediatric_tachycardia` | yes | RCP pediátrica y neonatal / algoritmos |
| `shockable_rhythm_algorithm` | yes | RCP pediátrica y neonatal / algoritmos |
| `non_shockable_rhythm_algorithm` | yes | RCP pediátrica y neonatal / algoritmos |
| `resuscitation_weight_dose_energy` | yes | Calculadora peso-dosis-energía en RCP |
| `who_growth_percentiles` | yes | Percentiles WHO/CDC |
| `cdc_growth_percentiles` | yes | Percentiles WHO/CDC |
| `orbegozo_growth_percentiles` | yes | Orbegozo |
| `psofa` | yes | PIM/PRISM/PELOD/pSOFA |
| `pelod` | yes | PIM/PRISM/PELOD/pSOFA |
| `pelod_2` | yes | PIM/PRISM/PELOD/pSOFA |
| `prism_iii` | yes | PIM/PRISM/PELOD/pSOFA |
| `prism_iv` | yes | PIM/PRISM/PELOD/pSOFA |
| `pim2` | yes | PIM/PRISM/PELOD/pSOFA |
| `pim3` | yes | PIM/PRISM/PELOD/pSOFA |
| `bayley` | yes | Propietarias / licencia |
| `denver_ii` | yes | Propietarias / licencia |
| `wong_baker_faces` | yes | Propietarias / licencia |
| `cheops` | no | Dolor con tabla compleja / copyright |
| `cries` | no | Dolor con tabla compleja / copyright |
| `rflacc` | no | Dolor con tabla compleja / copyright |
