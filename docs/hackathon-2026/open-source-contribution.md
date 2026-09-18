# Open Source Mini Challenge contribution

## Contribution URL

Primary hackathon contribution:

- https://github.com/sferurek/PedsCore/pull/43

Repository:

- https://github.com/sferurek/PedsCore

GitHub username:

- `sferurek`

## What was contributed

During the hackathon workstream, PedsCore gained a new agent-access layer and remote MCP service that did not exist in the recorded baseline.

The contribution includes:

1. **Agent-safe clinical adapter**
   - searches the existing clinical catalog
   - returns structured tool metadata and input schemas
   - exposes evidence and safety metadata without leaking UI implementation details

2. **Deterministic calculation boundary**
   - agent orchestration is separated from clinical computation
   - calculations delegate to the existing PedsCore calculator registry
   - the language model does not invent score arithmetic

3. **MCP server**
   - Streamable HTTP transport
   - protocol `2025-11-25`
   - `search_clinical_tools`
   - `get_clinical_tool`
   - `calculate_clinical_score`

4. **Testing and reproducibility**
   - local protocol integration tests
   - live remote smoke tests
   - calculator parity test using Apgar
   - manifest validation
   - public store/compliance asset validation

5. **Reusable security path**
   - optional Bearer-token middleware
   - RFC 9728 Protected Resource Metadata
   - Cognito-compatible JWT validation
   - CloudFormation template for an OAuth authorization-code / resource-server setup

6. **Developer documentation**
   - architecture notes
   - Alexa+ readiness matrix
   - friction log
   - simulator test plan
   - reproducible demo script

## How it works

The agent layer receives natural-language intent and invokes MCP tools. Those tools call the reusable PedsCore core package rather than duplicating clinical logic. Clinical calculations stay deterministic and testable.

This produces a reusable architectural pattern:

```text
Agent / conversational UI
          |
          v
      MCP tools
          |
          v
Agent-safe adapter
          |
          v
Deterministic domain logic
```

The pattern is useful beyond PedsCore because it demonstrates how an AI-facing tool surface can remain flexible while keeping safety-critical calculations outside the generative model.

## Why it matters

Clinical and educational software often contains deterministic formulas, validated rules, references, and safety constraints that should not be reimplemented probabilistically by a language model.

This contribution provides a concrete open-source pattern for combining:

- natural-language orchestration
- inspectable tool contracts
- deterministic computation
- evidence metadata
- protocol-level testing
- remote reproducibility

The goal is not to turn a clinical calculator into a chatbot. The goal is to make deterministic clinical software accessible to agentic interfaces without surrendering its execution boundary.

## License

The contribution is part of the public PedsCore repository under the repository's MIT License.
