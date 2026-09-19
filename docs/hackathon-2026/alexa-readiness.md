# Alexa+ MCP readiness

This document tracks the actual state of the PedsCore Alexa+ / MCP integration.

## Primary-track eligibility

The current Devpost rules explicitly accept a working self-hosted MCP server using MCP 2025-11-25 or later over Streamable HTTP for the Alexa+ primary track. PedsCore uses this route.

Devpost support confirmed that the private Alexa AI CLI / Category SDK / MCP Toolkit add-on workflow is partner-only. It is not available to general hackathon participants and is not part of the submission path.

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
| SIM deterministic backend bridge | Merged + deployed | SIM PR #25; Vercel production status success |
| MCP production → SIM endpoint configuration | Verified | `SIM_IMV_API_URL` configured on Railway |
| Remote MCP→SIM execution | Final strict smoke pending | PR check validates scenario → findings → deterministic decision |

## Partner-only Alexa tooling status

The AWS source profile authenticated correctly, but the documented Amazon role `AddOn3PDeveloperToolsRead` returned `AccessDenied`. Devpost support subsequently confirmed that this tooling is restricted to selected Amazon partners and that general participants cannot apply for access.

This is therefore closed as an onboarding/documentation finding, not an unresolved PedsCore infrastructure defect. The self-hosted MCP implementation remains the canonical Alexa+ track path.

## Remote service

- Base / judge landing: https://pedscore-ai-mcp-production.up.railway.app
- Judge console: https://pedscore-ai-mcp-production.up.railway.app/judge-demo
- Capability manifest: https://pedscore-ai-mcp-production.up.railway.app/capabilities
- MCP: https://pedscore-ai-mcp-production.up.railway.app/mcp
- Health: https://pedscore-ai-mcp-production.up.railway.app/health
- Privacy: https://pedscore-ai-mcp-production.up.railway.app/privacy
- Terms: https://pedscore-ai-mcp-production.up.railway.app/terms

The MCP surface includes all three SIM tool contracts and the production service has `SIM_IMV_API_URL` configured to the deployed Vercel simulator bridge. Calls still fail closed on upstream errors; the clinical tools remain independent.

## Performance evidence

An independent remote smoke measured:
- initialize: 232.5 ms
- tools/list: 143.1 ms
- search: 112.7 ms
- deterministic calculation: 134.7 ms

The initial health request was 850.7 ms and is retained as a cold-start/network observation rather than hidden.

## Next gates

1. Pass the strict public MCP → SIM end-to-end PR smoke.
2. Keep the canonical hackathon PR green and mergeable.
3. Freeze the submission candidate and finalize Devpost fields.
4. Record the final demo video separately.
