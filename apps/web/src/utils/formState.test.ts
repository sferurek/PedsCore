import { getAllTools, getToolBySlug } from "@peds-core/core";
import { describe, expect, it } from "vitest";
import {
  canPrepareResult,
  getInitialFormState,
  hasActiveForm,
  validateForm
} from "./formState";

describe("form state utilities", () => {
  it("creates an initial state for active forms", () => {
    const apgar = getToolBySlug("apgar");
    expect(apgar).toBeDefined();

    const state = getInitialFormState(apgar!);
    expect(Object.keys(state)).toContain("heart_rate");
  });

  it("detects missing required fields", () => {
    const apgar = getToolBySlug("apgar");
    const state = getInitialFormState(apgar!);
    const validation = validateForm(apgar!, state);

    expect(validation.isComplete).toBe(false);
    expect(validation.missingRequiredInputIds.length).toBeGreaterThan(0);
  });

  it("distinguishes tools with and without active forms", () => {
    const apgar = getToolBySlug("apgar");
    const comingSoonTool = getAllTools().find((tool) => !tool.inputs?.length);

    expect(hasActiveForm(apgar!)).toBe(true);
    expect(hasActiveForm(comingSoonTool!)).toBe(false);
  });

  it("does not prepare results until required fields are complete", () => {
    const flacc = getToolBySlug("flacc");
    const state = getInitialFormState(flacc!);

    expect(canPrepareResult(flacc!, state)).toBe(false);
  });
});
