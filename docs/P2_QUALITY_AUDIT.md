# PedsCore P2 Quality Audit

Updated: 19 September 2026.

## Scope

P2 focuses on product quality rather than catalog expansion:

1. Spain-Spanish clinical/editorial wording.
2. Accessibility and mobile interaction.
3. Privacy-preserving Finder/navigation observability.

## Language / editorial changes

- Removed stale WHO Growth “partial” wording from the Home experience.
- WHO Growth is presented consistently with its current implemented status.
- Resuscitation copy now describes official-source access rather than an obsolete editorial-review state.
- Generic partial-status copy no longer embeds obsolete WHO-specific statements.
- Spanish discovery terminology uses “Enfermedades infecciosas” and “casuística”.
- Spanish UI type label uses “Puntuación” instead of the English “Score”.

## Accessibility / mobile changes

- Added bilingual skip-to-main-content link.
- Added a global visible `:focus-visible` treatment.
- Added reduced-motion handling.
- Finder free-text input now has an explicit programmatic label.
- Finder query field is linked to a privacy guidance note.
- Finder results announce updates through an aria-live region.
- Search command focuses its search input when the native modal dialog opens.
- Textarea inherits application typography.
- Mobile Finder textarea uses a 16px font size to avoid browser zoom behavior.
- Key Finder/discovery touch targets have a 44px minimum height on narrow screens.

## Privacy-preserving observability

New aggregate events:

- `finder_used`
- `finder_result_opened`
- `finder_compare_used`
- `navigation_used`

The analytics allowlist still rejects free-text query content and arbitrary parameters. Finder events record only categorical metadata such as scope, whether a query existed, match/empty state and the selected catalog tool ID.

The UI explicitly tells users not to enter identifying data and states that Finder query text is not sent to analytics.

## Automated coverage

Tests now cover:

- skip navigation;
- current WHO status wording;
- Finder/free-text analytics rejection;
- updated aggregate-event contract.

CI continues to run lint, test, build, governance audit and SEO audit.

## Remaining manual review

Automated code checks cannot replace a real assistive-technology and device pass. Recommended manual matrix:

- VoiceOver + Safari on iPhone.
- VoiceOver + Safari on macOS.
- keyboard-only navigation on Chrome/Firefox.
- 320px, 375px, 768px and desktop widths.
- 200% browser zoom.
- reduced-motion preference.
- dark/high-contrast operating-system settings where applicable.

Any issue found in the manual matrix should be filed as a reproducible GitHub issue without patient data.
