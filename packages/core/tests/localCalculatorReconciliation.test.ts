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
  "wpcdai",
  "pass",
  "gorelick_dehydration",
  "prifle",
  "pelod_2",
  "prism_iv",
  "pim3"
] as const;

const intentionallyEvidenceBlockedIds = ["psofa", "snappii"] as const;
const intentionallyRightsBlockedIds = [] as const;

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

  it("keeps evidence-gated tools blocked rather than pending", () => {
    for (const id of intentionallyEvidenceBlockedIds) {
      expect(implementedCalculatorToolIds).not.toContain(id);
      expect(getToolDiscovery(id)?.calculationAvailability).toBe("blocked_by_evidence");
      expect(getToolDiscovery(id)?.surfaceStatus).toBe("blocked");
      const tool = clinicalTools.find((item) => item.id === id);
      expect(tool?.implementationStatus).not.toBe("implemented");
      expect(tool?.calculationStatus).not.toBe("active");
    }
  });

  it("keeps rights-gated tools blocked rather than pending", () => {
    for (const id of intentionallyRightsBlockedIds) {
      expect(implementedCalculatorToolIds).not.toContain(id);
      expect(getToolDiscovery(id)?.calculationAvailability).toBe("blocked_by_rights");
      expect(getToolDiscovery(id)?.surfaceStatus).toBe("blocked");
      const tool = clinicalTools.find((item) => item.id === id);
      expect(tool?.implementationStatus).not.toBe("implemented");
      expect(tool?.calculationStatus).not.toBe("active");
    }
  });
});
