# Contributing to PedsCore

Thank you for helping improve PedsCore. This project handles clinical reference material, so contributions must be traceable, conservative and safe.

Do not include patient-identifiable information or real clinical cases in issues, pull requests, examples, screenshots or tests.

## Ways To Contribute

- Report a bug in the web app, documentation or tooling.
- Suggest a pediatric or neonatal tool for catalog review.
- Add or correct evidence with DOI, PMID or official URLs.
- Improve Spanish/English translation and wording.
- Improve UX, accessibility, responsive design or documentation clarity.
- Review calculations against primary sources and reproducible examples.

## Clinical Evidence Rules

Clinical-content proposals should include:

- Primary source when available.
- DOI, PMID or stable official URL.
- Exact tool version or variant.
- Complete scoring table, formula, thresholds or decision criteria.
- Population and intended context.
- License and copyright considerations.
- Notes about whether the source allows reuse of data, tables or wording.

Do not submit screenshots from copyrighted tools as reusable source material. Do not copy proprietary scales, tables, manuals or protected algorithms without explicit permission and clear licensing terms.

## Implementation Gates

A clinical tool is not activated until these gates are satisfied:

- Source: traceable primary or official source.
- Formula/table: complete reusable formula, scoring table or logic.
- Variant: exact version selected and documented.
- Inputs: ranges, units and categorical values defined.
- Tests: deterministic examples and edge cases added or updated.
- Safe wording: output does not overstate certainty or replace clinical judgment.
- License: source, data and text reuse reviewed.

Tools may remain cataloged or pending validation when any gate is incomplete.

## What Not To Contribute

- Patient data.
- Identifiable clinical cases.
- Real clinical screenshots containing patient or institution data.
- Copyrighted tables, proprietary scoring sheets or manuals without permission.
- Treatment algorithms requiring licensing or formal governance.
- Toxicology content for now.
- Secrets, API keys, credentials or private configuration.

## Pull Request Checklist

Before opening a pull request, check:

- No patient-identifiable data are included.
- No clinical form values are stored, sent or logged.
- No clinical analytics behavior is added.
- Evidence sources are provided for clinical changes.
- DOI, PMID or official URL is included when possible.
- License/copyright implications are reviewed.
- Tests are added or updated when behavior changes.
- Documentation is updated when public behavior or scope changes.
- `npm run lint` passes.
- `npm run test` passes.
- `npm run build` passes.
- `npm run seo:check` passes if public routes, SEO metadata or sitemap behavior changed.

## Local Development

```bash
npm install
npm run lint
npm run test
npm run build
npm run seo:check
```

## Clinical Safety Language

Avoid language that implies PedsCore diagnoses, certifies, validates clinical care, recommends treatment or replaces professional judgment. Use clear traceability and limitation wording.
