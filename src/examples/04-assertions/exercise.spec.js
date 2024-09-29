import {expect, test} from "@playwright/test";
import {
    username,
    password,
    userFullName,
    applicationsSearchText,
    applicationsPageSize,
} from "../../fixtures/fixtures.js"
import {RegExp} from "../../fixtures/regular-expressions";

/**
 * Lesson 4: Assertions
 */
test("should login and list applications", async ({ page }) => {

    await page.goto("/prihlaseni");

    const emailField = page.getByLabel("Email");
    await expect(emailField, "email field should be visible").toBeVisible();
    await expect(emailField, "email field should be enabled").toBeEnabled();

    const passwordField = page.getByLabel("Heslo");
    await expect(passwordField, "password field should be visible").toBeVisible();
    await expect(passwordField, "password field should be enabled").toBeEnabled();

    const loginButton = page.getByRole("button", { name: "Přihlásit"});
    await expect(loginButton, "login button should be visible").toBeVisible();
    await expect(loginButton, "login button text should have text").toHaveText("Přihlásit");

    await emailField.fill(username);
    await passwordField.fill(password);
    await loginButton.click();

    const currentUser = page
        .locator(".navbar-right")
        .locator("strong");
    await expect(currentUser, "current user should be displayed").toHaveText(userFullName);

    // Got to applications page
    await page.getByRole("link", {name: "Přihlášky"}).click();
    await page.waitForLoadState();

    // Check page title
    const pageTitle = await page.getByRole("heading", {level: 1});
    await expect(pageTitle, "page title should be displayed").toHaveText("Přihlášky");

    /*
    The page shows loading indicator when the data is being loaded.
    We need to wait for the loading indicator to appear and disappear.
     */
    const loadingIndicator = page.locator("#DataTables_Table_0_processing");
    await loadingIndicator.waitFor({state: "visible"});
    await loadingIndicator.waitFor({state: "hidden"});

    // Print all applications
    const rows = await page
        .locator(".dataTable")
        .locator("tbody")
        .locator("tr")
        .all();

    await expect(rows.length, "table should have >= " + applicationsPageSize + " rows")
        .toBeGreaterThanOrEqual(applicationsPageSize);

    for (const row of rows) {
        const cells = row.locator("td");
        await expect(await cells.nth(0).textContent()).toMatch(RegExp.NAME);
        await expect(await cells.nth(1).textContent()).toMatch(RegExp.DATE);
        await expect(await cells.nth(2).textContent()).toMatch(RegExp.PAYMENT_TYPE);
        await expect(await cells.nth(3).textContent()).toMatch(RegExp.TO_PAY);
    }

    /*
     Optional: filter the applications table
     */
    await page.locator('input[type="search"]').fill(applicationsSearchText);
    await page.waitForLoadState()
    await loadingIndicator.waitFor({state: "visible"});
    await loadingIndicator.waitFor({state: "hidden"});

    const filteredRows = await page
        .locator(".dataTable")
        .locator("tbody")
        .locator("tr")
        .all();

    await expect(filteredRows.length, "table should have < " + applicationsPageSize + " rows")
        .toBeLessThan(applicationsPageSize);

    for (const row of filteredRows) {
        const cells = row.locator("td");
        await expect(await cells.nth(0).textContent()).toMatch(RegExp.NAME);
        await expect(await cells.nth(1).textContent()).toMatch(RegExp.DATE);
        await expect(await cells.nth(2).textContent()).toMatch(RegExp.PAYMENT_TYPE);
        await expect(await cells.nth(3).textContent()).toMatch(RegExp.TO_PAY);
    }
});
