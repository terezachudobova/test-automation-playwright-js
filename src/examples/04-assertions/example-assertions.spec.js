// TODO

import { expect, test } from "@playwright/test";
import { password, username } from "../../fixtures/fixtures";

test.describe("Assertion Examples", () => {

  test.beforeEach(async ({page}) => {
    await page.goto('/');
  });

  test("visibility, attached in DOM, toHaveValue, ", async ({ page }) => {
    //visibility vs. tobeAttached
    await expect(page.getByText("Více informací")).toBeVisible();
    await page.getByText("Více informací").click();
    await expect(page.getByText("Více informací")).not.toBeAttached();

    // fill in value and check it is filled
    await page.getByText("Pro učitelé").click();
    await page.getByText("Objednávka pro MŠ/ZŠ").click();
    await expect(page.getByLabel("IČO")).toBeEmpty();
    await page.getByLabel("IČO").fill("12345678");
    await expect(page.getByLabel("IČO")).toHaveValue("12345678");
  });

  test("checkbox element is checked", async ({ page }) => {
    await page.getByRole("button", { name: "Pro rodiče" }).click();
    await page.getByText("Vytvořit přihlášku").click();
    await page.getByLabel("Email").fill(username);
    await page.getByLabel("Heslo").fill(password);
    await page.getByRole("button", { name: "Přihlásit" }).click();
    await page.getByRole("link", { name: " Přihlášky" }).click();
    await page.getByText("Přidat").click();
    // await page.locator("#restrictions_yes").check(); //explain why this does not work in our case
    await page.locator("#restrictions_yes").check({ force: true });
    await expect(page.locator("#restrictions_yes")).toBeChecked();
  });
});
