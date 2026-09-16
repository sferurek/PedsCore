import type { ClinicalToolMetadata, Language, LocalizedText, ToolCategory } from "../types.js";
import { getAllTools } from "../catalog/clinicalTools.js";
import { getToolDiscovery } from "../discovery/toolDiscovery.js";

export interface ToolSeoProfile {
  title: string;
  description: string;
  primaryTerm: string;
  topic: string;
  aliases: string[];
}

export interface CategorySeoProfile {
  name: string;
  description: string;
}

const topicLabels: Record<string, LocalizedText> = {
  abdominal_pain: { es: "Dolor abdominal", en: "Abdominal Pain" },
  acute_kidney_injury: { es: "Lesión renal aguda", en: "Acute Kidney Injury" },
  adhd: { es: "TDAH", en: "ADHD" },
  anxiety: { es: "Ansiedad", en: "Anxiety" },
  appendicitis: { es: "Apendicitis pediátrica", en: "Pediatric Appendicitis" },
  asthma: { es: "Asma pediátrica", en: "Pediatric Asthma" },
  asthma_control: { es: "Control del asma", en: "Asthma Control" },
  asthma_wheezing: { es: "Asma y sibilancias", en: "Asthma & Wheeze" },
  bone_age: { es: "Edad ósea", en: "Bone Age" },
  bronchiolitis: { es: "Bronquiolitis", en: "Bronchiolitis" },
  bronchiolitis_wheezing: { es: "Bronquiolitis y sibilancias", en: "Bronchiolitis & Wheeze" },
  burns: { es: "Quemaduras pediátricas", en: "Pediatric Burns" },
  consciousness: { es: "Nivel de conciencia", en: "Consciousness" },
  croup: { es: "Crup", en: "Croup" },
  dehydration: { es: "Deshidratación", en: "Dehydration" },
  delirium: { es: "Delirium pediátrico", en: "Pediatric Delirium" },
  depression: { es: "Depresión adolescente", en: "Adolescent Depression" },
  developmental_screening: { es: "Cribado del desarrollo", en: "Developmental Screening" },
  diabetic_ketoacidosis: { es: "Cetoacidosis diabética", en: "Diabetic Ketoacidosis" },
  early_warning: { es: "Deterioro clínico", en: "Clinical Deterioration" },
  eating_disorder: { es: "Trastornos alimentarios", en: "Eating Disorders" },
  egfr: { es: "Filtrado glomerular", en: "eGFR" },
  electrocardiography: { es: "QT corregido pediátrico", en: "Pediatric QTc" },
  febrile_infant: { es: "Lactante febril", en: "Febrile Infant" },
  functional_status: { es: "Función pediátrica", en: "Pediatric Function" },
  gestational_age: { es: "Edad gestacional", en: "Gestational Age" },
  growth: { es: "Crecimiento y percentiles", en: "Growth & Percentiles" },
  head_trauma: { es: "Traumatismo craneal", en: "Head Trauma" },
  headache: { es: "Migraña pediátrica", en: "Pediatric Migraine" },
  heart_failure: { es: "Insuficiencia cardiaca", en: "Heart Failure" },
  hemophilic_arthropathy: { es: "Artropatía hemofílica", en: "Hemophilic Arthropathy" },
  hypoxic_ischemic_encephalopathy: { es: "Encefalopatía hipóxico-isquémica", en: "Hypoxic-Ischemic Encephalopathy" },
  inflammatory_bowel_disease: { es: "Enfermedad inflamatoria intestinal", en: "Inflammatory Bowel Disease" },
  jaundice_bilirubin: { es: "Ictericia neonatal", en: "Neonatal Jaundice" },
  juvenile_dermatomyositis: { es: "Dermatomiositis juvenil", en: "Juvenile Dermatomyositis" },
  juvenile_idiopathic_arthritis: { es: "Artritis idiopática juvenil", en: "Juvenile Idiopathic Arthritis" },
  juvenile_systemic_sclerosis: { es: "Esclerosis sistémica juvenil", en: "Juvenile Systemic Sclerosis" },
  kidney_function: { es: "Función renal pediátrica", en: "Pediatric Kidney Function" },
  liver_failure: { es: "Enfermedad hepática pediátrica", en: "Pediatric Liver Disease" },
  malnutrition_risk: { es: "Riesgo nutricional", en: "Nutrition Risk" },
  mass_casualty: { es: "Triaje pediátrico IMV", en: "Pediatric MCI Triage" },
  meningitis: { es: "Meningitis pediátrica", en: "Pediatric Meningitis" },
  mortality_risk: { es: "Riesgo de mortalidad", en: "Mortality Risk" },
  musculoskeletal_examination: { es: "Exploración musculoesquelética", en: "Musculoskeletal Exam" },
  myositis: { es: "Miositis pediátrica", en: "Pediatric Myositis" },
  necrotizing_enterocolitis: { es: "Enterocolitis necrosante", en: "Necrotizing Enterocolitis" },
  neonatal_abstinence: { es: "Abstinencia neonatal", en: "Neonatal Withdrawal" },
  neonatal_encephalopathy: { es: "Encefalopatía neonatal", en: "Neonatal Encephalopathy" },
  neonatal_life_support: { es: "Reanimación neonatal", en: "Neonatal Resuscitation" },
  neonatal_pain: { es: "Dolor neonatal", en: "Neonatal Pain" },
  neonatal_sepsis: { es: "Sepsis neonatal", en: "Neonatal Sepsis" },
  neonatal_severity: { es: "Gravedad neonatal", en: "Neonatal Severity" },
  neonatal_withdrawal: { es: "Abstinencia neonatal", en: "Neonatal Withdrawal" },
  newborn_transition: { es: "Valoración del recién nacido", en: "Newborn Assessment" },
  organ_dysfunction: { es: "Disfunción orgánica", en: "Organ Dysfunction" },
  pain_sedation: { es: "Dolor y sedación neonatal", en: "Neonatal Pain & Sedation" },
  patient_safety: { es: "Seguridad del paciente", en: "Patient Safety" },
  pediatric_life_support: { es: "Reanimación pediátrica", en: "Pediatric Resuscitation" },
  pediatric_pain: { es: "Dolor pediátrico", en: "Pediatric Pain" },
  pneumonia: { es: "Neumonía pediátrica", en: "Pediatric Pneumonia" },
  prolonged_pain: { es: "Dolor neonatal prolongado", en: "Prolonged Neonatal Pain" },
  psychosocial_risk: { es: "Riesgo psicosocial adolescente", en: "Adolescent Psychosocial Risk" },
  psychosocial_screening: { es: "Cribado psicosocial", en: "Psychosocial Screening" },
  pubertal_development: { es: "Desarrollo puberal", en: "Pubertal Development" },
  regional_musculoskeletal_examination: { es: "Exploración musculoesquelética", en: "Musculoskeletal Exam" },
  respiratory_distress: { es: "Dificultad respiratoria neonatal", en: "Neonatal Respiratory Distress" },
  sedation: { es: "Sedación pediátrica", en: "Pediatric Sedation" },
  sedation_pain: { es: "Dolor y sedación neonatal", en: "Neonatal Pain & Sedation" },
  sepsis: { es: "Sepsis pediátrica", en: "Pediatric Sepsis" },
  shock: { es: "Shock pediátrico", en: "Pediatric Shock" },
  stroke: { es: "Ictus pediátrico", en: "Pediatric Stroke" },
  substance_use: { es: "Consumo de sustancias", en: "Substance Use" },
  suicide_risk: { es: "Riesgo suicida", en: "Suicide Risk" },
  systemic_vasculitis: { es: "Vasculitis pediátrica", en: "Pediatric Vasculitis" },
  withdrawal: { es: "Abstinencia pediátrica", en: "Pediatric Withdrawal" }
};

