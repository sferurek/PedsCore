# PedsCore

## Description

PedsCore is an **open‑source library of pediatric and neonatal clinical tools**.  It provides evidence‑based scores, scales, calculators, algorithms, percentiles and clinical rules to support healthcare professionals in assessing and monitoring their patients.  It is **not** intended to replace clinical judgment or local protocols.

## Mission

To make pediatric and neonatal clinical tools accessible, transparent and easy to use.  We aim to improve the quality and safety of care by providing accurate calculations and clear interpretation guidance based on the best available evidence.

## Scope

- **Scores and scales**: APGAR, Silverman–Andersen, Wood‑Downes, Ballard, NIPS, etc.
- **Calculators**: Schwartz (eGFR), Shock Index Pediatric Age‑Adjusted, and others.
- **Algorithms**: Basic resuscitation dosing, airway sizing, trauma triage rules.
- **Percentiles**: Growth curves from WHO, CDC and Fundación Orbegozo.
- **Clinical rules**: PECARN for head trauma, sepsis and shock indices.

The project **excludes toxicology** in the initial phase.

## Architecture (planned)

- `packages/core`: Pure TypeScript library containing deterministic functions for each tool.  No UI or side effects.
- `apps/web`: A static web application (React + TypeScript + Vite) that consumes the core library and presents multilingual forms and results.  It will be deployed via GitHub Pages.
- `docs/`: Markdown documentation including detailed descriptions of each tool and the scientific evidence behind them.
- `references/`: Bibliography and source materials (e.g. articles, guidelines).
- `.github/`: Issue templates, pull request templates, workflows and community standards.

## Current status

This repository currently contains only documentation and project scaffolding.  The calculation engine and web interface have not yet been implemented.  See **ROADMAP.md** for planned development phases.

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

## Roadmap (brief)

1. **Phase 0** – Documentation (current): compile evidence and project requirements.
2. **Phase 1** – Core Engine: implement TypeScript functions with tests for all essential tools.
3. **Phase 2** – Web Application: build a multilingual static site using the core engine.
4. **Phase 3** – Internationalisation: support English and Spanish with automatic detection and manual selection.
5. **Phase 4** – Analytics: add anonymous, aggregated usage statistics without storing clinical data.
6. **Phase 5** – Mobile App: develop a Flutter app reusing the core library.
7. **Phase 6** – Public API: expose the core engine through a REST or GraphQL API.

For more details, see **ROADMAP.md**.
