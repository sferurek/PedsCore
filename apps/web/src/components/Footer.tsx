import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";

interface FooterProps {
  language: Language;
  navigate?: (href: string) => void;
}

export function Footer({ language, navigate }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="site-footer">
      <p>PedsCore · 2026</p>
      <p>{t.pages.disclaimerBody}</p>
      <div className="link-row">
        {navigate ? (
          <button
            className="text-link"
            type="button"
            onClick={() => navigate(makePath(language, "evidence"))}
          >
            {t.nav.evidence}
          </button>
        ) : null}
        <a href="https://github.com/sferurek/PedsCore" rel="noreferrer" target="_blank">
          {t.common.github}
        </a>
      </div>
    </footer>
  );
}
