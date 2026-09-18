# Friction log

Amazon's submission form explicitly rewards useful friction logs. Record concrete problems encountered while building the Alexa+, MCP, and AWS integrations.

## Entry template

### YYYY-MM-DD — Short title
- **Task attempted:**
- **Steps taken:**
- **Expected result:**
- **Actual result:**
- **Severity:** Critical / Important / Minor
- **Workaround:**
- **Actionable suggestion:**
- **Affected tool / API / SDK:**
- **Evidence:** logs, screenshots, issue links, or commit/PR links where appropriate

---

No friction entries recorded yet.

### 2026-09-18 — TypeScript exact optional property compatibility in MCP transport
- **Task attempted:** Compile the official MCP TypeScript SDK Streamable HTTP transport inside a strict TypeScript workspace.
- **Steps taken:** Added `@modelcontextprotocol/sdk` v1.30.x, created a stateless `StreamableHTTPServerTransport`, and compiled with `exactOptionalPropertyTypes: true`.
- **Expected result:** The documented stateless transport pattern should compile in a strict NodeNext TypeScript project.
- **Actual result:** TypeScript reported incompatibilities around `sessionIdGenerator: undefined` and the SDK transport's optional `onclose` member when passed as the base `Transport` type.
- **Severity:** Important
- **Workaround:** Keep strict mode enabled but disable `exactOptionalPropertyTypes` only for the isolated MCP server workspace; PedsCore core retains its stricter setting.
- **Actionable suggestion:** Ensure SDK transport interfaces compile cleanly with `exactOptionalPropertyTypes: true`, and document the expected stateless constructor form for strict TypeScript configurations.
- **Affected tool / API / SDK:** MCP TypeScript SDK v1 Streamable HTTP transport.
- **Evidence:** GitHub Actions CI run #341 failed at the MCP server build; run #342 passed after the isolated compatibility adjustment.

### 2026-09-18 — Vercel preview deployment blocked by build rate limit
- **Task attempted:** Produce a remote preview endpoint for the hackathon MCP branch through the repository's existing Vercel Git integration.
- **Steps taken:** Pushed the `hackathon/alexa-mcp` branch and opened draft PR #43, allowing the normal Vercel preview integration to run.
- **Expected result:** Vercel should create a preview deployment that can later expose the MCP endpoint for remote Alexa+/client testing.
- **Actual result:** GitHub commit status `Vercel` returned `failure` and linked to Vercel's `upgradeToPro=build-rate-limit` page.
- **Severity:** Important
- **Workaround:** Continue validating the MCP server end-to-end in GitHub Actions and keep the remote deployment configuration ready; retry preview deployment once the account build-rate window clears or deploy the MCP service separately.
- **Actionable suggestion:** Surface the exact retry/reset time directly in failed Git checks and provide an explicit queued-preview option rather than a generic upgrade redirect.
- **Affected tool / API / SDK:** Vercel Git preview deployments.
- **Evidence:** GitHub combined status on PR #43 head reported `context: Vercel`, `state: failure`, target `upgradeToPro=build-rate-limit`.

### 2026-09-18 — Railway Git source silently deployed the default branch
- **Task attempted:** Deploy the `hackathon/alexa-mcp` branch of the PedsCore monorepo to a new Railway service.
- **Steps taken:** Created the service from GitHub and passed `branch: hackathon/alexa-mcp` during deployment creation.
- **Expected result:** The first deployment should build the requested hackathon branch.
- **Actual result:** Railway deployment metadata showed `branch: main` and baseline commit `069eb6ad...`, so the MCP workspace did not exist and the build reported only two workspaces.
- **Severity:** Important
- **Workaround:** Explicitly staged the service source branch through Railway service configuration, committed the staged environment changes, then deployed a specific commit SHA from `hackathon/alexa-mcp`.
- **Actionable suggestion:** Surface the effective Git branch prominently when creating a service and reject or warn when the requested branch is not applied.
- **Affected tool / API / SDK:** Railway GitHub deployment workflow.
- **Evidence:** Initial deployment metadata reported `branch: main`; successful hackathon deployment later used commit `65641045486ff555fab014140ad394f0180092b3`.

