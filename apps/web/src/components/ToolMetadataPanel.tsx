import { getToolDiscovery } from "@peds-core/core";
import type { ClinicalToolMetadata } from "@peds-core/core";
import {
  categoryLabels,
  evidenceLabels,
  riskLabels,
  translations,
  typeLabels
} from "../i18n/translations";
import type { Language } from "../utils/language";
import { discoveryLabel } from "../utils/discoveryLabels";
import { ToolStatusBadge } from "./ToolStatusBadge";

interface ToolMetadataPanelProps {
  language: Language;
  tool: ClinicalToolMetadata;
}

export function ToolMetadataPanel({ language, tool }: ToolMetadataPanelProps) {
  const t = translations[language];
  const discovery = getToolDiscovery(tool.id);

  return (
    <section className="metadata-panel tool-page-aside">
      <h2>{t.tool.metadata}</h2>
      <dl>
        <div>
          <dt>{t.common.category}</dt>
          <dd>{categoryLabels[tool.category][language]}</dd>
        </div>
        <div>
          <dt>{t.common.subcategory}</dt>
          <dd>{discoveryLabel(tool.subcategory, language)}</dd>
        </div>
        <div>
          <dt>{t.common.type}</dt>
          <dd>{typeLabels[tool.type][language]}</dd>
        </div>
        <div>
          <dt>{t.common.population}</dt>
          <dd>{tool.population[language]}</dd>
        </div>
        <div>
          <dt>{t.common.status}</dt>
          <dd>
            <ToolStatusBadge
              language={language}
              status={tool.implementationStatus}
              toolId={tool.id}
            />
          </dd>
        </div>
        {discovery ? (
          <div>
            <dt>{language === "es" ? "Disponibilidad" : "Availability"}</dt>
            <dd>
              {discovery.calculationAvailability === "local_active"
                ? language === "es" ? "Cálculo local activo" : "Active local calculation"
                : discovery.calculationAvailability === "external_official"
                  ? language === "es" ? "Referencia + herramienta oficial externa" : "Reference + official external tool"
                  : discovery.calculationAvailability === "local_planned"
                    ? language === "es" ? "Referencia activa · cálculo previsto" : "Active reference · calculation planned"
                    : discovery.calculationAvailability === "blocked_by_rights"
                      ? language === "es" ? "Referencia · reproducción limitada" : "Reference · reproduction limited"
                      : discovery.calculationAvailability === "blocked_by_evidence"
                        ? language === "es" ? "Referencia · implementación en revisión" : "Reference · implementation under review"
                        : language === "es" ? "Referencia clínica" : "Clinical reference"}
            </dd>
          </div>
        ) : null}
        <div>
          <dt>{t.common.risk}</dt>
          <dd>{riskLabels[tool.regulatoryRisk][language]}</dd>
        </div>
        <div>
          <dt>{t.common.evidence}</dt>
          <dd>{evidenceLabels[tool.evidenceLevel][language]}</dd>
        </div>
      </dl>
    </section>
  );
}
