import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { getAllTools } from "@peds-core/core";
import { ToolClinicalGuide } from "./ToolClinicalGuide";

describe("clinical guide tags", () => {
  it.each(["es", "en"] as const)("renders unique clinical labels without duplicate-key warnings in %s", (language) => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      for (const tool of getAllTools()) {
        const html = renderToStaticMarkup(<ToolClinicalGuide language={language} tool={tool} />);
        const tags = html.match(/<div class="clinical-guide-tags">(.*?)<\/div>/)?.[1];
        if (!tags) continue;
        const labels = [...tags.matchAll(/<span>(.*?)<\/span>/g)].map((match) => match[1]);
        expect(new Set(labels).size, tool.slug).toBe(labels.length);
        expect(labels.length).toBeLessThanOrEqual(7);
      }
      expect(error.mock.calls.filter((call) => call.some((item) => String(item).includes("same key")))).toHaveLength(0);
    } finally {
      error.mockRestore();
    }
  });
});
