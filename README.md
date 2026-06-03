# PedsCore

**Open-source pediatric clinical tools, pediatric scores, neonatal scores, clinical calculators and evidence-based clinical decision support.**

**Version:** `v0.1.0-alpha`

Public alpha site:

https://sferurek.github.io/PedsCore/

## Public web app

https://sferurek.github.io/PedsCore/

## Description

PedsCore is an **open‑source library of pediatric and neonatal clinical tools**. It provides evidence-based pediatric scores, neonatal scores, clinical calculators, scales, percentiles and clinical decision-support rules for healthcare professionals. It is MIT-licensed source code with evidence traceability and is **not** intended to replace clinical judgment or local protocols.

## Keywords

pediatrics, neonatology, pediatric emergency medicine, pediatric scores, neonatal scores, clinical calculators, open source healthcare, clinical decision support, medical education, evidence-based medicine, digital health.

## Mission

To make pediatric and neonatal clinical tools accessible, transparent and easy to use.  We aim to improve the quality and safety of care by providing accurate calculations and clear interpretation guidance based on the best available evidence.

## Scope

- **Scores and scales**: APGAR, Silverman–Andersen, Wood‑Downes, Ballard, NIPS, etc.
- **Calculators**: Schwartz (eGFR), Shock Index Pediatric Age‑Adjusted, and others.
- **Algorithms**: Basic resuscitation dosing, airway sizing, trauma triage rules.
- **Percentiles**: Growth curves from WHO, CDC and Fundación Orbegozo.
- **Clinical rules**: PECARN for head trauma, sepsis and shock indices.

The project **excludes toxicology** in the initial phase.

## Current alpha scope

- 78 tools cataloged.
- 17 tools implemented with active calculation or informational clinical rule output.
- ES/EN static web application.
- Dynamic forms and traceable result panels.
- Evidence-first references and visible validation status.
- GitHub Pages deployment.
- No backend, login, analytics or clinical data storage.

## Privacy-first analytics

Analytics is disabled by default. If enabled by public build-time configuration, PedsCore may use privacy-preserving aggregate analytics to understand general website usage. IP addresses are not stored, tracking cookies are not used, user profiles are not created, and clinical data, form values and calculation results are never collected.

See [docs/ANALYTICS.md](docs/ANALYTICS.md).

## Implemented tools

- Apgar.
- Silverman-Andersen.
- FLACC.
- QTc Bazett.
- QTc Fridericia.
- QTc Framingham.
- QTc Hodges.
- Bedside Schwartz.
- Westley Croup Score.
- PRAM.
- Clinical Dehydration Scale.
- PECARN TBI under 2 years.
- PECARN TBI 2 years or older.
- CATCH.
- CHALICE.
- SIPA.
- NIPS.

## Architecture

- `packages/core`: Pure TypeScript library containing deterministic functions for each tool.  No UI or side effects.
- `apps/web`: A static web application (React + TypeScript + Vite) that consumes the core library and presents multilingual forms and results. It is deployed via GitHub Pages.
- `docs/`: Markdown documentation including detailed descriptions of each tool and the scientific evidence behind them.
- `references/`: Bibliography and source materials (e.g. articles, guidelines).
- `.github/`: Issue templates, pull request templates, workflows and community standards.

## Current status

PedsCore is in public alpha. The catalog, web interface, evidence matrix, initial calculators and pediatric head trauma informational rules are implemented. Many cataloged tools remain pending validation, source review, licensing review or maintainer decision before active calculation.

See [CHANGELOG.md](CHANGELOG.md), [ROADMAP.md](ROADMAP.md) and [docs/releases/v0.1.0-alpha.md](docs/releases/v0.1.0-alpha.md).

## Disclaimer (summary)

PedsCore is provided for **educational and informational purposes** for healthcare professionals.  It does **not** replace clinical judgment, local protocols, or specialist consultation.  The results from these tools should be interpreted by qualified professionals.  PedsCore does not store patient data.

## How to contribute

We welcome contributions!  See **CONTRIBUTING.md** for guidelines on submitting new tools, reporting errors or suggesting improvements.  Please provide references to peer‑reviewed literature or official guidelines when proposing new calculations or modifications.

## GitHub Pages deployment

Expected public URL:

https://sferurek.github.io/PedsCore/

To enable GitHub Pages:

1. Go to **Settings → Pages** in the GitHub repository.
2. Select **GitHub Actions** under **Build and deployment**.
3. Push to `main`.
4. The site will be published at the repository GitHub Pages URL.

The first deployment can take a few minutes after GitHub Pages is enabled.

## License

The core code is released under the [MIT License](LICENSE).  Documentation is released under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

Some third-party data sources, including WHO growth data if incorporated, may be distributed under their own licenses and are not covered by the MIT license for PedsCore source code.

## Roadmap (brief)

Completed alpha milestones include the monorepo, catalog, web shell, GitHub Pages, evidence matrix, dynamic forms, initial calculators and informational head trauma rules.

Next priorities include maintainer decisions, literal Spain Spanish wording audit, expert review, percentiles and additional calculators after evidence gates are satisfied.

For more details, see **ROADMAP.md**.
