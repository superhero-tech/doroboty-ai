import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("contribution workshop validates, previews, edits and restores an incomplete draft", async ({
  page,
}) => {
  await page.goto("/#/opis-projektu");
  await page.getByRole("button", { name: "Zobacz oczami rekrutera" }).click();
  await expect(page.getByLabel("Nazwa projektu", { exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Wczytaj fikcyjny przykład" }).click();
  await expect(page.getByLabel("Nazwa projektu", { exact: true })).toHaveValue(
    "Kategoryzacja wiadomości w obsłudze",
  );
  await page.getByLabel("Publiczny link do przykładu").fill("javascript:alert(1)");
  await page.getByRole("button", { name: "Zobacz oczami rekrutera" }).click();
  await expect(page.getByLabel("Publiczny link do przykładu")).toBeFocused();
  await page.getByLabel("Publiczny link do przykładu").fill("");
  await page.getByRole("button", { name: "Zobacz oczami rekrutera" }).click();
  await expect(
    page.getByRole("heading", { name: "Kategoryzacja wiadomości w obsłudze" }),
  ).toBeFocused();
  await expect(page.getByText("Nie programowałam integracji", { exact: false })).toBeVisible();
  await page.screenshot({ path: "artifacts/project-contribution-preview.png", fullPage: true });
  await page
    .locator(".contribution-reading")
    .nth(1)
    .screenshot({ path: "artifacts/project-contribution-responsibilities.png" });
  await expect(page.getByText("Nie udostępniono dodatkowego materiału.")).toHaveCount(0);
  await page.getByRole("button", { name: "Popraw opis wkładu" }).click();
  await expect(page.getByLabel("Co wykonałaś lub wykonałeś samodzielnie?")).toBeFocused();
  await page.getByLabel("Nazwa projektu", { exact: true }).fill("Mój szkic");
  await page.getByLabel("Jaki problem rozwiązywał projekt?").fill("");
  await page.getByRole("button", { name: "Zapisz szkic" }).click();
  await page.reload();
  await expect(page.getByLabel("Nazwa projektu", { exact: true })).toHaveValue("Mój szkic");
  await expect(page.getByLabel("Jaki problem rozwiązywał projekt?")).toHaveValue("");
  await page.getByRole("button", { name: "Wczytaj fikcyjny przykład" }).click();
  await page.getByRole("button", { name: "Zachowaj mój opis" }).click();
  await expect(page.getByLabel("Nazwa projektu", { exact: true })).toHaveValue("Mój szkic");
});

test("storage errors are visible without discarding the current input", async ({ page }) => {
  await page.addInitScript(() => {
    const setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "doroboty-project-workshop-v1") throw new Error("Quota exceeded");
      return setItem.call(this, key, value);
    };
  });
  await page.goto("/#/opis-projektu");
  await page.getByLabel("Nazwa projektu", { exact: true }).fill("Szkic do zachowania");
  await page.getByRole("button", { name: "Zapisz szkic" }).click();
  await expect(page.getByRole("status")).toContainText("Nie udało się zapisać szkicu");
  await expect(page.getByLabel("Nazwa projektu", { exact: true })).toHaveValue(
    "Szkic do zachowania",
  );
});

for (const width of [1280, 850, 600, 390, 320]) {
  test(`workshop remains readable and labelled at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#/opis-projektu");
    await expect(page.getByLabel("Nazwa projektu", { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const field = page.getByLabel("Co wykonałaś lub wykonałeś samodzielnie?");
    const box = await field.boundingBox();
    expect(box!.width).toBeGreaterThan(200);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    if (width === 1280 || width === 390) {
      await page.screenshot({
        path: `artifacts/project-contribution-${width}.png`,
        fullPage: true,
      });
    }
    if (width === 390) expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}
