import { describe, expect, it } from "vitest";
import { calculateTool, getTool, getToolDiscovery } from "../src/index";

describe("Bedside PEWS", () => {
  it("scores a normal 2-year-old as zero", () => {
    const result = calculateTool("bedside_pews", {
      age_months: 24,
      heart_rate: 100,
      systolic_bp: 100,
      capillary_refill: "crt_lt3",
      respiratory_rate: 30,
      respiratory_effort: "effort_normal",
      oxygen_saturation: 98,
      oxygen_therapy: "oxygen_room_air"
    });

    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(26);
  });

  it("applies age-specific extreme thresholds and reaches 26", () => {
    const result = calculateTool("bedside_pews", {
      age_months: 24,
      heart_rate: 180,
      systolic_bp: 60,
      capillary_refill: "crt_ge3",
      respiratory_rate: 75,
      respiratory_effort: "effort_severe",
      oxygen_saturation: 85,
      oxygen_therapy: "oxygen_high"
    });

    expect(result.score).toBe(26);
    expect(result.interpretation?.id).toBe("study_threshold_8_plus");
  });

  it("respects boundary scoring in adolescents", () => {
    const result = calculateTool("bedside_pews", {
      age_months: 156,
      heart_rate: 100,
      systolic_bp: 130,
      capillary_refill: "crt_lt3",
      respiratory_rate: 17,
      respiratory_effort: "effort_mild",
      oxygen_saturation: 94,
      oxygen_therapy: "oxygen_low"
    });

    expect(result.score).toBe(7);
  });

  it("keeps the tool locally active and attributed", () => {
    const tool = getTool("bedside_pews");
    const discovery = getToolDiscovery("bedside_pews");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(8);
    expect(tool?.references.some((reference) => reference.doi === "10.1186/cc7998")).toBe(true);
    expect(tool?.references.some((reference) => reference.doi === "10.1186/cc10337")).toBe(true);
    expect(tool?.validationNotes.en).toContain("CC BY 2.0");
    expect(discovery?.calculationAvailability).toBe("local_active");
    expect(discovery?.reuseStatus).toBe("attribution_required");
  });
});
