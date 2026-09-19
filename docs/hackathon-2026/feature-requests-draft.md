# Feature request draft

Optional material for the Devpost feature-request section.

## 1. Alexa AI CLI entitlement preflight

**Priority:** Critical

**Request:** Add a self-service page or CLI command that tells a developer whether their AWS account is authorized to assume the private Alexa developer-tools role before they create credentials and configure profiles.

**Why:** A valid AWS source profile can still receive `AccessDenied` from `AddOn3PDeveloperToolsRead`, and the error does not distinguish local IAM misconfiguration from missing Amazon-side entitlement.

**Suggested UX:** show account ID, entitlement state, exact missing prerequisite, and a one-click/request-access path.

## 2. Private registry requirement beside every CLI install command

**Priority:** Important

**Request:** Put the CodeArtifact authentication prerequisite immediately next to every `npm install -g @alexa-ai/cli` instruction.

**Why:** On a clean machine, following the install command against public npm yields an expected-looking but confusing 404.

## 3. Self-hosted MCP verification tool

**Priority:** Nice-to-have

**Request:** Provide an official public validator where developers can paste an MCP URL and receive a report covering Streamable HTTP, protocol version, tools/list, latency, and common Alexa+ compatibility issues.

**Why:** We built this validation ourselves in GitHub Actions. A standardized validator would reduce onboarding ambiguity and make submissions more reproducible.

## 4. Clear separation of required vs preview-only tooling

**Priority:** Important

**Request:** Keep hackathon eligibility instructions for the self-hosted MCP path visibly separate from private-preview Alexa AI CLI/add-on instructions.

**Why:** The official rules accept a self-hosted MCP server, while private CLI entitlement can require separate onboarding. Mixing the paths makes a blocked optional integration feel like a blocked submission.
