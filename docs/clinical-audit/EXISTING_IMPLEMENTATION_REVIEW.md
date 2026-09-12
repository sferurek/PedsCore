# Existing implementation reverse QA

Audit date: 2026-09-12. The Phase A assessment was read-only. Batch 0A subsequently corrected and re-verified SIPA. Batch 0B1 reconciled and corrected PRAM under its dedicated preview stop gate; production remains unchanged pending owner approval.

## Urgent review queue

| Severity | Tool(s) | Observed implementation | Evidence conflict or gap | Required next action |
|---|---|---|---|---|
| Resolved | SIPA | Original finding: age bands `4–<6`, `6–<12`, `≥12`; thresholds 1.2/1.0/0.9; classification on rounded ratio | Batch 0A confirmed original and prospective definitions: 4–6, 7–12, 13–16 and strict >1.22/>1.0/>0.9 (PMIDs 25638631, 27717564) | Corrected to `[4,7)`, `[7,13)`, `[13,17)`; raw-ratio classification; unsupported ages rejected; complete boundary suite added. See `SIPA_FORENSIC_REVIEW.md` |
| Resolved | PRAM | Original finding: SpO₂ input had no acquisition condition, no validated age gate, and population wording included generic wheeze | 2000/2008 studies define the score and ages 2-17; BCCH/Sainte-Justine-derived operational material requires stable ambient-air SpO₂ for at least 1 minute | Batch 0B1 requires age 2-<18 and explicit qualifying SpO₂ condition; unconfirmed/supplemental-oxygen readings return no score. See `PRAM_FORENSIC_REVIEW.md` |
| Moderate/high | Apgar, Silverman-Andersen, CDS, FLACC | Domain choices are mostly labels such as “0 points” rather than clinical observations | A user cannot map an observation to a point from PedsCore; faithful instrument definition is absent | Rights review, source-exact independent descriptors, clinician review, then source-derived tests |
| Moderate | Apgar | Score 0–3 returns no interpretation; 4–7 and 8–10 bands are labelled but self-declared as awaiting tracing | No complete output partition; original 1953 paper alone does not justify modern action-oriented interpretation | Trace intended bands to a modern professional source and keep resuscitation decisions out of scope |

## Per-tool disposition

