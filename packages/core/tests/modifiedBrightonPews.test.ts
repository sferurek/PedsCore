import { describe, expect, it } from "vitest";
import { modifiedBrightonPewsCalculator } from "../src/index";

const normal = {
  respiratory_domain: "resp_0",
  circulation_domain: "circ_0",
  disability_domain: "dis_0",
  continuous_inhalation_or_cpap: "no",
  persistent_postoperative_vomiting: "no"
};

describe("Modified Brighton PEWS", () => {
  it("scores a normal assessment as zero", () => {
    const result = modifiedBrightonPewsCalculator.calculate(normal);
    expect(result.score).toBe(0);
    expect(result.maxScore).toBe(13);
    expect(result.classification?.en).toContain("0-2");
  });

  it("scores each main domain from 0 to 3", () => {
    const result = modifiedBrightonPewsCalculator.calculate({
      ...normal,
      respiratory_domain: "resp_3",
      circulation_domain: "circ_2",
      disability_domain: "dis_1"
    });

    expect(result.score).toBe(6);
    expect(result.trace.slice(0, 3).map((item) => item.score)).toEqual([3, 2, 1]);
  });

  it("adds two points for continuous inhalation or CPAP and two for persistent postoperative vomiting", () => {
    const result = modifiedBrightonPewsCalculator.calculate({
      ...normal,
      continuous_inhalation_or_cpap: "yes",
      persistent_postoperative_vomiting: "yes"
    });

    expect(result.score).toBe(4);
  });

  it("allows the theoretical maximum of 13", () => {
    const result = modifiedBrightonPewsCalculator.calculate({
      respiratory_domain: "resp_3",
      circulation_domain: "circ_3",
      disability_domain: "dis_3",
      continuous_inhalation_or_cpap: "yes",
      persistent_postoperative_vomiting: "yes"
    });

    expect(result.score).toBe(13);
  });

  it("uses the study threshold descriptively without an escalation recommendation", () => {
    const result = modifiedBrightonPewsCalculator.calculate({
      ...normal,
      respiratory_domain: "resp_3"
    });

    expect(result.classification?.en).toContain("≥3");
    const text = [
      result.label?.es,
      result.label?.en,
      result.classification?.es,
      result.classification?.en,
      ...result.warnings.flatMap((item) => [item.message.es, item.message.en])
    ].join(" ");

    expect(text).not.toMatch(/UCI|ICU|ingreso|admission|traslado|transfer|avisar|call|review|tratamiento|treatment/i);
  });
});
