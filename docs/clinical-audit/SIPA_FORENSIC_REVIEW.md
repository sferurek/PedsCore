# SIPA forensic clinical review — Batch 0A

Date: 2026-09-12
Decision gate: **B — current implementation needs correction**

## Canonical PedsCore specification

- **Name:** SIPA — Shock Index, Pediatric Age-Adjusted.
- **Purpose:** descriptive prognostic risk stratification in pediatric trauma. It is not a diagnosis of shock and does not prescribe treatment.
- **Evidence-supported population:** trauma patients aged 4 through 16 years. The original derivation cohort had severe blunt trauma; the prospective validation cohort had blunt liver and/or spleen injury.
- **Inputs:** age in years, heart rate in beats/min, systolic blood pressure in mmHg.
- **Formula:** `raw SIPA = heart rate / systolic blood pressure`.
- **Display:** the ratio may be displayed to two decimals, but classification uses the unrounded ratio.
- **Bands:** age `>=4 and <7`: threshold `1.22`; age `>=7 and <13`: threshold `1.0`; age `>=13 and <17`: threshold `0.9`.
- **Comparator:** elevated means raw SIPA **strictly greater than** the applicable threshold. Equality is within the published threshold.
- **Unsupported age:** `<4` or `>=17`; no value or classification is returned.
- **Invalid:** missing values; non-finite values; age `<0`; heart rate `<=0`; systolic blood pressure `<=0`.
- **Output vocabulary:** “within published SIPA threshold” or “above published SIPA threshold”.

The half-open numeric bands implement completed-age labels 4–6, 7–12, and 13–16 without overlap. This is the precise application of the age groups used in the primary publications; it is not an extrapolation to a new population.

## Current production behavior before correction

The pre-correction implementation used `1.2` at ages `[4,6)`, `1.0` at `[6,12)`, and `0.9` at `[12,infinity)`. It rounded `HR/SBP` to two decimals before classification. Ages below 4 received a calculated value without classification; ages 17 and older received the `0.9` classification.

Legend: `W` = not above current threshold; `A` = above current threshold; `U` = no current threshold/classification. These cells describe the exact pre-correction result for the specified displayed ratios.

| Age | 0.89 | 0.90 | 0.91 | 0.99 | 1.00 | 1.01 | 1.19 | 1.20 | 1.21 | 1.22 | 1.23 |
|---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 3 | U | U | U | U | U | U | U | U | U | U | U |
| 4 | W | W | W | W | W | W | W | W | A | A | A |
| 5 | W | W | W | W | W | W | W | W | A | A | A |
| 6 | W | W | W | W | W | A | A | A | A | A | A |
| 7 | W | W | W | W | W | A | A | A | A | A | A |
| 11 | W | W | W | W | W | A | A | A | A | A | A |
| 12 | W | W | A | A | A | A | A | A | A | A | A |
| 13 | W | W | A | A | A | A | A | A | A | A | A |
| 16 | W | W | A | A | A | A | A | A | A | A | A |
| 17 | W | W | A | A | A | A | A | A | A | A | A |

Because production classified the rounded value, a raw value just above a threshold could be displayed at and classified as the threshold. For example, raw `0.9004` became `0.90` and was not classified above `0.9`.

## Primary-source reconciliation

### Original SIPA derivation

