import type { ClinicalToolMetadata } from "@peds-core/core";
import { translations } from "../i18n/translations";
import type { FormValues } from "../utils/formState";
import { hasActiveForm, validateForm } from "../utils/formState";
import type { Language } from "../utils/language";

interface ResultPanelProps {
  language: Language;
  tool: ClinicalToolMetadata;
  values: FormValues;
}

export function ResultPanel({ language, tool, values }: ResultPanelProps) {
  const t = translations[language];
  const validation = validateForm(tool, values);
  const hasForm = hasActiveForm(tool);

  return (
    <section className="content-panel result-panel">
      <h2>{t.result.title}</h2>
      <dl className="compact-metadata">
        <div>
          <dt>{t.result.calculationStatus}</dt>
          <dd>{tool.calculationStatus ?? "not_available"}</dd>
        </div>
        <div>
          <dt>{t.common.status}</dt>
          <dd>{tool.implementationStatus}</dd>
        </div>
      </dl>
      <p>{t.result.inactiveCalculation}</p>
      {hasForm && !validation.isComplete ? (
        <p className="inactive-calculation">{t.result.completeRequired}</p>
      ) : null}
      {tool.calculationNotes ? <p>{tool.calculationNotes[language]}</p> : null}
    </section>
  );
}

