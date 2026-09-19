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
  "who_growth_module",
  "who_growth_percentiles",
  "bmi_percentile",
  "head_circumference_percentile",
  "cdc_growth_percentiles",
  "strongkids",
  "visual_analogue_scale",
  "step_by_step",
  "pecarn_febrile_infant",
  "yos",
  "pucai",
  "pcdai",
  "pass",
  "gorelick_dehydration",
  "prifle",
  "pelod_2",
  "prism_iv",
  "pim3",
  "modified_tal",
  "taussig_croup",
  "risc",
  "mrisc",
  "kdigo_pediatric",
  "phoenix_sepsis",
  "parc",
  "bacterial_meningitis_score",
  "ckid_u25",
  "modified_bell_nec",
  "nsofa",
  "wpcdai"
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
  const removedFinalSurfaceIds = [
    "combined_apgar",
    "modified_finnegan",
    "pews",
    "benes",
    "glasgow_adapted",
    "regional_sepsis_scores",
    "resuscitation_weight_dose_energy",
    "mass_casualty_triage",
    "adolescent_depression_risk",
    "adolescent_behavior_risk",
    "bayley",
    "denver_ii"
  ];

  const reconciliationSurfaceIds = [
    "comfort_b",
    "n_pass",
    "edin",
    "nfcs",
    "cmas",
    "mmt8",
    "chaq",
    "j4s",
    "jdm_disease_activity_score",
    "myositis_damage_index",
    "pgals",
    "prems",
    "modified_ross",
    "pedmidas",
    "scared",
    "psc",
    "acq",
    "wpcdai",
    "fnass_21"
  ];

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
    expect(getImplementedTools()).toHaveLength(60);
  });

  it("keeps the final locally implemented tool set clinically bounded", () => {
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
    expect(originalReference?.doi).toBe("10.1213/00000539-195301000-00041");
    expect(getReferenceUrl(originalReference!)).toBe(
      "https://doi.org/10.1213/00000539-195301000-00041"
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

  it("reconciles the physical catalog to the v12 final surface set", () => {
    expect(clinicalTools).toHaveLength(137);
    for (const id of removedFinalSurfaceIds) {
      expect(clinicalTools.some((tool) => tool.id === id), id).toBe(false);
    }
    for (const id of reconciliationSurfaceIds) {
      expect(clinicalTools.some((tool) => tool.id === id), id).toBe(true);
    }
  });

  it("removes generic PEWS while retaining named PEWS surfaces", () => {
    expect(getToolBySlug("pews")).toBeUndefined();
    expect(getTool("bedside_pews")).toBeDefined();
    expect(getTool("brighton_pews")).toBeDefined();
  });

  it("does not include toxicology tools in the catalog", () => {
    const toxicologySurfaces = clinicalTools.filter((tool) =>
      [tool.id, tool.slug, tool.category, tool.subcategory]
        .filter(Boolean)
        .some((value) => /^toxic(?:ology)?(?:_|-|$)/i.test(String(value)))
    );

    expect(toxicologySurfaces).toEqual([]);
  });

  it("activates New Ballard as numeric-only implementation with external visual reference", () => {
    const tool = getTool("ballard");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(12);
    expect(tool?.validationNotes.en).toContain("does not reproduce");
    expect(tool?.references.some((reference) => reference.pmid === "1880657")).toBe(true);
  });

  it("publishes classic and Modified Sarnat as distinct completed tools", () => {
    const classic = getTool("sarnat");
    const modified = getTool("modified_sarnat_nichd");

    expect(classic?.implementationStatus).toBe("implemented");
    expect(classic?.calculationStatus).not.toBe("active");
    expect(modified?.implementationStatus).toBe("implemented");
    expect(modified?.calculationStatus).toBe("active");
    expect(modified?.inputs).toHaveLength(6);
    expect(classic?.validationNotes.en).toContain("published separately");
    expect(modified?.validationNotes.en).toContain("0-18 Total Sarnat Score");
  });

  it("publishes Thompson HIE as an active nine-domain score with transparent banding variability", () => {
    const tool = getTool("thompson_hie");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(9);
    expect(tool?.interpretationBands?.map((band) => band.id)).toEqual(["normal","mild","moderate","severe"]);
    expect(tool?.validationNotes.en).toContain("Some publications instead separate 0-7");
    expect(tool?.references.some((reference) => reference.pmid === "9240886")).toBe(true);
  });

  it("publishes CRIES as an active five-domain neonatal pain score", () => {
    const tool = getTool("cries");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(5);
    expect(tool?.interpretationBands?.map((band) => band.id)).toEqual([
      "below_moderate_threshold",
      "moderate",
      "severe"
    ]);
    expect(tool?.validationNotes.en).toContain("independently worded criteria");
    expect(tool?.references.some((reference) => reference.pmid === "8521311")).toBe(true);
  });

  it("publishes Fenton 2025 as the active external preterm-growth surface", () => {
    const current = getTool("fenton_2025_growth");
    const legacy = getTool("neonatal_growth_fenton");

    expect(current?.implementationStatus).toBe("implemented");
    expect(current?.calculationStatus).not.toBe("active");
    expect(current?.references.some((reference) => reference.doi === "10.1111/ppe.70035")).toBe(true);
    expect(current?.validationNotes.en).toContain("PediTools");
    expect(legacy?.implementationStatus).toBe("pending_validation");
    expect(legacy?.validationNotes.en).toContain("Legacy Fenton 2013");
  });

  it("activates Bedside PEWS under CC BY 2.0 with local calculation", () => {
    const tool = getTool("bedside_pews");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(8);
    expect(tool?.validationNotes.en).toContain("CC BY 2.0");
    expect(tool?.references.some((reference) => reference.doi === "10.1186/cc7998")).toBe(true);
    expect(tool?.references.some((reference) => reference.doi === "10.1186/cc10337")).toBe(true);
  });

  it("publishes AAP 2022 hyperbilirubinemia as active external decision support", () => {
    const tool = getTool("aap_2022_hyperbilirubinemia");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).not.toBe("active");
    expect(tool?.references.some((reference) => reference.doi === "10.1542/peds.2022-058859")).toBe(true);
    expect(tool?.validationNotes.en).toContain("PediTools API");
  });

  it("keeps Bhutani pending while CDC Growth is active after its evidence gate", () => {
    const bhutani = getTool("bhutani_nomogram");
    expect(bhutani?.implementationStatus).toBe("pending_validation");
    expect(bhutani?.calculationStatus).not.toBe("active");

    const cdc = getTool("cdc_growth_percentiles");
    expect(cdc?.implementationStatus).toBe("implemented");
    expect(cdc?.calculationStatus).toBe("active");
    expect(cdc?.references.some((reference) => Boolean(getReferenceUrl(reference)))).toBe(true);
    expect(cdc?.validationNotes.en).toContain("Extended BMI");
  });

  it("does not promote license-sensitive pending tools to ready for implementation", () => {
    const licenseSensitivePendingIds = [
      "bhutani_nomogram",
      "pipp",
      "pipp_r",
      "comfortneo",
      "brighton_pews",
      "orbegozo_growth_percentiles",
      "stamp",
      "pyms"
    ];

    for (const id of licenseSensitivePendingIds) {
      expect(getTool(id)?.implementationStatus).not.toBe(
        "ready_for_implementation"
      );
    }
  });

  it("keeps Block 8B-2 reviewed tools non-operational until source, table, variant, and licensing gates are complete", () => {
    const reviewedPendingIds = [
      "pipp_r",
      "comfortneo",
      "pediatric_gcs"
    ];

    for (const id of reviewedPendingIds) {
      const tool = getTool(id);

      expect(tool?.implementationStatus).toBe("pending_validation");
      expect(tool?.calculationStatus).not.toBe("active");
    }

    for (const id of [
      "pipp",
      "brighton_pews",
      "orbegozo_growth_percentiles",
      "stamp",
      "pyms"
    ]) {
      const tool = getTool(id);
      expect(tool?.implementationStatus).toBe("not_implemented_due_to_licensing");
      expect(tool?.calculationStatus).not.toBe("active");
    }
  });

  it("activates STRONGkids with the verified independent scoring implementation", () => {
    const tool = getTool("strongkids");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(4);
    expect(tool?.interpretationBands).toHaveLength(3);
    expect(tool?.validationNotes.en).toContain("1+2+1+1");
  });

  it("keeps variant-sensitive Block 8B-2 tools explicitly blocked", () => {
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


  it("activates Dubowitz as an independent numeric implementation without reproducing protected source material", () => {
    const tool = getTool("dubowitz");

    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs).toHaveLength(21);
    expect(tool?.validationNotes.en).toContain("does not reproduce");
    expect(tool?.references.some((reference) => reference.doi === "10.1016/S0022-3476(70)80038-5")).toBe(true);
  });

  it("keeps Block 8B-3 table, variant, licensing, and expert-review tools blocked", () => {
    const blockedIds = [
      "neonatal_growth_fenton",
      "rdai",
      "brosjod",
      "rflacc",
      "cheops"
    ];

    for (const id of blockedIds) {
      const tool = getTool(id);

      expect(tool?.implementationStatus).not.toBe("ready_for_implementation");
      expect(tool?.implementationStatus).not.toBe("implemented");
      expect(tool?.calculationStatus).not.toBe("active");
    }
  });

  it("activates EVA as a 100-mm pediatric self-report scale without universal severity bands", () => {
    const tool = getTool("visual_analogue_scale");
    expect(tool?.implementationStatus).toBe("implemented");
    expect(tool?.calculationStatus).toBe("active");
    expect(tool?.inputs?.[0]?.id).toBe("pain_vas_mm");
    expect(tool?.inputs?.[0]?.max).toBe(100);
    expect(tool?.validationNotes.en).toContain("100-mm");
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

    for (const id of ["gorelick_dehydration"]) {
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
      "prism_iii",
      "prism_iv"
    ];

    for (const id of blockedByLicenseIds) {
      expect(getTool(id)?.implementationStatus).not.toBe("ready_for_implementation");
    }
  });

  it("keeps Block 8B-4 maintainer-dependent tools out of ready/implemented state", () => {
    const maintainerDependentIds = [
      "pediatric_gcs",
      "pim2",
      "pim3",
      "prism_iii",
      "prism_iv"
    ];

    for (const id of maintainerDependentIds) {
      expect(
        ["ready_for_implementation", "implemented"].includes(
          getTool(id)?.implementationStatus ?? ""
        )
      ).toBe(false);
    }
  });

  it("tracks WHO Growth module and presets as implemented wrappers", () => {
    const whoPresetIds = [
      "who_growth_module",
      "who_growth_percentiles",
      "bmi_percentile",
      "head_circumference_percentile"
    ];

    for (const id of whoPresetIds) {
      const tool = getTool(id);

      expect(tool?.implementationStatus).toBe("implemented");
      expect(tool?.calculationStatus).toBe("active");
      expect(tool?.references.some((reference) => Boolean(getReferenceUrl(reference)))).toBe(
        true
      );
      expect(tool?.validationNotes.en).toContain("WHO");
    }

    expect(getTool("cdc_growth_percentiles")?.implementationStatus).toBe(
      "implemented"
    );
    expect(getTool("cdc_growth_percentiles")?.calculationStatus).toBe("active");
    expect(getTool("neonatal_growth_fenton")?.implementationStatus).toBe(
      "pending_validation"
    );
  });

  it("does not promote intensive care or mortality-oriented tools to ready without expert review", () => {
    const criticalCareIds = [
      "psofa",
      "pelod",
      "prism_iii",
      "pim2"
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
      "non_shockable_rhythm_algorithm"
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
      "wong_baker_faces"
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