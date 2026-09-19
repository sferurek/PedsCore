# Official hackathon rules snapshot

Verified against the current Devpost rules/resources on 2026-09-18.

Sources:
- https://amazonappdev2026.devpost.com/rules
- https://amazonappdev2026.devpost.com/
- https://amazonappdev2026.devpost.com/resources

## Deadline

Final submission deadline: **October 23, 2026 at 12:00 PM PDT**.

Judging period: November 9–20, 2026.

## Alexa+ eligibility path

The Alexa+ primary track explicitly accepts either:

1. a working Agent Skill; or
2. a **self-hosted MCP server** using MCP **2025-11-25 or later** over **Streamable HTTP**.

A simulated Alexa+ web experience is also allowed as an alternative path.

This means the official private Alexa AI CLI / add-on deployment is useful additional evidence, but it is **not required** for a valid self-hosted MCP submission.

PedsCore already satisfies the core primary-track technology requirement through its public self-hosted MCP server.

## Repository requirement

The code repository must contain the source, assets, and instructions required to run the project.

For public repositories:
- an open-source license must be included and visible/detectable;
- the required track technology must be used at runtime in code, not merely mentioned in documentation.

PedsCore is public and MIT-licensed, and the MCP server is implemented and invoked at runtime.

## Demo video

- YouTube or Vimeo
- public
- English
- under 3 minutes
- judges are not required to watch past 3 minutes

The video should therefore lead with the deterministic MCP value proposition and use SIM IMV as the strongest closing demonstration if the remote bridge is available.

## Existing project requirement

Because PedsCore existed before the hackathon, the submission must clearly identify what was significantly updated during the submission window.

The repository contains immutable pre-hackathon baseline SHAs plus isolated hackathon branches and PRs for this purpose.

## Open Source Mini Challenge

A public contribution made during the hackathon window qualifies. A PR does not need to be merged.

Required final fields include:
- contribution URL;
- repository URL;
- GitHub username;
- description of what changed, how it works, and why it matters.

PedsCore PR #43 is the primary contribution.

## AWS Builder Mini Challenge

A primary-track project must incorporate AWS services with documented integrations.

Do not claim this challenge unless an actual useful AWS integration is deployed and documented before submission.

## Feedback and friction

Product feedback is required for tools/APIs/SDKs used.

Feature requests are optional.

Friction logs are optional but can earn up to a **10% judging bonus**, so the structured friction log should be included.

## AWS promotional credits

Registered participants may request **$150 AWS Promotional Credits** while supplies last.

The current rules state the request form deadline is **October 21 at 12:00 PM PT**.

This is optional for the Alexa+/Open Source path.
