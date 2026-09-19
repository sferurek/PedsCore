# PedsCore

**Open-source pediatric and neonatal clinical tools with evidence traceability.**

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Production](https://img.shields.io/badge/web-Vercel-blue.svg)](https://peds-core.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/sferurek/PedsCore/actions/workflows/ci.yml/badge.svg)](https://github.com/sferurek/PedsCore/actions/workflows/ci.yml)
[![Alpha](https://img.shields.io/badge/status-alpha-orange.svg)](docs/releases/v0.1.0-alpha.md)
[![No clinical data storage](https://img.shields.io/badge/clinical%20data-not%20stored-0f766e.svg)](DISCLAIMER.md)

PedsCore is a bilingual public-alpha library of pediatric and neonatal clinical tools for healthcare professionals, educators and contributors. It separates clinical availability, evidence, licensing/reuse status and calculation availability instead of treating every catalog entry as a local calculator.

**Production:** https://peds-core.vercel.app/

## Current status · 19 September 2026

- **137** cataloged clinical tools/surfaces.
- **134** active surfaces.
- **3** intentionally deprecated legacy surfaces.
- **0** active blocked surfaces and **0** local-planned entries.
- **64** tools marked as implemented clinical products.
- **61** active local-calculation surfaces in discovery metadata.
- Rights-limited instruments remain useful through official/original external references rather than dead-end blockers.
- WHO Growth and CDC Growth are operational.
- ES/EN web app deployed on Vercel.
- No login and no clinical-data persistence.
- Clinical form values and calculation results are not sent to analytics.

## Product principles

PedsCore prioritizes:

- exact tool/version identification;
- primary or authoritative sources;
- deterministic calculation logic where local calculation is appropriate;
- explicit population and safety boundaries;
- licensing and reuse review;
- bilingual clinical presentation;
- visible references and traceability;
- descriptive outputs rather than automated treatment, admission, discharge or imaging instructions.

A protected tool can be an **active external reference** without PedsCore reproducing protected forms, matrices, images or wording.

## Architecture

- `packages/core`: catalog, discovery metadata, deterministic calculators and clinical contracts.
- `apps/web`: React + TypeScript + Vite application.
- `docs`: evidence notes, rights register, editorial policy, release and SEO documentation.
- `.github`: CI and contribution templates.

The web app calculates locally in the browser where possible. PedsCore does not require a clinical backend or patient account.

## Clinical governance

Important project documents:

- [Editorial policy](docs/EDITORIAL_POLICY.md)
- [Clinical tool rights register](docs/CLINICAL_TOOL_RIGHTS.md)
- [Disclaimer](DISCLAIMER.md)
- [Contributing guide](CONTRIBUTING.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)
- [Clinical review queue](docs/CLINICAL_REVIEW_QUEUE.md)

Local activation requires source traceability, a complete formula/table/logic path, an exact variant, safe wording, deterministic tests and compatible reuse rights.

## Growth

Current growth support includes:

- WHO Child Growth Standards 0-5.
- WHO Growth Reference 5-19 for the applicable implemented indicators, including the completed 5-10 weight-for-age range.
- WHO BMI-for-age and head-circumference presets.
- CDC 2000 growth percentiles with Extended BMI handling.
- External/reference growth tools where local redistribution is not appropriate.

WHO source data remain subject to WHO attribution/licensing terms and are not relicensed under MIT.

## Safety and scope

PedsCore is an educational and informational resource for qualified healthcare professionals.

- It does not diagnose.
- It does not prescribe treatment.
- It does not replace clinical judgment, local protocols, institutional policy or specialist assessment.
- Prognostic scores are presented as descriptive/population-level tools where appropriate.
- Do not submit identifiable patient information to GitHub issues, pull requests or examples.

See [DISCLAIMER.md](DISCLAIMER.md).

## Search, discovery and SEO

The application includes:

- clinical Finder;
- category and topic discovery;
- individual ES/EN tool pages;
- canonical SEO metadata;
- sitemap and hreflang generation;
- static/prerendered routes;
- IndexNow tooling;
- Google Search Console monitoring.

See [docs/SEO_CHECKLIST.md](docs/SEO_CHECKLIST.md).

## Contributing

Useful contributions include clinical calculation review, primary-source verification, translation review, accessibility/UX feedback and evidence updates. Clinical changes should include reproducible sources and tests.

Start with [CONTRIBUTING.md](CONTRIBUTING.md).

## Citation

Machine-readable metadata are available in [CITATION.cff](CITATION.cff). See [docs/CITATION.md](docs/CITATION.md).

## License

PedsCore source code is released under the [MIT License](LICENSE). Third-party instruments, data and source materials are not automatically covered by that license.
