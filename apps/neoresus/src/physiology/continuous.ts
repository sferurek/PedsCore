import type { State } from "../engine/types";
import { equipmentReady } from "../preflight/equipment";
export const physiologyParameters = {
  sourceType: "SIMULATION_ASSUMPTION" as const,
  recoveryHr: 138,
  deteriorationHr: 38,
  hrTimeConstantSec: 20,
  saturationTimeConstantSec: 32,
  spontaneousAfterSec: 32,
  saturationLagSec: 10,
};
export function effectiveVentilation(s: State) {
  return (
    s.support.ppv &&
    equipmentReady(s, "ventilator") &&
    equipmentReady(s, "circuit") &&
    (s.support.airway !== "mask" ||
      (s.support.corrected && equipmentReady(s, "mask")))
  );
}
export function advancePhysiology(s: State, dt: number) {
  const p = physiologyParameters;
  const effective = effectiveVentilation(s);
  const v = s.internal;
  v.effectiveSeconds =
    effective || v.breathing
      ? v.effectiveSeconds + dt
      : Math.max(0, v.effectiveSeconds - dt * 0.5);
  v.hr +=
    ((effective || v.breathing ? p.recoveryHr : p.deteriorationHr) - v.hr) *
    (1 -
      Math.exp(-dt / (effective || v.breathing ? p.hrTimeConstantSec : 100)));
  const oxygenating =
    (effective || v.breathing) && v.effectiveSeconds > p.saturationLagSec;
  const target = oxygenating
    ? Math.min(98, 91 + (s.support.fio2 - 0.21) * 12)
    : 45;
  v.spo2 +=
    (target - v.spo2) *
    (1 - Math.exp(-dt / (oxygenating ? p.saturationTimeConstantSec : 90)));
  if (v.effectiveSeconds >= p.spontaneousAfterSec && v.hr > 100)
    v.breathing = true;
  v.chest = effective || v.breathing;
  v.tone = v.breathing && v.hr > 110 ? "en mejoría" : "disminuido";
}
