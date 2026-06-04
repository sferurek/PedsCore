# PedsCore SEO and discoverability checklist

This checklist contains manual, non-spam actions to help Google, GitHub and social platforms discover PedsCore.

## GitHub repository metadata

1. In repository settings, add this description:

   `Open-source pediatric and neonatal clinical scores, calculators and decision-support tools with evidence traceability.`

2. Add website:

   `https://peds-core.vercel.app/`

3. Add topics:

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
   - evidence-based-medicine

4. Pin the repository on the GitHub profile.

5. Add a link to PedsCore from the GitHub profile README if available.

## Search engine indexing

1. Submit sitemap in Google Search Console:

   `https://peds-core.vercel.app/sitemap.xml`

2. Request indexing for:

   - `https://peds-core.vercel.app/`
   - `https://github.com/sferurek/PedsCore`

3. After deployment, verify:

   - `https://peds-core.vercel.app/robots.txt`
   - `https://peds-core.vercel.app/sitemap.xml`

4. After the WHO Growth release refresh, request re-indexing for:

   - `https://peds-core.vercel.app/es/tools/who-growth`
   - `https://peds-core.vercel.app/en/tools/who-growth`

## Public announcement

1. Publish a LinkedIn post with links to the repository and public web app.
   Suggested topic: PedsCore alpha now includes a WHO Growth module with
   official WHO 0-5 data, partial WHO 5-19 data, printable SVG charts, written
   percentile labels and guided age input.
2. Avoid keyword stuffing, paid links, cloaking or hidden text.
3. Describe PedsCore as alpha, open source, evidence-first and not a substitute for clinical judgment.

## Maintenance

1. Re-run `npm run seo:check` after major routing or catalog changes.
2. Ensure new public routes are added to the sitemap generator.
3. Keep README keywords natural and clinically accurate.
