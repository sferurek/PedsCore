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
- Normalized route path.
- Day/week aggregate usage.
- UI language: `es` or `en`.
- Country/region if the provider offers aggregate location data without storing IP in PedsCore.
- Aggregate browser/device information if the provider offers it.

## Data That Must Not Be Collected

PedsCore analytics must never collect:

- IP addresses in PedsCore.
- User identifiers.
- Cookies.
- Fingerprinting data.
- Clinical data.
- Form values.
- Calculator results.
- Criteria selected in clinical rules.
- Age, weight, height, vital signs, laboratory values or any other clinical input.

## Route Tracking

The web app may send only this minimal payload for route changes:

```json
{
  "path": "/es/tools",
  "language": "es",
  "provider": "plausible"
}
```

Query strings and hash fragments are removed before analytics payloads are prepared.

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
