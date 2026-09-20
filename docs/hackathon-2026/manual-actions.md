# Final manual-action checklist

**Frozen technical candidate:** RC3 `fa26c90b1bbf12b422b0cf2990e0c6743f4acb0b`  
**Release branch:** `release/amazon-hackathon-2026-rc3`  
**Canonical contribution PR:** #105  
**CI:** `35479718827` — SUCCESS  
**Remote MCP smoke:** `35479718824` — SUCCESS


Everything in this file is intentionally limited to actions that cannot be completed safely or legitimately without the developer/submitter.

## Required before final submission

- [ ] Record the final demo video in English, under 3 minutes.
- [ ] Upload the video publicly to YouTube or Vimeo.
- [ ] Paste the final video URL into Devpost.
- [ ] Review the final Devpost text/track selections and click the final Submit button.
- [ ] Confirm the project remains publicly accessible to judges for the judging period.

## Remaining optional manual actions

There is no longer a manual authorization required for the SIM bridge: SIM PR #25 is merged, Vercel production deployment is green, the MCP service is configured to use it, and strict public MCP→SIM smoke has passed.

The partner-only Alexa AI add-on tooling cannot be unlocked by a general hackathon participant; do not spend additional time troubleshooting IAM unless Amazon explicitly changes the account's partner entitlement.

## Optional

- [ ] Request the $150 AWS Promotional Credits by October 21 at 12:00 PM PT if useful.
- [ ] Re-open AWS Builder only if you genuinely use Kiro Crew for a material development task or deploy a useful AWS integration; otherwise leave the mini-challenge unchecked.
- [ ] Capture extra screenshots for the Devpost image gallery.

## Security

- Never paste AWS secret access keys, temporary tokens, CodeArtifact tokens, or other credentials into Devpost, GitHub, screenshots, or chat.


## Already completed without submitter action

- Public self-hosted MCP deployed from the hackathon branch.
- Six MCP tools verified live.
- MCP `2025-11-25` and Streamable HTTP verified remotely.
- Live judge console and capability manifest verified remotely.
- Deterministic Apgar 9/10 verified remotely.
- SIM bridge merged and deployed on Vercel.
- Strict public MCP→SIM E2E smoke verified: `school-bus` / patient `01` / GREEN / `JS-MOB-01`.
- Open Source contribution evidence packaged.
- Devpost narrative, product feedback, feature requests, friction log, judging map, and final English video script drafted.
