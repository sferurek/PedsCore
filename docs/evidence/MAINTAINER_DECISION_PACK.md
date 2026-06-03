# MAINTAINER Decision Pack

Date: 2026-06-03

Scope: Block 8B-5

Goal
- Separate tools that are evidence-complete but require explicit maintainer policy/clinical governance from those blocked only by missing evidence.
- Make a clear, defensible decision path before enabling future runtime behavior.

## Wood-Downes-Ferrés

### Current blocker
- Evidence blocker: partial primary trail exists, but complete table + age cut-offs are not validated in-source.
- Variant blocker: multiple operational versions exist (classical Downes/Wood vs Ferres-modified variants).
- Licensing blocker: implementation risk until table wording/license is confirmed.
- Regulatory blocker: avoid escalation language tied to protocol decisions.
- Maintainer decision needed: exact variant and operational scope.

### Available options
- Option A: Keep as catalog/reference-only with explicit “variant pending” note.
- Option B: Implement descriptive score-only calculator after variant selection and full table verification.
- Option C: Defer pending licensing/permissions review and official textual permission.
- Option D: Do not implement pending definitive source/version confirmation.

### Recommended option
Option A now.

### Rationale
Respiratory severity score with historical variants and incomplete table traceability cannot be safely activated as an exact calculator.

### Clinical safety constraints
- Never return treatment escalation/protocol recommendations.
- Avoid therapeutic guidance tied to output thresholds.
- Avoid suggesting admission/discharge based only on the score.

### Evidence required before implementation
- Exact variant definition and pediatric age/pophology split.
- Complete scoring table and interpretation cuts.
- Exact source reference with DOI/PMID/official URL.
- Reuse/licensing review.

### Proposed implementation scope
- Reference-only initially.
- If implemented later: score-only, classification text, no workflow directives.

### Recommended PedsCore status
- keep_pending_validation

### Tests required
- Validation of 0, 1, 2 scoring bounds.
- Missing input handling and invalid range guard.
- Explicit evidence-link/traceability test.
- Prohibited wording tests for recommendations.

## Pediatric Glasgow Coma Scale

### Current blocker
- Evidence blocker: full pediatric adaptation table (age split and verbal scoring table) is not verified.
- Variant blocker: multiple pediatric versions in circulation.
- Licensing blocker: reuse rights not finalized.
- Regulatory blocker: neurologic output can be misread as prognostic certainty.
- Maintainer decision needed: version and age-dependant response map.

### Available options
- Option A: Keep as catalog/reference-only.
- Option B: Implement fixed pediatric-age model for limited age band only.
- Option C: Implement with explicit verbal-scale provenance only by age group.
- Option D: Do not implement until primary adaptation is selected.

### Recommended option
Option A until age-specific source validation is complete.

### Rationale
Conflating pediatric variants introduces avoidable interpretive risk.

### Clinical safety constraints
- No definitive outcome/prognosis.
- No admission/transfer recommendation.
- No drug or procedure recommendations.

### Evidence required before implementation
- Primary adaptation source with accessible DOI/PMID.
- Complete verbal and motor/eye item table by age.
- Explicit pediatric protocol scope.

### Proposed implementation scope
- Reference-only initially.
- If implemented later: score-only with classification text only.

### Recommended PedsCore status
- keep_pending_validation

### Tests required
- Valid score minimum/maximum for selected age band.
- Invalid/missing inputs handling.
- Output-only prose checks for forbidden wording.

## PEWS / Brighton PEWS / Bedside PEWS

### Current blocker
- Evidence blocker: source trail exists but implementation scope differs by variant.
- Variant blocker: Brighton PEWS, Bedside PEWS, institutional variants.
- Regulatory blocker: protocol escalation semantics are outside deterministic MVP scope.
- Maintainer decision needed: whether PEWS is exposed as umbrella or variant-specific entries.

### Available options
- Option A: Keep umbrella `pews` as catalog-only.
- Option B: Expose only variant-specific pages with no runtime escalation logic.
- Option C: Implement score-only output for one selected variant after maintainer approval.
- Option D: Delay until policy and hospital protocol mapping is defined.

### Recommended option
Option B.

### Rationale
Variant clarity and protocol coupling are the main blockers, not only source access.

### Clinical safety constraints
- No protocol or pathway activation.
- No CT/transfer/discharge directives.
- No automatic intervention ranking.

### Evidence required before implementation
- Exact selected variant source and table.
- Clinical context and escalation-separation policy.
- Reuse/license check for each variant.

### Proposed implementation scope
- Reference-only by default.
- If implemented later: score-only and optional educational interpretation classification.

### Recommended PedsCore status
- keep_pending_validation

### Tests required
- Variant-specific slug resolution.
- Prevented status promotion while variant undecided.
- Forbidden wording checks on result outputs.

## RCP pediátrica y neonatal / algoritmos

