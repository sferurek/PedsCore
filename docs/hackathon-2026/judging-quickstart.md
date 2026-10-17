# Judging quickstart

> **Railway-free review:** [Local reproduction guide](local-demo.md). Run the real MCP judge console locally; the optional SIM tools use the existing Vercel bridge. Historical hosted URLs below are not required for local review. The demo video still needs recording/upload.

This page gives reviewers the shortest path to understand and verify the hackathon work.

## 1. Understand the safety boundary

PedsCore AI uses a conversational/agent layer for intent recognition and tool orchestration. Deterministic clinical calculations and triage classifications remain in application code.

```text
Natural language
      |
      v
MCP tool selection
      |
      +--> PedsCore calculator registry
      |
      +--> SIM IMV deterministic triage engine
```

The model does not invent score arithmetic or the canonical triage answer.

## 2. Start and verify the local MCP service

Follow [local-demo.md](local-demo.md), including the explicit `--with-sim` option for the full six-tool demo. Open http://127.0.0.1:3001/judge-demo after startup. `/capabilities`, `/mcp`, and `/health` are on the same local origin.

The console performs real MCP calls against the local service. Clinical tools run locally; SIM uses the existing Vercel synthetic-simulation bridge. No Railway account or hosted MCP endpoint is required.

## 3. Inspect the implementation

Key paths:

- `packages/core/src/mcp/clinicalToolAdapter.ts` — agent-safe clinical adapter
- `apps/mcp-server/src/app.ts` — MCP tool registration and transport
- `apps/mcp-server/src/sim-client.ts` — deterministic simulator bridge client
- `apps/mcp-server/tests/protocol.test.ts` — protocol/tool contract tests
- `apps/mcp-server/tests/sim-client.test.ts` — bridge failure/timeout coverage
- `scripts/remote-mcp-smoke.mjs` — public endpoint smoke
- `alexa-addon/addon-package/addon.json` — Alexa+ add-on manifest
- `docs/hackathon-2026/submission-evidence.md` — evidence matrix

SIM IMV implementation was merged through:
- https://github.com/sferurek/pedscore-triage-sim/pull/25

Production bridge:
- `https://pedscore-triage-sim.vercel.app/api/hackathon/sim`

## 4. Reproduce the deterministic clinical example

The canonical test case is Apgar at five minutes:

- heart rate = 2
- respiratory effort = 2
- muscle tone = 2
- reflex irritability = 2
- color = 1

Expected deterministic result: **9/10**.

This case is used across core tests, MCP protocol tests, and the remote smoke path.

## 5. Understand the SIM IMV extension

The three simulation contracts are:

- `start_simulation_case`
- `get_patient_findings`
- `submit_triage_decision`

A learner may submit a triage category conversationally, but correctness is computed by the simulator's existing JumpSTART / SALT / PTT / MITT logic.

## 6. External tooling boundary

Devpost support confirmed that the private Alexa+ Category SDK / MCP Toolkit / add-on tooling is restricted to selected Amazon partners. PedsCore therefore uses the explicitly permitted self-hosted MCP route and does not claim an official partner-only Alexa add-on deployment.

Historical integration evidence: SIM PR #25 merged and the remote MCP→SIM smoke passed. For current review, the local startup command configures the Vercel bridge explicitly; verify availability with the smoke command.

## 7. Reproduce the repository validation

From the repository root:

```bash
npm install
npm run hackathon:verify
```

To run the public MCP smoke against a base URL:

```bash
npm run hackathon:smoke:remote -- http://127.0.0.1:3001
```

The smoke validates protocol negotiation, the six tool contracts, deterministic Apgar output, judge/compliance/media surfaces, and the full public SIM path: `school-bus` → patient `01` → submitted `GREEN` → expected `GREEN` → `correct=true` → rule `JS-MOB-01`.
