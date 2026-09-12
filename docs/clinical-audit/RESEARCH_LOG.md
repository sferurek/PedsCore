# Reproducible research log

Access date for external web sources: **2026-09-12**. Searches used title/acronym plus `primary`, `derivation`, `validation`, `pediatric`, `license`, `copyright`, `permission`, DOI/PMID, and official-domain restrictions (`pubmed.ncbi.nlm.nih.gov`, `pmc.ncbi.nlm.nih.gov`, WHO, CDC, rights-holder sites). Existing `docs/evidence/` dossiers were reviewed first; external research targeted identity, version, pediatric evidence, current relevance and reuse gaps. Calculator aggregators were not used as authoritative definitions.

## Repository snapshot

- Canonical source: `getAllTools()` from `packages/core` build output, cross-checked against `packages/core/src/catalog/clinicalTools.ts` and calculator registry/tests.
- 81 catalog entries; 21 implemented; 4 partial; 56 other non-active entries.
- 94 reference records; 46 unique linked URLs; 33 records with PMID; 39 with DOI; no populated structured `pmcid` field.
- Existing evidence area contains source dossiers and decision packs; those are prior research inputs, not proof that a tool is implementation-ready.

## Per-tool search log

| ID | Tool | Searches/sources examined | Primary identity | Validation/current source | Reuse source | Unresolved question |
|---:|---|---|---|---|---|---|
| 1 | Apgar | Catalog, calculator/tests, title+PMID | Apgar 1953, PMID 13083014 | Modern interpretation not sourced | None located | Full descriptors and 0–3 interpretation |
| 2 | Combined Apgar | Catalog and evidence dossiers; name/variant search trail | Not verified | None | None | What exact instrument is intended? |
| 3 | Silverman-Andersen | Calculator/tests; AAP original article | Silverman & Andersen 1956 | No modern band source selected | AAP publisher terms only | Descriptor table and band provenance |
| 4 | Wood-Downes-Ferrés | Existing bronchiolitis dossier; Wood 1972 DOI; open secondary Ferrés table | Wood et al. 1972 is source anchor, not exact variant | Regional secondary table | No explicit instrument licence | Primary Ferrés provenance/reuse |
| 5 | New Ballard | Existing tool dossier; title/DOI/PMID | Ballard et al. 1991, PMID 1880657 | Broad neonatal use | Paywalled/copyrighted form | Electronic form/conversion rights |
| 6 | Dubowitz | Catalog/dossier; original-method trail | Historical Dubowitz assessment | Ballard offers simpler successor | No open form terms | Exact version and long-form rights |
| 7 | Sarnat | Tool dossier; DOI/PMID; classic vs modified search | Sarnat & Sarnat 1976, PMID 987769 | Modified staging variants | No table grant | Mixed-stage algorithm and variant |
| 8 | Thompson HIE | Detailed evidence file and source identifiers | Thompson score publication identified in repo | Neonatal validation trail | No open table terms | Complete item table/cutoffs |
| 9 | Modified Finnegan | Evidence matrix; modified-form/version searches | Finnegan family, no single “modified” canonical form | ESC-NOW compared usual Finnegan care | No open form grant | Version and permission |
| 10 | Eat, Sleep, Console | PubMed/PMC trial search | Young et al. 2023, PMID 37125831, PMCID PMC10433732 | 26-hospital cluster RCT, ≥36 weeks | Article access, workflow materials separate | Product form: training/care pathway, not score |
| 11 | NIPS | Calculator/tests; PMID/title | Lawrence et al., PMID 8413140 | Existing dossier | No affirmative electronic rights | Item wording reuse |
| 12 | PIPP | PubMed original development | Stevens et al., PMID 8722730 | Superseded by PIPP-R | Publisher article only | Rights and reason to keep original |
| 13 | PIPP-R | PubMed validation + translation studies | Gibbins et al. 2014, PMID 24491511 | n=202; translated adaptations exist | Elsevier copyright statement | ES/EN electronic rights |
| 14 | CRIES | PubMed primary and prior copyright dossier | Krechel & Bildner 1995, PMID 8521311 | Initial validity/reliability | Publisher copyright; no grant | Rights-holder permission |
| 15 | COMFORTneo | PubMed current validation + prior dossier | Instrument source trail in repo | 2023 validation PMID 36746985 | Springer/publisher copyright | Official form/translation rights |
| 16 | Bhutani nomogram | Existing bilirubin dossier; nomogram/version search | Historical hour-specific nomogram | Modern bilirubin guidance has changed | Graph/data reuse unclear | Whether any non-management reference use remains valuable |
| 17 | Fenton growth | PubMed/PMC 2013; AAP current page; 2025 author site/paper | Fenton & Kim 2013, PMID 23601190 | AAP recommends Fenton; 2025 third generation now exists | 2013 CC BY 2.0; 2025 data terms conditional | Select version and obtain exact data licence |
| 18 | Generic PEWS | Evidence dossier; PEWS family/validation search | No single primary instrument | Variant comparisons show differing performance | N/A | Keep umbrella non-executable |
| 19 | Brighton PEWS | Prior PEWS dossier; exact-table searches | Variant identified | Modified variants exist | Reusable original table absent | Obtain original table/rights |
| 20 | Bedside PEWS | Prior dossier; inventor/table search | Bedside PEWS publication trail | Pediatric validations exist | Inventor/table rights unresolved | Permission and protocol separation |
| 21 | Westley Croup | Calculator/tests; DOI/PMID | Westley et al. 1978, PMID 347921 | Current use corroborated | No explicit scale licence | Later severity-band source |
| 22 | PRAM | Calculator/tests; full 2008 paper/figure; 2000 derivation; 2010 external validation; 2013 teaching study; BCCH operational policy; variant and rights searches | Chalut et al. 2000, PMID 11113831 | Ducharme et al. 2008, PMID 18346499; Gouin et al. 2010, PMID 20624139 | Algorithm and short functional descriptors independently represented; no source figure/form/media copied | Resolved in Batch 0B1: age 2-<18, acute asthma, canonical domains, stable room-air SpO₂ ≥1 minute, unscorable supplemental-oxygen reading, descriptive output |
| 23 | RDAI | Prior dossier; acronym+bronchiolitis+primary queries | Lowell instrument likely; not verified to implementation standard | Reliability/use studies secondary | None | Primary table and provenance |
| 24 | BROSJOD | Prior dossier; Spanish bronchiolitis source/permission trail | Instrument identified regionally | Limited/regional | Permission-sensitive table | Written permission |
| 25 | PASS | PubMed primary; systematic respiratory score review | Gorelick et al. 2004, PMID 14709423, DOI 10.1197/j.aem.2003.07.015 | n=852 + n=369; AUC hospitalization 0.82 | Full table terms not established | Obtain full table and independent descriptors |
| 26 | RISC | PubMed/PMC derivation; later India validation searches | Reed et al. 2012, PMID 22238570, PMCID PMC3251620 | Later setting validations mixed | PLOS OA licence | HIV-model product policy |
| 27 | mRISC | PubMed/PMC Kenya paper; pneumonia score systematic review | Emukule et al. 2014, PMCID PMC3965502 | c-statistic 0.85; failed portability where variables absent | PLOS OA licence | Narrow setting and malaria/WAZ requirements |
| 28 | Pediatric GCS | PubMed reliability, performance; official Glasgow permissions; EMSC table | Multiple pediatric adaptations | CHOP 2019 reliability PMID 30946292; younger/developmentally disabled limitations | Base GCS free for care/research with acknowledgement | Select one adaptation and its rights |
| 29 | Benes | Catalog/dossiers; name+score+pediatric searches | Not verified | None | None | Identity |
| 30 | Adapted Glasgow | Catalog/dossiers; adaptation queries | Not verified | Overlaps pediatric GCS | None | Exact named version |
| 31 | CDS | Calculator/tests; primary/validation; external comparison/meta-analysis | Friedman et al. 2004, PMID 15289767 | Jauregui 2014 AUC 0.72; meta-analysis | No explicit scale licence | Full descriptors/reuse and honest performance text |
| 32 | PAS | Calculator/tests; Samuel primary; systematic reviews | Samuel 2002, PMID 12037754 | Reviews PMID 23177898 and 24731432 | No explicit instrument licence | Exact band provenance |
| 33 | Gorelick dehydration | Prior dossier; original and 4-vs-10 queries; external comparison | Primary DOI/PMID in repo | External evidence fair | Table terms unknown | Variant selection and table |
| 34 | Pediatric burn TBSA | Calculator/tests; VUMC/RCH/JTS/PCH official documents | Modified Lund-Browder institutional table | Pediatric clinical guidance | Public PDF is not licence grant | Numeric table permission/independent factual expression |
| 35 | PECARN <2 | Calculator/tests; derivation; French and PREDICT external validation | Kuppermann et al. 2009, PMID 19758692 | Babl et al. 2017, PMID 28410792 | Article terms; independent rule expression | Eligibility and criterion help text |
| 36 | PECARN ≥2 | Same source set as <2 | Kuppermann et al. 2009 | Babl et al. 2017 | Same | Same, age-specific |
| 37 | CATCH | Calculator/tests; open CMAJ primary; PREDICT validation | Osmond et al. 2010, PMID 20142371, PMCID PMC2831681 | Babl et al. 2017 | Open article; independent UI | Entry criteria visibility |
| 38 | CHALICE | Calculator/tests; open ADC primary; PREDICT validation | Dunning et al. 2006, PMID 17056862, PMCID PMC2082967 | Babl et al. 2017 | Open article; independent UI | Shortened complex definitions |
| 39 | SIPA | Calculator/tests; original derivation, prospective validation, expanded external validations, systematic review, reuse rule | Acker et al. PMID 25638631: strict >1.22/>1.0/>0.9 at ages 4–6/7–12/13–16 | ATOMAC+ PMID 27717564 retained exact definition; Nordin PMID 29108845 and Schauer PMCID PMC7331217 document later extensions; Yu PMCID PMC11257222 corroborates variation | Formula/cutoffs independently expressed; copyrighted prose/tables not reproduced; U.S. Copyright Office Circular 33 reviewed | Resolved: canonical original version uses `[4,7)`, `[7,13)`, `[13,17)`, strict `>`, raw-ratio classification; Batch 0A VERIFIED |
| 40 | Regional sepsis scores | Catalog/dossier; family/name queries | None | None | None | Replace umbrella with named tool |
| 41 | QTc Bazett | Calculator/tests; original formula trail | Bazett 1920 | Pediatric applicability searches | Arithmetic independently expressible | Pediatric evidence and rate bias statement |
| 42 | QTc Fridericia | Calculator/tests; DOI | Fridericia 1920 DOI verified | Pediatric applicability searches | Arithmetic independently expressible | Pediatric evidence |
| 43 | QTc Framingham | Calculator/tests; PubMed | Sagie et al. 1992, PMID 1519533 | Adult cohort | Arithmetic independently expressible | Pediatric applicability |
| 44 | QTc Hodges | Calculator/tests; formula review DOI | Original identity incomplete | Modern formula comparison | Arithmetic independently expressible | Original citation and pediatric validation |
| 45 | Bedside Schwartz | Calculator/tests; CKiD paper | Schwartz et al. 2009, PMID 19158356 | Pediatric CKD cohort | Formula independently expressible | Assay/method boundaries |
| 46 | Revised Schwartz | Calculator/tests; CKiD paper/PMC | Schwartz et al. 2009, PMCID PMC2653687 | Same | Formula independently expressible | Constant-by-constant independent QA |
| 47 | pRIFLE | Existing dossier; PubMed primary and external evaluation | Akcan-Arikan 2007, PMID 17396113 | PMID 18521567 | Likely independent criteria; no affirmative table grant | Baseline eCCl/urine/missing-data policy |
| 48 | Pediatric KDIGO | KDIGO 2012 source trail; official rights FAQ | KDIGO guideline | Pediatric application literature | KDIGO says permission for tables/adaptations | Permission and neonatal/baseline scope |
| 49 | pSOFA | PubMed/PMC primary validation; dossier | Matics & Sanchez-Pinto 2017, PMID 28783810, PMCID PMC6583375 | n=6,303 EHR cohort | Verify PMC article licence | Exact table and high-risk QA |
| 50 | PELOD | PubMed validation and external calibration | Leteurtre et al. 2003, PMID 12885479 | External calibration PMID 19360395 | No express PD statement for old score | Superseded by PELOD-2 |
| 51 | PELOD-2 | PubMed primary, supplement, daily validation | Leteurtre et al. 2013, PMID 23685639 | Daily score PMID 26369662 | Primary abstract says public domain | Freeze supplement and acquisition rules |
| 52 | PRISM III | PubMed primary/dossier | Pollack et al. 1996, PMID 8706448 | Multicenter n=11,165 | No open algorithm conclusion | Superseded/rights |
| 53 | PRISM IV | PubMed and PMC full algorithm | Pollack et al. 2016, PMID 26492059, PMCID PMC5048467 | Derivation/validation split n=10,078 | Authors place algorithms in public domain | 4-hour window and model governance |
| 54 | PIM2 | Existing dossier; PIM comparison/validation searches | Primary source trail incomplete in catalog | External validations | Rights unclear | Defer to PIM3 |
| 55 | PIM3 | PubMed primary and validation/comparison searches | Straney et al. 2013, PMID 23863821 | n=53,112; geographic calibration differences | Official/electronic terms not located | Coefficients/categories/rights |
| 56 | WHO growth module | Source code/tests; WHO standards/data terms | WHO MGRS/5–19 official modules | Existing extensive test suite | WHO dataset terms reviewed | Exact remaining scope and manifest |
| 57 | WHO growth percentiles | Same WHO module/source set | Same | Same | Same | Duplicate catalog surface |
| 58 | CDC growth percentiles | CDC official chart/LMS files/methods | CDC 2000 growth reference | Official files unchanged since release | Methods publication says public domain | US-context labeling and version hashes |
| 59 | Orbegozo percentiles | Existing dossier; foundation/data/license searches | Not implementation-grade | Regional use | No redistribution terms | Official data and licence |
| 60 | BMI percentile | WHO source/tests | WHO BMI-for-age | Existing module tests | WHO terms | Duplicate surface and age-source policy |
| 61 | Head circumference percentile | WHO source/tests | WHO HC-for-age 0–5 | Existing module tests | WHO terms | Duplicate surface and >5 policy |
| 62 | STAMP | Existing dossier; official-form/licence searches | Tool source identified | Pediatric studies | Copyright-marked form | Permission |
| 63 | STRONGkids | PubMed primary/dossier; table/license searches | Hulst et al. 2010, PMID 19682776 | International validations noted | No official open licence | Full table, disease list, rights |
| 64 | PYMS | Existing dossier; title/DOI/PMID/table searches | Primary identity in dossier | Pediatric validation context | No official open licence | Full table and rights |
| 65 | FLACC | Calculator/tests; original article record; rFLACC distinction | Merkel et al. 1997 | Widespread validation trail | No affirmative form licence | Descriptors and rights |
| 66 | rFLACC | PubMed validation/dossier | Malviya et al. 2006, PMID 16430459 | Cognitive-impairment population | No open revised-form rights | Individualized descriptor handling |
| 67 | CHEOPS | Detailed dossier; original chapter searches | Original source not directly obtained | Pediatric postoperative use | Unknown | Primary table and permission |
| 68 | Wong-Baker FACES | Official scale, terms, FAQ/access pages | Official foundation instrument | Self-report use instructions | License likely for facility/software/publication | Written agreement |
| 69 | VAS | Existing detailed dossier; pediatric VAS format/validation trail; rights comparison | Generic visual analogue method | Age/cognitive ability dependent | Independent line design; no faces | Lock format/population/source examples |
| 70 | Pediatric CPR | AHA/ERC 2025 guidelines; PubMed CoSTR; AHA permissions | ERC 2025 PLS PMID 41117571 / AHA 2025 | Current guideline cycle | AHA bars ECC electronic algorithm use through ordinary route | Select organization/licence/governance |
| 71 | Neonatal CPR | Official newborn resuscitation guideline family | Separate from pediatric PLS | Current 2025 cycle | Rights organization-specific | Select source and governance |
| 72 | Pediatric bradycardia | AHA/ERC guideline assets and AHA legal policy | Guideline-defined | Current 2025 cycle | AHA restriction explicit | Electronic licence and safety system |
| 73 | Pediatric tachycardia | Same | Guideline-defined | Current 2025 cycle | Same | Same plus rhythm interpretation |
| 74 | Shockable rhythm | Same | Guideline-defined | Current 2025 cycle | Same | Same |
| 75 | Non-shockable rhythm | Same | Guideline-defined | Current 2025 cycle | Same | Same |
| 76 | Resuscitation dose/weight/energy | Catalog/dossier; guideline/formula family searches | No single tool | Current guideline-dependent | AHA/ERC terms apply to source material | Split bundle and govern dosing |
| 77 | Bayley | Pearson official product, permissions, technical update | Bayley-4 | Normative update 2023 | Pearson permission/licence required | License/API and category correction |
| 78 | Denver II | AAP primary page, Hogrefe product, measurement database | Frankenburg et al. 1992 | Birth–6, older norms | Purchased/copyrighted materials | License and category correction |
| 79 | Mass-casualty triage | Catalog/dossier; pediatric triage family searches | None selected | Algorithm-specific | Unknown | Choose JumpSTART/SALT/etc and rights |
| 80 | Adolescent depression risk | Catalog/dossier; named-tool necessity review | None selected | Instrument-specific | Instrument-specific | Name tool, licensing and self-harm pathway |
| 81 | Adolescent behavior risk | Catalog/dossier; named-tool necessity review | None selected | Instrument-specific | Instrument-specific | Name tool, privacy and safeguarding |

