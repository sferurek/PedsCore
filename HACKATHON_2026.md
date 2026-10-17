# PedsCore — Amazon Developer Hackathon 2026

> **Railway-free review:** [Local reproduction guide](docs/hackathon-2026/local-demo.md). Run the real MCP judge console locally; the optional SIM tools use the existing Vercel bridge. Historical hosted URLs below are not required for local review. The demo video still needs recording/upload.

This is the public entry point for the hackathon-specific work added to the existing PedsCore project.

## Baseline

PedsCore existed before the hackathon. The immutable pre-hackathon baselines are recorded in `docs/hackathon-2026/baseline.md`.

- PedsCore baseline: `069eb6ad4626829f5d8c0bee53f4a28af163ffe4`
- SIM IMV baseline: `3d0311cd82df42c88500b6b0e931a3df3e213b59`
- PedsCore hackathon branch: `hackathon/alexa-mcp-v3`
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

## Reproduce locally (primary judging path)

Follow the [local reproduction guide](docs/hackathon-2026/local-demo.md). After `npm ci`, run `npm run hackathon:local -- --with-sim` and open http://127.0.0.1:3001/judge-demo. The same local service exposes `/capabilities`, `/mcp`, `/health`, `/privacy`, and `/terms`.

Clinical tools execute locally. SIM calls use the existing Vercel bridge; failures remain fail-closed. No Railway service is required. Publish the guide and a demo video as the submission's review materials.

## Historical hosted evidence

The original Railway deployment was `https://pedscore-ai-mcp-production.up.railway.app`. Historical remote checks below document the implementation at that time, not a promise of continued hosting. Use the local guide for review.

## Historical validation state

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

Verified end-to-end:
- strict public MCP→SIM remote smoke passed in GitHub Actions run `35462460140`;
- `school-bus` / JumpSTART / patient `01` → expected `GREEN`, `correct=true`, rule `JS-MOB-01`.

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
