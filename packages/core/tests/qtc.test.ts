import { describe, expect, it } from "vitest";
import {
  qtcBazettCalculator,
  qtcFraminghamCalculator,
  qtcFridericiaCalculator,
  qtcHodgesCalculator
} from "../src/index";

describe("QTc calculators", () => {
  it("returns approximately QT at 60 bpm", () => {
    const input = { qt_ms: 380, heart_rate_bpm: 60 };

    expect(qtcBazettCalculator.calculate(input).value).toBeCloseTo(380, 1);
    expect(qtcFridericiaCalculator.calculate(input).value).toBeCloseTo(380, 1);
    expect(qtcFraminghamCalculator.calculate(input).value).toBeCloseTo(380, 1);
    expect(qtcHodgesCalculator.calculate(input).value).toBeCloseTo(380, 1);
  });

  it("calculates expected values at 120 bpm", () => {
    const input = { qt_ms: 380, heart_rate_bpm: 120 };

    expect(qtcBazettCalculator.calculate(input).value).toBeCloseTo(537.4, 1);
    expect(qtcFridericiaCalculator.calculate(input).value).toBeCloseTo(478.8, 1);
    expect(qtcFraminghamCalculator.calculate(input).value).toBeCloseTo(457, 1);
    expect(qtcHodgesCalculator.calculate(input).value).toBeCloseTo(485, 1);
  });

  it("warns on missing or invalid values", () => {
    expect(qtcBazettCalculator.calculate({ qt_ms: 380 }).warnings[0]?.id).toBe(
      "missing_required_inputs"
    );
    expect(
      qtcBazettCalculator.calculate({ qt_ms: 0, heart_rate_bpm: 60 }).warnings[0]?.id
    ).toBe("invalid_qtc_inputs");
    expect(
      qtcBazettCalculator.calculate({ qt_ms: 380, heart_rate_bpm: 0 }).warnings[0]?.id
    ).toBe("invalid_qtc_inputs");
  });

  it("warns on extreme values without blocking numeric output", () => {
    const result = qtcBazettCalculator.calculate({
      qt_ms: 800,
      heart_rate_bpm: 260
    });

    expect(result.value).toBeTypeOf("number");
    expect(result.warnings.some((warning) => warning.id === "extreme_qtc_input")).toBe(
      true
    );
  });
});
