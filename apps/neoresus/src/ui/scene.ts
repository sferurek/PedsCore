import type { State } from "../engine/types";
export function sceneView(s: State) {
  return {
    moving: s.internal.chest,
    spontaneous: s.internal.breathing,
    tone: s.internal.tone,
    mask: s.support.ppv && s.support.airway === "mask",
    cordClamped: s.support.cordClamped,
    color: s.internal.spo2 > 75 ? "#e5b8a8" : "#cfb7b5",
    compressed: s.support.compressed,
  };
}
