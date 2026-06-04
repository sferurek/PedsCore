# Block 8 - Extreme Evidence Validation

Date: 2026-06-03

This document is the Block 8 evidence audit register for the full PedsCore catalog.
It is intentionally conservative: locating a primary paper is not enough to make a
tool implementable. A tool can move toward implementation only after source,
version, population, scoring table, formula/rule, interpretation bands, licensing,
and test cases are all traceable.

## Evidence Policy

- Do not implement new calculations from this document alone.
- Do not reconstruct tables from memory.
- Do not use MDCalc, blogs, Wikipedia, or commercial calculators as primary sources.
- Use PubMed, DOI landing pages, society/agency pages, original papers, or official manuals.
- If a scoring table, exact version, or interpretation cannot be verified directly, keep the tool pending.
- If an instrument or diagram is copyrighted/proprietary, mark the implementation as license-sensitive.
- For resuscitation algorithms, cite official guideline science but do not copy official diagrams.

## Implementation Gate

Every candidate tool must have all of the following before deterministic implementation:

1. Primary source or official source located.
2. Exact version selected.
3. Target population and exclusions documented.
4. Complete scoring table or formula available from a usable source.
5. Valid ranges and units documented.
6. Published interpretation or decision bands documented.
7. DOI, PMID, or direct official URL recorded.
8. Copyright/licensing risk reviewed.
9. Test cases defined, including minimum, maximum, missing input, and representative bands.

## Current Catalog Snapshot

- Total catalog tools: 78.
- Implemented tools with at least one clickable reference in the current catalog: 15.
- Tools still requiring evidence work before implementation: 63.
- Toxicology: not present in this phase.

## Verified Source Anchors From This Pass

These are source anchors located or rechecked during Block 8. They are not a
complete implementation approval by themselves.

