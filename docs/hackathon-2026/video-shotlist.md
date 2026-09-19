# Demo video shot list

Target: concise judge-facing video. The story should be understandable even if the viewer knows nothing about PedsCore.

## 0:00–0:12 — Problem

Visual: PedsCore home / simple architecture graphic.

Narration:
“Conversational AI is useful for clinical learning, but pediatric scores and emergency algorithms should not become probabilistic. PedsCore AI lets the agent handle conversation while deterministic code keeps the clinical logic.”

## 0:12–0:30 — Architecture

Visual: the architecture diagram from the hackathon README.

Show:
`Alexa+/agent → MCP → PedsCore deterministic calculators / SIM IMV deterministic engine`.

Emphasize one phrase on screen:
**The model orchestrates. It does not calculate the score.**

## 0:30–0:55 — Discovery

Visual: conversational prompt plus MCP/tool trace if available.

Prompt:
“Find a pediatric score for assessing croup severity.”

Show `search_clinical_tools` and the PedsCore result.

## 0:55–1:20 — Deterministic calculation

Prompt:
“Calculate an Apgar score at five minutes. Heart rate 2, respiratory effort 2, muscle tone 2, reflex irritability 2, color 1.”

Show expected result:
**9/10**

Then briefly show CI/remote smoke evidence proving the same result outside the conversational UI.

## 1:20–1:55 — SIM IMV wow moment

Prompt:
“Start the school-bus pediatric mass-casualty scenario using JumpSTART.”

Show one synthetic patient, submit a triage category, then reveal:
- submitted category;
- expected category;
- correct/incorrect;
- rule ID;
- canonical path;
- teaching objective.

Narration:
“The conversational layer accepts the learner's decision. The simulator's real JumpSTART engine decides whether it is correct.”

## 1:55–2:15 — Open source and reproducibility

Visual:
- GitHub PR #91
- MIT license
- tests
- remote smoke workflow
- friction log

Narration:
“The hackathon contribution is public, MIT-licensed, reproducible, and designed as a pattern other deterministic clinical tools can reuse.”

## 2:15–2:30 — Close

Visual: PedsCore + SIM IMV side by side.

Narration:
“PedsCore AI combines natural conversation with deterministic pediatric logic: flexible at the interface, strict at the clinical boundary.”

## Capture checklist

Before recording, obtain:
- final green CI screenshots;
- public MCP health / remote smoke evidence;
- SIM remote bridge capture;
- GitHub PR #91 and merged SIM PR #25;
- no real patient data;
- no unsupported claims.
