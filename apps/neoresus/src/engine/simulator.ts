import type { ActionId, Mode, Preflight, Scenario, State } from "./types";
export function createCase(
  scenario: Scenario,
  preflight: Preflight,
  mode: Mode = "simulation",
): State {
  return {
    time: 0,
    status: "running",
    reason: null,
    mode,
    internal: structuredClone(scenario.initialState),
    observed: {
      hr: null,
      spo2: null,
      breathing: null,
      tone: null,
      chest: null,
    },
    preflight: { ...structuredClone(preflight), pending: null, done: true },
    repairedEquipment: [],
    pending: null,
    support: {
      ppv: false,
      corrected: false,
      compressed: false,
      airway: "mask",
      fio2: 0.21,
      cordClamped: false,
    },
    monitors: { ecgAt: null, spo2At: null },
    events: [
      {
        at: 0,
        label: "Nacimiento",
        kind: "control",
        sourceType: "SIMULATION_ASSUMPTION",
      },
    ],
    completed: [],
    recoveryAt: null,
    reassessedAt: null,
    withdrawnAt: null,
    stableFor: 0,
    milestones: [],
  };
}
export function availability(
  s: State,
  scenario: Scenario,
  id: ActionId,
): string | null {
  const a = scenario.actionDefinitions.find((x) => x.id === id);
  if (!a) return "Acción no definida";
  if (s.status === "finished") return "Caso finalizado";
  if (s.pending) return "Hay una acción en curso";
  if (a.oneShot && s.completed.includes(id)) return "Acción ya realizada";
  return a.available(s) ? null : a.unavailable;
}
export function startAction(s: State, scenario: Scenario, id: ActionId): State {
  if (availability(s, scenario, id)) return s;
  const a = scenario.actionDefinitions.find((x) => x.id === id)!;
  return { ...s, pending: { id, remaining: a.durationSec, startedAt: s.time } };
}
export function finishCase(
  s: State,
  reason: State["reason"] = "manual",
): State {
  if (s.status === "finished") return s;
  const next = structuredClone(s);
  if (next.pending)
    next.events.push({
      at: next.time,
      label: "Acción interrumpida al finalizar: " + next.pending.id,
      kind: "control",
      sourceType: "SIMULATION_ASSUMPTION",
    });
  next.status = "finished";
  next.reason = reason;
  next.pending = null;
  next.events.push({
    at: next.time,
    label:
      reason === "endpoint"
        ? "Endpoint docente alcanzado"
        : reason === "timeout"
          ? "Tiempo máximo alcanzado"
          : "Finalización manual",
    kind: "control",
    sourceType: "SIMULATION_ASSUMPTION",
  });
  return next;
}
function milestone(s: State, id: string, label: string) {
  if (s.milestones.includes(id)) return;
  s.milestones.push(id);
  s.events.push({
    at: s.time,
    label,
    kind: "physiology",
    internal: true,
    sourceType: "SIMULATION_ASSUMPTION",
  });
}
/** Advances all clocks together; bounded substeps make delayed/background frames consistent. */
export function advance(s: State, scenario: Scenario, elapsed: number): State {
  if (s.status === "finished" || elapsed <= 0 || !Number.isFinite(elapsed))
    return s;
  let next = structuredClone(s);
  let remaining = Math.min(
    elapsed,
    scenario.endpoints.maxDurationSec - next.time,
  );
  while (remaining > 0.000001 && next.status === "running") {
    const dt = Math.min(0.05, remaining, next.pending?.remaining ?? Infinity);
    remaining -= dt;
    next.time += dt;
    scenario.physiology.advance(next, dt);
    if (next.internal.hr > 100)
      milestone(next, "hr100", "FC interna supera 100 lpm");
    if (next.internal.effectiveSeconds > 0)
      milestone(next, "effective", "Primera ventilación eficaz en el modelo");
    if (next.internal.breathing && next.recoveryAt === null) {
      next.recoveryAt = next.time;
      milestone(next, "breathing", "Aparece respiración espontánea");
    }
    const { ecgAt, spo2At } = next.monitors;
    if (
      ecgAt !== null &&
      next.time - ecgAt + 1e-8 >= scenario.observationRules.ecgDelaySec
    )
      next.observed.hr = {
        value: next.internal.hr,
        at: next.time,
        method: "ECG",
      };
    if (
      spo2At !== null &&
      next.time - spo2At + 1e-8 >= scenario.observationRules.spo2DelaySec
    )
      next.observed.spo2 = {
        value: next.internal.spo2,
        at: next.time,
        method: "Pulsioximetría preductal",
      };
    if (next.pending) {
      next.pending.remaining -= dt;
      if (next.pending.remaining < 1e-8) {
        const a = scenario.actionDefinitions.find(
          (x) => x.id === next.pending!.id,
        )!;
        const start = next.pending.startedAt;
        a.apply(next);
        next.events.push({
          at: next.time,
          label: a.label,
          kind: "action",
          action: a.id,
          sourceType: a.sourceType,
          snapshot: { ...next.internal },
          fio2: next.support.fio2,
        });
        if (a.id === "initial")
          next.events.push({
            at: start,
            label: "Inicio de medidas iniciales",
            kind: "control",
            sourceType: a.sourceType,
          });
        next.completed.push(a.id);
        next.pending = null;
      }
    }
    next.stableFor = scenario.endpoints.reached(next) ? next.stableFor + dt : 0;
    if (next.stableFor + 1e-8 >= scenario.endpoints.stabilitySec)
      next = finishCase(next, "endpoint");
    else if (next.time + 1e-8 >= scenario.endpoints.maxDurationSec) {
      next.time = scenario.endpoints.maxDurationSec;
      next = finishCase(next, "timeout");
    }
  }
  return next;
}
/** No internal numeric state, milestones or hidden fault details cross this UI boundary. */
export function learnerView(s: State) {
  return {
    time: s.time,
    status: s.status,
    mode: s.mode,
    observed: s.observed,
    support: s.support,
    pending: s.pending,
    monitors: s.monitors,
    events: s.events
      .filter((e) => !e.internal)
      .map(({ at, label, kind }) => ({ at, label, kind })),
  };
}
export type LearnerView = ReturnType<typeof learnerView>;
