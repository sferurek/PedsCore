import { calculateTool } from "@peds-core/core";
import type { CalculationResult, ClinicalToolMetadata } from "@peds-core/core";
import { forwardRef, useState } from "react";
import { translations } from "../i18n/translations";
import type { FormValues } from "../utils/formState";
import { hasActiveForm, validateForm } from "../utils/formState";
import type { Language } from "../utils/language";
import { trackUsageEvent } from "../utils/analytics";
import { formatClinicalResultForClipboard } from "../utils/resultCopy";

interface ResultPanelProps {
  language: Language;
  tool: ClinicalToolMetadata;
  values: FormValues;
}

export const ResultPanel = forwardRef<HTMLElement, ResultPanelProps>(
  function ResultPanel({ language, tool, values }, ref) {
  const t = translations[language];
  const validation = validateForm(tool, values);
  const hasForm = hasActiveForm(tool);
  const calculationResult =
    tool.implementationStatus === "implemented" && validation.isComplete
      ? calculateTool(tool.id, values)
      : null;

  return (
    <section className="content-panel result-panel clinical-result-card" ref={ref} aria-live="polite" aria-atomic="true">
      <h2>{t.result.title}</h2>
      {tool.implementationStatus !== "implemented" ? (
        <p>{t.result.inactiveCalculation}</p>
      ) : null}
      {tool.type === "clinical_rule" ? (
        <p className="inactive-calculation">{t.result.clinicalRuleNote}</p>
      ) : null}
      {hasForm && !validation.isComplete ? (
        <p className="inactive-calculation">{t.result.completeRequired}</p>
      ) : null}
      {calculationResult ? (
        <CalculatedResult language={language} result={calculationResult} tool={tool} />
      ) : null}
      {tool.calculationNotes ? <p>{tool.calculationNotes[language]}</p> : null}
    </section>
  );
});

interface CalculatedResultProps {
  language: Language;
  result: CalculationResult;
  tool: ClinicalToolMetadata;
}

function CalculatedResult({ language, result, tool }: CalculatedResultProps) {
  const t = translations[language];
  const [copied, setCopied] = useState(false);
  const primaryValue = result.score ?? result.value;
  const valueLabel = result.score !== undefined ? t.result.score : t.result.value;
  const primaryText =
    primaryValue !== undefined
      ? `${primaryValue}${result.unit ? ` ${result.unit}` : ""}`
      : result.classification?.[language] ??
        result.interpretation?.label[language] ??
        t.result.noInterpretation;
  const primaryEyebrow =
    primaryValue !== undefined
      ? valueLabel
      : result.classification
        ? t.result.classification
        : t.result.interpretation;

  const copyResult = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(formatClinicalResultForClipboard(language, tool, result));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      trackUsageEvent("result_copied", window.location.pathname, language, {
        toolId: tool.id,
        toolType: tool.type,
        category: tool.category,
        status: tool.implementationStatus
      });
    } catch {
      // Clipboard availability must never affect the clinical result.
    }
  };

  return (
    <div className="calculated-result">
      <div className="result-hero">
        <div className="result-hero-copy">
          <span className="result-kicker">{primaryEyebrow}</span>
          <strong className="result-primary-value">{primaryText}</strong>
          {result.maxScore !== undefined ? (
            <span className="result-max-score">
              {t.result.maxScore}: {result.maxScore}
            </span>
          ) : null}
          {result.label ? (
            <span className="result-supporting-label">{result.label[language]}</span>
          ) : null}
        </div>
        <button
          className="secondary-action result-copy-button"
          type="button"
          onClick={() => void copyResult()}
        >
          {copied
            ? (language === "es" ? "✓ Copiado" : "✓ Copied")
            : (language === "es" ? "Copiar resultado" : "Copy result")}
        </button>
      </div>

      <p className="result-privacy-note">
        {language === "es"
          ? "Copia solo resultado, interpretación y fuente; no copia los datos introducidos."
          : "Copies only the result, interpretation and source; entered clinical values are not copied."}
      </p>

      <div className="result-detail-grid">
        {result.classification ? (
          <section className="result-detail-card result-classification-card">
            <span className="result-detail-label">{t.result.classification}</span>
            <strong className="result-detail-emphasis">{result.classification[language]}</strong>
          </section>
        ) : null}

        <section className="result-detail-card result-interpretation-card">
          <span className="result-detail-label">{t.result.interpretation}</span>
          <strong className="result-detail-emphasis">
            {result.interpretation
              ? result.interpretation.label[language]
              : t.result.noInterpretation}
          </strong>
          {result.interpretation?.description ? (
            <p>{result.interpretation.description[language]}</p>
          ) : null}
        </section>
      </div>

      {result.warnings.length > 0 ? (
        <section className="result-alert-card">
          <div className="result-alert-heading">
            <span aria-hidden="true">!</span>
            <h3>{t.result.warnings}</h3>
          </div>
          <ul className="warning-list">
            {result.warnings.map((warning) => (
              <li key={warning.id}>{warning.message[language]}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {result.criteriaMatched ? (
        <section className="result-detail-card result-criteria-card">
          <span className="result-detail-label">{t.result.criteriaMatched}</span>
          {result.criteriaMatched.length > 0 ? (
            <ul className="warning-list neutral">
              {result.criteriaMatched.map((criterion) => (
                <li key={criterion.en}>{criterion[language]}</li>
              ))}
            </ul>
          ) : (
            <p>{t.result.noCriteriaMatched}</p>
          )}
        </section>
      ) : null}

      {result.trace.length > 0 ? (
        <details className="calculation-trace result-trace-card">
          <summary>{language === "es" ? "Cómo se ha calculado" : "How this was calculated"}</summary>
          <p>
            {language === "es"
              ? "Desglose de las entradas utilizadas y la contribución de cada una cuando la herramienta asigna puntos."
              : "Breakdown of the inputs used and each contribution when the tool assigns points."}
          </p>
          <dl className="trace-list">
            {result.trace.map((item) => {
              const input = tool.inputs?.find((candidate) => candidate.id === item.inputId);
              return (
                <div key={item.inputId}>
                  <dt>{input?.label[language] ?? item.inputId}</dt>
                  <dd>
                    {String(item.value)}
                    {item.score !== undefined
                      ? (language === "es" ? ` · +${item.score} puntos` : ` · +${item.score} points`)
                      : ""}
                  </dd>
                </div>
              );
            })}
          </dl>
        </details>
      ) : null}
    </div>
  );
}

