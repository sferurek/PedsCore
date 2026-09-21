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
  },
  {
    id: "apgar-perfect-five-minutes",
    toolId: "apgar",
    input: {
      assessment_time: "five_minutes",
      heart_rate: 2,
      respiratory_effort: 2,
      muscle_tone: 2,
      reflex_irritability: 2,
      color: 2
    }
  },
  {
    id: "apgar-missing-domain",
    toolId: "apgar",
    input: {
      assessment_time: "one_minute",
      heart_rate: 2,
      respiratory_effort: 2,
      muscle_tone: 2,
      reflex_irritability: 2
    }
  },
  {
    id: "strongkids-low-risk",
    toolId: "strongkids",
    input: {
      poor_nutritional_status: false,
      high_risk_disease: false,
      reduced_intake_or_losses: false,
      weight_loss_or_poor_gain: false
    }
  },
  {
    id: "strongkids-high-risk",
    toolId: "strongkids",
    input: {
      poor_nutritional_status: true,
      high_risk_disease: true,
      reduced_intake_or_losses: true,
      weight_loss_or_poor_gain: true
    }
  },
  {
    id: "ckid-u25-creatinine",
    toolId: "ckid_u25",
    input: {
      age_years: 10,
      sex: "male",
      height_cm: 140,
      serum_creatinine: 0.7,
      creatinine_unit: "mg_dl"
    }
  },
  {
    id: "ckid-u25-invalid-age",
    toolId: "ckid_u25",
    input: {
      age_years: 0.5,
      sex: "female",
      height_cm: 70,
      serum_creatinine: 0.4,
      creatinine_unit: "mg_dl"
    }
  },
  { id: "silverman-andersen-zero", toolId: "silverman_andersen", input: { thoracoabdominal_movement: 0, intercostal_retractions: 0, xiphoid_retraction: 0, nasal_flaring: 0, expiratory_grunt: 0 } },
  { id: "silverman-andersen-moderate", toolId: "silverman_andersen", input: { thoracoabdominal_movement: 2, intercostal_retractions: 2, xiphoid_retraction: 1, nasal_flaring: 0, expiratory_grunt: 0 } },
  { id: "ballard-grid-anchor", toolId: "ballard", input: { posture: 4, square_window: 4, arm_recoil: 4, popliteal_angle: 5, scarf_sign: 4, heel_to_ear: 4, skin: 5, lanugo: 4, plantar_surface: 4, breast: 4, eye_ear: 4, genitals: 4 } },
  { id: "cries-zero", toolId: "cries", input: { crying: "crying_0", oxygen: "oxygen_0", vital_signs: "vital_0", expression: "expression_0", sleeplessness: "sleep_0" } },
  { id: "cries-severe", toolId: "cries", input: { crying: "crying_2", oxygen: "oxygen_2", vital_signs: "vital_2", expression: "expression_2", sleeplessness: "sleep_2" } },
  { id: "westley-croup-zero", toolId: "westley_croup", input: { level_of_consciousness: "normal", cyanosis: "absent", stridor: "absent", air_entry: "normal", retractions: "none" } },
  { id: "westley-croup-moderate", toolId: "westley_croup", input: { level_of_consciousness: "normal", cyanosis: "absent", stridor: "at_rest", air_entry: "decreased", retractions: "moderate" } }
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
