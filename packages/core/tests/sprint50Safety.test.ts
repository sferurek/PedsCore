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
  "ballard",
  "dubowitz",
  "sarnat",
  "modified_sarnat_nichd",
  "thompson_hie",
  "cries",
  "aap_2022_hyperbilirubinemia",
  "bedside_pews",
  "fenton_2025_growth",
      "garcia_alix_ners",
  "wood_downes_ferres",
  "qtc_bazett",
  "qtc_fridericia",
  "qtc_framingham",
  "qtc_hodges",
  "bedside_schwartz",
  "revised_schwartz",
  "westley_croup",
  "pram",
  "clinical_dehydration_scale",
  "pediatric_appendicitis_score",
  "pecarn_tbi_under_2",
  "pecarn_tbi_2_or_more",
  "catch_tbi",
  "chalice_tbi",
  "sipa",
  "nips",
  "pediatric_burn_tbsa",
  "modified_tal", "taussig_croup", "pass", "risc", "mrisc", "gorelick_dehydration", "prifle", "kdigo_pediatric", "pelod_2", "prism_iv", "pim3",
  "who_growth_module", "who_growth_percentiles", "bmi_percentile", "head_circumference_percentile"
];

const implementedTestFiles: Record<string, string> = {
  apgar: "apgar.test.ts",
  ballard: "ballard.test.ts",
  dubowitz: "dubowitz.test.ts",
  sarnat: "sarnat.test.ts",
  modified_sarnat_nichd: "sarnat.test.ts",
  thompson_hie: "thompsonHie.test.ts",
  cries: "cries.test.ts",
  aap_2022_hyperbilirubinemia: "aap2022Hyperbilirubinemia.test.ts",
  bedside_pews: "bedsidePews.test.ts",
  fenton_2025_growth: "fenton2025.test.ts",
  bedside_schwartz: "schwartz.test.ts",
  catch_tbi: "catch.test.ts",
  chalice_tbi: "chalice.test.ts",
  clinical_dehydration_scale: "clinicalDehydrationScale.test.ts",
  flacc: "flacc.test.ts",
  nips: "nips.test.ts",
  pediatric_burn_tbsa: "burnTbsa.test.ts",
  pediatric_appendicitis_score: "pediatricAppendicitisScore.test.ts",
  pecarn_tbi_2_or_more: "pecarn2OrMore.test.ts",
  pecarn_tbi_under_2: "pecarnUnder2.test.ts",
  pram: "pram.test.ts",
  qtc_bazett: "qtc.test.ts",
  qtc_framingham: "qtc.test.ts",
  qtc_fridericia: "qtc.test.ts",
  qtc_hodges: "qtc.test.ts",
  revised_schwartz: "schwartz.test.ts",
  silverman_andersen: "silvermanAndersen.test.ts",
  sipa: "sipa.test.ts",
  wood_downes_ferres: "woodDownesFerres.test.ts",
  westley_croup: "westleyCroup.test.ts",
  garcia_alix_ners: "garciaAlixNers.test.ts",
  modified_tal: "modifiedTal.test.ts", taussig_croup: "taussigCroup.test.ts", pass: "pass.test.ts", risc: "risc.test.ts", mrisc: "mRisc.test.ts", gorelick_dehydration: "gorelickDehydration.test.ts", prifle: "pRifle.test.ts", kdigo_pediatric: "pediatricKdigo.test.ts", pelod_2: "pelod2.test.ts", prism_iv: "prismIv.test.ts", pim3: "pim3.test.ts",
  who_growth_module: "whoGrowth.test.ts", who_growth_percentiles: "whoGrowth.test.ts", bmi_percentile: "whoGrowth.test.ts", head_circumference_percentile: "whoGrowth.test.ts"
};

const blockedTherapeuticOrProtectedIds = [
  "pediatric_cpr",
  "neonatal_cpr",
  "pediatric_bradycardia",
  "pediatric_tachycardia",
  "shockable_rhythm_algorithm",
  "non_shockable_rhythm_algorithm",
  "psofa",
  "pelod",
  "prism_iii",
  "pim2",
  "wong_baker_faces",
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
    expect(implementedCalculatorToolIds).toContain("flacc");
    expect(implementedIds).not.toContain("flacc");

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

  it("keeps completed WHO Growth surfaces active", () => {
    const whoGrowthModule = clinicalTools.find(
      (tool) => tool.id === "who_growth_module"
    );

    expect(whoGrowthModule?.implementationStatus).toBe("implemented");
    expect(whoGrowthModule?.calculationStatus).toBe("active");
    expect(getImplementedTools().map((tool) => tool.id)).toContain("who_growth_module");
    expect(getImplementedTools().map((tool) => tool.id)).toContain("bmi_percentile");
    expect(getImplementedTools().map((tool) => tool.id)).toContain("head_circumference_percentile");
  });

  it("tracks partially implemented tools explicitly", () => {
    const partialIds = clinicalTools
      .filter((tool) => tool.implementationStatus === "partially_implemented")
      .map((tool) => tool.id)
      .sort();

    expect(partialIds).toEqual([]);
  });

  it("does not use partial status to mask therapeutic or proprietary blockers", () => {
    for (const id of blockedTherapeuticOrProtectedIds) {
      const tool = clinicalTools.find((item) => item.id === id);
      expect(tool?.implementationStatus).not.toBe("partially_implemented");
    }
  });
});
