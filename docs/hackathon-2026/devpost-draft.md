# Devpost draft copy

This is working copy for the final submission. It is deliberately conservative: pending integrations are not described as completed.

## Project title

**PedsCore AI — Pediatric Clinical Learning with Alexa+**

## One-line description

An open-source pediatric learning platform that lets Alexa+/agents discover clinical tools, execute deterministic scores, and interact with pediatric mass-casualty simulations without moving safety-critical logic into the language model.

## Inspiration

Clinical education increasingly benefits from conversational interfaces, but pediatric scores and emergency algorithms should not become probabilistic just because the interface is generative. PedsCore AI explores a different model: let the agent understand the learner's intent, while validated application code remains responsible for the calculation or canonical simulation decision.

## What it does

PedsCore AI exposes the existing PedsCore clinical catalog and deterministic calculator registry through MCP. A conversational client can search for an appropriate pediatric tool, retrieve its required inputs and evidence metadata, and execute supported calculations through deterministic code.

The hackathon work also extends this architecture toward SIM IMV, a pediatric mass-casualty triage simulator. The agent can start a synthetic case, retrieve learner-visible findings, and submit a triage category. The simulator's own JumpSTART / SALT / PTT / MITT engine decides whether the learner is correct and returns the canonical rule/path and teaching feedback.

## How we built it

The project uses a TypeScript monorepo with a dedicated MCP server using Streamable HTTP and MCP protocol `2025-11-25`. The MCP layer delegates clinical calculations to the existing PedsCore core package rather than reimplementing formulas.

For the simulator path, the MCP service calls a narrow HTTP bridge in SIM IMV. That bridge delegates to the simulator's existing deterministic triage engines. Remote smoke tests, protocol tests, deterministic parity tests, store-manifest validation, and explicit safety boundaries are included in the public repository.

## What changed during the hackathon

PedsCore existed before the event. The hackathon contribution adds the entire agent-access layer, MCP service, Alexa+ package, remote deployment and validation workflow, optional OAuth protection scaffold, public compliance/store endpoints, and the deterministic SIM IMV integration contracts.

The exact pre-hackathon baselines and all hackathon-specific branches/PRs are documented in the repository.

## Challenges

The largest challenge was not calculation logic but integration boundaries. We hit private-tooling access constraints, branch/source deployment surprises, public-host validation behavior, and deployment quotas. These issues are recorded in a structured friction log with reproducible symptoms and suggested improvements.

A second challenge was architectural: making a conversational experience useful without allowing the language model to silently own safety-sensitive clinical logic. The resulting design makes that boundary explicit and testable.

## Accomplishments

- public MCP server over Streamable HTTP;
- MCP `2025-11-25` negotiation;
- natural-language clinical-tool discovery;
- structured tool metadata retrieval;
- deterministic score execution;
- independent remote smoke validation;
- reproducible Apgar 9/10 round trip;
- Alexa+ manifest/store/compliance package;
- deterministic SIM IMV tool contracts and simulator bridge;
- public MIT-licensed open-source contribution.

## What we learned

Agentic interfaces become more trustworthy when deterministic domain logic is treated as a first-class dependency rather than something the model is expected to reconstruct. MCP is a useful boundary for making that separation inspectable.

## What's next

The self-hosted MCP path already satisfies the current Alexa+ primary-track technology requirement. Next we will publish the SIM IMV bridge, run the full public MCP→SIM smoke, and capture the strongest possible demo evidence. Devpost support has confirmed that the private Alexa+ add-on tooling is partner-only, so the submission intentionally uses the rules-compliant self-hosted MCP path rather than presenting unavailable partner tooling as a dependency.

## Open Source Mini Challenge

Primary contribution:
https://github.com/sferurek/PedsCore/pull/91

Repository:
https://github.com/sferurek/PedsCore

The reusable contribution is the deterministic agent boundary: natural-language orchestration over MCP with clinical calculations and simulation decisions executed by testable domain code.

## AWS Builder Mini Challenge

Do **not** submit this section unless a useful AWS integration is actually deployed and documented before final submission.


## Testing link

Judge console:
https://pedscore-ai-mcp-production.up.railway.app/judge-demo

Capability manifest:
https://pedscore-ai-mcp-production.up.railway.app/capabilities

MCP endpoint:
https://pedscore-ai-mcp-production.up.railway.app/mcp

The judge console is a browser verification surface that performs real MCP `tools/call` requests against the public service. It is not presented as the official Alexa+ simulator.
