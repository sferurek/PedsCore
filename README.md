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

- 79 tools cataloged.
- 17 tools fully implemented with active calculation or informational clinical rule output.
- 1 partially implemented module: WHO Growth.
- ES/EN static web application.
- Dynamic forms and traceable result panels.
- Evidence-first references and visible validation status.
- WHO Growth module with official WHO 0-5 indicators, partial WHO 5-19
  BMI/height indicators, printable SVG charts and guided age input.
- GitHub Pages deployment.
- No backend, login, analytics or clinical data storage.

SPRINT-50 audited the catalog for additional safe implementations. The fully
implemented count intentionally remains 17 because no further pending tool met
all implementation gates at once. WHO Growth is tracked separately as
`partially_implemented`. See
[docs/evidence/SPRINT_50_IMPLEMENTATION_PLAN.md](docs/evidence/SPRINT_50_IMPLEMENTATION_PLAN.md).

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

## WHO Growth module

PedsCore includes a unified WHO Growth workflow for growth and nutrition review.

Current scope:

- WHO Child Growth Standards 0-5: BMI-for-age, weight-for-age,
  length/height-for-age, head circumference-for-age, weight-for-length and
  weight-for-height.
- WHO Growth Reference 2007 5-19: BMI-for-age and height-for-age.
- Official WHO LMS data kept under separate WHO data licensing, not under the
  MIT source-code license.
- PedsCore-generated SVG charts with written percentiles P3/P15/P50/P85/P97 and
  a visible patient point.
- Native browser printing.
- Guided age input for dates, exact days, structured years/months/days and
  completed months for 5-19.
- No storage of entered clinical data and no clinical analytics.

The unified WHO Growth module is `partially_implemented` while final
maintainer review, interpolation policy and remaining 5-19 scope are completed.
It does not provide nutritional diagnoses or treatment recommendations.

## Architecture

- `packages/core`: Pure TypeScript library containing deterministic functions for each tool.  No UI or side effects.
- `apps/web`: A static web application (React + TypeScript + Vite) that consumes the core library and presents multilingual forms and results. It is deployed via GitHub Pages.
- `docs/`: Markdown documentation including detailed descriptions of each tool and the scientific evidence behind them.
- `references/`: Bibliography and source materials (e.g. articles, guidelines).
- `.github/`: Issue templates, pull request templates, workflows and community standards.

## Current status

PedsCore is in public alpha. The catalog, web interface, evidence matrix, initial calculators, pediatric head trauma informational rules and WHO Growth workflow are available. Many cataloged tools remain pending validation, source review, licensing review or maintainer decision before active calculation.

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

Completed alpha milestones include the monorepo, catalog, web shell, GitHub Pages, evidence matrix, dynamic forms, initial calculators, informational head trauma rules and WHO Growth 0-5/partial 5-19 workflow.

Next priorities include maintainer decisions, literal Spain Spanish wording audit, expert review, WHO Growth visual QA/interpolation policy, possible WHO 5-10 weight-for-age review and additional calculators after evidence gates are satisfied.

For more details, see **ROADMAP.md**.
