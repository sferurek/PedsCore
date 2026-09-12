# Clinical definition and deterministic-implementation register

This register answers the definition gate without copying protected forms. “Unknown” means the audit did not establish the exact value from an authoritative reusable source. It must not be reconstructed from memory or a secondary calculator.

## Current active tools (audit only)

| Tool | Supported population/setting | Inputs and units | Calculation/boundaries | Output; source does not establish |
|---|---|---|---|---|
| Apgar | Newborn transition at 1 or 5 minutes after birth | HR, respiratory effort, tone, reflex irritability, color; five descriptor-based 0–2 domains | Sum 0–10; 5-minute bands 0–3/4–6/7–10 only | Descriptive score; no resuscitation delay, asphyxia diagnosis, or individual prognosis |
| Silverman-Andersen | Premature/newborn respiratory distress | Thoracoabdominal movement, intercostal/xiphoid retraction, nasal flaring, grunt; 0–2 each | Sum 0–10; current descriptors absent | Severity description only; current bands need source tracing |
| Wood-Downes-Ferrés | Selected pediatric bronchiolitis/lower-respiratory variant | Wheeze/retractions/air entry/RR 0–3; HR/cyanosis 0–1 | Sum 0–14; bands 0–3, 4–7, 8–14 | Descriptive severity; no treatment/disposition |
| NIPS | Hospitalized newborn procedural pain | Face 0–1, cry 0–2, breathing/arms/legs/arousal 0–1 | Sum 0–7; catalog threshold 0–3 vs 4–7 | Observed pain score; no analgesic order |
| Westley Croup | Child with croup | Consciousness 0/5, cyanosis 0/4/5, stridor 0/1/2, air entry 0/1/2, retractions 0–3 | Sum 0–17; current bands 0–2, 3–7, 8–11, 12–17 | Severity label; no medication/admission decision |
| PRAM | Acute asthma ages 2 to <18; direct ED validation ages 2–17 | Suprasternal retraction 0/2; palpable scalene contraction 0/2; air entry 0–3; wheeze 0–3; stable room-air SpO₂ 0/1/2 | Sum 0–12; SpO₂ ≥95=0, 92–94=1, <92=2; stable on ambient air ≥1 minute; unconfirmed/supplemental-oxygen readings and unsupported ages return no score | Descriptive severity 0–3/4–7/8–12; no diagnosis, therapy or disposition direction |
| CDS | Young children with vomiting/diarrhea | Appearance, eyes, mucosa/saliva, tears; 0–2 each | Sum 0–8; current descriptors absent | Degree category; does not diagnose dehydration or prescribe fluid |
| PAS | Children evaluated for appendicitis | RIF tenderness 2; cough/percussion/hopping tenderness 2; anorexia, fever, nausea/vomiting, migration, leukocytosis, neutrophilia 1 each | Sum 0–10; catalog bands 0–3/4–6/7–10 | Risk category only; not diagnosis, imaging or surgery direction |
| Pediatric burn TBSA | Pediatric burn assessment | Selected age band; fraction 0/.25/.5/.75/1 for 19 bilateral/body regions | Sum regional age-specific percentages × fraction; guard total ≤100; exact table in source/code | Estimated TBSA only; no fluid/dose/treatment |
| PECARN TBI <2 | Eligible child <2 with blunt head trauma | Six booleans: AMS/GCS<15, palpable fracture, nonfrontal hematoma, LOC≥5 s, severe mechanism, abnormal behavior | First two high-risk group; remaining intermediate; none if all false | Predictor class; no CT/disposition recommendation; definitions/eligibility must be supplied |
| PECARN TBI ≥2 | Eligible child ≥2 with blunt head trauma | Six booleans: AMS/GCS<15, basilar signs, LOC, vomiting, severe mechanism, severe headache | First two high-risk; remaining intermediate | Same management limit |
| CATCH | Children satisfying CATCH minor-head-injury entry criteria | Four high-risk and three medium-risk booleans | High if any high; medium if none high and any medium; none otherwise | Predictor group only; no CT order |
| CHALICE | Children satisfying published head-injury scope | Fourteen historical/exam/mechanism booleans | Any true identifies a rule criterion | Criteria present/absent only; no CT order |
| SIPA | Pediatric trauma ages 4–16; original severe blunt-trauma derivation and prospective blunt solid-organ validation | Age years, HR bpm, SBP mmHg | Raw SI=HR/SBP; >1.22 at `[4,7)`, >1.0 at `[7,13)`, >0.9 at `[13,17)`; equality is within threshold; display rounding never controls classification | Verified trauma prognostic marker; not a general shock diagnosis or intervention order; ages outside `[4,17)` rejected |
| QTc Bazett | Adult-derived correction sometimes used in pediatrics | QT ms, HR bpm; RR=60/HR seconds | QT/√RR, rounded to 0.1 ms | Corrected interval only; no universal pediatric normal/abnormal cutoff |
| QTc Fridericia | Adult-derived/mixed pediatric use | QT ms, HR bpm | QT/∛RR, rounded 0.1 ms | Same |
| QTc Framingham | Adult Framingham derivation | QT ms, HR bpm | QT + 154×(1−RR), rounded 0.1 ms | Same; pediatric validation not established |
| QTc Hodges | Adult-derived/mixed | QT ms, HR bpm | QT + 1.75×(HR−60), rounded 0.1 ms | Same |
| Bedside Schwartz | Children with CKD; assay context matters | Height cm; serum creatinine mg/dL or µmol/L | Creatinine µmol/L ÷88.4; eGFR=0.413×height/creatinine; 0.1 precision | Estimate mL/min/1.73m²; no CKD diagnosis |
| Revised Schwartz | CKiD 2009 cohort | Height cm, creatinine, cystatin C mg/L, BUN mg/dL, sex | `39.1×(height_m/Cr)^0.516×(1.8/cystatinC)^0.294×(30/BUN)^0.169×sexFactor×(height_m/1.4)^0.188`; male factor 1.099 | Estimate only; assay/population limits apply |
| FLACC | Young/nonverbal children; original postoperative context | Face, legs, activity, cry, consolability; 0–2 each | Sum 0–10; current descriptors absent | Observed pain score; no analgesic order |

