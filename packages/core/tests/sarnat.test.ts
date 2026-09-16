import { describe, expect, it } from "vitest";
import {
  getTool,
  getToolDiscovery,
  modifiedSarnatNichdCalculator
} from "../src/index";

describe("Sarnat tools", () => {
  it("publishes classic Sarnat 1976 as an implemented reference-only staging framework", () => {
    const tool = getTool("sarnat");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).not.toBe("active");
    expect(getToolDiscovery("sarnat")?.calculationAvailability).toBe("not_applicable");
    expect(tool?.references.some((reference) => reference.doi === "10.1001/archneur.1976.00500100030012")).toBe(true);
    expect(tool?.validationNotes.en).toContain("descriptive Stage I-II-III");
  });

  it("publishes Modified Sarnat / NICHD as a six-category local calculator", () => {
    const tool = getTool("modified_sarnat_nichd");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(6);
    expect(getToolDiscovery("modified_sarnat_nichd")?.calculationAvailability).toBe("local_active");
  });

  it("calculates Total Sarnat Score from 0 to 18", () => {
    const normal = modifiedSarnatNichdCalculator.calculate({
      level_of_consciousness: 0,
      spontaneous_activity: 0,
      posture: 0,
      tone: 0,
      primitive_reflexes: 0,
      autonomic_system: 0
    });
    expect(normal.score).toBe(0);
    expect(normal.maxScore).toBe(18);
    expect(normal.classification?.en).toContain("No coded abnormalities");

    const severe = modifiedSarnatNichdCalculator.calculate({
      level_of_consciousness: 3,
      spontaneous_activity: 3,
      posture: 3,
      tone: 3,
      primitive_reflexes: 3,
      autonomic_system: 3
    });
    expect(severe.score).toBe(18);
    expect(severe.classification?.en).toBe("Predominantly severe");
  });

  it("uses level of consciousness to resolve a tied predominant abnormal severity", () => {
    const result = modifiedSarnatNichdCalculator.calculate({
      level_of_consciousness: 2,
      spontaneous_activity: 1,
      posture: 1,
      tone: 2,
      primitive_reflexes: 3,
      autonomic_system: 3
    });
    expect(result.score).toBe(12);
    expect(result.classification?.en).toBe("Predominantly moderate");
  });

  it("returns mixed pattern when a tie cannot be resolved by level of consciousness", () => {
    const result = modifiedSarnatNichdCalculator.calculate({
      level_of_consciousness: 0,
      spontaneous_activity: 1,
      posture: 1,
      tone: 2,
      primitive_reflexes: 2,
      autonomic_system: 3
    });
    expect(result.classification?.en).toContain("Mixed pattern");
  });

  it("requires all six categories and rejects values outside 0-3", () => {
    expect(modifiedSarnatNichdCalculator.calculate({
      level_of_consciousness: 1,
      spontaneous_activity: 1,
      posture: 1,
      tone: 1,
      primitive_reflexes: 1
    }).warnings[0]?.id).toBe("missing_required_inputs");

    expect(modifiedSarnatNichdCalculator.calculate({
      level_of_consciousness: 4,
      spontaneous_activity: 1,
      posture: 1,
      tone: 1,
      primitive_reflexes: 1,
      autonomic_system: 1
    }).warnings[0]?.id).toBe("invalid_modified_sarnat_category");
  });

  it("does not encode therapeutic-hypothermia recommendations", () => {
    const classic = JSON.stringify(getTool("sarnat")).toLocaleLowerCase();
    const modified = JSON.stringify(getTool("modified_sarnat_nichd")).toLocaleLowerCase();
    expect(classic).toContain("does not generate hypothermia");
    expect(modified).toContain("does not determine therapeutic-hypothermia");
  });
});
