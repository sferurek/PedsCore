import { describe, expect, it } from "vitest";
import {
  getTool,
  getToolDiscovery,
  implementedCalculatorToolIds
} from "../src/index";

describe("Fenton 2025 preterm growth", () => {
  it("publishes the third-generation chart as an active external tool", () => {
    const tool = getTool("fenton_2025_growth");
    const discovery = getToolDiscovery("fenton_2025_growth");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).not.toBe("active");
    expect(discovery?.surfaceStatus).toBe("active");
    expect(discovery?.calculationAvailability).toBe("external_official");
    expect(discovery?.reuseStatus).toBe("external_only");
    expect(implementedCalculatorToolIds).not.toContain("fenton_2025_growth");
  });

  it("traces the 2025 source and external calculators", () => {
    const tool = getTool("fenton_2025_growth");
    expect(tool?.references.some((reference) => reference.doi === "10.1111/ppe.70035")).toBe(true);
    expect(tool?.references.some((reference) => reference.pmid === "40534585")).toBe(true);
    expect(tool?.references.some((reference) => reference.url === "https://fentongrowth.ca/")).toBe(true);
    expect(tool?.references.some((reference) => reference.url?.includes("peditools.org/fenton2025"))).toBe(true);
  });

  it("keeps Fenton 2013 as legacy reference-only content", () => {
    const legacy = getTool("neonatal_growth_fenton");
    const discovery = getToolDiscovery("neonatal_growth_fenton");
    expect(legacy?.implementationStatus).not.toBe("implemented");
    expect(discovery?.calculationAvailability).toBe("not_applicable");
    expect(discovery?.relatedToolIds).toContain("fenton_2025_growth");
  });
});
