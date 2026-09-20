# Final rules check — 20 September 2026

Source checked: official Amazon Developer Hackathon Devpost overview and rules.

## Current submission requirements relevant to PedsCore AI

- Deadline shown by Devpost: **23 October 2026 at 12:00 PM PDT**.
- Primary track: **Alexa+**.
- Accepted Alexa+ implementation: a working Agent Skill or a **self-hosted MCP server**.
- MCP minimum specification: **2025-11-25**.
- Required MCP transport: **Streamable HTTP**.
- The repository must call/use the required track technology at runtime, not merely mention it in documentation.
- Repository may be public and open source, or private with the specified judging access. PedsCore uses the public/open-source route.
- Demo video: **under 3 minutes**, public on **YouTube or Vimeo**, and **in English**.
- Judges are not required to watch beyond three minutes; strongest material should appear early.
- Product feedback is required for tools/APIs/SDKs used.
- Existing projects must clearly explain what was significantly changed during the submission window.
- Feature requests are optional.
- Friction logs are optional and can add **up to a 10% judging bonus**.
- Open Source Mini Challenge requires a public open-source contribution made during the hackathon window plus contribution URL, repository URL, GitHub username, and description.

## PedsCore AI alignment

- Self-hosted MCP: **verified**.
- Protocol: **2025-11-25**, verified in RC3 remote smoke.
- Streamable HTTP: **verified**.
- Runtime technology hook: MCP server and tool registration are present in executable code.
- Public repository: **yes**.
- MIT license: **yes**.
- Existing-project delta: documented through immutable pre-hackathon baseline and PR #105.
- Open Source contribution: PR #105.
- Demo video: **human action still required**.
- Product feedback: prepared.
- Friction log: prepared.
- AWS Builder: intentionally not claimed without a qualifying deployed/material integration.

## Frozen technical evidence

- RC3 SHA: `fa26c90b1bbf12b422b0cf2990e0c6743f4acb0b`
- Release branch: `release/amazon-hackathon-2026-rc3`
- Canonical contribution PR: #105
- CI: `35479718827` — SUCCESS
- Remote MCP smoke: `35479718824` — SUCCESS

## Official source

https://amazonappdev2026.devpost.com/
