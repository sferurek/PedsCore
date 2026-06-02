import type { ImplementationStatus } from "@peds-core/core";
import type { Language } from "./language";

export const evidenceStatusTitles: Record<Language, string> = {
  es: "Estado de validacion",
  en: "Validation status"
};

export const evidenceStatusDescriptions: Record<
  ImplementationStatus,
  Record<Language, string>
> = {
  implemented: {
    es: "Calculo activo con tests y trazabilidad basica.",
    en: "Active calculation with tests and basic traceability."
  },
  ready_for_implementation: {
    es: "La herramienta tiene estructura suficiente para implementacion, pero aun requiere activacion tecnica y revision final.",
    en: "The tool has enough structure for implementation, but still requires technical activation and final review."
  },
  pending_validation: {
    es: "Pendiente de validacion. Puede faltar tabla completa, variante exacta, puntos de corte o fuente primaria.",
    en: "Pending validation. Complete table, exact variant, cut-offs, or primary source may still be missing."
  },
  needs_primary_reference: {
    es: "Necesita fuente primaria antes de activar calculo.",
    en: "A primary source is required before calculation is activated."
  },
  coming_soon: {
    es: "Planificada para fases posteriores.",
    en: "Planned for later phases."
  },
  not_implemented_due_to_licensing: {
    es: "No implementada por posible restriccion de licencia o copyright.",
    en: "Not implemented because of possible licensing or copyright restrictions."
  }
};

const pendingValidationActions: Record<Language, string[]> = {
  es: [
    "Aportar fuente primaria.",
    "Confirmar variante exacta.",
    "Aportar tabla completa de puntuacion.",
    "Aportar puntos de corte publicados.",
    "Revisar posibles restricciones de licencia."
  ],
  en: [
    "Provide the primary source.",
    "Confirm the exact variant.",
    "Provide the complete scoring table.",
    "Provide published cut-offs.",
    "Review potential licensing restrictions."
  ]
};

const primaryReferenceActions: Record<Language, string[]> = {
  es: [
    "Aportar DOI, PMID o enlace estable a la fuente original.",
    "Aportar cita completa.",
    "Confirmar que la tabla es implementable."
  ],
  en: [
    "Provide DOI, PMID, or a stable link to the original source.",
    "Provide the complete citation.",
    "Confirm that the table is implementable."
  ]
};

const licensingActions: Record<Language, string[]> = {
  es: [
    "Confirmar licencia de uso.",
    "Evitar copiar tablas protegidas.",
    "Proponer alternativa abierta si existe."
  ],
  en: [
    "Confirm the usage license.",
    "Avoid copying protected tables.",
    "Suggest an open alternative if one exists."
  ]
};

const futureActions: Record<Language, string[]> = {
  es: [
    "Aportar bibliografia primaria.",
    "Proponer alcance seguro para una fase futura.",
    "Identificar riesgos de licencia o complejidad clinica."
  ],
  en: [
    "Provide primary bibliography.",
    "Suggest safe scope for a future phase.",
    "Identify licensing risks or clinical complexity."
  ]
};

export const getUnlockActions = (
  status: ImplementationStatus,
  language: Language
): string[] => {
  if (status === "pending_validation" || status === "ready_for_implementation") {
    return pendingValidationActions[language];
  }

  if (status === "needs_primary_reference") {
    return primaryReferenceActions[language];
  }

  if (status === "not_implemented_due_to_licensing") {
    return licensingActions[language];
  }

  if (status === "coming_soon") {
    return futureActions[language];
  }

  return [];
};

export const isCalculationActive = (status: ImplementationStatus): boolean =>
  status === "implemented";

export const hasEvidenceBlock = (status: ImplementationStatus): boolean =>
  status !== "implemented";
