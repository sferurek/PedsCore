import { useMemo, useState } from "react";
import { getToolsByCategory } from "@peds-core/core";
import type { ImplementationStatus, ToolCategory } from "@peds-core/core";
import { ToolsList } from "../components/ToolsList";
import {
  categoryDescriptions,
  categoryLabels,
  statusLabels,
  translations
} from "../i18n/translations";
import { defaultFilters, filterTools } from "../utils/filterTools";
import type { Language } from "../utils/language";

interface CategoryPageProps {
  category: ToolCategory;
  language: Language;
  navigate: (href: string) => void;
}

export function CategoryPage({
  category,
  language,
  navigate
}: CategoryPageProps) {
  const t = translations[language];
  const categoryTools = getToolsByCategory(category);
  const [status, setStatus] = useState<ImplementationStatus | "all">("all");
  const filteredTools = useMemo(
    () =>
      filterTools(
        categoryTools,
        {
          ...defaultFilters,
          category,
          status
        },
        language
      ),
    [category, categoryTools, language, status]
  );
  const statuses = [
    ...new Set(categoryTools.map((tool) => tool.implementationStatus))
  ].sort();

  return (
    <div className="page-stack">
      <section className="page-hero">
        <h1>{categoryLabels[category][language]}</h1>
        <p>{categoryDescriptions[category][language]}</p>
        <strong>
          {categoryTools.length} {t.common.tools}
        </strong>
      </section>
      <section className="filter-panel compact">
        <label>
          <span>{t.tools.status}</span>
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ImplementationStatus | "all")
            }
          >
            <option value="all">{t.tools.all}</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {statusLabels[item][language]}
              </option>
            ))}
          </select>
        </label>
      </section>
      <ToolsList
        language={language}
        navigate={navigate}
        tools={filteredTools}
      />
    </div>
  );
}

