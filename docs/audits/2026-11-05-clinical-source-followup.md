# PELOD-2 and pSOFA: source follow-up

Date: 2026-11-05. Reviewer: Codex, AI technical/source desk review. This supplements the five-tool review in PR #170. It records evidence and uncertainty; no algorithm, threshold, evidence status or independent-review status changes.

## PELOD-2

The [2013 original study](https://pubmed.ncbi.nlm.nih.gov/23685639/) is the derivation reference; its complete original table and reuse permissions have not been reconciled here. The [2015 authors' study](https://link.springer.com/article/10.1186/s13054-015-1054-y) is now accessible through the publisher. It describes daily worst values and context-dependent handling of unmeasured variables. That resolves the earlier access obstacle to the daily study, not the whole original-table review.

An [ESPNIC calculator credited to S. Leteurtre and JB Baudelet](https://www.espnic.eu/calcolatori/Paediatric%20Logistic%20Organ%20Dysfunction%202%20Score%20Calculator%20_%20Professional%20Resources%20_%20Education%20-%20European%20Society%20of%20Paediatric%20Neonatal%20Intensive%20Care%20-%20ESPNIC_files.htm) explicitly supports an unavailable-data option, treating it as normal, and specifies educational/research use. It distinguishes FiO2 percent in its interface from a pressure ratio.

PedsCore requires all listed inputs and uses FiO2 as a fraction. This is a stricter data-completeness workflow, not evidence of instrument equivalence or an automatic reason to change missing-data logic. A reviewer must resolve the selected use case, original table, units/conversions, age/population limits and rights. Do not silently substitute zero, carry forward observations, or alter thresholds. Existing PELOD-2 fixtures cover selected cut points and reference outputs; they do not establish independent clinical fidelity.

## pSOFA

Inspected the original [JAMA Table 1 image and footnotes](https://jamanetwork.com/journals/jamapediatrics/fullarticle/2646857), not only its HTML transcription. The image itself overlaps S/F 264 and prints bilirubin >12.0. Footnotes restrict S/F to SpO2 ≤97%, specify sustained vasoactive assessment and explain the normal assumption for unmeasured variables. The ambiguity is therefore present in the published table, not just HTML extraction.

Current `calculators/psofa.ts` assigns S/F 264 one point, bilirubin 12 four points, accepts a precomputed S/F ratio without a saturation input, and blocks missing required values. These are implementation observations, not newly endorsed clinical choices. Boundary/footnote resolution needs a qualified reviewer and an authoritative clarification, correction or source specification. No boundary or clinical workflow was changed in this documentation PR.

Image inspected locally: SHA-256 `eb4ee277308fd2ea8e5c7696214662bc45589b84d587e165864f4b2c47746fb9`; the copyrighted image is not redistributed in this repository. The supplement's published listing concerns performance analyses; no clarifying correction was established in this review.

## Decision record

| Question | Evidence now available | Remaining requirement |
| --- | --- | --- |
| PELOD-2 daily methods access | Publisher full text read | Original 2013 table and rights reconciliation |
| PELOD-2 missing values | Authors' resource differs from strict PedsCore form | Named clinical decision on intended workflow |
| pSOFA exact boundaries | Original image confirms overlap/gap | Authoritative clarification before changing thresholds |
| pSOFA acquisition conditions | Footnotes inspected, engine interface inspected | Review how eligibility/measurement context is enforced |
| Independent clinical review | No identifiable independent reviewer signed off | Complete the project review template against an exact commit |

Use the [clinical review program](../CLINICAL_REVIEW_PROGRAM.md) and dedicated source-backed PRs for any later behavior change. PIM3's separate input-category guard is in PR #171 and does not resolve these questions.