| Tool | Review result | Formula/rule | Inputs and boundaries | Output and management gate | Evidence/reuse conclusion |
|---|---|---|---|---|---|
| Apgar | **MAJOR REVIEW NEEDED** | Sum is mechanically correct | Heart rate is described; four domains are point-only | 0–3 uncovered; no management output | Primary PMID verified, complete modern definition and reuse unresolved |
| Silverman-Andersen | **MAJOR REVIEW NEEDED** | Five 0–2 domains sum to 0–10 | Every domain is point-only | Severity bands state “pending final validation” | Original AAP article identified; operational table and reuse not closed |
| Wood-Downes-Ferrés | **REUSE REVIEW NEEDED** | Selected six-domain sum and 0–14 bounds are internally tested | Selected variant is explicit | Descriptive only; management excluded | Original Wood-Downes paper is not the implemented Ferrés table; secondary open table remains provenance weakness |
| NIPS | **REUSE REVIEW NEEDED** | Six-domain 0–7 score matches the catalog model | Operational labels are present | Threshold >3 is descriptive only | Primary PMID verified; no affirmative electronic-reuse conclusion for wording |
| Westley Croup | **MINOR REVIEW NEEDED** | Five-domain 0–17 sum appears internally consistent | Operational labels are present | Bands are descriptive and separated from management | Derivation PMID/DOI verified; trace later band source and reuse status |
| PRAM | **VERIFIED** | Canonical five-domain sum 0-12; every option and boundary independently tested | Age 2-<18; stable room-air SpO₂ for at least 1 minute required; asymmetry and assessment modality documented | Descriptive 0-3/4-7/8-12 bands; no management/disposition output | Original, pediatric, external-validation, operational, variant, and reuse gates closed in `PRAM_FORENSIC_REVIEW.md` |
| Clinical Dehydration Scale | **MAJOR REVIEW NEEDED** | Four domains sum to 0–8 | All domains are point-only | Bands are marked pending | Primary and external studies verified; external discrimination is fair, not diagnostic |
| Pediatric Appendicitis Score | **MINOR REVIEW NEEDED** | Eight items sum to 0–10 | Operational items exist | Non-diagnostic caveats are good; band provenance needs exact tracing | Pediatric derivation verified; systematic reviews show imperfect rule performance |
| Pediatric Burn TBSA | **REUSE REVIEW NEEDED** | Regional percentages and fractional contributions are deterministic | Age bands and fractions are explicit | Estimate only; fluids/treatment excluded | Institutional numeric table is identified, but public availability is not an MIT-compatible license grant |
| PECARN TBI under 2 | **MINOR REVIEW NEEDED** | High/intermediate predictor grouping matches selected rule structure | Eligibility, altered mental status and severe mechanism are not fully defined in input help | Informational, no CT directive | Strong derivation/external validation; ensure application only to published population |
| PECARN TBI 2 or older | **MINOR REVIEW NEEDED** | High/intermediate grouping matches selected rule structure | Same definition/eligibility gap | Informational, no CT directive | Same conclusion |
| CATCH | **MINOR REVIEW NEEDED** | High/medium predictor groups are encoded and tested | Rule entry criteria are not part of calculator gating | Informational, no CT directive | Open primary paper and validation trace exist; preserve population-specific use |
| CHALICE | **MINOR REVIEW NEEDED** | Fourteen criteria are encoded and tested | Complex definitions are shortened | Informational, no CT directive | Open primary paper and validation trace exist; shortened wording needs source comparison |
| SIPA | **VERIFIED** | HR/SBP, unrounded classification, and displayed rounding tested independently | Exact original/ATOMAC+ thresholds, strict comparators, and `[4,17)` support implemented | Trauma-specific prognostic wording; no diagnosis or management direction | Later expanded 1–3/17-year and rounded 1.20 variants documented but not mixed into canonical SIPA |
| QTc Bazett | **EVIDENCE GAP** | Formula is mathematically implemented | Numerical guards exist | Numeric result only with age/sex/context warning | Adult-derived; pediatric rate-dependent bias and intended population need explicit evidence |
| QTc Fridericia | **EVIDENCE GAP** | Formula is mathematically implemented | Numerical guards exist | Numeric result only | Adult-derived/mixed pediatric use; no pediatric validation source in catalog |
| QTc Framingham | **EVIDENCE GAP** | Formula matches the adult Framingham expression | Numerical guards exist | Numeric result only | Adult derivation; pediatric applicability is not established in catalog |
| QTc Hodges | **EVIDENCE GAP** | Linear formula is implemented | Numerical guards exist | Numeric result only | Original bibliographic identity incomplete; pediatric evidence not established |
| Bedside Schwartz | **MINOR REVIEW NEEDED** | `0.413 × height / creatinine` and µmol/L conversion are deterministic | Positive/extreme guards exist | Estimate only, no CKD diagnosis | Pediatric CKiD source verified; assay calibration and intended CKD population should be explicit |
| Revised Schwartz | **MINOR REVIEW NEEDED** | 2009 multivariable equation is encoded with sex factor | Unit conversion and inputs are tested | Estimate only | Source/DOI/PMID verified; independent constant-by-constant check and assay context still warranted |
| FLACC | **MAJOR REVIEW NEEDED** | Five 0–2 domains sum to 0–10 | All domains are point-only | Bands marked pending | Primary publication record is incomplete and item/form reuse not cleared |

## Totals

| Review result | Count |
|---|---:|
| VERIFIED | 2 |
| MINOR REVIEW NEEDED | 8 |
| MAJOR REVIEW NEEDED | 4 |
| EVIDENCE GAP | 4 |
| REUSE REVIEW NEEDED | 3 |
| **Total active tools** | **21** |

SIPA and PRAM have closed every Phase A evidence, definition, population, reuse, and independent-test gate. A correct-looking formula with tests alone remains insufficient for `VERIFIED` status.

## Verification policy for the corrective phase

Any later correction should use a separate stop gate: source-diff, clinician approval, boundary vector tests, forbidden-management-language tests, full runtime regression, preview, and owner approval. This audit does not authorize silent production fixes.
