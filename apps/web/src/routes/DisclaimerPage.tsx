import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface DisclaimerPageProps {
  language: Language;
}

export function DisclaimerPage({ language }: DisclaimerPageProps) {
  const t = translations[language];

  return (
    <section className="info-page">
      <h1>{t.pages.disclaimerTitle}</h1>
      <p>{t.pages.disclaimerBody}</p>
      <p>{t.tool.disclaimer}</p>
      <p>{t.pages.analyticsPrivacy}</p>
    </section>
  );
}
