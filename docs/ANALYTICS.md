# Privacy-first analytics

PedsCore production uses Vercel Web Analytics for aggregate website usage. The
browser sends navigation and a closed list of product events to Vercel; the
serverless API reads aggregate Vercel metrics and exposes only safe totals and
country rows.

```text
browser -> Vercel Web Analytics -> Vercel Web Analytics API
        -> /api/analytics/countries -> footer and Global Stats
```

PedsCore does not run an analytics database. Umami support remains in the code
for backwards compatibility, but it is not required or recommended for the
Vercel production deployment.

## What is collected

The allowed browser data is limited to:

- automatic pageviews with query strings and fragments removed;
- normalized path and UI language;
- tool id, tool type, category and implementation status;
- a closed product-event name;
- whether search was used, without the search text;
- provider-generated aggregate country, timestamp and referrer data.

The closed product-event list is:

- `app_open`
- `screen_view`
- `search_used`
- `case_opened`
- `case_completed`
- `score_calculated`
- `protocol_opened`
- `favorite_added`
- `share_used`

Custom event properties are allowlisted. Unknown keys are discarded before an
event reaches the provider.

## What is never collected by PedsCore analytics

- Age, sex, weight, height or measurements.
- Form inputs, selected clinical criteria or free text.
- Scores, calculator results, diagnoses or clinical notes.
- Names, emails, dates of birth or patient identifiers.
- Cookies, local-storage identifiers or PedsCore user profiles.
- Raw IP addresses, user agents, sessions or raw events in the public API.

Clinical calculations remain in browser memory. `localStorage` is used only for
the ES/EN language preference.

## Frontend configuration

These build-time variables are public:

```bash
VITE_ANALYTICS_PROVIDER=vercel
VITE_PUBLIC_STATS_ENABLED=true
VITE_PUBLIC_STATS_ENDPOINT=/api/analytics/countries
```

The endpoint variable is optional. Missing, empty and whitespace-only values
all use `/api/analytics/countries`.

`AnalyticsProvider` mounts the official `@vercel/analytics` React component
only when the selected provider is `vercel`. Its `beforeSend` hook removes query
strings and fragments before automatic pageviews are sent. Vercel tracks
History API navigation; PedsCore product events remain separate custom events,
so they do not create duplicate pageviews.

## Server configuration

These variables are available only to the Vercel Function:

```bash
ANALYTICS_STATS_PROVIDER=vercel
ANALYTICS_PUBLIC_STATS_ENABLED=true
VERCEL_ACCESS_TOKEN=<sensitive access token>
VERCEL_ANALYTICS_PROJECT_ID=<project id>
VERCEL_ANALYTICS_TEAM_ID=<team id, only for team projects>
VERCEL_ANALYTICS_TEAM_SLUG=<team slug, alternative to team id>
VERCEL_ANALYTICS_COUNTRY_SINCE=<YYYY-MM-DD, optional>
ANALYTICS_COUNTRY_MIN_THRESHOLD=5
ANALYTICS_COUNTRY_CACHE_SECONDS=3600
```

`VERCEL_ANALYTICS_PROJECT_ID` may be omitted when Vercel's system environment
variables are exposed and `VERCEL_PROJECT_ID` is therefore available. The same
fallback applies to `VERCEL_TEAM_ID`. Personal projects do not need a team id
or slug. If both team forms exist, the id is used.

`VERCEL_ACCESS_TOKEN` must never have a `VITE_` prefix. The token must be marked
sensitive in Vercel and have access to the project whose metrics are queried.

## Public API contract

`GET /api/analytics/countries` returns:

```json
{
  "status": "ok",
  "configured": true,
  "disabled": false,
  "provider": "vercel",
  "metric": "visitors",
  "totalsRange": "since_analytics_enabled",
  "countriesRange": {
    "kind": "reporting_window",
    "since": "2026-08-12",
    "until": "2026-09-11"
  },
  "minimumThreshold": 5,
  "totalVisitors": 120,
  "totalPageviews": 280,
  "last7DaysVisitors": 25,
  "countriesReached": 4,
  "updatedAt": "2026-09-11T12:00:00.000Z",
  "countries": [
    {
      "code": "ES",
      "name": "Spain",
      "visitors": 80,
      "pageviews": 160
    }
  ]
}
```

Vercel calls its unique-person estimate `visitors`; PedsCore does not relabel it
as visits or sessions. Total visitors and pageviews cover production traffic
since Web Analytics was enabled. The last-seven-days visitor total has its own
explicit window. Country aggregation uses the provider reporting window,
normally the last 30 days, and the API exposes the exact requested dates.

`countriesReached` counts valid aggregate country rows before the display
threshold. The `countries` array contains only rows meeting
`ANALYTICS_COUNTRY_MIN_THRESHOLD`.

The endpoint accepts only GET and HEAD. Successful aggregate responses use
shared-cache headers. Incomplete configuration returns HTTP 200 with
`status:not_configured` and `configured:false`. A provider or authentication
failure returns HTTP 502 with `status:provider_error` and `configured:true`.
Tokens and provider error bodies are never returned.

The footer is shown after any successful configured response, including valid
zero totals or an empty country list. Country visibility therefore remains
independent from the public visitor totals.

## Setup and verification

1. In the Vercel project, open **Analytics** and enable Web Analytics.
2. Create a Vercel access token with access to the project.
3. Add the frontend and server variables above to Production.
4. Redeploy after saving the variables.
5. Visit the production site and navigate once to a tool.
6. Confirm a request to Vercel's insights route appears in browser Network.
7. Check `/api/analytics/countries` for `configured:true`.
8. Check `/es/stats/global`, `/en/stats/global` and the footer.

Before deployment, run:

```bash
npm run lint
npm run test
npm run build
npm run seo:check
git diff --check
```

## Troubleshooting

- `configured:false`: token or project id is missing, or the server provider is
  not configured as Vercel.
- HTTP 502 with `configured:true`: variables are present, but Vercel rejected or
  failed an aggregate query. Check token access, project ownership and team
  scope.
- Tracking absent: enable Web Analytics in the dashboard, verify
  `VITE_ANALYTICS_PROVIDER=vercel`, then redeploy.
- Footer absent with HTTP 200: confirm the API response has `status:ok` and
  `configured:true`.
- Empty countries: no country meets the privacy threshold in the reported date
  window; totals can still be valid and visible.
- Freshly enabled analytics can take time to aggregate. Do not fabricate or
  backfill public counts.
