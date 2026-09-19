# Alexa+ MCP readiness

This document tracks the actual state of the PedsCore Alexa+ / MCP integration.

## Primary-track eligibility

The current Devpost rules explicitly accept a working self-hosted MCP server using MCP 2025-11-25 or later over Streamable HTTP for the Alexa+ primary track. PedsCore uses this route.

The private Alexa AI CLI/add-on workflow is useful additional evidence, but it is not required for the self-hosted MCP submission path.

## Implemented and verified

| Capability | Status | Evidence |
| --- | --- | --- |
| Streamable HTTP MCP endpoint | Verified | `POST /mcp` |
| MCP `2025-11-25` negotiation | Verified | CI + remote smoke |
| Public HTTPS endpoint | Verified | Railway |
| Natural-language tool discovery | Verified | `search_clinical_tools` |
| Structured tool metadata | Verified | `get_clinical_tool` |
| Deterministic calculation | Verified | `calculate_clinical_score` |
| Remote Apgar 9/10 | Verified | external smoke |
| Store manifest | Verified locally / CI | `alexa-addon/addon-package/addon.json` |
| Privacy / terms / media | Verified live | Railway endpoints |
| Account linking | Intentionally disabled initially | current experience is read-only and user-agnostic |
| Optional OAuth/Cognito path | Implemented in code | not provisioned |
| SIM IMV MCP contracts | Verified in PedsCore CI | three simulation tools |
| SIM deterministic backend bridge | Implemented | SIM PR #25 |
| Remote MCP→SIM execution | Pending | requires production SIM bridge |

## Current Alexa AI CLI blocker

The local AWS source profile authenticates successfully. The derived Alexa profile correctly attempts to assume:

`arn:aws:iam::372468808636:role/AddOn3PDeveloperToolsRead`

AWS STS returns `AccessDenied`. This isolates the remaining Alexa AI CLI problem to Amazon-side entitlement / trust for the private developer-tools role rather than local credentials.

The issue has been escalated to the hackathon support path and is recorded in the friction log. Until that entitlement exists, CodeArtifact access, private CLI installation, add-on deployment, and the official Alexa+ simulator cannot be completed.

## Remote service

- Base / judge landing: https://pedscore-ai-mcp-production.up.railway.app
- Judge console: https://pedscore-ai-mcp-production.up.railway.app/judge-demo
- Capability manifest: https://pedscore-ai-mcp-production.up.railway.app/capabilities
- MCP: https://pedscore-ai-mcp-production.up.railway.app/mcp
- Health: https://pedscore-ai-mcp-production.up.railway.app/health
- Privacy: https://pedscore-ai-mcp-production.up.railway.app/privacy
- Terms: https://pedscore-ai-mcp-production.up.railway.app/terms

The MCP surface includes the SIM tool contracts even when the remote simulator backend is unavailable. Those calls fail closed with an explicit `SIM IMV unavailable` MCP error until `SIM_IMV_API_URL` is configured; the three clinical tools remain independent.

## Performance evidence

An independent remote smoke measured:
- initialize: 232.5 ms
- tools/list: 143.1 ms
- search: 112.7 ms
- deterministic calculation: 134.7 ms

The initial health request was 850.7 ms and is retained as a cold-start/network observation rather than hidden.

## Next gates

1. Publish the SIM IMV bridge from `hackathon/alexa-sim`.
2. Set `SIM_IMV_API_URL` in the Railway MCP service.
3. Deploy the M3 MCP runtime and run the remote end-to-end smoke.
4. If Amazon grants private CLI entitlement, install/configure Alexa AI CLI, deploy the add-on, and capture official simulator evidence.
5. Record Add-on ID/version and final screenshots/video.
