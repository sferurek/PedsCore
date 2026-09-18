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
| Remote HTTPS URL | Blocked | Vercel preview is currently build-rate-limited |
| <500 ms remote latency | Pending | Must measure against deployed endpoint |
| OAuth 2.1 / PKCE | Pending | Candidate architecture below |
| Protected Resource Metadata | Pending | Add with authentication |
| Authorization server metadata | Pending | Add with authentication |
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
2. Obtain a remote HTTPS deployment.
3. Measure latency for initialize, tools/list, search, detail, and calculation.
4. Implement and test OAuth protection and PRM discovery.
5. Scaffold the Alexa+ add-on with the real remote MCP URL.
6. Authenticate with the Alexa AI CLI and deploy to the development stage.
7. Exercise the add-on in the Alexa+ web simulator.
