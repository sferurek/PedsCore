# Devpost submission notes

Working notes for the final Amazon Developer Hackathon 2026 submission.

## Submission identity

- Project: **PedsCore AI — Pediatric Clinical Learning with Alexa+**
- Submitter type: Individual
- Country: Spain
- Primary track: Alexa+
- Existing project: Yes, significantly updated during the submission period
- Open Source Mini Challenge: **Yes**
- AWS Builder Mini Challenge: **Only claim if a useful AWS service is actually deployed and documented before submission**
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
- public MIT-licensed OSS contribution on PedsCore PR #91.

## Eligibility and external blockers

The official Alexa+ rules were rechecked on 2026-09-18. A working self-hosted MCP server using MCP 2025-11-25+ over Streamable HTTP is a valid primary-track submission path. Therefore the private Alexa AI CLI / official add-on deployment is an optional enhancement rather than an eligibility blocker.

Devpost support confirmed that the private Alexa+ Category SDK / MCP Toolkit / add-on tooling is restricted to selected Amazon partners and is not available to general hackathon participants. The `AccessDenied` encountered during setup is therefore not treated as an IAM defect or submission blocker. The rules-compliant self-hosted MCP path is the canonical Alexa+ implementation.

SIM PR #25 has been merged into the simulator `main` branch and the resulting production commits have successful Vercel deployment status. The MCP production service is configured to call `https://pedscore-triage-sim.vercel.app/api/hackathon/sim`.

## Final submission assets still required

- demo video under the allowed duration;
- final screenshots / image gallery;
- final strict remote MCP→SIM smoke output;
- final friction log review;
- project testing link: `https://pedscore-ai-mcp-production.up.railway.app/judge-demo` after final live verification;
- final feature-request / developer-feedback answers.

## Rule for final write-up

Do not claim Alexa simulator behavior, deployed AWS services, end-to-end SIM remote execution, or other features until they are demonstrable in code or a live/test environment.

## Reconciliation status · 2026-09-19

The final hackathon workstream was rebuilt from the then-current PedsCore `main` and opened as PR #91, avoiding the historical divergence of the original hackathon branch. This PR preserves current clinical catalog, governance, SEO and accessibility work while adding the MCP/Alexa+ submission layer.
