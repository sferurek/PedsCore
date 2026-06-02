import type { ClinicalToolMetadata } from "@peds-core/core";
import { useState } from "react";
import { DisclaimerBox } from "../components/DisclaimerBox";
import { DynamicForm } from "../components/DynamicForm";
import { GitHubFeedbackLink } from "../components/GitHubFeedbackLink";
import { InterpretationTable } from "../components/InterpretationTable";
import { ReferenceList } from "../components/ReferenceList";
import { ResultPanel } from "../components/ResultPanel";
import { ScoringTable } from "../components/ScoringTable";
import { ToolMetadataPanel } from "../components/ToolMetadataPanel";
import { ToolStatusBadge } from "../components/ToolStatusBadge";
import {
  evidenceLabels,
  riskLabels,
  statusLabels,
  translations
} from "../i18n/translations";
import {
  evidenceStatusDescriptions,
  evidenceStatusTitles,
  getUnlockActions,
  hasEvidenceBlock
} from "../utils/evidenceStatus";
import type { FormValues } from "../utils/formState";
import { getInitialFormState } from "../utils/formState";
import type { Language } from "../utils/language";

interface ToolPageProps {
  language: Language;
  navigate: (href: string) => void;
  tool: ClinicalToolMetadata;
}

export function ToolPage({ language, tool }: ToolPageProps) {
  const t = translations[language];
  const [formValues, setFormValues] = useState<FormValues>(() =>
    getInitialFormState(tool)
  );

  return (
    <div className="tool-page">
      <section className="tool-hero">
        <p className="tool-shortname">{tool.shortName}</p>
        <h1>{tool.name[language]}</h1>
        <ToolStatusBadge
          language={language}
          status={tool.implementationStatus}
        />
      </section>

      <div className="tool-layout">
        <div className="tool-main">
          <DisclaimerBox language={language} />

          <section className="content-panel">
            <h2>{t.tool.description}</h2>
            <p>{tool.description[language]}</p>
          </section>

          <section className="content-panel">
            <h2>{evidenceStatusTitles[language]}</h2>
            <p>{evidenceStatusDescriptions[tool.implementationStatus][language]}</p>
            <dl className="evidence-meta">
              <div>
                <dt>{t.common.status}</dt>
                <dd>{statusLabels[tool.implementationStatus][language]}</dd>
              </div>
              <div>
                <dt>{t.common.evidence}</dt>
                <dd>{evidenceLabels[tool.evidenceLevel][language]}</dd>
              </div>
              <div>
                <dt>{t.common.risk}</dt>
                <dd>{riskLabels[tool.regulatoryRisk][language]}</dd>
              </div>
            </dl>
            <p>{tool.validationNotes[language]}</p>
            {tool.implementationStatus !== "implemented" ? (
              <p className="inactive-calculation">
                {t.tool.automaticCalculationInactive}
              </p>
            ) : null}
          </section>

          {hasEvidenceBlock(tool.implementationStatus) ? (
            <section className="content-panel evidence-help">
              <h2>{t.evidence.unlockTitle}</h2>
              <ul>
                {getUnlockActions(tool.implementationStatus, language).map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
              <a
                className="primary-link"
                href="https://github.com/sferurek/PedsCore/issues/new/choose"
                rel="noreferrer"
                target="_blank"
              >
                {t.evidence.submitEvidence}
              </a>
            </section>
          ) : null}

          <DynamicForm
            language={language}
            tool={tool}
            onStateChange={setFormValues}
          />

          <ResultPanel
            language={language}
            tool={tool}
            values={formValues}
          />

          <InterpretationTable language={language} tool={tool} />

          <ScoringTable language={language} tool={tool} />

          <section className="content-panel">
            <h2>{t.tool.references}</h2>
            <ReferenceList language={language} references={tool.references} />
          </section>

          <section className="content-panel">
            <h2>{t.tool.validationNotes}</h2>
            <p>{tool.validationNotes[language]}</p>
          </section>

          <GitHubFeedbackLink language={language} />
        </div>
        <ToolMetadataPanel language={language} tool={tool} />
      </div>
    </div>
  );
}
