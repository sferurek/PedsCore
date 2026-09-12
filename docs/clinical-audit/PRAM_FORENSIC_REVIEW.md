# PRAM forensic clinical review

Audit date: 2026-09-12
Batch: 0B1
Runtime baseline: production commit `4b6d1ef8cf5307cafe87987dbbbff3a616fc1538`

## Stop Gate A decision

**C — CURRENT IMPLEMENTATION NEEDS MATERIAL CORRECTION.**

The numerical sum and the five domain weights were broadly correct, but the executable calculator accepted SpO2 obtained under any condition, did not establish the validated age range, described the population as asthma or wheezing, omitted the original asymmetry rule, and used shortened descriptors that did not fully identify the selected canonical version. A saturation measured during supplemental oxygen can under-score the oxygen component. These defects affect whether the result is a valid PRAM score.

## Authoritative source reconciliation

| Source | Design and population | Contribution | Evidence boundary |
|---|---|---|---|
| Chalut DS, Ducharme FM, Davis GM. *The Preschool Respiratory Assessment Measure (PRAM): a responsive index of acute asthma severity.* J Pediatr. 2000;137(6):762-768. DOI `10.1067/mpd.2000.110121`; PMID `11113831`. | Prospective derivation/internal validation in 217 children aged 3-6 years presenting to a pediatric ED with acute asthma; respiratory resistance by forced oscillation was the concurrent criterion. | Derived the five-item 0-12 PRAM. The validation group supported responsiveness; a change of 3 points represented clinically important change in that study. | The publication establishes the score, not the later operational one-minute room-air procedure or the later 2-17-year age extension. |
| Ducharme FM, Chalut D, Plotnick L, Savdie C, Kudirka D, Zhang X, Meng L, McGillivray D. *The Pediatric Respiratory Assessment Measure: a valid clinical score for assessing acute asthma severity from toddlers to teenagers.* J Pediatr. 2008;152(4):476-480.e1. DOI `10.1016/j.jpeds.2007.08.034`; PMID `18346499`. | Prospective cohort in children aged 2-17 years with acute asthma, defined by at least two wheezing episodes responsive to inhaled beta2 agonist and requiring bronchodilator treatment; chronic lung disease excluded. PRAM recorded at triage, after initial bronchodilation, and at disposition. | Reproduces the canonical scoring figure; validates feasibility, internal consistency, responsiveness, and inter-rater reliability across ages 2-17. Proposes 0-3, 4-7, and 8-12 strata. | Supports serial assessment after bronchodilation. The proposed strata were linked to admission-risk groups in this cohort; a score alone does not determine treatment or disposition. |
| Gouin S, Robidas I, Gravel J, Guimont C, Chalut D, Amre D. *Prospective evaluation of two clinical scores for acute asthma in children 18 months to 7 years of age.* Acad Emerg Med. 2010;17(6):598-603. DOI `10.1111/j.1553-2712.2010.00775.x`; PMID `20624139`. | Prospective external cohort in an academic pediatric ED, ages 18 months-7 years with asthma exacerbation; PRAM assessed at presentation and after 90 minutes. | External comparison showing moderate discrimination for prolonged ED stay/admission and responsiveness during treatment. | Does not supersede the direct 2-17-year validation as the PedsCore support boundary. |
| Lehr AR, McKinney ML, Gouin S, Blais JG, Pusic MV, Ducharme FM. *Development and pretesting of an electronic learning module to train health care professionals on the use of the Pediatric Respiratory Assessment Measure to assess acute asthma severity.* Can Respir J. 2013;20(6):435-441. DOI `10.1155/2013/148645`; PMID `24046819`; PMCID `PMC3917818`. | Educational module development and pretesting with physicians, nurses, respiratory therapists, and trainees; clinical material from children with acute asthma. | Confirms the assessment modalities: suprasternal retraction is visual, scalene contraction tactile, air entry/wheeze auscultatory, and saturation measured by pulse oximetry. | Educational/operational reliability source; it is not a new derivation of thresholds. |
| BC Children's Hospital. *PRAM: Score Assessment for Asthma.* Child and Youth Health Policy Manual CC.09.27, effective 2015. | Institution-level operational policy based on the Sainte-Justine PRAM teaching module. | Requires oxygen saturation on ambient air, stable for at least 1 minute; gives examination technique and asymmetry instructions. | The one-minute acquisition rule is operational material, not a requirement demonstrated in the accessible text of the original derivation paper. |

Primary links:

- https://pubmed.ncbi.nlm.nih.gov/11113831/
- https://pubmed.ncbi.nlm.nih.gov/18346499/
- https://pubmed.ncbi.nlm.nih.gov/20624139/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC3917818/
- https://www.childhealthindicatorsbc.ca/sites/default/files/BCCH%20PRAM%20score%20for%20assessment%20for%20Asthma%20%282%29.pdf

## Canonical PedsCore PRAM specification

- **Name:** Pediatric Respiratory Assessment Measure (PRAM).
- **Purpose:** standardized, descriptive measurement of acute asthma exacerbation severity and change across serial assessments.
- **Population:** children aged 2 to under 18 years with acute asthma in an acute-care assessment context.
- **Setting supported by direct validation:** pediatric emergency department.
- **Exclusions/limits:** not validated by the selected evidence for children under 2, adults, isolated bronchiolitis, undifferentiated first-time wheeze, or chronic lung disease. It does not diagnose asthma, predict an individual disposition with certainty, or mandate treatment.

### Canonical scoring table

