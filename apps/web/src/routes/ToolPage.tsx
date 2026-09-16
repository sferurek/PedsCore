import {
  getToolBySlug,
  getSemanticRelatedTools,
  getToolDiscovery,
  getToolSeoProfile,
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
import { ToolEditorialInsight } from "../components/ToolEditorialInsight";
import { ToolStatusBadge } from "../components/ToolStatusBadge";
import { evidenceLabels, riskLabels, statusLabels, translations } from "../i18n/translations";
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
  const [aapBiliGa, setAapBiliGa] = useState("40");
  const [aapBiliAge, setAapBiliAge] = useState("48");
  const [aapBiliTsb, setAapBiliTsb] = useState("");
  const [aapBiliRisk, setAapBiliRisk] = useState("none");
  const resultPanelRef = useRef<HTMLElement>(null);
  const completedToolIdRef = useRef<string | null>(null);
  const isWhoGrowth = whoGrowthPreset !== null && whoGrowthTool !== null;
  const hasActiveCalculation = discovery?.calculationAvailability === "local_active" || isWhoGrowth;
  const isActiveReference = discovery?.surfaceStatus === "active" && !hasActiveCalculation;
  const relatedTools = useMemo(() => getSemanticRelatedTools(tool, 8), [tool]);
  const seoProfile = useMemo(() => getToolSeoProfile(tool, language), [language, tool]);
  const aapBiliUrl = useMemo(() => {
    const params = new URLSearchParams({
      ga: aapBiliGa,
      age: aapBiliAge,
      risk: aapBiliRisk
    });
    if (aapBiliTsb.trim()) {
      params.set("bili", aapBiliTsb.trim());
    }
    return `https://peditools.org/bili2022/api/?${params.toString()}`;
  }, [aapBiliAge, aapBiliGa, aapBiliRisk, aapBiliTsb]);
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
        <a href="#about-tool">{language === "es" ? "Sobre la herramienta" : "About this tool"}</a>
        <a href="#calculator">{hasActiveCalculation ? a.calculator : language === "es" ? "Uso" : "Use"}</a>
        {hasActiveCalculation ? <a href="#interpretation">{language === "es" ? "Interpretación" : "Interpretation"}</a> : null}
        <a href="#evidence">{a.evidence}</a>
        <a href="#references">{a.references}</a>
        {relatedTools.length > 0 ? <a href="#related">{a.related}</a> : null}
      </nav>
      <div className="tool-layout">
        <div className="tool-main tool-page-main">
          <ToolClinicalGuide language={language} tool={tool} />

          <section className="content-panel tool-search-context" id="about-tool">
            <div className="tool-section-heading">
              <p className="eyebrow">{language === "es" ? "CONTEXTO CLÍNICO" : "CLINICAL CONTEXT"}</p>
              <h2>
                {language === "es"
                  ? `Qué es ${seoProfile.primaryTerm}`
                  : `What is ${seoProfile.primaryTerm}?`}
              </h2>
            </div>
            <p>{tool.description[language]}</p>
            <h3>{language === "es" ? "Población y ámbito de uso" : "Population and scope"}</h3>
            <p>
              {language === "es"
                ? `${seoProfile.topic}. Población descrita: ${tool.population[language]}.`
                : `${seoProfile.topic}. Described population: ${tool.population[language]}.`}
            </p>
            {seoProfile.aliases.length > 1 ? (
              <>
                <h3>{language === "es" ? "También puede encontrarse como" : "Also searched as"}</h3>
                <p>{seoProfile.aliases.join(" · ")}</p>
              </>
            ) : null}
          </section>

          <ToolEditorialInsight language={language} tool={tool} />

          <DisclaimerBox language={language} />

          {isWhoGrowth ? (
            <section className="content-panel partial-active-panel">
              <h2>{t.tool.partialActiveTitle}</h2>
              <p>{t.tool.partialActiveBody}</p>
            </section>
          ) : null}

          {tool.id === "thompson_hie" ? (
            <section className="content-panel surface-availability-note">
              <strong>
                {language === "es"
                  ? "Referencia para asignar las puntuaciones Thompson"
                  : "Reference for assigning Thompson item scores"}
              </strong>
              <p>
                {language === "es"
                  ? "PedsCore usa una interfaz numérica propia y no reproduce la tabla original. Consulta una reproducción abierta de la tabla Thompson para asignar 0–3 según cada dominio y vuelve aquí para calcular el total 0–22."
                  : "PedsCore uses its own numeric interface and does not reproduce the original table. Consult an open reproduction of the Thompson table to assign 0–3 by domain, then return here to calculate the 0–22 total."}
              </p>
              <a
                className="primary-link"
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6568287/"
                rel="noreferrer"
                target="_blank"
              >
                {language === "es"
                  ? "Ver tabla Thompson de referencia ↗"
                  : "View Thompson reference table ↗"}
              </a>
              <p>
                {language === "es"
                  ? "Interpretación mostrada: 0 sin anormalidades puntuadas; 1–10 leve; 11–14 moderada; 15–22 grave. Algunas publicaciones separan 0–7 como sin encefalopatía y 8–10 como leve."
                  : "Displayed interpretation: 0 no scored abnormalities; 1–10 mild; 11–14 moderate; 15–22 severe. Some publications instead separate 0–7 as no encephalopathy and 8–10 as mild."}
              </p>
            </section>
          ) : null}

          {tool.id === "sarnat" ? (
            <section className="content-panel surface-availability-note">
              <strong>
                {language === "es"
                  ? "Sarnat clásico 1976: referencia descriptiva"
                  : "Classic Sarnat 1976: descriptive reference"}
              </strong>
              <p>
                {language === "es"
                  ? "Esta ficha mantiene el sistema original como estadificación clínica I-II-III y no lo transforma en una puntuación numérica. La variante Modified Sarnat / NICHD se publica como herramienta independiente."
                  : "This page preserves the original system as a clinical Stage I-II-III framework and does not turn it into a numeric score. Modified Sarnat / NICHD is published as a separate tool."}
              </p>
              <a
                className="primary-link"
                href="https://jamanetwork.com/journals/jamaneurology/article-abstract/574959"
                rel="noreferrer"
                target="_blank"
              >
                {language === "es"
                  ? "Consultar publicación original de Sarnat 1976 ↗"
                  : "View the original 1976 Sarnat publication ↗"}
              </a>
            </section>
          ) : tool.id === "modified_sarnat_nichd" ? (
            <section className="content-panel surface-availability-note">
              <strong>
                {language === "es"
                  ? "Modified Sarnat / NICHD: seis categorías, 0–3"
                  : "Modified Sarnat / NICHD: six categories, 0–3"}
              </strong>
              <p>
                {language === "es"
                  ? "Codifica cada categoría como normal (0), leve (1), moderada (2) o grave (3). PedsCore calcula el Total Sarnat Score 0–18 y describe el patrón predominante; no decide indicación de hipotermia terapéutica."
                  : "Code each category as normal (0), mild (1), moderate (2), or severe (3). PedsCore calculates the 0–18 Total Sarnat Score and describes the predominant pattern; it does not determine therapeutic-hypothermia eligibility."}
              </p>
              <a
                className="primary-link"
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6445543/"
                rel="noreferrer"
                target="_blank"
              >
                {language === "es"
                  ? "Consultar tabla publicada de Modified Sarnat ↗"
                  : "View the published Modified Sarnat table ↗"}
              </a>
            </section>
          ) : null}

          {tool.id === "dubowitz" ? (
            <section className="content-panel surface-availability-note">
              <strong>
                {language === "es"
                  ? "Referencia visual para puntuar los 21 signos"
                  : "Visual reference for scoring the 21 signs"}
              </strong>
              <p>
                {language === "es"
                  ? "PedsCore no reproduce las ilustraciones originales. Consulta la lámina del examen Dubowitz alojada por la University of Texas Medical Branch, que indica que el formulario se reproduce con permiso, y vuelve aquí para introducir las puntuaciones numéricas."
                  : "PedsCore does not reproduce the original illustrations. View the Dubowitz examination sheet hosted by the University of Texas Medical Branch, which states that the form is reproduced with permission, then return here to enter the numerical scores."}
              </p>
              <a
                className="primary-link"
                href="https://www.utmb.edu/pedi_ed/Newborn_Exam/Newborn_Exam17.html"
                rel="noreferrer"
                target="_blank"
              >
                {language === "es"
                  ? "Ver lámina de referencia Dubowitz ↗"
                  : "View Dubowitz reference sheet ↗"}
              </a>
            </section>
          ) : tool.id === "ballard" ? (
            <section className="content-panel surface-availability-note">
              <strong>
                {language === "es"
                  ? "Referencia visual del New Ballard Score"
                  : "New Ballard Score visual reference"}
              </strong>
              <p>
                {language === "es"
                  ? "PedsCore no reproduce la lámina protegida del New Ballard Score. Consulta la figura autorizada publicada por MSD Manuals y vuelve aquí para introducir las 12 puntuaciones numéricas; PedsCore calculará el total y las semanas completas."
                  : "PedsCore does not reproduce the protected New Ballard Score sheet. View the authorized figure published by MSD Manuals, then return here to enter the 12 numerical scores; PedsCore will calculate the total and completed gestational weeks."}
              </p>
              <a
                className="primary-link"
                href="https://www.msdmanuals.com/es/professional/multimedia/image/evaluaci%C3%B3n-de-la-edad-gestacional-nueva-escala-de-ballard"
                rel="noreferrer"
                target="_blank"
              >
                {language === "es"
                  ? "Ver lámina de referencia Ballard en MSD ↗"
                  : "View Ballard reference sheet on MSD ↗"}
              </a>
            </section>
          ) : null}

          {tool.id === "aap_2022_hyperbilirubinemia" ? (
            <section className="content-panel" id="calculator">
              <div className="tool-section-heading">
                <p className="eyebrow">{language === "es" ? "AAP 2022 · PEDIATRÍA NEONATAL" : "AAP 2022 · NEONATAL CARE"}</p>
                <h2>{language === "es" ? "Calcular umbrales" : "Calculate thresholds"}</h2>
              </div>
              <p>
                {language === "es"
                  ? "PedsCore prepara los parámetros y abre el cálculo en PediTools, cuya API 2022 es gratuita y no requiere registro ni licencia. Así evitamos reproducir localmente las curvas y tablas protegidas de la AAP."
                  : "PedsCore prepares the parameters and opens the calculation in PediTools, whose 2022 API is free and requires no registration or license. This avoids locally reproducing the AAP threshold curves and tables."}
              </p>
              <div className="dynamic-form">
                <label>
                  <span>{language === "es" ? "Edad gestacional al nacimiento (semanas completas)" : "Gestational age at birth (completed weeks)"}</span>
                  <select value={aapBiliGa} onChange={(event) => setAapBiliGa(event.target.value)}>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40+</option>
                  </select>
                </label>
                <label>
                  <span>{language === "es" ? "Edad postnatal (horas)" : "Postnatal age (hours)"}</span>
                  <input
                    type="number"
                    min="1"
                    max="336"
                    step="1"
                    value={aapBiliAge}
                    onChange={(event) => setAapBiliAge(event.target.value)}
                  />
                </label>
                <label>
                  <span>{language === "es" ? "Bilirrubina total sérica, TSB (mg/dL)" : "Total serum bilirubin, TSB (mg/dL)"}</span>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder={language === "es" ? "Opcional: deja vacío para ver solo umbrales" : "Optional: leave blank for thresholds only"}
                    value={aapBiliTsb}
                    onChange={(event) => setAapBiliTsb(event.target.value)}
                  />
                </label>
                <label>
                  <span>{language === "es" ? "Factores adicionales de neurotoxicidad" : "Additional neurotoxicity risk factors"}</span>
                  <select value={aapBiliRisk} onChange={(event) => setAapBiliRisk(event.target.value)}>
                    <option value="none">{language === "es" ? "Ninguno" : "None"}</option>
                    <option value="any">{language === "es" ? "Uno o más" : "One or more"}</option>
                  </select>
                </label>
              </div>
              <p className="surface-availability-note">
                {language === "es"
                  ? "Factores adicionales: albúmina <3 g/dL, enfermedad hemolítica isoimmune/G6PD u otra hemólisis, sepsis o inestabilidad clínica significativa en las últimas 24 h. La edad gestacional <38 semanas ya se incorpora al umbral por edad gestacional."
                  : "Additional factors: albumin <3 g/dL, isoimmune hemolytic disease/G6PD deficiency or other hemolysis, sepsis, or significant clinical instability in the previous 24 h. Gestational age <38 weeks is already incorporated through the gestational-age-specific threshold."}
              </p>
              <a className="primary-link" href={aapBiliUrl} rel="noreferrer" target="_blank">
                {language === "es" ? "Abrir cálculo AAP 2022 en PediTools ↗" : "Open AAP 2022 calculation in PediTools ↗"}
              </a>
              <p>
                {language === "es"
                  ? "Usa TSB para decisiones terapéuticas y no restes la fracción directa/conjugada. PediTools mostrará los umbrales de fototerapia y exanguinotransfusión y, cuando proceda, la distancia de la TSB al umbral."
                  : "Use TSB for treatment decisions and do not subtract the direct/conjugated fraction. PediTools will display phototherapy and exchange-transfusion thresholds and, when applicable, the TSB distance from the treatment threshold."}
              </p>
            </section>
          ) : hasActiveCalculation ? (
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

          <section className="content-panel tool-evidence-summary" id="evidence">
            <div className="tool-section-heading">
              <p className="eyebrow">{language === "es" ? "TRAZABILIDAD" : "TRACEABILITY"}</p>
              <h2>{language === "es" ? "Evidencia y revisión" : "Evidence and review"}</h2>
            </div>
            <p>{tool.validationNotes[language]}</p>
          </section>

          <section className="content-panel tool-editorial-transparency" id="editorial-transparency">
            <div className="tool-section-heading">
              <p className="eyebrow">{language === "es" ? "TRANSPARENCIA EDITORIAL" : "EDITORIAL TRANSPARENCY"}</p>
              <h2>{language === "es" ? "Cómo se mantiene esta ficha" : "How this page is maintained"}</h2>
            </div>
            <p>
              {language === "es"
                ? "PedsCore publica de forma explícita el estado de implementación, el nivel de evidencia, las notas de validación y las fuentes de cada herramienta. El contenido y la lógica clínica se mantienen en un repositorio abierto con historial de cambios y pruebas automatizadas."
                : "PedsCore explicitly publishes implementation status, evidence level, validation notes and sources for each tool. Clinical content and logic are maintained in an open repository with change history and automated tests."}
            </p>
            <dl className="evidence-summary-grid">
              <div>
                <dt>{language === "es" ? "Estado" : "Status"}</dt>
                <dd>{statusLabels[tool.implementationStatus][language]}</dd>
              </div>
              <div>
                <dt>{language === "es" ? "Evidencia" : "Evidence"}</dt>
                <dd>{evidenceLabels[tool.evidenceLevel][language]}</dd>
              </div>
              <div>
                <dt>{language === "es" ? "Referencias" : "References"}</dt>
                <dd>{tool.references.length}</dd>
              </div>
            </dl>
            <p>
              {language === "es"
                ? "La presencia de una herramienta en el catálogo no equivale a una recomendación clínica. Cuando la fuente, la variante exacta, la licencia o la validación no están suficientemente cerradas, la herramienta permanece como referencia o contenido limitado."
                : "A tool’s presence in the catalog is not a clinical recommendation. When source, exact variant, licensing or validation are not sufficiently resolved, the tool remains reference-only or limited."}
            </p>
            <div className="link-row">
              <a className="primary-link" href={makePath(language, "evidence")} onClick={(event) => { event.preventDefault(); navigate(makePath(language, "evidence")); }}>
                {language === "es" ? "Metodología de evidencia" : "Evidence methodology"}
              </a>
              <a className="primary-link" href="https://github.com/sferurek/PedsCore" rel="noreferrer" target="_blank">
                GitHub
              </a>
            </div>
          </section>

          <section className="content-panel" id="references">
            <h2>{t.tool.sourcesAndEvidence}</h2>
            <ReferenceList language={language} references={tool.references} />
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
