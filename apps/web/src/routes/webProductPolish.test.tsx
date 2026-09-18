import { getAllTools, getToolBySlug } from "@peds-core/core";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Footer, FooterUsageSummaryContent } from "../components/Footer";
import { OssSupportBanner } from "../components/OssSupportBanner";
import { getSeoForRoute } from "../utils/seo";
import { parseRoute } from "../utils/routes";
import { getClinicalSurfaceStats } from "../utils/toolStats";
import { EvidencePage } from "./EvidencePage";
import { GlobalStatsPage } from "./GlobalStatsPage";
import { HomePage } from "./HomePage";
import { ToolPage } from "./ToolPage";
import { ToolsPage } from "./ToolsPage";

const noopNavigate = () => undefined;

describe("public product web polish", () => {
  it("renders Home with current catalog counters", () => {
    const html = renderToString(
      <HomePage language="en" navigate={noopNavigate} />
    );

    expect(html).toContain("Clarity for today.");
    expect(html).toContain("Better care tomorrow.");
    const stats = getClinicalSurfaceStats(getAllTools());
    expect(html).toContain(`>${stats.catalogued}<`);
    expect(html).toContain(`>${stats.available}<`);
    expect(html).toContain(`>${stats.localCalculations}<`);
    expect(html).toContain(">0<");
    expect(html).toContain("No clinical data storage");
    expect(html).not.toContain("Support the project on GitHub");
    expect(html).not.toContain("Available now");
    expect(html).toContain("WHO Growth");
    expect(html).toContain("Open module");
    expect(html).toContain("Transparency, end to end");
    expect(html).toContain("Westley Croup");
    expect(html).toContain("PRAM");
    expect(html).toContain("Wood-Downes-Ferres");
    expect(html).toContain("Apgar");
    expect(html).toContain("Silverman-Andersen");
    expect(html).toContain("STRONGkids");
    expect(html).toContain("BMI-for-age");
  });

  it("renders ToolsPage with clinical availability filters", () => {
    const html = renderToString(
      <ToolsPage language="en" navigate={noopNavigate} />
    );

    expect(html).toContain("Available");
    expect(html).toContain("Limited access");
    expect(html).toContain("WHO Growth");
  });

  it("renders EvidencePage with partial implementation language", () => {
    const html = renderToString(<EvidencePage language="en" />);

    expect(html).toContain("Partially implemented");
    expect(html).toContain("leaving something inactive until it is clear enough");
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

  it("renders footer usage summary when public stats are configured", () => {
    const html = renderToString(
      <FooterUsageSummaryContent
        language="en"
        stats={{
          status: "ok",
          configured: true,
          disabled: false,
          provider: "vercel",
          metric: "visitors",
          totalsRange: "since_analytics_enabled",
          countriesRange: null,
          minimumThreshold: 5,
          totals: {
            visitors: 1234,
            pageviews: 2345,
            countriesReached: 4,
            last7DaysVisitors: 56
          },
          countries: []
        }}
      />
    );

    expect(html).toContain(
      "PedsCore has received 56 visitors this week and 1,234 since analytics was enabled."
    );
    expect(html).toContain("View global stats");
    expect(html).toContain("/en/stats/global");
  });

  it("hides footer usage summary when public stats are not configured", () => {
    const html = renderToString(
      <FooterUsageSummaryContent
        language="en"
        stats={{
          status: "not_configured",
          configured: false,
          disabled: false,
          metric: "visitors",
          totalsRange: "since_analytics_enabled",
          countriesRange: null,
          minimumThreshold: 5,
          totals: {
            visitors: 0,
            pageviews: 0,
            countriesReached: 0,
            last7DaysVisitors: 0
          },
          countries: []
        }}
      />
    );

    expect(html).toBe("");
  });

  it("uses visitors wording and renders with no visible countries", () => {
    const html = renderToString(
      <FooterUsageSummaryContent
        language="es"
        stats={{
          status: "ok",
          configured: true,
          disabled: false,
          provider: "vercel",
          metric: "visitors",
          totalsRange: "since_analytics_enabled",
          countriesRange: {
            kind: "reporting_window",
            since: "2026-08-12",
            until: "2026-09-11"
          },
          minimumThreshold: 5,
          totals: {
            visitors: 10,
            pageviews: 20,
            countriesReached: 1,
            last7DaysVisitors: 2
          },
          countries: []
        }}
      />
    );

    expect(html).toContain("visitantes");
    expect(html.toLowerCase()).not.toContain("people");
    expect(html.toLowerCase()).not.toContain("users");
    expect(html.toLowerCase()).not.toContain("personas");
    expect(html.toLowerCase()).not.toContain("usuarios");
  });

  it("renders semantically correct visitor labels in Global Stats for ES and EN", () => {
    const spanishHtml = renderToString(<GlobalStatsPage language="es" />);
    const englishHtml = renderToString(<GlobalStatsPage language="en" />);

    expect(spanishHtml).toContain("Visitantes desde la activación de la analítica");
    expect(spanishHtml).toContain("Visitantes en los últimos 7 días");
    expect(englishHtml).toContain("Visitors since analytics was enabled");
    expect(englishHtml).toContain("Visitors in the last 7 days");
    expect(`${spanishHtml}${englishHtml}`.toLowerCase()).not.toContain(
      "total visits"
    );
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

  it("keeps catalog implementation counts and partial WHO Growth preset IDs", () => {
    const tools = getAllTools();

    expect(tools).toHaveLength(135);
    expect(
      tools.filter((tool) => tool.implementationStatus === "implemented")
    ).toHaveLength(30);
    expect(
      tools.filter((tool) => tool.implementationStatus === "partially_implemented")
    ).toHaveLength(4);
    expect(getToolBySlug("who-growth")?.id).toBe("who_growth_module");
    expect(getToolBySlug("who-growth")?.implementationStatus).toBe(
      "partially_implemented"
    );
    expect(getToolBySlug("bmi-percentile")?.implementationStatus).toBe(
      "partially_implemented"
    );
    expect(getToolBySlug("head-circumference-percentile")?.implementationStatus).toBe(
      "partially_implemented"
    );
    expect(getToolBySlug("pediatric-burn-tbsa")?.implementationStatus).toBe(
      "implemented"
    );
  });

  it("renders WHO Growth as an active partial module", () => {
    const whoGrowth = getToolBySlug("who-growth");

    expect(whoGrowth).toBeDefined();

    const html = renderToString(
      <ToolPage
        language="en"
        navigate={noopNavigate}
        tool={whoGrowth!}
      />
    );

    expect(html).toContain("Active partial module");
    expect(html).toContain("WHO growth data");
    expect(html).not.toContain("Tool not active yet");
    expect(html).not.toContain("Automatic calculation is not active");
  });

  it("renders BMI and head circumference as WHO Growth presets", () => {
    const bmiTool = getToolBySlug("bmi-percentile");
    const headCircumferenceTool = getToolBySlug("head-circumference-percentile");

    expect(bmiTool).toBeDefined();
    expect(headCircumferenceTool).toBeDefined();

    const bmiHtml = renderToString(
      <ToolPage language="en" navigate={noopNavigate} tool={bmiTool!} />
    );
    const headCircumferenceHtml = renderToString(
      <ToolPage
        language="en"
        navigate={noopNavigate}
        tool={headCircumferenceTool!}
      />
    );

    expect(bmiHtml).toContain("WHO growth data");
    expect(bmiHtml).toContain("BMI");
    expect(headCircumferenceHtml).toContain("WHO growth data");
    expect(headCircumferenceHtml).toContain("Head circumference");
  });
});
