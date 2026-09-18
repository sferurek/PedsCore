# PedsCore — Amazon Developer Hackathon 2026

This document is the public entry point for the hackathon-specific work added to the existing PedsCore project during the Amazon Developer Hackathon 2026 submission period.

## Existing project baseline

PedsCore existed before the hackathon. The hackathon workstream starts from the immutable baseline recorded in:

- `docs/hackathon-2026/baseline.md`
- PedsCore baseline commit: `069eb6ad4626829f5d8c0bee53f4a28af163ffe4`
- SIM IMV baseline commit: `3d0311cd82df42c88500b6b0e931a3df3e213b59`

Hackathon-specific development is isolated on:

- PedsCore: `hackathon/alexa-mcp`
- SIM IMV: `hackathon/alexa-sim`

## What was added for the hackathon

The new work turns PedsCore from a web-only clinical learning platform into an agent-accessible system while preserving deterministic clinical computation.

Implemented additions include:

- an agent-safe adapter over the PedsCore catalog and calculator registry
- natural-language-oriented clinical tool discovery
- structured clinical-tool metadata retrieval
- deterministic score execution through existing PedsCore logic
- a dedicated MCP server using Streamable HTTP
- public remote deployment on Railway
- protocol negotiation for MCP `2025-11-25`
- external live smoke tests
- Alexa+ add-on manifest and store-listing package
- hosted compliance pages and required media assets
- optional Cognito/OAuth protection path
- AWS Cognito infrastructure-as-code
- a structured hackathon friction log
- reproducible Alexa+ simulator test and demo scripts

## Architecture

```text
Alexa+ / agent
      |
      v
MCP Streamable HTTP
      |
      v
PedsCore agent adapter
      |
      +--> clinical catalog / discovery metadata
      |
      +--> deterministic calculator registry
      |
      +--> planned SIM IMV integration
```

The conversational layer may decide which tool to call and how to guide the interaction. It does not own the clinical formula. Supported calculations are executed by deterministic, testable PedsCore code.

## Live MCP endpoint

- MCP: `https://pedscore-ai-mcp-production.up.railway.app/mcp`
- Health: `https://pedscore-ai-mcp-production.up.railway.app/health`
- Privacy: `https://pedscore-ai-mcp-production.up.railway.app/privacy`
- Terms: `https://pedscore-ai-mcp-production.up.railway.app/terms`

## Initial MCP tools

- `search_clinical_tools`
- `get_clinical_tool`
- `calculate_clinical_score`

## Validation

The workstream is covered by:

- normal repository CI
- protocol-level local MCP integration tests
- remote public-endpoint smoke tests
- Alexa+ manifest validation
- exact hosted PNG-dimension checks
- deterministic calculator parity checks

A representative external validation confirmed:

- MCP initialize negotiated `2025-11-25`
- all three initial tools were listed remotely
- natural-language discovery returned the Apgar tool
- deterministic remote calculation returned Apgar `9/10`
- live store/compliance endpoints were reachable
- six required light icon sizes and the 600x900 carousel asset matched their declared dimensions

## Open-source contribution

The hackathon contribution is developed publicly in draft pull request:

- PR #43 — `Hackathon: bootstrap Alexa+ / MCP clinical adapter`

The contribution adds a reusable pattern for exposing deterministic clinical software safely to agentic interfaces: agent-safe schemas, discovery metadata, deterministic execution boundaries, protocol tests, remote smoke tests, and integration documentation.

See:

- `docs/hackathon-2026/open-source-contribution.md`

## Hackathon evidence

- `docs/hackathon-2026/changelog.md`
- `docs/hackathon-2026/friction-log.md`
- `docs/hackathon-2026/alexa-readiness.md`
- `docs/hackathon-2026/alexa-simulator-test-plan.md`
- `alexa-addon/demo-script.md`

## Open-source status

PedsCore is public and licensed under the MIT License. GitHub currently detects the repository license as MIT, and the license is linked near the top of the main README.

## Safety

PedsCore AI is intended for education, training, simulation, and clinical reference. It is not a substitute for direct patient assessment, local protocols, emergency services, or professional clinical judgment. Users should not submit identifiable patient information.
