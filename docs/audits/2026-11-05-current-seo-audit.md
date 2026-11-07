# Current SEO audit — 2026-11-05

Production baseline: `fba367fc76cf2aef7229291f9e82bf245f49fba5` (#173), canonical origin `https://pedscore.app`. This audit distinguishes published HTML, Google index records and Google live tests.

## Completed improvements

- Canonical URL-prefix Search Console property verified by the existing HTML file, with explicit owner authorization. No DNS or third-party access changes.
- Canonical sitemap validated and submitted once with authorization. Google confirmed successful submission and then **processed successfully, 335 discovered pages, last read 5 November 2026**. Its initial transient cannot-fetch row cleared when processing completed. Discovered is not synonymous with indexed.
- Draft correction: per-route lastmod for the six topic hubs whose runtime content or links changed significantly in #173 (five new runtime hubs and the repaired encephalopathy tool link). Both locales use 2026-11-05. Other 323 sitemap entries retain the previous editorial date. No build-clock freshness or blanket date bump.

## Published HTML checks

All **335** sitemap URLs were fetched with concurrency limited to four (34 priority routes reused from the same-session sample). All returned HTTP 200. Each had a single self-canonical, one H1, a nonempty title/description and no noindex meta. All 334 localized pages had the expected HTML language and reciprocal ES/EN alternate URLs. XML parses successfully, has no duplicate loc entries and all 1003 alternate links use pedscore.app. This is an HTML and sitemap contract check, not an exhaustive review of every clinical claim or Google coverage.

Three negative/legacy probes returned 404, including `/es/tools/glasgow-adapted`. No redirect to a different clinical instrument was introduced.

## Google coverage and remaining work

Source: individual URL inspection UI on 2026-11-05, 28 inspected URLs. All ten ES/EN priority calculator pages (PRISM IV, PELOD-2, PIM3, pSOFA, Phoenix) were indexed. Nine of eighteen topic routes were indexed. The nine remaining topic routes are listed below. Global Performance/Indexing reports still say processing; no site-wide indexed total, traffic trend, keyword ranking, CTR gain or Core Web Vitals pass is claimed.

| Pending topic URL | Google index reason | Last indexed crawl reported |
| --- | --- | --- |
| `/es/topics/pediatric-intensive-care-scores` | Duplicada: Google ha elegido una versión canónica diferente a la del usuario | 19 oct 2026, 18:08:28 |
| `/en/topics/pediatric-intensive-care-scores` | Google no reconoce esta URL | N/D |
| `/es/topics/pediatric-febrile-infant-tools` | Descubierta: actualmente sin indexar | N/D |
| `/es/topics/pediatric-kidney-function-aki-tools` | Duplicada: Google ha elegido una versión canónica diferente a la del usuario | 20 oct 2026, 3:00:40 |
| `/es/topics/preterm-pediatric-growth-tools` | Google no reconoce esta URL | N/D |
| `/en/topics/pediatric-febrile-infant-tools` | Google no reconoce esta URL | N/D |
| `/en/topics/pediatric-kidney-function-aki-tools` | Descubierta: actualmente sin indexar | N/D |
| `/en/topics/preterm-pediatric-growth-tools` | Google no reconoce esta URL | N/D |
| `/en/topics/pediatric-croup-scores` | Descubierta: actualmente sin indexar | N/D |

For the two ES duplicate records, Google selected `/es/topics/pediatric-croup-scores` as canonical. Those crawls occurred on 19/20 October, before #173. The current raw HTML on both pages declares its own canonical and contains its own title, H1 and content; do not change these pages to canonicalize to croup merely to match a stale index decision. The current Google live UCI test reports available/indexable, successful smartphone fetch and the correct declared canonical; Google-selected canonical remains available only after indexing. The renal live check is recorded separately in the handoff evidence.

### Priorities

1. **P0: Google recrawl follow-up.** Keep the submitted canonical sitemap in place. Follow the two historical duplicate records and the other seven pending topics after Google refreshes data. No bulk indexing request was performed. Submission and a passing live test do not guarantee indexing.
2. **P1: accurate change signals.** Release this reviewed lastmod correction only after explicit approval. The date is tied to the actual content release, not a promise to improve rankings.
3. **P1: evaluate settled Search Console data.** Once reports populate, examine query/page/device/country performance and inspect underperforming titles using actual impressions and CTR. The current new-property state cannot support numerical traffic or ranking claims.
4. **P2: performance and clinical authority.** Collect field Core Web Vitals when available and preserve independent clinical-review/source limitations already documented. Do not fabricate clinical endorsement, schema review ratings or collaboration backlinks. No external outreach was sent.

## Basis and verification

[Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) requires lastmod to describe significant content changes; [canonical troubleshooting](https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting) recommends inspecting the selected canonical rather than blindly copying it.

Local focused topic tests and ESLint pass; regenerated XML has 335 loc entries with exactly 12 updated dates and 323 unchanged defaults. The test fixes a future build clock and checks locale symmetry and unchanged unrelated routes. Generated public sitemap churn is not committed: the normal prebuild regenerates it. CI checks the complete build and SEO output. No local production build, merge or deployment is authorized by this audit.

Evidence in the task workspace: `sprint-handoff/sitemap-validation-2026-11-05.json`, `seo-full-sitemap-html-audit-2026-11-05.json`, `seo-pending-topics-2026-11-05.json`, `gsc-url-inspections-2026-11-05.json`, and `gsc-sitemap-processed.jpg`. The report is a dated baseline, not ongoing monitoring.
