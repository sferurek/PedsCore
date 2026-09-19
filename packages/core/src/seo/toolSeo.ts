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
  apgar: { es: "Test de Apgar — Calculadora neonatal | PedsCore", en: "Apgar Score Calculator — Newborn Assessment | PedsCore" },
  "silverman-andersen": { es: "Silverman-Andersen — Dificultad respiratoria | PedsCore", en: "Silverman-Andersen Score — Respiratory Distress | PedsCore" },
  ballard: { es: "New Ballard Score — Edad gestacional | PedsCore", en: "New Ballard Score — Gestational Age | PedsCore" },
  dubowitz: { es: "Escala de Dubowitz — Edad gestacional | PedsCore", en: "Dubowitz Score — Gestational Age Assessment | PedsCore" },
  sarnat: { es: "Sarnat clásico — Encefalopatía neonatal | PedsCore", en: "Classic Sarnat Staging — Neonatal Encephalopathy | PedsCore" },
  "modified-sarnat-nichd": { es: "Modified Sarnat Score — Encefalopatía neonatal | PedsCore", en: "Modified Sarnat Score — Neonatal Encephalopathy | PedsCore" },
  "thompson-hie-score": { es: "Thompson HIE Score — Encefalopatía neonatal | PedsCore", en: "Thompson HIE Score — Neonatal Encephalopathy | PedsCore" },
  cries: { es: "CRIES — Escala de dolor neonatal | PedsCore", en: "CRIES Pain Scale — Neonatal Pain | PedsCore" },
  nips: { es: "Escala NIPS — Dolor neonatal | PedsCore", en: "NIPS Pain Scale — Neonatal Pain Assessment | PedsCore" },
  "westley-croup-score": { es: "Westley Croup Score — Crup pediátrico | PedsCore", en: "Westley Croup Score — Pediatric Croup | PedsCore" },
  "wood-downes-ferres": { es: "Wood-Downes-Ferres — Bronquiolitis | PedsCore", en: "Wood-Downes-Ferres — Bronchiolitis | PedsCore" },
  pram: { es: "PRAM Score — Gravedad del asma pediátrica | PedsCore", en: "PRAM Score — Pediatric Asthma Severity | PedsCore" },
  "clinical-dehydration-scale": { es: "Clinical Dehydration Scale — Deshidratación | PedsCore", en: "Clinical Dehydration Scale — Dehydration | PedsCore" },
  "pediatric-appendicitis-score": { es: "Pediatric Appendicitis Score (PAS) | PedsCore", en: "Pediatric Appendicitis Score (PAS) | PedsCore" },
  "pecarn-tbi-under-2": { es: "PECARN TCE <2 años — Regla pediátrica | PedsCore", en: "PECARN TBI Under 2 — Pediatric Head Injury Rule | PedsCore" },
  "pecarn-tbi-2-or-more": { es: "PECARN TCE ≥2 años — Regla pediátrica | PedsCore", en: "PECARN TBI Age 2+ — Pediatric Head Injury Rule | PedsCore" },
  "catch-tbi": { es: "CATCH — Regla de TCE pediátrico | PedsCore", en: "CATCH Rule — Pediatric Head Injury | PedsCore" },
  "chalice-tbi": { es: "CHALICE — Regla de TCE pediátrico | PedsCore", en: "CHALICE Rule — Pediatric Head Injury | PedsCore" },
  sipa: { es: "SIPA — Índice de shock pediátrico por edad | PedsCore", en: "SIPA — Age-Adjusted Pediatric Shock Index | PedsCore" },
  "qtc-bazett": { es: "QTc Bazett — Calculadora pediátrica | PedsCore", en: "QTc Bazett Calculator — Pediatric QT | PedsCore" },
  "qtc-fridericia": { es: "QTc Fridericia — Calculadora pediátrica | PedsCore", en: "QTc Fridericia Calculator — Pediatric QT | PedsCore" },
  "qtc-framingham": { es: "QTc Framingham — Calculadora pediátrica | PedsCore", en: "QTc Framingham Calculator — Pediatric QT | PedsCore" },
  "qtc-hodges": { es: "QTc Hodges — Calculadora pediátrica | PedsCore", en: "QTc Hodges Calculator — Pediatric QT | PedsCore" },
  "bedside-schwartz": { es: "Bedside Schwartz — eGFR pediátrico | PedsCore", en: "Bedside Schwartz eGFR Calculator | PedsCore" },
  "revised-schwartz": { es: "Schwartz revisado — eGFR pediátrico | PedsCore", en: "Revised Schwartz eGFR Calculator | PedsCore" },
  "pediatric-burn-tbsa": { es: "TBSA quemaduras pediátricas — Calculadora | PedsCore", en: "Pediatric Burn TBSA Calculator | PedsCore" },
  "pediatric-glasgow-coma-scale": { es: "Glasgow pediátrico — Escala de coma | PedsCore", en: "Pediatric Glasgow Coma Scale (GCS) | PedsCore" },
  "phoenix-sepsis": { es: "Criterios Phoenix — Sepsis pediátrica | PedsCore", en: "Phoenix Sepsis Criteria — Pediatric Sepsis | PedsCore" },
  pim2: { es: "Calculadora PIM2 — Mortalidad pediátrica | PedsCore", en: "PIM2 Calculator — Pediatric Mortality Risk | PedsCore" },
  pim3: { es: "Calculadora PIM3 — Mortalidad pediátrica | PedsCore", en: "PIM3 Calculator — Pediatric Mortality Risk | PedsCore" },
  pipp: { es: "Escala PIPP — Dolor en prematuros | PedsCore", en: "PIPP Scale — Premature Infant Pain Profile | PedsCore" },
  "pipp-r": { es: "Escala PIPP-R — Dolor en prematuros | PedsCore", en: "PIPP-R Scale — Premature Infant Pain Profile | PedsCore" },
  "asthma-control-questionnaire": { es: "ACQ — Cuestionario de control del asma | PedsCore", en: "Asthma Control Questionnaire (ACQ) | PedsCore" },
  headsss: { es: "HEADSSS — Entrevista del adolescente | PedsCore", en: "HEADSSS Adolescent Interview | PedsCore" },
  pedmidas: { es: "PedMIDAS — Discapacidad por migraña pediátrica | PedsCore", en: "PedMIDAS Score — Pediatric Migraine Disability | PedsCore" },
  "orbegozo-growth-percentiles": { es: "Tablas Orbegozo — Percentiles de crecimiento | PedsCore", en: "Orbegozo Growth Charts — Pediatric Percentiles | PedsCore" }
};

