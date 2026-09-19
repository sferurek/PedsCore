# Clinical Tool Rights & Permissions Register

Last reviewed: 2026-09-19

Purpose: document the reuse/copyright status of clinical tools in PedsCore. This is a transparency and engineering-control document, not legal advice.

## Status vocabulary
- **open_reuse**: an authoritative or reliable source provides an open licence permitting reproduction/adaptation with attribution.
- **permission_required**: an instrument-specific source explicitly requires permission or reserves reuse rights.
- **unresolved**: the score/scale is publicly described, but PedsCore has not verified a licence that clearly permits republication of the operational instrument in a public web app.
- **external_only**: keep as an outbound/reference surface.
- **not_applicable**: deprecated or superseded in PedsCore.

## Audited tools

| Tool | Current rights verdict | PedsCore action | Basis / source |
|---|---|---|---|
| Modified Bell NEC | open_reuse | Local implementation allowed with attribution | PLOS ONE 2013 reproduces the staging table under CC BY: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0076858 |
| pSOFA | unresolved | Do not reproduce locally yet | Original JAMA Pediatrics publication; JAMA directs reuse of tables/figures through RightsLink: https://jamanetwork.com/journals/jamapediatrics/fullarticle/2646857 |
| SNAPPE-II | unresolved | Do not reproduce locally yet | Full tables are widely reproduced, including open-access articles, but an unambiguous instrument-level licence for unrestricted web reuse has not been verified. Example: https://pmc.ncbi.nlm.nih.gov/articles/PMC4625304/ |
| CAPD | permission_required | Keep blocked / external reference | Formal Japanese translation explicitly states permission was obtained from original author Gabrielle Silver and the final translation was author-approved: https://onlinelibrary.wiley.com/doi/full/10.1002/ams2.312 . Spanish/Italian adaptations likewise involved original authors/approval. |
| WAT-1 | permission_required | Keep blocked / official external reference | The rights holders explicitly allow unmodified clinical/research use inside an organization, but require permission to republish the tool externally and prohibit commercial/monetized use without written permission. Official page/downloads: https://www.marthaaqcurley.com/wat-1.html |
| COMFORT-B | permission_required | Keep blocked | ePROVIDE records explicit copyright holders for the English version and version 3: https://eprovide.mapi-trust.org/instruments/comfort-behaviour-scale |
| Braden QD | permission_required | Keep blocked | Author permits clinical use but requires permission for republication. |
| SBS | permission_required | Keep blocked | Author-controlled instrument; republication requires permission. |
| pCAM-ICU | permission_required | Keep blocked / official external reference | Pediatric CAM-ICU family is distributed through ICU Delirium resources; instrument-specific terms apply. Do not infer republication rights from free download: https://www.icudelirium.org/ |
| psCAM-ICU | permission_required | Keep blocked / official external reference | Japanese adaptation explicitly thanks original developer Heidi A. B. Smith for granting permission to translate the diagnostic tool: https://onlinelibrary.wiley.com/doi/full/10.1002/ams2.306 . Official instrument/download remains available from ICU Delirium: https://www.icudelirium.org/resource-downloads/pscam-icu-instruction-tool |
| PIPP | unresolved | Keep blocked pending rights resolution | The PIPP construct and seven indicators are widely described, but a 2018 multi-institutional pain-information-model study explicitly notes that some pain scales require copyright permission and therefore retained only scale scores rather than copyrighted scale content. This is cautionary rather than PIPP-specific rights-holder evidence, so PIPP remains unresolved rather than permission_required: https://pmc.ncbi.nlm.nih.gov/articles/PMC5851787/ |
| PIPP-R | permission_required | Keep blocked / official educational reference | A Spanish cross-cultural validation explicitly obtained consent from the original author before translation/adaptation, so unrestricted republication should not be inferred. Official SickKids PIPP-R educational module: https://lab.research.sickkids.ca/stevens/pipp-r-module/ ; permissions evidence: https://pmc.ncbi.nlm.nih.gov/articles/PMC9566023/ |
| COMFORTneo | unresolved | Keep blocked pending rights resolution | COMFORTneo is a neonatal modification of COMFORT-B; ePROVIDE identifies COMFORT-B copyright holders and recommends COMFORTneo for preterm neonates, but an authoritative COMFORTneo licence permitting unrestricted republication has not been verified: https://eprovide.mapi-trust.org/instruments/comfort-behaviour-scale |
| Brighton PEWS | unresolved | Keep blocked pending rights resolution | University of Brighton identifies Alan Monaghan as the original author and publicly displays the score table, but no explicit licence for unrestricted republication of the operational instrument has been verified: https://research.brighton.ac.uk/en/persons/alan-monaghan/ |
| RDAI | unresolved | Keep blocked pending rights resolution | The scoring construct is widely reproduced and remains in active research use, but no authoritative instrument-level unrestricted republication licence has been located. |
| BROSJOD | unresolved | Keep blocked pending rights resolution | The validation article is publisher-copyrighted (© 2016 Wiley Periodicals, Inc.); no instrument-level unrestricted licence has been verified: https://onlinelibrary.wiley.com/doi/10.1002/ppul.23546 |
| PRISM IV | open_reuse | Local implementation allowed with attribution | Pollack et al. explicitly state that the PRISM IV algorithms were placed in the public domain; CPCCRN also provides the official calculator. Sources: https://pmc.ncbi.nlm.nih.gov/articles/PMC5048467/ ; https://www.cpccrn.org/calculators/prismivcalculator/ |
| PRISM III | permission_required | Keep deprecated/blocked | Proprietary/copyrighted scoring system; PRISM IV is active locally instead. |
| Orbegozo growth | permission_required | Keep blocked | Proprietary growth references; permission/licence required. |
| PYMS | unresolved | Keep blocked pending rights resolution | The original Clinical Nutrition development paper is © 2011 Elsevier/ESPEN and describes the four operational components and scoring, while the British Journal of Nutrition evaluation is © The Authors 2010. Neither source establishes an instrument-level unrestricted republication licence. Article availability or author-held article copyright is not enough to license the operational form: https://www.clinicalnutritionjournal.com/article/S0261-5614%2811%2900032-X/fulltext ; https://www.cambridge.org/core/journals/british-journal-of-nutrition/article/fourstage-evaluation-of-the-paediatric-yorkhill-malnutrition-score-in-a-tertiary-paediatric-hospital-and-a-district-general-hospital/2F57A5711A1D5EB7E33548FE677402E2 |
| FLACC | permission_required | Keep blocked / official licensing link | University of Michigan states that clinical/health-system use requires a commercial licence; academic/research use also requires authorization. Official licensing page: https://available-inventions.umich.edu/product/face-legs-activity-cry-consolability-observational-tool-as-a-measure-of-pain |
| rFLACC | permission_required | Keep blocked / official licensing link | Same University of Michigan licensing program as FLACC. Official licensing page: https://available-inventions.umich.edu/product/face-legs-activity-cry-consolability-observational-tool-as-a-measure-of-pain |
| CHEOPS | unresolved | Keep blocked / official reference | The Centre for Pediatric Pain Research publicly describes CHEOPS, but does not publish an explicit unrestricted-reuse licence for the operational instrument; CHEO's general website terms restrict republication. An openEHR archetype is CC BY-SA, but that does not establish rights to the original instrument wording. Official measure reference: https://pediatric-pain.ca/resources/our-measures/ |
| SOS-PD | permission_required | Keep blocked; official external reference/download is acceptable | The official English instrument PDF states “Copyright Benelux, van Dijk - 2014” and “Do not reproduce without permission.” This instrument-level notice controls despite the 2018 validation article being CC BY: https://comfortassessment.nl/web/files/7014/2919/5578/SOS-PD_scale_EN_April_2015.pdf |
| PedNIHSS | unresolved | Keep blocked pending rights resolution | The score is well described in peer-reviewed clinical literature (e.g. PMID 37079905), but no authoritative instrument-level licence permitting unrestricted republication has been verified. Do not infer reuse rights from the NIH-derived name or from secondary calculator descriptions: https://pubmed.ncbi.nlm.nih.gov/37079905/ |
| CRIB II | unresolved | Keep blocked pending rights resolution | Original publication/publisher rights remain relevant; no verified unrestricted instrument licence. |
| N-PASS | permission_required | Keep blocked | Multiple implementations identify the instrument as © Pat Hummel and “used with permission”; this is positive evidence against assuming unrestricted republication. LOINC also records the instrument panel as © 2009 Pat Hummel / used with permission. |
| EDIN | unresolved | Keep blocked pending rights resolution | Original validation defines five behavioural domains scored 0–3, but no authoritative unrestricted licence for the operational descriptors has been verified. Later open-access studies reproduce the scoring concept; that does not establish rights to republish the original item wording. Original validation: https://pubmed.ncbi.nlm.nih.gov/11420320/ |
| NFCS | unresolved | Keep blocked pending rights resolution | Includes facial coding descriptors; unrestricted republication licence not verified. |
| CMAS | permission_required | Keep blocked | The original CMAS and later validation were published by the American College of Rheumatology/Wiley under publisher copyright. NIEHS/IMACS explicitly warns that some IMACS tools are copyrighted and that additional permissions are often required, directing users to check authors/journals before use. Sources: https://www.niehs.nih.gov/research/resources/imacs/othertools ; https://onlinelibrary.wiley.com/doi/10.1002/art.20179 |
| MMT8 | permission_required | Keep blocked | ePROVIDE explicitly states “The MMT-8 is copyrighted by Wiley”; Wiley also operates a licensing pathway for this COA. This is direct instrument-level evidence, stronger than generic IMACS caution: https://eprovide.mapi-trust.org/instruments/manual-muscle-testing-8 ; https://www.wiley.com/en-mx/solutions-partnerships/corporates/reprints-licensing/clinical-outcome-assessments/about-coas/mmt8/ |
| J4S | unresolved | Keep blocked pending rights resolution | The original 2012 J4S article is © American College of Rheumatology/Wiley and describes the nine-domain weighted score, but article copyright alone does not prove that the underlying scoring construct requires an instrument licence. No authoritative unrestricted instrument licence or explicit instrument-level permission requirement has been verified: https://onlinelibrary.wiley.com/doi/10.1002/art.34652 |
| JDM Disease Activity Score | permission_required | Keep blocked | NIH/NIEHS IMACS distributes the Disease Activity Score and explicitly instructs users: “Please seek permission to use from the publisher and authors.” The original validation article is also © 2003 American College of Rheumatology. This is direct authoritative evidence that PedsCore should not republish the operational instrument without permission: https://www.niehs.nih.gov/research/resources/imacs/othertools ; https://onlinelibrary.wiley.com/doi/10.1002/art.10924 |
| Myositis Damage Index | permission_required | Keep blocked | NIEHS/IMACS explicitly warns that some tools are under copyright and that additional permissions are often required; MDI is distributed in the IMACS tool ecosystem. ePROVIDE currently lists no specific copyright holder, so this remains permission_required on the conservative IMACS policy rather than a claim of a named rightsholder: https://www.niehs.nih.gov/research/resources/imacs/othertools ; https://eprovide.mapi-trust.org/instruments/myositis-damage-index |
| FNASS 21-item | unresolved | Keep blocked pending rights resolution | PhenX provides the 2019 FNAST protocol publicly, but no instrument-level licence granting unrestricted republication has yet been verified: https://www.phenxtoolkit.org/protocols/view/300701 |

