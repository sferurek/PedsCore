import { getAllTools, getToolBySlug } from "@peds-core/core";
import { describe, expect, it } from "vitest";
import { defaultFilters, filterTools } from "./filterTools";

describe("tool filtering", () => {
  it("can access the full catalog from the web app", () => {
    expect(getAllTools().length).toBe(78);
  });

  it("resolves a tool by slug", () => {
    expect(getToolBySlug("apgar")?.id).toBe("apgar");
  });

  it("filters by category, status, type and query", () => {
    const allTools = getAllTools();
    const filteredTools = filterTools(
      allTools,
      {
        ...defaultFilters,
        query: "PECARN",
        category: "emergency",
        type: "clinical_rule",
        status: "implemented"
      },
      "en"
    );

    expect(filteredTools.map((tool) => tool.slug)).toEqual([
      "pecarn-tbi-under-2",
      "pecarn-tbi-2-or-more"
    ]);
  });
});
