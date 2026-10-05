import type { Language } from "./language";

export interface SeoTopicHub {
  slug: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  intro: Record<Language, string>;
  toolIds: string[];
}

export const seoTopicHubs: SeoTopicHub[] = [
  {
    slug: "pediatric-head-injury-rules",
    title: {
      es: "Reglas de TCE pediátrico: PECARN, CATCH y CHALICE",
      en: "Pediatric Head Injury Rules: PECARN, CATCH and CHALICE"
    },
    description: {
      es: "Compara las reglas PECARN, CATCH y CHALICE para traumatismo craneal pediátrico, con población, evidencia, limitaciones y acceso a cada ficha.",
      en: "Compare PECARN, CATCH and CHALICE pediatric head injury rules, including population, evidence, limitations and links to each tool."
    },
    intro: {
      es: "Estas reglas no son intercambiables: fueron derivadas en poblaciones y con desenlaces distintos. Revisa la edad, criterios de inclusión, finalidad y limitaciones de cada una antes de utilizarla.",
      en: "These rules are not interchangeable: they were derived in different populations and against different outcomes. Review age, inclusion criteria, purpose and limitations before use."
    },
    toolIds: ["pecarn_tbi_under_2", "pecarn_tbi_2_or_more", "catch_tbi", "chalice_tbi"]
  },
  {
    slug: "neonatal-pain-scales",
    title: {
      es: "Escalas de dolor neonatal: NIPS, CRIES, PIPP y COMFORTneo",
      en: "Neonatal Pain Scales: NIPS, CRIES, PIPP and COMFORTneo"
    },
    description: {
      es: "Guía de escalas de dolor neonatal en PedsCore: NIPS, CRIES, PIPP/PIPP-R y COMFORTneo, con contexto clínico, estado y evidencia.",
      en: "PedsCore guide to neonatal pain scales: NIPS, CRIES, PIPP/PIPP-R and COMFORTneo, with clinical context, status and evidence."
    },
    intro: {
      es: "La elección depende de la edad gestacional, el tipo de dolor, el contexto asistencial y la versión validada. PedsCore muestra de forma explícita qué escalas tienen cálculo local y cuáles permanecen como referencia por evidencia o derechos.",
      en: "Choice depends on gestational age, pain type, care setting and validated version. PedsCore explicitly shows which scales have local calculation and which remain reference-only because of evidence or reuse constraints."
    },
    toolIds: ["nips", "cries", "pipp", "pipp_r", "comfortneo"]
  },
  {
    slug: "neonatal-encephalopathy-scores",
    title: {
      es: "Escalas de encefalopatía neonatal: Sarnat y Thompson",
      en: "Neonatal Encephalopathy Scores: Sarnat and Thompson"
    },
    description: {
      es: "Compara Sarnat clásico, Modified Sarnat/NICHD, Thompson HIE y García-Alix para valoración de encefalopatía neonatal.",
      en: "Compare Classic Sarnat, Modified Sarnat/NICHD, Thompson HIE and García-Alix approaches to neonatal encephalopathy assessment."
    },
    intro: {
      es: "Las escalas describen constructos y momentos de evaluación relacionados pero no idénticos. La puntuación no debe convertirse por sí sola en una decisión terapéutica; revisa la versión y el contexto clínico de cada ficha.",
      en: "These tools describe related but non-identical constructs and assessment windows. A score alone should not be converted into a treatment decision; review each tool's version and clinical context."
    },
    toolIds: ["sarnat", "modified_sarnat_nichd", "thompson_hie", "garcia_alix_ne_rs"]
  },
  {
    slug: "pediatric-asthma-wheeze-scores",
    title: {
      es: "Scores de asma y sibilancias pediátricas: PRAM, PASS y Wood-Downes-Ferres",
      en: "Pediatric Asthma and Wheeze Scores: PRAM, PASS and Wood-Downes-Ferres"
    },
    description: {
      es: "Compara PRAM, PASS y Wood-Downes-Ferres para gravedad respiratoria pediátrica, con población, contexto, evidencia y disponibilidad.",
      en: "Compare PRAM, PASS and Wood-Downes-Ferres for pediatric respiratory severity, including population, setting, evidence and availability."
    },
    intro: {
      es: "Estas herramientas no deben tratarse como equivalentes. PRAM está orientado a exacerbación asmática; otras variantes se desarrollaron para contextos respiratorios diferentes. PedsCore conserva esas diferencias en cada ficha.",
      en: "These tools should not be treated as equivalent. PRAM targets acute asthma exacerbation, while other variants were developed for different respiratory contexts. PedsCore preserves those distinctions on each tool page."
    },
    toolIds: ["pram", "pass", "wood_downes_ferres"]
  }
,
  {
    slug: "pediatric-febrile-infant-tools",
    title: {
      es: "Lactante febril: Step-by-Step, PECARN y Yale",
      en: "Febrile Infant Tools: Step-by-Step, PECARN and Yale"
    },
    description: {
      es: "Herramientas para lactante y niño febril: Step-by-Step, PECARN Febrile Infant, Yale y Bacterial Meningitis Score, con población y evidencia.",
      en: "Febrile infant and child tools including Step-by-Step, PECARN Febrile Infant, Yale and Bacterial Meningitis Score, with population and evidence."
    },
    intro: {
      es: "Estas herramientas responden a preguntas clínicas diferentes y usan rangos de edad, variables y desenlaces distintos. Comprueba siempre la población exacta y los criterios de exclusión.",
      en: "These tools answer different clinical questions and use different age ranges, variables and outcomes. Always verify the exact population and exclusion criteria."
    },
    toolIds: ["step_by_step", "pecarn_febrile_infant", "yos", "bacterial_meningitis_score"]
  },
  {
    slug: "pediatric-intensive-care-scores",
    title: {
      es: "Scores de UCI pediátrica: PIM, PRISM, PELOD y pSOFA",
      en: "Pediatric ICU Scores: PIM, PRISM, PELOD and pSOFA"
    },
    description: {
      es: "Compara PIM2/PIM3, PRISM IV, PELOD-2, pSOFA y Phoenix en cuidados intensivos pediátricos, con finalidad, población y limitaciones.",
      en: "Compare PIM2/PIM3, PRISM IV, PELOD-2, pSOFA and Phoenix in pediatric intensive care, including purpose, population and limitations."
    },
    intro: {
      es: "Los scores pronósticos, de disfunción orgánica y de sepsis no son intercambiables. El momento de recogida, la población y el objetivo de cada herramienta condicionan su interpretación.",
      en: "Prognostic, organ-dysfunction and sepsis scores are not interchangeable. Sampling window, population and intended purpose determine how each tool should be interpreted."
    },
    toolIds: ["pim2", "pim3", "prism_iv", "pelod_2", "psofa", "phoenix_sepsis"]
  },
  {
    slug: "pediatric-kidney-function-aki-tools",
    title: {
      es: "Función renal y lesión renal aguda pediátrica",
      en: "Pediatric Kidney Function and AKI Tools"
    },
    description: {
      es: "Calculadoras y criterios pediátricos de función renal y LRA: Bedside Schwartz, CKiD U25, pRIFLE y KDIGO, con alcance y limitaciones.",
      en: "Pediatric kidney function and AKI tools: Bedside Schwartz, CKiD U25, pRIFLE and KDIGO, with scope, inputs and limitations."
    },
    intro: {
      es: "La estimación de filtrado glomerular y la clasificación de lesión renal aguda miden constructos distintos. Revisa unidades, edad, creatinina basal y criterios temporales antes de comparar resultados.",
      en: "Estimated glomerular filtration and acute kidney injury staging measure different constructs. Review units, age, baseline creatinine and time criteria before comparing results."
    },
    toolIds: ["bedside_schwartz", "revised_schwartz", "ckid_u25", "prifle", "kdigo_pediatric"]
  },
  {
    slug: "preterm-pediatric-growth-tools",
    title: {
      es: "Percentiles y crecimiento pediátrico: Fenton, OMS y CDC",
      en: "Pediatric Growth Charts: Fenton, WHO and CDC"
    },
    description: {
      es: "Herramientas de crecimiento pediátrico y neonatal: Fenton 2025, percentiles OMS, CDC, IMC y perímetro cefálico, con población y rango de edad.",
      en: "Pediatric and neonatal growth tools including Fenton 2025, WHO and CDC percentiles, BMI and head circumference, with population and age range."
    },
    intro: {
      es: "Las referencias de crecimiento dependen de edad gestacional o cronológica, sexo, variable antropométrica y población de referencia. Selecciona el estándar correspondiente antes de interpretar un percentil.",
      en: "Growth references depend on gestational or chronological age, sex, anthropometric measure and reference population. Select the appropriate standard before interpreting a percentile."
    },
    toolIds: ["fenton_2025_growth", "who_growth_percentiles", "who_growth_module", "cdc_growth_percentiles", "bmi_percentile", "head_circumference_percentile"]
  },
  {
    slug: "pediatric-croup-scores",
    title: {
      es: "Escalas de crup pediátrico: Taussig y Westley",
      en: "Pediatric Croup Scores: Taussig and Westley"
    },
    description: {
      es: "Compara Taussig Croup Score y Westley Croup Score para valorar gravedad del crup pediátrico, con componentes, interpretación y evidencia.",
      en: "Compare Taussig Croup Score and Westley Croup Score for pediatric croup severity, including components, interpretation and evidence."
    },
    intro: {
      es: "Taussig y Westley no deben asumirse equivalentes. Revisa los componentes, la versión implementada y el contexto clínico antes de interpretar la puntuación.",
      en: "Taussig and Westley should not be assumed equivalent. Review components, implemented version and clinical context before interpreting the score."
    },
    toolIds: ["taussig_croup", "westley_croup"]
  },];

export const getSeoTopicHub = (slug: string | undefined): SeoTopicHub | undefined =>
  seoTopicHubs.find((hub) => hub.slug === slug);
