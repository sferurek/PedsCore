import { useEffect, useMemo, useRef, useState } from "react";
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
import { makePath } from "../utils/routes";
import { trackUsageEvent } from "../utils/analytics";
import { getToolStatusCounts } from "../utils/toolStats";

interface ToolsPageProps {
  language: Language;
  navigate: (href: string) => void;
}

export function ToolsPage({ language, navigate }: ToolsPageProps) {
  const t = translations[language];
  const allTools = getAllTools();
  const [filters, setFilters] = useState(defaultFilters);
  const lastTrackedSearchRef = useRef("");
  const categories = [...new Set(allTools.map((tool) => tool.category))].sort();
  const types = [...new Set(allTools.map((tool) => tool.type))].sort();
  const statuses = [
    "implemented",
    "partially_implemented",
    "ready_for_implementation",
    "pending_validation",
    "needs_primary_reference",
    "coming_soon",
    "not_implemented_due_to_licensing"
  ] satisfies ImplementationStatus[];
  const statusCounts = getToolStatusCounts(allTools);
  const quickFilters = [
    {
      label: t.tools.quickImplemented,
      action: () => setFilters({ ...defaultFilters, status: "implemented" })
    },
    {
      label: "WHO Growth",
      action: () =>
        setFilters({
          ...defaultFilters,
          query: "WHO Growth",
          status: "partially_implemented"
        })
    },
    {
      label: t.tools.quickEmergency,
      action: () => setFilters({ ...defaultFilters, category: "emergency" })
    },
    {
      label: t.tools.quickNeonatology,
      action: () => setFilters({ ...defaultFilters, category: "neonatology" })
    },
    {
      label: t.tools.quickGrowth,
      action: () =>
        setFilters({ ...defaultFilters, category: "growth_nutrition" })
    },
    {
      label: t.tools.quickPain,
      action: () => setFilters({ ...defaultFilters, category: "pain" })
    },
    {
      label: t.tools.quickRespiratory,
      action: () => setFilters({ ...defaultFilters, category: "respiratory" })
    }
  ];
  const filteredTools = useMemo(
    () => filterTools(allTools, filters, language),
    [allTools, filters, language]
  );

  useEffect(() => {
    const hasQuery = filters.query.trim().length > 0;

    if (!hasQuery || lastTrackedSearchRef.current === filters.query.trim()) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      lastTrackedSearchRef.current = filters.query.trim();
      trackUsageEvent("search_used", makePath(language, "tools"), language, {
        hasQuery: true,
        searchScope: "tools"
      });
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [filters.query, language]);

  return (
    <div className="page-stack">
      <section className="page-hero">
        <h1>{t.tools.title}</h1>
        <p>
          {filteredTools.length} {t.tools.found}
        </p>
      </section>

      <section className="status-counter-strip" aria-label={t.tools.statusCounts}>
        {statuses.map((status) => (
          <button
            className="status-counter"
            key={status}
            type="button"
            onClick={() => setFilters({ ...defaultFilters, status })}
          >
            <span>{statusLabels[status][language]}</span>
            <strong>{statusCounts.get(status) ?? 0}</strong>
          </button>
        ))}
      </section>

      <section className="quick-filter-row" aria-label={t.tools.quickFilters}>
        {quickFilters.map((filter) => (
          <button
            className="quick-filter-chip"
            key={filter.label}
            type="button"
            onClick={filter.action}
          >
            {filter.label}
          </button>
        ))}
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
                {statusLabels[status][language]} ({statusCounts.get(status) ?? 0})
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
        <section className="empty-state-panel">
          <h2>{t.tools.emptyTitle}</h2>
          <p>{t.tools.empty}</p>
          <button
            className="secondary-action"
            type="button"
            onClick={() => setFilters(defaultFilters)}
          >
            {t.tools.clearFilters}
          </button>
        </section>
      )}
    </div>
  );
}
