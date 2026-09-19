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
  "pass",
  "risc",
  "mrisc",
  "gorelick_dehydration",
  "prifle",
  "kdigo_pediatric",
  "phoenix_sepsis",
  "parc",
  "bacterial_meningitis_score",
  "ckid_u25",
  "modified_bell_nec",
  "nsofa",
  "wpcdai"
] as const;

const intentionallyBlockedIds = ["pelod_2", "prism_iv", "pim3"] as const;

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

  it("keeps protected prognostic scores blocked rather than pending", () => {
    for (const id of intentionallyBlockedIds) {
      expect(implementedCalculatorToolIds).not.toContain(id);
      expect(getToolDiscovery(id)?.calculationAvailability).toBe("blocked_by_rights");
      expect(getToolDiscovery(id)?.surfaceStatus).toBe("blocked");
      const tool = clinicalTools.find((item) => item.id === id);
      expect(tool?.implementationStatus).not.toBe("implemented");
      expect(tool?.calculationStatus).not.toBe("active");
    }
  });
});
