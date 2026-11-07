# Popular-tools analytics investigation

## Impact and evidence

The deployed `/api/analytics/tools` endpoint returns `502 provider_error` when the upstream Vercel request returns HTTP 400. Home falls back to curated tools; calculator execution and clinical data are unaffected. Production logs show the same error before and after release #173, on deployments `dpl_EThwP1fAk49KB4JXFhaxGLfS3NG4` and `dpl_HoC8NuiF9MynyAgHGhpqUNN7JLoK`. The analytics source was unchanged in that release.

Three provider contract mismatches were found:

1. The request groups by `path`; the documented dimension is `requestPath`. A read-only authenticated connector probe using `path` reproduced HTTP 400; the otherwise equivalent `requestPath` query succeeded.
2. The request asks for 500 distinct rows; the current Vercel connector validates a maximum of 100. The corrected probe uses 100.
3. Actual returned rows use `requestPath`, which the existing response normalizer does not recognize. Correcting only the outgoing request would therefore still yield an empty tools list.

Source: [Vercel aggregate pageviews API](https://vercel.com/docs/rest-api/web-analytics/aggregates-page-views), inspected 2026-11-05. The authenticated probe used the linked PedsCore project and team, the existing 30-day date window and only aggregate route data. No tokens were retrieved, changed or logged; actual traffic counts are not copied into this public report.

## Correction

Use `requestPath`, cap rows at 100, filter upstream to ES/EN tool routes, and recognize the returned field. Preserve the complete UTC timestamp so the rolling window includes the current day instead of ending at midnight. Ignore malformed percent-encoded rows rather than discarding the whole response. Keep existing legacy row aliases, 30-minute successful-response caching, truthful 502 failure behavior and curated fallback.

This restores ranking over the returned route groups, not a guaranteed exhaustive ranking of every catalog tool. The provider can group omitted rows into `Others`; that group is deliberately excluded. ES/EN pageviews are combined by slug for the returned groups. Counts describe pageviews, not unique clinicians, clinical benefit or patient outcomes. A complete catalog ranking would need a separately designed aggregation strategy.

Five endpoint regression tests cover supported request parameters with a real provider-shaped fixture, locale aggregation, malformed/non-tool rows, provider failure, missing configuration, HTTP methods, HEAD, caching and no token leakage. Run the focused tools/countries suite and ESLint; full GitHub checks verify the draft branch. No local production build is needed.

The branch has automatic Vercel deployment disabled. No merge, preview creation or production deployment is authorized by this investigation. A successful connector probe uses connector credentials and does not prove the production function token has identical permissions; deployment verification remains necessary after separate approval.

## Search Console and interrupted cleanup

Read-only canonical Search Console navigation on 2026-11-05 still shows “Vaya, no puedes acceder a esta propiedad” for `https://pedscore.app/` in the signed-in account. The verification button was not clicked. No access or DNS changes were made. Visible room history contains the earlier pending verification question, but no explicit user approval for Search Console verification was found. The user's “Si” in this execution thread answers the explicit merge/deployment question for #173; it does not authorize ownership changes. It remains possible that another account owns the canonical property.

Source PRs #154 and #167–#172 remain open after the interrupted cleanup. The parent reported reviewer denials without supplying their reasons to this execution context. Their closure was not retried, and this investigation does not depend on closing them.
