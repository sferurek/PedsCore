# Local-only Modified Sarnat adapter and IBD laboratory guards

7 November 2026. These changes remain local on `audit/night-local-candidate-20261107`. No push, PR update, merge or deployment follows the coordinator's uncertain Devpost/material-scope notice. A completed hackathon entry or blanket freeze is not asserted.

## Modified Sarnat: actual form IDs were not accepted

The six declared select fields use `normal`, `mild`, `moderate`, `severe`, with existing scores 0/1/2/3. DynamicForm sends those IDs; the engine accepted numeric inputs only. Reproduced locally: six normal selections produced `invalid_modified_sarnat_category` instead of a result.

Resolve each field through the existing declared-option adapter, retaining the numeric parser for legacy integer strings such as `3.0`. The existing integer 0–3 validation still rejects unsupported values. No weights, predominant-severity selection, ties, interpretation or therapeutic eligibility rules change. This repairs the form/engine contract; it does not validate the clinical model independently.

Four new core tests cover actual form IDs, all 4,096 complete category combinations against the preceding numeric implementation (including complete result/trace equality), legacy strings and malformed/missing inputs. Two actual MCP cases verify normal/severe IDs. Browser walkthroughs on localhost verify ES six normal selections → 0/18 and EN six severe selections → 18/18. Private before/after snapshots and screenshots are in the handoff directory. Numeric parity is a regression check, not an external clinical reference standard.

## PCDAI and wPCDAI: negative laboratory values returned scores

Both catalog definitions already specify a zero lower bound for ESR and albumin. Direct engine/MCP calls bypassed browser restrictions. Synthetic ESR -1 with otherwise minimum-category inputs returned PCDAI 0 or wPCDAI 0 (remission); negative albumin also produced a score.

After the existing missing-input checks, reject negative ESR/albumin with `invalid_pcdai_inputs` / `invalid_wpcdai_inputs`, no score/classification, and a trace of the negative fields. Keep zero, finite decimals, numeric strings, missing-input precedence, all weights/bands and existing upper-range handling. No upper cap is newly enforced; zero acceptance preserves the existing software contract and is not an assertion of clinical plausibility.

Ten new core tests: four negative-field groups failed before the fix and six compatibility cases passed. Numeric and numeric-string negatives are covered. Existing 100/125 score maxima are preserved. Two actual MCP cases verify negative ESR rejection. Sources identify the original models; full published scoring-table validation and independent clinical review are outside this change:

- Hyams et al., 1991: https://pubmed.ncbi.nlm.nih.gov/1678008/ ; https://doi.org/10.1097/00005176-199105000-00005
- Turner et al., wPCDAI development: https://pubmed.ncbi.nlm.nih.gov/21351206/ ; https://doi.org/10.1002/ibd.21649

## Scope and verification

Only synthetic data, local browser and temporary localhost MCP server. No invalid inputs sent to public services. Full app tests, 17 build-gate tests, local MCP tests, lint and web TypeScript are recorded with the exact local commit/tree in the private night report. No full production web build or new remote CI run. Published draft PRs #183–185 and their previous integration snapshot remain unchanged.

The exploratory ordinal scan attempted 427 synthetic vectors across 15 selected tools. It excluded an unscored Modified Sarnat profile, which prompted the adapter investigation, and burn TBSA was outside the numeric-score metric. Its empty range-violation list must not be interpreted as validation of every tool or all clinical cases. The new exhaustive Sarnat regression addresses its identified input-contract defect only.
