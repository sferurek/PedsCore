import type { Language } from "./language";

export type AnalyticsProvider = "none" | "plausible" | "umami" | "cloudflare";

export type AnalyticsEventName =
  | "app_open"
  | "screen_view"
  | "search_used"
  | "case_opened"
  | "case_completed"
  | "score_calculated"
  | "protocol_opened"
  | "favorite_added"
  | "share_used";

export type AnalyticsCounterWindow = "last_7_days" | "all_time";

export interface AnalyticsPayload {
  path: string;
  language: Language;
  provider: Exclude<AnalyticsProvider, "none">;
  eventName?: AnalyticsEventName;
  toolId?: string;
  toolType?: string;
  category?: string;
  status?: string;
  routeKind?: string;
  searchScope?: string;
  hasQuery?: boolean;
  counterWindow?: AnalyticsCounterWindow;
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
const analyticsEventNames = [
  "app_open",
  "screen_view",
  "search_used",
  "case_opened",
  "case_completed",
  "score_calculated",
  "protocol_opened",
  "favorite_added",
  "share_used"
] as const satisfies AnalyticsEventName[];
const allowedParamKeys = [
  "path",
  "language",
  "provider",
  "eventName",
  "toolId",
  "toolType",
  "category",
  "status",
  "routeKind",
  "searchScope",
  "hasQuery",
  "counterWindow"
] as const satisfies (keyof AnalyticsPayload)[];

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

const sanitizeToken = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_");

  return normalized || undefined;
};

export const sanitizeAnalyticsParams = (
  params: Partial<AnalyticsPayload>
): Partial<AnalyticsPayload> => {
  const sanitized: Partial<AnalyticsPayload> = {};

  for (const key of allowedParamKeys) {
    const value = params[key];

    if (value === undefined) {
      continue;
    }

    if (key === "path" && typeof value === "string") {
      sanitized.path = normalizeAnalyticsPath(value);
      continue;
    }

    if (key === "language" && (value === "es" || value === "en")) {
      sanitized.language = value;
      continue;
    }

    if (key === "provider" && providerValues.includes(value as AnalyticsProvider)) {
      sanitized.provider = value as Exclude<AnalyticsProvider, "none">;
      continue;
    }

    if (
      key === "eventName" &&
      analyticsEventNames.includes(value as AnalyticsEventName)
    ) {
      sanitized.eventName = value as AnalyticsEventName;
      continue;
    }

    if (key === "hasQuery" && typeof value === "boolean") {
      sanitized.hasQuery = value;
      continue;
    }

    if (
      key === "counterWindow" &&
      (value === "last_7_days" || value === "all_time")
    ) {
      sanitized.counterWindow = value;
      continue;
    }

    if (typeof value === "string") {
      const token = sanitizeToken(value);

      if (!token) {
        continue;
      }

      if (key === "toolId") {
        sanitized.toolId = token;
      }

      if (key === "toolType") {
        sanitized.toolType = token;
      }

      if (key === "category") {
        sanitized.category = token;
      }

      if (key === "status") {
        sanitized.status = token;
      }

      if (key === "routeKind") {
        sanitized.routeKind = token;
      }

      if (key === "searchScope") {
        sanitized.searchScope = token;
      }
    }
  }

  return sanitized;
};

export const createAnalyticsPayload = (
  path: string,
  language: Language,
  params: Partial<AnalyticsPayload> = {}
): AnalyticsPayload | null => {
  const provider = getAnalyticsProvider();

  if (provider === "none" || !isAnalyticsEnabled()) {
    return null;
  }

  return {
    path: normalizeAnalyticsPath(path),
    language,
    provider,
    ...sanitizeAnalyticsParams(params)
  };
};

const sendAnalyticsEvent = (
  eventName: AnalyticsEventName,
  path: string,
  language: Language,
  params: Partial<AnalyticsPayload> = {}
): void => {
  const payload = createAnalyticsPayload(path, language, {
    ...params,
    eventName
  });

  if (!payload || typeof window === "undefined") {
    return;
  }

  try {
    if (payload.provider === "plausible") {
      window.plausible?.(eventName, { props: payload });
      return;
    }

    if (payload.provider === "umami") {
      window.umami?.track?.(eventName, payload);
    }
  } catch {
    // Analytics must never break clinical tool rendering.
  }
};

export const trackPageView = (path: string, language: Language): void => {
  sendAnalyticsEvent("screen_view", path, language, {
    routeKind: normalizeAnalyticsPath(path).split("/")[2] ?? "home"
  });
};

export const trackLanguage = (language: Language): void => {
  if (typeof window === "undefined") {
    return;
  }

  trackPageView(window.location.pathname, language);
};

export const trackAppOpen = (path: string, language: Language): void => {
  sendAnalyticsEvent("app_open", path, language);
};

export const trackUsageEvent = (
  eventName: AnalyticsEventName,
  path: string,
  language: Language,
  params: Partial<AnalyticsPayload> = {}
): void => {
  sendAnalyticsEvent(eventName, path, language, params);
};

export const maybeTrackRouteChange = (path: string, language: Language): void => {
  trackPageView(path, language);
};

export const getUsageCounterEventNames = (
  counterWindow: AnalyticsCounterWindow
): AnalyticsPayload[] =>
  analyticsEventNames.map((eventName) => ({
    path: "/",
    language: "en",
    provider: "plausible",
    eventName,
    counterWindow
  }));
