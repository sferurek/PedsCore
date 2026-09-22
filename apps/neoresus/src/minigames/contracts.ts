import type { SourceType } from "../engine/types";
/** Independent technical training contracts, never required to complete a case. */
export interface TechnicalEvent {
  atMs: number;
  type: "inflation" | "compression" | "seal" | "correction";
  value?: number;
}
export interface TechnicalSession {
  module: "ventilation" | "compressions" | "equipment";
  events: TechnicalEvent[];
  profileId: string;
}
export interface TechnicalProfile {
  id: string;
  sourceType: SourceType;
  targetRate?: number;
  ratio?: [number, number];
  maxPauseMs?: number;
}
export interface TechnicalDebrief {
  intervalsMs: number[];
  pausesMs: number[];
  ratePerMinute: number | null;
  regularity: number | null;
  reflections: string[];
}
