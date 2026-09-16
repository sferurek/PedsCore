import {
  getToolDiscovery
} from "@peds-core/core";
import type { ClinicalToolMetadata } from "@peds-core/core";
import {
  categoryLabels,
  evidenceLabels,
  translations,
  typeLabels
} from "../i18n/translations";
import { useEffect, useState } from "react";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import { discoveryLabel } from "../utils/discoveryLabels";
import { ToolStatusBadge } from "./ToolStatusBadge";
import { isFavoriteTool, toggleFavoriteTool } from "../utils/userTools";
import { trackUsageEvent } from "../utils/analytics";

interface ToolCardProps {
  language: Language;
  navigate: (href: string) => void;
  tool: ClinicalToolMetadata;
}

export function ToolCard({ language, navigate, tool }: ToolCardProps) {
  const t = translations[language];
  const discovery = getToolDiscovery(tool.id);
  const [favorite, setFavorite] = useState(() => isFavoriteTool(tool.id));

  useEffect(() => {
    const sync = () => setFavorite(isFavoriteTool(tool.id));
    window.addEventListener("pedscore:user-tools-changed", sync);
    return () => window.removeEventListener("pedscore:user-tools-changed", sync);
  }, [tool.id]);

  const handleFavorite = () => {
    const next = toggleFavoriteTool(tool.id);
    setFavorite(next);
    if (next) {
      trackUsageEvent("favorite_added", makePath(language, "tools", tool.slug), language, {
        toolId: tool.id,
        toolType: tool.type,
        category: tool.category,
        status: tool.implementationStatus
      });
    }
  };
  const chips = discovery
    ? [
        ...discovery.clinicalProblems.slice(0, 2),
        ...discovery.clinicalFunctions.slice(0, 1)
      ]
    : [];

  return (
    <article className="tool-card">
      <div className="tool-card-header">
        <div>
          <p className="tool-shortname">{tool.shortName}</p>
          <h3>{tool.name[language]}</h3>
        </div>
        <ToolStatusBadge language={language} status={tool.implementationStatus} toolId={tool.id} />
      </div>

      <p>{tool.description[language]}</p>

      {chips.length > 0 ? (
        <div className="tool-discovery-chip-row" aria-label={language === "es" ? "Etiquetas clínicas" : "Clinical tags"}>
          {chips.map((chip) => (
            <span key={chip}>{discoveryLabel(chip, language)}</span>
          ))}
        </div>
      ) : null}

      <dl className="compact-metadata">
        <div>
          <dt>{t.common.category}</dt>
          <dd>{categoryLabels[tool.category][language]}</dd>
        </div>
        <div>
          <dt>{t.common.type}</dt>
          <dd>{typeLabels[tool.type][language]}</dd>
        </div>
        <div>
          <dt>{language === "es" ? "Uso" : "Use"}</dt>
          <dd>
            {discovery?.longitudinalUse === "primary"
              ? language === "es" ? "Longitudinal" : "Longitudinal"
              : discovery?.calculationAvailability === "local_active"
                ? language === "es" ? "Cálculo local" : "Local calculation"
                : language === "es" ? "Referencia" : "Reference"}
          </dd>
        </div>
        <div>
          <dt>{t.common.evidence}</dt>
          <dd>{evidenceLabels[tool.evidenceLevel][language]}</dd>
        </div>
      </dl>

      <div className="tool-card-actions">
        <button
          className="card-action"
          type="button"
          onClick={() => navigate(makePath(language, "tools", tool.slug))}
        >
          {t.common.openTool}
        </button>
        <button
          aria-label={favorite
            ? (language === "es" ? "Quitar de favoritos" : "Remove from favorites")
            : (language === "es" ? "Añadir a favoritos" : "Add to favorites")}
          aria-pressed={favorite}
          className={favorite ? "favorite-action is-favorite" : "favorite-action"}
          onClick={handleFavorite}
          type="button"
        >
          {favorite ? "★" : "☆"} {language === "es" ? "Favorito" : "Favorite"}
        </button>
      </div>
    </article>
  );
}
