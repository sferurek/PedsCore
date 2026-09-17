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
  SurfaceStatus,
  InteractionMode,
  ToolCategory,
  ToolType
} from "@peds-core/core";
import { PedsCoreFinder } from "../components/PedsCoreFinder";
import { SearchBar } from "../components/SearchBar";
import { ToolsList } from "../components/ToolsList";
import {
  categoryLabels,
  surfaceStatusLabels,
  translations,
  typeLabels
} from "../i18n/translations";
import { defaultFilters, filterTools } from "../utils/filterTools";
import { discoveryLabel } from "../utils/discoveryLabels";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import { trackUsageEvent } from "../utils/analytics";
import { getSurfaceStatusCounts } from "../utils/toolStats";
import { seoTopicHubs } from "../utils/topicHubs";
import {
  getFavoriteToolIds,
  getRecentToolIds,
  userToolsStorageDescription
} from "../utils/userTools";

interface ToolsPageProps {
  language: Language;
  navigate: (href: string) => void;
}

const humanize = (value: string, language: Language): string =>
  discoveryLabel(value, language);

export function ToolsPage({ language, navigate }: ToolsPageProps) {
  const t = translations[language];
  const allTools = getAllTools();
  const [filters, setFilters] = useState(defaultFilters);
  const [personalizedVersion, setPersonalizedVersion] = useState(0);
  const lastTrackedSearchRef = useRef("");
  const categories = [...new Set(allTools.map((tool) => tool.category))].sort();
  const types = [...new Set(allTools.map((tool) => tool.type))].sort();
  const statuses = ["active", "draft", "blocked", "deprecated"] satisfies SurfaceStatus[];
  const statusCounts = getSurfaceStatusCounts(allTools);
  const byId = useMemo(() => new Map(allTools.map((tool) => [tool.id, tool])), [allTools]);
  const favoriteTools = useMemo(
    () => getFavoriteToolIds().map((id) => byId.get(id)).filter(Boolean),
    [byId, personalizedVersion]
  );
  const recentTools = useMemo(
    () => getRecentToolIds().map((id) => byId.get(id)).filter(Boolean),
    [byId, personalizedVersion]
  );

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
    const sync = () => setPersonalizedVersion((value) => value + 1);
    window.addEventListener("pedscore:user-tools-changed", sync);
    return () => window.removeEventListener("pedscore:user-tools-changed", sync);
  }, []);

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

      {(favoriteTools.length > 0 || recentTools.length > 0) ? (
        <section className="personal-tools-section" aria-labelledby="personal-tools-title">
          <div className="tool-section-heading">
            <p className="eyebrow">{language === "es" ? "TU ACCESO RÁPIDO" : "YOUR SHORTCUTS"}</p>
            <h2 id="personal-tools-title">{language === "es" ? "Favoritos y recientes" : "Favorites and recent tools"}</h2>
            <p>{userToolsStorageDescription[language]}</p>
          </div>
          {favoriteTools.length > 0 ? (
            <div>
              <h3>{language === "es" ? "Favoritos" : "Favorites"}</h3>
              <div className="personal-tool-links">
                {favoriteTools.slice(0, 8).map((tool) => tool ? (
                  <a
                    href={`/${language}/tools/${tool.slug}`}
                    key={tool.id}
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(`/${language}/tools/${tool.slug}`);
                    }}
                  >
                    ★ {tool.shortName || tool.name[language]}
                  </a>
                ) : null)}
              </div>
            </div>
          ) : null}
          {recentTools.length > 0 ? (
            <div>
              <h3>{language === "es" ? "Recientes" : "Recent"}</h3>
              <div className="personal-tool-links">
                {recentTools.slice(0, 8).map((tool) => tool ? (
                  <a
                    href={`/${language}/tools/${tool.slug}`}
                    key={tool.id}
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(`/${language}/tools/${tool.slug}`);
                    }}
                  >
                    {tool.shortName || tool.name[language]}
                  </a>
                ) : null)}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="content-panel subtle-panel">
        <div className="tool-section-heading">
          <p className="eyebrow">{language === "es" ? "COMPARAR" : "COMPARE"}</p>
          <h2>{language === "es" ? "Guías por problema clínico" : "Clinical topic guides"}</h2>
        </div>
        <p>
          {language === "es"
            ? "Explora grupos de herramientas que suelen plantearse juntas, con diferencias de población, finalidad, evidencia y disponibilidad."
            : "Explore groups of tools that are often considered together, with differences in population, purpose, evidence and availability."}
        </p>
        <div className="link-row">
          {seoTopicHubs.map((hub) => (
            <a
              className="primary-link"
              href={`/${language}/topics/${hub.slug}`}
              key={hub.slug}
              onClick={(event) => {
                event.preventDefault();
                navigate(`/${language}/topics/${hub.slug}`);
              }}
            >
              {hub.title[language]}
            </a>
          ))}
        </div>
      </section>

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
          <button className="quick-filter-chip" type="button" onClick={() => setQuick({ status: "active" })}>
            {language === "es" ? "Disponibles" : "Available"}
          </button>
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
                    status: event.target.value as SurfaceStatus | "all"
                  })
                }
              >
                <option value="all">{t.tools.all}</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {surfaceStatusLabels[status][language]} ({statusCounts.get(status) ?? 0})
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
