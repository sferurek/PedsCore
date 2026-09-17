# PedsCore SEO operating plan — 2026-09-16

## Baseline

Google Search Console data settled through 2026-09-14:

- 20 web impressions, 0 clicks.
- 13 landing pages received impressions.
- 14 visible queries; query-level privacy/anonymization hides about 30% of impressions.
- 19/20 impressions were desktop and 1/20 mobile; sample is too small for device conclusions.
- First-page probes already observed:
  - `/en/tools/wood-downes-ferres`: 4 impressions, average position 8.
  - `/es/tools/pim2`: query `pim 2 calculadora`, 1 impression, position 9.
- Other early probes include PECARN, NIPS, FLACC, QTc Bazett, PELD, pediatric Glasgow, Westley Croup and ACQ.
- GSC sitemap is accepted with no warnings/errors. GSC reported 287 submitted URLs in its sitemap summary while the live sitemap parser found a newer larger set; re-check after the next production deployment.

These numbers are discovery-stage data, not enough to judge CTR or stable ranking.

## Indexing tracker

GSC Wizard indexing tracking was enabled on 2026-09-16 for a priority cohort of 45 URLs covering:

- root and ES/EN home/catalog pages;
- key neonatal calculators and scores;
- respiratory scores;
- dehydration/appendicitis;
- PECARN head injury;
- renal eGFR;
- QTc;
- SIPA;
- pediatric burn TBSA.

The tracker should be used to follow transitions such as unknown → discovered → crawled → indexed. Do not request indexing repeatedly for the full catalog.

## On-page rules for active/unlocked tools

Every locally active tool should have:

1. A unique intent-specific ES and EN title under 60 characters where practical.
2. A concise meta description that states when local calculation is active.
3. A crawlable H1, clinical description, population and scope.
4. Visible evidence/validation status and implementation status.
5. Clickable traceable references (DOI, PubMed or official source where available).
6. A clear calculator anchor when calculation is locally active.
7. Clinical interpretation and scoring information only when source fidelity allows it.
8. Related-tool internal links.
9. A comparison/topic-hub link when a meaningful comparison group exists.
10. MedicalWebPage + Breadcrumb structured data and canonical/hreflang metadata.
11. No claim that catalog inclusion equals a clinical recommendation.
12. No treatment/disposition recommendation unless explicitly supported and intentionally implemented.

## Topic hubs

Four indexable comparison hubs are added:

- Pediatric head injury rules: PECARN, CATCH, CHALICE.
- Neonatal pain scales: NIPS, CRIES, PIPP/PIPP-R, COMFORTneo.
- Neonatal encephalopathy scores: Classic Sarnat, Modified Sarnat/NICHD, Thompson HIE, García-Alix.
- Pediatric asthma/wheeze severity: PRAM, PASS, Wood-Downes-Ferres.

The hubs must describe non-equivalence and link to the individual canonical tool pages. Tool pages link back to relevant hubs.

## Governance / YMYL trust

The About/Evidence surfaces should clearly document:

- evidence hierarchy;
- activation gates;
- public change history;
- source/variant/licensing review;
- automated test expectations for active calculations;
- explicit distinction between active calculator, clinical reference, draft and rights/evidence-limited content;
- public issue reporting for calculation, clinical, translation, accessibility and link errors;
- no claim of independent expert review unless documented.

## 7–14 day optimization rule

Do not rewrite pages based on one or two impressions.

Prioritize pages when they reach a useful data threshold, especially:

- positions 1–10: preserve unless a clear defect exists;
- positions 11–30 with meaningful impressions: primary optimization targets;
- positions 31–50: inspect intent/content/internal links after enough impressions;
- positions >50: wait for more discovery data unless metadata is clearly mismatched.

Track query/page pairs rather than site-wide average position.

## Post-deploy SEO smoke test

After the next successful production deployment:

1. Run the repository SEO check.
2. Verify `robots.txt` and `sitemap.xml` from production.
3. Confirm sitemap URL count equals the generated expected set.
4. Confirm every topic hub returns a real prerendered HTML route, not an SPA fallback/404.
5. Inspect canonical + ES/EN reciprocal hreflang on:
   - one active calculator;
   - one reference-only tool;
   - one category;
   - one topic hub.
6. Confirm MedicalWebPage schema on tool pages and CollectionPage/ItemList on hubs.
7. Confirm active tool static HTML has a calculator link and clickable evidence references.
8. Check GSC sitemap warnings/errors.
9. Recheck indexing tracker; manually inspect only a small set of priority URLs if needed.
10. Review new GSC queries after settled data catches up.

## Link acquisition

Prefer editorially legitimate links:

- project GitHub and profile;
- professional/educational pages;
- clinical simulation/education communities;
- relevant open-source directories;
- substantive Reddit/LinkedIn discussions;
- academic or teaching resources that genuinely use or review PedsCore.

Do not buy links, create keyword-stuffed satellite pages, or mass-submit low-quality directories.
