# Public Launch / Consolidation Checklist

Updated: 19 September 2026.

## Current baseline

- 137 cataloged surfaces.
- 134 active.
- 3 deprecated.
- 64 implemented clinical products.
- 61 local-active calculation surfaces.
- 0 active blocked surfaces.
- ES/EN production: https://peds-core.vercel.app/

## GitHub

- Repository description and website point to the canonical Vercel production site.
- README / README.es / ROADMAP / CHANGELOG reflect the current baseline.
- Rights register is current.
- Superseded PRs are closed rather than merged.
- CI must pass lint, tests and build.

## Search

- Canonical property: `https://peds-core.vercel.app/`
- Sitemap: `https://peds-core.vercel.app/sitemap.xml`
- Verify robots and sitemap after major deployments.
- Reinspect priority ES/EN routes after major catalog changes.
- Preserve redirect/canonical migration from the former GitHub Pages deployment.
- Monitor Search Console coverage rather than relying only on sitemap aggregate counters.

## Manual QA

- Home counters and Finder.
- Tool availability filters.
- Local calculator form/result/trace.
- External-reference CTA and rights explanation.
- ES/EN language switching.
- Mobile layout and tap targets.
- WHO/CDC growth output and print behavior.
- Disclaimer, evidence and footer links.
- No protected local calculator exposed for rights-limited instruments.

## Release communication

Any public post should use the current baseline numbers above and avoid claims such as certified medical device, diagnostic app or treatment recommendation.

## Local/CI verification

```bash
npm ci
npm run lint
npm run test
npm run build
npm run seo:check
```
