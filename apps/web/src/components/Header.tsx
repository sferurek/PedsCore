import { useEffect, useRef, useState } from "react";
import { translations } from "../i18n/translations";
import { atlas } from "../i18n/atlas";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Icon } from "./atlas/Icon";
import { SearchCommand } from "./atlas/SearchCommand";
interface HeaderProps { currentPath: string; language: Language; navigate: (href: string) => void; onLanguageChange: (language: Language) => void; }
export function Header({ currentPath, language, navigate, onLanguageChange }: HeaderProps) {
  const t = translations[language]; const a = atlas[language];
  const sheet = useRef<HTMLDialogElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 48); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  const go = (href: string) => { sheet.current?.close(); navigate(href); };
  const links = <><button type="button" className="nav-link" aria-current={currentPath.includes("/tools") ? "page" : undefined} onClick={() => go(makePath(language, "tools"))}>Tools</button>{["Learn", "Sim", "Live"].map(name => <span className="atlas-future-nav" key={name}>{name}<small>{a.soon}</small></span>)}<button type="button" className="nav-link" onClick={() => go(makePath(language, "about"))}>{t.nav.about}</button></>;
  return <>
    <a className="atlas-skip" href="#main-content">{a.skip}</a>
    <header className={`site-header atlas-header ${scrolled ? "is-scrolled" : ""}`}>
      <button className="brand-link" type="button" onClick={() => go(makePath(language))}><span className="atlas-brand-mark"><Icon name="heart" /></span><span>PedsCore<small>Evidence for brighter tomorrows</small></span></button>
      <nav className="main-nav" aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>{links}</nav>
      <div className="atlas-header-actions"><SearchCommand compact language={language} navigate={navigate} /><LanguageSwitcher language={language} onLanguageChange={onLanguageChange} /><button type="button" className="atlas-icon-button atlas-menu-trigger" aria-label={a.menu} onClick={() => sheet.current?.showModal()}><Icon name="menu" /></button></div>
    </header>
    <dialog ref={sheet} className="atlas-mobile-sheet" aria-label={a.menu}>
      <div className="atlas-dialog-heading"><strong>PedsCore</strong><button type="button" className="atlas-icon-button" aria-label={a.close} onClick={() => sheet.current?.close()}><Icon name="close" /></button></div>
      <nav aria-label={a.menu}>{links}</nav><div className="atlas-sheet-secondary">{["evidence", "stats", "contribute", "disclaimer"].map(key => <button type="button" className="nav-link" key={key} onClick={() => go(key === "stats" ? makePath(language, "stats", "global") : makePath(language, key))}>{t.nav[key as keyof typeof t.nav]}</button>)}</div>
      <p>{a.note}</p>
    </dialog>
  </>;
}
