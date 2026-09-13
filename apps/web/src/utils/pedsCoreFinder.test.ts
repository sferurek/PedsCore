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
    const tools = [
      tool("pram", "PRAM", "2 to <18 years", "Acute asthma severity"),
      tool("westley_croup", "Westley", "Children", "Croup severity")
    ];
    const result = runPedsCoreFinder(tools, "niño de 8 años con asma, valorar gravedad", "es");

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

    expect(result.matches[0]?.tool.id).toBe("pcdai");
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
});
