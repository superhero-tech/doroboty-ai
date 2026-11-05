import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("candidate completes a task, resumes it and attaches an immutable copy", async ({ page }) => {
  await page.goto("/#/oferty/ai-operations-specialist");
  await page.getByRole("link", { name: "Aplikuj", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Pokaż, jak pracujesz z AI", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Rozpocznij zadanie", exact: true }).click();
  await page.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true }).click();
  await expect(page).toHaveURL(/\/zadanie$/);
  await page.getByRole("button", { name: "Pokaż propozycję AI" }).click();
  await expect(page.getByRole("alert")).toContainText("10 znaków");
  await page
    .getByLabel("Twoje polecenie dla AI")
    .fill("Podziel wiadomości na płatności, dostęp i pozostałe. Sprawdź treść każdej wiadomości.");
  await page.getByRole("button", { name: "Pokaż propozycję AI" }).click();
  await page.getByLabel("Twoja kategoria dla M2", { exact: true }).click();
  await page.getByRole("option", { name: "Dostęp do konta", exact: true }).click();
  await page.getByLabel("Twoja kategoria dla M3", { exact: true }).click();
  await page.getByRole("option", { name: "Pozostałe / do wyjaśnienia", exact: true }).click();
  await page
    .getByLabel("Jak sprawdziłeś wynik i co zmieniłeś?")
    .fill(
      "W M2 problem dotyczy logowania, a nie płatności. W M3 klient pyta o zestawienie, nie zgłasza problemu z opłatą.",
    );
  await page.reload();
  await expect(page.getByLabel("Jak sprawdziłeś wynik i co zmieniłeś?")).toHaveValue(
    /W M2 problem/,
  );
  await page.getByRole("button", { name: "Oddaj zadanie i zobacz podsumowanie" }).click();
  await expect(page.getByRole("heading", { name: "Sprawdź swoją pracę" })).toBeVisible();
  await expect(page.getByText("Dostęp do konta", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Wróć do aplikacji", exact: true }).click();
  await page
    .getByLabel("Dlaczego pasujesz do tej roli?")
    .fill("Mam doświadczenie w porządkowaniu zgłoszeń i weryfikowaniu odpowiedzi AI.");
  await page.getByRole("link", { name: "Zobacz podsumowanie zadania", exact: true }).click();
  await page.getByRole("link", { name: "Wróć do aplikacji", exact: true }).click();
  await expect(page.getByLabel("Dlaczego pasujesz do tej roli?")).toHaveValue(/Mam doświadczenie/);
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Wyślij aplikację", exact: true }).click();
  await page.getByRole("link", { name: "AI Operations Specialist", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Twoje zadanie z AI", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByText("Dostęp do konta", { exact: true })).toBeVisible();
});

test("preparation is reachable from employer role and fits narrow screens", async ({ page }) => {
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: "Wejdź jako Karolina Wiśniewska", exact: true }).click();
  await page.goto("/#/oferty/ai-operations-specialist");
  await page.getByRole("link", { name: "Aplikuj", exact: true }).click();
  for (const width of [1280, 851, 850, 701, 700, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole("link", { name: "Rozpocznij zadanie", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("link", { name: "Rozpocznij zadanie", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Wybierz osobę" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Wejdź jako Karolina/ })).toHaveCount(0);
});
