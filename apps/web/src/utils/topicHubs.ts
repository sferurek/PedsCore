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
];

export const getSeoTopicHub = (slug: string | undefined): SeoTopicHub | undefined =>
  seoTopicHubs.find((hub) => hub.slug === slug);
