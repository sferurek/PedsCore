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

const implementedToolIds = new Set([
  "apgar",
  "silverman_andersen",
  "ballard",
  "dubowitz",
  "modified_sarnat_nichd",
  "thompson_hie",
  "cries",
  "bedside_pews",
  "wood_downes_ferres",
  "qtc_bazett",
  "qtc_fridericia",
  "qtc_framingham",
  "qtc_hodges",
  "bedside_schwartz",
  "revised_schwartz",
  "westley_croup",
  "pram",
  "clinical_dehydration_scale",
  "pediatric_appendicitis_score",
  "pecarn_tbi_under_2",
  "pecarn_tbi_2_or_more",
  "catch_tbi",
  "chalice_tbi",
  "sipa",
  "nips",
  "pediatric_burn_tbsa",
  "garcia_alix_ners",
  "who_growth_module",
  "who_growth_percentiles",
  "bmi_percentile",
  "head_circumference_percentile",
  "cdc_growth_percentiles",
  "strongkids",
  "visual_analogue_scale",
  "step_by_step",
  "pecarn_febrile_infant",
  "yos",
  "pucai",
  "pcdai",
  "pass",
  "gorelick_dehydration",
  "prifle",
  "pelod_2",
  "prism_iv",
  "pim3",
  "psofa",
  "fnass_21",
  "rdai",
  "snappii",
  "modified_tal",
  "taussig_croup",
  "risc",
  "mrisc",
  "kdigo_pediatric",
  "phoenix_sepsis",
  "parc",
  "bacterial_meningitis_score",
  "ckid_u25",
  "modified_bell_nec",
  "nsofa",
  "wpcdai"
]);

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

const implementedToolReferences: Record<string, Reference[]> = {
  modified_bell_nec: [
    {
      id: "modified_bell_ccby_table",
      title: "Necrotizing Enterocolitis (NEC) and the Risk of Intestinal Stricture: The Value of C-Reactive Protein",
      authors: "Gaudin A, Farnoux C, Bonnard A, et al.",
      year: 2013,
      journalOrPublisher: "PLOS ONE",
      url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0076858",
      evidenceLevel: "peer_reviewed_review",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Table 1 reproduces modified Bell staging under CC BY, permitting reuse with attribution.",
      appliesTo: ["modified_bell_nec"],
      priority: 3
    }
  ],
  garcia_alix_ners: [
    {
      id: "garcia_alix_ners_2021",
      title: "Development, Reliability, and Testing of a New Rating Scale for Neonatal Encephalopathy",
      authors: "Garcia-Alix A, Arnaez J, Arca G, et al.",
      year: 2021,
      journalOrPublisher: "The Journal of Pediatrics",
      doi: "10.1016/j.jpeds.2021.04.003",
      pmid: "33857465",
      url: "https://pubmed.ncbi.nlm.nih.gov/33857465/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes: "Original NE-RS: seven clinical items plus two aEEG items, total 0-70; cutoffs 8 and 30 separate mild/moderate and moderate/severe neonatal encephalopathy.",
      appliesTo: ["garcia_alix_ners"],
      priority: 1
    },
    {
      id: "garcia_alix_ners_foundation",
      title: "Escala García-Alix en la identificación y graduación de la gravedad de la encefalopatía hipóxico-isquémica perinatal",
      journalOrPublisher: "Neurología Neonatal / Fundación NeNe",
      url: "https://www.neurologianeonatal.org/?catid=0&id=86",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      appliesTo: ["garcia_alix_ners"],
      priority: 2
    }
  ],
  parc: [
    {
      id: "parc_2018_original",
      title: "Development and Validation of a Novel Pediatric Appendicitis Risk Calculator (pARC)",
      authors: "Kharbanda AB, Vazquez-Benitez G, Ballard DW, et al.",
      year: 2018,
      journalOrPublisher: "Pediatrics",
      doi: "10.1542/peds.2017-2699",
      pmid: "29535251",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5869337/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      appliesTo: ["parc"],
      priority: 1
    }
  ],
  pcdai: [
    {
      id: "pcdai_1991_original",
      title: "Development and Validation of a Pediatric Crohn's Disease Activity Index",
      authors: "Hyams JS, Ferry GD, Mandel FS, et al.",
      year: 1991,
      journalOrPublisher: "Journal of Pediatric Gastroenterology and Nutrition",
      pmid: "1678008",
      url: "https://pubmed.ncbi.nlm.nih.gov/1678008/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["pcdai"],
      priority: 1
    },
    {
      id: "pcdai_open_table",
      title: "Brazilian consensus on the management of inflammatory bowel diseases in pediatric patients",
      year: 2023,
      journalOrPublisher: "Arquivos de Gastroenterologia",
      url: "https://www.scielo.br/j/ag/a/KL5Vpy5S8QWgVtfH73vdG7h/abstract/?lang=en",
      evidenceLevel: "clinical_practice_guideline",
      sourceType: "guideline",
      accessType: "open_access",
      notes: "Open table reproduces the complete PCDAI item scoring.",
      appliesTo: ["pcdai"],
      priority: 2
    },
    {
      id: "pcdai_ecco_espghan_2026",
      title: "Management of Pediatric Crohn’s Disease: an ECCO-ESPGHAN Guideline Update",
      year: 2026,
      journalOrPublisher: "Journal of Crohn's and Colitis",
      url: "https://academic.oup.com/ecco-jcc/article/20/8/jjag084/8766823",
      evidenceLevel: "clinical_practice_guideline",
      sourceType: "guideline",
      accessType: "open_access",
      notes: "Current guideline lists PCDAI decrease ≥12.5 points for response and PCDAI ≤10 points for clinical remission.",
      appliesTo: ["pcdai"],
      priority: 3
    }
  ],
  wpcdai: [
    {
      id: "wpcdai_2011_validation",
      title: "Mathematical weighting of the pediatric Crohn's disease activity index (PCDAI) and comparison with its other short versions",
      authors: "Turner D, Griffiths AM, Walters TD, et al.",
      year: 2011,
      journalOrPublisher: "Inflammatory Bowel Diseases",
      url: "https://pubmed.ncbi.nlm.nih.gov/21351206/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["wpcdai"],
      priority: 1
    },
    {
      id: "wpcdai_open_table",
      title: "Multi-item Measures for Paediatric Inflammatory Bowel Diseases: The ABCs of All Those Acronyms",
      year: 2023,
      journalOrPublisher: "Journal of Crohn's and Colitis",
      url: "https://academic.oup.com/ecco-jcc/article/17/7/1154/7025408",
      evidenceLevel: "peer_reviewed_review",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open table reproduces all wPCDAI components and weights.",
      appliesTo: ["wpcdai"],
      priority: 2
    }
  ],
  pucai: [
    {
      id: "pucai_2007_original",
      title: "Development, validation, and evaluation of a pediatric ulcerative colitis activity index: a prospective multicenter study",
      authors: "Turner D, Otley AR, Mack D, et al.",
      year: 2007,
      journalOrPublisher: "Gastroenterology",
      doi: "10.1053/j.gastro.2007.05.029",
      pmid: "17681163",
      url: "https://pubmed.ncbi.nlm.nih.gov/17681163/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes: "Original prospective multicenter derivation and validation of PUCAI.",
      appliesTo: ["pucai"],
      priority: 1
    },
    {
      id: "pucai_open_table",
      title: "Inflammatory Bowel Disease in Childhood and Adolescence: Diagnosis and Treatment",
      year: 2017,
      journalOrPublisher: "Deutsches Ärzteblatt International",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5470346/",
      evidenceLevel: "peer_reviewed_review",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open-access table reproduces the complete PUCAI 0-85 scoring system.",
      appliesTo: ["pucai"],
      priority: 2
    },
    {
      id: "pucai_espghan_ecco_2025",
      title: "Management of paediatric ulcerative colitis, part 1: Ambulatory care",
      year: 2025,
      journalOrPublisher: "ESPGHAN/ECCO",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12408984/",
      evidenceLevel: "clinical_practice_guideline",
      sourceType: "guideline",
      accessType: "open_access",
      notes: "Current guideline recommends PUCAI monitoring at each visit.",
      appliesTo: ["pucai"],
      priority: 3
    }
  ],
  nsofa: [
    {
      id: "nsofa_2020_original",
      title: "A Neonatal Sequential Organ Failure Assessment Score Predicts Mortality to Late-Onset Sepsis in Preterm Very Low Birth Weight Infants",
      year: 2020,
      journalOrPublisher: "Pediatric Research",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7007331/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      appliesTo: ["nsofa"],
      priority: 1
    }
  ],
  yos: [
    {
      id: "yos_1982_original",
      title: "Observation scales to identify serious illness in febrile children",
      authors: "McCarthy PL, Sharpe MR, Spiesel SZ, et al.",
      year: 1982,
      journalOrPublisher: "Pediatrics",
      pmid: "7133831",
      url: "https://pubmed.ncbi.nlm.nih.gov/7133831/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes: "Original Yale/Acute Illness Observation Scale publication.",
      appliesTo: ["yos"],
      priority: 1
    },
    {
      id: "yos_open_table",
      title: "The Yale Observation Scale Score and the Risk of Serious Bacterial Infections in Febrile Infants",
      year: 2017,
      journalOrPublisher: "Pediatrics",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5495524/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      appliesTo: ["yos"],
      priority: 1
    }
  ],
  bacterial_meningitis_score: [
    {
      id: "bms_open_validation",
      title: "Applying the bacterial meningitis score in children with cerebrospinal fluid pleocytosis",
      year: 2015,
      journalOrPublisher: "Korean Journal of Pediatrics",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4543184/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      appliesTo: ["bacterial_meningitis_score"],
      priority: 1
    }
  ],
  pecarn_febrile_infant: [
    {
      id: "pecarn_fi_2019",
      title: "A Clinical Prediction Rule to Identify Febrile Infants 60 Days and Younger at Low Risk for Serious Bacterial Infections",
      authors: "Kuppermann N, Dayan PS, Levine DA, et al.; PECARN",
      year: 2019,
      journalOrPublisher: "JAMA Pediatrics",
      doi: "10.1001/jamapediatrics.2018.5501",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6450281/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      appliesTo: ["pecarn_febrile_infant"],
      priority: 1
    }
  ],
  cdc_growth_percentiles: [
    {
      id: "cdc_2000_growth_lms",
      title: "CDC Growth Charts - Percentile Data Files with LMS Values",
      authors: "Centers for Disease Control and Prevention, National Center for Health Statistics",
      year: 2000,
      journalOrPublisher: "CDC/NCHS",
      url: "https://www.cdc.gov/growthcharts/cdc-data-files.htm",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes: "Official public-domain LMS datasets for weight-for-age, stature-for-age, and BMI-for-age from 2 to 20 years.",
      appliesTo: ["cdc_growth_percentiles"],
      priority: 1
    },
    {
      id: "cdc_growth_training_2024",
      title: "2000 CDC Growth Charts: Features and Data",
      authors: "Centers for Disease Control and Prevention",
      year: 2024,
      journalOrPublisher: "CDC",
      url: "https://www.cdc.gov/growth-chart-training/hcp/overview/features-and-data.html",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes: "CDC recommends the 2000 growth charts for children and adolescents aged 2 years and older.",
      appliesTo: ["cdc_growth_percentiles"],
      priority: 2
    },
    {
      id: "cdc_growth_recommended_2025",
      title: "What Growth Charts Are Recommended?",
      authors: "Centers for Disease Control and Prevention",
      year: 2025,
      journalOrPublisher: "CDC",
      url: "https://www.cdc.gov/growth-chart-training/hcp/overview/recommended.html",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes: "Current CDC recommendation: WHO charts from birth to 2 years; CDC 2000 charts from age 2 years; 2022 Extended BMI-for-age charts for very high BMI.",
      appliesTo: ["cdc_growth_percentiles"],
      priority: 3
    },
    {
      id: "cdc_extended_bmi_2022",
      title: "Data file for the CDC Extended BMI-for-Age Growth Charts",
      authors: "Centers for Disease Control and Prevention, National Center for Health Statistics",
      year: 2022,
      journalOrPublisher: "CDC/NCHS",
      url: "https://www.cdc.gov/growthcharts/extended-bmi-data-files.htm",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes: "Official description of the extended BMI percentile method above the CDC BMI-for-age 95th percentile.",
      appliesTo: ["cdc_growth_percentiles"],
      priority: 4
    },
    {
      id: "wei_extended_bmi_2020",
      title: "A method for calculating BMI z-scores and percentiles above the 95th percentile of the CDC growth charts",
      authors: "Wei R, Ogden CL, Parsons VL, Freedman DS, Hales CM",
      year: 2020,
      journalOrPublisher: "Annals of Human Biology",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11232929/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Publishes the half-normal extended BMI percentile equation and sex-specific quadratic sigma regressions used by the CDC extended method.",
      appliesTo: ["cdc_growth_percentiles"],
      priority: 5
    }
  ],
  phoenix_sepsis: [
    {
      id: "phoenix_sepsis_2024_derivation",
      title: "Development and Validation of the Phoenix Criteria for Pediatric Sepsis and Septic Shock",
      authors: "Sanchez-Pinto LN, Bennett TD, DeWitt PE, et al.",
      year: 2024,
      journalOrPublisher: "JAMA",
      url: "https://jamanetwork.com/journals/jama/fullarticle/2814296",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Primary derivation and validation article containing the full 4-organ Phoenix Sepsis Score.",
      appliesTo: ["phoenix_sepsis"],
      priority: 1
    },
    {
      id: "phoenix_consensus_2024",
      title: "International Consensus Criteria for Pediatric Sepsis and Septic Shock",
      year: 2024,
      journalOrPublisher: "JAMA",
      url: "https://jamanetwork.com/journals/jama/fullarticle/2814297",
      evidenceLevel: "clinical_practice_guideline",
      sourceType: "society_statement",
      accessType: "open_access",
      notes: "Consensus definition: suspected infection plus Phoenix score >=2 for sepsis; sepsis plus >=1 cardiovascular point for septic shock.",
      appliesTo: ["phoenix_sepsis"],
      priority: 2
    }
  ],
  mrisc: [
    {
      id: "mrisc_2014_original",
      title: "Predicting Mortality among Hospitalized Children with Respiratory Illness in Western Kenya, 2009-2012",
      year: 2014,
      journalOrPublisher: "PLoS ONE",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3965502/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open-access publication with the complete mRISC point table.",
      appliesTo: ["mrisc"],
      priority: 1
    }
  ],
  visual_analogue_scale: [
    {
      id: "huskisson_vas_1974",
      title: "Measurement of pain",
      authors: "Huskisson EC",
      year: 1974,
      journalOrPublisher: "The Lancet",
      doi: "10.1016/S0140-6736(74)90884-8",
      pmid: "4139420",
      url: "https://pubmed.ncbi.nlm.nih.gov/4139420/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes: "Foundational pain-measurement publication for visual analogue scaling.",
      appliesTo: ["visual_analogue_scale"],
      priority: 1
    },
    {
      id: "vas_pediatric_assessment_review",
      title: "Evidence-based Assessment of Pediatric Pain",
      journalOrPublisher: "Journal of Pediatric Psychology / PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2639489/",
      evidenceLevel: "peer_reviewed_review",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Describes pediatric VAS as a 100-mm horizontal line measured from the no-pain anchor to the child's mark.",
      appliesTo: ["visual_analogue_scale"],
      priority: 2
    },
    {
      id: "acttion_pediatric_vas",
      title: "Clinical trial designs and models for analgesic medications for acute pain in neonates, infants, toddlers, children, and adolescents: ACTTION recommendations",
      journalOrPublisher: "Pain / PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5949239/",
      evidenceLevel: "consensus_statement",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Recommends a 100-mm VAS for acute pain in children older than 8 years and adolescents.",
      appliesTo: ["visual_analogue_scale"],
      priority: 3
    }
  ],
  risc: [
    {
      id: "risc_2012_original",
      title: "Development of the Respiratory Index of Severity in Children (RISC) Score among Young Children with Respiratory Infections in South Africa",
      year: 2012,
      journalOrPublisher: "PLoS ONE",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3251620/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Original open-access derivation study with the HIV-negative RISC scoring table.",
      appliesTo: ["risc"],
      priority: 1
    }
  ],
  psofa: [
    {
      id: "psofa_2017_original",
      title: "Adaptation and Validation of a Pediatric Sequential Organ Failure Assessment Score and Evaluation of the Sepsis-3 Definitions in Critically Ill Children",
      authors: "Matics TJ, Sanchez-Pinto LN",
      year: 2017,
      journalOrPublisher: "JAMA Pediatrics",
      doi: "10.1001/jamapediatrics.2017.2352",
      pmid: "28783810",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6583375/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open-access article contains the complete pediatric SOFA scoring table.",
      appliesTo: ["psofa"],
      priority: 1
    }
  ],
  pelod_2: [
    {
      id: "pelod2_open_table",
      title: "Pediatric Logistic Organ Dysfunction-2 Score",
      journalOrPublisher: "Open-access PELOD-2 reproductions and critical-care review",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9651518/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open table used to verify all ten PELOD-2 variables, age-specific MAP and creatinine thresholds, and point weights.",
      appliesTo: ["pelod_2"],
      priority: 1
    },
    {
      id: "pelod2_practical_guide",
      title: "Severity of illness scores in the pediatric intensive care unit: a practical guide",
      year: 2024,
      journalOrPublisher: "Critical Care Science",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11554295/",
      evidenceLevel: "peer_reviewed_review",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Verifies PELOD-2 mortality logit: -6.61 + 0.47 x score.",
      appliesTo: ["pelod_2"],
      priority: 2
    }
  ],
  pim3: [
    {
      id: "pim3_open_formula",
      title: "Validation of the Pediatric Index of Mortality 3 in a Single Pediatric Intensive Care Unit in Korea",
      year: 2017,
      journalOrPublisher: "Journal of Korean Medical Science",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5220006/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open-access reproduction of the full PIM3 formula and diagnostic risk groups.",
      appliesTo: ["pim3"],
      priority: 1
    }
  ],
  prism_iv: [
    {
      id: "prism4_2016_original",
      title: "The Pediatric Risk of Mortality Score: Update 2015",
      authors: "Pollack MM, Holubkov R, Funai T, et al.",
      year: 2016,
      journalOrPublisher: "Pediatric Critical Care Medicine",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5048467/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Original PRISM IV publication; the prediction algorithm was placed in the public domain.",
      appliesTo: ["prism_iv"],
      priority: 1
    },
    {
      id: "prism3_open_ranges_for_prism4",
      title: "PRISM III physiologic point ranges used by PRISM IV",
      journalOrPublisher: "Open-access critical-care literature",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9004120/",
      evidenceLevel: "peer_reviewed_review",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Used to verify the neurologic and non-neurologic PRISM physiologic component ranges required by PRISM IV.",
      appliesTo: ["prism_iv"],
      priority: 2
    }
  ],
  step_by_step: [
    {
      id: "step_by_step_2016_validation",
      title: "Validation of the Step-by-Step Approach in the Management of Young Febrile Infants",
      authors: "Gómez B, Mintegi S, Bressan S, et al.",
      year: 2016,
      journalOrPublisher: "Pediatrics",
      doi: "10.1542/peds.2015-4381",
      pmid: "27382134",
      url: "https://pubmed.ncbi.nlm.nih.gov/27382134/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes: "Prospective validation of sequential risk stratification in febrile infants 90 days or younger.",
      appliesTo: ["step_by_step"],
      priority: 1
    },
    {
      id: "step_by_step_open_review",
      title: "Management of the Febrile Young Infant: Update for the 21st Century",
      year: 2017,
      journalOrPublisher: "Pediatric Emergency Care review / PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5679412/",
      evidenceLevel: "peer_reviewed_review",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open-access table verifies the age, appearance, leukocyturia, PCT, CRP, and ANC thresholds.",
      appliesTo: ["step_by_step"],
      priority: 2
    }
  ],
  modified_tal: [
    {
      id: "seup_2024_tal_modified",
      title: "Diagnóstico y tratamiento de la bronquiolitis aguda en Urgencias - Escala de Tal modificada",
      authors: "Sociedad Española de Urgencias de Pediatría",
      year: 2024,
      journalOrPublisher: "SEUP",
      url: "https://seup.org/",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "institutional_protocol",
      accessType: "open_access",
      notes: "SEUP 2024 reproduces the modified Tal score using age-adjusted respiratory rate, wheeze/crackles, retractions, and oxygen saturation.",
      appliesTo: ["modified_tal"],
      priority: 1
    },
    {
      id: "golan_tripton_2018_modified_tal",
      title: "Modified Tal Score: Validated score for prediction of bronchiolitis severity",
      authors: "Golan-Tripto I, Goldbart A, Akel K, Dizitzer Y, Novack V, Tal A",
      year: 2018,
      journalOrPublisher: "Pediatric Pulmonology",
      citation: "Golan-Tripto I, Goldbart A, Akel K, Dizitzer Y, Novack V, Tal A. Pediatr Pulmonol. 2018;53(6):796-801.",
      doi: "10.1002/ppul.24007",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["modified_tal"],
      priority: 2
    }
  ],
  taussig_croup: [
    {
      id: "taussig_1975_original",
      title: "Treatment of laryngotracheobronchitis (croup): use of intermittent positive-pressure breathing and racemic epinephrine",
      authors: "Taussig LM, Castro O, Beaudry PH, Fox WW, Bureau M",
      year: 1975,
      journalOrPublisher: "American Journal of Diseases of Children",
      citation: "Taussig LM, Castro O, Beaudry PH, Fox WW, Bureau M. Am J Dis Child. 1975;129(7):790-793.",
      doi: "10.1001/archpedi.1975.02120440016004",
      pmid: "1096594",
      url: "https://pubmed.ncbi.nlm.nih.gov/1096594/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["taussig_croup"],
      priority: 1
    },
    {
      id: "seup_2024_taussig",
      title: "Diagnóstico y tratamiento de la laringitis en Urgencias - Escala de Taussig",
      authors: "Sociedad Española de Urgencias de Pediatría",
      year: 2024,
      journalOrPublisher: "SEUP",
      url: "https://seup.org/",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "institutional_protocol",
      accessType: "open_access",
      notes: "SEUP 2024 reproduces the Taussig clinical domains for croup severity.",
      appliesTo: ["taussig_croup"],
      priority: 2
    }
  ],
  ckid_u25: [
    {
      id: "ckid_u25_niddk_equations",
      title: "eGFR Equations for Children, Adolescents, & Young Adults",
      authors: "National Institute of Diabetes and Digestive and Kidney Diseases",
      journalOrPublisher: "NIDDK",
      url: "https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/glomerular-filtration-rate-equations/children-adolescents-young-adults",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes: "Official NIDDK equations and age/sex-dependent coefficients for CKiD U25 creatinine, cystatin C, and combined estimates.",
      appliesTo: ["ckid_u25"],
      priority: 1
    },
    {
      id: "ckid_u25_2021_original",
      title: "Age- and sex-dependent clinical equations to estimate glomerular filtration rates in children and young adults with chronic kidney disease",
      authors: "Pierce CB, Muñoz A, Ng DK, et al.",
      year: 2021,
      journalOrPublisher: "Kidney International",
      citation: "Pierce CB, Muñoz A, Ng DK, et al. Kidney Int. 2021;99(4):948-956.",
      doi: "10.1016/j.kint.2020.10.047",
      pmid: "33301749",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9083470/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      appliesTo: ["ckid_u25"],
      priority: 2
    }
  ],
  prifle: [
    {
      id: "prifle_2007_original",
      title: "Modified RIFLE criteria in critically ill children with acute kidney injury",
      authors: "Akcan-Arikan A, Zappitelli M, Loftis LL, Washburn KK, Jefferson LS, Goldstein SL",
      year: 2007,
      journalOrPublisher: "Kidney International",
      citation: "Akcan-Arikan A, Zappitelli M, et al. Kidney Int. 2007;71(10):1028-1035.",
      doi: "10.1038/sj.ki.5002231",
      pmid: "17396113",
      url: "https://pubmed.ncbi.nlm.nih.gov/17396113/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["prifle"],
      priority: 1
    },
    {
      id: "prifle_open_review_table",
      title: "Approaches to the Management of Acute Kidney Injury in Children",
      year: 2012,
      journalOrPublisher: "Pediatric Nephrology review / PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3607497/",
      evidenceLevel: "peer_reviewed_review",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open-access reproduction of the pRIFLE criteria table used to verify thresholds.",
      appliesTo: ["prifle"],
      priority: 2
    }
  ],
  kdigo_pediatric: [
    {
      id: "kdigo_2012_aki_guideline",
      title: "KDIGO Clinical Practice Guideline for Acute Kidney Injury",
      authors: "Kidney Disease: Improving Global Outcomes (KDIGO) Acute Kidney Injury Work Group",
      year: 2012,
      journalOrPublisher: "Kidney International Supplements",
      url: "https://kdigo.org/wp-content/uploads/2019/01/KDIGO-2012-AKI-Guideline-English.pdf",
      evidenceLevel: "clinical_practice_guideline",
      sourceType: "guideline",
      accessType: "open_access",
      notes: "Published KDIGO AKI definition and staging; pediatric stage 3 includes eGFR <35 mL/min/1.73 m2 for patients under 18 years.",
      appliesTo: ["kdigo_pediatric"],
      priority: 1
    }
  ],
  apgar: [
    {
      id: "apgar_1953_original",
      title: "A Proposal for a New Method of Evaluation of the Newborn Infant",
      authors: "Apgar V",
      year: 1953,
      journalOrPublisher: "Current Researches in Anesthesia and Analgesia",
      citation:
        "Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953;32(4):260-267.",
      doi: "10.1213/00000539-195301000-00041",
      pmid: "13083014",
      url: "https://pubmed.ncbi.nlm.nih.gov/13083014/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      appliesTo: ["apgar"],
      priority: 1
    },
    {
      id: "apgar_aap_acog_2015",
      title: "The Apgar Score",
      authors: "American Academy of Pediatrics Committee on Fetus and Newborn; American College of Obstetricians and Gynecologists Committee on Obstetric Practice",
      year: 2015,
      journalOrPublisher: "Pediatrics / Obstetrics & Gynecology",
      citation: "American Academy of Pediatrics Committee on Fetus and Newborn; American College of Obstetricians and Gynecologists Committee on Obstetric Practice. The Apgar Score. Pediatrics. 2015;136(4):819-822; Obstet Gynecol. 2015;126(4):e52-e55.",
      doi: "10.1542/peds.2015-2651",
      pmid: "26416932",
      url: "https://publications.aap.org/pediatrics/article/136/4/819/73821/The-Apgar-Score",
      evidenceLevel: "clinical_practice_guideline",
      sourceType: "society_statement",
      accessType: "open_access",
      notes: "Defines timing, repeat assessments, interpretation at 5 minutes, limitations, and the requirement that resuscitation must not wait for Apgar scoring.",
      appliesTo: ["apgar"],
      priority: 2
    },
    {
      id: "apgar_aap_acog_2014_neonatal_encephalopathy",
      title: "Neonatal Encephalopathy and Neurologic Outcome, Second Edition",
      authors: "American College of Obstetricians and Gynecologists Task Force on Neonatal Encephalopathy; American Academy of Pediatrics",
      year: 2014,
      journalOrPublisher: "American College of Obstetricians and Gynecologists / American Academy of Pediatrics",
      citation: "American College of Obstetricians and Gynecologists; American Academy of Pediatrics. Neonatal Encephalopathy and Neurologic Outcome. 2nd ed. 2014.",
      doi: "10.1542/peds.2014-0724",
      url: "https://www.acog.org/clinical/clinical-guidance/task-force-report/articles/2014/neonatal-encephalopathy-and-neurologic-outcome",
      evidenceLevel: "consensus_statement",
      sourceType: "society_statement",
      accessType: "open_access",
      notes: "Supports 5-minute bands of 7-10 reassuring, 4-6 moderately abnormal, and 0-3 low in term and late-preterm infants; Apgar alone is not diagnostic of asphyxia or neurologic outcome.",
      appliesTo: ["apgar"],
      priority: 3
    }
  ],
  silverman_andersen: [
    {
      id: "silverman_andersen_1956_original",
      title:
        "A controlled clinical trial of effects of water mist on obstructive respiratory signs, death rate and necropsy findings among premature infants",
      authors: "Silverman WA, Andersen DH",
      year: 1956,
      journalOrPublisher: "Pediatrics",
      citation:
        "Silverman WA, Andersen DH. A controlled clinical trial of effects of water mist on obstructive respiratory signs, death rate and necropsy findings among premature infants. Pediatrics. 1956;17(1):1-10.",
      url: "https://publications.aap.org/pediatrics/article/17/1/1/39942/A-CONTROLLED-CLINICAL-TRIAL-OF-EFFECTS-OF-WATER",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      notes: "Primary publication identified; DOI and PMID not confirmed in this audit.",
      appliesTo: ["silverman_andersen"],
      priority: 1
    }
  ],
  nips: [
    {
      id: "nips_1993_original",
      title: "The development of a tool to assess neonatal pain",
      authors: "Lawrence J, Alcock D, McGrath P, Kay J, MacMurray SB, Dulberg C",
      year: 1993,
      journalOrPublisher: "Neonatal Network",
      citation:
        "Lawrence J, Alcock D, McGrath P, Kay J, MacMurray SB, Dulberg C. The development of a tool to assess neonatal pain. Neonatal Netw. 1993;12(6):59-66.",
      pmid: "8413140",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["nips"],
      priority: 1
    }
  ],
  westley_croup: [
    {
      id: "westley_1978_original",
      title:
        "Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study",
      authors: "Westley CR, Cotton EK, Brooks JG",
      year: 1978,
      journalOrPublisher: "American Journal of Diseases of Children",
      citation:
        "Westley CR, Cotton EK, Brooks JG. Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study. Am J Dis Child. 1978;132(5):484-487.",
      doi: "10.1001/archpedi.1978.02120300044008",
      pmid: "347921",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["westley_croup"],
      priority: 1
    }
  ],
  pram: [
    {
      id: "pram_2000_original",
      title:
        "The Preschool Respiratory Assessment Measure (PRAM): a responsive index of acute asthma severity",
      authors: "Chalut DS, Ducharme FM, Davis GM",
      year: 2000,
      journalOrPublisher: "The Journal of Pediatrics",
      citation:
        "Chalut DS, Ducharme FM, Davis GM. The Preschool Respiratory Assessment Measure (PRAM): a responsive index of acute asthma severity. J Pediatr. 2000;137(6):762-768.",
      doi: "10.1067/mpd.2000.110121",
      pmid: "11113831",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["pram"],
      priority: 1
    },
    {
      id: "pram_2008_validation",
      title:
        "The Pediatric Respiratory Assessment Measure: a valid clinical score for assessing acute asthma severity from toddlers to teenagers",
      authors:
        "Ducharme FM, Chalut D, Plotnick L, Savdie C, Kudirka D, Zhang X, Meng L, McGillivray D",
      year: 2008,
      journalOrPublisher: "The Journal of Pediatrics",
      citation:
        "Ducharme FM, Chalut D, Plotnick L, Savdie C, Kudirka D, Zhang X, Meng L, McGillivray D. The Pediatric Respiratory Assessment Measure: a valid clinical score for assessing acute asthma severity from toddlers to teenagers. J Pediatr. 2008;152(4):476-480.e1.",
      doi: "10.1016/j.jpeds.2007.08.034",
      pmid: "18346499",
      url: "https://pubmed.ncbi.nlm.nih.gov/18346499/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["pram"],
      priority: 2
    },
    {
      id: "pram_2010_external_validation",
      title:
        "Prospective evaluation of two clinical scores for acute asthma in children 18 months to 7 years of age",
      authors: "Gouin S, Robidas I, Gravel J, Guimont C, Chalut D, Amre D",
      year: 2010,
      journalOrPublisher: "Academic Emergency Medicine",
      citation:
        "Gouin S, Robidas I, Gravel J, Guimont C, Chalut D, Amre D. Prospective evaluation of two clinical scores for acute asthma in children 18 months to 7 years of age. Acad Emerg Med. 2010;17(6):598-603.",
      doi: "10.1111/j.1553-2712.2010.00775.x",
      pmid: "20624139",
      url: "https://pubmed.ncbi.nlm.nih.gov/20624139/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["pram"],
      priority: 3
    },
    {
      id: "pram_bcch_operational_2015",
      title: "PRAM (Pediatric Respiratory Assessment Measure): Score Assessment for Asthma",
      authors: "BC Children's Hospital",
      year: 2015,
      journalOrPublisher: "BC Children's Hospital",
      citation:
        "BC Children's Hospital. PRAM (Pediatric Respiratory Assessment Measure): Score Assessment for Asthma. Child and Youth Health Policy Manual CC.09.27. Effective July 13, 2015.",
      url: "https://www.childhealthindicatorsbc.ca/sites/default/files/BCCH%20PRAM%20score%20for%20assessment%20for%20Asthma%20%282%29.pdf",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "institutional_protocol",
      accessType: "open_access",
      notes:
        "Operational source for a stable room-air oximetry reading maintained for at least 1 minute and for domain examination technique.",
      appliesTo: ["pram"],
      priority: 4
    }
  ],
  clinical_dehydration_scale: [
    {
      id: "cds_2004_original",
      title:
        "Development of a clinical dehydration scale for use in children between 1 and 36 months of age",
      authors: "Friedman JN, Goldman RD, Srivastava R, Parkin PC",
      year: 2004,
      journalOrPublisher: "The Journal of Pediatrics",
      citation:
        "Friedman JN, Goldman RD, Srivastava R, Parkin PC. Development of a clinical dehydration scale for use in children between 1 and 36 months of age. J Pediatr. 2004;145(2):201-207.",
      doi: "10.1016/j.jpeds.2004.05.035",
      pmid: "15289767",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["clinical_dehydration_scale"],
      priority: 1
    },
    {
      id: "cds_2008_validation",
      title: "Validation of the clinical dehydration scale for children with acute gastroenteritis",
      authors: "Goldman RD, Friedman JN, Parkin PC",
      year: 2008,
      journalOrPublisher: "Pediatrics",
      citation:
        "Goldman RD, Friedman JN, Parkin PC. Validation of the clinical dehydration scale for children with acute gastroenteritis. Pediatrics. 2008;122(3):545-549.",
      doi: "10.1542/peds.2007-3141",
      pmid: "18762524",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["clinical_dehydration_scale"],
      priority: 2
    },
    {
      id: "cds_2010_external_validation",
      title:
        "External validation of the clinical dehydration scale for children with acute gastroenteritis",
      authors: "Bailey B, Gravel J, Goldman RD, Friedman JN, Parkin PC",
      year: 2010,
      journalOrPublisher: "Academic Emergency Medicine",
      citation:
        "Bailey B, Gravel J, Goldman RD, Friedman JN, Parkin PC. External validation of the clinical dehydration scale for children with acute gastroenteritis. Acad Emerg Med. 2010;17(6):583-588.",
      doi: "10.1111/j.1553-2712.2010.00767.x",
      pmid: "20624137",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["clinical_dehydration_scale"],
      priority: 3
    }
  ],
  pediatric_burn_tbsa: [
    {
      id: "vumc_pediatric_burn_resuscitation_2025_tbsa_table",
      title: "Pediatric Burn Fluid Resuscitation",
      authors: "Monroe Carell Jr. Children's Hospital at Vanderbilt",
      year: 2025,
      journalOrPublisher: "Vanderbilt University Medical Center",
      citation:
        "Monroe Carell Jr. Children's Hospital at Vanderbilt. Pediatric Burn Fluid Resuscitation. March 2025.",
      url: "https://www.vumc.org/burn/sites/default/files/public_files/Protocols/Pediatric-Burn-Fluid-Resuscitation-3.2025.pdf",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "institutional_protocol",
      accessType: "open_access",
      notes:
        "Primary numeric table source for PedsCore TBSA regional percentages only. PedsCore does not implement protocol care-action sections.",
      appliesTo: ["pediatric_burn_tbsa"],
      priority: 1
    },
    {
      id: "rch_burns_acute_management_tbsa",
      title: "Clinical Practice Guidelines: Burns - acute management",
      authors: "The Royal Children's Hospital Melbourne",
      journalOrPublisher: "The Royal Children's Hospital Melbourne",
      url: "https://www.rch.org.au/clinicalguide/guideline_index/burns/",
      evidenceLevel: "clinical_practice_guideline",
      sourceType: "guideline",
      accessType: "open_access",
      notes:
        "Context source for using pediatric-specific TBSA tools and excluding epidermal burns/erythema from TBSA.",
      appliesTo: ["pediatric_burn_tbsa"],
      priority: 2
    },
    {
      id: "jts_pediatric_lund_browder_2025",
      title: "Pediatric Lund Browder Burn Estimate & Diagram",
      authors: "Joint Trauma System",
      year: 2025,
      journalOrPublisher: "Defense Health Agency",
      url: "https://jts.health.mil/assets/docs/forms/PEDIATRIC_LUND_BROWDER_BURN_ESTIMATE_DIAGRAM.pdf",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "institutional_protocol",
      accessType: "open_access",
      notes:
        "Comparator source. PedsCore uses numeric values only and does not reproduce the diagram or form.",
      appliesTo: ["pediatric_burn_tbsa"],
      priority: 3
    },
    {
      id: "pch_burns_surface_area_sheet",
      title: "Burns Surface Area Sheet",
      authors: "Perth Children's Hospital",
      journalOrPublisher: "Perth Children's Hospital",
      url: "https://pch.health.wa.gov.au/-/media/Files/Hospitals/PCH/General-documents/Health-professionals/ED-Guidelines/Flowchart-PDF/Burns-Surface-Area-sheet-PCH.pdf",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "institutional_protocol",
      accessType: "open_access",
      notes:
        "Comparator source for age-adjusted Lund-Browder values. PedsCore does not reproduce institutional forms.",
      appliesTo: ["pediatric_burn_tbsa"],
      priority: 4
    },
    
  ],
  pediatric_appendicitis_score: [
    {
      id: "pas_2002_original",
      title: "Pediatric appendicitis score",
      authors: "Samuel M",
      year: 2002,
      journalOrPublisher: "Journal of Pediatric Surgery",
      citation:
        "Samuel M. Pediatric appendicitis score. J Pediatr Surg. 2002;37(6):877-881.",
      doi: "10.1053/jpsu.2002.32893",
      pmid: "12037754",
      url: "https://pubmed.ncbi.nlm.nih.gov/12037754/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Primary PAS derivation publication. PedsCore presents score total and conservative risk bands only; no local validation, diagnostic certainty, imaging advice, or surgical recommendation is implied.",
      appliesTo: ["pediatric_appendicitis_score"],
      priority: 1
    }
  ],
  pecarn_tbi_under_2: [
    {
      id: "pecarn_tbi_2009_derivation_validation",
      title:
        "Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study",
      authors: "Kuppermann N, Holmes JF, Dayan PS, et al.; PECARN",
      year: 2009,
      journalOrPublisher: "The Lancet",
      citation:
        "Kuppermann N, Holmes JF, Dayan PS, et al.; PECARN. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374(9696):1160-1170.",
      doi: "10.1016/S0140-6736(09)61558-0",
      pmid: "19758692",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["pecarn_tbi_under_2", "pecarn_tbi_2_or_more"],
      priority: 1
    }
  ],
  pecarn_tbi_2_or_more: [
    {
      id: "pecarn_tbi_2009_derivation_validation",
      title:
        "Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study",
      authors: "Kuppermann N, Holmes JF, Dayan PS, et al.; PECARN",
      year: 2009,
      journalOrPublisher: "The Lancet",
      citation:
        "Kuppermann N, Holmes JF, Dayan PS, et al.; PECARN. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374(9696):1160-1170.",
      doi: "10.1016/S0140-6736(09)61558-0",
      pmid: "19758692",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["pecarn_tbi_under_2", "pecarn_tbi_2_or_more"],
      priority: 1
    }
  ],
  sipa: [
    {
      id: "sipa_2014_original",
      title: "Pediatric specific shock index accurately identifies severely injured children",
      authors: "Acker SN, Ross JT, Partrick DA, Tong S, Bensard DD",
      year: 2015,
      journalOrPublisher: "Journal of Pediatric Surgery",
      citation:
        "Acker SN, Ross JT, Partrick DA, Tong S, Bensard DD. Pediatric specific shock index accurately identifies severely injured children. J Pediatr Surg. 2015;50(2):331-334.",
      doi: "10.1016/j.jpedsurg.2014.08.009",
      pmid: "25638631",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Canonical SIPA derivation definition: emergency-department heart rate divided by systolic blood pressure; elevated when >1.22 at ages 4-6, >1.0 at ages 7-12, or >0.9 at ages 13-16.",
      appliesTo: ["sipa"],
      priority: 1
    },
    {
      id: "sipa_2017_prospective_validation",
      title:
        "Prospective validation of the shock index pediatric-adjusted (SIPA) in blunt liver and spleen trauma: An ATOMAC+ study",
      authors:
        "Linnaus ME, Notrica DM, Langlais CS, St Peter SD, Leys CM, Ostlie DJ, et al.",
      year: 2017,
      journalOrPublisher: "Journal of Pediatric Surgery",
      citation:
        "Linnaus ME, Notrica DM, Langlais CS, St Peter SD, Leys CM, Ostlie DJ, et al. Prospective validation of the shock index pediatric-adjusted (SIPA) in blunt liver and spleen trauma: An ATOMAC+ study. J Pediatr Surg. 2017;52(2):340-344.",
      doi: "10.1016/j.jpedsurg.2016.09.060",
      pmid: "27717564",
      url: "https://pubmed.ncbi.nlm.nih.gov/27717564/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Prospective multicenter validation in patients aged 4-16 years with blunt liver and/or spleen injury; it retained the original strict comparators and 1.22/1.0/0.9 thresholds.",
      appliesTo: ["sipa"],
      priority: 2
    }
  ],
  qtc_bazett: [
    {
      id: "bazett_1920_original",
      title: "An analysis of the time-relations of electrocardiograms",
      authors: "Bazett HC",
      year: 1920,
      journalOrPublisher: "Heart",
      citation: "Bazett HC. An analysis of the time-relations of electrocardiograms. Heart. 1920;7:353-370.",
      url: "https://cir.nii.ac.jp/crid/1571135649791070976",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "unknown",
      notes: "Classic original formula publication; DOI and PMID not confirmed in this audit.",
      appliesTo: ["qtc_bazett"],
      priority: 1
    }
  ],
  qtc_fridericia: [
    {
      id: "fridericia_1920_original",
      title: "Die Systolendauer im Elektrokardiogramm bei normalen Menschen und bei Herzkranken",
      authors: "Fridericia LS",
      year: 1920,
      journalOrPublisher: "Acta Medica Scandinavica",
      citation:
        "Fridericia LS. Die Systolendauer im Elektrokardiogramm bei normalen Menschen und bei Herzkranken. Acta Med Scand. 1920;53:469-486.",
      doi: "10.1111/j.0954-6820.1920.tb18266.x",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      appliesTo: ["qtc_fridericia"],
      priority: 1
    }
  ],
  qtc_framingham: [
    {
      id: "framingham_qtc_1992_original",
      title: "An improved method for adjusting the QT interval for heart rate (the Framingham Heart Study)",
      authors: "Sagie A, Larson MG, Goldberg RJ, Bengtson JR, Levy D",
      year: 1992,
      journalOrPublisher: "American Journal of Cardiology",
      citation:
        "Sagie A, Larson MG, Goldberg RJ, Bengtson JR, Levy D. An improved method for adjusting the QT interval for heart rate (the Framingham Heart Study). Am J Cardiol. 1992;70(7):797-801.",
      doi: "10.1016/0002-9149(92)90562-d",
      pmid: "1519533",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["qtc_framingham"],
      priority: 1
    }
  ],
  qtc_hodges: [
    {
      id: "hodges_1983_original",
      title: "Bazett's QT correction reviewed: evidence that a linear QT correction for heart rate is better",
      authors: "Hodges M, Salerno D, Erlien D",
      year: 1983,
      journalOrPublisher: "Journal of the American College of Cardiology",
      citation:
        "Hodges M, Salerno D, Erlien D. Bazett's QT correction reviewed: evidence that a linear QT correction for heart rate is better. J Am Coll Cardiol. 1983;1:694.",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "unknown",
      notes: "Conference abstract/classic citation identified; DOI and PMID not confirmed in this audit.",
      appliesTo: ["qtc_hodges"],
      priority: 1
    },
    {
      id: "qtc_formulae_2016_review",
      title: "Which QT Correction Formulae to Use for QT Monitoring?",
      authors: "Vandenberk B, Vandael E, Robyns T, et al.",
      year: 2016,
      journalOrPublisher: "Journal of the American Heart Association",
      citation:
        "Vandenberk B, Vandael E, Robyns T, et al. Which QT Correction Formulae to Use for QT Monitoring? J Am Heart Assoc. 2016;5:e003264.",
      doi: "10.1161/JAHA.116.003264",
      evidenceLevel: "peer_reviewed_review",
      sourceType: "journal_article",
      accessType: "open_access",
      appliesTo: ["qtc_bazett", "qtc_fridericia", "qtc_framingham", "qtc_hodges"],
      priority: 2
    }
  ],
  bedside_schwartz: [
    {
      id: "bedside_schwartz_2009_original",
      title: "New equations to estimate GFR in children with CKD",
      authors: "Schwartz GJ, Munoz A, Schneider MF, Mak RH, Kaskel F, Warady BA, Furth SL",
      year: 2009,
      journalOrPublisher: "Journal of the American Society of Nephrology",
      citation:
        "Schwartz GJ, Munoz A, Schneider MF, Mak RH, Kaskel F, Warady BA, Furth SL. New equations to estimate GFR in children with CKD. J Am Soc Nephrol. 2009;20(3):629-637.",
      pmid: "19158356",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["bedside_schwartz"],
      priority: 1
    }
  ],
  flacc: [
    {
      id: "flacc_1997_original",
      title: "The FLACC: a behavioral scale for scoring postoperative pain in young children",
      authors: "Merkel SI, Voepel-Lewis T, Shayevitz JR, Malviya S",
      year: 1997,
      journalOrPublisher: "Pediatric Nursing",
      citation:
        "Merkel SI, Voepel-Lewis T, Shayevitz JR, Malviya S. The FLACC: a behavioral scale for scoring postoperative pain in young children. Pediatr Nurs. 1997;23(3):293-297.",
      url: "https://cir.nii.ac.jp/crid/1370853567591640205",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "unknown",
      notes: "Primary FLACC publication identified; DOI and PMID not confirmed in this audit.",
      appliesTo: ["flacc"],
      priority: 1
    }
  ],
  ballard: [
    {
      id: "new_ballard_1991_original",
      title: "New Ballard Score, expanded to include extremely premature infants",
      authors: "Ballard JL, Khoury JC, Wedig K, Wang L, Eilers-Walsman BL, Lipp R",
      year: 1991,
      journalOrPublisher: "The Journal of Pediatrics",
      citation:
        "Ballard JL, Khoury JC, Wedig K, Wang L, Eilers-Walsman BL, Lipp R. New Ballard Score, expanded to include extremely premature infants. J Pediatr. 1991;119(3):417-423.",
      doi: "10.1016/S0022-3476(05)82056-6",
      pmid: "1880657",
      url: "https://pubmed.ncbi.nlm.nih.gov/1880657/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Primary New Ballard derivation source. PedsCore implements numeric score entry and completed-week conversion only; protected illustrations and descriptive score-sheet wording are not reproduced locally.",
      appliesTo: ["ballard"],
      priority: 1
    }
  ],
  sarnat: [
    {
      id: "sarnat_1976_original",
      title:
        "Neonatal encephalopathy following fetal distress. A clinical and electroencephalographic study",
      authors: "Sarnat HB, Sarnat MS",
      year: 1976,
      journalOrPublisher: "Archives of Neurology",
      citation:
        "Sarnat HB, Sarnat MS. Neonatal encephalopathy following fetal distress. A clinical and electroencephalographic study. Arch Neurol. 1976;33(10):696-705.",
      doi: "10.1001/archneur.1976.00500100030012",
      pmid: "987769",
      url: "https://pubmed.ncbi.nlm.nih.gov/987769/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Primary source for the classic three-stage Sarnat and Sarnat framework. PedsCore publishes it as a descriptive staging reference, not as a numeric calculator or a treatment decision rule.",
      appliesTo: ["sarnat"],
      priority: 1
    }
  ],
  modified_sarnat_nichd: [
    {
      id: "modified_sarnat_prime_2019",
      title:
        "Prospective Research in Infants with Mild Encephalopathy (PRIME) Identified in the First Six Hours of Life: Neurodevelopmental Outcomes at 18-22 Months",
      year: 2019,
      journalOrPublisher: "Pediatric Research",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6445543/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Open-access source documents the six-category modified Sarnat examination, 0-3 severity coding per category, and Total Sarnat Score range 0-18.",
      appliesTo: ["modified_sarnat_nichd"],
      priority: 1
    },
    {
      id: "sarnat_1976_context",
      title:
        "Neonatal encephalopathy following fetal distress. A clinical and electroencephalographic study",
      authors: "Sarnat HB, Sarnat MS",
      year: 1976,
      journalOrPublisher: "Archives of Neurology",
      citation:
        "Sarnat HB, Sarnat MS. Neonatal encephalopathy following fetal distress. A clinical and electroencephalographic study. Arch Neurol. 1976;33(10):696-705.",
      doi: "10.1001/archneur.1976.00500100030012",
      pmid: "987769",
      url: "https://pubmed.ncbi.nlm.nih.gov/987769/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes: "Historical source for the Sarnat staging concept.",
      appliesTo: ["modified_sarnat_nichd"],
      priority: 2
    }
  ],
  thompson_hie: [
    {
      id: "thompson_hie_1997_original",
      title:
        "The value of a scoring system for hypoxic ischaemic encephalopathy in predicting neurodevelopmental outcome",
      authors:
        "Thompson CM, Puterman AS, Linley LL, Hann FM, van der Elst CW, Molteno CD, Malan AF",
      year: 1997,
      journalOrPublisher: "Acta Paediatrica",
      citation:
        "Thompson CM, Puterman AS, Linley LL, Hann FM, van der Elst CW, Molteno CD, Malan AF. The value of a scoring system for hypoxic ischaemic encephalopathy in predicting neurodevelopmental outcome. Acta Paediatr. 1997;86(7):757-761.",
      doi: "10.1111/j.1651-2227.1997.tb08581.x",
      pmid: "9240886",
      url: "https://pubmed.ncbi.nlm.nih.gov/9240886/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      notes:
        "Primary Thompson HIE source. PedsCore implements the nine-domain numeric score (0-22) with independent UI and descriptive severity ranges; it does not generate therapeutic-hypothermia eligibility or treatment recommendations.",
      appliesTo: ["thompson_hie"],
      priority: 1
    }
  ],
  cries: [
    {
      id: "cries_1995_original",
      title:
        "CRIES: a new neonatal postoperative pain measurement score. Initial testing of validity and reliability",
      authors: "Krechel SW, Bildner J",
      year: 1995,
      journalOrPublisher: "Paediatric Anaesthesia",
      citation:
        "Krechel SW, Bildner J. CRIES: a new neonatal postoperative pain measurement score. Initial testing of validity and reliability. Paediatr Anaesth. 1995;5(1):53-61.",
      doi: "10.1111/j.1460-9592.1995.tb00242.x",
      pmid: "8521311",
      url: "https://pubmed.ncbi.nlm.nih.gov/8521311/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Primary CRIES development and validation source. PedsCore implements an independently worded five-domain 0-2 interface and 0-10 total; original table layout and verbatim descriptors are not reproduced.",
      appliesTo: ["cries"],
      priority: 1
    }
  ],
  aap_2022_hyperbilirubinemia: [
    {
      id: "aap_hyperbilirubinemia_2022",
      title:
        "Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation",
      authors: "American Academy of Pediatrics Subcommittee on Hyperbilirubinemia",
      year: 2022,
      journalOrPublisher: "Pediatrics",
      citation:
        "American Academy of Pediatrics Subcommittee on Hyperbilirubinemia. Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation. Pediatrics. 2022;150(3):e2022058859.",
      doi: "10.1542/peds.2022-058859",
      url: "https://publications.aap.org/pediatrics/article/150/3/e2022058859/188726/Clinical-Practice-Guideline-Revision-Management-of",
      evidenceLevel: "clinical_practice_guideline",
      sourceType: "guideline",
      accessType: "open_access",
      notes:
        "Current AAP framework for newborns >=35 weeks. Treatment thresholds depend on gestational age, postnatal age in hours, total serum bilirubin, and neurotoxicity risk factors.",
      appliesTo: ["aap_2022_hyperbilirubinemia"],
      priority: 1
    },
    {
      id: "peditools_bili2022_api",
      title: "PediTools 2022 AAP Hyperbilirubinemia Guidelines API",
      authors: "Joseph H. Chou",
      journalOrPublisher: "PediTools",
      url: "https://peditools.org/bili2022/bili2022_api.html",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes:
        "PediTools documents free API access without registration or licensing. PedsCore delegates threshold calculation externally instead of reproducing AAP threshold tables or curves.",
      appliesTo: ["aap_2022_hyperbilirubinemia"],
      priority: 2
    }
  ],
  bhutani_nomogram: [
    {
      id: "bhutani_1999_original",
      title:
        "Predictive ability of a predischarge hour-specific serum bilirubin for subsequent significant hyperbilirubinemia in healthy term and near-term newborns",
      authors: "Bhutani VK, Johnson L, Sivieri EM",
      year: 1999,
      journalOrPublisher: "Pediatrics",
      citation:
        "Bhutani VK, Johnson L, Sivieri EM. Predictive ability of a predischarge hour-specific serum bilirubin for subsequent significant hyperbilirubinemia in healthy term and near-term newborns. Pediatrics. 1999;103(1):6-14.",
      doi: "10.1542/peds.103.1.6",
      pmid: "9917432",
      url: "https://pubmed.ncbi.nlm.nih.gov/9917432/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Priority A evidence audit: source located. Usable hour-specific nomogram data/curve values and current guideline context remain pending before implementation.",
      appliesTo: ["bhutani_nomogram"],
      priority: 1
    }
  ],
  bedside_pews: [
    {
      id: "bedside_pews_2009_original",
      title: "Development and initial validation of the Bedside Paediatric Early Warning System score",
      authors: "Parshuram CS, Hutchison J, Middaugh K",
      year: 2009,
      journalOrPublisher: "Critical Care",
      citation:
        "Parshuram CS, Hutchison J, Middaugh K. Development and initial validation of the Bedside Paediatric Early Warning System score. Crit Care. 2009;13(4):R135.",
      doi: "10.1186/cc7998",
      pmid: "19678924",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2750193/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Primary development source and scoring table. Published open access under Creative Commons Attribution 2.0 (CC BY 2.0), permitting reuse and reproduction with attribution. PedsCore attributes Parshuram et al. and keeps escalation actions separate from the score.",
      appliesTo: ["bedside_pews"],
      priority: 1
    },
    {
      id: "bedside_pews_2011_multicentre",
      title:
        "Multicentre validation of the bedside paediatric early warning system score: a severity of illness score to detect evolving critical illness in hospitalised children",
      authors:
        "Parshuram CS, Duncan HP, Joffe AR, Farrell CA, Lacroix JR, Middaugh KL, Hutchison JS, Wensley D, Blanchard N, Beyene J, Parkin PC",
      year: 2011,
      journalOrPublisher: "Critical Care",
      citation:
        "Parshuram CS, Duncan HP, Joffe AR, et al. Multicentre validation of the bedside paediatric early warning system score: a severity of illness score to detect evolving critical illness in hospitalised children. Crit Care. 2011;15(4):R184.",
      doi: "10.1186/cc10337",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3387627/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Multicentre validation source reproducing the seven-item Bedside PEWS table and confirming a total range of 0-26. Open-access Critical Care article; score remains descriptive and does not define a universal escalation protocol.",
      appliesTo: ["bedside_pews"],
      priority: 2
    }
  ],
  who_growth_percentiles: [
    {
      id: "who_child_growth_standards_official",
      title: "WHO Child Growth Standards",
      authors: "World Health Organization",
      year: 2006,
      journalOrPublisher: "World Health Organization",
      citation:
        "World Health Organization. WHO Child Growth Standards. Official standards and toolkits.",
      url: "https://www.who.int/tools/child-growth-standards",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes:
        "Priority A evidence audit: official source located. Exact indicators, age ranges, LMS/data files, license terms, and test fixtures remain pending before implementation.",
      appliesTo: ["who_growth_percentiles"],
      priority: 1
    },
    {
      id: "who_growth_reference_5_19_official",
      title: "Growth reference data for 5-19 years",
      authors: "World Health Organization",
      year: 2007,
      journalOrPublisher: "World Health Organization",
      citation:
        "World Health Organization. Growth reference data for 5-19 years.",
      url: "https://www.who.int/tools/growth-reference-data-for-5to19-years",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes:
        "Official source for WHO Growth Reference 2007 weight-for-age 5-10, BMI-for-age 5-19 and height-for-age 5-19 data used by the central WHO Growth module.",
      appliesTo: ["who_growth_percentiles"],
      priority: 2
    }
  ],
  bmi_percentile: [
    {
      id: "who_bmi_for_age_0_5_official",
      title: "WHO Child Growth Standards: BMI-for-age",
      authors: "World Health Organization",
      year: 2006,
      journalOrPublisher: "World Health Organization",
      citation:
        "World Health Organization. WHO Child Growth Standards: BMI-for-age.",
      url: "https://www.who.int/toolkits/child-growth-standards/standards/body-mass-index-for-age-bmi-for-age",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes:
        "Sprint 2B: BMI Percentile is a WHO Growth preset using the central WHO BMI-for-age engine for 0-5 years.",
      appliesTo: ["bmi_percentile", "who_growth_module"],
      priority: 1
    },
    {
      id: "who_bmi_for_age_5_19_official",
      title: "WHO Growth Reference 2007: BMI-for-age 5-19 years",
      authors: "World Health Organization",
      year: 2007,
      journalOrPublisher: "World Health Organization",
      citation:
        "World Health Organization. Growth reference data for 5-19 years: BMI-for-age.",
      url: "https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes:
        "Sprint 2B: BMI Percentile is a WHO Growth preset using the central WHO BMI-for-age engine for 5-19 years.",
      appliesTo: ["bmi_percentile", "who_growth_module"],
      priority: 2
    }
  ],
  head_circumference_percentile: [
    {
      id: "who_head_circumference_0_5_official",
      title: "WHO Child Growth Standards: Head circumference-for-age",
      authors: "World Health Organization",
      year: 2006,
      journalOrPublisher: "World Health Organization",
      citation:
        "World Health Organization. WHO Child Growth Standards: Head circumference-for-age.",
      url: "https://www.who.int/toolkits/child-growth-standards/standards/head-circumference-for-age",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes:
        "Sprint 2B: Head Circumference Percentile is a WHO Growth preset using the central WHO head circumference-for-age engine for 0-5 years.",
      appliesTo: ["head_circumference_percentile", "who_growth_module"],
      priority: 1
    }
  ],
  pipp: [
    {
      id: "pipp_1996_original",
      title: "Premature Infant Pain Profile: Development and Initial Validation",
      authors: "Stevens B, Johnston C, Petryshen P, Taddio A",
      year: 1996,
      journalOrPublisher: "The Clinical Journal of Pain",
      citation:
        "Stevens B, Johnston C, Petryshen P, Taddio A. Premature Infant Pain Profile: Development and Initial Validation. Clin J Pain. 1996;12(1):13-22.",
      doi: "10.1097/00002508-199603000-00004",
      url: "https://journals.lww.com/clinicalpain/fulltext/1996/03000/premature_infant_pain_profile__development_and.4.aspx",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      notes:
        "Block 8B-2: original PIPP source located. PMID not confirmed; complete table, gestational-age adjustment, interpretation, and licensing remain pending.",
      appliesTo: ["pipp"],
      priority: 1
    }
  ],
  pipp_r: [
    {
      id: "pippr_2014_initial_validation",
      title: "The premature infant pain profile-revised (PIPP-R): initial validation and feasibility",
      authors: "Stevens BJ, Gibbins S, Yamada J, Dionne K, Lee G, Johnston C, Taddio A",
      year: 2014,
      journalOrPublisher: "The Clinical Journal of Pain",
      citation:
        "Stevens BJ, Gibbins S, Yamada J, Dionne K, Lee G, Johnston C, Taddio A. The premature infant pain profile-revised (PIPP-R): initial validation and feasibility. Clin J Pain. 2014;30(3):238-243.",
      doi: "10.1097/AJP.0b013e3182906aed",
      pmid: "24503979",
      url: "https://pubmed.ncbi.nlm.nih.gov/24503979/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Block 8B-2: PIPP-R initial validation source located. Complete table, scoring adjustment, interpretation, and licensing remain pending.",
      appliesTo: ["pipp_r"],
      priority: 1
    },
    {
      id: "pippr_2014_external_validation",
      title: "Validation of the Premature Infant Pain Profile-Revised (PIPP-R)",
      authors: "Gibbins S, Stevens BJ, Yamada J, Dionne K, Campbell-Yeo M, Lee G, Caddell K, Johnston C, Taddio A",
      year: 2014,
      journalOrPublisher: "Early Human Development",
      citation:
        "Gibbins S, Stevens BJ, Yamada J, Dionne K, Campbell-Yeo M, Lee G, Caddell K, Johnston C, Taddio A. Validation of the Premature Infant Pain Profile-Revised (PIPP-R). Early Hum Dev. 2014;90(4):189-193.",
      doi: "10.1016/j.earlhumdev.2014.01.005",
      url: "https://www.sciencedirect.com/science/article/pii/S0378378214000140",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      notes: "External validation source located; table/licensing still require review.",
      appliesTo: ["pipp_r"],
      priority: 2
    }
  ],
  comfortneo: [
    {
      id: "comfortneo_2009_original",
      title:
        "Taking Up the Challenge of Measuring Prolonged Pain in (Premature) Neonates: The COMFORTneo Scale Seems Promising",
      authors:
        "van Dijk M, Roofthooft DWE, Anand KJS, Guldemond F, de Graaf J, Simons S, de Jager Y, van Goudoever JB, Tibboel D",
      year: 2009,
      journalOrPublisher: "The Clinical Journal of Pain",
      citation:
        "van Dijk M, Roofthooft DWE, Anand KJS, Guldemond F, de Graaf J, Simons S, de Jager Y, van Goudoever JB, Tibboel D. Taking Up the Challenge of Measuring Prolonged Pain in (Premature) Neonates: The COMFORTneo Scale Seems Promising. Clin J Pain. 2009;25(7):607-616.",
      doi: "10.1097/AJP.0b013e3181a5b52a",
      url: "https://journals.lww.com/clinicalpain/toc/2009/09000",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      notes:
        "Block 8B-2: original COMFORTneo source located. PMID not confirmed; complete official table and licensing remain pending.",
      appliesTo: ["comfortneo"],
      priority: 1
    },
    {
      id: "comfortneo_2023_validation",
      title: "COMFORTneo scale: a reliable and valid instrument to measure prolonged pain in neonates?",
      authors: "Meesters NJ, Dilles T, van Rosmalen J, van den Bosch GE, Simons SHP, van Dijk M",
      year: 2023,
      journalOrPublisher: "Journal of Perinatology",
      citation:
        "Meesters NJ, Dilles T, van Rosmalen J, van den Bosch GE, Simons SHP, van Dijk M. COMFORTneo scale: a reliable and valid instrument to measure prolonged pain in neonates? J Perinatol. 2023;43(5):595-600.",
      doi: "10.1038/s41372-023-01628-1",
      url: "https://doi.org/10.1038/s41372-023-01628-1",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      notes: "Reliability/validity source; implementation remains blocked pending official item table and licensing.",
      appliesTo: ["comfortneo"],
      priority: 2
    }
  ],
  fnass_21: [
    {
      id: "phenx_fnast_2019",
      title: "Neonatal Abstinence Syndrome (NAS) and Neonatal Opioid Withdrawal Syndrome (NOWS) — FNAST 2019 Final",
      authors: "PhenX Toolkit",
      year: 2019,
      journalOrPublisher: "PhenX Toolkit",
      doi: "10.82568/phenx_toolkit/300701",
      url: "https://www.phenxtoolkit.org/protocols/view/300701",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes: "PhenX publishes the complete FNAST protocol and states that it is freely available and permission is not required for use.",
      appliesTo: ["fnass_21"],
      priority: 1
    },
    {
      id: "finnegan_1975_original",
      title: "Neonatal abstinence syndrome: assessment and management",
      authors: "Finnegan LP, Connaughton JF Jr, Kron RE, Emich JP",
      year: 1975,
      journalOrPublisher: "Addictive Diseases",
      citation:
        "Finnegan LP, Connaughton JF Jr, Kron RE, Emich JP. Neonatal abstinence syndrome: assessment and management. Addict Dis. 1975;2(1-2):141-158.",
      pmid: "1163358",
      url: "https://pubmed.ncbi.nlm.nih.gov/1163358/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Block 8B-2: original Finnegan source located. Modified variants, long item table, licensing, and therapeutic-threshold wording remain blocked.",
      appliesTo: ["fnass_21"],
      priority: 2
    }
  ],
  wood_downes_ferres: [
    {
      id: "wood_downes_lecks_1972_original",
      title: "A Clinical Scoring System for the Diagnosis of Respiratory Failure",
      authors: "Wood DW, Downes JJ, Lecks HI",
      year: 1972,
      journalOrPublisher: "American Journal of Diseases of Children",
      citation:
        "Wood DW, Downes JJ, Lecks HI. A clinical scoring system for the diagnosis of respiratory failure: preliminary report on childhood status asthmaticus. Am J Dis Child. 1972;123(3):227-228.",
      doi: "10.1001/archpedi.1972.02110090097011",
      url: "https://jamanetwork.com/journals/jamapediatrics/fullarticle/504416",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      notes:
        "Original Wood-Downes source anchor. PedsCore implements the maintainer-selected six-domain Wood-Downes-Ferres bronchiolitis table as descriptive score output only.",
      appliesTo: ["wood_downes_ferres"],
      priority: 1
    },
    {
      id: "wood_downes_ferres_evidencia_2017_table",
      title: "Broncodilatadores en pacientes con bronquiolitis",
      authors: "Crimer N",
      year: 2017,
      journalOrPublisher: "Evidencia, Actualizacion en la Practica Ambulatoria",
      citation:
        "Crimer N. Broncodilatadores en pacientes con bronquiolitis. Evidencia Actualizacion en la Practica Ambulatoria. 2017;20(1). Table 1.",
      url: "https://www.evidencia.org/index.php/Evidencia/article/view/4207/1697",
      evidenceLevel: "secondary_source",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Open-access table used to trace the six-domain Wood-Downes-Ferres bronchiolitis scoring options and non-directive severity bands.",
      appliesTo: ["wood_downes_ferres"],
      priority: 2
    }
  ],
  pediatric_gcs: [
    {
      id: "pediatric_gcs_nice_bookshelf",
      title: "Paediatric version of the Glasgow Coma Scale",
      authors: "National Collaborating Centre for Acute Care",
      year: 2007,
      journalOrPublisher: "NCBI Bookshelf",
      citation:
        "National Collaborating Centre for Acute Care. Head Injury: Triage, Assessment, Investigation and Early Management of Head Injury in Infants, Children and Adults. Paediatric version of the Glasgow Coma Scale.",
      url: "https://www.ncbi.nlm.nih.gov/books/",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "guideline",
      accessType: "open_access",
      notes:
        "Block 8B-2: accepted guideline/source trail identified, but exact pediatric verbal table by age/development and primary adaptation source remain pending.",
      appliesTo: ["pediatric_gcs"],
      priority: 1
    }
  ],
  pews: [
    {
      id: "monaghan_2005_brighton_pews",
      title:
        "Detecting and managing deterioration in children: Critical Care Outreach and Paediatric Early Warning Score",
      authors: "Monaghan A",
      year: 2005,
      journalOrPublisher: "Nursing Children and Young People",
      citation:
        "Monaghan A. Detecting and managing deterioration in children: Critical Care Outreach and Paediatric Early Warning Score. Nursing Children and Young People. 2005;17(1):32-35.",
      doi: "10.7748/paed2005.02.17.1.32.c964",
      url: "https://research.brighton.ac.uk/en/publications/detecting-and-managing-deterioration-in-children-critical-care-ou",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      notes:
        "Block 8B-2: original Brighton/Monaghan PEWS source located. Generic PEWS remains blocked until a specific variant is selected.",
      appliesTo: ["pews", "brighton_pews"],
      priority: 1
    }
  ],
  brighton_pews: [
    {
      id: "monaghan_2005_brighton_pews",
      title:
        "Detecting and managing deterioration in children: Critical Care Outreach and Paediatric Early Warning Score",
      authors: "Monaghan A",
      year: 2005,
      journalOrPublisher: "Nursing Children and Young People",
      citation:
        "Monaghan A. Detecting and managing deterioration in children: Critical Care Outreach and Paediatric Early Warning Score. Nursing Children and Young People. 2005;17(1):32-35.",
      doi: "10.7748/paed2005.02.17.1.32.c964",
      url: "https://research.brighton.ac.uk/en/publications/detecting-and-managing-deterioration-in-children-critical-care-ou",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      notes:
        "Block 8B-2: Brighton PEWS source located. Full table, local escalation separation, and reuse rights remain pending.",
      appliesTo: ["brighton_pews"],
      priority: 1
    }
  ],
  orbegozo_growth_percentiles: [
    {
      id: "orbegozo_2011_official_tables",
      title: "Graficas y tablas de crecimiento",
      authors: "Fundacion Faustino Orbegozo Eizaguirre",
      year: 2011,
      journalOrPublisher: "Fundacion Faustino Orbegozo Eizaguirre",
      citation:
        "Fundacion Faustino Orbegozo Eizaguirre. Graficas y tablas de crecimiento. Publicacion 2011 del estudio transversal.",
      url: "https://www.fundacionorbegozo.com/el-instituto-de-investigacion-del-crecimiento-y-desarrollo/graficas-y-tablas/",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes:
        "Block 8B-2: official tables page located. LMS/data-file availability and license terms remain unclear; do not implement percentiles yet.",
      appliesTo: ["orbegozo_growth_percentiles"],
      priority: 1
    }
  ],
  stamp: [
    {
      id: "stamp_2012_original",
      title:
        "The development and evaluation of the Screening Tool for the Assessment of Malnutrition in Paediatrics (STAMP) for use by healthcare staff",
      authors: "McCarthy H, Dixon M, Crabtree I, Eaton-Evans MJ, McNulty H",
      year: 2012,
      journalOrPublisher: "Journal of Human Nutrition and Dietetics",
      citation:
        "McCarthy H, Dixon M, Crabtree I, Eaton-Evans MJ, McNulty H. The development and evaluation of the Screening Tool for the Assessment of Malnutrition in Paediatrics (STAMP) for use by healthcare staff. J Hum Nutr Diet. 2012;25(4):311-318.",
      doi: "10.1111/j.1365-277X.2012.01234.x",
      pmid: "22568534",
      url: "https://pubmed.ncbi.nlm.nih.gov/22568534/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Block 8B-2: original STAMP source located. The STAMP mark and tool materials require licensing review before implementation.",
      appliesTo: ["stamp"],
      priority: 1
    }
  ],
  strongkids: [
    {
      id: "strongkids_2010_original",
      title: "Dutch national survey to test the STRONGkids nutritional risk screening tool in hospitalized children",
      authors: "Hulst JM, Zwart H, Hop WC, Joosten KFM",
      year: 2010,
      journalOrPublisher: "Clinical Nutrition",
      citation:
        "Hulst JM, Zwart H, Hop WC, Joosten KFM. Dutch national survey to test the STRONGkids nutritional risk screening tool in hospitalized children. Clin Nutr. 2010;29(1):106-111.",
      doi: "10.1016/j.clnu.2009.07.006",
      pmid: "19682776",
      url: "https://pubmed.ncbi.nlm.nih.gov/19682776/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Original STRONGkids source defining the hospitalized-child screening construct and four domains.",
      appliesTo: ["strongkids"],
      priority: 1
    },
    {
      id: "strongkids_open_validation_2014",
      title: "Application of a score system to evaluate the risk of malnutrition in a multiple hospital setting",
      year: 2014,
      journalOrPublisher: "Italian Journal of Pediatrics",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3901031/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open-access validation reproduces the four-domain structure, five-point total, and low/moderate/high risk bands.",
      appliesTo: ["strongkids"],
      priority: 2
    },
    {
      id: "strongkids_open_comparison_2020",
      title: "Screening for Pediatric Malnutrition at Hospital Admission: Which Screening Tool Is Best?",
      year: 2020,
      journalOrPublisher: "Nutrition in Clinical Practice",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7539919/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open-access comparison confirms the original STRONGkids cutoffs: 0 low, 1-3 moderate, 4-5 high risk.",
      appliesTo: ["strongkids"],
      priority: 3
    }
  ],
  pyms: [
    {
      id: "pyms_2010_original",
      title: "A four-stage evaluation of the Paediatric Yorkhill Malnutrition Score in a tertiary paediatric hospital and a district general hospital",
      authors: "Gerasimidis K, Keane O, Macleod I, Flynn DM, Wright CM",
      year: 2010,
      journalOrPublisher: "British Journal of Nutrition",
      citation:
        "Gerasimidis K, Keane O, Macleod I, Flynn DM, Wright CM. A four-stage evaluation of the Paediatric Yorkhill Malnutrition Score in a tertiary paediatric hospital and a district general hospital. Br J Nutr. 2010;104(5):751-756.",
      doi: "10.1017/S0007114510001121",
      pmid: "20398432",
      url: "https://pubmed.ncbi.nlm.nih.gov/20398432/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Block 8B-2: original PYMS evaluation source located. Complete form/table and reuse terms remain pending.",
      appliesTo: ["pyms"],
      priority: 1
    }
  ],
  dubowitz: [
    {
      id: "dubowitz_1970_original",
      title: "Clinical assessment of gestational age in the newborn infant",
      authors: "Dubowitz LM, Dubowitz V, Goldberg C",
      year: 1970,
      journalOrPublisher: "The Journal of Pediatrics",
      citation:
        "Dubowitz LM, Dubowitz V, Goldberg C. Clinical assessment of gestational age in the newborn infant. J Pediatr. 1970;77(1):1-10.",
      doi: "10.1016/S0022-3476(70)80038-5",
      pmid: "5430794",
      url: "https://pubmed.ncbi.nlm.nih.gov/5430794/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Primary derivation source for the 21-item Dubowitz method. PedsCore implements only numeric item entry, total-score summation, and the published regression equation; no original figures, table layout, or descriptive wording are reproduced.",
      appliesTo: ["dubowitz"],
      priority: 1
    }
  ],
  fenton_2025_growth: [
    {
      id: "fenton_2025_third_generation",
      title:
        "Fenton Third-Generation Growth Charts of Preterm Infants Without Abnormal Fetal Growth: A Systematic Review and Meta-Analysis",
      authors: "Fenton TR, Elmrayed S, Alshaikh BN",
      year: 2025,
      journalOrPublisher: "Paediatric and Perinatal Epidemiology",
      citation:
        "Fenton TR, Elmrayed S, Alshaikh BN. Fenton Third-Generation Growth Charts of Preterm Infants Without Abnormal Fetal Growth: A Systematic Review and Meta-Analysis. Paediatr Perinat Epidemiol. 2025;39(6):543-555.",
      doi: "10.1111/ppe.70035",
      pmid: "40534585",
      url: "https://pubmed.ncbi.nlm.nih.gov/40534585/",
      evidenceLevel: "systematic_review",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Primary Fenton third-generation source. The 2025 charts are sex-specific and cover weight, length, and head circumference across preterm/postmenstrual ages, harmonized to WHO at 50 weeks.",
      appliesTo: ["fenton_2025_growth"],
      priority: 1
    },
    {
      id: "fenton_2025_official_plotter",
      title: "Fenton 2025 Growth Plotter",
      authors: "Fenton TR, Fenton PC",
      year: 2026,
      journalOrPublisher: "Fenton Growth / University of Calgary",
      url: "https://fentongrowth.ca/",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes:
        "Author-hosted Fenton 2025 plotter for serial growth data, z-scores, and charts.",
      appliesTo: ["fenton_2025_growth"],
      priority: 2
    },
    {
      id: "peditools_fenton_2025",
      title: "Fenton 2025 Growth Calculator for Preterm Infants",
      authors: "PediTools",
      journalOrPublisher: "PediTools",
      url: "https://www.peditools.org/fenton2025/",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes:
        "External calculator implementing Fenton 2025 and reporting percentiles, Z-scores, and expected weekly growth.",
      appliesTo: ["fenton_2025_growth"],
      priority: 3
    }
  ],
  neonatal_growth_fenton: [
    {
      id: "fenton_kim_2013_open_access",
      title: "A systematic review and meta-analysis to revise the Fenton growth chart for preterm infants",
      authors: "Fenton TR, Kim JH",
      year: 2013,
      journalOrPublisher: "BMC Pediatrics",
      citation:
        "Fenton TR, Kim JH. A systematic review and meta-analysis to revise the Fenton growth chart for preterm infants. BMC Pediatr. 2013;13:59.",
      doi: "10.1186/1471-2431-13-59",
      url: "https://link.springer.com/article/10.1186/1471-2431-13-59",
      evidenceLevel: "systematic_review",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Legacy Fenton 2013 reference retained for historical traceability. PedsCore does not activate local percentile calculation from the 2013 LMS dataset; current operational growth assessment is surfaced separately through Fenton 2025 external tools.",
      appliesTo: ["neonatal_growth_fenton"],
      priority: 1
    }
  ],
  rdai: [
    {
      id: "lowell_1987_rdai_source_trail",
      title: "Wheezing in infants: the response to epinephrine",
      authors: "Lowell DI, Lister G, Von Koss H, McCarthy P",
      year: 1987,
      journalOrPublisher: "The Journal of Pediatrics",
      citation:
        "Lowell DI, Lister G, Von Koss H, McCarthy P. Wheezing in infants: the response to epinephrine. Pediatrics. 1987;79(6):939-945.",
      url: "https://hero.epa.gov/hero/index.cfm/reference/details/reference_id/2748279",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Original source trail for RDAI. Complete six-domain scoring table independently verified against an open-access randomized bronchiolitis trial reproducing the instrument.",
      appliesTo: ["rdai"],
      priority: 1
    },
    {
      id: "rdai_open_table_2005",
      title: "Racemic epinephrine compared to salbutamol in hospitalized young children with bronchiolitis",
      year: 2005,
      journalOrPublisher: "BMC Pediatrics",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1142326/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes: "Open-access Table 1 reproduces the complete RDAI scoring matrix: wheezing 0-8 plus retractions 0-9, total 0-17.",
      appliesTo: ["rdai"],
      priority: 2
    }
  ],
  pass: [
    {
      id: "pass_2004_original",
      title:
        "Performance of a novel clinical score, the Pediatric Asthma Severity Score (PASS), in the evaluation of acute asthma",
      authors: "Gorelick MH, Stevens MW, Schultz TR, Scribano PV",
      year: 2004,
      journalOrPublisher: "Academic Emergency Medicine",
      citation:
        "Gorelick MH, Stevens MW, Schultz TR, Scribano PV. Performance of a novel clinical score, the Pediatric Asthma Severity Score (PASS), in the evaluation of acute asthma. Acad Emerg Med. 2004;11(1):10-18.",
      doi: "10.1197/j.aem.2003.07.015",
      pmid: "14709423",
      url: "https://pubmed.ncbi.nlm.nih.gov/14709423/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Block 8B-3: original PASS source located. Full table and interpretation require source review before implementation.",
      appliesTo: ["pass"],
      priority: 1
    }
  ],
  brosjod: [
    {
      id: "brosjod_2017_validation",
      title: "Bronchiolitis Score of Sant Joan de Deu: BROSJOD Score, validation and usefulness",
      authors: "Balaguer M, Alejandre C, Vila D, Esteban E, Carrasco JL, Cambra FJ, Jordan I",
      year: 2017,
      journalOrPublisher: "Pediatric Pulmonology",
      citation:
        "Balaguer M, Alejandre C, Vila D, Esteban E, Carrasco JL, Cambra FJ, Jordan I. Bronchiolitis Score of Sant Joan de Deu: BROSJOD Score, validation and usefulness. Pediatr Pulmonol. 2017;52(4):533-539.",
      doi: "10.1002/ppul.23546",
      pmid: "28328090",
      url: "https://pubmed.ncbi.nlm.nih.gov/28328090/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Block 8B-3: BROSJOD validation source located. Original/full table and reuse permissions remain pending before implementation.",
      appliesTo: ["brosjod"],
      priority: 1
    }
  ],
  gorelick_dehydration: [
    {
      id: "gorelick_1997_dehydration_original",
      title: "Validity and reliability of clinical signs in the diagnosis of dehydration in children",
      authors: "Gorelick MH, Shaw KN, Murphy KO",
      year: 1997,
      journalOrPublisher: "Pediatrics",
      citation:
        "Gorelick MH, Shaw KN, Murphy KO. Validity and reliability of clinical signs in the diagnosis of dehydration in children. Pediatrics. 1997;99(5):E6.",
      doi: "10.1542/peds.99.5.e6",
      pmid: "9113963",
      url: "https://pubmed.ncbi.nlm.nih.gov/9113963/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Original Gorelick source plus open-access reproductions used to verify the complete 10-sign scale and ≥3 / ≥7 sign thresholds.",
      appliesTo: ["gorelick_dehydration"],
      priority: 1
    }
  ],
  catch_tbi: [
    {
      id: "catch_2010_original",
      title: "CATCH: a clinical decision rule for the use of computed tomography in children with minor head injury",
      authors:
        "Osmond MH, Klassen TP, Wells GA, Correll R, Jarvis A, Joubert G, Bailey B, Chauvin-Kimoff L, Pusic M, McConnell D, Nijssen-Jordan C, Silver N, Taylor B, Stiell IG",
      year: 2010,
      journalOrPublisher: "CMAJ",
      citation:
        "Osmond MH, Klassen TP, Wells GA, et al. CATCH: a clinical decision rule for the use of computed tomography in children with minor head injury. CMAJ. 2010;182(4):341-348.",
      doi: "10.1503/cmaj.091421",
      pmid: "20142371",
      url: "https://pubmed.ncbi.nlm.nih.gov/20142371/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Block 8B-3: original CATCH source located with open PMC article. Future implementation must classify predictors only and avoid CT-management recommendations.",
      appliesTo: ["catch_tbi"],
      priority: 1
    }
  ],
  chalice_tbi: [
    {
      id: "chalice_2006_original",
      title:
        "Derivation of the children's head injury algorithm for the prediction of important clinical events decision rule for head injury in children",
      authors:
        "Dunning J, Daly JP, Lomas JP, Lecky F, Batchelor J, Mackway-Jones K",
      year: 2006,
      journalOrPublisher: "Archives of Disease in Childhood",
      citation:
        "Dunning J, Daly JP, Lomas JP, Lecky F, Batchelor J, Mackway-Jones K. Derivation of the children's head injury algorithm for the prediction of important clinical events decision rule for head injury in children. Arch Dis Child. 2006;91(11):885-891.",
      doi: "10.1136/adc.2005.083980",
      pmid: "17056862",
      url: "https://pubmed.ncbi.nlm.nih.gov/17056862/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Block 8B-3: original CHALICE source located with open PMC article. Future implementation must classify criteria only and avoid CT-management recommendations.",
      appliesTo: ["chalice_tbi"],
      priority: 1
    }
  ],
  revised_schwartz: [
    {
      id: "schwartz_2009_ckid_equations",
      title: "New equations to estimate GFR in children with CKD",
      authors: "Schwartz GJ, Munoz A, Schneider MF, Mak RH, Kaskel F, Warady BA, Furth SL",
      year: 2009,
      journalOrPublisher: "Journal of the American Society of Nephrology",
      citation:
        "Schwartz GJ, Munoz A, Schneider MF, Mak RH, Kaskel F, Warady BA, Furth SL. New equations to estimate GFR in children with CKD. J Am Soc Nephrol. 2009;20(3):629-637.",
      doi: "10.1681/ASN.2008030287",
      pmid: "19158356",
      url: "https://pubmed.ncbi.nlm.nih.gov/19158356/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Block 8B-3: CKiD equation source located. Exact PedsCore variant must be selected separately from the already implemented bedside Schwartz equation.",
      appliesTo: ["revised_schwartz"],
      priority: 1
    }
  ],
rflacc: [
    {
      id: "rflacc_2006_validation",
      title: "The revised FLACC observational pain tool: improved reliability and validity for pain assessment in children with cognitive impairment",
      authors: "Malviya S, Voepel-Lewis T, Burke C, Merkel S, Tait AR",
      year: 2006,
      journalOrPublisher: "Paediatric Anaesthesia",
      citation:
        "Malviya S, Voepel-Lewis T, Burke C, Merkel S, Tait AR. The revised FLACC observational pain tool: improved reliability and validity for pain assessment in children with cognitive impairment. Paediatr Anaesth. 2006;16(3):258-265.",
      doi: "10.1111/j.1460-9592.2005.01773.x",
      pmid: "16490089",
      url: "https://pubmed.ncbi.nlm.nih.gov/16490089/",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Block 8B-3: rFLACC validation source located. Complete revised descriptors and reuse/license review remain pending.",
      appliesTo: ["rflacc"],
      priority: 1
    }
  ],
  cheops: [
    {
      id: "cheops_1985_original",
      title: "CHEOPS: A behavioral scale for rating postoperative pain in children",
      authors: "McGrath PJ, Johnson G, Goodman JT, Schillinger J, Dunn J, Chapman J",
      year: 1985,
      journalOrPublisher: "Advances in Pain Research and Therapy",
      citation:
        "McGrath PJ, Johnson G, Goodman JT, Schillinger J, Dunn J, Chapman J. CHEOPS: A behavioral scale for rating postoperative pain in children. In: Fields HL, Dubner R, Cervero F, editors. Advances in Pain Research and Therapy. 1985;9:395-402.",
      evidenceLevel: "original_derivation_study",
      sourceType: "textbook",
      accessType: "unknown",
      notes:
        "Block 8B-3: original CHEOPS citation trail located but no DOI/PMID for the 1985 chapter confirmed. Complete table and permissions remain pending.",
      appliesTo: ["cheops"],
      priority: 1
    }
  ]
};

const licensingBlockedToolIds = new Set([
  "pipp",
  "brighton_pews",
  "orbegozo_growth_percentiles",
  "stamp",
  "pyms",
  "flacc",
  "rflacc",
  "cheops",
  "pediatric_cpr",
  "neonatal_cpr",
  "pediatric_bradycardia",
  "pediatric_tachycardia",
  "shockable_rhythm_algorithm",
  "non_shockable_rhythm_algorithm"
]);

const pendingCalculationNotes: LocalizedText = {
  es: "Formulario preparado para revision. El calculo automatico permanece inactivo hasta completar trazabilidad, fuente primaria y tests clinicos.",
  en: "Form prepared for review. Automatic calculation remains inactive until traceability, primary source, and clinical tests are complete."
};

const woodDownesValidationNotes: LocalizedText = {
  es: "Bloque BRONCHIOLITIS-IMPLEMENTATION-1: decision maintainer aplicada para la variante Wood-Downes-Ferres clasica de 6 dominios. Salida descriptiva, informativa y trazable; no define conducta clinica ni sustituye protocolos locales.",
  en: "Block BRONCHIOLITIS-IMPLEMENTATION-1: maintainer decision applied for the classic six-domain Wood-Downes-Ferres variant. Output is descriptive, informational, and traceable; it does not define clinical conduct or replace local protocols."
};

const ballardValidationNotes: LocalizedText = {
  es: "Implementacion numerica independiente del New Ballard Score. PedsCore no reproduce ilustraciones, dibujos ni descriptores protegidos del formulario original: el usuario consulta una referencia visual externa autorizada e introduce las puntuaciones numericas. La conversion a edad gestacional usa la tabla oficial y la regla de semanas completas descrita por Ballard. Si MSD autorizara en el futuro la reproduccion de su lamina, podria integrarse sin cambiar la logica del calculo.",
  en: "Independent numeric implementation of the New Ballard Score. PedsCore does not reproduce protected illustrations, drawings, or descriptive wording from the original form: users consult an authorized external visual reference and enter the numerical scores. Gestational-age conversion follows the official score grid and Ballard's completed-week rule. If MSD later authorizes reproduction of its sheet, it could be integrated without changing the calculation logic."
};

const sarnatValidationNotes: LocalizedText = {
  es: "Sarnat clasico 1976 publicado como marco descriptivo de estadificacion I-II-III. No se convierte artificialmente en un score numerico y no genera indicaciones de hipotermia ni tratamiento. La herramienta Modified Sarnat / NICHD se publica por separado para evitar mezclar variantes.",
  en: "Classic 1976 Sarnat is published as a descriptive Stage I-II-III staging framework. It is not artificially converted into a numeric score and does not generate hypothermia or treatment recommendations. Modified Sarnat / NICHD is published separately to avoid mixing variants."
};

const modifiedSarnatValidationNotes: LocalizedText = {
  es: "Implementacion independiente de la exploracion Modified Sarnat / NICHD de seis categorias. Cada categoria se codifica 0 normal, 1 leve, 2 moderada o 3 grave; PedsCore calcula Total Sarnat Score 0-18 y describe el patron predominante. No determina elegibilidad para hipotermia ni sustituye un protocolo neonatal local.",
  en: "Independent implementation of the six-category Modified Sarnat / NICHD examination. Each category is coded 0 normal, 1 mild, 2 moderate, or 3 severe; PedsCore calculates the 0-18 Total Sarnat Score and describes the predominant pattern. It does not determine therapeutic-hypothermia eligibility or replace a local neonatal protocol."
};

const thompsonHieEvidenceValidationNotes: LocalizedText = {
  es: "Implementacion independiente del Thompson HIE Score de nueve dominios, con total 0-22. PedsCore usa como interpretacion secundaria la convencion resumida por la AAP: 0 sin anormalidades puntuadas, 1-10 leve, 11-14 moderada y 15-22 grave. Algunas publicaciones separan 0-7 como sin encefalopatia y 8-10 como leve; esta variabilidad se muestra explicitamente. El score es descriptivo y longitudinal y no determina por si solo indicacion de hipotermia, tratamiento ni pronostico individual.",
  en: "Independent implementation of the nine-domain Thompson HIE Score, total 0-22. PedsCore uses the AAP-summarized convention as a secondary interpretation: 0 no scored abnormalities, 1-10 mild, 11-14 moderate, and 15-22 severe. Some publications instead separate 0-7 as no encephalopathy and 8-10 as mild; this variability is explicitly disclosed. The score is descriptive and longitudinal and does not by itself determine hypothermia eligibility, treatment, or individual prognosis."
};

const aap2022HyperbilirubinemiaValidationNotes: LocalizedText = {
  es: "Herramienta activa basada en la guia AAP 2022 para recien nacidos de 35 o mas semanas. PedsCore no reproduce localmente las curvas ni las tablas de umbrales de la AAP: recoge los parametros clinicos y deriva el calculo operativo a la API gratuita de PediTools, que implementa la guia. La edad gestacional se introduce en semanas completas (35-40+), la edad postnatal en horas (1-336) y la bilirrubina como TSB en mg/dL. Los factores de neurotoxicidad adicionales a la edad gestacional incluyen albumina <3 g/dL, enfermedad hemolitica isoimmune/G6PD u otra hemolisis, sepsis o inestabilidad clinica significativa en las ultimas 24 h. No restar bilirrubina directa/conjugada de la TSB.",
  en: "Active tool based on the 2022 AAP guideline for newborn infants 35 or more weeks of gestation. PedsCore does not locally reproduce the AAP threshold curves or tables: it collects the clinical parameters and delegates operational threshold calculation to the free PediTools API implementing the guideline. Gestational age is entered in completed weeks (35-40+), postnatal age in hours (1-336), and bilirubin as TSB in mg/dL. Neurotoxicity risk factors in addition to gestational age include albumin <3 g/dL, isoimmune hemolytic disease/G6PD deficiency or other hemolysis, sepsis, or significant clinical instability in the previous 24 h. Do not subtract direct/conjugated bilirubin from TSB."
};

const bhutaniValidationNotes: LocalizedText = {
  es: "Bloque 8B-1: fuente primaria Bhutani 1999 localizada con DOI/PMID. Pendiente disponer de valores/curvas hora-especificas reutilizables, contexto de guias actuales, licencia y casos de test antes de implementar nomograma.",
  en: "Block 8B-1: Bhutani 1999 primary source located with DOI/PMID. Reusable hour-specific values/curves, current guideline context, licensing, and test cases remain pending before nomogram implementation."
};

const bedsidePewsValidationNotes: LocalizedText = {
  es: "Implementacion local del Bedside PEWS original de siete items (0-26), trazada a Parshuram et al. 2009 y a la validacion multicentrica de 2011. El articulo original y su tabla se publicaron bajo licencia Creative Commons Attribution 2.0 (CC BY 2.0); PedsCore reutiliza la logica con atribucion explicita. El resultado cuantifica gravedad/deterioro en ninos hospitalizados y no incorpora un protocolo universal de escalado, ingreso en UCI ni tratamiento. En el estudio original, un punto de corte 8 tuvo sensibilidad 82% y especificidad 93%; ese dato se muestra como rendimiento del estudio, no como orden de actuacion.",
  en: "Local implementation of the original seven-item Bedside PEWS (0-26), traced to Parshuram et al. 2009 and the 2011 multicentre validation. The original article and scoring table were published under Creative Commons Attribution 2.0 (CC BY 2.0); PedsCore reuses the scoring logic with explicit attribution. The result quantifies severity/deterioration in hospitalized children and does not embed a universal escalation, ICU-admission, or treatment protocol. In the original study, a score of 8 had 82% sensitivity and 93% specificity; this is displayed as study performance, not as an action threshold."
};

const whoGrowthValidationNotes: LocalizedText = {
  es: "Motor OMS completo para el alcance antropometrico oficial implementado: estandares 0-5 y referencia 2007 con peso/edad 5-10, talla/edad 5-19 e IMC/edad 5-19. Usa registros OMS por dia o por mes cumplido segun la tabla; datos bajo licencia separada.",
  en: "Complete WHO engine for the implemented official anthropometric scope: 0-5 standards plus the 2007 reference with weight-for-age 5-10, height-for-age 5-19 and BMI-for-age 5-19. It uses WHO daily or completed-month records as defined by each table; data remain under a separate license."
};

const whoGrowthModuleValidationNotes: LocalizedText = {
  es: "Motor WHO Growth central implementado con los indicadores antropometricos oficiales del alcance: OMS 0-5 peso/edad, longitud-talla/edad, peso/longitud, peso/talla, IMC/edad y perimetro cefalico/edad; referencia OMS 2007 peso/edad 5-10, talla/edad 5-19 e IMC/edad 5-19. Peso/edad no se extrapola por encima de 10 anos. Datos OMS con licencia separada; salida descriptiva sin diagnosticos ni recomendaciones nutricionales.",
  en: "Central WHO Growth engine implemented for the official anthropometric scope: WHO 0-5 weight-for-age, length/height-for-age, weight-for-length, weight-for-height, BMI-for-age and head circumference-for-age; WHO 2007 weight-for-age 5-10, height-for-age 5-19 and BMI-for-age 5-19. Weight-for-age is not extrapolated beyond 10 years. WHO data use a separate license; output is descriptive without diagnoses or nutritional recommendations."
};

const bmiPercentileValidationNotes: LocalizedText = {
  es: "Sprint 2B: IMC percentilado es un preset del motor WHO Growth, no una calculadora separada. Usa BMI-for-age OMS 0-5 y 5-19 cuando edad, sexo, peso y longitud/talla estan dentro de rango. CDC queda diferido.",
  en: "Sprint 2B: BMI Percentile is a preset of the WHO Growth engine, not a separate calculator. It uses WHO BMI-for-age 0-5 and 5-19 when age, sex, weight and length/height are in range. CDC remains deferred."
};

const headCircumferencePercentileValidationNotes: LocalizedText = {
  es: "Sprint 2B: Percentil de perimetro cefalico es un preset del motor WHO Growth, no una calculadora separada. Usa perimetro cefalico/edad OMS 0-5; fuera de ese rango se muestra como no aplicable.",
  en: "Sprint 2B: Head Circumference Percentile is a preset of the WHO Growth engine, not a separate calculator. It uses WHO head circumference-for-age 0-5; outside that range it is shown as not applicable."
};

const cdcGrowthValidationNotes: LocalizedText = {
  es: "Implementación local activa de CDC Growth Charts para 2-20 años: peso/edad, talla/edad e IMC/edad con parámetros LMS oficiales CDC 2000. La edad exacta puede interpolarse linealmente entre puntos LMS oficiales, como permite CDC. Para IMC por encima del P95 se aplica el método CDC Extended BMI 2022 con la distribución half-normal y sigma suavizada por edad/sexo. CDC recomienda OMS por debajo de 2 años.",
  en: "Active local implementation of CDC Growth Charts for ages 2-20 years: weight-for-age, stature-for-age, and BMI-for-age using official CDC 2000 LMS parameters. Exact age may be linearly interpolated between official LMS points, as allowed by CDC. Above the BMI 95th percentile, the 2022 CDC Extended BMI half-normal method with age/sex-smoothed sigma is used. CDC recommends WHO charts under age 2."
};

const pediatricGcsValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: existe fuente guia para GCS pediatrico, pero falta fuente primaria/adaptacion exacta y tabla verbal pediatrica completa por edad/desarrollo. No activar calculo hasta seleccionar variante.",
  en: "Block 8B-2: a guideline source for pediatric GCS is available, but the primary/adaptation source and complete pediatric verbal table by age/development remain pending. Calculation is not activated until variant selection is complete."
};

const criesValidationNotes: LocalizedText = {
  es: "Implementacion independiente de CRIES para dolor neonatal, especialmente postoperatorio. Cinco dominios puntuan 0-2 y suman 0-10. PedsCore usa redaccion propia y no reproduce la tabla ni los descriptores textuales originales. Como interpretacion secundaria muestra <5 por debajo del umbral de dolor moderado, 5-7 dolor moderado y 8-10 dolor grave, de acuerdo con guias que describen dolor moderado >4 y grave >7. Los umbrales de intervencion deben seguir el protocolo local.",
  en: "Independent CRIES implementation for neonatal pain, especially postoperative pain. Five domains score 0-2 for a 0-10 total. PedsCore uses independently worded criteria and does not reproduce the original table or verbatim descriptors. As a secondary interpretation it shows <5 below the moderate-pain threshold, 5-7 moderate pain, and 8-10 severe pain, consistent with guidance describing moderate pain >4 and severe pain >7. Intervention thresholds should follow local protocol."
};

const cheopsValidationNotes: LocalizedText = {
  es: "Pendiente de validacion: la documentacion local identifica variables, rango 4-13 y umbral general, pero no define puntuacion exacta por opcion, tabla completa ni fuente primaria completa. No se activa calculo CHEOPS.",
  en: "Pending validation: local documentation identifies variables, 4-13 range, and a general threshold, but does not define exact score per option, complete scoring table, or complete primary source. CHEOPS calculation is not activated."
};

const visualAnalogueScaleValidationNotes: LocalizedText = {
  es: "Implementación local activa de EVA/VAS como línea continua de 100 mm para autorreporte de intensidad de dolor. En pediatría se orienta a mayores de 8 años y adolescentes capaces de comprender la escala. El resultado es la distancia marcada desde el extremo sin dolor; no se aplican bandas universales de gravedad.",
  en: "Active local VAS implementation as a continuous 100-mm line for self-reported pain intensity. In pediatrics it is intended mainly for children older than 8 years and adolescents able to understand the scale. The result is the marked distance from the no-pain anchor; no universal severity bands are applied."
};

const dubowitzValidationNotes: LocalizedText = {
  es: "Implementacion independiente del metodo Dubowitz original: PedsCore solicita solo las puntuaciones numericas de los 21 signos, suma el total y aplica la ecuacion de regresion publicada para estimar edad gestacional. No reproduce figuras, dibujos, tabla, maquetacion ni descriptores textuales del articulo original. Resultado descriptivo, no sustituye datacion obstetrica ni juicio clinico.",
  en: "Independent implementation of the original Dubowitz method: PedsCore accepts only the numerical scores for the 21 signs, sums the total, and applies the published regression equation to estimate gestational age. It does not reproduce figures, drawings, the original table/layout, or copyrighted descriptive text. Descriptive result only; it does not replace obstetric dating or clinical judgment."
};

const fentonValidationNotes: LocalizedText = {
  es: "Referencia legacy de Fenton 2013. PedsCore no activa un calculo local con los parametros LMS de 2013. La herramienta operativa actual se publica por separado como Fenton 2025 y deriva el calculo a herramientas externas autorales/PediTools.",
  en: "Legacy Fenton 2013 reference. PedsCore does not activate local calculation from the 2013 LMS parameters. The current operational tool is published separately as Fenton 2025 and delegates calculation to author-hosted/PediTools external tools."
};

const fenton2025ValidationNotes: LocalizedText = {
  es: "Herramienta activa de referencia externa basada en las curvas Fenton de tercera generacion publicadas en 2025. PedsCore no redistribuye ni recalcula localmente los datos de las curvas: enlaza al calculador Fenton 2025 de PediTools y al plotter oficial de Fenton Growth. Permite valorar peso, longitud y perimetro cefalico en prematuros mediante percentiles y z-scores segun sexo y edad gestacional/postmenstrual. Para asignar tamano para edad gestacional, la publicacion indica consistencia de las curvas hasta 37 semanas; el seguimiento de crecimiento se extiende hasta 50 semanas, donde se armoniza con WHO.",
  en: "Active external-reference tool based on the third-generation Fenton charts published in 2025. PedsCore does not redistribute or locally recalculate the chart data: it links to the PediTools Fenton 2025 calculator and the official Fenton Growth plotter. Weight, length, and head circumference can be assessed by percentile and Z-score according to sex and gestational/postmenstrual age. For size-for-gestational-age assignment, the publication reports curve consistency through 37 weeks; growth monitoring extends to 50 weeks, where the charts are harmonized with WHO."
};

const rdaiValidationNotes: LocalizedText = {
  es: "RDAI clásico verificado con fuente original y tabla completa reproducida en literatura open-access; implementación local descriptiva 0-17 sin bandas terapéuticas.",
  en: "Classic RDAI verified against the original source trail and a complete table reproduced in open-access literature; descriptive local 0-17 implementation without treatment bands."
};

const passValidationNotes: LocalizedText = {
  es: "Sprint 2A: fuente PASS original localizada con DOI/PMID, pero la tabla completa, interpretacion y reutilizacion no estan suficientemente verificadas. No se implementa ni se activa calculo.",
  en: "Sprint 2A: original PASS source located with DOI/PMID, but the complete table, interpretation, and reuse status are not sufficiently verified. It is not implemented and calculation is not activated."
};

const pramQaValidationNotes: LocalizedText = {
  es: "Batch 0B1: definicion PRAM verificada frente al estudio original, la validacion pediatrica de 2 a 17 anos, validacion externa y material operativo. Exige SpO2 estable en aire ambiente durante al menos 1 minuto; salida descriptiva sin instrucciones de manejo ni decisiones de disposicion.",
  en: "Batch 0B1: PRAM definition verified against the original study, pediatric validation from ages 2 to 17, external validation, and operational material. It requires stable room-air SpO2 for at least 1 minute; output is descriptive without management or disposition instructions."
};

const westleyQaValidationNotes: LocalizedText = {
  es: "Sprint 2A QA: Westley Croup permanece implementado como score descriptivo de gravedad. Fuente primaria enlazada; cortes revisados como 0-2, 3-7, 8-11 y 12-17 sin instrucciones de manejo.",
  en: "Sprint 2A QA: Westley Croup remains implemented as a descriptive severity score. Primary source is linked; bands reviewed as 0-2, 3-7, 8-11, and 12-17 without management instructions."
};

const nipsQaValidationNotes: LocalizedText = {
  es: "Sprint 2A QA: NIPS permanece implementado como escala descriptiva neonatal. Fuente primaria enlazada; rango 0-7 y umbral descriptivo >3, sin instrucciones de manejo.",
  en: "Sprint 2A QA: NIPS remains implemented as a descriptive neonatal scale. Primary source is linked; 0-7 range and descriptive >3 threshold, without management instructions."
};

const brosjodValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: fuente de validacion BROSJOD localizada con DOI/PMID. Pendiente fuente/tabla original completa y permisos antes de implementar.",
  en: "Block 8B-3: BROSJOD validation source located with DOI/PMID. Original/full table source and permissions remain pending before implementation."
};

const gorelickValidationNotes: LocalizedText = {
  es: "Sprint 1: fuente Gorelick dehydration localizada con DOI/PMID, pero la tabla completa y la eleccion 4 frente a 10 items no quedan suficientemente trazadas desde una fuente reutilizable. No se implementa; queda bloqueada por seleccion de variante y tabla.",
  en: "Sprint 1: Gorelick dehydration source located with DOI/PMID, but the complete table and 4-item versus 10-item choice are not sufficiently traced from a reusable source. It is not implemented; it remains blocked by variant selection and table review."
};

const revisedSchwartzReadyNotes: LocalizedText = {
  es: "Sprint 1: variante CKiD 2009 multivariable seleccionada y trazada desde Schwartz et al. 2009. Calcula eGFR estimado con talla, creatinina, cistatina C, BUN y sexo; salida descriptiva sin recomendaciones terapeuticas.",
  en: "Sprint 1: 2009 multivariable CKiD variant selected and traced to Schwartz et al. 2009. Calculates estimated GFR using height, creatinine, cystatin C, BUN, and sex; descriptive output only without therapeutic recommendations."
};

const pediatricAppendicitisScoreValidationNotes: LocalizedText = {
  es: "Fuente primaria de Samuel 2002 trazada para los 8 items y puntuacion 0-10. PedsCore muestra puntuacion y categorias educativas de riesgo; no hay validacion local, no confirma ni descarta apendicitis y no recomienda imagen, cirugia ni tratamiento.",
  en: "Samuel 2002 primary source traced for the 8 items and 0-10 score. PedsCore shows score and educational risk categories; there is no local validation, it does not confirm or exclude appendicitis, and it does not recommend imaging, surgery, or treatment."
};

const catchValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: CATCH localizada con DOI/PMID/PMCID y regla publicada. Lista para implementacion tecnica como clasificacion informativa, sin recomendacion de TC ni manejo.",
  en: "Block 8B-3: CATCH located with DOI/PMID/PMCID and published rule. Ready for technical implementation as informational classification only, without CT or management recommendations."
};

const chaliceValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: CHALICE localizada con DOI/PMID/PMCID y regla publicada. Lista para implementacion tecnica como clasificacion informativa, sin recomendacion de TC ni manejo.",
  en: "Block 8B-3: CHALICE located with DOI/PMID/PMCID and published rule. Ready for technical implementation as informational classification only, without CT or management recommendations."
};

const prifleValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: fuente pRIFLE original localizada con DOI/PMID. Pendiente tabla/criterios completos, eCCl basal, diuresis, unidades y revision experta.",
  en: "Block 8B-3: original pRIFLE source located with DOI/PMID. Complete criteria, baseline eCCl, urine output, units, and expert review remain pending."
};

const rflaccValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: validacion rFLACC localizada con DOI/PMID. Pendiente descriptores revisados completos, personalizacion por familia y revision de reutilizacion/licencia.",
  en: "Block 8B-3: rFLACC validation located with DOI/PMID. Complete revised descriptors, family customization handling, and reuse/licensing review remain pending."
};

const pippValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: fuentes PIPP y PIPP-R localizadas. Siguen pendientes tabla completa, ajuste por edad gestacional, interpretacion, permisos de reutilizacion y separacion clara de variantes antes de activar calculo.",
  en: "Block 8B-2: PIPP and PIPP-R sources located. Complete table, gestational-age adjustment, interpretation, reuse permissions, and clear variant separation remain pending before calculation."
};

const comfortneoValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: fuentes COMFORTneo 2009 y validacion 2023 localizadas. Requiere tabla oficial completa, manejo ventilado/no ventilado, interpretacion, licencia y revision experta antes de activar calculo.",
  en: "Block 8B-2: COMFORTneo 2009 and 2023 validation sources located. Complete official table, ventilated/non-ventilated handling, interpretation, licensing, and expert review remain pending before calculation."
};

const brightonPewsValidationNotes: LocalizedText = {
  es: "Bloque PEWS-IMPLEMENTATION-1: Brighton PEWS queda seleccionada como variante candidata, pero no se implementa porque la tabla completa no esta disponible en una fuente trazable y reutilizable; las tablas accesibles son mirrors/calculadoras o versiones modificadas.",
  en: "Block PEWS-IMPLEMENTATION-1: Brighton PEWS is selected as the candidate variant, but it is not implemented because the complete table is not available from a traceable reusable source; accessible tables are mirrors/calculators or modified versions."
};

const orbegozoGrowthValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: pagina oficial de tablas Orbegozo localizada. Pendiente confirmar licencia, disponibilidad de datos/LMS reutilizables, version exacta y tests; no activar percentiles.",
  en: "Block 8B-2: official Orbegozo tables page located. Licensing, reusable data/LMS availability, exact version, and tests remain pending; percentiles are not activated."
};

const stampValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: fuente primaria STAMP localizada con DOI/PMID. STAMP parece sensible a marca/copyright; pendiente tabla completa, permiso/reutilizacion e interpretacion antes de implementar.",
  en: "Block 8B-2: STAMP primary source located with DOI/PMID. STAMP appears trademark/copyright sensitive; complete table, permission/reuse terms, and interpretation remain pending before implementation."
};

const strongkidsValidationNotes: LocalizedText = {
  es: "Implementación local independiente de STRONGkids para cribado de riesgo nutricional en niños hospitalizados. Usa redacción propia de los cuatro dominios publicados y la ponderación 1+2+1+1, con categorías 0 bajo, 1-3 moderado y 4-5 alto. No reproduce el formulario original ni genera recomendaciones terapéuticas.",
  en: "Independent local STRONGkids implementation for nutritional-risk screening in hospitalized children. It uses independently worded versions of the four published domains and the 1+2+1+1 weighting, with 0 low, 1-3 moderate, and 4-5 high risk. It does not reproduce the original form or generate treatment recommendations."
};

const pymsValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: fuente PYMS localizada con DOI/PMID. Pendiente formulario/tabla completa, condiciones de reutilizacion, interpretacion y tests antes de implementar.",
  en: "Block 8B-2: PYMS source located with DOI/PMID. Complete form/table, reuse terms, interpretation, and tests remain pending before implementation."
};

const pediatricBurnTbsaValidationNotes: LocalizedText = {
  es: "Sprint 3A: estimador descriptivo TBSA pediatrico con tabla numerica Lund-Browder modificada de Vanderbilt como fuente primaria. No copia diagramas ni formularios; no genera decisiones asistenciales.",
  en: "Sprint 3A: descriptive pediatric TBSA estimator using the Vanderbilt modified Lund-Browder numeric table as the primary source. It does not copy diagrams or forms; it does not generate care decisions."
};

const sipaValidationNotes: LocalizedText = {
  es: "Definicion verificada frente al estudio original y una validacion prospectiva multicentrica: FC/PAS al ingreso en urgencias; >1,22 (4-6 anos), >1,0 (7-12 anos) y >0,9 (13-16 anos). Es un marcador pronostico en trauma pediatrico, no un diagnostico de shock ni una indicacion de tratamiento.",
  en: "Definition verified against the original study and a prospective multicenter validation: ED admission HR/SBP; >1.22 (ages 4-6), >1.0 (ages 7-12), and >0.9 (ages 13-16). It is a prognostic marker in pediatric trauma, not a diagnosis of shock or a treatment indication."
};

const option = (
  id: string,
  es: string,
  en: string,
  score?: number,
  description?: LocalizedText
) => ({
  id,
  label: { es, en },
  ...(score !== undefined ? { score, value: score } : {}),
  ...(description ? { description } : {})
});

const scoreOptions = (prefix: string) => [
  option(`${prefix}_0`, "0 puntos", "0 points", 0),
  option(`${prefix}_1`, "1 punto", "1 point", 1),
  option(`${prefix}_2`, "2 puntos", "2 points", 2)
];

const booleanOptions = [
  option("no", "No", "No", undefined, {
    es: "Criterio ausente",
    en: "Criterion absent"
  }),
  option("yes", "Si", "Yes", undefined, {
    es: "Criterio presente",
    en: "Criterion present"
  })
];

const booleanInput = (id: string, label: LocalizedText) => ({
  id,
  label,
  type: "boolean" as const,
  required: true,
  options: booleanOptions
});

const burnFractionOptions = [
  option("0", "0%", "0%", 0),
  option("0_25", "25%", "25%", 0.25),
  option("0_5", "50%", "50%", 0.5),
  option("0_75", "75%", "75%", 0.75),
  option("1", "100%", "100%", 1)
];

const burnFractionInput = (regionId: string, label: LocalizedText) => ({
  id: `burn_fraction_${regionId}`,
  label,
  description: {
    es: "Fraccion de esta region con quemadura de espesor parcial o total. Deja 0 si no esta afectada.",
    en: "Fraction of this region with partial-thickness or full-thickness burn. Leave 0 if unaffected."
  },
  type: "select" as const,
  required: false,
  options: burnFractionOptions
});

const clinicalToolFormMetadata: Record<string, Partial<ClinicalToolMetadata>> = {
  fnass_21: {
    validationNotes: {
      es: "FNAST/Finnegan de 21 síntomas según protocolo PhenX 2019, publicado íntegramente y declarado de libre disponibilidad sin permiso requerido para su uso. La salida es descriptiva y no activa tratamiento.",
      en: "21-symptom FNAST/Finnegan using the 2019 PhenX protocol, published in full and stated to be freely available with no permission required for use. Output is descriptive and does not trigger treatment."
    },
    calculationNotes: {
      es: "Suma la opción seleccionada de cada uno de los 21 síntomas. El formulario agrupa como una sola variable las alternativas mutuamente excluyentes de gravedad publicadas.",
      en: "Sums the selected option for each of the 21 symptoms. The form groups mutually exclusive published severity alternatives into one variable."
    },
    inputs: [
      {id:"crying",label:{es:"Llanto",en:"Crying"},type:"single_choice",required:true,options:[option("none","No","None",0),option("excessive","Agudo excesivo","Excessive high-pitched",2),option("continuous","Agudo continuo","Continuous high-pitched",3)]},
      {id:"sleep_after_feeding",label:{es:"Sueño tras la toma",en:"Sleep after feeding"},type:"single_choice",required:true,options:[option("normal","≥3 h / sin alteración","≥3 h / no disturbance",0),option("lt3","<3 h","<3 h",1),option("lt2","<2 h","<2 h",2),option("lt1","<1 h","<1 h",3)]},
      {id:"moro_reflex",label:{es:"Reflejo de Moro",en:"Moro reflex"},type:"single_choice",required:true,options:[option("normal","Normal","Normal",0),option("hyperactive","Hiperactivo","Hyperactive",2),option("marked","Marcadamente hiperactivo","Markedly hyperactive",3)]},
      {id:"tremors_disturbed",label:{es:"Temblores con estímulo",en:"Tremors when disturbed"},type:"single_choice",required:true,options:[option("none","No","None",0),option("mild","Leves","Mild",1),option("moderate_severe","Moderados-graves","Moderate-severe",2)]},
      {id:"tremors_undisturbed",label:{es:"Temblores sin estímulo",en:"Tremors undisturbed"},type:"single_choice",required:true,options:[option("none","No","None",0),option("mild","Leves","Mild",3),option("moderate_severe","Moderados-graves","Moderate-severe",4)]},
      {id:"muscle_tone",label:{es:"Aumento del tono muscular",en:"Increased muscle tone"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",2)]},
      {id:"excoriation",label:{es:"Excoriación",en:"Excoriation"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",1)]},
      {id:"myoclonic_jerks",label:{es:"Mioclonías",en:"Myoclonic jerks"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",3)]},
      {id:"generalized_convulsions",label:{es:"Convulsiones generalizadas",en:"Generalized convulsions"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",5)]},
      {id:"sweating",label:{es:"Sudoración",en:"Sweating"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",1)]},
      {id:"temperature",label:{es:"Temperatura",en:"Temperature"},type:"single_choice",required:true,options:[option("normal","Sin fiebre puntuable","No scored fever",0),option("37_2_38_3","37,2-38,3 °C","37.2-38.3 °C",1),option("ge38_4","≥38,4 °C","≥38.4 °C",2)]},
      {id:"yawning",label:{es:"Bostezos frecuentes (>3)",en:"Frequent yawning (>3)"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",1)]},
      {id:"mottling",label:{es:"Moteado cutáneo",en:"Mottling"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",1)]},
      {id:"nasal_stuffiness",label:{es:"Congestión nasal",en:"Nasal stuffiness"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",1)]},
      {id:"sneezing",label:{es:"Estornudos (>3)",en:"Sneezing (>3)"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",1)]},
      {id:"nasal_flaring",label:{es:"Aleteo nasal",en:"Nasal flaring"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",2)]},
      {id:"respiratory_rate",label:{es:"Frecuencia respiratoria",en:"Respiratory rate"},type:"single_choice",required:true,options:[option("normal","≤60/min","≤60/min",0),option("gt60",">60/min sin retracciones",">60/min without retractions",1),option("gt60_retractions",">60/min con retracciones",">60/min with retractions",2)]},
      {id:"excessive_sucking",label:{es:"Succión excesiva",en:"Excessive sucking"},type:"single_choice",required:true,options:[option("no","No","No",0),option("yes","Sí","Yes",1)]},
      {id:"feeding",label:{es:"Alimentación",en:"Feeding"},type:"single_choice",required:true,options:[option("normal","Normal","Normal",0),option("poor","Mala alimentación","Poor feeding",2)]},
      {id:"vomiting",label:{es:"Regurgitación / vómitos",en:"Regurgitation / vomiting"},type:"single_choice",required:true,options:[option("none","No","None",0),option("regurgitation","Regurgitación","Regurgitation",2),option("projectile","Vómito proyectivo","Projectile vomiting",3)]},
      {id:"stools",label:{es:"Heces",en:"Stools"},type:"single_choice",required:true,options:[option("normal","Normales","Normal",0),option("loose","Blandas","Loose",2),option("watery","Acuosas","Watery",3)]}
    ]
  },
  rdai: {
    validationNotes: {
      es: "RDAI clásico de seis componentes: tres dominios de sibilancias (0-8) y tres de retracciones (0-9), total 0-17. La tabla completa se verificó frente a literatura open-access que reproduce el instrumento. PedsCore no impone bandas terapéuticas.",
      en: "Classic six-component RDAI: three wheezing domains (0-8) and three retraction domains (0-9), total 0-17. The complete table was verified against open-access literature reproducing the instrument. PedsCore does not impose treatment bands."
    },
    inputs: [
      {id:"wheeze_expiration",label:{es:"Sibilancias en espiración",en:"Expiratory wheezing"},type:"single_choice",required:true,options:[option("none","Ausentes","None",0),option("end","Solo al final","End expiration",1),option("half","Mitad de la espiración","Half expiration",2),option("three_quarters","Tres cuartos","Three quarters",3),option("all","Toda la espiración","All expiration",4)]},
      {id:"wheeze_inspiration",label:{es:"Sibilancias en inspiración",en:"Inspiratory wheezing"},type:"single_choice",required:true,options:[option("none","Ausentes","None",0),option("part","Parte de la inspiración","Part inspiration",1),option("all","Toda la inspiración","All inspiration",2)]},
      {id:"wheeze_location",label:{es:"Distribución de sibilancias",en:"Wheezing location"},type:"single_choice",required:true,options:[option("none","Ausentes","None",0),option("segmental","Segmentarias","Segmental",1),option("diffuse","Difusas","Diffuse",2)]},
      {id:"retraction_supraclavicular",label:{es:"Retracción supraclavicular",en:"Supraclavicular retractions"},type:"single_choice",required:true,options:[option("none","Ausente","None",0),option("mild","Leve","Mild",1),option("moderate","Moderada","Moderate",2),option("marked","Marcada","Marked",3)]},
      {id:"retraction_intercostal",label:{es:"Retracción intercostal",en:"Intercostal retractions"},type:"single_choice",required:true,options:[option("none","Ausente","None",0),option("mild","Leve","Mild",1),option("moderate","Moderada","Moderate",2),option("marked","Marcada","Marked",3)]},
      {id:"retraction_subcostal",label:{es:"Retracción subcostal",en:"Subcostal retractions"},type:"single_choice",required:true,options:[option("none","Ausente","None",0),option("mild","Leve","Mild",1),option("moderate","Moderada","Moderate",2),option("marked","Marcada","Marked",3)]}
    ]
  },
  snappii: {
    validationNotes: {
      es: "SNAPPE-II de nueve variables para gravedad neonatal, usando los peores valores de las primeras 12 horas. PedsCore reproduce únicamente la lógica numérica publicada y no genera una predicción individual ni recomendaciones de limitación de soporte.",
      en: "Nine-variable SNAPPE-II neonatal severity score using the worst values from the first 12 hours. PedsCore reproduces only the published numeric logic and does not generate an individual prediction or limitation-of-support recommendations."
    },
    inputs: [
      {id:"mean_bp_mmhg",label:{es:"PAM más baja",en:"Lowest mean blood pressure"},type:"number",required:true,unit:"mmHg",min:0,max:150,step:1},
      {id:"lowest_temp_c",label:{es:"Temperatura más baja",en:"Lowest temperature"},type:"number",required:true,unit:"°C",min:25,max:42,step:0.1},
      {id:"pao2_fio2_ratio",label:{es:"Relación PaO₂/FiO₂ (convención SNAPPE-II)",en:"PaO₂/FiO₂ ratio (SNAPPE-II convention)"},type:"number",required:true,min:0,max:10,step:0.01},
      {id:"lowest_ph",label:{es:"pH sérico más bajo",en:"Lowest serum pH"},type:"number",required:true,min:6,max:8,step:0.01},
      booleanInput("multiple_seizures",{es:"Convulsiones múltiples",en:"Multiple seizures"}),
      {id:"urine_output_ml_kg_h",label:{es:"Diuresis",en:"Urine output"},type:"number",required:true,unit:"mL/kg/h",min:0,max:20,step:0.01},
      {id:"apgar_5min",label:{es:"Apgar a los 5 minutos",en:"5-minute Apgar"},type:"number",required:true,min:0,max:10,step:1},
      {id:"birth_weight_g",label:{es:"Peso al nacer",en:"Birth weight"},type:"number",required:true,unit:"g",min:200,max:7000,step:1},
      booleanInput("sga_below_3rd_percentile",{es:"Pequeño para edad gestacional <P3",en:"Small for gestational age <3rd percentile"})
    ]
  },
  modified_bell_nec: {
    validationNotes:{
      es:"Clasificación de Bell modificada para NEC, implementada a partir de una tabla reproducida bajo CC BY. Integra hallazgos sistémicos, abdominales y radiológicos.",
      en:"Modified Bell NEC staging implemented from a table reproduced under CC BY. It integrates systemic, abdominal, and radiologic findings."
    },
    inputs:[
      booleanInput("systemic_instability",{es:"Inestabilidad sistémica: temperatura, apnea, bradicardia o letargia",en:"Systemic instability: temperature instability, apnea, bradycardia, or lethargy"}),
      booleanInput("mild_gi_signs",{es:"Signos GI leves: retención gástrica, distensión o vómitos",en:"Mild GI signs: gastric retention, distension, or emesis"}),
      booleanInput("gross_bloody_stool",{es:"Sangre macroscópica en heces",en:"Grossly bloody stool"}),
      booleanInput("absent_bowel_sounds_or_tenderness",{es:"Ruidos intestinales ausentes y/o dolor abdominal",en:"Absent bowel sounds and/or abdominal tenderness"}),
      booleanInput("mild_acidosis_or_thrombocytopenia",{es:"Acidosis metabólica leve y/o trombocitopenia",en:"Mild metabolic acidosis and/or thrombocytopenia"}),
      booleanInput("abdominal_cellulitis_or_mass",{es:"Celulitis abdominal o masa en FID",en:"Abdominal cellulitis or right-lower-quadrant mass"}),
      booleanInput("hypotension_dic_or_neutropenia",{es:"Hipotensión, CID o neutropenia",en:"Hypotension, DIC, or neutropenia"}),
      booleanInput("pneumatosis_intestinalis",{es:"Neumatosis intestinal",en:"Pneumatosis intestinalis"}),
      booleanInput("portal_venous_gas",{es:"Gas portal",en:"Portal venous gas"}),
      booleanInput("ascites",{es:"Ascitis",en:"Ascites"}),
      booleanInput("pneumoperitoneum",{es:"Neumoperitoneo",en:"Pneumoperitoneum"})
    ]
  },
  garcia_alix_ners: {
    validationNotes:{es:"NE-RS García-Alix completa: 7 ítems clínicos + 2 aEEG, puntuación asimétrica 0-70, validada en las primeras 6 horas de vida.",en:"Complete García-Alix NE-RS: 7 clinical items + 2 aEEG items, asymmetric 0-70 score, validated within the first 6 hours after birth."},
    inputs:[
      {id:"alertness",label:{es:"Alerta",en:"Alertness"},type:"single_choice",required:true,options:[option("a0","Despierta fácilmente y mantiene alerta >30 s","Wakes easily and stays alert >30 s",0),option("a1","Despierta con cierta dificultad; alerta algo acortada","Some difficulty waking; slightly shortened alertness",1),option("a2","Difícil despertar; alerta ≤6 s","Difficult to wake; alert ≤6 s",2),option("a6","Despierta con gran dificultad y vuelve a dormir rápido","Great difficulty waking and quickly falls asleep",6),option("a8","No despierta a estímulo nociceptivo","Does not wake to noxious stimuli",8)]},
      {id:"posture",label:{es:"Postura / tono",en:"Posture / tone"},type:"single_choice",required:true,options:[option("p0","Flexión y aducción adecuadas","Adequate flexion and adduction",0),option("p1","Flexión/aducción pobre en miembros superiores","Poor upper-limb flexion/adduction",1),option("p2","Flexión/aducción pobre en cuatro miembros","Poor flexion/adduction in all limbs",2),option("p6","Hipotonía grave o postura tónica no sostenida","Severe hypotonia or nonsustained tonic posture",6),option("p8","Flácido o postura tónica sostenida","Flaccid or sustained tonic posture",8)]},
      {id:"spontaneous_activity",label:{es:"Actividad motora espontánea",en:"Spontaneous motor activity"},type:"single_choice",required:true,options:[option("s0","Fluida, variable y compleja","Fluent, variable, complex",0),option("s1","Fluida/variable con temblor o sobresaltos excesivos","Fluent/variable with excessive tremor or startles",1),option("s2","Disminuida, monótona y poco variable","Decreased, monotonous, poorly variable",2),option("s6","Actividad muy disminuida","Greatly diminished activity",6),option("s8","Ausente o temblor continuo en reposo","Absent or continuous tremor at rest",8)]},
      {id:"motor_response",label:{es:"Respuesta motora a estímulos",en:"Motor response to stimuli"},type:"single_choice",required:true,options:[option("m0","Vigorosa y alternante","Vigorous alternating limb movements",0),option("m1","Normal pero escasa","Normal response but few movements",1),option("m2","Retirada de más miembros que el estimulado","Withdrawal involving more than stimulated limb",2),option("m6","Retirada solo del miembro estimulado","Withdrawal only of stimulated limb",6),option("m8","Ausente o estereotipada","Absent or stereotyped",8)]},
      {id:"myotatic_reflexes",label:{es:"Reflejos miotáticos",en:"Myotatic reflexes"},type:"single_choice",required:true,options:[option("r0","Normales","Normal",0),option("r1","Hiperactivos","Hyperactive",1),option("r2","Hipoactivos","Hypoactive",2),option("r6","Ausentes","Absent",6)]},
      {id:"breathing",label:{es:"Patrón respiratorio",en:"Breathing pattern"},type:"single_choice",required:true,options:[option("b0","Espontáneo o Kussmaul","Spontaneous or Kussmaul",0),option("b2","Respiración periódica","Periodic breathing",2),option("b8","Hiperapnea central, apnéustica, Biot, atáxica o apnea","Central hyperpnea, apneustic, Biot, ataxic, or apnea",8)]},
      {id:"clinical_seizures",label:{es:"Convulsiones clínicas",en:"Clinical seizures"},type:"single_choice",required:true,options:[option("c0","Ausentes","Absent",0),option("c6","Única (≤1/h)","Single (≤1/h)",6),option("c8","Repetidas (>1/h) o estatus","Repeated (>1/h) or status",8)]},
      {id:"aeeg_seizures",label:{es:"Convulsiones eléctricas en aEEG",en:"aEEG electrical seizures"},type:"single_choice",required:true,options:[option("e0","Ausentes","Absent",0),option("e6","Única (≤1/h)","Single (≤1/h)",6),option("e8","Repetidas (>1/h) o estatus","Repeated (>1/h) or status",8)]},
      {id:"aeeg_background",label:{es:"Patrón de fondo aEEG",en:"aEEG background pattern"},type:"single_choice",required:true,options:[option("g0","CNV con ciclo sueño-vigilia","CNV with sleep-wake cycling",0),option("g1","CNV sin ciclo sueño-vigilia","CNV without sleep-wake cycling",1),option("g2","Voltaje discontinuo","Discontinuous voltage",2),option("g6","Burst-suppression","Burst-suppression",6),option("g8","Bajo voltaje continuo o trazado plano","Continuous low voltage or flat trace",8)]}
    ],
    interpretationBands:[{id:"mild",label:{es:"Leve",en:"Mild"},min:0,max:7},{id:"moderate",label:{es:"Moderada",en:"Moderate"},min:8,max:29},{id:"severe",label:{es:"Grave",en:"Severe"},min:30,max:70}]
  },
  parc: {
    validationNotes:{es:"Ecuación logística pARC original de 2018, validada en pacientes de 5-18 años con <96 h de dolor abdominal evaluados por posible apendicitis.",en:"Original 2018 pARC logistic equation, validated in patients aged 5-18 years with <96 h abdominal pain undergoing evaluation for possible appendicitis."},
    inputs:[
      {id:"age_years",label:{es:"Edad",en:"Age"},type:"number",required:true,unit:"años",min:5,max:18,step:0.1},
      {id:"sex",label:{es:"Sexo",en:"Sex"},type:"select",required:true,options:[option("female","Femenino","Female"),option("male","Masculino","Male")]},
      {id:"pain_duration",label:{es:"Duración del dolor",en:"Pain duration"},type:"select",required:true,options:[option("lt24","<24 h","<24 h"),option("24_48","24 a <48 h","24 to <48 h"),option("48_96","48-96 h","48-96 h")]},
      booleanInput("pain_with_walking",{es:"Dolor al caminar, saltar o toser",en:"Pain with walking, hopping, or coughing"}),
      booleanInput("migration_to_rlq",{es:"Migración del dolor a FID",en:"Migration of pain to RLQ"}),
      booleanInput("maximal_rlq_tenderness",{es:"Máxima sensibilidad en FID",en:"Maximal tenderness in RLQ"}),
      booleanInput("abdominal_guarding",{es:"Defensa abdominal",en:"Abdominal guarding"}),
      {id:"anc_10e3_ul",label:{es:"ANC",en:"ANC"},type:"number",required:true,unit:"×10³/µL",min:0,max:50,step:0.01}
    ]
  },
  pcdai: {
    validationNotes:{es:"PCDAI original de 11 componentes, rango 0-100. Los ítems de hematocrito y crecimiento se introducen por categoría publicada para respetar referencias dependientes de edad/sexo. PedsCore muestra el puntaje continuo y añade como contexto contemporáneo que ECCO-ESPGHAN 2026 usa PCDAI ≤10 como objetivo de remisión clínica y una disminución ≥12,5 puntos como respuesta.",en:"Original 11-component PCDAI, range 0-100. Hematocrit and growth items are entered using the published categories to respect age/sex-dependent references. PedsCore reports the continuous score and adds contemporary context that ECCO-ESPGHAN 2026 uses PCDAI ≤10 as a clinical-remission target and a decrease ≥12.5 points as response."},
    inputs:[
      {id:"abdominal_pain",label:{es:"Dolor abdominal",en:"Abdominal pain"},type:"single_choice",required:true,options:[option("0","Ninguno","None",0),option("5","Leve/breve","Mild/brief",5),option("10","Moderado-grave/diario/nocturno","Moderate-severe/daily/nocturnal",10)]},
      {id:"stools",label:{es:"Deposiciones",en:"Stools"},type:"single_choice",required:true,options:[option("0","0-1 líquidas sin sangre","0-1 liquid without blood",0),option("5","Hasta 2 semiformadas con poca sangre o 2-5 líquidas","Up to 2 semi-formed with little blood or 2-5 liquid",5),option("10","Sangrado macroscópico, ≥6 líquidas o diarrea nocturna","Gross bleeding, ≥6 liquid or nocturnal diarrhea",10)]},
      {id:"wellbeing",label:{es:"Bienestar / funcionamiento",en:"Well-being / functioning"},type:"single_choice",required:true,options:[option("0","Sin limitación","No limitation",0),option("5","Dificultad ocasional","Occasional difficulty",5),option("10","Limitación frecuente / muy mal","Frequent limitation / very poor",10)]},
      {id:"hematocrit_category",label:{es:"Hematocrito respecto a referencia edad/sexo",en:"Hematocrit vs age/sex reference"},type:"single_choice",required:true,options:[option("0","Normal","Normal",0),option("2_5","Disminución leve","Mild decrease",2.5),option("5","Disminución moderada/grave","Moderate/severe decrease",5)]},
      {id:"esr_mm_h",label:{es:"VSG",en:"ESR"},type:"number",required:true,unit:"mm/h",min:0,max:200,step:1},
      {id:"albumin_g_dl",label:{es:"Albúmina",en:"Albumin"},type:"number",required:true,unit:"g/dL",min:0,max:6,step:0.1},
      {id:"weight",label:{es:"Peso",en:"Weight"},type:"single_choice",required:true,options:[option("0","Ganancia/estable o pérdida voluntaria","Gain/stable or voluntary loss",0),option("5","Pérdida involuntaria 1-9%","Involuntary loss 1-9%",5),option("10","Pérdida ≥10%","Loss ≥10%",10)]},
      {id:"height",label:{es:"Crecimiento lineal",en:"Linear growth"},type:"single_choice",required:true,options:[option("0","Sin afectación","No impairment",0),option("5","Afectación intermedia","Intermediate impairment",5),option("10","Afectación marcada","Marked impairment",10)]},
      {id:"abdomen",label:{es:"Exploración abdominal",en:"Abdominal exam"},type:"single_choice",required:true,options:[option("0","Sin dolor ni masa","No tenderness or mass",0),option("5","Dolor o masa sin dolor","Tenderness or mass without tenderness",5),option("10","Dolor con defensa involuntaria o masa definida","Tenderness with involuntary guarding or definite mass",10)]},
      {id:"perirectal",label:{es:"Enfermedad perirrectal",en:"Perirectal disease"},type:"single_choice",required:true,options:[option("0","Ninguna/tags asintomáticos","None/asymptomatic tags",0),option("5","1-2 fístulas indolentes","1-2 indolent fistulas",5),option("10","Fístula activa/drenaje/dolor/absceso","Active fistula/drainage/tenderness/abscess",10)]},
      {id:"extraintestinal",label:{es:"Manifestaciones extraintestinales",en:"Extraintestinal manifestations"},type:"single_choice",required:true,options:[option("0","0","0",0),option("5","1","1",5),option("10","≥2","≥2",10)]}
    ]
  },
  wpcdai: {
    validationNotes: {
      es: "Implementación local del weighted PCDAI con los ocho dominios y pesos publicados; rango 0-125.",
      en: "Local weighted PCDAI implementation using the eight published domains and weights; range 0-125."
    },
    inputs: [
      { id:"abdominal_pain", label:{es:"Dolor abdominal",en:"Abdominal pain"}, type:"single_choice", required:true, options:[option("none","Ninguno","None",0),option("mild","Leve, breve, no interfiere","Mild, brief, does not interfere",10),option("modsev","Moderado/grave, diario o nocturno","Moderate/severe, daily or nocturnal",20)] },
      { id:"wellbeing", label:{es:"Funcionamiento / bienestar",en:"Functioning / well-being"}, type:"single_choice", required:true, options:[option("well","Sin limitación","No limitation",0),option("occasional","Dificultad ocasional","Occasional difficulty",10),option("frequent","Limitación frecuente / muy mal","Frequent limitation / very poor",20)] },
      { id:"stools", label:{es:"Deposiciones",en:"Stools"}, type:"single_choice", required:true, options:[option("low","0-1 líquidas, sin sangre","0-1 liquid, no blood",0),option("mid","Hasta 2 semiformadas con poca sangre o 2-5 líquidas","Up to 2 semi-formed with little blood or 2-5 liquid",7.5),option("high","Sangrado macroscópico, ≥6 líquidas o diarrea nocturna","Gross bleeding, ≥6 liquid, or nocturnal diarrhea",15)] },
      { id:"esr_mm_h", label:{es:"VSG",en:"ESR"}, type:"number", required:true, unit:"mm/h", min:0, max:200, step:1 },
      { id:"albumin_g_dl", label:{es:"Albúmina",en:"Albumin"}, type:"number", required:true, unit:"g/dL", min:0, max:6, step:0.1 },
      { id:"weight_change", label:{es:"Peso",en:"Weight"}, type:"single_choice", required:true, options:[option("gain","Ganancia o pérdida voluntaria/estable","Gain or voluntary stable/loss",0),option("loss1","Pérdida involuntaria 1-9%","Involuntary loss 1-9%",5),option("loss10","Pérdida ≥10%","Loss ≥10%",10)] },
      { id:"perirectal_disease", label:{es:"Enfermedad perirrectal",en:"Perirectal disease"}, type:"single_choice", required:true, options:[option("none","Ninguna / tags asintomáticos","None / asymptomatic tags",0),option("mild","1-2 fístulas indolentes, poco drenaje","1-2 indolent fistulas, scant drainage",7.5),option("active","Fístula activa, drenaje, dolor o absceso","Active fistula, drainage, tenderness, or abscess",15)] },
      { id:"extraintestinal_manifestations", label:{es:"Manifestaciones extraintestinales",en:"Extraintestinal manifestations"}, type:"single_choice", required:true, options:[option("none","Ninguna","None",0),option("present","Una o más","One or more",10)] }
    ],
    interpretationBands:[
      {id:"remission",label:{es:"Remisión",en:"Remission"},max:12.49},
      {id:"mild",label:{es:"Leve",en:"Mild"},min:12.5,max:40},
      {id:"moderate",label:{es:"Moderada",en:"Moderate"},min:40.01,max:57.5},
      {id:"severe",label:{es:"Grave",en:"Severe"},min:57.51,max:125}
    ]
  },
  pucai: {
    validationNotes:{es:"PUCAI completo 0-85 para actividad de colitis ulcerosa pediátrica. PedsCore usa los seis dominios originales y las bandas <10 remisión, 10-34 leve, 35-64 moderada y ≥65 grave. El índice monitoriza actividad y no diagnostica EII ni prescribe tratamiento.",en:"Complete 0-85 PUCAI for pediatric ulcerative-colitis activity. PedsCore uses the six original domains and bands <10 remission, 10-34 mild, 35-64 moderate, and ≥65 severe. The index monitors activity and does not diagnose IBD or prescribe treatment."},
    inputs:[
      {id:"abdominal_pain",label:{es:"Dolor abdominal",en:"Abdominal pain"},type:"single_choice",required:true,options:[option("0","Ninguno","None",0),option("5","Puede ignorarse","Can be ignored",5),option("10","No puede ignorarse","Cannot be ignored",10)]},
      {id:"rectal_bleeding",label:{es:"Sangrado rectal",en:"Rectal bleeding"},type:"single_choice",required:true,options:[option("0","Ninguno","None",0),option("10","Pequeña cantidad en <50%","Small amount in <50%",10),option("20","Pequeña cantidad en la mayoría","Small amount with most stools",20),option("30","Gran cantidad","Large amount",30)]},
      {id:"stool_consistency",label:{es:"Consistencia",en:"Stool consistency"},type:"single_choice",required:true,options:[option("0","Formada","Formed",0),option("5","Parcialmente formada","Partly formed",5),option("10","No formada","Completely unformed",10)]},
      {id:"stool_frequency",label:{es:"Deposiciones/24 h",en:"Stools/24 h"},type:"single_choice",required:true,options:[option("0","0-2","0-2",0),option("5","3-5","3-5",5),option("10","6-8","6-8",10),option("15",">8",">8",15)]},
      {id:"nocturnal_stool",label:{es:"Deposición nocturna que despierta",en:"Nocturnal stool causing waking"},type:"single_choice",required:true,options:[option("0","No","No",0),option("10","Sí","Yes",10)]},
      {id:"activity_level",label:{es:"Nivel de actividad",en:"Activity level"},type:"single_choice",required:true,options:[option("0","Sin limitación","No limitation",0),option("5","Limitación ocasional","Occasional limitation",5),option("10","Limitación grave","Severely restricted",10)]}
    ],
    interpretationBands:[{id:"remission",label:{es:"Remisión",en:"Remission"},min:0,max:9},{id:"mild",label:{es:"Leve",en:"Mild"},min:10,max:34},{id:"moderate",label:{es:"Moderada",en:"Moderate"},min:35,max:64},{id:"severe",label:{es:"Grave",en:"Severe"},min:65,max:85}]
  },
  nsofa: {
    validationNotes:{es:"nSOFA completo 0-15 con dominios respiratorio, cardiovascular y hematológico.",en:"Complete 0-15 nSOFA with respiratory, cardiovascular, and hematologic domains."},
    inputs:[
      booleanInput("intubated",{es:"Intubado",en:"Intubated"}),
      {id:"spo2_percent",label:{es:"SpO₂",en:"SpO₂"},type:"number",required:true,unit:"%",min:1,max:100,step:1},
      {id:"fio2_fraction",label:{es:"FiO₂",en:"FiO₂"},type:"number",required:true,unit:"0-1",min:0.21,max:1,step:0.01},
      {id:"inotrope_count",label:{es:"Número de inotrópicos/vasoactivos",en:"Number of inotropes/vasoactives"},type:"number",required:true,min:0,max:10,step:1},
      booleanInput("systemic_steroids",{es:"Corticoide sistémico por soporte hemodinámico",en:"Systemic steroid for hemodynamic support"}),
      {id:"platelets_10e3_ul",label:{es:"Plaquetas",en:"Platelets"},type:"number",required:true,unit:"×10³/µL",min:0,max:1500,step:1}
    ]
  },
  yos: {
    validationNotes:{es:"Yale Observation Scale clásica: seis dominios puntuados 1, 3 o 5; total 6-30. PedsCore restringe su uso operativo principal a niños febriles de 3-24 meses y no permite usar una puntuación baja para excluir infección bacteriana grave en lactantes pequeños.",en:"Classic Yale Observation Scale: six domains scored 1, 3, or 5; total 6-30. PedsCore limits primary operational use to febrile children aged 3-24 months and does not allow a low score to be used to exclude serious bacterial infection in young infants."},
    inputs:[
      {id:"age_months",label:{es:"Edad",en:"Age"},type:"number",required:true,unit:"meses",min:3,max:24,step:0.1},
      booleanInput("febrile_illness",{es:"Enfermedad febril",en:"Febrile illness"}),
      {id:"cry",label:{es:"Calidad del llanto",en:"Quality of cry"},type:"single_choice",required:true,options:[option("1","Fuerte/normal o contento","Strong/normal or content",1),option("3","Quejumbroso/sollozo","Whimpering/sobbing",3),option("5","Débil, gemido o agudo","Weak, moaning, or high-pitched",5)]},
      {id:"parent_reaction",label:{es:"Reacción a los padres",en:"Reaction to parents"},type:"single_choice",required:true,options:[option("1","Llora brevemente y cesa / contento","Cries briefly then stops / content",1),option("3","Llora intermitente","Cries on and off",3),option("5","Llanto continuo o casi no responde","Continual cry or hardly responds",5)]},
      {id:"state_variation",label:{es:"Variación del estado",en:"State variation"},type:"single_choice",required:true,options:[option("1","Permanece despierto / despierta rápido","Stays awake / wakes quickly",1),option("3","Ojos se cierran / requiere estímulo prolongado","Eyes close / prolonged stimulation",3),option("5","Se duerme o no despierta","Falls asleep or will not rouse",5)]},
      {id:"color",label:{es:"Color",en:"Color"},type:"single_choice",required:true,options:[option("1","Rosado","Pink",1),option("3","Extremidades pálidas/acrocyanosis","Pale extremities/acrocyanosis",3),option("5","Pálido, cianótico, moteado o ceniciento","Pale, cyanotic, mottled, or ashen",5)]},
      {id:"hydration",label:{es:"Hidratación",en:"Hydration"},type:"single_choice",required:true,options:[option("1","Piel/ojos normales, mucosas húmedas","Normal skin/eyes, moist mucosa",1),option("3","Piel/ojos normales, boca algo seca","Normal skin/eyes, slightly dry mouth",3),option("5","Piel pastosa/pliegue, mucosas secas y/o ojos hundidos","Doughy/tented skin, dry mucosa and/or sunken eyes",5)]},
      {id:"social_response",label:{es:"Respuesta social",en:"Social response"},type:"single_choice",required:true,options:[option("1","Sonríe o alerta","Smiles or alert",1),option("3","Sonrisa/alerta breves","Brief smile/alert",3),option("5","No sonríe, ansioso, apagado o no alerta","No smile, anxious, dull, or no alerting",5)]}
    ]
  },
  bacterial_meningitis_score: {
    validationNotes:{es:"BMS completo para niños con pleocitosis de LCR y criterios de elegibilidad publicados.",en:"Complete BMS for children with CSF pleocytosis and published eligibility criteria."},
    inputs:[
      {id:"age_days",label:{es:"Edad",en:"Age"},type:"number",required:true,unit:"días",min:0,max:6575,step:1},
      {id:"csf_wbc",label:{es:"Leucocitos LCR",en:"CSF WBC"},type:"number",required:true,unit:"/mm³",min:0,max:100000,step:1},
      {id:"csf_rbc",label:{es:"Hematíes LCR",en:"CSF RBC"},type:"number",required:true,unit:"/mm³",min:0,max:1000000,step:1},
      booleanInput("antibiotics_before_lp",{es:"Antibióticos antes de LP",en:"Antibiotics before LP"}),
      booleanInput("critical_illness",{es:"Enfermedad crítica",en:"Critical illness"}),
      booleanInput("immunosuppression",{es:"Inmunosupresión",en:"Immunosuppression"}),
      booleanInput("cns_device_or_recent_neurosurgery",{es:"Dispositivo SNC o neurocirugía reciente",en:"CNS device or recent neurosurgery"}),
      booleanInput("other_bacterial_infection",{es:"Otra infección bacteriana que requiere antibiótico",en:"Other bacterial infection requiring antibiotics"}),
      booleanInput("csf_gram_positive",{es:"Gram de LCR positivo",en:"Positive CSF Gram stain"}),
      {id:"csf_anc",label:{es:"ANC en LCR",en:"CSF ANC"},type:"number",required:true,unit:"/mm³",min:0,max:100000,step:1},
      {id:"csf_protein_mg_dl",label:{es:"Proteínas LCR",en:"CSF protein"},type:"number",required:true,unit:"mg/dL",min:0,max:1000,step:1},
      {id:"peripheral_anc",label:{es:"ANC periférico",en:"Peripheral ANC"},type:"number",required:true,unit:"/mm³",min:0,max:100000,step:1},
      booleanInput("seizure",{es:"Convulsión antes o al presentarse",en:"Seizure before or at presentation"})
    ]
  },
  pecarn_febrile_infant: {
    validationNotes:{
      es:"Implementación local de la regla PECARN 2019 para lactantes febriles ≤60 días. Usa la versión principal derivada y validada: urianálisis negativo, ANC ≤4.090/mm³ y PCT ≤1,71 ng/mL, dentro de la población de elegibilidad publicada.",
      en:"Local implementation of the 2019 PECARN rule for febrile infants ≤60 days. It uses the primary derived and validated version: negative urinalysis, ANC ≤4,090/mm³, and PCT ≤1.71 ng/mL, within the published eligible population."
    },
    calculationNotes:{
      es:"El estudio original incluyó fiebre ≥38 °C documentada en urgencias, otro centro sanitario o domicilio en las 24 h previas y excluyó aspecto críticamente enfermo, prematuridad ≤36 semanas, enfermedad previa relevante, antibióticos en las 48 h previas, dispositivos permanentes e infección de partes blandas.",
      en:"The original study included fever ≥38 °C documented in the ED, another health care setting, or at home within the preceding 24 hours and excluded critically ill appearance, prematurity ≤36 weeks, relevant pre-existing conditions, antibiotics in the preceding 48 hours, indwelling devices, and soft-tissue infection."
    },
    inputs:[
      {id:"age_days",label:{es:"Edad",en:"Age"},type:"number",required:true,unit:"días",min:0,max:60,step:1},
      booleanInput("fever_38_within_24h",{es:"Fiebre ≥38 °C en las últimas 24 h",en:"Fever ≥38 °C within the last 24 h"}),
      booleanInput("critically_ill",{es:"Aspecto críticamente enfermo",en:"Critically ill appearance"}),
      booleanInput("previously_healthy",{es:"Previamente sano",en:"Previously healthy"}),
      booleanInput("gestation_over_36_weeks",{es:"Edad gestacional al nacer >36 semanas",en:"Gestational age at birth >36 weeks"}),
      booleanInput("antibiotics_last_48h",{es:"Antibióticos en las últimas 48 h",en:"Antibiotics in the last 48 h"}),
      booleanInput("indwelling_device",{es:"Dispositivo permanente",en:"Indwelling device"}),
      booleanInput("soft_tissue_infection",{es:"Infección de partes blandas",en:"Soft-tissue infection"}),
      booleanInput("urinalysis_negative",{es:"Urianálisis negativo",en:"Negative urinalysis"}),
      {id:"anc",label:{es:"ANC",en:"ANC"},type:"number",required:true,unit:"/mm³",min:0,max:100000,step:1},
      {id:"procalcitonin_ng_ml",label:{es:"Procalcitonina",en:"Procalcitonin"},type:"number",required:true,unit:"ng/mL",min:0,max:100,step:0.01}
    ]
  },
  cdc_growth_percentiles: {
    validationNotes: {
      es: "Implementación local activa de CDC 2000 para 2-20 años con peso/edad, talla/edad e IMC/edad mediante LMS oficiales. Por encima del P95 de IMC se aplica automáticamente CDC Extended BMI 2022 con la ecuación half-normal publicada y sigma suavizada por sexo y edad.",
      en: "Active local CDC 2000 implementation for ages 2-20 years with official LMS weight-for-age, stature-for-age, and BMI-for-age. Above the BMI 95th percentile, the published 2022 CDC Extended BMI half-normal method with sex/age-smoothed sigma is applied automatically."
    },
    calculationNotes: {
      es: "Usa edad exacta en meses. Los valores LMS se interpolan linealmente entre puntos oficiales cuando la edad cae entre ellos, una opción contemplada por CDC. El resultado principal es IMC/edad y se muestran además peso/edad y talla/edad. Si el IMC supera el P95, PedsCore cambia automáticamente al método CDC Extended BMI 2022; también calcula % del P95 y el criterio CDC de obesidad grave.",
      en: "Uses exact age in months. LMS values are linearly interpolated between official points when age falls between them, an approach allowed by CDC. The primary result is BMI-for-age, with weight-for-age and stature-for-age also shown. If BMI exceeds the 95th percentile, PedsCore automatically switches to the 2022 CDC Extended BMI method; percent of the 95th percentile and the CDC severe-obesity criterion are also calculated."
    },
    inputs: [
      {
        id: "sex", label: { es: "Sexo de referencia CDC", en: "CDC reference sex" }, type: "select", required: true,
        options: [option("male", "Masculino", "Male"), option("female", "Femenino", "Female")]
      },
      { id: "age_months", label: { es: "Edad exacta", en: "Exact age" }, description: { es: "Edad exacta en meses; admite decimales. CDC recomienda usar la información de edad más precisa disponible.", en: "Exact age in months; decimals are accepted. CDC recommends using the most accurate age information available." }, type: "number", required: true, unit: "meses", min: 24, max: 240, step: 0.01 },
      { id: "weight_kg", label: { es: "Peso", en: "Weight" }, type: "number", required: true, unit: "kg", min: 1, max: 300, step: 0.01 },
      { id: "stature_cm", label: { es: "Talla de pie", en: "Standing stature" }, type: "number", required: true, unit: "cm", min: 60, max: 230, step: 0.1 }
    ]
  },
  phoenix_sepsis: {
    validationNotes: {
      es: "Implementación local de los criterios Phoenix 2024. Suma cuatro dominios: respiratorio 0-3, cardiovascular 0-6, coagulación 0-2 y neurológico 0-2; total 0-13.",
      en: "Local implementation of the 2024 Phoenix criteria. It sums four domains: respiratory 0-3, cardiovascular 0-6, coagulation 0-2, and neurologic 0-2; total 0-13."
    },
    calculationNotes: {
      es: "Con infección sospechada o confirmada, Phoenix >=2 cumple criterios de sepsis. Shock séptico requiere además >=1 punto cardiovascular. No es un cribado precoz de infección.",
      en: "With suspected or confirmed infection, Phoenix >=2 meets sepsis criteria. Septic shock additionally requires >=1 cardiovascular point. This is not an early infection screening tool."
    },
    inputs: [
      { id: "age_months", label: { es: "Edad", en: "Age" }, type: "number", required: true, unit: "meses", min: 0, max: 215.99, step: 0.1 },
      booleanInput("suspected_infection", { es: "Infección sospechada o confirmada", en: "Suspected or confirmed infection" }),
      { id: "fio2_fraction", label: { es: "FiO₂", en: "FiO₂" }, type: "number", required: true, unit: "0-1", min: 0.21, max: 1, step: 0.01 },
      { id: "pao2_mmhg", label: { es: "PaO₂ (si disponible)", en: "PaO₂ (if available)" }, type: "number", required: false, unit: "mmHg", min: 1, max: 800, step: 1 },
      { id: "spo2_percent", label: { es: "SpO₂ (si PaO₂ no disponible)", en: "SpO₂ (if PaO₂ unavailable)" }, type: "number", required: false, unit: "%", min: 1, max: 100, step: 1 },
      booleanInput("any_respiratory_support", { es: "Cualquier soporte respiratorio", en: "Any respiratory support" }),
      booleanInput("invasive_mechanical_ventilation", { es: "Ventilación mecánica invasiva", en: "Invasive mechanical ventilation" }),
      { id: "vasoactive_count", label: { es: "Número de fármacos vasoactivos simultáneos", en: "Number of concurrent vasoactive medications" }, type: "number", required: true, min: 0, max: 10, step: 1 },
      { id: "lactate_mmol_l", label: { es: "Lactato", en: "Lactate" }, type: "number", required: true, unit: "mmol/L", min: 0, max: 50, step: 0.1 },
      { id: "map_mmhg", label: { es: "Presión arterial media", en: "Mean arterial pressure" }, type: "number", required: true, unit: "mmHg", min: 0, max: 200, step: 1 },
      { id: "platelets_10e3_ul", label: { es: "Plaquetas", en: "Platelets" }, type: "number", required: true, unit: "×10³/µL", min: 0, max: 1500, step: 1 },
      { id: "inr", label: { es: "INR", en: "INR" }, type: "number", required: true, min: 0, max: 20, step: 0.01 },
      { id: "d_dimer_mg_l_feu", label: { es: "D-dímero", en: "D-dimer" }, type: "number", required: true, unit: "mg/L FEU", min: 0, max: 100, step: 0.1 },
      { id: "fibrinogen_mg_dl", label: { es: "Fibrinógeno", en: "Fibrinogen" }, type: "number", required: true, unit: "mg/dL", min: 0, max: 1500, step: 1 },
      { id: "gcs", label: { es: "Glasgow", en: "Glasgow Coma Scale" }, type: "number", required: true, min: 3, max: 15, step: 1 },
      booleanInput("both_pupils_fixed", { es: "Ambas pupilas fijas", en: "Both pupils fixed" })
    ],
    interpretationBands: [
      { id: "below_threshold", label: { es: "0-1 puntos", en: "0-1 points" }, min: 0, max: 1 },
      { id: "sepsis_threshold", label: { es: ">=2 puntos: umbral de sepsis si hay infección", en: ">=2 points: sepsis threshold if infection is present" }, min: 2, max: 13 }
    ]
  },
  mrisc: {
    validationNotes: {
      es: "Implementación local del mRISC derivado en menores de 5 años hospitalizados por enfermedad respiratoria grave en Kenia. Se reproduce la tabla de puntos publicada.",
      en: "Local mRISC implementation derived in hospitalized children under 5 years with severe respiratory illness in Kenya. The published point table is reproduced."
    },
    inputs: [
      { id: "age_months", label: { es: "Edad", en: "Age" }, type: "number", required: true, unit: "meses", min: 0, max: 59.99, step: 0.1 },
      booleanInput("history_unconscious", { es: "Antecedente de pérdida de conciencia en el episodio", en: "History of unconsciousness during illness" }),
      booleanInput("unable_to_drink", { es: "Incapaz de beber o tomar pecho", en: "Unable to drink or breastfeed" }),
      booleanInput("night_sweats", { es: "Sudoración nocturna", en: "Night sweats" }),
      booleanInput("chest_indrawing", { es: "Tiraje de pared torácica", en: "Chest-wall indrawing" }),
      booleanInput("alert_and_awake", { es: "Alerta y despierto en la exploración", en: "Alert and awake on examination" }),
      booleanInput("malaria", { es: "Malaria", en: "Malaria" }),
      booleanInput("dehydrated", { es: "Deshidratación", en: "Dehydration" }),
      { id: "weight_for_age_z", label: { es: "Z-score peso/edad", en: "Weight-for-age Z-score" }, type: "number", required: true, min: -10, max: 5, step: 0.01 }
    ]
  },
  gorelick_dehydration: {
    validationNotes: {
      es: "Implementación de la escala de Gorelick de 10 signos. Cada signo anormal suma 1 punto; ≥3 signos se asocia con ≥5% de pérdida de peso y ≥7 con ≥10% en la población estudiada.",
      en: "Implementation of the 10-sign Gorelick scale. Each abnormal sign adds 1 point; ≥3 signs is associated with ≥5% weight loss and ≥7 with ≥10% in the studied population."
    },
    inputs: [
      booleanInput("abnormal_general_appearance", { es: "Aspecto general alterado: inquieto, letárgico o inconsciente", en: "Abnormal general appearance: restless, lethargic, or unconscious" }),
      booleanInput("prolonged_capillary_refill", { es: "Relleno capilar prolongado o mínimo", en: "Prolonged or minimal capillary refill" }),
      booleanInput("absent_tears", { es: "Ausencia de lágrimas", en: "Absent tears" }),
      booleanInput("dry_mucous_membranes", { es: "Mucosas secas o muy secas", en: "Dry or very dry mucous membranes" }),
      booleanInput("sunken_eyes", { es: "Ojos hundidos o muy hundidos", en: "Sunken or deeply sunken eyes" }),
      booleanInput("deep_breathing", { es: "Respiración profunda o profunda y rápida", en: "Deep or deep-and-rapid breathing" }),
      booleanInput("weak_pulses", { es: "Pulso filiforme, débil o impalpable", en: "Thready, weak, or impalpable pulses" }),
      booleanInput("reduced_skin_elasticity", { es: "Elasticidad cutánea reducida / retorno lento", en: "Reduced skin elasticity / slow recoil" }),
      booleanInput("tachycardia", { es: "Taquicardia", en: "Tachycardia" }),
      booleanInput("reduced_urine_output", { es: "Diuresis reducida o ausente durante horas", en: "Reduced urine output or none for many hours" })
    ],
    interpretationBands: [
      { id: "minimal", label: { es: "No o mínima deshidratación", en: "No or minimal dehydration" }, min: 0, max: 2 },
      { id: "significant", label: { es: "≥5% de deshidratación probable", en: "Probable ≥5% dehydration" }, min: 3, max: 6 },
      { id: "severe", label: { es: "≥10% de deshidratación probable", en: "Probable ≥10% dehydration" }, min: 7, max: 10 }
    ]
  },
  visual_analogue_scale: {
    validationNotes: {
      es: "EVA/VAS de autorreporte como línea de 100 mm: se mide la distancia desde el extremo «sin dolor» hasta la marca del paciente. PedsCore no convierte la EVA en una NRS 0-10 ni impone categorías universales de gravedad.",
      en: "Self-report VAS implemented as a 100-mm line: the distance from the no-pain anchor to the patient's mark is measured. PedsCore does not convert the VAS into a 0-10 NRS or impose universal severity categories."
    },
    inputs: [
      { id: "pain_vas_mm", label: { es: "Distancia marcada en la EVA", en: "Marked distance on the VAS" }, description: { es: "Mide desde el extremo «sin dolor» hasta la marca del paciente en una línea de 100 mm.", en: "Measure from the no-pain anchor to the patient's mark on a 100-mm line." }, type: "number", required: true, unit: "mm", min: 0, max: 100, step: 1 }
    ]
  },
  pass: {
    validationNotes: {
      es: "PASS de Gorelick: tres dominios clínicos de 0-2 puntos (trabajo respiratorio, sibilancias y espiración prolongada), total 0-6, validado en asma aguda pediátrica de 1-18 años.",
      en: "Gorelick PASS: three clinical domains scored 0-2 (work of breathing, wheezing, prolonged expiration), total 0-6, validated in acute pediatric asthma ages 1-18 years."
    },
    inputs: [
      { id: "age_years", label: { es: "Edad", en: "Age" }, type: "number", required: true, unit: "años", min: 1, max: 18, step: 0.1 },
      {
        id: "work_of_breathing", label: { es: "Trabajo respiratorio", en: "Work of breathing" }, type: "single_choice", required: true,
        options: [option("work_0", "Ausente o leve", "None or mild", 0), option("work_1", "Moderado", "Moderate", 1), option("work_2", "Grave", "Severe", 2)]
      },
      {
        id: "wheezing", label: { es: "Sibilancias", en: "Wheezing" }, type: "single_choice", required: true,
        options: [option("wheeze_0", "Ausentes o leves", "None or mild", 0), option("wheeze_1", "Moderadas", "Moderate", 1), option("wheeze_2", "Graves o ausentes por intercambio aéreo muy pobre", "Severe or absent because of poor air exchange", 2)]
      },
      {
        id: "prolonged_expiration", label: { es: "Prolongación de la espiración", en: "Prolongation of expiration" }, type: "single_choice", required: true,
        options: [option("expiration_0", "Normal o levemente prolongada", "Normal or mildly prolonged", 0), option("expiration_1", "Moderadamente prolongada", "Moderately prolonged", 1), option("expiration_2", "Muy prolongada", "Severely prolonged", 2)]
      }
    ]
  },
  risc: {
    validationNotes: {
      es: "Implementación de la variante original RISC para niños VIH negativos menores de 24 meses hospitalizados con infección respiratoria baja.",
      en: "Implementation of the original RISC variant for HIV-negative children under 24 months hospitalized with lower respiratory tract infection."
    },
    inputs: [
      { id: "age_months", label: { es: "Edad", en: "Age" }, type: "number", required: true, unit: "meses", min: 0, max: 23.99, step: 0.1 },
      booleanInput("hiv_negative", { es: "VIH negativo", en: "HIV negative" }),
      { id: "spo2_room_air", label: { es: "SatO₂ en aire ambiente", en: "Room-air SpO₂" }, type: "number", required: true, unit: "%", min: 0, max: 100, step: 1 },
      booleanInput("chest_indrawing", { es: "Tiraje torácico", en: "Chest indrawing" }),
      booleanInput("wheezing", { es: "Sibilancias", en: "Wheezing" }),
      booleanInput("refusing_feeds", { es: "Rechazo de tomas", en: "Refusing feeds" }),
      { id: "weight_for_age_z", label: { es: "Z-score peso/edad OMS", en: "WHO weight-for-age Z-score" }, type: "number", required: true, min: -10, max: 5, step: 0.01 }
    ]
  },
  psofa: {
    validationNotes: {
      es: "pSOFA completo de seis sistemas, 0-24 puntos, con umbrales pediátricos por edad para PAM y creatinina y opción PaO₂/FiO₂ o SpO₂/FiO₂.",
      en: "Complete six-system pSOFA, 0-24 points, with pediatric age-specific MAP and creatinine thresholds and PaO₂/FiO₂ or SpO₂/FiO₂ respiratory scoring."
    },
    inputs: [
      { id:"age_months", label:{es:"Edad",en:"Age"}, type:"number", required:true, unit:"meses", min:0, max:300, step:0.1 },
      { id:"pao2_fio2_ratio", label:{es:"PaO₂/FiO₂",en:"PaO₂/FiO₂"}, type:"number", required:false, min:0, max:1000, step:1 },
      { id:"spo2_fio2_ratio", label:{es:"SpO₂/FiO₂",en:"SpO₂/FiO₂"}, type:"number", required:false, min:0, max:1000, step:1 },
      booleanInput("respiratory_support",{es:"Soporte respiratorio",en:"Respiratory support"}),
      { id:"platelets_10e3_ul", label:{es:"Plaquetas",en:"Platelets"}, type:"number", required:true, unit:"×10³/µL", min:0, max:1500, step:1 },
      { id:"bilirubin_mg_dl", label:{es:"Bilirrubina total",en:"Total bilirubin"}, type:"number", required:true, unit:"mg/dL", min:0, max:100, step:0.1 },
      { id:"map_mmhg", label:{es:"PAM",en:"MAP"}, type:"number", required:true, unit:"mmHg", min:0, max:200, step:1 },
      { id:"dopamine_mcg_kg_min", label:{es:"Dopamina",en:"Dopamine"}, type:"number", required:true, unit:"µg/kg/min", min:0, max:100, step:0.1 },
      booleanInput("dobutamine_any_dose",{es:"Dobutamina a cualquier dosis",en:"Dobutamine at any dose"}),
      { id:"epinephrine_mcg_kg_min", label:{es:"Adrenalina",en:"Epinephrine"}, type:"number", required:true, unit:"µg/kg/min", min:0, max:10, step:0.01 },
      { id:"norepinephrine_mcg_kg_min", label:{es:"Noradrenalina",en:"Norepinephrine"}, type:"number", required:true, unit:"µg/kg/min", min:0, max:10, step:0.01 },
      { id:"gcs", label:{es:"Glasgow",en:"GCS"}, type:"number", required:true, min:3, max:15, step:1 },
      { id:"creatinine_mg_dl", label:{es:"Creatinina",en:"Creatinine"}, type:"number", required:true, unit:"mg/dL", min:0, max:20, step:0.01 }
    ]
  },
    pelod_2: {
    validationNotes: {
      es: "PELOD-2 completo con diez variables y umbrales dependientes de edad para PAM y creatinina. La salida incluye puntaje 0-33 y la probabilidad derivada del modelo logístico publicado.",
      en: "Complete PELOD-2 with ten variables and age-dependent MAP and creatinine thresholds. Output includes the 0-33 score and probability from the published logistic model."
    },
    inputs: [
      { id: "age_months", label: { es: "Edad", en: "Age" }, type: "number", required: true, unit: "meses", min: 0, max: 240, step: 0.01 },
      { id: "gcs", label: { es: "Glasgow", en: "Glasgow Coma Scale" }, type: "number", required: true, min: 3, max: 15, step: 1 },
      booleanInput("both_pupils_fixed", { es: "Ambas pupilas fijas", en: "Both pupils fixed" }),
      { id: "lactate_mmol_l", label: { es: "Lactato", en: "Lactate" }, type: "number", required: true, unit: "mmol/L", min: 0, max: 50, step: 0.1 },
      { id: "map_mmhg", label: { es: "Presión arterial media", en: "Mean arterial pressure" }, type: "number", required: true, unit: "mmHg", min: 0, max: 200, step: 1 },
      { id: "creatinine_umol_l", label: { es: "Creatinina", en: "Creatinine" }, type: "number", required: true, unit: "µmol/L", min: 0, max: 2000, step: 1 },
      { id: "pao2_mmhg", label: { es: "PaO₂", en: "PaO₂" }, type: "number", required: true, unit: "mmHg", min: 1, max: 800, step: 1 },
      { id: "fio2_fraction", label: { es: "FiO₂", en: "FiO₂" }, type: "number", required: true, unit: "0-1", min: 0.21, max: 1, step: 0.01 },
      { id: "paco2_mmhg", label: { es: "PaCO₂", en: "PaCO₂" }, type: "number", required: true, unit: "mmHg", min: 0, max: 250, step: 1 },
      booleanInput("invasive_ventilation", { es: "Ventilación mecánica invasiva", en: "Invasive mechanical ventilation" }),
      { id: "wbc_10e9_l", label: { es: "Leucocitos", en: "White blood cells" }, type: "number", required: true, unit: "×10⁹/L", min: 0, max: 100, step: 0.1 },
      { id: "platelets_10e9_l", label: { es: "Plaquetas", en: "Platelets" }, type: "number", required: true, unit: "×10⁹/L", min: 0, max: 1500, step: 1 }
    ]
  },
  pim3: {
    validationNotes: {
      es: "Implementación de la ecuación PIM3 completa con coeficientes publicados y salida de probabilidad de mortalidad poblacional.",
      en: "Implementation of the complete published PIM3 equation with population-level mortality probability output."
    },
    inputs: [
      booleanInput("both_pupils_fixed", { es: "Ambas pupilas fijas y >3 mm", en: "Both pupils fixed and >3 mm" }),
      booleanInput("elective_admission", { es: "Ingreso electivo", en: "Elective admission" }),
      booleanInput("mechanical_ventilation_first_hour", { es: "Asistencia respiratoria mecánica en la primera hora", en: "Mechanical respiratory assistance in first hour" }),
      booleanInput("base_excess_unknown", { es: "Exceso de bases desconocido (PIM3 usa 0)", en: "Base excess unknown (PIM3 uses 0)" }),
      { id: "base_excess_mmol_l", label: { es: "Exceso de bases", en: "Base excess" }, type: "number", required: false, unit: "mmol/L", min: -50, max: 50, step: 0.1 },
      booleanInput("sbp_unknown", { es: "PAS desconocida (PIM3 usa 120 mmHg)", en: "SBP unknown (PIM3 uses 120 mmHg)" }),
      { id: "systolic_bp_mmhg", label: { es: "PAS (0 si parada; 30 si shock y no medible)", en: "SBP (0 in cardiac arrest; 30 if shock and unmeasurable)" }, type: "number", required: false, unit: "mmHg", min: 0, max: 250, step: 1 },
      booleanInput("oxygenation_unknown", { es: "FiO₂/PaO₂ desconocidas (PIM3 usa 0,23)", en: "FiO₂/PaO₂ unknown (PIM3 uses 0.23)" }),
      { id: "fio2_fraction", label: { es: "FiO₂", en: "FiO₂" }, type: "number", required: false, unit: "0-1", min: 0.21, max: 1, step: 0.01 },
      { id: "pao2_mmhg", label: { es: "PaO₂", en: "PaO₂" }, type: "number", required: false, unit: "mmHg", min: 1, max: 800, step: 1 },
      {
        id: "procedure_category", label: { es: "Recuperación de procedimiento", en: "Procedure recovery" }, type: "select", required: true,
        options: [option("none", "No", "None"), option("cardiac_bypass", "Cirugía cardiaca con bypass", "Cardiac surgery with bypass"), option("cardiac_no_bypass", "Procedimiento cardiaco sin bypass", "Cardiac procedure without bypass"), option("noncardiac", "Procedimiento no cardiaco", "Noncardiac procedure")]
      },
      {
        id: "diagnosis_risk_group", label: { es: "Grupo diagnóstico PIM3", en: "PIM3 diagnostic risk group" }, type: "select", required: true,
        options: [
          option("none", "Ninguno / duda", "None / uncertain"),
          option("low", "Bajo: asma, bronquiolitis, crup, SAOS, CAD, convulsiones", "Low: asthma, bronchiolitis, croup, OSA, DKA, seizure disorder"),
          option("high", "Alto: HIC espontánea, miocarditis/cardiomiopatía, HLHS, neurodegenerativa, NEC", "High: spontaneous cerebral hemorrhage, cardiomyopathy/myocarditis, HLHS, neurodegenerative disorder, NEC"),
          option("very_high", "Muy alto: parada pre-UCI, SCID, leucemia/linfoma posinducción, TMO, fallo hepático", "Very high: pre-ICU cardiac arrest, SCID, leukemia/lymphoma post-induction, BMT, liver failure")
        ]
      }
    ]
  },
  prism_iv: {
    validationNotes: {
      es: "PRISM IV completo: PedsCore calcula internamente los subpuntajes fisiológicos neurológico y no neurológico PRISM y aplica la ecuación PRISM IV de dominio público.",
      en: "Complete PRISM IV: PedsCore internally calculates neurologic and non-neurologic PRISM physiologic subscores and applies the public-domain PRISM IV equation."
    },
    inputs: [
      { id: "age_days", label: { es: "Edad", en: "Age" }, type: "number", required: true, unit: "días", min: 0, max: 6575, step: 1 },
      {
        id: "admission_source", label: { es: "Procedencia del ingreso", en: "Admission source" }, type: "select", required: true,
        options: [option("other", "Otra / referencia", "Other / reference"), option("other_hospital", "Otro hospital", "Another hospital"), option("inpatient_unit", "Unidad de hospitalización", "Inpatient unit"), option("emergency_department", "Urgencias", "Emergency department")]
      },
      booleanInput("cpr_within_24h", { es: "RCP en las 24 h previas al ingreso", en: "CPR within 24 h before admission" }),
      booleanInput("cancer", { es: "Cáncer agudo o crónico", en: "Acute or chronic cancer" }),
      booleanInput("low_risk_primary_system", { es: "Sistema primario de bajo riesgo: endocrino, hematológico, musculoesquelético o renal", en: "Low-risk primary system: endocrine, hematologic, musculoskeletal, or renal" }),
      { id: "systolic_bp_mmhg", label: { es: "PAS mínima", en: "Lowest systolic BP" }, type: "number", required: true, unit: "mmHg", min: 0, max: 250, step: 1 },
      { id: "heart_rate", label: { es: "FC máxima", en: "Highest heart rate" }, type: "number", required: true, unit: "lpm", min: 0, max: 350, step: 1 },
      { id: "temperature_c", label: { es: "Temperatura más extrema", en: "Most extreme temperature" }, type: "number", required: true, unit: "°C", min: 20, max: 45, step: 0.1 },
      { id: "gcs", label: { es: "GCS mínimo", en: "Lowest GCS" }, type: "number", required: true, min: 3, max: 15, step: 1 },
      {
        id: "pupil_status", label: { es: "Respuesta pupilar más patológica", en: "Worst pupillary response" }, type: "select", required: true,
        options: [option("reactive", "Ambas reactivas", "Both reactive"), option("one_fixed", "Una fija >3 mm", "One fixed >3 mm"), option("both_fixed", "Ambas fijas >3 mm", "Both fixed >3 mm")]
      },
      { id: "ph_lowest", label: { es: "pH mínimo", en: "Lowest pH" }, type: "number", required: true, min: 6.5, max: 8, step: 0.01 },
      { id: "ph_highest", label: { es: "pH máximo", en: "Highest pH" }, type: "number", required: true, min: 6.5, max: 8, step: 0.01 },
      { id: "total_co2_lowest_mmol_l", label: { es: "CO₂ total mínimo", en: "Lowest total CO₂" }, type: "number", required: true, unit: "mmol/L", min: 0, max: 60, step: 0.1 },
      { id: "total_co2_highest_mmol_l", label: { es: "CO₂ total máximo", en: "Highest total CO₂" }, type: "number", required: true, unit: "mmol/L", min: 0, max: 60, step: 0.1 },
      { id: "paco2_mmhg", label: { es: "PaCO₂ máxima", en: "Highest PaCO₂" }, type: "number", required: true, unit: "mmHg", min: 0, max: 250, step: 1 },
      { id: "pao2_mmhg", label: { es: "PaO₂ mínima", en: "Lowest PaO₂" }, type: "number", required: true, unit: "mmHg", min: 0, max: 800, step: 1 },
      { id: "glucose_mg_dl", label: { es: "Glucosa máxima", en: "Highest glucose" }, type: "number", required: true, unit: "mg/dL", min: 0, max: 1500, step: 1 },
      { id: "potassium_mmol_l", label: { es: "Potasio máximo", en: "Highest potassium" }, type: "number", required: true, unit: "mmol/L", min: 0, max: 15, step: 0.1 },
      { id: "creatinine_mg_dl", label: { es: "Creatinina máxima", en: "Highest creatinine" }, type: "number", required: true, unit: "mg/dL", min: 0, max: 20, step: 0.01 },
      { id: "bun_mg_dl", label: { es: "BUN máximo", en: "Highest BUN" }, type: "number", required: true, unit: "mg/dL", min: 0, max: 250, step: 0.1 },
      { id: "wbc_per_mm3", label: { es: "Leucocitos mínimos", en: "Lowest WBC" }, type: "number", required: true, unit: "/mm³", min: 0, max: 200000, step: 1 },
      { id: "platelets_per_mm3", label: { es: "Plaquetas mínimas", en: "Lowest platelets" }, type: "number", required: true, unit: "/mm³", min: 0, max: 1500000, step: 1 },
      { id: "pt_seconds", label: { es: "TP máximo", en: "Highest PT" }, type: "number", required: true, unit: "s", min: 0, max: 200, step: 0.1 },
      { id: "ptt_seconds", label: { es: "TTPa máximo", en: "Highest PTT" }, type: "number", required: true, unit: "s", min: 0, max: 300, step: 0.1 }
    ]
  },
  strongkids: {
    validationNotes: {
      es: "Implementación local independiente de STRONGkids con redacción propia y ponderación publicada 1+2+1+1: valoración clínica subjetiva (1), enfermedad de alto riesgo/cirugía mayor prevista (2), ingesta reducida o pérdidas relevantes (1) y pérdida de peso o ganancia insuficiente (1). No reproduce el formulario original.",
      en: "Independent local STRONGkids implementation with independently worded items and the published 1+2+1+1 weighting: subjective clinical assessment (1), high-risk disease/planned major surgery (2), reduced intake or relevant losses (1), and weight loss or poor weight gain (1). It does not reproduce the original form."
    },
    inputs: [
      booleanInput("poor_nutritional_status", { es: "Mal estado nutricional en valoración clínica subjetiva", en: "Poor nutritional status on subjective clinical assessment" }),
      booleanInput("high_risk_disease", { es: "Enfermedad de alto riesgo nutricional o cirugía mayor prevista", en: "High nutritional-risk disease or planned major surgery" }),
      booleanInput("reduced_intake_or_losses", { es: "Ingesta reducida o pérdidas relevantes", en: "Reduced intake or relevant losses" }),
      booleanInput("weight_loss_or_poor_gain", { es: "Pérdida de peso o ganancia ponderal insuficiente", en: "Weight loss or poor weight gain" })
    ],
    interpretationBands: [
      { id: "low", label: { es: "Riesgo nutricional bajo", en: "Low nutritional risk" }, min: 0, max: 0 },
      { id: "moderate", label: { es: "Riesgo nutricional moderado", en: "Moderate nutritional risk" }, min: 1, max: 3 },
      { id: "high", label: { es: "Riesgo nutricional alto", en: "High nutritional risk" }, min: 4, max: 5 }
    ]
  },
  step_by_step: {
    validationNotes: {
      es: "Implementación local del enfoque Step-by-Step para lactantes de hasta 90 días con fiebre sin foco. La clasificación es secuencial: mal aspecto, edad ≤21 días, leucocituria o PCT ≥0,5 ng/mL = alto riesgo; si esos criterios son negativos, PCR >20 mg/L o ANC >10.000/mm³ = riesgo intermedio; si todos son negativos = bajo riesgo.",
      en: "Local Step-by-Step implementation for infants up to 90 days with fever without source. Classification is sequential: ill appearance, age ≤21 days, leukocyturia, or PCT ≥0.5 ng/mL = high risk; if those are negative, CRP >20 mg/L or ANC >10,000/mm³ = intermediate risk; if all are negative = low risk."
    },
    inputs: [
      { id: "age_days", label: { es: "Edad", en: "Age" }, type: "number", required: true, unit: "días", min: 0, max: 90, step: 1 },
      booleanInput("fever_without_source", { es: "Fiebre sin foco aparente", en: "Fever without an apparent source" }),
      booleanInput("well_appearing", { es: "Buen estado general", en: "Well appearing" }),
      booleanInput("leukocyturia", { es: "Leucocituria", en: "Leukocyturia" }),
      { id: "procalcitonin_ng_ml", label: { es: "Procalcitonina", en: "Procalcitonin" }, type: "number", required: true, unit: "ng/mL", min: 0, max: 100, step: 0.01 },
      { id: "crp_mg_l", label: { es: "PCR", en: "CRP" }, type: "number", required: true, unit: "mg/L", min: 0, max: 500, step: 0.1 },
      { id: "anc", label: { es: "Recuento absoluto de neutrófilos", en: "Absolute neutrophil count" }, type: "number", required: true, unit: "/mm3", min: 0, max: 100000, step: 1 }
    ],
    interpretationBands: [
      { id: "low", label: { es: "Bajo riesgo", en: "Low risk" }, min: 0, max: 0 },
      { id: "intermediate", label: { es: "Riesgo intermedio", en: "Intermediate risk" }, min: 1, max: 1 },
      { id: "high", label: { es: "Alto riesgo", en: "High risk" }, min: 2, max: 2 }
    ]
  },
  modified_tal: {
    validationNotes: {
      es: "Implementación local de la escala de Tal modificada usada para valorar gravedad de bronquiolitis/dificultad respiratoria obstructiva. La variante seleccionada utiliza FR ajustada por edad, sibilancias/crepitantes, retracciones y SatO₂.",
      en: "Local implementation of the Modified Tal score used to assess bronchiolitis/obstructive respiratory-distress severity. The selected variant uses age-adjusted respiratory rate, wheeze/crackles, retractions, and SpO₂."
    },
    calculationNotes: {
      es: "Cada dominio puntúa 0-3; total 0-12. PedsCore usa bandas descriptivas 0-4 leve, 5-8 moderada y 9-12 grave.",
      en: "Each domain scores 0-3; total 0-12. PedsCore uses descriptive bands 0-4 mild, 5-8 moderate, and 9-12 severe."
    },
    inputs: [
      { id: "age_months", label: { es: "Edad", en: "Age" }, type: "number", required: true, unit: "meses", min: 0, max: 36, step: 0.1 },
      { id: "respiratory_rate", label: { es: "Frecuencia respiratoria", en: "Respiratory rate" }, type: "number", required: true, unit: "rpm", min: 0, max: 150, step: 1 },
      {
        id: "wheeze_crackles",
        label: { es: "Sibilancias / crepitantes", en: "Wheeze / crackles" },
        type: "single_choice",
        required: true,
        options: [
          option("wheeze_0", "No", "None", 0),
          option("wheeze_1", "Sibilancias solo en espiración", "Expiratory wheeze only", 1),
          option("wheeze_2", "Inspiratorias y espiratorias, audibles con estetoscopio", "Inspiratory and expiratory, audible with stethoscope", 2),
          option("wheeze_3", "Inspiratorias y espiratorias, audibles sin estetoscopio", "Inspiratory and expiratory, audible without stethoscope", 3)
        ]
      },
      {
        id: "retractions",
        label: { es: "Retracciones", en: "Retractions" },
        type: "single_choice",
        required: true,
        options: [
          option("retractions_0", "No", "None", 0),
          option("retractions_1", "Leves: subcostales/intercostales", "Mild: subcostal/intercostal", 1),
          option("retractions_2", "Moderadas: intercostales", "Moderate: intercostal", 2),
          option("retractions_3", "Intensas: intercostales y supraesternales; cabeceo", "Severe: intercostal and suprasternal; head bobbing", 3)
        ]
      },
      { id: "spo2", label: { es: "Saturación de oxígeno", en: "Oxygen saturation" }, type: "number", required: true, unit: "%", min: 0, max: 100, step: 1 }
    ],
    interpretationBands: [
      { id: "mild", label: { es: "Leve", en: "Mild" }, min: 0, max: 4 },
      { id: "moderate", label: { es: "Moderada", en: "Moderate" }, min: 5, max: 8 },
      { id: "severe", label: { es: "Grave", en: "Severe" }, min: 9, max: 12 }
    ]
  },
  taussig_croup: {
    validationNotes: {
      es: "Implementación local de la escala de Taussig para laringitis/crup a partir de la publicación original y de la tabla reproducida por SEUP.",
      en: "Local Taussig croup-score implementation based on the original publication and the table reproduced by SEUP."
    },
    calculationNotes: {
      es: "Suma estridor, entrada de aire, color, retracciones y conciencia (0-15). La categoría extrema de estridor incluye estridor intenso o ausencia de estridor en contexto de obstrucción grave.",
      en: "Sums stridor, air entry, color, retractions, and consciousness (0-15). The extreme stridor category includes intense or absent stridor in severe obstruction."
    },
    inputs: [
      {
        id: "stridor",
        label: { es: "Estridor", en: "Stridor" },
        type: "single_choice",
        required: true,
        options: [
          option("stridor_0", "No", "None", 0),
          option("stridor_1", "Leve", "Mild", 1),
          option("stridor_2", "Moderado", "Moderate", 2),
          option("stridor_3", "Intenso o ausente con obstrucción grave", "Intense or absent with severe obstruction", 3)
        ]
      },
      {
        id: "air_entry",
        label: { es: "Entrada de aire", en: "Air entry" },
        type: "single_choice",
        required: true,
        options: [
          option("air_0", "Normal", "Normal", 0),
          option("air_1", "Levemente disminuida", "Slightly decreased", 1),
          option("air_2", "Disminuida", "Decreased", 2),
          option("air_3", "Muy disminuida", "Markedly decreased", 3)
        ]
      },
      {
        id: "color",
        label: { es: "Coloración", en: "Color" },
        type: "single_choice",
        required: true,
        options: [
          option("color_0", "Normal", "Normal", 0),
          option("color_3", "Cianosis", "Cyanosis", 3)
        ]
      },
      {
        id: "retractions",
        label: { es: "Retracciones", en: "Retractions" },
        type: "single_choice",
        required: true,
        options: [
          option("taussig_ret_0", "No", "None", 0),
          option("taussig_ret_1", "Escasas / leves", "Slight / mild", 1),
          option("taussig_ret_2", "Moderadas", "Moderate", 2),
          option("taussig_ret_3", "Intensas", "Severe", 3)
        ]
      },
      {
        id: "consciousness",
        label: { es: "Estado de conciencia", en: "Level of consciousness" },
        type: "single_choice",
        required: true,
        options: [
          option("conscious_0", "Normal", "Normal", 0),
          option("conscious_1", "Decaído / intranquilo al molestar", "Mildly affected / restless when disturbed", 1),
          option("conscious_2", "Deprimido / agitado", "Depressed / agitated", 2),
          option("conscious_3", "Letargia / somnolencia", "Lethargic / drowsy", 3)
        ]
      }
    ],
    interpretationBands: [
      { id: "mild", label: { es: "Leve", en: "Mild" }, min: 0, max: 4 },
      { id: "mild_moderate", label: { es: "Leve-moderada", en: "Mild-moderate" }, min: 5, max: 6 },
      { id: "moderate", label: { es: "Moderada", en: "Moderate" }, min: 7, max: 8 },
      { id: "severe", label: { es: "Grave", en: "Severe" }, min: 9, max: 15 }
    ]
  },
  ckid_u25: {
    validationNotes: {
      es: "Implementacion local trazada a las ecuaciones CKiD U25 publicadas y a los coeficientes oficiales NIDDK para 1-25 anos. Permite creatinina, cistatina C o el promedio de ambas estimaciones.",
      en: "Local implementation traced to the published CKiD U25 equations and official NIDDK coefficients for ages 1-25. Supports creatinine, cystatin C, or the average of both estimates."
    },
    calculationNotes: {
      es: "CKiD U25 estima eGFR en personas de 1 a 25 anos. Si se introducen creatinina y cistatina C, PedsCore muestra el promedio de ambas estimaciones, preferido por NIDDK cuando ambos marcadores estan disponibles.",
      en: "CKiD U25 estimates eGFR in people aged 1 to 25 years. When creatinine and cystatin C are both entered, PedsCore reports the average of both estimates, preferred by NIDDK when both markers are available."
    },
    inputs: [
      { id: "age_years", label: { es: "Edad", en: "Age" }, type: "number", required: true, unit: "anos", min: 1, max: 25, step: 0.1 },
      {
        id: "sex",
        label: { es: "Sexo para coeficiente de la ecuacion", en: "Sex for equation coefficient" },
        type: "select",
        required: true,
        options: [
          option("female", "Femenino", "Female"),
          option("male", "Masculino", "Male")
        ]
      },
      { id: "height_cm", label: { es: "Talla (para ecuacion con creatinina)", en: "Height (for creatinine equation)" }, type: "number", required: false, unit: "cm", min: 30, max: 230, step: 0.1 },
      { id: "serum_creatinine", label: { es: "Creatinina serica", en: "Serum creatinine" }, type: "number", required: false, min: 0.01, max: 20, step: 0.01 },
      {
        id: "creatinine_unit",
        label: { es: "Unidad de creatinina", en: "Creatinine unit" },
        type: "select",
        required: false,
        options: [
          option("mg_dl", "mg/dL", "mg/dL"),
          option("umol_l", "umol/L", "umol/L")
        ]
      },
      { id: "cystatin_c_mg_l", label: { es: "Cistatina C", en: "Cystatin C" }, type: "number", required: false, unit: "mg/L", min: 0.1, max: 10, step: 0.01 }
    ],
    scoringTable: [
      {
        id: "ckid_u25_creatinine",
        variable: { es: "CKiD U25 creatinina", en: "CKiD U25 creatinine" },
        value: "eGFR = k × (height[m] / SCr[mg/dL])",
        description: { es: "k depende de edad y sexo segun la tabla oficial NIDDK.", en: "k depends on age and sex according to the official NIDDK table." }
      },
      {
        id: "ckid_u25_cystatin",
        variable: { es: "CKiD U25 cistatina C", en: "CKiD U25 cystatin C" },
        value: "eGFR = k × (1 / cystatin C)",
        description: { es: "k depende de edad y sexo; si ambos marcadores estan disponibles se promedian ambas eGFR.", en: "k depends on age and sex; when both markers are available the two eGFR estimates are averaged." }
      }
    ]
  },
  prifle: {
    validationNotes: {
      es: "Criterios R/I/F implementados desde la publicacion original y tabla abierta de verificacion. L y E se muestran solo cuando se declara duracion de fallo renal persistente de al menos 4 o 12 semanas.",
      en: "R/I/F criteria implemented from the original publication and an open verification table. L and E are shown only when persistent renal failure duration of at least 4 or 12 weeks is explicitly entered."
    },
    calculationNotes: {
      es: "Clasifica por el peor criterio entre descenso de eCCl y diuresis. Requiere un eCCl basal fiable; la categoria puede cambiar si el basal o el metodo de estimacion cambian.",
      en: "Classifies by the worst criterion between eCCl decline and urine output. A reliable baseline eCCl is required; classification can change if the baseline or estimation method changes."
    },
    inputs: [
      { id: "baseline_eccl", label: { es: "eCCl basal", en: "Baseline eCCl" }, type: "number", required: true, unit: "mL/min/1.73 m2", min: 1, max: 250, step: 0.1 },
      { id: "current_eccl", label: { es: "eCCl actual", en: "Current eCCl" }, type: "number", required: true, unit: "mL/min/1.73 m2", min: 0, max: 250, step: 0.1 },
      { id: "urine_output_ml_kg_h", label: { es: "Diuresis", en: "Urine output" }, type: "number", required: true, unit: "mL/kg/h", min: 0, max: 20, step: 0.01 },
      { id: "urine_duration_hours", label: { es: "Duracion de ese nivel de diuresis", en: "Duration at that urine-output level" }, type: "number", required: true, unit: "h", min: 0, max: 168, step: 0.5 },
      { id: "anuria_hours", label: { es: "Horas de anuria", en: "Hours of anuria" }, type: "number", required: true, unit: "h", min: 0, max: 168, step: 0.5 },
      { id: "persistent_failure_weeks", label: { es: "Semanas de fallo renal persistente", en: "Weeks of persistent renal failure" }, type: "number", required: true, unit: "semanas", min: 0, max: 104, step: 0.5 }
    ],
    interpretationBands: [
      { id: "none", label: { es: "Sin criterio pRIFLE", en: "No pRIFLE criterion" }, min: 0, max: 0 },
      { id: "risk", label: { es: "R · Risk", en: "R · Risk" }, min: 1, max: 1 },
      { id: "injury", label: { es: "I · Injury", en: "I · Injury" }, min: 2, max: 2 },
      { id: "failure", label: { es: "F · Failure", en: "F · Failure" }, min: 3, max: 3 },
      { id: "loss", label: { es: "L · Loss", en: "L · Loss" }, min: 4, max: 4 },
      { id: "end_stage", label: { es: "E · End-stage", en: "E · End-stage" }, min: 5, max: 5 }
    ]
  },
  kdigo_pediatric: {
    validationNotes: {
      es: "Implementacion local de la clasificacion KDIGO 2012 publicada para LRA, incluida la regla pediatrica de eGFR <35 mL/min/1.73 m2 en menores de 18 anos para estadio 3. La actualizacion KDIGO 2026 permanece en borrador publico.",
      en: "Local implementation of the published KDIGO 2012 AKI staging, including the pediatric eGFR <35 mL/min/1.73 m2 stage-3 rule for patients under 18. The KDIGO 2026 update remains a public draft."
    },
    calculationNotes: {
      es: "El estadio final es el peor criterio entre creatinina/eGFR y diuresis. PedsCore solo aplica +0,3 mg/dL si se confirma un incremento en 48 h y los criterios por razon si el basal corresponde a los 7 dias previos.",
      en: "Final stage is the worst criterion across creatinine/eGFR and urine output. PedsCore only applies the +0.3 mg/dL rule when a rise within 48 hours is confirmed and ratio criteria when the baseline is from the prior 7 days."
    },
    inputs: [
      { id: "baseline_creatinine_mg_dl", label: { es: "Creatinina basal", en: "Baseline creatinine" }, type: "number", required: true, unit: "mg/dL", min: 0.05, max: 20, step: 0.01 },
      { id: "current_creatinine_mg_dl", label: { es: "Creatinina actual", en: "Current creatinine" }, type: "number", required: true, unit: "mg/dL", min: 0.05, max: 20, step: 0.01 },
      { id: "age_years", label: { es: "Edad", en: "Age" }, type: "number", required: true, unit: "anos", min: 0, max: 21, step: 0.01 },
      { id: "current_egfr", label: { es: "eGFR actual (opcional)", en: "Current eGFR (optional)" }, type: "number", required: false, unit: "mL/min/1.73 m2", min: 0, max: 250, step: 0.1 },
      booleanInput("baseline_within_7_days", { es: "La creatinina basal corresponde a los 7 dias previos", en: "Baseline creatinine is from the prior 7 days" }),
      booleanInput("rise_within_48_hours", { es: "El incremento de creatinina se ha producido en 48 horas", en: "Creatinine rise occurred within 48 hours" }),
      { id: "urine_output_ml_kg_h", label: { es: "Diuresis", en: "Urine output" }, type: "number", required: true, unit: "mL/kg/h", min: 0, max: 20, step: 0.01 },
      { id: "urine_duration_hours", label: { es: "Duracion de ese nivel de diuresis", en: "Duration at that urine-output level" }, type: "number", required: true, unit: "h", min: 0, max: 168, step: 0.5 },
      { id: "anuria_hours", label: { es: "Horas de anuria", en: "Hours of anuria" }, type: "number", required: true, unit: "h", min: 0, max: 168, step: 0.5 },
      booleanInput("renal_replacement_therapy", { es: "Terapia renal sustitutiva iniciada", en: "Kidney replacement therapy initiated" })
    ],
    interpretationBands: [
      { id: "none", label: { es: "Sin criterio KDIGO de LRA con los datos introducidos", en: "No KDIGO AKI criterion with entered data" }, min: 0, max: 0 },
      { id: "stage_1", label: { es: "KDIGO estadio 1", en: "KDIGO stage 1" }, min: 1, max: 1 },
      { id: "stage_2", label: { es: "KDIGO estadio 2", en: "KDIGO stage 2" }, min: 2, max: 2 },
      { id: "stage_3", label: { es: "KDIGO estadio 3", en: "KDIGO stage 3" }, min: 3, max: 3 }
    ],
    scoringTable: [
      {
        id: "kdigo_worst_criterion",
        variable: { es: "Estadio KDIGO", en: "KDIGO stage" },
        value: "0-3",
        description: { es: "Se asigna el peor estadio alcanzado por creatinina/eGFR, terapia renal sustitutiva o diuresis.", en: "The worst stage reached by creatinine/eGFR, kidney replacement therapy, or urine output is assigned." }
      }
    ]
  },
  bedside_pews: {
    calculationNotes: {
      es: "Introduce edad en meses y las siete variables Bedside PEWS. FC, FR y PAS se puntuan con limites especificos por edad; relleno capilar, esfuerzo respiratorio, SpO2 y oxigenoterapia usan las categorias originales. Total 0-26. PedsCore no asocia el resultado a una pauta automatica de escalado.",
      en: "Enter age in months and the seven Bedside PEWS variables. Heart rate, respiratory rate, and systolic blood pressure use age-specific thresholds; capillary refill, respiratory effort, SpO2, and oxygen therapy use the original categories. Total 0-26. PedsCore does not attach an automated escalation pathway to the result."
    },
    inputs: [
      { id: "age_months", label: { es: "Edad", en: "Age" }, description: { es: "Edad cronologica en meses.", en: "Chronological age in months." }, type: "number", required: true, unit: "meses", min: 0, max: 216, step: 0.1 },
      { id: "heart_rate", label: { es: "Frecuencia cardiaca", en: "Heart rate" }, type: "number", required: true, unit: "lpm", min: 0, max: 300, step: 1 },
      { id: "systolic_bp", label: { es: "Presion arterial sistolica", en: "Systolic blood pressure" }, type: "number", required: true, unit: "mmHg", min: 0, max: 250, step: 1 },
      {
        id: "capillary_refill",
        label: { es: "Relleno capilar", en: "Capillary refill" },
        type: "single_choice",
        required: true,
        options: [
          option("crt_lt3", "<3 segundos", "<3 seconds", 0),
          option("crt_ge3", "≥3 segundos", "≥3 seconds", 4)
        ]
      },
      { id: "respiratory_rate", label: { es: "Frecuencia respiratoria", en: "Respiratory rate" }, type: "number", required: true, unit: "rpm", min: 0, max: 150, step: 1 },
      {
        id: "respiratory_effort",
        label: { es: "Esfuerzo respiratorio", en: "Respiratory effort" },
        type: "single_choice",
        required: true,
        options: [
          option("effort_normal", "Normal", "Normal", 0),
          option("effort_mild", "Aumento leve", "Mild increase", 1),
          option("effort_moderate", "Aumento moderado", "Moderate increase", 2),
          option("effort_severe", "Aumento grave o cualquier apnea", "Severe increase or any apnea", 4)
        ]
      },
      { id: "oxygen_saturation", label: { es: "Saturacion de oxigeno", en: "Oxygen saturation" }, type: "number", required: true, unit: "%", min: 0, max: 100, step: 1 },
      {
        id: "oxygen_therapy",
        label: { es: "Oxigenoterapia", en: "Oxygen therapy" },
        type: "single_choice",
        required: true,
        options: [
          option("oxygen_room_air", "Aire ambiente", "Room air", 0),
          option("oxygen_low", "Oxigeno: <4 L/min o FiO2 <50%", "Oxygen: <4 L/min or FiO2 <50%", 2),
          option("oxygen_high", "Oxigeno: ≥4 L/min o FiO2 ≥50%", "Oxygen: ≥4 L/min or FiO2 ≥50%", 4)
        ]
      }
    ],
    interpretationBands: [
      {
        id: "descriptive_0_7",
        label: { es: "Puntuacion por debajo del punto de corte 8 del estudio original", en: "Score below the original study threshold of 8" },
        min: 0,
        max: 7,
        description: {
          es: "No implica ausencia de deterioro. Interpretar tendencia y contexto clinico.",
          en: "Does not imply absence of deterioration. Interpret trend and clinical context."
        }
      },
      {
        id: "study_threshold_8_plus",
        label: { es: "Puntuacion ≥8: punto de corte evaluado en el estudio original", en: "Score ≥8: threshold evaluated in the original study" },
        min: 8,
        max: 26,
        description: {
          es: "En el estudio inicial, 8 tuvo sensibilidad 82% y especificidad 93%. No es una pauta universal de escalado.",
          en: "In the initial study, 8 had 82% sensitivity and 93% specificity. It is not a universal escalation rule."
        }
      }
    ],
    scoringTable: [
      {
        id: "bedside_pews_total",
        variable: { es: "Bedside PEWS total", en: "Total Bedside PEWS" },
        value: "0-26",
        description: {
          es: "Suma de FC, PAS, relleno capilar, FR, esfuerzo respiratorio, SpO2 y oxigenoterapia. Subpuntuaciones 0, 1, 2 o 4 segun la tabla original.",
          en: "Sum of heart rate, systolic BP, capillary refill, respiratory rate, respiratory effort, SpO2, and oxygen therapy. Subscores are 0, 1, 2, or 4 according to the original table."
        }
      }
    ]
  },
  cries: {
    calculationNotes: {
      es: "Selecciona 0, 1 o 2 en cada uno de los cinco dominios CRIES. La escala suma 0-10. PedsCore muestra como referencia secundaria: <5 por debajo del umbral de dolor moderado, 5-7 moderado y 8-10 grave. La escala fue desarrollada para dolor neonatal, especialmente postoperatorio; cualquier conducta analgesica debe seguir el protocolo local.",
      en: "Select 0, 1, or 2 for each of the five CRIES domains. The scale totals 0-10. PedsCore shows a secondary reference: <5 below the moderate-pain threshold, 5-7 moderate, and 8-10 severe. The scale was developed for neonatal pain, especially postoperative pain; analgesic management should follow local protocol."
    },
    inputs: [
      {
        id: "crying",
        label: { es: "Llanto", en: "Crying" },
        type: "single_choice",
        required: true,
        options: [
          option("crying_0", "Sin llanto", "No crying", 0),
          option("crying_1", "Llanto agudo presente", "High-pitched crying present", 1),
          option("crying_2", "Llanto persistente y dificil de consolar", "Persistent crying that is difficult to console", 2)
        ]
      },
      {
        id: "oxygen",
        label: { es: "Necesidad de oxigeno", en: "Oxygen requirement" },
        type: "single_choice",
        required: true,
        options: [
          option("oxygen_0", "Sin oxigeno suplementario", "No supplemental oxygen", 0),
          option("oxygen_1", "Requiere FiO2 inferior al 30%", "Requires FiO2 below 30%", 1),
          option("oxygen_2", "Requiere FiO2 del 30% o superior", "Requires FiO2 of 30% or greater", 2)
        ]
      },
      {
        id: "vital_signs",
        label: { es: "Aumento de constantes vitales", en: "Increase in vital signs" },
        type: "single_choice",
        required: true,
        options: [
          option("vital_0", "Frecuencia cardiaca y presion arterial en basal", "Heart rate and blood pressure at baseline", 0),
          option("vital_1", "Aumento inferior al 20% respecto al basal", "Increase below 20% from baseline", 1),
          option("vital_2", "Aumento del 20% o superior respecto al basal", "Increase of 20% or more from baseline", 2)
        ]
      },
      {
        id: "expression",
        label: { es: "Expresion facial", en: "Facial expression" },
        type: "single_choice",
        required: true,
        options: [
          option("expression_0", "Expresion relajada", "Relaxed expression", 0),
          option("expression_1", "Mueca de dolor", "Pain grimace", 1),
          option("expression_2", "Mueca marcada asociada a gemido", "Marked grimace accompanied by grunting", 2)
        ]
      },
      {
        id: "sleeplessness",
        label: { es: "Sueño / vigilia", en: "Sleep / wakefulness" },
        type: "single_choice",
        required: true,
        options: [
          option("sleep_0", "Duerme sin alteracion relevante", "Sleeps without relevant disturbance", 0),
          option("sleep_1", "Despertares frecuentes", "Frequent waking", 1),
          option("sleep_2", "Permanece despierto de forma continua", "Remains continuously awake", 2)
        ]
      }
    ],
    interpretationBands: [
      {
        id: "below_moderate_threshold",
        label: { es: "Por debajo del umbral de dolor moderado", en: "Below moderate-pain threshold" },
        min: 0,
        max: 4
      },
      {
        id: "moderate",
        label: { es: "Dolor moderado", en: "Moderate pain" },
        min: 5,
        max: 7
      },
      {
        id: "severe",
        label: { es: "Dolor grave", en: "Severe pain" },
        min: 8,
        max: 10
      }
    ],
    scoringTable: [
      {
        id: "cries_total",
        variable: { es: "Puntuacion CRIES total", en: "Total CRIES score" },
        value: "0-10",
        description: {
          es: "Suma de llanto, necesidad de oxigeno, aumento de constantes vitales, expresion facial y alteracion del sueño; cada dominio puntua 0-2.",
          en: "Sum of crying, oxygen requirement, increased vital signs, facial expression, and sleep disturbance; each domain scores 0-2."
        }
      }
    ]
  },
  thompson_hie: {
    calculationNotes: {
      es: "Introduce la puntuacion numerica de cada uno de los nueve dominios Thompson. Consulta la tabla de referencia enlazada en la pagina para asignar cada valor. Resultado 0-22. Convencion AAP mostrada: 0 sin anormalidades puntuadas, 1-10 leve, 11-14 moderada, 15-22 grave. Nota: algunas publicaciones usan 0-7 sin encefalopatia y 8-10 leve. Para seguimiento, el Thompson original se aplicaba de forma seriada y consideraba la puntuacion maxima diaria.",
      en: "Enter the numerical score for each of the nine Thompson domains. Use the linked reference table on the page to assign each value. Result 0-22. Displayed AAP convention: 0 no scored abnormalities, 1-10 mild, 11-14 moderate, 15-22 severe. Note: some publications use 0-7 no encephalopathy and 8-10 mild. For longitudinal assessment, the original Thompson approach used serial examinations and the highest daily score."
    },
    inputs: [
      { id: "tone", label: { es: "Tono", en: "Tone" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "consciousness", label: { es: "Nivel de conciencia", en: "Level of consciousness" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "seizures", label: { es: "Convulsiones", en: "Seizures" }, type: "number", required: true, min: 0, max: 2, step: 1 },
      { id: "posture", label: { es: "Postura", en: "Posture" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "moro", label: { es: "Reflejo de Moro", en: "Moro reflex" }, type: "number", required: true, min: 0, max: 2, step: 1 },
      { id: "grasp", label: { es: "Prension", en: "Grasp" }, type: "number", required: true, min: 0, max: 2, step: 1 },
      { id: "suck", label: { es: "Succion", en: "Suck" }, type: "number", required: true, min: 0, max: 2, step: 1 },
      { id: "respiration", label: { es: "Respiracion", en: "Respiration" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "fontanelle", label: { es: "Fontanela", en: "Fontanelle" }, type: "number", required: true, min: 0, max: 2, step: 1 }
    ],
    interpretationBands: [
      { id: "normal", label: { es: "Sin anormalidades puntuadas", en: "No scored abnormalities" }, min: 0, max: 0 },
      { id: "mild", label: { es: "Rango leve", en: "Mild range" }, min: 1, max: 10, description: { es: "Convencion AAP. Algunas publicaciones separan 0-7 como sin encefalopatia y 8-10 como leve.", en: "AAP convention. Some publications instead separate 0-7 as no encephalopathy and 8-10 as mild." } },
      { id: "moderate", label: { es: "Rango moderado", en: "Moderate range" }, min: 11, max: 14 },
      { id: "severe", label: { es: "Rango grave", en: "Severe range" }, min: 15, max: 22 }
    ],
    scoringTable: [
      {
        id: "thompson_total",
        variable: { es: "Thompson HIE Score total", en: "Total Thompson HIE Score" },
        value: "0-22",
        description: {
          es: "Suma de nueve dominios clinicos. El resultado principal es la puntuacion bruta; la categoria de gravedad es una interpretacion secundaria.",
          en: "Sum of nine clinical domains. The raw score is the primary result; the severity category is a secondary interpretation."
        }
      }
    ]
  },
  modified_sarnat_nichd: {
    calculationNotes: {
      es: "Selecciona para cada una de las seis categorias la gravedad clinica codificada como 0 normal, 1 leve, 2 moderada o 3 grave. El resultado es descriptivo y no constituye por si solo una indicacion terapeutica.",
      en: "For each of the six categories, select clinical severity coded as 0 normal, 1 mild, 2 moderate, or 3 severe. The result is descriptive and does not by itself constitute a treatment indication."
    },
    inputs: [
      { id: "level_of_consciousness", label: { es: "Nivel de conciencia", en: "Level of consciousness" }, type: "select", required: true, options: [
        { id: "normal", label: { es: "Normal", en: "Normal" }, value: 0, score: 0 },
        { id: "mild", label: { es: "Leve", en: "Mild" }, value: 1, score: 1 },
        { id: "moderate", label: { es: "Moderada", en: "Moderate" }, value: 2, score: 2 },
        { id: "severe", label: { es: "Grave", en: "Severe" }, value: 3, score: 3 }
      ] },
      { id: "spontaneous_activity", label: { es: "Actividad espontanea", en: "Spontaneous activity" }, type: "select", required: true, options: [
        { id: "normal", label: { es: "Normal", en: "Normal" }, value: 0, score: 0 },
        { id: "mild", label: { es: "Leve", en: "Mild" }, value: 1, score: 1 },
        { id: "moderate", label: { es: "Moderada", en: "Moderate" }, value: 2, score: 2 },
        { id: "severe", label: { es: "Grave", en: "Severe" }, value: 3, score: 3 }
      ] },
      { id: "posture", label: { es: "Postura", en: "Posture" }, type: "select", required: true, options: [
        { id: "normal", label: { es: "Normal", en: "Normal" }, value: 0, score: 0 },
        { id: "mild", label: { es: "Leve", en: "Mild" }, value: 1, score: 1 },
        { id: "moderate", label: { es: "Moderada", en: "Moderate" }, value: 2, score: 2 },
        { id: "severe", label: { es: "Grave", en: "Severe" }, value: 3, score: 3 }
      ] },
      { id: "tone", label: { es: "Tono", en: "Tone" }, type: "select", required: true, options: [
        { id: "normal", label: { es: "Normal", en: "Normal" }, value: 0, score: 0 },
        { id: "mild", label: { es: "Leve", en: "Mild" }, value: 1, score: 1 },
        { id: "moderate", label: { es: "Moderada", en: "Moderate" }, value: 2, score: 2 },
        { id: "severe", label: { es: "Grave", en: "Severe" }, value: 3, score: 3 }
      ] },
      { id: "primitive_reflexes", label: { es: "Reflejos primitivos", en: "Primitive reflexes" }, type: "select", required: true, options: [
        { id: "normal", label: { es: "Normal", en: "Normal" }, value: 0, score: 0 },
        { id: "mild", label: { es: "Leve", en: "Mild" }, value: 1, score: 1 },
        { id: "moderate", label: { es: "Moderada", en: "Moderate" }, value: 2, score: 2 },
        { id: "severe", label: { es: "Grave", en: "Severe" }, value: 3, score: 3 }
      ] },
      { id: "autonomic_system", label: { es: "Sistema autonomico", en: "Autonomic system" }, type: "select", required: true, options: [
        { id: "normal", label: { es: "Normal", en: "Normal" }, value: 0, score: 0 },
        { id: "mild", label: { es: "Leve", en: "Mild" }, value: 1, score: 1 },
        { id: "moderate", label: { es: "Moderada", en: "Moderate" }, value: 2, score: 2 },
        { id: "severe", label: { es: "Grave", en: "Severe" }, value: 3, score: 3 }
      ] }
    ],
    scoringTable: [
      {
        id: "modified_sarnat_total",
        variable: { es: "Total Sarnat Score", en: "Total Sarnat Score" },
        value: "0-18",
        description: {
          es: "Suma de las seis categorias codificadas 0-3.",
          en: "Sum of the six categories coded 0-3."
        }
      }
    ]
  },
  ballard: {
    calculationNotes: {
      es: "Consulta la lamina visual externa enlazada en esta pagina y escribe solo la puntuacion numerica de cada uno de los 12 signos. PedsCore suma madurez neuromuscular y fisica y convierte el total a semanas completas segun la tabla oficial New Ballard.",
      en: "Use the external visual reference linked on this page and enter only the numerical score for each of the 12 signs. PedsCore sums neuromuscular and physical maturity and converts the total to completed gestational weeks using the official New Ballard grid."
    },
    inputs: [
      { id: "posture", label: { es: "Postura", en: "Posture" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "square_window", label: { es: "Ventana cuadrada", en: "Square window" }, type: "number", required: true, min: -1, max: 4, step: 1 },
      { id: "arm_recoil", label: { es: "Retroceso del brazo", en: "Arm recoil" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "popliteal_angle", label: { es: "Angulo popliteo", en: "Popliteal angle" }, type: "number", required: true, min: -1, max: 5, step: 1 },
      { id: "scarf_sign", label: { es: "Signo de la bufanda", en: "Scarf sign" }, type: "number", required: true, min: -1, max: 4, step: 1 },
      { id: "heel_to_ear", label: { es: "Talon a oreja", en: "Heel to ear" }, type: "number", required: true, min: -1, max: 4, step: 1 },
      { id: "skin", label: { es: "Piel", en: "Skin" }, type: "number", required: true, min: -1, max: 5, step: 1 },
      { id: "lanugo", label: { es: "Lanugo", en: "Lanugo" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "plantar_surface", label: { es: "Superficie plantar", en: "Plantar surface" }, type: "number", required: true, min: -2, max: 4, step: 1 },
      { id: "breast", label: { es: "Mama", en: "Breast" }, type: "number", required: true, min: -1, max: 4, step: 1 },
      { id: "eye_ear", label: { es: "Ojo / oreja", en: "Eye / ear" }, type: "number", required: true, min: -2, max: 4, step: 1 },
      { id: "genitals", label: { es: "Genitales", en: "Genitals" }, type: "number", required: true, min: -1, max: 4, step: 1 }
    ],
    scoringTable: [
      {
        id: "ballard_total",
        variable: { es: "Puntuacion total New Ballard", en: "New Ballard total score" },
        value: "neuromuscular + physical",
        description: {
          es: "Suma de seis signos neuromusculares y seis signos de madurez fisica. PedsCore solicita solamente las puntuaciones numericas.",
          en: "Sum of six neuromuscular and six physical-maturity signs. PedsCore requests numerical scores only."
        }
      },
      {
        id: "ballard_completed_weeks",
        variable: { es: "Edad gestacional estimada", en: "Estimated gestational age" },
        value: "-10=20 weeks ... 50=44 weeks; interpolate to completed weeks",
        description: {
          es: "La tabla oficial avanza 2 semanas por cada 5 puntos. Para puntuaciones intermedias se registran semanas completas, redondeando hacia abajo, segun la FAQ oficial de Ballard.",
          en: "The official grid advances 2 weeks per 5 score points. Intermediate scores are recorded as completed weeks, rounding down, according to the official Ballard FAQ."
        }
      }
    ]
  },
  dubowitz: {
    calculationNotes: {
      es: "Introduce la puntuacion numerica ya asignada a cada uno de los 21 signos del metodo Dubowitz. PedsCore no reproduce las ilustraciones ni los descriptores originales. Total 0-70; edad gestacional estimada = 0,2642 x puntuacion total + 24,595 semanas.",
      en: "Enter the numerical score already assigned to each of the 21 Dubowitz signs. PedsCore does not reproduce the original illustrations or descriptors. Total 0-70; estimated gestational age = 0.2642 x total score + 24.595 weeks."
    },
    inputs: [
      { id: "posture", label: { es: "Postura", en: "Posture" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "square_window", label: { es: "Ventana cuadrada", en: "Square window" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "ankle_dorsiflexion", label: { es: "Dorsiflexion del tobillo", en: "Ankle dorsiflexion" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "arm_recoil", label: { es: "Retroceso del brazo", en: "Arm recoil" }, type: "number", required: true, min: 0, max: 2, step: 1 },
      { id: "leg_recoil", label: { es: "Retroceso de la pierna", en: "Leg recoil" }, type: "number", required: true, min: 0, max: 2, step: 1 },
      { id: "popliteal_angle", label: { es: "Angulo popliteo", en: "Popliteal angle" }, type: "number", required: true, min: 0, max: 5, step: 1 },
      { id: "heel_to_ear", label: { es: "Talon a oreja", en: "Heel to ear" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "scarf_sign", label: { es: "Signo de la bufanda", en: "Scarf sign" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "head_lag", label: { es: "Caida de la cabeza", en: "Head lag" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "ventral_suspension", label: { es: "Suspension ventral", en: "Ventral suspension" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "edema", label: { es: "Edema", en: "Edema" }, type: "number", required: true, min: 0, max: 2, step: 1 },
      { id: "skin_texture", label: { es: "Textura cutanea", en: "Skin texture" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "skin_color", label: { es: "Color cutaneo", en: "Skin color" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "skin_opacity", label: { es: "Opacidad cutanea", en: "Skin opacity" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "lanugo", label: { es: "Lanugo", en: "Lanugo" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "plantar_creases", label: { es: "Pliegues plantares", en: "Plantar creases" }, type: "number", required: true, min: 0, max: 4, step: 1 },
      { id: "nipple_formation", label: { es: "Formacion del pezon", en: "Nipple formation" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "breast_size", label: { es: "Tamano mamario", en: "Breast size" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "ear_form", label: { es: "Forma de la oreja", en: "Ear form" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "ear_firmness", label: { es: "Firmeza de la oreja", en: "Ear firmness" }, type: "number", required: true, min: 0, max: 3, step: 1 },
      { id: "genitals", label: { es: "Genitales", en: "Genitals" }, type: "number", required: true, min: 0, max: 2, step: 1 }
    ],
    scoringTable: [
      {
        id: "dubowitz_total",
        variable: { es: "Puntuacion total Dubowitz", en: "Total Dubowitz score" },
        value: "sum(21 item scores), range 0-70",
        description: {
          es: "Suma directa de los 10 signos neurologicos y 11 signos externos.",
          en: "Direct sum of the 10 neurological and 11 external sign scores."
        }
      },
      {
        id: "dubowitz_ga_regression",
        variable: { es: "Edad gestacional estimada", en: "Estimated gestational age" },
        value: "0.2642 x total score + 24.595 weeks",
        description: {
          es: "Ecuacion de regresion publicada para convertir la puntuacion total en semanas de gestacion.",
          en: "Published regression equation converting total score to gestational weeks."
        }
      }
    ]
  },
  pediatric_burn_tbsa: {
    calculationNotes: {
      es: "Estimacion descriptiva TBSA pediatrica por regiones numericas. Incluye solo quemaduras de espesor parcial y total; no incluye eritema superficial. No genera decisiones asistenciales.",
      en: "Descriptive pediatric TBSA estimate by numeric regions. Include only partial-thickness and full-thickness burns; do not include superficial erythema. Does not generate care decisions."
    },
    inputs: [
      {
        id: "age_band",
        label: { es: "Banda de edad", en: "Age band" },
        description: {
          es: "Selecciona la banda que corresponda a la tabla numerica pediatrica usada.",
          en: "Select the band corresponding to the pediatric numeric table used."
        },
        type: "select",
        required: true,
        options: [
          option("birth_to_1_year", "Lactante / 0 anos", "Infant / 0 years"),
          option("one_to_four_years", "1-4 anos", "1-4 years"),
          option("five_to_nine_years", "5-9 anos", "5-9 years"),
          option("ten_to_fourteen_years", "10-14 anos", "10-14 years"),
          option("fifteen_years", "15 anos", "15 years")
        ],
        helperText: {
          es: "No hay banda adulta en la tabla primaria usada para esta herramienta.",
          en: "The primary table used for this tool does not include an adult band."
        }
      },
      burnFractionInput("head", { es: "Cabeza", en: "Head" }),
      burnFractionInput("neck", { es: "Cuello", en: "Neck" }),
      burnFractionInput("anterior_trunk", {
        es: "Tronco anterior",
        en: "Anterior trunk"
      }),
      burnFractionInput("posterior_trunk", {
        es: "Tronco posterior",
        en: "Posterior trunk"
      }),
      burnFractionInput("right_buttock", {
        es: "Gluteo derecho",
        en: "Right buttock"
      }),
      burnFractionInput("left_buttock", {
        es: "Gluteo izquierdo",
        en: "Left buttock"
      }),
      burnFractionInput("genitalia", {
        es: "Genitales/perine",
        en: "Genitalia/perineum"
      }),
      burnFractionInput("right_upper_arm", {
        es: "Brazo derecho",
        en: "Right upper arm"
      }),
      burnFractionInput("left_upper_arm", {
        es: "Brazo izquierdo",
        en: "Left upper arm"
      }),
      burnFractionInput("right_lower_arm", {
        es: "Antebrazo derecho",
        en: "Right lower arm"
      }),
      burnFractionInput("left_lower_arm", {
        es: "Antebrazo izquierdo",
        en: "Left lower arm"
      }),
      burnFractionInput("right_hand", { es: "Mano derecha", en: "Right hand" }),
      burnFractionInput("left_hand", {
        es: "Mano izquierda",
        en: "Left hand"
      }),
      burnFractionInput("right_thigh", {
        es: "Muslo derecho",
        en: "Right thigh"
      }),
      burnFractionInput("left_thigh", {
        es: "Muslo izquierdo",
        en: "Left thigh"
      }),
      burnFractionInput("right_lower_leg", {
        es: "Pierna derecha",
        en: "Right lower leg"
      }),
      burnFractionInput("left_lower_leg", {
        es: "Pierna izquierda",
        en: "Left lower leg"
      }),
      burnFractionInput("right_foot", { es: "Pie derecho", en: "Right foot" }),
      burnFractionInput("left_foot", { es: "Pie izquierdo", en: "Left foot" })
    ],
    scoringTable: [
      {
        id: "pediatric_burn_tbsa_formula",
        variable: { es: "Contribucion regional", en: "Regional contribution" },
        value: "regionalPercentForAge * fractionBurned",
        description: {
          es: "Suma porcentajes regionales numericos ajustados por edad. Cada region puede introducirse como 0, 25, 50, 75 o 100% afectado.",
          en: "Sums numeric age-adjusted regional percentages. Each region can be entered as 0, 25, 50, 75, or 100% affected."
        }
      }
    ]
  },
  who_growth_percentiles: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Acceso al modulo WHO Growth central. Usa el mismo motor LMS y los mismos datos OMS; no crea un calculo separado.",
      en: "Entry point to the central WHO Growth module. Uses the same LMS engine and WHO data; it does not create a separate calculation."
    }
  },
  bmi_percentile: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Preset BMI-for-age del modulo WHO Growth. Requiere sexo, edad OMS aplicable, peso y longitud/talla.",
      en: "BMI-for-age preset of the WHO Growth module. Requires sex, applicable WHO age, weight, and length/height."
    },
    scoringTable: [
      {
        id: "bmi_who_growth_preset",
        variable: { es: "Preset WHO Growth", en: "WHO Growth preset" },
        value: "BMI-for-age",
        description: {
          es: "Usa el motor WHO Growth central con BMI/edad OMS 0-5 y 5-19. No usa CDC ni Fenton.",
          en: "Uses the central WHO Growth engine with WHO BMI-for-age 0-5 and 5-19. It does not use CDC or Fenton."
        }
      }
    ]
  },
  head_circumference_percentile: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Preset perimetro cefalico/edad del modulo WHO Growth. Limitado a datos OMS 0-5.",
      en: "Head circumference-for-age preset of the WHO Growth module. Limited to WHO 0-5 data."
    },
    scoringTable: [
      {
        id: "head_circumference_who_growth_preset",
        variable: { es: "Preset WHO Growth", en: "WHO Growth preset" },
        value: "Head circumference-for-age",
        description: {
          es: "Usa el motor WHO Growth central con perimetro cefalico/edad OMS 0-5. Fuera de rango muestra no aplicable.",
          en: "Uses the central WHO Growth engine with WHO head circumference-for-age 0-5. Outside range it shows not applicable."
        }
      }
    ]
  },
  who_growth_module: {
    calculationStatus: "active",
    calculationNotes: {
      es: "Motor OMS operativo con datos LMS oficiales normalizados: indicadores 0-5, peso/edad 5-10 y talla/edad e IMC/edad 5-19, con gráficas SVG imprimibles y límites etarios explícitos.",
      en: "Operational WHO engine with normalized official LMS data: 0-5 indicators, weight-for-age 5-10, and height-for-age/BMI-for-age 5-19, with printable SVG charts and explicit age limits."
    },
    inputs: [
      {
        id: "sex",
        label: { es: "Sexo", en: "Sex" },
        type: "select",
        required: true,
        options: [
          option("male", "Niño", "Boy", undefined, {
            es: "Tabla OMS para sexo masculino.",
            en: "WHO table for male sex."
          }),
          option("female", "Niña", "Girl", undefined, {
            es: "Tabla OMS para sexo femenino.",
            en: "WHO table for female sex."
          })
        ]
      },
      {
        id: "who_age_input_mode",
        label: {
          es: "Modo de entrada de edad",
          en: "Age input mode"
        },
        description: {
          es: "Recomendado 0-5: fecha de nacimiento + fecha de medición. Recomendado 5-19: meses cumplidos.",
          en: "Recommended for 0-5: date of birth + measurement date. Recommended for 5-19: completed months."
        },
        type: "select",
        required: true,
        options: [
          option(
            "dates",
            "Fecha de nacimiento + fecha de medición",
            "Date of birth + measurement date",
            undefined,
            {
              es: "Opción más precisa para indicadores OMS 0-5.",
              en: "Most accurate option for WHO 0-5 indicators."
            }
          ),
          option(
            "days_0_5",
            "Edad exacta en días (0-5 años)",
            "Exact age in days (0-5 years)",
            undefined,
            {
              es: "Modo avanzado si ya conoces la edad exacta en días.",
              en: "Advanced mode if exact age in days is already known."
            }
          ),
          option(
            "structured_0_5",
            "Edad en años, meses y días (0-5 años)",
            "Age in years, months and days (0-5 years)",
            undefined,
            {
              es: "Entrada cómoda; PedsCore la convierte a días de forma aproximada.",
              en: "Convenient entry; PedsCore converts it to days approximately."
            }
          ),
          option(
            "months_5_19",
            "Edad en meses cumplidos (5-19 años)",
            "Completed months (5-19 years)",
            undefined,
            {
              es: "Usa la referencia OMS 2007 5-19 con registros mensuales.",
              en: "Uses the WHO Growth Reference 2007 5-19 monthly records."
            }
          )
        ]
      },
      {
        id: "date_of_birth",
        label: { es: "Fecha de nacimiento", en: "Date of birth" },
        description: {
          es: "Formato YYYY-MM-DD. Se usa solo si el modo de edad elegido es fechas.",
          en: "Format YYYY-MM-DD. Used only when the selected age mode is dates."
        },
        type: "text",
        required: false,
        placeholder: { es: "Ej. 2023-01-01", en: "E.g. 2023-01-01" }
      },
      {
        id: "measurement_date",
        label: { es: "Fecha de medición", en: "Measurement date" },
        description: {
          es: "Formato YYYY-MM-DD. Debe ser igual o posterior a la fecha de nacimiento.",
          en: "Format YYYY-MM-DD. Must be on or after the date of birth."
        },
        type: "text",
        required: false,
        placeholder: { es: "Ej. 2024-01-01", en: "E.g. 2024-01-01" }
      },
      {
        id: "age_days",
        label: { es: "Edad exacta en días", en: "Exact age in days" },
        description: {
          es: "Edad en días para indicadores OMS 0-5. No se interpola: se usa el registro diario OMS exacto.",
          en: "Age in days for WHO 0-5 indicators. No interpolation is used: the exact daily WHO record is required."
        },
        type: "number",
        required: false,
        unit: "días",
        min: 0,
        max: 1856,
        step: 1,
        placeholder: { es: "Ej. 730", en: "E.g. 730" }
      },
      {
        id: "age_years_0_5",
        label: { es: "Años", en: "Years" },
        description: {
          es: "Para modo años/meses/días 0-5. Conversión operativa aproximada.",
          en: "For 0-5 years/months/days mode. Approximate operational conversion."
        },
        type: "number",
        required: false,
        unit: "años",
        min: 0,
        max: 5,
        step: 1,
        placeholder: { es: "Ej. 2", en: "E.g. 2" }
      },
      {
        id: "age_months_0_5",
        label: { es: "Meses", en: "Months" },
        description: {
          es: "Meses adicionales para modo años/meses/días 0-5.",
          en: "Additional months for 0-5 years/months/days mode."
        },
        type: "number",
        required: false,
        unit: "meses",
        min: 0,
        max: 11,
        step: 1,
        placeholder: { es: "Ej. 3", en: "E.g. 3" }
      },
      {
        id: "age_extra_days_0_5",
        label: { es: "Días", en: "Days" },
        description: {
          es: "Días adicionales para modo años/meses/días 0-5.",
          en: "Additional days for 0-5 years/months/days mode."
        },
        type: "number",
        required: false,
        unit: "días",
        min: 0,
        max: 30,
        step: 1,
        placeholder: { es: "Ej. 10", en: "E.g. 10" }
      },
      {
        id: "age_months",
        label: { es: "Edad en meses cumplidos", en: "Completed age in months" },
        description: {
          es: "Edad en meses cumplidos para referencia OMS 5-19. No se convierte ni interpola desde días.",
          en: "Completed age in months for the WHO 5-19 reference. It is not converted or interpolated from days."
        },
        type: "number",
        required: false,
        unit: "meses",
        min: 61,
        max: 228,
        step: 1,
        placeholder: { es: "Ej. 120", en: "E.g. 120" }
      },
      {
        id: "weight_kg",
        label: { es: "Peso", en: "Weight" },
        type: "number",
        required: true,
        unit: "kg",
        min: 0.1,
        max: 250,
        step: 0.1,
        placeholder: { es: "Ej. 12.4", en: "E.g. 12.4" }
      },
      {
        id: "stature_cm",
        label: { es: "Longitud/talla", en: "Length/height" },
        description: {
          es: "Introduce longitud o talla ya corregida según el modo de medición OMS aplicable.",
          en: "Enter length or height already corrected according to the applicable WHO measurement mode."
        },
        type: "number",
        required: true,
        unit: "cm",
        min: 30,
        max: 220,
        step: 0.1,
        placeholder: { es: "Ej. 86.1", en: "E.g. 86.1" }
      },
      {
        id: "measurement_mode",
        label: { es: "Modo de medición", en: "Measurement mode" },
        description: {
          es: "Permite seleccionar la tabla OMS de peso para longitud o peso para talla cuando corresponda.",
          en: "Selects the WHO weight-for-length or weight-for-height table when applicable."
        },
        type: "select",
        required: true,
        options: [
          option("recumbent_length", "Longitud tumbado", "Recumbent length", undefined, {
            es: "Usa la medición de longitud y activa peso para longitud si está en rango.",
            en: "Uses recumbent length and enables weight-for-length when in range."
          }),
          option("standing_height", "Talla de pie", "Standing height", undefined, {
            es: "Usa la medición de talla y activa peso para talla si está en rango.",
            en: "Uses standing height and enables weight-for-height when in range."
          })
        ]
      },
      {
        id: "head_circumference_cm",
        label: { es: "Perímetro cefálico", en: "Head circumference" },
        description: {
          es: "Opcional. Si se introduce, se calcula perímetro cefálico para la edad OMS 0-5.",
          en: "Optional. If provided, WHO head circumference-for-age 0-5 is calculated."
        },
        type: "number",
        required: false,
        unit: "cm",
        min: 20,
        max: 70,
        step: 0.1,
        placeholder: { es: "Ej. 48.0", en: "E.g. 48.0" }
      }
    ]
  },
  apgar: {
    calculationStatus: "active",
    calculationNotes: {
      es: "Apgar describe el estado fisiologico inmediato del recien nacido. Selecciona el momento de evaluacion; las bandas interpretativas se aplican solo al score de 5 minutos. No debe retrasar la reanimacion ni diagnosticar asfixia o pronostico neurologico.",
      en: "Apgar describes the newborn's immediate physiologic condition. Select the assessment time; interpretation bands apply only to the 5-minute score. It must not delay resuscitation or diagnose asphyxia or neurologic prognosis."
    },
    inputs: [
      {
        id: "assessment_time",
        label: { es: "Momento de evaluacion", en: "Assessment time" },
        description: {
          es: "Registra 1 y 5 minutos para todos los recien nacidos. Si el score de 5 minutos es menor de 7, la evaluacion se repite cada 5 minutos hasta 20 minutos; este calculador registra una evaluacion cada vez.",
          en: "Record at 1 and 5 minutes for all newborns. If the 5-minute score is below 7, repeat every 5 minutes up to 20 minutes; this calculator records one assessment at a time."
        },
        type: "single_choice",
        required: true,
        options: [
          option("one_minute", "1 minuto", "1 minute"),
          option("five_minutes", "5 minutos", "5 minutes")
        ]
      },
      {
        id: "heart_rate",
        label: { es: "Frecuencia cardiaca", en: "Heart rate" },
        description: {
          es: "Pulso auscultado o por otra valoración clínica al momento seleccionado.",
          en: "Heart rate assessed clinically at the selected time."
        },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("below_100", "Menos de 100 lpm", "Less than 100 bpm", 1),
          option("at_least_100", "100 lpm o mas", "100 bpm or more", 2)
        ]
      },
      {
        id: "respiratory_effort",
        label: { es: "Esfuerzo respiratorio", en: "Respiratory effort" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente; no respira", "Absent; not breathing", 0),
          option("slow_irregular", "Lento, irregular, débil o jadeante", "Slow, irregular, weak or gasping", 1),
          option("good_cry", "Respiración buena con llanto vigoroso", "Good respirations with a vigorous cry", 2)
        ]
      },
      {
        id: "muscle_tone",
        label: { es: "Tono muscular", en: "Muscle tone" },
        type: "single_choice",
        required: true,
        options: [
          option("flaccid", "Flacido, sin actividad", "Limp, no activity", 0),
          option("some_flexion", "Alguna flexion de extremidades", "Some flexion of the extremities", 1),
          option("active_motion", "Movimiento activo o bien flexionado", "Active motion or well flexed", 2)
        ]
      },
      {
        id: "reflex_irritability",
        label: { es: "Irritabilidad refleja", en: "Reflex irritability" },
        type: "single_choice",
        required: true,
        options: [
          option("none", "Sin respuesta a la estimulacion", "No response to stimulation", 0),
          option("grimace", "Mueca o respuesta debil", "Grimace or weak response", 1),
          option("vigorous_response", "Llanto, tos, estornudo o retirada vigorosa", "Cry, cough, sneeze or vigorous withdrawal", 2)
        ]
      },
      {
        id: "color",
        label: { es: "Coloracion", en: "Color" },
        type: "single_choice",
        required: true,
        description: {
          es: "La coloracion es subjetiva y puede ser menos fiable para valorar cianosis según la pigmentacion cutanea; interpretar junto con la evaluacion clinica completa.",
          en: "Color is subjective and may be less reliable for assessing cyanosis across skin pigmentation; interpret with the complete clinical assessment."
        },
        options: [
          option("blue_pale", "Azul o palida en todo el cuerpo", "Blue or pale all over", 0),
          option("pink_body_blue_extremities", "Cuerpo rosado con extremidades azules", "Pink body with blue extremities", 1),
          option("completely_pink", "Completamente rosada", "Completely pink", 2)
        ]
      }
    ],
    interpretationBands: [
      {
        id: "reassuring",
        min: 7,
        max: 10,
        label: { es: "Reasegurador a los 5 minutos", en: "Reassuring at 5 minutes" },
        description: {
          es: "Banda descriptiva para el score de 5 minutos en recien nacidos a termino y prematuros tardios.",
          en: "Descriptive band for the 5-minute score in term and late-preterm newborns."
        }
      },
      {
        id: "moderately_abnormal",
        min: 4,
        max: 6,
        label: { es: "Moderadamente anormal a los 5 minutos", en: "Moderately abnormal at 5 minutes" },
        description: {
          es: "Banda descriptiva para el score de 5 minutos; no diagnostica asfixia ni predice el resultado individual.",
          en: "Descriptive 5-minute band; it does not diagnose asphyxia or predict individual outcome."
        }
      },
      {
        id: "low",
        min: 0,
        max: 3,
        label: { es: "Bajo a los 5 minutos", en: "Low at 5 minutes" },
        description: {
          es: "Signo inespecifico de enfermedad que requiere contexto clinico; no diagnostica asfixia.",
          en: "Nonspecific sign of illness requiring clinical context; it does not diagnose asphyxia."
        }
      }
    ],
    scoringTable: [
      {
        id: "apgar_domains",
        variable: { es: "Cinco dominios", en: "Five domains" },
        value: "0-2",
        description: {
          es: "Cada dominio se puntua 0, 1 o 2 con descriptores observacionales; total 0-10. Las bandas solo se interpretan a los 5 minutos.",
          en: "Each domain is scored 0, 1 or 2 using observational descriptors; total 0-10. Bands are interpreted only at 5 minutes."
        }
      }
    ]
  },
  silverman_andersen: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      "thoracoabdominal_movement",
      "intercostal_retractions",
      "xiphoid_retraction",
      "nasal_flaring",
      "expiratory_grunt"
    ].map((id) => ({
      id,
      label: {
        es: id.replaceAll("_", " "),
        en: id.replaceAll("_", " ")
      },
      type: "single_choice" as const,
      required: true,
      options: scoreOptions(id)
    })),
    interpretationBands: [
      {
        id: "mild",
        min: 0,
        max: 3,
        label: { es: "Leve", en: "Mild" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "moderate",
        min: 4,
        max: 6,
        label: { es: "Moderado", en: "Moderate" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "severe",
        min: 7,
        max: 10,
        label: { es: "Grave", en: "Severe" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      }
    ],
    scoringTable: [
      {
        id: "silverman_domains",
        variable: { es: "Cinco signos respiratorios", en: "Five respiratory signs" },
        value: "0-2",
        description: {
          es: "Movimiento toracoabdominal, retracciones, xifoides, aleteo nasal y quejido.",
          en: "Thoracoabdominal movement, retractions, xiphoid retraction, nasal flaring, and grunt."
        }
      }
    ]
  },
  wood_downes_ferres: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Variante Wood-Downes-Ferres clasica de 6 dominios seleccionada por maintainer. El calculo suma solo los criterios observacionales de la tabla trazada.",
      en: "Classic six-domain Wood-Downes-Ferres variant selected by maintainer. The calculation only sums the observational criteria from the traced table."
    },
    inputs: [
      {
        id: "wheezing",
        label: { es: "Sibilancias", en: "Wheezing" },
        type: "single_choice",
        required: true,
        options: [
          option("none", "No", "No", 0),
          option("end_expiration", "Final de espiracion", "End of expiration", 1),
          option("all_expiration", "Toda la espiracion", "Throughout expiration", 2),
          option("inspiration_and_expiration", "Inspiracion y espiracion", "Inspiration and expiration", 3)
        ]
      },
      {
        id: "retractions",
        label: { es: "Tiraje", en: "Retractions" },
        type: "single_choice",
        required: true,
        options: [
          option("none", "No", "No", 0),
          option("subcostal", "Subcostal", "Subcostal", 1),
          option("subcostal_intercostal", "Subcostal e intercostal", "Subcostal and intercostal", 2),
          option("nasal_flaring", "Aleteo nasal", "Nasal flaring", 3)
        ]
      },
      {
        id: "air_entry",
        label: { es: "Entrada de aire", en: "Air entry" },
        type: "single_choice",
        required: true,
        options: [
          option("good_symmetric", "Buena y simetrica", "Good and symmetric", 0),
          option("regular_symmetric", "Regular y simetrica", "Regular and symmetric", 1),
          option("markedly_decreased", "Muy disminuida", "Markedly decreased", 2),
          option("silent_chest", "Torax silente", "Silent chest", 3)
        ]
      },
      {
        id: "respiratory_rate",
        label: { es: "Frecuencia respiratoria", en: "Respiratory rate" },
        type: "single_choice",
        required: true,
        options: [
          option("under_30", "Menor de 30 rpm", "Under 30 rpm", 0),
          option("31_to_45", "31 a 45 rpm", "31 to 45 rpm", 1),
          option("46_to_60", "46 a 60 rpm", "46 to 60 rpm", 2),
          option("over_60", "Mayor de 60 rpm", "Over 60 rpm", 3)
        ]
      },
      {
        id: "heart_rate",
        label: { es: "Frecuencia cardiaca", en: "Heart rate" },
        type: "single_choice",
        required: true,
        options: [
          option("under_120", "Menor de 120 lpm", "Under 120 bpm", 0),
          option("over_120", "Mayor de 120 lpm", "Over 120 bpm", 1)
        ]
      },
      {
        id: "cyanosis",
        label: { es: "Cianosis", en: "Cyanosis" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "No", "No", 0),
          option("present", "Si", "Yes", 1)
        ]
      }
    ],
    interpretationBands: [
      {
        id: "mild",
        min: 0,
        max: 3,
        label: { es: "Leve", en: "Mild" },
        description: {
          es: "Banda descriptiva publicada para la tabla Wood-Downes-Ferres revisada.",
          en: "Published descriptive band for the reviewed Wood-Downes-Ferres table."
        }
      },
      {
        id: "moderate",
        min: 4,
        max: 7,
        label: { es: "Moderada", en: "Moderate" },
        description: {
          es: "Banda descriptiva publicada para la tabla Wood-Downes-Ferres revisada.",
          en: "Published descriptive band for the reviewed Wood-Downes-Ferres table."
        }
      },
      {
        id: "severe",
        min: 8,
        max: 14,
        label: { es: "Grave", en: "Severe" },
        description: {
          es: "Banda descriptiva publicada para la tabla Wood-Downes-Ferres revisada.",
          en: "Published descriptive band for the reviewed Wood-Downes-Ferres table."
        }
      }
    ],
    scoringTable: [
      {
        id: "wdf_wheezing",
        variable: { es: "Sibilancias", en: "Wheezing" },
        value: "0-3",
        description: {
          es: "No 0; final de espiracion 1; toda la espiracion 2; inspiracion y espiracion 3.",
          en: "No 0; end of expiration 1; throughout expiration 2; inspiration and expiration 3."
        }
      },
      {
        id: "wdf_retractions",
        variable: { es: "Tiraje", en: "Retractions" },
        value: "0-3",
        description: {
          es: "No 0; subcostal 1; subcostal e intercostal 2; aleteo nasal 3.",
          en: "No 0; subcostal 1; subcostal and intercostal 2; nasal flaring 3."
        }
      },
      {
        id: "wdf_rates_air_cyanosis",
        variable: {
          es: "Frecuencias, entrada de aire y cianosis",
          en: "Rates, air entry, and cyanosis"
        },
        value: "0-3",
        description: {
          es: "Frecuencia respiratoria 0-3, frecuencia cardiaca 0-1, entrada de aire 0-3 y cianosis 0-1 segun tabla trazada.",
          en: "Respiratory rate 0-3, heart rate 0-1, air entry 0-3, and cyanosis 0-1 according to the traced table."
        }
      }
    ]
  },
  flacc: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: ["face", "legs", "activity", "cry", "consolability"].map((id) => ({
      id,
      label: { es: id, en: id },
      type: "single_choice" as const,
      required: true,
      options: scoreOptions(id)
    })),
    interpretationBands: [
      {
        id: "no_pain",
        min: 0,
        max: 0,
        label: { es: "Sin dolor", en: "No pain" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "mild",
        min: 1,
        max: 3,
        label: { es: "Dolor leve", en: "Mild pain" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "moderate",
        min: 4,
        max: 6,
        label: { es: "Dolor moderado", en: "Moderate pain" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "intense",
        min: 7,
        max: 10,
        label: { es: "Dolor intenso", en: "Severe pain" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      }
    ],
    scoringTable: [
      {
        id: "flacc_domains",
        variable: { es: "Rostro, piernas, actividad, llanto y consolabilidad", en: "Face, legs, activity, cry, and consolability" },
        value: "0-2",
        description: {
          es: "Cada dominio se prepara como opcion 0-2 hasta validacion textual completa.",
          en: "Each domain is prepared as 0-2 options until full wording validation."
        }
      }
    ]
  },
  qtc_bazett: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      {
        id: "qt_ms",
        label: { es: "Intervalo QT", en: "QT interval" },
        type: "number",
        required: true,
        unit: "ms",
        min: 0,
        step: 1,
        placeholder: { es: "Introducir QT medido", en: "Enter measured QT" }
      },
      {
        id: "heart_rate_bpm",
        label: { es: "Frecuencia cardiaca", en: "Heart rate" },
        type: "number",
        required: true,
        unit: "bpm",
        min: 0,
        step: 1,
        placeholder: { es: "Introducir frecuencia cardiaca", en: "Enter heart rate" }
      }
    ]
  },
  qtc_fridericia: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      {
        id: "qt_ms",
        label: { es: "Intervalo QT", en: "QT interval" },
        type: "number",
        required: true,
        unit: "ms",
        min: 0,
        step: 1
      },
      {
        id: "heart_rate_bpm",
        label: { es: "Frecuencia cardiaca", en: "Heart rate" },
        type: "number",
        required: true,
        unit: "bpm",
        min: 0,
        step: 1
      }
    ]
  },
  qtc_framingham: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      {
        id: "qt_ms",
        label: { es: "Intervalo QT", en: "QT interval" },
        type: "number",
        required: true,
        unit: "ms",
        min: 0,
        step: 1
      },
      {
        id: "heart_rate_bpm",
        label: { es: "Frecuencia cardiaca", en: "Heart rate" },
        type: "number",
        required: true,
        unit: "bpm",
        min: 0,
        step: 1
      }
    ]
  },
  qtc_hodges: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      {
        id: "qt_ms",
        label: { es: "Intervalo QT", en: "QT interval" },
        type: "number",
        required: true,
        unit: "ms",
        min: 0,
        step: 1
      },
      {
        id: "heart_rate_bpm",
        label: { es: "Frecuencia cardiaca", en: "Heart rate" },
        type: "number",
        required: true,
        unit: "bpm",
        min: 0,
        step: 1
      }
    ]
  },
  bedside_schwartz: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      {
        id: "height_cm",
        label: { es: "Talla", en: "Height" },
        type: "number",
        required: true,
        unit: "cm",
        min: 0,
        step: 0.1
      },
      {
        id: "serum_creatinine",
        label: { es: "Creatinina", en: "Creatinine" },
        type: "number",
        required: true,
        unit: "mg/dL",
        min: 0,
        step: 0.01
      },
      {
        id: "creatinine_unit",
        label: { es: "Unidad de creatinina", en: "Creatinine unit" },
        type: "select",
        required: true,
        options: [
          option("mg_dl", "mg/dL", "mg/dL"),
          option("umol_l", "umol/L", "umol/L")
        ]
      }
    ]
  },
  revised_schwartz: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Formula CKiD 2009 multivariable. Resultado estimado, educativo y descriptivo; no sustituye valoracion clinica ni protocolos locales.",
      en: "2009 multivariable CKiD equation. Estimated, educational, and descriptive result; does not replace clinical assessment or local protocols."
    },
    inputs: [
      {
        id: "height_cm",
        label: { es: "Talla", en: "Height" },
        type: "number",
        required: true,
        unit: "cm",
        min: 0,
        step: 0.1
      },
      {
        id: "serum_creatinine",
        label: { es: "Creatinina serica", en: "Serum creatinine" },
        type: "number",
        required: true,
        unit: "mg/dL o umol/L",
        min: 0,
        step: 0.01
      },
      {
        id: "creatinine_unit",
        label: { es: "Unidad de creatinina", en: "Creatinine unit" },
        type: "select",
        required: true,
        options: [
          option("mg_dl", "mg/dL", "mg/dL"),
          option("umol_l", "umol/L", "umol/L")
        ]
      },
      {
        id: "cystatin_c_mg_l",
        label: { es: "Cistatina C", en: "Cystatin C" },
        type: "number",
        required: true,
        unit: "mg/L",
        min: 0,
        step: 0.01
      },
      {
        id: "bun_mg_dl",
        label: { es: "BUN", en: "BUN" },
        type: "number",
        required: true,
        unit: "mg/dL",
        min: 0,
        step: 0.1,
        helperText: {
          es: "Usar nitrogeno ureico en sangre (BUN) en mg/dL, no urea en mmol/L.",
          en: "Use blood urea nitrogen (BUN) in mg/dL, not urea in mmol/L."
        }
      },
      {
        id: "sex",
        label: { es: "Sexo biologico usado en la ecuacion original", en: "Biological sex used in the original equation" },
        type: "select",
        required: true,
        options: [
          option("female", "Femenino", "Female"),
          option("male", "Masculino", "Male")
        ]
      }
    ],
    scoringTable: [
      {
        id: "revised_schwartz_ckid_2009",
        variable: { es: "Formula CKiD 2009", en: "2009 CKiD equation" },
        value: "eGFR",
        description: {
          es: "39.1 x (talla m / creatinina mg/dL)^0.516 x (1.8 / cistatina C mg/L)^0.294 x (30 / BUN mg/dL)^0.169 x 1.099 si masculino x (talla m / 1.4)^0.188.",
          en: "39.1 x (height m / creatinine mg/dL)^0.516 x (1.8 / cystatin C mg/L)^0.294 x (30 / BUN mg/dL)^0.169 x 1.099 if male x (height m / 1.4)^0.188."
        }
      }
    ]
  },
  nips: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Escala NIPS descriptiva con seis dominios. El calculo suma 0-1 en cinco dominios y 0-2 en llanto; salida informativa y trazable.",
      en: "Descriptive NIPS scale with six domains. Calculation sums 0-1 in five domains and 0-2 in cry; output is informational and traceable."
    },
    inputs: [
      {
        id: "facial_expression",
        label: { es: "Expresion facial", en: "Facial expression" },
        type: "single_choice",
        required: true,
        options: [
          option("relaxed", "Relajada", "Relaxed", 0),
          option("grimace", "Fruncida", "Grimace", 1)
        ]
      },
      {
        id: "cry",
        label: { es: "Llanto", en: "Cry" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("whimper", "Gemido", "Whimper", 1),
          option("vigorous", "Llanto vigoroso", "Vigorous cry", 2)
        ]
      },
      {
        id: "breathing_patterns",
        label: { es: "Patron respiratorio", en: "Breathing pattern" },
        type: "single_choice",
        required: true,
        options: [
          option("regular", "Regular", "Regular", 0),
          option("altered", "Alterado", "Altered", 1)
        ]
      },
      {
        id: "arms",
        label: { es: "Brazos", en: "Arms" },
        type: "single_choice",
        required: true,
        options: [
          option("relaxed", "Relajados", "Relaxed", 0),
          option("flexed_or_extended", "Flexionados o extendidos", "Flexed or extended", 1)
        ]
      },
      {
        id: "legs",
        label: { es: "Piernas", en: "Legs" },
        type: "single_choice",
        required: true,
        options: [
          option("relaxed", "Relajadas", "Relaxed", 0),
          option("flexed_or_extended", "Flexionadas o extendidas", "Flexed or extended", 1)
        ]
      },
      {
        id: "state_of_arousal",
        label: { es: "Estado de alerta", en: "State of arousal" },
        type: "single_choice",
        required: true,
        options: [
          option("asleep_or_awake", "Dormido o despierto", "Asleep or awake", 0),
          option("agitated", "Agitado", "Agitated", 1)
        ]
      }
    ],
    interpretationBands: [
      {
        id: "below_documented_threshold",
        min: 0,
        max: 3,
        label: { es: "Por debajo del umbral documentado", en: "Below documented threshold" },
        description: {
          es: "Puntuacion NIPS 0-3 segun la tabla local.",
          en: "NIPS score 0-3 according to the local table."
        }
      },
      {
        id: "above_documented_threshold",
        min: 4,
        max: 7,
        label: { es: "Por encima del umbral documentado", en: "Above documented threshold" },
        description: {
          es: "Puntuacion NIPS mayor de 3 segun la tabla local.",
          en: "NIPS score greater than 3 according to the local table."
        }
      }
    ],
    scoringTable: [
      {
        id: "nips_facial_expression",
        variable: { es: "Expresion facial", en: "Facial expression" },
        value: "0-1",
        description: { es: "Relajada 0; fruncida 1.", en: "Relaxed 0; grimace 1." }
      },
      {
        id: "nips_cry",
        variable: { es: "Llanto", en: "Cry" },
        value: "0-2",
        description: { es: "Ausente 0; gemido 1; llanto vigoroso 2.", en: "Absent 0; whimper 1; vigorous cry 2." }
      },
      {
        id: "nips_breathing_patterns",
        variable: { es: "Patron respiratorio", en: "Breathing pattern" },
        value: "0-1",
        description: { es: "Regular 0; alterado 1.", en: "Regular 0; altered 1." }
      },
      {
        id: "nips_arms_legs_arousal",
        variable: { es: "Brazos, piernas y alerta", en: "Arms, legs, and arousal" },
        value: "0-1",
        description: {
          es: "Dominos documentados localmente como relajado/dormido/despierto frente a flexionado/extendido/agitado.",
          en: "Domains locally documented as relaxed/asleep/awake versus flexed/extended/agitated."
        }
      }
    ]
  },
  pram: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "PRAM describe la gravedad de una exacerbacion de asma aguda en ninos de 2 a menos de 18 anos. Resultado informativo y trazable, sin instrucciones de manejo.",
      en: "PRAM describes acute asthma exacerbation severity in children aged 2 to under 18 years. The result is informational and traceable, without management instructions."
    },
    inputs: [
      {
        id: "age_years",
        label: { es: "Edad", en: "Age" },
        description: {
          es: "PRAM fue validado para pacientes de 2 a menos de 18 anos con asma aguda.",
          en: "PRAM was validated for patients aged 2 to under 18 years with acute asthma."
        },
        type: "number",
        required: true,
        unit: "years",
        min: 2,
        max: 17.99,
        step: 0.1
      },
      {
        id: "suprasternal_retractions",
        label: { es: "Retracciones suprasternales", en: "Suprasternal retractions" },
        description: {
          es: "Valoracion visual de la retraccion suprasternal con cada inspiracion.",
          en: "Visual assessment of suprasternal indrawing with each inspiration."
        },
        type: "single_choice",
        required: true,
        options: [option("absent", "Ausentes", "Absent", 0), option("present", "Presentes", "Present", 2)]
      },
      {
        id: "scalene_muscle_contraction",
        label: { es: "Contraccion de musculos escalenos", en: "Scalene muscle contraction" },
        description: {
          es: "Valoracion por palpacion; la contraccion de los escalenos no se determina visualmente.",
          en: "Assess by palpation; scalene contraction is not determined visually."
        },
        type: "single_choice",
        required: true,
        options: [option("absent", "Ausente", "Absent", 0), option("present", "Presente", "Present", 2)]
      },
      {
        id: "air_entry",
        label: { es: "Entrada de aire", en: "Air entry" },
        description: {
          es: "Si hay asimetria entre ambos pulmones, puntua el lado mas afectado.",
          en: "If findings are asymmetric between lungs, score the more severely affected side."
        },
        type: "single_choice",
        required: true,
        options: [
          option("normal", "Normal", "Normal", 0),
          option("decreased_bases", "Disminuida en bases", "Decreased at bases", 1),
          option("widespread_decrease", "Disminucion generalizada", "Widespread decrease", 2),
          option("absent_minimal", "Ausente o minima", "Absent or minimal", 3)
        ]
      },
      {
        id: "wheezing",
        label: { es: "Sibilancias", en: "Wheezing" },
        description: {
          es: "Si los hallazgos son asimetricos, puntua las zonas de auscultacion mas afectadas.",
          en: "If findings are asymmetric, score the most severely affected auscultation zones."
        },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausentes", "Absent", 0),
          option("expiratory_only", "Solo espiratorias", "Expiratory only", 1),
          option("inspiratory_and_expiratory", "Inspiratorias y espiratorias", "Inspiratory and expiratory", 2),
          option(
            "audible_or_silent_chest",
            "Audibles sin estetoscopio o torax silencioso con entrada de aire minima",
            "Audible without stethoscope or silent chest with minimal air entry",
            3
          )
        ]
      },
      {
        id: "oxygen_measurement_condition",
        label: { es: "Condicion de medicion de SpO2", en: "SpO2 measurement condition" },
        description: {
          es: "La puntuacion de oxigenacion PRAM solo es valida con una lectura estable en aire ambiente durante al menos 1 minuto.",
          en: "The PRAM oxygenation score is valid only with a stable room-air reading maintained for at least 1 minute."
        },
        type: "single_choice",
        required: true,
        options: [
          option(
            "stable_room_air_one_minute",
            "Estable en aire ambiente durante al menos 1 minuto",
            "Stable on room air for at least 1 minute"
          ),
          option(
            "unconfirmed_or_supplemental_oxygen",
            "No confirmado o medido con oxigeno suplementario",
            "Unconfirmed or measured with supplemental oxygen"
          )
        ]
      },
      {
        id: "oxygen_saturation",
        label: { es: "SpO2 estable en aire ambiente", en: "Stable room-air SpO2" },
        description: {
          es: "Introduce el valor estabilizado durante al menos 1 minuto y sin oxigeno suplementario.",
          en: "Enter the value after it has remained stable for at least 1 minute without supplemental oxygen."
        },
        type: "number",
        required: true,
        unit: "%",
        min: 0,
        max: 100,
        step: 1
      }
    ],
    interpretationBands: [
      {
        id: "mild",
        min: 0,
        max: 3,
        label: { es: "Leve", en: "Mild" },
        description: { es: "Banda descriptiva PRAM 0-3.", en: "Descriptive PRAM band 0-3." }
      },
      {
        id: "moderate",
        min: 4,
        max: 7,
        label: { es: "Moderada", en: "Moderate" },
        description: { es: "Banda descriptiva PRAM 4-7.", en: "Descriptive PRAM band 4-7." }
      },
      {
        id: "severe",
        min: 8,
        max: 12,
        label: { es: "Grave", en: "Severe" },
        description: { es: "Banda descriptiva PRAM 8-12.", en: "Descriptive PRAM band 8-12." }
      }
    ],
    scoringTable: [
      {
        id: "pram_oxygen_saturation",
        variable: { es: "SpO2 estable en aire ambiente", en: "Stable room-air SpO2" },
        value: "0-2",
        description: {
          es: "Medida en aire ambiente, estable durante al menos 1 minuto: >=95% = 0; 92-94% = 1; <92% = 2.",
          en: "Measured on room air and stable for at least 1 minute: >=95% = 0; 92-94% = 1; <92% = 2."
        }
      },
      {
        id: "pram_physical_findings",
        variable: { es: "Hallazgos clinicos", en: "Clinical findings" },
        value: "0-3",
        description: {
          es: "Retraccion suprasternal 0/2; contraccion palpable de escalenos 0/2; entrada de aire 0-3; sibilancias 0-3. En hallazgos asimetricos se puntua el lado mas afectado.",
          en: "Suprasternal retraction 0/2; palpable scalene contraction 0/2; air entry 0-3; wheezing 0-3. For asymmetric findings, score the more severely affected side."
        }
      }
    ]
  },
  westley_croup: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Score Westley descriptivo de gravedad de crup. Resultado informativo y trazable, sin instrucciones de manejo.",
      en: "Descriptive Westley croup severity score. Informational and traceable result, without management instructions."
    },
    inputs: [
      {
        id: "level_of_consciousness",
        label: { es: "Nivel de conciencia", en: "Level of consciousness" },
        type: "single_choice",
        required: true,
        options: [option("normal", "Normal", "Normal", 0), option("disoriented", "Desorientado", "Disoriented", 5)]
      },
      {
        id: "cyanosis",
        label: { es: "Cianosis", en: "Cyanosis" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("with_agitation", "Con agitacion", "With agitation", 4),
          option("at_rest", "En reposo", "At rest", 5)
        ]
      },
      {
        id: "stridor",
        label: { es: "Estridor", en: "Stridor" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("with_agitation", "Con agitacion", "With agitation", 1),
          option("at_rest", "En reposo", "At rest", 2)
        ]
      },
      {
        id: "air_entry",
        label: { es: "Entrada de aire", en: "Air entry" },
        type: "single_choice",
        required: true,
        options: [
          option("normal", "Normal", "Normal", 0),
          option("decreased", "Disminuida", "Decreased", 1),
          option("markedly_decreased", "Marcadamente disminuida", "Markedly decreased", 2)
        ]
      },
      {
        id: "retractions",
        label: { es: "Retracciones", en: "Retractions" },
        type: "single_choice",
        required: true,
        options: [
          option("none", "Ninguna", "None", 0),
          option("mild", "Leve", "Mild", 1),
          option("moderate", "Moderada", "Moderate", 2),
          option("severe", "Severa", "Severe", 3)
        ]
      }
    ],
    interpretationBands: [
      {
        id: "mild",
        min: 0,
        max: 2,
        label: { es: "Leve", en: "Mild" },
        description: { es: "Banda descriptiva Westley 0-2.", en: "Descriptive Westley band 0-2." }
      },
      {
        id: "moderate",
        min: 3,
        max: 7,
        label: { es: "Moderado", en: "Moderate" },
        description: { es: "Banda descriptiva Westley 3-7.", en: "Descriptive Westley band 3-7." }
      },
      {
        id: "severe",
        min: 8,
        max: 11,
        label: { es: "Severo", en: "Severe" },
        description: { es: "Banda descriptiva Westley 8-11.", en: "Descriptive Westley band 8-11." }
      },
      {
        id: "impending_respiratory_failure",
        min: 12,
        max: 17,
        label: { es: "Fallo respiratorio inminente", en: "Impending respiratory failure" },
        description: { es: "Banda descriptiva Westley 12-17.", en: "Descriptive Westley band 12-17." }
      }
    ],
    scoringTable: [
      {
        id: "westley_domains",
        variable: { es: "Retracciones, estridor, cianosis, conciencia y entrada de aire", en: "Retractions, stridor, cyanosis, consciousness, and air entry" },
        value: "0-5",
        description: {
          es: "Cinco dominios: conciencia 0/5; cianosis 0/4/5; estridor 0/1/2; entrada de aire 0/1/2; retracciones 0-3.",
          en: "Five domains: consciousness 0/5; cyanosis 0/4/5; stridor 0/1/2; air entry 0/1/2; retractions 0-3."
        }
      }
    ]
  },
  clinical_dehydration_scale: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      "general_appearance",
      "eyes",
      "mucous_membranes",
      "tears"
    ].map((id) => ({
      id,
      label: { es: id.replaceAll("_", " "), en: id.replaceAll("_", " ") },
      type: "single_choice" as const,
      required: true,
      options: scoreOptions(id)
    })),
    interpretationBands: [
      {
        id: "mild",
        min: 0,
        max: 3,
        label: { es: "Leve", en: "Mild" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "moderate",
        min: 4,
        max: 6,
        label: { es: "Moderado", en: "Moderate" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "severe",
        min: 7,
        max: 8,
        label: { es: "Grave", en: "Severe" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      }
    ],
    scoringTable: [
      {
        id: "cds_domains",
        variable: { es: "Aspecto, ojos, mucosas y lagrimas", en: "Appearance, eyes, mucous membranes, and tears" },
        value: "0-2",
        description: {
          es: "Dominios preparados para revision de version y redaccion final.",
          en: "Domains prepared for version review and final wording."
        }
      }
    ]
  },
  pediatric_appendicitis_score: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Calculadora educativa del Pediatric Appendicitis Score. Muestra puntuacion e interpretacion de riesgo; no confirma ni descarta apendicitis y no genera recomendaciones terapeuticas, quirurgicas o de imagen. Las categorias de riesgo 0-3, 4-6 y 7-10 son bandas educativas usadas por PedsCore para facilitar la interpretacion. No deben interpretarse como validacion local ni como indicacion diagnostica o terapeutica.",
      en: "Educational Pediatric Appendicitis Score calculator. It shows score and risk interpretation; it does not confirm or exclude appendicitis and does not generate treatment, surgical, or imaging recommendations. The 0-3, 4-6, and 7-10 risk categories are educational bands used by PedsCore to support interpretation. They must not be interpreted as local validation or as diagnostic or therapeutic guidance."
    },
    inputs: [
      {
        id: "right_iliac_fossa_tenderness",
        label: {
          es: "Dolor en fosa iliaca derecha",
          en: "Right iliac fossa tenderness"
        },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("present", "Presente", "Present", 2)
        ]
      },
      {
        id: "cough_percussion_hopping_tenderness",
        label: {
          es: "Dolor con tos, percusion o salto",
          en: "Pain with cough, percussion, or hopping"
        },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("present", "Presente", "Present", 2)
        ]
      },
      {
        id: "anorexia",
        label: { es: "Anorexia", en: "Anorexia" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("present", "Presente", "Present", 1)
        ]
      },
      {
        id: "fever",
        label: { es: "Fiebre", en: "Fever" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("present", "Presente", "Present", 1)
        ]
      },
      {
        id: "nausea_or_vomiting",
        label: { es: "Nauseas o vomitos", en: "Nausea or vomiting" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("present", "Presente", "Present", 1)
        ]
      },
      {
        id: "pain_migration",
        label: { es: "Migracion del dolor", en: "Migration of pain" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("present", "Presente", "Present", 1)
        ]
      },
      {
        id: "leukocytosis",
        label: { es: "Leucocitosis", en: "Leukocytosis" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("present", "Presente", "Present", 1)
        ]
      },
      {
        id: "neutrophilia",
        label: { es: "Neutrofilia", en: "Neutrophilia" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausente", "Absent", 0),
          option("present", "Presente", "Present", 1)
        ]
      }
    ],
    interpretationBands: [
      {
        id: "low_risk",
        min: 0,
        max: 3,
        label: { es: "Bajo riesgo", en: "Low risk" },
        description: {
          es: "Categoria de bajo riesgo segun la puntuacion introducida. No descarta apendicitis; requiere valoracion clinica y seguimiento segun contexto.",
          en: "Low-risk category based on the entered score. This does not exclude appendicitis; clinical assessment and follow-up depend on context."
        }
      },
      {
        id: "intermediate_risk",
        min: 4,
        max: 6,
        label: { es: "Riesgo intermedio", en: "Intermediate risk" },
        description: {
          es: "Categoria de riesgo intermedio. Interpretar junto con exploracion, evolucion, pruebas complementarias y protocolos locales.",
          en: "Intermediate-risk category. Interpret with examination, clinical course, complementary tests, and local protocols."
        }
      },
      {
        id: "high_risk",
        min: 7,
        max: 10,
        label: { es: "Alto riesgo", en: "High risk" },
        description: {
          es: "Categoria de alto riesgo segun la puntuacion introducida. No equivale a diagnostico ni indica automaticamente tratamiento, cirugia o imagen.",
          en: "High-risk category based on the entered score. This is not a diagnosis and does not automatically indicate treatment, surgery, or imaging."
        }
      }
    ],
    scoringTable: [
      {
        id: "pas_two_point_items",
        variable: {
          es: "Items de 2 puntos",
          en: "2-point items"
        },
        value: "0 or 2",
        description: {
          es: "Dolor en fosa iliaca derecha y dolor con tos, percusion o salto.",
          en: "Right iliac fossa tenderness and pain with cough, percussion, or hopping."
        }
      },
      {
        id: "pas_one_point_items",
        variable: {
          es: "Items de 1 punto",
          en: "1-point items"
        },
        value: "0 or 1",
        description: {
          es: "Anorexia, fiebre, nauseas/vomitos, migracion del dolor, leucocitosis y neutrofilia.",
          en: "Anorexia, fever, nausea/vomiting, pain migration, leukocytosis, and neutrophilia."
        }
      }
    ]
  },
  sipa: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Calcula FC/PAS y compara el valor bruto con los umbrales SIPA publicados para pacientes de 4 a 16 anos con traumatismo. La salida describe la asociacion con riesgo; no diagnostica shock ni recomienda tratamiento.",
      en: "Calculates HR/SBP and compares the raw value with published SIPA thresholds for trauma patients aged 4 to 16 years. The output describes risk association; it does not diagnose shock or recommend treatment."
    },
    inputs: [
      {
        id: "age_years",
        label: { es: "Edad", en: "Age" },
        type: "number",
        required: true,
        unit: "anos",
        min: 4,
        step: 0.1
      },
      {
        id: "heart_rate_bpm",
        label: { es: "Frecuencia cardiaca", en: "Heart rate" },
        type: "number",
        required: true,
        unit: "bpm",
        min: 0,
        step: 1
      },
      {
        id: "systolic_blood_pressure_mm_hg",
        label: { es: "Presion arterial sistolica", en: "Systolic blood pressure" },
        type: "number",
        required: true,
        unit: "mmHg",
        min: 0,
        step: 1
      }
    ],
    scoringTable: [
      {
        id: "sipa_formula",
        variable: { es: "Indice de shock", en: "Shock index" },
        value: "heart_rate_bpm / systolic_blood_pressure_mm_hg",
        description: {
          es: "Formula publicada para SIPA; la clasificacion utiliza el cociente sin redondear.",
          en: "Published SIPA formula; classification uses the unrounded ratio."
        }
      },
      {
        id: "sipa_4_6",
        variable: { es: "4 a 6 anos", en: "4 to 6 years" },
        value: "> 1.22",
        description: {
          es: "Umbral documentado para interpretacion trazable.",
          en: "Documented threshold for traceable interpretation."
        }
      },
      {
        id: "sipa_7_12",
        variable: { es: "7 a 12 anos", en: "7 to 12 years" },
        value: "> 1.0",
        description: {
          es: "Umbral documentado para interpretacion trazable.",
          en: "Documented threshold for traceable interpretation."
        }
      },
      {
        id: "sipa_13_16",
        variable: { es: "13 a 16 anos", en: "13 to 16 years" },
        value: "> 0.9",
        description: {
          es: "Umbral documentado para interpretacion trazable.",
          en: "Documented threshold for traceable interpretation."
        }
      }
    ]
  },
  pecarn_tbi_under_2: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      "altered_mental_status_or_gcs_less_than_15",
      "palpable_skull_fracture",
      "non_frontal_scalp_hematoma",
      "loss_of_consciousness_5_seconds_or_more",
      "severe_mechanism",
      "abnormal_behavior_per_parent"
    ].map((id) => ({
      id,
      label: { es: id.replaceAll("_", " "), en: id.replaceAll("_", " ") },
      type: "boolean" as const,
      required: true,
      options: booleanOptions
    })),
    scoringTable: [
      {
        id: "pecarn_under_2_criteria",
        variable: { es: "Criterios PECARN menor de 2 anos", en: "PECARN under 2 criteria" },
        value: "boolean",
        description: {
          es: "Criterios documentados; no se activa algoritmo de decision en este bloque.",
          en: "Criteria documented; decision algorithm is not activated in this block."
        }
      }
    ]
  },
  pecarn_tbi_2_or_more: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      "altered_mental_status_or_gcs_less_than_15",
      "signs_of_basilar_skull_fracture",
      "history_of_loss_of_consciousness",
      "history_of_vomiting",
      "severe_mechanism",
      "severe_headache"
    ].map((id) => ({
      id,
      label: { es: id.replaceAll("_", " "), en: id.replaceAll("_", " ") },
      type: "boolean" as const,
      required: true,
      options: booleanOptions
    })),
    scoringTable: [
      {
        id: "pecarn_2_or_more_criteria",
        variable: { es: "Criterios PECARN 2 anos o mas", en: "PECARN 2 years or older criteria" },
        value: "boolean",
        description: {
          es: "Criterios documentados; no se activa algoritmo de decision en este bloque.",
          en: "Criteria documented; decision algorithm is not activated in this block."
        }
      }
    ]
  },
  catch_tbi: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      booleanInput("gcs_less_than_15_at_2_hours", {
        es: "GCS menor de 15 a las 2 horas",
        en: "GCS less than 15 at 2 hours"
      }),
      booleanInput("suspected_open_or_depressed_skull_fracture", {
        es: "Sospecha de fractura craneal abierta o deprimida",
        en: "Suspected open or depressed skull fracture"
      }),
      booleanInput("worsening_headache", {
        es: "Cefalea en empeoramiento",
        en: "Worsening headache"
      }),
      booleanInput("irritability_on_exam", {
        es: "Irritabilidad en la exploracion",
        en: "Irritability on examination"
      }),
      booleanInput("signs_of_basal_skull_fracture", {
        es: "Signos de fractura de base de craneo",
        en: "Signs of basal skull fracture"
      }),
      booleanInput("large_boggy_scalp_hematoma", {
        es: "Hematoma de cuero cabelludo grande y blando",
        en: "Large boggy scalp hematoma"
      }),
      booleanInput("dangerous_mechanism", {
        es: "Mecanismo peligroso segun regla CATCH",
        en: "Dangerous mechanism according to CATCH"
      })
    ],
    scoringTable: [
      {
        id: "catch_high_risk_criteria",
        variable: { es: "Criterios de mayor riesgo CATCH", en: "CATCH higher-risk criteria" },
        value: "boolean",
        description: {
          es: "Criterios publicados que se muestran solo como clasificacion informativa.",
          en: "Published criteria shown only as informational classification."
        }
      },
      {
        id: "catch_medium_risk_criteria",
        variable: { es: "Criterios de riesgo medio CATCH", en: "CATCH medium-risk criteria" },
        value: "boolean",
        description: {
          es: "Criterios publicados que se muestran solo como clasificacion informativa.",
          en: "Published criteria shown only as informational classification."
        }
      }
    ]
  },
  chalice_tbi: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      booleanInput("witnessed_loss_of_consciousness_over_5_minutes", {
        es: "Perdida de conciencia presenciada mayor de 5 minutos",
        en: "Witnessed loss of consciousness over 5 minutes"
      }),
      booleanInput("history_of_amnesia_over_5_minutes", {
        es: "Amnesia mayor de 5 minutos",
        en: "History of amnesia over 5 minutes"
      }),
      booleanInput("abnormal_drowsiness", {
        es: "Somnolencia anormal",
        en: "Abnormal drowsiness"
      }),
      booleanInput("three_or_more_vomiting_episodes", {
        es: "Tres o mas episodios de vomitos",
        en: "Three or more vomiting episodes"
      }),
      booleanInput("suspicion_of_non_accidental_injury", {
        es: "Sospecha de lesion no accidental",
        en: "Suspicion of non-accidental injury"
      }),
      booleanInput("post_traumatic_seizure_without_epilepsy", {
        es: "Convulsion postraumatica sin epilepsia conocida",
        en: "Post-traumatic seizure without known epilepsy"
      }),
      booleanInput("gcs_less_than_14_or_under_1_less_than_15", {
        es: "GCS menor de 14, o menor de 15 si tiene menos de 1 ano",
        en: "GCS less than 14, or less than 15 if under 1 year"
      }),
      booleanInput("suspected_penetrating_or_depressed_skull_injury_or_tense_fontanelle", {
        es: "Sospecha de lesion craneal penetrante/deprimida o fontanela tensa",
        en: "Suspected penetrating/depressed skull injury or tense fontanelle"
      }),
      booleanInput("signs_of_basal_skull_fracture", {
        es: "Signos de fractura de base de craneo",
        en: "Signs of basal skull fracture"
      }),
      booleanInput("focal_neurology", {
        es: "Neurologia focal",
        en: "Focal neurology"
      }),
      booleanInput("bruise_swelling_laceration_over_5cm_under_1_year", {
        es: "Hematoma, tumefaccion o laceracion mayor de 5 cm si menor de 1 ano",
        en: "Bruise, swelling, or laceration over 5 cm if under 1 year"
      }),
      booleanInput("high_speed_road_traffic_mechanism", {
        es: "Mecanismo de trafico de alta energia",
        en: "High-energy road traffic mechanism"
      }),
      booleanInput("fall_over_3_metres", {
        es: "Caida mayor de 3 metros",
        en: "Fall over 3 metres"
      }),
      booleanInput("high_speed_projectile_or_object", {
        es: "Proyectil u objeto de alta energia",
        en: "High-energy projectile or object"
      })
    ],
    scoringTable: [
      {
        id: "chalice_criteria",
        variable: { es: "Criterios CHALICE", en: "CHALICE criteria" },
        value: "boolean",
        description: {
          es: "Criterios publicados que se muestran solo como clasificacion informativa.",
          en: "Published criteria shown only as informational classification."
        }
      }
    ]
  }
};

const tool = (seed: ToolSeed): ClinicalToolMetadata => {
  const metadata = clinicalToolFormMetadata[seed.id] ?? {};
  const references = implementedToolReferences[seed.id] ?? seed.references ?? [
    docRef(`${seed.id}_documentation`, "PedsCore documentation source pending primary reference review", "pending_verification")
  ];

  const calculationStatus = implementedToolIds.has(seed.id)
    ? "active"
    : metadata.calculationStatus;

  return {
    ...seed,
    ...metadata,
    implementationStatus: implementedToolIds.has(seed.id)
      ? "implemented"
      : licensingBlockedToolIds.has(seed.id)
        ? "not_implemented_due_to_licensing"
        : seed.implementationStatus,
    ...(calculationStatus ? { calculationStatus } : {}),
    references,
    sourceTrace: metadata.sourceTrace ?? references,
    disclaimerRequired: true,
    issueTemplateUrl: githubIssuesUrl
  };
};

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

type ReferenceSurfaceSeed = {
  id: string;
  slug: string;
  shortName: string;
  nameEs: string;
  nameEn: string;
  category: ToolCategory;
  subcategory: string;
  type: ToolType;
  populationEs: string;
  populationEn: string;
  descriptionEs: string;
  descriptionEn: string;
  evidenceLevel: EvidenceLevel;
  regulatoryRisk: RegulatoryRisk;
  references?: Reference[];
};

const referenceSurface = (seed: ReferenceSurfaceSeed): ClinicalToolMetadata =>
  makeTool(
    seed.id,
    seed.slug,
    seed.shortName,
    seed.nameEs,
    seed.nameEn,
    seed.category,
    seed.subcategory,
    seed.type,
    seed.populationEs,
    seed.populationEn,
    seed.descriptionEs,
    seed.descriptionEn,
    "pending_validation",
    seed.evidenceLevel,
    seed.regulatoryRisk,
    {
      es: "Superficie clínica de referencia activa. No reproduce localmente matrices, formularios ni instrucciones operativas protegidas.",
      en: "Active clinical reference surface. It does not reproduce protected matrices, forms, or operational instructions locally."
    },
    seed.references ?? [
      docRef(
        `${seed.id}_master_plan`,
        `PedsCore Clinical Master Implementation Plan v12: ${seed.nameEn}`,
        seed.evidenceLevel
      )
    ]
  );

const priorityExpansionSurfaces: ClinicalToolMetadata[] = [
  referenceSurface({ id:"capd", slug:"capd", shortName:"CAPD", nameEs:"Evaluación Cornell del Delirium Pediátrico", nameEn:"Cornell Assessment of Pediatric Delirium", category:"intensive_care", subcategory:"delirium", type:"scale", populationEs:"Niños hospitalizados, especialmente en cuidados intensivos", populationEn:"Hospitalized children, especially in intensive care", descriptionEs:"Escala de referencia para detección y seguimiento longitudinal del delirium pediátrico.", descriptionEn:"Reference scale for pediatric delirium detection and longitudinal follow-up.", evidenceLevel:"external_validation_study", regulatoryRisk:"medium" }),
  referenceSurface({ id:"wat_1", slug:"wat-1", shortName:"WAT-1", nameEs:"Withdrawal Assessment Tool-1", nameEn:"Withdrawal Assessment Tool-1", category:"intensive_care", subcategory:"withdrawal", type:"scale", populationEs:"Niños en retirada de analgesia o sedación", populationEn:"Children undergoing analgesia or sedation withdrawal", descriptionEs:"Herramienta de referencia para valorar signos de abstinencia y su evolución seriada.", descriptionEn:"Reference tool for assessing withdrawal signs and serial change.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"sbs", slug:"state-behavioral-scale", shortName:"SBS", nameEs:"Escala Conductual de Estado", nameEn:"State Behavioral Scale", category:"intensive_care", subcategory:"sedation", type:"scale", populationEs:"Niños críticamente enfermos", populationEn:"Critically ill children", descriptionEs:"Escala de referencia para el estado de sedación y agitación pediátrico.", descriptionEn:"Reference scale for pediatric sedation and agitation state.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"sos_pd", slug:"sos-pd", shortName:"SOS-PD", nameEs:"SOS-PD", nameEn:"SOS-PD", category:"intensive_care", subcategory:"delirium", type:"scale", populationEs:"Niños hospitalizados", populationEn:"Hospitalized children", descriptionEs:"Superficie de referencia para delirium pediátrico y su valoración seriada.", descriptionEn:"Reference surface for pediatric delirium and serial assessment.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"pcam_icu", slug:"pcam-icu", shortName:"pCAM-ICU", nameEs:"pCAM-ICU", nameEn:"pCAM-ICU", category:"intensive_care", subcategory:"delirium", type:"scale", populationEs:"Niños en UCI pediátrica capaces de participar según la herramienta", populationEn:"PICU children able to participate as required by the instrument", descriptionEs:"Referencia para detección de delirium pediátrico en cuidados intensivos.", descriptionEn:"Reference for pediatric delirium detection in intensive care.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"pscam_icu", slug:"pscam-icu", shortName:"psCAM-ICU", nameEs:"psCAM-ICU", nameEn:"psCAM-ICU", category:"intensive_care", subcategory:"delirium", type:"scale", populationEs:"Niños pequeños en UCI pediátrica", populationEn:"Younger children in pediatric intensive care", descriptionEs:"Referencia para detección de delirium adaptada a niños pequeños en UCI.", descriptionEn:"Reference for delirium detection adapted to younger children in intensive care.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"step_by_step", slug:"step-by-step-febrile-infant", shortName:"Step-by-Step", nameEs:"Enfoque Step-by-Step", nameEn:"Step-by-Step Approach", category:"emergency", subcategory:"febrile_infant", type:"clinical_rule", populationEs:"Lactantes de hasta 90 días con fiebre sin foco", populationEn:"Infants up to 90 days old with fever without source", descriptionEs:"Estratificación secuencial de riesgo de infección bacteriana invasiva mediante aspecto, edad, orina, PCT, PCR y ANC.", descriptionEn:"Sequential invasive-bacterial-infection risk stratification using appearance, age, urine, PCT, CRP, and ANC.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"pecarn_febrile_infant", slug:"pecarn-febrile-infant", shortName:"PECARN FI", nameEs:"Regla PECARN para lactante febril", nameEn:"PECARN Febrile Infant Rule", category:"emergency", subcategory:"febrile_infant", type:"clinical_rule", populationEs:"Lactantes febriles de hasta 60 días según elegibilidad publicada", populationEn:"Febrile infants up to 60 days meeting published eligibility", descriptionEs:"Regla PECARN para identificar bajo riesgo de infección bacteriana grave mediante urianálisis, ANC y PCT.", descriptionEn:"PECARN rule to identify low risk for serious bacterial infection using urinalysis, ANC, and PCT.", evidenceLevel:"original_derivation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"yos", slug:"yale-observation-scale", shortName:"YOS", nameEs:"Escala de Observación de Yale", nameEn:"Yale Observation Scale", category:"emergency", subcategory:"febrile_infant", type:"scale", populationEs:"Niños de 3-24 meses con enfermedad febril", populationEn:"Febrile children aged 3-24 months", descriptionEs:"Escala clínica de seis dominios para objetivar la apariencia general en enfermedad febril.", descriptionEn:"Six-domain clinical observation scale for overall appearance in febrile illness.", evidenceLevel:"original_derivation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"greulich_pyle", slug:"greulich-pyle", shortName:"Greulich-Pyle", nameEs:"Atlas de Greulich y Pyle", nameEn:"Greulich and Pyle Atlas", category:"growth_nutrition", subcategory:"bone_age", type:"nomogram", populationEs:"Niños y adolescentes con radiografía de mano o muñeca", populationEn:"Children and adolescents with a hand or wrist radiograph", descriptionEs:"Atlas de referencia para estimación de edad ósea; no es una regla de decisión aguda.", descriptionEn:"Reference atlas for bone-age estimation; it is not an acute decision rule.", evidenceLevel:"official_manual_or_institutional_protocol", regulatoryRisk:"medium" }),
  referenceSurface({ id:"tw3", slug:"tanner-whitehouse-3", shortName:"TW3", nameEs:"Tanner-Whitehouse 3", nameEn:"Tanner-Whitehouse 3", category:"growth_nutrition", subcategory:"bone_age", type:"nomogram", populationEs:"Niños y adolescentes con radiografía de mano o muñeca", populationEn:"Children and adolescents with a hand or wrist radiograph", descriptionEs:"Método de referencia para edad ósea que se mantiene diferenciado de Greulich-Pyle.", descriptionEn:"Reference method for bone age, kept distinct from Greulich-Pyle.", evidenceLevel:"official_manual_or_institutional_protocol", regulatoryRisk:"medium" }),
  referenceSurface({ id:"tanner_staging", slug:"tanner-staging", shortName:"Tanner", nameEs:"Estadificación de Tanner", nameEn:"Tanner Sexual Maturity Rating", category:"growth_nutrition", subcategory:"pubertal_development", type:"scale", populationEs:"Niños y adolescentes en valoración puberal", populationEn:"Children and adolescents undergoing pubertal assessment", descriptionEs:"Marco de referencia para describir el desarrollo puberal en estadios.", descriptionEn:"Reference framework for describing pubertal development in stages.", evidenceLevel:"original_derivation_study", regulatoryRisk:"medium" }),
  referenceSurface({ id:"braden_qd", slug:"braden-qd", shortName:"Braden QD", nameEs:"Braden QD", nameEn:"Braden QD", category:"intensive_care", subcategory:"patient_safety", type:"scale", populationEs:"Niños hospitalizados con riesgo de lesión por presión", populationEn:"Hospitalized children at risk of pressure injury", descriptionEs:"Escala de referencia para riesgo de lesión por presión pediátrica.", descriptionEn:"Reference scale for pediatric pressure-injury risk.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"humpty_dumpty_2", slug:"humpty-dumpty-2", shortName:"Humpty Dumpty 2.0", nameEs:"Escala Humpty Dumpty 2.0", nameEn:"Humpty Dumpty Falls Scale 2.0", category:"intensive_care", subcategory:"patient_safety", type:"scale", populationEs:"Niños hospitalizados", populationEn:"Hospitalized children", descriptionEs:"Herramienta externa de referencia para valorar riesgo de caídas pediátricas.", descriptionEn:"External reference tool for pediatric fall-risk assessment.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"mchat_rf", slug:"mchat-rf", shortName:"M-CHAT-R/F", nameEs:"M-CHAT-R/F", nameEn:"M-CHAT-R/F", category:"adolescent_medicine", subcategory:"developmental_screening", type:"scale", populationEs:"Niños pequeños en cribado del desarrollo según la herramienta oficial", populationEn:"Young children undergoing developmental screening under the official instrument", descriptionEs:"Herramienta externa de cribado de autismo; el cuestionario oficial no se reproduce localmente.", descriptionEn:"External autism-screening tool; the official questionnaire is not reproduced locally.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" })
];

const targetExpansionSurfaces: ClinicalToolMetadata[] = [
  referenceSurface({ id:"hjhs_21", slug:"hjhs-21", shortName:"HJHS 2.1", nameEs:"Hemophilia Joint Health Score 2.1", nameEn:"Hemophilia Joint Health Score 2.1", category:"cardiology", subcategory:"hemophilic_arthropathy", type:"scale", populationEs:"Niños y adolescentes con hemofilia", populationEn:"Children and adolescents with hemophilia", descriptionEs:"Herramienta externa para seguimiento de salud articular en hemofilia.", descriptionEn:"External tool for longitudinal joint-health assessment in hemophilia.", evidenceLevel:"external_validation_study", regulatoryRisk:"medium" }),
  referenceSurface({ id:"garcia_alix_ners", slug:"garcia-alix-ne-rs", shortName:"García-Alix NE-RS", nameEs:"Escala García-Alix de encefalopatía neonatal", nameEn:"García-Alix Neonatal Encephalopathy Rating Scale", category:"neonatology", subcategory:"neonatal_encephalopathy", type:"scale", populationEs:"Recién nacidos con encefalopatía neonatal", populationEn:"Newborns with neonatal encephalopathy", descriptionEs:"Escala de referencia para valoración estructurada de encefalopatía neonatal.", descriptionEn:"Reference scale for structured neonatal-encephalopathy assessment.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"pucai", slug:"pucai", shortName:"PUCAI", nameEs:"Índice pediátrico de actividad de colitis ulcerosa", nameEn:"Pediatric Ulcerative Colitis Activity Index", category:"growth_nutrition", subcategory:"inflammatory_bowel_disease", type:"scale", populationEs:"Niños y adolescentes con colitis ulcerosa", populationEn:"Children and adolescents with ulcerative colitis", descriptionEs:"Índice clínico validado de seis dominios para cuantificar actividad de colitis ulcerosa y seguimiento longitudinal.", descriptionEn:"Validated six-domain clinical index for ulcerative-colitis activity and longitudinal follow-up.", evidenceLevel:"original_derivation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"pcdai", slug:"pcdai", shortName:"PCDAI", nameEs:"Índice pediátrico de actividad de Crohn", nameEn:"Pediatric Crohn Disease Activity Index", category:"growth_nutrition", subcategory:"inflammatory_bowel_disease", type:"scale", populationEs:"Niños y adolescentes con enfermedad de Crohn", populationEn:"Children and adolescents with Crohn disease", descriptionEs:"Índice de referencia para actividad de enfermedad de Crohn y seguimiento longitudinal.", descriptionEn:"Reference index for Crohn-disease activity and longitudinal follow-up.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"phoenix_sepsis", slug:"phoenix-sepsis", shortName:"Phoenix", nameEs:"Criterios de sepsis Phoenix", nameEn:"Phoenix Sepsis Criteria", category:"intensive_care", subcategory:"sepsis", type:"clinical_rule", populationEs:"Niños con infección sospechada o confirmada", populationEn:"Children with suspected or confirmed infection", descriptionEs:"Marco de referencia para disfunción orgánica asociada a sepsis pediátrica; no es un cribado precoz.", descriptionEn:"Reference framework for pediatric sepsis-associated organ dysfunction; it is not an early screening tool.", evidenceLevel:"clinical_practice_guideline", regulatoryRisk:"high" }),
  referenceSurface({ id:"parc", slug:"parc", shortName:"pARC", nameEs:"Calculadora pediátrica de riesgo de apendicitis", nameEn:"Pediatric Appendicitis Risk Calculator", category:"emergency", subcategory:"appendicitis", type:"clinical_rule", populationEs:"Niños con sospecha de apendicitis según elegibilidad publicada", populationEn:"Children with suspected appendicitis meeting published eligibility", descriptionEs:"Referencia para estratificación de riesgo de apendicitis pediátrica; no confirma un diagnóstico.", descriptionEn:"Reference for pediatric appendicitis risk stratification; it does not confirm a diagnosis.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"bacterial_meningitis_score", slug:"bacterial-meningitis-score", shortName:"BMS", nameEs:"Puntaje de meningitis bacteriana", nameEn:"Bacterial Meningitis Score", category:"emergency", subcategory:"meningitis", type:"clinical_rule", populationEs:"Niños con meningitis según criterios publicados", populationEn:"Children with meningitis meeting published criteria", descriptionEs:"Regla de referencia para estratificación de riesgo en meningitis pediátrica.", descriptionEn:"Reference rule for risk stratification in pediatric meningitis.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"jumpstart", slug:"jumpstart", shortName:"JumpSTART", nameEs:"JumpSTART", nameEn:"JumpSTART", category:"emergency", subcategory:"mass_casualty", type:"clinical_rule", populationEs:"Niños en incidentes con múltiples víctimas", populationEn:"Children in mass-casualty incidents", descriptionEs:"Marco pediátrico de triage para incidentes con múltiples víctimas; no sustituye protocolos locales.", descriptionEn:"Pediatric mass-casualty triage framework; it does not replace local protocols.", evidenceLevel:"official_manual_or_institutional_protocol", regulatoryRisk:"high" }),
  referenceSurface({ id:"salt_triage", slug:"salt-triage", shortName:"SALT", nameEs:"Triage SALT", nameEn:"SALT Triage", category:"emergency", subcategory:"mass_casualty", type:"clinical_rule", populationEs:"Pacientes pediátricos en incidentes con múltiples víctimas", populationEn:"Pediatric patients in mass-casualty incidents", descriptionEs:"Marco de referencia SALT para triage en incidentes con múltiples víctimas.", descriptionEn:"SALT reference framework for mass-casualty triage.", evidenceLevel:"official_manual_or_institutional_protocol", regulatoryRisk:"high" }),
  referenceSurface({ id:"peld", slug:"peld", shortName:"PELD", nameEs:"PELD", nameEn:"PELD", category:"growth_nutrition", subcategory:"liver_failure", type:"score", populationEs:"Niños con enfermedad hepática avanzada", populationEn:"Children with advanced liver disease", descriptionEs:"Referencia para prioridad de trasplante hepático pediátrico; no sustituye procesos oficiales.", descriptionEn:"Reference for pediatric liver-transplant priority; it does not replace official processes.", evidenceLevel:"official_manual_or_institutional_protocol", regulatoryRisk:"high" }),
  referenceSurface({ id:"ckid_u25", slug:"ckid-u25", shortName:"CKiD U25", nameEs:"CKiD U25 eGFR", nameEn:"CKiD U25 eGFR", category:"nephrology", subcategory:"kidney_function", type:"calculator", populationEs:"Pacientes pediátricos y adultos jóvenes según ecuación publicada", populationEn:"Pediatric and young-adult patients within the published equation", descriptionEs:"Ecuación de referencia para función renal que se mantiene diferenciada de Schwartz 2009.", descriptionEn:"Reference kidney-function equation kept distinct from Schwartz 2009.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"jadas10", slug:"jadas10", shortName:"JADAS10", nameEs:"JADAS10", nameEn:"JADAS10", category:"neurology", subcategory:"juvenile_idiopathic_arthritis", type:"scale", populationEs:"Niños con artritis idiopática juvenil", populationEn:"Children with juvenile idiopathic arthritis", descriptionEs:"Índice de referencia para actividad de artritis idiopática juvenil y seguimiento.", descriptionEn:"Reference index for juvenile idiopathic arthritis activity and follow-up.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"cjadas10", slug:"cjadas10", shortName:"cJADAS10", nameEs:"cJADAS10", nameEn:"cJADAS10", category:"neurology", subcategory:"juvenile_idiopathic_arthritis", type:"scale", populationEs:"Niños con artritis idiopática juvenil", populationEn:"Children with juvenile idiopathic arthritis", descriptionEs:"Versión clínica de referencia de JADAS10 para seguimiento de actividad.", descriptionEn:"Clinical reference version of JADAS10 for activity follow-up.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"pvas", slug:"pvas", shortName:"PVAS", nameEs:"Escala pediátrica de actividad de vasculitis", nameEn:"Paediatric Vasculitis Activity Score", category:"neurology", subcategory:"systemic_vasculitis", type:"scale", populationEs:"Niños con vasculitis sistémica", populationEn:"Children with systemic vasculitis", descriptionEs:"Escala de referencia para actividad de vasculitis pediátrica.", descriptionEn:"Reference scale for pediatric vasculitis activity.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"pednihss", slug:"pednihss", shortName:"PedNIHSS", nameEs:"Escala pediátrica NIH de ictus", nameEn:"Pediatric NIH Stroke Scale", category:"neurology", subcategory:"stroke", type:"scale", populationEs:"Niños con sospecha o diagnóstico de ictus", populationEn:"Children with suspected or diagnosed stroke", descriptionEs:"Escala de referencia para gravedad neurológica en ictus pediátrico.", descriptionEn:"Reference scale for neurologic severity in pediatric stroke.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"modified_bell_nec", slug:"modified-bell-nec", shortName:"Bell", nameEs:"Estadificación de Bell modificada para NEC", nameEn:"Modified Bell Staging for NEC", category:"neonatology", subcategory:"necrotizing_enterocolitis", type:"scale", populationEs:"Recién nacidos con sospecha de enterocolitis necrosante", populationEn:"Newborns with suspected necrotizing enterocolitis", descriptionEs:"Marco de estadificación de referencia para enterocolitis necrosante.", descriptionEn:"Reference staging framework for necrotizing enterocolitis.", evidenceLevel:"clinical_practice_guideline", regulatoryRisk:"high" }),
  referenceSurface({ id:"snappii", slug:"snappe-ii", shortName:"SNAPPE-II", nameEs:"SNAPPE-II", nameEn:"SNAPPE-II", category:"neonatology", subcategory:"neonatal_severity", type:"score", populationEs:"Recién nacidos ingresados en UCI neonatal según la cohorte publicada", populationEn:"Newborns admitted to NICU according to the published cohort", descriptionEs:"Score neonatal de nueve variables para gravedad y riesgo poblacional durante las primeras 12 horas.", descriptionEn:"Nine-variable neonatal score for population-level severity and risk during the first 12 hours.", evidenceLevel:"external_validation_study", regulatoryRisk:"high", references:[{id:"snappe2_open_table",title:"SNAPPE-II in predicting mortality and morbidity in NICU",year:2015,journalOrPublisher:"Journal of Clinical and Diagnostic Research",url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC4625304/",evidenceLevel:"external_validation_study",sourceType:"journal_article",accessType:"open_access",notes:"Open-access table reproduces all nine SNAPPE-II variables and point weights.",appliesTo:["snappii"],priority:1}] }),
  referenceSurface({ id:"crib_ii", slug:"crib-ii", shortName:"CRIB II", nameEs:"CRIB II", nameEn:"CRIB II", category:"neonatology", subcategory:"neonatal_severity", type:"score", populationEs:"Recién nacidos prematuros según criterios publicados", populationEn:"Preterm newborns meeting published criteria", descriptionEs:"Puntaje de referencia para riesgo neonatal en prematuros.", descriptionEn:"Reference score for neonatal risk in preterm infants.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"nsofa", slug:"nsofa", shortName:"nSOFA", nameEs:"nSOFA", nameEn:"nSOFA", category:"neonatology", subcategory:"neonatal_sepsis", type:"score", populationEs:"Recién nacidos con sospecha de sepsis", populationEn:"Newborns with suspected sepsis", descriptionEs:"Puntaje de referencia de disfunción orgánica neonatal asociada a sepsis.", descriptionEn:"Reference score for neonatal sepsis-associated organ dysfunction.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"ispad_dka", slug:"ispad-pediatric-dka-severity", shortName:"ISPAD DKA", nameEs:"Gravedad de cetoacidosis diabética pediátrica ISPAD", nameEn:"ISPAD Pediatric DKA Severity", category:"intensive_care", subcategory:"diabetic_ketoacidosis", type:"clinical_rule", populationEs:"Niños y adolescentes con cetoacidosis diabética", populationEn:"Children and adolescents with diabetic ketoacidosis", descriptionEs:"Marco de referencia para gravedad de cetoacidosis diabética pediátrica según ISPAD.", descriptionEn:"ISPAD reference framework for pediatric diabetic-ketoacidosis severity.", evidenceLevel:"clinical_practice_guideline", regulatoryRisk:"high" }),
  referenceSurface({ id:"c_act", slug:"c-act", shortName:"C-ACT", nameEs:"Test de Control del Asma Infantil", nameEn:"Childhood Asthma Control Test", category:"respiratory", subcategory:"asthma_control", type:"scale", populationEs:"Niños con asma en seguimiento", populationEn:"Children with asthma undergoing follow-up", descriptionEs:"Herramienta externa para control habitual del asma, diferenciada de las escalas de exacerbación aguda.", descriptionEn:"External tool for usual asthma control, distinct from acute-exacerbation scales.", evidenceLevel:"external_validation_study", regulatoryRisk:"medium" }),
  referenceSurface({ id:"track", slug:"track", shortName:"TRACK", nameEs:"TRACK", nameEn:"TRACK", category:"respiratory", subcategory:"asthma_control", type:"scale", populationEs:"Niños pequeños con síntomas respiratorios o asma", populationEn:"Young children with respiratory symptoms or asthma", descriptionEs:"Herramienta de referencia para seguimiento del control respiratorio en niños pequeños.", descriptionEn:"Reference tool for respiratory-control follow-up in young children.", evidenceLevel:"external_validation_study", regulatoryRisk:"medium" }),
  referenceSurface({ id:"asq", slug:"asq-suicide-screen", shortName:"ASQ", nameEs:"ASQ de riesgo suicida", nameEn:"ASQ Suicide Screen", category:"adolescent_medicine", subcategory:"suicide_risk", type:"scale", populationEs:"Adolescentes y jóvenes según el entorno y protocolo publicados", populationEn:"Adolescents and young people within published setting and protocol", descriptionEs:"Cribado de referencia de riesgo suicida; un resultado requiere el circuito de seguridad local.", descriptionEn:"Reference suicide-risk screen; a result requires the local safety pathway.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"crafft_21", slug:"crafft-21", shortName:"CRAFFT 2.1", nameEs:"CRAFFT 2.1", nameEn:"CRAFFT 2.1", category:"adolescent_medicine", subcategory:"substance_use", type:"scale", populationEs:"Adolescentes", populationEn:"Adolescents", descriptionEs:"Herramienta externa de cribado de consumo de sustancias en adolescentes.", descriptionEn:"External adolescent substance-use screening tool.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"phq9_adolescent", slug:"phq-9-adolescent", shortName:"PHQ-9", nameEs:"PHQ-9 para adolescentes", nameEn:"PHQ-9 Adolescent", category:"adolescent_medicine", subcategory:"depression", type:"scale", populationEs:"Adolescentes", populationEn:"Adolescents", descriptionEs:"Cribado de referencia de síntomas depresivos; no establece diagnóstico por sí solo.", descriptionEn:"Reference screen for depressive symptoms; it does not establish a diagnosis alone.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"gad7_adolescent", slug:"gad-7-adolescent", shortName:"GAD-7", nameEs:"GAD-7 para adolescentes", nameEn:"GAD-7 Adolescent", category:"adolescent_medicine", subcategory:"anxiety", type:"scale", populationEs:"Adolescentes", populationEn:"Adolescents", descriptionEs:"Cribado de referencia de síntomas de ansiedad en adolescentes.", descriptionEn:"Reference screen for anxiety symptoms in adolescents.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"scoff", slug:"scoff", shortName:"SCOFF", nameEs:"SCOFF", nameEn:"SCOFF", category:"adolescent_medicine", subcategory:"eating_disorder", type:"scale", populationEs:"Adolescentes y jóvenes según contexto clínico", populationEn:"Adolescents and young people in the appropriate clinical context", descriptionEs:"Cribado de referencia de posible trastorno de la conducta alimentaria.", descriptionEn:"Reference screen for possible eating disorder.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"vanderbilt", slug:"nichq-vanderbilt", shortName:"Vanderbilt", nameEs:"Escala NICHQ Vanderbilt", nameEn:"NICHQ Vanderbilt Scale", category:"adolescent_medicine", subcategory:"adhd", type:"scale", populationEs:"Niños en evaluación de TDAH según el instrumento autorizado", populationEn:"Children undergoing ADHD assessment with the authorized instrument", descriptionEs:"Herramienta externa para evaluación estructurada de síntomas de TDAH.", descriptionEn:"External tool for structured ADHD-symptom assessment.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"headsss", slug:"headsss", shortName:"HEADSSS", nameEs:"Entrevista HEADSSS", nameEn:"HEADSSS Interview", category:"adolescent_medicine", subcategory:"psychosocial_risk", type:"scale", populationEs:"Adolescentes", populationEn:"Adolescents", descriptionEs:"Marco clínico de referencia para entrevista psicosocial del adolescente.", descriptionEn:"Reference clinical framework for adolescent psychosocial interviewing.", evidenceLevel:"peer_reviewed_review", regulatoryRisk:"high" })
];

const reconciliationSurfaces: ClinicalToolMetadata[] = [
  referenceSurface({ id:"comfort_b", slug:"comfort-b", shortName:"COMFORT-B", nameEs:"COMFORT / COMFORT-B", nameEn:"COMFORT / COMFORT-B", category:"intensive_care", subcategory:"sedation", type:"scale", populationEs:"Niños críticamente enfermos, especialmente con ventilación mecánica", populationEn:"Critically ill children, especially those receiving mechanical ventilation", descriptionEs:"Escala de referencia para valoración seriada de sedación y distrés en cuidados intensivos pediátricos.", descriptionEn:"Reference scale for serial assessment of sedation and distress in pediatric intensive care.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"n_pass", slug:"n-pass", shortName:"N-PASS", nameEs:"Escala Neonatal de Dolor, Agitación y Sedación", nameEn:"Neonatal Pain, Agitation and Sedation Scale", category:"neonatology", subcategory:"pain_sedation", type:"scale", populationEs:"Recién nacidos, incluidos prematuros, en cuidados neonatales", populationEn:"Newborns, including preterm infants, in neonatal care", descriptionEs:"Escala de referencia para dolor, agitación y sedación neonatal con uso seriado.", descriptionEn:"Reference scale for neonatal pain, agitation and sedation with serial use.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"edin", slug:"edin", shortName:"EDIN", nameEs:"Échelle Douleur Inconfort Nouveau-Né", nameEn:"Échelle Douleur Inconfort Nouveau-Né", category:"neonatology", subcategory:"prolonged_pain", type:"scale", populationEs:"Recién nacidos, especialmente prematuros, con dolor o malestar prolongado", populationEn:"Newborns, especially preterm infants, with prolonged pain or discomfort", descriptionEs:"Escala de referencia para dolor o malestar neonatal prolongado y su seguimiento.", descriptionEn:"Reference scale for prolonged neonatal pain or discomfort and follow-up.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"nfcs", slug:"nfcs", shortName:"NFCS", nameEs:"Sistema de Codificación Facial Neonatal", nameEn:"Neonatal Facial Coding System", category:"neonatology", subcategory:"neonatal_pain", type:"scale", populationEs:"Recién nacidos en valoración observacional del dolor", populationEn:"Newborns undergoing observational pain assessment", descriptionEs:"Superficie visual y de referencia sobre acciones faciales asociadas al dolor neonatal; no reproduce imágenes protegidas.", descriptionEn:"Visual and reference surface about facial actions associated with neonatal pain; it does not reproduce protected images.", evidenceLevel:"original_derivation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"cmas", slug:"cmas", shortName:"CMAS", nameEs:"Escala de Evaluación de Miositis Infantil", nameEn:"Childhood Myositis Assessment Scale", category:"rheumatology", subcategory:"juvenile_dermatomyositis", type:"scale", populationEs:"Niños con miopatía inflamatoria idiopática juvenil", populationEn:"Children with juvenile idiopathic inflammatory myopathy", descriptionEs:"Escala de referencia para rendimiento muscular funcional y seguimiento longitudinal.", descriptionEn:"Reference scale for functional muscle performance and longitudinal follow-up.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"mmt8", slug:"mmt8", shortName:"MMT8", nameEs:"Prueba Muscular Manual de 8 grupos", nameEn:"Manual Muscle Testing 8", category:"rheumatology", subcategory:"myositis", type:"scale", populationEs:"Niños con sospecha o diagnóstico de miopatía inflamatoria", populationEn:"Children with suspected or diagnosed inflammatory myopathy", descriptionEs:"Marco de exploración y referencia para valorar fuerza muscular en ocho grupos y seguir su evolución.", descriptionEn:"Examination and reference framework for assessing strength in eight muscle groups and serial change.", evidenceLevel:"clinical_practice_guideline", regulatoryRisk:"high" }),
  referenceSurface({ id:"chaq", slug:"chaq", shortName:"CHAQ", nameEs:"Cuestionario de Evaluación de la Salud Infantil", nameEn:"Childhood Health Assessment Questionnaire", category:"rheumatology", subcategory:"functional_status", type:"scale", populationEs:"Niños con enfermedad reumatológica", populationEn:"Children with rheumatic disease", descriptionEs:"Superficie externa de referencia para discapacidad y limitación funcional; no reproduce el cuestionario protegido.", descriptionEn:"External reference surface for disability and functional limitation; it does not reproduce the protected questionnaire.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"j4s", slug:"j4s", shortName:"J4S", nameEs:"Puntuación de Gravedad de Esclerosis Sistémica Juvenil", nameEn:"Juvenile Systemic Sclerosis Severity Score", category:"rheumatology", subcategory:"juvenile_systemic_sclerosis", type:"scale", populationEs:"Niños con esclerosis sistémica juvenil", populationEn:"Children with juvenile systemic sclerosis", descriptionEs:"Escala especializada de referencia para valoración multisistémica y seguimiento longitudinal.", descriptionEn:"Specialist reference scale for multisystem assessment and longitudinal follow-up.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"jdm_disease_activity_score", slug:"jdm-disease-activity-score", shortName:"JDM DAS", nameEs:"Puntuación de Actividad de Dermatomiositis Juvenil", nameEn:"Juvenile Dermatomyositis Disease Activity Score", category:"rheumatology", subcategory:"juvenile_dermatomyositis", type:"scale", populationEs:"Niños con dermatomiositis juvenil", populationEn:"Children with juvenile dermatomyositis", descriptionEs:"Superficie de referencia para actividad muscular y cutánea, diferenciada del daño acumulado.", descriptionEn:"Reference surface for muscle and skin disease activity, kept distinct from accumulated damage.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"myositis_damage_index", slug:"myositis-damage-index", shortName:"MDI", nameEs:"Índice de Daño por Miositis", nameEn:"Myositis Damage Index", category:"rheumatology", subcategory:"myositis", type:"scale", populationEs:"Niños con miopatía inflamatoria en seguimiento", populationEn:"Children with inflammatory myopathy undergoing follow-up", descriptionEs:"Referencia longitudinal para daño persistente acumulado, diferenciado de la actividad inflamatoria actual.", descriptionEn:"Longitudinal reference for accumulated persistent damage, distinct from current inflammatory activity.", evidenceLevel:"clinical_practice_guideline", regulatoryRisk:"high" }),
  referenceSurface({ id:"pgals", slug:"pgals", shortName:"pGALS", nameEs:"Exploración Pediátrica de Marcha, Brazos, Piernas y Columna", nameEn:"Paediatric Gait, Arms, Legs and Spine Examination", category:"rheumatology", subcategory:"musculoskeletal_examination", type:"clinical_rule", populationEs:"Niños que requieren cribado musculoesquelético", populationEn:"Children requiring musculoskeletal screening", descriptionEs:"Marco estructurado de exploración musculoesquelética pediátrica sin puntuación numérica.", descriptionEn:"Structured pediatric musculoskeletal examination framework without a numeric score.", evidenceLevel:"peer_reviewed_review", regulatoryRisk:"medium" }),
  referenceSurface({ id:"prems", slug:"prems", shortName:"pREMS", nameEs:"Exploración Regional Pediátrica del Sistema Musculoesquelético", nameEn:"Paediatric Regional Examination of the Musculoskeletal System", category:"rheumatology", subcategory:"regional_musculoskeletal_examination", type:"clinical_rule", populationEs:"Niños con exploración pGALS anormal o síntomas musculoesqueléticos focales", populationEn:"Children with an abnormal pGALS examination or focal musculoskeletal symptoms", descriptionEs:"Atlas de referencia para exploración musculoesquelética regional pediátrica.", descriptionEn:"Reference atlas for regional pediatric musculoskeletal examination.", evidenceLevel:"peer_reviewed_review", regulatoryRisk:"medium" }),
  referenceSurface({ id:"modified_ross", slug:"modified-ross", shortName:"Ross", nameEs:"Clasificación de Ross modificada", nameEn:"Modified Ross Classification", category:"cardiology", subcategory:"heart_failure", type:"scale", populationEs:"Lactantes, niños y adolescentes con insuficiencia cardiaca", populationEn:"Infants, children and adolescents with heart failure", descriptionEs:"Clasificación funcional pediátrica de referencia para gravedad de insuficiencia cardiaca.", descriptionEn:"Pediatric functional reference classification for heart-failure severity.", evidenceLevel:"clinical_practice_guideline", regulatoryRisk:"high" }),
  referenceSurface({ id:"pedmidas", slug:"pedmidas", shortName:"PedMIDAS", nameEs:"Evaluación Pediátrica de Discapacidad por Migraña", nameEn:"Pediatric Migraine Disability Assessment", category:"neurology", subcategory:"headache", type:"scale", populationEs:"Niños y adolescentes con migraña", populationEn:"Children and adolescents with migraine", descriptionEs:"Superficie externa de referencia para discapacidad relacionada con migraña y seguimiento longitudinal.", descriptionEn:"External reference surface for migraine-related disability and longitudinal follow-up.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"scared", slug:"scared", shortName:"SCARED", nameEs:"Cribado de Trastornos Emocionales Relacionados con la Ansiedad Infantil", nameEn:"Screen for Child Anxiety Related Emotional Disorders", category:"behavioral_health", subcategory:"anxiety", type:"scale", populationEs:"Niños y adolescentes en cribado de síntomas de ansiedad", populationEn:"Children and adolescents undergoing anxiety-symptom screening", descriptionEs:"Superficie externa de referencia para cribado de ansiedad; no reproduce el cuestionario protegido.", descriptionEn:"External reference surface for anxiety screening; it does not reproduce the protected questionnaire.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"psc", slug:"pediatric-symptom-checklist", shortName:"PSC", nameEs:"Lista de Síntomas Pediátricos", nameEn:"Pediatric Symptom Checklist", category:"behavioral_health", subcategory:"psychosocial_screening", type:"scale", populationEs:"Niños y adolescentes en cribado psicosocial", populationEn:"Children and adolescents undergoing psychosocial screening", descriptionEs:"Superficie externa de referencia para cribado psicosocial general y sus versiones autorizadas.", descriptionEn:"External reference surface for broad psychosocial screening and authorized versions.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"acq", slug:"asthma-control-questionnaire", shortName:"ACQ", nameEs:"Cuestionario de Control del Asma", nameEn:"Asthma Control Questionnaire", category:"respiratory", subcategory:"asthma_control", type:"scale", populationEs:"Niños con asma en seguimiento dentro de la edad aplicable a la versión autorizada", populationEn:"Children with asthma undergoing follow-up within the authorized version's age range", descriptionEs:"Superficie externa de referencia para control seriado del asma, diferenciada de las escalas de exacerbación aguda.", descriptionEn:"External reference surface for serial asthma control, distinct from acute-exacerbation scales.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"wpcdai", slug:"wpcdai", shortName:"wPCDAI", nameEs:"Índice Pediátrico Ponderado de Actividad de Crohn", nameEn:"Weighted Pediatric Crohn Disease Activity Index", category:"gastroenterology", subcategory:"inflammatory_bowel_disease", type:"scale", populationEs:"Niños y adolescentes con enfermedad de Crohn", populationEn:"Children and adolescents with Crohn disease", descriptionEs:"Variante ponderada diferenciada del PCDAI original para valorar actividad y seguimiento; el cálculo local no está activo.", descriptionEn:"Weighted variant kept distinct from original PCDAI for activity assessment and follow-up; local calculation is not active.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"fnass_21", slug:"fnass-21", shortName:"FNASS", nameEs:"Sistema de Puntuación de Abstinencia Neonatal de Finnegan de 21 ítems", nameEn:"21-item Finnegan Neonatal Abstinence Scoring System", category:"neonatology", subcategory:"neonatal_withdrawal", type:"scale", populationEs:"Recién nacidos a término expuestos intraútero a sustancias psicoactivas, especialmente opioides", populationEn:"Term newborns exposed in utero to psychoactive substances, particularly opioids", descriptionEs:"FNAST de 21 síntomas para evaluación longitudinal de signos de abstinencia neonatal; salida descriptiva sin instrucciones terapéuticas.", descriptionEn:"21-symptom FNAST for longitudinal assessment of neonatal withdrawal signs; descriptive output without treatment instructions.", evidenceLevel:"official_manual_or_institutional_protocol", regulatoryRisk:"high", references:implementedToolReferences.fnass_21! })
];

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
    "high",
    "low",
    baseValidationNotes.ready,
    [docRef("apgar_kb", "PedsCore_Knowledge_Base_v1: Apgar", "pending_verification")]
  ),
  makeTool("silverman_andersen", "silverman-andersen", "Silverman-Andersen", "Score de Silverman-Andersen", "Silverman-Andersen Score", "neonatology", "respiratory_distress", "score", "Recien nacidos con dificultad respiratoria", "Newborns with respiratory distress", "Cuantifica dificultad respiratoria neonatal mediante signos clinicos.", "Scores neonatal respiratory distress using clinical signs.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("wood_downes_ferres", "wood-downes-ferres", "WDF", "Score de Wood-Downes-Ferres", "Wood-Downes-Ferres Score", "respiratory", "bronchiolitis_wheezing", "score", "Lactantes y ninos con bronquiolitis u obstruccion respiratoria segun variante", "Infants and children with bronchiolitis or obstructive respiratory distress depending on variant", "Evalua gravedad de dificultad respiratoria obstructiva.", "Assesses severity of obstructive respiratory distress.", "ready_for_implementation", "secondary_source", "medium", woodDownesValidationNotes),
  makeTool("ballard", "ballard", "Ballard", "Ballard / New Ballard", "Ballard / New Ballard", "neonatology", "gestational_age", "score", "Recien nacidos con edad gestacional incierta", "Newborns with uncertain gestational age", "Estima edad gestacional con madurez fisica y neuromuscular.", "Estimates gestational age using physical and neuromuscular maturity.", "pending_validation", "original_derivation_study", "medium", ballardValidationNotes),
  makeTool("dubowitz", "dubowitz", "Dubowitz", "Dubowitz", "Dubowitz Score", "neonatology", "gestational_age", "score", "Recien nacidos", "Newborns", "Herramienta de estimacion de edad gestacional basada en madurez neonatal.", "Gestational age assessment based on neonatal maturity.", "pending_validation", "original_derivation_study", "medium", dubowitzValidationNotes),
  makeTool("sarnat", "sarnat", "Sarnat", "Sarnat clasico (1976)", "Classic Sarnat Staging (1976)", "neonatology", "hypoxic_ischemic_encephalopathy", "scale", "Recien nacidos de termino o casi termino con encefalopatia neonatal", "Term or near-term newborns with neonatal encephalopathy", "Marco clasico descriptivo de estadificacion I, II y III de encefalopatia neonatal, con integracion clinica, autonomica y electroencefalografica.", "Classic descriptive Stage I, II and III neonatal encephalopathy framework integrating clinical, autonomic and electroencephalographic findings.", "implemented", "original_derivation_study", "high", sarnatValidationNotes),
  makeTool("modified_sarnat_nichd", "modified-sarnat-nichd", "Modified Sarnat", "Modified Sarnat / NICHD", "Modified Sarnat / NICHD", "neonatology", "hypoxic_ischemic_encephalopathy", "score", "Recien nacidos evaluados por encefalopatia neonatal", "Newborns assessed for neonatal encephalopathy", "Exploracion estructurada de seis categorias con gravedad 0-3 y Total Sarnat Score 0-18.", "Six-category structured examination with 0-3 severity coding and a 0-18 Total Sarnat Score.", "pending_validation", "external_validation_study", "high", modifiedSarnatValidationNotes),
  makeTool("thompson_hie", "thompson-hie-score", "Thompson HIE", "Puntaje de Thompson para EHI", "Thompson HIE Score", "neonatology", "hypoxic_ischemic_encephalopathy", "score", "Recien nacidos con encefalopatia hipoxico-isquemica", "Newborns with hypoxic-ischemic encephalopathy", "Score clinico longitudinal de nueve dominios para describir gravedad de encefalopatia neonatal.", "Nine-domain longitudinal clinical score describing neonatal encephalopathy severity.", "pending_validation", "original_derivation_study", "high", thompsonHieEvidenceValidationNotes),
  makeTool("eat_sleep_console", "eat-sleep-console", "ESC", "Eat Sleep Console", "Eat Sleep Console", "neonatology", "neonatal_abstinence", "algorithm", "Recien nacidos expuestos a opioides", "Opioid-exposed newborns", "Modelo funcional para seguimiento de abstinencia neonatal.", "Functional model for neonatal withdrawal assessment.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("nips", "nips", "NIPS", "Neonatal Infant Pain Scale", "Neonatal Infant Pain Scale", "pain", "neonatal_pain", "scale", "Neonatos", "Neonates", "Escala observacional de dolor neonatal.", "Observational neonatal pain scale.", "ready_for_implementation", "moderate", "low", nipsQaValidationNotes, [docRef("nips_kb", "PedsCore_Knowledge_Base_v1: NIPS", "pending_verification")]),
  makeTool("pipp", "pipp", "PIPP", "Premature Infant Pain Profile", "Premature Infant Pain Profile", "pain", "neonatal_pain", "scale", "Prematuros y neonatos", "Preterm infants and neonates", "Escala de dolor neonatal, especialmente en prematuros.", "Neonatal pain scale, especially for preterm infants.", "pending_validation", "pending_verification", "medium", pippValidationNotes),
  makeTool("pipp_r", "pipp-r", "PIPP-R", "Premature Infant Pain Profile-Revised", "Premature Infant Pain Profile-Revised", "pain", "neonatal_pain", "scale", "Prematuros y neonatos", "Preterm infants and neonates", "Version revisada de PIPP.", "Revised version of PIPP.", "pending_validation", "pending_verification", "medium", pippValidationNotes),
  makeTool("cries", "cries", "CRIES", "CRIES", "CRIES", "pain", "neonatal_pain", "scale", "Neonatos con dolor postoperatorio", "Neonates with postoperative pain", "Escala neonatal de dolor basada en cinco dominios.", "Neonatal pain scale based on five domains.", "pending_validation", "pending_verification", "low", criesValidationNotes, [docRef("cries_kb", "PedsCore_Knowledge_Base_v1: CRIES", "pending_verification")]),
  makeTool("comfortneo", "comfortneo", "COMFORTneo", "COMFORTneo", "COMFORTneo", "neonatology", "sedation_pain", "scale", "Neonatos en cuidados intensivos", "Neonates in intensive care", "Escala multidimensional de sedacion y dolor neonatal.", "Multidimensional neonatal sedation and pain scale.", "pending_validation", "pending_verification", "medium", comfortneoValidationNotes),
  makeTool("bhutani_nomogram", "bhutani-nomogram", "Bhutani", "Nomograma de Bhutani", "Bhutani Nomogram", "neonatology", "jaundice_bilirubin", "nomogram", "Recien nacidos con hiperbilirrubinemia", "Newborns with hyperbilirubinemia", "Nomograma de riesgo para bilirrubina neonatal.", "Risk nomogram for neonatal bilirubin.", "pending_validation", "original_derivation_study", "medium", bhutaniValidationNotes),
  makeTool("aap_2022_hyperbilirubinemia", "aap-2022-neonatal-hyperbilirubinemia", "AAP Bili 2022", "Hiperbilirrubinemia neonatal AAP 2022", "AAP 2022 Neonatal Hyperbilirubinemia", "neonatology", "jaundice_bilirubin", "algorithm", "Recien nacidos de 35 o mas semanas de gestacion", "Newborn infants 35 or more weeks of gestation", "Acceso operativo a los umbrales de fototerapia y exanguinotransfusion de la guia AAP 2022 mediante PediTools.", "Operational access to the 2022 AAP phototherapy and exchange-transfusion thresholds through PediTools.", "implemented", "clinical_practice_guideline", "high", aap2022HyperbilirubinemiaValidationNotes),
  makeTool("neonatal_growth_fenton", "neonatal-growth-fenton", "Fenton", "Crecimiento neonatal Fenton", "Fenton Neonatal Growth", "neonatology", "growth", "percentile", "Recien nacidos prematuros", "Preterm newborns", "Referencia de crecimiento neonatal para prematuros.", "Neonatal growth reference for preterm infants.", "pending_validation", "systematic_review", "medium", fentonValidationNotes),
  makeTool("fenton_2025_growth", "fenton-2025-preterm-growth", "Fenton 2025", "Crecimiento prematuro Fenton 2025", "Fenton 2025 Preterm Growth", "neonatology", "growth", "percentile", "Recien nacidos prematuros y seguimiento hasta 50 semanas de edad postmenstrual", "Preterm newborns and follow-up through 50 weeks postmenstrual age", "Curvas Fenton de tercera generacion para peso, longitud y perimetro cefalico con acceso externo a percentiles y z-scores.", "Third-generation Fenton charts for weight, length, and head circumference with external access to percentiles and Z-scores.", "implemented", "systematic_review", "medium", fenton2025ValidationNotes),
  makeTool("brighton_pews", "brighton-pews", "Brighton PEWS", "Brighton PEWS", "Brighton PEWS", "emergency", "early_warning", "score", "Ninos hospitalizados", "Hospitalized children", "Variante de PEWS identificada para revision.", "PEWS variant identified for review.", "pending_validation", "original_derivation_study", "medium", brightonPewsValidationNotes),
  makeTool("bedside_pews", "bedside-pews", "Bedside PEWS", "Bedside PEWS", "Bedside PEWS", "emergency", "early_warning", "score", "Ninos hospitalizados en plantas de hospitalizacion", "Children hospitalized on inpatient wards", "Score de siete items para cuantificar gravedad y detectar deterioro clinico evolutivo en pacientes pediatricos hospitalizados.", "Seven-item score to quantify severity and detect evolving clinical deterioration in hospitalized pediatric patients.", "implemented", "external_validation_study", "medium", bedsidePewsValidationNotes),
  makeTool("westley_croup", "westley-croup-score", "Westley", "Westley Croup Score", "Westley Croup Score", "respiratory", "croup", "score", "Ninos con crup", "Children with croup", "Evalua gravedad del crup mediante signos clinicos.", "Assesses croup severity using clinical signs.", "ready_for_implementation", "moderate", "medium", westleyQaValidationNotes),
  makeTool("modified_tal", "modified-tal", "Tal", "Escala de Tal modificada", "Modified Tal Score", "respiratory", "bronchiolitis", "score", "Lactantes y niños pequeños con bronquiolitis o dificultad respiratoria obstructiva", "Infants and young children with bronchiolitis or obstructive respiratory distress", "Escala clínica de 0-12 basada en frecuencia respiratoria ajustada por edad, sibilancias/crepitantes, retracciones y saturación de oxígeno.", "0-12 clinical score based on age-adjusted respiratory rate, wheeze/crackles, retractions, and oxygen saturation.", "pending_validation", "external_validation_study", "medium", { es: "Variante modificada trazada a SEUP 2024 y validación publicada.", en: "Modified variant traced to SEUP 2024 and published validation." }),
  makeTool("taussig_croup", "taussig-croup-score", "Taussig", "Escala de Taussig para laringitis", "Taussig Croup Score", "respiratory", "croup", "score", "Niños con laringitis aguda/crup", "Children with acute croup", "Escala clínica de 0-15 para valorar gravedad mediante estridor, entrada de aire, color, retracciones y conciencia.", "0-15 clinical severity score using stridor, air entry, color, retractions, and consciousness.", "pending_validation", "original_derivation_study", "medium", { es: "Tabla clínica trazada a Taussig 1975 y SEUP 2024.", en: "Clinical table traced to Taussig 1975 and SEUP 2024." }),
  makeTool("pram", "pram", "PRAM", "Pediatric Respiratory Assessment Measure", "Pediatric Respiratory Assessment Measure", "respiratory", "asthma_wheezing", "score", "Ninos de 2 a menos de 18 anos con exacerbacion de asma aguda", "Children aged 2 to under 18 years with an acute asthma exacerbation", "Mide de forma descriptiva la gravedad de una exacerbacion de asma aguda y su cambio en evaluaciones seriadas.", "Descriptively measures acute asthma exacerbation severity and change across serial assessments.", "ready_for_implementation", "high", "medium", pramQaValidationNotes),
  makeTool("rdai", "rdai", "RDAI", "Respiratory Distress Assessment Instrument", "Respiratory Distress Assessment Instrument", "respiratory", "bronchiolitis", "score", "Lactantes y niños pequeños con sibilancias/bronquiolitis según población publicada", "Infants and young children with wheezing/bronchiolitis according to the published population", "RDAI 0-17 para cuantificar sibilancias y retracciones.", "RDAI 0-17 to quantify wheezing and retractions.", "implemented", "original_derivation_study", "medium", rdaiValidationNotes),
  makeTool("brosjod", "brosjod", "BROSJOD", "BROSJOD", "BROSJOD", "respiratory", "bronchiolitis", "score", "Lactantes con bronquiolitis", "Infants with bronchiolitis", "Escala de bronquiolitis identificada en recomendaciones.", "Bronchiolitis scale identified in recommendations.", "pending_validation", "external_validation_study", "medium", brosjodValidationNotes),
  makeTool("pass", "pass", "PASS", "Pediatric Asthma Severity Score", "Pediatric Asthma Severity Score", "respiratory", "asthma", "score", "Ninos de 1 a 18 anos con exacerbacion aguda de asma", "Children aged 1 to 18 years with acute asthma exacerbation", "PASS original de Gorelick: tres dominios clinicos, total 0-6.", "Original Gorelick PASS: three clinical domains, total 0-6.", "implemented", "original_derivation_study", "medium", passValidationNotes),
  makeTool("risc", "risc", "RISC", "RISC", "RISC", "respiratory", "pneumonia", "score", "Ninos con neumonia", "Children with pneumonia", "Score de gravedad de neumonia identificado en recomendaciones.", "Pneumonia severity score identified in recommendations.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("mrisc", "mrisc", "mRISC", "mRISC", "mRISC", "respiratory", "pneumonia", "score", "Ninos con neumonia", "Children with pneumonia", "Variante modificada RISC para neumonia.", "Modified RISC variant for pneumonia.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("pediatric_gcs", "pediatric-glasgow-coma-scale", "pGCS", "Escala de Coma de Glasgow pediatrica", "Pediatric Glasgow Coma Scale", "neurology", "consciousness", "scale", "Ninos con necesidad de valoracion neurologica", "Children requiring neurologic assessment", "Adaptacion pediatrica de apertura ocular, respuesta verbal y motora.", "Pediatric adaptation of eye, verbal, and motor response.", "pending_validation", "pending_verification", "medium", pediatricGcsValidationNotes),
  makeTool("clinical_dehydration_scale", "clinical-dehydration-scale", "CDS", "Clinical Dehydration Scale", "Clinical Dehydration Scale", "emergency", "dehydration", "score", "Ninos con sospecha de deshidratacion", "Children with suspected dehydration", "Score clinico de gravedad de deshidratacion.", "Clinical score for dehydration severity.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("pediatric_appendicitis_score", "pediatric-appendicitis-score", "PAS", "Pediatric Appendicitis Score", "Pediatric Appendicitis Score", "emergency", "abdominal_pain", "score", "Ninos con dolor abdominal y sospecha clinica de apendicitis", "Children with abdominal pain and clinical concern for appendicitis", "Calculadora educativa de riesgo de apendicitis pediatrica basada en ocho items clinicos y analiticos.", "Educational pediatric appendicitis risk calculator based on eight clinical and laboratory items.", "ready_for_implementation", "original_derivation_study", "medium", pediatricAppendicitisScoreValidationNotes),
  makeTool("gorelick_dehydration", "gorelick-dehydration", "Gorelick", "Escala de Gorelick", "Gorelick Dehydration Scale", "emergency", "dehydration", "score", "Ninos de 1 mes a 5 anos con sospecha de deshidratacion", "Children aged 1 month to 5 years with suspected dehydration", "Escala de Gorelick de 10 signos con recuento 0-10.", "Gorelick 10-sign dehydration scale, score 0-10.", "implemented", "original_derivation_study", "medium", gorelickValidationNotes),
  makeTool("pediatric_burn_tbsa", "pediatric-burn-tbsa", "TBSA Burns", "Estimacion TBSA de quemaduras pediatrica", "Pediatric Burn TBSA Estimate", "emergency", "burns", "calculator", "Pacientes pediatricos con quemaduras de espesor parcial o total", "Pediatric patients with partial-thickness or full-thickness burns", "Estimacion descriptiva de superficie corporal quemada usando porcentajes regionales pediatricos ajustados por edad.", "Descriptive burned total body surface area estimate using pediatric age-adjusted regional percentages.", "ready_for_implementation", "official_manual_or_institutional_protocol", "medium", pediatricBurnTbsaValidationNotes),
  makeTool("pecarn_tbi_under_2", "pecarn-tbi-under-2", "PECARN <2", "PECARN TCE menor de 2 anos", "PECARN TBI Under 2 Years", "emergency", "head_trauma", "clinical_rule", "Menores de 2 anos con traumatismo craneal", "Children under 2 years with head trauma", "Regla clinica PECARN para estratificacion de riesgo en TCE.", "PECARN clinical rule for TBI risk stratification.", "ready_for_implementation", "high", "medium", baseValidationNotes.ready),
  makeTool("pecarn_tbi_2_or_more", "pecarn-tbi-2-or-more", "PECARN >=2", "PECARN TCE 2 anos o mas", "PECARN TBI 2 Years or Older", "emergency", "head_trauma", "clinical_rule", "Ninos de 2 anos o mas con traumatismo craneal", "Children 2 years or older with head trauma", "Regla clinica PECARN para estratificacion de riesgo en TCE.", "PECARN clinical rule for TBI risk stratification.", "ready_for_implementation", "high", "medium", baseValidationNotes.ready),
  makeTool("catch_tbi", "catch-tbi", "CATCH", "CATCH", "CATCH", "emergency", "head_trauma", "clinical_rule", "Ninos con traumatismo craneal", "Children with head trauma", "Regla de decision de TCE identificada para revision.", "TBI decision rule identified for review.", "ready_for_implementation", "original_derivation_study", "medium", catchValidationNotes),
  makeTool("chalice_tbi", "chalice-tbi", "CHALICE", "CHALICE", "CHALICE", "emergency", "head_trauma", "clinical_rule", "Ninos con traumatismo craneal", "Children with head trauma", "Regla de decision de TCE identificada para revision.", "TBI decision rule identified for review.", "ready_for_implementation", "original_derivation_study", "medium", chaliceValidationNotes),
  makeTool("sipa", "sipa", "SIPA", "Shock Index Pediatric Age-adjusted", "Shock Index Pediatric Age-adjusted", "emergency", "shock", "calculator", "Pacientes de 4 a 16 anos con traumatismo", "Trauma patients aged 4 to 16 years", "Indice de shock ajustado por edad para estratificacion pronostica en trauma pediatrico.", "Age-adjusted shock index for prognostic stratification in pediatric trauma.", "ready_for_implementation", "external_validation_study", "medium", sipaValidationNotes),
  makeTool("qtc_bazett", "qtc-bazett", "QTc Bazett", "QTc Bazett", "QTc Bazett", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Bazett.", "QT correction using Bazett formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("qtc_fridericia", "qtc-fridericia", "QTc Fridericia", "QTc Fridericia", "QTc Fridericia", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Fridericia.", "QT correction using Fridericia formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("qtc_framingham", "qtc-framingham", "QTc Framingham", "QTc Framingham", "QTc Framingham", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Framingham.", "QT correction using Framingham formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("qtc_hodges", "qtc-hodges", "QTc Hodges", "QTc Hodges", "QTc Hodges", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Hodges.", "QT correction using Hodges formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("bedside_schwartz", "bedside-schwartz", "Bedside Schwartz", "Bedside Schwartz", "Bedside Schwartz", "nephrology", "egfr", "calculator", "Ninos con creatinina y talla disponibles", "Children with available creatinine and height", "Estimacion de filtrado glomerular pediatrico.", "Pediatric estimated glomerular filtration rate.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("revised_schwartz", "revised-schwartz", "Schwartz", "Schwartz revisado", "Revised Schwartz", "nephrology", "egfr", "calculator", "Ninos con talla, creatinina, cistatina C, BUN y sexo disponibles", "Children with available height, creatinine, cystatin C, BUN, and sex", "Formula CKiD 2009 multivariable para eGFR pediatrico estimado.", "2009 multivariable CKiD equation for estimated pediatric eGFR.", "ready_for_implementation", "original_derivation_study", "medium", revisedSchwartzReadyNotes),
  makeTool("prifle", "prifle", "pRIFLE", "pRIFLE", "pRIFLE", "nephrology", "acute_kidney_injury", "clinical_rule", "Ninos con riesgo de lesion renal aguda", "Children at risk of acute kidney injury", "Clasificacion pRIFLE por descenso de eCCl y diuresis.", "pRIFLE classification by eCCl decline and urine output.", "implemented", "original_derivation_study", "medium", prifleValidationNotes),
  makeTool("kdigo_pediatric", "kdigo-pediatric", "KDIGO pediatrico", "KDIGO pediatrico", "Pediatric KDIGO", "nephrology", "acute_kidney_injury", "clinical_rule", "Ninos con riesgo de lesion renal aguda", "Children at risk of acute kidney injury", "Aplicacion pediatrica de criterios KDIGO para lesion renal aguda.", "Pediatric application of KDIGO criteria for acute kidney injury.", "pending_validation", "pending_verification", "medium"),
  makeTool("psofa", "psofa", "pSOFA", "pSOFA", "Pediatric Sequential Organ Failure Assessment", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Puntaje pediatrico de seis sistemas para cuantificar disfuncion organica.", "Six-system pediatric score for organ dysfunction.", "implemented", "original_derivation_study", "high", baseValidationNotes.ready),
  makeTool("pelod", "pelod", "PELOD", "PELOD", "PELOD", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Score de disfuncion organica pediatrica.", "Pediatric organ dysfunction score.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pelod_2", "pelod-2", "PELOD-2", "PELOD-2", "PELOD-2", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Version PELOD-2 para disfuncion organica multiple.", "PELOD-2 version for multi-organ dysfunction.", "implemented", "original_derivation_study", "high", baseValidationNotes.ready),
  makeTool("prism_iii", "prism-iii", "PRISM III", "PRISM III", "PRISM III", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Score de riesgo de mortalidad en UCI pediatrica.", "Pediatric ICU mortality risk score.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("prism_iv", "prism-iv", "PRISM IV", "PRISM IV", "PRISM IV", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Version PRISM IV identificada para revision.", "PRISM IV version identified for review.", "implemented", "original_derivation_study", "high", baseValidationNotes.ready),
  makeTool("pim2", "pim2", "PIM2", "PIM2", "PIM2", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Indice de mortalidad pediatrica version 2.", "Pediatric Index of Mortality version 2.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pim3", "pim3", "PIM3", "PIM3", "PIM3", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Indice de mortalidad pediatrica version 3.", "Pediatric Index of Mortality version 3.", "implemented", "original_derivation_study", "high", baseValidationNotes.ready),
  makeTool(
    "who_growth_module",
    "who-growth",
    "OMS",
    "Crecimiento OMS",
    "WHO Growth",
    "growth_nutrition",
    "growth",
    "percentile",
    "Ninos y adolescentes segun rangos OMS aplicables",
    "Children and adolescents according to applicable WHO ranges",
    "Modulo unificado disponible para calcular indicadores OMS aplicables desde una entrada antropometrica comun.",
    "Available unified module for applicable WHO indicators from one common anthropometric input.",
    "implemented",
    "official_manual_or_institutional_protocol",
    "medium",
    whoGrowthModuleValidationNotes,
    [
      {
        id: "who_child_growth_standards_official_module",
        title: "WHO Child Growth Standards",
        authors: "World Health Organization",
        year: 2006,
        journalOrPublisher: "World Health Organization",
        citation:
          "World Health Organization. WHO Child Growth Standards. Official standards and toolkits.",
        url: "https://www.who.int/tools/child-growth-standards",
        evidenceLevel: "official_manual_or_institutional_protocol",
        sourceType: "website",
        accessType: "open_access",
        notes:
          "Official source for the WHO Child Growth Standards 0-5 indicators implemented in PedsCore using verified LMS/data files.",
        appliesTo: ["who_growth_module"],
        priority: 1
      },
      {
        id: "who_growth_reference_5_19_official_module",
        title: "Growth reference data for 5-19 years",
        authors: "World Health Organization",
        year: 2007,
        journalOrPublisher: "World Health Organization",
        citation:
          "World Health Organization. Growth reference data for 5-19 years.",
        url: "https://www.who.int/tools/growth-reference-data-for-5to19-years",
        evidenceLevel: "official_manual_or_institutional_protocol",
        sourceType: "website",
        accessType: "open_access",
        notes:
          "Official source for WHO Growth Reference 2007. PedsCore implements weight-for-age 5-10 years and BMI-for-age/height-for-age 5-19 years using the source age granularity.",
        appliesTo: ["who_growth_module"],
        priority: 2
      }
    ]
  ),
  makeTool("who_growth_percentiles", "who-growth-percentiles", "OMS", "Percentiles OMS", "WHO Growth Percentiles", "growth_nutrition", "growth", "percentile", "Lactantes, ninos y adolescentes segun rangos OMS aplicables", "Infants, children and adolescents according to applicable WHO ranges", "Acceso al modulo WHO Growth central para indicadores OMS disponibles.", "Entry point to the central WHO Growth module for available WHO indicators.", "implemented", "official_manual_or_institutional_protocol", "medium", whoGrowthValidationNotes),
  makeTool("cdc_growth_percentiles", "cdc-growth-percentiles", "CDC", "Percentiles CDC", "CDC Growth Percentiles", "growth_nutrition", "growth", "percentile", "Ninos y adolescentes de 2 a 20 anos", "Children and adolescents aged 2 to 20 years", "Percentiles y z-scores CDC de peso/edad, talla/edad e IMC/edad, con CDC Extended BMI para IMC alto.", "CDC weight-for-age, stature-for-age, and BMI-for-age percentiles and z-scores, with CDC Extended BMI for high BMI.", "implemented", "official_manual_or_institutional_protocol", "medium", cdcGrowthValidationNotes),
  makeTool("orbegozo_growth_percentiles", "orbegozo-growth-percentiles", "Orbegozo", "Percentiles Orbegozo", "Orbegozo Growth Percentiles", "growth_nutrition", "growth", "percentile", "Poblacion pediatrica segun tablas aplicables", "Pediatric population depending on applicable tables", "Curvas de crecimiento Fundacion Orbegozo.", "Fundacion Orbegozo growth curves.", "pending_validation", "official_manual_or_institutional_protocol", "medium", orbegozoGrowthValidationNotes),
  makeTool("bmi_percentile", "bmi-percentile", "IMC percentilado", "IMC percentilado", "BMI Percentile", "growth_nutrition", "growth", "percentile", "Ninos y adolescentes en rangos OMS 0-5 o 5-19", "Children and adolescents in WHO 0-5 or 5-19 ranges", "Preset WHO Growth para BMI-for-age con salida descriptiva.", "WHO Growth preset for BMI-for-age with descriptive output.", "implemented", "official_manual_or_institutional_protocol", "medium", bmiPercentileValidationNotes),
  makeTool("head_circumference_percentile", "head-circumference-percentile", "PC percentil", "Percentil de perimetro cefalico", "Head Circumference Percentile", "growth_nutrition", "growth", "percentile", "Lactantes y ninos pequenos en rango OMS 0-5", "Infants and young children in the WHO 0-5 range", "Preset WHO Growth para perimetro cefalico/edad OMS 0-5 con salida descriptiva.", "WHO Growth preset for WHO 0-5 head circumference-for-age with descriptive output.", "implemented", "official_manual_or_institutional_protocol", "medium", headCircumferencePercentileValidationNotes),
  makeTool("stamp", "stamp", "STAMP", "STAMP", "STAMP", "growth_nutrition", "malnutrition_risk", "score", "Ninos hospitalizados", "Hospitalized children", "Herramienta de cribado de riesgo nutricional.", "Nutritional risk screening tool.", "pending_validation", "original_derivation_study", "medium", stampValidationNotes),
  makeTool("strongkids", "strongkids", "STRONGkids", "STRONGkids", "STRONGkids", "growth_nutrition", "malnutrition_risk", "score", "Ninos hospitalizados", "Hospitalized children", "Cribado de riesgo nutricional hospitalario mediante cuatro dominios y puntuacion 0-5.", "Hospital nutritional-risk screening using four domains and a 0-5 score.", "implemented", "original_derivation_study", "medium", strongkidsValidationNotes),
  makeTool("pyms", "pyms", "PYMS", "PYMS", "PYMS", "growth_nutrition", "malnutrition_risk", "score", "Ninos hospitalizados", "Hospitalized children", "Herramienta de cribado nutricional pediatrico.", "Pediatric nutritional screening tool.", "pending_validation", "original_derivation_study", "medium", pymsValidationNotes),
  makeTool("flacc", "flacc", "FLACC", "FLACC", "FLACC", "pain", "pediatric_pain", "scale", "Ninos pequenos o no verbales", "Young or non-verbal children", "Escala observacional de dolor basada en rostro, piernas, actividad, llanto y consolabilidad.", "Observational pain scale based on face, legs, activity, cry, and consolability.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("rflacc", "rflacc", "rFLACC", "rFLACC", "rFLACC", "pain", "pediatric_pain", "scale", "Ninos con necesidades especiales o comunicacion limitada", "Children with special needs or limited communication", "Version revisada de FLACC identificada para revision.", "Revised FLACC version identified for review.", "pending_validation", "external_validation_study", "medium", rflaccValidationNotes),
  makeTool("cheops", "cheops", "CHEOPS", "CHEOPS", "CHEOPS", "pain", "pediatric_pain", "scale", "Ninos de 1 a 7 anos", "Children aged 1 to 7 years", "Escala observacional de dolor pediatrico.", "Observational pediatric pain scale.", "pending_validation", "original_derivation_study", "medium", cheopsValidationNotes),
  makeTool("wong_baker_faces", "wong-baker-faces", "Wong-Baker", "Wong-Baker Faces", "Wong-Baker Faces", "pain", "pediatric_pain", "scale", "Ninos capaces de autoevaluacion con caras", "Children able to self-report using faces", "Escala visual de caras para dolor.", "Faces-based visual pain scale.", "not_implemented_due_to_licensing", "pending_verification", "medium", baseValidationNotes.licensing),
  makeTool("visual_analogue_scale", "visual-analogue-scale", "EVA", "Escala visual analogica", "Visual Analogue Scale", "pain", "pediatric_pain", "scale", "Mayores de 8 anos y adolescentes capaces de autorreporte", "Children older than 8 years and adolescents able to self-report", "EVA de 100 mm para intensidad de dolor autorreportada.", "100-mm VAS for self-reported pain intensity.", "implemented", "original_derivation_study", "low", visualAnalogueScaleValidationNotes),
  makeTool("pediatric_cpr", "pediatric-cpr", "RCP pediatrica", "RCP pediatrica", "Pediatric CPR", "resuscitation", "pediatric_life_support", "algorithm", "Pacientes pediatricos en parada o peri-parada", "Pediatric patients in arrest or peri-arrest", "Algoritmo de soporte vital pediatrico previsto como ficha trazable.", "Pediatric life support algorithm planned as a traceable entry.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("neonatal_cpr", "neonatal-cpr", "RCP neonatal", "RCP neonatal", "Neonatal CPR", "resuscitation", "neonatal_life_support", "algorithm", "Recien nacidos en reanimacion neonatal", "Newborns undergoing neonatal resuscitation", "Algoritmo de reanimacion neonatal previsto como ficha trazable.", "Neonatal resuscitation algorithm planned as a traceable entry.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pediatric_bradycardia", "pediatric-bradycardia", "Bradicardia", "Bradicardia pediatrica", "Pediatric Bradycardia", "resuscitation", "pediatric_life_support", "algorithm", "Pacientes pediatricos con bradicardia inestable", "Pediatric patients with unstable bradycardia", "Algoritmo de bradicardia pediatrica para revision futura.", "Pediatric bradycardia algorithm for future review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pediatric_tachycardia", "pediatric-tachycardia", "Taquicardia", "Taquicardia pediatrica", "Pediatric Tachycardia", "resuscitation", "pediatric_life_support", "algorithm", "Pacientes pediatricos con taquicardia inestable", "Pediatric patients with unstable tachycardia", "Algoritmo de taquicardia pediatrica para revision futura.", "Pediatric tachycardia algorithm for future review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("shockable_rhythm_algorithm", "shockable-rhythm-algorithm", "Ritmos desfibrilables", "Ritmos desfibrilables", "Shockable Rhythm Algorithm", "resuscitation", "pediatric_life_support", "algorithm", "Pacientes pediatricos en parada con ritmo desfibrilable", "Pediatric arrest patients with shockable rhythm", "Algoritmo para ritmos desfibrilables identificado para revision.", "Shockable rhythm algorithm identified for review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("non_shockable_rhythm_algorithm", "non-shockable-rhythm-algorithm", "Ritmos no desfibrilables", "Ritmos no desfibrilables", "Non-shockable Rhythm Algorithm", "resuscitation", "pediatric_life_support", "algorithm", "Pacientes pediatricos en parada con ritmo no desfibrilable", "Pediatric arrest patients with non-shockable rhythm", "Algoritmo para ritmos no desfibrilables identificado para revision.", "Non-shockable rhythm algorithm identified for review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  ...priorityExpansionSurfaces,
  ...targetExpansionSurfaces,
  ...reconciliationSurfaces
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
