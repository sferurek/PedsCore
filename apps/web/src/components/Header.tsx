import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  currentPath: string;
  language: Language;
  navigate: (href: string) => void;
  onLanguageChange: (language: Language) => void;
}

export function Header({
  currentPath,
  language,
  navigate,
  onLanguageChange
}: HeaderProps) {
  const t = translations[language];
  const links = [
    { label: t.nav.tools, href: makePath(language, "tools") },
    { label: t.nav.categories, href: `${makePath(language)}#categories` },
    { label: t.nav.about, href: makePath(language, "about") },
    { label: t.nav.contribute, href: makePath(language, "contribute") },
    { label: t.nav.disclaimer, href: makePath(language, "disclaimer") }
  ];

  const handleClick = (href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      navigate(path ?? makePath(language));
      window.setTimeout(() => {
        document.getElementById(hash ?? "")?.scrollIntoView();
      }, 0);
      return;
    }

    navigate(href);
  };

  return (
    <header className="site-header">
      <button className="brand-link" type="button" onClick={() => navigate(makePath(language))}>
        <span className="brand-mark">PC</span>
        <span>PedsCore</span>
      </button>
      <nav aria-label="Primary navigation" className="main-nav">
        {links.map((link) => (
          <button
            className={currentPath === link.href ? "nav-link active" : "nav-link"}
            key={link.href}
            type="button"
            onClick={() => handleClick(link.href)}
          >
            {link.label}
          </button>
        ))}
      </nav>
      <LanguageSwitcher
        language={language}
        onLanguageChange={onLanguageChange}
      />
    </header>
  );
}

