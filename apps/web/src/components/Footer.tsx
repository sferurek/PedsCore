import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="site-footer">
      <p>PedsCore · 2026</p>
      <p>{t.pages.disclaimerBody}</p>
      <a href="https://github.com/sferurek/PedsCore" rel="noreferrer" target="_blank">
        {t.common.github}
      </a>
    </footer>
  );
}

