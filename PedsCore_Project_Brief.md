# PedsCore Project Brief

## Executive summary

PedsCore aims to become a comprehensive **open‑source resource for paediatric and neonatal clinical tools**. The project consolidates validated scores, scales, calculators, algorithms, nomograms and percentiles into a single platform. By doing so, it empowers healthcare professionals, trainees and developers to access high‑quality tools with transparent implementations and robust references. PedsCore is designed to be modular, extensible and community‑driven.

## Justification

Many calculators and apps currently available are proprietary, limited in scope or lack transparency. Clinicians may need to consult multiple sources to obtain the tools they need, and the underlying calculations are often opaque. PedsCore fills this gap by offering a **free, audited and evidence‑based collection** of paediatric and neonatal tools. The open‑source model encourages peer review, reproducibility and rapid improvement, which ultimately benefits patients and the scientific community.

## Target audience

- **Clinicians** – paediatricians, neonatologists, emergency physicians, intensivists and other specialists who rely on clinical tools in daily practice.
- **Students and residents** – medical and nursing trainees who are learning about paediatric and neonatal care.
- **Researchers and academics** – investigators who need reproducible implementations for research and teaching.
- **Developers and educators** – software engineers, data scientists and educators who wish to integrate these tools into their applications, simulators or curricula.

## Value proposition

- **Open and free access** – PedsCore will always be free to use, with code licensed under MIT and documentation under CC BY 4.0.
- **Comprehensive coverage** – from adaptation at birth to critical care, including growth and developmental assessments.
- **Evidence‑based** – every tool includes references to primary literature and official guidelines.
- **Modular architecture** – a core library reusable across web, mobile and API contexts.
- **Internationalisation** – bilingual support (Spanish and English) from the outset, with potential for additional languages.
- **Community‑driven** – encourages contributions, peer review and shared ownership.

## Regulatory boundaries

PedsCore is **not** a medical device. It provides educational and informational support and **does not offer therapeutic recommendations**. Clinicians must interpret results within their professional judgement and adhere to local protocols. To minimise privacy risks, PedsCore **does not store patient data**. Tools involving drug dosing or direct treatment recommendations are excluded from the current scope to avoid high regulatory burden. The project will remain aligned with local and international regulations and will seek specialist advice before any expansion into regulated areas.

## Technical architecture (future)

- **Core library (packages/core)** – A TypeScript library implementing the logic and validation of each tool, accompanied by unit tests and type definitions.
- **Static web frontend (apps/web)** – A React/Vite application served via GitHub Pages, featuring a bilingual interface, search functionality and dynamic forms.
- **Mobile applications** – Plans for native or hybrid apps using frameworks such as Flutter or React Native, reusing the core library.
- **Public API** – A future REST or GraphQL API to allow integration into electronic health record systems, research tools and educational platforms.
- **Continuous integration and deployment** – GitHub Actions will manage linting, testing, building and deployment to GitHub Pages.

## Next steps for REMODEX/Codex

1. **Review the knowledge base** – Ensure that the compiled scores, scales and calculators are complete, accurate and properly referenced.
2. **Generate the TypeScript core** – Implement each tool identified in the MVP with input validation, calculations, categories and references.
3. **Write unit tests** – Develop comprehensive tests to validate the logic and edge cases for each tool.
4. **Scaffold the web application** – Create a React/Vite app that consumes the core library, with routing, search and bilingual support.
5. **Set up CI/CD** – Configure GitHub Actions for linting, testing, building and deploying the web to GitHub Pages.
6. **Prepare internationalisation** – Define translation files and ensure all user‑facing text is translatable.
7. **Publish the MVP** – Deploy the initial version, gather feedback from users, and iterate.
