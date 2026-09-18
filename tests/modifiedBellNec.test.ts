import { describe, expect, it } from "vitest";
import { modifiedBellNecCalculator } from "../packages/core/src/calculators/modifiedBellNec.js";

describe("Modified Bell NEC", () => {
  const base = {
    systemic_instability: true,
    mild_gi_signs: true,
    gross_bloody_stool: false,
    absent_bowel_sounds_or_tenderness: false,
    mild_acidosis_or_thrombocytopenia: false,
    abdominal_cellulitis_or_mass: false,
    hypotension_dic_or_neutropenia: false,
    pneumatosis_intestinalis: false,
    portal_venous_gas: false,
    ascites: false,
    pneumoperitoneum: false
  };

  it("classifies suspected NEC without definitive radiologic findings", () => {
    const r = modifiedBellNecCalculator.calculate(base);
    expect(r.classification?.en).toContain("Stage IA");
  });

  it("classifies IIA when pneumatosis is present", () => {
    const r = modifiedBellNecCalculator.calculate({...base, pneumatosis_intestinalis:true});
    expect(r.classification?.en).toContain("Stage IIA");
  });

  it("classifies IIB when definitive NEC has portal venous gas", () => {
    const r = modifiedBellNecCalculator.calculate({...base, pneumatosis_intestinalis:true, portal_venous_gas:true});
    expect(r.classification?.en).toContain("Stage IIB");
  });

  it("classifies IIIB with pneumoperitoneum", () => {
    const r = modifiedBellNecCalculator.calculate({...base, pneumoperitoneum:true});
    expect(r.classification?.en).toContain("Stage IIIB");
  });
});
