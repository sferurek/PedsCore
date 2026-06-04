# Maintainer Decisions Required

Date: 2026-06-03

Scope: Block 8B-4 evidence validation pass.

## Purpose

This document separates tools that are evidence-complete but require a maintainer clinical decision from those that are blocked by missing source data or licensing.

## Tools requiring maintainer decision

### Resolved) `pews`
- **Decision status**: resolved in PEWS-IMPLEMENTATION-1.
- **Decision**: do not implement PEWS as a generic calculator.
- **Product status**: keep `pews` as an umbrella catalog entry.
- **Selected candidate variant**: `brighton_pews`.
- **Clinical/regulatory note**: avoid protocol-specific activation thresholds and keep all future outputs descriptive.
- **Next action**: keep generic `pews` out of registry and calculator IDs.

### Resolved) `wood_downes_ferres`
- **Decision status**: resolved in BRONCHIOLITIS-IMPLEMENTATION-1.
- **Selected variant**: classic six-domain Wood-Downes-Ferres.
- **Current status**: implemented as descriptive score-only output.
- **Clinical/regulatory note**: runtime output is limited to score, criteria trace and descriptive severity band.
- **Evidence status**: Wood/Downes/Lecks source anchor plus open visible six-domain table documented in `docs/evidence/tools/wood-downes-ferres.md`.
- **Next action**: keep output descriptive and revisit only if a more definitive Ferres primary source is found.

### 3) `pediatric_gcs`
- **Decision needed**: choose canonical pediatric adaptation source and scoring table by age.
- **Options**: pediatric-specific modified GCS sets versus age-banded verbal responses.
- **Current blocker**: incomplete verbal scoring table and exact age split.
- **Clinical/regulatory note**: avoid implying direct treatment directives from score outputs.
- **Evidence status**: source trail exists but no complete primary table validated for implementation.
- **Next action**: remain blocked for maintainer sign-off.

### 4) `resuscitation_weight_dose_energy`
- **Decision needed**: define whether tool remains educational only, calculator, or future de-scoped scope.
- **Options**: documentation-only reference; non-therapeutic reference outputs; restricted educational examples.
- **Current blocker**: overlap with therapeutic dosing context and legal/licensing constraints.
- **Clinical/regulatory note**: direct dosing logic is high regulatory exposure.
- **Evidence status**: official guideline sources exist; output scope is not yet defined.
- **Next action**: decide non-therapeutic educational scope before any activation.

### Resolved) `pews` family (`brighton_pews`, `bedside_pews`)
- **Decision status**: resolved in PEWS-IMPLEMENTATION-1.
- **Product policy**: keep PEWS variants as separated scoped entries.
- **Brighton PEWS**: preferred candidate, but remains blocked because the complete original table is not available from a reusable source.
- **Bedside PEWS**: remains blocked pending table reuse, inventor/licensing review and protocol separation.
- **Next action**: implement only a variant that passes source, table, reuse, tests and non-protocol output gates.

### 6) Growth reference selection (`who_growth_percentiles`, `cdc_growth_percentiles`, `bmi_percentile`, `head_circumference_percentile`)
- **Decision needed**: default curve source and age range policy by locale.
- **Options**: WHO-first, CDC-first, Orbegozo-only by region, or hybrid with explicit selection.
- **Current blocker**: output depends on selected standard and interpolation policy.
- **Clinical/regulatory note**: growth interpretation can diverge if source and units are mixed.
- **Next action**: confirm locale policy and formula/pipeline in a follow-up decision block.

### 7) UCI prognostic tools (`prism_iii`, `prism_iv`, `pim2`, `pim3`, `psofa`, `pelod`, `pelod_2`)
- **Decision needed**: whether these remain `coming_soon` references or move to `pending_validation`/implementation in a later clinical phase.
- **Options**: evidence-only catalog pages vs traceable calculators with strict non-therapeutic wording.
- **Current blocker**: high model complexity and mortality-risk framing.
- **Clinical/regulatory note**: should only progress after explicit maintainer/clinical governance decision.
- **Next action**: mark as pending and require clinical governance before any runtime activation.

## Decisions on explicit exclusions for this pass

- `bayley`, `denver_ii`, and `wong_baker_faces` remain blocked due to licensing/review constraints.
- `pediatric_cpr`, `neonatal_cpr`, `pediatric_bradycardia`, `pediatric_tachycardia`, `shockable_rhythm_algorithm`, and `non_shockable_rhythm_algorithm` remain reference-only until policy is defined.

## Open decisions by maintainer

1. Should RCP algorithms be fully blocked from outputs, or shown as guideline-linked educational cards?
2. Should UCI mortality/risk scores remain in the catalog only or be actively implemented.
3. Which growth reference is default by region/locale.
4. Which PEWS/neurologic scale conventions are selected for future technical implementation.
5. Whether to create a dedicated “variant registry” for tools with multiple accepted score versions.

## Block 8B-4 Maintainer Priorities

### 8B-4.1 — Critical Care Scores (`psofa`, `pelod`, `pelod_2`, `prism_iii`, `prism_iv`, `pim2`, `pim3`)

- **Decision needed**: whether these tools can be shown as traceable calculators in this phase.
- **Current state**: each needs high-level governance review due to prognostic implications and potential recommendation pressure.
- **Recommendation**: keep as catalog/references only until an explicit clinical governance decision documents output scope and wording constraints.

### 8B-4.2 — Pediatric RCP and Emergency Algorithms

- Tools: `pediatric_cpr`, `neonatal_cpr`, `pediatric_bradycardia`, `pediatric_tachycardia`, `shockable_rhythm_algorithm`, `non_shockable_rhythm_algorithm`, `resuscitation_weight_dose_energy`.
- **Decision needed**: define output scope for each (reference-only, educational summary, no runtime decision support).
- **Current state**: guideline-driven content and legal/clinical risk are high.
- **Recommendation**: keep non-executable by default and only expose links + concise explanatory text unless a policy is approved.

### 8B-4.3 — Growth and Nutritional Pathway (`who_growth_percentiles`, `cdc_growth_percentiles`, `bmi_percentile`, `head_circumference_percentile`)

- **Decision needed**: establish default source chain by age/region and interpolation policy.
- **Current state**: implementation requires source-to-output policy alignment to avoid mixed-framework interpretation.
- **Recommendation**: choose one policy by locale and document it before enabling `ready_for_implementation` transitions.

### 8B-4.4 — Variant Decisions Already Required

- `pews`: generic implementation is explicitly rejected; Brighton and Bedside remain separate variant entries with unresolved implementation gates.
- `wood_downes_ferres`: variant decision resolved in BRONCHIOLITIS-IMPLEMENTATION-1.
- `pediatric_gcs`: variant/age-split/table decisions remain blocking even when sources are available.
- `catch_tbi` and `chalice_tbi` stay at a policy level (predictor-classification only; no treatment recommendations).
- `bayley`, `denver_ii`, and `wong_baker_faces` continue blocked for licensing and/or testable policy reasons.
