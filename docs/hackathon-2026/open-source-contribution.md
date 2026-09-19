# Open Source Mini Challenge contribution

## Contribution URL

Primary contribution:
- https://github.com/sferurek/PedsCore/pull/91

Repository:
- https://github.com/sferurek/PedsCore

GitHub username:
- `sferurek`

## What was contributed

During the hackathon, PedsCore gained a new agent-access layer and MCP service that did not exist in the recorded baseline.

The contribution includes an agent-safe clinical adapter, deterministic calculator boundary, Streamable HTTP MCP server, protocol `2025-11-25`, remote reproducibility tests, Alexa+ packaging, optional bearer/OAuth protection path, and integration documentation.

The public MCP surface now contains two classes of tools:

### Deterministic clinical tools
- `search_clinical_tools`
- `get_clinical_tool`
- `calculate_clinical_score`

### Deterministic simulation contracts
- `start_simulation_case`
- `get_patient_findings`
- `submit_triage_decision`

The SIM contracts deliberately do not let a language model decide the correct triage classification. They call the simulator bridge, whose JumpSTART / SALT / PTT / MITT engine owns the canonical answer and teaching feedback.

## Reusable architectural pattern

```text
Agent / conversational UI
          |
          v
      MCP tools
          |
          v
Agent-safe adapter
          |
          +----> deterministic clinical calculators
          |
          +----> deterministic simulation engine
```

The reusable idea is the boundary: natural-language orchestration can be flexible, but validated formulas and algorithmic decisions remain deterministic, inspectable, testable, and referenceable.

## Reproducibility

The contribution includes:
- local protocol integration tests;
- deterministic calculator parity tests;
- remote public MCP smoke tests;
- manifest validation;
- live media/compliance endpoint validation;
- simulator bridge unit/HTTP tests;
- a remote deterministic SIM smoke script ready to run once the private simulator repository is deployable.

## Why it matters

Clinical and educational software frequently contains formulas, validated rules, references, and safety constraints that should not be silently reimplemented probabilistically by a model. This contribution demonstrates a concrete open-source way to make those systems agent-accessible while preserving their execution boundary.

## License

The contribution is part of the public PedsCore repository under the MIT License.
