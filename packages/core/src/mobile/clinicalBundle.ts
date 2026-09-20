import { clinicalTools } from "../catalog/clinicalTools.js";
import { implementedCalculatorToolIds } from "../calculators/registry.js";
import type { ClinicalToolMetadata } from "../types.js";

export const MOBILE_CLINICAL_BUNDLE_SCHEMA_VERSION = "1.0.0" as const;

export interface MobileClinicalBundle {
  schemaVersion: typeof MOBILE_CLINICAL_BUNDLE_SCHEMA_VERSION;
  sourceRevision: string;
  generatedAt: string;
  tools: ClinicalToolMetadata[];
  calculatorToolIds: string[];
}

export interface CreateMobileClinicalBundleOptions {
  sourceRevision: string;
  generatedAt?: string;
}

/**
 * Serialisable mobile projection of the canonical PedsCore clinical registry.
 *
 * This function deliberately exports data and provenance only. Calculator
 * implementations remain canonical in @peds-core/core and must never be
 * transcribed by hand into a mobile client. Cross-runtime calculation
 * execution/parity is a separate adapter layer.
 */
export const createMobileClinicalBundle = ({
  sourceRevision,
  generatedAt = new Date().toISOString()
}: CreateMobileClinicalBundleOptions): MobileClinicalBundle => {
  if (sourceRevision.trim().length === 0) {
    throw new Error("sourceRevision is required for a mobile clinical bundle");
  }

  return {
    schemaVersion: MOBILE_CLINICAL_BUNDLE_SCHEMA_VERSION,
    sourceRevision,
    generatedAt,
    tools: clinicalTools,
    calculatorToolIds: [...implementedCalculatorToolIds]
  };
};
