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
