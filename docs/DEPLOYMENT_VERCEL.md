# Vercel deployment with Web Analytics

Production URL: `https://peds-core.vercel.app`

PedsCore is a Vite static app with one Vercel Function:

- build command: `npm run build`
- output directory: `apps/web/dist`
- public API: `/api/analytics/countries`
- public stats: `/es/stats/global` and `/en/stats/global`

The repository-root [vercel.json](../vercel.json) routes the API to its function
and rewrites non-API, non-asset paths to the SPA. GitHub Pages serves only the
legacy redirect and cannot execute the analytics function.

## Production configuration

Keep the repository root as the Vercel project root. Use the default npm install
step and Node.js 22.x.

First open the project's **Analytics** page and click **Enable**. Vercel creates
the Web Analytics collection routes on the next deployment.

Add these public build-time variables to Production:

```bash
VITE_ANALYTICS_PROVIDER=vercel
VITE_PUBLIC_STATS_ENABLED=true
VITE_PUBLIC_STATS_ENDPOINT=/api/analytics/countries
```

Add these server-only variables to Production:

```bash
ANALYTICS_STATS_PROVIDER=vercel
ANALYTICS_PUBLIC_STATS_ENABLED=true
VERCEL_ACCESS_TOKEN=<sensitive token>
VERCEL_ANALYTICS_PROJECT_ID=<prj_...>
ANALYTICS_COUNTRY_MIN_THRESHOLD=5
ANALYTICS_COUNTRY_CACHE_SECONDS=3600
```

For a team-owned project, also set one of:

```bash
VERCEL_ANALYTICS_TEAM_ID=<team_...>
VERCEL_ANALYTICS_TEAM_SLUG=<team-slug>
```

The explicit project and team variables can be omitted when the Vercel project
has **Automatically expose System Environment Variables** enabled, because the
function then uses `VERCEL_PROJECT_ID` and `VERCEL_TEAM_ID`.

Only `VERCEL_ACCESS_TOKEN` is secret. Mark it sensitive. Never put it, a team id
or a project id into a browser variable merely to make the API work. Values are
applied only to deployments created after the variables are saved.

`VERCEL_ANALYTICS_COUNTRY_SINCE=YYYY-MM-DD` is an optional server variable for a
shorter supported country interval. Without it, PedsCore requests the last 30
days, which is compatible with Vercel's reporting-window model.

## Local validation

Run from the repository root:

```bash
npm run lint
npm run test
npm run build
npm run seo:check
git diff --check
```

Without credentials, the function deliberately returns a safe unconfigured
response. Tests mock Vercel responses; they never require or print a real token.

## Preview deployment

Preview can validate the bundle, SPA routes and fail-safe API before production.
If Production-only variables are not copied to Preview, `configured:false` is
expected there. Do not treat that response as proof that Production is broken.

After a preview deploy, check:

```bash
curl -I <preview-url>/
curl -I <preview-url>/es/stats/global
curl -I <preview-url>/en/stats/global
curl -s <preview-url>/api/analytics/countries
```

## Production deployment and smoke test

After Web Analytics and the Production variables are configured, deploy from
the Git-connected `main` branch or with `vercel --prod`.

Verify:

```bash
curl -I https://peds-core.vercel.app/
curl -I https://peds-core.vercel.app/es/stats/global
curl -I https://peds-core.vercel.app/en/stats/global
curl -s https://peds-core.vercel.app/api/analytics/countries
```

The API must return HTTP 200 with:

```json
{
  "status": "ok",
  "configured": true,
  "provider": "vercel",
  "metric": "visitors"
}
```

Zero visitors immediately after activation is valid. An authentication failure
returns HTTP 502 with `configured:true`, while missing configuration returns
HTTP 200 with `configured:false`.

Open the production site once, navigate to one tool and inspect Network for a
request below Vercel's insights route. Allow normal aggregation time, then check
the API, footer and both Global Stats languages again. One or two controlled
visits are sufficient.

## Privacy and fail-safe behavior

The official component automatically records pageviews after query strings and
fragments are removed. PedsCore custom events include only categorical route and
tool metadata. Age, sex, measurements, form values, selected criteria, scores,
results, diagnoses and free text are never sent.

The browser never receives the Vercel token and never queries the authenticated
Vercel API. `/api/analytics/countries` returns only aggregate visitor,
pageview and country fields. Countries below the configured threshold are
omitted without hiding the footer totals.

## Troubleshooting

- No tracking request: enable Web Analytics, set the frontend provider to
  `vercel`, and redeploy.
- `configured:false`: verify the server provider, token and project id names.
- HTTP 502: verify token access and team scope; the function keeps
  `configured:true` because the credentials were present.
- Empty country list: the reporting window has no country above the threshold.
- Old behavior after changing variables: create a new deployment; Vercel does
  not apply new environment values retroactively.
