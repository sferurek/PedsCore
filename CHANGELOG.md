# Changelog

All notable changes to PedsCore are documented in this file.

## v0.1.0-alpha

Initial public alpha release.

- 79 pediatric and neonatal clinical tools cataloged.
- 17 tools fully implemented with active calculation or informational rule output.
- 1 partially implemented module: WHO Growth.
- Bilingual ES/EN web application.
- GitHub Pages deployment configured and active.
- Evidence-first references and validation status model.
- Dynamic forms for implemented tools.
- WHO Growth module with official WHO 0-5 indicators, partial WHO 5-19 support,
  printable SVG charts, written percentile labels and guided age input.
- Pediatric head trauma rules hardened as informational-only outputs.
- Visible validation status for implemented, pending, catalog-only and license-sensitive tools.
- No backend.
- No clinical data storage.
- MIT license for code.

### SPRINT-50 safety audit

- Implementation count before audit: 17.
- Implementation count after audit: 17.
- Partial implementation count after status-model refresh: 1.
- No new tools were promoted to `implemented` because no additional
  unimplemented tool simultaneously satisfied source, complete formula/table,
  exact variant, inputs, tests, safe output and licensing gates.
- Added `docs/evidence/SPRINT_50_IMPLEMENTATION_PLAN.md` with a full catalog
  audit and deferred-tool rationale.
- Added safety tests to keep RCP/therapeutic algorithms, ICU/prognostic scores,
  proprietary tools and license-sensitive tools out of `implemented` status.
- WHO Growth remains available as a partial guided module but stays
  `pending_validation` until remaining 5-19 scope, interpolation policy and
  final maintainer/expert review are complete.

### Implemented tools

- Apgar.
- Silverman-Andersen.
- FLACC.
- QTc Bazett.
- QTc Fridericia.
- QTc Framingham.
- QTc Hodges.
- Bedside Schwartz.
- Westley Croup Score.
- PRAM.
- Clinical Dehydration Scale.
- PECARN TBI under 2 years.
- PECARN TBI 2 years or older.
- CATCH.
- CHALICE.
- SIPA.
- NIPS.

### WHO Growth module

- WHO Child Growth Standards 0-5 indicators available in the unified growth
  module: BMI-for-age, weight-for-age, length/height-for-age, head
  circumference-for-age, weight-for-length and weight-for-height.
- WHO Growth Reference 2007 5-19 indicators partially available:
  BMI-for-age and height-for-age.
- Uses normalized official WHO LMS data under separate WHO data licensing; WHO
  data are not relicensed as MIT.
- Charts are generated as PedsCore SVG, not copied WHO images.
- Printable charts include written percentile labels P3/P15/P50/P85/P97 and a
  visible patient point.
- Guided age input supports dates, exact days, structured years/months/days and
  completed months for 5-19.
- No clinical data are stored or sent to analytics.
- The unified module remains `pending_validation` pending final maintainer
  review, interpolation policy and remaining 5-19 scope.

### Safety notes

- Clinical rules are presented as informational and traceability outputs only.
- PedsCore does not provide treatment, admission, discharge, imaging or referral recommendations.
- WHO Growth outputs do not provide nutritional diagnoses or treatment
  recommendations.
- PedsCore does not replace clinical judgment, local protocols or medical decision-making.
