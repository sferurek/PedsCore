# P0 local SEO/runtime verification — 2026-11-05

Branch: `fix/p0-seo-topic-parity-20261105`, recovering #136 on main `f8537dd`.

Browser: Chromium, local Vite server, viewport 390×844. Each slug below was directly loaded in both `/es/topics/` and `/en/topics/`. All 18 pages rendered their expected localized H1, canonical `https://pedscore.app/{language}/topics/{slug}`, and tool links. Document width was 390px throughout; the comparison tables did not enlarge the document.

| Slug | Tool links per language (card + table) | ES | EN |
| --- | ---: | --- | --- |
| pediatric-head-injury-rules | 8 | pass | pass |
| neonatal-pain-scales | 10 | pass | pass |
| neonatal-encephalopathy-scores | 8 | pass | pass |
| pediatric-asthma-wheeze-scores | 6 | pass | pass |
| pediatric-febrile-infant-tools | 8 | pass | pass |
| pediatric-intensive-care-scores | 12 | pass | pass |
| pediatric-kidney-function-aki-tools | 10 | pass | pass |
| preterm-pediatric-growth-tools | 12 | pass | pass |
| pediatric-croup-scores | 4 | pass | pass |

The browser pass uncovered an existing invalid García-Alix identifier (`garcia_alix_ne_rs`), which threw from `getTool` and blanked the encephalopathy hub. Corrected to the catalog ID `garcia_alix_ners` in both React and static SEO inventories. No clinical engine changed.

Focused validation: 2 suites / 10 assertions pass. Checks cover generated/localized route parity, parser/language switches, duplicates/unknown slugs, resolution and SSR rendering of all runtime tool references, and equivalent tool links in static SEO bodies. Vitest now includes `.test.js`, so the generated-parity suite actually executes under default CI.

Necessary full build and dist-based SEO audit run in GitHub CI. This dev-server pass verifies React runtime routes and DOM canonical metadata; it does not prove production prerendering, hosting redirects or actual Google index coverage. No deployment was created. The branch explicitly disables its own automatic Git deployments; project-level restrictions remain untouched. Merge/release requires Sergio's authorization.
