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
