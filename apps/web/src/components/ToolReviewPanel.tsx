import { getToolDiscovery } from "@peds-core/core";
import type { ClinicalToolMetadata } from "@peds-core/core";
import type { Language } from "../utils/language";
import { getTechnicalClinicalAudit } from "../utils/clinicalAudit";

interface ToolReviewPanelProps {
  language: Language;
  tool: ClinicalToolMetadata;
}

const latestReferenceYear = (tool: ClinicalToolMetadata): number | null => {
  const years = tool.references
    .map((reference) => reference.year)
    .filter((value): value is number => typeof value === "number");
  return years.length ? Math.max(...years) : null;
};

export function ToolReviewPanel({ language, tool }: ToolReviewPanelProps) {
  const latestYear = latestReferenceYear(tool);
  const implementationReviewed = tool.implementationStatus === "implemented";
  const discovery = getToolDiscovery(tool.id);
  const hasPrimarySource = tool.references.some((reference) =>
    ["original_derivation_study", "clinical_practice_guideline"].includes(reference.evidenceLevel)
  );
  const hasExternalValidation = tool.references.some(
    (reference) => reference.evidenceLevel === "external_validation_study"
  );
  const reuseClosed = discovery
    ? ["open", "public_domain", "attribution_required", "external_only"].includes(discovery.reuseStatus)
    : false;
  const calculationActive = discovery?.calculationAvailability === "local_active";
  const technicalAudit = getTechnicalClinicalAudit(tool.id);

  return (
    <section className="content-panel tool-review-panel" id="clinical-review">
      <div className="tool-section-heading">
        <p className="eyebrow">{language === "es" ? "REVISIÓN CLÍNICA" : "CLINICAL REVIEW"}</p>
        <h2>{language === "es" ? "Quién y qué se ha revisado" : "Who and what has been reviewed"}</h2>
      </div>

      <dl className="review-profile-grid">
        <div>
          <dt>{language === "es" ? "Responsable editorial" : "Editorial maintainer"}</dt>
          <dd>PedsCore maintainers</dd>
        </div>
        <div>
          <dt>{language === "es" ? "Revisión de implementación" : "Implementation review"}</dt>
          <dd>
            {implementationReviewed
              ? (language === "es" ? "Documentada en el repositorio" : "Documented in the repository")
              : (language === "es" ? "Aún no cerrada" : "Not yet closed")}
          </dd>
        </div>
        <div>
          <dt>{language === "es" ? "Auditoría clínica-técnica" : "Clinical technical audit"}</dt>
          <dd>
            {technicalAudit ? (
              <a
                href={`https://github.com/sferurek/PedsCore/blob/${technicalAudit.verificationSha}/${technicalAudit.reportPath}`}
                rel="noreferrer"
                target="_blank"
              >
                {language === "es" ? "Completada · hallazgos corregidos y verificados" : "Completed · findings remediated and verified"}
              </a>
            ) : (
              language === "es" ? "Sin registro Tier A específico" : "No specific Tier A record"
            )}
          </dd>
        </div>
        <div>
          <dt>{language === "es" ? "Revisor clínico nominal" : "Named clinical reviewer"}</dt>
          <dd>{language === "es" ? "No documentado todavía" : "Not yet documented"}</dd>
        </div>
        <div>
          <dt>{language === "es" ? "Revisión independiente" : "Independent review"}</dt>
          <dd>{language === "es" ? "No afirmada sin documentación" : "Not claimed without documentation"}</dd>
        </div>
        <div>
          <dt>{language === "es" ? "Fuente citada más reciente" : "Latest cited source"}</dt>
          <dd>{latestYear ?? (language === "es" ? "Sin año registrado" : "No year recorded")}</dd>
        </div>
        <div>
          <dt>{language === "es" ? "Trazabilidad" : "Traceability"}</dt>
          <dd>
            <a
              href="https://github.com/sferurek/PedsCore"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </dd>
        </div>
      </dl>

      <div className="quality-profile">
        <h3>{language === "es" ? "Perfil de calidad de la ficha" : "Tool quality profile"}</h3>
        <p>
          {language === "es"
            ? "Indicadores descriptivos; no se combinan en una nota ni implican superioridad frente a otras herramientas."
            : "Descriptive indicators only; they are not combined into a score and do not imply superiority over other tools."}
        </p>
        <ul>
          <li><span>{hasPrimarySource ? "✓" : "—"}</span>{language === "es" ? "Fuente primaria/guía identificada" : "Primary source/guideline identified"}</li>
          <li><span>{hasExternalValidation ? "✓" : "—"}</span>{language === "es" ? "Validación externa citada" : "External validation cited"}</li>
          <li><span>{reuseClosed ? "✓" : "—"}</span>{language === "es" ? "Ruta de reutilización definida" : "Reuse pathway defined"}</li>
          <li><span>{technicalAudit ? "✓" : "—"}</span>{language === "es" ? "Auditoría clínica-técnica Tier A documentada" : "Documented Tier A clinical technical audit"}</li>
          <li><span>{implementationReviewed ? "✓" : "—"}</span>{language === "es" ? "Implementación marcada como completada" : "Implementation marked complete"}</li>
          <li><span>{calculationActive ? "✓" : "—"}</span>{language === "es" ? "Cálculo local activo" : "Local calculation active"}</li>
          <li><span>{tool.references.length > 0 ? "✓" : "—"}</span>{language === "es" ? "Referencias visibles" : "Visible references"}</li>
        </ul>
      </div>

      <p className="review-profile-note">
        {language === "es"
          ? technicalAudit
            ? `La auditoría clínica-técnica Tier A fue realizada el ${technicalAudit.auditDate} y sus correcciones quedaron verificadas en el commit ${technicalAudit.verificationSha.slice(0, 8)}. Esto no equivale a revisión clínica externa independiente, que se registra por separado.`
            : "PedsCore separa la revisión documental y técnica de una revisión clínica independiente. No se atribuye una revisión nominal hasta que exista un registro público que la respalde."
          : technicalAudit
            ? `The Tier A clinical technical audit was performed on ${technicalAudit.auditDate}, with remediation verified at commit ${technicalAudit.verificationSha.slice(0, 8)}. This is not equivalent to independent external clinical review, which is recorded separately.`
            : "PedsCore separates documentary/technical review from independent clinical review. A named reviewer is not attributed until a public record supports that claim."}
      </p>
    </section>
  );
}