### Current blocker
- Evidence blocker: official guidelines are present but algorithm visuals/rules are protected content.
- Variant blocker: algorithm families differ by organization and publication cycle.
- Regulatory blocker: high therapeutic decision risk.
- Maintainer decision needed: reference-only vs strict non-therapeutic educational scope.

### Available options
- Option A: Catalog/reference-only cards with external links.
- Option B: Educational summaries of non-therapeutic context.
- Option C: Restricted calculator primitives only after clinical/legal review.
- Option D: Exclude until explicit governance for clinical decision support.

### Recommended option
Option A now.

### Rationale
Current scope is too high-risk for runtime recommendation behavior.

### Clinical safety constraints
- No treatment flow instructions.
- No rhythm-directed intervention text.
- No sepsis pathway suggestion from score output.

### Evidence required before implementation
- Final policy on output type.
- Maintainer-governed taxonomy of supported educational vs executable content.

### Proposed implementation scope
- Reference-only with links to official guidance.
- No algorithm execution in MVP.

### Recommended PedsCore status
- keep_pending_validation

### Tests required
- Ensure no `calculationStatus: active` for these tools.
- Ensure implementation status remains non-ready.
- Link integrity for evidence sources.

## Calculadora peso-dosis-energía en RCP

### Current blocker
- Regulatory blocker: dosing content overlaps treatment decisions.
- Evidence blocker: formula context and source variant separation pending.
- Maintainer decision needed: strict scope approval and allowed output level.

### Available options
- Option A: Keep as catalog/reference-only.
- Option B: Future educational calculator with explicit “non-therapeutic” framing.
- Option C: Fully executable with strict output limits and disclaimers.
- Option D: Do not implement.

### Recommended option
Option A.

### Rationale
Dosing behavior in acute care has unacceptable implicit treatment pressure in MVP.

### Clinical safety constraints
- Do not provide medication dosing recommendations.
- Do not provide energy/medication instructions.
- Do not provide procedural step guidance.

### Evidence required before implementation
- Final policy text for allowed output.
- Clear formula scope and contraindication handling.
- Legal and governance approval.

### Proposed implementation scope
- Reference-only first.
- If implemented later: non-therapeutic educational scaffold.

### Recommended PedsCore status
- keep_pending_validation

### Tests required
- Prohibit treatment wording in output schema.
- Non-implementation status assertions.

## Percentiles WHO/CDC

### Current blocker
- Variant blocker: source selection by age/location requires product policy.
- Evidence blocker: LMS data selection and interpolation policy not finalized.
- Regulatory blocker: potential interpretation mismatch across frameworks.
- Maintainer decision needed: default source strategy, age boundaries, chart percentiles, print scope, and whether the unified `who_growth_module` becomes the primary experience while source-specific tools remain catalog/reference entries.

### Available options
- Option A: Offer both as separate reference pages only.
- Option B: Activate one as default based on locale (WHO-first or CDC-first).
- Option C: Add explicit selector and maintain reproducibility metadata.
- Option D: Do not implement until policy is finalized.

### Recommended option
Option A for immediate clarity, then Option B/ C once policy is set.

### Rationale
Policy controls interpretation more than formula mechanics in this phase.

### Clinical safety constraints
- No deterministic nutritional or treatment classification.
- No age-mismatch silent coercion.

### Evidence required before implementation
- Official LMS/data files per source.
- Unit conventions and interpolation rules.
- Locale policy document.
- For the unified WHO module: verified WHO 0-5 and 5-19 LMS files, data versioning, print chart label policy, and fixture tests.
- Block WHO-GROWTH-2A located BMI-for-age 0-5 LMS data in the official WHO `anthro` repository, but import is blocked until maintainers decide whether GPL-3 data and WHO website terms are compatible with the MIT PedsCore distribution.

### Proposed implementation scope
- Catalog/reference-only.
- If implemented later: unified WHO module for WHO-only results with full provenance; CDC and Orbegozo remain separate, not mixed into the WHO module.

### Recommended PedsCore status
- keep_pending_validation

### Tests required
- Data-source and version tests.
- Locale/age boundary consistency tests.
- Tests that printable graphs show written percentile labels and the patient point.
- License-gate tests that prevent active BMI-for-age calculation until the data-source license decision is explicit.

## Orbegozo

### Current blocker
- Licensing blocker: source and data reuse terms not confirmed.
- Evidence blocker: reusable machine-readable data availability uncertain.
- Maintainer decision needed: whether to keep blocked, or provide country-specific reference notes only.

### Available options
- Option A: Catalog-only with clear provenance note.
- Option B: Implement with explicit permission/licensing clearance.
- Option C: Do not implement and keep region-specific recommendation text only.

### Recommended option
Option A.

### Rationale
License uncertainty is the principal blocker.

### Clinical safety constraints
- No silent substitute of WHO/CDC without disclosure.
- No implied interchangeability across chart systems.

