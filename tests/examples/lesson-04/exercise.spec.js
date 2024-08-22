import {test} from "@playwright/test";
import {username, password} from '../../fixtures.js'

/**
 * Lesson 4: Test organization
 */
test.describe('Login Page', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('/prihlaseni');
    });

    test('should show login form', async ({ page }) => {
        const emailField = page.getByLabel('Email');
        console.log('Email field is displayed: ' + await emailField.isVisible());
        console.log('Email field is displayed: ' + await emailField.isEnabled());

        const passwordField = page.getByLabel('Heslo');
        console.log('Password field is displayed: ' + await passwordField.isVisible());
        console.log('Password field is displayed: ' + await passwordField.isEnabled());

        const loginButton = page.getByRole('button', { name: 'Přihlásit'});
        console.log('Login button is dislayed: ' + await loginButton.isVisible());
        console.log('Login button text is: ' + await loginButton.textContent());
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
            .locator('strong')
            .textContent();
        console.log('Current user name:' + await currentUser);
    });

    test('should not login with invalid credentials', async ({ page }) => {
        const emailField = page.getByLabel('Email');
        const passwordField = page.getByLabel('Heslo');
        const loginButton = page.getByRole('button', { name: 'Přihlásit'});

        await emailField.fill(username);
        await passwordField.fill('invalid');
        await loginButton.click();

        const toastMessage = page.locator('.toast-message');
        console.log('Error: ' + await toastMessage.textContent());

        const fieldError = page.locator('.invalid-feedback');
        console.log('Field error: ' + await fieldError.textContent());

        console.log('Email field is displayed: ' + await emailField.isVisible());
        console.log('Password field is displayed: ' + await passwordField.isVisible());
        console.log('Login button is displayed: ' + await loginButton.isVisible());
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

        console.log('User currently logged in: ' + await userNameDropdown.textContent());

        await userNameDropdown.click();
        await logoutLink.click();

        console.log('User is logged in: ' + await userNameDropdown.isVisible());
        console.log('Navbar text: ' + await navbarRight.textContent());
    });
});

test.describe('Applications Page', async () => {

    test.beforeEach(async ({page}) => {
        await page.goto('/prihlaseni');
        await page.getByLabel('Email').fill(username);
        await page.getByLabel('Heslo').fill(password);
        await page.getByRole('button', { name: 'Přihlásit'}).click();
        await page.getByRole('link', {name: 'Přihlášky'}).click();
        await page.waitForLoadState();
    });

    test('should list all applications', async ({ page }) => {
        console.log('Page title is: ' + await page.locator('h1').textContent());

        // TODO pridat do cviceni
        const tableSizeInfo = page.locator('#DataTables_Table_0_info');
        console.log(await tableSizeInfo.textContent());

        const rows = await page
            .locator('.dataTable')
            .locator('tbody')
            .locator('tr')
            .all();

        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.textContent()
            console.log(rowText);
        }
    });

    test('should filter in applications', async ({ page }) => {
        const tableSizeInfo = page.locator('#DataTables_Table_0_info');
        await page.locator('input[type="search"]').fill('mar');
        await page.waitForLoadState()

        // TODO pridat do cviceni
        console.log('Unfiltered table size info: ' + await tableSizeInfo.textContent());

        const filteredRows = await page
            .locator('.dataTable')
            .locator('tbody')
            .locator('tr')
            .all();

        // TODO pridat do cviceni
        console.log('Filtered table size info: ' + await tableSizeInfo.textContent());

        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        for (const row of filteredRows) {
            console.log(await row.textContent());
        }
    });
});
