# Product feedback draft

Working material for the required Devpost product-feedback section.

## MCP / Alexa+ developer experience

### What was used

PedsCore AI uses a self-hosted MCP server over Streamable HTTP and negotiates MCP protocol version `2025-11-25`. The server exposes deterministic pediatric clinical-tool discovery/calculation plus SIM IMV integration contracts.

### What worked well

The self-hosted MCP route is a strong fit for existing domain software because it allows the conversational layer to stay thin while preserving deterministic clinical logic behind explicit tools. Streamable HTTP made it straightforward to deploy the server independently and validate it from external CI.

The hackathon rules also clearly recognize self-hosted MCP as a first-class Alexa+ submission path, which is valuable for developers who already have a domain backend.

### What could improve

The onboarding story becomes confusing when public hackathon eligibility and private Alexa AI CLI tooling are mixed together. A clean developer can reasonably try `npm install -g @alexa-ai/cli` against public npm and receive a 404 before discovering the private CodeArtifact prerequisite.

After configuring AWS correctly, the private `AddOn3PDeveloperToolsRead` role may still reject the developer with `AccessDenied` if the AWS account has not been entitled on Amazon's side. The current failure does not clearly explain that this is an allowlisting/trust issue or provide a self-service remediation path.

### Suggested improvements

- Put the private CodeArtifact prerequisite directly beside every Alexa AI CLI install command.
- Provide a preflight entitlement command/page that says whether an AWS account can assume the developer-tools role.
- Return an actionable onboarding URL when entitlement is missing.
- Clearly separate “required for self-hosted MCP hackathon eligibility” from “optional/private-preview Alexa add-on tooling.”

### Would we build with it again?

Yes. The MCP boundary maps especially well to deterministic clinical software because domain calculations can remain inspectable and testable while the agent handles natural-language orchestration.

## AWS

AWS CLI and STS were used during Alexa AI CLI onboarding diagnostics. An optional Cognito-compatible OAuth protection path and CloudFormation template were also implemented, but no live Cognito deployment should be claimed unless provisioned before submission.

The AWS source-profile setup behaved predictably. The main friction was not AWS authentication itself; it was the trust/entitlement boundary for Amazon's private Alexa developer-tools role.

## Open source

The public MIT-licensed contribution model works well for this project because the hackathon additions can be audited against immutable pre-hackathon baselines. Keeping the agent interface, deterministic execution boundary, tests, and evidence in the public repository makes the submission reproducible rather than demo-only.
