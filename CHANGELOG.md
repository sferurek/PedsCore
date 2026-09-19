# Changelog

All notable changes to PedsCore are documented here.

## Unreleased · consolidation baseline · 2026-09-19

### P2 product quality

- Rewrote the GitHub front page to foreground clinical architecture, deterministic calculation, rights governance, safety and review workflow.
- Removed stale WHO Growth partial-status wording from the current product experience.
- Refined Spain-Spanish clinical terminology.
- Added skip navigation, focus-visible treatment and reduced-motion handling.
- Improved Finder labelling, mobile touch targets and privacy guidance.
- Added aggregate Finder/navigation events without transmitting Finder free text.
- Added a documented P2 quality-audit matrix.

### P1 consolidation

- Added executable governance audit across catalog, discovery metadata, calculator registry and reuse status.
- CI now runs both governance and SEO audits after build.
- SEO route-count checks are derived from the live catalog instead of stale hard-coded totals.
- Added formal risk-based Clinical Review Program and structured review issue template.
- Opened Tier A high-risk clinical review tracker (#85).
- Recorded the verified GitHub Pages → Vercel root migration in GSC Wizard.
- Strengthened category editorial content after live on-page SEO audit found two low-severity thin-content notices.

### Catalog and availability

- Catalog reconciled to **137** clinical tools/surfaces.
- **134** surfaces active and **3** legacy surfaces deprecated.
- **0** active blocked surfaces and **0** local-planned entries.
- **64** tools marked implemented.
- **61** discovery surfaces marked `local_active`.
- Rights-limited tools are exposed through official/original external references rather than dead-end blockers.

### Clinical implementations

Recent activation work includes WHO Growth, CDC Growth, STRONGkids, VAS/EVA, Step-by-Step, PECARN Febrile Infant, Yale Observation Scale, PUCAI, PCDAI, PASS, Gorelick, pRIFLE, KDIGO, PELOD-2, PRISM IV, PIM3, pSOFA, FNAST/Finnegan 21-item, RDAI, SNAPPE-II, Modified Tal, Taussig, RISC/mRISC, Phoenix Sepsis, pARC, Bacterial Meningitis Score, CKiD U25, Modified Bell NEC, nSOFA and wPCDAI.

### Rights and governance

- Added and reconciled `docs/CLINICAL_TOOL_RIGHTS.md`.
- PRISM IV documented as public-domain algorithm logic.
- Rights-limited instruments retain active reference surfaces with authoritative links.
- Removed FLACC from the local calculator registry/export and removed its local calculator implementation.
- Added a regression gate preventing `permission_required` or `external_only` tools from entering the local calculator registry.

### Product and SEO

- ES/EN clinical pages and Finder remain active.
- Static/prerendered routes, canonical metadata, sitemap/hreflang and SEO checks are integrated.
- Google Search Console indexing monitoring is active.
- Clinical review date is visible in the product.

### Safety

- Local tools remain descriptive/traceable and avoid automatic treatment, admission, discharge, imaging or limitation-of-support recommendations unless explicitly reviewed.
- No clinical form values or calculation results are stored by PedsCore.

## v0.1.0-alpha

Initial public-alpha foundation: bilingual React/Vite application, TypeScript clinical core, evidence-first catalog, local calculation engine, WHO growth foundation, public documentation, CI and Vercel deployment.

Historical counts in early alpha planning documents have been superseded by the current consolidation baseline above.
