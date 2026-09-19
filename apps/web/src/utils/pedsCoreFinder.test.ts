import { describe, expect, it } from "vitest";
import { getAllTools } from "@peds-core/core";
import type { ClinicalToolMetadata } from "@peds-core/core";
import { runPedsCoreFinder } from "./pedsCoreFinder";

const tool = (
  id: string,
  name: string,
  population: string,
  description: string
): ClinicalToolMetadata => ({
  id,
  slug: id,
  name: { es: name, en: name },
  category: "emergency",
  subcategory: "test",
  type: "score",
  population: { es: population, en: population },
  description: { es: description, en: description },
  implementationStatus: "implemented",
  regulatoryRisk: "medium",
  evidenceLevel: "high",
  references: [],
  validationNotes: { es: "", en: "" },
  disclaimerRequired: true
});

describe("PedsCore Finder", () => {
  it("prioritizes PRAM for acute asthma severity", () => {
    const result = runPedsCoreFinder(
      getAllTools(),
      "niño de 8 años con crisis de asma, quiero valorar gravedad",
      "es"
    );

    expect(result.matches[0]?.tool.id).toBe("pram");
  });

  it("applies the PECARN age branch", () => {
    const tools = [
      tool("pecarn_tbi_under_2", "PECARN <2", "Under 2 years", "Head trauma"),
      tool("pecarn_tbi_2_or_more", "PECARN >=2", "2 years or older", "Head trauma")
    ];
    const result = runPedsCoreFinder(tools, "TCE en niño de 3 años", "es");

    expect(result.matches[0]?.tool.id).toBe("pecarn_tbi_2_or_more");
  });

  it("excludes the incompatible PECARN branch from catalog results", () => {
    const result = runPedsCoreFinder(getAllTools(), "TCE en niño de 3 años", "es");

    expect(result.matches.map((match) => match.tool.id)).toContain("pecarn_tbi_2_or_more");
    expect(result.matches.map((match) => match.tool.id)).not.toContain("pecarn_tbi_under_2");
    expect(result.excluded.map((match) => match.tool.id)).toContain("pecarn_tbi_under_2");
  });

  it("ranks PRAM for an English acute-asthma severity query", () => {
    const result = runPedsCoreFinder(getAllTools(), "8 year old with acute asthma severity", "en");

    expect(result.matches[0]?.tool.id).toBe("pram");
  });

  it("asks for clarification when asthma intent is ambiguous", () => {
    const result = runPedsCoreFinder(getAllTools(), "child with asthma", "en");

    expect(result.clarification?.options).toContain("Current episode severity");
  });

  it("prioritizes PCDAI for a Crohn disease flare", () => {
    const result = runPedsCoreFinder(getAllTools(), "Brote de Crohn", "es");

    expect(["pcdai", "wpcdai"]).toContain(result.matches[0]?.tool.id);
  });

  it("finds both bone-age reference methods", () => {
    const result = runPedsCoreFinder(getAllTools(), "Edad ósea por radiografía de mano", "es");
    const ids = result.matches.map((match) => match.tool.id);

    expect(ids).toContain("greulich_pyle");
    expect(ids).toContain("tw3");
  });

  it("finds pediatric delirium references", () => {
    const result = runPedsCoreFinder(getAllTools(), "Ventilated child, delirium assessment", "en");

    expect(result.matches.map((match) => match.tool.id)).toContain("capd");
  });

  it("excludes PECARN febrile infant outside its age range", () => {
    const result = runPedsCoreFinder(getAllTools(), "90 day old febrile infant", "en");

    expect(result.excluded.map((match) => match.tool.id)).toContain("pecarn_febrile_infant");
  });

  it("finds named neonatal pain references without promoting rights-blocked scales", () => {
    const general = runPedsCoreFinder(getAllTools(), "valoración de dolor neonatal", "es");
    const prolonged = runPedsCoreFinder(getAllTools(), "dolor neonatal prolongado", "es");
    const facial = runPedsCoreFinder(getAllTools(), "NFCS para dolor neonatal", "es");
    const sedation = runPedsCoreFinder(getAllTools(), "N-PASS dolor y sedación neonatal", "es");
    const ids = general.matches.map((match) => match.tool.id);

    expect(ids).toEqual(expect.arrayContaining(["nips", "pipp_r", "cries", "nfcs"]));
    expect(prolonged.matches[0]?.tool.id).toBe("edin");
    expect(facial.matches[0]?.tool.id).toBe("nfcs");
    expect(sedation.matches[0]?.tool.id).toBe("n_pass");
  });

  it("finds the juvenile myositis comparison group", () => {
    const result = runPedsCoreFinder(getAllTools(), "miositis juvenil", "es");
    const ids = result.matches.map((match) => match.tool.id);

    expect(ids).toEqual(
      expect.arrayContaining(["cmas", "mmt8", "jdm_disease_activity_score", "myositis_damage_index"])
    );
  });

  it("finds named asthma-control instruments", () => {
    const result = runPedsCoreFinder(getAllTools(), "control del asma ACQ", "es");
    const ids = result.matches.map((match) => match.tool.id);

    expect(ids).toEqual(expect.arrayContaining(["c_act", "track", "acq"]));
    expect(ids[0]).toBe("acq");
  });

  it("keeps the weighted Crohn surface beside PCDAI", () => {
    const result = runPedsCoreFinder(getAllTools(), "actividad de brote de Crohn", "es");
    const ids = result.matches.map((match) => match.tool.id);

    expect(ids).toEqual(expect.arrayContaining(["pcdai", "wpcdai"]));
  });

  it("finds PedMIDAS for pediatric migraine disability", () => {
    const result = runPedsCoreFinder(getAllTools(), "discapacidad por migraña pediátrica", "es");

    expect(result.matches[0]?.tool.id).toBe("pedmidas");
  });

  it("uses FNASS instead of the removed generic Finnegan placeholder", () => {
    const result = runPedsCoreFinder(getAllTools(), "abstinencia neonatal", "es");
    const ids = result.matches.map((match) => match.tool.id);

    expect(ids).toContain("fnass_21");
    expect(ids).not.toContain("modified_finnegan");
  });

  it("returns named PEWS and mass-casualty surfaces instead of generic placeholders", () => {
    const pews = runPedsCoreFinder(getAllTools(), "PEWS", "en");
    const triage = runPedsCoreFinder(
      getAllTools(),
      "triaje pediátrico en incidente con múltiples víctimas",
      "es"
    );

    expect(pews.matches.map((match) => match.tool.id)).toEqual(
      expect.arrayContaining(["bedside_pews", "brighton_pews"])
    );
    expect(pews.matches.map((match) => match.tool.id)).not.toContain("pews");
    expect(triage.matches.map((match) => match.tool.id)).toEqual(
      expect.arrayContaining(["jumpstart", "salt_triage"])
    );
    expect(triage.matches.map((match) => match.tool.id)).not.toContain("mass_casualty_triage");
  });
});
