# Final demo video script

Target runtime: **2:35–2:45**. English. Keep the final upload under 3 minutes.

## 0:00–0:12 — Hook

**Visual:** PedsCore AI judge console, then one fast cut to a pediatric clinical tool.

**Narration:**

> Clinical AI can be conversational without making clinical logic probabilistic. PedsCore AI lets the agent understand the question, while deterministic code keeps the pediatric calculation.

## 0:12–0:28 — Architecture

**Visual:** architecture diagram: Agent → MCP → PedsCore / SIM IMV.

**Narration:**

> I built a self-hosted MCP server using Streamable HTTP and MCP 2025-11-25. The model orchestrates. PedsCore and SIM IMV own the clinical logic.

On-screen text:
**The model orchestrates. It does not invent the score.**

## 0:28–0:50 — Discovery

**Visual:** judge console → Discovery → run live MCP call → show trace briefly.

Prompt:
> Find a pediatric score for assessing croup severity.

**Narration:**

> First, the agent can discover the right pediatric tool from natural language. The result comes from PedsCore's real clinical catalog, not from a generated list.

## 0:50–1:18 — Deterministic calculation

**Visual:** Apgar card → run call → 9/10 → raw MCP trace / CI evidence.

**Narration:**

> Now Apgar. At five minutes: heart rate two, respiration two, tone two, reflex two, and color one. The answer is nine out of ten. That arithmetic is executed by the existing PedsCore calculator registry, and the same input returns the same result in tests, remote smoke, and the live MCP service.

## 1:18–1:48 — SIM IMV wow moment

Use the public SIM flow if it is available by recording day. Otherwise use the verified production-CI trace and clearly label it as simulator integration evidence.

**Visual:** school-bus scenario → patient 01 → JumpSTART decision → deterministic feedback.

**Narration:**

> The same boundary extends into pediatric mass-casualty training. I can start a synthetic school-bus scenario, inspect a patient, and submit a JumpSTART triage decision. The language model does not decide whether I am right. The simulator's real algorithm returns GREEN, rule JS-MOB-01, the canonical path, and teaching feedback.

## 1:48–2:08 — Reproducibility

**Visual:** GitHub PR #43, CI green, remote smoke, MIT license, PR #25.

**Narration:**

> This is not a demo-only backend. The public repository contains protocol tests, remote smoke tests, deterministic parity checks, the Alexa-plus manifest package, and an auditable pre-hackathon baseline.

## 2:08–2:26 — Open source / impact

**Visual:** PedsCore web app + repo + Open Source contribution doc.

**Narration:**

> The contribution is MIT licensed and reusable. The pattern can make existing deterministic clinical software agent-accessible without surrendering validated formulas, references, or safety constraints to a generative model.

## 2:26–2:40 — Close

**Visual:** judge console, then PedsCore + SIM IMV.

**Narration:**

> PedsCore AI is flexible at the interface and strict at the clinical boundary: conversation when it helps, deterministic medicine where it matters.

## Recording rules

- English narration.
- Public YouTube or Vimeo.
- Under 3 minutes.
- No copyrighted music/footage without permission.
- No real patient identifiers.
- Do not claim the optional official Alexa AI CLI deployment unless it is actually completed.
- Do not claim a public MCP→SIM path unless the public SIM endpoint exists by recording time.
