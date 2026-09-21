import { describe, expect, it } from "vitest";
import { clinicalTools } from "../catalog/clinicalTools.js";
import { implementedCalculatorToolIds } from "../calculators/registry.js";
import {
  MOBILE_CLINICAL_BUNDLE_SCHEMA_VERSION,
  createMobileClinicalBundle
} from "./clinicalBundle.js";

describe("createMobileClinicalBundle", () => {
  it("exports the canonical clinical registry without a handwritten copy", () => {
    const bundle = createMobileClinicalBundle({
      sourceRevision: "test-revision",
      generatedAt: "2026-09-20T12:00:00.000Z"
    });

    expect(bundle.schemaVersion).toBe(MOBILE_CLINICAL_BUNDLE_SCHEMA_VERSION);
    expect(bundle.sourceRevision).toBe("test-revision");
    expect(bundle.generatedAt).toBe("2026-09-20T12:00:00.000Z");
    expect(bundle.tools).toEqual(clinicalTools);
    expect(bundle.calculatorToolIds).toEqual(implementedCalculatorToolIds);
  });

  it("rejects bundles without an auditable PedsCore source revision", () => {
    expect(() => createMobileClinicalBundle({ sourceRevision: "  " })).toThrow(
      "sourceRevision is required"
    );
  });
});
