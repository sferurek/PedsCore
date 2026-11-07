import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { getToolBySlug } from "@peds-core/core";
import { DynamicForm } from "./DynamicForm";

describe("calculator accordion semantics", () => {
  it.each(["es", "en"] as const)("associates the open question and omits closed panel references in %s", (language) => {
    const tool = getToolBySlug("bedside-schwartz")!;
    const html = renderToStaticMarkup(<DynamicForm language={language} tool={tool} onStateChange={() => {}} />);
    const first = tool.inputs!.find((input) => input.required)!;
    expect(html).toContain(`aria-controls="content-${first.id}"`);
    expect(html).toContain(`id="content-${first.id}"`);
    expect(html).toContain(`id="trigger-${first.id}"`);
    expect(html).not.toContain('aria-invalid="true"');
    const referenced = [...html.matchAll(/aria-controls="([^"]+)"/g)].map((item) => item[1]);
    for (const id of referenced) expect(html).toContain(`id="${id}"`);
  });
});
