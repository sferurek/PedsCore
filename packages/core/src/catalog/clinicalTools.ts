import type {
  ClinicalToolMetadata,
  EvidenceLevel,
  ImplementationStatus,
  Language,
  LocalizedText,
  Reference,
  RegulatoryRisk,
  ToolCategory,
  ToolType
} from "../types.js";

const githubIssuesUrl = "https://github.com/sferurek/PedsCore/issues";

type ToolSeed = Omit<
  ClinicalToolMetadata,
  "disclaimerRequired" | "issueTemplateUrl" | "references"
> & {
  references?: Reference[];
};

const docRef = (id: string, title: string, evidenceLevel: EvidenceLevel): Reference => ({
  id,
  title,
  evidenceLevel
});

const tool = (seed: ToolSeed): ClinicalToolMetadata => ({
  ...seed,
  references: seed.references ?? [
    docRef(`${seed.id}_documentation`, "PedsCore documentation source pending primary reference review", "pending_verification")
  ],
  disclaimerRequired: true,
  issueTemplateUrl: githubIssuesUrl
});

const baseValidationNotes: Record<
  "ready" | "pending" | "primary" | "future" | "licensing",
  LocalizedText
> = {
  ready: {
    es: "Variables, rangos o reglas descritos en la documentacion del proyecto; requiere trazado final contra fuentes primarias antes de activar calculo.",
    en: "Variables, ranges, or rules are described in project documentation; final tracing against primary sources is required before active calculation."
  },
  pending: {
    es: "Ficha catalogada. Requiere validacion de variante, variables, rangos, puntos de corte o fuente primaria antes de implementar calculo.",
    en: "Catalog entry. Variant, variables, ranges, cut-offs, or primary source must be validated before calculation is implemented."
  },
  primary: {
    es: "Se necesita referencia primaria clara antes de convertir esta ficha en calculadora activa.",
    en: "A clear primary reference is needed before this entry becomes an active calculator."
  },
  future: {
    es: "Herramienta prevista para fases posteriores por complejidad clinica, tecnica o de revision.",
    en: "Tool planned for later phases because of clinical, technical, or review complexity."
  },
  licensing: {
    es: "Puede requerir revision de licencia o copyright antes de implementacion.",
    en: "May require licensing or copyright review before implementation."
  }
} as const;

const makeTool = (
  id: string,
  slug: string,
  shortName: string,
  nameEs: string,
  nameEn: string,
  category: ToolCategory,
  subcategory: string,
  type: ToolType,
  populationEs: string,
  populationEn: string,
  descriptionEs: string,
  descriptionEn: string,
  implementationStatus: ImplementationStatus,
  evidenceLevel: EvidenceLevel,
  regulatoryRisk: RegulatoryRisk,
  validationNotes: LocalizedText = baseValidationNotes.pending,
  references?: Reference[]
) =>
  tool({
    id,
    slug,
    shortName,
    name: { es: nameEs, en: nameEn },
    category,
    subcategory,
    type,
    population: { es: populationEs, en: populationEn },
    description: { es: descriptionEs, en: descriptionEn },
    implementationStatus,
    evidenceLevel,
    regulatoryRisk,
    validationNotes,
    ...(references ? { references } : {})
  });

