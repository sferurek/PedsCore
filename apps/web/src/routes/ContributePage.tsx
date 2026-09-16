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

