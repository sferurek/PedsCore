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
  "flacc",
  "qtc_bazett",
  "qtc_fridericia",
  "qtc_framingham",
  "qtc_hodges",
  "bedside_schwartz",
  "westley_croup",
  "pram",
  "clinical_dehydration_scale",
  "pecarn_tbi_under_2",
  "pecarn_tbi_2_or_more",
  "catch_tbi",
  "chalice_tbi",
  "sipa",
  "nips"
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
  apgar: [
    {
      id: "apgar_1953_original",
      title: "A Proposal for a New Method of Evaluation of the Newborn Infant",
      authors: "Apgar V",
      year: 1953,
      journalOrPublisher: "Current Researches in Anesthesia and Analgesia",
      citation:
        "Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953;32(4):260-267.",
      pmid: "13083014",
      url: "https://pubmed.ncbi.nlm.nih.gov/13083014/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      appliesTo: ["apgar"],
      priority: 1
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
      pmid: "18346499",
      evidenceLevel: "external_validation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      appliesTo: ["pram"],
      priority: 2
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
      appliesTo: ["sipa"],
      priority: 1
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
        "Priority A evidence audit: New Ballard variant selected as source anchor. Complete scoring form/table and reuse permissions remain pending before implementation.",
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
        "Priority A evidence audit: original staging source located. Exact table wording, modified variants, and domain-expert review remain pending before implementation.",
      appliesTo: ["sarnat"],
      priority: 1
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
      url: "https://doi.org/10.1111/j.1651-2227.1997.tb08581.x",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "paywalled",
      notes:
        "Priority A evidence audit: DOI source located, but a stable PubMed record was not confirmed. Complete table and expert review remain pending before implementation.",
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
        "Priority A evidence audit: original source located. Complete 0/1/2 item table and reuse permissions remain pending before implementation.",
      appliesTo: ["cries"],
      priority: 1
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
      url: "https://pubmed.ncbi.nlm.nih.gov/19678924/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Priority A evidence audit: source located. Full score table, local escalation separation, and inventor/licensing review remain pending before implementation.",
      appliesTo: ["bedside_pews"],
      priority: 1
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
  modified_finnegan: [
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
      appliesTo: ["modified_finnegan"],
      priority: 1
    }
  ],
  wood_downes_ferres: [
    {
      id: "downes_1968_original",
      title: "Acute respiratory failure in infants with bronchiolitis",
      authors: "Downes JJ, Wood DW, Striker TW, Haddad C",
      year: 1968,
      journalOrPublisher: "Anesthesiology",
      citation:
        "Downes JJ, Wood DW, Striker TW, Haddad C. Acute respiratory failure in infants with bronchiolitis. Anesthesiology. 1968;29(3):426-434.",
      pmid: "5647493",
      url: "https://pubmed.ncbi.nlm.nih.gov/5647493/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "abstract_only",
      notes:
        "Block 8B-2: Downes/Wood source trail located, but the Ferres-modified WDF variant and exact table are not verified.",
      appliesTo: ["wood_downes_ferres"],
      priority: 1
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
        "Block 8B-3: original Dubowitz clinical assessment source located. Complete scoring table/form and licensing review remain pending.",
      appliesTo: ["dubowitz"],
      priority: 1
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
        "Block 8B-3: Fenton 2013 open-access source located. Implementation still requires official/reusable LMS data files, attribution, and tests.",
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
  prifle: [
    {
      id: "prifle_2007_original",
      title: "Modified RIFLE criteria in critically ill children with acute kidney injury",
      authors: "Akcan-Arikan A, Zappitelli M, Loftis LL, Washburn KK, Jefferson LS, Goldstein SL",
      year: 2007,
      journalOrPublisher: "Kidney International",
      citation:
        "Akcan-Arikan A, Zappitelli M, Loftis LL, Washburn KK, Jefferson LS, Goldstein SL. Modified RIFLE criteria in critically ill children with acute kidney injury. Kidney Int. 2007;71(10):1028-1035.",
      doi: "10.1038/sj.ki.5002231",
      pmid: "17396113",
      url: "https://pubmed.ncbi.nlm.nih.gov/17396113/",
      evidenceLevel: "original_derivation_study",
      sourceType: "journal_article",
      accessType: "open_access",
      notes:
        "Block 8B-3: original pRIFLE source located. Complete criteria, baseline eCCl assumptions, urine-output handling, and expert review remain pending.",
      appliesTo: ["prifle"],
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

const pendingCalculationNotes: LocalizedText = {
  es: "Formulario preparado para revision. El calculo automatico permanece inactivo hasta completar trazabilidad, fuente primaria y tests clinicos.",
  en: "Form prepared for review. Automatic calculation remains inactive until traceability, primary source, and clinical tests are complete."
};

const woodDownesValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: localizado el origen Downes/Wood, pero no la version exacta Wood-Downes-Ferres modificada por Ferres ni tabla completa con cortes de frecuencia respiratoria por edad. No activar calculo por confusion de variantes.",
  en: "Block 8B-2: Downes/Wood source trail located, but the exact version and exact Wood-Downes-Ferres variant modified by Ferres and complete table with age-specific respiratory-rate cut-offs remain unresolved. Calculation is not activated because of exact version confusion."
};

const ballardValidationNotes: LocalizedText = {
  es: "Bloque 8B-1: fuente primaria New Ballard localizada con DOI/PMID. Pendiente tabla/formulario completo utilizable, conversion exacta a semanas, permisos de reutilizacion y casos de test antes de implementar calculo.",
  en: "Block 8B-1: New Ballard primary source located with DOI/PMID. Complete usable table/form, exact conversion to gestational weeks, reuse permissions, and test cases remain pending before calculation."
};

const sarnatValidationNotes: LocalizedText = {
  es: "Bloque 8B-1: fuente original Sarnat localizada con DOI/PMID. Pendiente definir version exacta clasica/modificada, tabla completa, reglas de clasificacion no ambiguas, licencia y revision por experto antes de implementar.",
  en: "Block 8B-1: original Sarnat source located with DOI/PMID. Exact classic/modified version, complete table, unambiguous classification rules, licensing, and expert review remain pending before implementation."
};

const thompsonHieEvidenceValidationNotes: LocalizedText = {
  es: "Bloque 8B-1: fuente Thompson 1997 localizada por DOI. PubMed estable no confirmado; tabla completa, rangos por item, puntos de corte y revision por experto siguen pendientes antes de implementar.",
  en: "Block 8B-1: Thompson 1997 source located by DOI. Stable PubMed record not confirmed; complete table, item-specific ranges, cut-offs, and expert review remain pending before implementation."
};

const bhutaniValidationNotes: LocalizedText = {
  es: "Bloque 8B-1: fuente primaria Bhutani 1999 localizada con DOI/PMID. Pendiente disponer de valores/curvas hora-especificas reutilizables, contexto de guias actuales, licencia y casos de test antes de implementar nomograma.",
  en: "Block 8B-1: Bhutani 1999 primary source located with DOI/PMID. Reusable hour-specific values/curves, current guideline context, licensing, and test cases remain pending before nomogram implementation."
};

const bedsidePewsValidationNotes: LocalizedText = {
  es: "Bloque 8B-1: fuente Bedside PEWS original localizada con DOI/PMID/PMCID. Pendiente tabla completa, separacion de protocolos locales de escalado, licencia/inventores y casos de test antes de implementar.",
  en: "Block 8B-1: original Bedside PEWS source located with DOI/PMID/PMCID. Complete table, separation from local escalation protocols, inventor/licensing review, and test cases remain pending before implementation."
};

const whoGrowthValidationNotes: LocalizedText = {
  es: "Bloque 8B-1: fuente oficial OMS localizada. Pendiente seleccionar indicadores y edades, enlazar ficheros LMS/datos oficiales, revisar terminos de uso y preparar tests antes de implementar percentiles.",
  en: "Block 8B-1: official WHO source located. Indicator/age selection, official LMS/data files, terms-of-use review, and tests remain pending before percentile implementation."
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
  es: "Pendiente de validacion: la documentacion local confirma cinco variables, rango 0-10 y umbral >=4, pero no incluye opciones exactas 0/1/2 por variable, fuente primaria completa ni tabla de interpretacion validada. No se activa calculo hasta validar la tabla completa.",
  en: "Pending validation: local documentation confirms five variables, 0-10 range, and >=4 threshold, but does not include exact 0/1/2 options per variable, complete primary source, or validated interpretation table. Calculation is not activated until the complete table is validated."
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
  es: "Bloque 8B-3: fuente original Dubowitz localizada con DOI/PMID. Pendiente tabla/formulario completo, conversion a edad gestacional, permisos y tests; no activar calculo.",
  en: "Block 8B-3: original Dubowitz source located with DOI/PMID. Complete form/table, gestational-age conversion, permissions, and tests remain pending; calculation is not activated."
};

const fentonValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: Fenton 2013 open access localizado. Pendiente obtener ficheros LMS/datos reutilizables oficiales, atribucion y casos de test antes de activar percentiles.",
  en: "Block 8B-3: Fenton 2013 open-access source located. Official/reusable LMS data files, attribution, and test fixtures remain pending before percentile activation."
};

const rdaiValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: localizado rastro bibliografico de Lowell/RDAI, pero DOI/PMID y tabla primaria reutilizable no estan verificados. Mantener bloqueada por fuente/tabla.",
  en: "Block 8B-3: Lowell/RDAI bibliographic source trail located, but DOI/PMID and a reusable primary table are not verified. Keep blocked for source/table review."
};

const passValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: fuente PASS original localizada con DOI/PMID. Pendiente revisar tabla completa, interpretacion y permisos antes de activar calculo.",
  en: "Block 8B-3: original PASS source located with DOI/PMID. Complete table, interpretation, and permissions remain pending before calculation."
};

const brosjodValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: fuente de validacion BROSJOD localizada con DOI/PMID. Pendiente fuente/tabla original completa y permisos antes de implementar.",
  en: "Block 8B-3: BROSJOD validation source located with DOI/PMID. Original/full table source and permissions remain pending before implementation."
};

const gorelickValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: fuente Gorelick dehydration localizada con DOI/PMID. Pendiente definir escala exacta, tabla completa y validacion frente a CDS antes de activar.",
  en: "Block 8B-3: Gorelick dehydration source located with DOI/PMID. Exact scale, complete table, and validation against CDS remain pending before activation."
};

const catchValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: CATCH localizada con DOI/PMID/PMCID y regla publicada. Lista para implementacion tecnica como clasificacion informativa, sin recomendacion de TC ni manejo.",
  en: "Block 8B-3: CATCH located with DOI/PMID/PMCID and published rule. Ready for technical implementation as informational classification only, without CT or management recommendations."
};

const chaliceValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: CHALICE localizada con DOI/PMID/PMCID y regla publicada. Lista para implementacion tecnica como clasificacion informativa, sin recomendacion de TC ni manejo.",
  en: "Block 8B-3: CHALICE located with DOI/PMID/PMCID and published rule. Ready for technical implementation as informational classification only, without CT or management recommendations."
};

const revisedSchwartzValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: fuente CKiD/Schwartz 2009 localizada con DOI/PMID. Pendiente seleccionar variante exacta distinta de Bedside Schwartz y definir entradas biomarcadoras.",
  en: "Block 8B-3: CKiD/Schwartz 2009 source located with DOI/PMID. Exact variant selection separate from Bedside Schwartz and biomarker inputs remain pending."
};

const prifleValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: fuente pRIFLE original localizada con DOI/PMID. Pendiente tabla/criterios completos, eCCl basal, diuresis, unidades y revision experta.",
  en: "Block 8B-3: original pRIFLE source located with DOI/PMID. Complete criteria, baseline eCCl, urine output, units, and expert review remain pending."
};

const rflaccValidationNotes: LocalizedText = {
  es: "Bloque 8B-3: validacion rFLACC localizada con DOI/PMID. Pendiente descriptores revisados completos, personalizacion por familia y revision de reutilizacion/licencia.",
  en: "Block 8B-3: rFLACC validation located with DOI/PMID. Complete revised descriptors, family customization handling, and reuse/licensing review remain pending."
};

const pewsValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: PEWS tiene multiples variantes publicadas e institucionales. Fuente Brighton/Monaghan localizada, Bedside PEWS documentada aparte; PEWS generico no se activa hasta seleccionar version exacta y separar protocolos de escalado.",
  en: "Block 8B-2: PEWS has multiple published and institutional variants. Brighton/Monaghan source located and Bedside PEWS is documented separately; generic PEWS is not activated until exact variant selection and escalation-protocol separation are complete."
};

const pippValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: fuentes PIPP y PIPP-R localizadas. Siguen pendientes tabla completa, ajuste por edad gestacional, interpretacion, permisos de reutilizacion y separacion clara de variantes antes de activar calculo.",
  en: "Block 8B-2: PIPP and PIPP-R sources located. Complete table, gestational-age adjustment, interpretation, reuse permissions, and clear variant separation remain pending before calculation."
};

const comfortneoValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: fuentes COMFORTneo 2009 y validacion 2023 localizadas. Requiere tabla oficial completa, manejo ventilado/no ventilado, interpretacion, licencia y revision experta antes de activar calculo.",
  en: "Block 8B-2: COMFORTneo 2009 and 2023 validation sources located. Complete official table, ventilated/non-ventilated handling, interpretation, licensing, and expert review remain pending before calculation."
};

const finneganValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: fuente original Finnegan localizada. Finnegan/modificado conserva multiples versiones y tabla extensa; debe seleccionarse version exacta, revisar licencia y evitar recomendaciones farmacologicas directas.",
  en: "Block 8B-2: original Finnegan source located. Finnegan/Modified Finnegan retains multiple versions and an extensive table; exact version selection, licensing review, and avoidance of direct pharmacologic recommendations are required."
};

