# Run the submission without Railway

The official [hackathon FAQ](https://amazonappdev2026.devpost.com/details/faqs) permits a locally runnable repository and demo video; paid hosting is not required. This guide preserves the real MCP implementation and judge console. It does not deploy anything or require Railway credentials.

## Requirements

- Node.js 24 LTS and npm; Git; internet for the initial dependency installation.
- A clone of this public repository. Run all commands from its root.

```sh
git clone https://github.com/sferurek/PedsCore.git
cd PedsCore
npm ci
npm run hackathon:local -- --with-sim
```

Open http://127.0.0.1:3001/judge-demo. The command builds only core and MCP locally, not the production website, and binds to loopback. Stop with Ctrl+C. No account, API key, paid AI provider, or Railway service is needed.

The three clinical tools execute locally. The three SIM tools use the existing public synthetic simulator at https://pedscore-triage-sim.vercel.app/api/hackathon/sim. This is Railway-independent, **not fully offline**. If SIM is unavailable, the server reports the error without fabricating a result. Running without `--with-sim` leaves SIM unconfigured unless `SIM_IMV_API_URL` is already set.

Optional: reviewers with authorized access to the separate SIM IMV repository can run that application locally and set `SIM_IMV_API_URL` to its `/api/hackathon/sim` route. This public repository does not contain that separate implementation or grant access to it. Do not imply the full SIM source is publicly reproducible until its availability has been confirmed.

## Local automated tests

```sh
npm run test:mcp
```

This separate test command includes the MCP tests; the general web/core test configuration does not include them.

## Verify all six tools

With the server running, in another terminal:

```sh
npm run hackathon:smoke:remote -- http://127.0.0.1:3001
```

Despite its historical name, the smoke command accepts a local base URL. It verifies protocol negotiation, all six tools, judge pages, store assets, Apgar 9/10, and the synthetic school-bus JumpSTART decision. A successful report has `assertionsPassed: true`. Full success requires the SIM bridge; a clinical-only run is not evidence of all six tools working.

## Submission and video

Use the public repository and this guide as the reproducibility link. Replace Railway testing links in the submitted form with this guide, rather than a localhost URL (localhost only works after the reviewer starts their own copy). Record the local judge console and show real calls and traces; do not describe prerecorded output as a live Alexa deployment. Keep the published video accessible to judges. The video is still pending recording/upload; these instructions are not a completed video.

Before final submission, re-check the official rules and FAQ, provide any required access to supplementary SIM material, and update every submitted link. Historical Railway smoke evidence can remain labeled with its date, but is not a promise that the old endpoint stays online.
