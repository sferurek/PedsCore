# PedsCore Functional Spec v1

## Objective

Define the Phase 1 MVP for PedsCore before implementation. PedsCore is an open-source pediatric and neonatal clinical tools project: scores, scales, calculators, algorithms, percentiles and clinical rules. Toxicology is excluded from this phase.

The web must be a static, bilingual, mobile-first reference for healthcare professionals. It must not store clinical data, must not require login, and must not give direct therapeutic orders.

## Included in Phase 1

- Home page.
- Search.
- Category pages.
- All-tools page.
- Individual page per tool.
- Dynamic forms.
- Result panel.
- Complete interpretation table.
- Complete variable/scoring table.
- Direct references with links.
- Mandatory disclaimer on every tool page.
- Spanish/English language selector.
- GitHub feedback link.

## Excluded from Phase 1

- Toxicology.
- Drug databases.
- Backend.
- Login.
- Patient data storage.
- Analytics.
- Image/ECG recognition.
- Direct therapeutic recommendations.

## Home

Routes:

```text
/
 /es
 /en
```

Root behavior:

1. Read `localStorage.preferredLanguage`.
2. If absent, detect browser language.
3. Spanish browser → `/es`.
4. Otherwise → `/en`.

Spanish hero:

```text
PedsCore
Herramientas clínicas pediátricas y neonatales open source.
Scores, escalas, calculadoras y reglas clínicas transparentes, trazables y basadas en fuentes.
```

English hero:

```text
PedsCore
Open-source pediatric and neonatal clinical tools.
Transparent, traceable and evidence-linked scores, scales, calculators and clinical rules.
```

Home blocks:

1. Hero.
2. Main search.
3. Category cards.
4. Featured MVP tools.
5. Transparency block: no login, no clinical data storage, open source, visible references.
6. Contribution block.
7. Footer.

## Search

Search must match:

- Spanish name.
- English name.
- acronym.
- slug.
- category.
- subcategory.
- synonyms.
- population.
- type.

Search must be client-side in Phase 1.

## Categories

Initial categories:

```text
neonatology
respiratory
emergency
cardiology
nephrology
pain
neurology
growth_nutrition
intensive_care
resuscitation_algorithms
```

Category pages must show title, description, subcategories, tool cards and implementation status.

## Individual Tool Page

Routes:

```text
/es/tools/{slug}
/en/tools/{slug}
```

Each page must include:

1. Title.
2. Acronym.
3. Metadata panel: category, subcategory, type, population, implementation status, regulatory risk, version.
4. Mandatory disclaimer.
5. Dynamic form.
6. Result panel.
7. Full interpretation table.
8. Full variable/scoring table.
9. Direct references.
10. Implementation notes.
11. GitHub issue link.

## Mandatory Disclaimer

Spanish:

```text
Aviso: PedsCore es una fuente de consulta educativa e informativa para profesionales sanitarios. No sustituye el juicio clínico, los protocolos locales ni la valoración individual del paciente. No debe utilizarse como única base para tomar decisiones clínicas.
```

English:

```text
Disclaimer: PedsCore is an educational and informational reference for healthcare professionals. It does not replace clinical judgment, local protocols or individual patient assessment. It must not be used as the sole basis for clinical decision-making.
```

## Dynamic Forms

Supported input types:

```text
single_choice
boolean
number
select
multi_select
calculated_display
```

Score forms must use large radio controls. Calculators must show units and validation. Rules must use yes/no controls and avoid direct treatment advice.

## Result Panel

Must show:

- score/value;
- unit;
- maximum score if applicable;
- category label;
- short bibliographic interpretation;
- warnings;
- formula if applicable.

Forbidden result wording:

```text
You must admit...
Perform CT...
Administer...
```

Allowed wording:

```text
According to the published scoring table, this result falls within...
```

## Interpretation Table

Every tool must show the full interpretation table even before calculation.

Columns:

```text
Score/value | Category | Bibliographic interpretation | Source
```

If universal cut-offs are not verified, state that explicitly and mark the tool as pending validation.

## Variable/Scoring Table

Scores:

```text
Variable | 0 points | 1 point | 2 points | Source
```

Calculators:

```text
Input | Unit | Valid range | Notes | Source
```

Rules:

```text
Criterion | Meaning | Rule group | Source
```

## References

Each tool must show references ordered by:

1. Original publication.
2. External validation.
3. Official guideline.
4. Systematic review.
5. Expert consensus.
6. Secondary source.

Fields: authors, title, year, journal/publisher, DOI, PMID, URL, evidence level, notes.

## GitHub Feedback

Use:

```text
https://github.com/sferurek/PedsCore/issues/new/choose
```

## Acceptance Criteria

Phase 1 is acceptable when:

1. ES/EN home exists.
2. Language detection and manual selector exist.
3. Search works.
4. Category pages exist.
5. Tool pages exist.
6. Each tool page has disclaimer, form, result, interpretation table, variable table, references and GitHub feedback.
7. No toxicology is included.
8. No login, clinical backend or clinical data storage exists.
9. No direct therapeutic instructions are generated.
10. Core calculation logic is separated from UI.
