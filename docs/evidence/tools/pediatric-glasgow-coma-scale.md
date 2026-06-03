# Pediatric Glasgow Coma Scale

## Current PedsCore status

- id: `pediatric_gcs`
- slug: `pediatric-glasgow-coma-scale`
- category: `neurology`
- type: `scale`
- current implementationStatus: `pending_validation`
- current evidenceLevel: `official_manual_or_institutional_protocol`

## Evidence validation status

- final evidence status: `pending_primary_source`
- reason: guideline/source trail exists, but primary pediatric adaptation and complete verbal table by age/development remain unresolved.

## Clinical purpose

ES: valoración descriptiva del nivel de conciencia pediátrico. EN: descriptive pediatric level-of-consciousness assessment.

## Target population

Children, especially preverbal/young children requiring adapted verbal assessment.

## Version / variant

- exact version: not selected.
- known variants: adult GCS, pediatric GCS, infant/young child modifications.
- selected version for PedsCore: none yet.
- variant risk: high.

## Primary source

- found: no.
- citation: guideline/source trail only; primary pediatric adaptation not confirmed.
- DOI: not confirmed.
- PMID: not confirmed.
- URL: https://www.ncbi.nlm.nih.gov/books/
- access: `open_access`
- notes: NCBI Bookshelf/NICE-style table source is useful but not enough for primary traceability.

## External validation

Validation/performance studies exist, but do not establish a single definitive item table for PedsCore.

## Guidelines / official sources

NCBI Bookshelf guideline material contains a pediatric version reference trail.

## Complete scoring table availability

- complete table found: no.
- source: guideline tables exist, but exact source/reuse and age-specific verbal criteria need confirmation.
- copyright/licensing risk: unknown/medium.
- notes: verbal response is the blocker.

## Variables and scoring

| variable | option | score/value | source | notes |
|---|---|---|---|---|
| Eye response | Pending | Pending | Guideline/source needed | Adult/pediatric differences must be verified. |
| Verbal response | Pending by age/development | Pending | Primary adaptation needed | Main blocker. |
| Motor response | Pending | Pending | Guideline/source needed | Exact wording pending. |

## Interpretation bands / cutoffs

| range/value | category | interpretation | source |
|---|---|---|---|
| 3-15 | Total score range | General GCS range only; severity bands pending pediatric source. | Source needed. |

## Formula / algorithm

Sum of eye, verbal, motor components; pediatric verbal component not finalized.

## Unit handling

Age/developmental status must determine verbal criteria.

## Safety and regulatory notes

- risk level: medium.
- why: neurologic scoring may influence trauma/ICU workflows.
- should provide recommendations: no.
- forbidden outputs: CT, intubation, ICU, discharge, or treatment recommendations.

## Licensing / copyright

- appears implementable: unknown.
- license-sensitive: unknown.
- requires permission: unknown.
- unknown: exact table source/reuse.
- notes: keep pending.

## Implementation recommendation

`keep_pending_until_source_found`

## Proposed test cases

- minimum: 3.
- maximum: 15.
- intermediate: preverbal child example.
- missing input: missing age/development.
- invalid input: adult verbal option in infant.
- edge cases: intubated/nonverbal baseline.
- forbidden wording tests: no imaging/treatment advice.

## Direct links

- https://www.ncbi.nlm.nih.gov/books/

## Notes

Pediatric verbal scoring needs exact source resolution.
