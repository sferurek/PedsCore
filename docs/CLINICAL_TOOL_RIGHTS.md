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
| CAPD | permission_required | Keep blocked / external reference | Cornell material states copyright/all rights reserved; permission is documented in derivative uses. |
| WAT-1 | permission_required | Keep blocked | Published instrument carries rights restrictions / reproduced-by-permission language. |
| COMFORT-B | permission_required | Keep blocked | Instrument-specific copyright/permission controls. |
| Braden QD | permission_required | Keep blocked | Author permits clinical use but requires permission for republication. |
| SBS | permission_required | Keep blocked | Author-controlled instrument; republication requires permission. |
| pCAM-ICU | permission_required | Keep blocked / external | Instrument-specific terms apply. |
| psCAM-ICU | permission_required | Keep blocked / external | Instrument-specific terms apply. |
| PIPP | unresolved | Keep blocked pending rights resolution | Publicly described, but no verified unrestricted republication licence. |
| PIPP-R | permission_required | Keep blocked | A Spanish cross-cultural validation protocol explicitly states that consent was sought from and granted by the author of the original scale before translation/adaptation; the same paper states that study data are unavailable due to copyright protection: https://pmc.ncbi.nlm.nih.gov/articles/PMC9566023/ |
| COMFORTneo | unresolved | Keep blocked pending rights resolution | Publicly described; instrument-level reuse terms not verified. |
| Brighton PEWS | unresolved | Keep blocked pending rights resolution | No verified unrestricted republication licence. |
| RDAI | unresolved | Keep blocked pending rights resolution | Public score descriptions exist; republication permission not yet verified. |
| BROSJOD | unresolved | Keep blocked pending rights resolution | Public validation sources exist; instrument-level reuse not yet verified. |
| PRISM III | permission_required | Keep deprecated/blocked | Proprietary/copyrighted scoring system; PRISM IV is active locally instead. |
| Orbegozo growth | permission_required | Keep blocked | Proprietary growth references; permission/licence required. |
| PYMS | unresolved | Keep blocked pending rights resolution | Original publication is publisher-controlled; no verified unrestricted instrument licence. |
| FLACC | unresolved | Keep blocked pending rights resolution | Widely reproduced clinically, but PedsCore has not verified a publication licence suitable for public republication. |
| rFLACC | unresolved | Keep blocked pending rights resolution | Same rationale; derivative/modified instrument. |
| CHEOPS | unresolved | Keep blocked pending rights resolution | No verified unrestricted instrument licence. |
| SOS-PD | permission_required | Keep blocked; official external reference/download is acceptable | The official English instrument PDF states “Copyright Benelux, van Dijk - 2014” and “Do not reproduce without permission.” This instrument-level notice controls despite the 2018 validation article being CC BY: https://comfortassessment.nl/web/files/7014/2919/5578/SOS-PD_scale_EN_April_2015.pdf |
| PedNIHSS | unresolved | Keep blocked pending rights resolution | Instrument-specific reuse not verified. |
| CRIB II | unresolved | Keep blocked pending rights resolution | Original publication/publisher rights remain relevant; no verified unrestricted instrument licence. |
| N-PASS | permission_required | Keep blocked | Multiple implementations identify the instrument as © Pat Hummel and “used with permission”; this is positive evidence against assuming unrestricted republication. LOINC also records the instrument panel as © 2009 Pat Hummel / used with permission. |
| EDIN | unresolved | Keep blocked pending rights resolution | Public descriptions and scoring summaries are available, but no authoritative unrestricted republication licence for the operational instrument has been verified. |
| NFCS | unresolved | Keep blocked pending rights resolution | Includes facial coding descriptors; unrestricted republication licence not verified. |
| CMAS | permission_required | Keep blocked | IMACS/NIH materials indicate permission may be required for specific instruments. |
| MMT8 | permission_required | Keep blocked | IMACS/NIH instrument-use restrictions apply. |
| J4S | unresolved | Keep blocked pending rights resolution | No verified unrestricted republication licence. |
| JDM Disease Activity Score | unresolved | Keep blocked pending rights resolution | No verified unrestricted republication licence. |
| Myositis Damage Index | permission_required | Keep blocked | IMACS/NIH indicates permission requirements for instrument reuse. |
| FNASS 21-item | unresolved | Keep blocked pending rights resolution | Historical scale is widely described, but unrestricted republication of the full operational form has not been verified. |

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
