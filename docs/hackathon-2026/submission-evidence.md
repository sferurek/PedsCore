# Submission evidence matrix

This is the judge-facing evidence index. Claims are marked **Verified** only when they are reproducible from code, CI, or a live endpoint.

| Submission claim | Evidence | Status |
| --- | --- | --- |
| Existing project baseline recorded | `docs/hackathon-2026/baseline.md` | Verified |
| Public OSS repository | https://github.com/sferurek/PedsCore | Verified |
| MIT license present | root `LICENSE`; GitHub detects SPDX `MIT` | Verified |
| Hackathon work isolated | `hackathon/alexa-mcp`; `hackathon/alexa-sim` | Verified |
| Public contribution URL | PedsCore PR #43 | Verified |
| MCP Streamable HTTP server | `apps/mcp-server/` | Verified |
| MCP 2025-11-25 negotiation | protocol tests + remote smoke | Verified |
| Clinical tool discovery | `search_clinical_tools` | Verified |
| Structured tool metadata | `get_clinical_tool` | Verified |
| Deterministic score execution | `calculate_clinical_score` | Verified |
| Public HTTPS MCP endpoint | Railway production URL | Verified |
| External MCP remote smoke | GitHub Actions | Verified |
| Deterministic remote Apgar 9/10 | remote smoke evidence | Verified |
| Alexa+ manifest | `alexa-addon/addon-package/addon.json` | Verified locally / CI |
| Alexa+ store asset dimensions | remote PNG IHDR validation | Verified |
| Privacy / terms URLs | Railway HTTPS endpoints | Verified |
| SIM IMV deterministic adapter | SIM PR #25 + CI run `35333822459` | Verified |
| SIM MCP contracts | `start_simulation_case`, `get_patient_findings`, `submit_triage_decision` | Verified in PedsCore CI |
| SIM production HTTP contract | CI run `35333822459`: production Next.js server + deterministic smoke | Verified |
| Public SIM bridge endpoint | public deployment | Pending repository authorization / Vercel quota |
| End-to-end public MCP → SIM flow | remote deterministic smoke | Pending public SIM endpoint |
| Alexa AI CLI entitlement | STS AssumeRole into Amazon private developer-tools role | Blocked externally / escalated |
| Alexa+ add-on deployment | Add-on ID/version | Pending Amazon entitlement |
| Alexa+ simulator conversation | screenshots/video | Pending add-on deployment |
| AWS Cognito code path | `infra/aws/cognito-alexa-mcp.yaml` | Implemented, not provisioned |
| AWS Builder Mini Challenge | actual useful deployed AWS integration + write-up | Not yet claimed |
| Open Source Mini Challenge | public MIT repo + PR #43 contribution | Ready, final submission wording pending |
| Friction log | `docs/hackathon-2026/friction-log.md` | Active |

## Current key URLs

- Repository: https://github.com/sferurek/PedsCore
- Hackathon PR: https://github.com/sferurek/PedsCore/pull/43
- SIM PR: https://github.com/sferurek/pedscore-triage-sim/pull/25
- MCP endpoint: https://pedscore-ai-mcp-production.up.railway.app/mcp
- Health: https://pedscore-ai-mcp-production.up.railway.app/health
- Privacy: https://pedscore-ai-mcp-production.up.railway.app/privacy
- Terms: https://pedscore-ai-mcp-production.up.railway.app/terms

## Evidence capture still required

Before final submission, capture the Alexa add-on ID/version if Amazon grants CLI access, simulator screenshots/video, the final remote MCP→SIM smoke output, and the final demo recording. Do not mark these as verified before they exist.
