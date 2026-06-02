import type { ClinicalToolMetadata } from "@peds-core/core";
import {
  categoryLabels,
  evidenceLabels,
  riskLabels,
  translations,
  typeLabels
} from "../i18n/translations";
import type { Language } from "../utils/language";
import { ToolStatusBadge } from "./ToolStatusBadge";

interface ToolMetadataPanelProps {
  language: Language;
  tool: ClinicalToolMetadata;
}

export function ToolMetadataPanel({ language, tool }: ToolMetadataPanelProps) {
  const t = translations[language];

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
          <dd>{tool.subcategory}</dd>
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
            />
          </dd>
        </div>
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
