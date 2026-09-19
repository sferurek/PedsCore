# AWS Builder Mini Challenge decision

Snapshot: 2026-09-19.

## Decision

**Do not claim the AWS Builder Mini Challenge in the current PedsCore AI submission.**

The current official hackathon rules require the primary-track project to incorporate an AWS service or qualifying AWS development tool with a documented integration. Kiro Crew can qualify on its own when it is actually used during the hackathon.

## What PedsCore currently has

- an AWS account and working AWS CLI/source-profile setup used while investigating Alexa+ private tooling;
- optional Cognito/OAuth infrastructure-as-code in `infra/aws/cognito-alexa-mcp.yaml`;
- MCP authentication scaffolding capable of supporting a future OAuth deployment.

## What PedsCore does **not** currently have

- a provisioned Cognito integration used by the live submission;
- a runtime Bedrock / AgentCore / SageMaker / Strands integration;
- documented Kiro Crew usage in the development workflow.

AWS CLI / STS troubleshooting and undeployed infrastructure scaffolding are not enough evidence to claim the mini challenge.

## Rationale

Adding a decorative AWS call solely to satisfy a checkbox would weaken the architecture and the submission story. The current Alexa+ and Open Source paths are already technically complete and independently verifiable.

## Re-open this decision only if

Before final Devpost submission, one of the following becomes true and is documented with reproducible evidence:

1. Kiro Crew is genuinely used for a material hackathon development task; or
2. a useful AWS runtime service is deployed and participates in the product flow.

Until then the Devpost AWS Builder checkbox should remain **unchecked**.
