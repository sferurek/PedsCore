import { useEffect, useRef, useState } from "react";
import { getAllTools } from "@peds-core/core";
import { atlas } from "../../i18n/atlas";
import { ToolStatusBadge } from "../ToolStatusBadge";
import type { Language } from "../../utils/language";
import { makePath } from "../../utils/routes";
import { Icon } from "./Icon";
import { trackUsageEvent } from "../../utils/analytics";

const fold = (value: string): string =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const toolSearchText = (tool: ReturnType<typeof getAllTools>[number], language: Language): string =>
  [
    tool.id,
    tool.slug,
    tool.shortName,
    tool.name[language],
    tool.name.es,
    tool.name.en,
    tool.description[language],
    tool.description.es,
    tool.description.en,
    tool.category,
    tool.subcategory,
    tool.type
  ]
    .filter(Boolean)
    .join(" ");

export function SearchCommand({ language, navigate, compact = false, nav = false }: { language: Language; navigate: (path: string) => void; compact?: boolean; nav?: boolean }) {
  const t = atlas[language];
  const dialog = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const open = () => {
    setQuery("");
    dialog.current?.showModal();
    window.requestAnimationFrame(() => searchInput.current?.focus());
  };

  useEffect(() => {
    if (!compact) return;
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [compact]);

  const normalizedQuery = fold(query.trim());
  const results = getAllTools()
    .filter((tool) => !normalizedQuery || fold(toolSearchText(tool, language)).includes(normalizedQuery))
    .slice(0, 8);

  return <>
    <button className={nav ? "atlas-nav-search" : compact ? "atlas-icon-button" : "atlas-search-launch"} aria-label={t.searchLabel} onClick={open} type="button"><Icon name="search" />{nav ? <span>{t.search}</span> : !compact ? <><span>{t.search}</span><Icon name="arrow" /></> : null}</button>
    <dialog className="atlas-search-dialog" ref={dialog} aria-label={t.searchLabel} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="atlas-dialog-heading"><label htmlFor={compact ? "nav-search" : "hero-search"}>{t.searchLabel}</label><button className="atlas-icon-button" type="button" aria-label={t.close} onClick={() => dialog.current?.close()}><Icon name="close" /></button></div>
      <input ref={searchInput} id={compact ? "nav-search" : "hero-search"} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t.search} />
      <div className="atlas-search-results" aria-live="polite">{results.length ? results.map(tool => <button type="button" key={tool.id} onClick={() => {
        trackUsageEvent("navigation_used", makePath(language), language, {
          searchScope: "command_palette",
          toolId: tool.id,
          toolType: tool.type,
          category: tool.category,
          hasQuery: Boolean(query.trim())
        });
        dialog.current?.close();
        navigate(makePath(language, "tools", tool.slug));
      }}><span><strong>{tool.shortName || tool.name[language]}</strong><small>{tool.name[language]}</small><small>{tool.description[language]}</small></span><ToolStatusBadge language={language} status={tool.implementationStatus} toolId={tool.id} /></button>) : <p>{t.noResults}</p>}</div>
    </dialog>
  </>;
}