## Review rule

A tool may move from `blocked_by_rights` to `local_active` only when at least one of the following is documented:

1. explicit public-domain status;
2. CC BY / CC BY-SA or comparable licence covering the reproduced operational content;
3. written permission from the rights holder;
4. clear evidence that PedsCore is implementing uncopyrightable factual criteria/formulae without reproducing protected wording, layout, images, or proprietary norm tables.

When evidence is ambiguous, use `reuse: unresolved` rather than `permission_required`.

## Evidence hierarchy for rights decisions

1. Rights notice or licence attached to the instrument itself.
2. Written terms from the instrument author/rightsholder or official instrument site.
3. Explicit permission statement in a peer-reviewed translation/adaptation/validation paper.
4. Publisher licence covering the exact operational content being reused.
5. Secondary reproductions only as corroboration; never as sole evidence of permission.

A Creative Commons licence on an article does **not** override a separate copyright notice attached to an instrument reproduced or discussed in that article. SOS-PD is the current canonical example in this register.

## Notes

- An open-access article is **not automatically** an open-licensed instrument.
- A Creative Commons licence on a paper does not necessarily license a third-party instrument reproduced in that paper unless the article states otherwise.
- Translations may have separate permissions from the original instrument.
- “Freely downloadable” is not equivalent to “freely reproducible.”
- PedsCore should retain source URLs, access dates, licence terms, and attribution requirements for every locally implemented tool.
