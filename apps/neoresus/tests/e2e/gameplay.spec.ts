import { expect, test, type Page } from "@playwright/test";
async function prepare(page: Page) {
  await page.clock.install();
  await page.goto("/neoresus/");
  await page.getByRole("button", { name: "Preparar la cuna" }).click();
}
async function action(page: Page, name: string, seconds: number) {
  await page.getByRole("button", { name, exact: false }).click();
  await page.clock.fastForward((seconds + 0.15) * 1000);
}
test("full clinical path with equipment, hidden observations and debrief", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await prepare(page);
  const items = page.locator(".equipment");
  for (let i = 0; i < 11; i++) {
    const item = items.nth(i);
    await item.getByRole("button", { name: "Revisar", exact: true }).click();
    await page.clock.fastForward(4100);
    const fix = item.getByRole("button", { name: "Corregir incidencia" });
    if (await fix.count()) {
      await fix.click();
      await page.clock.fastForward(6100);
    }
  }
  await page.getByRole("button", { name: "Comenzar nacimiento" }).click();
  await expect(page.getByTestId("hr")).toHaveText("—");
  await expect(page.getByTestId("chest")).toContainText("Sin valorar");
  await action(page, "Secar, posicionar y estimular", 30);
  await action(page, "Pinzar cordón", 2);
  await action(page, "Auscultar FC", 4);
  await action(page, "Iniciar VPPI", 3);
  await expect(page.getByTestId("chest")).toContainText("Sin valorar");
  await action(page, "Comprobar tórax", 3);
  await expect(page.getByTestId("chest")).toContainText("Ausente");
  await action(page, "Recolocar vía aérea y sellar", 6);
  await action(page, "Conectar ECG", 5);
  await action(page, "Colocar sensor preductal", 5);
  await page.clock.fastForward(35000);
  await expect(page.getByTestId("hr")).not.toHaveText("—");
  await expect(page.getByTestId("spo2")).not.toHaveText("—");
  await action(page, "Valorar respiración y tono", 4);
  await action(page, "Retirar VPPI", 2);
  await page.clock.fastForward(5100);
  await expect(
    page.getByRole("heading", { name: "Cada decisión cuenta." }),
  ).toBeVisible();
  await expect(
    page.getByText("Endpoint docente alcanzado", { exact: true }).first(),
  ).toBeVisible();
  expect(errors).toEqual([]);
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exportar registro" }).click();
  expect((await download).suggestedFilename()).toBe("neoresus-s1-debrief.json");
  await page.getByRole("button", { name: "Nuevo caso" }).click();
  await expect(
    page.getByRole("button", { name: "Preparar la cuna" }),
  ).toBeVisible();
});
test("manual finish remains available during action lock and does not leak observations", async ({
  page,
}) => {
  await prepare(page);
  await page.getByRole("button", { name: "Comenzar nacimiento" }).click();
  await page
    .getByRole("button", { name: "Secar, posicionar y estimular" })
    .click();
  await expect(
    page.getByRole("button", { name: "Iniciar VPPI" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Finalizar caso" }),
  ).toBeEnabled();
  await expect(page.getByTestId("hr")).toHaveText("—");
  await page.getByRole("button", { name: "Finalizar caso" }).click();
  await expect(
    page.getByText("Finalización manual", { exact: true }).first(),
  ).toBeVisible();
});
test("preflight and clinical timeout use real elapsed time", async ({
  page,
}) => {
  await prepare(page);
  await page.clock.fastForward(120200);
  await expect(
    page.getByRole("button", { name: "Finalizar caso" }),
  ).toBeVisible();
  await page.clock.fastForward(300000);
  await expect(
    page.getByText("Tiempo máximo alcanzado", { exact: true }).first(),
  ).toBeVisible();
});
test("fits viewport, has keyboard focus, and renders without runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/neoresus/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Ir al contenido" }),
  ).toBeFocused();
  for (const stage of ["briefing", "preflight", "simulation"]) {
    if (stage === "preflight")
      await page.getByRole("button", { name: "Preparar la cuna" }).click();
    if (stage === "simulation")
      await page.getByRole("button", { name: "Comenzar nacimiento" }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator("vite-error-overlay")).toHaveCount(0);
    await page.screenshot({
      path: `test-results/${test.info().project.name}-${stage}.png`,
      fullPage: true,
    });
  }
  expect(errors).toEqual([]);
});
