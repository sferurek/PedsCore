import { useEffect } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import type { BeforeSendEvent } from "@vercel/analytics/react";
import {
  getAnalyticsConfig,
  isAnalyticsEnabled,
  sanitizeAnalyticsUrl
} from "../utils/analytics";

const scriptId = "peds-core-analytics-script";

const sanitizeVercelAnalyticsEvent = (
  event: BeforeSendEvent
): BeforeSendEvent => ({
  ...event,
  url: sanitizeAnalyticsUrl(event.url)
});

export function AnalyticsProvider() {
  const config = getAnalyticsConfig();
  const analyticsEnabled = isAnalyticsEnabled();

  useEffect(() => {
    if (
      !analyticsEnabled ||
      config.provider === "vercel" ||
      document.getElementById(scriptId)
    ) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.src = config.scriptUrl ?? "";

    if (config.provider === "plausible") {
      script.setAttribute("data-domain", config.domain ?? "");
    }

    if (config.provider === "umami") {
      script.setAttribute("data-website-id", config.umamiWebsiteId ?? "");
    }

    if (config.provider === "cloudflare") {
      script.setAttribute(
        "data-cf-beacon",
        JSON.stringify({ token: config.cloudflareToken })
      );
    }

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [
    analyticsEnabled,
    config.cloudflareToken,
    config.domain,
    config.provider,
    config.scriptUrl,
    config.umamiWebsiteId
  ]);

  if (config.provider === "vercel" && analyticsEnabled) {
    return (
      <VercelAnalytics
        beforeSend={sanitizeVercelAnalyticsEvent}
        mode="production"
      />
    );
  }

  return null;
}
