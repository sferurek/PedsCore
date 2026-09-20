# Hackathon architecture

## Goal

Create an Alexa+ powered pediatric clinical learning experience that can invoke deterministic PedsCore capabilities through MCP and extend into interactive pediatric emergency and mass-casualty simulation.

## Target architecture

```text
Alexa+ / agent experience
        |
        v
MCP server / integration layer
        |
        +--> PedsCore clinical catalog and deterministic calculators
        |
        +--> PedsCore Triage Simulator
              - scenario start
              - patient findings
              - triage decisions
              - debriefing / educational feedback
```

## Design principles

1. Natural-language interpretation belongs in the conversational/agent layer.
2. Clinical calculations remain deterministic, inspectable, and testable.
3. Simulation rules remain controlled by the simulator, not generated ad hoc by the language model.
4. The MCP layer should expose reusable, well-defined tools rather than a generic chatbot wrapper.
5. Safety boundaries must be explicit: the experience is educational and must not present generative output as a substitute for professional clinical judgment.

## Initial MCP tool candidates

- `search_clinical_tools`
- `get_clinical_tool`
- `calculate_clinical_score`
- `start_simulation`
- `submit_simulation_decision`

These names are provisional until the first implementation spike validates the contracts.

## Milestones

### M1 — PedsCore MCP proof of concept
A working MCP server can discover at least one real PedsCore tool and execute at least one deterministic clinical calculation with output matching the web application.

### M2 — Alexa+ → MCP → PedsCore
Alexa+ can invoke the MCP tools in a reproducible end-to-end flow.

### M3 — Alexa+ → MCP → SIM IMV
The agent can start a simulation, progress through a patient interaction, submit a triage decision, and receive structured educational feedback.

### M4 — AWS Builder integration
Add a documented AWS integration that has a real architectural purpose and qualifies the project for the AWS Builder Mini Challenge.

### M5 — Open Source contribution
Publish a meaningful reusable contribution created during the hackathon window, with tests and documentation, suitable for the Open Source Mini Challenge.
