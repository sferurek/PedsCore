import { describe, expect, it } from "vitest";
import { calculateTool, rdaiCalculator, snappeIiCalculator } from "../src/index.js";

describe("RDAI", () => {
  it("scores the minimum and maximum profiles", () => {
    const min = rdaiCalculator.calculate({
      wheeze_expiration:"none",
      wheeze_inspiration:"none",
      wheeze_location:"none",
      retraction_supraclavicular:"none",
      retraction_intercostal:"none",
      retraction_subcostal:"none"
    });
    const max = rdaiCalculator.calculate({
      wheeze_expiration:"all",
      wheeze_inspiration:"all",
      wheeze_location:"diffuse",
      retraction_supraclavicular:"marked",
      retraction_intercostal:"marked",
      retraction_subcostal:"marked"
    });
    expect(min.score).toBe(0);
    expect(max.score).toBe(17);
  });

  it("is available through the dispatcher", () => {
    const result = calculateTool("rdai", {
      wheeze_expiration:"end",
      wheeze_inspiration:"part",
      wheeze_location:"segmental",
      retraction_supraclavicular:"mild",
      retraction_intercostal:"mild",
      retraction_subcostal:"mild"
    });
    expect(result.score).toBe(6);
    expect(result.warnings.some((w)=>w.id==="calculator_not_implemented")).toBe(false);
  });
});

describe("SNAPPE-II", () => {
  const normal = {
    mean_bp_mmhg:35,
    lowest_temp_c:36,
    pao2_fio2_ratio:3,
    lowest_ph:7.3,
    multiple_seizures:false,
    urine_output_ml_kg_h:1.2,
    apgar_5min:8,
    birth_weight_g:1200,
    sga_below_3rd_percentile:false
  };

  it("scores zero for a normal-profile input", () => {
    const result = snappeIiCalculator.calculate(normal);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(162);
  });

  it("applies published boundary points", () => {
    expect(snappeIiCalculator.calculate({...normal,mean_bp_mmhg:29}).score).toBe(9);
    expect(snappeIiCalculator.calculate({...normal,mean_bp_mmhg:19}).score).toBe(19);
    expect(snappeIiCalculator.calculate({...normal,lowest_temp_c:35.6}).score).toBe(8);
    expect(snappeIiCalculator.calculate({...normal,pao2_fio2_ratio:0.29}).score).toBe(28);
    expect(snappeIiCalculator.calculate({...normal,lowest_ph:7.19}).score).toBe(7);
    expect(snappeIiCalculator.calculate({...normal,apgar_5min:6}).score).toBe(18);
    expect(snappeIiCalculator.calculate({...normal,birth_weight_g:749}).score).toBe(17);
    expect(snappeIiCalculator.calculate({...normal,sga_below_3rd_percentile:true}).score).toBe(12);
  });

  it("is available through the dispatcher", () => {
    const result = calculateTool("snappii", normal);
    expect(result.score).toBe(0);
    expect(result.warnings.some((w)=>w.id==="calculator_not_implemented")).toBe(false);
  });
});
