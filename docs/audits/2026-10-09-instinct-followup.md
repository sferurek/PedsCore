# Instinct public audit — implementation follow-up (2026-10-09)

This document records changes to the **source tree only**. It is not a clinical validation certificate, a deployed release, or a claim that an independent reviewer has approved any tool. Source: public Instinct report “Diez mejoras para PedsCore”, 2026-10-09.

## Applied in isolated development branch

1. **Clinical state clarity (P0).** Replaced the outdated generic `ready` note suggesting all locally-active calculations remain *not yet activated* with a neutral documentation/review statement. Existing tool-specific warnings and the independent clinical-review status are preserved. For PECARN under 2, corrected Spanish accents without changing clinical logic. Made the absent interpretation/scoring-table messages descriptive instead of representing table absence as proof of a pending overall validation.
2. **Faster calculator access (P1).** Added a prominent, keyboard-accessible `#calculator` jump in the clinical tool hero for active local calculators; the population summary, evidence, full context and warnings remain on the page. PRAM uses a separate pilot view and was not modified by this change.
3. **Navigation semantics (P1).** Replaced home quick-access buttons, ToolCard open buttons, and header internal navigation buttons with real links. Modified-click behaviour remains native (new tab, copy link). Increased home shortcut touch-target height from 30px to 44px.
4. **Form interaction (P1).** Required-field errors only appear after an attempted advance on that field; reset clears the display state. Clinical input completeness rules and calculations are unchanged.
5. **Bilingual evidence table (P2).** Localized evidence-level labels on topic hub comparison pages. Updated link sharing to emit only the canonical public tool URL with no query string or fragment; no clinical inputs are shared.
6. **Regression coverage.** Added focused server-render tests for calculator jump/initial validation and semantic links/localized hub labels.

## Not automatically applied (requires separate review/decision)

- **Domain redirect (P1).** `peds-core.vercel.app` and `pedscore.app` currently both respond to tool routes. The canonical markup already points to `pedscore.app`. Before permanent 308/301 routing, check ownership, preview dependencies, legacy inbound links, language/path preservation, and API routes. The redirect must be configured at the appropriate host without creating a cross-host loop. No Vercel configuration was changed.
- **Homepage messaging (P1).** Changing core positioning text could affect branding and planned Learn/Live surfaces. Prototype and test with clinicians before switching copy.
- **Clinical hubs (P2).** Translating raw status labels is safe; adding evidence claims, comparability or clinical examples for TBI/respiratory/growth requires primary-source review, so none was fabricated.
- **Independent clinical review (P2).** No external reviewer can be named without their consent and dated, version-specific signed review. Existing registry explicitly states none is documented. See `docs/CLINICAL_REVIEW_PROGRAM.md`.
- **Teaching/outreach (P2).** A reusable teaching kit has been drafted in `docs/PEDSCORE_TEACHING_KIT_ES_EN.md`, without claimed institutional endorsement or real patient data. Its publication/dissemination needs approval.
- **Analytics (P2).** Existing `case_opened`, `case_completed` and `score_calculated` events already provide privacy-conscious product signals. No new user identifiers, clinical-form contents or external trackers were added. Assess whether a privacy-preserving aggregate funnel can be produced before further instrumentation.

## Release gate

Review the diff; run non-build checks; subsequently perform clinician UX tests and separate clinical review. **No build, deployment, remote push, release, or Vercel production change is authorized as part of this audit remediation.**

## Verification performed without any project build

- `npm run lint`: passed.
- TypeScript core and web: `tsc --noEmit` passed (web checked with temporary source-level path aliases; no generated artifacts).
- 18 of 18 web-polish tests passed, including three added regression tests, using a temporary Vitest source alias without compiling the application.
- `git diff --check`: passed.
- Initial `npm ci` failed because the original lockfile did not reflect `apps/mcp-server` and the declared `esbuild` version. **Follow-up completed:** regenerated `package-lock.json` with `npm install --package-lock-only --ignore-scripts --no-audit --no-fund`; a clean `npm ci --ignore-scripts --no-audit --no-fund --prefer-offline` then succeeded. The lockfile changed without changing dependency manifests or invoking installation scripts.
- No deployment, remote push, code build or Vercel change was performed.

## Local visual and interaction review (2026-10-09 follow-up)

- Started Vite in development mode using a **temporary source alias** for `@peds-core/core` rather than generating the core or web production build. No Vercel build or deployment was triggered.
- Opened PECARN <2, PRAM and the Spanish home page using Chrome 155. Captured desktop and mobile screenshots in untracked local `review-screenshots/`.
- Chrome DevTools Protocol **mobile emulation at 390 × 844** reported `window.innerWidth === document.documentElement.scrollWidth === 390` for PECARN, PRAM and the home page, with no horizontal overflow. A cropped initial `--window-size` headless screenshot was a viewport artifact, not a responsive layout bug.
- PECARN live interaction: 0 required-field messages on initial render, 1 message after attempting to advance a blank numeric field, 0 again after Reset. The calculator anchor updates the URL to `#calculator` and scrolls toward the form.
- A separate, temporary development preview is available **only over the user's Tailscale network** at `http://100.79.139.70:4180/es`. Its lifetime is tied to the local development process, not Vercel.
- No automated clinical validation or external clinician review was performed. No push/PR/merge/deploy was performed.
