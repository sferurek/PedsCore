# PedsCore Codex/REMODEX Implementation Plan v1

## Global Workflow

Start every session with:

```bash
git status
git pull --ff-only
```

Finish every block with:

```bash
npm install
npm run lint
npm run test
npm run build
git status
git diff --stat
git add .
git commit -m "<message>"
git push origin main
```

Do not commit if validation fails.

## Block 1 — Monorepo

Create only infrastructure:

- root package.json with workspaces;
- TypeScript;
- ESLint;
- Vitest;
- packages/core;
- apps/web with React + Vite;
- scripts: dev, lint, test, build.

Commit:

```text
Set up PedsCore monorepo infrastructure
```

## Block 2 — Core Engine

Create:

- shared types;
- input types;
- reference types;
- result types;
- warning model;
- metadata loading pattern;
- package exports.

No clinical formulas yet unless explicitly validated.

Commit:

```text
Add core engine foundation
```

## Block 3 — Web Base

Create:

- React app shell;
- router;
- ES/EN support;
- language detection;
- manual language switch;
- home;
- all-tools placeholder;
- category placeholder;
- tool placeholder;
- footer.

Commit:

```text
Implement bilingual web shell
```

## Block 4 — Dynamic Components

Create:

- DynamicForm.
- ResultPanel.
- InterpretationTable.
- ScoringTable.
- ReferenceList.
- DisclaimerBox.
- ToolMetadataPanel.
- ToolCard.
- CategoryCard.
- StatusBadge.
- GitHubFeedbackLink.

Commit:

```text
Add dynamic form and tool display components
```

## Block 5 — MVP Tools

Implement or mark pending validation:

- Apgar.
- Silverman-Andersen.
- Wood-Downes-Ferrés.
- Westley Croup Score.
- PRAM.
- Pediatric Glasgow Coma Scale.
- FLACC.
- Clinical Dehydration Scale.
- PECARN TBI <2 years.
- PECARN TBI ≥2 years.
- QTc.
- Bedside Schwartz.
- PEWS as pending_validation only.

Commit:

```text
Add MVP clinical tool metadata and calculations
```

## Block 6 — Tests

Add unit tests:

- minimum/max/intermediate scores;
- incomplete inputs;
- invalid inputs;
- QTc formula examples;
- Schwartz unit conversion;
- PECARN criteria groups.

Commit:

```text
Add core calculation tests
```

## Block 7 — GitHub Pages

Create GitHub Actions deploy workflow and Vite base path.

Commit:

```text
Configure GitHub Pages deployment
```

## Block 8 — Final Review

Check:

- each tool has disclaimer;
- references;
- interpretation table;
- scoring table;
- responsive UI;
- no toxicology;
- no backend;
- no login;
- no clinical data storage.

Commit:

```text
Finalize PedsCore phase 1 MVP
```

## First Prompt for Codex/REMODEX

```text
Trabaja en el repositorio PedsCore.

Antes de hacer cambios:
1. Ejecuta pwd.
2. Ejecuta git status.
3. Ejecuta git pull --ff-only.
4. Revisa docs/PedsCore_Functional_Spec_v1.md.
5. Revisa docs/PedsCore_Tool_Metadata_Schema_v1.md.
6. Revisa docs/PedsCore_MVP_Tools_v1.json.
7. Revisa docs/PedsCore_UI_Flow_v1.md.
8. Revisa docs/PedsCore_Codex_Implementation_Plan_v1.md.

No modifiques contenido clínico todavía.

Empieza únicamente por el Bloque 1: infraestructura técnica del monorepo.
Valida con npm install, npm run lint, npm run test y npm run build.
Haz commit y push solo si todo pasa.
```
