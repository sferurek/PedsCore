import { useMemo, useState } from "react";
import { getToolsByCategory } from "@peds-core/core";
import { getToolDiscovery } from "@peds-core/core";
import type { SurfaceStatus, ToolCategory } from "@peds-core/core";
import { ToolsList } from "../components/ToolsList";
import {
  categoryDescriptions,
  categoryLabels,
  surfaceStatusLabels,
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
  const [status, setStatus] = useState<SurfaceStatus | "all">("all");
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
    ...new Set(categoryTools.map((tool) => getToolDiscovery(tool.id)?.surfaceStatus).filter((value): value is SurfaceStatus => Boolean(value)))
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
      <section className="content-panel subtle-panel">
        <h2>{language === "es" ? "Cómo utilizar esta categoría" : "How to use this category"}</h2>
        <p>
          {language === "es"
            ? "Las herramientas se agrupan por área clínica para facilitar su descubrimiento. Cada ficha conserva su propia población, finalidad, estado de implementación, nivel de evidencia y limitaciones; revisa esos elementos antes de utilizar una escala, regla o calculadora."
            : "Tools are grouped by clinical area to make them easier to discover. Each page retains its own population, purpose, implementation status, evidence level and limitations; review those elements before using a score, rule or calculator."}
        </p>
      </section>
      <section className="content-panel subtle-panel">
        <h2>{language === "es" ? "Evidencia y disponibilidad" : "Evidence and availability"}</h2>
        <p>
          {language === "es"
            ? "PedsCore distingue entre herramientas activas, referencias clínicas, borradores y contenidos limitados por evidencia o licencia. La inclusión en el catálogo no equivale por sí sola a una recomendación clínica."
            : "PedsCore distinguishes active tools, clinical references, drafts and content limited by evidence or licensing. Inclusion in the catalog is not, by itself, a clinical recommendation."}
        </p>
      </section>
      <section className="filter-panel compact">
        <label>
          <span>{t.tools.status}</span>
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as SurfaceStatus | "all")
            }
          >
            <option value="all">{t.tools.all}</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {surfaceStatusLabels[item][language]}
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

