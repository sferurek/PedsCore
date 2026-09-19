# Tier A AI-assisted Clinical Technical Audit

**Project:** PedsCore  
**Audit date:** 19 September 2026  
**Repository baseline:** `main` at `297921191584b41b2428478ada77b46ed7bb43da`  
**Scope:** 15 Tier A local-active tools defined in `docs/CLINICAL_REVIEW_PROGRAM.md`  
**Audit type:** AI-assisted clinical technical audit  
**Not equivalent to:** independent external clinical review, regulatory validation, certification, or medical-device verification.

## Executive summary

The Tier A review found **no evidence of wholesale corruption of the local clinical engine**, and most published scoring formulas/thresholds inspected are materially consistent with their cited source definitions. However, Tier A **does not pass as a group yet**.

The audit identified:

- **1 definite scoring/application defect requiring prompt remediation:** Phoenix Sepsis uses the SpO₂/FiO₂ branch without enforcing the published SpO₂ ≤97% condition.
- **Several major applicability gaps:** PECARN TBI and CATCH can currently be applied without enforcing the derivation population and operational mechanism definitions.
- **Several moderate fidelity/usability gaps:** CHALICE population/mechanism gating, pRIFLE chronic-duration representation, SNAPPE-II oxygenation input/missing-data behavior, and PRISM IV collection-window constraints.
- **Substantial test-depth debt:** several critical calculators are registered as tested but lack dedicated boundary/regression tests for the actual formula.
- **A repository quality failure was discovered:** GitHub Actions CI on current `main` has been failing at the test step because stale FLACC assertions remained after FLACC was correctly removed from the local registry. This audit PR removes only that obsolete test residue; no Tier A clinical algorithm is silently changed in the audit PR.

### Audit disposition

| Tool | Formula / criteria | Population & applicability | Test depth | Audit disposition |
|---|---|---|---|---|
| PRISM IV | Verified against published model | Timing/special cardiac collection rules need stronger operational guardrails | Insufficient | **Verified with conditions** |
| PELOD-2 | Verified | Population-level calibration caveat appropriate | Insufficient | **Verified with conditions** |
| PIM3 | Verified | Admission/first-contact framing appropriate | Insufficient | **Verified with conditions** |
| pSOFA | Verified | Context framing appropriate | Insufficient boundaries | **Verified with conditions** |
| Phoenix Sepsis | **Defect found** | **Eligibility gaps** | Insufficient | **Remediation required** |
| Step-by-Step | Verified | Minor eligibility wording enhancement | Good | **Pass with minor documentation action** |
| PECARN Febrile Infant | Verified | Minor urinalysis-definition enhancement | Good | **Pass with minor documentation action** |
| PECARN TBI <2 y | Predictors correct | **Major eligibility/mechanism gap** | Predictor tests only | **Remediation required** |
| PECARN TBI ≥2 y | Predictors correct | **Major eligibility/mechanism gap** | Predictor tests only | **Remediation required** |
| CATCH | Criteria correct | **Major eligibility/mechanism gap** | Predictor tests only | **Remediation required** |
| CHALICE | Criteria correct | Age/mechanism definitions should be operationalized | Predictor tests only | **Verified with remediation recommended** |
| pRIFLE | Acute R/I/F logic verified | Chronic duration representation needs refinement | Insufficient | **Verified with conditions** |
| Pediatric KDIGO 2012 | Verified | Version/current-guideline framing correct | Insufficient | **Verified with conditions** |
| nSOFA | Verified | Original VLBW/late-onset-sepsis context appropriately warned | Insufficient | **Verified with conditions** |
| SNAPPE-II | Verified | Oxygenation input convention and missing-data behavior need refinement | Moderate | **Verified with conditions** |

## Severity definitions

- **Blocker:** repository or clinical behavior prevents reliable review/release.
- **Major:** can materially misclassify a patient because of incorrect scoring or application outside the validated population.
- **Moderate:** meaningful fidelity, usability, timing, or operational-definition issue that should be corrected before formal human sign-off.
- **Minor:** wording, documentation, or test-coverage enhancement without identified scoring error.

---

# 1. PRISM IV

**Implementation:** `packages/core/src/calculators/criticalCareScores.ts`  
**Primary source:** Pollack MM et al. *The Pediatric Risk of Mortality Score: Update 2015.* Pediatr Crit Care Med. 2016;17(1):2-9. DOI: 10.1097/PCC.0000000000000558.  
Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC5048467/

