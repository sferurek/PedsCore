# Final manual-action checklist

Everything in this file is intentionally limited to actions that cannot be completed safely or legitimately without the developer/submitter.

## Required before final submission

- [ ] Record the final demo video in English, under 3 minutes.
- [ ] Upload the video publicly to YouTube or Vimeo.
- [ ] Paste the final video URL into Devpost.
- [ ] Review the final Devpost text/track selections and click the final Submit button.
- [ ] Confirm the project remains publicly accessible to judges for the judging period.

## Manual actions that unlock additional evidence

- [ ] **One technical authorization remains if you want the full public SIM demo:** authorize the private `sferurek/pedscore-triage-sim` repository for the Railway GitHub App, or wait for the Vercel deployment quota to reopen. In Railway: open the `pedscore-triage-sim-hackathon` service → Settings → Source → reconnect GitHub / configure GitHub App access → grant access to `sferurek/pedscore-triage-sim`. Keep the selected branch as `hackathon/alexa-sim`; do not deploy `main`.
- [ ] If Janet/Amazon grants Alexa AI developer-tools entitlement, run the official Alexa AI CLI flow and capture Add-on ID/version plus official simulator evidence.

These two items improve the demo but are **not prerequisites for primary Alexa+ eligibility**, because the official rules accept the working self-hosted MCP server over Streamable HTTP. The public PedsCore MCP path is already live and independently smoke-tested.

## Optional

- [ ] Request the $150 AWS Promotional Credits by October 21 at 12:00 PM PT if useful.
- [ ] Add a meaningful deployed AWS integration only if entering the AWS Builder Mini Challenge.
- [ ] Capture extra screenshots for the Devpost image gallery.

## Security

- Never paste AWS secret access keys, temporary tokens, CodeArtifact tokens, or other credentials into Devpost, GitHub, screenshots, or chat.


## Already completed without submitter action

- Public self-hosted MCP deployed from the hackathon branch.
- Six MCP tools verified live.
- MCP `2025-11-25` and Streamable HTTP verified remotely.
- Live judge console and capability manifest verified remotely.
- Deterministic Apgar 9/10 verified remotely.
- SIM bridge production-server smoke verified in CI.
- Open Source contribution evidence packaged.
- Devpost narrative, product feedback, feature requests, friction log, judging map, and final English video script drafted.
