import type { CalculationResult } from "../types.js";
import { calculateTool } from "../calculators/registry.js";

export const MOBILE_PARITY_FIXTURE_SCHEMA_VERSION = "1.0.0" as const;

export interface MobileParityFixtureCase {
  id: string;
  toolId: string;
  input: Record<string, unknown>;
  expected: CalculationResult;
}

export interface MobileParityFixtureBundle {
  schemaVersion: typeof MOBILE_PARITY_FIXTURE_SCHEMA_VERSION;
  sourceRevision: string;
  generatedAt: string;
  cases: MobileParityFixtureCase[];
}

interface FixtureSeed {
  id: string;
  toolId: string;
  input: Record<string, unknown>;
}

/**
 * Small cross-section of calculator behaviours used to prove the mobile
 * execution contract before expanding coverage. Expected results are always
 * produced by the canonical PedsCore calculator registry; they are never
 * transcribed into a mobile client.
 */
const fixtureSeeds: FixtureSeed[] = [
  {
    id: "qtc-bazett-nominal",
    toolId: "qtc_bazett",
    input: { qt_ms: 360, heart_rate_bpm: 100 }
  },
  {
    id: "qtc-bazett-invalid",
    toolId: "qtc_bazett",
    input: { qt_ms: 0, heart_rate_bpm: 100 }
  },
  {
    id: "bedside-schwartz-mg-dl",
    toolId: "bedside_schwartz",
    input: { height_cm: 120, serum_creatinine: 0.6, creatinine_unit: "mg_dl" }
  },
  {
    id: "bedside-schwartz-unit-conversion",
    toolId: "bedside_schwartz",
    input: { height_cm: 120, serum_creatinine: 53.04, creatinine_unit: "umol_l" }
  },
  {
    id: "step-by-step-age-high-risk",
    toolId: "step_by_step",
    input: { age_days: 14, fever_without_source: true }
  },
  {
    id: "step-by-step-low-risk",
    toolId: "step_by_step",
    input: {
      age_days: 45,
      fever_without_source: true,
      well_appearing: true,
      leukocyturia: false,
      procalcitonin_ng_ml: 0.2,
      crp_mg_l: 10,
      anc: 5000
    }
  },
  {
    id: "step-by-step-threshold-intermediate",
    toolId: "step_by_step",
    input: {
      age_days: 45,
      fever_without_source: true,
      well_appearing: true,
      leukocyturia: false,
      procalcitonin_ng_ml: 0.49,
      crp_mg_l: 20.1,
      anc: 10000
    }
  }
];

export const createMobileParityFixtureBundle = ({
  sourceRevision,
  generatedAt = new Date().toISOString()
}: {
  sourceRevision: string;
  generatedAt?: string;
}): MobileParityFixtureBundle => {
  if (sourceRevision.trim().length === 0) {
    throw new Error("sourceRevision is required for mobile parity fixtures");
  }

  return {
    schemaVersion: MOBILE_PARITY_FIXTURE_SCHEMA_VERSION,
    sourceRevision,
    generatedAt,
    cases: fixtureSeeds.map((fixture) => ({
      ...fixture,
      expected: calculateTool(fixture.toolId, fixture.input)
    }))
  };
};
