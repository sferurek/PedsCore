import {
  calculateTool,
  getToolDiscovery,
  type ClinicalToolMetadata,
  type CalculationResult,
  type ToolInput
} from "@peds-core/core";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { categoryLabels, evidenceLabels } from "../i18n/translations";
import type { FormValues, FormValue } from "../utils/formState";
import { validateForm } from "../utils/formState";
import type { Language } from "../utils/language";
import { makePath } from "../utils/routes";

interface PramShowcasePageProps {
  language: Language;
  tool: ClinicalToolMetadata;
  navigate: (href: string) => void;
  values: FormValues;
  setValues: Dispatch<SetStateAction<FormValues>>;
  favorite: boolean;
  onFavorite: () => void;
  onShare: () => void;
  onFormComplete: () => void;
  resultRef: RefObject<HTMLElement | null>;
  relatedTools: ClinicalToolMetadata[];
}

const iconForInput = (inputId: string): string => {
  if (inputId.includes("oxygen")) return "O₂";
  if (inputId.includes("wheez")) return "◒";
  if (inputId.includes("air_entry")) return "♧";
  return "◌";
};

const getClinicalInputs = (tool: ClinicalToolMetadata): ToolInput[] =>
  (tool.inputs ?? []).filter((input) =>
    [
      "suprasternal_retractions",
      "scalene_muscle_contraction",
      "air_entry",
      "wheezing"
    ].includes(input.id)
  );

const getSupportingInput = (tool: ClinicalToolMetadata, id: string): ToolInput | undefined =>
  tool.inputs?.find((input) => input.id === id);

const optionValue = (option: NonNullable<ToolInput["options"]>[number]): FormValue =>
  option.value ?? option.id;

const isSelected = (
  current: FormValue | undefined,
  option: NonNullable<ToolInput["options"]>[number]
): boolean => current === optionValue(option) || current === option.id;

