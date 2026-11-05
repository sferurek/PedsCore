import { useEffect, useRef, useState, type MouseEvent } from "react";
import { translations } from "../i18n/translations";
import { atlas } from "../i18n/atlas";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import { PEDSCORE_SIM_URL } from "../utils/externalLinks";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Icon } from "./atlas/Icon";
import { SearchCommand } from "./atlas/SearchCommand";

interface HeaderProps {
  currentPath: string;
  language: Language;
  navigate: (href: string) => void;
  onLanguageChange: (language: Language) => void;
}

export function Header({ currentPath, language, navigate, onLanguageChange }: HeaderProps) {
  const t = translations[language];
  const a = atlas[language];
  const sheet = useRef<HTMLDialogElement>(null);
  const toolMenu = useRef<HTMLDetailsElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const isToolDetailPage = currentPath.startsWith(`/${language}/tools/`);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const go = (href: string) => {
    sheet.current?.close();
    toolMenu.current?.removeAttribute("open");
    navigate(href);
  };

  const goLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    go(href);
  };

  if (isToolDetailPage) {
    return (
      <>
        <a className="atlas-skip" href="#main-content">{a.skip}</a>
        <header className="pram-minimal-header tool-minimal-header">
          <div className="pram-header-right">
            <SearchCommand compact language={language} navigate={navigate} />
            <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
            <details className="pram-header-menu" ref={toolMenu}>
              <summary aria-label={a.menu}>
                <span />
                <span />
                <span />
              </summary>
              <nav aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>
                <a href={makePath(language, "tools")} onClick={(event) => goLink(event, makePath(language, "tools"))}>
                  {a.productLabels.tools}
                </a>
                <span className="pram-menu-disabled" aria-disabled="true">
                  {a.productLabels.learn}
                </span>
                <a href={PEDSCORE_SIM_URL}>{a.productLabels.sim}</a>
                <a href={makePath(language, "about")} onClick={(event) => goLink(event, makePath(language, "about"))}>
                  {t.nav.about}
                </a>
              </nav>
            </details>
          </div>
        </header>
      </>
    );
  }

  const links = <>
    <a className="nav-link" href={makePath(language, "tools")} aria-current={currentPath.includes("/tools") ? "page" : undefined} onClick={(event) => goLink(event, makePath(language, "tools"))}>{a.productLabels.tools}</a>
    <span className="atlas-future-nav">{a.productLabels.learn}</span>
    <a className="nav-link" href={PEDSCORE_SIM_URL}>{a.productLabels.sim}</a>
    <span className="atlas-future-nav">{a.productLabels.live}</span>
    <a className="nav-link" href={makePath(language, "about")} onClick={(event) => goLink(event, makePath(language, "about"))}>{t.nav.about}</a>
  </>;

  return <>
    <a className="atlas-skip" href="#main-content">{a.skip}</a>
    <header className={`site-header atlas-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand-link" href={makePath(language)} onClick={(event) => goLink(event, makePath(language))}><span className="atlas-brand-mark"><Icon name="heart" /></span><span>PedsCore<small>{a.brandTagline}</small></span></a>
      <nav className="main-nav" aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>{links}</nav>
      <div className="atlas-header-actions"><SearchCommand compact={!scrolled} nav={scrolled} language={language} navigate={navigate} /><LanguageSwitcher language={language} onLanguageChange={onLanguageChange} /><button type="button" className="atlas-icon-button atlas-menu-trigger" aria-label={a.menu} onClick={() => sheet.current?.showModal()}><Icon name="menu" /></button></div>
    </header>
    <dialog ref={sheet} className="atlas-mobile-sheet" aria-label={a.menu}>
      <div className="atlas-dialog-heading"><strong>PedsCore</strong><button type="button" className="atlas-icon-button" aria-label={a.close} onClick={() => sheet.current?.close()}><Icon name="close" /></button></div>
      <nav aria-label={a.menu}>{links}</nav><div className="atlas-sheet-secondary">{["evidence", "stats", "contribute", "disclaimer"].map(key => {
        const href = key === "stats" ? makePath(language, "stats", "global") : makePath(language, key);
        return <a className="nav-link" href={href} key={key} onClick={(event) => goLink(event, href)}>{t.nav[key as keyof typeof t.nav]}</a>;
      })}</div>
      <p>{a.note}</p>
    </dialog>
  </>;
}
