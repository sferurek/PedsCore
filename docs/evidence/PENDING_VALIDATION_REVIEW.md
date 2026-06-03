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
| B | `wood_downes_ferres` | `wood-downes-ferres` | respiratory | Wood-Downes-Ferres/Downes variants and primary source/table unresolved. | Not reviewed in detail. |
| A | `ballard` | `ballard` | neonatology | Complete New Ballard table/form, conversion, and license pending. | `pending_complete_scoring_table` |
| B | `dubowitz` | `dubowitz` | neonatology | Full version/table and source path unresolved. | Not reviewed in detail. |
| A | `sarnat` | `sarnat` | neonatology | Classic versus modified variant, full table, and expert review pending. | `requires_domain_expert_review` |
| A | `thompson_hie` | `thompson-hie-score` | neonatology | Complete table and source access pending; PubMed not confirmed. | `pending_complete_scoring_table` |
| B | `modified_finnegan` | `modified-finnegan` | neonatology | Multiple variants, long item table, and therapeutic thresholds/licensing. | Not reviewed in detail. |
| B | `pipp` | `pipp` | pain | Variant, table, gestational-age adjustment, and licensing pending. | Not reviewed in detail. |
| B | `pipp_r` | `pipp-r` | pain | Variant/table/licensing pending. | Not reviewed in detail. |
| A | `cries` | `cries` | pain | Full 0/1/2 item table and licensing pending. | `pending_complete_scoring_table` |
| B | `comfortneo` | `comfortneo` | neonatology | Official table, ventilation handling, licensing pending. | Not reviewed in detail. |
| A | `bhutani_nomogram` | `bhutani-nomogram` | neonatology | Reusable hour-specific curve values and current guideline context pending. | `pending_complete_scoring_table` |
| B | `pews` | `pews` | emergency | Heterogeneous PEWS variants; exact version not selected. | Not reviewed in detail. |
| B | `brighton_pews` | `brighton-pews` | emergency | Brighton-specific source/table/license pending. | Not reviewed in detail. |
| A | `bedside_pews` | `bedside-pews` | emergency | Full table reuse and inventor/licensing review pending. | `pending_licensing_review` |
| B | `rdai` | `rdai` | respiratory | Direct primary source/table pending. | Not reviewed in detail. |
| B | `pediatric_gcs` | `pediatric-glasgow-coma-scale` | neurology | Pediatric verbal table by age/development unresolved. | Not reviewed in detail. |
| B | `revised_schwartz` | `revised-schwartz` | nephrology | Needs distinction from existing bedside Schwartz and exact formula variant. | Not reviewed in detail. |
| B | `prifle` | `prifle` | nephrology | Pediatric RIFLE source and exact criteria pending. | Not reviewed in detail. |
| B | `kdigo_pediatric` | `kdigo-pediatric` | nephrology | Official guideline criteria and pediatric adaptation require careful implementation. | Not reviewed in detail. |
| A | `who_growth_percentiles` | `who-growth-percentiles` | growth_nutrition | Official files/indicator selection, terms, and tests pending. | `pending_complete_scoring_table` |
| A | `cdc_growth_percentiles` | `cdc-growth-percentiles` | growth_nutrition | Official LMS file import, interpolation, and tests pending. | `pending_complete_scoring_table` |
| C | `orbegozo_growth_percentiles` | `orbegozo-growth-percentiles` | growth_nutrition | Official source/data/license not verified. | Not reviewed in detail. |
| B | `bmi_percentile` | `bmi-percentile` | growth_nutrition | Depends on selected WHO/CDC/other reference and age range. | Not reviewed in detail. |
| B | `head_circumference_percentile` | `head-circumference-percentile` | growth_nutrition | Depends on selected WHO/CDC/other reference and age range. | Not reviewed in detail. |
| C | `stamp` | `stamp` | growth_nutrition | Copyright/licensing concern. | Not reviewed in detail. |
| B | `strongkids` | `strongkids` | growth_nutrition | Original source/table/license pending. | Not reviewed in detail. |
| B | `pyms` | `pyms` | growth_nutrition | Source located previously; table/license still pending. | Not reviewed in detail. |
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

## Safety Notes

- No `pending_validation` tool was changed to `ready_for_implementation`.
- No clinical calculation, score table, percentile engine, nomogram, or therapeutic recommendation was added.
- No toxicology content was added.
- Future implementation must create tests before activation.
