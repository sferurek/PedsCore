# Hackathon project status

Snapshot: 2026-09-18.

Percentages are engineering-completion estimates based on explicit gates, not marketing scores.

The official rules were rechecked on 2026-09-18. For the Alexa+ primary track, a **working self-hosted MCP server using MCP 2025-11-25+ over Streamable HTTP is itself a valid submission path**. The private Alexa AI CLI/add-on workflow is therefore an optional enhancement, not a prerequisite for eligibility.

| Phase | Completion | Done | Remaining gate |
| --- | ---: | --- | --- |
| M0 — Baseline, traceability, hackathon structure | 100% | immutable baselines, branches, PRs, changelog, evidence/friction docs | none |
| M1 — PedsCore deterministic MCP foundation | 100% | agent adapter, 3 clinical tools, Streamable HTTP, MCP 2025-11-25, Railway, remote smoke, Apgar parity | none |
| M2 — Alexa+ primary-track surface | 94% | valid self-hosted MCP path, public endpoint, manifest/store package, compliance pages, live judge console, optional CLI path documented | deploy latest judge console runtime and capture final live evidence; private Alexa CLI remains optional |
| M3 — SIM IMV deterministic MCP integration | 91% | 3 MCP contracts, SIM bridge, deterministic algorithm delegation, route tests, production Next.js HTTP smoke, repeated-result parity | publish SIM bridge; set `SIM_IMV_API_URL`; public MCP→SIM smoke |
| M4 — AWS Builder Mini Challenge | 20% | Cognito/OAuth IaC and auth scaffold exist | no deployed useful AWS integration yet; do not claim mini challenge |
| M5 — Open Source Mini Challenge | 96% | public MIT repo, PR #43, reusable deterministic-agent pattern, docs/tests/evidence | final contribution snapshot and Devpost field entry |
| M6 — Demo, judging assets, Devpost submission | 78% | evidence matrix, judging quickstart, rules snapshot, Devpost draft, product-feedback draft, live judge-console code, demo script, video shot list | live judge-console capture, final video/upload, final Devpost review and submit |

## Overall estimate

Excluding the optional AWS Builder Mini Challenge, the **Alexa+ + Open Source submission path is approximately 91% technically prepared**.

Including the remaining human submission work (video recording/upload and final Devpost form confirmation), overall submission readiness is approximately **86%**.

If a public SIM endpoint is obtained, the technical path rises further because the strongest demo sequence becomes fully remote end-to-end.

## Primary-track status

The project already has the core technology required by the current Alexa+ rules:

- public self-hosted MCP server;
- Streamable HTTP;
- protocol `2025-11-25`;
- required technology used at runtime in code;
- public MIT-licensed repository;
- deterministic live clinical tool execution.

Official Alexa AI CLI access would strengthen the evidence but is not on the eligibility critical path.

## Critical path from here

1. Deploy the latest PedsCore MCP branch containing the live judge console and six-tool contract.
2. Run the external remote smoke against that deployment.
3. Publish SIM IMV if repository authorization or Vercel quota allows it.
4. If SIM becomes public, set `SIM_IMV_API_URL` and run public MCP→SIM smoke.
5. Record the final English demo video under 3 minutes.
6. Upload the video publicly and complete the final Devpost submission.

## Optional enhancement path

If Amazon grants `AddOn3PDeveloperToolsRead` entitlement:
- install/authenticate the private Alexa AI CLI;
- deploy the add-on package;
- capture Add-on ID/version and official Alexa+ simulator evidence.

This is valuable but not required for the self-hosted MCP submission route.

## Only actions that ultimately require the submitter

See `docs/hackathon-2026/manual-actions.md`.

The unavoidable human actions are final video recording/upload, final Devpost review/submit, and any third-party account authorization that requires interactive consent.
