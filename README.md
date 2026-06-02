# PedsCore

## Description

PedsCore is an **open‑source library of pediatric and neonatal clinical tools**.  It provides evidence‑based scores, scales, calculators, algorithms, percentiles and clinical rules to support healthcare professionals in assessing and monitoring their patients.  It is **not** intended to replace clinical judgment or local protocols.

## Mission

To make pediatric and neonatal clinical tools transparent, auditable and reusable by the healthcare community.  PedsCore aims to provide a solid knowledge and calculation foundation that can later be consumed by a web interface, mobile app, API and other educational or clinical support projects.

## Scope

PedsCore covers tools used in:

- Neonatology
- Pediatric emergency medicine
- Pediatric hospital medicine
- Pediatric intensive care
- Pediatric cardiology
- Pediatric pulmonology
- Pediatric nephrology
- Pediatric endocrinology
- Pediatric gastroenterology
- Pediatric neurology
- Pediatric infectious diseases
- Growth and nutrition
- Neurodevelopment and developmental screening
- Pediatric palliative care
- Adolescent medicine

This initial phase **does not include toxicology, pharmacology databases, drug interactions or lactation resources**.

## Planned Architecture

```text
PedsCore/
├─ docs/                 # Scientific knowledge base and project documents
├─ references/           # Bibliography, source notes and evidence tracking
├─ packages/
│  └─ core/              # Future TypeScript calculation engine
├─ apps/
│  └─ web/               # Future static web app for GitHub Pages
└─ .github/              # Issue templates and contribution workflows
```

## Current Status

PedsCore is currently in **Phase 0: documentation and project scaffolding**. The current repository contains the scientific foundation, project brief, roadmap, disclaimer, contribution guidelines and GitHub collaboration templates. No clinical calculation engine or web application has been implemented yet.

## Disclaimer

PedsCore is an educational and informational resource for healthcare professionals. It does not replace clinical judgment, local protocols or specialist consultation. It must not be used as the sole basis for diagnosis, treatment or clinical decision‑making. No patient data should be entered or stored in the project repository.

See [DISCLAIMER.md](DISCLAIMER.md) for the full bilingual disclaimer.

## Contributing

Contributions are welcome, especially:

- New pediatric or neonatal tools supported by primary references.
- Corrections to formulas, variables or interpretation categories.
- Bibliographic improvements.
- Clinical content review.
- Future implementation of the calculation engine and web interface.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening issues or pull requests.

## License

Code is intended to be released under the MIT License. Documentation created by the project may later be dual‑licensed or explicitly marked under a documentation license if needed.

## Short Roadmap

1. Documentation and knowledge base.
2. TypeScript core calculation engine.
3. Static bilingual web app deployed with GitHub Pages.
4. Anonymous aggregated usage analytics.
5. Mobile app.
6. Public API.

See [ROADMAP.md](ROADMAP.md) for details.
