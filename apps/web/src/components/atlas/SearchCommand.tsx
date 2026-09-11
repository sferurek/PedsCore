import { useEffect, useRef, useState } from "react";
import { getAllTools } from "@peds-core/core";
import { atlas } from "../../i18n/atlas";
import { ToolStatusBadge } from "../ToolStatusBadge";
import type { Language } from "../../utils/language";
import { makePath } from "../../utils/routes";
import { Icon } from "./Icon";

export function SearchCommand({ language, navigate, compact = false }: { language: Language; navigate: (path: string) => void; compact?: boolean }) {
  const t = atlas[language];
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const open = () => { setQuery(""); dialog.current?.showModal(); };
  useEffect(() => {
    if (!compact) return;
    const shortcut = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); open(); } };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [compact]);
  const fold = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const results = getAllTools().filter(tool => fold(`${tool.name[language]} ${tool.description[language]} ${tool.category}`).includes(fold(query))).slice(0, 8);
  return <>
    <button className={compact ? "atlas-icon-button" : "atlas-search-launch"} aria-label={t.searchLabel} onClick={open} type="button"><Icon name="search" />{!compact && <><span>{t.search}</span><Icon name="arrow" /></>}</button>
    <dialog className="atlas-search-dialog" ref={dialog} aria-label={t.searchLabel} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className="atlas-dialog-heading"><label htmlFor={compact ? "nav-search" : "hero-search"}>{t.searchLabel}</label><button className="atlas-icon-button" type="button" aria-label={t.close} onClick={() => dialog.current?.close()}><Icon name="close" /></button></div>
      <input id={compact ? "nav-search" : "hero-search"} type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search} />
      <div className="atlas-search-results" aria-live="polite">{results.length ? results.map(tool => <button type="button" key={tool.id} onClick={() => { dialog.current?.close(); navigate(makePath(language, "tools", tool.slug)); }}><span><strong>{tool.name[language]}</strong><small>{tool.description[language]}</small></span><ToolStatusBadge language={language} status={tool.implementationStatus} /></button>) : <p>{t.noResults}</p>}</div>
    </dialog>
  </>;
}
