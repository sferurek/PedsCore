import { useMemo, useState } from "react";
import { getAllTools } from "@peds-core/core";
import type { ImplementationStatus, ToolCategory, ToolType } from "@peds-core/core";
import { SearchBar } from "../components/SearchBar";
import { ToolsList } from "../components/ToolsList";
import {
  categoryLabels,
  statusLabels,
  translations,
  typeLabels
} from "../i18n/translations";
import { defaultFilters, filterTools } from "../utils/filterTools";
import type { Language } from "../utils/language";

interface ToolsPageProps {
  language: Language;
  navigate: (href: string) => void;
}

export function ToolsPage({ language, navigate }: ToolsPageProps) {
  const t = translations[language];
  const allTools = getAllTools();
  const [filters, setFilters] = useState(defaultFilters);
  const categories = [...new Set(allTools.map((tool) => tool.category))].sort();
  const types = [...new Set(allTools.map((tool) => tool.type))].sort();
  const statuses = [
    ...new Set(allTools.map((tool) => tool.implementationStatus))
  ].sort();
  const filteredTools = useMemo(
    () => filterTools(allTools, filters, language),
    [allTools, filters, language]
  );

  return (
    <div className="page-stack">
      <section className="page-hero">
        <h1>{t.tools.title}</h1>
        <p>
          {filteredTools.length} {t.tools.found}
        </p>
      </section>

      <section className="filter-panel">
        <SearchBar
          label={t.nav.tools}
          placeholder={t.home.searchPlaceholder}
          value={filters.query}
          onChange={(query) => setFilters({ ...filters, query })}
        />
        <label>
          <span>{t.tools.category}</span>
          <select
            value={filters.category}
            onChange={(event) =>
              setFilters({
                ...filters,
                category: event.target.value as ToolCategory | "all"
              })
            }
          >
            <option value="all">{t.tools.all}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {categoryLabels[category][language]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.tools.type}</span>
          <select
            value={filters.type}
            onChange={(event) =>
              setFilters({
                ...filters,
                type: event.target.value as ToolType | "all"
              })
            }
          >
            <option value="all">{t.tools.all}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {typeLabels[type][language]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.tools.status}</span>
          <select
            value={filters.status}
            onChange={(event) =>
              setFilters({
                ...filters,
                status: event.target.value as ImplementationStatus | "all"
              })
            }
          >
            <option value="all">{t.tools.all}</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status][language]}
              </option>
            ))}
          </select>
        </label>
      </section>

      {filteredTools.length > 0 ? (
        <ToolsList
          language={language}
          navigate={navigate}
          tools={filteredTools}
        />
      ) : (
        <p className="empty-state">{t.tools.empty}</p>
      )}
    </div>
  );
}