## Verified

The implementation uses the published PRISM IV mortality model structure:

- age categories;
- admission source;
- CPR within 24 h;
- cancer;
- low-risk primary system;
- neurologic PRISM component;
- non-neurologic PRISM component;
- final logistic probability.

The code's final regression coefficients match the published PRISM IV model. The catalog also exposes the expected physiologic variables and age-dependent handling.

## Finding TA-PRISM-01 — Moderate

PRISM IV is not merely a static list of worst physiologic values. The published model has defined data-collection windows and special timing rules around selected cardiac surgical/interventional admissions. The current UI accepts extrema directly and warns about collection windows, but does not enforce or model those timing rules.

**Action before human sign-off:** strengthen the form-level eligibility/timing guidance and consider an explicit confirmation that values were collected within the PRISM IV window. For cardiac intervention cases, either implement the special collection rule or clearly direct the user to the source definition.

## Finding TA-PRISM-02 — Major test-depth debt

There is no dedicated PRISM IV test suite that checks coefficient paths and physiologic boundary transitions. Current repository mapping points to a generic unlock test that does not exercise the PRISM IV formula.

**Required tests:** normal profile, each age boundary, admission-source coefficients, neurologic/non-neurologic separation, threshold equality behavior, and at least one independently calculated reference case.

**Disposition:** Verified with conditions; do not mark externally reviewed until timing behavior and dedicated tests are reviewed.

---

# 2. PELOD-2

**Implementation:** `criticalCareScores.ts`  
**Primary source:** Leteurtre S et al. *PELOD-2: an update of the PEdiatric logistic organ dysfunction score.* Crit Care Med. 2013;41(7):1761-1773. PMID 23685639. DOI 10.1097/CCM.0b013e31828a2bbd.  
Source: https://pubmed.ncbi.nlm.nih.gov/23685639/

## Verified

The ten-variable implementation reproduces the expected organ domains and published point structure:

- neurologic: GCS and pupils;
- cardiovascular: lactate and age-specific MAP;
- renal: age-specific creatinine;
- respiratory: PaO₂/FiO₂, PaCO₂, invasive ventilation;
- hematologic: WBC and platelets.

The 0–33 total and logistic mortality transformation implemented in PedsCore are consistent with the published model representation reviewed for this audit.

## Finding TA-PELOD-01 — Minor/Moderate

The mortality probability is a population-level model output whose calibration may vary across settings and eras. PedsCore already includes a strong warning against individual prognostic interpretation, which is appropriate.

## Finding TA-PELOD-02 — Major test-depth debt

No dedicated boundary suite currently validates the age-specific MAP/creatinine transitions, P/F threshold, PaCO₂ bands, hematologic bands, and mortality logistic output.

**Disposition:** Formula verified; add dedicated boundary/reference tests before human external sign-off.

---

# 3. PIM3

**Implementation:** `criticalCareScores.ts`  
**Development model:** Straney L et al. Pediatric Index of Mortality 3 (PIM3), Pediatr Crit Care Med. 2013.  
Independent open formula reproduction used for audit: https://pmc.ncbi.nlm.nih.gov/articles/PMC5220006/

## Verified

The implemented regression matches the published PIM3 equation:

- fixed pupils;
- elective admission;
- mechanical ventilation;
- absolute base excess;
- SBP and quadratic SBP term;
- `100 × FiO₂ / PaO₂`;
- procedure coefficients;
- low/high/very-high-risk diagnosis groups;
- intercept.

The catalog correctly displays the diagnostic groups and PIM3 defaults for unavailable variables, including base excess 0, SBP 120, and oxygenation term 0.23.

## Finding TA-PIM3-01 — Minor

The warning should remain explicit that variables are defined at the first PICU contact/within the PIM3 admission window; PedsCore already substantially does this.

## Finding TA-PIM3-02 — Major test-depth debt

No dedicated numerical regression suite exists for the complete formula. At least one hand-calculated published/reference profile and every categorical coefficient should be tested.

**Disposition:** Formula verified with test remediation required.

---

# 4. pSOFA (Matics/Sanchez-Pinto)

**Implementation:** `packages/core/src/calculators/psofa.ts`  
**Primary source:** Matics TJ, Sanchez-Pinto LN. JAMA Pediatr. 2017;171(10):e172352. DOI 10.1001/jamapediatrics.2017.2352.  
Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/