| Domain | Observation | Points | Special condition |
|---|---|---:|---|
| Suprasternal retractions | Absent | 0 | Visual assessment of suprasternal indrawing with each inspiration. |
| Suprasternal retractions | Present | 2 | Same. |
| Scalene muscle contraction | Absent | 0 | Palpable assessment; it is not determined visually. |
| Scalene muscle contraction | Present | 2 | Same. |
| Air entry | Normal | 0 | If asymmetric, rate the more severely affected side. |
| Air entry | Decreased at bases | 1 | Same. |
| Air entry | Widespread decrease | 2 | Same. |
| Air entry | Absent or minimal | 3 | Same. |
| Wheezing | Absent | 0 | If asymmetric, use the most severely affected auscultation areas. |
| Wheezing | Expiratory only | 1 | Same. |
| Wheezing | Inspiratory and expiratory | 2 | Same. |
| Wheezing | Audible without stethoscope, or silent chest with minimal air entry | 3 | A silent chest is a high-point finding only in the context of minimal/no air entry. |
| Stable room-air SpO2 | >=95% | 0 | Stable on ambient air for at least 1 minute. |
| Stable room-air SpO2 | 92-94% | 1 | Same. |
| Stable room-air SpO2 | <92% | 2 | Same. |

All five domains are required. Sum the domain points. Minimum 0; maximum 12. There is no age-dependent point adjustment within the supported range.

### Descriptive bands

| Total | PedsCore label | Evidence interpretation |
|---:|---|---|
| 0-3 | Mild | Operational severity label; the 2008 cohort proposed this as its lowest admission-risk stratum. |
| 4-7 | Moderate | Operational severity label; middle 2008 admission-risk stratum. |
| 8-12 | Severe | Operational severity label; highest 2008 admission-risk stratum. |

The boundaries are inclusive integer partitions: 3 remains mild, 4 begins moderate, 7 remains moderate, and 8 begins severe. PedsCore does not turn a band into medication, oxygen, admission, discharge, ICU, or escalation advice.

## SpO2 forensic resolution

1. **Room/ambient air required:** yes for the selected operational PRAM definition.
2. **Stable reading required:** yes; the institutional implementation specifies at least 1 minute.
3. **Specified stabilization period:** at least 1 minute in the operational source.
4. **Pre-treatment only:** no. The 2008 validation measured PRAM at triage, after initial bronchodilation, and at disposition.
5. **During/after bronchodilator treatment:** serial scoring after bronchodilation is validated; each SpO2 component must still meet its acquisition condition.
6. **While receiving supplemental oxygen:** a reading obtained on supplemental oxygen is not a valid input to the selected oxygen component.
7. **If oxygen is already being given:** a total PRAM can only be produced when a qualifying stable room-air reading is available. PedsCore does not instruct clinicians to interrupt oxygen.
8. **Omit or score differently:** neither. The five-domain total is not calculated when the oxygen component is unscorable.
9. **Caveat:** the operational source discusses temporarily measuring in ambient air and restoring oxygen if saturation falls below 92%; PedsCore deliberately does not reproduce that treatment instruction.
10. **Averaging/artifact:** no device averaging interval was identified in the critical sources. PedsCore requires the documented stability period and does not invent a device-specific rule.

## Clinical-purpose audit

The original work validated measurement of airway obstruction severity and responsiveness to change. The 2008 study also found association with admission, but disposition was an imperfect, potentially unblinded outcome and the authors described PRAM as standardized recording of clinical signs. PedsCore therefore outputs a descriptive severity band only. It does not claim to diagnose asthma, independently predict admission, determine discharge, indicate ICU care, or mandate treatment.

## Variant control

PedsCore implements the canonical 0-12 version reproduced in the 2008 validation figure: SpO2 >=95/92-94/<92 and bands 0-3/4-7/8-12. It does not mix:

- altitude-adjusted institutional variants using different SpO2 thresholds;
- alternative 0-4/5-8/9-12 severity groupings;
- local pathway treatment/disposition rules;
- derivatives such as AAIRS, PASS, or other asthma scores;
- use in bronchiolitis or an undifferentiated first wheezing episode.

## Reuse and licensing

- **Algorithm and numeric thresholds:** implemented independently as clinical facts with source attribution.
- **Short clinical descriptors:** represented as concise functional labels necessary to identify the observations; no long teaching text is copied.
- **Table presentation:** PedsCore uses its own data model and interface, not the journal figure or an institutional form.
- **Logo/branding/official form:** not used.
- **Electronic restrictions:** no instrument-specific electronic implementation restriction or licence requirement was located. The 2000/2008 journal layouts remain publisher-copyrighted, and the BCCH policy forbids unpermitted reproduction of its document; neither visual artifact is reproduced.

Conclusion: independent algorithmic implementation with attribution is suitable for the project. Reproduction of the source figures, institutional form, tutorial media, or branding remains out of scope.

## Implemented correction

- Added required age input and rejects ages below 2 or 18 and above without a score.
- Narrowed the population to acute asthma within the directly validated 2-to-under-18 range.
- Added required measurement-condition selection.
- Calculates only when SpO2 is confirmed stable on room air for at least 1 minute.
- Returns no score/classification for unconfirmed or supplemental-oxygen readings.
- Preserved canonical SpO2 thresholds and total bands.
- Restored canonical air-entry and wheeze descriptors and documented asymmetry, visual, tactile, and auscultatory rules.
- Added original, pediatric, external-validation, and operational traceability metadata.
- Kept output descriptive and free of management/disposition recommendations.

## Test classification

No source-published patient vignette with all five independently scoreable findings was located, so no case is labelled as a published case. Tests are explicitly labelled structural, domain, or boundary tests and derive their expected values directly from the verified scoring table.

## Final evidence status

**PRAM = VERIFIED**, conditional on the 0B1 preview validation and owner stop-gate approval. The score is clinically defined, source-traceable, bounded to its validated population, operationally safe for SpO2 acquisition, independently implemented, and covered across every domain and boundary.