export const clinicalTools: ClinicalToolMetadata[] = [
  makeTool(
    "apgar",
    "apgar",
    "Apgar",
    "Test de Apgar",
    "Apgar Score",
    "neonatology",
    "newborn_transition",
    "score",
    "Recien nacidos en los primeros minutos tras el nacimiento",
    "Newborns in the first minutes after birth",
    "Evalua la adaptacion inicial del recien nacido mediante cinco dominios observacionales.",
    "Assesses early newborn transition through five observational domains.",
    "ready_for_implementation",
    "moderate",
    "low",
    baseValidationNotes.ready,
    [docRef("apgar_kb", "PedsCore_Knowledge_Base_v1: Apgar", "pending_verification")]
  ),
  makeTool("combined_apgar", "combined-apgar", "Combined Apgar", "Apgar expandido / Combined Apgar", "Expanded / Combined Apgar", "neonatology", "newborn_transition", "score", "Recien nacidos", "Newborns", "Extension documentada del Apgar para contexto neonatal.", "Documented extension of Apgar for newborn context.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("silverman_andersen", "silverman-andersen", "Silverman-Andersen", "Score de Silverman-Andersen", "Silverman-Andersen Score", "neonatology", "respiratory_distress", "score", "Recien nacidos con dificultad respiratoria", "Newborns with respiratory distress", "Cuantifica dificultad respiratoria neonatal mediante signos clinicos.", "Scores neonatal respiratory distress using clinical signs.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("wood_downes_ferres", "wood-downes-ferres", "WDF", "Score de Wood-Downes-Ferres", "Wood-Downes-Ferres Score", "respiratory", "bronchiolitis_wheezing", "score", "Lactantes y ninos con bronquiolitis u obstruccion respiratoria segun variante", "Infants and children with bronchiolitis or obstructive respiratory distress depending on variant", "Evalua gravedad de dificultad respiratoria obstructiva.", "Assesses severity of obstructive respiratory distress.", "pending_validation", "pending_verification", "medium"),
  makeTool("ballard", "ballard", "Ballard", "Ballard / New Ballard", "Ballard / New Ballard", "neonatology", "gestational_age", "score", "Recien nacidos con edad gestacional incierta", "Newborns with uncertain gestational age", "Estima edad gestacional con madurez fisica y neuromuscular.", "Estimates gestational age using physical and neuromuscular maturity.", "pending_validation", "pending_verification", "medium"),
  makeTool("dubowitz", "dubowitz", "Dubowitz", "Dubowitz", "Dubowitz Score", "neonatology", "gestational_age", "score", "Recien nacidos", "Newborns", "Herramienta de estimacion de edad gestacional basada en madurez neonatal.", "Gestational age assessment based on neonatal maturity.", "pending_validation", "pending_verification", "medium"),
  makeTool("sarnat", "sarnat", "Sarnat", "Sarnat y Sarnat", "Sarnat Staging", "neonatology", "hypoxic_ischemic_encephalopathy", "scale", "Recien nacidos con sospecha de encefalopatia hipoxico-isquemica", "Newborns with suspected hypoxic-ischemic encephalopathy", "Clasifica encefalopatia neonatal en estadios clinicos.", "Classifies neonatal encephalopathy into clinical stages.", "pending_validation", "pending_verification", "medium"),
  makeTool("thompson_hie", "thompson-hie-score", "Thompson HIE", "Puntaje de Thompson para EHI", "Thompson HIE Score", "neonatology", "hypoxic_ischemic_encephalopathy", "score", "Recien nacidos con encefalopatia hipoxico-isquemica", "Newborns with hypoxic-ischemic encephalopathy", "Score clinico para gravedad de EHI neonatal.", "Clinical score for neonatal HIE severity.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("modified_finnegan", "modified-finnegan", "Finnegan", "Finnegan modificado / NAS", "Modified Finnegan NAS Score", "neonatology", "neonatal_abstinence", "score", "Recien nacidos con sospecha de sindrome de abstinencia neonatal", "Newborns with suspected neonatal abstinence syndrome", "Valora signos de abstinencia neonatal.", "Assesses neonatal abstinence signs.", "pending_validation", "pending_verification", "medium"),
  makeTool("eat_sleep_console", "eat-sleep-console", "ESC", "Eat Sleep Console", "Eat Sleep Console", "neonatology", "neonatal_abstinence", "algorithm", "Recien nacidos expuestos a opioides", "Opioid-exposed newborns", "Modelo funcional para seguimiento de abstinencia neonatal.", "Functional model for neonatal withdrawal assessment.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("nips", "nips", "NIPS", "Neonatal Infant Pain Scale", "Neonatal Infant Pain Scale", "pain", "neonatal_pain", "scale", "Neonatos", "Neonates", "Escala observacional de dolor neonatal.", "Observational neonatal pain scale.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("pipp", "pipp", "PIPP", "Premature Infant Pain Profile", "Premature Infant Pain Profile", "pain", "neonatal_pain", "scale", "Prematuros y neonatos", "Preterm infants and neonates", "Escala de dolor neonatal, especialmente en prematuros.", "Neonatal pain scale, especially for preterm infants.", "pending_validation", "pending_verification", "medium"),
  makeTool("pipp_r", "pipp-r", "PIPP-R", "Premature Infant Pain Profile-Revised", "Premature Infant Pain Profile-Revised", "pain", "neonatal_pain", "scale", "Prematuros y neonatos", "Preterm infants and neonates", "Version revisada de PIPP.", "Revised version of PIPP.", "pending_validation", "pending_verification", "medium"),
  makeTool("cries", "cries", "CRIES", "CRIES", "CRIES", "pain", "neonatal_pain", "scale", "Neonatos con dolor postoperatorio", "Neonates with postoperative pain", "Escala neonatal de dolor basada en cinco dominios.", "Neonatal pain scale based on five domains.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("comfortneo", "comfortneo", "COMFORTneo", "COMFORTneo", "COMFORTneo", "neonatology", "sedation_pain", "scale", "Neonatos en cuidados intensivos", "Neonates in intensive care", "Escala multidimensional de sedacion y dolor neonatal.", "Multidimensional neonatal sedation and pain scale.", "pending_validation", "pending_verification", "medium"),
  makeTool("bhutani_nomogram", "bhutani-nomogram", "Bhutani", "Nomograma de Bhutani", "Bhutani Nomogram", "neonatology", "jaundice_bilirubin", "nomogram", "Recien nacidos con hiperbilirrubinemia", "Newborns with hyperbilirubinemia", "Nomograma de riesgo para bilirrubina neonatal.", "Risk nomogram for neonatal bilirubin.", "pending_validation", "pending_verification", "medium"),
  makeTool("neonatal_growth_fenton", "neonatal-growth-fenton", "Fenton", "Crecimiento neonatal Fenton", "Fenton Neonatal Growth", "neonatology", "growth", "percentile", "Recien nacidos prematuros", "Preterm newborns", "Referencia de crecimiento neonatal para prematuros.", "Neonatal growth reference for preterm infants.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("pews", "pews", "PEWS", "Pediatric Early Warning Score", "Pediatric Early Warning Score", "emergency", "early_warning", "score", "Ninos hospitalizados o en urgencias", "Hospitalized children or children in emergency care", "Score de deteccion precoz de deterioro clinico con multiples variantes.", "Early warning score for clinical deterioration with multiple variants.", "pending_validation", "pending_verification", "medium"),
  makeTool("brighton_pews", "brighton-pews", "Brighton PEWS", "Brighton PEWS", "Brighton PEWS", "emergency", "early_warning", "score", "Ninos hospitalizados", "Hospitalized children", "Variante de PEWS identificada para revision.", "PEWS variant identified for review.", "pending_validation", "pending_verification", "medium"),
  makeTool("bedside_pews", "bedside-pews", "Bedside PEWS", "Bedside PEWS", "Bedside PEWS", "emergency", "early_warning", "score", "Ninos hospitalizados", "Hospitalized children", "Variante Bedside PEWS identificada para revision.", "Bedside PEWS variant identified for review.", "pending_validation", "pending_verification", "medium"),
  makeTool("westley_croup", "westley-croup-score", "Westley", "Westley Croup Score", "Westley Croup Score", "respiratory", "croup", "score", "Ninos con crup", "Children with croup", "Evalua gravedad del crup mediante signos clinicos.", "Assesses croup severity using clinical signs.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("pram", "pram", "PRAM", "Pediatric Respiratory Assessment Measure", "Pediatric Respiratory Assessment Measure", "respiratory", "asthma_wheezing", "score", "Ninos con crisis asmatica o sibilancias", "Children with asthma exacerbation or wheezing", "Mide gravedad de broncoespasmo pediatrico.", "Measures pediatric wheezing/asthma severity.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("rdai", "rdai", "RDAI", "Respiratory Distress Assessment Instrument", "Respiratory Distress Assessment Instrument", "respiratory", "bronchiolitis", "score", "Ninos con bronquiolitis", "Children with bronchiolitis", "Evalua sibilancias y retracciones en bronquiolitis.", "Assesses wheezing and retractions in bronchiolitis.", "pending_validation", "pending_verification", "medium"),
  makeTool("brosjod", "brosjod", "BROSJOD", "BROSJOD", "BROSJOD", "respiratory", "bronchiolitis", "score", "Lactantes con bronquiolitis", "Infants with bronchiolitis", "Escala de bronquiolitis identificada en recomendaciones.", "Bronchiolitis scale identified in recommendations.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("pass", "pass", "PASS", "Pediatric Asthma Severity Score", "Pediatric Asthma Severity Score", "respiratory", "asthma", "score", "Ninos con asma o broncoespasmo", "Children with asthma or wheezing", "Score de gravedad de asma pediatrica identificado para revision.", "Pediatric asthma severity score identified for review.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("risc", "risc", "RISC", "RISC", "RISC", "respiratory", "pneumonia", "score", "Ninos con neumonia", "Children with pneumonia", "Score de gravedad de neumonia identificado en recomendaciones.", "Pneumonia severity score identified in recommendations.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("mrisc", "mrisc", "mRISC", "mRISC", "mRISC", "respiratory", "pneumonia", "score", "Ninos con neumonia", "Children with pneumonia", "Variante modificada RISC para neumonia.", "Modified RISC variant for pneumonia.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("pediatric_gcs", "pediatric-glasgow-coma-scale", "pGCS", "Escala de Coma de Glasgow pediatrica", "Pediatric Glasgow Coma Scale", "neurology", "consciousness", "scale", "Ninos con necesidad de valoracion neurologica", "Children requiring neurologic assessment", "Adaptacion pediatrica de apertura ocular, respuesta verbal y motora.", "Pediatric adaptation of eye, verbal, and motor response.", "pending_validation", "pending_verification", "medium"),
  makeTool("benes", "benes", "Benes", "Benes", "Benes", "neurology", "consciousness", "scale", "Ninos con necesidad de valoracion neurologica", "Children requiring neurologic assessment", "Herramienta neurologica alternativa identificada.", "Alternative neurologic assessment tool identified.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("glasgow_adapted", "glasgow-adapted", "Glasgow adaptado", "Glasgow adaptado", "Adapted Glasgow", "neurology", "consciousness", "scale", "Ninos", "Children", "Variante adaptada de Glasgow identificada para revision.", "Adapted Glasgow variant identified for review.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("clinical_dehydration_scale", "clinical-dehydration-scale", "CDS", "Clinical Dehydration Scale", "Clinical Dehydration Scale", "emergency", "dehydration", "score", "Ninos con sospecha de deshidratacion", "Children with suspected dehydration", "Score clinico de gravedad de deshidratacion.", "Clinical score for dehydration severity.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("gorelick_dehydration", "gorelick-dehydration", "Gorelick", "Escala de Gorelick", "Gorelick Dehydration Scale", "emergency", "dehydration", "score", "Ninos con sospecha de deshidratacion", "Children with suspected dehydration", "Escala alternativa de deshidratacion identificada.", "Alternative dehydration scale identified.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("pecarn_tbi_under_2", "pecarn-tbi-under-2", "PECARN <2", "PECARN TCE menor de 2 anos", "PECARN TBI Under 2 Years", "emergency", "head_trauma", "clinical_rule", "Menores de 2 anos con traumatismo craneal", "Children under 2 years with head trauma", "Regla clinica PECARN para estratificacion de riesgo en TCE.", "PECARN clinical rule for TBI risk stratification.", "ready_for_implementation", "high", "medium", baseValidationNotes.ready),
  makeTool("pecarn_tbi_2_or_more", "pecarn-tbi-2-or-more", "PECARN >=2", "PECARN TCE 2 anos o mas", "PECARN TBI 2 Years or Older", "emergency", "head_trauma", "clinical_rule", "Ninos de 2 anos o mas con traumatismo craneal", "Children 2 years or older with head trauma", "Regla clinica PECARN para estratificacion de riesgo en TCE.", "PECARN clinical rule for TBI risk stratification.", "ready_for_implementation", "high", "medium", baseValidationNotes.ready),
  makeTool("catch_tbi", "catch-tbi", "CATCH", "CATCH", "CATCH", "emergency", "head_trauma", "clinical_rule", "Ninos con traumatismo craneal", "Children with head trauma", "Regla de decision de TCE identificada para revision.", "TBI decision rule identified for review.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("chalice_tbi", "chalice-tbi", "CHALICE", "CHALICE", "CHALICE", "emergency", "head_trauma", "clinical_rule", "Ninos con traumatismo craneal", "Children with head trauma", "Regla de decision de TCE identificada para revision.", "TBI decision rule identified for review.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("sipa", "sipa", "SIPA", "Shock Index Pediatric Age-adjusted", "Shock Index Pediatric Age-adjusted", "emergency", "shock", "calculator", "Ninos con posible shock o trauma", "Children with possible shock or trauma", "Indice de shock ajustado por edad.", "Age-adjusted shock index.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("regional_sepsis_scores", "regional-sepsis-scores", "Sepsis scores", "Escalas regionales de sepsis", "Regional Sepsis Scores", "emergency", "sepsis", "score", "Ninos con sospecha de sepsis", "Children with suspected sepsis", "Familia de escalas regionales identificada para fases futuras.", "Family of regional scales identified for future phases.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("qtc_bazett", "qtc-bazett", "QTc Bazett", "QTc Bazett", "QTc Bazett", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Bazett.", "QT correction using Bazett formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("qtc_fridericia", "qtc-fridericia", "QTc Fridericia", "QTc Fridericia", "QTc Fridericia", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Fridericia.", "QT correction using Fridericia formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("qtc_framingham", "qtc-framingham", "QTc Framingham", "QTc Framingham", "QTc Framingham", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Framingham.", "QT correction using Framingham formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("qtc_hodges", "qtc-hodges", "QTc Hodges", "QTc Hodges", "QTc Hodges", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Hodges.", "QT correction using Hodges formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("bedside_schwartz", "bedside-schwartz", "Bedside Schwartz", "Bedside Schwartz", "Bedside Schwartz", "nephrology", "egfr", "calculator", "Ninos con creatinina y talla disponibles", "Children with available creatinine and height", "Estimacion de filtrado glomerular pediatrico.", "Pediatric estimated glomerular filtration rate.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("revised_schwartz", "revised-schwartz", "Schwartz", "Schwartz revisado", "Revised Schwartz", "nephrology", "egfr", "calculator", "Ninos con creatinina y talla disponibles", "Children with available creatinine and height", "Formula revisada de Schwartz para eGFR pediatrico.", "Revised Schwartz formula for pediatric eGFR.", "pending_validation", "pending_verification", "medium"),
  makeTool("prifle", "prifle", "pRIFLE", "pRIFLE", "pRIFLE", "nephrology", "acute_kidney_injury", "clinical_rule", "Ninos con riesgo de lesion renal aguda", "Children at risk of acute kidney injury", "Clasificacion pediatrica de lesion renal aguda.", "Pediatric acute kidney injury classification.", "pending_validation", "pending_verification", "medium"),
  makeTool("kdigo_pediatric", "kdigo-pediatric", "KDIGO pediatrico", "KDIGO pediatrico", "Pediatric KDIGO", "nephrology", "acute_kidney_injury", "clinical_rule", "Ninos con riesgo de lesion renal aguda", "Children at risk of acute kidney injury", "Aplicacion pediatrica de criterios KDIGO para lesion renal aguda.", "Pediatric application of KDIGO criteria for acute kidney injury.", "pending_validation", "pending_verification", "medium"),
  makeTool("psofa", "psofa", "pSOFA", "pSOFA", "Pediatric Sequential Organ Failure Assessment", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Evalua disfuncion organica multiple pediatrica.", "Assesses pediatric multi-organ dysfunction.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pelod", "pelod", "PELOD", "PELOD", "PELOD", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Score de disfuncion organica pediatrica.", "Pediatric organ dysfunction score.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pelod_2", "pelod-2", "PELOD-2", "PELOD-2", "PELOD-2", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Version PELOD-2 para disfuncion organica multiple.", "PELOD-2 version for multi-organ dysfunction.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("prism_iii", "prism-iii", "PRISM III", "PRISM III", "PRISM III", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Score de riesgo de mortalidad en UCI pediatrica.", "Pediatric ICU mortality risk score.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("prism_iv", "prism-iv", "PRISM IV", "PRISM IV", "PRISM IV", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Version PRISM IV identificada para revision.", "PRISM IV version identified for review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pim2", "pim2", "PIM2", "PIM2", "PIM2", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Indice de mortalidad pediatrica version 2.", "Pediatric Index of Mortality version 2.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pim3", "pim3", "PIM3", "PIM3", "PIM3", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Indice de mortalidad pediatrica version 3.", "Pediatric Index of Mortality version 3.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("who_growth_percentiles", "who-growth-percentiles", "OMS", "Percentiles OMS", "WHO Growth Percentiles", "growth_nutrition", "growth", "percentile", "Lactantes y ninos segun edad aplicable", "Infants and children depending on applicable age", "Curvas de crecimiento OMS para peso, talla y otros parametros.", "WHO growth curves for weight, height, and other parameters.", "pending_validation", "pending_verification", "medium"),
  makeTool("cdc_growth_percentiles", "cdc-growth-percentiles", "CDC", "Percentiles CDC", "CDC Growth Percentiles", "growth_nutrition", "growth", "percentile", "Ninos y adolescentes segun edad aplicable", "Children and adolescents depending on applicable age", "Curvas de crecimiento CDC.", "CDC growth curves.", "pending_validation", "pending_verification", "medium"),
  makeTool("orbegozo_growth_percentiles", "orbegozo-growth-percentiles", "Orbegozo", "Percentiles Orbegozo", "Orbegozo Growth Percentiles", "growth_nutrition", "growth", "percentile", "Poblacion pediatrica segun tablas aplicables", "Pediatric population depending on applicable tables", "Curvas de crecimiento Fundacion Orbegozo.", "Fundacion Orbegozo growth curves.", "pending_validation", "pending_verification", "medium"),
  makeTool("bmi_percentile", "bmi-percentile", "IMC percentilado", "IMC percentilado", "BMI Percentile", "growth_nutrition", "growth", "percentile", "Ninos y adolescentes", "Children and adolescents", "Calcula IMC y percentil segun curva seleccionada.", "Calculates BMI and percentile according to selected curve.", "pending_validation", "pending_verification", "medium"),
  makeTool("head_circumference_percentile", "head-circumference-percentile", "PC percentil", "Percentil de perimetro craneal", "Head Circumference Percentile", "growth_nutrition", "growth", "percentile", "Lactantes y ninos pequenos", "Infants and young children", "Percentil de perimetro craneal segun curva seleccionada.", "Head circumference percentile according to selected curve.", "pending_validation", "pending_verification", "medium"),
  makeTool("stamp", "stamp", "STAMP", "STAMP", "STAMP", "growth_nutrition", "malnutrition_risk", "score", "Ninos hospitalizados", "Hospitalized children", "Herramienta de cribado de riesgo nutricional.", "Nutritional risk screening tool.", "pending_validation", "pending_verification", "medium"),
  makeTool("strongkids", "strongkids", "STRONGkids", "STRONGkids", "STRONGkids", "growth_nutrition", "malnutrition_risk", "score", "Ninos hospitalizados", "Hospitalized children", "Herramienta de cribado de riesgo de malnutricion.", "Malnutrition risk screening tool.", "pending_validation", "pending_verification", "medium"),
  makeTool("pyms", "pyms", "PYMS", "PYMS", "PYMS", "growth_nutrition", "malnutrition_risk", "score", "Ninos hospitalizados", "Hospitalized children", "Herramienta de cribado nutricional pediatrico.", "Pediatric nutritional screening tool.", "pending_validation", "pending_verification", "medium"),
  makeTool("flacc", "flacc", "FLACC", "FLACC", "FLACC", "pain", "pediatric_pain", "scale", "Ninos pequenos o no verbales", "Young or non-verbal children", "Escala observacional de dolor basada en rostro, piernas, actividad, llanto y consolabilidad.", "Observational pain scale based on face, legs, activity, cry, and consolability.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("rflacc", "rflacc", "rFLACC", "rFLACC", "rFLACC", "pain", "pediatric_pain", "scale", "Ninos con necesidades especiales o comunicacion limitada", "Children with special needs or limited communication", "Version revisada de FLACC identificada para revision.", "Revised FLACC version identified for review.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("cheops", "cheops", "CHEOPS", "CHEOPS", "CHEOPS", "pain", "pediatric_pain", "scale", "Ninos de 1 a 7 anos", "Children aged 1 to 7 years", "Escala observacional de dolor pediatrico.", "Observational pediatric pain scale.", "pending_validation", "pending_verification", "medium"),
  makeTool("wong_baker_faces", "wong-baker-faces", "Wong-Baker", "Wong-Baker Faces", "Wong-Baker Faces", "pain", "pediatric_pain", "scale", "Ninos capaces de autoevaluacion con caras", "Children able to self-report using faces", "Escala visual de caras para dolor.", "Faces-based visual pain scale.", "not_implemented_due_to_licensing", "pending_verification", "medium", baseValidationNotes.licensing),
  makeTool("visual_analogue_scale", "visual-analogue-scale", "EVA", "Escala visual analogica", "Visual Analogue Scale", "pain", "pediatric_pain", "scale", "Ninos con capacidad de autoevaluacion", "Children able to self-report", "Escala visual analogica de dolor identificada para catalogo.", "Visual analogue pain scale identified for the catalog.", "needs_primary_reference", "primary_reference_needed", "low", baseValidationNotes.primary),
  makeTool("pediatric_cpr", "pediatric-cpr", "RCP pediatrica", "RCP pediatrica", "Pediatric CPR", "resuscitation", "pediatric_life_support", "algorithm", "Pacientes pediatricos en parada o peri-parada", "Pediatric patients in arrest or peri-arrest", "Algoritmo de soporte vital pediatrico previsto como ficha trazable.", "Pediatric life support algorithm planned as a traceable entry.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("neonatal_cpr", "neonatal-cpr", "RCP neonatal", "RCP neonatal", "Neonatal CPR", "resuscitation", "neonatal_life_support", "algorithm", "Recien nacidos en reanimacion neonatal", "Newborns undergoing neonatal resuscitation", "Algoritmo de reanimacion neonatal previsto como ficha trazable.", "Neonatal resuscitation algorithm planned as a traceable entry.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pediatric_bradycardia", "pediatric-bradycardia", "Bradicardia", "Bradicardia pediatrica", "Pediatric Bradycardia", "resuscitation", "pediatric_life_support", "algorithm", "Pacientes pediatricos con bradicardia inestable", "Pediatric patients with unstable bradycardia", "Algoritmo de bradicardia pediatrica para revision futura.", "Pediatric bradycardia algorithm for future review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pediatric_tachycardia", "pediatric-tachycardia", "Taquicardia", "Taquicardia pediatrica", "Pediatric Tachycardia", "resuscitation", "pediatric_life_support", "algorithm", "Pacientes pediatricos con taquicardia inestable", "Pediatric patients with unstable tachycardia", "Algoritmo de taquicardia pediatrica para revision futura.", "Pediatric tachycardia algorithm for future review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("shockable_rhythm_algorithm", "shockable-rhythm-algorithm", "Ritmos desfibrilables", "Ritmos desfibrilables", "Shockable Rhythm Algorithm", "resuscitation", "pediatric_life_support", "algorithm", "Pacientes pediatricos en parada con ritmo desfibrilable", "Pediatric arrest patients with shockable rhythm", "Algoritmo para ritmos desfibrilables identificado para revision.", "Shockable rhythm algorithm identified for review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("non_shockable_rhythm_algorithm", "non-shockable-rhythm-algorithm", "Ritmos no desfibrilables", "Ritmos no desfibrilables", "Non-shockable Rhythm Algorithm", "resuscitation", "pediatric_life_support", "algorithm", "Pacientes pediatricos en parada con ritmo no desfibrilable", "Pediatric arrest patients with non-shockable rhythm", "Algoritmo para ritmos no desfibrilables identificado para revision.", "Non-shockable rhythm algorithm identified for review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("resuscitation_weight_dose_energy", "resuscitation-weight-dose-energy", "RCP dosis/peso", "Calculo de dosis, peso y energia en RCP", "Resuscitation Dose, Weight, and Energy Calculator", "resuscitation", "pediatric_life_support", "calculator", "Pacientes pediatricos en contexto de reanimacion", "Pediatric patients in resuscitation context", "Ficha para calculos de dosis, peso, energia y tubo endotraqueal documentados.", "Entry for documented dose, weight, energy, and airway size calculations.", "pending_validation", "pending_verification", "high"),
  makeTool("bayley", "bayley", "Bayley", "Bayley", "Bayley Scales", "adolescent_medicine", "development_quality_of_life", "scale", "Poblacion pediatrica segun version de la escala", "Pediatric population depending on scale version", "Escala de neurodesarrollo identificada como futura.", "Neurodevelopmental scale identified as future scope.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("denver_ii", "denver-ii", "Denver II", "Denver II", "Denver II", "adolescent_medicine", "development_quality_of_life", "scale", "Poblacion pediatrica", "Pediatric population", "Herramienta de neurodesarrollo identificada como futura.", "Neurodevelopmental tool identified as future scope.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("mass_casualty_triage", "mass-casualty-triage", "Triage masivo", "Algoritmos de triage masivo", "Mass Casualty Triage Algorithms", "emergency", "triage", "algorithm", "Pacientes pediatricos en incidentes con multiples victimas", "Pediatric patients in mass casualty incidents", "Familia de algoritmos identificada para fases futuras.", "Algorithm family identified for future phases.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("adolescent_depression_risk", "adolescent-depression-risk", "Riesgo depresion", "Riesgo de depresion en adolescentes", "Adolescent Depression Risk", "adolescent_medicine", "risk_screening", "scale", "Adolescentes", "Adolescents", "Herramienta de cribado de riesgo identificada como futura.", "Risk screening tool identified as future scope.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("adolescent_behavior_risk", "adolescent-behavior-risk", "Conductas de riesgo", "Conductas de riesgo en adolescentes", "Adolescent Risk Behaviors", "adolescent_medicine", "risk_screening", "scale", "Adolescentes", "Adolescents", "Herramienta de medicina adolescente identificada como futura.", "Adolescent medicine tool identified as future scope.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future)
];

export const getAllTools = (): ClinicalToolMetadata[] => [...clinicalTools];

export const getToolBySlug = (slug: string): ClinicalToolMetadata | undefined =>
  clinicalTools.find((toolMetadata) => toolMetadata.slug === slug);

export const getToolsByCategory = (
  category: ToolCategory
): ClinicalToolMetadata[] =>
  clinicalTools.filter((toolMetadata) => toolMetadata.category === category);

export const getImplementedTools = (): ClinicalToolMetadata[] =>
  clinicalTools.filter(
    (toolMetadata) => toolMetadata.implementationStatus === "implemented"
  );

export const getToolsByStatus = (
  status: ImplementationStatus
): ClinicalToolMetadata[] =>
  clinicalTools.filter(
    (toolMetadata) => toolMetadata.implementationStatus === status
  );

const normalize = (value: string): string =>
  value
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

export const searchTools = (
  query: string,
  language: Language = "en"
): ClinicalToolMetadata[] => {
  const normalizedQuery = normalize(query.trim());

  if (!normalizedQuery) {
    return getAllTools();
  }

  return clinicalTools.filter((toolMetadata) => {
    const haystack = [
      toolMetadata.id,
      toolMetadata.slug,
      toolMetadata.shortName,
      toolMetadata.name[language],
      toolMetadata.name.es,
      toolMetadata.name.en,
      toolMetadata.category,
      toolMetadata.subcategory,
      toolMetadata.type,
      toolMetadata.description[language]
    ]
      .filter(Boolean)
      .map((value) => normalize(String(value)))
      .join(" ");

    return haystack.includes(normalizedQuery);
  });
};
