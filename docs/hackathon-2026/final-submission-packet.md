# Final submission packet

Prepared for direct transfer into the Amazon Developer Hackathon Devpost form. Re-check only fields that depend on the final video or optional integrations.

## Identity

- Project name: **PedsCore AI — Pediatric Clinical Learning with Alexa+**
- Submitter type: **Individual**
- Organization: **N/A**
- Country: **Spain**
- Canadian province: **N/A**
- Primary track: **Alexa+**
- Existing project before August 31, 2026: **Yes — significantly updated during the submission period**
- Open Source Mini Challenge: **Yes**
- AWS Builder Mini Challenge: **No unless a useful AWS integration is actually deployed before submission**
- GitHub username: **sferurek**
- Repository: https://github.com/sferurek/PedsCore
- Open Source contribution: https://github.com/sferurek/PedsCore/pull/91
- Testing link: https://pedscore-ai-mcp-production.up.railway.app/judge-demo
- Capability manifest: https://pedscore-ai-mcp-production.up.railway.app/capabilities
- MCP endpoint: https://pedscore-ai-mcp-production.up.railway.app/mcp

## Short description

PedsCore AI makes deterministic pediatric clinical tools and mass-casualty simulation accessible through a conversational MCP interface while keeping safety-critical calculations and canonical triage decisions outside the language model.

## Project description

PedsCore AI is an open-source pediatric clinical learning project built around a simple boundary: conversational AI may understand intent and orchestrate tools, but validated clinical logic remains deterministic.

The project exposes the existing PedsCore clinical catalog and calculator registry through a self-hosted MCP server using Streamable HTTP and MCP 2025-11-25. A client can discover relevant pediatric tools from natural language, inspect structured inputs and evidence metadata, and execute supported clinical scores through the same deterministic code used by the PedsCore application.

During the hackathon, the architecture was extended to SIM IMV, a pediatric mass-casualty triage simulator. The MCP layer can start a synthetic scenario, retrieve learner-visible findings, and accept a learner's triage category. The language model does not decide whether the answer is correct: the simulator's existing JumpSTART, SALT, PTT, or MITT engine returns the canonical category, rule/path, and teaching feedback.

The public judge console performs real MCP calls against the deployed service and exposes raw traces for verification.

## Significant updates made during the hackathon

PedsCore existed before the submission period. The hackathon-specific work added:

- a new agent-safe adapter over the clinical catalog and calculator registry;
- a self-hosted Streamable HTTP MCP server;
- MCP 2025-11-25 negotiation;
- clinical discovery, metadata, and deterministic calculation tools;
- public Railway deployment and independent remote smoke testing;
- Alexa+ manifest, store assets, privacy/terms pages, and validation tooling;
- a live judge console and machine-readable capability manifest;
- optional OAuth/Cognito protection scaffolding;
- deterministic SIM IMV tool contracts and simulator bridge;
- production-server SIM smoke tests;
- reproducible one-command verification;
- a structured friction log, judging evidence matrix, and open-source documentation.

Pre-hackathon baseline SHAs and dedicated hackathon branches are recorded in the repository.

## How it works

```text
Conversation / agent
        |
        v
MCP Streamable HTTP
        |
        v
PedsCore agent-safe tools
        |
        +--> deterministic clinical calculator registry
        |
        +--> SIM IMV bridge
                 |
                 v
        deterministic triage engine
```

The model orchestrates. PedsCore and SIM IMV own the clinical logic.

## Technical evidence

- Public self-hosted MCP server: verified.
- MCP protocol 2025-11-25: verified.
- Streamable HTTP: verified.
- Six tool contracts: verified live.
- Deterministic Apgar 9/10: verified live.
- Judge console: verified live.
- Capability manifest: verified live.
- External smoke run 35334436459 attempt 2: passed.
- Railway MCP production endpoint: successful and remotely verified.
- SIM production HTTP smoke: passed in CI.
- Public MCP→SIM end-to-end smoke: passed in GitHub Actions run `35462460140`.
- SIM school-bus / JumpSTART / patient 01: expected GREEN, `correct=true`, rule `JS-MOB-01`, canonical path returned.

## Open Source Mini Challenge

### Contribution URL

https://github.com/sferurek/PedsCore/pull/91

### Repository URL

https://github.com/sferurek/PedsCore

### GitHub username

sferurek

### What changed, how it works, and why it matters

The contribution adds a reusable pattern for exposing deterministic clinical software to agentic interfaces. Natural-language orchestration happens through explicit MCP tools, while validated formulas and simulation algorithms remain in ordinary testable application code.

This matters because clinical and educational software often contains formulas, rules, references, and safety constraints that should not be silently reconstructed probabilistically by a language model. The contribution includes protocol tests, deterministic parity tests, remote smoke tests, documentation, optional authentication scaffolding, and the SIM IMV integration boundary.

The repository is public and MIT licensed.

## Product feedback

Use the prepared text in:

`docs/hackathon-2026/product-feedback-draft.md`

## Feature requests

Use the prepared text in:

`docs/hackathon-2026/feature-requests-draft.md`

## Friction log

Use the entries in:

`docs/hackathon-2026/friction-log.md`

Include them because the rules state that friction logs can receive up to a 10% judging bonus.

## Demo video

Pending human recording/upload.

Prepared assets:
- `docs/hackathon-2026/final-video-script.md`
- `docs/hackathon-2026/video-shotlist.md`
- live judge console: https://pedscore-ai-mcp-production.up.railway.app/judge-demo

Requirements:
- English;
- public YouTube or Vimeo;
- under 3 minutes.

## Optional Alexa AI CLI evidence

Do not make this a submission dependency. The self-hosted MCP route is already a valid Alexa+ primary-track path.

Do not claim official Alexa AI CLI/add-on deployment. Devpost support confirmed that these tools are restricted to selected Amazon partners. Use the verified self-hosted MCP evidence.

## SIM public endpoint

SIM PR #25 is merged into the simulator main branch. The production SIM deployment is live on Vercel and the PedsCore MCP service is configured with:

`https://pedscore-triage-sim.vercel.app/api/hackathon/sim`

The strict public MCP → SIM end-to-end smoke passed in GitHub Actions run `35462460140`, completing the public technical path.
