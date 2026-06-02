import type { ClinicalToolMetadata } from "@peds-core/core";
import {
  categoryLabels,
  evidenceLabels,
  riskLabels,
  translations,
  typeLabels
} from "../i18n/translations";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";
import { ToolStatusBadge } from "./ToolStatusBadge";

interface ToolCardProps {
  language: Language;
  navigate: (href: string) => void;
  tool: ClinicalToolMetadata;
}

export function ToolCard({ language, navigate, tool }: ToolCardProps) {
  const t = translations[language];

  return (
    <article className="tool-card">
      <div className="tool-card-header">
        <div>
          <p className="tool-shortname">{tool.shortName}</p>
          <h3>{tool.name[language]}</h3>
        </div>
        <ToolStatusBadge language={language} status={tool.implementationStatus} />
      </div>
      <p>{tool.description[language]}</p>
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
          <dt>{t.common.risk}</dt>
          <dd>{riskLabels[tool.regulatoryRisk][language]}</dd>
        </div>
        <div>
          <dt>{t.common.evidence}</dt>
          <dd>{evidenceLabels[tool.evidenceLevel][language]}</dd>
        </div>
      </dl>
      <button
        className="text-link"
        type="button"
        onClick={() => navigate(makePath(language, "tools", tool.slug))}
      >
        {t.common.openTool}
      </button>
    </article>
  );
}

