# Product feedback draft

Working material for the required Devpost product-feedback section.

## MCP / Alexa+ developer experience

### What was used

PedsCore AI uses a self-hosted MCP server over Streamable HTTP and negotiates MCP protocol version `2025-11-25`. The server exposes deterministic pediatric clinical-tool discovery/calculation plus SIM IMV integration contracts.

### What worked well

The self-hosted MCP route is a strong fit for existing domain software because it allows the conversational layer to stay thin while preserving deterministic clinical logic behind explicit tools. Streamable HTTP made it straightforward to deploy the server independently and validate it from external CI.

The hackathon rules also clearly recognize self-hosted MCP as a first-class Alexa+ submission path, which is valuable for developers who already have a domain backend.

### What could improve

The largest onboarding issue is the separation between public hackathon eligibility and private partner-only Alexa+ add-on tooling. During setup, the public documentation path led us through npm, CodeArtifact, AWS CLI, IAM and STS troubleshooting before Devpost support confirmed that Category SDK and MCP Toolkit / add-on tooling are restricted to selected Amazon partners and that general participants cannot apply for access.

The resulting `AccessDenied` is therefore not an IAM misconfiguration and cannot be remediated by a normal participant. The self-hosted MCP path works independently and is sufficient for the Alexa+ track, but that distinction should be visible before developers begin private-tool setup.

### Suggested improvements

- Put the private CodeArtifact prerequisite directly beside every Alexa AI CLI install command.
- Mark partner-only tooling explicitly before installation or IAM steps begin.
- Provide a preflight entitlement check that immediately identifies accounts without partner access and directs hackathon participants to the self-hosted MCP route.
- Clearly separate “required for self-hosted MCP hackathon eligibility” from “optional/private-preview Alexa add-on tooling.”

### Would we build with it again?

Yes. The MCP boundary maps especially well to deterministic clinical software because domain calculations can remain inspectable and testable while the agent handles natural-language orchestration.

## AWS

AWS CLI and STS were used during Alexa AI CLI onboarding diagnostics. An optional Cognito-compatible OAuth protection path and CloudFormation template were also implemented, but no live Cognito deployment should be claimed unless provisioned before submission.

The AWS source-profile setup behaved predictably. The main friction was not AWS authentication itself; it was the trust/entitlement boundary for Amazon's private Alexa developer-tools role.

## Open source

The public MIT-licensed contribution model works well for this project because the hackathon additions can be audited against immutable pre-hackathon baselines. Keeping the agent interface, deterministic execution boundary, tests, and evidence in the public repository makes the submission reproducible rather than demo-only.


## MCP TypeScript SDK

### What worked well

The SDK made the Streamable HTTP contract and tool registration explicit and testable. Protocol negotiation, tool listing and structured tool calls could be covered with ordinary automated integration tests, which fits deterministic domain software well.

### What could improve

The default localhost-oriented Host protection produced 403 responses when the Express app was placed behind Railway's public reverse proxy. The fix was to configure the MCP Express app for a public bind/host explicitly.

### Suggested improvement

Document public reverse-proxy deployment beside the Streamable HTTP example, including trusted Host/bind configuration and a minimal health-check pattern.

## Railway

### What worked well

Railway provided a simple public HTTPS deployment target for the self-hosted MCP service and has been stable for judge-facing health, MCP, compliance, media and judge-demo endpoints.

### What could improve

Two deployment issues consumed disproportionate time: source branch/SHA resolution did not always match the staged service configuration, and a private-repository service could be created without immediately surfacing that the GitHub App lacked repository authorization.

### Suggested improvements

- Show the resolved Git commit before a deployment starts and fail if it differs from an explicitly requested SHA.
- Detect inaccessible private repositories during service creation and provide the repository-authorization action immediately.

## Vercel

### What worked well

The existing SIM IMV Vercel deployment made it possible to expose the narrow deterministic simulator bridge without moving the simulator into the MCP service. Git-based production deployment and the public HTTPS endpoint were straightforward to validate from external CI.

### What could improve

For judge-facing integrations, deployment provenance should stay easy to map from the public endpoint back to the exact Git commit used for the deterministic backend.

### Suggested improvement

Keep commit/deployment provenance prominent in deployment metadata and API-accessible verification surfaces, particularly when one deployed service is an upstream dependency of another.
