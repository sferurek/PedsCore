export type ClinicalRightsVerdict =
  | "open_reuse"
  | "permission_required"
  | "unresolved"
  | "external_only"
  | "criteria_reimplementation"
  | "not_applicable";

export const clinicalRightsVerdictById: Record<string, ClinicalRightsVerdict> = {
  modified_bell_nec: "open_reuse",
  psofa: "criteria_reimplementation",
  snappii: "criteria_reimplementation",
  capd: "permission_required",
  wat_1: "permission_required",
  comfort_b: "permission_required",
  braden_qd: "permission_required",
  sbs: "permission_required",
  pcam_icu: "permission_required",
  pscam_icu: "permission_required",
  pipp: "unresolved",
  pipp_r: "permission_required",
  comfortneo: "unresolved",
  brighton_pews: "unresolved",
  rdai: "criteria_reimplementation",
  brosjod: "unresolved",
  prism_iv: "open_reuse",
  prism_iii: "permission_required",
  orbegozo_growth_percentiles: "permission_required",
  pyms: "unresolved",
  flacc: "permission_required",
  rflacc: "permission_required",
  cheops: "unresolved",
  sos_pd: "permission_required",
  pednihss: "unresolved",
  crib_ii: "unresolved",
  n_pass: "permission_required",
  edin: "unresolved",
  nfcs: "unresolved",
  cmas: "permission_required",
  mmt8: "permission_required",
  j4s: "unresolved",
  jdm_disease_activity_score: "permission_required",
  myositis_damage_index: "permission_required",
  fnass_21: "open_reuse"
};
