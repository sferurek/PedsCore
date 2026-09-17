import { describe, expect, it } from "vitest";
import {
  getTool,
  getToolDiscovery,
  implementedCalculatorToolIds
} from "../src/index";

describe("AAP 2022 neonatal hyperbilirubinemia", () => {
  it("publishes an active externally calculated guideline surface", () => {
    const tool = getTool("aap_2022_hyperbilirubinemia");
    const discovery = getToolDiscovery("aap_2022_hyperbilirubinemia");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).not.toBe("active");
    expect(discovery?.surfaceStatus).toBe("active");
    expect(discovery?.calculationAvailability).toBe("external_official");
    expect(discovery?.reuseStatus).toBe("external_only");
    expect(implementedCalculatorToolIds).not.toContain("aap_2022_hyperbilirubinemia");
  });

  it("traces to the AAP 2022 guideline and PediTools API", () => {
    const tool = getTool("aap_2022_hyperbilirubinemia");
    expect(tool?.references.some((reference) => reference.doi === "10.1542/peds.2022-058859")).toBe(true);
    expect(tool?.references.some((reference) => reference.url?.includes("peditools.org/bili2022"))).toBe(true);
  });

  it("documents the validated population and risk-factor handling", () => {
    const tool = getTool("aap_2022_hyperbilirubinemia");
    expect(tool?.population.en).toContain("35 or more weeks");
    expect(tool?.validationNotes.en).toContain("albumin <3 g/dL");
    expect(tool?.validationNotes.en).toContain("Do not subtract direct/conjugated bilirubin");
  });
});