| Domain | Tool(s) | Source anchor | Evidence note | License note |
|---|---|---|---|---|
| Neonatology | Sarnat | Sarnat HB, Sarnat MS. 1976. PMID 987769. DOI 10.1001/archneur.1976.00500100030012. https://pubmed.ncbi.nlm.nih.gov/987769/ | Original staging paper located. | Table reuse must be paraphrased or checked against source access. |
| Neonatology | Dubowitz | Dubowitz L. 1969. PMID 5356995. https://pmc.ncbi.nlm.nih.gov/articles/PMC2020344/ | Source trail located, but full score/version must still be verified. | Manual/table reproduction uncertain. |
| Neonatology | Ballard / New Ballard | BallardScore article PDF and monograph; secondary summary in NCBI Bookshelf. https://www.ballardscore.com/files/NewBallardScoreArticle.pdf | Original/author-hosted source located for New Ballard. | Copyright/permission review needed before reproducing scoring forms. |
| Neonatology | Modified Finnegan | Finnegan et al. 1975. PMID 1163358. https://pubmed.ncbi.nlm.nih.gov/1163358/ | Original NAS scoring system source located. | Full item wording and thresholds require source/legal review. |
| Neonatal pain | PIPP-R | Stevens et al. 2014. PMID 24503979. DOI 10.1097/AJP.0b013e3182906aed. https://pubmed.ncbi.nlm.nih.gov/24503979/ | PIPP-R validation source located. | Full scoring table/access must be verified. |
| Neonatal pain | PIPP-R | Validation study. DOI 10.1016/j.earlhumdev.2014.01.005. https://www.sciencedirect.com/science/article/pii/S0378378214000140 | External validation source located. | Paywall/license risk for table reuse. |
| Neonatology | Bhutani nomogram | Bhutani et al. 1999. PMID 9917432. https://pubmed.ncbi.nlm.nih.gov/9917432/ | Original hour-specific bilirubin risk nomogram located. | Nomogram values/curves must be sourced from usable data, not redrawn from image. |
| Neonatology | Fenton growth | Fenton and Kim 2013. DOI 10.1186/1471-2431-13-59. https://link.springer.com/article/10.1186/1471-2431-13-59 | Open-access revised Fenton chart source located. | CC BY article; data/figure reuse still must be attributed. |
| Growth | WHO growth | WHO Child Growth Standards. https://www.who.int/toolkits/child-growth-standards/standards | Official WHO source located. | Use official data files/license terms, not copied chart images. |
| Growth | WHO unified growth module | WHO Child Growth Standards and WHO Growth Reference 5-19 years. https://www.who.int/tools/child-growth-standards, https://www.who.int/tools/growth-reference-data-for-5to19-years | Official WHO source pages located; core WHO 0-5 LMS indicators plus WHO 5-19 BMI-for-age and height-for-age imported from official XLSX files. | WHO data imported under separate WHO data terms; no official chart image copied. |
| Growth | CDC growth/BMI | CDC growth chart recommendations and data. https://www.cdc.gov/growth-chart-training/hcp/overview/recommended.html | Official CDC source located. | Use official LMS/data files with attribution. |
| Emergency | CATCH | Osmond et al. 2010. PMID 20142371. DOI 10.1503/cmaj.091421. https://pubmed.ncbi.nlm.nih.gov/20142371/ | Original CATCH derivation source located. | Open PMC article; decision rule wording still must be traceable. |
| Emergency | CHALICE | Dunning et al. 2006. PMID 17056862. https://pmc.ncbi.nlm.nih.gov/articles/PMC2082967/ | Original CHALICE derivation source located. | Open PMC article; rule table can be cited but avoid long copied text. |
| Respiratory | BROSJOD | Balaguer et al. 2017. DOI 10.1002/ppul.23546. PMID 28328090. https://pubmed.ncbi.nlm.nih.gov/28328090/ | Validation source located; complete table found only in third-party Wiley mirror. | Keep blocked until reusable table or permission path is documented. |
| Respiratory | PASS | Gorelick et al. 2004. PMID 14709423. DOI 10.1197/j.aem.2003.07.015. https://pubmed.ncbi.nlm.nih.gov/14709423/ | Original PASS performance paper located. | Full scoring table must be verified. |
| Respiratory | RDAI | Lowell et al. 1987 is cited in systematic review; source trail located. | Primary article/table still needs direct bibliographic verification. | Keep pending until direct paper/table is obtained. |
| Intensive care | pSOFA | Matics and Sanchez-Pinto 2017. PMID 28783810. DOI 10.1001/jamapediatrics.2017.2352. https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/ | Adaptation/validation source located. | Complex score with labs and age thresholds; needs test cases and data model. |
| Intensive care | PELOD-2 | Leteurtre et al. 2013. PMID 23685639. DOI 10.1097/CCM.0b013e31828a2bbd. https://pubmed.ncbi.nlm.nih.gov/23685639/ | Original PELOD-2 update source located. | Table/formula availability and license must be verified. |
| Intensive care | PRISM III | Pollack et al. 1996. PMID 8706448. DOI 10.1097/00003246-199605000-00004. https://pubmed.ncbi.nlm.nih.gov/8706448/ | Original PRISM III source located. | Likely license-sensitive; implementation should remain blocked until permission/terms are clear. |
| Intensive care | PIM3 | Straney et al. 2013. PMID 23863821. DOI 10.1097/PCC.0b013e31829760cf. https://pubmed.ncbi.nlm.nih.gov/23863821/ | Original PIM3 source located. | Formula/model use and calibration details must be reviewed. |
| Nutrition | STAMP | McCarthy et al. 2012. PMID 22568534. https://pubmed.ncbi.nlm.nih.gov/22568534/ | Development/evaluation source located. | STAMP uses copyright mark; licensing review required. |
| Nutrition | PYMS | Four-stage evaluation in British Journal of Nutrition. https://www.cambridge.org/core/journals/british-journal-of-nutrition/article/fourstage-evaluation-of-the-paediatric-yorkhill-malnutrition-score-in-a-tertiary-paediatric-hospital-and-a-district-general-hospital/2F57A5711A1D5EB7E33548FE677402E2 | Source located. | Full tool wording/table reuse must be checked. |
| Pain | Wong-Baker FACES | Official terms. https://wongbakerfaces.org/resources/usage-guidelines/ | Official licensing page located. | Not implementable without permission/licensing if using the scale. |
| Development | Bayley | Pearson Bayley-4 product page. https://www.pearsonassessments.com/store/usassessments/en/p/bayley-scales-of-infant-and-toddler-development-fourth-edition/100001996 | Official product/manual source located. | Proprietary Pearson assessment; not suitable for open implementation without license. |
| Development | Denver II | ePROVIDE DDST-II page. https://eprovide.mapi-trust.org/instruments/denver-developmental-screening-test-ii | Instrument record located. | Copyright/license-sensitive; keep blocked until permission. |
| Resuscitation | PALS/NRP algorithms | AHA pediatric and neonatal guideline pages. https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support | Official guideline source located. | Do not copy official algorithms/diagrams; summarize evidence only or link out. |
| Resuscitation | ILCOR CoSTR | ILCOR/AAP neonatal and pediatric consensus sources. https://publications.aap.org/pediatrics/article/doi/10.1542/peds.2025-074766/205238 | Consensus science source located. | Implementation must avoid reproducing protected algorithms. |

