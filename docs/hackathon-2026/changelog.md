# Hackathon changelog

Use this file to record user-visible and technically significant work created during the Amazon Developer Hackathon 2026 submission period.

## Format

### YYYY-MM-DD — Change title
- Repository / PR / commit:
- What changed:
- Why it matters:
- Demo value:
- Open-source value:
- AWS / Alexa+ relevance:

---

## 2026-09-18 — Hackathon workstream initialized
- Created dedicated hackathon branches for PedsCore and the triage simulator.
- Captured immutable baseline commit SHAs for both repositories.
- Added architecture, changelog, friction-log, and submission-note scaffolding.

## 2026-09-18 — M1 agent adapter foundation
- Repository / branch: `sferurek/PedsCore` / `hackathon/alexa-mcp`
- Added an agent-safe adapter over the existing PedsCore catalog and deterministic calculator registry.
- Added natural-language-oriented clinical tool discovery, structured tool detail retrieval, and deterministic calculation execution.
- Added tests covering Apgar discovery, structured input exposure, and score parity with the existing calculator logic.
- No generative model performs the clinical calculation; the adapter delegates to the existing deterministic PedsCore calculator registry.
- This is the protocol-independent foundation for the first MCP tools: `search_clinical_tools`, `get_clinical_tool`, and `calculate_clinical_score`.

## 2026-09-18 — M1 Streamable HTTP MCP server
- Added a dedicated `@peds-core/mcp-server` workspace using the official MCP TypeScript SDK.
- Added a stateless Streamable HTTP endpoint at `POST /mcp` and health endpoint at `GET /health`.
- Registered three real MCP tools: `search_clinical_tools`, `get_clinical_tool`, and `calculate_clinical_score`.
- Tool discovery and metadata are sourced from the existing PedsCore catalog/discovery layer.
- Clinical score execution delegates to the existing deterministic calculator registry; the MCP/LLM layer does not calculate scores itself.
- Added root workspace/build scripts so the MCP server is validated in normal CI.
- CI validation after implementation: lint passed, 472 tests passed, and production build passed.

## 2026-09-18 — Protocol E2E and Alexa+ onboarding scaffold
- Refactored the MCP service into an app factory plus minimal runtime entrypoint to enable protocol-level integration testing.
- Added end-to-end Streamable HTTP tests for health, initialize, tools/list, tools/call discovery, deterministic Apgar calculation, and unsupported methods.
- CI validates MCP negotiation using protocol version `2025-11-25`.
- Added an Alexa+ readiness matrix from current Amazon developer requirements.
- Added a non-deployable Alexa+ `addon.template.json` with PedsCore-specific store copy, example phrases, and MCP integration structure.
- Recorded the current Vercel preview build-rate limit as a hackathon friction item.
- Latest validation: lint passed, all tests passed, and all builds passed.

## 2026-09-18 — Alexa OAuth / Cognito security scaffold
- Added optional Bearer-token protection for the MCP endpoint.
- Added RFC 9728 protected-resource metadata at `/.well-known/oauth-protected-resource`.
- Added Cognito JWT verification against remote JWKS, issuer, resource-bound audience, access-token type, and required scopes.
- Added tests proving unauthenticated MCP calls return HTTP 401 without `WWW-Authenticate`, as required by Alexa+ MCP onboarding.
- Added AWS CloudFormation for a Cognito user pool, resource server, authorization-code app client, managed-login domain, refresh-token lifetime, and support for all Alexa redirect URIs.
- Added an authorization-server metadata pre-flight probe that checks Alexa-required PKCE S256 discovery before deployment.
- CI remains green after the authentication work: lint, tests, and all builds pass.

## 2026-09-18 — Remote MCP deployment on Railway
- Connected Railway and created a dedicated `pedscore-ai-mcp` project/service.
- Corrected the service source from `main` to `hackathon/alexa-mcp`.
- Added a root start command so Railpack can detect the MCP runtime in the monorepo.
- Fixed the MCP SDK localhost-only host validation for a public `0.0.0.0` bind.
- Railway deployment from commit `65641045486ff555fab014140ad394f0180092b3` completed successfully.
- Generated public domain `pedscore-ai-mcp-production.up.railway.app`.
- Updated the Alexa+ manifest template with the real remote MCP endpoint.

## 2026-09-18 — Independent remote MCP smoke passed
- Added a GitHub Actions workflow that validates the public Railway service from outside Railway.
- Remote smoke run `35318399887` completed successfully.
- Confirmed HTTP 200 health response and MCP protocol negotiation `2025-11-25`.
- Confirmed the live server exposes all three initial tools.
- Confirmed live natural-language discovery returns `apgar`.
- Confirmed live deterministic Apgar execution returns 9/10.
- Measured MCP round trips from a Central US GitHub runner: initialize 232.5 ms; tools/list 143.1 ms; search 112.7 ms; calculation 134.7 ms — all below the current 500 ms Alexa+ query target.
- Initial health request measured 850.7 ms and is retained as a performance observation rather than hidden.

## 2026-09-18 — M2 Alexa+ store package prepared
- Added live HTTPS privacy-policy and terms-of-use endpoints to the Railway MCP service.
- Added server-generated PNG store assets so Amazon can fetch all six mandatory light icon sizes and the 600x900 carousel image without a separate CDN.
- Added unit/integration coverage for the compliance pages and media endpoints.
- Replaced the Alexa+ manifest placeholders with the live Railway URLs and created a deployable `addon-package/addon.json`.
- Corrected a TypeScript route-parameter narrowing issue and a store-icon route matching issue found by CI/remote smoke.
- Deployed commit `afd661382dd661d3992c54cb969cd474688ad3b5` to Railway successfully.
- CI run `35319230843` passed.
- External remote smoke run `35319226299` passed against the production service, including the legal pages and required PNG assets.
- Verified from current Amazon documentation that account linking is optional for an add-on that works identically for all users; the initial PedsCore read-only educational flow therefore keeps account linking disabled.

## 2026-09-18 — Alexa manifest gate added
- Added `scripts/validate-alexa-manifest.mjs` to enforce the current Alexa+ MCP store-listing constraints before deployment.
- Added `npm run alexa:validate`.
- Added the Alexa+ manifest validation gate to the main CI workflow.
- CI run `35319496923` passed lint, tests, Alexa manifest validation, and full build.
