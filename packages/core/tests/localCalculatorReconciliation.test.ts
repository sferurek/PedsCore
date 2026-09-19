import { describe, expect, it } from "vitest";
import {
  calculateTool,
  clinicalTools,
  getToolDiscovery,
  implementedCalculatorToolIds,
  toolDiscoveryById
} from "../src/index.js";

const reconciledLocalIds = [
  "modified_tal",
  "taussig_croup",
  "risc",
  "mrisc",
  "kdigo_pediatric",
  "phoenix_sepsis",
  "parc",
  "bacterial_meningitis_score",
  "ckid_u25",
  "modified_bell_nec",
  "nsofa",
  "wpcdai"
] as const;

const newlyUnlockedIds = ["pass", "gorelick_dehydration", "prifle", "pelod_2", "prism_iv", "pim3", "psofa"] as const;

describe("local calculator reconciliation", () => {
  it("leaves no discovery surface marked local_planned", () => {
    const pending = Object.entries(toolDiscoveryById)
      .filter(([, metadata]) => metadata.calculationAvailability === "local_planned")
      .map(([id]) => id);

    expect(pending).toEqual([]);
  });

  it("registers every reconciled local calculator", () => {
    for (const id of reconciledLocalIds) {
      expect(implementedCalculatorToolIds).toContain(id);
      expect(getToolDiscovery(id)?.calculationAvailability).toBe("local_active");
      expect(calculateTool(id, {}).warnings[0]?.id).not.toBe("calculator_not_implemented");
    }
  });

  it("keeps the audited unlock batch locally active", () => {
    for (const id of newlyUnlockedIds) {
      expect(implementedCalculatorToolIds).toContain(id);
      expect(getToolDiscovery(id)?.calculationAvailability).toBe("local_active");
      expect(getToolDiscovery(id)?.surfaceStatus).toBe("active");
      const tool = clinicalTools.find((item) => item.id === id);
      expect(tool?.implementationStatus).toBe("implemented");
      expect(tool?.calculationStatus).toBe("active");
    }
  });

});
