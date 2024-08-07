/**
 * Lesson 8: Code organization: Page Object Model - Exercise 2
 */
import {expect, test} from "@playwright/test";
import {username, password, expectedApplicationsPageRows} from '../../fixtures.js'
import {LoginPage} from "./pages/login.page";
import {ApplicationsPage} from "./pages/applications.page";

const pageTitle = 'Přihlášky - Czechitas';

test.describe('Applications Page', async () => {

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        const applicationsPage = new ApplicationsPage(page);

        await loginPage.open();
        await loginPage.login(username, password);
        await applicationsPage.goToApplicationsPage();
        await test.expect(page).toHaveTitle(pageTitle);
    });

    test('should list all applications', async ({ page }) => {
        const applicationsPage = new ApplicationsPage(page);

        const rows = await applicationsPage.getApplicationsTableRows(page);

        await expect(await applicationsPage.getApplicationsTableInfo()).toContain('Zobrazeno 1 až 30 záznamů z');
        await expect(rows, 'table should contain rows').toHaveLength(expectedApplicationsPageRows);

        for (const row of rows) {
            const cells = row.locator('td');
            await expect(await cells.nth(0).textContent()).toMatch(/^(?!\s*$).+/);
            await expect(await cells.nth(1).textContent()).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            await expect(await cells.nth(2).textContent()).toMatch(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            await expect(await cells.nth(3).textContent()).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        }
    });

    test('should filter in applications', async ({ page }) => {
        const applicationsPage = new ApplicationsPage(page);
        const searchText = 'mar';

        const unfilteredRows = await applicationsPage.getApplicationsTableRows();
        await expect(await applicationsPage.getApplicationsTableInfo()).toContain('Zobrazeno 1 až 30 záznamů z');
        await expect(unfilteredRows, 'table should contain filtered rows').toHaveLength(expectedApplicationsPageRows);

        await applicationsPage.searchInApplicationsTable(searchText);
        await applicationsPage.waitForTableToLoad();

        const filteredRows = await applicationsPage.getApplicationsTableRows();
        await expect(await applicationsPage.getApplicationsTableInfo()).toContain('Zobrazeno 1 až 30 záznamů z');
        await expect(filteredRows.length, 'table should contain filtered rows').toBeLessThan(unfilteredRows.length);

        for (const row of filteredRows) {
            const cells = row.locator('td');
            await expect(await cells.nth(0).textContent()).toContain(searchText);
            await expect(await cells.nth(1).textContent()).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            await expect(await cells.nth(2).textContent()).toMatch(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            await expect(await cells.nth(3).textContent()).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        }
    });
});
