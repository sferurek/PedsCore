import type { ClinicalToolMetadata, Language, LocalizedText } from "@peds-core/core";

interface EditorialPoint {
  title: LocalizedText;
  body: LocalizedText;
}

interface EditorialProfile {
  strapline: LocalizedText;
  points: EditorialPoint[];
  sourceReferenceIds: string[];
}

const editorialProfiles: Record<string, EditorialProfile> = {
  pram: {
    strapline: {
      es: "Una escala de gravedad para asma aguda pensada para seguir el estado clínico, no para sustituir la valoración médica.",
      en: "An acute-asthma severity score designed to track clinical status, not replace clinical judgment."
    },
    points: [
      {
        title: { es: "Dónde aporta más", en: "Where it adds most" },
        body: {
          es: "Fue desarrollada para cuantificar la gravedad de la obstrucción de la vía aérea y su cambio con el tiempo. Su validación pediátrica abarca de 2 a 17 años.",
          en: "It was developed to quantify airway-obstruction severity and change over time. Pediatric validation spans ages 2 to 17 years."
        }
      },
      {
        title: { es: "Qué conviene recordar", en: "What to keep in mind" },
        body: {
          es: "El resultado resume cinco hallazgos clínicos y debe interpretarse junto con el contexto, la evolución y la respuesta clínica global.",
          en: "The result summarizes five clinical findings and should be interpreted alongside context, trajectory and the overall clinical response."
        }
      },
      {
        title: { es: "Qué no hace", en: "What it does not do" },
        body: {
          es: "No decide por sí sola tratamiento, alta, ingreso ni necesidad de pruebas complementarias.",
          en: "It does not by itself determine treatment, discharge, admission or the need for additional testing."
        }
      }
    ],
    sourceReferenceIds: ["pram_2000_original", "pram_2008_validation", "pram_2010_external_validation"]
  },
  pecarn_tbi_under_2: {
    strapline: {
      es: "Regla de muy bajo riesgo para TCE leve en menores de 2 años, construida para identificar niños con riesgo extremadamente bajo de lesión cerebral traumática clínicamente importante.",
      en: "A very-low-risk rule for minor head trauma in children under 2 years, designed to identify those at extremely low risk of clinically important traumatic brain injury."
    },
    points: [
      {
        title: { es: "Población original", en: "Original population" },
        body: {
          es: "Niños menores de 18 años valorados en las primeras 24 horas tras un traumatismo craneal y con GCS 14–15; esta variante aplica el algoritmo específico para menores de 2 años.",
          en: "Children younger than 18 years assessed within 24 hours of head trauma with GCS 14–15; this surface applies the age-specific rule for those under 2 years."
        }
      },
      {
        title: { es: "Qué predice", en: "What it predicts" },
        body: {
          es: "El desenlace original fue TCE clínicamente importante: muerte por TCE, neurocirugía, intubación prolongada o ingreso hospitalario prolongado por el traumatismo.",
          en: "The original outcome was clinically important TBI: TBI-related death, neurosurgery, prolonged intubation or prolonged hospitalization for the injury."
        }
      },
      {
        title: { es: "Límite clave", en: "Key limitation" },
        body: {
          es: "La regla identifica muy bajo riesgo; no debe convertirse en una orden automática de TC ni sustituye la valoración del mecanismo, la exploración y la evolución.",
          en: "The rule identifies very low risk; it should not become an automatic CT order and does not replace assessment of mechanism, examination and clinical evolution."
        }
      }
    ],
    sourceReferenceIds: ["pecarn_tbi_2009_derivation_validation"]
  },
  pecarn_tbi_2_or_more: {
    strapline: {
      es: "Regla de muy bajo riesgo para TCE leve en niños de 2 años o más, con predictores específicos para esta franja de edad.",
      en: "A very-low-risk rule for minor head trauma in children aged 2 years and older, using age-specific predictors."
    },
    points: [
      {
        title: { es: "Población original", en: "Original population" },
        body: {
          es: "Niños menores de 18 años valorados en las primeras 24 horas tras un traumatismo craneal y con GCS 14–15; esta variante usa la regla específica para 2 años o más.",
          en: "Children younger than 18 years assessed within 24 hours of head trauma with GCS 14–15; this surface uses the rule for ages 2 years and older."
        }
      },
      {
        title: { es: "Fortaleza de la regla", en: "Rule strength" },
        body: {
          es: "En la cohorte de validación original mostró una sensibilidad muy alta para TCE clínicamente importante y no perdió casos que requirieran neurocirugía.",
          en: "In the original validation cohort it showed very high sensitivity for clinically important TBI and missed no cases requiring neurosurgery."
        }
      },
      {
        title: { es: "Límite clave", en: "Key limitation" },
        body: {
          es: "Su utilidad principal es reconocer el extremo de muy bajo riesgo. No es un sustituto del juicio clínico ni una indicación automática de imagen.",
          en: "Its main role is to recognize the very-low-risk end of the spectrum. It is not a substitute for clinical judgment or an automatic imaging indication."
        }
      }
    ],
    sourceReferenceIds: ["pecarn_tbi_2009_derivation_validation"]
  },
  apgar: {
    strapline: {
      es: "Una descripción estandarizada del estado del recién nacido tras el nacimiento y de su evolución inicial, no una prueba diagnóstica de asfixia ni un pronóstico individual.",
      en: "A standardized description of the newborn’s condition after birth and early transition, not a diagnostic test for asphyxia or an individual prognostic tool."
    },
    points: [
      {
        title: { es: "Cómo debe leerse", en: "How to read it" },
        body: {
          es: "Se registra al minuto y a los 5 minutos; si el valor a los 5 minutos es menor de 7, la valoración se repite cada 5 minutos hasta los 20 minutos.",
          en: "It is recorded at 1 and 5 minutes; if the 5-minute score is below 7, assessment is repeated every 5 minutes through 20 minutes."
        }
      },
      {
        title: { es: "Qué puede cambiarlo", en: "What can affect it" },
        body: {
          es: "La edad gestacional, medicación materna, anomalías congénitas, reanimación y variabilidad entre observadores pueden influir en la puntuación.",
          en: "Gestational age, maternal medication, congenital anomalies, resuscitation and interobserver variability can influence the score."
        }
      },
      {
        title: { es: "Qué no significa", en: "What it does not mean" },
        body: {
          es: "Un Apgar bajo, por sí solo, no diagnostica asfixia ni predice de forma individual mortalidad neonatal o resultado neurológico.",
          en: "A low Apgar score alone does not diagnose asphyxia or individually predict neonatal mortality or neurologic outcome."
        }
      }
    ],
    sourceReferenceIds: ["apgar_1953_original", "apgar_aap_acog_2015", "apgar_aap_acog_2014_neonatal_encephalopathy"]
  },
  westley_croup: {
    strapline: {
      es: "Una escala clínica de gravedad del crup basada en hallazgos respiratorios observables, útil para describir el estado clínico de forma estructurada.",
      en: "A clinical croup-severity scale based on observable respiratory findings, useful for describing clinical status in a structured way."
    },
    points: [
      {
        title: { es: "Origen", en: "Origin" },
        body: {
          es: "La escala procede del estudio clásico de Westley y colaboradores en niños hospitalizados con crup agudo.",
          en: "The scale originates from the classic Westley study in hospitalized children with acute croup."
        }
      },
      {
        title: { es: "Qué resume", en: "What it summarizes" },
        body: {
          es: "Integra hallazgos de vía aérea y trabajo respiratorio para expresar la gravedad en un único valor clínico.",
          en: "It combines airway and respiratory-effort findings into a single clinical severity value."
        }
      },
      {
        title: { es: "Uso prudente", en: "Use with care" },
        body: {
          es: "La cifra facilita la comunicación y el seguimiento, pero no debe sustituir la valoración directa de la vía aérea ni utilizarse como única base para decisiones terapéuticas.",
          en: "The score helps communication and follow-up, but should not replace direct airway assessment or serve as the sole basis for treatment decisions."
        }
      }
    ],
    sourceReferenceIds: ["westley_1978_original"]
  },
  clinical_dehydration_scale: {
    strapline: {
      es: "Una escala clínica breve para gastroenteritis aguda infantil que resume cuatro signos de deshidratación; su rendimiento no es uniforme en todos los contextos.",
      en: "A brief clinical scale for pediatric acute gastroenteritis that summarizes four dehydration signs; performance is not uniform across settings."
    },
    points: [
      {
        title: { es: "Población de desarrollo", en: "Development population" },
        body: {
          es: "Se desarrolló en niños de 1 a 36 meses con gastroenteritis y posteriormente se validó en cohortes pediátricas de urgencias.",
          en: "It was developed in children aged 1 to 36 months with gastroenteritis and later validated in pediatric emergency cohorts."
        }
      },
      {
        title: { es: "Qué contiene", en: "What it contains" },
        body: {
          es: "Valora aspecto general, ojos, mucosas y lágrimas, cada uno con 0–2 puntos, para un total de 0–8.",
          en: "It assesses general appearance, eyes, mucous membranes and tears, each scored 0–2, for a total of 0–8."
        }
      },
      {
        title: { es: "Limitación importante", en: "Important limitation" },
        body: {
          es: "Estudios posteriores encontraron asociaciones modestas con medidas objetivas de déficit hídrico; no debe usarse de forma aislada para decidir rehidratación intravenosa ni predecir el curso clínico.",
          en: "Later studies found only modest associations with objective fluid-deficit measures; it should not be used alone to decide intravenous rehydration or predict clinical course."
        }
      }
    ],
    sourceReferenceIds: ["cds_2004_original", "cds_2008_validation", "cds_2010_external_validation"]
  }
};

