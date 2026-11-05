# Search Console and SEO follow-up — 5 November 2026

Read-only audit. No production smoke test, indexing request, sitemap submission, verification change, deployment or correction-validation action was performed. Draft sprint changes remain unmerged.

## Access and freshness

`gsc_wizard_list_sites` returned `payment_required` / `subscription_required`: the GSC Wizard account has no running trial or active subscription. No further paid-tool calls were attempted. An existing browser session allowed direct, read-only Search Console access, so a subscription is not required merely to read that accessible property manually.

The property selector showed `https://peds-core.vercel.app/` and a separate PedsData subdomain property; canonical `pedscore.app` was not available in this session. This does not prove that no canonical property exists under another account. It does block a reliable claim about canonical-domain coverage here. Verifying a child subdomain does not verify its parent domain ([Google ownership guidance](https://support.google.com/webmasters/answer/9008080?hl=en)).

## Historical legacy-property coverage

Source: direct Search Console **Page indexing**, `https://peds-core.vercel.app/`, observed 2026-11-05, report last updated **2026-10-23**. These are legacy-property figures, not current `pedscore.app` totals.

| Cause/state | URLs shown | Interpretation / next action |
| --- | ---: | --- |
| Indexed | 276 | Historical coverage only; do not transfer this count to the canonical property |
| Alternative page with proper canonical | 4 | Potentially expected deduplication; inspect selected canonicals once canonical property access is available |
| Page with redirect | 2 | May be expected migration behavior; do not reverse redirects merely to reduce exclusions |
| Not found (404) | 1 | Example `/es/tools/glasgow-adapted`, last crawl 2026-10-14; see retired-placeholder evidence below |
| Discovered, currently not indexed | 0 | No affected URL in this displayed historical row |
| Crawled, currently not indexed | 0 | No affected URL in this displayed historical row |

The three nonzero exclusion rows sum to the displayed **7** excluded URLs (derived from 4 + 2 + 1). The report is stale relative to this audit date; it is not evidence that current canonical routes are all indexed or healthy.

The old `glasgow-adapted` placeholder was removed by commit `efd9b47` while `pediatric_gcs` already existed separately. Repository history does not establish instrument equivalence. Do not redirect that retired clinical placeholder automatically to a different instrument. It is absent from the current generated sitemap; retain 404/retirement semantics unless a source-backed mapping is approved.

## Actionable sitemap mismatch

Source: direct Search Console **Sitemaps**, same legacy property. Registered `/sitemap.xml`: submitted **2026-09-12**, last read **2026-10-31**, **335** discovered pages and **335 “URL not allowed” instances**. The expanded error examples were `https://pedscore.app/`, `/es` and `/en`, whereas the submitted sitemap belongs to `https://peds-core.vercel.app/`.

Observed fact: Search Console rejects those cross-domain entries in this property. Inference: the configured property/submission context does not currently establish ownership for the canonical URLs. Do not change canonical URLs back to the old hostname to silence this error. [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) requires verified ownership for cross-site submissions.

## Repository-level canonical/hreflang audit

Baseline `f8537dd`, with the existing compiled catalog reused solely for metadata generation. Ran the lightweight sitemap generator and audited `getCanonicalSeoEntries`, `getStaticSeo` and `renderSeoHead` against the actual HTML template. Restored generated public output afterward; no full local web build.

Results returned by that local audit: **137** catalog tools, **64** implemented products, **335** generated URLs, **334** localized entries, **18** topic routes, **0** duplicate canonical URLs. Every generated head had its expected `pedscore.app` canonical and root `x-default`; every localized route had a reciprocal ES/EN alternate present in the sitemap. This is a code/generator contract, not Google's coverage result.

PR #167 separately fixes React's nine-topic inventory, an invalid tool identifier and previously excluded parity tests. Its browser evidence covers all 18 ES/EN topic pages at 390px, with expected H1, canonical and tool links. Its CI runs the full dist-based SEO audit. No release or production verification is implied by either local check.

## Required owner step and safe follow-up

1. An owner must make a verified `sc-domain:pedscore.app` or `https://pedscore.app/` property available to the account performing the audit. A domain property normally requires DNS control; URL-prefix alternatives have their own verification methods. No credential/token needs to be pasted into chat.
2. With that access, check the canonical property's sitemap history and inspect a small quota-aware sample: ES/EN home, a tool and topic routes, including the previously failing encephalopathy hub. Do not spend quota on all 335 URLs by default.
3. Submit `https://pedscore.app/sitemap.xml` in the verified canonical context only within authorized scope. Record Google-selected vs declared canonical, last crawl and coverage state. A submission or successful fetch is not an indexing guarantee.
4. Merge/release only after explicit authorization; then perform the authorized production smoke before validating corrections or requesting reindexing. Keep the old-property evidence for migration comparison rather than deleting it during this audit.

Blocked now: canonical-property access/verification; optional GSC Wizard automation would also require an active plan/trial. Independent work completed without buying a plan or changing DNS, verification, access permissions or deployment settings.
