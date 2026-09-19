# Tier A Adaptive-Flow Clinical Technical Re-audit

**Project:** PedsCore  
**Date:** 19 September 2026  
**Clinical implementation baseline:** `a9d2bfcb569600a5e0c9be681b729cc2bf4ba661`  
**Parent Tier A audit:** `docs/TIER_A_AI_CLINICAL_AUDIT_2026-09-19.md`  
**Audit type:** AI-assisted clinical technical re-audit / addendum  
**Not equivalent to:** independent external clinical review, certification, regulatory validation, or medical-device verification.

## Why this addendum exists

After the original Tier A audit, remediation and dedicated reference/boundary testing, PedsCore introduced declarative adaptive form flows in PR #102. The adaptive change did not intentionally alter published numerical thresholds, coefficients or score definitions, but it did change **which questions are shown and when the calculator stops asking for downstream inputs**.

Because eligibility and branching are part of a clinical algorithm, the affected Tier A tools were re-audited before handing the frozen implementation to an independent pediatric reviewer.

Affected Tier A tools:

1. Step-by-Step febrile infant
2. PIM3
3. PRISM IV
4. CATCH
5. CHALICE

The remaining Tier A tools did not receive clinical workflow changes in PR #102 and retain the verification record from the original Tier A audit/test-hardening cycle.

---

## 1. Step-by-Step febrile infant

**Primary validation source:** Gomez B et al. Pediatrics. 2016;138(2):e20154381. PMID 27382134. DOI 10.1542/peds.2015-4381.

### Change reviewed

The web form and deterministic calculator now follow the published sequence instead of requiring every downstream biomarker before returning a result:

1. confirm age / fever without source;
2. age <=21 days -> high risk;
3. ill appearance -> high risk;
4. leukocyturia -> high risk;
5. PCT >=0.5 ng/mL -> high risk;
6. only when all high-risk criteria are negative, evaluate CRP >20 mg/L and ANC >10,000/mm3 for intermediate risk;
7. otherwise low risk.

### Re-audit result

**Confirmed source-consistent.**

No threshold changed:

- age remains <=21 days;
- PCT remains >=0.5 ng/mL;
- CRP remains strictly >20 mg/L;
- ANC remains strictly >10,000/mm3.

The adaptive flow removes clinically irrelevant downstream questions once a higher-priority Step-by-Step branch has already established the classification.

### Test lock

Automated tests now verify early exits for:

- age <=21 days;
- ill appearance;
- leukocyturia;

and preserve the existing threshold tests for PCT, CRP and ANC.

**Disposition:** adaptive workflow verified.

---

## 2. PIM3

**Development model:** Straney L et al. Pediatric Index of Mortality 3 (PIM3), Pediatr Crit Care Med. 2013.  
**Open equation reproduction previously used in audit:** https://pmc.ncbi.nlm.nih.gov/articles/PMC5220006/

### Change reviewed

The form now hides measured physiologic fields when PIM3's published unknown-value convention is explicitly selected:

- base excess is shown and required only when `base_excess_unknown = false`;
- systolic BP is shown and required only when `sbp_unknown = false`;
- FiO2 and PaO2 are shown and required only when `oxygenation_unknown = false`.

### Re-audit result

**Confirmed source-consistent.**

The deterministic engine remains unchanged:

- unknown base excess -> 0;
- unknown SBP -> 120 mmHg;
- unknown oxygenation -> oxygen term 0.23;
- measured values still feed the same published regression equation.

The UI change prevents users from being asked to enter values that the selected PIM3 coding convention explicitly treats as unknown.

**Disposition:** adaptive workflow verified; formula unchanged.

---

## 3. PRISM IV

**Primary source:** Pollack MM et al. *The Pediatric Risk of Mortality Score: Update 2015.* Pediatr Crit Care Med. 2016;17(1):2-9. DOI 10.1097/PCC.0000000000000558.

