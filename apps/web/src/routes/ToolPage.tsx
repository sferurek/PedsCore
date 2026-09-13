import {
  getToolBySlug,
  getAllTools,
  getToolDiscovery,
  type ClinicalToolMetadata,
  type WhoGrowthPreset
} from "@peds-core/core";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { atlas } from "../i18n/atlas";
import { categoryLabels } from "../i18n/translations";
import { DisclaimerBox } from "../components/DisclaimerBox";
import { DynamicForm } from "../components/DynamicForm";
import { GitHubFeedbackLink } from "../components/GitHubFeedbackLink";
import { WhoGrowthForm } from "../components/growth/WhoGrowthForm";
import { InterpretationTable } from "../components/InterpretationTable";
import { ReferenceList } from "../components/ReferenceList";
import { ResultPanel } from "../components/ResultPanel";
import { ScoringTable } from "../components/ScoringTable";
import { ToolMetadataPanel } from "../components/ToolMetadataPanel";
import { ToolClinicalGuide } from "../components/ToolClinicalGuide";
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

const getWhoGrowthPreset = (tool: ClinicalToolMetadata): WhoGrowthPreset | null => {
  if (tool.id === "who_growth_module" || tool.id === "who_growth_percentiles") {
    return "all";
  }

  if (tool.id === "bmi_percentile") {
    return "bmi";
  }

  if (tool.id === "head_circumference_percentile") {
    return "head_circumference";
  }

  return null;
};

