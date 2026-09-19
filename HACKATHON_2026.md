# PedsCore — Amazon Developer Hackathon 2026

This is the public entry point for the hackathon-specific work added to the existing PedsCore project.

## Baseline

PedsCore existed before the hackathon. The immutable pre-hackathon baselines are recorded in `docs/hackathon-2026/baseline.md`.

- PedsCore baseline: `069eb6ad4626829f5d8c0bee53f4a28af163ffe4`
- SIM IMV baseline: `3d0311cd82df42c88500b6b0e931a3df3e213b59`
- PedsCore hackathon branch: `hackathon/alexa-mcp-v2`
- SIM hackathon branch: `hackathon/alexa-sim`

## What changed during the hackathon

PedsCore gained:
- an agent-safe clinical adapter;
- natural-language clinical-tool discovery;
- structured tool metadata retrieval;
- deterministic score execution;
- a Streamable HTTP MCP server;
- a public remote MCP deployment;
- Alexa+ manifest/store/compliance packaging;
- optional OAuth/Cognito protection scaffolding;
- reproducible local and remote validation;
- deterministic SIM IMV MCP contracts.

SIM IMV gained a hackathon bridge that starts synthetic scenarios, exposes learner-visible findings, accepts a learner's triage classification, and returns correctness/feedback from its existing deterministic triage engine.

## Architecture

```text
Alexa+ / agent
      |
      v
MCP Streamable HTTP
      |
      v
PedsCore agent layer
      |
      +--> clinical discovery / metadata
      |
      +--> deterministic calculator registry
      |
      +--> SIM IMV bridge
               |
               v
      deterministic triage engine
```

The model may orchestrate the interaction. It does not own the clinical formula or the canonical triage answer.

## MCP tools

Clinical:
- `search_clinical_tools`
- `get_clinical_tool`
- `calculate_clinical_score`

Simulation:
- `start_simulation_case`
- `get_patient_findings`
- `submit_triage_decision`

## Live MCP endpoint

- Judge console: https://pedscore-ai-mcp-production.up.railway.app/judge-demo
- Capability manifest: https://pedscore-ai-mcp-production.up.railway.app/capabilities
- MCP: https://pedscore-ai-mcp-production.up.railway.app/mcp
- Health: https://pedscore-ai-mcp-production.up.railway.app/health
- Privacy: https://pedscore-ai-mcp-production.up.railway.app/privacy
- Terms: https://pedscore-ai-mcp-production.up.railway.app/terms

The public MCP runtime exposes the clinical and simulation tool contracts. The production MCP service is configured against the deployed SIM IMV bridge at `https://pedscore-triage-sim.vercel.app/api/hackathon/sim`; failures remain fail-closed rather than fabricating simulation results.

## Current validation state

Verified:
- MCP `2025-11-25`;
- public HTTPS MCP;
- three clinical tools;
- deterministic Apgar 9/10 remote round trip;
- store/compliance endpoints and exact media dimensions;
- six-tool MCP contract in current PedsCore CI;
- simulator-side deterministic bridge implementation and tests;
- SIM PR #25 merged to `main`;
- production SIM commits deployed successfully by Vercel.

Pending:
- strict remote MCP→SIM end-to-end smoke.

The current official rules accept the self-hosted MCP server as an Alexa+ primary-track technology path. The Alexa add-on/private CLI path is partner-only per Devpost support. The submission uses the rules-compliant self-hosted MCP path.

## Open-source contribution

Primary public contribution:
- https://github.com/sferurek/PedsCore/pull/91

The core OSS contribution is a reusable pattern for exposing deterministic clinical software to agentic interfaces without moving safety-critical execution into the generative model.

See `docs/hackathon-2026/open-source-contribution.md`.

## Evidence and judging docs

- `docs/hackathon-2026/final-submission-packet.md` — ready-to-paste Devpost packet
- `docs/hackathon-2026/submission-evidence.md`
- `docs/hackathon-2026/judging-quickstart.md`
- `docs/hackathon-2026/devpost-draft.md`
- `docs/hackathon-2026/video-shotlist.md`
- `docs/hackathon-2026/friction-log.md`
- `alexa-addon/demo-script.md`

## Safety

PedsCore AI is for education, training, simulation, and clinical reference. It is not a substitute for direct patient assessment, emergency services, local protocols, or professional clinical judgment. Do not submit identifiable patient information.
