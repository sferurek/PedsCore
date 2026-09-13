import { describe, expect, it } from "vitest";
import {
  clinicalComparisonGroups,
  clinicalTools,
  getToolDiscovery,
  toolDiscoveryById
} from "../src/index";

describe("clinical discovery taxonomy", () => {
  it("tags every catalog tool", () => {
    expect(Object.keys(toolDiscoveryById)).toHaveLength(clinicalTools.length);

    for (const tool of clinicalTools) {
      const discovery = getToolDiscovery(tool.id);
      expect(discovery, tool.id).toBeDefined();
      expect(discovery?.specialties.length, tool.id).toBeGreaterThan(0);
      expect(discovery?.clinicalProblems.length, tool.id).toBeGreaterThan(0);
      expect(discovery?.ageGroups.length, tool.id).toBeGreaterThan(0);
      expect(discovery?.careSettings.length, tool.id).toBeGreaterThan(0);
      expect(discovery?.clinicalFunctions.length, tool.id).toBeGreaterThan(0);
      expect(discovery?.interactionModes.length, tool.id).toBeGreaterThan(0);
      expect(discovery?.surfaceStatus, tool.id).toBeDefined();
      expect(discovery?.inputModalities.length, tool.id).toBeGreaterThan(0);
      expect(discovery?.calculationAvailability, tool.id).toBeDefined();
      expect(discovery?.reuseStatus, tool.id).toBeDefined();
      expect(discovery?.clinicalRiskTier, tool.id).toBeDefined();
      expect(discovery?.exclusions, tool.id).toBeDefined();
      expect(discovery?.aliases.es.length, tool.id).toBeGreaterThan(0);
      expect(discovery?.aliases.en.length, tool.id).toBeGreaterThan(0);
    }
  });

  it("does not create discovery entries for missing catalog tools", () => {
    const catalogIds = new Set(clinicalTools.map((tool) => tool.id));
    for (const id of Object.keys(toolDiscoveryById)) {
      expect(catalogIds.has(id), id).toBe(true);
    }
  });

  it("keeps discovery relationships resolvable", () => {
    const catalogIds = new Set(clinicalTools.map((tool) => tool.id));
    for (const [id, discovery] of Object.entries(toolDiscoveryById)) {
      for (const relatedId of discovery.relatedToolIds) {
        expect(catalogIds.has(relatedId), `${id} -> ${relatedId}`).toBe(true);
      }
      for (const groupId of discovery.comparisonGroupIds) {
        expect(clinicalComparisonGroups[groupId as keyof typeof clinicalComparisonGroups], `${id} -> ${groupId}`).toBeDefined();
      }
    }
  });

  it("keeps key comparison groups clinically distinct", () => {
    expect(getToolDiscovery("pram")?.comparisonGroupIds).toContain("acute_asthma_severity");
    expect(getToolDiscovery("pass")?.comparisonGroupIds).toContain("acute_asthma_severity");
    expect(getToolDiscovery("rdai")?.comparisonGroupIds).toContain("bronchiolitis_severity");
    expect(getToolDiscovery("brosjod")?.comparisonGroupIds).toContain("bronchiolitis_severity");
    expect(getToolDiscovery("sarnat")?.comparisonGroupIds).toContain("neonatal_encephalopathy");
    expect(getToolDiscovery("thompson_hie")?.comparisonGroupIds).toContain("neonatal_encephalopathy");
  });

  it("keeps external or rights-blocked tools out of local active calculation", () => {
    for (const id of ["wong_baker_faces", "flacc", "rflacc"]) {
      const status = getToolDiscovery(id)?.calculationAvailability;
      expect(status).not.toBe("local_active");
    }
  });

  it("reconciles the final v12 physical surface set", () => {
    expect(clinicalTools).toHaveLength(132);

    for (const removedId of [
      "combined_apgar","modified_finnegan","pews","benes","glasgow_adapted",
      "regional_sepsis_scores","resuscitation_weight_dose_energy",
      "mass_casualty_triage","adolescent_depression_risk",
      "adolescent_behavior_risk","bayley","denver_ii"
    ]) {
      expect(clinicalTools.some((tool) => tool.id === removedId), removedId).toBe(false);
      expect(getToolDiscovery(removedId), removedId).toBeUndefined();
    }

    for (const addedId of [
      "comfort_b","n_pass","edin","nfcs","cmas","mmt8","chaq","j4s",
      "jdm_disease_activity_score","myositis_damage_index","pgals","prems",
      "modified_ross","pedmidas","scared","psc","acq","wpcdai","fnass_21"
    ]) {
      expect(clinicalTools.some((tool) => tool.id === addedId), addedId).toBe(true);
      expect(getToolDiscovery(addedId)?.surfaceStatus, addedId).toBe("active");
    }
  });

  it("separates active references from local calculations", () => {
    const discovery = Object.values(toolDiscoveryById);
    expect(discovery.filter((item) => item.surfaceStatus === "active")).toHaveLength(114);
    expect(discovery.filter((item) => item.surfaceStatus === "draft")).toHaveLength(2);
    expect(discovery.filter((item) => item.surfaceStatus === "blocked")).toHaveLength(13);
    expect(discovery.filter((item) => item.surfaceStatus === "deprecated")).toHaveLength(3);
    expect(discovery.filter((item) => item.calculationAvailability === "local_active")).toHaveLength(24);
    expect(getToolDiscovery("flacc")?.surfaceStatus).toBe("blocked");
    expect(getToolDiscovery("flacc")?.calculationAvailability).toBe("blocked_by_rights");
    expect(getToolDiscovery("wpcdai")?.surfaceStatus).toBe("active");
    expect(getToolDiscovery("wpcdai")?.calculationAvailability).toBe("local_planned");
  });

  it("marks current calculators as locally active where applicable", () => {
    for (const id of ["apgar","pram","sipa","qtc_bazett","bedside_schwartz"]) {
      expect(getToolDiscovery(id)?.calculationAvailability).toBe("local_active");
    }
  });
});
