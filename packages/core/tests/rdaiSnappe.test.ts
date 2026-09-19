import { describe, expect, it } from "vitest";
import { calculateTool, rdaiCalculator, snappeIiCalculator } from "../src/index.js";

describe("RDAI", () => {
  it("scores the minimum and maximum profiles", () => {
    const min = rdaiCalculator.calculate({
      wheeze_expiration:"none", wheeze_inspiration:"none", wheeze_location:"none",
      retraction_supraclavicular:"none", retraction_intercostal:"none", retraction_subcostal:"none"
    });
    const max = rdaiCalculator.calculate({
      wheeze_expiration:"all", wheeze_inspiration:"all", wheeze_location:"diffuse",
      retraction_supraclavicular:"marked", retraction_intercostal:"marked", retraction_subcostal:"marked"
    });
    expect(min.score).toBe(0);
    expect(max.score).toBe(17);
  });
});

describe("SNAPPE-II", () => {
  const normal = {
    mean_bp_mmhg:35,
    lowest_temp_c:36,
    pao2_mmhg:90,
    fio2_percent:30,
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

  it("derives the published oxygenation convention from PaO2 and FiO2 percent", () => {
    expect(snappeIiCalculator.calculate({...normal,pao2_mmhg:8.7,fio2_percent:30}).score).toBe(28);
    expect(snappeIiCalculator.calculate({...normal,pao2_mmhg:29.7,fio2_percent:30}).score).toBe(16);
    expect(snappeIiCalculator.calculate({...normal,pao2_mmhg:74.7,fio2_percent:30}).score).toBe(5);
  });

  it("assigns zero to unmeasured physiologic variables with an explicit warning", () => {
    const result = snappeIiCalculator.calculate({
      apgar_5min:8,
      birth_weight_g:1200,
      sga_below_3rd_percentile:false
    });
    expect(result.score).toBe(0);
    expect(result.warnings.some((w)=>w.id==="snappe2_unmeasured_zero")).toBe(true);
  });

  it("is available through the dispatcher", () => {
    const result = calculateTool("snappii", normal);
    expect(result.warnings.some((w)=>w.id==="calculator_not_implemented")).toBe(false);
  });
});
