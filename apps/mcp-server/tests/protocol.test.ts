import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createPedsCoreMcpApp } from "../src/app.js";

let baseUrl = "";
let httpServer: ReturnType<typeof createServer>;

type RpcPayload = {
  result?: {
    protocolVersion?: string;
    serverInfo?: { name?: string };
    tools?: Array<{ name: string }>;
    isError?: boolean;
    structuredContent?: {
      tools?: Array<{ id: string }>;
      result?: {
        toolId?: string;
        score?: number;
        maxScore?: number;
        warnings?: unknown[];
      };
    };
  };
  error?: unknown;
};

const decodeRpcResponse = async (response: Response): Promise<RpcPayload> => {
  const text = await response.text();
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return JSON.parse(text);
  }

  const dataLines = text
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .filter(Boolean);

  if (dataLines.length === 0) {
    throw new Error(`No JSON-RPC payload found in response: ${text}`);
  }

  return JSON.parse(dataLines.at(-1)!);
};

const rpc = async (body: unknown) => {
  const response = await fetch(`${baseUrl}/mcp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream"
    },
    body: JSON.stringify(body)
  });

  return { response, payload: await decodeRpcResponse(response) };
};

beforeAll(async () => {
  const app = createPedsCoreMcpApp();
  httpServer = createServer(app);

  await new Promise<void>((resolve, reject) => {
    httpServer.once("error", reject);
    httpServer.listen(0, "127.0.0.1", () => resolve());
  });

  const address = httpServer.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    httpServer.close((error) => (error ? reject(error) : resolve()));
  });
});

describe("PedsCore MCP Streamable HTTP protocol", () => {
  it("exposes a health endpoint", async () => {
    const response = await fetch(`${baseUrl}/health`);
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      status: "ok",
      service: "pedscore-ai-mcp",
      transport: "streamable-http"
    });
  });

  it("negotiates MCP protocol 2025-11-25", async () => {
    const { response, payload } = await rpc({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-11-25",
        capabilities: {},
        clientInfo: {
          name: "pedscore-ci",
          version: "0.1.0"
        }
      }
    });

    expect(response.ok).toBe(true);
    expect(payload.result?.protocolVersion).toBe("2025-11-25");
    expect(payload.result?.serverInfo?.name).toBe("pedscore-ai");
  });

  it("lists the clinical and SIM IMV agent tools", async () => {
    const { response, payload } = await rpc({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {}
    });

    expect(response.ok).toBe(true);
    const names = payload.result?.tools?.map((tool) => tool.name) ?? [];
    expect(names).toEqual(
      expect.arrayContaining([
        "search_clinical_tools",
        "get_clinical_tool",
        "calculate_clinical_score",
        "start_simulation_case",
        "get_patient_findings",
        "submit_triage_decision"
      ])
    );
  });

  it("discovers Apgar through the MCP tools/call protocol", async () => {
    const { response, payload } = await rpc({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "search_clinical_tools",
        arguments: {
          query: "newborn apgar score",
          language: "en",
          calculableOnly: true
        }
      }
    });

    expect(response.ok).toBe(true);
    expect(payload.result?.isError).not.toBe(true);
    expect(payload.result?.structuredContent?.tools?.[0]?.id).toBe("apgar");
  });

  it("calculates Apgar deterministically through MCP", async () => {
    const { response, payload } = await rpc({
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "calculate_clinical_score",
        arguments: {
          toolId: "apgar",
          input: {
            assessment_time: "five_minutes",
            heart_rate: 2,
            respiratory_effort: 2,
            muscle_tone: 2,
            reflex_irritability: 2,
            color: 1
          }
        }
      }
    });

    expect(response.ok).toBe(true);
    expect(payload.result?.isError).not.toBe(true);
    expect(payload.result?.structuredContent?.result).toMatchObject({
      toolId: "apgar",
      score: 9,
      maxScore: 10,
      warnings: []
    });
  });

  it.each([
    { toolId: "apgar", warningId: "invalid_score_input", input: { assessment_time: "five_minutes", heart_rate: 0.5, respiratory_effort: 2, muscle_tone: 2, reflex_irritability: 2, color: 1 } },
    { toolId: "pediatric_appendicitis_score", warningId: "invalid_score_input", input: { right_iliac_fossa_tenderness: 2, cough_percussion_hopping_tenderness: 2, anorexia: 2, fever: 1, nausea_or_vomiting: 1, pain_migration: 1, leukocytosis: 1, neutrophilia: 1 } },
    { toolId: "bacterial_meningitis_score", warningId: "invalid_bms_inputs", input: { age_days: 180, csf_wbc: 2000, csf_rbc: 0, antibiotics_before_lp: false, critical_illness: false, immunosuppression: false, cns_device_or_recent_neurosurgery: false, other_bacterial_infection: false, csf_gram_positive: false, csf_anc: -1, csf_protein_mg_dl: 40, peripheral_anc: 5000, seizure: false } },
    { toolId: "phoenix_sepsis", warningId: "invalid_phoenix_inputs", input: { age_months: 60, suspected_infection: true, birth_hospitalization_before_discharge: false, postconceptional_age_at_least_37_weeks: true, any_respiratory_support: false, invasive_mechanical_ventilation: false, lactate_mmol_l: "INVALID" } },
    { toolId: "apgar", warningId: "invalid_apgar_assessment_time", input: { assessment_time: "INVALID", heart_rate: 2, respiratory_effort: 2, muscle_tone: 2, reflex_irritability: 2, color: 2 } }
  ])("returns a validation warning through MCP: $toolId ($warningId)", async ({ toolId, input, warningId }) => {
    const { response, payload } = await rpc({
      jsonrpc: "2.0", id: 10, method: "tools/call",
      params: { name: "calculate_clinical_score", arguments: { toolId, input } }
    });
    expect(response.ok).toBe(true);
    const result = payload.result?.structuredContent?.result;
    expect(result?.toolId).toBe(toolId);
    expect(result?.score).toBeUndefined();
    expect(result?.warnings).toContainEqual(expect.objectContaining({ id: warningId }));
  });

  it.each((JSON.parse(readFileSync(new URL("../../../packages/core/tests/fixtures/gcs-valid-baseline-20261107.json", import.meta.url), "utf8")) as {
    tools: Array<{ toolId: string; input: Record<string, unknown> }>
  }).tools)("rejects fractional GCS through MCP without returning a score: $toolId", async ({ toolId, input }) => {
    const { response, payload } = await rpc({
      jsonrpc: "2.0", id: 11, method: "tools/call",
      params: { name: "calculate_clinical_score", arguments: { toolId, input: { ...input, gcs: 7.5 } } }
    });
    expect(response.ok).toBe(true);
    expect(payload.result?.structuredContent?.result?.toolId).toBe(toolId);
    expect(payload.result?.structuredContent?.result?.score).toBeUndefined();
    const invalidId: Record<string, string> = {
      pelod_2: "invalid_pelod2_inputs", prism_iv: "invalid_prism4_inputs",
      psofa: "invalid_psofa_inputs", phoenix_sepsis: "invalid_phoenix_inputs"
    };
    expect(payload.result?.structuredContent?.result?.warnings).toContainEqual(expect.objectContaining({ id: invalidId[toolId] }));
  });

  it("does not silently replace a malformed supplied pSOFA ratio with the alternate measurement", async () => {
    const fixtures = JSON.parse(readFileSync(new URL("../../../packages/core/tests/fixtures/gcs-valid-baseline-20261107.json", import.meta.url), "utf8")) as {
      tools: Array<{ toolId: string; input: Record<string, unknown> }>
    };
    const base = fixtures.tools.find((item) => item.toolId === "psofa")!.input;
    const { response, payload } = await rpc({
      jsonrpc: "2.0", id: 12, method: "tools/call",
      params: { name: "calculate_clinical_score", arguments: {
        toolId: "psofa", input: { ...base, gcs: 15, pao2_fio2_ratio: "INVALID", spo2_fio2_ratio: 292 }
      } }
    });
    expect(response.ok).toBe(true);
    expect(payload.result?.structuredContent?.result?.toolId).toBe("psofa");
    expect(payload.result?.structuredContent?.result?.score).toBeUndefined();
    expect(payload.result?.structuredContent?.result?.warnings).toContainEqual(expect.objectContaining({ id: "invalid_psofa_inputs" }));
  });

  it("fails closed when the SIM bridge is not configured", async () => {
    const previous = process.env.SIM_IMV_API_URL;
    delete process.env.SIM_IMV_API_URL;

    try {
      const { response, payload } = await rpc({
        jsonrpc: "2.0",
        id: 5,
        method: "tools/call",
        params: {
          name: "start_simulation_case",
          arguments: {
            scenarioId: "school-bus",
            algorithmId: "jumpstart"
          }
        }
      });

      expect(response.ok).toBe(true);
      expect(payload.result?.isError).toBe(true);
    } finally {
      if (previous === undefined) {
        delete process.env.SIM_IMV_API_URL;
      } else {
        process.env.SIM_IMV_API_URL = previous;
      }
    }
  });

  it("rejects unsupported HTTP methods on the MCP endpoint", async () => {
    const response = await fetch(`${baseUrl}/mcp`);
    expect(response.status).toBe(405);
  });
});
