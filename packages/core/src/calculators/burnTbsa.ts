import type { CalculationResult, LocalizedText } from "../types.js";
import { warning } from "./common.js";
import type { CalculatorDefinition, CalculatorInput } from "./common.js";

export type PediatricBurnTbsaAgeBand =
  | "birth_to_1_year"
  | "one_to_four_years"
  | "five_to_nine_years"
  | "ten_to_fourteen_years"
  | "fifteen_years";

export type PediatricBurnTbsaRegion =
  | "head"
  | "neck"
  | "anterior_trunk"
  | "posterior_trunk"
  | "right_buttock"
  | "left_buttock"
  | "genitalia"
  | "right_upper_arm"
  | "left_upper_arm"
  | "right_lower_arm"
  | "left_lower_arm"
  | "right_hand"
  | "left_hand"
  | "right_thigh"
  | "left_thigh"
  | "right_lower_leg"
  | "left_lower_leg"
  | "right_foot"
  | "left_foot";

export interface PediatricBurnTbsaRegionDefinition {
  id: PediatricBurnTbsaRegion;
  label: LocalizedText;
  percentages: Record<PediatricBurnTbsaAgeBand, number>;
}

export interface PediatricBurnTbsaRegionContribution {
  region: PediatricBurnTbsaRegion;
  regionalPercent: number;
  fractionBurned: number;
  contribution: number;
}

export interface PediatricBurnTbsaDetailedResult {
  ageBand: PediatricBurnTbsaAgeBand;
  totalTbsa: number;
  contributions: PediatricBurnTbsaRegionContribution[];
}

export const pediatricBurnTbsaSource = {
  id: "vumc_pediatric_burn_fluid_resuscitation_2025",
  title: "Pediatric Burn Fluid Resuscitation",
  url: "https://www.vumc.org/burn/sites/default/files/public_files/Protocols/Pediatric-Burn-Fluid-Resuscitation-3.2025.pdf",
  notes:
    "PedsCore uses only the numeric modified Lund-Browder regional percentage table; it does not implement protocol care-action sections."
} as const;