export function PramShowcasePage({
  language,
  tool,
  navigate,
  values,
  setValues,
  favorite,
  onFavorite,
  onShare,
  onFormComplete,
  resultRef,
  relatedTools
}: PramShowcasePageProps) {
  const discovery = getToolDiscovery(tool.id);
  const validation = validateForm(tool, values);
  const result: CalculationResult | null = validation.isComplete
    ? calculateTool(tool.id, values)
    : null;
  const clinicalInputs = getClinicalInputs(tool);
  const ageInput = getSupportingInput(tool, "age_years");
  const oxygenConditionInput = getSupportingInput(tool, "oxygen_measurement_condition");
  const oxygenInput = getSupportingInput(tool, "oxygen_saturation");
  const population = tool.population[language];
  const careSetting = discovery?.careSettings?.[0]
    ? discovery.careSettings[0].replaceAll("_", " ")
    : language === "es" ? "Urgencias pediátricas" : "Pediatric emergency care";

  const update = (inputId: string, value: FormValue) => {
    const next = { ...values, [inputId]: value };
    setValues(next);
    if (validateForm(tool, next).isComplete) {
      window.setTimeout(onFormComplete, 0);
    }
  };

  const reset = () => {
    const next: FormValues = {};
    for (const input of tool.inputs ?? []) {
      next[input.id] = null;
    }
    setValues(next);
  };

  const primaryValue = result?.score ?? result?.value;

  return (
    <div className="pram-showcase">
      <section className="pram-hero-shell">
        <div className="pram-hero-media" aria-hidden="true" />
        <nav className="pram-breadcrumbs" aria-label={language === "es" ? "Ruta de navegación" : "Breadcrumbs"}>
          <a href={makePath(language, "tools")} onClick={(event) => { event.preventDefault(); navigate(makePath(language, "tools")); }}>
            {language === "es" ? "Herramientas" : "Tools"}
          </a>
          <span>›</span>
          <a href={makePath(language, "categories", tool.category)} onClick={(event) => { event.preventDefault(); navigate(makePath(language, "categories", tool.category)); }}>
            {categoryLabels[tool.category][language]}
          </a>
          <span>›</span>
          <span>PRAM</span>
        </nav>

        <div className="pram-hero-copy">
          <div className="pram-title-row">
            <div>
              <div className="pram-title-line">
                <h1>PRAM Score</h1>
                <span className="pram-clinical-badge">✓ {language === "es" ? "Herramienta clínica" : "Clinical tool"}</span>
              </div>
              <p>{tool.description[language]}</p>
            </div>
            <div className="pram-hero-actions">
              <button className={favorite ? "pram-pill-button is-active" : "pram-pill-button"} onClick={onFavorite} type="button" aria-pressed={favorite}>
                {favorite ? "♥" : "♡"} {language === "es" ? "Favorito" : "Favorite"}
              </button>
              <button className="pram-pill-button" onClick={onShare} type="button">
                ↗ {language === "es" ? "Compartir" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="pram-summary-stack">
        <div className="pram-trust-chips" aria-label={language === "es" ? "Nivel de evidencia" : "Evidence level"}>
          <span>◆ {language === "es" ? "Basada en evidencia" : "Evidence based"}</span>
          <span>ⓘ {evidenceLabels[tool.evidenceLevel][language]}</span>
        </div>

        <section className="pram-quick-strip" aria-label={language === "es" ? "Resumen clínico" : "Clinical summary"}>
          <div><b>♟</b><span><strong>{language === "es" ? "Población" : "Population"}</strong><small>{population}</small></span></div>
          <div><b>♧</b><span><strong>{language === "es" ? "Uso en" : "Use in"}</strong><small>{careSetting}</small></span></div>
          <div><b>▥</b><span><strong>{language === "es" ? "Resultado principal" : "Primary result"}</strong><small>{language === "es" ? "Puntuación PRAM de 0–12" : "PRAM score from 0–12"}</small></span></div>
          <div className="is-caution"><b>▲</b><span><strong>{language === "es" ? "Precaución importante" : "Important caution"}</strong><small>{language === "es" ? "No reemplaza el juicio clínico." : "Does not replace clinical judgment."}</small></span></div>
        </section>
      </div>

      <section className="pram-supporting-inputs">
        {ageInput ? (
          <label>
            <span>{ageInput.label[language]}</span>
            <div className="pram-number-field">
              <input
                type="number"
                min={ageInput.min}
                max={ageInput.max}
                step={ageInput.step}
                value={typeof values[ageInput.id] === "number" ? values[ageInput.id] as number : ""}
                onChange={(event) => update(ageInput.id, event.target.value === "" ? null : Number(event.target.value))}
              />
              <small>{ageInput.unit ?? (language === "es" ? "años" : "years")}</small>
            </div>
          </label>
        ) : null}

        {oxygenConditionInput?.options ? (
          <label>
            <span>{oxygenConditionInput.label[language]}</span>
            <select
              value={typeof values[oxygenConditionInput.id] === "string" ? values[oxygenConditionInput.id] as string : ""}
              onChange={(event) => update(oxygenConditionInput.id, event.target.value || null)}
            >
              <option value="">{language === "es" ? "Seleccionar" : "Select"}</option>
              {oxygenConditionInput.options.map((option) => (
                <option key={option.id} value={String(optionValue(option))}>{option.label[language]}</option>
              ))}
            </select>
          </label>
        ) : null}

        {oxygenInput ? (
          <label>
            <span>{oxygenInput.label[language]}</span>
            <div className="pram-number-field">
              <input
                type="number"
                min={oxygenInput.min}
                max={oxygenInput.max}
                step={oxygenInput.step}
                value={typeof values[oxygenInput.id] === "number" ? values[oxygenInput.id] as number : ""}
                onChange={(event) => update(oxygenInput.id, event.target.value === "" ? null : Number(event.target.value))}
              />
              <small>%</small>
            </div>
          </label>
        ) : null}
      </section>

      <div className="pram-workspace">
        <section className="pram-calculator-card" id="calculator">
          <header>
            <div><span className="pram-section-icon">✎</span><h2>{language === "es" ? "Calculadora PRAM" : "PRAM calculator"}</h2></div>
            <button type="button" onClick={reset}>↻ {language === "es" ? "Limpiar todo" : "Reset all"}</button>
          </header>

          <div className="pram-score-matrix">
            {clinicalInputs.map((input) => (
              <div className="pram-score-row" key={input.id}>
                <div className="pram-score-label">
                  <span className="pram-domain-icon">{iconForInput(input.id)}</span>
                  <span><strong>{input.label[language]}</strong>{input.description ? <small>{input.description[language]}</small> : null}</span>
                </div>
                <div className="pram-options-grid">
                  {input.options?.map((option) => (
                    <button
                      key={option.id}
                      className={isSelected(values[input.id], option) ? "is-selected" : ""}
                      type="button"
                      onClick={() => update(input.id, optionValue(option))}
                    >
                      {typeof option.score === "number" ? <b>{option.score}</b> : null}
                      <span>{option.label[language]}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pram-result-card" ref={resultRef} aria-live="polite" id="result">
          <header><h2>♙ {language === "es" ? "Resultado PRAM" : "PRAM result"}</h2><span>{language === "es" ? "Puntaje total (0–12)" : "Total score (0–12)"}</span></header>
          {result && primaryValue !== undefined ? (
            <>
              <div className="pram-result-score">{primaryValue}</div>
              <h3>{result.interpretation?.label?.[language] ?? (language === "es" ? "Resultado calculado" : "Calculated result")}</h3>
              <p className="pram-result-copy">{result.interpretation?.description?.[language] ?? tool.calculationNotes?.[language] ?? tool.description[language]}</p>
              {result.warnings.length > 0 ? (
                <div className="pram-result-warning">{result.warnings.map((warning) => <p key={warning.id}>{warning.message[language]}</p>)}</div>
              ) : null}
              <details className="pram-trace" open>
                <summary>{language === "es" ? "Cómo se calculó este resultado" : "How this result was calculated"}</summary>
                <dl>
                  {result.trace.filter((item) => item.score !== undefined).map((item) => {
                    const input = tool.inputs?.find((candidate) => candidate.id === item.inputId);
                    return <div key={item.inputId}><dt>{input?.label[language] ?? item.inputId}</dt><dd>{item.score} {language === "es" ? "puntos" : "points"}</dd></div>;
                  })}
                  <div className="pram-trace-total"><dt>{language === "es" ? "Puntaje total" : "Total score"}</dt><dd>{primaryValue}</dd></div>
                </dl>
              </details>
            </>
          ) : (
            <div className="pram-result-empty">
              <span>✦</span>
              <h3>{language === "es" ? "Completa la evaluación" : "Complete the assessment"}</h3>
              <p>{language === "es" ? "El resultado aparecerá aquí en cuanto estén completos todos los datos necesarios." : "The result will appear here as soon as all required data are complete."}</p>
              <small>{language === "es" ? `Datos completados: ${Object.values(values).filter((value) => value !== null && value !== undefined && value !== "").length}` : `Completed fields: ${Object.values(values).filter((value) => value !== null && value !== undefined && value !== "").length}`}</small>
            </div>
          )}
        </section>
      </div>

      {tool.interpretationBands?.length ? (
        <section className="pram-interpretation" id="interpretation">
          <header><span>▥</span><h2>{language === "es" ? "Interpretación clínica" : "Clinical interpretation"}</h2></header>
          <div className="pram-band-grid">
            {tool.interpretationBands.map((band) => {
              const isCurrent = result?.interpretation?.id === band.id;
              return (
                <article className={isCurrent ? "is-current" : ""} key={band.id}>
                  <b>{band.min ?? ""}{band.min !== undefined && band.max !== undefined ? "–" : ""}{band.max ?? ""}</b>
                  <div><strong>{band.label[language]}</strong>{band.description ? <p>{band.description[language]}</p> : null}</div>
                </article>
              );
            })}
            <aside><strong>ⓘ {language === "es" ? "Nota" : "Note"}</strong><p>{language === "es" ? "La interpretación debe realizarse en el contexto clínico global del paciente y de su evolución." : "Interpretation should be made in the context of the patient's overall clinical picture and evolution."}</p></aside>
          </div>
        </section>
      ) : null}

      <section className="pram-disclosures">
        <details><summary>▤ <span><strong>{language === "es" ? "Contexto clínico" : "Clinical context"}</strong><small>{language === "es" ? "Cuándo usar, utilidad y consideraciones" : "When to use, utility and considerations"}</small></span><b>⌄</b></summary><div><p>{tool.population[language]}</p><p>{tool.validationNotes[language]}</p></div></details>
        <details><summary>▥ <span><strong>{language === "es" ? "Evidencia" : "Evidence"}</strong><small>{language === "es" ? "Validez y desempeño" : "Validity and performance"}</small></span><b>⌄</b></summary><div><p>{language === "es" ? `Nivel registrado: ${evidenceLabels[tool.evidenceLevel][language]}.` : `Recorded level: ${evidenceLabels[tool.evidenceLevel][language]}.`}</p></div></details>
        <details><summary>▣ <span><strong>{language === "es" ? "Referencias" : "References"}</strong><small>{language === "es" ? "Artículos clave y guías" : "Key articles and guidance"}</small></span><b>⌄</b></summary><div>{tool.references.map((reference) => <p key={reference.id}><strong>{reference.year ?? ""}</strong> {reference.title}</p>)}</div></details>
        <details><summary>↻ <span><strong>{language === "es" ? "Revisión y mantenimiento" : "Review and maintenance"}</strong><small>{language === "es" ? "Trazabilidad del proyecto" : "Project traceability"}</small></span><b>⌄</b></summary><div><p>{language === "es" ? "La implementación y sus fuentes se mantienen de forma auditable en el repositorio PedsCore." : "Implementation and sources are maintained audibly in the PedsCore repository."}</p></div></details>
      </section>

      {relatedTools.length > 0 ? (
        <section className="pram-related" id="related">
          <div className="pram-related-heading">
            <h2>⌁ {language === "es" ? "Herramientas relacionadas" : "Related tools"}</h2>
            <p>{language === "es" ? "Otras herramientas pediátricas que pueden ser de interés." : "Other pediatric tools that may be relevant."}</p>
          </div>
          <div className="pram-related-grid">
            {relatedTools.slice(0, 4).map((related) => (
              <a key={related.id} href={makePath(language, "tools", related.slug)} onClick={(event) => { event.preventDefault(); navigate(makePath(language, "tools", related.slug)); }}>
                <span className="pram-related-icon">{related.category === "respiratory" ? "◒" : "▦"}</span>
                <span><strong>{related.shortName || related.name[language]}</strong><small>{related.description[language]}</small></span>
                <b>→</b>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}