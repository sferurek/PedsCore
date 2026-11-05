# Five priority tools: technical and clinical-source desk review

Date: 2026-11-05. Reviewer: Codex (AI software agent), technical/source desk review only; no clinician identity or independent clinical sign-off is claimed. Clinical algorithm baseline: `f8537dd211c9d2b61e54834f4669be5f2ad50345`. The five tools follow the first five entries of `CLINICAL_REVIEW_PROGRAM.md`; the original linked chat's assistant responses could not be loaded, so this selection is an explicit assumption.

No formula, threshold, population, instrument version, reuse classification, clinical-review registry, or evidence level is changed by this sprint. Generic bilingual validation copy is clarified; model score/probability display is corrected. The records below do not replace the formal review outcomes in the clinical review program.

## PRISM IV — technical review complete, clinical sign-off pending

Files: `packages/core/src/calculators/criticalCareScores.ts`, `packages/core/tests/prism4.test.ts`.

Compared the mortality equation coefficients and collection-window context with [Pollack et al., Table 3 and Methods](https://pmc.ncbi.nlm.nih.gov/articles/PMC5048467/). The published model concerns the first PICU admission and has special cardiac sampling rules. The zero-subscore reference returns score 0 and mortality 0.31%; fixtures also cover age coefficients, blood pressure, neurologic thresholds and the cardiac confirmation gate. The web formerly rendered `0 %` for the score and hid mortality; presentation now keeps score and mortality separate, including copied text.

Remaining: independent verification of all physiologic tables; month/year conversion and exact cardiac-window applicability require clinician/source reconciliation. Tests passing do not certify those choices. The article states the prediction algorithm is public domain; this review makes no broader rights determination for tables or third-party material.

## PELOD-2 — technical review complete, primary-source check incomplete

Files: `criticalCareScores.ts`, `pelod2.test.ts`. Existing fixtures cover zero-score mortality (0.13%), GCS/lactate, age-specific MAP/creatinine, respiratory and hematologic cut points. Input units are explicit (creatinine μmol/L, gas pressures mmHg, FiO2 fraction). Missing or invalid required values are blocked. The shared score/probability presentation correction applies here too.

The catalog currently relies on [an external study](https://pmc.ncbi.nlm.nih.gov/articles/PMC9651518/) and [a practical review](https://pmc.ncbi.nlm.nih.gov/articles/PMC11554295/) for tables/equation. Those existing references were inventoried, not newly certified. Attempted access to [Leteurtre et al.'s daily PELOD-2 study](https://pmc.ncbi.nlm.nih.gov/articles/PMC4570178/) returned a browser challenge. No challenge was bypassed. Full primary-table and licensing reconciliation remains blocked; no `reviewed_no_change` clinical outcome is assigned.

## PIM3 — equation checked, direct-call enum defect remains open

Files: `criticalCareScores.ts`, `pim3.test.ts`. Compared code coefficients and first-hour context with the formula in [Lee et al., Methods](https://pmc.ncbi.nlm.nih.gov/articles/PMC5220006/), a primary external-validation study reproducing the model. Existing fixtures return 1.22% for the unknown-physiology reference and 98.21% for a high-risk example, and check procedure/diagnosis coefficient directions.

Reproduction against the baseline: call `pim3Calculator.calculate` with `both_pupils_fixed:false`, `elective_admission:false`, `mechanical_ventilation_first_hour:false`, `base_excess_unknown:true`, `sbp_unknown:true`, `oxygenation_unknown:true`, `procedure_category:"INVALID"`, `diagnosis_risk_group:"INVALID"`. It returns 1.22% instead of rejecting the unknown categories. Controlled web selects normally prevent these values; direct engine/API callers need separate validation. A dedicated clinical-engine PR must reject unsupported enums, cite the coding source and add positive/negative fixtures before changing behavior. No silent clinical fix is included here. Original derivation/coding and reuse review remain outstanding.

## pSOFA — technical review complete, source ambiguities recorded

Files: `calculators/psofa.ts`, `psofa.test.ts`. Compared six-organ structure and age-dependent MAP/renal ranges against [Matics and Sanchez-Pinto, Table 1 and Methods](https://jamanetwork.com/journals/jamapediatrics/fullarticle/2646857). Existing fixtures cover normal total 0/24, oxygen-ratio boundaries, vasoactive, GCS and renal transitions. The source includes a >216-month row, so that branch is not by itself evidence of an implementation error.

Remaining: the rendered source table overlaps S/F 264 and prints bilirubin >12 while code uses ≥12. Reconcile original table image/supplement before proposing threshold changes. Source methodology treats unmeasured values as normal; this engine blocks missing required inputs. Document that stricter workflow with an independent clinician rather than treating the implementations as interchangeable. No diagnostic/treatment recommendation is added, and the registry remains unchanged.

## Phoenix — targeted source and technical review complete, independent review pending

Files: `calculators/phoenixSepsis.ts`, `tierAClinicalRemediation.test.ts`, `localCalculatorReconciliation.test.ts`. Compared four-organ structure, age exclusions, infection requirement and sepsis/shock thresholds with the [2024 consensus table and concepts](https://jamanetwork.com/journals/jama/fullarticle/2814297). Existing tests check S/F eligibility around SpO2 97%, inferred respiratory support with IMV and excluded neonatal populations. Code labels partial-data output as a minimum and preserves the non-screening warning.

Remaining: expand exhaustive organ-domain boundary fixtures and have a named clinician verify the table footnotes, partial-data semantics and ES/EN wording. This targeted check does not certify all combinations or independent clinical validation. Publication requires the existing review program, not an AI-generated endorsement.

## Review boundary

All five source records retain their existing evidence/rights classifications. Public-source access is not permission to reproduce protected tables. No real patient data were used. A qualified reviewer must record identity, role, commit, exact sources, rights decision and outcome using the existing clinical-review template before independent validation can be claimed. Algorithm corrections require their own PR and full change-control checks.