## Tool-by-Tool Audit Matrix

Legend:

- `implemented-current`: implemented already; retain but continue source QA.
- `prepare-after-table-review`: primary/official source located, but scoring table/ranges/tests still required.
- `pending-primary`: source trail incomplete or primary paper not directly verified in this pass.
- `license-sensitive`: proprietary/copyright risk blocks open implementation until permission/terms are clear.
- `defer-complex`: clinically/technically complex; needs expanded data model or guideline/legal review.

| Tool | Current catalog status | Block 8 audit status | Evidence action required |
|---|---:|---|---|
| apgar | implemented | implemented-current | Keep PMID 13083014; add exact table/test trace review before further changes. |
| combined-apgar | needs_primary_reference | pending-primary | Locate original expanded/combined Apgar source and exact version. |
| silverman-andersen | implemented | implemented-current | Current Pediatrics source is direct; verify scoring labels/interpretation against source. |
| wood-downes-ferres | implemented | secondary/open-table + source anchor | Maintainer selected classic six-domain variant; descriptive score only. |
| ballard | pending_validation | prepare-after-table-review | New Ballard source located; verify permission and complete table. |
| dubowitz | pending_validation | prepare-after-table-review | Source trail located; full scoring table/version still required. |
| sarnat | pending_validation | prepare-after-table-review | Original paper located; stage table and modern modified Sarnat variants need review. |
| thompson-hie-score | pending_validation | pending-primary | Citation known but direct primary/score table not verified in this pass. |
| modified-finnegan | pending_validation | prepare-after-table-review | Original NAS source located; full item table/license review needed. |
| eat-sleep-console | coming_soon | defer-complex | Needs official ESC protocol/source, not a calculator; implementation should be educational only. |
| nips | implemented | implemented-current | Keep PMID 8413140; verify score table and interpretation bands. |
| pipp | pending_validation | pending-primary | Original PIPP citation known via source trail; direct primary record/table still required. |
| pipp-r | pending_validation | prepare-after-table-review | Validation sources located; full table/access/license needed. |
| cries | pending_validation | pending-primary | Locate original Krechel/Bildner source and full CRIES table. |
| comfortneo | pending_validation | pending-primary | Validation literature exists; original COMFORTneo table/source still required. |
| bhutani-nomogram | pending_validation | prepare-after-table-review | Original paper located; need usable nomogram values/data and current AAP context. |
| neonatal-growth-fenton | needs_primary_reference | prepare-after-table-review | Fenton 2013 located; use data with attribution and tests. |
| pews | pending_validation | pending-primary | PEWS variants are heterogeneous; select exact version before implementation. |
| brighton-pews | pending_validation | pending-primary | Locate Brighton-specific source/table and license. |
| bedside-pews | pending_validation | prepare-after-table-review | Parshuram source located; verify table/license and variant. |
| westley-croup-score | implemented | implemented-current | Current DOI/PMID source retained; verify table/test cases. |
| pram | implemented | implemented-current | Original and validation sources retained; verify table/test cases. |
| rdai | pending_validation | pending-primary | Source trail located but direct Lowell paper/table still needed. |
| brosjod | needs_primary_reference | prepare-after-table-review | Validation source located; need original score table and permission. |
| pass | needs_primary_reference | prepare-after-table-review | PASS source located; table and interpretation need verification. |
| risc | coming_soon | pending-primary | Locate original RISC pneumonia source and exact population. |
| mrisc | coming_soon | pending-primary | Locate mRISC source and exact model variables. |
| pediatric-gcs | pending_validation | pending-primary | Pediatric adaptations vary by age; select exact source/table. |
| benes | needs_primary_reference | pending-primary | Primary reference not verified. |
| glasgow-adapted | needs_primary_reference | pending-primary | Primary reference not verified; likely overlaps pediatric GCS variants. |
| clinical-dehydration-scale | implemented | implemented-current | Current derivation/validation sources retained; verify test cases. |
| gorelick-dehydration | needs_primary_reference | pending-primary | Locate Gorelick dehydration scale original/validation table. |
| pecarn-tbi-under-2 | implemented | implemented-current | PECARN Lancet source retained; verify rule test cases. |
| pecarn-tbi-2-or-more | implemented | implemented-current | PECARN Lancet source retained; verify rule test cases. |
| catch-tbi | needs_primary_reference | prepare-after-table-review | CATCH source located; verify full rule and tests. |
| chalice-tbi | needs_primary_reference | prepare-after-table-review | CHALICE source located; verify full rule and tests. |
| sipa | implemented | implemented-current | Current DOI/PMID source retained; verify age bands and tests. |
| regional-sepsis-scores | coming_soon | pending-primary | Too broad; split into named scores before evidence work. |
| qtc-bazett | implemented | implemented-current | Current source retained; consider replacing CiNii with more stable primary if available. |
| qtc-fridericia | implemented | implemented-current | DOI source retained; verify formula tests. |
| qtc-framingham | implemented | implemented-current | DOI/PMID source retained; verify formula tests. |
| qtc-hodges | implemented | implemented-current | Hodges original source lacks final URL; locate primary or mark review note. |
| bedside-schwartz | implemented | implemented-current | PMID source retained; verify formula/range tests. |
| revised-schwartz | pending_validation | pending-primary | Clarify whether distinct from bedside Schwartz or legacy/revised variants. |
| prifle | pending_validation | pending-primary | Locate pediatric RIFLE original and exact criteria. |
| kdigo-pediatric | pending_validation | defer-complex | Use official KDIGO guideline and pediatric adaptation; avoid direct treatment recommendations. |
| psofa | coming_soon | prepare-after-table-review | pSOFA source located; complex labs/age cutoffs require data model and tests. |
| pelod | coming_soon | pending-primary | Locate original PELOD source/table and license. |
| pelod-2 | coming_soon | prepare-after-table-review | PELOD-2 source located; table/formula/license needed. |
| prism-iii | coming_soon | license-sensitive | Source located; likely proprietary/license-sensitive. |
| prism-iv | coming_soon | license-sensitive | Primary source/terms not verified; keep blocked. |
| pim2 | coming_soon | pending-primary | Locate PIM2 source/model and licensing. |
| pim3 | coming_soon | prepare-after-table-review | PIM3 source located; model coefficients/use terms need review. |
| who-growth-percentiles | pending_validation | prepare-after-table-review | Official WHO source located; use official data files and tests. |
| who-growth | partially_implemented | license-sensitive | Unified WHO scaffold added; core WHO 0-5 LMS datasets plus WHO 5-19 BMI-for-age and height-for-age imported from official WHO XLSX files under separate WHO data terms; remaining scope still needs review. |
| cdc-growth-percentiles | pending_validation | prepare-after-table-review | Official CDC source located; use LMS data and tests. |
| orbegozo-growth-percentiles | pending_validation | pending-primary | Locate official Orbegozo data/license before implementation. |
| bmi-percentile | pending_validation | prepare-after-table-review | Should depend on CDC/WHO selected age range; define source precedence. |
| head-circumference-percentile | pending_validation | prepare-after-table-review | Should depend on WHO/CDC selected age range; define source precedence. |
| stamp | pending_validation | license-sensitive | Development source located; copyright mark suggests permission review. |
| strongkids | pending_validation | pending-primary | Locate original STRONGkids source/table and license. |
| pyms | pending_validation | prepare-after-table-review | PYMS source located; table/license review needed. |
| flacc | implemented | implemented-current | Current source retained; consider replacing CiNii with PMID/DOI if available. |
| rflacc | needs_primary_reference | pending-primary | Locate rFLACC original validation and license. |
| cheops | pending_validation | pending-primary | Locate original CHEOPS source/table and license. |
| wong-baker-faces | not_implemented_due_to_licensing | license-sensitive | Official terms confirm licensing risk; keep blocked. |
| visual-analogue-scale | needs_primary_reference | pending-primary | VAS is generic; select pediatric validated implementation/source. |
| pediatric-cpr | coming_soon | license-sensitive | Use AHA/ILCOR science links only; do not copy algorithm diagrams. |
| neonatal-cpr | coming_soon | license-sensitive | Use AHA/AAP/ILCOR science links only; do not copy NRP algorithm diagrams. |
| pediatric-bradycardia | coming_soon | license-sensitive | AHA/PALS algorithm content is protected; link/summarize only. |
| pediatric-tachycardia | coming_soon | license-sensitive | AHA/PALS algorithm content is protected; link/summarize only. |
| shockable-rhythm-algorithm | coming_soon | license-sensitive | AHA/PALS algorithm content is protected; link/summarize only. |
| non-shockable-rhythm-algorithm | coming_soon | license-sensitive | AHA/PALS algorithm content is protected; link/summarize only. |
| resuscitation-weight-dose-energy | pending_validation | license-sensitive | Requires official dosing/energy sources and legal review; avoid therapeutic recommendations. |
| bayley | coming_soon | license-sensitive | Pearson proprietary assessment; do not implement without license. |
| denver-ii | coming_soon | license-sensitive | DDST-II copyright/license-sensitive; do not implement without permission. |
| mass-casualty-triage | coming_soon | defer-complex | Select exact algorithm and jurisdiction; license/ethics review needed. |
| adolescent-depression-risk | coming_soon | pending-primary | Select exact validated instrument; many are license-sensitive. |
| adolescent-behavior-risk | coming_soon | pending-primary | Split into named instruments; primary source/license review required. |

