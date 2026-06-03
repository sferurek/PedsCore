# Security Policy

PedsCore is a static public-alpha web app and TypeScript library. It currently has no backend, no login system and no clinical data storage.

Do not submit patient-identifiable information or real clinical cases in issues, pull requests, screenshots, examples or tests.

## Reporting Security Issues

If the issue is sensitive, use GitHub private vulnerability reporting if it is available for this repository.

If private vulnerability reporting is not available and the issue is not sensitive, open a GitHub issue with a concise description and reproduction steps.

Do not publish exploit details publicly before maintainers have had a reasonable opportunity to review and respond.

## Data Handling

- PedsCore should not receive patient-identifiable data.
- The current app has no backend.
- The current app has no account system.
- The current app does not store clinical form values.
- Clinical form values and calculation results must not be sent to analytics.

## Secrets And Dependencies

- Do not commit secrets, API keys, tokens, private certificates or credentials.
- Keep dependency changes minimal and review lockfile changes.
- Report dependency vulnerabilities with package name, affected version and suggested fix when available.

## Scope

Security reports may include:

- Dependency vulnerabilities.
- GitHub Pages deployment issues.
- Unsafe data handling.
- Accidental exposure of secrets.
- Cross-site scripting or client-side injection risks.
- Documentation or workflow instructions that could cause unsafe disclosure.
