import type { Language } from "./language";

export type AnalyticsProvider = "none" | "plausible" | "umami" | "cloudflare";

export interface AnalyticsPayload {
  path: string;
  language: Language;
  provider: Exclude<AnalyticsProvider, "none">;
}

interface AnalyticsConfig {
  provider: AnalyticsProvider;
  domain?: string;
  scriptUrl?: string;
  umamiWebsiteId?: string;
  cloudflareToken?: string;
}

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: AnalyticsPayload }) => void;
    umami?: {
      track?: (eventName: string, data?: AnalyticsPayload) => void;
    };
  }
}

const providerValues = ["none", "plausible", "umami", "cloudflare"] as const;

const normalizeProvider = (value: unknown): AnalyticsProvider =>
  typeof value === "string" && providerValues.includes(value as AnalyticsProvider)
    ? (value as AnalyticsProvider)
    : "none";

export const getAnalyticsConfig = (): AnalyticsConfig => ({
  provider: normalizeProvider(import.meta.env.VITE_ANALYTICS_PROVIDER),
  domain: import.meta.env.VITE_ANALYTICS_DOMAIN,
  scriptUrl: import.meta.env.VITE_ANALYTICS_SCRIPT_URL,
  umamiWebsiteId: import.meta.env.VITE_UMAMI_WEBSITE_ID,
  cloudflareToken: import.meta.env.VITE_CLOUDFLARE_TOKEN
});

export const getAnalyticsProvider = (): AnalyticsProvider =>
  getAnalyticsConfig().provider;

export const isAnalyticsEnabled = (): boolean => {
  const config = getAnalyticsConfig();

  if (config.provider === "plausible") {
    return Boolean(config.domain && config.scriptUrl);
  }

  if (config.provider === "umami") {
    return Boolean(config.umamiWebsiteId && config.scriptUrl);
  }

  if (config.provider === "cloudflare") {
    return Boolean(config.cloudflareToken && config.scriptUrl);
  }

  return false;
};

export const normalizeAnalyticsPath = (path: string): string => {
  const [cleanPath] = path.split(/[?#]/);
  return cleanPath || "/";
};

export const createAnalyticsPayload = (
  path: string,
  language: Language
): AnalyticsPayload | null => {
  const provider = getAnalyticsProvider();

  if (provider === "none" || !isAnalyticsEnabled()) {
    return null;
  }

  return {
    path: normalizeAnalyticsPath(path),
    language,
    provider
  };
};

export const trackPageView = (path: string, language: Language): void => {
  const payload = createAnalyticsPayload(path, language);

  if (!payload || typeof window === "undefined") {
    return;
  }

  try {
    if (payload.provider === "plausible") {
      window.plausible?.("pageview", { props: payload });
      return;
    }

    if (payload.provider === "umami") {
      window.umami?.track?.("pageview", payload);
    }
  } catch {
    // Analytics must never break clinical tool rendering.
  }
};

export const trackLanguage = (language: Language): void => {
  if (typeof window === "undefined") {
    return;
  }

  trackPageView(window.location.pathname, language);
};

export const maybeTrackRouteChange = (path: string, language: Language): void => {
  trackPageView(path, language);
};