## Verified

Reviewed components match the published pediatric adaptation:

- P/F and S/F respiratory thresholds;
- platelet bands;
- bilirubin bands;
- age-adjusted MAP;
- dopamine/dobutamine/epinephrine/norepinephrine bands;
- GCS bands;
- age-adjusted creatinine bands.

The maximum score of 24 is correct.

## Finding TA-pSOFA-01 — Moderate test-depth debt

The current test verifies a normal zero profile but does not systematically test every organ-system boundary, age transition, or vasoactive combination.

**Disposition:** Formula verified; expand boundary testing.

---

# 5. Phoenix Sepsis Score / Phoenix Sepsis Criteria

**Implementation:** `packages/core/src/calculators/phoenixSepsis.ts`  
**Consensus source:** Schlapbach LJ, Watson RS, Sorce LR, et al. JAMA. 2024;331(8):665-674. DOI 10.1001/jama.2024.0179.  
https://jamanetwork.com/journals/jama/fullarticle/2814297  
**Development/validation source:** Sanchez-Pinto LN et al. JAMA. 2024;331(8):675-686. DOI 10.1001/jama.2024.0196.  
https://jamanetwork.com/journals/jama/fullarticle/2814296

## Verified

The overall structure is correct:

- 4 organ systems;
- total score 0–13;
- suspected infection + score ≥2 for sepsis;
- cardiovascular subscore ≥1 among sepsis cases for septic shock;
- age-specific MAP thresholds;
- vasoactive/lactate/coagulation/neurologic structure.

## Finding TA-PHX-01 — **Major, definite scoring defect**

The published Phoenix respiratory score specifies that the **SpO₂/FiO₂ ratio is used only when SpO₂ is ≤97%**. The current implementation calculates and scores S/F for any entered SpO₂.

This can create respiratory points from an S/F ratio in a range where the Phoenix definition does not permit S/F scoring.

**Required correction:** if SpO₂ >97%, do not use the S/F branch. Use P/F if available; otherwise the S/F-derived respiratory contribution must not be generated.

## Finding TA-PHX-02 — **Major eligibility gap**

The Phoenix criteria apply to children younger than 18 years but exclude:

- birth hospitalizations before discharge;
- children with postconceptional age <37 weeks.

The current form checks chronological age but has no explicit gate for these exclusions.

**Required correction:** add birth-hospitalization and postconceptional-age eligibility fields/gates or an equivalent explicit workflow.

## Finding TA-PHX-03 — Moderate fidelity gap

Phoenix was deliberately designed to function with unavailable variables; unmeasured components need not make the whole score incalculable. The current PedsCore calculator requires nearly every component, including coagulation tests.

This is conservative—it avoids silently assigning a low score—but it is not faithful to the intended missing-data operation and undermines the low-resource design.

**Required correction:** implement source-consistent handling of unavailable values, explicitly distinguishing “not measured” from a measured normal value.

## Finding TA-PHX-04 — Moderate consistency gap

`invasive_mechanical_ventilation` and `any_respiratory_support` are independent booleans. IMV necessarily implies respiratory support. The engine should derive support from IMV or reject contradictory inputs.

## Finding TA-PHX-05 — Major test-depth debt

No dedicated Phoenix scoring suite currently tests respiratory, cardiovascular, coagulation, neurologic, age, missing-data, or eligibility boundaries.

**Disposition:** **Remediation required before Tier A human sign-off.**

---

# 6. Step-by-Step febrile infant approach

**Implementation:** `packages/core/src/calculators/stepByStep.ts`  
**Validation source:** Gomez B et al. Pediatrics. 2016;138(2):e20154381. PMID 27382134. DOI 10.1542/peds.2015-4381.  
https://pubmed.ncbi.nlm.nih.gov/27382134/

## Verified

The sequential implementation matches the reviewed definition:

High risk if any of:
- ill appearing;
- age ≤21 days;
- leukocyturia;
- PCT ≥0.5 ng/mL.

If none are present, intermediate risk if:
- CRP >20 mg/L; or
- ANC >10,000/mm³.

Otherwise low risk.

Tests correctly cover the important equality boundaries (21 days, PCT 0.5, CRP 20, ANC 10,000) and priority of high-risk criteria.

## Finding TA-SBS-01 — Minor

