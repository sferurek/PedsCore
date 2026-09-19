# Alexa AI CLI setup — partner-only reference

> **Confirmed access status (Devpost support, 18 September 2026):** Alexa+ Category SDK / MCP Toolkit / add-on developer tools are available only to selected Amazon partners, with no application path for general hackathon participants. This document is retained solely as a technical record of the investigated partner workflow. It is **not** part of the PedsCore submission critical path.

PedsCore uses the accepted self-hosted MCP route: MCP `2025-11-25` over Streamable HTTP.

The steps below describe the partner-only setup path that was investigated before the restriction was confirmed.

## Prerequisites

- Node.js 24+
- AWS CLI v2
- The AWS account that was provided to the Alexa Solutions Architect / Alexa+ private-preview onboarding
- An IAM user in that account with programmatic credentials and permission to assume:
  `arn:aws:iam::372468808636:role/AddOn3PDeveloperToolsRead`

Do not commit AWS keys, CodeArtifact tokens, or `~/.alexa-ai/credentials`.

## 1. Verify local tools

```bash
node --version
aws --version
```

## 2. Configure the base AWS profile

```bash
aws configure --profile alexa-ai-user
```

Enter the IAM user's Access Key ID and Secret Access Key. Region/output can be left blank.

## 3. Configure the Alexa AI assumed-role profile

```bash
aws configure set profile.alexa-ai.role_arn arn:aws:iam::372468808636:role/AddOn3PDeveloperToolsRead
aws configure set profile.alexa-ai.source_profile alexa-ai-user
aws configure set profile.alexa-ai.region us-west-2
```

Verify:

```bash
aws sts get-caller-identity --profile alexa-ai
```

The returned ARN should be an assumed role in Amazon account `372468808636`.

## 4. Authenticate npm to the private Alexa AI CodeArtifact registry

```bash
aws codeartifact login \
  --tool npm \
  --domain alexa-ai \
  --repository npm-packages \
  --domain-owner 372468808636 \
  --region us-west-2 \
  --namespace @alexa-ai \
  --profile alexa-ai
```

The CodeArtifact token is temporary; repeat this step if npm authentication later expires.

## 5. Install and authenticate Alexa AI CLI

```bash
npm install -g @alexa-ai/cli
alexa-ai --version
alexa-ai configure
```

`alexa-ai configure` opens Login with Amazon and stores Alexa CLI credentials locally.

## 6. Deploy PedsCore AI

From the PedsCore repository:

```bash
cd alexa-addon
alexa-ai deploy
```

On success, capture:

- Add-on ID
- deployed version
- development-stage status
- any CLI warnings
- Developer Hub / simulator link if printed

## Common failure signatures

### npm E404 for `@alexa-ai/cli`

Cause: npm is still pointing at the public registry for the `@alexa-ai` scope.

Action: repeat the CodeArtifact login step.

### `AccessDenied` / `sts:AssumeRole`

Cause for a general hackathon participant: the Amazon-side role is partner-restricted.

Action: do not continue IAM troubleshooting unless Amazon has explicitly confirmed that the account belongs to the selected partner cohort. Use the self-hosted MCP track path instead.

### `alexa-ai: command not found`

Cause: CLI installation did not complete successfully or the global npm bin directory is not on `PATH`.

Action: fix the preceding npm installation error first; do not proceed to deploy until `alexa-ai --version` works.
