# Devpost final copy — Amazon Developer Hackathon 2026

Prepared 19 September 2026 for submission **1186870**.

Canonical technical candidate:
- SHA: `46cf642c1c2005f85c4854f8fa3822ac5ac9ecd5`
- release branch: `release/amazon-hackathon-2026-rc2`
- contribution PR: https://github.com/sferurek/PedsCore/pull/91
- repository: https://github.com/sferurek/PedsCore
- judge console: https://pedscore-ai-mcp-production.up.railway.app/judge-demo
- capabilities: https://pedscore-ai-mcp-production.up.railway.app/capabilities
- MCP endpoint: https://pedscore-ai-mcp-production.up.railway.app/mcp

## Project title

**PedsCore AI — Pediatric Clinical Learning with Alexa+**

## One-line description

An open-source pediatric learning system where Alexa+/agents orchestrate clinical-tool discovery, deterministic score execution and mass-casualty simulation without moving safety-critical logic into the language model.

## Project description

PedsCore AI explores a simple boundary for clinical AI: **the model may understand intent and orchestrate workflows, but validated clinical logic remains deterministic, inspectable and testable.**

The project exposes PedsCore through a self-hosted MCP server using Streamable HTTP and MCP 2025-11-25. A conversational client can discover an appropriate pediatric tool, inspect structured inputs and evidence metadata, and execute supported clinical scores through the same deterministic TypeScript implementation used by the PedsCore application.

The workflow then extends into SIM IMV, a pediatric mass-casualty triage simulator. The agent can start a synthetic scenario, retrieve learner-visible findings, submit a triage category and receive algorithmic debriefing. The language model does not decide whether the learner is correct: the simulator's existing JumpSTART, SALT, PTT or MITT engine owns the canonical category, rule path and feedback.

This is therefore not a single-turn Q&A bot or a thin wrapper around one API. The complete workflow spans **tool discovery → structured metadata → deterministic calculation → scenario selection → patient findings → learner decision → deterministic debriefing** across two domain engines.

A public judge console performs real MCP calls against the deployed service and exposes the resulting traces for verification without local setup.

## Inspiration

Clinical education benefits from conversational interfaces, but pediatric scores and emergency algorithms should not become probabilistic simply because the interface is generative. I wanted to test whether an agent could provide a natural interaction layer while keeping formulas, validated rules, evidence and canonical simulation decisions in ordinary deterministic software.

## What it does

- Discovers pediatric and neonatal clinical tools from natural-language intent.
- Returns structured metadata, applicability and evidence information.
- Executes supported clinical scores through deterministic PedsCore code.
- Starts synthetic pediatric mass-casualty scenarios.
- Retrieves only learner-visible patient findings.
- Accepts a learner's triage choice.
- Returns canonical triage category, rule/path and teaching feedback from the SIM IMV engine.
- Exposes a public judge console and machine-readable capability manifest.

## How we built it

PedsCore is a TypeScript monorepo. The hackathon work added a dedicated MCP server using Streamable HTTP and MCP protocol `2025-11-25`.

The MCP layer delegates clinical calculations to `@peds-core/core`; it does not reproduce formulas in prompts or model instructions. For simulation, the MCP service calls a narrow production HTTP bridge in SIM IMV, which delegates to the simulator's deterministic JumpSTART / SALT / PTT / MITT engines.

The public MCP surface exposes six tools:
- `search_clinical_tools`
- `get_clinical_tool`
- `calculate_clinical_score`
- `start_simulation_case`
- `get_patient_findings`
- `submit_triage_decision`

Verification includes protocol tests, deterministic parity tests, governance checks, SEO checks, Alexa+ manifest validation and remote public end-to-end smoke tests.

## What changed during the hackathon

PedsCore existed before the event. During the submission period I added:

- the entire agent-safe adapter layer;
- a self-hosted MCP server over Streamable HTTP;
- MCP 2025-11-25 negotiation;
- clinical discovery, metadata and deterministic calculation tools;
- the SIM IMV MCP contracts and production simulator bridge;
- a live Railway MCP deployment;
- a public judge console and capability manifest;
- Alexa+ manifest, store assets and compliance endpoints;
- optional OAuth/Cognito-compatible protection scaffolding;
- independent remote MCP and MCP→SIM smoke testing;
- reproducible one-command verification;
- structured evidence, product-feedback and friction-log documentation.

Pre-hackathon baselines and hackathon-specific branches are documented in the repository.

## Challenges

The largest challenge was integration boundaries rather than clinical logic.

First, the public onboarding path for Alexa+ add-on tooling led through npm, AWS CLI, IAM and STS troubleshooting before Devpost support confirmed that Category SDK / MCP Toolkit / add-on tooling is available only to selected Amazon partners and that general participants cannot apply for that access. The self-hosted MCP path remained fully valid and became the canonical submission route.

Second, Railway source resolution did not always deploy the configured branch/SHA, so immutable GitHub CI evidence was kept separate from claims about the live production endpoint.

