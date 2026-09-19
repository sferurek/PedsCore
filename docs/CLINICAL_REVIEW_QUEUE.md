# Clinical Review Queue

Generated from the production discovery baseline on 19 September 2026.

This document tracks **independent/external clinical review** of the 61 local-active clinical surfaces. A tool being implemented and tested does **not** mean that independent clinical review has already occurred.

## Review standard

For each tool, an external reviewer should verify:

1. exact named variant/version;
2. intended population and exclusions;
3. input definitions and units;
4. formula/table/decision logic;
5. boundary conditions and missing-data behavior;
6. interpretation wording;
7. current primary/authoritative source;
8. safety framing and absence of unsupported management recommendations;
9. Spain-Spanish terminology where applicable;
10. reuse/licensing status where the implementation depends on reproduced operational content.

A completed review should record reviewer identity/role, date, source version and any requested corrections. Do not mark a tool reviewed solely because an automated test passes.

## Critical risk · 23

| Tool ID | Reuse status | External clinical review |
|---|---|---|
| `bacterial_meningitis_score` | `open` | ☐ Pending |
| `catch_tbi` | `open` | ☐ Pending |
| `chalice_tbi` | `open` | ☐ Pending |
| `garcia_alix_ners` | `open` | ☐ Pending |
| `kdigo_pediatric` | `open` | ☐ Pending |
| `modified_bell_nec` | `open` | ☐ Pending |
| `modified_sarnat_nichd` | `unresolved` | ☐ Pending |
| `nsofa` | `open` | ☐ Pending |
| `parc` | `open` | ☐ Pending |
| `pecarn_febrile_infant` | `open` | ☐ Pending |
| `pecarn_tbi_2_or_more` | `open` | ☐ Pending |
| `pecarn_tbi_under_2` | `open` | ☐ Pending |
| `pediatric_burn_tbsa` | `open` | ☐ Pending |
| `pelod_2` | `open` | ☐ Pending |
| `phoenix_sepsis` | `open` | ☐ Pending |
| `pim3` | `open` | ☐ Pending |
| `prifle` | `open` | ☐ Pending |
| `prism_iv` | `public_domain` | ☐ Pending |
| `psofa` | `criteria_reimplementation` | ☐ Pending |
| `sipa` | `open` | ☐ Pending |
| `snappii` | `criteria_reimplementation` | ☐ Pending |
| `step_by_step` | `open` | ☐ Pending |
| `thompson_hie` | `unresolved` | ☐ Pending |

## High risk · 17

| Tool ID | Reuse status | External clinical review |
|---|---|---|
| `apgar` | `open` | ☐ Pending |
| `bedside_pews` | `attribution_required` | ☐ Pending |
| `clinical_dehydration_scale` | `open` | ☐ Pending |
| `fnass_21` | `open` | ☐ Pending |
| `gorelick_dehydration` | `open` | ☐ Pending |
| `modified_tal` | `open` | ☐ Pending |
| `mrisc` | `open` | ☐ Pending |
| `pass` | `open` | ☐ Pending |
| `pediatric_appendicitis_score` | `open` | ☐ Pending |
| `pram` | `open` | ☐ Pending |
| `risc` | `public_domain` | ☐ Pending |
| `silverman_andersen` | `open` | ☐ Pending |
| `taussig_croup` | `open` | ☐ Pending |
| `westley_croup` | `open` | ☐ Pending |
| `wood_downes_ferres` | `unresolved` | ☐ Pending |
| `wpcdai` | `open` | ☐ Pending |
| `yos` | `open` | ☐ Pending |

## Moderate risk · 21

| Tool ID | Reuse status | External clinical review |
|---|---|---|
| `ballard` | `unresolved` | ☐ Pending |
| `bedside_schwartz` | `open` | ☐ Pending |
| `bmi_percentile` | `attribution_required` | ☐ Pending |
| `cdc_growth_percentiles` | `public_domain` | ☐ Pending |
| `ckid_u25` | `open` | ☐ Pending |
| `cries` | `unresolved` | ☐ Pending |
| `dubowitz` | `unresolved` | ☐ Pending |
| `head_circumference_percentile` | `attribution_required` | ☐ Pending |
| `nips` | `open` | ☐ Pending |
| `pcdai` | `open` | ☐ Pending |
| `pucai` | `open` | ☐ Pending |
| `qtc_bazett` | `public_domain` | ☐ Pending |
| `qtc_framingham` | `public_domain` | ☐ Pending |
| `qtc_fridericia` | `public_domain` | ☐ Pending |
| `qtc_hodges` | `public_domain` | ☐ Pending |
| `rdai` | `criteria_reimplementation` | ☐ Pending |
| `revised_schwartz` | `open` | ☐ Pending |
| `strongkids` | `open` | ☐ Pending |
| `visual_analogue_scale` | `public_domain` | ☐ Pending |
| `who_growth_module` | `attribution_required` | ☐ Pending |
| `who_growth_percentiles` | `attribution_required` | ☐ Pending |


## Rights-review flags inside the local queue

Local tools still carrying `reuse: unresolved` require an additional focused rights review before PedsCore claims unrestricted operational republication. The current implementation may intentionally avoid protected wording/layout, but the unresolved marker must remain visible until documented evidence supports a stronger status.

Current unresolved local IDs:

- `modified_sarnat_nichd`
- `thompson_hie`
- `wood_downes_ferres`
- `ballard`
- `cries`
- `dubowitz`

## Completion rule

The project may describe a tool as **externally clinically reviewed** only when a concrete review record exists. Global claims such as “all calculators clinically validated” are prohibited unless every applicable item in this queue has a documented review.