const titleOverrides: Record<string, LocalizedText> = {
  pim2: { es: "Calculadora PIM2 — Mortalidad pediátrica | PedsCore", en: "PIM2 Calculator — Pediatric Mortality Risk | PedsCore" },
  pim3: { es: "Calculadora PIM3 — Mortalidad pediátrica | PedsCore", en: "PIM3 Calculator — Pediatric Mortality Risk | PedsCore" },
  nips: { es: "Escala NIPS — Dolor neonatal | PedsCore", en: "NIPS Pain Scale — Neonatal Pain Assessment | PedsCore" },
  pipp: { es: "Escala PIPP — Dolor en prematuros | PedsCore", en: "PIPP Scale — Premature Infant Pain Profile | PedsCore" },
  "pipp-r": { es: "Escala PIPP-R — Dolor en prematuros | PedsCore", en: "PIPP-R Scale — Premature Infant Pain Profile | PedsCore" },
  dubowitz: { es: "Escala de Dubowitz — Edad gestacional | PedsCore", en: "Dubowitz Score — Gestational Age Assessment | PedsCore" },
  "asthma-control-questionnaire": { es: "ACQ — Cuestionario de control del asma | PedsCore", en: "Asthma Control Questionnaire (ACQ) | PedsCore" },
  headsss: { es: "HEADSSS — Entrevista del adolescente | PedsCore", en: "HEADSSS Adolescent Interview | PedsCore" },
  pedmidas: { es: "PedMIDAS — Discapacidad por migraña pediátrica | PedsCore", en: "PedMIDAS Score — Pediatric Migraine Disability | PedsCore" },
  "orbegozo-growth-percentiles": { es: "Tablas Orbegozo — Percentiles de crecimiento | PedsCore", en: "Orbegozo Growth Charts — Pediatric Percentiles | PedsCore" }
};

