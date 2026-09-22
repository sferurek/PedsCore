import { describe, expect, it } from "vitest";
import {
  advance,
  availability,
  createCase,
  finishCase,
  learnerView,
  startAction,
} from "../src/engine/simulator";
import {
  advancePreflight,
  createPreflight,
  operatePreflight,
} from "../src/preflight/equipment";
import { s1 } from "../src/scenarios/s1";
import { buildDebrief } from "../src/debrief/report";
import type { ActionId, EquipmentId, State } from "../src/engine/types";
const fresh = () => createCase(s1, createPreflight(42, 120, 0));
function act(s: State, id: ActionId) {
  const d = s1.actionDefinitions.find((a) => a.id === id)!;
  expect(availability(s, s1, id)).toBeNull();
  return advance(startAction(s, s1, id), s1, d.durationSec);
}
function recovered() {
  let s = act(fresh(), "ppv");
  s = act(s, "correct");
  return advance(s, s1, 38);
}
function fault(s: State, id: EquipmentId) {
  s.preflight.items.find((e) => e.id === id)!.fault = "Test fault";
  return s;
}
describe("internal state and observations", () => {
  it("starts with all observations unknown and strips hidden data from the learner projection", () => {
    const s = fresh();
    expect(Object.values(s.observed).every((x) => x === null)).toBe(true);
    expect(learnerView(s)).not.toHaveProperty("internal");
    expect(learnerView(s)).not.toHaveProperty("preflight");
  });
  it("does not reveal chest, efficacy, tone or recovery in the live timeline", () => {
    const s = recovered();
    const view = learnerView(s);
    expect(view.observed.chest).toBeNull();
    expect(view.observed.breathing).toBeNull();
    expect(view.observed.tone).toBeNull();
    expect(JSON.stringify(view.events)).not.toMatch(
      /eficaz|supera|espontánea|snapshot/,
    );
    expect(s.internal.breathing).toBe(true);
  });
  it("records chest only when actively checked", () => {
    let s = act(fresh(), "ppv");
    s = act(s, "chest");
    expect(s.observed.chest?.value).toBe(false);
    s = act(s, "correct");
    s = act(s, "chest");
    expect(s.observed.chest?.value).toBe(true);
  });
  it("manual heart rate is a dated sample, not live telemetry", () => {
    const s = act(fresh(), "hr");
    const after = advance(s, s1, 15);
    expect(after.observed.hr).toEqual(s.observed.hr);
    expect(after.internal.hr).toBeLessThan(s.internal.hr);
  });
  it("acquires ECG after its delay and keeps physiology running while another action locks input", () => {
    let s = act(fresh(), "ecg");
    expect(s.observed.hr).toBeNull();
    s = startAction(s, s1, "initial");
    s = advance(s, s1, 3.9);
    expect(s.observed.hr).toBeNull();
    s = advance(s, s1, 0.2);
    expect(s.observed.hr?.method).toBe("ECG");
    expect(s.pending?.id).toBe("initial");
    expect(s.internal.hr).toBeLessThan(82);
  });
  it("acquires SpO2 independently after eight seconds", () => {
    let s = act(fresh(), "spo2");
    s = advance(s, s1, 7.9);
    expect(s.observed.spo2).toBeNull();
    s = advance(s, s1, 0.2);
    expect(s.observed.spo2?.value).toBeCloseTo(s.internal.spo2);
    expect(s.observed.hr).toBeNull();
  });
});
describe("actions and continuous physiology", () => {
  it("locks actions without stopping time or physiology", () => {
    const s = startAction(fresh(), s1, "initial");
    expect(startAction(s, s1, "hr")).toBe(s);
    const next = advance(s, s1, 10);
    expect(next.time).toBeCloseTo(10);
    expect(next.internal.hr).toBeLessThan(s.internal.hr);
    expect(next.pending?.remaining).toBeCloseTo(20);
  });
  it("allows premature compressions and blind correction but not physical impossibilities", () => {
    expect(availability(fresh(), s1, "compress")).toBeNull();
    expect(availability(fresh(), s1, "correct")).not.toBeNull();
    expect(availability(act(fresh(), "ppv"), s1, "correct")).toBeNull();
  });
  it("supports one-shot and bounded oxygen actions", () => {
    const s = act(fresh(), "clamp");
    expect(availability(s, s1, "clamp")).not.toBeNull();
    expect(availability(s, s1, "oxygenDown")).not.toBeNull();
    expect(availability(fresh(), s1, "stopPpv")).not.toBeNull();
  });
  it("ineffective PPV does not recover heart rate or oxygenation", () => {
    const s = advance(act(fresh(), "ppv"), s1, 30);
    expect(s.internal.hr).toBeLessThan(82);
    expect(s.internal.spo2).toBeLessThan(58);
    expect(s.internal.breathing).toBe(false);
  });
  it("oxygen cannot compensate for ineffective ventilation", () => {
    let s = act(fresh(), "ppv");
    s = act(s, "oxygenUp");
    s = advance(s, s1, 25);
    expect(s.internal.hr).toBeLessThan(82);
    expect(s.internal.breathing).toBe(false);
  });
  it("correction recovers HR before SpO2 and breathing", () => {
    let s = act(act(fresh(), "ppv"), "correct");
    const hr = s.internal.hr;
    const saturation = s.internal.spo2;
    s = advance(s, s1, 5);
    expect(s.internal.hr).toBeGreaterThan(hr);
    expect(s.internal.spo2).toBeLessThan(saturation);
    expect(s.internal.breathing).toBe(false);
    s = advance(s, s1, 35);
    expect(s.internal.breathing).toBe(true);
    expect(s.internal.tone).toBe("en mejoría");
    expect(s.internal.spo2).toBeGreaterThan(saturation);
  });
  it("evolves with subsecond steps rather than discrete jumps", () => {
    const s = act(act(fresh(), "ppv"), "correct");
    const a = advance(s, s1, 0.01);
    const b = advance(a, s1, 0.01);
    expect(a.internal.hr).toBeGreaterThan(s.internal.hr);
    expect(b.internal.hr).toBeGreaterThan(a.internal.hr);
    expect(a.internal.hr - s.internal.hr).toBeLessThan(0.1);
  });
  it("processes a delayed frame consistently with many short frames", () => {
    const s = act(act(fresh(), "ppv"), "correct");
    const a = advance(s, s1, 40);
    let b = s;
    for (let i = 0; i < 400; i++) b = advance(b, s1, 0.1);
    expect(a.internal.hr).toBeCloseTo(b.internal.hr, 4);
    expect(a.internal.breathing).toBe(b.internal.breathing);
    expect(a.time).toBeCloseTo(b.time);
  });
  it("can restart after premature withdrawal", () => {
    let s = act(act(fresh(), "ppv"), "correct");
    s = advance(s, s1, 5);
    s = act(s, "stopPpv");
    const hr = s.internal.hr;
    s = advance(s, s1, 5);
    expect(s.internal.hr).toBeLessThan(hr);
    s = act(s, "ppv");
    s = advance(s, s1, 40);
    expect(s.internal.breathing).toBe(true);
  });
});
describe("closure", () => {
  it("does not close on physiological recovery alone", () => {
    expect(advance(recovered(), s1, 10).status).toBe("running");
  });
  it("requires post-recovery HR assessment, reevaluation and withdrawal plus stability", () => {
    let s = recovered();
    s = act(s, "assess");
    expect(s.reassessedAt).toBeNull();
    s = act(s, "hr");
    s = act(s, "assess");
    expect(s.reassessedAt).not.toBeNull();
    s = act(s, "stopPpv");
    s = advance(s, s1, 4);
    expect(s.status).toBe("running");
    s = advance(s, s1, 1);
    expect(s.reason).toBe("endpoint");
  });
  it("cannot close with restarted ventilation, ongoing compressions or extra oxygen", () => {
    for (const id of ["ppv", "compress", "oxygenUp"] as const) {
      let s = recovered();
      s = act(s, "hr");
      s = act(s, "assess");
      s = act(s, "stopPpv");
      s = act(s, id);
      expect(advance(s, s1, 6).status).toBe("running");
    }
  });
  it("manual finish interrupts any action and freezes state", () => {
    const s = finishCase(startAction(fresh(), s1, "initial"));
    expect(s.reason).toBe("manual");
    expect(s.pending).toBeNull();
    expect(advance(s, s1, 50)).toBe(s);
    expect(s.events.some((e) => e.label.includes("interrumpida"))).toBe(true);
  });
  it("times out at 300 seconds including a delayed frame", () => {
    const s = advance(fresh(), s1, 999);
    expect(s.time).toBe(300);
    expect(s.reason).toBe("timeout");
  });
  it("uses scenario configuration rather than a hardcoded timeout", () => {
    const custom = {
      ...s1,
      endpoints: { ...s1.endpoints, maxDurationSec: 10 },
    };
    expect(advance(fresh(), custom, 11).time).toBe(10);
  });
});
describe("preflight and equipment", () => {
  it("generates deterministic, distinct faults from a seed", () => {
    const a = createPreflight(5);
    expect(a).toEqual(createPreflight(5));
    expect(a.items.filter((x) => x.fault)).toHaveLength(2);
    expect(a).not.toEqual(createPreflight(50));
  });
  it("requires inspection before correction, locks operations, and records timings", () => {
    let p = createPreflight(4);
    const item = p.items.find((x) => x.fault)!;
    expect(operatePreflight(p, item.id, "fix")).toBe(p);
    p = operatePreflight(p, item.id, "check");
    expect(operatePreflight(p, "heat", "check")).toBe(p);
    p = advancePreflight(p, 4);
    expect(p.items.find((x) => x.id === item.id)?.checkedAt).toBe(4);
    p = advancePreflight(operatePreflight(p, item.id, "fix"), 6);
    expect(p.items.find((x) => x.id === item.id)?.correctedAt).toBe(10);
  });
  it("expires at 120 seconds and cancels unfinished operations", () => {
    let p = advancePreflight(createPreflight(1), 119);
    p = operatePreflight(p, "heat", "check");
    p = advancePreflight(p, 20);
    expect(p.elapsed).toBe(120);
    expect(p.done).toBe(true);
    expect(p.pending).toBeNull();
    expect(p.items.find((x) => x.id === "heat")?.checked).toBe(false);
  });
  it.each(["mask", "circuit"] as const)(
    "unresolved %s prevents ventilation even after correcting the seal",
    (id) => {
      let s = fault(fresh(), id);
      s = act(act(s, "ppv"), "correct");
      s = advance(s, s1, 20);
      expect(s.internal.breathing).toBe(false);
      expect(s.internal.effectiveSeconds).toBe(0);
      s = act(s, id === "mask" ? "replaceMask" : "repairCircuit");
      s = advance(s, s1, 40);
      expect(s.internal.breathing).toBe(true);
    },
  );
  it.each([
    ["suction", "suction"],
    ["spo2", "spo2"],
    ["laryngoscope", "intubate"],
    ["tube", "intubate"],
  ] as const)(
    "%s failure makes %s physically unavailable",
    (equipment, action) => {
      expect(
        availability(fault(fresh(), equipment), s1, action),
      ).not.toBeNull();
    },
  );
  it("a fixed preflight fault no longer blocks the equipment", () => {
    const s = fault(fresh(), "spo2");
    s.preflight.items.find((x) => x.id === "spo2")!.corrected = true;
    expect(availability(s, s1, "spo2")).toBeNull();
  });
});
describe("debrief and governance", () => {
  it("includes decisions, omissions, internal milestones and categorized sources without a total score", () => {
    let s = act(fresh(), "compress");
    s = act(s, "ppv");
    s = act(s, "correct");
    s = advance(s, s1, 40);
    const report = buildDebrief(finishCase(s), s1);
    expect(report.timeline.some((e) => e.internal)).toBe(true);
    expect(report.reflections.some((x) => x.includes("compresiones"))).toBe(
      true,
    );
    expect(report.cards).toHaveLength(7);
    expect(report.cards.every((x) => x.source.type)).toBe(true);
    expect(report).not.toHaveProperty("score");
    expect(report.preparation.items).toHaveLength(11);
  });
  it("rejects invalid elapsed times without corrupting state", () => {
    const s = fresh();
    expect(advance(s, s1, NaN)).toBe(s);
    expect(advance(s, s1, -1)).toBe(s);
  });
});

it("preserves the preparation record when material is repaired after birth", () => {
  let s = fault(fresh(), "mask");
  const before = structuredClone(s.preflight);
  s = act(s, "ppv");
  s = act(s, "replaceMask");
  expect(s.preflight).toEqual(before);
  expect(s.repairedEquipment).toContain("mask");
  expect(
    buildDebrief(finishCase(s), s1).preparation.items.find(
      (x) => x.id === "mask",
    )?.corrected,
  ).toBe(false);
});
