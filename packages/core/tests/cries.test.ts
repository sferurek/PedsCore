import { describe, expect, it } from "vitest";
import { criesCalculator, getTool, getToolDiscovery } from "../src/index";

const zeroInput = {
  crying: "crying_0",
  oxygen: "oxygen_0",
  vital_signs: "vital_0",
  expression: "expression_0",
  sleeplessness: "sleep_0"
};

describe("CRIES calculator", () => {
  it("is implemented as a five-domain local calculator", () => {
    const tool = getTool("cries");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(5);
    expect(getToolDiscovery("cries")?.calculationAvailability).toBe("local_active");
    expect(tool?.references.some((reference) => reference.pmid === "8521311")).toBe(true);
  });

  it("calculates the full 0-10 range", () => {
    const zero = criesCalculator.calculate(zeroInput);
    expect(zero.score).toBe(0);
    expect(zero.maxScore).toBe(10);
    expect(zero.classification?.en).toContain("Below moderate-pain threshold");

    const ten = criesCalculator.calculate({
      crying: "crying_2",
      oxygen: "oxygen_2",
      vital_signs: "vital_2",
      expression: "expression_2",
      sleeplessness: "sleep_2"
    });
    expect(ten.score).toBe(10);
    expect(ten.classification?.en).toBe("Severe pain");
  });

  it("uses documented >4 and >7 thresholds for secondary interpretation", () => {
    const moderate = criesCalculator.calculate({
      ...zeroInput,
      crying: "crying_2",
      oxygen: "oxygen_2",
      vital_signs: "vital_1"
    });
    expect(moderate.score).toBe(5);
    expect(moderate.classification?.en).toBe("Moderate pain");

    const severe = criesCalculator.calculate({
      ...zeroInput,
      crying: "crying_2",
      oxygen: "oxygen_2",
      vital_signs: "vital_2",
      expression: "expression_2"
    });
    expect(severe.score).toBe(8);
    expect(severe.classification?.en).toBe("Severe pain");
  });

  it("requires all five domains and rejects invalid scores", () => {
    const { sleeplessness: _omitted, ...incomplete } = zeroInput;
    expect(criesCalculator.calculate(incomplete).warnings[0]?.id).toBe("missing_required_inputs");

    expect(criesCalculator.calculate({ ...zeroInput, crying: 3 }).warnings[0]?.id).toBe("invalid_cries_item_score");
  });

  it("documents independent wording and local-protocol limitation", () => {
    const tool = getTool("cries");
    expect(tool?.validationNotes.en).toContain("independently worded criteria");
    expect(tool?.validationNotes.en).toContain("local protocol");
    expect(JSON.stringify(tool)).not.toContain("Priority A evidence audit");
  });
});
