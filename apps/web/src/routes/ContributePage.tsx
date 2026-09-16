import { translations } from "../i18n/translations";
import type { Language } from "../utils/language";

interface ContributePageProps {
  language: Language;
}

export function ContributePage({ language }: ContributePageProps) {
  const t = translations[language];

  return (
    <section className="info-page">
      <h1>{t.pages.contributeTitle}</h1>
      <p>{t.pages.contributeBody}</p>
      <div className="content-panel subtle-panel">
        <h2>{language === "es" ? "Aportaciones clínicas" : "Clinical contributions"}</h2>
        <p>
          {language === "es"
            ? "Cuando una propuesta modifica lógica clínica, incluye la fuente primaria o la mejor fuente disponible, la versión exacta de la herramienta, la población, las fórmulas o tablas necesarias y cualquier restricción de licencia. Evita siempre datos reales de pacientes."
            : "When a proposal changes clinical logic, include the primary or best available source, exact tool version, population, required formulas or tables and any licensing restrictions. Never include real patient data."}
        </p>
      </div>
      <div className="content-panel subtle-panel">
        <h2>{language === "es" ? "Qué ocurre después de una propuesta" : "What happens after a proposal"}</h2>
        <p>
          {language === "es"
            ? "Las propuestas se contrastan con el catálogo y la evidencia existente. Si cambian un cálculo, se revisan fórmula o tabla, límites, unidades y casos de prueba. Si cambian contenido, se comprueba que el lenguaje mantenga separadas las fuentes documentadas, las limitaciones y las decisiones editoriales."
            : "Proposals are checked against the catalog and existing evidence. If they change a calculation, formula or table, boundaries, units and test cases are reviewed. If they change content, wording is checked so documented sources, limitations and editorial decisions remain distinct."}
        </p>
      </div>
      <div className="content-panel subtle-panel">
        <h2>{language === "es" ? "Privacidad y ejemplos" : "Privacy and examples"}</h2>
        <p>
          {language === "es"
            ? "No envíes nombres, fechas de nacimiento, historias clínicas, imágenes identificables ni otros datos reales de pacientes. Los ejemplos deben ser ficticios o estar completamente anonimizados."
            : "Do not submit names, dates of birth, medical records, identifiable images or other real patient data. Examples should be fictional or fully anonymized."}
        </p>
      </div>
      <div className="content-panel subtle-panel">
        <h2>{language === "es" ? "También puedes ayudar sin escribir código" : "You can also help without writing code"}</h2>
        <p>
          {language === "es"
            ? "También son útiles los avisos sobre enlaces rotos, traducciones ambiguas, accesibilidad, diferencias entre versiones de una escala, fuentes ausentes o textos que puedan inducir a interpretar demasiado un resultado."
            : "Reports about broken links, ambiguous translations, accessibility, score-version differences, missing sources or wording that could encourage over-interpretation are also useful."}
        </p>
      </div>
      <div className="link-row">
        <a
          className="primary-link"
          href="https://github.com/sferurek/PedsCore/issues/new/choose"
          rel="noreferrer"
          target="_blank"
        >
          {t.tool.feedbackLink}
        </a>
        <a
          className="primary-link"
          href="https://github.com/sferurek/PedsCore/blob/main/CONTRIBUTING.md"
          rel="noreferrer"
          target="_blank"
        >
          CONTRIBUTING.md
        </a>
      </div>
    </section>
  );
}

