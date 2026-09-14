export interface PopularToolStat {
  slug: string;
  count: number;
}

export interface PopularToolsResponse {
  status: "ok" | "not_configured" | "provider_error" | "failed_to_load";
  configured: boolean;
  rangeDays: number;
  updatedAt?: string;
  tools: PopularToolStat[];
}

export const fetchPopularTools = async (): Promise<PopularToolsResponse> => {
  try {
    const response = await fetch("/api/analytics/tools", {
      headers: { Accept: "application/json" }
    });
    const payload = (await response.json().catch(() => null)) as Partial<PopularToolsResponse> | null;

    if (!response.ok || !payload) {
      return { status: "failed_to_load", configured: false, rangeDays: 30, tools: [] };
    }

    return {
      status:
        payload.status === "ok" ||
        payload.status === "not_configured" ||
        payload.status === "provider_error"
          ? payload.status
          : "failed_to_load",
      configured: payload.configured === true,
      rangeDays: typeof payload.rangeDays === "number" ? payload.rangeDays : 30,
      updatedAt: typeof payload.updatedAt === "string" ? payload.updatedAt : undefined,
      tools: Array.isArray(payload.tools)
        ? payload.tools.filter(
            (item): item is PopularToolStat =>
              Boolean(item) &&
              typeof item.slug === "string" &&
              typeof item.count === "number" &&
              Number.isFinite(item.count)
          )
        : []
    };
  } catch {
    return { status: "failed_to_load", configured: false, rangeDays: 30, tools: [] };
  }
};
