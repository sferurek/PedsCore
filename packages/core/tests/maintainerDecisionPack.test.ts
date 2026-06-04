import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { clinicalTools } from "../src/catalog/clinicalTools";

const decisionPackPath = resolve("docs/evidence/MAINTAINER_DECISION_PACK.md");

describe("maintainer decision pack", () => {
  it("exists and is available", () => {
    const content = readFileSync(decisionPackPath, "utf8");

    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(300);
  });

  it("covers required families", () => {
    const content = readFileSync(decisionPackPath, "utf8");
    const requiredSections = [
      "Wood-Downes-Ferrés",
      "Pediatric Glasgow Coma Scale",
      "PEWS / Brighton PEWS / Bedside PEWS",
      "RCP pediátrica y neonatal / algoritmos",
      "Calculadora peso-dosis-energía en RCP",
      "Percentiles WHO/CDC",
      "PIM/PRISM/PELOD/pSOFA",
      "Propietarias / licencia",
      "Dolor con tabla compleja / copyright"
    ];

    for (const section of requiredSections) {
      expect(content.includes(`## ${section}`)).toBe(true);
    }
  });

  it("documents families that remain non-implementable without maintainer decision", () => {
    const getTool = (id: string) => clinicalTools.find((tool) => tool.id === id);
    const lockedIds = [
      "pediatric_gcs",
      "pews",
      "brighton_pews",
      "bedside_pews",
      "pediatric_cpr",
      "neonatal_cpr",
      "pediatric_bradycardia",
      "pediatric_tachycardia",
      "shockable_rhythm_algorithm",
      "non_shockable_rhythm_algorithm",
      "resuscitation_weight_dose_energy",
      "who_growth_percentiles",
      "cdc_growth_percentiles",
      "bmi_percentile",
      "head_circumference_percentile",
      "orbegozo_growth_percentiles",
      "psofa",
      "pelod",
      "pelod_2",
      "prism_iii",
      "prism_iv",
      "pim2",
      "pim3",
      "bayley",
      "denver_ii",
      "stamp",
      "wong_baker_faces",
      "cheops",
      "cries",
      "rflacc"
    ];

    for (const id of lockedIds) {
      const tool = getTool(id);
      expect(tool).toBeDefined();
      expect(tool!.implementationStatus).not.toBe("implemented");
    }
  });

  it("does not promote critical care and resuscitation tools to ready_for_implementation without governance", () => {
    const notReadyIds = [
      "psofa",
      "pelod",
      "pelod_2",
      "prism_iii",
      "prism_iv",
      "pim2",
      "pim3",
      "pediatric_cpr",
      "neonatal_cpr",
      "resuscitation_weight_dose_energy"
    ];

    for (const id of notReadyIds) {
      const tool = clinicalTools.find((item) => item.id === id);
      expect(tool?.implementationStatus).not.toBe("ready_for_implementation");
    }
  });

  it("keeps non-ready utilities out of implemented status in decision-required set", () => {
    const neverImplemented = [
      "pediatric_gcs",
      "pediatric_cpr",
      "neonatal_cpr",
      "resuscitation_weight_dose_energy",
      "orbegozo_growth_percentiles",
      "bayley",
      "denver_ii",
      "wong_baker_faces"
    ];

    for (const id of neverImplemented) {
      const tool = clinicalTools.find((item) => item.id === id);
      expect(tool?.implementationStatus).not.toBe("implemented");
    }
  });
});