The operational meaning of “fever without source” should explicitly reflect the validated population/exclusions; in particular, respiratory signs/symptoms and other focal sources should not be hidden behind an ambiguous single checkbox.

**Disposition:** Pass with minor documentation/form enhancement.

---

# 7. PECARN febrile infant low-risk rule

**Implementation:** `infectionOpen.ts`  
**Primary source:** Kuppermann N et al. JAMA Pediatr. 2019;173(4):342-351. PMID 30776077. DOI 10.1001/jamapediatrics.2018.5501.  
https://pubmed.ncbi.nlm.nih.gov/30776077/

## Verified

The primary derived/validated low-risk rule is correctly implemented:

- negative urinalysis;
- ANC ≤4,090/mm³;
- procalcitonin ≤1.71 ng/mL;

within the published eligibility framework.

Tests explicitly verify exact thresholds 4090 and 1.71 and failure immediately above each threshold.

## Finding TA-PECARN-FI-01 — Minor

“Urinalysis negative” should be operationally defined in the form/help text according to the source definition rather than left to local interpretation.

## Finding TA-PECARN-FI-02 — Minor

The result should consistently be described as the 2019 PECARN serious-bacterial-infection low-risk rule and should not be silently relabeled as a broader management protocol.

PedsCore currently avoids converting it into LP/antibiotic/admission/discharge instructions, which is appropriate.

**Disposition:** Pass with minor documentation enhancement.

---

# 8–9. PECARN traumatic brain injury rules (<2 y and ≥2 y)

**Implementation:** `packages/core/src/calculators/pecarn.ts`  
**Original rule:** Kuppermann N et al. Lancet. 2009;374:1160-1170.  
A recent multicenter validation and open rule representation used in this audit: https://pmc.ncbi.nlm.nih.gov/articles/PMC13525905/

## Verified

The six predictor sets are correctly separated by age.

### <2 years

Higher-risk:
- altered mental status / GCS <15;
- palpable skull fracture.

Intermediate predictors:
- non-frontal scalp hematoma;
- LOC ≥5 seconds;
- severe mechanism;
- not acting normally according to parent/guardian.

### ≥2 years

Higher-risk:
- altered mental status / GCS <15;
- signs of basilar skull fracture.

Intermediate predictors:
- any LOC;
- vomiting;
- severe mechanism;
- severe headache.

## Finding TA-PECARN-TBI-01 — **Major eligibility gap**

The current calculators do not collect or enforce the rule's basic application population, including:

- correct age branch;
- blunt, non-trivial head trauma;
- presentation within 24 hours;
- GCS 14–15;
- relevant exclusions used in derivation/validation.

A user can therefore select the wrong age rule or apply it outside the intended population while still receiving a risk classification.

**Required correction:** add explicit eligibility gates before predictor scoring.

## Finding TA-PECARN-TBI-02 — **Major operational-definition gap**

`severe_mechanism` is a bare boolean. The exact PECARN definition should be visible and/or decomposed:

- MVC with ejection, death of another passenger, or rollover;
- pedestrian/bicyclist without helmet struck by a motorized vehicle;
- fall >0.9 m in <2 years;
- fall >1.5 m in ≥2 years;
- head struck by a high-impact object.

## Positive safety finding

PedsCore intentionally returns descriptive rule-risk categories instead of directly generating a CT/discharge instruction. That is consistent with the project's conservative scope.

**Disposition:** **Both age branches require remediation before human sign-off.**

---

# 10. CATCH

**Implementation:** `packages/core/src/calculators/catch.ts`  
**Primary source:** Osmond MH et al. CMAJ. 2010.  
https://pmc.ncbi.nlm.nih.gov/articles/PMC2831681/

## Verified

The four high-risk and three medium-risk criteria match the CATCH rule:

High risk:
- GCS <15 at 2 h;
- suspected open/depressed skull fracture;
- worsening headache;
- irritability.

Medium risk:
- signs of basal skull fracture;
- large boggy scalp hematoma;
- dangerous mechanism.

## Finding TA-CATCH-01 — **Major eligibility gap**

CATCH has a specific minor-head-injury entry population. The calculator currently exposes only the seven rule predictors and does not ensure that the child meets the source entry criteria/exclusions.

**Required correction:** add eligibility workflow, including age and qualifying acute minor head injury definition.

## Finding TA-CATCH-02 — **Major definition gap**

