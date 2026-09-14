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
  [["abstinencia neonatal", "neonatal abstinence", "neonatal withdrawal"], "neonatal_withdrawal"],
  [["encefalopatia neonatal", "ehi", "hie", "neonatal encephalopathy"], "neonatal_encephalopathy"],
  [["edad gestacional", "gestational age", "madurez gestacional"], "gestational_age_assessment"],
  [["ictericia", "jaundice", "bilirrubina", "bilirubin"], "hyperbilirubinemia"],
  [["lesion renal aguda", "aki", "acute kidney injury"], "acute_kidney_injury"],
  [["filtrado glomerular", "egfr", "funcion renal", "kidney function"], "kidney_function"],
  [["crohn", "enfermedad de crohn"], "crohn_disease"],
  [["colitis ulcerosa", "ulcerative colitis"], "ulcerative_colitis"],
  [["edad osea", "bone age"], "bone_age"],
  [["delirium", "delirio"], "delirium"],
  [["miositis juvenil", "dermatomiositis juvenil", "juvenile myositis", "juvenile dermatomyositis"], "juvenile_dermatomyositis"],
  [["migrana", "migraine"], "migraine"],
  [["multiples victimas", "mass casualty"], "mass_casualty"],
  [["dolor", "pain"], "acute_pain"],
  [["sepsis"], "sepsis"],
  [["crecimiento", "growth", "percentil", "percentile"], "growth"]
];

