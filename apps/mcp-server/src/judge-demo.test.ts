import { describe, expect, it } from "vitest";
import { judgeDemoHtml } from "./judge-demo.js";

describe("judge demo", () => {
  it("keeps the six-step guided workflow present", () => {
    const tools = [
      "discovery",
      "metadata",
      "apgar",
      "sim",
      "findings",
      "decision"
    ];

    for (const tool of tools) {
      expect(judgeDemoHtml).toContain(`data-demo="${tool}"`);
      expect(judgeDemoHtml).toContain(`data-trace="${tool}"`);
    }

    for (let step = 0; step <= 6; step += 1) {
      expect(judgeDemoHtml).toContain(`data-screen="${step}"`);
    }
  });

  it("contains syntactically valid embedded JavaScript", () => {
    const match = judgeDemoHtml.match(/<script>([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();

    const script = match?.[1] ?? "";
    expect(() => new Function(script)).not.toThrow();
  });

  it("preserves the production MCP path and deterministic demo calls", () => {
    expect(judgeDemoHtml).toContain("fetch('/mcp'");
    expect(judgeDemoHtml).toContain("calculate_clinical_score");
    expect(judgeDemoHtml).toContain("start_simulation_case");
    expect(judgeDemoHtml).toContain("get_patient_findings");
    expect(judgeDemoHtml).toContain("submit_triage_decision");
    expect(judgeDemoHtml).toContain("JS-MOB-01");
  });
});
