export type SourceType =
  "SENEO_RECOMMENDATION" | "EVIDENCE_CONTEXT" | "SIMULATION_ASSUMPTION";
export type Mode = "learning" | "simulation" | "assessment";
export type Category =
  "Valoración" | "Ventilación" | "Monitorización" | "Oxígeno" | "Circulación";
export type ActionId =
  | "initial"
  | "clamp"
  | "assess"
  | "hr"
  | "chest"
  | "ppv"
  | "correct"
  | "stopPpv"
  | "ecg"
  | "spo2"
  | "oxygenUp"
  | "oxygenDown"
  | "compress"
  | "stopCompress"
  | "suction"
  | "intubate"
  | "laryngeal"
  | "repairCircuit"
  | "replaceMask";
export type EquipmentId =
  | "heat"
  | "ventilator"
  | "circuit"
  | "mask"
  | "suction"
  | "spo2"
  | "ecg"
  | "laryngoscope"
  | "tube"
  | "airway"
  | "context";
export interface Equipment {
  id: EquipmentId;
  name: string;
  detail: string;
  fault: string | null;
  checked: boolean;
  corrected: boolean;
  checkedAt?: number;
  correctedAt?: number;
}
export interface Preflight {
  elapsed: number;
  limit: number;
  seed: number;
  items: Equipment[];
  pending: { id: EquipmentId; kind: "check" | "fix"; remaining: number } | null;
  done: boolean;
}
export interface Physiology {
  hr: number;
  spo2: number;
  breathing: boolean;
  tone: "disminuido" | "en mejoría";
  effectiveSeconds: number;
  chest: boolean;
}
export interface Observation<T> {
  value: T;
  at: number;
  method: string;
}
export interface Observed {
  hr: Observation<number> | null;
  spo2: Observation<number> | null;
  breathing: Observation<boolean> | null;
  tone: Observation<Physiology["tone"]> | null;
  chest: Observation<boolean> | null;
}
export interface Event {
  at: number;
  label: string;
  kind: "action" | "physiology" | "control";
  action?: ActionId;
  sourceType: SourceType;
  internal?: boolean;
  snapshot?: Physiology;
  fio2?: number;
}
export interface State {
  time: number;
  status: "running" | "finished";
  reason: "manual" | "timeout" | "endpoint" | null;
  mode: Mode;
  internal: Physiology;
  observed: Observed;
  preflight: Preflight;
  repairedEquipment: EquipmentId[];
  pending: { id: ActionId; remaining: number; startedAt: number } | null;
  support: {
    ppv: boolean;
    corrected: boolean;
    compressed: boolean;
    airway: "mask" | "tube" | "laryngeal";
    fio2: number;
    cordClamped: boolean;
  };
  monitors: { ecgAt: number | null; spo2At: number | null };
  events: Event[];
  completed: ActionId[];
  recoveryAt: number | null;
  reassessedAt: number | null;
  withdrawnAt: number | null;
  stableFor: number;
  milestones: string[];
}
export interface ActionDefinition {
  id: ActionId;
  label: string;
  category: Category;
  durationSec: number;
  repeatable: boolean;
  oneShot: boolean;
  ongoing: boolean;
  sourceType: SourceType;
  available: (state: State) => boolean;
  unavailable: string;
  apply: (state: State) => void;
}
export interface Scenario {
  metadata: { id: string; title: string; context: string; gestation: string };
  initialState: Physiology;
  actionDefinitions: ActionDefinition[];
  physiology: {
    advance: (state: State, dt: number) => void;
    sourceType: SourceType;
  };
  observationRules: {
    ecgDelaySec: number;
    spo2DelaySec: number;
    sourceType: SourceType;
  };
  endpoints: {
    maxDurationSec: number;
    stabilitySec: number;
    reached: (state: State) => boolean;
    sourceType: SourceType;
  };
  preflight: { durationSec: number; faultCount: number };
  debriefRules: {
    id: string;
    title: string;
    actions: ActionId[];
    recommendation: string;
    why: string;
    sourceId: string;
  }[];
  sourceMetadata: string[];
}
