import {
  getToolDiscovery
} from "@peds-core/core";
import type {
  CareSettingTag,
  ClinicalFunctionTag,
  ClinicalToolMetadata,
  Language
} from "@peds-core/core";

export interface FinderMatch {
  tool: ClinicalToolMetadata;
  score: number;
  reasons: string[];
  caveats: string[];
}

export interface FinderExcluded {
  tool: ClinicalToolMetadata;
  reason: string;
}

export interface FinderClarification {
  prompt: string;
  options: string[];
}

export interface FinderResponse {
  intro: string;
  matches: FinderMatch[];
  excluded: FinderExcluded[];
  clarification?: FinderClarification;
}

const strip = (value: string): string =>
  value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s<>=.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const phraseMap: Array<[string[], string]> = [
  [["asma", "asthma", "crisis asmatica"], "asthma"],
  [["bronquiolitis", "bronchiolitis"], "bronchiolitis"],
  [["crup", "croup", "laringitis"], "croup"],
  [["fiebre", "febril", "fever", "febrile"], "fever"],
  [["tce", "traumatismo craneal", "head trauma", "head injury"], "head_trauma"],
  [["deshidratacion", "dehydration"], "dehydration"],
  [["apendicitis", "appendicitis"], "appendicitis"],
  [["dolor neonatal", "neonatal pain"], "neonatal_pain"],
  [["encefalopatia neonatal", "ehi", "hie", "neonatal encephalopathy"], "neonatal_encephalopathy"],
  [["edad gestacional", "gestational age", "madurez gestacional"], "gestational_age_assessment"],
  [["ictericia", "jaundice", "bilirrubina", "bilirubin"], "hyperbilirubinemia"],
  [["lesion renal aguda", "aki", "acute kidney injury"], "acute_kidney_injury"],
  [["filtrado glomerular", "egfr", "funcion renal", "kidney function"], "kidney_function"],
  [["crohn", "enfermedad de crohn"], "crohn_disease"],
  [["colitis ulcerosa", "ulcerative colitis"], "ulcerative_colitis"],
  [["edad osea", "bone age"], "bone_age"],
  [["delirium", "delirio"], "delirium"],
  [["dolor", "pain"], "acute_pain"],
  [["sepsis"], "sepsis"],
  [["crecimiento", "growth", "percentil", "percentile"], "growth"]
];

const functionMap: Array<[RegExp, ClinicalFunctionTag]> = [
  [/(gravedad|severidad|severity|clasificar gravedad)/, "severity"],
  [/(riesgo|risk)/, "risk_stratification"],
  [/(actividad|brote|activity|flare)/, "disease_activity"],
  [/(seguimiento|monitorizar|monitoring|follow.?up|evolucion)/, "longitudinal_monitoring"],
  [/(cribado|screening|screen)/, "screening"],
  [/(dolor|pain)/, "pain_assessment"],
  [/(sedacion|sedation)/, "sedation_assessment"],
  [/(pronostico|prognosis|mortalidad|mortality)/, "prognosis"],
  [/(estadio|stage|staging)/, "staging"],
  [/(desarrollo|development)/, "developmental_assessment"]
];

const settingMap: Array<[RegExp, CareSettingTag]> = [
  [/(urgencias|emergency|ed\b)/, "emergency_department"],
  [/(ucip|picu)/, "picu"],
  [/(ucin|nicu)/, "nicu"],
  [/(atencion primaria|primary care)/, "primary_care"],
  [/(consulta|clinic)/, "outpatient_clinic"],
  [/(prehospital|prehospitalario)/, "prehospital"]
];

const parseAgeDays = (query: string): number | undefined => {
  const match = strip(query).match(
    /(\d+(?:[.,]\d+)?)\s*(dias?|days?|semanas?|weeks?|meses?|months?|anos?|years?)/
  );
  if (!match) return undefined;
  const amount = Number(match[1].replace(",", "."));
  const unit = match[2];
  if (unit.startsWith("dia") || unit.startsWith("day")) return amount;
  if (unit.startsWith("sem") || unit.startsWith("week")) return amount * 7;
  if (unit.startsWith("mes") || unit.startsWith("month")) return amount * 30.4375;
  return amount * 365.25;
};

