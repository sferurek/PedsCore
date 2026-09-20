# Friction log — recommended Devpost selection

Use these entries in the optional Devpost friction-log fields. They are selected because each has a reproducible failure, a concrete workaround, and an actionable product suggestion.

## 1. Alexa+ partner-only tooling was not identified early in onboarding
- **Task attempted:** Install and configure the documented Alexa+ add-on / MCP Toolkit developer tooling.
- **Steps taken:** Followed the setup path through npm, AWS CLI, IAM, STS and the documented `AddOn3PDeveloperToolsRead` role.
- **Expected result:** A registered hackathon participant could complete the documented developer-tool setup.
- **Actual result:** Public npm returned 404 for the private CLI package and AWS STS later returned `AccessDenied`. Devpost support confirmed that Category SDK / MCP Toolkit / add-on tools are available only to selected Amazon partners and that general participants cannot apply for access.
- **Severity:** Important
- **Workaround:** Use the explicitly supported self-hosted MCP path: MCP 2025-11-25 over Streamable HTTP.
- **Actionable suggestion:** Mark partner-only tooling before npm/IAM instructions and provide an entitlement preflight that routes general hackathon participants directly to the self-hosted MCP path.
- **Affected tooling:** Alexa+ developer onboarding / private CodeArtifact / AWS STS.

## 2. Railway deployed the wrong Git source despite explicit branch and SHA configuration
- **Task attempted:** Deploy the reconciled `hackathon/alexa-mcp-v2` candidate to an existing Railway service.
- **Steps taken:** Updated the service source branch, verified the branch existed, then set an explicit candidate commit SHA and triggered fresh deployments.
- **Expected result:** Deployment metadata should match the staged branch or exact SHA.
- **Actual result:** Service configuration showed the correct branch and SHA, but deployment snapshots repeatedly selected `main` at `297921191584b41b2428478ada77b46ed7bb43da`.
- **Severity:** Important
- **Workaround:** Keep the verified public production MCP endpoint for judge testing and use GitHub PR/CI as immutable candidate evidence rather than claiming the mis-sourced Railway candidate.
- **Actionable suggestion:** Make source resolution transactional with deploy creation and fail when the resolved branch/SHA differs from staged configuration.
- **Affected tooling:** Railway Git source deployment.

## 3. MCP SDK localhost Host protection caused Railway healthcheck 403s
- **Task attempted:** Run the official MCP Express app behind Railway's public reverse proxy.
- **Expected result:** `GET /health` returns 200.
- **Actual result:** Railway healthchecks received 403 because the MCP SDK's localhost Host-header protection rejected the reverse-proxy Host.
- **Severity:** Important
- **Workaround:** Configure `createMcpExpressApp({ host: "0.0.0.0" })` for the public deployment.
- **Actionable suggestion:** Document reverse-proxy/public-host configuration next to the Streamable HTTP deployment example.
- **Affected tooling:** MCP TypeScript SDK / Railway healthchecks.

## 4. Private repository authorization produced a silent offline Railway service
- **Task attempted:** Deploy the SIM IMV bridge from the private simulator repository.
- **Expected result:** Railway clones the selected repository/branch and starts a deployment.
- **Actual result:** The service was created but no deployment occurred because the Railway GitHub App lacked repository access.
- **Severity:** Important
- **Workaround:** Merge the tested bridge into simulator `main` and use the existing Vercel production integration; the subsequent strict public MCP→SIM smoke passed.
- **Actionable suggestion:** Fail service creation immediately with a direct repository-authorization action when a private repo cannot be cloned.
- **Affected tooling:** Railway GitHub integration.

## Verified resolution evidence

The final strict public smoke is GitHub Actions run `35479718824`: MCP 2025-11-25, six tools, Apgar 9/10, and SIM `school-bus` / patient `01` / expected `GREEN` / `correct=true` / rule `JS-MOB-01`, with all assertions passing.