`dangerous_mechanism` should expose the source definition, including MVC, fall ≥3 ft/0.91 m or ≥5 stairs, and unhelmeted bicycle fall.

**Disposition:** **Remediation required before human sign-off.**

---

# 11. CHALICE

**Implementation:** `packages/core/src/calculators/chalice.ts`  
**Primary source:** Dunning J et al. Arch Dis Child. 2006;91:885-891. DOI 10.1136/adc.2005.083980.  
https://pmc.ncbi.nlm.nih.gov/articles/PMC2082967/

## Verified

The implemented history, examination, and mechanism criteria match the reviewed CHALICE rule, including:

- LOC >5 min;
- amnesia >5 min;
- abnormal drowsiness;
- ≥3 vomits;
- suspected non-accidental injury;
- post-traumatic seizure without epilepsy;
- age-adjusted GCS criterion;
- penetrating/depressed injury or tense fontanelle;
- basal skull signs;
- focal neurology;
- >5 cm scalp injury in <1 y;
- high-speed road traffic;
- fall >3 m;
- high-speed projectile/object.

## Finding TA-CHALICE-01 — Moderate eligibility gap

The original cohort/rule is pediatric (<16 years). The current calculator does not gate age.

## Finding TA-CHALICE-02 — Moderate definition gap

The high-speed road-traffic criterion should expose the published >40 mph (~64 km/h) definition instead of a bare boolean.

**Disposition:** Criteria verified; remediation recommended before external sign-off.

---

# 12. pRIFLE

**Implementation:** `packages/core/src/calculators/renalOpen.ts`  
**Primary source:** Akcan-Arikan A et al. Kidney Int. 2007;71:1028-1035. PMID 17396113. DOI 10.1038/sj.ki.5002231.  
https://pubmed.ncbi.nlm.nih.gov/17396113/

## Verified

Acute stages are consistent with pRIFLE:

- Risk: eCCl decrease ≥25% or urine output <0.5 mL/kg/h for 8 h;
- Injury: decrease ≥50% or urine output <0.5 for 16 h;
- Failure: decrease ≥75% or eCCl <35, or urine output <0.3 for 24 h / anuria 12 h.

The worst renal/urine criterion is returned.

## Finding TA-pRIFLE-01 — Moderate chronic-duration representation

Loss and End-stage are chronic-duration labels. The source uses persistent failure >4 weeks and end-stage >3 months. PedsCore represents duration in weeks and maps end-stage to `>13 weeks`.

That is a pragmatic approximation, not an exact calendar representation of “>3 months.”

**Required improvement:** represent the chronic duration directly in days/months or explicitly label the approximation.

## Finding TA-pRIFLE-02 — Moderate input-definition issue

The form accepts baseline/current eCCl directly. It should explicitly identify the intended pediatric estimated creatinine clearance/GFR method and avoid implying that any arbitrary laboratory-reported eGFR is interchangeable.

## Finding TA-pRIFLE-03 — Major test-depth debt

No dedicated boundary tests cover R/I/F, urine-output durations, Loss, or End-stage.

**Disposition:** Acute staging verified; refinements/tests required.

---

# 13. Pediatric KDIGO AKI staging

**Implementation:** `renalOpen.ts`  
**Current published guideline baseline:** KDIGO 2012 AKI guideline.  
https://kdigo.org/guidelines/acute-kidney-injury/  
Staging summary: https://kdigo.org/wp-content/uploads/2017/04/CKD-After-AKI_Cass-2014.pdf

## Verified

PedsCore correctly applies KDIGO 2012:

Stage 1:
- SCr 1.5–1.9× baseline within 7 days; or
- rise ≥0.3 mg/dL within 48 h; or
- UO <0.5 mL/kg/h for 6–12 h.

Stage 2:
- SCr 2.0–2.9× baseline; or
- UO <0.5 for ≥12 h.

Stage 3:
- SCr ≥3× baseline; or
- SCr ≥4.0 mg/dL; or
- kidney replacement therapy; or
- in patients <18 years, eGFR <35 mL/min/1.73 m²;
- UO <0.3 for ≥24 h or anuria ≥12 h.

The code returns the worst criterion.

## Current-guideline status

As of the audit date, KDIGO states that its 2026 AKI/AKD update is a **public-review draft being prepared for publication**. Retaining KDIGO 2012 as the current published operational version is therefore appropriate.

## Finding TA-KDIGO-01 — Major test-depth debt