const brightonPewsValidationNotes: LocalizedText = {
  es: "Bloque 8B-2: fuente Brighton/Monaghan PEWS localizada con DOI. Pendiente tabla completa reutilizable, separacion de protocolo institucional/escalado y revision de licencia antes de implementar.",
  en: "Block 8B-2: Brighton/Monaghan PEWS source located with DOI. Complete reusable table, institutional/escalation protocol separation, and licensing review remain pending before implementation."
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

const clinicalToolFormMetadata: Record<string, Partial<ClinicalToolMetadata>> = {
  apgar: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
    inputs: [
      {
        id: "heart_rate",
        label: { es: "Frecuencia cardiaca", en: "Heart rate" },
        description: {
          es: "Dominio observacional del test de Apgar.",
          en: "Observational Apgar domain."
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
        options: scoreOptions("respiratory_effort")
      },
      {
        id: "muscle_tone",
        label: { es: "Tono muscular", en: "Muscle tone" },
        type: "single_choice",
        required: true,
        options: scoreOptions("muscle_tone")
      },
      {
        id: "reflex_irritability",
        label: { es: "Irritabilidad refleja", en: "Reflex irritability" },
        type: "single_choice",
        required: true,
        options: scoreOptions("reflex_irritability")
      },
      {
        id: "color",
        label: { es: "Coloracion", en: "Color" },
        type: "single_choice",
        required: true,
        options: scoreOptions("color")
      }
    ],
    interpretationBands: [
      {
        id: "normal_transition",
        min: 8,
        max: 10,
        label: { es: "Adaptacion normal", en: "Normal transition" },
        description: {
          es: "Rango documentado en la base de conocimiento; requiere trazabilidad final.",
          en: "Range documented in the knowledge base; final traceability required."
        }
      },
      {
        id: "observation",
        min: 4,
        max: 7,
        label: { es: "Vigilancia", en: "Observation" },
        description: {
          es: "Rango documentado en la base de conocimiento; requiere trazabilidad final.",
          en: "Range documented in the knowledge base; final traceability required."
        }
      }
    ],
    scoringTable: [
      {
        id: "apgar_domains",
        variable: { es: "Cinco dominios", en: "Five domains" },
        value: "0-2",
        description: {
          es: "Frecuencia cardiaca, esfuerzo respiratorio, tono, reflejo y coloracion.",
          en: "Heart rate, respiratory effort, tone, reflex irritability, and color."
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
  nips: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Escala NIPS preparada con seis dominios documentados localmente. El calculo suma 0-1 en cinco dominios y 0-2 en llanto.",
      en: "NIPS scale prepared with six locally documented domains. Calculation sums 0-1 in five domains and 0-2 in cry."
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
    calculationNotes: pendingCalculationNotes,
    inputs: [
      {
        id: "suprasternal_retractions",
        label: { es: "Retracciones suprasternales", en: "Suprasternal retractions" },
        type: "single_choice",
        required: true,
        options: [option("absent", "No", "No", 0), option("present", "Si", "Yes", 2)]
      },
      {
        id: "scalene_muscle_contraction",
        label: { es: "Contraccion de musculos escalenos", en: "Scalene muscle contraction" },
        type: "single_choice",
        required: true,
        options: [option("absent", "No", "No", 0), option("present", "Si", "Yes", 2)]
      },
      {
        id: "air_entry",
        label: { es: "Entrada de aire", en: "Air entry" },
        type: "single_choice",
        required: true,
        options: [
          option("normal", "Normal", "Normal", 0),
          option("decreased_bases", "Disminuida en bases", "Decreased at bases", 1),
          option("decreased_apex_bases", "Disminuida en apices y bases", "Decreased at apex and bases", 2),
          option("minimal_absent", "Minima o ausente", "Minimal or absent", 3)
        ]
      },
      {
        id: "wheezing",
        label: { es: "Sibilancias", en: "Wheezing" },
        type: "single_choice",
        required: true,
        options: [
          option("absent", "Ausentes", "Absent", 0),
          option("expiratory_only", "Solo espiratorias", "Expiratory only", 1),
          option("inspiratory_or_expiratory", "Inspiratorias +/- espiratorias", "Inspiratory +/- expiratory", 2),
          option("audible_or_silent", "Audibles sin estetoscopio o torax silencioso", "Audible without stethoscope or silent chest", 3)
        ]
      },
      {
        id: "oxygen_saturation",
        label: { es: "Saturacion de oxigeno", en: "Oxygen saturation" },
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
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "moderate",
        min: 4,
        max: 7,
        label: { es: "Moderada", en: "Moderate" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "severe",
        min: 8,
        max: 12,
        label: { es: "Grave", en: "Severe" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      }
    ],
    scoringTable: [
      {
        id: "pram_domains",
        variable: { es: "Saturacion, retracciones, escalenos, entrada de aire y sibilancias", en: "Saturation, retractions, scalene muscles, air entry, and wheezing" },
        value: "0-3",
        description: {
          es: "Tabla preparada como estructura; el texto exacto de opciones requiere validacion.",
          en: "Table prepared as structure; exact option wording requires validation."
        }
      }
    ]
  },
  westley_croup: {
    calculationStatus: "metadata_ready",
    calculationNotes: pendingCalculationNotes,
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
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "moderate",
        min: 3,
        max: 5,
        label: { es: "Moderado", en: "Moderate" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "severe",
        min: 6,
        max: 11,
        label: { es: "Severo", en: "Severe" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      },
      {
        id: "impending_respiratory_failure",
        min: 12,
        max: 17,
        label: { es: "Fallo respiratorio inminente", en: "Impending respiratory failure" },
        description: { es: "Pendiente de validacion final.", en: "Pending final validation." }
      }
    ],
    scoringTable: [
      {
        id: "westley_domains",
        variable: { es: "Retracciones, estridor, cianosis, conciencia y entrada de aire", en: "Retractions, stridor, cyanosis, consciousness, and air entry" },
        value: "0-5",
        description: {
          es: "Estructura preparada; los pesos exactos permanecen pendientes de validacion.",
          en: "Structure prepared; exact weights remain pending validation."
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
  sipa: {
    calculationStatus: "metadata_ready",
    calculationNotes: {
      es: "Calcula indice de shock como frecuencia cardiaca / presion arterial sistolica. La interpretacion solo se activa para rangos de edad con umbrales documentados localmente.",
      en: "Calculates shock index as heart rate / systolic blood pressure. Interpretation is only enabled for age ranges with locally documented thresholds."
    },
    inputs: [
      {
        id: "age_years",
        label: { es: "Edad", en: "Age" },
        type: "number",
        required: true,
        unit: "anos",
        min: 0,
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
          es: "Formula documentada en la base de conocimiento del proyecto.",
          en: "Formula documented in the project knowledge base."
        }
      },
      {
        id: "sipa_4_6",
        variable: { es: "4 a <6 anos", en: "4 to <6 years" },
        value: "> 1.2",
        description: {
          es: "Umbral documentado para interpretacion trazable.",
          en: "Documented threshold for traceable interpretation."
        }
      },
      {
        id: "sipa_6_12",
        variable: { es: "6 a 12 anos", en: "6 to 12 years" },
        value: "> 1.0",
        description: {
          es: "Umbral documentado para interpretacion trazable.",
          en: "Documented threshold for traceable interpretation."
        }
      },
      {
        id: "sipa_over_12",
        variable: { es: "Mas de 12 anos", en: "Older than 12 years" },
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
  makeTool("wood_downes_ferres", "wood-downes-ferres", "WDF", "Score de Wood-Downes-Ferres", "Wood-Downes-Ferres Score", "respiratory", "bronchiolitis_wheezing", "score", "Lactantes y ninos con bronquiolitis u obstruccion respiratoria segun variante", "Infants and children with bronchiolitis or obstructive respiratory distress depending on variant", "Evalua gravedad de dificultad respiratoria obstructiva.", "Assesses severity of obstructive respiratory distress.", "pending_validation", "pending_verification", "medium", woodDownesValidationNotes),
  makeTool("ballard", "ballard", "Ballard", "Ballard / New Ballard", "Ballard / New Ballard", "neonatology", "gestational_age", "score", "Recien nacidos con edad gestacional incierta", "Newborns with uncertain gestational age", "Estima edad gestacional con madurez fisica y neuromuscular.", "Estimates gestational age using physical and neuromuscular maturity.", "pending_validation", "original_derivation_study", "medium", ballardValidationNotes),
  makeTool("dubowitz", "dubowitz", "Dubowitz", "Dubowitz", "Dubowitz Score", "neonatology", "gestational_age", "score", "Recien nacidos", "Newborns", "Herramienta de estimacion de edad gestacional basada en madurez neonatal.", "Gestational age assessment based on neonatal maturity.", "pending_validation", "original_derivation_study", "medium", dubowitzValidationNotes),
  makeTool("sarnat", "sarnat", "Sarnat", "Sarnat y Sarnat", "Sarnat Staging", "neonatology", "hypoxic_ischemic_encephalopathy", "scale", "Recien nacidos con sospecha de encefalopatia hipoxico-isquemica", "Newborns with suspected hypoxic-ischemic encephalopathy", "Clasifica encefalopatia neonatal en estadios clinicos.", "Classifies neonatal encephalopathy into clinical stages.", "pending_validation", "original_derivation_study", "medium", sarnatValidationNotes),
  makeTool("thompson_hie", "thompson-hie-score", "Thompson HIE", "Puntaje de Thompson para EHI", "Thompson HIE Score", "neonatology", "hypoxic_ischemic_encephalopathy", "score", "Recien nacidos con encefalopatia hipoxico-isquemica", "Newborns with hypoxic-ischemic encephalopathy", "Score clinico para gravedad de EHI neonatal.", "Clinical score for neonatal HIE severity.", "pending_validation", "original_derivation_study", "medium", thompsonHieEvidenceValidationNotes),
  makeTool("modified_finnegan", "modified-finnegan", "Finnegan", "Finnegan modificado / NAS", "Modified Finnegan NAS Score", "neonatology", "neonatal_abstinence", "score", "Recien nacidos con sospecha de sindrome de abstinencia neonatal", "Newborns with suspected neonatal abstinence syndrome", "Valora signos de abstinencia neonatal.", "Assesses neonatal abstinence signs.", "pending_validation", "pending_verification", "medium", finneganValidationNotes),
  makeTool("eat_sleep_console", "eat-sleep-console", "ESC", "Eat Sleep Console", "Eat Sleep Console", "neonatology", "neonatal_abstinence", "algorithm", "Recien nacidos expuestos a opioides", "Opioid-exposed newborns", "Modelo funcional para seguimiento de abstinencia neonatal.", "Functional model for neonatal withdrawal assessment.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("nips", "nips", "NIPS", "Neonatal Infant Pain Scale", "Neonatal Infant Pain Scale", "pain", "neonatal_pain", "scale", "Neonatos", "Neonates", "Escala observacional de dolor neonatal.", "Observational neonatal pain scale.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready, [docRef("nips_kb", "PedsCore_Knowledge_Base_v1: NIPS", "pending_verification")]),
  makeTool("pipp", "pipp", "PIPP", "Premature Infant Pain Profile", "Premature Infant Pain Profile", "pain", "neonatal_pain", "scale", "Prematuros y neonatos", "Preterm infants and neonates", "Escala de dolor neonatal, especialmente en prematuros.", "Neonatal pain scale, especially for preterm infants.", "pending_validation", "pending_verification", "medium", pippValidationNotes),
  makeTool("pipp_r", "pipp-r", "PIPP-R", "Premature Infant Pain Profile-Revised", "Premature Infant Pain Profile-Revised", "pain", "neonatal_pain", "scale", "Prematuros y neonatos", "Preterm infants and neonates", "Version revisada de PIPP.", "Revised version of PIPP.", "pending_validation", "pending_verification", "medium", pippValidationNotes),
  makeTool("cries", "cries", "CRIES", "CRIES", "CRIES", "pain", "neonatal_pain", "scale", "Neonatos con dolor postoperatorio", "Neonates with postoperative pain", "Escala neonatal de dolor basada en cinco dominios.", "Neonatal pain scale based on five domains.", "pending_validation", "pending_verification", "low", criesValidationNotes, [docRef("cries_kb", "PedsCore_Knowledge_Base_v1: CRIES", "pending_verification")]),
  makeTool("comfortneo", "comfortneo", "COMFORTneo", "COMFORTneo", "COMFORTneo", "neonatology", "sedation_pain", "scale", "Neonatos en cuidados intensivos", "Neonates in intensive care", "Escala multidimensional de sedacion y dolor neonatal.", "Multidimensional neonatal sedation and pain scale.", "pending_validation", "pending_verification", "medium", comfortneoValidationNotes),
  makeTool("bhutani_nomogram", "bhutani-nomogram", "Bhutani", "Nomograma de Bhutani", "Bhutani Nomogram", "neonatology", "jaundice_bilirubin", "nomogram", "Recien nacidos con hiperbilirrubinemia", "Newborns with hyperbilirubinemia", "Nomograma de riesgo para bilirrubina neonatal.", "Risk nomogram for neonatal bilirubin.", "pending_validation", "original_derivation_study", "medium", bhutaniValidationNotes),
  makeTool("neonatal_growth_fenton", "neonatal-growth-fenton", "Fenton", "Crecimiento neonatal Fenton", "Fenton Neonatal Growth", "neonatology", "growth", "percentile", "Recien nacidos prematuros", "Preterm newborns", "Referencia de crecimiento neonatal para prematuros.", "Neonatal growth reference for preterm infants.", "pending_validation", "systematic_review", "medium", fentonValidationNotes),
  makeTool("pews", "pews", "PEWS", "Pediatric Early Warning Score", "Pediatric Early Warning Score", "emergency", "early_warning", "score", "Ninos hospitalizados o en urgencias", "Hospitalized children or children in emergency care", "Score de deteccion precoz de deterioro clinico con multiples variantes.", "Early warning score for clinical deterioration with multiple variants.", "pending_validation", "pending_verification", "medium", pewsValidationNotes),
  makeTool("brighton_pews", "brighton-pews", "Brighton PEWS", "Brighton PEWS", "Brighton PEWS", "emergency", "early_warning", "score", "Ninos hospitalizados", "Hospitalized children", "Variante de PEWS identificada para revision.", "PEWS variant identified for review.", "pending_validation", "original_derivation_study", "medium", brightonPewsValidationNotes),
  makeTool("bedside_pews", "bedside-pews", "Bedside PEWS", "Bedside PEWS", "Bedside PEWS", "emergency", "early_warning", "score", "Ninos hospitalizados", "Hospitalized children", "Variante Bedside PEWS identificada para revision.", "Bedside PEWS variant identified for review.", "pending_validation", "original_derivation_study", "medium", bedsidePewsValidationNotes),
  makeTool("westley_croup", "westley-croup-score", "Westley", "Westley Croup Score", "Westley Croup Score", "respiratory", "croup", "score", "Ninos con crup", "Children with croup", "Evalua gravedad del crup mediante signos clinicos.", "Assesses croup severity using clinical signs.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("pram", "pram", "PRAM", "Pediatric Respiratory Assessment Measure", "Pediatric Respiratory Assessment Measure", "respiratory", "asthma_wheezing", "score", "Ninos con crisis asmatica o sibilancias", "Children with asthma exacerbation or wheezing", "Mide gravedad de broncoespasmo pediatrico.", "Measures pediatric wheezing/asthma severity.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("rdai", "rdai", "RDAI", "Respiratory Distress Assessment Instrument", "Respiratory Distress Assessment Instrument", "respiratory", "bronchiolitis", "score", "Ninos con bronquiolitis", "Children with bronchiolitis", "Evalua sibilancias y retracciones en bronquiolitis.", "Assesses wheezing and retractions in bronchiolitis.", "pending_validation", "pending_primary_source", "medium", rdaiValidationNotes),
  makeTool("brosjod", "brosjod", "BROSJOD", "BROSJOD", "BROSJOD", "respiratory", "bronchiolitis", "score", "Lactantes con bronquiolitis", "Infants with bronchiolitis", "Escala de bronquiolitis identificada en recomendaciones.", "Bronchiolitis scale identified in recommendations.", "pending_validation", "external_validation_study", "medium", brosjodValidationNotes),
  makeTool("pass", "pass", "PASS", "Pediatric Asthma Severity Score", "Pediatric Asthma Severity Score", "respiratory", "asthma", "score", "Ninos con asma o broncoespasmo", "Children with asthma or wheezing", "Score de gravedad de asma pediatrica identificado para revision.", "Pediatric asthma severity score identified for review.", "pending_validation", "original_derivation_study", "medium", passValidationNotes),
  makeTool("risc", "risc", "RISC", "RISC", "RISC", "respiratory", "pneumonia", "score", "Ninos con neumonia", "Children with pneumonia", "Score de gravedad de neumonia identificado en recomendaciones.", "Pneumonia severity score identified in recommendations.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("mrisc", "mrisc", "mRISC", "mRISC", "mRISC", "respiratory", "pneumonia", "score", "Ninos con neumonia", "Children with pneumonia", "Variante modificada RISC para neumonia.", "Modified RISC variant for pneumonia.", "coming_soon", "pending_verification", "medium", baseValidationNotes.future),
  makeTool("pediatric_gcs", "pediatric-glasgow-coma-scale", "pGCS", "Escala de Coma de Glasgow pediatrica", "Pediatric Glasgow Coma Scale", "neurology", "consciousness", "scale", "Ninos con necesidad de valoracion neurologica", "Children requiring neurologic assessment", "Adaptacion pediatrica de apertura ocular, respuesta verbal y motora.", "Pediatric adaptation of eye, verbal, and motor response.", "pending_validation", "pending_verification", "medium", pediatricGcsValidationNotes),
  makeTool("benes", "benes", "Benes", "Benes", "Benes", "neurology", "consciousness", "scale", "Ninos con necesidad de valoracion neurologica", "Children requiring neurologic assessment", "Herramienta neurologica alternativa identificada.", "Alternative neurologic assessment tool identified.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("glasgow_adapted", "glasgow-adapted", "Glasgow adaptado", "Glasgow adaptado", "Adapted Glasgow", "neurology", "consciousness", "scale", "Ninos", "Children", "Variante adaptada de Glasgow identificada para revision.", "Adapted Glasgow variant identified for review.", "needs_primary_reference", "primary_reference_needed", "medium", baseValidationNotes.primary),
  makeTool("clinical_dehydration_scale", "clinical-dehydration-scale", "CDS", "Clinical Dehydration Scale", "Clinical Dehydration Scale", "emergency", "dehydration", "score", "Ninos con sospecha de deshidratacion", "Children with suspected dehydration", "Score clinico de gravedad de deshidratacion.", "Clinical score for dehydration severity.", "ready_for_implementation", "moderate", "low", baseValidationNotes.ready),
  makeTool("gorelick_dehydration", "gorelick-dehydration", "Gorelick", "Escala de Gorelick", "Gorelick Dehydration Scale", "emergency", "dehydration", "score", "Ninos con sospecha de deshidratacion", "Children with suspected dehydration", "Escala alternativa de deshidratacion identificada.", "Alternative dehydration scale identified.", "pending_validation", "original_derivation_study", "medium", gorelickValidationNotes),
  makeTool("pecarn_tbi_under_2", "pecarn-tbi-under-2", "PECARN <2", "PECARN TCE menor de 2 anos", "PECARN TBI Under 2 Years", "emergency", "head_trauma", "clinical_rule", "Menores de 2 anos con traumatismo craneal", "Children under 2 years with head trauma", "Regla clinica PECARN para estratificacion de riesgo en TCE.", "PECARN clinical rule for TBI risk stratification.", "ready_for_implementation", "high", "medium", baseValidationNotes.ready),
  makeTool("pecarn_tbi_2_or_more", "pecarn-tbi-2-or-more", "PECARN >=2", "PECARN TCE 2 anos o mas", "PECARN TBI 2 Years or Older", "emergency", "head_trauma", "clinical_rule", "Ninos de 2 anos o mas con traumatismo craneal", "Children 2 years or older with head trauma", "Regla clinica PECARN para estratificacion de riesgo en TCE.", "PECARN clinical rule for TBI risk stratification.", "ready_for_implementation", "high", "medium", baseValidationNotes.ready),
  makeTool("catch_tbi", "catch-tbi", "CATCH", "CATCH", "CATCH", "emergency", "head_trauma", "clinical_rule", "Ninos con traumatismo craneal", "Children with head trauma", "Regla de decision de TCE identificada para revision.", "TBI decision rule identified for review.", "ready_for_implementation", "original_derivation_study", "medium", catchValidationNotes),
  makeTool("chalice_tbi", "chalice-tbi", "CHALICE", "CHALICE", "CHALICE", "emergency", "head_trauma", "clinical_rule", "Ninos con traumatismo craneal", "Children with head trauma", "Regla de decision de TCE identificada para revision.", "TBI decision rule identified for review.", "ready_for_implementation", "original_derivation_study", "medium", chaliceValidationNotes),
  makeTool("sipa", "sipa", "SIPA", "Shock Index Pediatric Age-adjusted", "Shock Index Pediatric Age-adjusted", "emergency", "shock", "calculator", "Ninos con posible shock o trauma", "Children with possible shock or trauma", "Indice de shock ajustado por edad.", "Age-adjusted shock index.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready, [docRef("sipa_kb", "PedsCore_Knowledge_Base_v1: SIPA", "pending_verification")]),
  makeTool("regional_sepsis_scores", "regional-sepsis-scores", "Sepsis scores", "Escalas regionales de sepsis", "Regional Sepsis Scores", "emergency", "sepsis", "score", "Ninos con sospecha de sepsis", "Children with suspected sepsis", "Familia de escalas regionales identificada para fases futuras.", "Family of regional scales identified for future phases.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("qtc_bazett", "qtc-bazett", "QTc Bazett", "QTc Bazett", "QTc Bazett", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Bazett.", "QT correction using Bazett formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("qtc_fridericia", "qtc-fridericia", "QTc Fridericia", "QTc Fridericia", "QTc Fridericia", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Fridericia.", "QT correction using Fridericia formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("qtc_framingham", "qtc-framingham", "QTc Framingham", "QTc Framingham", "QTc Framingham", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Framingham.", "QT correction using Framingham formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("qtc_hodges", "qtc-hodges", "QTc Hodges", "QTc Hodges", "QTc Hodges", "cardiology", "electrocardiography", "calculator", "Pacientes pediatricos con intervalo QT medido", "Pediatric patients with measured QT interval", "Correccion QT mediante formula de Hodges.", "QT correction using Hodges formula.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("bedside_schwartz", "bedside-schwartz", "Bedside Schwartz", "Bedside Schwartz", "Bedside Schwartz", "nephrology", "egfr", "calculator", "Ninos con creatinina y talla disponibles", "Children with available creatinine and height", "Estimacion de filtrado glomerular pediatrico.", "Pediatric estimated glomerular filtration rate.", "ready_for_implementation", "moderate", "medium", baseValidationNotes.ready),
  makeTool("revised_schwartz", "revised-schwartz", "Schwartz", "Schwartz revisado", "Revised Schwartz", "nephrology", "egfr", "calculator", "Ninos con creatinina y talla disponibles", "Children with available creatinine and height", "Formula revisada de Schwartz para eGFR pediatrico.", "Revised Schwartz formula for pediatric eGFR.", "pending_validation", "original_derivation_study", "medium", revisedSchwartzValidationNotes),
  makeTool("prifle", "prifle", "pRIFLE", "pRIFLE", "pRIFLE", "nephrology", "acute_kidney_injury", "clinical_rule", "Ninos con riesgo de lesion renal aguda", "Children at risk of acute kidney injury", "Clasificacion pediatrica de lesion renal aguda.", "Pediatric acute kidney injury classification.", "pending_validation", "original_derivation_study", "medium", prifleValidationNotes),
  makeTool("kdigo_pediatric", "kdigo-pediatric", "KDIGO pediatrico", "KDIGO pediatrico", "Pediatric KDIGO", "nephrology", "acute_kidney_injury", "clinical_rule", "Ninos con riesgo de lesion renal aguda", "Children at risk of acute kidney injury", "Aplicacion pediatrica de criterios KDIGO para lesion renal aguda.", "Pediatric application of KDIGO criteria for acute kidney injury.", "pending_validation", "pending_verification", "medium"),
  makeTool("psofa", "psofa", "pSOFA", "pSOFA", "Pediatric Sequential Organ Failure Assessment", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Evalua disfuncion organica multiple pediatrica.", "Assesses pediatric multi-organ dysfunction.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pelod", "pelod", "PELOD", "PELOD", "PELOD", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Score de disfuncion organica pediatrica.", "Pediatric organ dysfunction score.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pelod_2", "pelod-2", "PELOD-2", "PELOD-2", "PELOD-2", "intensive_care", "organ_dysfunction", "score", "Ninos criticamente enfermos", "Critically ill children", "Version PELOD-2 para disfuncion organica multiple.", "PELOD-2 version for multi-organ dysfunction.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("prism_iii", "prism-iii", "PRISM III", "PRISM III", "PRISM III", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Score de riesgo de mortalidad en UCI pediatrica.", "Pediatric ICU mortality risk score.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("prism_iv", "prism-iv", "PRISM IV", "PRISM IV", "PRISM IV", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Version PRISM IV identificada para revision.", "PRISM IV version identified for review.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pim2", "pim2", "PIM2", "PIM2", "PIM2", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Indice de mortalidad pediatrica version 2.", "Pediatric Index of Mortality version 2.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("pim3", "pim3", "PIM3", "PIM3", "PIM3", "intensive_care", "mortality_risk", "score", "Ninos ingresados en UCI pediatrica", "Children admitted to pediatric ICU", "Indice de mortalidad pediatrica version 3.", "Pediatric Index of Mortality version 3.", "coming_soon", "pending_verification", "high", baseValidationNotes.future),
  makeTool("who_growth_percentiles", "who-growth-percentiles", "OMS", "Percentiles OMS", "WHO Growth Percentiles", "growth_nutrition", "growth", "percentile", "Lactantes y ninos segun edad aplicable", "Infants and children depending on applicable age", "Curvas de crecimiento OMS para peso, talla y otros parametros.", "WHO growth curves for weight, height, and other parameters.", "pending_validation", "official_manual_or_institutional_protocol", "medium", whoGrowthValidationNotes),
  makeTool("cdc_growth_percentiles", "cdc-growth-percentiles", "CDC", "Percentiles CDC", "CDC Growth Percentiles", "growth_nutrition", "growth", "percentile", "Ninos y adolescentes segun edad aplicable", "Children and adolescents depending on applicable age", "Curvas de crecimiento CDC.", "CDC growth curves.", "pending_validation", "official_manual_or_institutional_protocol", "medium", cdcGrowthValidationNotes),
  makeTool("orbegozo_growth_percentiles", "orbegozo-growth-percentiles", "Orbegozo", "Percentiles Orbegozo", "Orbegozo Growth Percentiles", "growth_nutrition", "growth", "percentile", "Poblacion pediatrica segun tablas aplicables", "Pediatric population depending on applicable tables", "Curvas de crecimiento Fundacion Orbegozo.", "Fundacion Orbegozo growth curves.", "pending_validation", "official_manual_or_institutional_protocol", "medium", orbegozoGrowthValidationNotes),
  makeTool("bmi_percentile", "bmi-percentile", "IMC percentilado", "IMC percentilado", "BMI Percentile", "growth_nutrition", "growth", "percentile", "Ninos y adolescentes", "Children and adolescents", "Calcula IMC y percentil segun curva seleccionada.", "Calculates BMI and percentile according to selected curve.", "pending_validation", "pending_verification", "medium"),
  makeTool("head_circumference_percentile", "head-circumference-percentile", "PC percentil", "Percentil de perimetro craneal", "Head Circumference Percentile", "growth_nutrition", "growth", "percentile", "Lactantes y ninos pequenos", "Infants and young children", "Percentil de perimetro craneal segun curva seleccionada.", "Head circumference percentile according to selected curve.", "pending_validation", "pending_verification", "medium"),
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