export const pediatricBurnTbsaRegions: readonly PediatricBurnTbsaRegionDefinition[] = [
  {
    id: "head",
    label: { es: "Cabeza", en: "Head" },
    percentages: {
      birth_to_1_year: 19,
      one_to_four_years: 17,
      five_to_nine_years: 13,
      ten_to_fourteen_years: 11,
      fifteen_years: 9
    }
  },
  {
    id: "neck",
    label: { es: "Cuello", en: "Neck" },
    percentages: {
      birth_to_1_year: 2,
      one_to_four_years: 2,
      five_to_nine_years: 2,
      ten_to_fourteen_years: 2,
      fifteen_years: 2
    }
  },
  {
    id: "anterior_trunk",
    label: { es: "Tronco anterior", en: "Anterior trunk" },
    percentages: {
      birth_to_1_year: 13,
      one_to_four_years: 13,
      five_to_nine_years: 13,
      ten_to_fourteen_years: 13,
      fifteen_years: 13
    }
  },
  {
    id: "posterior_trunk",
    label: { es: "Tronco posterior", en: "Posterior trunk" },
    percentages: {
      birth_to_1_year: 13,
      one_to_four_years: 13,
      five_to_nine_years: 13,
      ten_to_fourteen_years: 13,
      fifteen_years: 13
    }
  },
  {
    id: "right_buttock",
    label: { es: "Gluteo derecho", en: "Right buttock" },
    percentages: {
      birth_to_1_year: 2.5,
      one_to_four_years: 2.5,
      five_to_nine_years: 2.5,
      ten_to_fourteen_years: 2.5,
      fifteen_years: 2.5
    }
  },
  {
    id: "left_buttock",
    label: { es: "Gluteo izquierdo", en: "Left buttock" },
    percentages: {
      birth_to_1_year: 2.5,
      one_to_four_years: 2.5,
      five_to_nine_years: 2.5,
      ten_to_fourteen_years: 2.5,
      fifteen_years: 2.5
    }
  },
  {
    id: "genitalia",
    label: { es: "Genitales/perine", en: "Genitalia/perineum" },
    percentages: {
      birth_to_1_year: 1,
      one_to_four_years: 1,
      five_to_nine_years: 1,
      ten_to_fourteen_years: 1,
      fifteen_years: 1
    }
  },
  {
    id: "right_upper_arm",
    label: { es: "Brazo derecho", en: "Right upper arm" },
    percentages: {
      birth_to_1_year: 4,
      one_to_four_years: 4,
      five_to_nine_years: 4,
      ten_to_fourteen_years: 4,
      fifteen_years: 4
    }
  },
  {
    id: "left_upper_arm",
    label: { es: "Brazo izquierdo", en: "Left upper arm" },
    percentages: {
      birth_to_1_year: 4,
      one_to_four_years: 4,
      five_to_nine_years: 4,
      ten_to_fourteen_years: 4,
      fifteen_years: 4
    }
  },
  {
    id: "right_lower_arm",
    label: { es: "Antebrazo derecho", en: "Right lower arm" },
    percentages: {
      birth_to_1_year: 3,
      one_to_four_years: 3,
      five_to_nine_years: 3,
      ten_to_fourteen_years: 3,
      fifteen_years: 3
    }
  },
  {
    id: "left_lower_arm",
    label: { es: "Antebrazo izquierdo", en: "Left lower arm" },
    percentages: {
      birth_to_1_year: 3,
      one_to_four_years: 3,
      five_to_nine_years: 3,
      ten_to_fourteen_years: 3,
      fifteen_years: 3
    }
  },
  {
    id: "right_hand",
    label: { es: "Mano derecha", en: "Right hand" },
    percentages: {
      birth_to_1_year: 2.5,
      one_to_four_years: 2.5,
      five_to_nine_years: 2.5,
      ten_to_fourteen_years: 2.5,
      fifteen_years: 2.5
    }
  },
  {
    id: "left_hand",
    label: { es: "Mano izquierda", en: "Left hand" },
    percentages: {
      birth_to_1_year: 2.5,
      one_to_four_years: 2.5,
      five_to_nine_years: 2.5,
      ten_to_fourteen_years: 2.5,
      fifteen_years: 2.5
    }
  },
  {
    id: "right_thigh",
    label: { es: "Muslo derecho", en: "Right thigh" },
    percentages: {
      birth_to_1_year: 5.5,
      one_to_four_years: 6.5,
      five_to_nine_years: 8,
      ten_to_fourteen_years: 8.5,
      fifteen_years: 9
    }
  },
  {
    id: "left_thigh",
    label: { es: "Muslo izquierdo", en: "Left thigh" },
    percentages: {
      birth_to_1_year: 5.5,
      one_to_four_years: 6.5,
      five_to_nine_years: 8,
      ten_to_fourteen_years: 8.5,
      fifteen_years: 9
    }
  },
  {
    id: "right_lower_leg",
    label: { es: "Pierna derecha", en: "Right lower leg" },
    percentages: {
      birth_to_1_year: 5,
      one_to_four_years: 5,
      five_to_nine_years: 5.5,
      ten_to_fourteen_years: 6,
      fifteen_years: 6.5
    }
  },
  {
    id: "left_lower_leg",
    label: { es: "Pierna izquierda", en: "Left lower leg" },
    percentages: {
      birth_to_1_year: 5,
      one_to_four_years: 5,
      five_to_nine_years: 5.5,
      ten_to_fourteen_years: 6,
      fifteen_years: 6.5
    }
  },
  {
    id: "right_foot",
    label: { es: "Pie derecho", en: "Right foot" },
    percentages: {
      birth_to_1_year: 3.5,
      one_to_four_years: 3.5,
      five_to_nine_years: 3.5,
      ten_to_fourteen_years: 3.5,
      fifteen_years: 3.5
    }
  },
  {
    id: "left_foot",
    label: { es: "Pie izquierdo", en: "Left foot" },
    percentages: {
      birth_to_1_year: 3.5,
      one_to_four_years: 3.5,
      five_to_nine_years: 3.5,
      ten_to_fourteen_years: 3.5,
      fifteen_years: 3.5
    }
  }
] as const;

export const pediatricBurnTbsaAgeBandLabels: Record<
  PediatricBurnTbsaAgeBand,
  LocalizedText
