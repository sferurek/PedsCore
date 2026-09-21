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
  { id: "westley-croup-moderate", toolId: "westley_croup", input: { level_of_consciousness: "normal", cyanosis: "absent", stridor: "at_rest", air_entry: "decreased", retractions: "moderate" } },
  { id: "bedside-pews-normal", toolId: "bedside_pews", input: { age_months: 24, heart_rate: 100, systolic_bp: 100, capillary_refill: "crt_lt3", respiratory_rate: 30, respiratory_effort: "effort_normal", oxygen_saturation: 98, oxygen_therapy: "oxygen_room_air" } },
  { id: "bedside-pews-extreme", toolId: "bedside_pews", input: { age_months: 24, heart_rate: 180, systolic_bp: 60, capillary_refill: "crt_ge3", respiratory_rate: 75, respiratory_effort: "effort_severe", oxygen_saturation: 85, oxygen_therapy: "oxygen_high" } },
  { id: "clinical-dehydration-zero", toolId: "clinical_dehydration_scale", input: { general_appearance: 0, eyes: 0, mucous_membranes: 0, tears: 0 } },
  { id: "clinical-dehydration-moderate", toolId: "clinical_dehydration_scale", input: { general_appearance: 2, eyes: 2, mucous_membranes: 0, tears: 0 } },
  { id: "pas-low-risk", toolId: "pediatric_appendicitis_score", input: { right_iliac_fossa_tenderness: "absent", cough_percussion_hopping_tenderness: "absent", anorexia: "absent", fever: "absent", nausea_or_vomiting: "absent", pain_migration: "absent", leukocytosis: "absent", neutrophilia: "absent" } },
  { id: "pas-high-risk", toolId: "pediatric_appendicitis_score", input: { right_iliac_fossa_tenderness: "present", cough_percussion_hopping_tenderness: "present", anorexia: "present", fever: "present", nausea_or_vomiting: "present", pain_migration: "present", leukocytosis: "present", neutrophilia: "present" } },
  { id: "nips-zero", toolId: "nips", input: { facial_expression: "relaxed", cry: "absent", breathing_patterns: "regular", arms: "relaxed", legs: "relaxed", state_of_arousal: "asleep_or_awake" } },
  { id: "nips-maximum", toolId: "nips", input: { facial_expression: "grimace", cry: "vigorous", breathing_patterns: "altered", arms: "flexed_or_extended", legs: "flexed_or_extended", state_of_arousal: "agitated" } },
  { id: "pram-minimum", toolId: "pram", input: { age_years: 6, suprasternal_retractions: "absent", scalene_muscle_contraction: "absent", air_entry: "normal", wheezing: "absent", oxygen_measurement_condition: "stable_room_air_one_minute", oxygen_saturation: 98 } },
  { id: "pram-maximum", toolId: "pram", input: { age_years: 6, suprasternal_retractions: "present", scalene_muscle_contraction: "present", air_entry: "absent_minimal", wheezing: "audible_or_silent_chest", oxygen_measurement_condition: "stable_room_air_one_minute", oxygen_saturation: 90 } },
  { id: "pecarn-under2-no-predictors", toolId: "pecarn_tbi_under_2", input: { age_months: 12, initial_gcs: 15, blunt_head_trauma: true, presentation_within_24h: true, trivial_mechanism_only: false, penetrating_trauma: false, known_brain_tumor: false, preexisting_neurologic_disorder_complicating_assessment: false, prior_neuroimaging_before_transfer: false, ventricular_shunt: false, bleeding_disorder: false, altered_mental_status_or_gcs_less_than_15: false, palpable_skull_fracture: false, non_frontal_scalp_hematoma: false, loss_of_consciousness_5_seconds_or_more: false, severe_mechanism: false, abnormal_behavior_per_parent: false } },
  { id: "pecarn-under2-higher-risk", toolId: "pecarn_tbi_under_2", input: { age_months: 12, initial_gcs: 15, blunt_head_trauma: true, presentation_within_24h: true, trivial_mechanism_only: false, penetrating_trauma: false, known_brain_tumor: false, preexisting_neurologic_disorder_complicating_assessment: false, prior_neuroimaging_before_transfer: false, ventricular_shunt: false, bleeding_disorder: false, altered_mental_status_or_gcs_less_than_15: true, palpable_skull_fracture: false, non_frontal_scalp_hematoma: false, loss_of_consciousness_5_seconds_or_more: false, severe_mechanism: false, abnormal_behavior_per_parent: false } },
  { id: "pecarn-2plus-no-predictors", toolId: "pecarn_tbi_2_or_more", input: { age_months: 60, initial_gcs: 15, blunt_head_trauma: true, presentation_within_24h: true, trivial_mechanism_only: false, penetrating_trauma: false, known_brain_tumor: false, preexisting_neurologic_disorder_complicating_assessment: false, prior_neuroimaging_before_transfer: false, ventricular_shunt: false, bleeding_disorder: false, altered_mental_status_or_gcs_less_than_15: false, signs_of_basilar_skull_fracture: false, history_of_loss_of_consciousness: false, history_of_vomiting: false, severe_mechanism: false, severe_headache: false } },
  { id: "pecarn-2plus-intermediate", toolId: "pecarn_tbi_2_or_more", input: { age_months: 60, initial_gcs: 15, blunt_head_trauma: true, presentation_within_24h: true, trivial_mechanism_only: false, penetrating_trauma: false, known_brain_tumor: false, preexisting_neurologic_disorder_complicating_assessment: false, prior_neuroimaging_before_transfer: false, ventricular_shunt: false, bleeding_disorder: false, altered_mental_status_or_gcs_less_than_15: false, signs_of_basilar_skull_fracture: false, history_of_loss_of_consciousness: false, history_of_vomiting: true, severe_mechanism: false, severe_headache: false } },
  { id: "sipa-within-threshold", toolId: "sipa", input: { age_years: 8, heart_rate_bpm: 80, systolic_blood_pressure_mm_hg: 100 } },
  { id: "sipa-above-threshold", toolId: "sipa", input: { age_years: 13, heart_rate_bpm: 110, systolic_blood_pressure_mm_hg: 100 } }
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