const strictAgeGate = (
  toolId: string,
  ageDays?: number
): { compatible: boolean; reason?: string } => {
  if (ageDays === undefined) return { compatible: true };
  const years = ageDays / 365.25;
  if (toolId === "pram" && (years < 2 || years >= 18)) {
    return { compatible: false, reason: "PRAM está validada para 2 a <18 años." };
  }
  if (toolId === "sipa" && (years < 4 || years >= 17)) {
    return { compatible: false, reason: "SIPA en PedsCore se limita a 4–16 años." };
  }
  if (toolId === "pecarn_tbi_under_2" && years >= 2) {
    return { compatible: false, reason: "La rama PECARN <2 años no corresponde a esta edad." };
  }
  if (toolId === "pecarn_tbi_2_or_more" && years < 2) {
    return { compatible: false, reason: "La rama PECARN ≥2 años no corresponde a esta edad." };
  }
  return { compatible: true };
};

const ageScore = (ageGroups: string[], ageDays?: number): number => {
  if (ageDays === undefined) return 0;
  const years = ageDays / 365.25;
  if (ageDays <= 28 && ageGroups.some((tag) => ["preterm","term_newborn","neonate_0_28d"].includes(tag))) return 30;
  if (ageDays <= 60 && ageGroups.includes("young_infant_0_60d")) return 30;
  if (ageDays <= 90 && ageGroups.includes("young_infant_0_90d")) return 30;
  if (years < 1 && ageGroups.includes("infant")) return 25;
  if (years >= 1 && years < 3 && ageGroups.includes("toddler")) return 25;
  if (years >= 3 && years < 6 && ageGroups.includes("preschool")) return 25;
  if (years >= 6 && years < 12 && ageGroups.includes("school_age")) return 25;
  if (years >= 12 && years < 18 && ageGroups.includes("adolescent")) return 25;
  if (ageGroups.includes("all_pediatric") || ageGroups.includes("age_defined_by_tool")) return 10;
  return 0;
};

const formatReason = (language: Language, key: string): string => {
  const es: Record<string,string> = {
    alias: "Coincide con el nombre, acrónimo o alias clínico.",
    problem: "Coincide con el problema clínico descrito.",
    age: "La edad es compatible con la población de la herramienta.",
    function: "Coincide con lo que quieres valorar.",
    setting: "Coincide con el entorno asistencial descrito.",
    text: "Hay coincidencias clínicas adicionales en nombre, población o descripción.",
    local: "La herramienta dispone de cálculo local en PedsCore."
  };
  const en: Record<string,string> = {
    alias: "Matches the name, acronym, or clinical alias.",
    problem: "Matches the clinical problem described.",
    age: "Age is compatible with the tool population.",
    function: "Matches what you want to assess.",
    setting: "Matches the care setting described.",
    text: "There are additional clinical matches in the name, population, or description.",
    local: "Local calculation is available in PedsCore."
  };
  return (language === "es" ? es : en)[key] ?? key;
};

