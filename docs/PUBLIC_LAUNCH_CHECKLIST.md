# Public Launch Checklist

Manual checklist for preparing PedsCore public alpha distribution on GitHub, LinkedIn and search engines.

Prepared launch assets:

- GitHub Release draft: `docs/releases/GITHUB_RELEASE_v0.1.0-alpha.md`
- LinkedIn long post: `docs/social/LINKEDIN_LAUNCH_POST_ES.md`
- LinkedIn short post: `docs/social/LINKEDIN_SHORT_POST_ES.md`
- GitHub profile pin text: `docs/social/GITHUB_PROFILE_PIN_TEXT.md`
- Repository metadata: `docs/social/REPO_DESCRIPTION_AND_TOPICS.md`
- Screenshot checklist: `docs/social/SCREENSHOT_CHECKLIST.md`

## 1. GitHub Repository

- Set repository description:
  `Open-source pediatric and neonatal clinical tools with evidence traceability.`
- Set website:
  `https://sferurek.github.io/PedsCore/`
- Add topics:
  - pediatrics
  - neonatology
  - pediatric-emergency
  - clinical-decision-support
  - medical-education
  - digital-health
  - healthtech
  - open-source
  - typescript
  - react
  - vite
  - clinical-tools
  - pediatric-scores
  - neonatal-scores
  - who-growth
  - evidence-based-medicine
- Pin the repository on the GitHub profile.
- Use `docs/social/GITHUB_PROFILE_PIN_TEXT.md` for profile README or pinned repo copy.
- Confirm README badges render correctly.
- Confirm issue templates and pull request template appear in GitHub UI.

## 2. GitHub Release

- Review `CHANGELOG.md`.
- Review `docs/releases/v0.1.0-alpha.md`.
- Review `docs/releases/GITHUB_RELEASE_v0.1.0-alpha.md`.
- Create tag `v0.1.0-alpha` manually after final review.
- Create GitHub Release manually from that tag.
- Paste release summary from `docs/releases/GITHUB_RELEASE_v0.1.0-alpha.md`.
- Link the public web app:
  `https://sferurek.github.io/PedsCore/`
- Do not attach patient data, clinical screenshots or proprietary source material.

## 3. Google Search Console

- Submit sitemap:
  `https://sferurek.github.io/PedsCore/sitemap.xml`
- Request indexing for home:
  `https://sferurek.github.io/PedsCore/`
- Request indexing for WHO Growth:
  `https://sferurek.github.io/PedsCore/en/tools/who-growth`
  `https://sferurek.github.io/PedsCore/es/tools/who-growth`
- Request indexing for GitHub repository:
  `https://github.com/sferurek/PedsCore`
- Verify robots file:
  `https://sferurek.github.io/PedsCore/robots.txt`

## 4. LinkedIn

- Choose either `docs/social/LINKEDIN_LAUNCH_POST_ES.md` or `docs/social/LINKEDIN_SHORT_POST_ES.md`.
- Publish a public-alpha post.
- Include GitHub repository link:
  `https://github.com/sferurek/PedsCore`
- Include public web app link:
  `https://sferurek.github.io/PedsCore/`
- Mention alpha status, 79 cataloged tools, 18 fully implemented tools and 1 partially implemented WHO Growth module.
- Mention no clinical data storage.
- Use `docs/social/SCREENSHOT_CHECKLIST.md` before sharing screenshots.
- Include screenshots only after manual visual QA.
- Avoid claims such as certified, validated medical device, diagnostic app or treatment recommendation.

## 5. Manual QA

- Home: hero, metrics, CTAs, GitHub links, responsive layout.
- Tools: filters, status counts, WHO Growth discoverability, empty state.
- WHO Growth: form, result panels, charts, print layout, mobile scroll behavior.
- Evidence: status explanation, contribution CTA and safety rationale.
- Disclaimer: scope, clinical judgment and data handling.
- Footer: GitHub, Evidence, Disclaimer, MIT, WHO data license, alpha, no clinical data storage.
- Mobile: no horizontal scroll outside chart containers, tap targets usable.
- Mobile: check home, tools, WHO Growth, evidence and footer on a narrow viewport.
- Print: WHO Growth chart output readable and no navigation chrome.

## 6. Final Local Commands

```bash
npm install
npm run lint
npm run test
npm run build
npm run seo:check
test -f apps/web/dist/index.html
test -f apps/web/dist/404.html
```
