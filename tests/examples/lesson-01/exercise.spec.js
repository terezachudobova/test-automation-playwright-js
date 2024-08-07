const {test} = require("@playwright/test");

/**
 * Lesson 1: First test
 */
test('should open login page', async ({ page }) => {

    await page.goto('/prihlaseni');

    await page.setViewportSize({ width: 1920, height: 1080 })

    await page.screenshot({ path: 'login_page.png' });

    const pageTitleSelector = page.locator('css=h1');

    console.log('TEST');
    console.log(await page.title());
    console.log(await pageTitleSelector.textContent());
    // await page.pause(5000);

});