There is no dedicated test suite for exact equality boundaries, timing booleans, pediatric eGFR criterion, or conflicting creatinine/urine stages.

**Disposition:** Formula/version verified; dedicated tests required.

---

# 14. nSOFA

**Implementation:** `packages/core/src/calculators/nSofa.ts`  
**Primary source:** Wynn JL, Polin RA. Pediatr Res. DOI 10.1038/s41390-019-0517-2. PMID 31394566.  
https://pmc.ncbi.nlm.nih.gov/articles/PMC7007331/

## Verified

The 0–15 score matches the original three-domain structure:

- respiratory 0/2/4/6/8 using intubation and S/F thresholds;
- cardiovascular 0–4 using vasoactive count and systemic corticosteroid support;
- hematologic 0–3 using platelets.

Reviewed threshold logic is consistent with the original nSOFA table.

## Population finding

Original development was focused on mortality associated with late-onset sepsis in preterm very-low-birth-weight infants. Later work has used nSOFA in broader neonatal research settings.

PedsCore already warns users of the original context and states that nSOFA is not a stand-alone sepsis diagnostic tool. That is appropriate.

## Finding TA-nSOFA-01 — Major test-depth debt

No dedicated formula/boundary tests currently cover the three domains.

**Disposition:** Formula verified with appropriate population warning; tests required.

---

# 15. SNAPPE-II

**Implementation:** `packages/core/src/calculators/unlockedOpenTools.ts`  
**Open table used for audit:** *SNAPPE-II in predicting mortality and morbidity in NICU*.  
https://pmc.ncbi.nlm.nih.gov/articles/PMC4625304/

## Verified

The nine variables and point weights are reproduced correctly:

- mean blood pressure;
- lowest temperature;
- PaO₂/FiO₂ convention;
- lowest pH;
- multiple seizures;
- urine output;
- 5-min Apgar;
- birth weight;
- SGA <3rd percentile.

PedsCore's maximum score of 162 is consistent with the implemented point sum.

Current tests cover multiple important point boundaries and are stronger than for most critical-care Tier A calculators.

## Finding TA-SNAPPE-01 — Moderate oxygenation-input ambiguity

The source table expresses the oxygenation variable with thresholds 0.3 / 1 / 2.5. These are historically presented as the SNAPPE-II PaO₂/FiO₂ convention and can be confusing because modern clinicians usually expect P/F values on a ~100–500 scale.

PedsCore labels this as “SNAPPE-II convention,” but a safer interface would either:

1. accept PaO₂ and FiO₂ separately and calculate the convention internally; or
2. explain the exact expected transformation next to the field.

## Finding TA-SNAPPE-02 — Moderate missing-data fidelity issue

Published SNAPPE-II implementations assign zero when a variable/investigation was not obtained according to the clinical assessment; the current PedsCore implementation requires all nine variables.

This is conservative but not source-faithful.

## Finding TA-SNAPPE-03 — Minor

Keep the first-12-hours “worst value” collection requirement prominent.

**Disposition:** Formula verified; input/missing-data fidelity should be refined.

---

# Cross-cutting findings

## TA-X01 — **Blocker: GitHub Actions CI baseline was failing**

At audit start, the current `main` GitHub Actions CI failed in the Test step. Build, governance audit, and SEO audit were consequently skipped.

The immediate stale failure found is a P0 residue:

- `sprint50Safety.test.ts` still expected FLACC to be present in the calculator registry;
- `flacc.test.ts` still imported/tested the removed local FLACC implementation.

This directly conflicts with the P0 rights decision and the current calculator registry.

Further CI execution exposed additional stale P0/P1 assertions (outdated rights wording, Finder expectations, README counts) and a real discovery-governance inconsistency: several active rights-limited surfaces were still represented internally as `blocked_by_rights` even though the intended public architecture is an active official/reference surface.

**Audit PR action:** reconcile those mechanical tests and restore `external_official` for active rights-limited/reference surfaces. No Tier A scoring algorithm is modified in this audit PR.

## TA-X02 — **Major: “test file exists” is not equivalent to clinical boundary coverage**

Several Tier A tools are mapped to generic test files that only verify registration/availability, not the algorithm:

- PRISM IV;
- PELOD-2;
- PIM3;
- pRIFLE;
- Pediatric KDIGO;
- Phoenix;
- nSOFA.

This creates a false sense of coverage.

