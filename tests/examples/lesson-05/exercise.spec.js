import {expect, test} from "@playwright/test";
import {username, password, userFullName, expectedApplicationsPageRows} from '../../fixtures.js'

/**
 * Lesson 5: Assertions
 */
test.describe('Login Page', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('/prihlaseni');
        await test.expect(page).toHaveTitle('Přihlášení - Czechitas');
    });

    test('should show login form', async ({ page }) => {
        const emailField = page.getByLabel('Email');
        await expect(emailField, 'email field should be visible').toBeVisible();
        await expect(emailField, 'email field should be enabled').toBeEnabled();

        const passwordField = page.getByLabel('Heslo');
        await expect(passwordField, 'password field should be visible').toBeVisible();
        await expect(passwordField, 'password field should be enabled').toBeEnabled();

        const loginButton = page.getByRole('button', { name: 'Přihlásit'});
        await expect(loginButton, 'login button should be visible').toBeVisible();
        await expect(loginButton, 'login button text should have text').toHaveText('Přihlásit');
    });

    test('should login with valid credentials', async ({ page }) => {
        const emailField = page.getByLabel('Email');
        const passwordField = page.getByLabel('Heslo');
        const loginButton = page.getByRole('button', { name: 'Přihlásit'});

        await emailField.fill(username);
        await passwordField.fill(password);
        await loginButton.click();

        const currentUser = page
            .locator('.navbar-right')
            .locator('strong');

        await expect(currentUser, 'current user should be displayed').toHaveText(userFullName);
    });

    test('should not login with invalid credentials', async ({ page }) => {
        const emailField = page.getByLabel('Email');
        const passwordField = page.getByLabel('Heslo');
        const loginButton = page.getByRole('button', { name: 'Přihlásit'});

        await emailField.fill(username);
        await passwordField.fill('invalid');
        await loginButton.click();

        const toastMessage = page.locator('.toast-message');
        await expect(toastMessage, 'toast message should be displayed').toHaveText('Některé pole obsahuje špatně zadanou hodnotu');

        const fieldError = page.locator('.invalid-feedback');
        await expect(fieldError, 'field error should be displayed').toHaveText('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');
        await expect(emailField, 'email field should be visible').toBeVisible();
        await expect(passwordField, 'password field should be visible').toBeVisible();
        await expect(loginButton, 'login button should be visible').toBeVisible();
    });

    test('should logout', async ({ page }) => {
        const emailField = page.getByLabel('Email');
        const passwordField = page.getByLabel('Heslo');
        const loginButton = page.getByRole('button', { name: 'Přihlásit'});
        const navbarRight = page.locator('.navbar-right')
        const userNameDropdown = navbarRight.locator('[data-toggle="dropdown"]');
        const logoutLink = page.locator('#logout-link');

        await emailField.fill(username);
        await passwordField.fill(password);
        await loginButton.click();

        await expect(userNameDropdown, 'user name should be displayed').toHaveText(userFullName);

        await userNameDropdown.click();
        await logoutLink.click();

        await expect(userNameDropdown, 'user name should not be displayed').not.toBeVisible();
        await expect(navbarRight, 'navbar should not contain user name').toHaveText('Přihlásit');
    });
});

test.describe('Applications Page', async () => {

    test.beforeEach(async ({page}) => {
        await page.goto('/prihlaseni');
        await page.getByLabel('Email').fill(username);
        await page.getByLabel('Heslo').fill(password);
        await page.getByRole('button', { name: 'Přihlásit'}).click();
        await page.getByRole('link', {name: 'Přihlášky'}).click();
        await test.expect(page).toHaveTitle('Přihlášky - Czechitas');
        // console.log('Page title is: ' + await page.locator('h1').textContent());
        await page.waitForLoadState();
        await page.locator('#DataTables_Table_0_processing').waitFor({state: 'hidden'});
    });

    test('should list all applications', async ({ page }) => {
        const tableSizeInfo = page.locator('#DataTables_Table_0_info');
        expect(await tableSizeInfo.textContent()).toContain('Zobrazeno 1 až 30 záznamů z');

        const rows = await page
            .locator('.dataTable')
            .locator('tbody')
            .locator('tr')
            .all();

        console.log('There are ' + rows.length + ' rows in the table');
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
        await page.locator('input[type="search"]').fill('mar');

        await page.locator('#DataTables_Table_0_processing');
        await page.waitForLoadState()
        await page.locator('#DataTables_Table_0_processing').waitFor({state: 'hidden'});

        const filteredRows = await page
            .locator('.dataTable')
            .locator('tbody')
            .locator('tr')
            .all();

        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        await expect(filteredRows, 'table should contain rows').toHaveLength(3);
        for (const row of filteredRows) {
            const cells = row.locator('td');
            await expect(await cells.nth(0).textContent()).toMatch(/^(?!\s*$).+/);
            await expect(await cells.nth(1).textContent()).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            await expect(await cells.nth(2).textContent()).toMatch(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            await expect(await cells.nth(3).textContent()).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        }
    });
});
