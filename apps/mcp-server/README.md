# PedsCore AI MCP Server

Hackathon-specific MCP server for **PedsCore AI — Pediatric Clinical Learning with Alexa+**.

## Transport

- MCP Streamable HTTP
- Endpoint: `POST /mcp`
- Health check: `GET /health`
- Stateless request handling
- Built with the official TypeScript MCP SDK

The selected SDK line supports the MCP 2025-era Streamable HTTP protocol, including the `2025-11-25` specification required by the Amazon Alexa+ hackathon track.

## Initial tools

### `search_clinical_tools`
Searches the PedsCore clinical catalog and discovery taxonomy.

### `get_clinical_tool`
Returns structured metadata, required inputs, references, and safety metadata.

### `calculate_clinical_score`
Executes the existing deterministic PedsCore calculator registry. The LLM does not calculate the score itself.

## Development

From the repository root:

```bash
npm install
npm run build
npm run dev:mcp
```

Default local endpoint:

```text
http://localhost:3001/mcp
```

## Safety boundary

This service is an educational and integration layer. Natural-language orchestration may select and invoke tools, but clinical calculations remain deterministic and are performed by PedsCore core logic.
