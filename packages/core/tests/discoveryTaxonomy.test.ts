import { describe, expect, it } from "vitest";
import {
  clinicalComparisonGroups,
  clinicalTools,
  getToolDiscovery,
  toolDiscoveryById
} from "../src/index";

describe("clinical discovery taxonomy", () => {
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

  it("matches the final v12 surface disposition counts", () => {
    const statuses = Object.values(toolDiscoveryById).map(
      (metadata) => metadata.surfaceStatus
    );

    expect(statuses.filter((status) => status === "active")).toHaveLength(118);
    expect(statuses.filter((status) => status === "draft")).toHaveLength(1);
    expect(statuses.filter((status) => status === "blocked")).toHaveLength(14);
    expect(statuses.filter((status) => status === "deprecated")).toHaveLength(3);
    expect(
      Object.values(toolDiscoveryById).filter(
        (metadata) => metadata.calculationAvailability === "local_active"
      )
    ).toHaveLength(31);
  });

  it("does not expose removed final surfaces through discovery", () => {
    for (const id of removedFinalSurfaceIds) {
      expect(toolDiscoveryById[id], id).toBeUndefined();
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
    for (const id of ["wong_baker_faces", "flacc", "rflacc", "chaq", "pedmidas"]) {
      const status = getToolDiscovery(id)?.calculationAvailability;
      expect(status).not.toBe("local_active");
    }
  });

  it("keeps every alias normalized for deterministic matching", () => {
    for (const [id, discovery] of Object.entries(toolDiscoveryById)) {
      for (const alias of [...discovery.aliases.es, ...discovery.aliases.en]) {
        expect(alias, id).toBe(alias.trim().toLocaleLowerCase());
        expect(alias, id).not.toMatch(/\s{2,}/);
      }
    }
  });

  it("marks current calculators as locally active where applicable", () => {
    for (const id of ["apgar","pram","sipa","qtc_bazett","bedside_schwartz","bedside_pews"]) {
      expect(getToolDiscovery(id)?.calculationAvailability).toBe("local_active");
    }
  });
});
