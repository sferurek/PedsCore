# PedsCore Roadmap

This roadmap tracks the public alpha path for PedsCore. Dates are intentionally omitted until maintainer review and contributor capacity are stable.

## Completed For v0.1.0-alpha

- Monorepo infrastructure with TypeScript, ESLint, Vitest and workspaces.
- `packages/core` clinical tool contracts, catalog and calculator registry.
- `apps/web` React + Vite catalog-driven web application.
- ES/EN routing, language selection and localized UI.
- GitHub Pages deployment with SPA fallback.
- Evidence matrix and evidence documentation under `docs/evidence`.
- Dynamic forms, result panels, trace output, references and disclaimers.
- Initial validated calculators and scores.
- Pediatric head trauma rules implemented as informational-only clinical rules.
- WHO Growth module with official WHO 0-5 indicators, partial WHO 5-19
  BMI-for-age/height-for-age, guided age input and printable SVG charts.
- Visible validation status for implemented, pending, catalog-only and license-sensitive tools.
- No backend, login, analytics or clinical data storage.

## Current Alpha Release

`v0.1.0-alpha` includes:

- 79 cataloged pediatric and neonatal tools.
- 17 fully implemented tools.
- 1 partially implemented module: WHO Growth.
- SPRINT-50 implementation audit completed with no unsafe promotions; see
  `docs/evidence/SPRINT_50_IMPLEMENTATION_PLAN.md`.
- Public GitHub Pages site: https://sferurek.github.io/PedsCore/
- MIT-licensed code.
- Evidence-first release documentation: [docs/releases/v0.1.0-alpha.md](docs/releases/v0.1.0-alpha.md).

## Next Priorities

### Maintainer Decisions

- Select exact variants for tools with multiple versions.
- Decide catalog-only versus active implementation for higher-risk tools.
- Define allowed output style for resuscitation, intensive care and prognostic tools.

### Literal Spain Spanish Wording

- Audit implemented scores and scales for literal Spain Spanish wording.
- Add only source-verified literal text.
- Avoid copying license-sensitive tables or protected scale text without permission.

### Evidence And Expert Review

- Continue primary source, DOI/PMID/URL and licensing checks.
- Prioritize clinical expert review for implemented tools.
- Keep tools blocked when source, table, variant or license gates are incomplete.
- Use the SPRINT-50 audit to select the next implementation batch only after
  blockers are resolved.

### WHO Growth And Percentiles

- Complete visual QA of WHO Growth charts and print output.
- Complete maintainer/expert review for WHO Growth.
- Define interpolation policy before enabling interpolated lookup.
- Review whether WHO 5-10 weight-for-age should be added when applicable.
- Continue dataset versioning and attribution policy.
- Review CDC datasets only in a separate future block.
- Review Orbegozo data availability and licensing.
- Implement only after data and license gates are clear.

### Additional Calculators

- Add new calculators only after evidence, variant, licensing and test gates are satisfied.
- Keep outputs descriptive and traceable.
- Avoid treatment, admission, discharge, imaging or referral recommendations unless explicitly reviewed and in scope.

## Out Of Scope For Current Alpha

- Toxicology.
- Backend.
- Login.
- Supabase.
- Analytics.
- Clinical data storage.
- Public API.
- Mobile app.
