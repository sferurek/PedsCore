# Alexa+ MCP add-on package

This directory now contains a deployment-ready Alexa+ MCP Toolkit manifest for the PedsCore AI hackathon workstream.

## Live integration

- MCP endpoint: `https://pedscore-ai-mcp-production.up.railway.app/mcp`
- Privacy policy: `https://pedscore-ai-mcp-production.up.railway.app/privacy`
- Terms of use: `https://pedscore-ai-mcp-production.up.railway.app/terms`
- Required light-theme icons: hosted under `/store-assets/icon-<size>x<size>.png`
- Required carousel image: `/store-assets/carousel-1.png`

The canonical manifest is `addon-package/addon.json`. The template is intentionally kept in sync with the same values.

## Account linking decision

The current PedsCore AI Alexa+ experience is read-only, does not use a PedsCore customer account, does not access user-specific data, and performs the same tool discovery and deterministic calculations for every user.

For this initial hackathon integration, account linking is therefore intentionally **disabled**. The repository retains the optional Cognito/OAuth implementation path for a future stage if personalized or write-capable functionality is introduced.

## Partner-only Alexa add-on tooling

The manifest is retained as reproducible packaging and as evidence of the intended Alexa+ surface. Devpost support confirmed on 18 September 2026 that the Alexa+ Category SDK / MCP Toolkit / add-on developer tools are available only to selected Amazon partners, with no application path for general hackathon participants.

Therefore this repository does **not** treat Alexa AI CLI installation, private CodeArtifact access, an Add-on ID, or the official Alexa+ simulator as requirements for this submission. The canonical track implementation is the rules-compliant self-hosted MCP server.

Do not interpret an `AccessDenied` for `AddOn3PDeveloperToolsRead` as a local IAM configuration problem for a general participant.

## Validation before submission

The remote CI smoke test verifies the live MCP protocol, deterministic Apgar calculation, compliance pages, six required icon endpoints, and the 600x900 carousel PNG.

Current production deployment and external smoke are green.
