# PedsCore Clinical Review Program

Updated: 19 September 2026.

## Purpose

PedsCore separates technical implementation from clinical review. A tool can be technically implemented and evidence-traceable without claiming independent expert validation.

The clinical review program creates a reproducible second layer of review for locally implemented tools.

## Scope

Priority population: the 61 `local_active` clinical surfaces.

Review order is risk-based.

### Tier A — critical/high-risk first

1. PRISM IV
2. PELOD-2
3. PIM3
4. pSOFA
5. Phoenix Sepsis
6. Step-by-Step febrile infant
7. PECARN Febrile Infant
8. PECARN TBI <2 years
9. PECARN TBI >=2 years
10. CATCH
11. CHALICE
12. pRIFLE
13. Pediatric KDIGO
14. nSOFA
15. SNAPPE-II

### Tier B — neonatal / emergency / organ-specific

- Modified Sarnat / NICHD
- Thompson HIE
- García-Alix NE-RS
- Modified Bell NEC
- CKiD U25
- Revised Schwartz
- Bedside Schwartz
- Bacterial Meningitis Score
- pARC
- SIPA
- Pediatric Appendicitis Score
- Gorelick dehydration
- Clinical Dehydration Scale

### Tier C — respiratory, pain, nutrition, growth and longitudinal scores

- PRAM
- PASS
- Modified Tal
- RDAI
- Westley
- Taussig
- Wood-Downes-Ferres
- RISC / mRISC
- NIPS
- CRIES
- STRONGkids
- WHO Growth surfaces
- CDC Growth Percentiles
- PUCAI / PCDAI / wPCDAI
- remaining local-active tools

## Required review checklist

A reviewer should verify:

- exact instrument/version;
- intended population and exclusions;
- input definitions and units;
- formula, table or branching logic;
- inclusive/exclusive thresholds;
- handling of missing values;
- interpretation bands;
- whether output wording stays descriptive;
- primary/authoritative source match;
- licensing/reuse classification;
- ES and EN clinical wording;
- at least one positive and one boundary test fixture;
- no management recommendation added beyond project scope.

## Review outcome

Use one of:

- `reviewed_no_change`
- `reviewed_minor_correction`
- `reviewed_logic_change`
- `review_blocked_source`
- `review_blocked_rights`

A review must record reviewer identity/role, date, tool version/commit, sources checked and outcome. PedsCore must not claim independent review unless an identifiable reviewer has actually completed this process.

## Change control

Any logic-changing review outcome requires:

1. a dedicated PR;
2. source citation;
3. updated tests;
4. updated evidence note;
5. re-run of `npm run audit:governance`, `npm run test`, `npm run build`, and `npm run seo:check`.

## Initial milestone

Complete Tier A before making stronger public claims about clinical validation. Until then, PedsCore remains an evidence-traceable public-alpha project rather than an independently validated clinical product.
