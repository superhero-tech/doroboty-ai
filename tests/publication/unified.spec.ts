import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

test("published artifact has the accepted landing, portal and populated profile without external runtime requests", async ({
  page,
}) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["http:", "https:"].includes(url.protocol) && url.origin !== "http://127.0.0.1:3016")
      external.push(url.href);
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("TWOJE SKILLE.");
  await expect(page.locator("#job-list .summary-card")).toHaveCount(9);
  await page.locator("#hero-query").fill("Python");
  await page
    .locator("#hero-search")
    .getByRole("button", { name: /Znajdź rolę/ })
    .click();
  await expect(page).toHaveURL(/portal\/wyniki.html\?q=Python/);
  await page.getByRole("link", { name: "Senior Machine Learning Engineer", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Senior Machine Learning Engineer",
  );
  await page.getByRole("link", { name: "Mój profil", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Mój projekt", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Zobacz profil oczami rekrutera" }).click();
  await expect(page.getByText("Anna Kowalska", { exact: true }).last()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Kategoryzacja wiadomości w obsłudze", exact: true }),
  ).toBeVisible();
  const description = page.getByRole("button", { name: "Opis kandydata", exact: true });
  await description.click();
  await expect(description).toHaveAttribute("aria-expanded", "true");
  const cv = await page
    .getByRole("link", { name: "Pobierz CV (PDF)", exact: true })
    .getAttribute("href");
  const response = await page.request.get(new URL(cv!, page.url()).href);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Kategoryzacja wiadomości w obsłudze", exact: true }),
  ).toBeVisible();
  await page.locator(".sidebar a.brand").click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("TWOJE SKILLE.");
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test("landing and portal use the same saved offers", async ({ page }) => {
  await page.goto("/");
  const save = page.getByRole("button", {
    name: "Zapisz ofertę: Senior Machine Learning Engineer",
    exact: true,
  });
  await save.click();
  await expect(
    page.getByRole("button", {
      name: "Usuń z zapisanych: Senior Machine Learning Engineer",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("link", { name: "Portal ofert", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Nawigacja główna", exact: true })
    .getByRole("link", { name: /^Zapisane/ })
    .click();
  await expect(
    page.getByRole("link", { name: "Senior Machine Learning Engineer", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: "Usuń z zapisanych: Senior Machine Learning Engineer",
      exact: true,
    })
    .click();
  await page.goto("/");
  await expect(save).toHaveAttribute("aria-pressed", "false");
});

for (const width of [1280, 390, 320]) {
  test(`unified pages preserve approved design and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const [name, url] of [
      ["landing", "/"],
      ["portal", "/portal/wyniki.html"],
      ["profile", "/profil/#/app/profil/podglad"],
      ["form", "/profil/#/opis-projektu"],
    ]) {
      await page.goto(url);
      if (name === "landing" && width === 1280) {
        const geometry = await page
          .locator("#job-list .summary-card")
          .first()
          .evaluate((card) => {
            const box = (selector: string) => card.querySelector(selector)!.getBoundingClientRect();
            const meta = box(".dr-job-meta"),
              pay = box(".summary-pay"),
              tags = box(".dr-job-tags"),
              action = box(".summary-action"),
              title = box(".dr-job-title");
            return {
              width: card.getBoundingClientRect().width,
              titleAbove: title.bottom <= meta.top,
              conditionRow: meta.bottom > pay.top && pay.bottom > meta.top,
              actionRow: tags.bottom > action.top && action.bottom > tags.top,
            };
          });
        expect(geometry.width).toBeLessThanOrEqual(880);
        expect(geometry.titleAbove).toBe(true);
        expect(geometry.conditionRow).toBe(true);
        expect(geometry.actionRow).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      await page.screenshot({ path: `artifacts/unified-${name}-${width}.png`, fullPage: true });
    }
    await page.goto("/profil/#/app/profil/podglad");
    const styles = await page
      .getByRole("button", { name: "Opis kandydata", exact: true })
      .evaluate((element) => {
        const s = getComputedStyle(element);
        return { font: s.fontFamily, weight: s.fontWeight, color: s.color };
      });
    expect(styles.font).toContain("Courier New");
    expect(styles.weight).toBe("700");
    expect(styles.color).toBe("rgb(255, 255, 255)");
  });
}

test("publication manifest matches files and excludes source, research and instructor materials", async ({
  request,
}) => {
  const manifest = await (await request.get("/release.json")).json();
  const names = Object.keys(manifest.files);
  expect(names).toContain("index.html");
  expect(names).toContain("portal/oferta.html");
  expect(names).toContain("profil/index.html");
  expect(names.some((name) => /(^|\/)(src|docs|qa|\.git|node_modules)\//.test(name))).toBe(false);
  for (const file of names) {
    const bytes = await readFile(`publish/${file}`);
    expect(createHash("sha256").update(bytes).digest("hex"), file).toBe(manifest.files[file]);
  }
});
