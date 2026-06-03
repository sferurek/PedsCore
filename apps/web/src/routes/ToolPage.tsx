import type { ClinicalToolMetadata } from "@peds-core/core";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { DisclaimerBox } from "../components/DisclaimerBox";
import { DynamicForm } from "../components/DynamicForm";
import { GitHubFeedbackLink } from "../components/GitHubFeedbackLink";
import { WhoGrowthForm } from "../components/growth/WhoGrowthForm";
import { InterpretationTable } from "../components/InterpretationTable";
import { ReferenceList } from "../components/ReferenceList";
import { ResultPanel } from "../components/ResultPanel";
import { ScoringTable } from "../components/ScoringTable";
import { ToolMetadataPanel } from "../components/ToolMetadataPanel";
import { translations } from "../i18n/translations";
import {
  getUnlockActions,
  hasEvidenceBlock
} from "../utils/evidenceStatus";
import type { FormValues } from "../utils/formState";
import { getInitialFormState } from "../utils/formState";
import type { Language } from "../utils/language";

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

  useEffect(() => {
    setFormValues(getInitialFormState(tool));
  }, [tool]);

  const scrollToResults = () => {
    resultPanelRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start"
    });
  };

  return (
    <div className="tool-page">
      <section className="tool-hero">
        <h1>{tool.name[language]}</h1>
      </section>

      <div className="tool-layout">
        <div className="tool-main tool-page-main">
          <DisclaimerBox language={language} />

          <section className="content-panel">
            <h2>{t.tool.description}</h2>
            <p>{tool.description[language]}</p>
          </section>

          {tool.id === "who_growth_module" ? (
            <WhoGrowthForm
              language={language}
              tool={tool}
              values={formValues}
              onChange={setFormValues}
              onFormComplete={scrollToResults}
            />
          ) : (
            <DynamicForm
              language={language}
              tool={tool}
              onFormComplete={scrollToResults}
              onStateChange={setFormValues}
            />
          )}

          {tool.id === "who_growth_module" ? (
            <Suspense
              fallback={
                <section
                  className="content-panel result-panel who-growth-result-panel"
                  ref={resultPanelRef}
                >
                  <p className="inactive-calculation">
                    {language === "es"
                      ? "Cargando módulo de crecimiento OMS..."
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

          <InterpretationTable language={language} tool={tool} />

          <ScoringTable language={language} tool={tool} />

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
