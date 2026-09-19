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
- **Steps taken:** Pushed the `hackathon/alexa-mcp-v2` branch and opened draft PR #91, allowing the normal Vercel preview integration to run.
- **Expected result:** Vercel should create a preview deployment that can later expose the MCP endpoint for remote Alexa+/client testing.
- **Actual result:** GitHub commit status `Vercel` returned `failure` and linked to Vercel's `upgradeToPro=build-rate-limit` page.
- **Severity:** Important
- **Workaround:** Continue validating the MCP server end-to-end in GitHub Actions and keep the remote deployment configuration ready; retry preview deployment once the account build-rate window clears or deploy the MCP service separately.
- **Actionable suggestion:** Surface the exact retry/reset time directly in failed Git checks and provide an explicit queued-preview option rather than a generic upgrade redirect.
- **Affected tool / API / SDK:** Vercel Git preview deployments.
- **Evidence:** GitHub combined status on PR #91 head reported `context: Vercel`, `state: failure`, target `upgradeToPro=build-rate-limit`.

### 2026-09-18 — Railway Git source silently deployed the default branch
- **Task attempted:** Deploy the `hackathon/alexa-mcp-v2` branch of the PedsCore monorepo to a new Railway service.
- **Steps taken:** Created the service from GitHub and passed `branch: hackathon/alexa-mcp` during deployment creation.
- **Expected result:** The first deployment should build the requested hackathon branch.
- **Actual result:** Railway deployment metadata showed `branch: main` and baseline commit `069eb6ad...`, so the MCP workspace did not exist and the build reported only two workspaces.
- **Severity:** Important
- **Workaround:** Explicitly staged the service source branch through Railway service configuration, committed the staged environment changes, then deployed a specific commit SHA from `hackathon/alexa-mcp-v2`.
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

### 2026-09-18 — Railway private repository access blocked SIM bridge deployment
- **Task attempted:** Publish the hackathon SIM IMV bridge independently so the public PedsCore MCP service could execute an end-to-end MCP → simulator flow.
- **Steps taken:** Created a dedicated Railway service, explicitly set source repository `sferurek/pedscore-triage-sim` and branch `hackathon/alexa-sim`, and verified that no deployment was allowed to fall back to `main`.
- **Expected result:** Railway should clone the selected private repository branch and deploy the Next.js bridge.
- **Actual result:** The service remained offline with no deployment because the Railway GitHub App was not authorized for the private simulator repository.
- **Severity:** Important
- **Workaround:** Keep the full simulator bridge validated in CI, including a production-build HTTP smoke, while waiting for repository authorization or the Vercel quota window to reopen.
- **Actionable suggestion:** When service creation targets a private repository that the GitHub App cannot clone, fail immediately with an explicit repository-authorization action instead of creating an offline service with no deployment.
- **Affected tool / API / SDK:** Railway GitHub source integration.
- **Evidence:** Railway service configuration shows the correct repository and `hackathon/alexa-sim` branch but no deployment; Railway agent inspection identified missing GitHub App repository access.

### 2026-09-19 — Devpost confirmed Alexa+ add-on tooling is partner-only
- **Task attempted:** Resolve the remaining `AccessDenied` for Amazon's documented `AddOn3PDeveloperToolsRead` role.
- **Expected result:** Identify an account allowlisting or IAM remediation path available to hackathon participants.
- **Actual result:** Devpost support (Janet Fang) confirmed that Category SDK and MCP Toolkit / Alexa+ add-on tools are available only to selected Amazon partners and there is currently no way for general participants to apply for that access. The setup page followed during troubleshooting did not surface that limitation clearly.
- **Severity:** Important onboarding/documentation friction; not a submission blocker.
- **Workaround:** Use the explicitly permitted self-hosted MCP route with MCP 2025-11-25+ over Streamable HTTP.
- **Actionable suggestion:** Put the partner-only limitation prominently on every setup page that references the private CLI, CodeArtifact registry, Category SDK, MCP Toolkit, or `AddOn3PDeveloperToolsRead`; distinguish these from the self-hosted MCP submission path before IAM setup begins.
- **Affected tool / API / SDK:** Alexa+ add-on onboarding documentation / private developer tooling.
- **Evidence:** Devpost support email dated 18 September 2026 confirming the partner-only restriction.


### 2026-09-19 — Railway ignored updated branch and explicit commit SHA during candidate deployment
- **Task attempted:** Deploy the reconciled hackathon release candidate from `hackathon/alexa-mcp-v2` to an existing Railway MCP service.
- **Steps taken:** Updated the service source branch to `hackathon/alexa-mcp-v2`, verified the branch existed, then set an explicit candidate `commitSha` and triggered fresh deployments.
- **Expected result:** Deployment metadata should reference the configured branch or exact commit SHA.
- **Actual result:** The service configuration correctly stored the requested branch and commit SHA, but new deployment snapshots repeatedly selected `main` at commit `297921191584b41b2428478ada77b46ed7bb43da`.
- **Severity:** Important
- **Workaround:** Keep the verified production MCP service for judge testing, use GitHub PR/CI as the immutable candidate evidence, and avoid claiming that the unreconciled Railway candidate service contains the v2 branch.
- **Actionable suggestion:** Railway should make source selection transactional with deployment creation and reject a deployment when the resolved branch/SHA differs from the staged service source.
- **Affected tool / API / SDK:** Railway Git source deployment.
- **Evidence:** Service config reported `hackathon/alexa-mcp-v2` plus explicit candidate SHA while deployment IDs `dbc58cb4-107b-4720-a2cd-89327303d110`, `7d223992-3080-4cd5-9364-593acee3166d`, and `5711762f-1773-4646-b5db-d0c029295714` reported `main` / `297921191584...`.

### 2026-09-19 — Private SIM repository deployment blocker resolved through production Vercel merge
- **Task attempted:** Publish the deterministic SIM IMV bridge for public MCP end-to-end validation.
- **Expected result:** A public simulator bridge callable by the PedsCore MCP service.
- **Actual result:** Railway could not clone the private simulator repository, while earlier Vercel previews had been rate-limited.
- **Severity:** Important
- **Workaround:** Merge SIM PR #25 into `main`; subsequent production commits deployed successfully through the existing Vercel integration. Configure Railway MCP with `SIM_IMV_API_URL=https://pedscore-triage-sim.vercel.app/api/hackathon/sim`.
- **Resolution evidence:** Strict public MCP→SIM GitHub Actions run `35462460140` passed with `school-bus`, patient `01`, expected `GREEN`, `correct=true`, rule `JS-MOB-01`.
- **Actionable suggestion:** Deployment platforms should fail fast with a direct repository-authorization action when a private Git source cannot be cloned.
- **Affected tool / API / SDK:** Railway GitHub integration / Vercel production deployment.
