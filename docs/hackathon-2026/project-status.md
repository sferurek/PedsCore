# Hackathon project status

Snapshot: 2026-09-18.

Percentages are engineering-completion estimates based on explicit gates, not marketing scores.

| Phase | Completion | Done | Remaining gate |
| --- | ---: | --- | --- |
| M0 — Baseline, traceability, hackathon structure | 100% | immutable baselines, branches, PRs, changelog, evidence/friction docs | none |
| M1 — PedsCore deterministic MCP foundation | 100% | agent adapter, 3 clinical tools, Streamable HTTP, MCP 2025-11-25, Railway, remote smoke, Apgar parity | none |
| M2 — Alexa+ add-on integration | 78% | manifest, store copy/assets, privacy/terms, validation, live MCP endpoint, CLI setup path | Amazon private-tool entitlement; CLI deploy; official simulator capture |
| M3 — SIM IMV deterministic MCP integration | 84% | 3 MCP contracts, SIM bridge, route tests, deterministic algorithm delegation, CI green, remote smoke script | publish SIM bridge; set `SIM_IMV_API_URL`; end-to-end remote smoke |
| M4 — AWS Builder Mini Challenge | 20% | Cognito/OAuth IaC and auth scaffold exist | no deployed, useful AWS integration yet; do not claim mini challenge yet |
| M5 — Open Source Mini Challenge | 92% | public MIT repo, PR #43, reusable deterministic-agent pattern, docs/tests/evidence | final Devpost wording + final contribution snapshot |
| M6 — Demo, judging assets, Devpost submission | 62% | evidence matrix, judging quickstart, Devpost draft, demo script, video shot list, testing URLs | official Alexa evidence if available, SIM remote capture, final video, final form submission |

## Weighted overall estimate

Using M1–M3 as the core product, M5 as the open-source challenge, and M6 as submission readiness, the hackathon project is approximately **78% complete**.

If AWS Builder is excluded as an optional challenge unless a real AWS integration is deployed, the core Alexa+/OSS submission path is approximately **84% complete**.

## Critical path

1. Publish SIM IMV bridge.
2. Wire `SIM_IMV_API_URL` into the public MCP service.
3. Run remote MCP→SIM deterministic smoke.
4. Obtain Amazon Alexa AI CLI entitlement if possible.
5. Deploy/test the Alexa+ add-on and capture evidence.
6. Record final demo video and submit Devpost.

## Work that can continue without the developer machine

- documentation and evidence hardening;
- CI/test hardening;
- PR hygiene;
- demo narrative and shot list;
- deterministic contract validation;
- Devpost copy;
- Open Source Mini Challenge packaging;
- friction log maintenance;
- Railway MCP configuration once the SIM endpoint exists.

## Work that currently requires external/manual intervention

- authorizing the private SIM repository in Railway's GitHub App, or waiting for Vercel deployment quota;
- Amazon-side allowlisting/entitlement for `AddOn3PDeveloperToolsRead`;
- final Alexa AI CLI login/deployment and simulator capture;
- final video recording/upload and Devpost submission confirmation.
