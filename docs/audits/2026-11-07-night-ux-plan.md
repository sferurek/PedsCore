# Night sprint UX implementation brief

## 1. UX Brief
Clinicians entering sequential ES/EN calculator data need an honest completion state and a usable keyboard route. Fix technical input validation and focus continuity without changing clinical algorithms, cutoffs or metadata ranges. Reconcile the already-reviewed pending patches in an isolated candidate; do not merge source PRs or deploy.

## 2. UX States Matrix

| State | Trigger | UI response | Recovery/next action |
| --- | --- | --- | --- |
| Loading | Existing route loading | Existing route behavior retained | Wait for route |
| Empty | New/reset form | First question open; no premature error | Enter required value |
| Error (recoverable) | Continue with missing/invalid required value | Keep question open, announce associated error | Correct value |
| Error (fatal) | Existing route/calculation failure | Existing fallback retained | Existing recovery |
| Success | Valid answer; final answer | Advance with focus on next question; final focus on result | Continue/read result |
| Disabled/pending | Reference-only tool | Existing no-active-form notice | Read sources |
| Partial/degraded | Adaptive questions become hidden | Clear hidden values, skip irrelevant questions | Continue visible questions |

## 3. Visual Direction
Reuse existing accordion, focus ring, spacing, error and clinical tag styles. No new animation or dependency. Deduplicate repeated tag labels while preserving order.

## 4. Component Contracts
Keep existing DynamicForm/ResultPanel/ToolPage props and calculator APIs. Scope pending focus to explicit completion actions; no focus on initial load, typing, manual accordion toggle or reset. Add a stable trigger/panel relationship for assistive technology. Result panel is programmatically focusable without joining the Tab sequence.

## 5. File Plan
Edit DynamicForm, ToolPage, ResultPanel, ToolClinicalGuide, formState and focused regressions. Clinical source algorithms and scoring thresholds remain untouched. Existing PRs #178–#182 are carried into this candidate, not reimplemented; vercel.json resolves their branch guards with all previews disabled.

## 6. Implementation
Required numeric completion must reject non-finite values and partially parsed text. Error copy identifies numeric correction instead of claiming every error is missing data. Preserve explicit zero, decimal/scientific values and catalog bounds. Keep current optional-field semantics; wider clinical validation is a separate review.

Mobile QA found that a long clinical unit inherited the 3rem numeric type size and broke over three lines (77.4 mL/min/1.73 m2). Keep the numeric value prominent and show its complete unit as a smaller separate line in the same hero. Preserve unit text, accessible reading order and clipboard data. No numerical or unit conversion changes.

## 7. Verification
Run focused and combined tests, lint and TypeScript checks; CI does the necessary full production build once. Verify ES/EN keyboard path, empty/error/success/reset/adaptive states and small/medium/large viewports in a local dev server. Record exact candidate SHA and CI links.

## 8. PR Summary
Prepare a draft integration candidate with source PR provenance and test evidence. No independent clinical validation, production release or ranking improvement is implied. Unresolved dependency/source-review limitations remain documented.
