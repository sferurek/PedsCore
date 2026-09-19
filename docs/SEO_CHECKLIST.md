# PedsCore SEO and discoverability checklist

Updated: 19 September 2026.

## Canonical site

`https://peds-core.vercel.app/`

Former GitHub Pages URLs should redirect/canonicalize to the Vercel site; do not create competing canonical versions.

## Technical SEO

- Static/prerendered clinical routes.
- ES/EN canonical URLs.
- hreflang pairs.
- Sitemap generated from the current clinical catalog during build.
- robots.txt available.
- Specific titles/descriptions for clinical routes.
- Internal category/tool linking.
- IndexNow tooling.
- Run `npm run seo:check` after routing/catalog changes.

## Search Console baseline

As of the latest settled Search Console data available during the 19 September audit:

- 137 impressions in the prior 28-day window.
- 0 clicks.
- Average position ~26.3.
- Indexing tracker: 35/45 monitored URLs indexed.
- Indexing health score: 83/100.
- Sitemap accepted without warnings/errors.

These are early-site metrics and should be used as a baseline, not as a mature traffic benchmark.

## After each major deployment

1. Verify production and sitemap.
2. Inspect priority routes in Search Console.
3. Expand tracking to newly important ES/EN pages.
4. Submit changed URLs to IndexNow when configured.
5. Review new queries/pages only after data has settled.
6. Avoid keyword stuffing or content generated solely for ranking.

## Priority query/page work

Use actual impressions to improve pages for clinically accurate intents such as named scores, growth tools and category pages. Preserve source attribution and professional language.

## Repository discoverability

Keep GitHub description, website and topics aligned with the canonical site. README figures must match code-level catalog/discovery tests.


## GitHub Pages migration

The legacy root `https://sferurek.github.io/PedsCore/` currently serves a visible “PedsCore has moved” landing that points to Vercel. The verified root mapping is recorded in GSC Wizard under `github-pages-to-vercel-2026`.

The canonical production host remains `https://peds-core.vercel.app/`. Because the legacy Pages deployment is not sourced from the current `main` branch, PedsCore should not claim an HTTP 301 unless the Pages hosting configuration is explicitly changed and verified.