const functionMap: Array<[RegExp, ClinicalFunctionTag]> = [
  [/(gravedad|severidad|severity|clasificar gravedad)/, "severity"],
  [/(riesgo|risk)/, "risk_stratification"],
  [/(actividad|brote|activity|flare)/, "disease_activity"],
  [/(seguimiento|monitorizar|monitoring|follow.?up|evolucion)/, "longitudinal_monitoring"],
  [/(control habitual|control del asma|asthma control)/, "longitudinal_monitoring"],
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
  ageDays: number | undefined,
  language: Language
): { compatible: boolean; reason?: string } => {
  if (ageDays === undefined) return { compatible: true };
  const applicability = getToolDiscovery(toolId)?.exactAgeApplicability;
  if (!applicability) return { compatible: true };

  const belowMinimum = applicability.minimumAgeDays !== undefined && ageDays < applicability.minimumAgeDays;
  const aboveMaximum = applicability.maximumAgeDaysExclusive !== undefined && ageDays >= applicability.maximumAgeDaysExclusive;
  if (belowMinimum || aboveMaximum) {
    return {
      compatible: false,
      reason: language === "es"
        ? "La edad indicada queda fuera de la aplicabilidad definida para esta herramienta."
        : "The stated age is outside this tool's defined applicability."
    };
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
    alias: "El nombre o el acrónimo coincide con lo que has escrito.",
    problem: "Está diseñada para el problema clínico que describes.",
    age: "La edad indicada encaja con la población para la que se utiliza.",
    function: "Su objetivo clínico coincide con lo que necesitas valorar.",
    setting: "Encaja con el entorno asistencial que has indicado.",
    text: "También hay coincidencias relevantes en su población o descripción clínica.",
    local: "Puedes utilizar su cálculo directamente en PedsCore."
  };
  const en: Record<string,string> = {
    alias: "The name or acronym matches what you entered.",
    problem: "It is designed for the clinical problem you described.",
    age: "The stated age fits the population this tool is used for.",
    function: "Its clinical purpose matches what you want to assess.",
    setting: "It fits the care setting you described.",
    text: "There are also relevant matches in its population or clinical description.",
    local: "You can use its calculation directly in PedsCore."
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
        ? "Cuéntame el caso, la edad o qué necesitas valorar."
        : "Tell me about the case, the age, or what you need to assess.",
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

      const gate = strictAgeGate(tool.id, ageDays, language);
      const problemMatch = discovery.clinicalProblems.some((problem) => problems.includes(problem));
      const aliases = [...discovery.aliases.es, ...discovery.aliases.en].map(strip);
      const aliasMatch = aliases.some((alias) => alias && (normalized.includes(alias) || alias.includes(normalized)));
      const exactAliasMatch = aliases.some((alias) => alias === normalized);
      const phraseAliasMatch = aliases.some(
        (alias) => alias.includes(" ") && normalized.includes(alias)
      );
      const aliasTokenMatch = aliases.some(
        (alias) => alias.length >= 3 && normalized.split(" ").includes(alias)
      );
      const namedToolTokenMatch = [tool.shortName, tool.id]
        .filter((value): value is string => Boolean(value))
        .map(strip)
        .some((value) => normalized.split(" ").includes(value));

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

      if (aliasMatch) {
        score += exactAliasMatch ? 95 : phraseAliasMatch ? 90 : aliasTokenMatch ? 90 : 70;
        reasonKeys.add("alias");
      }
      if (namedToolTokenMatch) score += 8;
      if (problemMatch) { score += 45; reasonKeys.add("problem"); }

      const matchingFunctions = discovery.clinicalFunctions.filter((fn) => functions.includes(fn));
      if (matchingFunctions.length) { score += 28; reasonKeys.add("function"); }

      const matchingSettings = discovery.careSettings.filter((setting) => settings.includes(setting));
      if (matchingSettings.length) { score += 18; reasonKeys.add("setting"); }

      const aScore = ageScore(discovery.ageGroups, ageDays);
      if (aScore) { score += aScore; reasonKeys.add("age"); }

      const tokenHits = tokens.filter((token) => haystack.includes(token));
      if (tokenHits.length) { score += Math.min(24, tokenHits.length * 4); reasonKeys.add("text"); }

      if (discovery.surfaceStatus === "active") {
        score += 10;
      } else if (discovery.surfaceStatus === "draft") {
        score -= 12;
        caveats.push(language === "es"
          ? "La superficie está en preparación y todavía no forma parte del catálogo clínico disponible."
          : "This surface is still in preparation and is not yet part of the available clinical catalog.");
      } else if (discovery.surfaceStatus === "blocked") {
        score -= 28;
        caveats.push(language === "es"
          ? "La superficie tiene acceso clínico limitado; revisa sus restricciones antes de utilizarla."
          : "This surface has limited clinical access; review its restrictions before use.");
      } else if (discovery.surfaceStatus === "deprecated") {
        score -= 50;
        caveats.push(language === "es"
          ? "Esta superficie se conserva solo como referencia histórica."
          : "This surface is retained for historical reference only.");
      }

      if (discovery.calculationAvailability === "local_active") {
        score += 5;
        reasonKeys.add("local");
      } else if (discovery.calculationAvailability === "external_official") {
        caveats.push(language === "es"
          ? "Puedes consultar la referencia aquí, pero el uso operativo se realiza mediante una herramienta oficial externa."
          : "You can review the reference here, but operational use is through an official external tool.");
      } else if (discovery.calculationAvailability === "blocked_by_rights") {
        caveats.push(language === "es"
          ? "La referencia clínica está disponible, pero el instrumento completo no se reproduce en PedsCore por sus condiciones de uso."
          : "The clinical reference is available, but the full instrument is not reproduced in PedsCore because of its reuse conditions.");
      } else if (discovery.calculationAvailability === "blocked_by_evidence") {
        caveats.push(language === "es"
          ? "Puedes consultar la referencia, pero la implementación operativa sigue en revisión porque falta cerrar evidencia o definición."
          : "You can review the reference, but operational implementation remains under review because evidence or definition is not yet complete.");
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
        ? "Todavía no hay una coincidencia clara. Añade la edad, el problema clínico o qué necesitas valorar y afinamos la búsqueda."
        : "There is not a clear match yet. Add the age, clinical problem or what you need to assess and we can narrow it down.",
      matches: [],
      excluded: excluded.slice(0,3)
    };
  }

  const topName = matches[0].tool.name[language];
  const intro = language === "es"
    ? "Por el contexto que describes, " + topName + " parece la opción más relevante para empezar."
    : "Based on the context you described, " + topName + " looks like the most relevant place to start.";

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
