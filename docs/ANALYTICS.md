# Privacy-first Analytics

PedsCore supports an optional analytics scaffold for aggregate website usage. It is disabled by default and must be explicitly configured at build time.

## Goal

The goal is to understand general public web usage without creating a hidden clinical database and without collecting clinical data.

## Default Mode

Analytics is off unless `VITE_ANALYTICS_PROVIDER` and the required public configuration values are provided.

To keep analytics disabled:

```bash
VITE_ANALYTICS_PROVIDER=none
```

If no analytics variables are configured, PedsCore behaves as `none`.

## Supported Providers

- Plausible Analytics.
- Umami.
- Cloudflare Web Analytics.

Provider scripts are loaded only when the provider and required public values are configured.

Custom product events are sent only for providers that expose a browser event API:

- Plausible: `window.plausible(eventName, { props })`.
- Umami: `window.umami.track(eventName, props)`.

Cloudflare Web Analytics can still provide aggregate pageview counters, but the current static scaffold does not send custom product events to Cloudflare because there is no official client-side custom event API wired in this app.

## Environment Variables

```bash
VITE_ANALYTICS_PROVIDER=none | plausible | umami | cloudflare
VITE_ANALYTICS_DOMAIN=example.org
VITE_ANALYTICS_SCRIPT_URL=https://analytics.example.org/script.js
VITE_UMAMI_WEBSITE_ID=public-website-id
VITE_CLOUDFLARE_TOKEN=public-cloudflare-web-analytics-token
```

Do not commit private credentials. These variables are public build-time configuration for a static GitHub Pages site.

## Data That May Be Collected

Only aggregate website usage data may be collected:

- Pageviews.
- Anonymous product usage event names.
- Normalized route path.
- Day/week aggregate usage.
- UI language: `es` or `en`.
- Tool id, tool type, category and implementation status as categorical labels.
- Whether search was used, without the search text.
- Country/region if the provider offers aggregate location data without storing IP in PedsCore.
- Aggregate browser/device information if the provider offers it.

## Product Events

PedsCore registers this closed list of anonymous event names:

- `app_open`
- `screen_view`
- `search_used`
- `case_opened`
- `case_completed`
- `score_calculated`
- `protocol_opened`
- `favorite_added`
- `share_used`

Current web wiring:

- `app_open`: first localized app render in the browser session.
- `screen_view`: route changes.
- `search_used`: tools search field used; the query text is never sent.
- `case_opened`: tool page opened.
- `case_completed`: active tool form completed.
- `score_calculated`: active tool form completed and a calculation/result panel is available.
- `protocol_opened`: algorithm-type tool page opened.
- `favorite_added`: reserved for a future favorites UI.
- `share_used`: reserved for a future share UI.

Allowed event parameters are limited to:

```json
{
  "path": "/es/tools/apgar",
  "language": "es",
  "provider": "plausible",
  "eventName": "score_calculated",
  "toolId": "apgar",
  "toolType": "score",
  "category": "neonatology",
  "status": "implemented",
  "routeKind": "tools",
  "searchScope": "tools",
  "hasQuery": true
}
```

Do not add arbitrary parameters. Do not add form values, result values, selected criteria, patient details or free-text content.

## Data That Must Not Be Collected

PedsCore analytics must never collect:

- IP addresses in PedsCore.
- User identifiers.
- Cookies.
- Fingerprinting data.
- Clinical data.
- Form values.
- Calculator results.
- Search queries or any free-text clinical content.
- Criteria selected in clinical rules.
- Age, weight, height, vital signs, laboratory values or any other clinical input.
- Names, emails, dates of birth, identifiers or clinical notes.

## Route Tracking

The web app may send only this minimal payload for route changes:

```json
{
  "path": "/es/tools",
  "language": "es",
  "provider": "plausible",
  "eventName": "screen_view",
  "routeKind": "tools"
}
```

Query strings and hash fragments are removed before analytics payloads are prepared.

## Usage Counters

PedsCore does not run its own analytics database. Last-7-days and all-time counters should be read in the configured provider dashboard:

