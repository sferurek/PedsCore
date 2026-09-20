export type SimulationBridgeAction =
  | "start_simulation_case"
  | "get_patient_findings"
  | "submit_triage_decision";

export interface SimulationBridgeRequest {
  action: SimulationBridgeAction;
  scenarioId?: string;
  algorithmId: "jumpstart" | "salt" | "ptt" | "mitt";
  patientId?: string;
  category?: "GREEN" | "YELLOW" | "RED" | "BLACK" | "GREY";
}

export interface SimulationBridgeConfig {
  url?: string;
  timeoutMs?: number;
}

export async function callSimulationBridge(
  request: SimulationBridgeRequest,
  config: SimulationBridgeConfig = {}
): Promise<unknown> {
  const url = config.url ?? process.env.SIM_IMV_API_URL;
  if (!url) {
    throw new Error("simulation_bridge_not_configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs ?? 4000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
      signal: controller.signal
    });

    const payload = (await response.json()) as unknown;
    if (!response.ok) {
      const detail =
        typeof payload === "object" &&
        payload !== null &&
        "error" in payload &&
        typeof (payload as { error?: unknown }).error === "string"
          ? (payload as { error: string }).error
          : `simulation_bridge_http_${response.status}`;
      throw new Error(detail);
    }

    return payload;
  } finally {
    clearTimeout(timeout);
  }
}
