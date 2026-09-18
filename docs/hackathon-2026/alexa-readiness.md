# Alexa+ MCP readiness

This document tracks the concrete requirements for connecting the PedsCore MCP server to Alexa+.

## Verified Alexa+ requirements

Amazon's Alexa+ MCP QuickStart currently requires:

- MCP Streamable HTTP transport.
- A remotely accessible MCP URL.
- OAuth 2.1 authorization code flow with PKCE using S256.
- Unauthenticated requests to the MCP resource must return HTTP 401 without a `WWW-Authenticate` header.
- A Protected Resource Metadata document (RFC 9728) at the resource's well-known URI.
- Authorization-server metadata at `/.well-known/oauth-authorization-server`.
- The authorization request and token request must carry the MCP resource URI.
- Bearer access tokens must be sent in the `Authorization` header.
- Round-trip query latency below 500 ms.
- The Alexa+ MCP toolkit supports the MCP 2025-11-25 specification.

Primary reference:
https://www.developer.amazon.com/docs/alexaplus/add-ons/mcp-toolkit-quickstart.html

## Current PedsCore status

| Requirement | Status | Notes |
| --- | --- | --- |
| Streamable HTTP | Implemented | `POST /mcp` |
| MCP 2025-11-25 negotiation | Tested | Protocol integration test in CI |
| Tool discovery | Implemented | `search_clinical_tools` |
| Tool detail retrieval | Implemented | `get_clinical_tool` |
| Deterministic calculation | Implemented | `calculate_clinical_score` |
| Remote HTTPS URL | Implemented | `https://pedscore-ai-mcp-production.up.railway.app/mcp` on Railway |
| <500 ms remote MCP operations | Verified in first external CI smoke | initialize 232.5 ms; tools/list 143.1 ms; search 112.7 ms; deterministic calculation 134.7 ms. Initial health request was 850.7 ms and is tracked separately from MCP tool latency. |
| OAuth 2.1 / PKCE | Implemented server-side protection scaffold | Cognito IaC + JWT validation added; live provider provisioning and Alexa linking still pending |
| Protected Resource Metadata | Implemented | `/.well-known/oauth-protected-resource` with configurable resource/server/scopes |
| Authorization server metadata | Provider-dependent | Added a pre-flight probe that verifies discovery endpoints and `S256` before Alexa deployment |
| Alexa AI CLI add-on deployment | Pending | Requires remote URL and developer-account authentication |
| Alexa+ web simulator test | Pending | After add-on deployment |

## AWS authentication candidate

Amazon Cognito is a promising candidate for the Alexa+ authentication requirement because current AWS documentation confirms that Cognito user-pool authorization servers support:

- authorization-code grants
- PKCE with S256
- RFC 8707 resource indicators / resource binding
- resource-server scopes
- access-token audience binding through the `resource` parameter

Primary references:

- https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-define-resource-servers.html
- https://docs.aws.amazon.com/cognito/latest/developerguide/using-pkce-in-authorization-code.html

This is a design candidate, not yet a completed integration. Before marking it complete, we must configure a real user pool/app client/resource server and validate Alexa+'s full account-linking flow.

## Next engineering gates

1. Keep protocol-level MCP tests green.
2. Remote HTTPS deployment obtained on Railway.
3. Measure latency for initialize, tools/list, search, detail, and calculation against the Railway endpoint.
4. Implement and test OAuth protection and PRM discovery.
5. Scaffold the Alexa+ add-on with the real remote MCP URL.
6. Authenticate with the Alexa AI CLI and deploy to the development stage.
7. Exercise the add-on in the Alexa+ web simulator.

## Authentication implementation added

The MCP server now supports an optional `MCP_AUTH_MODE=cognito` mode that:

- requires Bearer access tokens on `POST /mcp`
- validates JWT signature against the Cognito user-pool JWKS
- validates issuer
- validates the resource-bound `aud` claim against the canonical MCP URI
- requires configured OAuth scopes
- checks `token_use=access`
- returns HTTP 401 without a `WWW-Authenticate` header when credentials are missing/invalid
- publishes RFC 9728 protected-resource metadata

Infrastructure-as-code for the Cognito user pool, resource server, app client, managed-login domain, authorization-code flow and Alexa redirect URIs lives at:

`infra/aws/cognito-alexa-mcp.yaml`

Amazon's current Alexa+ MCP account-linking documentation explicitly lists AWS Cognito as a managed authorization-server option and requires PKCE S256. The actual Cognito instance is not yet provisioned because the final remote MCP URI and Alexa redirect-URI list are not available until remote deployment / add-on configuration.

Before using any provider with Alexa+, run:

```bash
npm run check:alexa-oauth -w @peds-core/mcp-server -- https://AUTH-SERVER
```

The check fails unless discovery exposes an authorization endpoint, token endpoint, and `code_challenge_methods_supported` containing `S256`.

## Remote deployment

The hackathon MCP service is deployed on Railway from branch `hackathon/alexa-mcp`.

- Public base URL: `https://pedscore-ai-mcp-production.up.railway.app`
- MCP endpoint: `https://pedscore-ai-mcp-production.up.railway.app/mcp`
- Health endpoint: `https://pedscore-ai-mcp-production.up.railway.app/health`
- Railway deployment status: SUCCESS
- Railway deployment healthcheck: passed after fixing public-bind host validation

The current remote deployment intentionally runs with `MCP_AUTH_MODE=off` until the Alexa/Cognito account-linking configuration can be completed. The authentication code path and infrastructure-as-code are already present and tested in CI.

## External protocol validation

GitHub Actions run `35318399887` validated the public Railway deployment from an independent Central US runner.

Measured round trips:

| Operation | Result | Round trip |
| --- | --- | ---: |
| GET /health | HTTP 200 | 850.7 ms |
| MCP initialize | protocol `2025-11-25` | 232.5 ms |
| MCP tools/list | 3 tools returned | 143.1 ms |
| search_clinical_tools | first result `apgar` | 112.7 ms |
| calculate_clinical_score | Apgar 9/10 | 134.7 ms |

All four measured MCP protocol/tool operations were below 500 ms in this external run. The first health request was slower (850.7 ms); it is not a tool query, but it should still be monitored for cold-start/network effects.

The live smoke test is now committed as `scripts/remote-mcp-smoke.mjs` and automated by `.github/workflows/hackathon-mcp-remote-smoke.yml`.
