# Search accessibility follow-up — 7 November 2026

## 1. UX Brief
Clinicians need catalogue search to remain available while scrolling and to have correctly associated labels. Keep the existing search interaction/design; fix the demonstrated loss of Cmd/Ctrl+K and duplicate input IDs. This patch is separate from #183 and changes no clinical scoring or search ranking.

## 2. UX States Matrix

| State | Trigger | Response / recovery |
| --- | --- | --- |
| Loading | Existing local catalogue | No new network state |
| Empty | Open dialog / empty query | Existing first-eight suggestions, input focused |
| Error (recoverable) | Query has no matches | Existing no-results message; edit query |
| Error (fatal) | None introduced | Existing route handling |
| Success | Matching query / choose result | Existing result navigation, dialog closes |
| Disabled/pending | None introduced | Native dialog behavior retained |
| Partial/degraded | Header changes with scroll | Shortcut and label association remain available |

## 3. Visual Direction
Retain typography, spacing, result cards and dialog CSS. No motion or visual redesign. Native dialog keeps focus containment, Escape and focus restoration.

## 4. Component Contracts
SearchCommand props and navigation/analytics contracts stay unchanged. Header instances (compact or nav) own the global shortcut; hero instances do not register another handler. React useId supplies one stable label/input ID per component instance, independent of presentation props. No raw query text is added to analytics.

## 5. File Plan
SearchCommand.tsx, focused SSR regressions, this evidence and the branch deployment guard. No dependency or clinical-source changes. Branch based on #183; #183 remains at its original SHA and is not modified.

## 6. Implementation
Baseline browser reproduction: initial IDs nav-search/hero-search and Cmd+K opens one dialog. After PageDown, header becomes is-scrolled, both IDs become hero-search, and Cmd+K opens zero dialogs. The header's compact prop changed to false, removing its shortcut listener; nav was true but ignored. Use a stable per-instance ID and keep the listener enabled for either header presentation.

## 7. Verification
Six SSR cases cover ES/EN unique label associations in initial/scrolled header+hero renders and ID independence from header presentation. Four fail on the baseline and two pass. Browser QA on Mac checks Cmd+K before/after scroll in ES/EN, both launchers, focus/label association, Escape restoration, query/no-results, Tab/Enter navigation and 390/768/1440px widths without horizontal overflow. The Ctrl+K event condition is unchanged; the automation backend rejected its alternate Control-key action on this Mac, so no cross-platform manual Ctrl+K result is claimed. Full CI is recorded in the draft PR; no full production build is run locally.

## 8. PR Summary
Restore reliable keyboard catalogue access after scrolling and prevent duplicate IDs. Preserve empty/success/no-results states, privacy, styling and native modal semantics. No merge or deployment; previews disabled. When #183 is integrated, retarget/reconcile this follow-up rather than duplicating the candidate commits.
