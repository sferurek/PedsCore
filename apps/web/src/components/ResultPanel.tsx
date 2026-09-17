import { calculateTool } from "@peds-core/core";
import type { CalculationResult, ClinicalToolMetadata } from "@peds-core/core";
import { forwardRef } from "react";
import { translations } from "../i18n/translations";
import type { FormValues } from "../utils/formState";
import { hasActiveForm, validateForm } from "../utils/formState";
import type { Language } from "../utils/language";

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
    <section className="content-panel result-panel" ref={ref} aria-live="polite" aria-atomic="true">
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
  const primaryValue = result.score ?? result.value;
  const valueLabel = result.score !== undefined ? t.result.score : t.result.value;

  return (
    <div className="calculated-result">
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