const searchAliasOverrides: Record<string, Record<Language, string[]>> = {
  "asthma-control-questionnaire": {
    es: ["ACQ", "ACQ-5", "cuestionario de control del asma", "asma control test"],
    en: ["ACQ", "ACQ-5", "Asthma Control Questionnaire", "asthma control test"]
  },
  "qtc-fridericia": {
    es: ["QTc Fridericia", "calculadora QTc Fridericia", "fórmula de Fridericia"],
    en: ["QTc Fridericia", "QTc calculator Fridericia", "Fridericia formula"]
  },
  pram: {
    es: ["PRAM score", "Pediatric Respiratory Assessment Measure", "PRAM asma"],
    en: ["PRAM score", "Pediatric Respiratory Assessment Measure", "PRAM asthma score"]
  },
  nips: {
    es: ["NIPS", "Neonatal Infant Pain Scale", "escala de dolor neonatal NIPS"],
    en: ["NIPS", "Neonatal Infant Pain Scale", "NIPS neonatal pain scale"]
  },
  "pediatric-burn-tbsa": {
    es: ["TBSA quemaduras", "cálculo de superficie corporal quemada pediátrica"],
    en: ["burn TBSA", "pediatric burn TBSA calculator", "burn calculation in pediatrics"]
  },
  "pediatric-glasgow-coma-scale": {
    es: ["Glasgow pediátrico", "GCS pediátrico", "escala de coma de Glasgow pediátrica"],
    en: ["pediatric Glasgow Coma Scale", "pediatric GCS", "GCS pedia"]
  },
  "phoenix-sepsis": {
    es: ["criterios Phoenix sepsis pediátrica", "criterios Phoenix sepsis"],
    en: ["Phoenix criteria pediatric sepsis", "Phoenix sepsis criteria", "Phoenix criteria sepsis"]
  }
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
    ...(searchAliasOverrides[tool.slug]?.[language] ?? []),
    ...(discovery?.aliases[language === "es" ? "en" : "es"] ?? [])
  ].map((value) => value.trim()).filter(Boolean))].slice(0, 8);
  const baseDescription = tool.description[language] || tool.description.en;
  const population = tool.population[language] || tool.population.en;
  const preserveEarlySerpSnippet = tool.slug === "wood-downes-ferres" || tool.slug === "pim2";
  const description = tool.id === "who_growth_module"
    ? (language === "es"
      ? "Módulo WHO Growth con datos oficiales OMS, gráficas SVG imprimibles, percentiles escritos y punto del paciente."
      : "WHO Growth module with official WHO growth data, printable SVG charts, written percentiles and patient point.")
    : compact(
        language === "es"
          ? `${fullName}: ${baseDescription} ${tool.calculationStatus === "active" && !preserveEarlySerpSnippet ? "Cálculo activo. " : ""}Población: ${population}. ${preserveEarlySerpSnippet ? "Evidencia y estado de validación" : "Evidencia trazable"} en PedsCore.`
          : `${fullName}: ${baseDescription} ${tool.calculationStatus === "active" && !preserveEarlySerpSnippet ? "Active calculation. " : ""}Population: ${population}. ${preserveEarlySerpSnippet ? "Evidence and validation status" : "Traceable evidence"} in PedsCore.`,
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