Third, public reverse-proxy deployment exposed MCP SDK Host-header protection behavior that initially caused 403 health checks.

These issues are documented as reproducible friction logs with workarounds and product suggestions.

## Accomplishments

- Working public MCP server using the Alexa+ accepted self-hosted path.
- MCP 2025-11-25 over Streamable HTTP.
- Six live MCP tool contracts.
- Deterministic Apgar 9/10 round trip verified remotely.
- Strict MCP→SIM end-to-end path verified remotely.
- JumpSTART school-bus patient 01 verified as expected `GREEN`, `correct=true`, rule `JS-MOB-01`.
- Public MIT-licensed repository with explicit pre-hackathon baseline.
- Reproducible CI covering lint, tests, build, governance, SEO and Alexa+ manifest validation.
- Public browser judge console requiring no local setup.

## What we learned

Agentic interfaces become more trustworthy when deterministic domain logic is treated as a first-class dependency rather than something a model is expected to reconstruct. MCP provides a useful, inspectable boundary between natural-language orchestration and validated domain execution.

The hackathon also reinforced that onboarding needs to make entitlement boundaries explicit. A technically correct IAM setup cannot fix missing partner-only access, and documentation should make that distinction before developers spend time debugging it.

## What's next

The architecture can expand to more pediatric learning workflows while preserving the same execution boundary: conversational orchestration outside, deterministic clinical logic inside.

Future work includes richer educational state, longitudinal learner progress, additional simulation scenarios, more structured debriefing and optional authenticated deployments where user-specific state is genuinely useful.

## Primary Track

**Alexa+**

Runtime path:
- self-hosted MCP server
- MCP `2025-11-25`
- Streamable HTTP
- required technology used directly at runtime

## Open Source Mini Challenge

**Yes**

Contribution URL:
https://github.com/sferurek/PedsCore/pull/91

Repository URL:
https://github.com/sferurek/PedsCore

GitHub username:
`sferurek`

### What was contributed, how it works and why it matters

The contribution adds a reusable open-source pattern for exposing deterministic clinical software to agentic interfaces. Natural-language orchestration happens through explicit MCP tools, while validated formulas and simulation algorithms remain in ordinary testable domain code.

That matters because clinical and educational software contains formulas, validated rules, evidence and safety constraints that should not be silently reconstructed probabilistically by a language model. The contribution includes protocol tests, deterministic parity tests, remote smoke tests, documentation and the production SIM IMV integration boundary.

The repository is public and MIT licensed.

## AWS Builder Mini Challenge

**No.**

Do not claim AWS Builder unless a genuinely qualifying AWS/Kiro integration is implemented and documented before submission.

## Product Feedback

### Tools / APIs / SDKs used and what for

**Model Context Protocol / MCP TypeScript SDK**
Used to expose PedsCore clinical discovery/calculation and SIM IMV simulation contracts through a self-hosted Streamable HTTP MCP server.

**Alexa+ self-hosted MCP path**
Used as the primary-track runtime integration. The server implements MCP 2025-11-25 and is remotely testable.

**Railway**
Used to host the public MCP service and judge console.

**Vercel**
Used for the existing PedsCore and SIM IMV public deployments, including the production simulator bridge.

**GitHub / GitHub Actions**
Used for source control, reproducible CI, remote public smoke testing and immutable evidence.

**AWS CLI / STS**
Used while investigating the documented Alexa+ add-on tooling path. Optional Cognito-compatible authentication infrastructure was also prepared, but no live AWS runtime integration is claimed.

### What worked well

The self-hosted MCP path fits existing domain software extremely well. It lets the conversational layer stay thin while deterministic formulas and algorithms remain in their existing tested packages.

Streamable HTTP was straightforward to deploy and independently validate from CI. MCP tool contracts also make the domain boundary explicit and inspectable.

GitHub Actions provided particularly strong reproducibility because the public endpoint could be tested independently of the local development environment.

### What needs work

The most important issue is the separation between public hackathon eligibility and partner-only Alexa+ add-on tooling.

The setup path led through private npm/CodeArtifact, AWS CLI, IAM and STS troubleshooting before Devpost support confirmed that Category SDK / MCP Toolkit / add-on tooling is restricted to selected Amazon partners and that general participants cannot apply for access.

A normal participant can therefore receive a technically meaningful-looking `AccessDenied` even though no IAM change can fix the underlying entitlement limitation.

A second area for improvement is an official self-hosted MCP compatibility validator. We built our own remote validator to check protocol version, Streamable HTTP, tools/list and live calls.

### Onboarding experience

The self-hosted MCP path itself was clear once isolated from the partner-only tooling path.

The confusing part was determining that the private add-on tooling was not available to general participants. Earlier entitlement disclosure would have prevented significant unnecessary npm/AWS/IAM troubleshooting.

### Would you build with these devices/services again?

**Yes.**

The MCP boundary maps especially well to deterministic clinical software because the agent can handle conversational orchestration while validated domain logic remains inspectable, reproducible and testable.

