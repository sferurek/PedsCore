# PedsCore

**Open-source pediatric and neonatal clinical tools with evidence traceability.**

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Production](https://img.shields.io/badge/web-Vercel-blue.svg)](https://peds-core.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/sferurek/PedsCore/actions/workflows/ci.yml/badge.svg)](https://github.com/sferurek/PedsCore/actions/workflows/ci.yml)
[![Alpha](https://img.shields.io/badge/status-alpha-orange.svg)](docs/releases/v0.1.0-alpha.md)
[![No clinical data storage](https://img.shields.io/badge/clinical%20data-not%20stored-0f766e.svg)](DISCLAIMER.md)

PedsCore is a public-alpha, open-source library of pediatric and neonatal clinical tools for healthcare professionals, educators and contributors. It focuses on transparent implementation status, visible references, evidence traceability and careful safety wording.

Public web app:

https://peds-core.vercel.app/

## Current Alpha Status

- 80 cataloged pediatric and neonatal tools.
- 20 fully implemented tools with active calculation or informational rule output.
- 4 partially implemented WHO Growth entries: central module, WHO percentiles, BMI preset and head circumference preset.
- ES/EN web app deployed on Vercel.
- Serverless aggregate analytics API at `/api/analytics/countries`.
- No login.
- No clinical data storage.
- No clinical form values or calculation results are sent to analytics.

PedsCore is intentionally conservative: cataloged tools are not activated until source, formula/table, exact variant, tests, safe wording and licensing gates are satisfied.

## Highlights

- Pediatric scores and neonatal scores.
- Clinical calculators and traceable result panels.
- Informational pediatric head trauma rules.
- WHO Growth module with official WHO data.
- Evidence status for implemented, partially implemented, pending and license-sensitive tools.
- Public docs for roadmap, evidence review and release notes.
- TypeScript monorepo with React/Vite web app and tested core package.

Relevant discovery terms: pediatric scores, neonatal scores, clinical calculators, WHO Growth, evidence-based medicine, open-source healthcare, clinical decision support, medical education.

## WHO Growth Module

The WHO Growth module is available as a partially implemented growth workflow, with BMI and head circumference catalog entries acting as presets over the same WHO engine.

Current scope:

- Official WHO Child Growth Standards 0-5 indicators.
- Partial WHO Growth Reference 2007 5-19 indicators: BMI-for-age and height-for-age.
- Official WHO LMS data kept under separate WHO data licensing.
- PedsCore-generated printable SVG charts.
- Written percentile labels: P3, P15, P50, P85 and P97.
- Visible patient point on charts.
- Guided age input.
- No storage of entered clinical data.

The WHO Growth module remains `partially_implemented` while final maintainer review, interpolation policy and remaining 5-19 scope are completed. It does not provide nutritional diagnoses or treatment recommendations.

## Safety And Scope

PedsCore is an educational and informational resource for professional use.

- It does not diagnose.
- It does not recommend treatment.
- It does not replace clinical judgment, local protocols, institutional policies or specialist assessment.
- It does not store patient-identifiable data.
- Do not submit real patient data in issues, pull requests or examples.

See [DISCLAIMER.md](DISCLAIMER.md) for the full disclaimer.

## Implemented Tools

The 20 fully implemented tools are:

- Apgar.
- Silverman-Andersen.
- Wood-Downes-Ferres.
- FLACC.
- QTc Bazett.
- QTc Fridericia.
- QTc Framingham.
- QTc Hodges.
- Bedside Schwartz.
- Westley Croup Score.
- PRAM.
- Clinical Dehydration Scale.
- Pediatric Appendicitis Score.
- PECARN TBI under 2 years.
- PECARN TBI 2 years or older.
- CATCH.
- CHALICE.
- SIPA.
- NIPS.

Many additional tools remain cataloged but blocked pending source, table, variant, licensing or expert review. This is a safety decision, not a missing feature.

## Repository Structure

- `packages/core`: TypeScript catalog, contracts and deterministic calculation logic.
- `apps/web`: React + TypeScript + Vite static web application.
- `docs/`: Public documentation, evidence notes, release notes and launch checklists.
- `.github/`: Workflows, issue templates and pull request template.

## Contributing

Useful ways to support PedsCore:

- Star the repository.
- Open feedback or bug reports through GitHub Issues.
- Propose evidence updates with DOI, PMID or official URLs.
- Suggest UX, translation or documentation improvements.
- Review calculations only with traceable sources and tests.

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Clinical content contributions must include source, exact version/variant, reusable formula or table, licensing notes and safe output wording.

## Public Launch Notes

- Release notes: [docs/releases/v0.1.0-alpha.md](docs/releases/v0.1.0-alpha.md)
- Changelog: [CHANGELOG.md](CHANGELOG.md)
- Roadmap: [ROADMAP.md](ROADMAP.md)
- Launch checklist: [docs/PUBLIC_LAUNCH_CHECKLIST.md](docs/PUBLIC_LAUNCH_CHECKLIST.md)
- SEO checklist: [docs/SEO_CHECKLIST.md](docs/SEO_CHECKLIST.md)

## License

PedsCore source code is released under the [MIT License](LICENSE).

Documentation is intended for public project documentation unless a file states otherwise.

Third-party data and source materials are not automatically covered by the MIT license. WHO growth data are kept under separate WHO licensing and attribution terms.
