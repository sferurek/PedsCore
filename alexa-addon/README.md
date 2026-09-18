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

## First Alexa AI CLI deployment

Amazon currently documents Node.js 24+ for Alexa AI CLI.

```bash
node --version
npm install -g @alexa-ai/cli
alexa-ai --version
alexa-ai configure
cd alexa-addon
alexa-ai deploy
```

`alexa-ai configure` opens Login with Amazon and stores CLI credentials locally. This is the first step that requires the developer's interactive Amazon authentication.

After deployment, record the returned Add-on ID and version, then test in the Alexa+ web simulator.

## Validation before deploy

The remote CI smoke test verifies the live MCP protocol, deterministic Apgar calculation, compliance pages, six required icon endpoints, and the 600x900 carousel PNG.

Current production deployment and external smoke are green.
