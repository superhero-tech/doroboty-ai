import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { STORAGE_KEY } from "../../src/features/prototype/storage";

test("company facts are accessible and saved offers survive reload on mobile", async ({ page }) => {
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true }).click();
  await page.goto("/#/firmy/northstar-health");
  await expect(page.getByRole("heading", { name: "Northstar Health", exact: true })).toBeVisible();
  const save = page.getByRole("button", { name: /^Zapisz ofertę:/ }).first();
  await save.focus();
  await page.keyboard.press("Enter");
  await expect(save).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(save).toHaveAttribute("aria-pressed", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.setViewportSize({ width: 375, height: 812 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "artifacts/readiness-company-mobile.png", fullPage: true });
});

test("a stale tab cannot overwrite the scenario saved in another tab", async ({
  page,
  context,
}) => {
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true }).click();
  await page.goto("/#/app/profil");
  const other = await context.newPage();
  await other.goto("/#/app/profil");
  await page.getByLabel("Imię i nazwisko").fill("Anna — pierwsza karta");
  await page.getByRole("button", { name: "Zapisz profil", exact: true }).click();
  const before = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  await other.getByLabel("Imię i nazwisko").fill("Anna — druga karta");
  await other.getByRole("button", { name: "Zapisz profil", exact: true }).click();
  await expect(
    other.getByRole("status").filter({ hasText: "Scenariusz zmienił się" }),
  ).toContainText("Nie nadpisano danych");
  expect(await other.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).toBe(before);
  await other.reload();
  await expect(other.getByLabel("Imię i nazwisko")).toHaveValue("Anna — pierwsza karta");
});

test("an exported profile project can be restored in an isolated browser", async ({
  page,
  browser,
}) => {
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true }).click();
  await page.goto("/#/app/profil");
  await page.getByRole("button", { name: "Opisz projekt", exact: true }).click();
  await page.getByRole("button", { name: "Wczytaj fikcyjny przykład" }).click();
  await page.getByRole("button", { name: "Zapisz projekt w profilu", exact: true }).click();
  await page.goto("/#/app/settings");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Eksportuj dane", exact: true }).click();
  const file = await pending;
  const bytes = await readFile((await file.path())!);
  const isolated = await browser.newContext();
  try {
    const restored = await isolated.newPage();
    await restored.goto("http://127.0.0.1:3106/#/auth/sign-in");
    await restored.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true }).click();
    await restored.goto("http://127.0.0.1:3106/#/app/settings");
    await restored
      .getByLabel("Importuj plik scenariusza")
      .setInputFiles({ name: "backup.json", mimeType: "application/json", buffer: bytes });
    await restored.getByRole("button", { name: "Importuj", exact: true }).click();
    await restored.goto("http://127.0.0.1:3106/#/app/profil/podglad");
    await expect(
      restored.getByRole("heading", { name: "Kategoryzacja wiadomości w obsłudze", exact: true }),
    ).toBeVisible();
    expect(
      JSON.parse((await restored.evaluate((key) => localStorage.getItem(key), STORAGE_KEY))!),
    ).toEqual(JSON.parse(bytes.toString()));
  } finally {
    await isolated.close();
  }
});
