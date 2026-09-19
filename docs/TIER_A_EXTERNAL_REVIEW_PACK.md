# Tier A External Clinical Review Pack

Updated: 19 September 2026.

## Purpose

This document is the handoff pack for an **independent pediatric clinical reviewer**. It is intentionally separate from the AI-assisted clinical-technical audit already completed by the project.

The reviewer is not being asked to audit TypeScript, GitHub Actions, SEO, or software architecture. The task is to verify that each clinical surface faithfully represents the cited clinical source and that its visible wording, eligibility criteria, inputs, units, thresholds, output and limitations are clinically correct.

## Frozen version to review

Review this exact PedsCore state unless a later review-specific SHA is explicitly agreed:

- Production/review baseline: `a15d8a514b7b8345fabd010a3f5b13487f3ee4ec`
- Tier A remediation merge: `0fdc57f223b66222a6e373c409ba79745fabae83`
- Tier A dedicated reference/boundary test merge: `64b0dbc4cc0c7ae695536ae02006a049eb1bd059`
- AI-assisted audit report: `docs/TIER_A_AI_CLINICAL_AUDIT_2026-09-19.md`

Production site: https://peds-core.vercel.app/

The reviewer should record the exact commit reviewed in every submitted review.

## Reviewer instructions

For each tool:

1. Open the PedsCore clinical page and its visible references.
2. Identify the exact source/version/variant being implemented.
3. Compare PedsCore against the primary paper, guideline or authoritative source.
4. Check every item in the checklist below.
5. Do **not** use identifiable or real patient information in GitHub.
6. Record one outcome:
   - `reviewed_no_change`
   - `reviewed_minor_correction`
   - `reviewed_logic_change`
   - `review_blocked_source`
   - `review_blocked_rights`
7. Submit one GitHub **Clinical review** issue per tool using the repository template.

A tool is not considered independently reviewed merely because no problem is obvious. The checklist and outcome must be documented.

## Mandatory checklist for every tool

- [ ] Exact instrument/version/variant verified
- [ ] Intended population verified
- [ ] Inclusion criteria verified
- [ ] Exclusions verified
- [ ] Inputs verified
- [ ] Units verified
- [ ] Formula/table/branching logic verified
- [ ] Inclusive/exclusive cut points verified
- [ ] Missing-data behaviour verified
- [ ] Output/classification wording verified
- [ ] Interpretation bands verified where applicable
- [ ] Primary/authoritative source match verified
- [ ] ES terminology checked
- [ ] EN terminology checked
- [ ] No unsupported management recommendation added
- [ ] At least one ordinary/reference fixture checked manually
- [ ] At least one boundary fixture checked manually

## Tier A review set

| # | Tool | Tool ID | Highest-priority review focus |
|---|---|---|---|
| 1 | PRISM IV | `prism_iv` | sampling window, special cardiac timing, age coefficients, physiologic cut points, mortality equation |
| 2 | PELOD-2 | `pelod_2` | 10 variables, age-dependent MAP/creatinine thresholds, score and logistic mortality transformation |
| 3 | PIM3 | `pim3` | unknown-value conventions, oxygen term, procedure/diagnosis coefficients, mortality equation |
| 4 | pSOFA | `psofa` | age-specific MAP/creatinine, P/F and S/F scoring, vasoactive thresholds, six-organ total |
| 5 | Phoenix Sepsis | `phoenix_sepsis` | eligibility/exclusions, S/F only when SpO2 <=97%, missing variables, sepsis/shock definitions |
| 6 | Step-by-Step | `step_by_step` | <=90-day population, sequential high/intermediate/low-risk branching and biomarker cut points |
| 7 | PECARN Febrile Infant | `pecarn_febrile_infant` | <=60-day eligibility/exclusions, urinalysis definition, ANC and PCT thresholds |
| 8 | PECARN TBI <2 y | `pecarn_tbi_under_2` | <2-year branch, eligibility/exclusions, severe-mechanism definition, predictor wording |
| 9 | PECARN TBI >=2 y | `pecarn_tbi_2_or_more` | >=2-year branch, eligibility/exclusions, severe-mechanism definition, predictor wording |
| 10 | CATCH | `catch_tbi` | entry population, exclusions, high/medium-risk predictors, dangerous-mechanism definition |
| 11 | CHALICE | `chalice_tbi` | <16-year population, complete predictor set, >40 mph/>64 km/h mechanism definition |
| 12 | pRIFLE | `prifle` | eCCl reduction, urine-output durations, Loss >28 d and End-stage >90 d |
| 13 | Pediatric KDIGO | `kdigo_pediatric` | creatinine timing, urine-output durations, pediatric eGFR <35 criterion, worst-stage rule |
| 14 | nSOFA | `nsofa` | respiratory S/F bands, cardiovascular combinations, platelet thresholds |
| 15 | SNAPPE-II | `snappii` | first-12-hour worst values, PaO2/FiO2-percent convention, missing-variable behaviour, total |

## Tool review record

Copy this block into the GitHub Clinical review issue if useful.

### Identification

- Tool:
- Tool ID:
- Reviewer name:
- Professional role/specialty:
- Institution/organisation (optional):
- Date:
- PedsCore commit reviewed:
- Primary/authoritative sources checked:

### Findings

- Exact version/variant:
- Population/exclusions:
- Inputs/units:
- Logic/formula:
- Boundary conditions:
- Missing-data handling:
- Output/interpretation:
- ES wording:
- EN wording:
- Rights/reuse observations:
- Other limitations:

### Manual fixtures

**Reference fixture**
- Inputs:
- Expected result from source:
- PedsCore result:
- Concordant: yes / no

**Boundary fixture**
- Boundary tested:
- Inputs:
- Expected result from source:
- PedsCore result:
- Concordant: yes / no

### Outcome

Choose exactly one:

- [ ] `reviewed_no_change`
- [ ] `reviewed_minor_correction`
- [ ] `reviewed_logic_change`
- [ ] `review_blocked_source`
- [ ] `review_blocked_rights`

### Reviewer statement

> I reviewed the PedsCore implementation identified above against the sources listed above. This review concerns clinical fidelity of that implementation and does not constitute certification, regulatory approval, or a guarantee of clinical outcome.

## How PedsCore will process findings

- `reviewed_no_change`: register reviewer/date/commit and mark independent review as completed for that version.
- `reviewed_minor_correction`: dedicated correction PR, tests if relevant, reviewer confirms resolution.
- `reviewed_logic_change`: dedicated clinical PR, source citation, new/updated fixtures, full CI/governance/SEO run, reviewer reconfirms.
- `review_blocked_source`: no independent-validation claim until the source issue is resolved.
- `review_blocked_rights`: no local reproduction/implementation beyond permitted use.

Any later clinical-logic change invalidates the reviewed implementation version until the affected logic is reviewed again.

## What the reviewer does not need to review

The following have already been separately checked by the project and are not substitutes for the independent review:

- deterministic test suite;
- Tier A AI-assisted clinical-technical audit;
- governance invariants;
- rights-state enforcement;
- build/CI;
- SEO and routing;
- analytics privacy allowlist.

The independent reviewer should concentrate on **clinical fidelity**.
