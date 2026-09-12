# APGAR forensic clinical review — Batch 0B2

Audit date: 2026-09-12

## Decision

Stop Gate A: **C — MATERIAL CORRECTION REQUIRED**.

The prior calculator summed five numeric values correctly, but four domains were exposed as generic `0/1/2 points` choices. The prior interpretation omitted 0–3 and used unclosed 4–7/8–10 labels. It also had no assessment-time field and no safety boundary around resuscitation, prognosis, or asphyxia.

## Canonical definition

Apgar is a rapid descriptive assessment of the newborn's physiologic condition immediately after birth and response to resuscitation when applicable. It is not a diagnosis, treatment algorithm, resuscitation trigger, or individual prognostic instrument.

| Domain | 0 | 1 | 2 |
|---|---|---|---|
| Heart rate | Absent | <100 beats/minute | ≥100 beats/minute |
| Respiratory effort | Absent; not breathing | Slow, irregular, weak or gasping | Good respirations with vigorous cry |
| Muscle tone | Limp, no activity | Some flexion of extremities | Active motion or well flexed |
| Reflex irritability | No response to stimulation | Grimace or weak response | Cry, cough, sneeze or vigorous withdrawal |
| Color/appearance | Blue or pale all over | Pink body with blue extremities | Completely pink |

Total is 0–10. Descriptor wording is independently expressed from source criteria; no source form or table layout is reproduced.

## Timing and interpretation

The calculator records one assessment at a time at **1 or 5 minutes**. All newborns should be recorded at 1 and 5 minutes. If the 5-minute score is <7, repeat at 5-minute intervals through 20 minutes; the present single-assessment calculator does not attempt to enforce a serial workflow.

The categorical bands are applied only to a **5-minute** score in term and late-preterm infants:

- 7–10: reassuring
- 4–6: moderately abnormal
- 0–3: low

No categorical band is shown for a 1-minute score. These labels do not diagnose asphyxia, encephalopathy, or neurologic outcome.

## Safety and limitations

Resuscitation must begin based on the newborn's condition before the 1-minute Apgar is assigned. Apgar must not delay or determine initial resuscitation. A score during resuscitation is not equivalent to a score in a spontaneously breathing infant.

Scores are influenced by gestational age, prematurity, maternal medication or anesthesia, congenital anomalies, trauma, physiologic transition, intervention, and interobserver subjectivity. Color, tone, and reflex irritability are particularly subjective; color may be less reliable for assessing cyanosis across skin pigmentation. Apgar alone does not establish asphyxia, predict individual mortality or neurologic outcome, or diagnose hypoxic-ischemic injury.

## Sources

1. Apgar V. *A Proposal for a New Method of Evaluation of the Newborn Infant.* Curr Res Anesth Analg. 1953;32(4):260–267. DOI `10.1213/00000539-195301000-00041`; PMID `13083014`. Original five-domain 0–2 method.
2. American Academy of Pediatrics Committee on Fetus and Newborn; American College of Obstetricians and Gynecologists Committee on Obstetric Practice. *The Apgar Score.* Pediatrics. 2015;136(4):819–822. DOI `10.1542/peds.2015-2651`; PMID `26416932`. Joint policy on timing, repeat scoring, limitations, and resuscitation safety. Parallel Obstet Gynecol statement DOI `10.1097/AOG.0000000000001108`; PMID `26393460`.
3. ACOG/AAP Task Force. *Neonatal Encephalopathy and Neurologic Outcome, Second Edition.* 2014. AAP endorsement DOI `10.1542/peds.2014-0724`. Five-minute interpretation bands and multidimensional limits on causal inference.

## Population and variants

The instrument is neonatal and time-after-birth based; no age-in-years field is appropriate. Prematurity and other listed factors affect applicability and interpretation rather than changing the classic five-domain arithmetic. Expanded/Combined Apgar records concurrent interventions and is a separate variant; it is not mixed into this calculator and remains deferred pending a separate source and rights review.

## Reuse

The numerical scoring method and independently worded clinical criteria are implemented in PedsCore's MIT codebase with citations. No copyrighted source form, table layout, logo, or proprietary expanded report is reproduced. No Apgar-specific electronic licence restriction was identified; this does not imply permission to copy source presentation materials.

## Correction and tests

The catalog now exposes every clinically meaningful descriptor, an assessment-time selector, 0–3/4–6/7–10 five-minute bands, and safety wording. The calculator scores 0–10, returns no interpretation at 1 minute, and preserves the safety boundary against delaying resuscitation. Tests cover all 15 domain states, totals 0–10, interpretation boundaries 3/4/6/7/10, timing, missing/invalid/non-finite inputs, traceability, and safety claims.

**APGAR = VERIFIED** after preview validation and owner approval; production is unchanged by this task.
