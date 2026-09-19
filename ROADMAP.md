# PedsCore Roadmap

Updated: 19 September 2026.

## Current production baseline

PedsCore has completed the catalog-expansion/unblocking phase.

- 137 cataloged surfaces.
- 134 active.
- 3 deprecated legacy surfaces.
- 0 active blocked surfaces.
- 0 local-planned entries.
- 64 implemented clinical products.
- 61 local-active calculation surfaces.
- Rights-limited tools use official/original external references instead of dead ends.
- WHO and CDC growth workflows are operational.
- ES/EN production is deployed on Vercel.

## Phase 1 — Consolidation and governance

Priority work:

- Keep catalog, discovery metadata, calculator registry and rights register synchronized by automated tests.
- Prevent `permission_required` and `external_only` tools from entering the local calculator registry.
- Keep documentation counts generated or reviewed against code rather than manually drifting.
- Close superseded branches/PRs before new clinical batches are opened.
- Maintain a visible clinical review date and evidence trail.

## Phase 2 — Clinical review

The next clinical-quality milestone is external/independent review, prioritizing the 61 local-active surfaces.

Review order:

1. Critical care and prognostic scores.
2. Sepsis and febrile-infant rules.
3. Head trauma and emergency rules.
4. Renal/AKI tools.
5. Neonatal scores.
6. Respiratory, pain, nutrition and growth tools.

Review should verify population, exact variant, formula/table, boundaries, missing-data behavior, wording and source version.

## Phase 3 — SEO and real-world discovery

- Monitor sitemap/indexing coverage in Google Search Console.
- Expand URL inspection tracking to high-value ES/EN tool pages.
- Improve titles/descriptions from real query data, not keyword stuffing.
- Preserve canonical migration from the former GitHub Pages URL to Vercel.
- Track outbound clicks to official external tools without collecting clinical values.

## Phase 4 — Product quality

- Spain-Spanish terminology review.
- Accessibility and narrow-viewport QA.
- Print/export QA for growth tools.
- Finder relevance tuning from privacy-preserving usage data.
- Error and empty-state review across local and external tools.

## Phase 5 — Project maturity

- Formal clinical-review workflow and reviewer attribution.
- Release/versioning refresh beyond the original alpha baseline.
- Security/disclosure documentation.
- Citation/archival strategy such as Zenodo/DOI.
- Consider a stable custom domain.

## Parallel workstream — Alexa+ / MCP

The Alexa+/MCP hackathon branch remains separate from the production clinical baseline. Reconcile it from current `main` before any merge; do not merge the historical long-running branch wholesale without revalidation.

## Deliberately out of scope for now

- Patient accounts.
- Clinical-data persistence.
- Diagnostic chatbot behavior.
- Automatic treatment/prescribing decisions.
- Making every protected tool local merely to increase the local-calculator count.
