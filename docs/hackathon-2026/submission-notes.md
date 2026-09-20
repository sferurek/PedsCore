# Devpost submission notes

Working notes for the final Amazon Developer Hackathon 2026 submission.

## Submission identity

- Project: **PedsCore AI — Pediatric Clinical Learning with Alexa+**
- Submitter type: Individual
- Country: Spain
- Primary track: Alexa+
- Existing project: Yes, significantly updated during the submission period
- Open Source Mini Challenge: **Yes**
- AWS Builder Mini Challenge: **No in the current candidate** — reopen only with documented Kiro Crew use or a useful deployed AWS integration.
- GitHub username: `sferurek`

## Core submission story

PedsCore existed before the hackathon as an open-source pediatric clinical-tool platform. During the hackathon it gained a new agent-access architecture that exposes deterministic clinical logic over MCP without moving safety-critical calculations into the language model.

The strongest demo arc is:

1. natural-language clinical-tool discovery;
2. structured inspection of a tool and its required inputs;
3. deterministic calculation with a reproducible result;
4. pediatric mass-casualty simulation where the conversational layer accepts a learner decision but the real SIM IMV algorithm determines correctness and feedback.

## Current technical proof

- public MCP endpoint over Streamable HTTP;
- MCP protocol `2025-11-25`;
- public remote smoke tests;
- deterministic Apgar 9/10 round trip;
- Alexa+ manifest and store package;
- public privacy/terms/media endpoints;
- three clinical MCP tools;
- three SIM IMV MCP tool contracts;
- simulator-side deterministic bridge merged from SIM PR #25 and deployed on Vercel;
- public MIT-licensed OSS contribution on PedsCore PR #105.

## Eligibility and external blockers

The official Alexa+ rules were rechecked on 2026-09-18. A working self-hosted MCP server using MCP 2025-11-25+ over Streamable HTTP is a valid primary-track submission path. Therefore the private Alexa AI CLI / official add-on deployment is an optional enhancement rather than an eligibility blocker.

Devpost support confirmed that the private Alexa+ Category SDK / MCP Toolkit / add-on tooling is restricted to selected Amazon partners and is not available to general hackathon participants. The `AccessDenied` encountered during setup is therefore not treated as an IAM defect or submission blocker. The rules-compliant self-hosted MCP path is the canonical Alexa+ implementation.

SIM PR #25 has been merged into the simulator `main` branch and the resulting production commits have successful Vercel deployment status. The MCP production service is configured to call `https://pedscore-triage-sim.vercel.app/api/hackathon/sim`.

## Final submission assets still required

- demo video under the allowed duration;
- final screenshots / image gallery;
- final human review/paste of the prepared friction-log entries;
- project testing link: `https://pedscore-ai-mcp-production.up.railway.app/judge-demo` after final live verification;
- final feature-request / developer-feedback answers.

## Rule for final write-up

Do not claim official Alexa simulator behavior or deployed AWS services unless they are actually demonstrated. The self-hosted MCP and public MCP→SIM paths are already verified.

## Reconciliation status · 2026-09-19

The final hackathon workstream was rebuilt cleanly from current PedsCore `main` as PR #105. RC3 is frozen at `fa26c90b1bbf12b422b0cf2990e0c6743f4acb0b`; CI run `35479718827` and remote MCP smoke run `35479718824` are green. RC3 preserves current clinical catalog, governance, SEO and accessibility work while adding the MCP/Alexa+ submission layer.
