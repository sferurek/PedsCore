# Hackathon changelog

Use this file to record user-visible and technically significant work created during the Amazon Developer Hackathon 2026 submission period.

## Format

### YYYY-MM-DD — Change title
- Repository / PR / commit:
- What changed:
- Why it matters:
- Demo value:
- Open-source value:
- AWS / Alexa+ relevance:

---

## 2026-09-18 — Hackathon workstream initialized
- Created dedicated hackathon branches for PedsCore and the triage simulator.
- Captured immutable baseline commit SHAs for both repositories.
- Added architecture, changelog, friction-log, and submission-note scaffolding.

## 2026-09-18 — M1 agent adapter foundation
- Repository / branch: `sferurek/PedsCore` / `hackathon/alexa-mcp`
- Added an agent-safe adapter over the existing PedsCore catalog and deterministic calculator registry.
- Added natural-language-oriented clinical tool discovery, structured tool detail retrieval, and deterministic calculation execution.
- Added tests covering Apgar discovery, structured input exposure, and score parity with the existing calculator logic.
- No generative model performs the clinical calculation; the adapter delegates to the existing deterministic PedsCore calculator registry.
- This is the protocol-independent foundation for the first MCP tools: `search_clinical_tools`, `get_clinical_tool`, and `calculate_clinical_score`.
