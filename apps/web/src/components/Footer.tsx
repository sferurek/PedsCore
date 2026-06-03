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
      <div>
        <p className="footer-brand">PedsCore · 2026 · {t.footer.alpha}</p>
        <p>{t.pages.disclaimerBody}</p>
      </div>
      <div className="footer-notes">
        <span>{t.footer.mit}</span>
        <span>{t.footer.whoLicense}</span>
        <span>{t.footer.noClinicalStorage}</span>
      </div>
      <div className="footer-links">
        {navigate ? (
          <>
            <button
              className="text-link"
              type="button"
              onClick={() => navigate(makePath(language, "evidence"))}
            >
              {t.nav.evidence}
            </button>
            <button
              className="text-link"
              type="button"
              onClick={() => navigate(makePath(language, "disclaimer"))}
            >
              {t.nav.disclaimer}
            </button>
          </>
        ) : null}
        <a href="https://github.com/sferurek/PedsCore" rel="noreferrer" target="_blank">
          {t.common.github}
        </a>
      </div>
    </footer>
  );
}
