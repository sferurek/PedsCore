# PedsCore

> **Amazon Developer Hackathon 2026:** the Alexa+ / self-hosted MCP workstream is documented in [HACKATHON_2026.md](HACKATHON_2026.md). RC3 candidate branch: `hackathon/alexa-mcp-v3`. Live judge console: https://pedscore-ai-mcp-production.up.railway.app/judge-demo\n\n**Evidence-traceable pediatric clinical tools — deterministic where appropriate, explicit about uncertainty, licensing and clinical scope.**

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Production](https://img.shields.io/badge/production-Vercel-blue.svg)](https://peds-core.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/sferurek/PedsCore/actions/workflows/ci.yml/badge.svg)](https://github.com/sferurek/PedsCore/actions/workflows/ci.yml)
[![Public alpha](https://img.shields.io/badge/status-public%20alpha-orange.svg)](docs/releases/v0.1.0-alpha.md)
[![Clinical data](https://img.shields.io/badge/clinical%20data-not%20stored-0f766e.svg)](DISCLAIMER.md)

> **PedsCore is not just a calculator collection.** It is a bilingual clinical knowledge layer for pediatrics and neonatology: catalog, discovery metadata, deterministic calculation engines, evidence traceability, rights/reuse governance, safety boundaries, clinical review workflow and an indexable public web product.

**Production:** https://peds-core.vercel.app/  
**Languages:** Spanish / English  
**Primary audience:** healthcare professionals, educators, reviewers and contributors

---

## Current production snapshot · 19 September 2026

| Metric | Current state |
| --- | ---: |
| Cataloged clinical tools / surfaces | **137** |
| Active surfaces | **134** |
| Deprecated legacy surfaces | **3** |
| Active blocked surfaces | **0** |
| Local-planned entries | **0** |
| Implemented clinical products | **64** |
| Active local-calculation surfaces | **61** |
| Sitemap URLs | **325** |
| Clinical data persisted | **0** |

WHO Growth and CDC Growth are operational. Rights-limited instruments remain clinically discoverable through authoritative external references rather than dead-end pages.

## What makes PedsCore different

### 1. Clinical state is modeled explicitly

A catalog entry is not automatically treated as a calculator.

PedsCore separates:

- clinical surface status;
- calculation availability;
- evidence state;
- reuse/licensing status;
- exact population and care setting;
- clinical function;
- interaction mode;
- risk tier;
- implementation status.

That makes it possible to represent a tool accurately even when local calculation is inappropriate, rights-limited or still under evidence review.

### 2. The calculation layer is deterministic

Local calculators live in `packages/core` and are independent of the presentation layer.

Clinical logic is expected to have:

- exact source/version traceability;
- reproducible formulas, criteria or tables;
- explicit boundary handling;
- deterministic tests;
- descriptive output wording;
- no hidden LLM inference.

PedsCore does **not** use generative AI to calculate scores.

### 3. Rights are part of the architecture

Reuse status is not a footer disclaimer; it affects runtime availability.

Protected instruments can remain active as official external references without reproducing protected forms, item wording, matrices, proprietary charts or licensed content.

CI now prevents `permission_required` and `external_only` tools from entering the local calculator registry.

See [Clinical Tool Rights](docs/CLINICAL_TOOL_RIGHTS.md).

### 4. Safety constraints are deliberate

PedsCore is designed as professional educational/informational support.

It does not automatically turn prognostic scores or decision rules into treatment, admission, discharge, imaging or limitation-of-support instructions.

The project intentionally distinguishes:

**documented score/result → clinical context → clinician judgment**

rather than collapsing them into a prescriptive recommendation.

### 5. Governance is executable

The repository contains an automated cross-layer governance audit:

```bash
npm run audit:governance
```

It checks consistency across:

**catalog ↔ discovery metadata ↔ calculator registry ↔ reuse status ↔ external references**

CI also runs:

```bash
npm install
npm run lint
npm run test
npm run build
npm run audit:governance
npm run seo:check
npm run alexa:validate
```

For the hackathon candidate, the equivalent one-command verification is `npm run hackathon:verify`.

A catalog/runtime mismatch is therefore treated as a build failure, not as documentation debt.

---

## Public metadata API

PedsCore exposes an initial read-only metadata API for catalog discovery, provenance and review-state integrations. It accepts no patient data and does not calculate clinical scores.

See [`docs/PUBLIC_API_V1.md`](docs/PUBLIC_API_V1.md).

## Architecture

```text
PedsCore
├── packages/core
│   ├── clinical catalog
│   ├── discovery taxonomy
│   ├── deterministic calculators
│   ├── evidence/reference model
│   ├── WHO/CDC growth engines
│   └── SEO metadata
├── apps/web
│   ├── React + TypeScript + Vite
│   ├── ES/EN routes
│   ├── PedsCore Finder
│   ├── local calculation UI
│   ├── static/prerendered clinical pages
│   └── privacy-preserving aggregate analytics
├── docs
│   ├── evidence notes
│   ├── clinical rights register
│   ├── editorial policy
│   ├── clinical review program
│   └── release / SEO governance
└── .github
    ├── CI
    └── structured clinical review workflows
```

### Runtime philosophy

Where local calculation is appropriate, the browser performs it locally.

There is no patient account, clinical database or server-side clinical calculation dependency. Clinical form values and calculation results are not intended to be persisted or sent to analytics.

---

## PedsCore Finder

Finder is a deterministic clinical discovery layer over the catalog.

It combines structured metadata such as:

- age;
- clinical problem;
- specialty;
- care setting;
- intended function;
- exact-age applicability;
- exclusions;
- comparison groups;
- related tools.

It can therefore answer questions such as “which tool fits this clinical context?” without turning free text into a diagnostic model.

Finder suggestions are discovery support, not clinical recommendations.

---

## Growth engines

Current growth support includes:

- WHO Child Growth Standards 0–5;
- WHO Growth Reference 5–19 for the implemented indicators;
- WHO BMI-for-age;
- WHO head circumference-for-age;
- WHO written percentiles and z-score workflows;
- CDC 2000 growth percentiles;
- CDC Extended BMI handling;
- printable PedsCore-generated growth visualizations.

Third-party growth data keep their original attribution and licensing conditions and are not automatically relicensed under MIT.

---

## Clinical review model

Technical implementation and independent clinical review are intentionally separate states.

PedsCore now has a formal risk-based [Clinical Review Program](docs/CLINICAL_REVIEW_PROGRAM.md), beginning with critical/high-risk local tools such as PRISM IV, PELOD-2, PIM3, pSOFA, Phoenix Sepsis, febrile-infant rules, pediatric TBI rules and AKI scores.

A completed external review records:

- reviewer role;
- exact commit/version;
- sources checked;
- population and exclusions;
- formula/table/branching logic;
- boundary conditions;
- missing-data behavior;
- ES/EN wording;
- outcome and required corrections.

The project does not claim independent review where no documented independent review exists.

---

## Evidence and editorial governance

Useful entry points for evaluating the project:

- [Editorial Policy](docs/EDITORIAL_POLICY.md)
- [Clinical Tool Rights](docs/CLINICAL_TOOL_RIGHTS.md)
- [Clinical Review Program](docs/CLINICAL_REVIEW_PROGRAM.md)
- [Disclaimer](DISCLAIMER.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)
- [SEO / indexability checks](docs/SEO_CHECKLIST.md)
- [P2 Quality Audit](docs/P2_QUALITY_AUDIT.md)
- [Evidence documentation](docs/evidence/)

If you are evaluating the clinical “brain” of PedsCore, start with:

1. `packages/core/src/catalog/`
2. `packages/core/src/discovery/`
3. `packages/core/src/calculators/`
4. `packages/core/tests/`
5. `docs/CLINICAL_TOOL_RIGHTS.md`
6. `docs/CLINICAL_REVIEW_PROGRAM.md`
7. `scripts/verify-governance.mjs`

---

## Safety and scope

PedsCore is an educational and informational resource for qualified healthcare professionals.

- It does not diagnose.
- It does not prescribe treatment.
- It does not replace individual clinical assessment.
- It does not replace local protocols or institutional policy.
- Prognostic models are presented as descriptive/population-level tools where appropriate.
- Do not submit identifiable patient information in GitHub issues, pull requests, examples or screenshots.

See [DISCLAIMER.md](DISCLAIMER.md).

---

## Search and public discoverability

The production web application includes:

- canonical ES/EN routes;
- reciprocal hreflang;
- static/prerendered clinical pages;
- tool/category/topic structured data;
- generated sitemap;
- technical SEO audit;
- Google Search Console monitoring;
- full-sitemap indexing tracker.

SEO checks are derived from the live catalog rather than hard-coded route totals.

---

## Contributing

The most useful contributions are:

- independent clinical review;
- primary-source verification;
- boundary-case test review;
- rights/licensing clarification;
- Spanish/English clinical terminology review;
- accessibility and mobile QA;
- Finder relevance feedback.

Start with [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Citation and license

Machine-readable citation metadata are available in [CITATION.cff](CITATION.cff).

PedsCore source code is released under the [MIT License](LICENSE). Third-party instruments, source data and copyrighted clinical materials retain their own terms and are not automatically covered by the MIT license.
