import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { ClinicalReviewDashboard } from "./ClinicalReviewDashboard";

describe("ClinicalReviewDashboard", () => {
  it("renders technical and independent review as separate states", () => {
    const html = renderToString(<ClinicalReviewDashboard language="en" />);

    expect(html).toContain("Public clinical review dashboard");
    expect(html).toContain("Tier A technical audit");
    expect(html).toContain("Independent review");
    expect(html).toContain("Phoenix");
    expect(html).toContain("Pending");
  });

  it("renders Spanish governance copy", () => {
    const html = renderToString(<ClinicalReviewDashboard language="es" />);

    expect(html).toContain("Panel público de revisión clínica");
    expect(html).toContain("Auditoría técnica Tier A");
    expect(html).toContain("Revisión independiente");
  });
});