## Immediate Engineering Recommendations

1. Keep all non-implemented tools blocked until their matrix row reaches all nine implementation gates.
2. Prioritize source work for tools with primary anchors already located and low licensing risk:
   Ballard/New Ballard, Sarnat, Bhutani, CATCH, CHALICE, pSOFA, Fenton, WHO/CDC growth, PASS, BROSJOD.
3. Keep proprietary/license-sensitive tools informational or blocked:
   Wong-Baker FACES, Bayley, Denver II, PRISM, resuscitation algorithms, STAMP until terms are clear.
4. Add per-tool test case plans before any future calculator implementation.
5. Do not promote pending Knowledge Base summaries into calculator logic without replacing them with direct source anchors.

## Open Questions For Next Evidence Pass

- Should PedsCore support copyrighted instruments only as linked informational pages?
- Should resuscitation tools be restricted to non-therapeutic reference calculators, or excluded from automatic outputs?
- Which growth reference should be default by locale: WHO/CDC/Orbegozo?
- Should PEWS be split into separate pages for Brighton PEWS, Bedside PEWS, and generic/local PEWS?
- Should PRISM/PIM/PELOD remain outside MVP because of complexity, licensing, and mortality-risk regulatory concerns?

## Block 8B-3 Delta

| Tool | Previous audit status | Block 8B-3 status | Evidence action required |
|---|---|---|---|
| dubowitz | pending-primary / not detailed | pending_complete_scoring_table | DOI/PMID located; verify full scoring form/table and reuse rights. |
| neonatal-growth-fenton | needs_primary_reference | pending_complete_scoring_table | Open Fenton 2013 source located; locate reusable LMS data files and attribution requirements. |
| rdai | pending-primary | pending_primary_source | Bibliographic source trail found; DOI/PMID and primary table remain unverified. |
| brosjod | needs_primary_reference | pending_complete_scoring_table | Validation source DOI/PMID found; original/full table and license remain pending. |
| pass | needs_primary_reference | pending_complete_scoring_table | PASS source DOI/PMID found; complete table and interpretation remain pending. |
| gorelick-dehydration | needs_primary_reference | pending_variant_selection | Gorelick source DOI/PMID found; exact 4-item/10-item scale variant must be selected. |
| catch-tbi | needs_primary_reference | ready_for_implementation | Open derivation source located; implement only as non-therapeutic predictor classification. |
| chalice-tbi | needs_primary_reference | ready_for_implementation | Open derivation source located; implement only as non-therapeutic predictor classification. |
| revised-schwartz | pending-primary | pending_variant_selection | CKiD source DOI/PMID found; select exact equation distinct from Bedside Schwartz. |
| prifle | pending-primary | requires_domain_expert_review | pRIFLE source DOI/PMID found; unit handling and expert review required. |
| rflacc | needs_primary_reference | pending_complete_scoring_table | rFLACC validation DOI/PMID found; descriptors and licensing remain pending. |
| cheops | pending-primary | pending_primary_source | Original citation trail found; no DOI/PMID/direct primary table verified. |
| visual-analogue-scale | pending-primary | pending_variant_selection | Generic VAS requires selected pediatric operational format before implementation. |