**Required remediation:** dedicated source-derived boundary fixtures for every Tier A local calculator.

## TA-X03 — Eligibility must be first-class

For high-risk clinical decision rules, eligibility is part of the algorithm. Tool metadata or a page title is not sufficient.

A Tier A rule should not calculate unless the required population/setting/time-window assumptions are either:

- explicitly captured and satisfied; or
- clearly unavailable, in which case the tool returns “outside/eligibility not established.”

Priority examples: Phoenix, PECARN TBI, CATCH, CHALICE.

## TA-X04 — Operational definitions must not be hidden behind vague booleans

Inputs such as:

- PECARN “severe mechanism”;
- CATCH “dangerous mechanism”;
- CHALICE “high-speed road traffic”;

must expose the actual source definition. A Boolean with no visible operational definition invites clinician-to-clinician variability.

## TA-X05 — Prognostic probability outputs need calibration framing

PRISM IV, PELOD-2, and PIM3 are population-level prognostic models. Their probabilities should never be represented as individualized mortality predictions or treatment/limitation-of-support triggers.

PedsCore currently includes warnings to that effect; retain them.

## TA-X06 — Moderate: 26 legacy external/reference surfaces lack a direct source URL

The executable governance audit identified 26 active external/reference surfaces whose catalog metadata does not yet contain a resolvable URL, DOI or PMID. This is not a Tier A scoring defect, but it is provenance debt.

The IDs are tracked explicitly in GitHub issue #94 and in a temporary governance allowlist. New untracked external-source omissions still fail CI.

**Required remediation:** resolve each item to a trustworthy original/official source and shrink the allowlist to zero.

## TA-X07 — Repository CI reconciliation

The audit also exposed two repository-level failures unrelated to Tier A calculation formulas:

- stale tests from pre-consolidation catalog/rights states;
- root static SEO generation omitted the structured-data head renderer, causing the new SEO CI gate to fail despite route-level SEO being correct.

These are repaired in the audit PR so that the protected-branch `CI` check once again reflects the actual current baseline.

---

## Remediation status

The known clinical defects and applicability gaps identified by this audit were remediated in PR #93 before external human review:

- Phoenix: S/F is now restricted to SpO₂ ≤97%; neonatal exclusions are gated; IMV implies respiratory support; unavailable-variable behavior is explicit and tested.
- PECARN TBI <2 and ≥2: age branch, GCS, blunt/non-trivial trauma, <24-hour presentation and source exclusions are now first-class eligibility gates; age-specific severe-mechanism definitions are visible.
- CATCH: source entry criteria and exclusions are gated; dangerous mechanism is operationally defined.
- CHALICE: pediatric age eligibility is gated and the >40 mph (>64 km/h) road-traffic definition is visible.
- PRISM IV: first-PICU and sampling-window confirmations are required, including the special cardiac-intervention confirmation.
- pRIFLE: chronic Loss/End-stage duration is represented directly as >28 and >90 days; eCCl method consistency is explicit.
- SNAPPE-II: PaO₂ and FiO₂ (%) are entered separately, the historical oxygenation convention is calculated internally, and unmeasured physiology is handled explicitly.

These remediations do **not** convert this audit into an independent external clinical review. The corrected merged commit should be the object of the independent pediatrician review.

Remaining Tier A work is **test-depth hardening** for several calculators where no new scoring defect was identified: PRISM IV full boundary/reference fixtures, PELOD-2, PIM3, expanded pSOFA, pediatric KDIGO, fuller pRIFLE, and nSOFA regression suites.

---

# Remediation priority

## P0 clinical remediation

1. **Phoenix**
   - enforce S/F only when SpO₂ ≤97%;
   - add birth-hospitalization / postconceptional-age gates;
   - resolve contradictory IMV/support inputs;
   - design source-faithful missing-data handling;
   - add full boundary tests.

2. **PECARN TBI <2 and ≥2**
   - add age/trauma/GCS/time-window eligibility;
   - expose exact severe-mechanism definition;
   - add eligibility tests.

3. **CATCH**
   - add entry criteria/exclusions;
   - expose exact dangerous-mechanism definition;
   - add eligibility tests.

## P1 clinical remediation

4. CHALICE age gate + exact high-speed mechanism wording.
5. PRISM IV timing/cardio collection guardrails.
6. pRIFLE chronic-duration representation + eCCl definition.
7. SNAPPE-II oxygenation-input redesign + missing-data policy.

