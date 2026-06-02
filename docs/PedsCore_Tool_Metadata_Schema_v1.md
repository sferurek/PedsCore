# PedsCore Tool Metadata Schema v1

## Purpose

Define the normalized JSON schema for all PedsCore tools so Codex/REMODEX can implement the web and core engine without improvising.

## Tool Object

```json
{
  "id": "silverman_andersen",
  "slug": "silverman-andersen",
  "shortName": "Silverman-Andersen",
  "name": {
    "es": "Score de Silverman-Andersen",
    "en": "Silverman-Andersen Score"
  },
  "type": "score",
  "category": "neonatology",
  "subcategory": "respiratory_distress",
  "population": {
    "es": "Recién nacidos con dificultad respiratoria",
    "en": "Newborns with respiratory distress"
  },
  "description": {
    "es": "Escala clínica para valorar dificultad respiratoria neonatal.",
    "en": "Clinical score for assessing neonatal respiratory distress."
  },
  "implementationStatus": "pending_validation",
  "regulatoryRisk": "medium",
  "disclaimerRequired": true,
  "inputs": [],
  "calculation": {},
  "interpretationBands": [],
  "scoringTable": [],
  "references": [],
  "copyrightNotes": {},
  "testCases": []
}
```

## Enumerations

Tool types:

```text
score
scale
calculator
rule
algorithm
nomogram
percentile
```

Implementation status:

```text
implemented
ready_for_validation
pending_validation
coming_soon
not_implemented
```

Regulatory risk:

```text
low
medium
high
```

Input types:

```text
single_choice
boolean
number
select
multi_select
calculated_display
```

Evidence levels:

```text
original_publication
external_validation
clinical_guideline
systematic_review
expert_consensus
secondary_source
pending_verification
```

## Input Object

```json
{
  "id": "heart_rate",
  "type": "single_choice",
  "required": true,
  "label": {
    "es": "Frecuencia cardiaca",
    "en": "Heart rate"
  },
  "unit": null,
  "options": [
    {
      "id": "absent",
      "score": 0,
      "label": {
        "es": "Ausente",
        "en": "Absent"
      }
    }
  ],
  "validation": null
}
```

## Numeric Validation

```json
{
  "min": 0,
  "max": 300,
  "integer": false,
  "reasonableMin": 20,
  "reasonableMax": 250,
  "warningBelowReasonable": true,
  "warningAboveReasonable": true
}
```

## Calculation Object

Scores:

```json
{
  "method": "sum",
  "inputIds": ["heart_rate"],
  "minScore": 0,
  "maxScore": 10
}
```

Calculators:

```json
{
  "method": "formula",
  "formulaId": "qtc_multi_formula",
  "outputs": [
    {
      "id": "qtc_bazett",
      "unit": "ms"
    }
  ]
}
```

Rules:

```json
{
  "method": "rule_logic",
  "logicId": "pecarn_tbi_under_2"
}
```

## Interpretation Band

```json
{
  "id": "moderate",
  "min": 4,
  "max": 6,
  "label": {
    "es": "Moderado",
    "en": "Moderate"
  },
  "description": {
    "es": "Categoría según tabla publicada.",
    "en": "Category according to the published table."
  },
  "sourceReferenceIds": ["ref_original"]
}
```

## Scoring Table Row

```json
{
  "variableId": "nasal_flaring",
  "variableLabel": {
    "es": "Aleteo nasal",
    "en": "Nasal flaring"
  },
  "columns": [
    {
      "score": 0,
      "label": {
        "es": "Ausente",
        "en": "Absent"
      }
    }
  ]
}
```

## Reference Object

```json
{
  "id": "apgar_1953_original",
  "evidenceLevel": "original_publication",
  "authors": "Apgar V.",
  "title": "A proposal for a new method of evaluation of the newborn infant.",
  "year": 1953,
  "journalOrPublisher": "Current Researches in Anesthesia & Analgesia",
  "doi": null,
  "pmid": "13083014",
  "url": "https://pubmed.ncbi.nlm.nih.gov/13083014/",
  "notes": {
    "es": "Publicación original.",
    "en": "Original publication."
  }
}
```

## Test Case

```json
{
  "id": "minimum_score",
  "input": {},
  "expected": {
    "score": 0,
    "maxScore": 10
  }
}
```

## Required Fields

Every MVP tool must include id, slug, name, type, category, population, status, regulatory risk, disclaimer flag, inputs, calculation, interpretation bands, scoring table, references and tests.

If formula, variant or cut-offs are not fully verified, use `pending_validation`.
