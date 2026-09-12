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
          <h2>{t.pages.coreTitle}</h2>
          <p>{t.pages.coreBody}</p>
        </article>
        <article>
          <h2>{t.pages.webTitle}</h2>
          <p>{t.pages.webBody}</p>
        </article>
      </div>
    </section>
  );
}
