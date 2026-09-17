import { getToolDiscovery } from "@peds-core/core";
import type {
  ClinicalToolMetadata,
  DiscoveryCalculationAvailability,
  ToolInput
} from "@peds-core/core";
import type { Language } from "../utils/language";
import { discoveryLabel } from "../utils/discoveryLabels";

interface ToolClinicalGuideProps {
  language: Language;
  tool: ClinicalToolMetadata;
}

const availabilityLabel = (
  value: DiscoveryCalculationAvailability,
  language: Language
) => {
  const labels: Record<string, { es: string; en: string }> = {
    local_active: {
      es: "Cálculo disponible en PedsCore",
      en: "Calculation available in PedsCore"
    },
    local_planned: {
      es: "Referencia activa; cálculo local previsto",
      en: "Active reference; local calculation planned"
    },
    external_official: {
      es: "Referencia en PedsCore; uso operativo mediante fuente oficial",
      en: "Reference in PedsCore; operational use via official source"
    },
    not_applicable: {
      es: "No requiere cálculo local",
      en: "No local calculation required"
    },
    blocked_by_rights: {
      es: "Referencia disponible; reproducción limitada por condiciones de uso",
      en: "Reference available; reproduction limited by reuse conditions"
    },
    blocked_by_evidence: {
      es: "Referencia disponible; implementación operativa en revisión",
      en: "Reference available; operational implementation under review"
    }
  };

  return labels[String(value)]?.[language] ?? String(value);
};

const inputSummary = (inputs: ToolInput[] | undefined, language: Language): string => {
  if (!inputs?.length) {
    return language === "es"
      ? "La ficha no requiere un formulario local o las entradas operativas se consultan en una fuente externa."
      : "This page does not require a local form, or operational inputs are handled by an external source.";
  }

  const labels = inputs.slice(0, 6).map((input) => input.label[language] || input.label.en);
  const remaining = inputs.length - labels.length;
  return remaining > 0
    ? `${labels.join(" · ")} · +${remaining}`
    : labels.join(" · ");
};

export function ToolClinicalGuide({
  language,
  tool
}: ToolClinicalGuideProps) {
  const discovery = getToolDiscovery(tool.id);

  if (!discovery) {
    return (
      <section className="content-panel tool-clinical-guide" id="clinical-context">
        <div className="clinical-guide-heading">
          <p className="eyebrow">{language === "es" ? "FICHA CLÍNICA" : "CLINICAL PAGE"}</p>
          <h2>{language === "es" ? "Resumen clínico" : "Clinical summary"}</h2>
        </div>
        <p>{tool.description[language]}</p>
      </section>
    );
  }

  const settings = discovery.careSettings.map((item) =>
    discoveryLabel(item, language)
  );
  const functions = discovery.clinicalFunctions.map((item) =>
    discoveryLabel(item, language)
  );
  const problems = discovery.clinicalProblems.map((item) =>
    discoveryLabel(item, language)
  );
  const exclusions = discovery.exclusions.map((item) => item.reason[language]);
  const interpretationCount = tool.interpretationBands?.length ?? 0;

  return (
    <section className="content-panel tool-clinical-guide clinical-guide-v2" id="clinical-context">
      <div className="clinical-guide-heading">
        <p className="eyebrow">{language === "es" ? "FICHA CLÍNICA V2" : "CLINICAL PAGE V2"}</p>
        <h2>{language === "es" ? "Uso rápido y límites" : "Quick use and limits"}</h2>
        <p>
          {language === "es"
            ? "Qué hace la herramienta, cuándo encaja, qué necesita y qué no debe asumirse a partir del resultado."
            : "What the tool does, when it fits, what it needs and what should not be assumed from the result."}
        </p>
      </div>

      <div className="clinical-guide-grid clinical-guide-grid-v2">
        <article>
          <span className="clinical-guide-index">01</span>
          <h3>{language === "es" ? "Cuándo usarla" : "When to use"}</h3>
          <p>{tool.population[language]}</p>
          <div className="clinical-guide-tags">
            {[...problems, ...functions, ...settings].slice(0, 7).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article>
          <span className="clinical-guide-index">02</span>
          <h3>{language === "es" ? "Cuándo no asumir que aplica" : "When not to assume it applies"}</h3>
          {exclusions.length > 0 ? (
            <ul className="clinical-guide-exclusions">
              {exclusions.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          ) : (
            <p>
              {language === "es"
                ? "No hay exclusiones adicionales estructuradas en el catálogo. Confirma población, variante exacta y contexto de la fuente antes de extrapolarla."
                : "No additional structured exclusions are recorded in the catalog. Confirm population, exact variant and source context before extrapolating it."}
            </p>
          )}
        </article>

        <article>
          <span className="clinical-guide-index">03</span>
          <h3>{language === "es" ? "Qué necesitas" : "What you need"}</h3>
          <p>{inputSummary(tool.inputs, language)}</p>
          <p className="clinical-guide-note">
            {language === "es"
              ? "Introduce únicamente los datos necesarios para esta herramienta; PedsCore no almacena los valores clínicos del formulario."
              : "Enter only the data required for this tool; PedsCore does not store clinical form values."}
          </p>
        </article>

        <article>
          <span className="clinical-guide-index">04</span>
          <h3>{language === "es" ? "Qué devuelve" : "What it returns"}</h3>
          <p>{availabilityLabel(discovery.calculationAvailability, language)}</p>
          <p>
            {language === "es"
              ? tool.type === "clinical_rule"
                ? "La salida organiza criterios de la regla y su interpretación documentada; no sustituye una decisión clínica individual."
                : "La salida muestra el valor o puntuación calculada y, cuando existe una interpretación validada en la fuente, su lectura clínica."
              : tool.type === "clinical_rule"
                ? "The output organizes rule criteria and documented interpretation; it does not replace an individual clinical decision."
                : "The output shows the calculated value or score and, when the source supports a validated interpretation, its clinical reading."}
          </p>
        </article>

        <article>
          <span className="clinical-guide-index">05</span>
          <h3>{language === "es" ? "Cómo interpretar" : "How to interpret"}</h3>
          <p>
            {interpretationCount > 0
              ? (language === "es"
                ? `La ficha incluye ${interpretationCount} banda${interpretationCount === 1 ? "" : "s"} de interpretación trazada${interpretationCount === 1 ? "" : "s"} a la documentación del proyecto.`
                : `This page includes ${interpretationCount} documented interpretation band${interpretationCount === 1 ? "" : "s"}.`)
              : (language === "es"
                ? "No se añade una categorización automática si la fuente o la variante no permiten sostenerla con suficiente fidelidad."
                : "No automatic categorization is added when the source or exact variant does not support it with sufficient fidelity.")}
          </p>
          <p>{tool.calculationNotes?.[language] ?? tool.description[language]}</p>
        </article>

        <article>
          <span className="clinical-guide-index">06</span>
          <h3>{language === "es" ? "Limitaciones importantes" : "Important limitations"}</h3>
          <p>{tool.validationNotes[language]}</p>
          <p className="clinical-guide-note">
            {language === "es"
              ? "La presencia de una herramienta en PedsCore no equivale a recomendación de uso ni a una indicación terapéutica."
              : "A tool appearing in PedsCore does not, by itself, constitute a recommendation to use it or a treatment indication."}
          </p>
        </article>
      </div>
    </section>
  );
}