export function ToolEditorialInsight({
  language,
  tool
}: {
  language: Language;
  tool: ClinicalToolMetadata;
}) {
  const profile = editorialProfiles[tool.id];
  if (!profile) return null;

  const sources = profile.sourceReferenceIds
    .map((id) => tool.references.find((reference) => reference.id === id))
    .filter((reference): reference is NonNullable<typeof reference> => Boolean(reference));

  return (
    <section className="content-panel tool-editorial-insight" id="editorial-context">
      <div className="tool-section-heading">
        <p className="eyebrow">{language === "es" ? "LECTURA EDITORIAL" : "EDITORIAL VIEW"}</p>
        <h2>{language === "es" ? "Lo esencial para usarla bien" : "What matters for good use"}</h2>
        <p>{profile.strapline[language]}</p>
      </div>

      <div className="tool-editorial-points">
        {profile.points.map((point, index) => (
          <article key={point.title.es}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{point.title[language]}</h3>
              <p>{point.body[language]}</p>
            </div>
          </article>
        ))}
      </div>

      {sources.length > 0 ? (
        <div className="tool-editorial-sources">
          <span>{language === "es" ? "Sustentado por" : "Supported by"}</span>
          {sources.map((source) => (
            <a href="#references" key={source.id}>
              {source.authors ? source.authors.split(",")[0] : source.title}
              {source.year ? ` · ${source.year}` : ""}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
