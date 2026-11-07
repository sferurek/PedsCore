# Local-only GCS input contract follow-up — 7 November 2026

**Not pushed, no PR, no deployment.** Prepared after the Devpost/Alexa uncertainty notice, only in the separate local branch `audit/gcs-input-contract-local-20261107`. Do not publish or modify linked submission materials until the coordinator clarifies their scope. Parent #184 and the other public drafts remain unchanged.

## Finding and source boundary

With otherwise complete synthetic inputs, PRISM IV, PELOD-2, pSOFA and Phoenix accept GCS 7.5 and return a numeric result. Their catalog GCS fields already state range 3–15 and step 1. The web's numeric completion check does not itself enforce step, so its step attribute alone does not establish an engine guarantee.

The [GCS project's official description](https://www.glasgowcomascale.org/what-is-gcs/) lists the categorical eye/verbal/motor responses and the derived 3–15 score. Its [official self-test answers](https://www.glasgowcomascale.org/self-test-answers/) specify 4/5/6 component steps and distinguish not-testable responses. An integer total follows from adding those discrete component points; that is the basis of this input-contract check. This is not a revalidation of the four downstream models or an independent clinician sign-off. It does not substitute GCS-P, invent pediatric response descriptors or impute an unassessable component.

## Local correction

Extend each existing invalid-range condition to reject a fractional supplied GCS. No rounding, truncation or silent coercion is added. Existing integer 3–15 values, finite whole-number strings, thresholds, weights, prognosis equations, population rules and warning identifiers are retained. Phoenix still permits genuinely unmeasured optional GCS; required missing GCS in the other models still blocks calculation. Existing NT handling is retained rather than assigning it a numeric score.

No generic step enforcement is added: other numeric clinical measurements can legitimately be continuous. Only the four already-declared GCS total fields are covered. Other rules using GCS or initial GCS remain a separate audit scope.

## Verification

Baseline is #184 final commit `efd6450dba56bc74d46fc96243c25703642355cb`. Eleven regression cases were run before the guard: four fractional-input cases failed and seven preservation cases passed. Afterward all pass. The negative groups exercise five fractional numeric/string values in each model, without rounding.

Fifty-two baseline outputs cover every integer 3–15 across the four models and preserve score, estimated probability where present, classification, interpretation ID and warning IDs. These are software behavior-preservation fixtures, **not independently validated clinical reference results**. Finite integer strings, out-of-range values, NT and missing optional/required behavior are checked separately. Four local MCP cases ensure the guard also blocks numeric results at the protocol boundary.

Full local core/web/API, build-gate, lint, TypeScript and MCP results are recorded in the private night report. No full production web build is needed for this source-contract patch, and none is run locally. No GitHub CI is triggered because nothing is pushed. The original combined #183/#184/#185 snapshot is preserved separately; it does not contain this local-only addition.

## Remaining review

Named clinical/source review and the Devpost material-scope decision precede any publication/release. No evidence/rights classification, clinical-review registry, scoring threshold or availability flag changes. The branch also lacks the security stack from #183 and is not a deployment candidate by itself. Any future integration must preserve that stack and reconcile deployment guards explicitly.