### Change reviewed

`cardiac_postintervention_window_confirmed` is now shown and required **only** when the user indicates that the selected special cardiac-intervention branch applies.

Previously, PedsCore required that confirmation even when the special branch was false.

### Re-audit result

**Confirmed source-consistent and safer.**

The special timing confirmation is relevant only to the subset of patients to whom the published post-intervention collection rule applies. General PRISM IV admissions continue to require confirmation of the ordinary PRISM IV collection window.

No physiologic cut point, age coefficient, admission-source coefficient, PRISM subscore or mortality-regression coefficient changed.

### Test lock

Automated tests now verify both directions:

- ordinary/non-special cardiac cases calculate without the irrelevant post-intervention confirmation;
- special cardiac cases remain blocked unless the post-intervention interval is confirmed.

**Disposition:** adaptive workflow verified; formula unchanged.

---

## 4. CATCH

**Primary source:** Osmond MH et al. CMAJ. 2010. https://pmc.ncbi.nlm.nih.gov/articles/PMC2831681/

### Change reviewed

The entry-population feature `persistent_irritability_if_under_2` is now displayed and required only for children younger than 2 years.

### Re-audit result

**Confirmed source-consistent.**

Persistent irritability is part of the CATCH minor-head-injury entry definition specifically for the young-child subgroup. Requiring it in older children adds an inapplicable question and does not represent the source population correctly.

All seven CATCH rule predictors, risk grouping and dangerous-mechanism definition remain unchanged.

### Test lock

Tests confirm:

- patients >=2 years can complete eligibility without the infant/toddler irritability field;
- patients <2 years still require that field.

**Disposition:** adaptive workflow verified.

---

## 5. CHALICE

**Primary source:** Dunning J et al. Arch Dis Child. 2006;91:885-891. DOI 10.1136/adc.2005.083980.

### Change reviewed

The criterion `bruise/swelling/laceration >5 cm` is now displayed and required only when age is <1 year.

### Re-audit result

**Confirmed source-consistent.**

The published CHALICE rule restricts this scalp-injury criterion to children younger than one year. Older children should not be forced to answer an age-inapplicable item.

All other CHALICE history, examination and mechanism criteria remain unchanged.

### Test lock

Tests confirm:

- children >=1 year can complete CHALICE without this infant-only criterion;
- children <1 year still require it.

**Disposition:** adaptive workflow verified.

---

# Cross-cutting adaptive-form review

The new form mechanism adds declarative `visibleWhen` conditions to input metadata.

The clinical safety rules for this mechanism are:

- hidden fields do not count as missing required inputs;
- only source-defined branches may use adaptive visibility;
- hiding an input must not change a numerical threshold or silently assign a clinical value unless the underlying calculator has an explicit published default/branch;
- calculation engines remain the final authority for eligibility and validation;
- API v1 exposes visibility metadata for local-active input schemas so clients can reproduce the same questionnaire flow;
- protected/external-only tools still do not expose operational input schemas.

The adaptive UI is therefore an interaction optimization, not a replacement for deterministic calculator validation.

# Verification state

PR #102 passed:

- lint;
- unit/integration tests;
- build;
- governance audit;
- SEO audit.

The clinical implementation state reviewed by this addendum is:

`a9d2bfcb569600a5e0c9be681b729cc2bf4ba661`

This SHA is the **frozen Tier A clinical implementation baseline** to give the independent pediatric reviewer unless a later logic-changing PR is merged.

# Final addendum conclusion

The adaptive-flow changes for Step-by-Step, PIM3, PRISM IV, CATCH and CHALICE are consistent with the source-defined branching reviewed above and introduce no identified change to published thresholds, coefficients or score definitions.

The independent external reviewer should review the clinical implementation baseline `a9d2bfcb569600a5e0c9be681b729cc2bf4ba661`, using this addendum together with the original Tier A audit and the external-review pack.