const categoryProfiles: Record<ToolCategory, Record<Language, CategorySeoProfile>> = {
  neonatology: {
    es: { name: "Neonatología", description: "Escalas neonatales para transición, edad gestacional, encefalopatía, dolor, ictericia, crecimiento y gravedad." },
    en: { name: "Neonatology", description: "Neonatal scores for transition, gestational age, encephalopathy, pain, jaundice, growth and severity." }
  },
  respiratory: {
    es: { name: "Respiratorio", description: "Herramientas pediátricas para asma, bronquiolitis, crup, neumonía y dificultad respiratoria." },
    en: { name: "Respiratory", description: "Pediatric tools for asthma, bronchiolitis, croup, pneumonia and respiratory distress." }
  },
  emergency: {
    es: { name: "Urgencias pediátricas", description: "Reglas pediátricas para trauma, deshidratación, apendicitis, shock, lactante febril, meningitis y triaje." },
    en: { name: "Pediatric emergency", description: "Pediatric rules for trauma, dehydration, appendicitis, shock, febrile infants, meningitis and triage." }
  },
  cardiology: {
    es: { name: "Cardiología", description: "Calculadoras y escalas pediátricas para electrocardiografía, QT corregido e insuficiencia cardiaca." },
    en: { name: "Cardiology", description: "Pediatric calculators and scores for electrocardiography, corrected QT and heart failure." }
  },
  nephrology: {
    es: { name: "Nefrología", description: "Herramientas pediátricas para filtrado glomerular, función renal y lesión renal aguda." },
    en: { name: "Nephrology", description: "Pediatric tools for glomerular filtration, kidney function and acute kidney injury." }
  },
  intensive_care: {
    es: { name: "Cuidados intensivos", description: "Scores pediátricos de gravedad, disfunción orgánica, mortalidad, sepsis, delirium y sedación en UCI." },
    en: { name: "Intensive care", description: "Pediatric ICU scores for severity, organ dysfunction, mortality, sepsis, delirium and sedation." }
  },
  growth_nutrition: {
    es: { name: "Crecimiento y nutrición", description: "Percentiles, crecimiento, edad ósea, desarrollo puberal y cribado nutricional pediátrico." },
    en: { name: "Growth and nutrition", description: "Percentiles, growth, bone age, pubertal development and pediatric nutrition screening." }
  },
  pain: {
    es: { name: "Dolor", description: "Escalas de dolor neonatal y pediátrico para observación clínica y autoevaluación según edad y contexto." },
    en: { name: "Pain", description: "Neonatal and pediatric pain scales for clinical observation and age-appropriate self-report." }
  },
  neurology: {
    es: { name: "Neurología", description: "Escalas pediátricas para conciencia, ictus, migraña y otros problemas neurológicos." },
    en: { name: "Neurology", description: "Pediatric scales for consciousness, stroke, migraine and other neurologic conditions." }
  },
  rheumatology: {
    es: { name: "Reumatología", description: "Escalas pediátricas para artritis, vasculitis, miositis y exploración musculoesquelética." },
    en: { name: "Rheumatology", description: "Pediatric scores for arthritis, vasculitis, myositis and musculoskeletal examination." }
  },
  gastroenterology: {
    es: { name: "Gastroenterología", description: "Índices pediátricos para actividad de enfermedad inflamatoria intestinal y otras herramientas digestivas." },
    en: { name: "Gastroenterology", description: "Pediatric indices for inflammatory bowel disease activity and other gastrointestinal tools." }
  },
  behavioral_health: {
    es: { name: "Salud mental y conducta", description: "Herramientas pediátricas de cribado psicosocial, ansiedad y salud conductual." },
    en: { name: "Behavioral health", description: "Pediatric tools for psychosocial screening, anxiety and behavioral health." }
  },
  resuscitation: {
    es: { name: "Reanimación", description: "Algoritmos pediátricos y neonatales de soporte vital, bradicardia, taquicardia y ritmos de parada." },
    en: { name: "Resuscitation", description: "Pediatric and neonatal life-support algorithms for arrest, bradycardia, tachycardia and cardiac rhythms." }
  },
  adolescent_medicine: {
    es: { name: "Medicina del adolescente", description: "Entrevista y cribado de salud mental, sustancias, desarrollo y riesgo psicosocial adolescente." },
    en: { name: "Adolescent medicine", description: "Adolescent screening for mental health, substance use, development and psychosocial risk." }
  }
};