## Feature Requests

### 1. Alexa+ entitlement preflight
**Priority: Critical**

Provide a self-service page or CLI command that immediately tells a developer whether their account is eligible for partner-only Alexa+ developer tooling before npm, AWS CLI or IAM setup begins.

### 2. Partner-only marker beside install instructions
**Priority: Important**

Put the private registry and partner-entitlement requirement immediately beside every Alexa AI CLI/add-on installation instruction.

### 3. Official self-hosted MCP validator
**Priority: Nice-to-have**

Provide a public validator that checks a submitted MCP URL for Streamable HTTP compatibility, protocol version, tools/list, latency and common Alexa+ integration issues.

### 4. Separate public hackathon path from private preview tooling
**Priority: Important**

Keep the rules-compliant self-hosted MCP instructions visually separate from partner-only Alexa+ add-on tooling.

## Friction Logs

### Friction 1 — Partner-only Alexa+ tooling was not surfaced early

**Task attempted:** Install and configure the documented Alexa+ add-on / MCP Toolkit developer tooling.

**Steps taken:** Followed the setup flow through npm, AWS CLI, IAM, STS and the documented `AddOn3PDeveloperToolsRead` role.

**Expected:** A registered hackathon participant could complete the documented developer-tool setup.

**Actual:** Public npm returned 404 for the private package and AWS STS later returned `AccessDenied`. Devpost support confirmed that Category SDK / MCP Toolkit / add-on tooling is available only to selected Amazon partners and that general participants cannot apply for access.

**Severity:** Important

**Workaround:** Use the explicitly supported self-hosted MCP path: MCP 2025-11-25 over Streamable HTTP.

**Actionable suggestion:** Surface partner-only eligibility before npm/IAM instructions and provide an entitlement preflight that redirects ineligible hackathon participants to the self-hosted MCP path.

### Friction 2 — Railway resolved the wrong Git source

**Task attempted:** Deploy the reconciled hackathon candidate to an existing Railway service.

**Expected:** Deployment metadata and runtime code should match the configured branch or exact SHA.

**Actual:** Service configuration showed the intended source, but deployment snapshots repeatedly selected `main` at a different SHA.

**Severity:** Important

**Workaround:** Keep the verified production MCP endpoint for judge testing and use GitHub CI/PR state as immutable candidate evidence.

**Actionable suggestion:** Make source resolution transactional with deploy creation and fail when the resolved branch/SHA differs from configured source.

### Friction 3 — MCP Host protection caused public health-check 403s

**Task attempted:** Run the MCP Express app behind Railway's reverse proxy.

**Expected:** `GET /health` returns 200.

**Actual:** Health checks initially received 403 because localhost Host-header protection rejected the public reverse-proxy Host.

**Severity:** Important

**Workaround:** Configure `createMcpExpressApp({ host: "0.0.0.0" })` for public deployment.

**Actionable suggestion:** Document reverse-proxy/public-host configuration alongside Streamable HTTP deployment examples.

### Friction 4 — Private SIM repository authorization failed silently

**Task attempted:** Deploy the SIM IMV bridge directly from the private simulator repository on Railway.

**Expected:** Railway clones the selected repository/branch and starts deployment.

**Actual:** The service was created but no deployment occurred because the GitHub App lacked repository access.

**Severity:** Important

**Workaround:** Merge the bridge into simulator main and use the existing Vercel production deployment; the subsequent strict public MCP→SIM smoke passed.

**Actionable suggestion:** Fail service creation immediately with a direct repository-authorization action when a private repository cannot be cloned.

## Testing instructions for judges

1. Open the judge console:
   https://pedscore-ai-mcp-production.up.railway.app/judge-demo
2. Inspect the live capability manifest:
   https://pedscore-ai-mcp-production.up.railway.app/capabilities
3. Use the judge console to execute a deterministic clinical calculation.
4. Run the simulation path to start a scenario, retrieve findings and submit a triage decision.
5. Compare the returned canonical triage result/rule path with the visible MCP trace.
6. No login or credentials are required.

Technical reference:
- CI run: `35466852485` — SUCCESS
- remote MCP smoke: `35466852488` — SUCCESS
- release SHA: `46cf642c1c2005f85c4854f8fa3822ac5ac9ecd5`

## Demo video requirements

Pending human recording/upload.

Use:
- English
- public YouTube or Vimeo
- under 3 minutes
- strongest material in the first minute

Recommended narrative:
1. Problem and deterministic-AI boundary.
2. Live tool discovery + calculation.
3. Live SIM IMV multi-step agentic workflow.
4. Raw trace / deterministic proof.
5. Open-source impact and closing statement.

## Final human-only fields

Before clicking Submit:
- paste public demo-video URL;
- add final screenshots/gallery if desired;
- confirm Alexa+ primary track;
- confirm Open Source Mini Challenge;
- leave AWS Builder unchecked unless qualification changes;
- review Product Feedback and Friction Logs;
- click Submit before 23 October 2026, 12:00 PM PDT.
