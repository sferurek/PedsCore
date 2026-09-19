# PedsCore Editorial Policy

## Purpose

PedsCore is an open-source clinical reference and calculation project for pediatrics and neonatology. Its editorial policy is designed to keep catalog presence, evidence status, technical implementation, and clinical availability visibly separate.

## Source hierarchy

PedsCore prefers, in order of relevance to the task:

1. Original derivation or primary studies.
2. External validation studies.
3. Official clinical practice guidelines.
4. Consensus statements and official manuals.
5. Peer-reviewed reviews.
6. Secondary sources for orientation or source discovery only.

A secondary source does not replace a primary source when a calculation depends on an exact formula, table, threshold, definition, or version.

## Activation criteria

A tool is not activated simply because it is widely known. Before local calculation is enabled, maintainers review as applicable:

- exact version or variant;
- intended population and care setting;
- required inputs;
- formula, table, scoring rules, or decision logic;
- interpretation boundaries;
- source traceability;
- licensing and reuse conditions;
- safe output wording;
- deterministic tests.

If one or more of these remain unresolved, a page may remain reference-only, draft, or limited.

## Clinical safety

PedsCore does not diagnose, prescribe treatment, or replace clinical judgment, local protocols, institutional policy, or individual patient assessment. The presence of a tool in the catalog is not itself a recommendation to use it.

## Transparency

For each tool, PedsCore aims to expose:

- implementation status;
- evidence level;
- validation notes;
- source references;
- calculation availability;
- known exclusions or limitations where documented.

Changes to code and documentation remain visible in the public repository history.

## Corrections

Errors, missing sources, licensing concerns, and proposed updates can be reported through GitHub Issues. Changes that affect clinical logic should be traceable to a source and accompanied by tests when applicable.

## Clinical review program

Independent clinical review follows the risk-based workflow in [CLINICAL_REVIEW_PROGRAM.md](CLINICAL_REVIEW_PROGRAM.md). Technical implementation, evidence traceability and independent clinical review are separate states.

A review that changes calculation logic requires a dedicated pull request, source documentation and updated deterministic tests.

## Review claims

PedsCore does not claim independent expert review, formal guideline endorsement, or regulatory approval unless there is explicit documentation supporting that statement.

## Data handling

Clinical values entered in local forms are processed in the browser and are not intended to be stored by PedsCore. Real patient-identifiable data must not be submitted through GitHub issues, pull requests, examples, or documentation.
