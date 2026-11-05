import { describe, expect, it } from "vitest";
import { getAllTools, getToolSeoProfile } from "@peds-core/core";
import { getStaticSeo, renderStaticBody } from "../../scripts/static-seo.mjs";

const tools = getAllTools();
const tool = tools.find((item) => item.slug === "gorelick-dehydration");

describe("Gorelick editorial consistency", () => {
  for (const locale of ["es", "en"]) {
    it(`keeps the ${locale} static and shared search snippet aligned with the active variant`, () => {
      const profile = getToolSeoProfile(tool, locale);
      const seo = getStaticSeo(`/${locale}/tools/${tool.slug}`, tools);
      expect(seo.title).toBe(profile.title);
      expect(seo.description).toBe(profile.description);
      expect(profile.title.length).toBeLessThanOrEqual(60);
      expect(profile.description.length).toBeLessThanOrEqual(158);
      expect(profile.description).not.toContain("…");
      expect(profile.description).toContain("0–10");
      expect(profile.description).toContain(locale === "es" ? "10 signos" : "10-sign");
    });

    it(`renders ${locale} variant limits and source without the obsolete blocked claim`, () => {
      const body = renderStaticBody(getStaticSeo(`/${locale}/tools/${tool.slug}`, tools), tools);
      expect(tool.calculationStatus).toBe("active");
      expect(body).toContain(locale === "es" ? "4 signos" : "4-sign");
      expect(body).toContain(locale === "es" ? "resumen original" : "original abstract");
      expect(body).toContain(locale === "es" ? "no acredita una revisión clínica independiente" : "does not establish independent clinical review");
      expect(body).not.toContain("No se implementa");
      expect(body).not.toContain("It is not implemented");
      expect(body).toContain("https://doi.org/10.1542/peds.99.5.e6");
    });
  }
});
