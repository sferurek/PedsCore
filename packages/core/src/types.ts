export type Language = "es" | "en";

export type LocalizedText = Record<Language, string>;

export type ToolType =
  | "score"
  | "scale"
  | "calculator"
  | "clinical_rule"
  | "algorithm"
  | "percentile"
  | "nomogram";

export type ToolCategory =
  | "neonatology"
  | "respiratory"
  | "emergency"
  | "cardiology"
  | "nephrology"
  | "intensive_care"
  | "growth_nutrition"
  | "pain"
  | "neurology"
  | "resuscitation"
  | "adolescent_medicine";


export type ClinicalSpecialty =
  | "neonatology"
  | "emergency_medicine"
  | "intensive_care"
  | "respiratory"
  | "cardiology"
  | "nephrology"
  | "gastroenterology"
  | "inflammatory_bowel_disease"
  | "hepatology"
  | "rheumatology"
  | "neurology"
  | "endocrinology"
  | "growth_development"
  | "pain_medicine"
  | "sedation"
  | "infectious_disease"
  | "hematology"
  | "oncology"
  | "adolescent_medicine"
  | "behavioral_health"
  | "developmental_pediatrics"
  | "nutrition"
  | "trauma"
  | "burns"
  | "patient_safety"
  | "disaster_medicine"
  | "transplant_medicine"
  | "general_pediatrics";

export type AgeGroupTag =
  | "preterm"
  | "term_newborn"
  | "neonate_0_28d"
  | "young_infant_0_60d"
  | "young_infant_0_90d"
  | "infant"
  | "toddler"
  | "preschool"
  | "school_age"
  | "adolescent"
  | "young_adult_transition"
  | "all_pediatric"
  | "age_defined_by_tool";

export type CareSettingTag =
  | "prehospital"
  | "mass_casualty"
  | "delivery_room"
  | "newborn_ward"
  | "nicu"
  | "emergency_department"
  | "picu"
  | "inpatient_ward"
  | "outpatient_clinic"
  | "primary_care"
  | "specialty_clinic"
  | "operating_room"
  | "postoperative"
  | "transport"
  | "home_followup"
  | "research_case_mix";

export type ClinicalFunctionTag =
  | "screening"
  | "diagnostic_support"
  | "risk_stratification"
  | "severity"
  | "disease_activity"
  | "organ_dysfunction"
  | "prognosis"
  | "mortality_risk"
  | "triage"
  | "treatment_response"
  | "longitudinal_monitoring"
  | "functional_status"
  | "developmental_assessment"
  | "maturity_assessment"
  | "growth_assessment"
  | "pain_assessment"
  | "sedation_assessment"
  | "withdrawal_assessment"
  | "delirium_assessment"
  | "nutrition_screening"
  | "psychosocial_screening"
  | "quality_of_life"
  | "physical_examination"
  | "staging"
  | "reference_only";

export type InteractionMode =
  | "calculator"
  | "clinical_rule"
  | "clinical_screen"
  | "reference_scale"
  | "longitudinal_staging"
  | "longitudinal_monitoring"
  | "visual_atlas"
  | "examination_framework"
  | "clinical_framework"
  | "licensed_external_tool";

export type LongitudinalUse = "primary" | "supported" | "possible" | "not_applicable";

export type DiscoveryCalculationAvailability =
  | "local_active"
  | "local_planned"
  | "external_official"
  | "not_applicable"
  | "blocked_by_rights"
  | "blocked_by_evidence";

export type ContentReuseStatus =
  | "open"
  | "public_domain"
  | "attribution_required"
  | "external_only"
  | "permission_required"
  | "unresolved";

export type ClinicalRiskTier = "low" | "moderate" | "high" | "critical";

export type InputModality =
  | "clinical_observation"
  | "history"
  | "vital_signs"
  | "physical_examination"
  | "laboratory"
  | "blood_gas"
  | "urinalysis"
  | "ecg"
  | "eeg_aeeg"
  | "imaging"
  | "growth_measurements"
  | "questionnaire_self_report"
  | "questionnaire_parent_report"
  | "questionnaire_clinician_report"
  | "functional_test";

