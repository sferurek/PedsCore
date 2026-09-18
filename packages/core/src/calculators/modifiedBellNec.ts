import type { CalculationResult } from "../types.js";
import { getBoolean, getTool, label, warning } from "./common.js";
import type { CalculatorDefinition } from "./common.js";

export const modifiedBellNecCalculator: CalculatorDefinition = {
  toolId: "modified_bell_nec",
  calculate: (input): CalculationResult => {
    const tool = getTool("modified-bell-nec");

    const systemicInstability = getBoolean(input, "systemic_instability");
    const mildGiSigns = getBoolean(input, "mild_gi_signs");
    const grossBlood = getBoolean(input, "gross_bloody_stool");
    const absentBowelSoundsOrTenderness = getBoolean(input, "absent_bowel_sounds_or_tenderness");
    const mildAcidosisOrThrombocytopenia = getBoolean(input, "mild_acidosis_or_thrombocytopenia");
    const abdominalCellulitisOrMass = getBoolean(input, "abdominal_cellulitis_or_mass");
    const hypotensionDicOrNeutropenia = getBoolean(input, "hypotension_dic_or_neutropenia");
    const pneumatosis = getBoolean(input, "pneumatosis_intestinalis");
    const portalVenousGas = getBoolean(input, "portal_venous_gas");
    const ascites = getBoolean(input, "ascites");
    const pneumoperitoneum = getBoolean(input, "pneumoperitoneum");

    const values = [
      systemicInstability,
      mildGiSigns,
      grossBlood,
      absentBowelSoundsOrTenderness,
      mildAcidosisOrThrombocytopenia,
      abdominalCellulitisOrMass,
      hypotensionDicOrNeutropenia,
      pneumatosis,
      portalVenousGas,
      ascites,
      pneumoperitoneum
    ];

    if (values.some((v) => v === null)) {
      return {
        toolId: tool.id,
        warnings: [warning(
          "missing_modified_bell_inputs",
          "Faltan datos para clasificar el estadio de Bell modificado.",
          "Data are missing to classify the modified Bell stage."
        )],
        trace: []
      };
    }

    let stage = "IA";
    if (grossBlood) stage = "IB";
    if (pneumatosis) stage = "IIA";
    if (pneumatosis && (portalVenousGas || mildAcidosisOrThrombocytopenia || abdominalCellulitisOrMass)) stage = "IIB";
    if (ascites && hypotensionDicOrNeutropenia) stage = "IIIA";
    if (pneumoperitoneum) stage = "IIIB";

    const compatible =
      stage !== "IA" ||
      systemicInstability ||
      mildGiSigns;

    if (!compatible) {
      return {
        toolId: tool.id,
        classification: label(
          "Hallazgos insuficientes para asignar un estadio de Bell modificado",
          "Insufficient findings to assign a modified Bell stage"
        ),
        warnings: [warning(
          "modified_bell_insufficient",
          "La clasificación requiere integrar hallazgos sistémicos, abdominales y radiológicos; no se debe forzar un estadio con datos incompletos.",
          "The classification requires integrated systemic, abdominal, and radiologic findings; a stage should not be forced from incomplete data."
        )],
        trace: []
      };
    }

    const classLabel =
      stage === "IA" || stage === "IB"
        ? label(`Estadio ${stage}: sospecha de NEC`, `Stage ${stage}: suspected NEC`)
        : stage === "IIA"
          ? label("Estadio IIA: NEC definida, afectación leve", "Stage IIA: definite NEC, mildly ill")
          : stage === "IIB"
            ? label("Estadio IIB: NEC definida, afectación moderada", "Stage IIB: definite NEC, moderately ill")
            : stage === "IIIA"
              ? label("Estadio IIIA: NEC avanzada, intestino íntegro", "Stage IIIA: advanced NEC, intact bowel")
              : label("Estadio IIIB: NEC avanzada con perforación", "Stage IIIB: advanced NEC with perforation");

    return {
      toolId: tool.id,
      classification: classLabel,
      warnings: [
        warning(
          "modified_bell_context",
          "La clasificación de Bell modificada es un sistema de estadificación clínica/radiológica. No sustituye la valoración neonatal, radiológica ni quirúrgica y no debe utilizarse como única base para decisiones terapéuticas.",
          "Modified Bell is a clinical/radiologic staging system. It does not replace neonatal, radiologic, or surgical assessment and should not be used as the sole basis for treatment decisions."
        )
      ],
      trace: [
        { inputId: "systemic_instability", value: systemicInstability },
        { inputId: "mild_gi_signs", value: mildGiSigns },
        { inputId: "gross_bloody_stool", value: grossBlood },
        { inputId: "absent_bowel_sounds_or_tenderness", value: absentBowelSoundsOrTenderness },
        { inputId: "mild_acidosis_or_thrombocytopenia", value: mildAcidosisOrThrombocytopenia },
        { inputId: "abdominal_cellulitis_or_mass", value: abdominalCellulitisOrMass },
        { inputId: "hypotension_dic_or_neutropenia", value: hypotensionDicOrNeutropenia },
        { inputId: "pneumatosis_intestinalis", value: pneumatosis },
        { inputId: "portal_venous_gas", value: portalVenousGas },
        { inputId: "ascites", value: ascites },
        { inputId: "pneumoperitoneum", value: pneumoperitoneum },
        { inputId: "modified_bell_stage", value: stage }
      ]
    };
  }
};