export function ToolPage({ language, tool, navigate }: ToolPageProps) {
  const t = translations[language];
  const a = atlas[language];
  const isCanonical = tool.slug === "pram";
  const discovery = getToolDiscovery(tool.id);
  const whoGrowthPreset = getWhoGrowthPreset(tool);
  const whoGrowthTool = whoGrowthPreset ? getToolBySlug("who-growth") : null;
  const formTool = whoGrowthTool ?? tool;
  const [formValues, setFormValues] = useState<FormValues>(() =>
    getInitialFormState(formTool)
  );
  const resultPanelRef = useRef<HTMLElement>(null);
  const completedToolIdRef = useRef<string | null>(null);
  const isWhoGrowth = whoGrowthPreset !== null && whoGrowthTool !== null;
  const hasActiveCalculation = discovery?.calculationAvailability === "local_active" || isWhoGrowth;
  const isActiveReference = discovery?.surfaceStatus === "active" && !hasActiveCalculation;
  const relatedTools = useMemo(() => {
    const all = getAllTools();
    const byId = new Map(all.map((item) => [item.id, item]));
    const selected: ClinicalToolMetadata[] = [];
    const seen = new Set<string>([tool.id]);

    const add = (candidate: ClinicalToolMetadata | undefined) => {
      if (!candidate || seen.has(candidate.id)) return;
      seen.add(candidate.id);
      selected.push(candidate);
    };

    for (const id of discovery?.relatedToolIds ?? []) {
      add(byId.get(id));
    }

    if (discovery?.comparisonGroupIds.length) {
      for (const candidate of all) {
        const candidateDiscovery = getToolDiscovery(candidate.id);
        if (
          candidateDiscovery?.comparisonGroupIds.some((groupId) =>
            discovery.comparisonGroupIds.includes(groupId)
          )
        ) {
          add(candidate);
        }
      }
    }

    for (const candidate of all) {
      if (candidate.category === tool.category) add(candidate);
      if (selected.length >= 6) break;
    }

    return selected.slice(0, 6);
  }, [discovery, tool.category, tool.id]);
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
    setFormValues(getInitialFormState(formTool));
    completedToolIdRef.current = null;
  }, [formTool, tool]);

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
    <div className={isCanonical ? "tool-page atlas-canonical" : "tool-page"}>
      <nav className="atlas-breadcrumbs" aria-label={language === "es" ? "Ruta de navegación" : "Breadcrumbs"}><a href={makePath(language, "tools")} onClick={e => { e.preventDefault(); navigate(makePath(language, "tools")); }}>{language === "es" ? "Herramientas" : "Tools"}</a><span>/</span><a href={makePath(language, "categories", tool.category)} onClick={e => { e.preventDefault(); navigate(makePath(language, "categories", tool.category)); }}>{categoryLabels[tool.category][language]}</a><span>/</span><span>{isCanonical ? "PRAM" : tool.name[language]}</span></nav>
      <section className="tool-hero">
        <h1>{isCanonical ? "PRAM" : tool.name[language]}</h1>
        {isCanonical ? <p className="atlas-expanded-name">{tool.name[language]}</p> : null}
        <p>{tool.description[language]}</p>
        <div className="tool-hero-meta">
          <ToolStatusBadge language={language} status={tool.implementationStatus} toolId={tool.id} />
          <span>{evidenceLabels[tool.evidenceLevel][language]}</span>
          <span>{riskLabels[tool.regulatoryRisk][language]}</span>
        </div>
      </section>

      <nav className="atlas-section-nav" aria-label={language === "es" ? "Secciones de la herramienta" : "Tool sections"}>
        <a href="#clinical-context">{language === "es" ? "Resumen clínico" : "Clinical summary"}</a>
        <a href="#calculator">{hasActiveCalculation ? a.calculator : language === "es" ? "Uso" : "Use"}</a>
        {hasActiveCalculation ? <a href="#interpretation">{language === "es" ? "Interpretación" : "Interpretation"}</a> : null}
        <a href="#evidence">{a.evidence}</a>
        <a href="#references">{a.references}</a>
        {relatedTools.length > 0 ? <a href="#related">{a.related}</a> : null}
      </nav>
      <div className="tool-layout">
        <div className="tool-main tool-page-main">
          <ToolClinicalGuide language={language} tool={tool} />

          <DisclaimerBox language={language} />

          {isWhoGrowth ? (
            <section className="content-panel partial-active-panel">
              <h2>{t.tool.partialActiveTitle}</h2>
              <p>{t.tool.partialActiveBody}</p>
            </section>
          ) : null}

          {hasActiveCalculation ? (
            <div className={isCanonical ? "atlas-workspace" : "atlas-legacy-workspace"} id="calculator">
              {isWhoGrowth ? (
                <WhoGrowthForm
                  language={language}
                  preset={whoGrowthPreset ?? "all"}
                  tool={formTool}
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
                          ? "Cargando módulo de crecimiento OMS…"
                          : "Loading WHO growth module…"}
                      </p>
                    </section>
                  }
                >
                  <WhoGrowthResultPanel
                    ref={resultPanelRef}
                    language={language}
                    preset={whoGrowthPreset ?? "all"}
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
            </div>
          ) : (
            <section className="content-panel inactive-tool-panel" id="calculator">
              <h2>
                {isActiveReference
                  ? t.tool.referenceTitle
                  : discovery?.surfaceStatus === "blocked"
                    ? t.tool.limitedTitle
                    : discovery?.surfaceStatus === "draft"
                      ? t.tool.preparationTitle
                      : t.tool.notActiveTitle}
              </h2>
              <p>
                {isActiveReference
                  ? t.tool.referenceBody
                  : discovery?.surfaceStatus === "blocked"
                    ? t.tool.limitedBody
                    : t.tool.automaticCalculationInactive}
              </p>
              <p>{tool.validationNotes[language]}</p>
              {discovery?.calculationAvailability === "external_official" ? (
                <p className="surface-availability-note">
                  {language === "es"
                    ? "El uso operativo depende de la fuente o herramienta oficial externa."
                    : "Operational use depends on the official external source or tool."}
                </p>
              ) : null}
              {discovery?.surfaceStatus !== "active" ? (
                <a
                  className="primary-link"
                  href="https://github.com/sferurek/PedsCore/issues/new/choose"
                  rel="noreferrer"
                  target="_blank"
                >
                  {t.evidence.submitEvidence}
                </a>
              ) : null}
            </section>
          )}

          {hasActiveCalculation ? (
            <div className="tool-interpretation-stack" id="interpretation">
              <div className="tool-section-heading">
                <p className="eyebrow">{language === "es" ? "LECTURA CLÍNICA" : "CLINICAL READING"}</p>
                <h2>{language === "es" ? "Interpretación" : "Interpretation"}</h2>
              </div>
              <InterpretationTable language={language} tool={tool} />
              <ScoringTable language={language} tool={tool} />
            </div>
          ) : null}

          <section className="content-panel" id="references">
            <h2>{t.tool.sourcesAndEvidence}</h2>
            <ReferenceList language={language} references={tool.references} />
          </section>

          <section className="content-panel" id="evidence">
            <h2>{t.tool.validationNotes}</h2>
            <p>{tool.validationNotes[language]}</p>
          </section>

          {hasEvidenceBlock(tool.implementationStatus) && discovery?.surfaceStatus !== "active" ? (
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
      {relatedTools.length > 0 ? (
        <section className="atlas-related" id="related">
          <div className="tool-section-heading">
            <p className="eyebrow">{language === "es" ? "SIGUE EXPLORANDO" : "KEEP EXPLORING"}</p>
            <h2>{a.related}</h2>
            <p>
              {language === "es"
                ? "Herramientas próximas por problema clínico, finalidad o especialidad."
                : "Nearby tools by clinical problem, purpose or specialty."}
            </p>
          </div>
          <div className="atlas-related-grid">
            {relatedTools.map((item) => (
              <a
                key={item.id}
                href={makePath(language, "tools", item.slug)}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(makePath(language, "tools", item.slug));
                }}
              >
                <span>{item.shortName || item.name[language]}</span>
                <small>{item.description[language]}</small>
                <b aria-hidden="true">→</b>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