Block 8B-3 does not change any tool to `implemented` and does not add calculation logic.

## Block 8B-4 Delta

### Block 8B-4 scope

This pass separated pending tools by blocker type:

- missing primary source
- missing complete scoring table
- variant selection
- license/copyright risk
- maintainer/governance dependency
- clinical/expert review requirement

### Block 8B-4 priority matrix

| Tool | Evidence action required | Main blocker class | Maintainer dependence | Clinical governance note |
|---|---|---|---|---|
| psofa | prepare-after-table-review | regulatory and table completeness | no | Intensive care prognostic context; activation deferred. |
| pelod | pending-primary-source | missing primary source + complete criteria | no | Source and criterion extraction still pending. |
| pelod-2 | prepare-after-table-review | incomplete table/formula mapping | no | High-acuity context and formula governance required. |
| prism-iii | license-sensitive | licensing / policy | yes | Keep as reference until policy permits. |
| prism-iv | license-sensitive | licensing / policy | yes | Keep as reference until policy permits. |
| pim2 | pending-primary-source | variant/model + source terms | yes | Decide inclusion policy before any activation. |
| pim3 | prepare-after-table-review | expert review + table/model precision | yes | Needs expert governance and unit handling review. |
| pediatric-cpr | license-sensitive | guideline reproduction limits | yes | Reference-only until scope is approved. |
| neonatal-cpr | license-sensitive | guideline reproduction limits | yes | Reference-only until scope is approved. |
| pediatric-bradycardia | license-sensitive | guideline reproduction limits | yes | Reference-only until policy defines outputs. |
| pediatric-tachycardia | license-sensitive | guideline reproduction limits | yes | Reference-only until policy defines outputs. |
| shockable-rhythm-algorithm | license-sensitive | guideline reproduction limits | yes | Reference-only until policy defines outputs. |
| non-shockable-rhythm-algorithm | license-sensitive | guideline reproduction limits | yes | Reference-only until policy defines outputs. |
| resuscitation-weight-dose-energy | license-sensitive | therapeutic scope / dosing policy | yes | Not safe for full calculator behavior without policy. |
| wood-downes-ferres | selected variant implemented | implemented_after_maintainer_variant_selection | no | Classic six-domain table implemented as descriptive score only. |
| pediatric_gcs | missing complete table / variant | variant selection | yes | Pediatric adaptation still pending. |
| cries | table completeness | missing complete scoring table | no | Keep blocked until itemized table is fully extracted. |
| cheops | primary source + table completeness | missing primary source | no | Source and licensing status pending. |
| visual-analogue-scale | variant/form format | variant selection | yes | Output format (0-10 vs 0-100) unresolved. |
| thompson_hie | table completeness | incomplete core table | no | Keep blocked for safety. |
| rflacc | table completeness | incomplete table + licensing review | no | Table and reuse terms still pending. |
| adolescent-depression-risk | source + instrument selection | source/definition | yes | Instrument policy not selected. |
| adolescent-behavior-risk | source + instrument selection | source/definition | yes | Instrument policy not selected. |
| mass-casualty-triage | variant scope | variant selection + jurisdiction | yes | Algorithm family first, then implementation policy. |

