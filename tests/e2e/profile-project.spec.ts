import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("profile form publishes a candidate-owned summary, retains a separate draft and preserves CV", async ({
  page,
}) => {
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true }).click();
  await page.goto("/#/app/profil");
  await page.getByRole("button", { name: "Opisz projekt", exact: true }).click();
  await page.getByRole("button", { name: "Zapisz projekt w profilu", exact: true }).click();
  await expect(page.getByLabel("Nazwa projektu", { exact: true })).toBeFocused();
  await expect(page.getByLabel("Z jakim zadaniem w nowej roli łączysz ten przykład?")).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "Wczytaj fikcyjny przykład" }).click();
  await page.getByRole("button", { name: "Zapisz projekt w profilu", exact: true }).click();
  await expect(page.getByRole("article", { name: "Projekt w skrócie" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Mój projekt", exact: true })).toBeFocused();
  await page.getByRole("link", { name: "Zobacz profil oczami rekrutera" }).click();
  await expect(page.getByRole("heading", { name: "Najważniejszy projekt" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Pobierz CV (PDF)", exact: true })).toBeVisible();
  const position = await page.evaluate(() => ({
    project: document.querySelector(".profile-project")!.getBoundingClientRect().top,
    cv: document.querySelector(".profile-page > section:last-child")!.getBoundingClientRect().top,
  }));
  expect(position.project).toBeLessThan(position.cv);
  await page.locator(".profile-project-details summary").focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByText("Jaką decyzję podjęłaś lub podjąłeś i kto ją zatwierdził?", { exact: true }),
  ).toBeVisible();
  await page.goto("/#/app/profil");
  await page.getByRole("button", { name: "Edytuj projekt", exact: true }).click();
  await page.getByLabel("Nazwa projektu", { exact: true }).fill("Nieukończony nowy opis");
  await page.getByLabel("Co wykonałaś lub wykonałeś samodzielnie?", { exact: true }).fill("");
  await page.getByRole("button", { name: "Zapisz szkic i zamknij" }).click();
  await page.reload();
  await expect(page.getByLabel("Nazwa projektu", { exact: true })).toHaveValue(
    "Nieukończony nowy opis",
  );
  await page.goto("/#/app/profil/podglad");
  await expect(
    page.getByRole("heading", { name: "Kategoryzacja wiadomości w obsłudze", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Nieukończony nowy opis", { exact: true })).toHaveCount(0);
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: "Wejdź jako Marek Nowak", exact: true }).click();
  await page.goto("/#/app/profil/podglad");
  await expect(page.getByRole("heading", { name: "Nie dodano jeszcze projektu" })).toBeVisible();
});

for (const width of [1280, 850, 390, 320]) {
  test(`profile project form and summary reflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#/auth/sign-in");
    await page.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true }).click();
    await page.goto("/#/app/profil");
    await page.getByRole("button", { name: "Opisz projekt", exact: true }).click();
    await page.getByRole("button", { name: "Wczytaj fikcyjny przykład" }).click();
    const input = page.getByLabel("Co wykonałaś lub wykonałeś samodzielnie?", { exact: true });
    const box = await input.boundingBox();
    expect(box!.width).toBeGreaterThan(180);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `artifacts/profile-project-form-${width}.png`, fullPage: true });
    await page.getByRole("button", { name: "Zapisz projekt w profilu", exact: true }).click();
    await page.goto("/#/app/profil/podglad");
    await expect(page.getByRole("article", { name: "Projekt w skrócie" })).toBeVisible();
    const card = await page.getByRole("article", { name: "Projekt w skrócie" }).boundingBox();
    expect(card!.x + card!.width).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({
      path: `artifacts/profile-project-preview-${width}.png`,
      fullPage: true,
    });
    await page
      .getByRole("article", { name: "Projekt w skrócie" })
      .screenshot({ path: `artifacts/profile-project-card-${width}.png` });
    if (width === 390) expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}

for (const width of [1280, 390]) {
  test(`approved cobalt profile uses Courier, ink actions and decorative chamfers at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#/auth/sign-in");
    await page.getByRole("button", { name: "Wejdź jako Anna Kowalska", exact: true }).click();
    await page.goto("/#/app/profil");
    await page.getByRole("button", { name: "Opisz projekt", exact: true }).click();
    const save = page.getByRole("button", { name: "Zapisz projekt w profilu", exact: true });
    const action = await save.evaluate((el) => {
      const css = getComputedStyle(el);
      const layer = getComputedStyle(el, "::after");
      return {
        font: css.fontFamily,
        weight: css.fontWeight,
        color: css.color,
        radius: css.borderRadius,
        clip: css.clipPath,
        fill: layer.backgroundColor,
        contour: layer.clipPath,
      };
    });
    expect(action.font).toContain("Courier New");
    expect(action.weight).toBe("700");
    expect(action.color).toBe("rgb(255, 255, 255)");
    expect(action.fill).toBe("rgb(25, 28, 37)");
    expect(action.radius).toBe("0px");
    expect(action.clip).toBe("none");
    expect(action.contour).toContain("polygon");
    const boxedActions = await page
      .locator(
        '.profile-page :is([data-slot="button"]:not([data-variant="link"]), a[class*="inline-flex"])',
      )
      .evaluateAll((elements) =>
        elements.map((el) => ({
          label: el.textContent?.trim(),
          color: getComputedStyle(el).color,
          fill: getComputedStyle(el, "::after").backgroundColor,
          arrow: getComputedStyle(el, "::after").backgroundImage,
          font: getComputedStyle(el).fontFamily,
          weight: getComputedStyle(el).fontWeight,
        })),
      );
    expect(boxedActions.length).toBeGreaterThan(5);
    for (const action of boxedActions) {
      expect(action.color, action.label).toBe("rgb(255, 255, 255)");
      expect(action.fill, action.label).toBe("rgb(25, 28, 37)");
      expect(action.arrow, action.label).toContain("data:image/svg+xml");
      expect(action.font, action.label).toContain("Courier New");
      expect(action.weight, action.label).toBe("700");
    }
    await page.getByRole("button", { name: "Wczytaj fikcyjny przykład" }).hover();
    expect(
      await page
        .getByRole("button", { name: "Wczytaj fikcyjny przykład" })
        .evaluate((el) => getComputedStyle(el).color),
    ).toBe("rgb(255, 255, 255)");
    const input = page.getByLabel("Nazwa projektu", { exact: true });
    await input.focus();
    expect(
      await input.evaluate((el) => ({
        font: getComputedStyle(el).fontFamily,
        clip: getComputedStyle(el).clipPath,
        outline: getComputedStyle(el).outlineStyle,
      })),
    ).toEqual({ font: "Arial, sans-serif", clip: "none", outline: "solid" });
    await page.getByRole("button", { name: "Wczytaj fikcyjny przykład" }).click();
    await page
      .locator(".profile-project-actions")
      .screenshot({ path: `artifacts/profile-buttons-v3/actions-${width}.png` });
    await page
      .getByRole("button", { name: "Wczytaj fikcyjny przykład" })
      .screenshot({ path: `artifacts/profile-buttons-v3/example-${width}.png` });
    await page.screenshot({
      path: `artifacts/profile-buttons-v3/editor-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({
      path: `artifacts/profile-cobalt-v2/editor-${width}.png`,
      fullPage: true,
    });
    await save.click();
    await page.goto("/#/app/profil/podglad");
    const title = page.getByRole("heading", {
      name: "Kategoryzacja wiadomości w obsłudze",
      exact: true,
    });
    const heading = await title.evaluate((el) => ({
      font: getComputedStyle(el).fontFamily,
      weight: getComputedStyle(el).fontWeight,
      color: getComputedStyle(el).color,
      size: getComputedStyle(el).fontSize,
    }));
    expect(heading).toEqual({
      font: '"Courier New", monospace',
      weight: "700",
      color: "rgb(36, 73, 237)",
      size: "20px",
    });
    for (const selector of [".profile-candidate-name", ".profile-candidate-role"]) {
      expect(await page.locator(selector).evaluate((el) => getComputedStyle(el).color)).toBe(
        "rgb(36, 73, 237)",
      );
    }
    if (width === 1280) {
      const activeProfile = page.getByRole("link", { name: "Profil", exact: true });
      expect(
        await activeProfile.evaluate((el) => ({
          text: getComputedStyle(el).color,
          fill: getComputedStyle(el, "::after").backgroundColor,
        })),
      ).toEqual({ text: "rgb(255, 255, 255)", fill: "rgb(36, 73, 237)" });
    }
    const description = page.getByRole("button", { name: "Opis kandydata", exact: true });
    expect(
      await description.evaluate((el) => ({
        font: getComputedStyle(el).fontFamily,
        weight: getComputedStyle(el).fontWeight,
        color: getComputedStyle(el).color,
        fill: getComputedStyle(el, "::after").backgroundColor,
      })),
    ).toEqual({
      font: '"Courier New", monospace',
      weight: "700",
      color: "rgb(255, 255, 255)",
      fill: "rgb(25, 28, 37)",
    });
    await description.click();
    await expect(description).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByText("Jaką decyzję podjęłaś lub podjąłeś i kto ją zatwierdził?", { exact: true }),
    ).toBeVisible();
    await description.click();
    await expect(description).toHaveAttribute("aria-expanded", "false");
    await page.screenshot({
      path: `artifacts/profile-buttons-v3/profile-${width}.png`,
      fullPage: true,
    });
    const card = page.getByRole("article", { name: "Projekt w skrócie" });
    expect(
      await card.evaluate((el) => ({
        radius: getComputedStyle(el).borderRadius,
        clip: getComputedStyle(el).clipPath,
        layer: getComputedStyle(el, "::before").clipPath,
      })),
    ).toMatchObject({ radius: "0px", clip: "none" });
    await page.screenshot({
      path: `artifacts/profile-cobalt-v2/preview-${width}.png`,
      fullPage: true,
    });
    await card.screenshot({ path: `artifacts/profile-cobalt-v2/card-${width}.png` });
    await page.goto("/#/opis-projektu");
    expect(
      await page
        .getByRole("heading", { level: 1 })
        .evaluate((el) => getComputedStyle(el).fontFamily),
    ).toContain("Courier New");
    expect(
      await page
        .getByRole("button", { name: "Zapisz szkic", exact: true })
        .evaluate((el) => getComputedStyle(el).fontWeight),
    ).toBe("700");
  });
}