- Plausible: open the site dashboard, select the date range `Last 7 days` or `All time`, then inspect Goals / Events for the event names above.
- Umami: open the website dashboard, select `Last 7 days` or `All time`, then inspect Events for the event names above.
- Cloudflare: use Web Analytics pageview counters for `Last 7 days` or all available history. Custom product events are not available in this static scaffold.

For public reporting, count the event names directly and keep labels aggregate. Example counters:

- `screen_view` in the last 7 days.
- `score_calculated` all time.
- `search_used` in the last 7 days.
- `case_opened` all time.

## Public Global Usage Stats Page

PedsCore includes a public aggregate usage page:

- `/es/stats/global`
- `/en/stats/global`

The page is privacy-safe by design and reads only from the public endpoint:

```text
/api/analytics/countries
```

The browser must never call authenticated Umami APIs directly. Umami credentials must stay in server-side environment variables only.

### Runtime Requirement

The current web app is a static Vite app. GitHub Pages can serve the stats route, but it cannot run `/api/analytics/countries`.

To enable live public stats, deploy the repository to a platform that supports Vercel-style serverless API routes, or adapt the same endpoint logic to the chosen platform.

### Server-side Environment Variables

Configure these only in the serverless runtime:

```bash
UMAMI_API_URL=https://umami.example.org
UMAMI_WEBSITE_ID=public-website-id
UMAMI_API_TOKEN=server-side-api-token
UMAMI_COUNTRY_MIN_VISITS=5
UMAMI_STATS_CACHE_SECONDS=3600
UMAMI_STATS_START_AT=1704067200000
UMAMI_PUBLIC_STATS_ENABLED=true
```

Notes:

- `UMAMI_API_TOKEN` must never be exposed as `VITE_*`.
- `UMAMI_COUNTRY_MIN_VISITS` defaults to `5`.
- `UMAMI_STATS_CACHE_SECONDS` defaults to `3600` and is capped at `21600`.
- `UMAMI_STATS_START_AT` is optional and should be a Unix timestamp in milliseconds for the first deployment date.
- Set `UMAMI_PUBLIC_STATS_ENABLED=false` to disable the serverless endpoint.

### Frontend Configuration

The public page is enabled by default. To hide public stats in a static deployment:

```bash
VITE_PUBLIC_STATS_ENABLED=false
```

If the endpoint is hosted somewhere else:

```bash
VITE_PUBLIC_STATS_ENDPOINT=https://example.org/api/analytics/countries
```

### Public Endpoint Contract

The endpoint returns only aggregate fields:

```json
{
  "status": "ok",
  "updatedAt": "2026-06-04T12:00:00.000Z",
  "minimumVisits": 5,
  "totals": {
    "visits": 120,
    "pageviews": 280,
    "countriesReached": 4,
    "last7DaysVisits": 25
  },
  "countries": [
    {
      "countryCode": "ES",
      "countryName": "Spain",
      "visits": 80,
      "pageviews": 160
    }
  ]
}
```

It must never return:

- IP addresses.
- User agents.
- Referrers.
- Raw events.
- Session identifiers.
- User identifiers.
- Clinical data.
- Form values.
- Search text.

### Minimum Threshold

Countries with fewer than `UMAMI_COUNTRY_MIN_VISITS` visits are hidden from the public response. This avoids exposing very small groups.

## Location Data

If location information is available, it must come from the analytics provider as aggregated statistics. PedsCore must not store IP addresses or derive its own location database.

## Language Data

PedsCore may record only the UI language used on the route, aggregated by the provider. It must not create user profiles or persistent language-tracking identifiers.

## Limitations

- This scaffold does not include an internal dashboard.
- This scaffold does not create a backend, database or endpoint.
- GitHub Pages remains a static deployment.
- Provider privacy settings must be reviewed before enabling analytics publicly.

## Future Dashboard Policy

If PedsCore later needs an internal dashboard, it should use only aggregated data. A future design may consider a Cloudflare Worker + D1 or another aggregation-only service, but it must not store IP addresses, clinical data, form values, calculator results or user identifiers.
