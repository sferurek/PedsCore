import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface AboutPageProps {
  language: Language;
}

export function AboutPage({ language }: AboutPageProps) {
  const t = translations[language];

  return (
    <section className="info-page">
      <h1>{t.pages.aboutTitle}</h1>
      <p>{t.pages.aboutBody}</p>
      <div className="info-grid">
        <article>
          <h2>{t.pages.coreTitle}</h2>
          <p>{t.pages.coreBody}</p>
        </article>
        <article>
          <h2>{t.pages.webTitle}</h2>
          <p>{t.pages.webBody}</p>
        </article>
      </div>
      <section className="content-panel subtle-panel">
        <h2>{language === "es" ? "Gobernanza y trazabilidad" : "Governance and traceability"}</h2>
        <p>
          {language === "es"
            ? "El código, las referencias, las decisiones de implementación y el historial de cambios de PedsCore son públicos. Las aportaciones clínicas deben identificar la fuente, la variante exacta, la fórmula o tabla aplicable, las condiciones de reutilización y un lenguaje de salida seguro."
            : "PedsCore code, references, implementation decisions and change history are public. Clinical contributions must identify the source, exact variant, applicable formula or table, reuse conditions and safe output wording."}
        </p>
      </section>
      <section className="content-panel subtle-panel">
        <h2>{language === "es" ? "Seguridad clínica" : "Clinical safety"}</h2>
        <p>
          {language === "es"
            ? "Una herramienta no se activa como calculadora hasta que su lógica, fuentes y condiciones de uso están suficientemente definidas y probadas. Las fichas pueden permanecer visibles como referencia aunque el cálculo local siga bloqueado o pendiente."
            : "A tool is not activated as a calculator until its logic, sources and conditions of use are sufficiently defined and tested. Pages may remain visible as references while local calculation stays blocked or pending."}
        </p>
      </section>
      <section className="content-panel subtle-panel">
        <h2>{language === "es" ? "Citar y enlazar PedsCore" : "Cite and link PedsCore"}</h2>
        <p>
          {language === "es"
            ? "El repositorio incluye metadatos de citación y documentación editorial para facilitar referencias académicas, docentes y técnicas al proyecto."
            : "The repository includes citation metadata and editorial documentation to support academic, educational and technical references to the project."}
        </p>
        <div className="link-row">
          <a className="primary-link" href="https://github.com/sferurek/PedsCore" rel="noreferrer" target="_blank">GitHub</a>
          <a className="primary-link" href="https://github.com/sferurek/PedsCore/blob/main/CITATION.cff" rel="noreferrer" target="_blank">CITATION.cff</a>
        </div>
      </section>
    </section>
  );
}
