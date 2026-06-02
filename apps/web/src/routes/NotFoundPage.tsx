import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";

interface NotFoundPageProps {
  language: Language;
  navigate: (href: string) => void;
}

export function NotFoundPage({ language, navigate }: NotFoundPageProps) {
  const t = translations[language];

  return (
    <section className="info-page">
      <h1>{t.pages.notFoundTitle}</h1>
      <p>{t.pages.notFoundBody}</p>
      <button
        className="primary-link as-button"
        type="button"
        onClick={() => navigate(makePath(language))}
      >
        PedsCore
      </button>
    </section>
  );
}

