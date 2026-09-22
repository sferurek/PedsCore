import type { SourceType } from "../engine/types";
export interface Source {
  id: string;
  type: SourceType;
  title: string;
  locator: string;
  url?: string;
  note: string;
}
const url = "https://doi.org/10.1016/j.anpedi.2026.504143";
export const sources: Record<string, Source> = {
  seneo: {
    id: "seneo",
    type: "SENEO_RECOMMENDATION",
    title: "GRN-SENeo · Guía española 2026",
    locator: "Figura 1; briefing; manejo del cordón; oxígeno",
    url,
    note: "Referencia consultada el 21/09/2026. Implementación pendiente de revisión por especialista.",
  },
  evidence: {
    id: "evidence",
    type: "EVIDENCE_CONTEXT",
    title: "Contexto de evidencia · GRN-SENeo 2026",
    locator: "Briefing: ¿qué dice la evidencia?",
    url,
    note: "La evidencia sobre desenlaces neonatales del briefing es limitada.",
  },
  model: {
    id: "model",
    type: "SIMULATION_ASSUMPTION",
    title: "Modelo docente S1 · v0.7",
    locator: "src/physiology/continuous.ts; src/scenarios/s1.ts",
    note: "Curvas, latencias, duración de acciones y endpoint diseñados para entrenamiento. Fisiología no validada.",
  },
};