## P1 test remediation

8. Dedicated Tier A regression/boundary suites for PRISM IV, PELOD-2, PIM3, pSOFA, KDIGO, pRIFLE, Phoenix, nSOFA.
9. Add source/reference fixtures where practical so equality signs and age thresholds are explicitly locked.

---

# Suggested human-review workflow

The independent pediatric reviewer should receive this document **before** reviewing the tools so they can deliberately challenge both confirmed and disputed findings.

For each Tier A tool, the human reviewer should record:

- exact source/version;
- whether the implementation matches the source;
- population/setting/time-window;
- threshold equality behavior;
- units;
- missing-data policy;
- operational definitions;
- interpretation wording;
- whether each finding in this audit is confirmed, rejected, or modified.

The final external review record should be tied to the exact commit SHA reviewed.

## Human reviewer outcome labels

- `confirmed_no_change`
- `confirmed_after_remediation`
- `minor_correction_required`
- `logic_correction_required`
- `eligibility_correction_required`
- `source_or_variant_uncertain`

---

# Source set

Core sources used in this audit:

1. Pollack MM et al. PRISM IV / Pediatric Risk of Mortality Update 2015. DOI 10.1097/PCC.0000000000000558. https://pmc.ncbi.nlm.nih.gov/articles/PMC5048467/
2. Leteurtre S et al. PELOD-2. PMID 23685639. DOI 10.1097/CCM.0b013e31828a2bbd. https://pubmed.ncbi.nlm.nih.gov/23685639/
3. PIM3 published equation; open validation reproduction: https://pmc.ncbi.nlm.nih.gov/articles/PMC5220006/
4. Matics TJ, Sanchez-Pinto LN. pSOFA. DOI 10.1001/jamapediatrics.2017.2352. https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/
5. Schlapbach LJ et al. International Consensus Criteria for Pediatric Sepsis and Septic Shock. DOI 10.1001/jama.2024.0179. https://jamanetwork.com/journals/jama/fullarticle/2814297
6. Sanchez-Pinto LN et al. Development and Validation of the Phoenix Criteria. DOI 10.1001/jama.2024.0196. https://jamanetwork.com/journals/jama/fullarticle/2814296
7. Gomez B et al. Step-by-Step validation. PMID 27382134. DOI 10.1542/peds.2015-4381. https://pubmed.ncbi.nlm.nih.gov/27382134/
8. Kuppermann N et al. PECARN febrile infant rule. PMID 30776077. DOI 10.1001/jamapediatrics.2018.5501. https://pubmed.ncbi.nlm.nih.gov/30776077/
9. Kuppermann N et al. PECARN pediatric head trauma rule, Lancet 2009; plus open validation representation: https://pmc.ncbi.nlm.nih.gov/articles/PMC13525905/
10. Osmond MH et al. CATCH. https://pmc.ncbi.nlm.nih.gov/articles/PMC2831681/
11. Dunning J et al. CHALICE. DOI 10.1136/adc.2005.083980. https://pmc.ncbi.nlm.nih.gov/articles/PMC2082967/
12. Akcan-Arikan A et al. pRIFLE. PMID 17396113. DOI 10.1038/sj.ki.5002231. https://pubmed.ncbi.nlm.nih.gov/17396113/
13. KDIGO AKI guideline suite/current update status. https://kdigo.org/guidelines/acute-kidney-injury/
14. Wynn JL, Polin RA. nSOFA. PMID 31394566. DOI 10.1038/s41390-019-0517-2. https://pmc.ncbi.nlm.nih.gov/articles/PMC7007331/
15. SNAPPE-II open scoring table: https://pmc.ncbi.nlm.nih.gov/articles/PMC4625304/

---

# Final audit conclusion

**PedsCore Tier A should not yet be labelled clinically reviewed as a group.**

The source-to-code comparison supports the correctness of a substantial majority of the numerical scoring logic, but the audit found one definite Phoenix scoring/application defect, multiple high-impact eligibility gaps in head-injury rules, several fidelity/usability issues, and insufficient dedicated boundary tests for several critical-care calculators.

The appropriate next state is:

1. merge this audit record and restore CI baseline;
2. remediate the identified clinical issues through dedicated PRs with source-derived tests;
3. freeze the corrected Tier A commit;
4. have an independent pediatrician review that exact commit;
5. only then record independent external clinical review status tool by tool.