### 2026-09-18 — MCP SDK localhost Host validation blocked Railway healthchecks
- **Task attempted:** Run the official MCP Express app behind Railway's public reverse proxy with a `/health` deployment healthcheck.
- **Steps taken:** Deployed the app using `createMcpExpressApp()` and listened on Railway's injected port.
- **Expected result:** Railway should receive HTTP 200 from `GET /health`.
- **Actual result:** The container started correctly, but Railway healthchecks repeatedly received HTTP 403 because the MCP SDK's default localhost Host-header protection rejected Railway's healthcheck Host.
- **Severity:** Important
- **Workaround:** Configure `createMcpExpressApp({ host: "0.0.0.0" })` for the public reverse-proxy deployment. Railway's next deployment passed health validation.
- **Actionable suggestion:** Deployment documentation should call out the SDK's localhost Host protection and show the production/reverse-proxy configuration directly.
- **Affected tool / API / SDK:** MCP TypeScript SDK + Railway healthchecks.
- **Evidence:** Railway build logs showed repeated `Attempt #N failed with HTTP 403` until the public-bind change; deployment `19f324c8-53ca-4270-bba3-d77391db27a7` then reached SUCCESS.

### 2026-09-18 — Alexa AI CLI package returned npm 404 before private registry setup
- **Task attempted:** Install the Alexa AI CLI on a clean macOS development machine with Node.js 24.
- **Steps taken:** Ran `npm install -g @alexa-ai/cli` against the default public npm registry.
- **Expected result:** Install the CLI and proceed to `alexa-ai configure`.
- **Actual result:** npm returned HTTP 404 for `https://registry.npmjs.org/@alexa-ai%2fcli`; subsequent `alexa-ai --version`, `alexa-ai configure`, and `alexa-ai deploy` all failed because the CLI was not installed.
- **Severity:** Important
- **Workaround:** Install AWS CLI, configure the AWS account previously provided to Amazon, create the documented base and assumed-role profiles, authenticate npm to Amazon's private CodeArtifact registry, then install `@alexa-ai/cli`.
- **Actionable suggestion:** The Alexa+ QuickStart should put the private-registry prerequisite immediately next to every `npm install -g @alexa-ai/cli` instruction and explicitly warn that a normal public-npm install will return 404.
- **Affected tool / API / SDK:** Alexa AI CLI distribution / AWS CodeArtifact onboarding.
- **Evidence:** Local terminal capture from 2026-09-18 shows npm `E404 Not Found` for `@alexa-ai/cli` followed by `command not found`. Amazon's current environment-setup documentation requires CodeArtifact authentication before CLI installation.

### 2026-09-18 — Alexa private developer-tools role rejected an otherwise valid AWS setup
- **Task attempted:** Assume Amazon's documented Alexa AI developer-tools role after configuring a fresh AWS account, IAM user, access keys, local AWS CLI, source profile, and the required local `sts:AssumeRole` permission.
- **Steps taken:** Verified that `aws sts get-caller-identity --profile alexa-ai-user` succeeds for the local IAM user, then configured `profile.alexa-ai` to assume `arn:aws:iam::372468808636:role/AddOn3PDeveloperToolsRead` in `us-west-2`.
- **Expected result:** `aws sts get-caller-identity --profile alexa-ai` should return an assumed-role identity in Amazon account `372468808636`.
- **Actual result:** STS returned `AccessDenied` for `sts:AssumeRole`. The source profile is valid, so the remaining blocker is external authorization on Amazon's side for the private role.
- **Severity:** Important
- **Workaround:** Continue with the self-hosted MCP submission path, which remains independently functional, while requesting Alexa+ developer-tools access for the AWS account through the hackathon support channel / Alexa+ onboarding process.
- **Actionable suggestion:** Provide a self-service entitlement check page that shows whether an AWS account is allowlisted for `AddOn3PDeveloperToolsRead`, with the exact remediation path if it is not.
- **Affected tool / API / SDK:** AWS STS / Alexa AI private developer-tools onboarding.
- **Evidence:** Local source profile identity succeeds; assumed-role profile returns `AccessDenied` against the documented Amazon role.
