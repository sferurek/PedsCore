import { describe, expect, it } from "vitest";
import { getToolBySlug } from "@peds-core/core";
import { getInputSummary } from "./formState";
import { localizeInputUnit } from "./inputUnits";

describe("input unit wording", () => {
  it("localizes PELOD-2 age without changing the value", () => {
    const age = getToolBySlug("pelod-2")!.inputs!.find(input => input.id === "age_months")!;
    expect(getInputSummary(age, 60, "en")).toBe("60 months");
    expect(getInputSummary(age, 60, "es")).toBe("60 meses");
  });
  it("preserves physical units and unknown wording", () => {
    expect(localizeInputUnit("µmol/L", "en")).toBe("µmol/L");
    expect(localizeInputUnit("0-1", "es")).toBe("0-1");
    expect(localizeInputUnit(undefined, "en")).toBeUndefined();
  });
});
