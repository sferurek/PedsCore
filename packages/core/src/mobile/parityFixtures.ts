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
  { id: "sipa-above-threshold", toolId: "sipa", input: { age_years: 13, heart_rate_bpm: 110, systolic_blood_pressure_mm_hg: 100 } },
  { id: "catch-no-criteria", toolId: "catch_tbi", input: { age_years: 8, initial_gcs: 15, injury_within_24h: true, witnessed_loss_of_consciousness: true, definite_amnesia: false, witnessed_disorientation: false, persistent_vomiting_more_than_one_episode: false, persistent_irritability_if_under_2: false, obvious_penetrating_skull_injury: false, obvious_depressed_skull_fracture: false, acute_focal_neurologic_deficit: false, chronic_generalized_developmental_delay: false, suspected_child_abuse: false, returning_for_reassessment: false, gcs_less_than_15_at_2_hours: false, suspected_open_or_depressed_skull_fracture: false, worsening_headache: false, irritability_on_exam: false, signs_of_basal_skull_fracture: false, large_boggy_scalp_hematoma: false, dangerous_mechanism: false } },
  { id: "catch-higher-risk", toolId: "catch_tbi", input: { age_years: 8, initial_gcs: 15, injury_within_24h: true, witnessed_loss_of_consciousness: true, definite_amnesia: false, witnessed_disorientation: false, persistent_vomiting_more_than_one_episode: false, persistent_irritability_if_under_2: false, obvious_penetrating_skull_injury: false, obvious_depressed_skull_fracture: false, acute_focal_neurologic_deficit: false, chronic_generalized_developmental_delay: false, suspected_child_abuse: false, returning_for_reassessment: false, gcs_less_than_15_at_2_hours: true, suspected_open_or_depressed_skull_fracture: false, worsening_headache: false, irritability_on_exam: false, signs_of_basal_skull_fracture: false, large_boggy_scalp_hematoma: false, dangerous_mechanism: false } },
  { id: "chalice-no-criteria", toolId: "chalice_tbi", input: { age_years: 8, head_injury_present: true, witnessed_loss_of_consciousness_over_5_minutes: false, history_of_amnesia_over_5_minutes: false, abnormal_drowsiness: false, three_or_more_vomiting_episodes: false, suspicion_of_non_accidental_injury: false, post_traumatic_seizure_without_epilepsy: false, gcs_less_than_14_or_under_1_less_than_15: false, suspected_penetrating_or_depressed_skull_injury_or_tense_fontanelle: false, signs_of_basal_skull_fracture: false, focal_neurology: false, bruise_swelling_laceration_over_5cm_under_1_year: false, high_speed_road_traffic_mechanism: false, fall_over_3_metres: false, high_speed_projectile_or_object: false } },
  { id: "chalice-positive", toolId: "chalice_tbi", input: { age_years: 8, head_injury_present: true, witnessed_loss_of_consciousness_over_5_minutes: false, history_of_amnesia_over_5_minutes: false, abnormal_drowsiness: true, three_or_more_vomiting_episodes: false, suspicion_of_non_accidental_injury: false, post_traumatic_seizure_without_epilepsy: false, gcs_less_than_14_or_under_1_less_than_15: false, suspected_penetrating_or_depressed_skull_injury_or_tense_fontanelle: false, signs_of_basal_skull_fracture: false, focal_neurology: false, bruise_swelling_laceration_over_5cm_under_1_year: false, high_speed_road_traffic_mechanism: false, fall_over_3_metres: false, high_speed_projectile_or_object: false } },
  { id: "burn-tbsa-infant-head", toolId: "pediatric_burn_tbsa", input: { age_band: "birth_to_1_year", burn_fraction_head: "1" } },
  { id: "burn-tbsa-partial-trunk", toolId: "pediatric_burn_tbsa", input: { age_band: "ten_to_fourteen_years", burn_fraction_anterior_trunk: "0_5" } },
  { id: "garcia-alix-normal", toolId: "garcia_alix_ners", input: { alertness: "a0", posture: "p0", spontaneous_activity: "s0", motor_response: "m0", myotatic_reflexes: "r0", breathing: "b0", clinical_seizures: "c0", aeeg_seizures: "e0", aeeg_background: "g0" } },
  { id: "garcia-alix-moderate", toolId: "garcia_alix_ners", input: { alertness: "a8", posture: "p0", spontaneous_activity: "s0", motor_response: "m0", myotatic_reflexes: "r0", breathing: "b0", clinical_seizures: "c0", aeeg_seizures: "e0", aeeg_background: "g0" } },
  { id: "pecarn-febrile-low-risk", toolId: "pecarn_febrile_infant", input: { age_days: 30, fever_38_within_24h: true, critically_ill: false, previously_healthy: true, gestation_over_36_weeks: true, antibiotics_last_48h: false, indwelling_device: false, soft_tissue_infection: false, urinalysis_negative: true, anc: 3000, procalcitonin_ng_ml: 0.3 } },
  { id: "pecarn-febrile-boundary", toolId: "pecarn_febrile_infant", input: { age_days: 30, fever_38_within_24h: true, critically_ill: false, previously_healthy: true, gestation_over_36_weeks: true, antibiotics_last_48h: false, indwelling_device: false, soft_tissue_infection: false, urinalysis_negative: true, anc: 4090, procalcitonin_ng_ml: 1.71 } },
  { id: "yos-normal", toolId: "yos", input: { age_months: 12, febrile_illness: true, cry: 1, parent_reaction: 1, state_variation: 1, color: 1, hydration: 1, social_response: 1 } },
  { id: "yos-intermediate", toolId: "yos", input: { age_months: 12, febrile_illness: true, cry: 3, parent_reaction: 3, state_variation: 1, color: 3, hydration: 1, social_response: 1 } },
  { id: "pucai-remission", toolId: "pucai", input: { abdominal_pain: 0, rectal_bleeding: 0, stool_consistency: 0, stool_frequency: 0, nocturnal_stool: 0, activity_level: 0 } },
  { id: "pucai-severe", toolId: "pucai", input: { abdominal_pain: 10, rectal_bleeding: 30, stool_consistency: 10, stool_frequency: 15, nocturnal_stool: 10, activity_level: 10 } },
  { id: "kdigo-baseline", toolId: "kdigo_pediatric", input: { baseline_creatinine_mg_dl: 1, current_creatinine_mg_dl: 1, age_years: 10, current_egfr: 100, urine_output_ml_kg_h: 1, urine_duration_hours: 0, anuria_hours: 0, renal_replacement_therapy: false, baseline_within_7_days: true, rise_within_48_hours: true } },
  { id: "kdigo-stage3", toolId: "kdigo_pediatric", input: { baseline_creatinine_mg_dl: 1, current_creatinine_mg_dl: 3, age_years: 10, current_egfr: 100, urine_output_ml_kg_h: 1, urine_duration_hours: 0, anuria_hours: 0, renal_replacement_therapy: false, baseline_within_7_days: true, rise_within_48_hours: true } },
  { id: "pcdai-min", toolId: "pcdai", input: { abdominal_pain:"0", stools:"0", wellbeing:"0", hematocrit_category:"0", esr_mm_h:10, albumin_g_dl:4, weight:"0", height:"0", abdomen:"0", perirectal:"0", extraintestinal:"0" } },
  { id: "pcdai-max", toolId: "pcdai", input: { abdominal_pain:"10", stools:"10", wellbeing:"10", hematocrit_category:"5", esr_mm_h:70, albumin_g_dl:2.5, weight:"10", height:"10", abdomen:"10", perirectal:"10", extraintestinal:"10" } },
  { id: "prifle-baseline", toolId: "prifle", input: { baseline_eccl:100,current_eccl:100,urine_output_ml_kg_h:1,urine_duration_hours:0,anuria_hours:0,persistent_failure_days:0 } },
  { id: "prifle-failure", toolId: "prifle", input: { baseline_eccl:100,current_eccl:25,urine_output_ml_kg_h:1,urine_duration_hours:0,anuria_hours:0,persistent_failure_days:0 } },
  { id: "pelod2-zero", toolId: "pelod_2", input: { age_months:60,gcs:15,both_pupils_fixed:false,lactate_mmol_l:1,map_mmhg:80,creatinine_umol_l:50,pao2_mmhg:100,fio2_fraction:0.21,paco2_mmhg:40,invasive_ventilation:false,wbc_10e9_l:5,platelets_10e9_l:200 } },
  { id: "pelod2-lactate", toolId: "pelod_2", input: { age_months:60,gcs:15,both_pupils_fixed:false,lactate_mmol_l:11,map_mmhg:80,creatinine_umol_l:50,pao2_mmhg:100,fio2_fraction:0.21,paco2_mmhg:40,invasive_ventilation:false,wbc_10e9_l:5,platelets_10e9_l:200 } },
  { id: "pim3-unknown", toolId: "pim3", input: { both_pupils_fixed:false,elective_admission:false,mechanical_ventilation_first_hour:false,base_excess_unknown:true,sbp_unknown:true,oxygenation_unknown:true,procedure_category:"none",diagnosis_risk_group:"none" } },
  { id: "pim3-high-risk", toolId: "pim3", input: { both_pupils_fixed:true,elective_admission:false,mechanical_ventilation_first_hour:true,base_excess_unknown:false,base_excess_mmol_l:-10,sbp_unknown:false,systolic_bp_mmhg:60,oxygenation_unknown:false,fio2_fraction:0.8,pao2_mmhg:50,procedure_category:"none",diagnosis_risk_group:"very_high" } },
  { id: "psofa-zero", toolId: "psofa", input: { age_months:120,pao2_fio2_ratio:400,respiratory_support:false,platelets_10e3_ul:150,bilirubin_mg_dl:1.1,map_mmhg:65,dopamine_mcg_kg_min:0,dobutamine_any_dose:false,epinephrine_mcg_kg_min:0,norepinephrine_mcg_kg_min:0,gcs:15,creatinine_mg_dl:0.6 } },
  { id: "psofa-respiratory", toolId: "psofa", input: { age_months:120,pao2_fio2_ratio:99,respiratory_support:true,platelets_10e3_ul:150,bilirubin_mg_dl:1.1,map_mmhg:65,dopamine_mcg_kg_min:0,dobutamine_any_dose:false,epinephrine_mcg_kg_min:0,norepinephrine_mcg_kg_min:0,gcs:15,creatinine_mg_dl:0.6 } },
  { id: "fnass-zero", toolId: "fnass_21", input: { crying:"none",sleep_after_feeding:"normal",moro_reflex:"normal",tremors_disturbed:"none",tremors_undisturbed:"none",muscle_tone:"no",excoriation:"no",myoclonic_jerks:"no",generalized_convulsions:"no",sweating:"no",temperature:"normal",yawning:"no",mottling:"no",nasal_stuffiness:"no",sneezing:"no",nasal_flaring:"no",respiratory_rate:"normal",excessive_sucking:"no",feeding:"normal",vomiting:"none",stools:"normal" } },
  { id: "fnass-max", toolId: "fnass_21", input: { crying:"continuous",sleep_after_feeding:"lt1",moro_reflex:"marked",tremors_disturbed:"moderate_severe",tremors_undisturbed:"moderate_severe",muscle_tone:"yes",excoriation:"yes",myoclonic_jerks:"yes",generalized_convulsions:"yes",sweating:"yes",temperature:"ge38_4",yawning:"yes",mottling:"yes",nasal_stuffiness:"yes",sneezing:"yes",nasal_flaring:"yes",respiratory_rate:"gt60_retractions",excessive_sucking:"yes",feeding:"poor",vomiting:"projectile",stools:"watery" } },
  { id: "rdai-min", toolId: "rdai", input: { wheeze_expiration:"none",wheeze_inspiration:"none",wheeze_location:"none",retraction_supraclavicular:"none",retraction_intercostal:"none",retraction_subcostal:"none" } },
  { id: "rdai-max", toolId: "rdai", input: { wheeze_expiration:"all",wheeze_inspiration:"all",wheeze_location:"diffuse",retraction_supraclavicular:"marked",retraction_intercostal:"marked",retraction_subcostal:"marked" } },
  { id: "nsofa-zero", toolId: "nsofa", input: { intubated:false,spo2_percent:95,fio2_fraction:0.21,inotrope_count:0,systemic_steroids:false,platelets_10e3_ul:150 } },
  { id: "nsofa-cardiovascular", toolId: "nsofa", input: { intubated:false,spo2_percent:95,fio2_fraction:0.21,inotrope_count:2,systemic_steroids:true,platelets_10e3_ul:150 } },
  { id: "snappe2-zero", toolId: "snappii", input: { mean_bp_mmhg:35,lowest_temp_c:36,pao2_mmhg:90,fio2_percent:30,lowest_ph:7.3,multiple_seizures:false,urine_output_ml_kg_h:1.2,apgar_5min:8,birth_weight_g:1200,sga_below_3rd_percentile:false } },
  { id: "snappe2-oxygen", toolId: "snappii", input: { mean_bp_mmhg:35,lowest_temp_c:36,pao2_mmhg:8.7,fio2_percent:30,lowest_ph:7.3,multiple_seizures:false,urine_output_ml_kg_h:1.2,apgar_5min:8,birth_weight_g:1200,sga_below_3rd_percentile:false } }
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
