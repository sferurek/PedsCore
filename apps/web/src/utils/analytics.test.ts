import { describe, expect, it, afterEach, vi } from "vitest";
import {
  createAnalyticsPayload,
  getUsageCounterEventNames,
  getAnalyticsProvider,
  isAnalyticsEnabled,
  normalizeAnalyticsPath,
  sanitizeAnalyticsParams,
  trackPageView,
  trackUsageEvent
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
    vi.stubEnv("VITE_ANALYTICS_DOMAIN", "peds-core.vercel.app");
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

  it("sanitizes event parameters to categorical allowlisted fields", () => {
    const params = sanitizeAnalyticsParams({
      toolId: "apgar",
      toolType: "score",
      category: "neonatology",
      status: "implemented",
      hasQuery: true,
      // Unknown values are intentionally not part of the analytics contract.
      clinicalNote: "patient has fever",
      searchQuery: "free text"
    } as never);

    expect(params).toEqual({
      toolId: "apgar",
      toolType: "score",
      category: "neonatology",
      status: "implemented",
      hasQuery: true
    });
    expect(JSON.stringify(params)).not.toContain("fever");
    expect(JSON.stringify(params)).not.toContain("free text");
  });

  it("rejects unsupported analytics providers", () => {
    vi.stubEnv("VITE_ANALYTICS_PROVIDER", "unsupported_provider");

    expect(getAnalyticsProvider()).toBe("none");
    expect(isAnalyticsEnabled()).toBe(false);
  });

  it("does not need cookies or localStorage to track a route", () => {
    vi.stubEnv("VITE_ANALYTICS_PROVIDER", "plausible");
    vi.stubEnv("VITE_ANALYTICS_DOMAIN", "peds-core.vercel.app");
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
    expect(plausible).toHaveBeenCalledWith("screen_view", {
      props: {
        path: "/es/tools",
        language: "es",
        provider: "plausible",
        eventName: "screen_view",
        routeKind: "tools"
      }
    });
  });

  it("tracks allowed product events without clinical values", () => {
    vi.stubEnv("VITE_ANALYTICS_PROVIDER", "umami");
    vi.stubEnv("VITE_UMAMI_WEBSITE_ID", "public-website-id");
    vi.stubEnv("VITE_ANALYTICS_SCRIPT_URL", "https://analytics.example/script.js");

    const track = vi.fn();
    vi.stubGlobal("window", {
      umami: { track },
      location: { pathname: "/es/tools/apgar" }
    });

    trackUsageEvent("score_calculated", "/es/tools/apgar?score=10", "es", {
      toolId: "apgar",
      toolType: "score",
      category: "neonatology",
      status: "implemented"
    });

    expect(track).toHaveBeenCalledWith("score_calculated", {
      path: "/es/tools/apgar",
      language: "es",
      provider: "umami",
      eventName: "score_calculated",
      toolId: "apgar",
      toolType: "score",
      category: "neonatology",
      status: "implemented"
    });
    expect(JSON.stringify(track.mock.calls)).not.toContain("score=10");
  });

  it("documents usage counter windows for provider dashboards", () => {
    expect(getUsageCounterEventNames("last_7_days")).toHaveLength(9);
    expect(getUsageCounterEventNames("all_time").map((event) => event.eventName))
      .toEqual([
        "app_open",
        "screen_view",
        "search_used",
        "case_opened",
        "case_completed",
        "score_calculated",
        "protocol_opened",
        "favorite_added",
        "share_used"
      ]);
  });
});