## GREEN/YELLOW candidates

| Tool | Evidence-supported population | Deterministic definition available? | Algorithm/output reconstruction status | Missing-data/rounding/timing gate |
|---|---|---|---|---|
| Fenton growth | Preterm infants, sex-specific; range depends on 2013/2025 | Yes after version/data lock | LMS/curve data to z-score/percentile; exact chosen dataset not yet imported | GA in weeks+days, sex, grams/cm, interpolation and transition policy must match official source |
| PASS | Acute asthma ages 1–18 in two PED cohorts | Nearly; full table required | Sum three observations (wheeze, expiratory phase, work of breathing); exact option points withheld until primary extraction | All items required; score only, no hospitalization recommendation |
| RISC | Hospitalized LRTI, <24 months, South African cohort | Yes in OA paper | Separate HIV-positive/negative additive mortality scores with published predictors | HIV model, age/SpO₂/WAZ cutoffs, missing predictor behavior exact from table |
| mRISC | Hospitalized respiratory illness <5 years, rural Kenya | Yes in OA Table 4 | Add history, exam, malaria/dehydration, WAZ and interaction points, including negative points | WAZ `≤−2`, malaria interaction, consciousness and missing-variable policy |
| Pediatric GCS | Depends on selected adaptation | No until variant selected | Eye+verbal+motor 3–15; exact age-specific verbal/motor wording differs by version | Untestable component, intubation/sedation, developmental disability and age boundary |
| pRIFLE | Critically ill children | Yes after baseline policy | Worst of eCCl-decrease and urine-output criteria into Risk/Injury/Failure; Loss/ESKD are duration outcomes | Baseline eCCl, Schwartz version, urine windows, unit conversion, missing path |
| Pediatric KDIGO | Pediatric AKI use; neonatal application needs separate rule | Yes after permission/scope | Stage by serum-creatinine change/multiple and urine output, using the worse criterion | Baseline window, absolute rise timing, urine-duration inclusivity, neonatal creatinine |
| pSOFA | Critically ill children; original validation in EHR cohort | Yes in OA table | Six organ components, each 0–4, summed; age-specific cardiovascular/renal thresholds | Worst-value window, ventilatory support, bilirubin/platelets/GCS units, missing organs |
| PELOD-2 | PICU children in 2013 multicenter cohort | Yes; public-domain score and supplement | Ten variables across five organ systems, source point matrix, continuous sum | Collection days/worst value, age MAP/creatinine, ventilation and unit rules |
| PRISM IV | First PICU admission, data from first 4 hours | Yes; public-domain algorithms in PMC | Neurologic/non-neurologic physiologic scores plus age, source, arrest, cancer, low-risk system coefficients | Worst-value selection, exclusions, 4-hour window, hospital outcome and missing data |
| PIM3 | ICU admission risk model, <18, multinational | Not yet implementation-grade | Logistic model using admission physiology/context and diagnostic categories | Exact coefficients/category list, pre-treatment acquisition and probability rounding |
| WHO growth module | WHO 0–5 and 5–19 standard populations | Yes for already loaded indicators | LMS z-score/percentile with WHO tail handling; only named missing indicators should be added | Exact day/month age, sex, recumbent/standing adjustment, interpolation, dataset version |
| CDC growth percentiles | US reference, generally ages 2–20 for child charts; infant files separate | Yes, official LMS files | LMS z-score/percentile from sex/age/measurement; public-domain data | Official age row convention, infant/child split, extreme z handling and unit conversion |
| STRONGkids | Hospitalized children in original Dutch survey | No until table obtained | Additive nutrition-screen score; exact wording, disease list, weights and bands pending | Missing anthropometry/intake and disease-list scope |
| PYMS | Hospitalized children in original validation | No until table obtained | Additive screening tool; exact BMI/weight-loss/intake points and bands pending | Age/BMI reference, missing anthropometry and rights |
| Visual Analogue Scale | Children capable of reliable self-report; age/cognition dependent | Yes after format lock | Patient marks position on independently drawn 100-mm horizontal line; output 0–100 mm | Rendering-to-mm mapping, touch/keyboard precision, unable-to-report state; do not add faces |

