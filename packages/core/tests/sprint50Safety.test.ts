import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  clinicalTools,
  getImplementedTools,
  getReferenceUrl,
  implementedCalculatorToolIds
} from "../src/index";

const expectedImplementedToolIds = [
  "apgar",
  "silverman_andersen",
  "wood_downes_ferres",
  "flacc",
  "qtc_bazett",
  "qtc_fridericia",
  "qtc_framingham",
  "qtc_hodges",
  "bedside_schwartz",
  "westley_croup",
  "pram",
  "clinical_dehydration_scale",
  "pediatric_appendicitis_score",
  "pecarn_tbi_under_2",
  "pecarn_tbi_2_or_more",
  "catch_tbi",
  "chalice_tbi",
  "sipa",
  "nips"
];

const implementedTestFiles: Record<string, string> = {
  apgar: "apgar.test.ts",
  bedside_schwartz: "schwartz.test.ts",
  catch_tbi: "catch.test.ts",
  chalice_tbi: "chalice.test.ts",
  clinical_dehydration_scale: "clinicalDehydrationScale.test.ts",
  flacc: "flacc.test.ts",
  nips: "nips.test.ts",
  pediatric_appendicitis_score: "pediatricAppendicitisScore.test.ts",
  pecarn_tbi_2_or_more: "pecarn2OrMore.test.ts",
  pecarn_tbi_under_2: "pecarnUnder2.test.ts",
  pram: "pram.test.ts",
  qtc_bazett: "qtc.test.ts",
  qtc_framingham: "qtc.test.ts",
  qtc_fridericia: "qtc.test.ts",
  qtc_hodges: "qtc.test.ts",
  silverman_andersen: "silvermanAndersen.test.ts",
  sipa: "sipa.test.ts",
  wood_downes_ferres: "woodDownesFerres.test.ts",
  westley_croup: "westleyCroup.test.ts"
};

const blockedTherapeuticOrProtectedIds = [
  "pediatric_cpr",
  "neonatal_cpr",
  "pediatric_bradycardia",
  "pediatric_tachycardia",
  "shockable_rhythm_algorithm",
  "non_shockable_rhythm_algorithm",
  "resuscitation_weight_dose_energy",
  "psofa",
  "pelod",
  "pelod_2",
  "prism_iii",
  "prism_iv",
  "pim2",
  "pim3",
  "wong_baker_faces",
  "bayley",
  "denver_ii",
  "orbegozo_growth_percentiles",
  "stamp"
];

const directReferenceLevels = new Set([
  "high",
  "moderate",
  "low",
  "original_derivation_study",
  "external_validation_study",
  "clinical_practice_guideline",
  "systematic_review",
  "consensus_statement",
  "official_manual_or_institutional_protocol",
  "peer_reviewed_review",
  "secondary_source"
]);

const hasDirectReference = (tool: (typeof clinicalTools)[number]) =>
  tool.references.some(
    (reference) =>
      directReferenceLevels.has(reference.evidenceLevel) &&
      Boolean(reference.doi || reference.pmid || reference.url || getReferenceUrl(reference))
  );

describe("SPRINT-50 implementation safety gates", () => {
  it("keeps implemented tools limited to active registry entries with tests", () => {
    const implementedIds = getImplementedTools().map((tool) => tool.id).sort();

    expect(implementedIds).toEqual([...expectedImplementedToolIds].sort());
    expect(implementedIds).toEqual([...implementedCalculatorToolIds].sort());

    for (const id of implementedIds) {
      const testFile = implementedTestFiles[id];
      expect(testFile).toBeDefined();
      expect(existsSync(join("packages/core/tests", testFile))).toBe(true);
    }
  });

  it("requires every implemented tool to keep a direct traceable reference", () => {
    for (const tool of getImplementedTools()) {
      expect(hasDirectReference(tool)).toBe(true);
    }
  });

  it("does not implement blocked therapeutic, prognostic, or proprietary tools", () => {
    for (const id of blockedTherapeuticOrProtectedIds) {
      const tool = clinicalTools.find((item) => item.id === id);

      expect(tool?.implementationStatus).not.toBe("implemented");
      expect(tool?.calculationStatus).not.toBe("active");
    }
  });

  it("keeps WHO Growth partial and outside the fully implemented count", () => {
    const whoGrowthModule = clinicalTools.find(
      (tool) => tool.id === "who_growth_module"
    );

    expect(whoGrowthModule?.implementationStatus).toBe("partially_implemented");
    expect(whoGrowthModule?.calculationStatus).toBe("metadata_ready");
    expect(getImplementedTools().map((tool) => tool.id)).not.toContain(
      "who_growth_module"
    );
  });

  it("tracks partially implemented tools explicitly", () => {
    const partiallyImplementedIds = clinicalTools
      .filter((tool) => tool.implementationStatus === "partially_implemented")
      .map((tool) => tool.id);

    expect(partiallyImplementedIds).toEqual(["who_growth_module"]);
    expect(getImplementedTools()).toHaveLength(19);
  });

  it("does not use partial status to mask therapeutic or proprietary blockers", () => {
    for (const id of blockedTherapeuticOrProtectedIds) {
      const tool = clinicalTools.find((item) => item.id === id);

      expect(tool?.implementationStatus).not.toBe("partially_implemented");
    }
  });
});
