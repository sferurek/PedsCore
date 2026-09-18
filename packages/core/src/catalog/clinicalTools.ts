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
  "ckid_u25",
  "prifle",
  "kdigo_pediatric"
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
        "Sprint 2B: official source for WHO Growth Reference 2007 BMI-for-age and height-for-age 5-19 data used by the central WHO Growth module.",
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
  cdc_growth_percentiles: [
    {
      id: "cdc_growth_charts_lms_data",
      title: "CDC Growth Charts Data Files",
      authors: "Centers for Disease Control and Prevention; National Center for Health Statistics",
      year: 2000,
      journalOrPublisher: "Centers for Disease Control and Prevention",
      citation:
        "Centers for Disease Control and Prevention, National Center for Health Statistics. CDC Growth Charts Data Files with LMS Values.",
      url: "https://www.cdc.gov/growthcharts/cdc-data-files.htm",
      evidenceLevel: "official_manual_or_institutional_protocol",
      sourceType: "website",
      accessType: "open_access",
      notes:
        "Priority A evidence audit: official LMS data source located. Exact chart set, interpolation strategy, and test fixtures remain pending before implementation.",
      appliesTo: ["cdc_growth_percentiles"],
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
      priority: 1
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
        "Block 8B-2: original STRONGkids source located. Complete tool wording/table and reuse terms remain pending.",
      appliesTo: ["strongkids"],
      priority: 1
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
        "Block 8B-3: source trail for Lowell RDAI located. Complete table reuse remains license-sensitive because the accessible table is reproduced in secondary articles.",
      appliesTo: ["rdai"],
      priority: 1
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
        "Block 8B-3: original Gorelick dehydration signs source located. Complete scale/table and validation strategy remain pending.",
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
  es: "Sprint 2B: Percentiles OMS funciona como acceso al modulo WHO Growth central. No crea motor separado; usa datos LMS oficiales OMS 0-5 y BMI/talla OMS 5-19 disponibles, con licencia de datos separada.",
  en: "Sprint 2B: WHO Growth Percentiles acts as an entry point to the central WHO Growth module. It does not create a separate engine; it uses available official WHO 0-5 LMS data plus WHO 5-19 BMI/height data under a separate data license."
};

const whoGrowthModuleValidationNotes: LocalizedText = {
  es: "Sprint 2B: motor WHO Growth central para indicadores OMS disponibles. Incluye peso/edad, longitud-talla/edad, peso/longitud, peso/talla, BMI/edad y perimetro cefalico/edad OMS 0-5; BMI/edad y talla/edad OMS 5-19. Datos OMS con licencia separada; salida descriptiva sin diagnosticos ni recomendaciones nutricionales.",
  en: "Sprint 2B: central WHO Growth engine for available WHO indicators. It includes WHO 0-5 weight-for-age, length/height-for-age, weight-for-length, weight-for-height, BMI-for-age and head circumference-for-age; plus WHO 5-19 BMI-for-age and height-for-age. WHO data use a separate license; output is descriptive without diagnoses or nutritional recommendations."
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
  es: "Bloque 8B-1: fuente oficial CDC con ficheros LMS localizada. Pendiente seleccionar curvas, definir interpolacion/edades, revisar atribucion/uso y preparar tests antes de implementar percentiles.",
  en: "Block 8B-1: official CDC LMS data source located. Chart selection, interpolation/age handling, attribution/use review, and tests remain pending before percentile implementation."
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
  es: "Se necesita referencia primaria: la documentacion local identifica EVA/Escala Visual Analogica, pero no define formato operativo 0-10 frente a 0-100 mm, poblacion aplicable, instrucciones de uso ni tabla de interpretacion. No se activa calculo.",
  en: "Primary reference needed: local documentation identifies VAS/Visual Analogue Scale, but does not define the operational 0-10 versus 0-100 mm format, applicable population, use instructions, or interpretation table. Calculation is not activated."
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
  es: "Bloque 8B-3: localizado rastro bibliografico de Lowell/RDAI, pero DOI/PMID y tabla primaria reutilizable no estan verificados. Mantener bloqueada por fuente/tabla.",
  en: "Block 8B-3: Lowell/RDAI bibliographic source trail located, but DOI/PMID and a reusable primary table are not verified. Keep blocked for source/table review."
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
  es: "Bloque 8B-2: fuente STRONGkids localizada con DOI/PMID. Pendiente tabla completa, texto de items, licencia/reutilizacion e interpretacion antes de implementar.",
  en: "Block 8B-2: STRONGkids source located with DOI/PMID. Complete table, item wording, license/reuse terms, and interpretation remain pending before implementation."
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
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Indicadores principales OMS 0-5 y BMI/talla para la edad OMS 5-19 disponibles con datos LMS oficiales normalizados y gráficas SVG imprimibles. Política completa del módulo sigue en validación.",
      en: "Core WHO 0-5 indicators plus WHO 5-19 BMI-for-age and height-for-age are available with normalized official LMS data and printable SVG charts. The complete module policy remains under validation."
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
  referenceSurface({ id:"step_by_step", slug:"step-by-step-febrile-infant", shortName:"Step-by-Step", nameEs:"Enfoque Step-by-Step", nameEn:"Step-by-Step Approach", category:"emergency", subcategory:"febrile_infant", type:"clinical_rule", populationEs:"Lactantes pequeños con fiebre según criterios publicados", populationEn:"Young febrile infants meeting published eligibility criteria", descriptionEs:"Regla clínica de referencia para estratificación de riesgo en lactantes febriles; requiere los datos publicados.", descriptionEn:"Clinical-rule reference for risk stratification in febrile infants; it requires the published data elements.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"pecarn_febrile_infant", slug:"pecarn-febrile-infant", shortName:"PECARN FI", nameEs:"Regla PECARN para lactante febril", nameEn:"PECARN Febrile Infant Rule", category:"emergency", subcategory:"febrile_infant", type:"clinical_rule", populationEs:"Lactantes febriles de hasta 60 días según elegibilidad publicada", populationEn:"Febrile infants up to 60 days meeting published eligibility", descriptionEs:"Regla de referencia para riesgo de infección bacteriana invasiva en lactantes febriles; no sustituye la valoración clínica.", descriptionEn:"Reference rule for invasive bacterial infection risk in febrile infants; it does not replace clinical assessment.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
  referenceSurface({ id:"yos", slug:"yale-observation-scale", shortName:"YOS", nameEs:"Escala de Observación de Yale", nameEn:"Yale Observation Scale", category:"emergency", subcategory:"febrile_infant", type:"scale", populationEs:"Niños pequeños con enfermedad febril", populationEn:"Young children with febrile illness", descriptionEs:"Escala histórica de referencia para observación clínica en enfermedad febril.", descriptionEn:"Historical reference scale for clinical observation in febrile illness.", evidenceLevel:"original_derivation_study", regulatoryRisk:"high" }),
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
  referenceSurface({ id:"pucai", slug:"pucai", shortName:"PUCAI", nameEs:"Índice pediátrico de actividad de colitis ulcerosa", nameEn:"Pediatric Ulcerative Colitis Activity Index", category:"growth_nutrition", subcategory:"inflammatory_bowel_disease", type:"scale", populationEs:"Niños y adolescentes con colitis ulcerosa", populationEn:"Children and adolescents with ulcerative colitis", descriptionEs:"Índice de referencia para actividad de colitis ulcerosa y seguimiento longitudinal.", descriptionEn:"Reference index for ulcerative-colitis activity and longitudinal follow-up.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
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
  referenceSurface({ id:"snappii", slug:"snappe-ii", shortName:"SNAPPE-II", nameEs:"SNAPPE-II", nameEn:"SNAPPE-II", category:"neonatology", subcategory:"neonatal_severity", type:"score", populationEs:"Recién nacidos críticamente enfermos", populationEn:"Critically ill newborns", descriptionEs:"Puntaje de referencia para gravedad y riesgo en neonatología; no predice un desenlace individual.", descriptionEn:"Reference score for neonatal severity and risk; it does not predict an individual outcome.", evidenceLevel:"external_validation_study", regulatoryRisk:"high" }),
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
  referenceSurface({ id:"fnass_21", slug:"fnass-21", shortName:"FNASS", nameEs:"Sistema de Puntuación de Abstinencia Neonatal de Finnegan de 21 ítems", nameEn:"21-item Finnegan Neonatal Abstinence Scoring System", category:"neonatology", subcategory:"neonatal_withdrawal", type:"scale", populationEs:"Recién nacidos con signos de abstinencia neonatal", populationEn:"Newborns with signs of neonatal withdrawal", descriptionEs:"Superficie de referencia para el sistema neonatal de 21 ítems identificado en v12; no reproduce el formulario operativo.", descriptionEn:"Reference surface for the named 21-item neonatal system identified in v12; it does not reproduce the operational form.", evidenceLevel:"peer_reviewed_review", regulatoryRisk:"high", references:implementedToolReferences.fnass_21! })
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
  makeTool("pram", "pram", "PRAM", "Pediatric Respiratory Assessment Measure", "Pediatric Respiratory Assessment Measure", "respiratory", "asthma_wheezing", "score", "Ninos de 2 a menos de 18 anos con exacerbacion de asma aguda", "Children aged 2 to under 18 years with an acute asthma exacerbation", "Mide de forma descriptiva la gravedad de una exacerbacion de asma aguda y su cambio en evaluaciones seriadas.", "Descriptively measures acute asthma exacerbation severity and change across serial assessments.", "ready_for_implementation", "high", "medium", pramQaValidationNotes),
  makeTool("rdai", "rdai", "RDAI", "Respiratory Distress Assessment Instrument", "Respiratory Distress Assessment Instrument", "respiratory", "bronchiolitis", "score", "Ninos con bronquiolitis", "Children with bronchiolitis", "Evalua sibilancias y retracciones en bronquiolitis.", "Assesses wheezing and retractions in bronchiolitis.", "pending_validation", "pending_primary_source", "medium", rdaiValidationNotes),
  makeTool("brosjod", "brosjod", "BROSJOD", "BROSJOD", "BROSJOD", "respiratory", "bronchiolitis", "score", "Lactantes con bronquiolitis", "Infants with bronchiolitis", "Escala de bronquiolitis identificada en recomendaciones.", "Bronchiolitis scale identified in recommendations.", "pending_validation", "external_validation_study", "medium", brosjodValidationNotes),
  makeTool("pass", "pass", "PASS", "Pediatric Asthma Severity Score", "Pediatric Asthma Severity Score", "respiratory", "asthma", "score", "Ninos con asma o broncoespasmo", "Children with asthma or wheezing", "Score de gravedad de asma pediatrica identificado para revision.", "Pediatric asthma severity score identified for review.", "pending_validation", "original_derivation_study", "medium", passValidationNotes),
  makeTool("risc", "risc", "RISC", "RISC", "RISC", "respiratory", "pneumonia", "score", "Ninos con neumonia", "Children with pneumonia", "Score de gravedad de neumonia identificado en recomendaciones.", "Pneumonia severity score identified in recommendations.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("mrisc", "mrisc", "mRISC", "mRISC", "mRISC", "respiratory", "pneumonia", "score", "Ninos con neumonia", "Children with pneumonia", "Variante modificada RISC para neumonia.", "Modified RISC variant for pneumonia.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("pediatric_gcs", "pediatric-glasgow-coma-scale", "pGCS", "Escala de Coma de Glasgow pediatrica", "Pediatric Glasgow Coma Scale", "neurology", "consciousness", "scale", "Ninos con necesidad de valoracion neurologica", "Children requiring neurologic assessment", "Adaptacion pediatrica de apertura ocular, respuesta verbal y motora.", "Pediatric adaptation of eye, verbal, and motor response.", "pending_validation", "pending_verification", "medium", pediatricGcsValidationNotes),
  makeTool("clinical_dehydration_scale", "clinical-dehydration-scale", "CDS", "Clinical Dehydration Scale", "Clinical Dehydration Scale", "emergency", "dehydration", "score", "Ninos con sospecha de deshidratacion", "Children with suspected dehydration", "Score clinico de gravedad de deshidratacion.", "Clinical score for dehydration severity.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("pediatric_appendicitis_score", "pediatric-appendicitis-score", "PAS", "Pediatric Appendicitis Score", "Pediatric Appendicitis Score", "emergency", "abdominal_pain", "score", "Ninos con dolor abdominal y sospecha clinica de apendicitis", "Children with abdominal pain and clinical concern for appendicitis", "Calculadora educativa de riesgo de apendicitis pediatrica basada en ocho items clinicos y analiticos.", "Educational pediatric appendicitis risk calculator based on eight clinical and laboratory items.", "ready_for_implementation", "original_derivation_study", "medium", pediatricAppendicitisScoreValidationNotes),
  makeTool("gorelick_dehydration", "gorelick-dehydration", "Gorelick", "Escala de Gorelick", "Gorelick Dehydration Scale", "emergency", "dehydration", "score", "Ninos con sospecha de deshidratacion", "Children with suspected dehydration", "Escala alternativa de deshidratacion identificada.", "Alternative dehydration scale identified.", "pending_validation", "original_derivation_study", "medium", gorelickValidationNotes),
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
  makeTool("prifle", "prifle", "pRIFLE", "pRIFLE", "pRIFLE", "nephrology", "acute_kidney_injury", "clinical_rule", "Ninos con riesgo de lesion renal aguda", "Children at risk of acute kidney injury", "Clasificacion pediatrica de lesion renal aguda.", "Pediatric acute kidney injury classification.", "pending_validation", "original_derivation_study", "medium", prifleValidationNotes),
  makeTool("kdigo_pediatric", "kdigo-pediatric", "KDIGO pediatrico", "KDIGO pediatrico", "Pediatric KDIGO", "nephrology", "acute_kidney_injury", "clinical_rule", "Ninos con riesgo de lesion renal aguda", "Children at risk of acute kidney injury", "Aplicacion pediatrica de criterios KDIGO para lesion renal aguda.", "Pediatric application of KDIGO criteria for acute kidney injury.", "pending_validation", "pending_verification", "medium"),
  makeTool("psofa", "psofa", "pSOFA", "pSOFA", "Pediatric Sequential Organ Failure Assessment", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Evalua disfuncion organica multiple pediatrica.", "Assesses pediatric multi-organ dysfunction.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pelod", "pelod", "PELOD", "PELOD", "PELOD", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Score de disfuncion organica pediatrica.", "Pediatric organ dysfunction score.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pelod_2", "pelod-2", "PELOD-2", "PELOD-2", "PELOD-2", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Version PELOD-2 para disfuncion organica multiple.", "PELOD-2 version for multi-organ dysfunction.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("prism_iii", "prism-iii", "PRISM III", "PRISM III", "PRISM III", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Score de riesgo de mortalidad en UCI pediatrica.", "Pediatric ICU mortality risk score.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("prism_iv", "prism-iv", "PRISM IV", "PRISM IV", "PRISM IV", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Version PRISM IV identificada para revision.", "PRISM IV version identified for review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pim2", "pim2", "PIM2", "PIM2", "PIM2", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Indice de mortalidad pediatrica version 2.", "Pediatric Index of Mortality version 2.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pim3", "pim3", "PIM3", "PIM3", "PIM3", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Indice de mortalidad pediatrica version 3.", "Pediatric Index of Mortality version 3.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
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
    "partially_implemented",
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
          "Official source for 0-5 year indicators. PedsCore imports verified official LMS/data files for the currently available scope; remaining policy and review gates are documented separately.",
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
          "Official source for 5-19 year reference data. PedsCore imports verified BMI-for-age and height-for-age LMS/data files for the currently available scope; remaining 5-19 scope and interpolation policy stay pending.",
        appliesTo: ["who_growth_module"],
        priority: 2
      }
    ]
  ),
  makeTool("who_growth_percentiles", "who-growth-percentiles", "OMS", "Percentiles OMS", "WHO Growth Percentiles", "growth_nutrition", "growth", "percentile", "Lactantes, ninos y adolescentes segun rangos OMS aplicables", "Infants, children and adolescents according to applicable WHO ranges", "Acceso al modulo WHO Growth central para indicadores OMS disponibles.", "Entry point to the central WHO Growth module for available WHO indicators.", "partially_implemented", "official_manual_or_institutional_protocol", "medium", whoGrowthValidationNotes),
  makeTool("cdc_growth_percentiles", "cdc-growth-percentiles", "CDC", "Percentiles CDC", "CDC Growth Percentiles", "growth_nutrition", "growth", "percentile", "Ninos y adolescentes segun edad aplicable", "Children and adolescents depending on applicable age", "Curvas de crecimiento CDC.", "CDC growth curves.", "pending_validation", "official_manual_or_institutional_protocol", "medium", cdcGrowthValidationNotes),
  makeTool("orbegozo_growth_percentiles", "orbegozo-growth-percentiles", "Orbegozo", "Percentiles Orbegozo", "Orbegozo Growth Percentiles", "growth_nutrition", "growth", "percentile", "Poblacion pediatrica segun tablas aplicables", "Pediatric population depending on applicable tables", "Curvas de crecimiento Fundacion Orbegozo.", "Fundacion Orbegozo growth curves.", "pending_validation", "official_manual_or_institutional_protocol", "medium", orbegozoGrowthValidationNotes),
  makeTool("bmi_percentile", "bmi-percentile", "IMC percentilado", "IMC percentilado", "BMI Percentile", "growth_nutrition", "growth", "percentile", "Ninos y adolescentes en rangos OMS 0-5 o 5-19", "Children and adolescents in WHO 0-5 or 5-19 ranges", "Preset WHO Growth para BMI-for-age con salida descriptiva.", "WHO Growth preset for BMI-for-age with descriptive output.", "partially_implemented", "official_manual_or_institutional_protocol", "medium", bmiPercentileValidationNotes),
  makeTool("head_circumference_percentile", "head-circumference-percentile", "PC percentil", "Percentil de perimetro cefalico", "Head Circumference Percentile", "growth_nutrition", "growth", "percentile", "Lactantes y ninos pequenos en rango OMS 0-5", "Infants and young children in the WHO 0-5 range", "Preset WHO Growth para perimetro cefalico/edad OMS 0-5 con salida descriptiva.", "WHO Growth preset for WHO 0-5 head circumference-for-age with descriptive output.", "partially_implemented", "official_manual_or_institutional_protocol", "medium", headCircumferencePercentileValidationNotes),
  makeTool("stamp", "stamp", "STAMP", "STAMP", "STAMP", "growth_nutrition", "malnutrition_risk", "score", "Ninos hospitalizados", "Hospitalized children", "Herramienta de cribado de riesgo nutricional.", "Nutritional risk screening tool.", "pending_validation", "original_derivation_study", "medium", stampValidationNotes),
  makeTool("strongkids", "strongkids", "STRONGkids", "STRONGkids", "STRONGkids", "growth_nutrition", "malnutrition_risk", "score", "Ninos hospitalizados", "Hospitalized children", "Herramienta de cribado de riesgo de malnutricion.", "Malnutrition risk screening tool.", "pending_validation", "original_derivation_study", "medium", strongkidsValidationNotes),
  makeTool("pyms", "pyms", "PYMS", "PYMS", "PYMS", "growth_nutrition", "malnutrition_risk", "score", "Ninos hospitalizados", "Hospitalized children", "Herramienta de cribado nutricional pediatrico.", "Pediatric nutritional screening tool.", "pending_validation", "original_derivation_study", "medium", pymsValidationNotes),
  makeTool("flacc", "flacc", "FLACC", "FLACC", "FLACC", "pain", "pediatric_pain", "scale", "Ninos pequenos o no verbales", "Young or non-verbal children", "Escala observacional de dolor basada en rostro, piernas, actividad, llanto y consolabilidad.", "Observational pain scale based on face, legs, activity, cry, and consolability.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("rflacc", "rflacc", "rFLACC", "rFLACC", "rFLACC", "pain", "pediatric_pain", "scale", "Ninos con necesidades especiales o comunicacion limitada", "Children with special needs or limited communication", "Version revisada de FLACC identificada para revision.", "Revised FLACC version identified for review.", "pending_validation", "external_validation_study", "medium", rflaccValidationNotes),
  makeTool("cheops", "cheops", "CHEOPS", "CHEOPS", "CHEOPS", "pain", "pediatric_pain", "scale", "Ninos de 1 a 7 anos", "Children aged 1 to 7 years", "Escala observacional de dolor pediatrico.", "Observational pediatric pain scale.", "pending_validation", "original_derivation_study", "medium", cheopsValidationNotes),
  makeTool("wong_baker_faces", "wong-baker-faces", "Wong-Baker", "Wong-Baker Faces", "Wong-Baker Faces", "pain", "pediatric_pain", "scale", "Ninos capaces de autoevaluacion con caras", "Children able to self-report using faces", "Escala visual de caras para dolor.", "Faces-based visual pain scale.", "not_implemented_due_to_licensing", "pending_verification", "medium", baseValidationNotes.licensing),
  makeTool("visual_analogue_scale", "visual-analogue-scale", "EVA", "Escala visual analogica", "Visual Analogue Scale", "pain", "pediatric_pain", "scale", "Ninos con capacidad de autoevaluacion", "Children able to self-report", "Escala visual analogica de dolor identificada para catalogo.", "Visual analogue pain scale identified for the catalog.", "needs_primary_reference", "primary_reference_needed", "low", visualAnalogueScaleValidationNotes),
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
