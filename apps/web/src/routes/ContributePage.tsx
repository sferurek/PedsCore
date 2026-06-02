import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface ContributePageProps {
  language: Language;
}

export function ContributePage({ language }: ContributePageProps) {
  const t = translations[language];

  return (
    <section className="info-page">
      <h1>{t.pages.contributeTitle}</h1>
      <p>{t.pages.contributeBody}</p>
      <a
        className="primary-link"
        href="https://github.com/sferurek/PedsCore/issues/new/choose"
        rel="noreferrer"
        target="_blank"
      >
        {t.tool.feedbackLink}
      </a>
    </section>
  );
}