Acker SN, Ross JT, Partrick DA, Tong S, Bensard DD. *Pediatric specific shock index accurately identifies severely injured children.* Journal of Pediatric Surgery. 2015;50(2):331–334. DOI [10.1016/j.jpedsurg.2014.08.009](https://doi.org/10.1016/j.jpedsurg.2014.08.009). PMID [25638631](https://pubmed.ncbi.nlm.nih.gov/25638631/).

- Retrospective, two trauma centers; 543 patients aged 4–16 with blunt trauma and ISS >15.
- Emergency-department presentation values.
- SIPA was defined from maximum normal heart rate divided by minimum normal systolic pressure by age.
- The abstract explicitly defines elevated SIPA as `>1.22` at ages 4–6, `>1.0` at ages 7–12, and `>0.9` at ages 13–16.
- Outcomes included ISS >30, transfusion within 24 hours, grade III liver/spleen injury requiring transfusion, and in-hospital mortality.

The original paper's normative inputs came from the 2011 19th edition of *Nelson Textbook of Pediatrics*, the 1994 second edition of *Paramedic Emergency Care*, and the 2010 U.S. Department of Health and Human Services pediatric basic/advanced life-support material; Choi et al.'s later methods comparison ([DOI 10.1016/j.injury.2023.111108](https://doi.org/10.1016/j.injury.2023.111108), [PMID 37858444](https://pubmed.ncbi.nlm.nih.gov/37858444/)) identifies those three sources explicitly. The numeric table reproduced with permission in later educational material exposes the underlying youngest-band calculation as `110/90 = 1.222222…`. That explains the origin of `1.22`. Its table labels include “6–12” and “>12”, but the paper's abstract and study grouping use the non-overlapping bands 4–6, 7–12, and 13–16.

### Prospective validation

Linnaus ME, Notrica DM, Langlais CS, et al. *Prospective validation of the shock index pediatric-adjusted (SIPA) in blunt liver and spleen trauma: An ATOMAC+ study.* Journal of Pediatric Surgery. 2017;52(2):340–344. DOI [10.1016/j.jpedsurg.2016.09.060](https://doi.org/10.1016/j.jpedsurg.2016.09.060). PMID [27717564](https://pubmed.ncbi.nlm.nih.gov/27717564/).

- Prospective, multicenter observational validation; 386 included patients aged 4–16 with blunt liver and/or spleen injury and ISS >15.
- Emergency-department maximum heart rate/minimum systolic blood pressure.
- It explicitly retained `>1.22`, `>1.0`, and `>0.9` for ages 4–6, 7–12, and 13–16.
- Outcomes included transfusion within 24 hours, higher-grade solid-organ injury requiring transfusion, operative intervention, and ICU admission.

### Large external validation and later variants

Nordin A, Coleman A, Shi J, et al. *Validation of the age-adjusted shock index using pediatric trauma quality improvement program data.* Journal of Pediatric Surgery. 2018;53(1):130–135. DOI [10.1016/j.jpedsurg.2017.10.023](https://doi.org/10.1016/j.jpedsurg.2017.10.023). PMID [29108845](https://pubmed.ncbi.nlm.nih.gov/29108845/).

- Retrospective TQIP validation: 22,344 blunt and 613 penetrating trauma patients aged 1–16.
- It extended SIPA to ages 1–3 using age-based vital signs and assessed injury severity, transfusion, ICU/hospital stay, ventilation, and mortality.
- This is an expanded version and does not override the original 4–16 definition represented by PedsCore.

Schauer SG, et al. *Validation of the age-adjusted shock index for pediatric casualties in Iraq and Afghanistan.* Military Medical Research. 2020;7:33. DOI [10.1186/s40779-020-00262-2](https://doi.org/10.1186/s40779-020-00262-2). PMCID [PMC7331217](https://pmc.ncbi.nlm.nih.gov/articles/PMC7331217/).

- Retrospective military trauma registry; used highest documented heart rate and lowest systolic pressure in the ED as a prehospital surrogate.
- It evaluated expanded bands 1–3, 4–6, 7–12, and 13–17 with thresholds 1.2, 1.2, 1.0, and 0.9.
- This deliberately broader, rounded implementation is a later study version rather than evidence that the original derivation threshold was 1.20.

Gandhi G, Claiborne MK, Gross T, et al. *Predictive value of the shock index (SI) compared to the age-adjusted pediatric shock index (SIPA) for identifying children that needed the highest-level trauma activation based on the presence of consensus criteria.* Journal of Pediatric Surgery. 2020;55(9):1804–1809. DOI [10.1016/j.jpedsurg.2019.09.032](https://doi.org/10.1016/j.jpedsurg.2019.09.032). PMID [31676079](https://pubmed.ncbi.nlm.nih.gov/31676079/).

- Retrospective review of prospectively collected trauma data for ages 1–17.
- It used `>1.22` for 4–6, `>1.0` for 7–12, and `>0.9` for 13–17.
- It found modest specificity but low sensitivity and positive predictive value for the highest-level trauma activation consensus criteria. This supports conservative, non-directive wording.

The 2024 systematic review and meta-analysis by Yu et al. ([PMCID PMC11257222](https://pmc.ncbi.nlm.nih.gov/articles/PMC11257222/)) treats values “including very close cutoff values” as typical and summarizes 1.2/1.0/0.9 across somewhat broader age groupings. That synthesis explains why secondary sources often show 1.20, but it does not replace the exact original and prospective-validation comparator.

## 1.20 versus 1.22

**Version A — canonical PedsCore SIPA:** original Acker definition and ATOMAC+ prospective validation; ages 4–16; `>1.22`, `>1.0`, `>0.9`; ED trauma values. This is the named SIPA definition with the strongest direct traceability.

**Version B — expanded/rounded SIPA:** subsequent studies extended the population to ages 1–3 and/or 17 and commonly rounded the youngest cutoff to `1.2`. These studies validate their stated application but do not show that the original `1.22` was an error.

PedsCore represents Version A. It does not silently mix Version B's lower age extension, upper age extension, or rounded cutoff into Version A.

## Clinical purpose and limitations

SIPA is associated with trauma severity and resource/outcome measures across the cited cohorts, including transfusion, injury severity, ICU use, operative intervention, ventilation, length of stay, and mortality. Performance and endpoints vary by population and time of measurement. An elevated result is a risk association, not proof of shock, safety, clinical stability, need for transfusion, or an instruction to treat, admit, transfer, or operate. PedsCore therefore provides no management recommendation.

## Reuse assessment

The Elsevier articles remain copyrighted. PedsCore cites them but does not reproduce their prose, tables, figures, or forms. It independently expresses the formula, numeric cutoffs, factual study metadata, and conservative original wording. The U.S. Copyright Office's [Circular 33](https://www.copyright.gov/circs/circ33.pdf) distinguishes protected expression from unprotected ideas, procedures, systems, methods, and principles. No separate SIPA form, artwork, or proprietary dataset is embedded. **Reuse gate: closed for this minimal algorithmic implementation, with attribution retained.**

## Test provenance

**Source-derived tests:** formula `120/100 = 1.2`; threshold assignment at completed-age bands 4–6, 7–12, and 13–16; strict `>` behavior at 1.22, 1.0, and 0.9; unsupported ages 3 and 17.

**Mathematical boundary tests:** values immediately below, exactly at, and immediately above each threshold; fractional-age transitions at 6.999/7 and 12.999/13; upper support transition at 16.999/17; non-finite/missing/non-positive inputs; raw ratios 0.8996/0.9004 and 1.2199/1.2201 that display identically but classify differently.

## Final audit status

**SIPA: VERIFIED.** Original definition, prospective validation, supported population, input units, strict comparator, age boundaries, output limitations, reuse basis, and executable boundary tests are now explicit. Later expanded versions remain documented rather than merged into the canonical implementation.
