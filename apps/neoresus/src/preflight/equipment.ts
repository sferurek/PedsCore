import type { EquipmentId, Preflight, State } from "../engine/types";
const catalog: [EquipmentId, string, string, string | null][] = [
  [
    "heat",
    "Fuente de calor",
    "Encendido y comprobación del calentador",
    "Fuente de calor no activada",
  ],
  [
    "ventilator",
    "Dispositivo de ventilación",
    "Comprobar funcionamiento y suministro de gas",
    null,
  ],
  [
    "circuit",
    "Circuito",
    "Conexiones y continuidad del circuito",
    "Circuito desconectado",
  ],
  [
    "mask",
    "Mascarillas",
    "Disponibilidad de tamaños adecuados al RN",
    "Mascarilla inadecuada",
  ],
  [
    "suction",
    "Aspiración",
    "Comprobar vacío y conexiones",
    "Aspiración sin vacío",
  ],
  [
    "spo2",
    "Pulsioximetría",
    "Sensor neonatal para colocación preductal",
    "Sensor ausente",
  ],
  ["ecg", "ECG", "Monitor, cables y electrodos", null],
  [
    "laryngoscope",
    "Laringoscopio",
    "Luz, batería y pala",
    "Laringoscopio sin batería",
  ],
  [
    "tube",
    "Tubos endotraqueales",
    "Tamaños apropiados al contexto",
    "Tamaño apropiado no disponible",
  ],
  [
    "airway",
    "Vía aérea alternativa",
    "Dispositivo supraglótico y material auxiliar",
    null,
  ],
  [
    "context",
    "Material según contexto",
    "Textiles y material para RN a término",
    null,
  ],
];
export function createPreflight(
  seed: number,
  limit = 120,
  faultCount = 2,
): Preflight {
  let n = seed >>> 0;
  const random = () => {
    n = (Math.imul(n, 1664525) + 1013904223) >>> 0;
    return n / 4294967296;
  };
  const candidates = catalog.filter((x) => x[3]).map((x) => x[0]);
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  const faults = new Set(candidates.slice(0, faultCount));
  return {
    seed,
    elapsed: 0,
    limit,
    pending: null,
    done: false,
    items: catalog.map(([id, name, detail, fault]) => ({
      id,
      name,
      detail,
      fault: faults.has(id) ? fault : null,
      checked: false,
      corrected: false,
    })),
  };
}
export function operatePreflight(
  p: Preflight,
  id: EquipmentId,
  kind: "check" | "fix",
): Preflight {
  if (p.done || p.pending) return p;
  const item = p.items.find((x) => x.id === id);
  if (
    !item ||
    (kind === "fix" && (!item.checked || !item.fault || item.corrected)) ||
    (kind === "check" && item.checked)
  )
    return p;
  return { ...p, pending: { id, kind, remaining: kind === "check" ? 4 : 6 } };
}
export function advancePreflight(p: Preflight, dt: number): Preflight {
  if (p.done || !Number.isFinite(dt) || dt <= 0) return p;
  const next = structuredClone(p);
  const step = Math.min(dt, next.limit - next.elapsed);
  next.elapsed += step;
  if (next.pending) {
    next.pending.remaining -= step;
    if (next.pending.remaining <= 0) {
      const item = next.items.find((x) => x.id === next.pending!.id)!;
      const at = next.elapsed + next.pending.remaining;
      if (next.pending.kind === "check") {
        item.checked = true;
        item.checkedAt = at;
      } else {
        item.corrected = true;
        item.correctedAt = at;
      }
      next.pending = null;
    }
  }
  if (next.elapsed >= next.limit) {
    next.done = true;
    next.pending = null;
  }
  return next;
}
export function ready(p: Preflight, id: EquipmentId) {
  const item = p.items.find((x) => x.id === id);
  return !!item && (!item.fault || item.corrected);
}
/** Clinical repairs must not rewrite the historical preparation record. */
export function equipmentReady(s: State, id: EquipmentId) {
  return s.repairedEquipment.includes(id) || ready(s.preflight, id);
}
export function repair(s: State, id: EquipmentId) {
  if (!s.repairedEquipment.includes(id)) s.repairedEquipment.push(id);
}
