import type { CalculationResult, ClinicalToolMetadata } from "@peds-core/core";
import type { Language } from "./language";

export const formatClinicalResultForClipboard = (
  language: Language,
  tool: ClinicalToolMetadata,
  result: CalculationResult
): string => {
  const lines: string[] = [tool.name[language]];
  const primaryValue = result.score ?? result.value;

  const primaryUnit = result.score !== undefined && result.value !== undefined ? undefined : result.unit;

  if (primaryValue !== undefined) {
    const label = result.score !== undefined
      ? (language === "es" ? "Puntuación" : "Score")
      : (language === "es" ? "Valor" : "Value");
    lines.push(`${label}: ${primaryValue}${primaryUnit ? ` ${primaryUnit}` : ""}${result.maxScore !== undefined ? ` / ${result.maxScore}` : ""}`);
  }

  if (result.score !== undefined && result.value !== undefined) {
    lines.push(`${result.label?.[language] ?? (language === "es" ? "Valor" : "Value")}: ${result.value}${result.unit ? ` ${result.unit}` : ""}`);
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

  lines.push(`PedsCore · https://pedscore.app/${language}/tools/${tool.slug}`);
  lines.push(
    language === "es"
      ? "Resultado informativo; no sustituye la valoración clínica ni los protocolos locales."
      : "Informational result; does not replace clinical assessment or local protocols."
  );

  return lines.join("\n");
};
