import type { Scenario } from "../engine/types";
import { actions } from "../actions/definitions";
import { advancePhysiology } from "../physiology/continuous";
export const s1: Scenario = {
  metadata: {
    id: "S1",
    title: "Los primeros minutos",
    context:
      "Parto vaginal · líquido claro · sin malformaciones conocidas ni sospecha inicial de hipovolemia.",
    gestation: "39+2 semanas",
  },
  initialState: {
    hr: 82,
    spo2: 58,
    breathing: false,
    tone: "disminuido",
    effectiveSeconds: 0,
    chest: false,
  },
  actionDefinitions: actions,
  physiology: {
    advance: advancePhysiology,
    sourceType: "SIMULATION_ASSUMPTION",
  },
  observationRules: {
    ecgDelaySec: 4,
    spo2DelaySec: 8,
    sourceType: "SIMULATION_ASSUMPTION",
  },
  endpoints: {
    maxDurationSec: 300,
    stabilitySec: 5,
    sourceType: "SIMULATION_ASSUMPTION",
    reached: (s) =>
      s.milestones.includes("effective") &&
      s.internal.hr > 100 &&
      s.internal.breathing &&
      s.reassessedAt !== null &&
      s.withdrawnAt !== null &&
      s.withdrawnAt >= s.reassessedAt &&
      !s.support.ppv &&
      !s.support.compressed &&
      s.support.fio2 === 0.21,
  },
  preflight: { durationSec: 120, faultCount: 2 },
  debriefRules: [
    {
      id: "initial",
      title: "Decisiones iniciales y cordón",
      actions: ["initial", "clamp", "assess"],
      recommendation:
        "Planificar el cordón antes del parto. En RN hipotónicos sin esfuerzo respiratorio, estimular durante 30 s antes del pinzamiento.",
      why: "Relaciona el manejo del cordón con la respuesta del RN y el contexto del equipo.",
      sourceId: "seneo",
    },
    {
      id: "sequence",
      title: "Secuencia y tiempos",
      actions: ["hr", "ppv", "chest", "correct"],
      recommendation:
        "Ante apnea o FC <100, iniciar ventilación y comprobar su eficacia antes de escalar.",
      why: "Reconstruye qué información tenías al decidir. Los tiempos de clic son supuestos operativos.",
      sourceId: "seneo",
    },
    {
      id: "ventilation",
      title: "Ventilación",
      actions: ["ppv", "chest", "correct", "replaceMask", "repairCircuit"],
      recommendation:
        "Comprobar expansión torácica y respuesta de FC; corregir ventilación si es ineficaz.",
      why: "En S1, la fuga inicial siempre requiere corrección; un circuito o mascarilla defectuosos necesitan además resolución.",
      sourceId: "seneo",
    },
    {
      id: "monitoring",
      title: "Monitorización",
      actions: ["hr", "ecg", "spo2", "assess"],
      recommendation:
        "Monitorizar la FC y utilizar oximetría preductal para ajustar oxígeno.",
      why: "Las observaciones manuales conservan su fecha; solo los monitores adquiridos actualizan valores continuamente.",
      sourceId: "seneo",
    },
    {
      id: "oxygen",
      title: "Oxígeno",
      actions: ["oxygenUp", "oxygenDown"],
      recommendation:
        "En RN ≥35 semanas iniciar con FiO₂ 0,21 y ajustar según oximetría preductal.",
      why: "En este modelo, subir oxígeno no corrige una ventilación ineficaz.",
      sourceId: "seneo",
    },
    {
      id: "unnecessary",
      title: "Escalada e intervenciones",
      actions: ["compress", "stopCompress", "suction", "intubate", "laryngeal"],
      recommendation:
        "Priorizar ventilación eficaz antes de compresiones. Considerar vía aérea alternativa cuando la ventilación con mascarilla no sea eficaz.",
      why: "S1 permite explorar escaladas, pero no modela reanimación avanzada, fármacos ni eficacia de las compresiones.",
      sourceId: "seneo",
    },
    {
      id: "recovery",
      title: "Recuperación y cierre",
      actions: ["assess", "hr", "stopPpv"],
      recommendation:
        "S1 exige reevaluar FC, respiración y tono tras recuperarse, retirar VPPI, volver a aire ambiente y mantener 5 s de estabilidad sin compresiones.",
      why: "Este endpoint es una decisión docente, no un criterio clínico de alta ni una recomendación SENeo.",
      sourceId: "model",
    },
  ],
  sourceMetadata: ["seneo", "evidence", "model"],
};
