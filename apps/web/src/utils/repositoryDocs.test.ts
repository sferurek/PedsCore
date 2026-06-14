import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("public launch repository documentation", () => {
  it("keeps README launch facts and safe wording", () => {
    const readme = read("README.md");

    expect(readme).toContain("https://peds-core.vercel.app/");
    expect(readme).toContain("19 fully implemented");
    expect(readme).toContain("1 partially implemented module: WHO Growth");
    expect(readme).toContain("No clinical data storage");
    expect(readme).toContain("WHO growth data are kept under separate WHO licensing");
    expect(readme.toLowerCase()).not.toContain("certified");
    expect(readme.toLowerCase()).not.toContain("validated medical device");
  });

  it("keeps Spanish README aligned with public alpha scope", () => {
    const readme = read("README.es.md");

    expect(readme).toContain("80 herramientas pediátricas y neonatales catalogadas");
    expect(readme).toContain("19 herramientas completamente implementadas");
    expect(readme).toContain("1 módulo parcialmente implementado: WHO Growth");
    expect(readme).toContain("Sin almacenamiento de datos clínicos");
    expect(readme).toContain("licencia OMS separada");
  });

  it("has public contribution and security files", () => {
    expect(existsSync(join(root, "CONTRIBUTING.md"))).toBe(true);
    expect(existsSync(join(root, "SECURITY.md"))).toBe(true);
    expect(existsSync(join(root, "CODE_OF_CONDUCT.md"))).toBe(true);
    expect(existsSync(join(root, "docs/PUBLIC_LAUNCH_CHECKLIST.md"))).toBe(true);

    expect(read("CONTRIBUTING.md")).toContain("Implementation Gates");
    expect(read("SECURITY.md")).toContain("no clinical backend");
    expect(read("SECURITY.md")).not.toContain("security@");
    expect(read("SECURITY.md")).not.toContain(".example");
  });

  it("has launch-ready GitHub templates", () => {
    const templates = [
      ".github/ISSUE_TEMPLATE/bug_report.yml",
      ".github/ISSUE_TEMPLATE/clinical_tool_request.yml",
      ".github/ISSUE_TEMPLATE/evidence_update.yml",
      ".github/ISSUE_TEMPLATE/calculation_review.yml",
      ".github/ISSUE_TEMPLATE/ux_feedback.yml"
    ];

    for (const template of templates) {
      expect(existsSync(join(root, template))).toBe(true);
      expect(read(template)).toContain(
        "Do not include patient-identifiable information or real clinical cases."
      );
    }

    expect(existsSync(join(root, ".github/pull_request_template.md"))).toBe(true);
    expect(read(".github/pull_request_template.md")).toContain(
      "No patient-identifiable data"
    );
  });
});
