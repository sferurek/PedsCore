import { describe, expect, it } from "vitest";
import { getTool, getToolDiscovery, thompsonHieCalculator } from "../src/index";

const zeroInput = {
  tone: 0,
  consciousness: 0,
  seizures: 0,
  posture: 0,
  moro: 0,
  grasp: 0,
  suck: 0,
  respiration: 0,
  fontanelle: 0
};

describe("Thompson HIE calculator", () => {
  it("is implemented as a local nine-domain calculator", () => {
    const tool = getTool("thompson_hie");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(9);
    expect(getToolDiscovery("thompson_hie")?.calculationAvailability).toBe("local_active");
    expect(tool?.references.some((reference) => reference.pmid === "9240886")).toBe(true);
  });

  it("calculates the full 0-22 range", () => {
    const normal = thompsonHieCalculator.calculate(zeroInput);
    expect(normal.score).toBe(0);
    expect(normal.maxScore).toBe(22);
    expect(normal.classification?.en).toBe("No scored abnormalities");

    const severe = thompsonHieCalculator.calculate({
      tone: 3,
      consciousness: 3,
      seizures: 2,
      posture: 3,
      moro: 2,
      grasp: 2,
      suck: 2,
      respiration: 3,
      fontanelle: 2
    });
    expect(severe.score).toBe(22);
    expect(severe.classification?.en).toBe("Severe range");
  });

  it("uses the AAP severity convention as a secondary interpretation", () => {
    const mild = thompsonHieCalculator.calculate({ ...zeroInput, tone: 3, consciousness: 3, seizures: 2, posture: 2 });
    expect(mild.score).toBe(10);
    expect(mild.classification?.en).toContain("Mild range");

    const moderate = thompsonHieCalculator.calculate({ ...zeroInput, tone: 3, consciousness: 3, seizures: 2, posture: 3 });
    expect(moderate.score).toBe(11);
    expect(moderate.classification?.en).toBe("Moderate range");

    const severe = thompsonHieCalculator.calculate({ ...zeroInput, tone: 3, consciousness: 3, seizures: 2, posture: 3, moro: 2, grasp: 2 });
    expect(severe.score).toBe(15);
    expect(severe.classification?.en).toBe("Severe range");
  });

  it("requires all domains and rejects invalid values", () => {
    const { fontanelle: _omitted, ...incomplete } = zeroInput;
    expect(thompsonHieCalculator.calculate(incomplete).warnings[0]?.id).toBe("missing_required_inputs");

    expect(thompsonHieCalculator.calculate({ ...zeroInput, seizures: 3 }).warnings[0]?.id).toBe("invalid_thompson_item_score");
    expect(thompsonHieCalculator.calculate({ ...zeroInput, tone: 1.5 }).warnings[0]?.id).toBe("invalid_thompson_item_score");
  });

  it("documents the alternative 0-7 / 8-10 convention without using it as the primary banding", () => {
    const tool = getTool("thompson_hie");
    expect(tool?.calculationNotes?.en).toContain("0-7 no encephalopathy");
    expect(tool?.calculationNotes?.en).toContain("8-10 mild");
    expect(tool?.validationNotes.en).toContain("Some publications instead separate 0-7");
  });

  it("does not encode treatment or hypothermia eligibility", () => {
    const serialized = JSON.stringify(getTool("thompson_hie")).toLocaleLowerCase();
    expect(serialized).toContain("does not by itself determine hypothermia eligibility");
    expect(serialized).not.toContain("start hypothermia");
  });
});
