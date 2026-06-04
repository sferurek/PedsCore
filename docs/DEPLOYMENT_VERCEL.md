# Vercel Deployment with Umami Analytics

This guide documents the preferred PedsCore production deployment on Vercel with Umami enabled through environment variables.

Production app:

```text
https://peds-core.vercel.app
```

## Runtime Model

PedsCore is a TypeScript/Vite static web app with one Vercel-compatible serverless endpoint:

- Static app output: `apps/web/dist`
- Serverless endpoint: `/api/analytics/countries`
- Public stats routes: `/es/stats/global` and `/en/stats/global`

Vercel is the preferred public app because it serves both the static web app and `/api/analytics/countries`. GitHub Pages is legacy/deprecated and should only redirect visitors to Vercel; it cannot execute `/api/analytics/countries`.

## Import into Vercel

1. Import `https://github.com/sferurek/PedsCore` into Vercel.
2. Keep the repository root as the Vercel project root.
3. Use the existing npm workspace scripts.
4. Configure:
   - Build command: `npm run build`
   - Output directory: `apps/web/dist`
   - Install command: Vercel default, or `npm install`
   - Node.js: `22.x` is recommended. The serverless function is configured as `nodejs22.x`.

The repository includes `vercel.json` with:

- `buildCommand`: `npm run build`
- `outputDirectory`: `apps/web/dist`
- `/api/analytics/countries` routed to the serverless function
- `/assets/*` excluded from the SPA fallback
- non-API routes rewritten to `/index.html` for SPA routing

## Frontend Environment Variables

These are public build-time variables. They are embedded in the browser bundle.

```bash
VITE_ANALYTICS_PROVIDER=umami
VITE_ANALYTICS_SCRIPT_URL=https://<your-umami-domain>/script.js
VITE_UMAMI_WEBSITE_ID=<website-id>
VITE_PUBLIC_STATS_ENABLED=true
VITE_PUBLIC_STATS_ENDPOINT=/api/analytics/countries
```

Do not put private tokens in `VITE_*` variables.

## Server-side Environment Variables

These must be configured only in Vercel server-side environment variables:

```bash
UMAMI_API_URL=https://<your-umami-domain>
UMAMI_WEBSITE_ID=<website-id>
UMAMI_API_TOKEN=<server-side-api-token>
UMAMI_COUNTRY_MIN_THRESHOLD=5
UMAMI_COUNTRY_CACHE_SECONDS=3600
UMAMI_PUBLIC_STATS_ENABLED=true
```

Rules:

- Never commit real tokens.
- `UMAMI_API_TOKEN` must never be prefixed with `VITE_`.
- `UMAMI_COUNTRY_MIN_THRESHOLD` hides countries below the threshold.
- `UMAMI_COUNTRY_CACHE_SECONDS` controls public cache headers for the aggregate endpoint.
- Set `UMAMI_PUBLIC_STATS_ENABLED=false` to disable the endpoint without redeploying code.

## Local Build Verification

Run before deploying:

```bash
npm run lint
npm run test
npm run build
npm run seo:check
```

## Smoke Tests

Without server-side env vars, the endpoint should fail safe:

```bash
npm run build
vercel dev
curl -s http://localhost:3000/api/analytics/countries
```

Expected shape:

```json
{
  "configured": false,
  "disabled": false,
  "range": "all_time",
  "totalVisits": 0,
  "totalPageviews": 0,
  "last7DaysVisits": 0,
  "countriesReached": 0,
  "countries": []
}
```

The frontend stats page should render a not-configured state:

```text
http://localhost:3000/es/stats/global
http://localhost:3000/en/stats/global
```

After configuring Umami env vars in Vercel, verify:

```bash
curl -s https://peds-core.vercel.app/api/analytics/countries
```

The response must contain only aggregate fields:

- `configured`
- `disabled`
- `range`
- `totalVisits`
- `totalPageviews`
- `last7DaysVisits`
- `countriesReached`
- `countries: [{ code, name, visits, pageviews }]`

It must not contain IPs, user agents, referrers, raw events, identifiers, clinical values, form values or search text.

## Privacy Notes

The browser loads the Umami script only when configured with public `VITE_*` variables. Public stats are retrieved from `/api/analytics/countries`; the browser never calls authenticated Umami APIs directly.

The serverless endpoint uses Umami aggregate endpoints and returns only country-level aggregate counts above the configured threshold.
