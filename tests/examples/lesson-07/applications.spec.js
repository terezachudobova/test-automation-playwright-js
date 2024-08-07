/**
 * Lesson 7: Code organization: functions - Exercise 2
 */
import {expect, test} from "@playwright/test";
import {username, password, expectedApplicationsPageRows} from '../../fixtures.js'

const pageTitle = 'Přihlášky Czechitas';

async function login(page) {
    await page.goto('/prihlaseni');
    await page.getByLabel('Email').fill(username);
    await page.getByLabel('Heslo').fill(password);
    await page.getByRole('button', { name: 'Přihlásit'}).click();

}

async function goToApplicationsPage(page) {
    await page.getByRole('link', {name: 'Přihlášky'}).click();
}

async function waitForTableToLoad(page) {
    await page.waitForLoadState();
    await page.locator('#DataTables_Table_0_processing').waitFor({state: 'hidden'});
}

async function getApplicationsTableRows(page) {
    return await page
        .locator('.dataTable')
        .locator('tbody')
        .locator('tr')
        .all();
}

async function searchInApplicationsTable(page, text) {
    await page.locator('input[type="search"]').fill(text);
    await page.locator('#DataTables_Table_0_processing'); // waits for loader to appear
}

test.describe('Applications Page', async () => {

    test.beforeEach(async ({page}) => {
        await login(page);
        await test.expect(page).toHaveTitle(pageTitle);
        await goToApplicationsPage(page);
        await waitForTableToLoad(page);
    });

    test('should list all applications', async ({ page }) => {
        const rows = await getApplicationsTableRows(page);

        // console.log('There are ' + rows.length + ' rows in the table');
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
        const searchText = 'mar';

        const pageSize = page.locator('#DataTables_Table_0_info');
        await expect(await pageSize.textContent()).toContain('Zobrazeno 1 až 30 záznamů z');


        const unfilteredRows = await getApplicationsTableRows(page);
        await expect(unfilteredRows, 'table should contain filtered rows').toHaveLength(expectedApplicationsPageRows);

        await searchInApplicationsTable(page, searchText);
        await waitForTableToLoad(page);

        const filteredRows = await getApplicationsTableRows(page);
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
