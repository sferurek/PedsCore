import { useEffect, useMemo, useRef, useState } from "react";
import {
  discoveryValues,
  getAllTools
} from "@peds-core/core";
import type {
  AgeGroupTag,
  CareSettingTag,
  ClinicalFunctionTag,
  ClinicalSpecialty,
  ImplementationStatus,
  InteractionMode,
  ToolCategory,
  ToolType
} from "@peds-core/core";
import { PedsCoreFinder } from "../components/PedsCoreFinder";
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

const humanize = (value: string, language: Language): string => {
  const labels: Record<string, { es: string; en: string }> = {
    neonatology: { es: "Neonatología", en: "Neonatology" },
    emergency_medicine: { es: "Urgencias", en: "Emergency" },
    intensive_care: { es: "Cuidados intensivos", en: "Intensive care" },
    respiratory: { es: "Respiratorio", en: "Respiratory" },
    cardiology: { es: "Cardiología", en: "Cardiology" },
    nephrology: { es: "Nefrología", en: "Nephrology" },
    gastroenterology: { es: "Gastroenterología", en: "Gastroenterology" },
    neurology: { es: "Neurología", en: "Neurology" },
    rheumatology: { es: "Reumatología", en: "Rheumatology" },
    pain_medicine: { es: "Dolor", en: "Pain" },
    nutrition: { es: "Nutrición", en: "Nutrition" },
    trauma: { es: "Trauma", en: "Trauma" },
    preterm: { es: "Prematuro", en: "Preterm" },
    term_newborn: { es: "Recién nacido a término", en: "Term newborn" },
    neonate_0_28d: { es: "Neonato 0–28 días", en: "Neonate 0–28 d" },
    young_infant_0_60d: { es: "Lactante 0–60 días", en: "Young infant 0–60 d" },
    young_infant_0_90d: { es: "Lactante 0–90 días", en: "Young infant 0–90 d" },
    infant: { es: "Lactante", en: "Infant" },
    toddler: { es: "1–3 años", en: "Toddler" },
    preschool: { es: "Preescolar", en: "Preschool" },
    school_age: { es: "Escolar", en: "School age" },
    adolescent: { es: "Adolescente", en: "Adolescent" },
    all_pediatric: { es: "Toda pediatría", en: "All pediatric ages" },
    emergency_department: { es: "Urgencias", en: "Emergency department" },
    picu: { es: "UCIP", en: "PICU" },
    nicu: { es: "UCIN", en: "NICU" },
    primary_care: { es: "Atención primaria", en: "Primary care" },
    outpatient_clinic: { es: "Consulta", en: "Outpatient clinic" },
    severity: { es: "Gravedad", en: "Severity" },
    risk_stratification: { es: "Estratificación de riesgo", en: "Risk stratification" },
    disease_activity: { es: "Actividad de enfermedad", en: "Disease activity" },
    longitudinal_monitoring: { es: "Seguimiento longitudinal", en: "Longitudinal monitoring" },
    screening: { es: "Cribado", en: "Screening" },
    pain_assessment: { es: "Dolor", en: "Pain assessment" },
    calculator: { es: "Calculadora", en: "Calculator" },
    clinical_rule: { es: "Regla clínica", en: "Clinical rule" },
    reference_scale: { es: "Escala de referencia", en: "Reference scale" },
    longitudinal_staging: { es: "Estadificación longitudinal", en: "Longitudinal staging" },
    visual_atlas: { es: "Atlas visual", en: "Visual atlas" },
    clinical_framework: { es: "Marco clínico", en: "Clinical framework" },
    licensed_external_tool: { es: "Herramienta externa", en: "External tool" }
  };
  return labels[value]?.[language] ??
    value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
};

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

  const filteredTools = useMemo(
    () => filterTools(allTools, filters, language),
    [allTools, filters, language]
  );

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "query") return Boolean(String(value).trim());
    if (typeof value === "boolean") return value;
    return value !== "all";
  }).length;

  useEffect(() => {
    const query = filters.query.trim();
    if (!query || lastTrackedSearchRef.current === query) return;

    const timeoutId = window.setTimeout(() => {
      lastTrackedSearchRef.current = query;
      trackUsageEvent("search_used", makePath(language, "tools"), language, {
        hasQuery: true,
        searchScope: "tools"
      });
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [filters.query, language]);

  const setQuick = (patch: Partial<typeof filters>) =>
    setFilters({ ...defaultFilters, ...patch });

  return (
    <div className="page-stack tools-discovery-page">
      <section className="page-hero tools-hero">
        <div>
          <p className="finder-eyebrow">PedsCore · catálogo clínico</p>
          <h1>{t.tools.title}</h1>
          <p>
            {language === "es"
              ? "Encuentra la herramienta que encaja con el paciente y el contexto. Puedes buscar como piensas en clínica o afinar por edad, especialidad y objetivo."
              : "Find the tool that fits the patient and the context. Search the way you think clinically, or narrow things down by age, specialty and purpose."}
          </p>
        </div>
        <div className="tools-hero-count">
          <strong>{filteredTools.length}</strong>
          <span>{t.tools.found}</span>
        </div>
      </section>

      <PedsCoreFinder tools={allTools} language={language} navigate={navigate} />

      <section className="tool-discovery-controls">
        <div className="tool-filter-topbar">
          <SearchBar
            label={language === "es" ? "Buscar por nombre" : "Search by name"}
            placeholder={t.home.searchPlaceholder}
            value={filters.query}
            onChange={(query) => setFilters({ ...filters, query })}
          />

          <label>
            <span>{language === "es" ? "Edad" : "Age"}</span>
            <select
              value={filters.ageGroup}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  ageGroup: event.target.value as AgeGroupTag | "all"
                })
              }
            >
              <option value="all">{t.tools.all}</option>
              {discoveryValues.ageGroups.map((value) => (
                <option key={value} value={value}>
                  {humanize(value, language)}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>{language === "es" ? "Especialidad" : "Specialty"}</span>
            <select
              value={filters.specialty}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  specialty: event.target.value as ClinicalSpecialty | "all"
                })
              }
            >
              <option value="all">{t.tools.all}</option>
              {discoveryValues.specialties.map((value) => (
                <option key={value} value={value}>
                  {humanize(value, language)}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>{language === "es" ? "Problema clínico" : "Clinical problem"}</span>
            <select
              value={filters.clinicalProblem}
              onChange={(event) =>
                setFilters({ ...filters, clinicalProblem: event.target.value })
              }
            >
              <option value="all">{t.tools.all}</option>
              {discoveryValues.clinicalProblems.map((value) => (
                <option key={value} value={value}>
                  {humanize(value, language)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="quick-filter-row" aria-label={t.tools.quickFilters}>
          <button className="quick-filter-chip" type="button" onClick={() => setQuick({ specialty: "emergency_medicine" })}>
            {language === "es" ? "Urgencias" : "Emergency"}
          </button>
          <button className="quick-filter-chip" type="button" onClick={() => setQuick({ specialty: "neonatology" })}>
            {language === "es" ? "Neonatología" : "Neonatology"}
          </button>
          <button className="quick-filter-chip" type="button" onClick={() => setQuick({ setting: "picu" })}>
            UCIP / PICU
          </button>
          <button className="quick-filter-chip" type="button" onClick={() => setQuick({ clinicalFunction: "longitudinal_monitoring", longitudinalOnly: true })}>
            {language === "es" ? "Seguimiento" : "Longitudinal"}
          </button>
          <button className="quick-filter-chip" type="button" onClick={() => setQuick({ localCalculationOnly: true })}>
            {language === "es" ? "Calculadoras activas" : "Active calculators"}
          </button>
          <button className="quick-filter-chip" type="button" onClick={() => setQuick({ interactionMode: "visual_atlas" })}>
            {language === "es" ? "Atlas" : "Atlases"}
          </button>
        </div>

        <details className="advanced-filter-panel">
          <summary>
            {language === "es" ? "Afinar búsqueda" : "Refine search"}
            {activeFilterCount ? <span>{activeFilterCount}</span> : null}
          </summary>
          <div className="advanced-filter-grid">
            <label>
              <span>{language === "es" ? "Entorno" : "Setting"}</span>
              <select
                value={filters.setting}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    setting: event.target.value as CareSettingTag | "all"
                  })
                }
              >
                <option value="all">{t.tools.all}</option>
                {discoveryValues.careSettings.map((value) => (
                  <option key={value} value={value}>
                    {humanize(value, language)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>{language === "es" ? "Objetivo" : "Purpose"}</span>
              <select
                value={filters.clinicalFunction}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    clinicalFunction: event.target.value as ClinicalFunctionTag | "all"
                  })
                }
              >
                <option value="all">{t.tools.all}</option>
                {discoveryValues.clinicalFunctions.map((value) => (
                  <option key={value} value={value}>
                    {humanize(value, language)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>{language === "es" ? "Modalidad" : "Interaction"}</span>
              <select
                value={filters.interactionMode}
                onChange={(event) =>
                  setFilters({
                    ...filters,
                    interactionMode: event.target.value as InteractionMode | "all"
                  })
                }
              >
                <option value="all">{t.tools.all}</option>
                {discoveryValues.interactionModes.map((value) => (
                  <option key={value} value={value}>
                    {humanize(value, language)}
                  </option>
                ))}
              </select>
            </label>

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
          </div>

          <div className="filter-toggle-row">
            <label className="filter-toggle">
              <input
                type="checkbox"
                checked={filters.localCalculationOnly}
                onChange={(event) =>
                  setFilters({ ...filters, localCalculationOnly: event.target.checked })
                }
              />
              <span>{language === "es" ? "Solo herramientas con cálculo activo" : "Active local calculations only"}</span>
            </label>
            <label className="filter-toggle">
              <input
                type="checkbox"
                checked={filters.longitudinalOnly}
                onChange={(event) =>
                  setFilters({ ...filters, longitudinalOnly: event.target.checked })
                }
              />
              <span>{language === "es" ? "Útiles para seguimiento longitudinal" : "Useful for longitudinal follow-up"}</span>
            </label>
          </div>
        </details>

        {activeFilterCount ? (
          <button
            className="filter-reset-button"
            type="button"
            onClick={() => setFilters(defaultFilters)}
          >
            {language === "es"
              ? `Limpiar filtros (${activeFilterCount})`
              : `Clear filters (${activeFilterCount})`}
          </button>
        ) : null}
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
