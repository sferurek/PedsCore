import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface AboutPageProps {
  language: Language;
}

export function AboutPage({ language }: AboutPageProps) {
  const t = translations[language];

  return (
    <section className="info-page">
      <h1>{t.pages.aboutTitle}</h1>
      <p>{t.pages.aboutBody}</p>
      <div className="info-grid">
        <article>
          <h2>Core</h2>
          <p>TypeScript contracts, metadata and future deterministic engines.</p>
        </article>
        <article>
          <h2>Web</h2>
          <p>Bilingual catalog interface deployed on Vercel.</p>
        </article>
      </div>
    </section>
  );
}
