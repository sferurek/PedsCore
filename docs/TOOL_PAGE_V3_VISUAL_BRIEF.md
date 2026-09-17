# Tool Page V3 — visual redesign brief

Status: design specification only. No clinical logic changes.

## Product goal

Opening an active tool should feel like opening a clinical instrument, not an admin dashboard.

Primary hierarchy:

1. Identify the tool.
2. Use the calculator/rule immediately.
3. Read the result and interpretation.
4. Expand context, evidence and maintenance only when needed.

The current page contains valuable content but gives too many blocks equal visual weight. V3 keeps the information and changes its hierarchy.

## Design principles

- Calculator first.
- One dominant visual surface per viewport.
- Fewer bordered cards.
- More whitespace and typographic hierarchy.
- Secondary metadata collapses by default.
- Evidence remains fully reachable and crawlable.
- Mobile flow is optimized for one-handed clinical use.
- No decorative UI that competes with the calculation.
- No visual signal should imply clinical superiority of one tool over another.

## Desktop information architecture

### 1. Compact tool header

One horizontal/stacked header containing:

- breadcrumb
- short tool name / H1
- expanded name where useful
- one-sentence clinical description
- status chip
- evidence chip
- Favorite
- Share

Remove from the hero:
- large metadata grids
- repeated descriptions
- large review blocks

Target height: approximately 180–240 px before the calculator begins.

### 2. Clinical quick strip

A single low-height strip, not six cards.

Columns:
- Use in
- Population
- Main output
- Important caution

Each value should be 1–2 lines maximum.

A “More clinical context” disclosure expands:
- When to use
- Applicability limits
- Inputs
- Detailed limitations

### 3. Calculator workspace

This is the primary page surface.

Desktop:
- left: input form
- right: result card, sticky only when useful

Mobile:
- form first
- result immediately after completion
- no editorial content inserted between form and result

The calculator container should have stronger contrast than all secondary panels.

### 4. Result hierarchy

Result card:

- large score/value
- classification directly below
- concise interpretation
- warnings / matched criteria where applicable
- small secondary action: “How this was calculated”

The calculation trace remains collapsed by default.

Do not show evidence/review metadata inside the result card.

### 5. Interpretation

Directly below the workspace:

- interpretation bands
- scoring table if clinically useful

Use tables only when the source structure warrants them.
Avoid placing large explanatory paragraphs before the table.

### 6. Secondary knowledge area

After the operational flow, use a single section with accordions/tabs:

- Clinical context
- Evidence
- References
- Review & maintenance
- Reuse / licensing when relevant

This replaces several consecutive full-width bordered cards.

All information remains in the DOM / prerendered HTML for accessibility and SEO where technically appropriate.

### 7. Related tools

At the bottom:

- 3–4 highly relevant tools
- why each is related
- topic comparison hub where available

Avoid an undifferentiated grid of 8 visually equivalent cards.

## Mobile flow

Strict order:

1. H1 + short description
2. status / favorite / share
3. quick clinical strip
4. calculator
5. result
6. interpretation
7. context/evidence accordions
8. related tools

Recommended:
- sticky bottom button “Calculate” only while form is incomplete
- after calculation, replace with “View result”
- no sticky bar if it hides clinical content or keyboard controls

Minimum touch target: 44 px.

## Visual system

### Surfaces

Use only three levels:

1. Page background
2. Main clinical surface
3. Soft secondary disclosure surface

Avoid nested cards inside cards whenever possible.

### Borders

- thin neutral borders for structural grouping
- accent border only for calculator/result or genuine warning
- remove decorative borders from ordinary explanatory text

### Radius

Use one consistent medium radius across clinical surfaces.
Avoid mixing pill/card/large rounded containers excessively.

### Typography

- H1: tool identity
- H2: major workflow stage
- H3: contextual subsection
- eyebrow labels only for truly useful orientation

Reduce uppercase eyebrow repetition.

### Color

- blue/teal: interaction / active calculation
- neutral: context/evidence
- amber: caution
- red: safety warning only
- green should not imply “clinically good” unless semantics genuinely support it

## Blocks to visually demote from current implementation

- editorial transparency
- tool quality profile
- named-review status
- implementation metadata
- reuse/licensing metadata
- long validation prose
- source year

These are valuable but secondary to clinical use.

## Blocks to visually promote

- calculator
- result
- interpretation
- critical exclusions/applicability limits
- important warnings
- source-backed next-step information only where the instrument itself supports it

## Content deduplication

Current tool pages repeat similar information across:

- hero description
- clinical guide
- about-tool
- editorial insight
- evidence summary
- editorial transparency
- metadata aside

V3 should maintain one authoritative copy of each concept.

Target:
- tool description: once prominently
- population: once in quick strip, expanded detail if necessary
- validation note: once in evidence/limitations
- implementation status: header + detailed secondary panel only
- references: one canonical reference section

## Tool-specific exceptions

### Simple scores
Apgar, NIPS, CRIES, Silverman:
- calculator should begin almost immediately after header

### Rules
PECARN, CATCH, CHALICE:
- strong fit for future Guided Mode
- keep full form fallback

### Numeric formula calculators
QTc, Schwartz:
- extremely compact input/result workspace
- formula / calculation trace available on demand

### Reference-only tools
Sarnat classic and rights-limited tools:
- replace empty calculator space with a concise authoritative reference panel
- external official action should be obvious when relevant

### Growth tools
Keep chart/workspace-specific UI; do not force them into score-card structure.

## Acceptance criteria

A tool page passes V3 visual QA when:

- calculator or primary clinical action is visible without excessive scrolling on standard desktop
- mobile reaches calculator before evidence/editorial sections
- no more than two strong bordered surfaces are visible simultaneously above the fold
- no duplicated clinical description appears in adjacent sections
- result is visually dominant after calculation
- evidence remains accessible within one interaction
- favorite/share do not compete with calculate
- ES and EN have equivalent hierarchy
- keyboard and screen-reader navigation remain intact
- no clinical content or interpretation is lost
- prerendered SEO content remains substantive and linked

## First reference page

Use PRAM as the first design specimen because it contains:

- active calculation
- multiple clinical inputs
- interpretation
- evidence
- related respiratory tools
- an existing comparison hub

Once PRAM is visually approved, apply the same system to:

1. Westley
2. PECARN
3. Apgar
4. NIPS
5. Schwartz/QTc
6. remaining active tools

Exceptions are documented above rather than allowing every tool to develop its own layout.
