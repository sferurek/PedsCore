# Hackathon project status

Snapshot: 2026-09-19.

Percentages are engineering-completion estimates based on explicit gates, not marketing scores.

The official rules were rechecked on 2026-09-18. For the Alexa+ primary track, a **working self-hosted MCP server using MCP 2025-11-25+ over Streamable HTTP is itself a valid submission path**. The private Alexa AI CLI/add-on workflow is therefore an optional enhancement, not a prerequisite for eligibility.

| Phase | Completion | Done | Remaining gate |
| --- | ---: | --- | --- |
| M0 — Baseline, traceability, hackathon structure | 100% | immutable baselines, branches, PRs, changelog, evidence/friction docs | none |
| M1 — PedsCore deterministic MCP foundation | 100% | agent adapter, 3 clinical tools, Streamable HTTP, MCP 2025-11-25, Railway, remote smoke, Apgar parity | none |
| M2 — Alexa+ primary-track surface | 100% | valid self-hosted MCP path, exact Railway deployment, live judge console, capability manifest, 6 live tools, remote smoke green, manifest/store/compliance package | final video evidence; private Alexa add-on tooling is partner-only and not required |
| M3 — SIM IMV deterministic MCP integration | 93% | 3 MCP contracts live in MCP, SIM bridge, production Next.js HTTP smoke, repeated-result parity, latest SIM CI green | publish SIM bridge; set `SIM_IMV_API_URL`; public MCP→SIM smoke |
| M4 — AWS Builder Mini Challenge | 20% | Cognito/OAuth IaC and auth scaffold exist | no deployed useful AWS integration yet; do not claim mini challenge |
| M5 — Open Source Mini Challenge | 98% | public MIT repo, PR #91, reusable deterministic-agent pattern, one-command verification, judging docs/tests/evidence | final Devpost field entry |
| M6 — Demo, judging assets, Devpost submission | 78% | evidence matrix, judging quickstart, rules snapshot, Devpost draft, product-feedback draft, live judge-console code, demo script, video shot list | live judge-console capture, final video/upload, final Devpost review and submit |

## Overall estimate

Excluding the optional AWS Builder Mini Challenge, the **Alexa+ + Open Source submission path is approximately 97% technically prepared**.

Including the remaining human submission work (video recording/upload and final Devpost form confirmation), overall submission readiness is approximately **92%**.

A public SIM endpoint remains the strongest remaining technical enhancement because it enables a fully remote end-to-end MCP → SIM demonstration.

## Primary-track status

The project already has the core technology required by the current Alexa+ rules:

- public self-hosted MCP server;
- Streamable HTTP;
- protocol `2025-11-25`;
- required technology used at runtime in code;
- public MIT-licensed repository;
- deterministic live clinical tool execution.

Official Alexa AI CLI/add-on tooling is partner-only according to Devpost support and is not on the eligibility path for this submission.

## Critical path from here

1. Publish SIM IMV if repository authorization or Vercel quota allows it.
2. If SIM becomes public, set `SIM_IMV_API_URL` and run public MCP→SIM smoke.
3. Freeze the reconciled hackathon candidate on top of current `main` and keep CI green.
4. Record/upload the final English demo video and complete the final Devpost submission.

## Optional enhancement path

Devpost support confirmed on 18 September 2026 that Category SDK and MCP Toolkit / Alexa+ add-on developer tools are available only to selected Amazon partners and that there is currently no application path for general participants. Do not treat `AddOn3PDeveloperToolsRead` as an actionable blocker. The submission therefore uses the rules-compliant self-hosted MCP route.

## Only actions that ultimately require the submitter

See `docs/hackathon-2026/manual-actions.md`.

The unavoidable human actions are final video recording/upload, final Devpost review/submit, and any third-party account authorization that requires interactive consent.