## RED/WHITE entries whose exact algorithm must not be reconstructed yet

| Tool | Known structure | Why exact inputs/points/output are intentionally not stated as complete |
|---|---|---|
| Combined Apgar | Expanded/combined neonatal assessment | Instrument identity and primary source unknown |
| New Ballard | Physical + neuromuscular maturity domains mapped to GA | Protected/incomplete form and conversion table |
| Dubowitz | Long physical/neurologic maturity examination | Exact version/form rights unresolved; Ballard preferred |
| Sarnat | Stage I/II/III clinical+EEG features | Classic vs modified and mixed-stage rule unresolved |
| Thompson HIE | Multi-item neonatal encephalopathy score | Complete table/cutoffs/reuse not established |
| Modified Finnegan | Withdrawal signs with weighted points | No canonical “modified” variant; protected forms |
| Eat, Sleep, Console | Functional eat/sleep/console assessment plus care process | Not an additive calculator; implementation would encode management/training |
| PIPP | Gestation/context, physiologic and behavioral pain indicators | Superseded version and table rights |
| PIPP-R | Revised gestation/context/physiologic/behavioral profile | Complete table/translation rights not cleared |
| CRIES | Cry, oxygen, vital-sign change, expression, sleep | Exact category wording/points are protected until permission |
| COMFORTneo | Behavioral neonatal pain/distress items | Official form/scoring manual/translation rights absent |
| Bhutani nomogram | TSB by postnatal hour plotted into historical risk zones | Underlying graph/data and current clinical role unresolved |
| Generic PEWS | Vital signs, behavior and concern vary by system | No single instrument exists |
| Brighton PEWS | Variant-specific observation score | Original reusable table absent |
| Bedside PEWS | Seven-domain deterioration score family | Table/inventor rights and escalation protocol unresolved |
| RDAI | Wheeze + retraction domains | Primary table not verified |
| BROSJOD | Bronchiolitis severity domains | Permissioned table absent |
| Benes | Unknown | Instrument identity unknown |
| Adapted Glasgow | Likely eye/verbal/motor | Unnamed variant duplicates pediatric GCS |
| Gorelick dehydration | Four- or ten-sign score | Variant conflict and exact table absent |
| Regional sepsis scores | Undefined family | No single score or population |
| PELOD | Twelve variables/six organ systems | Superseded by PELOD-2; no need to reproduce legacy table now |
| PRISM III | Seventeen physiologic variables and mortality model | Superseded; rights/model complexity |
| PIM2 | Admission mortality model | Superseded by PIM3; coefficient set must never be mixed |
| WHO growth percentiles | Wrapper over WHO module | Duplicate surface; same algorithm as module |
| Orbegozo percentiles | Regional sex/age reference tables | Dataset/version/license absent |
| BMI percentile | WHO module capability | Duplicate catalog surface; not a separate formula |
| Head circumference percentile | WHO 0–5 module capability | Duplicate surface; source beyond age five unresolved |
| STAMP | Nutritional screening form | Protected exact items/points |
| rFLACC | FLACC domains plus individualized behaviors | Revised table and customization rules protected/unclear |
| CHEOPS | Postoperative behavioral domains | Primary table not obtained |
| Wong-Baker FACES | Six official faces and 0–10 self-report anchors | Proprietary unmodified artwork/wording requires licence |
| Pediatric CPR | Guideline pathway | Direct treatment algorithm; protected and version-sensitive |
| Neonatal CPR | Birth-resuscitation pathway | Separate guideline, protected/high-risk |
| Pediatric bradycardia | Rhythm + perfusion algorithm | Direct treatment/dose/electric actions |
| Pediatric tachycardia | QRS/rhythm/stability algorithm | Direct treatment/dose/electric actions |
| Shockable rhythm | Arrest algorithm | Direct treatment/energy/drug sequence |
| Non-shockable rhythm | Arrest algorithm | Direct treatment/drug sequence |
| Resuscitation dose/weight/energy | Multiple weight, airway, energy and drug formulas | Undefined bundle and direct management output |
| Bayley | Proprietary item sets and norms | Licensed commercial assessment |
| Denver II | 125 tasks with age lines and pass/fail interpretation | Licensed test/forms and normative content |
| Mass-casualty triage | JumpSTART/SALT/other algorithms | Family not selected; disposition consequence |
| Adolescent depression risk | Undefined questionnaire | Must name instrument and safeguarding pathway |
| Adolescent behavior risk | Undefined questionnaire/interview | Must name instrument, privacy and safeguarding workflow |

## Global missing-data and management policy for Phase B

- Never silently impute a clinical observation, laboratory value, baseline, age, sex or treatment condition unless the selected primary model explicitly defines that imputation.
- A “not measured” value is not normal. If the model has a source-defined missing-data rule, encode and test it explicitly; otherwise return an incomplete result.
- Preserve exact inclusive/exclusive cutoffs and acquisition windows. Decimal ages require a declared conversion policy.
- Scores may report the validated construct only. Medication, fluid, energy, imaging, referral, admission/discharge and resuscitation actions remain out of calculator scope unless independently authorized by a later evidence gate.
