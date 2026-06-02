# PedsCore Evidence Workspace

This folder tracks evidence, source traceability, scoring-table completeness, interpretation bands, and licensing/copyright risk for clinical tools that are cataloged but not yet ready for automatic calculation.

Scope for Block 6A:

- CRIES
- CHEOPS
- Visual Analogue Scale / EVA
- Thompson HIE Score
- Wood-Downes-Ferres
- Pediatric Glasgow Coma Scale
- PEWS
- PIPP / PIPP-R
- COMFORTneo
- Finnegan / Modified Finnegan

Rules:

- Do not implement calculators from this folder alone.
- Do not reconstruct scoring tables from memory.
- Do not copy long copyrighted tables, forms, images, or official diagrams.
- Mark missing evidence explicitly.
- A tool can move toward implementation only when source, version, scoring table, interpretation, licensing, and tests are clear.

Evidence status terms:

- `ready_for_implementation`: source and scoring table are sufficiently traceable; still requires implementation tests.
- `pending_validation`: source exists or partial data exists, but table/version/interpretation/licensing needs review.
- `needs_primary_reference`: primary source is missing or not sufficiently identified.
- `not_implemented_due_to_licensing`: source or instrument appears protected or license-sensitive.
- `coming_soon`: intentionally deferred due to complexity or clinical risk.
