import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getBrowserLanguage,
  isSupportedLanguage,
  resolveInitialLanguage
} from "./language";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("language utilities", () => {
  it("detects supported languages", () => {
    expect(isSupportedLanguage("es")).toBe(true);
    expect(isSupportedLanguage("en")).toBe(true);
    expect(isSupportedLanguage("fr")).toBe(false);
  });

  it("resolves ES and EN from browser or localStorage", () => {
    vi.stubGlobal("navigator", { language: "es-ES" });
    vi.stubGlobal("localStorage", { getItem: () => null });
    expect(getBrowserLanguage()).toBe("es");
    expect(resolveInitialLanguage()).toBe("es");

    vi.stubGlobal("localStorage", { getItem: () => "en" });
    expect(resolveInitialLanguage()).toBe("en");
  });
});