## Decision-relevant external evidence ledger

Thirty-nine distinct source pages/publications were retained as decision-relevant snapshots. Categories overlap; a primary publication may also contain validation and a licence statement.

### Primary/derivation and full definitions

1. Apgar 1953 — PMID [13083014](https://pubmed.ncbi.nlm.nih.gov/13083014/).
2. Silverman-Andersen 1956 — [AAP article](https://publications.aap.org/pediatrics/article/17/1/1/39942/).
3. Westley Croup 1978 — PMID [347921](https://pubmed.ncbi.nlm.nih.gov/347921/), DOI `10.1001/archpedi.1978.02120300044008`.
4. PRAM 2000 — PMID [11113831](https://pubmed.ncbi.nlm.nih.gov/11113831/), DOI `10.1067/mpd.2000.110121`.
5. PASS 2004 — PMID [14709423](https://pubmed.ncbi.nlm.nih.gov/14709423/), DOI `10.1197/j.aem.2003.07.015`.
6. RISC 2012 — PMID [22238570](https://pubmed.ncbi.nlm.nih.gov/22238570/), PMCID `PMC3251620`, DOI `10.1371/journal.pone.0027793`.
7. mRISC 2014 — PMCID [PMC3965502](https://pmc.ncbi.nlm.nih.gov/articles/PMC3965502/), PMID `24667695`.
8. pRIFLE 2007 — PMID [17396113](https://pubmed.ncbi.nlm.nih.gov/17396113/), DOI `10.1038/sj.ki.5002231`.
9. PELOD 2003 — PMID [12885479](https://pubmed.ncbi.nlm.nih.gov/12885479/), DOI `10.1016/S0140-6736(03)13908-6`.
10. PELOD-2 2013 — PMID [23685639](https://pubmed.ncbi.nlm.nih.gov/23685639/), DOI `10.1097/CCM.0b013e31828a2bbd`.
11. PRISM III 1996 — PMID [8706448](https://pubmed.ncbi.nlm.nih.gov/8706448/), DOI `10.1097/00003246-199605000-00004`.
12. PRISM IV 2016 — PMID [26492059](https://pubmed.ncbi.nlm.nih.gov/26492059/), PMCID [PMC5048467](https://pmc.ncbi.nlm.nih.gov/articles/PMC5048467/), DOI `10.1097/PCC.0000000000000558`.
13. PIM3 2013 — PMID [23863821](https://pubmed.ncbi.nlm.nih.gov/23863821/), DOI `10.1097/PCC.0b013e31829760cf`.
14. pSOFA 2017 — PMID [28783810](https://pubmed.ncbi.nlm.nih.gov/28783810/), PMCID `PMC6583375`, DOI `10.1001/jamapediatrics.2017.2352`.
15. Fenton 2013 — PMID [23601190](https://pubmed.ncbi.nlm.nih.gov/23601190/), PMCID `PMC3637477`, DOI `10.1186/1471-2431-13-59`.
16. ESC-NOW 2023 — PMID [37125831](https://pubmed.ncbi.nlm.nih.gov/37125831/), PMCID `PMC10433732`, DOI `10.1056/NEJMoa2214470`.
17. PIPP 1996 — PMID [8722730](https://pubmed.ncbi.nlm.nih.gov/8722730/), DOI `10.1097/00002508-199603000-00004`.
18. CRIES 1995 — PMID [8521311](https://pubmed.ncbi.nlm.nih.gov/8521311/), DOI `10.1111/j.1460-9592.1995.tb00242.x`.

### Validation and methodological review

19. PIPP-R validation — PMID [24491511](https://pubmed.ncbi.nlm.nih.gov/24491511/), DOI `10.1016/j.earlhumdev.2014.01.005`.
20. COMFORTneo 2023 — PMID [36746985](https://pubmed.ncbi.nlm.nih.gov/36746985/), DOI `10.1038/s41372-023-01628-1`.
21. Pediatric GCS reliability — PMID [30946292](https://pubmed.ncbi.nlm.nih.gov/30946292/), DOI `10.1097/PCC.0000000000001938`.
22. CDS/Gorelick external comparison — PMID [24788134](https://pubmed.ncbi.nlm.nih.gov/24788134/), PMCID `PMC4008432`.
23. PECARN/CATCH/CHALICE prospective comparison — PMID [28410792](https://pubmed.ncbi.nlm.nih.gov/28410792/).
24. SIPA prospective validation — PMID [27717564](https://pubmed.ncbi.nlm.nih.gov/27717564/).
25. Pediatric appendicitis rule review — PMID [23177898](https://pubmed.ncbi.nlm.nih.gov/23177898/).
26. Acute asthma score systematic review — PMID [33145551](https://pubmed.ncbi.nlm.nih.gov/33145551/).
27. Pneumonia score systematic review — PMCID [PMC6014863](https://pmc.ncbi.nlm.nih.gov/articles/PMC6014863/).

### Official data/guidelines and rights-holder terms

28. [WHO Child Growth Standards](https://www.who.int/tools/child-growth-standards).
29. [WHO dataset terms](https://www.who.int/about/policies/publishing/data-policy/terms-and-conditions).
30. [CDC Growth Charts](https://www.cdc.gov/growthcharts/cdc-growth-charts.htm).
31. [CDC LMS data files](https://www.cdc.gov/growthcharts/cdc-data-files.htm).
32. [CDC 2000 methods/public-domain statement](https://stacks.cdc.gov/view/cdc/6451/cdc_6451_DS1.pdf).
33. [KDIGO rights and permissions](https://kdigo.org/ufaq-category/rights-permissions/).
34. [Glasgow Coma Scale permissions](https://www.glasgowcomascale.org/permissions/).
35. [Wong-Baker official usage terms](https://wongbakerfaces.org/resources/usage-guidelines/).
36. [Pearson Bayley-4 product/rights information](https://www.pearsonassessments.com/en-us/Store/Professional-Assessments/Cognition-6-Neuro/Bayley-Scales-of-Infant-and-Toddler-Development-C-Fourth-Edition/p/100001996).
37. [Denver II AAP publication](https://publications.aap.org/pediatrics/article/89/1/91/57343/).
38. [AHA legal/algorithm policy](https://www.heart.org/en/about-us/statements-and-policies/aha-legal-position).
39. ERC 2025 Pediatric Life Support — PMID [41117571](https://pubmed.ncbi.nlm.nih.gov/41117571/), DOI `10.1016/j.resuscitation.2025.110767`.

## Source statistics

- Decision-relevant external sources retained: **39**.
- Primary/derivation/full-definition publications: **18**.
- Validation/systematic/methodological sources: **9**.
- Official dataset/guideline/rights-holder sources: **12** (ledger entries 28–39).
- Sources with an explicit licence, public-domain statement, or restriction relevant to reuse: **13** (including open-article statements for RISC, mRISC, PELOD-2, PRISM IV and Fenton 2013).
- Counts overlap by design because the same authoritative page can establish both evidence and reuse status.

## Known research limits

- Paywalled full tables were not treated as known from abstract-only access.
- “No licence found” is recorded as UNKNOWN, never as open permission.
- A bibliographic match does not prove the article contains every required input definition; tools remain conditional/blocked until the full definition is extracted.
- No copyrighted article, form, table, figure or proprietary norm set was copied into this audit.

## Batch 0B1 PRAM follow-up ledger

This follow-up is separate from the 39-source Phase A snapshot count above.

1. Chalut DS, Ducharme FM, Davis GM. J Pediatr. 2000;137(6):762-768. DOI `10.1067/mpd.2000.110121`; PMID `11113831`. Original derivation/internal validation, ages 3-6, n=217, acute asthma in a pediatric ED.
2. Ducharme FM et al. J Pediatr. 2008;152(4):476-480.e1. DOI `10.1016/j.jpeds.2007.08.034`; PMID `18346499`. Full article and canonical figure inspected; prospective ages 2-17 validation; triage/post-bronchodilation/disposition measurements; inter-rater, responsiveness, and admission-association analyses.
3. Gouin S et al. Acad Emerg Med. 2010;17(6):598-603. DOI `10.1111/j.1553-2712.2010.00775.x`; PMID `20624139`. Prospective external comparison, ages 18 months-7 years.
4. Lehr AR et al. Can Respir J. 2013;20(6):435-441. DOI `10.1155/2013/148645`; PMID `24046819`; PMCID `PMC3917818`. Open full text inspected for domain assessment modality, training, and inter-rater context.
5. BC Children's Hospital, Child and Youth Health Policy Manual CC.09.27, effective 2015. Open institutional policy inspected for stable ambient-air oximetry for at least 1 minute, supplemental-oxygen handling, examination method, and asymmetry rules. Its document/form/teaching prose was not copied.
6. Chacko J et al. JACEP Open. 2020;1(5):1000-1008. DOI `10.1002/emp2.12083`; PMID `33145551`; PMCID `PMC7593416`. Systematic review used for broader score/variant context, not as the canonical definition.
7. Arnold DH et al. *Direct Concurrent Comparison of Multiple Pediatric Acute Asthma Scoring Instruments.* J Asthma. 2017;54(7):741-748. PMCID `PMC5425314`. Independently reproduced canonical PRAM components and compared PRAM with other instruments.
8. Alberta Health Services pediatric asthma protocol HCS-324-01, effective 2024. Inspected only to document an explicitly altitude-adjusted variant (different SpO₂ thresholds and severity bands); not mixed into PedsCore.

Search outcome for reuse: no PRAM-specific electronic licence or prohibition was located. Publisher and institutional figures/forms remain copyrighted. PedsCore therefore implements the numerical method and concise clinical observations in an independent data structure and presentation with citations; it does not reproduce a source layout, logo, form, tutorial media, or pathway.
