// @ts-check
const { test, expect } = require('@playwright/test');
const { username, password} = require("./fixtures");


// describe('Czechitas Login Page', async () => {
//
//   it('should open login page', async () => {
//
//     await browser.reloadSession();
//
//     await browser.url('/prihlaseni');
//
//     const windowSize = await browser.getWindowSize();
//     console.log(windowSize);
//
//     const allCookies = await browser.getCookies();
//     console.log(allCookies);
//
//     await browser.saveScreenshot('login_page.png');
//
//     await browser.pause(5000);
//
//   });
//
// });

test('should open login page', async ({ page }) => {
  await page.goto('/');

  // const windowSize = await browser.getWindowSize();
  // console.log(windowSize);
  //
  // const allCookies = await browser.getCookies();
  // console.log(allCookies);
  //
  // await browser.saveScreenshot('login_page.png');
  //
  // await browser.pause(5000);

});



test('login with valid credentials', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Přihlášky Czechitas');
  await page.getByRole('link', { name: 'Přihlásit' }).click();
  await page.locator('#email').fill(username);
  await page.locator('#password').fill(password);
  await page.getByRole('button', { name: 'Přihlásit' }).click();

  const userNameDropdown = page.locator('.navbar-right').locator('[data-toggle="dropdown"]');

  console.log('User currently logged in: ' + await userNameDropdown.allInnerTexts());
  // const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
  // console.log('User currently logged in: ' + await userNameDropdown.getText());
});

// test('invalid credentials', async ({ page }) => {
//   await page.goto('/');
//   await expect(page).toHaveTitle('Přihlášky Czechitas');
//   await page.getByRole('link', { name: 'Přihlásit' }).click();
//   await page.locator('#email').fill(username);
//   await page.locator('#password').fill(password);
//   await page.getByRole('button', { name: 'Přihlásit' }).click();
// });

