# Alexa+ demo script — PedsCore AI

This is the preferred reproducible demo sequence. Use only stages that are actually working at recording time.

## Scene 1 — Natural-language discovery

**User:** “Find a pediatric score for assessing croup severity.”

Demonstrates that the conversational layer selects `search_clinical_tools`, while PedsCore supplies the real catalog result.

## Scene 2 — Structured inspection

**User:** “Show me the inputs needed for the Apgar score.”

Demonstrates `get_clinical_tool` and structured metadata rather than free-form invented inputs.

## Scene 3 — Deterministic calculation

**User:** “Calculate an Apgar score at five minutes. Heart rate 2, respiratory effort 2, muscle tone 2, reflex irritability 2, color 1.”

**Expected result:** Apgar **9/10**.

Demonstrates that Alexa+/the agent handles conversation, while the PedsCore calculator registry owns the arithmetic.

## Scene 4 — SIM IMV closing moment

Use this only after the remote bridge is live.

**User:** “Start the school-bus pediatric mass-casualty scenario using JumpSTART.”

Then inspect patient 01 and submit a triage category.

The key visual proof is not merely the answer. Show that the result includes the simulator's deterministic expected category, correctness, canonical rule/path, teaching objective, and source metadata.

## Suggested narration

“Alexa+ handles the conversation and chooses the right tool. PedsCore keeps clinical calculations deterministic, and SIM IMV keeps triage decisions inside the validated simulation engine. The model orchestrates; it does not invent the clinical logic.”

## Safety constraints for the recording

Do not use real patient identifiers, free-form treatment recommendations, claims that the system replaces clinical judgment, or features that are not actually implemented and demonstrable.
