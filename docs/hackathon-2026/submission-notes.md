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
- simulator-side deterministic bridge on SIM PR #25;
- public MIT-licensed OSS contribution on PedsCore PR #43.

## External blockers that must be stated accurately

Alexa AI CLI access is currently blocked by Amazon-side entitlement to the private developer-tools role. The local AWS source profile authenticates successfully; AssumeRole into Amazon's documented private role returns `AccessDenied`. This has been escalated through the hackathon support path and recorded in the friction log.

SIM remote deployment is currently blocked because the Railway GitHub App does not have access to the private SIM repository. Code and CI can continue independently.

## Final submission assets still required

- demo video under the allowed duration;
- final screenshots / image gallery;
- Alexa add-on ID/version if private CLI entitlement is granted;
- final remote MCP→SIM smoke output once the SIM bridge is deployed;
- final friction log review;
- project testing link;
- final feature-request / developer-feedback answers.

## Rule for final write-up

Do not claim Alexa simulator behavior, deployed AWS services, end-to-end SIM remote execution, or other features until they are demonstrable in code or a live/test environment.
