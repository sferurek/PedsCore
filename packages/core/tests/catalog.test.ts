import { describe, expect, it } from "vitest";
import {
  clinicalTools,
  getReferenceUrl,
  getAllTools,
  getImplementedTools,
  getToolBySlug,
  getToolsByCategory,
  getToolsByStatus,
  searchTools
} from "../src/index";

const uniqueCount = (values: string[]) => new Set(values).size;

const implementedToolIds = [
  "apgar",
  "silverman_andersen",
  "wood_downes_ferres",
  "flacc",
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
  "nips"
];

const nonPrimaryReferenceLevels = new Set([
  "pending_verification",
  "primary_reference_needed",
  "pending_primary_source",
  "local_project_documentation"
]);

const hasRealReference = (tool: (typeof clinicalTools)[number]) =>
  tool.references.some(
    (reference) =>
      !nonPrimaryReferenceLevels.has(reference.evidenceLevel) &&
      Boolean(getReferenceUrl(reference))
  );

const getTool = (id: string) => {
  const tool = clinicalTools.find((item) => item.id === id);
  expect(tool).toBeDefined();
  return tool;
};

describe("clinical tools catalog", () => {
  it("loads the catalog without errors", () => {
    expect(getAllTools().length).toBeGreaterThan(50);
  });

  it("uses unique IDs and slugs", () => {
    expect(uniqueCount(clinicalTools.map((tool) => tool.id))).toBe(
      clinicalTools.length
    );
    expect(uniqueCount(clinicalTools.map((tool) => tool.slug))).toBe(
      clinicalTools.length
    );
  });

  it("requires disclaimers and implementation status for every tool", () => {
    expect(
      clinicalTools.every(
        (tool) => tool.disclaimerRequired === true && tool.implementationStatus
      )
    ).toBe(true);
  });

  it("assigns every tool to a category", () => {
    expect(clinicalTools.every((tool) => tool.category.length > 0)).toBe(true);
  });

  it("finds tools by slug, category, status, and implemented status", () => {
    expect(getToolBySlug("apgar")?.id).toBe("apgar");
    expect(getToolsByCategory("neonatology").length).toBeGreaterThan(5);
    expect(getToolsByStatus("pending_validation").length).toBeGreaterThan(5);
    expect(getImplementedTools()).toHaveLength(20);
  });

  it("keeps the implemented tool set unchanged during evidence audit", () => {
    expect(getImplementedTools().map((tool) => tool.id).sort()).toEqual(
      [...implementedToolIds].sort()
    );
  });

  it("requires every implemented tool to have at least one real clickable reference", () => {
    expect(getImplementedTools().every(hasRealReference)).toBe(true);
  });

  it("links Apgar to the concrete PubMed record", () => {
    const apgar = getTool("apgar");
    const originalReference = apgar?.references.find(
      (reference) => reference.id === "apgar_1953_original"
    );

    expect(originalReference?.pmid).toBe("13083014");
    expect(originalReference?.doi).toBeUndefined();
    expect(getReferenceUrl(originalReference!)).toBe(
      "https://pubmed.ncbi.nlm.nih.gov/13083014/"
    );
  });

  it("keeps implemented tool reference links concrete", () => {
    for (const tool of getImplementedTools()) {
      expect(
        tool.references.some((reference) => Boolean(getReferenceUrl(reference)))
      ).toBe(true);

      for (const reference of tool.references) {
        const referenceUrl = getReferenceUrl(reference);
        if (referenceUrl) {
          expect(referenceUrl).not.toMatch(/[?&](q|query|term|search)=/i);
          expect(referenceUrl).not.toMatch(/\/search-results?(\/|$)/i);
        }
      }
    }
  });

  it("searches by name, acronym, and category", () => {
    expect(searchTools("apgar", "en").some((tool) => tool.id === "apgar")).toBe(
      true
    );
    expect(searchTools("PRAM", "en").some((tool) => tool.id === "pram")).toBe(
      true
    );
    expect(
      searchTools("neonatology", "en").some(
        (tool) => tool.category === "neonatology"
      )
    ).toBe(true);
  });

  it("keeps PEWS pending validation", () => {
    expect(getToolBySlug("pews")?.implementationStatus).toBe(
      "pending_validation"
    );
  });

  it("does not include toxicology in the catalog", () => {
    const serializedCatalog = JSON.stringify(clinicalTools).toLocaleLowerCase(
      "en"
    );

    expect(serializedCatalog).not.toContain("toxic");
    expect(serializedCatalog).not.toContain("toxicol");
  });

  it("keeps Block 8B-1 evidence-reviewed tools pending until implementation gates are complete", () => {
    const reviewedPendingIds = [
      "ballard",
      "sarnat",
      "thompson_hie",
      "cries",
      "bhutani_nomogram",
      "bedside_pews",
      "cdc_growth_percentiles"
    ];

    for (const id of reviewedPendingIds) {
      const tool = getTool(id);

      expect(tool?.implementationStatus).toBe("pending_validation");
      expect(tool?.calculationStatus).not.toBe("active");
      expect(
        tool?.references.some((reference) => Boolean(getReferenceUrl(reference)))
      ).toBe(true);
    }
  });

  it("does not promote license-sensitive pending tools to ready for implementation", () => {
    const licenseSensitivePendingIds = [
      "ballard",
      "sarnat",
      "thompson_hie",
      "cries",
      "bhutani_nomogram",
      "bedside_pews",
      "pipp",
      "pipp_r",
      "comfortneo",
      "modified_finnegan",
      "brighton_pews",
      "orbegozo_growth_percentiles",
      "stamp",
      "strongkids",
      "pyms",
      "resuscitation_weight_dose_energy"
    ];

    for (const id of licenseSensitivePendingIds) {
      expect(getTool(id)?.implementationStatus).not.toBe(
        "ready_for_implementation"
      );
    }
  });

  it("keeps Block 8B-2 reviewed tools pending until source, table, variant, and licensing gates are complete", () => {
    const reviewedPendingIds = [
      "pipp",
      "pipp_r",
      "comfortneo",
      "modified_finnegan",
      "pediatric_gcs",
      "pews",
      "brighton_pews",
      "bedside_pews",
      "orbegozo_growth_percentiles",
      "stamp",
      "strongkids",
      "pyms"
    ];

    for (const id of reviewedPendingIds) {
      const tool = getTool(id);

      expect(tool?.implementationStatus).toBe("pending_validation");
      expect(tool?.calculationStatus).not.toBe("active");
    }
  });

  it("keeps variant-sensitive Block 8B-2 tools explicitly blocked", () => {
    expect(getTool("pews")?.validationNotes.en).toContain(
      "family of published and institutional variants"
    );
    expect(getTool("pediatric_gcs")?.validationNotes.en).toContain(
      "complete pediatric verbal table"
    );
    expect(getTool("orbegozo_growth_percentiles")?.validationNotes.en).toContain(
      "reusable data/LMS"
    );
  });

  it("keeps Block 9A clinical rules traceable and implemented", () => {
    const implementedRuleIds = ["catch_tbi", "chalice_tbi"];

    for (const id of implementedRuleIds) {
      const tool = getTool(id);

      expect(tool?.implementationStatus).toBe("implemented");
      expect(tool?.calculationStatus).toBe("active");
      expect(tool?.references.some((reference) => reference.doi || reference.pmid || reference.url)).toBe(true);
      expect(tool?.validationNotes.en).toContain("without CT or management recommendations");
      expect(tool?.inputs?.every((input) => input.type === "boolean")).toBe(true);
    }
  });

  it("keeps Wood-Downes-Ferres implemented as a descriptive score-only calculator", () => {
    const tool = getTool("wood_downes_ferres");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.references.some((reference) => reference.doi || reference.url)).toBe(true);
    expect(tool?.validationNotes.en).toContain("six-domain Wood-Downes-Ferres");
    expect(tool?.inputs).toHaveLength(6);
    expect(tool?.scoringTable?.length).toBeGreaterThan(0);
  });

  it("keeps Block 8B-3 table, variant, licensing, and expert-review tools blocked", () => {
    const blockedIds = [
      "dubowitz",
      "neonatal_growth_fenton",
      "rdai",
      "brosjod",
      "pass",
      "gorelick_dehydration",
      "prifle",
      "rflacc",
      "cheops",
      "visual_analogue_scale",
      "resuscitation_weight_dose_energy"
    ];

    for (const id of blockedIds) {
      const tool = getTool(id);

      expect(tool?.implementationStatus).not.toBe("ready_for_implementation");
      expect(tool?.implementationStatus).not.toBe("implemented");
      expect(tool?.calculationStatus).not.toBe("active");
    }
  });

  it("keeps Sprint 1 tools in their evidence-gated outcomes", () => {
    const revisedSchwartz = getTool("revised_schwartz");
    expect(revisedSchwartz?.implementationStatus).toBe("implemented");
    expect(revisedSchwartz?.calculationStatus).toBe("active");
    expect(revisedSchwartz?.validationNotes.en).toContain("CKiD");
    expect(revisedSchwartz?.inputs?.map((input) => input.id)).toEqual([
      "height_cm",
      "serum_creatinine",
      "creatinine_unit",
      "cystatin_c_mg_l",
      "bun_mg_dl",
      "sex"
    ]);

    for (const id of ["gorelick_dehydration", "cries"]) {
      const tool = getTool(id);
      expect(tool?.implementationStatus).toBe("pending_validation");
      expect(tool?.calculationStatus).not.toBe("active");
    }
  });

  it("requires every ready-for-implementation tool to have a direct source identifier", () => {
    const readyTools = getToolsByStatus("ready_for_implementation");

    for (const tool of readyTools) {
      expect(
        tool.references.some((reference) => reference.doi || reference.pmid || reference.url)
      ).toBe(true);
    }
  });

  it("keeps Block 8B-4 ready candidates without promotion when license is high-risk", () => {
    const blockedByLicenseIds = [
      "wong_baker_faces",
      "stamp",
      "bayley",
      "denver_ii",
      "prism_iii",
      "prism_iv",
      "resuscitation_weight_dose_energy"
    ];

    for (const id of blockedByLicenseIds) {
      expect(getTool(id)?.implementationStatus).not.toBe("ready_for_implementation");
    }
  });

  it("keeps Block 8B-4 maintainer-dependent tools out of ready/implemented state", () => {
    const maintainerDependentIds = [
      "pediatric_gcs",
      "pews",
      "pim2",
      "pim3",
      "prism_iii",
      "prism_iv",
      "who_growth_percentiles",
      "cdc_growth_percentiles",
      "adolescent_depression_risk",
      "adolescent_behavior_risk",
      "mass_casualty_triage"
    ];

    for (const id of maintainerDependentIds) {
      expect(
        ["ready_for_implementation", "implemented"].includes(
          getTool(id)?.implementationStatus ?? ""
        )
      ).toBe(false);
    }
  });

  it("tracks Sprint 2B WHO Growth presets as partial wrappers", () => {
    const whoPresetIds = [
      "who_growth_module",
      "who_growth_percentiles",
      "bmi_percentile",
      "head_circumference_percentile"
    ];

    for (const id of whoPresetIds) {
      const tool = getTool(id);

      expect(tool?.implementationStatus).toBe("partially_implemented");
      expect(tool?.calculationStatus).toBe("metadata_ready");
      expect(tool?.references.some((reference) => Boolean(getReferenceUrl(reference)))).toBe(
        true
      );
      expect(tool?.validationNotes.en).toContain("WHO");
    }

    expect(getTool("cdc_growth_percentiles")?.implementationStatus).toBe(
      "pending_validation"
    );
    expect(getTool("neonatal_growth_fenton")?.implementationStatus).toBe(
      "pending_validation"
    );
  });

  it("does not promote intensive care or mortality-oriented tools to ready without expert review", () => {
    const criticalCareIds = [
      "psofa",
      "pelod",
      "pelod_2",
      "prism_iii",
      "prism_iv",
      "pim2",
      "pim3"
    ];

    for (const id of criticalCareIds) {
      const tool = getTool(id);

      expect(tool?.implementationStatus).not.toBe("implemented");
      expect(tool?.implementationStatus).not.toBe("ready_for_implementation");
      expect(tool?.calculationStatus).not.toBe("active");
    }
  });

  it("keeps resuscitation pathways non-therapeutic and non-implemented", () => {
    const resuscitationIds = [
      "pediatric_cpr",
      "neonatal_cpr",
      "pediatric_bradycardia",
      "pediatric_tachycardia",
      "shockable_rhythm_algorithm",
      "non_shockable_rhythm_algorithm",
      "resuscitation_weight_dose_energy"
    ];

    for (const id of resuscitationIds) {
      expect(getTool(id)?.implementationStatus).not.toBe("ready_for_implementation");
      expect(getTool(id)?.implementationStatus).not.toBe("implemented");
    }
  });

  it("requires Block 8B-4 ready-for-implementation tools to keep a concrete reference url", () => {
    const blockedIds = getToolsByStatus("ready_for_implementation")
      .filter((tool) => tool.id !== "sipa")
      .map((tool) => tool.id);

    expect(blockedIds.length).toBeLessThanOrEqual(2);

    for (const id of blockedIds) {
      const tool = getTool(id);
      const hasReference = tool?.references.some((reference) =>
        Boolean(reference.doi || reference.pmid || reference.url)
      );

      expect(hasReference).toBe(true);
    }
  });

  it("does not promote protected algorithms or proprietary instruments during Block 8B-3", () => {
    const protectedIds = [
      "pediatric_cpr",
      "neonatal_cpr",
      "pediatric_bradycardia",
      "pediatric_tachycardia",
      "shockable_rhythm_algorithm",
      "non_shockable_rhythm_algorithm",
      "wong_baker_faces",
      "bayley",
      "denver_ii",
      "resuscitation_weight_dose_energy"
    ];

    for (const id of protectedIds) {
      expect(getTool(id)?.implementationStatus).not.toBe(
        "ready_for_implementation"
      );
    }
  });

  it("keeps input IDs unique within tools that define forms", () => {
    for (const tool of clinicalTools.filter((item) => item.inputs?.length)) {
      const inputIds = tool.inputs?.map((input) => input.id) ?? [];
      expect(uniqueCount(inputIds)).toBe(inputIds.length);
    }
  });

  it("requires labels for required inputs and single-choice options", () => {
    for (const tool of clinicalTools.filter((item) => item.inputs?.length)) {
      for (const input of tool.inputs ?? []) {
        if (input.required) {
          expect(input.label.es.length).toBeGreaterThan(0);
          expect(input.label.en.length).toBeGreaterThan(0);
        }

        if (input.type === "single_choice") {
          expect(input.options?.length).toBeGreaterThan(0);
          for (const option of input.options ?? []) {
            expect(option.label.es.length).toBeGreaterThan(0);
            expect(option.label.en.length).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it("keeps prioritized ready tools prepared or explicitly noted", () => {
    const prioritizedSlugs = [
      "apgar",
      "silverman-andersen",
      "flacc",
      "qtc-bazett",
      "qtc-fridericia",
      "qtc-framingham",
      "qtc-hodges",
      "bedside-schwartz",
      "pram",
      "westley-croup-score",
      "clinical-dehydration-scale",
      "pecarn-tbi-under-2",
      "pecarn-tbi-2-or-more",
      "sipa",
      "nips"
    ];

    for (const slug of prioritizedSlugs) {
      const tool = getToolBySlug(slug);
      expect(tool).toBeDefined();
      expect(
        Boolean(tool?.inputs?.length) || tool?.validationNotes.en.length
      ).toBe(true);
    }
  });
});