export interface ClinicalToolDiscoveryMetadata {
  specialties: ClinicalSpecialty[];
  clinicalProblems: string[];
  ageGroups: AgeGroupTag[];
  careSettings: CareSettingTag[];
  clinicalFunctions: ClinicalFunctionTag[];
  interactionModes: InteractionMode[];
  longitudinalUse: LongitudinalUse;
  inputModalities: InputModality[];
  calculationAvailability: DiscoveryCalculationAvailability;
  reuseStatus: ContentReuseStatus;
  clinicalRiskTier: ClinicalRiskTier;
  aliases: Record<Language, string[]>;
  comparisonGroupIds: string[];
  relatedToolIds: string[];
}

export type ImplementationStatus =
  | "implemented"
  | "partially_implemented"
  | "ready_for_implementation"
  | "pending_validation"
  | "needs_primary_reference"
  | "coming_soon"
  | "not_implemented_due_to_licensing";

export type EvidenceLevel =
  | "high"
  | "moderate"
  | "low"
  | "primary_reference_needed"
  | "pending_verification"
  | "original_derivation_study"
  | "external_validation_study"
  | "clinical_practice_guideline"
  | "systematic_review"
  | "consensus_statement"
  | "official_manual_or_institutional_protocol"
  | "peer_reviewed_review"
  | "secondary_source"
  | "local_project_documentation"
  | "pending_primary_source";

export type SourceType =
  | "journal_article"
  | "guideline"
  | "society_statement"
  | "textbook"
  | "institutional_protocol"
  | "documentation"
  | "website"
  | "other";

export type AccessType =
  | "open_access"
  | "paywalled"
  | "abstract_only"
  | "unknown";

export type RegulatoryRisk = "low" | "medium" | "high";

export type CalculationStatus =
  | "active"
  | "not_available"
  | "metadata_ready"
  | "pending_validation"
  | "future";

export interface Reference {
  id: string;
  title: string;
  evidenceLevel: EvidenceLevel;
  authors?: string;
  year?: number;
  journalOrPublisher?: string;
  citation?: string;
  doi?: string;
  pmid?: string;
  url?: string;
  sourceType?: SourceType;
  accessType?: AccessType;
  notes?: string;
  appliesTo?: string[];
  priority?: number;
}

export interface ToolOption {
  id: string;
  label: LocalizedText;
  description?: LocalizedText;
  score?: number;
  value?: string | number | boolean;
}

export interface ToolInput {
  id: string;
  label: LocalizedText;
  description?: LocalizedText;
  type:
    | "single_choice"
    | "boolean"
    | "number"
    | "select"
    | "multi_select"
    | "text";
  required: boolean;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: LocalizedText;
  options?: ToolOption[];
  helperText?: LocalizedText;
}

export interface InterpretationBand {
  id: string;
  label: LocalizedText;
  min?: number;
  max?: number;
  description?: LocalizedText;
  source?: Reference;
}

export interface ScoringTableRow {
  id: string;
  variable: LocalizedText;
  score?: number;
  value?: string | number;
  description: LocalizedText;
  source?: Reference;
}

export interface CalculationWarning {
  id: string;
  message: LocalizedText;
}

export interface CalculationResult {
  toolId: string;
  score?: number;
  maxScore?: number;
  value?: number;
  unit?: string;
  label?: LocalizedText;
  classification?: LocalizedText;
  criteriaMatched?: LocalizedText[];
  interpretation?: InterpretationBand;
  warnings: CalculationWarning[];
  trace: Array<{
    inputId: string;
    value: unknown;
    score?: number;
  }>;
}

export interface ClinicalToolMetadata {
  id: string;
  slug: string;
  name: LocalizedText;
  shortName?: string;
  category: ToolCategory;
  subcategory: string;
  type: ToolType;
  population: LocalizedText;
  description: LocalizedText;
  implementationStatus: ImplementationStatus;
  regulatoryRisk: RegulatoryRisk;
  evidenceLevel: EvidenceLevel;
  references: Reference[];
  validationNotes: LocalizedText;
  disclaimerRequired: true;
  inputs?: ToolInput[];
  interpretationBands?: InterpretationBand[];
  scoringTable?: ScoringTableRow[];
  calculationStatus?: CalculationStatus;
  calculationNotes?: LocalizedText;
  sourceTrace?: Reference[];
  issueTemplateUrl?: string;
}
