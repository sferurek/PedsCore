# Submission evidence matrix

This file is a working judge-facing evidence index. Keep it factual and update only when a capability is implemented and verified.

| Submission claim | Evidence | Status |
| --- | --- | --- |
| Existing project baseline recorded | `docs/hackathon-2026/baseline.md` | Verified |
| Public OSS repository | https://github.com/sferurek/PedsCore | Verified |
| MIT license present | root `LICENSE`; GitHub API detects SPDX `MIT` | Verified |
| Hackathon contribution isolated | `hackathon/alexa-mcp` | Verified |
| Public contribution URL | PR #43 | Verified |
| MCP Streamable HTTP server | `apps/mcp-server/` | Verified |
| MCP 2025-11-25 negotiation | protocol tests + remote smoke | Verified |
| Tool discovery | `search_clinical_tools` | Verified |
| Structured tool metadata | `get_clinical_tool` | Verified |
| Deterministic calculation | `calculate_clinical_score` | Verified |
| Public HTTPS MCP endpoint | Railway production URL | Verified |
| External remote smoke | GitHub Actions workflow | Verified |
| Deterministic remote Apgar 9/10 | remote smoke logs | Verified |
| Alexa+ manifest | `alexa-addon/addon-package/addon.json` | Verified locally / CI |
| Alexa+ store asset dimensions | remote PNG IHDR validation | Verified |
| Privacy / terms URLs | Railway HTTPS endpoints | Verified |
| Alexa+ CLI deployment | Add-on ID/version | Pending interactive Amazon login |
| Alexa+ simulator conversation | screenshots/video | Pending CLI deploy |
| AWS Cognito code path | `infra/aws/cognito-alexa-mcp.yaml` | Implemented but not provisioned |
| SIM IMV MCP integration | simulator branch / tools | Pending |
| Friction log | `docs/hackathon-2026/friction-log.md` | Active |

## Current key URLs

- Repository: https://github.com/sferurek/PedsCore
- Hackathon PR: https://github.com/sferurek/PedsCore/pull/43
- MCP endpoint: https://pedscore-ai-mcp-production.up.railway.app/mcp
- Health: https://pedscore-ai-mcp-production.up.railway.app/health
- Privacy: https://pedscore-ai-mcp-production.up.railway.app/privacy
- Terms: https://pedscore-ai-mcp-production.up.railway.app/terms

## Evidence capture still required

After Alexa AI CLI authentication and deployment, record:

- Add-on ID
- Add-on version
- CLI validation/deploy output
- simulator screenshots
- simulator screen recording
- one discovery trace
- one deterministic calculation trace
- one incomplete-input or safety trace

Do not mark those rows verified until the evidence exists.
