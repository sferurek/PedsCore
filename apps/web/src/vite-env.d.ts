/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_PROVIDER?: "none" | "plausible" | "umami" | "cloudflare";
  readonly VITE_ANALYTICS_DOMAIN?: string;
  readonly VITE_ANALYTICS_SCRIPT_URL?: string;
  readonly VITE_UMAMI_WEBSITE_ID?: string;
  readonly VITE_CLOUDFLARE_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
