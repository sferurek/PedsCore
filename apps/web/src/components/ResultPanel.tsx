import { calculateTool } from "@peds-core/core";
import type { CalculationResult, ClinicalToolMetadata } from "@peds-core/core";
import { forwardRef, useState } from "react";
import { translations } from "../i18n/translations";
import type { FormValues } from "../utils/formState";
import { hasActiveForm, validateForm } from "../utils/formState";
import type { Language } from "../utils/language";
import { trackUsageEvent } from "../utils/analytics";

interface ResultPanelProps {
  language: Language;
  tool: ClinicalToolMetadata;
  values: FormValues;
}

export const formatClinicalResultForClipboard = (
  language: Language,
  tool: ClinicalToolMetadata,
  result: CalculationResult
): string => {
  const lines: string[] = [tool.name[language]];
  const primaryValue = result.score ?? result.value;

  if (primaryValue !== undefined) {
    const label = result.score !== undefined
      ? (language === "es" ? "Puntuación" : "Score")
      : (language === "es" ? "Valor" : "Value");
    lines.push(`${label}: ${primaryValue}${result.unit ? ` ${result.unit}` : ""}${result.maxScore !== undefined ? ` / ${result.maxScore}` : ""}`);
  }

  if (result.classification) {
    lines.push(`${language === "es" ? "Clasificación" : "Classification"}: ${result.classification[language]}`);
  }

  if (result.interpretation) {
    lines.push(`${language === "es" ? "Interpretación" : "Interpretation"}: ${result.interpretation.label[language]}`);
  }

  if (result.criteriaMatched?.length) {
    lines.push(
      `${language === "es" ? "Criterios presentes" : "Matched criteria"}: ${result.criteriaMatched.map((item) => item[language]).join("; ")}`
    );
  }

  if (result.warnings.length) {
    lines.push(
      `${language === "es" ? "Advertencias" : "Warnings"}: ${result.warnings.map((item) => item.message[language]).join(" | ")}`
    );
  }

  const primaryReference = tool.references[0];
  if (primaryReference) {
    const source = [
      primaryReference.title,
      primaryReference.year ? String(primaryReference.year) : "",
      primaryReference.doi ? `DOI ${primaryReference.doi}` : primaryReference.pmid ? `PMID ${primaryReference.pmid}` : ""
    ].filter(Boolean).join(" · ");
    lines.push(`${language === "es" ? "Fuente" : "Source"}: ${source}`);
  }

  lines.push(`PedsCore · https://peds-core.vercel.app/${language}/tools/${tool.slug}`);
  lines.push(
    language === "es"
      ? "Resultado informativo; no sustituye la valoración clínica ni los protocolos locales."
      : "Informational result; does not replace clinical assessment or local protocols."
  );

  return lines.join("\n");
};

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
      <div className="result-copy-row">
        <button className="secondary-action result-copy-button" type="button" onClick={() => void copyResult()}>
          {copied
            ? (language === "es" ? "✓ Copiado" : "✓ Copied")
            : (language === "es" ? "Copiar resultado" : "Copy result")}
        </button>
        <small>
          {language === "es"
            ? "Copia solo resultado, interpretación y fuente; no copia los datos introducidos."
            : "Copies only the result, interpretation and source; entered clinical values are not copied."}
        </small>
      </div>
      {primaryValue !== undefined ? (
        <div className="result-value">
          <span>{valueLabel}</span>
          <strong>
            {primaryValue}
            {result.unit ? ` ${result.unit}` : ""}
          </strong>
          {result.maxScore !== undefined ? (
            <p>
              {t.result.maxScore}: {result.maxScore}
            </p>
          ) : null}
          {result.label ? <p>{result.label[language]}</p> : null}
        </div>
      ) : null}
      {result.classification ? (
        <div>
          <h3>{t.result.classification}</h3>
          <p>{result.classification[language]}</p>
        </div>
      ) : null}
      <div>
        <h3>{t.result.interpretation}</h3>
        <p>
          {result.interpretation
            ? result.interpretation.label[language]
            : t.result.noInterpretation}
        </p>
        {result.interpretation?.description ? (
          <p>{result.interpretation.description[language]}</p>
        ) : null}
      </div>
      {result.warnings.length > 0 ? (
        <div>
          <h3>{t.result.warnings}</h3>
          <ul className="warning-list">
            {result.warnings.map((warning) => (
              <li key={warning.id}>{warning.message[language]}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {result.criteriaMatched ? (
        <div>
          <h3>{t.result.criteriaMatched}</h3>
          {result.criteriaMatched.length > 0 ? (
            <ul className="warning-list neutral">
              {result.criteriaMatched.map((criterion) => (
                <li key={criterion.en}>{criterion[language]}</li>
              ))}
            </ul>
          ) : (
            <p>{t.result.noCriteriaMatched}</p>
          )}
        </div>
      ) : null}
      {result.trace.length > 0 ? (
        <details className="calculation-trace">
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