export const runPedsCoreFinder = (
  tools: ClinicalToolMetadata[],
  query: string,
  language: Language
): FinderResponse => {
  const normalized = strip(query);
  if (!normalized) {
    return {
      intro: language === "es"
        ? "Descríbeme el paciente, el problema clínico o lo que quieres valorar."
        : "Describe the patient, clinical problem, or what you want to assess.",
      matches: [],
      excluded: []
    };
  }

  const ageDays = parseAgeDays(query);
  const problems = phraseMap
    .filter(([phrases]) => phrases.some((phrase) => normalized.includes(strip(phrase))))
    .map(([, problem]) => problem);
  const functions = functionMap
    .filter(([pattern]) => pattern.test(normalized))
    .map(([, fn]) => fn);
  const settings = settingMap
    .filter(([pattern]) => pattern.test(normalized))
    .map(([, setting]) => setting);
  const tokens = normalized.split(" ").filter((token) => token.length > 2);
  const excluded: FinderExcluded[] = [];

  const matches = tools
    .map((tool): FinderMatch | null => {
      const discovery = getToolDiscovery(tool.id);
      if (!discovery) return null;

      const gate = strictAgeGate(tool.id, ageDays);
      const problemMatch = discovery.clinicalProblems.some((problem) => problems.includes(problem));
      const aliases = [...discovery.aliases.es, ...discovery.aliases.en].map(strip);
      const aliasMatch = aliases.some((alias) => alias && (normalized.includes(alias) || alias.includes(normalized)));

      if (!gate.compatible) {
        if (problemMatch || aliasMatch) excluded.push({ tool, reason: gate.reason ?? "" });
        return null;
      }

      let score = 0;
      const reasonKeys = new Set<string>();
      const caveats: string[] = [];
      const haystack = strip([
        tool.name[language],
        tool.shortName ?? "",
        tool.population[language],
        tool.description[language],
        discovery.clinicalProblems.join(" "),
        aliases.join(" ")
      ].join(" "));

      if (aliasMatch) { score += 70; reasonKeys.add("alias"); }
      if (problemMatch) { score += 45; reasonKeys.add("problem"); }

      const matchingFunctions = discovery.clinicalFunctions.filter((fn) => functions.includes(fn));
      if (matchingFunctions.length) { score += 28; reasonKeys.add("function"); }

      const matchingSettings = discovery.careSettings.filter((setting) => settings.includes(setting));
      if (matchingSettings.length) { score += 18; reasonKeys.add("setting"); }

      const aScore = ageScore(discovery.ageGroups, ageDays);
      if (aScore) { score += aScore; reasonKeys.add("age"); }

      const tokenHits = tokens.filter((token) => haystack.includes(token));
      if (tokenHits.length) { score += Math.min(24, tokenHits.length * 4); reasonKeys.add("text"); }

      if (discovery.calculationAvailability === "local_active") {
        score += 5;
        reasonKeys.add("local");
      } else if (discovery.calculationAvailability === "external_official") {
        caveats.push(language === "es"
          ? "La referencia es activa, pero el uso operativo puede depender de una herramienta oficial externa."
          : "The reference is active, but operational use may depend on an external official tool.");
      } else if (discovery.calculationAvailability === "blocked_by_rights") {
        caveats.push(language === "es"
          ? "PedsCore puede mostrar la referencia clínica, pero no debe reproducir localmente el instrumento completo sin permiso."
          : "PedsCore can show the clinical reference, but should not reproduce the full instrument locally without permission.");
      } else if (discovery.calculationAvailability === "blocked_by_evidence") {
        caveats.push(language === "es"
          ? "La implementación operativa sigue bloqueada por evidencia o definición incompleta."
          : "Operational implementation remains blocked by incomplete evidence or definition.");
      }

      if (!score) return null;
      return {
        tool,
        score,
        reasons: [...reasonKeys].map((key) => formatReason(language, key)),
        caveats
      };
    })
    .filter((item): item is FinderMatch => Boolean(item))
    .sort((a,b) => b.score - a.score)
    .slice(0,5);

  if (!matches.length) {
    return {
      intro: language === "es"
        ? "No tengo una coincidencia suficientemente específica todavía. Añade edad, problema clínico o qué quieres valorar."
        : "I do not have a sufficiently specific match yet. Add age, the clinical problem, or what you want to assess.",
      matches: [],
      excluded: excluded.slice(0,3)
    };
  }

  const topName = matches[0].tool.name[language];
  const intro = language === "es"
    ? "Por el contexto que describes, empezaría revisando " + topName + "."
    : "Based on the context you described, I would start by reviewing " + topName + ".";

  let clarification: FinderClarification | undefined;
  if (problems.includes("asthma") && !functions.includes("severity") && !functions.includes("longitudinal_monitoring")) {
    clarification = language === "es"
      ? { prompt: "¿Qué quieres valorar del asma?", options: ["Gravedad del episodio actual","Control habitual / seguimiento"] }
      : { prompt: "What do you want to assess?", options: ["Current episode severity","Usual control / follow-up"] };
  } else if (problems.includes("neonatal_pain")) {
    clarification = language === "es"
      ? { prompt: "¿Qué tipo de dolor neonatal?", options: ["Procedimental / agudo","Prolongado","Postoperatorio","Dolor + sedación"] }
      : { prompt: "What type of neonatal pain?", options: ["Procedural / acute","Prolonged","Postoperative","Pain + sedation"] };
  } else if (ageDays === undefined && matches.some((m) => ["pram","sipa","pecarn_tbi_under_2","pecarn_tbi_2_or_more"].includes(m.tool.id))) {
    clarification = language === "es"
      ? { prompt: "La edad cambia la aplicabilidad. ¿Quieres añadirla?", options: ["Añadir edad al texto"] }
      : { prompt: "Age changes applicability. Add it to the query?", options: ["Add age to the text"] };
  }

  return {
    intro,
    matches,
    excluded: excluded.slice(0,3),
    clarification
  };
};
