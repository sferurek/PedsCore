# Judging criteria evidence map

Verified against the current Devpost judging criteria on 2026-09-18.

## Tech Implementation

**Claim:** PedsCore AI uses the Alexa+ track's accepted self-hosted MCP path at runtime.

Evidence:
- public Streamable HTTP MCP endpoint: `/mcp`
- protocol negotiation: MCP `2025-11-25`
- six registered MCP tool contracts
- deterministic clinical calculations delegated to `@peds-core/core`
- deterministic SIM decisions delegated to the existing SIM IMV triage engine
- protocol integration tests
- public remote MCP smoke
- production Next.js HTTP smoke for the SIM bridge
- capability manifest: `/capabilities`

Strongest proof:
- deterministic Apgar 9/10 parity
- SIM patient 01: JumpSTART GREEN, rule `JS-MOB-01`, repeated category/rule/path parity

## Design

**Claim:** The interaction model separates flexible conversation from strict domain execution.

Evidence:
- tool discovery → tool detail → deterministic execution flow
- judge console demonstrates the same progression
- explicit safety/error states
- SIM tools fail closed rather than fabricating a result when the backend is unavailable
- no account linking required for the current read-only, user-agnostic experience
- browser judge surface is responsive and requires no local setup

Design principle:
> The model orchestrates. PedsCore and SIM IMV own the clinical logic.

## Potential Impact

**Claim:** The architecture targets a real pediatric education and clinical-reference need beyond a hackathon demo.

Evidence:
- PedsCore is an existing open-source pediatric/neonatal clinical-tool platform
- hackathon work adds a reusable agent-access layer without replacing existing deterministic logic
- SIM IMV adds pediatric mass-casualty training with multiple established triage systems
- public MIT license supports reuse
- evidence metadata and traceability are preserved through the agent boundary

## Quality of the Idea

**Claim:** This is not a single-turn Q&A bot or a thin API wrapper.

The agent-facing interface orchestrates across:
- clinical-tool discovery;
- structured metadata;
- deterministic score execution;
- synthetic scenario selection;
- patient finding retrieval;
- learner triage submission;
- deterministic algorithmic debriefing.

The creative element is the execution boundary: conversational flexibility without probabilistic ownership of safety-sensitive calculations or canonical triage answers.

## Open Source Mini Challenge

Evidence:
- public MIT repository
- immutable pre-hackathon baseline
- dedicated hackathon branch
- public PR #91
- reusable MCP/domain-boundary pattern
- tests, remote smoke scripts, judging docs, and friction log

## Friction bonus

The structured friction log records:
- attempted task;
- steps;
- expected vs actual behavior;
- severity;
- workaround;
- actionable product suggestion;
- affected tool;
- evidence.

This should be submitted because Devpost states friction logs can add up to a 10% judging bonus.
