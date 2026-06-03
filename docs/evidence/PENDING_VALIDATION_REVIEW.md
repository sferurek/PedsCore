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
