# Pending tools & rights audit — 2026-09-16

This document records the current PedsCore disposition for tools that are clinically relevant but are not yet fully implemented, plus a backlog of modern pediatric tools that were absent from the original catalog.

This is an engineering/editorial rights audit, not legal advice. A paper being open access does not automatically mean the clinical instrument, table, artwork, wording, or data can be redistributed in an open-source web application.

## Rights/status review

| Tool | Current PedsCore strategy | Rights finding | Next action |
| --- | --- | --- | --- |
| PIPP / PIPP-R | Keep blocked for local reproduction | Formal Nordic, Indonesian, Turkish and Spanish adaptation work documents obtaining permission from the original PIPP-R authors before translation/adaptation. This is evidence that translation/adaptation is permission-managed. | Seek explicit permission or a reusable licence for web/software reproduction. Keep PIPP and PIPP-R as distinct variants. |
| COMFORTneo | Keep blocked for local reproduction | Translation/adaptation literature documents contacting/obtaining permission from the developer team. No verified open-source redistribution licence has been identified. | Seek permission from the developer/rights holder before reproducing the full table in PedsCore. |
| STAMP | External-only | Official STAMP site states that documents may be printed/copied for clinical use if copyright is retained in full. It does not expressly grant a general open-source software/web redistribution licence. | Keep official external workflow; request digital/web reproduction permission if local calculator is desired. |
| rFLACC | Move from rights-blocked to planned/unresolved | PhenX publishes the Revised FLACC protocol as freely available and explicitly says permission is not required for use. That weakens the previous assumption of a commercial licensing blocker. A specific redistribution licence for the complete wording in an open-source web app still needs to be closed. | Verify text redistribution terms, family-individualized behavior workflow and exact scoring tests; then implement locally if clean. |
| CHEOPS | Keep unresolved / not locally active | A complete openEHR archetype exists under CC BY-SA 4.0, but that licence clearly applies to the archetype and does not by itself prove unrestricted rights to the original CHEOPS wording. | Trace primary form/table and rights before local reproduction. |
| PYMS | Keep permission-required | Original 2011 Clinical Nutrition publication is copyright Elsevier/ESPEN. Later open-access articles reproduce the questions, but that does not automatically establish ownership/reuse rights for the original tool. | Find an official reusable form/licence or obtain permission. |
| Wong-Baker FACES | External-only | Official Wong-Baker terms state that organizational, publishing and software/commercial reproduction may require licensing/permission and that the scale must not be modified. | Continue linking externally unless a licence is obtained. |
| FPS-R | Backlog, permission-managed for web reproduction | IASP permits clinical/educational/research use without modification but directs web reproduction requests through Mapi Research Trust. | If added, use external reference until web permission is secured. |

## Clinical fidelity checks completed in this pass

### Modified Sarnat / NICHD
The six-category examination and 0–3 severity coding are supported by contemporary literature. A recent AAP clinical report describes the NICHD modified Sarnat as six assessments and states that moderate/severe findings in at least three categories were used for cooling eligibility in the NICHD approach. Contemporary research also supports the historical rule of predominant severity with level of consciousness as tie-breaker, and separately describes the numerical Total Sarnat score.

**PedsCore implication:** keep the total-score calculator descriptive and do not turn it into an autonomous therapeutic-hypothermia eligibility decision.

### Bedside PEWS
A separate implementation PR now handles Bedside PEWS under CC BY 2.0 with explicit attribution, seven items, age-specific vital-sign thresholds, total 0–26, and no universal escalation protocol embedded in the score.

### Thompson HIE
Keep as descriptive 0–22 score. Interpretation conventions vary in secondary literature; PedsCore should continue disclosing that variability rather than presenting one banding scheme as universally canonical.

### CRIES
Keep the tool descriptive and neonatal/postoperative in scope. Intervention thresholds remain protocol-dependent. Before any wording refinement, exact item semantics should be rechecked against an authoritative reproduction rather than paraphrased from memory.

## Newly identified catalog backlog

The following tools were absent from the original PedsCore catalog audit and should remain in the formal research backlog:

| Candidate | Area | Initial disposition |
| --- | --- | --- |
| Kaiser Neonatal Early-Onset Sepsis Calculator (current version) | Neonatology / infectious disease | High-priority rights + implementation audit; investigate official/open-source implementation pathway |
| AAP Febrile Infant 8–60 days (2021) | Emergency / infectious disease | High-priority guideline algorithm; model age branches separately |
| UTICalc (current race-free version) | Emergency / nephrology / infectious disease | High-priority calculator; verify current model/version and licence |
| Pediatric blood-pressure percentile/classification (AAP 2017 framework) | Cardiology / nephrology / primary care | High-priority calculator; verify normative tables/data reuse |
| INTERGROWTH-21st neonatal/preterm growth | Neonatology / growth | High-priority growth reference; audit data licence and official calculators |
| HINE | Neurology / development | Important; likely permission/licence review before reproducing full instrument |
| General Movements Assessment | Neurology / development | Clinical framework rather than simple score; design as reference/training workflow |
| TEN-4-FACESp | Child protection / emergency | Strong candidate; audit open-access validation and exact rule reuse |
| PIBIS | Child protection / emergency | Candidate with narrower population and implementation caution |
| Faces Pain Scale-Revised (FPS-R) | Pain | Add as external/permission-managed until web reproduction rights secured |
| Pediatric Trauma Score | Trauma | Review contemporary relevance before implementation |

AAP 2022 neonatal hyperbilirubinemia and Fenton 2025 are being handled in separate implementation PRs and are therefore not listed here as undiscovered backlog.

## Priority order while build/deploy capacity is unavailable

1. Finish rights/evidence closure for existing catalog items before adding more local calculators.
2. Next implementation candidates after Bedside PEWS: rFLACC only if redistribution terms are clean; STRONGkids if exact table/reuse is confirmed; CDC growth if data handling/tests are fully specified.
3. Keep PIPP/PIPP-R, COMFORTneo, Wong-Baker, PYMS and CHEOPS out of local reproduction until their rights path is explicit.
4. Treat STAMP as external-only by default.
5. Work through the newly identified backlog only after the pre-existing pending list is substantially reduced.

## Sources reviewed in this pass

- Wong-Baker FACES Foundation — Terms of Use / licensing dashboard.
- Olsson et al. 2018, BMC Pediatrics — Nordic PIPP-R adaptation; permission from original authors documented.
- Indonesian PIPP-R adaptation, 2019 — permission from original PIPP-R author documented.
- Spanish PIPP-R adaptation protocol, 2022 — consent from original scale author documented.
- STAMP official site — clinical printing/copying permitted with copyright retained.
- PhenX Toolkit — Revised FLACC protocol listed as freely available; permission not required for use.
- PYMS original publication, Clinical Nutrition 2011 — copyright Elsevier/ESPEN.
- openEHR CHEOPS archetype — CC BY-SA 4.0 for the archetype; not treated as proof of rights in the original instrument wording.
- AAP 2026 therapeutic hypothermia clinical report and contemporary Modified Sarnat literature.
