import type { ClinicalToolMetadata } from "@peds-core/core";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { DisclaimerBox } from "../components/DisclaimerBox";
import { DynamicForm } from "../components/DynamicForm";
import { GitHubFeedbackLink } from "../components/GitHubFeedbackLink";
import { WhoGrowthForm } from "../components/growth/WhoGrowthForm";
import { InterpretationTable } from "../components/InterpretationTable";
import { ReferenceList } from "../components/ReferenceList";
import { ResultPanel } from "../components/ResultPanel";
import { ScoringTable } from "../components/ScoringTable";
import { ToolMetadataPanel } from "../components/ToolMetadataPanel";
import { ToolStatusBadge } from "../components/ToolStatusBadge";
import { evidenceLabels, riskLabels, translations } from "../i18n/translations";
import {
  getUnlockActions,
  hasEvidenceBlock
} from "../utils/evidenceStatus";
import type { FormValues } from "../utils/formState";
import { getInitialFormState } from "../utils/formState";
import { trackUsageEvent } from "../utils/analytics";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";

const WhoGrowthResultPanel = lazy(() =>
  import("../components/growth/WhoGrowthResultPanel").then((module) => ({
    default: module.WhoGrowthResultPanel
  }))
);

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
  const resultPanelRef = useRef<HTMLElement>(null);
  const completedToolIdRef = useRef<string | null>(null);
  const isWhoGrowth = tool.id === "who_growth_module";
  const hasActiveCalculation = tool.calculationStatus === "active" || isWhoGrowth;
  const analyticsPath = makePath(language, "tools", tool.slug);
  const analyticsParams = useMemo(
    () => ({
      toolId: tool.id,
      toolType: tool.type,
      category: tool.category,
      status: tool.implementationStatus
    }),
    [tool.category, tool.id, tool.implementationStatus, tool.type]
  );

  useEffect(() => {
    setFormValues(getInitialFormState(tool));
    completedToolIdRef.current = null;
  }, [tool]);

  useEffect(() => {
    trackUsageEvent("case_opened", analyticsPath, language, analyticsParams);

    if (tool.type === "algorithm") {
      trackUsageEvent("protocol_opened", analyticsPath, language, analyticsParams);
    }
  }, [
    analyticsPath,
    analyticsParams,
    language,
    tool.type
  ]);

  const scrollToResults = () => {
    resultPanelRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start"
    });
  };

  const handleFormComplete = () => {
    scrollToResults();

    if (completedToolIdRef.current === tool.id) {
      return;
    }

    completedToolIdRef.current = tool.id;
    trackUsageEvent("case_completed", analyticsPath, language, analyticsParams);

    if (hasActiveCalculation) {
      trackUsageEvent("score_calculated", analyticsPath, language, analyticsParams);
    }
  };

  return (
    <div className="tool-page">
      <section className="tool-hero">
        <h1>{tool.name[language]}</h1>
        <div className="tool-hero-meta">
          <ToolStatusBadge
            language={language}
            status={tool.implementationStatus}
          />
          <span>{evidenceLabels[tool.evidenceLevel][language]}</span>
          <span>{riskLabels[tool.regulatoryRisk][language]}</span>
        </div>
      </section>

      <div className="tool-layout">
        <div className="tool-main tool-page-main">
          <DisclaimerBox language={language} />

          <section className="content-panel">
            <h2>{t.tool.description}</h2>
            <p>{tool.description[language]}</p>
          </section>

          {hasActiveCalculation ? (
            <>
              {isWhoGrowth ? (
                <WhoGrowthForm
                  language={language}
                  tool={tool}
                  values={formValues}
                  onChange={setFormValues}
                  onFormComplete={handleFormComplete}
                />
              ) : (
                <DynamicForm
                  language={language}
                  tool={tool}
                  onFormComplete={handleFormComplete}
                  onStateChange={setFormValues}
                />
              )}

              {isWhoGrowth ? (
                <Suspense
                  fallback={
                    <section
                      className="content-panel result-panel who-growth-result-panel"
                      ref={resultPanelRef}
                    >
                      <p className="inactive-calculation">
                        {language === "es"
                          ? "Cargando modulo de crecimiento OMS..."
                          : "Loading WHO growth module..."}
                      </p>
                    </section>
                  }
                >
                  <WhoGrowthResultPanel
                    ref={resultPanelRef}
                    language={language}
                    values={formValues}
                  />
                </Suspense>
              ) : (
                <ResultPanel
                  ref={resultPanelRef}
                  language={language}
                  tool={tool}
                  values={formValues}
                />
              )}
            </>
          ) : (
            <section className="content-panel inactive-tool-panel">
              <h2>{t.tool.notActiveTitle}</h2>
              <p>{t.tool.automaticCalculationInactive}</p>
              <p>{tool.validationNotes[language]}</p>
              <a
                className="primary-link"
                href="https://github.com/sferurek/PedsCore/issues/new/choose"
                rel="noreferrer"
                target="_blank"
              >
                {t.evidence.submitEvidence}
              </a>
            </section>
          )}

          {hasActiveCalculation ? (
            <>
              <InterpretationTable language={language} tool={tool} />

              <ScoringTable language={language} tool={tool} />
            </>
          ) : null}

          <section className="content-panel">
            <h2>{t.tool.sourcesAndEvidence}</h2>
            <ReferenceList language={language} references={tool.references} />
          </section>

          <section className="content-panel">
            <h2>{t.tool.validationNotes}</h2>
            <p>{tool.validationNotes[language]}</p>
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

          <GitHubFeedbackLink language={language} />
        </div>
        <ToolMetadataPanel language={language} tool={tool} />
      </div>
    </div>
  );
}
