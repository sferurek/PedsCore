import { useEffect } from "react";
import { getAnalyticsConfig, isAnalyticsEnabled } from "../utils/analytics";

const scriptId = "peds-core-analytics-script";

export function AnalyticsProvider() {
  useEffect(() => {
    if (!isAnalyticsEnabled() || document.getElementById(scriptId)) {
      return;
    }

    const config = getAnalyticsConfig();
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
  }, []);

  return null;
}