### Evidence required before implementation
- Permission statement.
- Official data tables or file distribution terms.

### Proposed implementation scope
- Reference-only.

### Recommended PedsCore status
- catalog_only

### Tests required
- License/terms presence in decision references.
- Prevent readiness until permission available.

## PIM/PRISM/PELOD/pSOFA

### Current blocker
- Regulatory blocker: prognostic/mortality framing and high-risk decision context.
- Evidence blocker: complete criteria and version harmonization still pending.
- Variant blocker: model variants across populations and local calibrations.
- Maintainer decision needed: whether these stay catalog-only in MVP.

### Available options
- Option A: Catalog-only indefinitely.
- Option B: Descriptive educational summary with no risk score output.
- Option C: Enable score-only with strict non-therapeutic constraints and maintainer governance.
- Option D: Full implementation after clinical/ethics review.

### Recommended option
Option A.

### Rationale
Prognostic risk scores are highest priority for governance and output safety.

### Clinical safety constraints
- Never return mortality probabilities as directive advice.
- Never use as direct admission/discharge trigger.
- No therapeutic escalation mapping.

### Evidence required before implementation
- Exact source, version, and formula tables per score.
- Expert review of clinical context.
- Explicit governance policy for prognostic outputs.

### Proposed implementation scope
- Catalog-only with citation and scope text.

### Recommended PedsCore status
- keep_pending_validation

### Tests required
- Ensure no `implemented` status.
- Ensure status remains non-ready without explicit policy.

## Propietarias / licencia

### Current blocker
- Bayley, Denver II, STAMP, Wong-Baker Faces, and certain growth/institutional tools have open-license/permission ambiguity.
- Maintainer decision needed: keep catalog-only or exclude pending licensing.

### Available options
- Option A: Exclude from active implementation; keep reference-only with links.
- Option B: Implement once license terms allow educational reproduction.
- Option C: Redesign around alternative open tools.

### Recommended option
Option A.

### Rationale
Open implementation must be defensible and auditable; permission risk is currently unresolved.

### Clinical safety constraints
- No reproduction of protected scales without authorization.
- No derivative recommendation logic.

### Evidence required before implementation
- Valid permission text from rights holder.
- Clear reproducible scoring terms.

### Proposed implementation scope
- Catalog-only.

### Recommended PedsCore status
- catalog_only / do_not_implement

### Tests required
- Maintain non-ready status for all proprietary entries.
- Source permission fields present when added.

## Dolor con tabla compleja / copyright

### Current blocker
- CHEOPS, CRIES and rFLACC require source-verified item scoring; some have licensing ambiguity.
- CHEOPS source remains incomplete in primary traceability.
- Several variants and format details remain unresolved.

### Available options
- Option A: Keep as catalog/reference-only until table and permission are traceable.
- Option B: Implement only once exact item table, scoring, and interpretation are verified.
- Option C: Use non-calculating educational placeholders.

### Recommended option
Option A with documentation hardening.

### Rationale
Pain scales can drift toward therapeutic interpretation pressure.

### Clinical safety constraints
- No treatment recommendation based on score.
- No admission/discharge assertions.
- No analgesic dosing implication.

### Evidence required before implementation
- Exact operational format and source table.
- Permission/licensing clarity.
- Defined interpretation bands.

### Proposed implementation scope
- Reference-only with explicit pending-validation note.

### Recommended PedsCore status
- keep_pending_validation

### Tests required
- Tool output absence until table complete.
- Prohibited wording checks (analgesia, sedation, treatment).

## Recommended decision pack sections map

| Tool / Family | Section in this pack |
|---|---|
| `wood_downes_ferres` | **Wood-Downes-Ferrés** |
| `pediatric_gcs` | **Pediatric Glasgow Coma Scale** |
| `pews` family (`pews`, `brighton_pews`, `bedside_pews`) | **PEWS / Brighton PEWS / Bedside PEWS** |
| `pediatric_cpr`, `neonatal_cpr`, `pediatric_bradycardia`, `pediatric_tachycardia`, `shockable_rhythm_algorithm`, `non_shockable_rhythm_algorithm` | **RCP pediátrica y neonatal / algoritmos** |
| `resuscitation_weight_dose_energy` | **Calculadora peso-dosis-energía en RCP** |
| `who_growth_module`, `who_growth_percentiles`, `cdc_growth_percentiles` | **WHO/CDC percentiles** |
| `orbegozo_growth_percentiles` | **Orbegozo** |
| `psofa`, `pelod`, `pelod_2`, `prism_iii`, `prism_iv`, `pim2`, `pim3` | **PIM/PRISM/PELOD/pSOFA** |
| proprietary / copyright family (`bayley`, `denver_ii`, `wong_baker_faces`, `stamp`) | **Propietarias / licencia** |
| pain complexity family (`cheops`, `cries`, `rflacc`) | **Dolor con tabla compleja / copyright** |