const kindLabel = (tool: ClinicalToolMetadata, language: Language): string => {
  const labels: Record<string, LocalizedText> = {
    scale: { es: "Escala", en: "Scale" },
    score: { es: "Score", en: "Score" },
    calculator: { es: "Calculadora", en: "Calculator" },
    clinical_rule: { es: "Regla", en: "Rule" },
    algorithm: { es: "Algoritmo", en: "Algorithm" },
    percentile: { es: "Percentiles", en: "Percentiles" },
    nomogram: { es: "Nomograma", en: "Nomogram" }
  };
  return labels[tool.type]?.[language] ?? (language === "es" ? "Herramienta" : "Tool");
};

const compact = (value: string, max: number): string =>
  value.length <= max ? value : `${value.slice(0, Math.max(0, max - 1)).trim()}…`;

export const getToolSeoTopic = (tool: ClinicalToolMetadata, language: Language): string =>
  topicLabels[tool.subcategory]?.[language] ?? tool.subcategory.replaceAll("_", " ");

export const getToolSeoProfile = (
  tool: ClinicalToolMetadata,
  language: Language
): ToolSeoProfile => {
  const discovery = getToolDiscovery(tool.id);
  const fullName = (tool.name[language] || tool.name.en || tool.shortName || tool.slug).trim();
  const shortName = (tool.shortName || fullName).trim();
  const topic = getToolSeoTopic(tool, language);
  const override = titleOverrides[tool.slug]?.[language];
  const candidates = [
    `${fullName} — ${topic} | PedsCore`,
    `${shortName} — ${topic} | PedsCore`,
    `${kindLabel(tool, language)} ${fullName} | PedsCore`,
    `${fullName} | PedsCore`,
    `${shortName} | PedsCore`
  ];
  const title = override ?? candidates.find((value) => value.length <= 60) ?? `${shortName.slice(0, 46).trim()} | PedsCore`;
  const aliases = [...new Set([
    shortName,
    ...(discovery?.aliases[language] ?? []),
    ...(discovery?.aliases[language === "es" ? "en" : "es"] ?? [])
  ].map((value) => value.trim()).filter(Boolean))].slice(0, 8);
  const baseDescription = tool.description[language] || tool.description.en;
  const population = tool.population[language] || tool.population.en;
  const description = tool.id === "who_growth_module"
    ? (language === "es"
      ? "Módulo WHO Growth con datos oficiales OMS, gráficas SVG imprimibles, percentiles escritos y punto del paciente."
      : "WHO Growth module with official WHO growth data, printable SVG charts, written percentiles and patient point.")
    : compact(
        language === "es"
          ? `${fullName}: ${baseDescription} Población: ${population}. Evidencia y estado de validación en PedsCore.`
          : `${fullName}: ${baseDescription} Population: ${population}. Evidence and validation status in PedsCore.`,
        158
      );
  return { title, description, primaryTerm: fullName, topic, aliases };
};

export const getCategorySeoProfile = (
  category: ToolCategory,
  language: Language
): CategorySeoProfile => categoryProfiles[category][language];

export const indexableSeoCategories = Object.keys(categoryProfiles) as ToolCategory[];

export const getSemanticRelatedTools = (
  tool: ClinicalToolMetadata,
  limit = 8
): ClinicalToolMetadata[] => {
  const all = getAllTools();
  const byId = new Map(all.map((item) => [item.id, item]));
  const discovery = getToolDiscovery(tool.id);
  const selected: ClinicalToolMetadata[] = [];
  const seen = new Set<string>([tool.id]);

  const add = (candidate: ClinicalToolMetadata | undefined) => {
    if (!candidate || seen.has(candidate.id) || selected.length >= limit) return;
    seen.add(candidate.id);
    selected.push(candidate);
  };

  for (const id of discovery?.relatedToolIds ?? []) add(byId.get(id));

  if (discovery?.comparisonGroupIds.length) {
    for (const candidate of all) {
      const candidateDiscovery = getToolDiscovery(candidate.id);
      if (candidateDiscovery?.comparisonGroupIds.some((group) => discovery.comparisonGroupIds.includes(group))) {
        add(candidate);
      }
    }
  }

  for (const candidate of all) {
    if (candidate.subcategory === tool.subcategory) add(candidate);
  }

  for (const candidate of all) {
    if (candidate.category === tool.category) add(candidate);
  }

  return selected.slice(0, limit);
};
