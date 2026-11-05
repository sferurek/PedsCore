# PedsCore: an invitation to clinical and educational collaboration

Draft briefing for international reviewers, including LITFL / Medmastery. Prepared 5 November 2026; no message has been sent and no affiliation or endorsement is claimed.

## A 60-second introduction

PedsCore is an independent, open-source project led by Sergio Fernández Ureña, a pediatrician in Las Palmas de Gran Canaria, Spain. It brings pediatric and neonatal tools into a bilingual Spanish/English catalog with visible populations, references, limitations and reuse status. Local calculations use deterministic code; generative AI does not calculate patient scores.

The repository currently describes 137 clinical surfaces, including 61 active local-calculation surfaces. Other instruments remain reference or external resources when implementation or reuse is unsuitable. An active calculator does not mean the product has independent clinical validation. Named external review remains a priority.

The proposed collaboration is a small, reviewable educational pilot: choose a handful of pediatric tools, check clinical fidelity and terminology, and use synthetic teaching cases to test whether the presentation helps learners distinguish population, assumptions, score and clinical judgment.

Public website: https://pedscore.app/ · Source: https://github.com/sferurek/PedsCore · Contact: info@pedscore.app

## A practical first collaboration

| Workstream | PedsCore contribution | Proposed external contribution | Reviewable output |
| --- | --- | --- | --- |
| Clinical fidelity | Source-linked code, boundary fixtures and review template | A named clinician checks version, population, units, assumptions and interpretation | Tool-specific record against an exact commit |
| Education | ES/EN tool pages and wholly synthetic cases | Feedback on learning objectives, explanatory context and terminology | A short teaching activity and documented corrections |
| Accessibility | Mobile flows, semantic navigation and error handling | Educator/clinician usability feedback | Reproducible observations and small fixes |
| Reuse | Explicit separation of code license and third-party rights | Agreement on any proposed links or reuse | Written scope and permissions where needed |

A first pilot could use PRAM, PECARN and one intensive-care tool selected by the reviewer. The sprint desk review of PRISM IV, PELOD-2, PIM3, pSOFA and Phoenix is preparatory evidence, not independent review. PELOD-2 and pSOFA source limitations must stay visible.

## Five-slide briefing outline

1. **Clinical tools with visible boundaries.** Start with the problem: finding a tool is easier than confirming its exact population, version and assumptions.
2. **What PedsCore contains.** Show the bilingual catalog, deterministic engine, source references and explicit local/external status. Label repository counts with their date.
3. **A synthetic demonstration.** Walk through eligibility, inputs, result, warnings and source. The November PRs remain drafts until an authorized release; show a local reviewed branch when demonstrating an unmerged fix.
4. **What still needs independent review.** Separate published-instrument validation, software tests and product-level clinical sign-off. Show the open review checklist and known source questions.
5. **A small invitation.** Ask for a named reviewer or a short discussion about an educational pilot, with defined tools and a documented outcome. Do not ask for blanket endorsement.

## Draft message for LITFL / Medmastery — not sent

**Subject:** PedsCore — exploring a small pediatric education and review pilot

Hello LITFL / Medmastery team,

I am Sergio Fernández Ureña, a pediatrician in Las Palmas de Gran Canaria and the maintainer of PedsCore, an independent open-source project for evidence-traceable pediatric and neonatal tools in Spanish and English.

I would value a conversation about a small educational collaboration: selecting a few tools, reviewing their clinical scope and terminology, and testing synthetic teaching cases. PedsCore separates deterministic calculation, source traceability and independent clinical review; I would not present the project as independently validated or endorsed by LITFL.

The public project is at https://pedscore.app/ and the code and review process are at https://github.com/sferurek/PedsCore. If this fits your educational work, would you be open to a short discussion or to directing me to the appropriate reviewer?

Kind regards,
Sergio Fernández Ureña
info@pedscore.app

## Contact route and permissions

LITFL's [current contact page](https://litfl.com/about/contact/) accepts partnership inquiries and permission requests and states that guest posts and affiliate proposals are not entertained. This draft therefore proposes an educational/review pilot. No form submission, email, content reuse, logo use or claim of affiliation is authorized by preparing this document. Any outreach needs Sergio's explicit instruction. Third-party educational material retains its own terms; PedsCore's MIT code license does not relicense LITFL material.

## Before a pilot is shared

Select the exact tools and commit; agree on a named reviewer, scope and rights; finish relevant source reconciliation; use synthetic data; distinguish local branch demonstrations from the public release; and record corrections through the existing [clinical review program](CLINICAL_REVIEW_PROGRAM.md). A successful software test is one part of this handoff, not clinical sign-off.
