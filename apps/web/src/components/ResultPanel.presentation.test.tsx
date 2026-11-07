import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { getToolBySlug } from "@peds-core/core";
import { ResultPanel } from "./ResultPanel";
import { formatClinicalResultForClipboard } from "../utils/resultCopy";

const values = {
  age_months: 60, gcs: 15, both_pupils_fixed: false, lactate_mmol_l: 1,
  map_mmhg: 80, creatinine_umol_l: 50, pao2_mmhg: 100, fio2_fraction: 0.21,
  paco2_mmhg: 40, invasive_ventilation: false, wbc_10e9_l: 5, platelets_10e9_l: 200
};

describe("clinical result presentation", () => {
  it.each(["es", "en"] as const)("separates score and model probability in %s", (language) => {
    const tool = getToolBySlug("pelod-2")!;
    const html = renderToStaticMarkup(<ResultPanel language={language} tool={tool} values={values} />);
    expect(html).toContain('class="result-primary-value">0</strong>');
    expect(html).toContain('class="result-secondary-value"');
    expect(html).toContain('0.13 %');
    expect(html).not.toContain('>0 %</strong>');
    expect(html).toContain(language === "es" ? "modelo pronóstico poblacional" : "population-level PICU prognostic model");
  });

  it.each(["es", "en"] as const)("keeps a long clinical unit visible without enlarging it as the numeric value in %s", (language) => {
    const tool = getToolBySlug("bedside-schwartz")!;
    const html = renderToStaticMarkup(<ResultPanel language={language} tool={tool}
      values={{ height_cm: 150, serum_creatinine: 0.8, creatinine_unit: "mg_dl" }} />);
    expect(html).toContain('class="result-primary-value">77.4</strong>');
    expect(html).toContain('class="result-primary-unit">mL/min/1.73 m2</span>');
    expect(html).not.toContain('class="result-primary-value">77.4 mL/');
  });

  it.each(["es", "en"] as const)("copies both outputs without input values in %s", (language) => {
    const tool = getToolBySlug("pelod-2")!;
    const text = formatClinicalResultForClipboard(language, tool, {
      toolId: tool.id, score: 0, value: 0.13, unit: "%", maxScore: 33,
      label: { es: "Mortalidad estimada", en: "Estimated mortality" }, warnings: [], trace: []
    });
    expect(text).toContain(language === "es" ? "Puntuación: 0 / 33" : "Score: 0 / 33");
    expect(text).toContain(language === "es" ? "Mortalidad estimada: 0.13 %" : "Estimated mortality: 0.13 %");
    expect(text).toContain(`https://pedscore.app/${language}/tools/pelod-2`);
    expect(text).not.toContain("age_months");
  });
});
