import { describe, expect, it, afterEach, vi } from "vitest";
import {
  createAnalyticsPayload,
  getAnalyticsProvider,
  isAnalyticsEnabled,
  normalizeAnalyticsPath,
  trackPageView
} from "./analytics";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("privacy-first analytics utilities", () => {
  it("keeps analytics disabled by default", () => {
    expect(getAnalyticsProvider()).toBe("none");
    expect(isAnalyticsEnabled()).toBe(false);
    expect(createAnalyticsPayload("/es/tools", "es")).toBeNull();
  });

  it("does not fail when provider is none", () => {
    expect(() => trackPageView("/es/tools", "es")).not.toThrow();
  });

  it("creates only the allowed aggregate payload fields", () => {
    vi.stubEnv("VITE_ANALYTICS_PROVIDER", "plausible");
    vi.stubEnv("VITE_ANALYTICS_DOMAIN", "sferurek.github.io");
    vi.stubEnv("VITE_ANALYTICS_SCRIPT_URL", "https://analytics.example/script.js");

    const payload = createAnalyticsPayload(
      "/es/tools/apgar?height_cm=120&result=10#form",
      "es"
    );

    expect(payload).toEqual({
      path: "/es/tools/apgar",
      language: "es",
      provider: "plausible"
    });
    expect(Object.keys(payload ?? {}).sort()).toEqual([
      "language",
      "path",
      "provider"
    ]);
    expect(JSON.stringify(payload)).not.toContain("height_cm");
    expect(JSON.stringify(payload)).not.toContain("result");
  });

  it("normalizes route paths without query strings or fragments", () => {
    expect(normalizeAnalyticsPath("/en/tools/sipa?x=1#result")).toBe(
      "/en/tools/sipa"
    );
  });

  it("rejects unsupported analytics providers", () => {
    vi.stubEnv("VITE_ANALYTICS_PROVIDER", "unsupported_provider");

    expect(getAnalyticsProvider()).toBe("none");
    expect(isAnalyticsEnabled()).toBe(false);
  });

  it("does not need cookies or localStorage to track a route", () => {
    vi.stubEnv("VITE_ANALYTICS_PROVIDER", "plausible");
    vi.stubEnv("VITE_ANALYTICS_DOMAIN", "sferurek.github.io");
    vi.stubEnv("VITE_ANALYTICS_SCRIPT_URL", "https://analytics.example/script.js");

    const plausible = vi.fn();
    vi.stubGlobal("window", {
      plausible,
      location: { pathname: "/es/tools" }
    });
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("analytics must not read localStorage");
      },
      setItem: () => {
        throw new Error("analytics must not write localStorage");
      }
    });

    expect(() => trackPageView("/es/tools", "es")).not.toThrow();
    expect(plausible).toHaveBeenCalledWith("pageview", {
      props: {
        path: "/es/tools",
        language: "es",
        provider: "plausible"
      }
    });
  });
});