> = {
  birth_to_1_year: { es: "Lactante / 0 anos", en: "Infant / 0 years" },
  one_to_four_years: { es: "1-4 anos", en: "1-4 years" },
  five_to_nine_years: { es: "5-9 anos", en: "5-9 years" },
  ten_to_fourteen_years: { es: "10-14 anos", en: "10-14 years" },
  fifteen_years: { es: "15 anos", en: "15 years" }
};

const ageBands = new Set(Object.keys(pediatricBurnTbsaAgeBandLabels));

const roundTbsa = (value: number): number => Math.round(value * 100) / 100;

const parseAgeBand = (value: unknown): PediatricBurnTbsaAgeBand | null =>
  typeof value === "string" && ageBands.has(value)
    ? (value as PediatricBurnTbsaAgeBand)
    : null;

const parseFraction = (value: unknown): number | null => {
  if (value === undefined || value === null || value === "") {
    return 0;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value >= 0 && value <= 1 ? value : null;
  }

  if (typeof value === "string") {
    const normalizedValue = value.replace("_", ".");
    const parsedValue = Number(normalizedValue);
    return Number.isFinite(parsedValue) && parsedValue >= 0 && parsedValue <= 1
      ? parsedValue
      : null;
  }

  return null;
};

export const calculatePediatricBurnTbsa = (
  input: CalculatorInput
): CalculationResult => {
  const ageBand = parseAgeBand(input.age_band);

  if (!ageBand) {
    return {
      toolId: "pediatric_burn_tbsa",
      warnings: [
        warning(
          "missing_age_band",
          "Selecciona una banda de edad para usar porcentajes regionales pediatricos.",
          "Select an age band to use pediatric regional percentages."
        )
      ],
      trace: [{ inputId: "age_band", value: input.age_band }]
    };
  }

  const contributions: PediatricBurnTbsaRegionContribution[] = [];
  const trace: CalculationResult["trace"] = [
    {
      inputId: "age_band",
      value: ageBand
    }
  ];

  for (const region of pediatricBurnTbsaRegions) {
    const inputId = `burn_fraction_${region.id}`;
    const fractionBurned = parseFraction(input[inputId]);

    if (fractionBurned === null) {
      return {
        toolId: "pediatric_burn_tbsa",
        warnings: [
          warning(
            "invalid_burn_fraction",
            "Cada fraccion regional debe estar entre 0 y 1.",
            "Each regional fraction must be between 0 and 1."
          )
        ],
        trace: [{ inputId, value: input[inputId] }]
      };
    }

    const regionalPercent = region.percentages[ageBand];
    const contribution = roundTbsa(regionalPercent * fractionBurned);

    if (contribution > 0) {
      contributions.push({
        region: region.id,
        regionalPercent,
        fractionBurned,
        contribution
      });
    }

    trace.push({
      inputId,
      value: fractionBurned,
      score: contribution
    });
  }

  const totalTbsa = roundTbsa(
    contributions.reduce((total, item) => total + item.contribution, 0)
  );

  if (totalTbsa > 100) {
    return {
      toolId: "pediatric_burn_tbsa",
      warnings: [
        warning(
          "tbsa_over_100",
          "El total TBSA no puede superar 100%. Revisa las regiones introducidas.",
          "Total TBSA cannot exceed 100%. Review entered regions."
        )
      ],
      trace
    };
  }

  return {
    toolId: "pediatric_burn_tbsa",
    value: totalTbsa,
    unit: "%",
    label: {
      es: `TBSA estimada · ${pediatricBurnTbsaAgeBandLabels[ageBand].es}`,
      en: `Estimated TBSA · ${pediatricBurnTbsaAgeBandLabels[ageBand].en}`
    },
    warnings: [
      warning(
        "burn_depth_scope",
        "Incluye solo quemaduras de espesor parcial y espesor total. No incluyas eritema ni quemaduras epidermicas superficiales.",
        "Include only partial-thickness and full-thickness burns. Do not include erythema or superficial epidermal burns."
      ),
      warning(
        "tbsa_descriptive_only",
        "Resultado descriptivo. Esta herramienta solo estima TBSA y no genera decisiones asistenciales.",
        "Descriptive result. This tool only estimates TBSA and does not generate care decisions."
      )
    ],
    trace
  };
};

export const pediatricBurnTbsaCalculator: CalculatorDefinition = {
  toolId: "pediatric_burn_tbsa",
  calculate: calculatePediatricBurnTbsa
};
