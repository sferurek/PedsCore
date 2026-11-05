# PIM3 category validation follow-up — 2026-11-05

Reviewer: Codex, AI technical review; no independent clinical sign-off. Baseline `f8537dd`. Dedicated follow-up to the PIM3 finding documented in the sprint desk review (#170).

The engine previously accepted arbitrary strings for `procedure_category` and `diagnosis_risk_group`. Unknown strings fell through to zero coefficients, producing the same result as the reference categories (1.22% for the existing unknown-physiology fixture). Controlled web selects prevent most such input, but direct engine/API calls could bypass them.

Reject unknown category strings with `invalid_pim3_categories`, no score/probability and an empty trace. Accept only the existing catalog's procedure/diagnostic-risk IDs. No coefficient, formula, threshold, physiological input, missing-value default, valid category or evidence/review status changes. The coding/formula context is documented in [Lee et al., Methods](https://pmc.ncbi.nlm.nih.gov/articles/PMC5220006/); this guard does not reinterpret clinical categories.

Tests include unknown, empty and incorrectly cased strings; every current catalogued category combination remains accepted. Existing reference outputs 1.22% and 98.21% and coefficient-direction fixtures remain unchanged. Companion PRISM IV and PELOD-2 suites cover the shared source module.

Release boundary: draft, no merge/deployment authorization. Branch-specific `git.deploymentEnabled` prevents automatic previews. Necessary CI must pass the complete test/build/governance/SEO workflow. Independent clinical and rights review of PIM3 remains pending under `CLINICAL_REVIEW_PROGRAM.md`; this validation fix does not grant product clinical validation. Reconcile branch-disable maps when integrating the independent sprint PRs.