## Block 8B-5 Decision Pack Preparation

MAINTAINER decision work does not change `implementationStatus` in this block, but it makes explicit which high-impact tools need clinical governance before activation.

| Family | Decision gate | Current recommended posture | Why |
|---|---|---|---|
| `wood_downes_ferres` | `maintainer_variant_selection` | implemented after maintainer selection | Classic six-domain variant is active with descriptive-only output. |
| `pediatric_gcs` | `maintainer_variant_selection` | keep pending_validation | Pediatric age-specific verbal table is not yet standardized in catalog evidence. |
| `pews` family | `maintainer_variant_selection` | keep pending_validation | Multiple variants with different escalation semantics; avoid generic implementation. |
| `resuscitation` (`pediatric_cpr`, `neonatal_cpr`, rhythm/brady/tachy rules) | `maintainer_governance` | keep catalog/reference-only | High therapeutic-protocol risk and guideline-reproduction constraints. |
| `resuscitation_weight_dose_energy` | `maintainer_clinical_scope` | keep pending_validation | Dosing context overlaps treatment workflow; requires explicit scope policy. |
| `who_growth_module` / `who_growth_percentiles` / `cdc_growth_percentiles` | `maintainer_scope_policy` | keep `who_growth_module` partially_implemented; keep source-specific tools pending_validation | Core WHO 0-5 LMS import plus WHO 5-19 BMI-for-age/height-for-age and printable chart labels are available; remaining 5-19 scope, interpolation policy, and age-boundary governance remain pending. |
| `orbegozo_growth_percentiles` | `license_and_data_terms` | keep pending_validation | Data availability and licensing terms require confirmation. |
| `pim2` / `pim3` / `prism_iii` / `prism_iv` / `pelod` / `pelod_2` / `psofa` | `maintainer_clinical_governance` | keep coming_soon/blocked | Prognostic or complex ICU tools demand explicit governance and review. |
| `cheops` / `cries` / `rflacc` / `visual_analogue_scale` | `maintainer_data_model` | keep blocked until complete scoring policy | Scoring table, table variants, and interpretation details are still incomplete or unresolved. |
| Proprietary/copyright tools (`bayley`, `denver_ii`, `wong_baker_faces`, `stamp`) | `maintainer_license_policy` | catalog-only / do_not_implement in MVP | Permission and safe reproducibility constraints require explicit policy. |

### Reference map

- `docs/evidence/MAINTAINER_DECISION_PACK.md`: contains the consolidated recommended options and test requirements for each maintainer-dependent family.
- `docs/evidence/PENDING_VALIDATION_REVIEW.md`: updated crosswalk with `maintainer_decision_required` and `recommended_decision_pack_section` for all maintainer-dependent families.
