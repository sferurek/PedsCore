import { getAllTools, getToolBySlug } from "@peds-core/core";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Footer } from "../components/Footer";
import { OssSupportBanner } from "../components/OssSupportBanner";
import { getSeoForRoute } from "../utils/seo";
import { parseRoute } from "../utils/routes";
import { EvidencePage } from "./EvidencePage";
import { HomePage } from "./HomePage";
import { ToolsPage } from "./ToolsPage";

const noopNavigate = () => undefined;

describe("public product web polish", () => {
  it("renders Home with current catalog counters", () => {
    const html = renderToString(
      <HomePage language="en" navigate={noopNavigate} />
    );

    expect(html).toContain("Open-source pediatric and neonatal clinical tools");
    expect(html).toContain(">79<");
    expect(html).toContain(">18<");
    expect(html).toContain(">1<");
    expect(html).toContain(">0<");
    expect(html).toContain("No clinical data storage");
    expect(html).not.toContain("Support the project on GitHub");
    expect(html).not.toContain("Available now");
    expect(html).toContain("WHO Growth");
    expect(html).toContain("Open module");
    expect(html).toContain("Transparent by design");
    expect(html).toContain("Westley Croup");
    expect(html).toContain("PRAM");
    expect(html).toContain("Wood-Downes-Ferres");
    expect(html).toContain("Apgar");
    expect(html).toContain("Silverman-Andersen");
    expect(html).toContain("STRONGkids");
    expect(html).toContain("BMI-for-age");
  });

  it("renders ToolsPage with the partially implemented status filter", () => {
    const html = renderToString(
      <ToolsPage language="en" navigate={noopNavigate} />
    );

    expect(html).toContain("Partially implemented");
    expect(html).toContain("WHO Growth");
  });

  it("renders EvidencePage with partial implementation language", () => {
    const html = renderToString(<EvidencePage language="en" />);

    expect(html).toContain("Partially implemented");
    expect(html).toContain("not implementing doubtful content");
  });

  it("renders Footer with GitHub, disclaimer, license and privacy notes", () => {
    const html = renderToString(
      <Footer language="en" navigate={noopNavigate} />
    );

    expect(html).toContain("GitHub");
    expect(html).toContain("Disclaimer");
    expect(html).toContain("MIT code license");
    expect(html).toContain("WHO data under separate license");
    expect(html).toContain("No clinical data storage");
    expect(html).toContain("View source");
  });

  it("renders compact OSS support links for internal pages", () => {
    const html = renderToString(<OssSupportBanner language="en" />);

    expect(html).toContain("Star on GitHub");
    expect(html).toContain("Feedback / Issues");
    expect(html).toContain("View source");
  });

  it("uses specific SEO for WHO Growth", () => {
    const seo = getSeoForRoute(parseRoute("/en/tools/who-growth"), "en");

    expect(seo.description).toBe(
      "WHO Growth module with official WHO growth data, printable SVG charts, written percentiles and patient point."
    );
  });

  it("keeps catalog implementation counts and partial WHO Growth ID", () => {
    const tools = getAllTools();

    expect(tools).toHaveLength(79);
    expect(
      tools.filter((tool) => tool.implementationStatus === "implemented")
    ).toHaveLength(18);
    expect(
      tools.filter((tool) => tool.implementationStatus === "partially_implemented")
    ).toHaveLength(1);
    expect(getToolBySlug("who-growth")?.id).toBe("who_growth_module");
    expect(getToolBySlug("who-growth")?.implementationStatus).toBe(
      "partially_implemented"
    );
  });
});
