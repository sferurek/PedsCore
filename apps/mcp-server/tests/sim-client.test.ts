import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { afterEach, describe, expect, it } from "vitest";
import { callSimulationBridge } from "../src/sim-client.js";

const servers: Array<ReturnType<typeof createServer>> = [];

async function listen(
  handler: Parameters<typeof createServer>[0]
): Promise<string> {
  const server = createServer(handler);
  servers.push(server);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address() as AddressInfo;
  return `http://127.0.0.1:${address.port}/api/hackathon/sim`;
}

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        })
    )
  );
});

describe("SIM IMV bridge client", () => {
  it("posts the exact deterministic bridge request and returns JSON", async () => {
    let receivedBody = "";

    const url = await listen((req, res) => {
      req.setEncoding("utf8");
      req.on("data", (chunk) => {
        receivedBody += chunk;
      });
      req.on("end", () => {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ correct: true, expectedCategory: "GREEN" }));
      });
    });

    const request = {
      action: "submit_triage_decision" as const,
      scenarioId: "school-bus",
      algorithmId: "jumpstart" as const,
      patientId: "01",
      category: "GREEN" as const
    };

    const result = await callSimulationBridge(request, { url, timeoutMs: 1000 });

    expect(JSON.parse(receivedBody)).toEqual(request);
    expect(result).toEqual({ correct: true, expectedCategory: "GREEN" });
  });

  it("surfaces the simulator's structured error message", async () => {
    const url = await listen((_req, res) => {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Unknown scenario: missing" }));
    });

    await expect(
      callSimulationBridge(
        {
          action: "start_simulation_case",
          scenarioId: "missing",
          algorithmId: "jumpstart"
        },
        { url, timeoutMs: 1000 }
      )
    ).rejects.toThrow("Unknown scenario: missing");
  });

  it("fails closed when the simulator bridge is not configured", async () => {
    const previous = process.env.SIM_IMV_API_URL;
    delete process.env.SIM_IMV_API_URL;

    try {
      await expect(
        callSimulationBridge({
          action: "start_simulation_case",
          algorithmId: "jumpstart"
        })
      ).rejects.toThrow("simulation_bridge_not_configured");
    } finally {
      if (previous === undefined) {
        delete process.env.SIM_IMV_API_URL;
      } else {
        process.env.SIM_IMV_API_URL = previous;
      }
    }
  });

  it("aborts an upstream request that exceeds the configured timeout", async () => {
    const url = await listen((_req, _res) => {
      // Intentionally leave the response open until the client aborts.
    });

    await expect(
      callSimulationBridge(
        {
          action: "get_patient_findings",
          scenarioId: "school-bus",
          algorithmId: "jumpstart",
          patientId: "01"
        },
        { url, timeoutMs: 25 }
      )
    ).rejects.toMatchObject({ name: "AbortError" });
  });
});
