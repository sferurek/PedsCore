import type {
  ActionDefinition,
  ActionId,
  Category,
  State,
} from "../engine/types";
import { equipmentReady, repair } from "../preflight/equipment";
const obs = <T>(s: State, value: T, method: string) => ({
  value,
  at: s.time,
  method,
});
function action(
  id: ActionId,
  label: string,
  category: Category,
  durationSec: number,
  apply: ActionDefinition["apply"],
  available: ActionDefinition["available"] = () => true,
  unavailable = "",
  options: Partial<Pick<ActionDefinition, "oneShot" | "ongoing">> = {},
): ActionDefinition {
  return {
    id,
    label,
    category,
    durationSec,
    apply,
    available,
    unavailable,
    repeatable: !options.oneShot,
    oneShot: false,
    ongoing: false,
    sourceType: "SIMULATION_ASSUMPTION",
    ...options,
  };
}
export const actions: ActionDefinition[] = [
  action(
    "initial",
    "Secar, posicionar y estimular",
    "Valoración",
    30,
    () => {},
  ),
  action("assess", "Valorar respiración y tono", "Valoración", 4, (s) => {
    s.observed.breathing = obs(s, s.internal.breathing, "Valoración clínica");
    s.observed.tone = obs(s, s.internal.tone, "Valoración clínica");
    if (
      s.recoveryAt !== null &&
      s.internal.breathing &&
      s.internal.hr > 100 &&
      s.observed.hr &&
      s.observed.hr.at >= s.recoveryAt
    )
      s.reassessedAt = s.time;
  }),
  action("hr", "Auscultar FC", "Valoración", 4, (s) => {
    s.observed.hr = obs(s, s.internal.hr, "Auscultación");
  }),
  action("chest", "Comprobar tórax", "Valoración", 3, (s) => {
    s.observed.chest = obs(s, s.internal.chest, "Inspección torácica");
  }),
  action(
    "ppv",
    "Iniciar VPPI",
    "Ventilación",
    3,
    (s) => {
      s.support.ppv = true;
    },
    (s) => !s.support.ppv,
    "VPPI ya iniciada",
    { ongoing: true },
  ),
  action(
    "correct",
    "Recolocar vía aérea y sellar",
    "Ventilación",
    6,
    (s) => {
      s.support.corrected = true;
    },
    (s) => s.support.ppv,
    "Requiere VPPI iniciada",
  ),
  action(
    "replaceMask",
    "Cambiar mascarilla",
    "Ventilación",
    5,
    (s) => {
      repair(s, "mask");
    },
    (s) => s.support.ppv && s.support.airway === "mask",
    "Requiere ventilación con mascarilla",
  ),
  action(
    "repairCircuit",
    "Revisar y conectar circuito",
    "Ventilación",
    4,
    (s) => {
      repair(s, "circuit");
    },
    (s) => s.support.ppv,
    "Requiere VPPI iniciada",
  ),
  action(
    "stopPpv",
    "Retirar VPPI",
    "Ventilación",
    2,
    (s) => {
      s.support.ppv = false;
      s.withdrawnAt = s.time;
    },
    (s) => s.support.ppv,
    "VPPI no iniciada",
  ),
  action(
    "suction",
    "Aspirar secreciones",
    "Ventilación",
    5,
    () => {},
    (s) => equipmentReady(s, "suction"),
    "Aspiración sin vacío",
  ),
  action(
    "intubate",
    "Colocar tubo endotraqueal",
    "Ventilación",
    20,
    (s) => {
      s.support.airway = "tube";
      s.support.corrected = true;
    },
    (s) =>
      equipmentReady(s, "laryngoscope") &&
      equipmentReady(s, "tube") &&
      s.support.airway !== "tube",
    "Material de intubación no disponible o tubo ya colocado",
  ),
  action(
    "laryngeal",
    "Colocar dispositivo supraglótico",
    "Ventilación",
    15,
    (s) => {
      s.support.airway = "laryngeal";
      s.support.corrected = true;
    },
    (s) => equipmentReady(s, "airway") && s.support.airway !== "laryngeal",
    "Material no disponible o dispositivo ya colocado",
  ),
  action(
    "ecg",
    "Conectar ECG",
    "Monitorización",
    5,
    (s) => {
      s.monitors.ecgAt = s.time;
    },
    (s) => equipmentReady(s, "ecg"),
    "ECG no disponible",
    { oneShot: true },
  ),
  action(
    "spo2",
    "Colocar sensor preductal",
    "Monitorización",
    5,
    (s) => {
      s.monitors.spo2At = s.time;
    },
    (s) => equipmentReady(s, "spo2"),
    "Sensor no disponible",
    { oneShot: true },
  ),
  action(
    "oxygenUp",
    "Aumentar FiO₂",
    "Oxígeno",
    2,
    (s) => {
      s.support.fio2 = Math.min(
        1,
        Math.round((s.support.fio2 + 0.1) * 100) / 100,
      );
    },
    (s) => s.support.fio2 < 1,
    "FiO₂ al máximo",
  ),
  action(
    "oxygenDown",
    "Reducir FiO₂",
    "Oxígeno",
    2,
    (s) => {
      s.support.fio2 = Math.max(
        0.21,
        Math.round((s.support.fio2 - 0.1) * 100) / 100,
      );
    },
    (s) => s.support.fio2 > 0.21,
    "FiO₂ al mínimo",
  ),
  action(
    "clamp",
    "Pinzar cordón",
    "Circulación",
    2,
    (s) => {
      s.support.cordClamped = true;
    },
    () => true,
    "",
    { oneShot: true },
  ),
  action(
    "compress",
    "Iniciar compresiones 3:1",
    "Circulación",
    3,
    (s) => {
      s.support.compressed = true;
    },
    (s) => !s.support.compressed,
    "Compresiones ya iniciadas",
    { ongoing: true },
  ),
  action(
    "stopCompress",
    "Detener compresiones",
    "Circulación",
    2,
    (s) => {
      s.support.compressed = false;
    },
    (s) => s.support.compressed,
    "Compresiones no iniciadas",
  ),
];
