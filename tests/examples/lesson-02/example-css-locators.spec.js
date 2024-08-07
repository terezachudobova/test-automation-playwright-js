import {test} from "@playwright/test";

/**
 * Lesson 2: Locators
 *
 * Example HTML (simplified)
 *
 * <div class="card-body">
 *     <form method="POST" action="https://...">
 *         <input id="email" type="email" name="email" value="">
 *         <input id="password" type="password" name="password">
 *         <button type="submit" class="btn btn-primary">Přihlásit</button>
 *         <a class="btn btn-link" href="https://...">Zapomněli jste své heslo?</a>
 *     </form>
 * </div>
 */

test('should demonstrate CCS locators', async ({ page }) => {

    await page.goto('/prihlaseni');

    /*
    CSS Locators: tag
    */
    const h1TagLocator = page.locator('h1');
    console.log(await h1TagLocator.innerHTML());

    const formTagLocator = page.locator('form');
    console.log(await formTagLocator.innerHTML());

    // TODO vysvetlit
    // const inputTagLocator = page.locator('input').nth(0);
    // console.log(await inputTagLocator.innerHTML());
    //
    // const buttonTagLocator = page.locator('button').nth(0);
    // console.log(await buttonTagLocator.innerHTML());


    /*
    CSS Locators: id
     */
    const idEmailLocator = page.locator('#email');
    console.log(await idEmailLocator.innerHTML());

    const idPasswordLocator = page.locator('#password');
    console.log(await idPasswordLocator.innerHTML());

    /*
    CSS Locators: class
     */
    const classLocator = page.locator('.btn-primary');
    console.log(await classLocator.innerHTML());

    /*
    CSS Locators: attribute
     */
    const nameAttributeLocator = page.locator('[name="email"]');
    console.log(await nameAttributeLocator.innerHTML());

    const typeAttributeLocator = page.locator('[type="password"]');
    console.log(await typeAttributeLocator.innerHTML());

    // attribute obsahující text
    const attributeContainingTextLocator = page.locator('[type*="ass"]');
    console.log(await attributeContainingTextLocator.innerHTML());

    // attribute končící textem
    const attributeEndingWithTextLocator = page.locator('[type$="word"]');
    console.log(await attributeEndingWithTextLocator.innerHTML());

    // attribute začínající textem
    const attributeStartingWithTextLocator = page.locator('[type^="pass"]');
    console.log(await attributeStartingWithTextLocator.innerHTML());

    /*
    CSS Locators: kombinovaný Locator
     */
    const tagAndIdLocator = page.locator('input#email');
    console.log(await tagAndIdLocator.innerHTML());

    const tagAndAttributeLocator = page.locator('input[type="password"]');
    console.log(await tagAndAttributeLocator.innerHTML());

    const tagAndClassLocator = page.locator('button.btn-primary');
    console.log(await tagAndClassLocator.innerHTML());

    /*
    CSS Locators: řetězení
     */
    const LocatorChain = page.locator('div').locator('form').locator('input[type$="word"]');
    console.log(await LocatorChain.innerHTML());

    // /*
    // Speciální WDIO Locatory
    //  */
    // const LocatorByText = $('=Zapomněli jste své heslo?');
    // console.log(await LocatorByText.getHTML());

})

// test.describe('should demonstrate CCS locators', () => {
//
//     test.beforeEach(async ({ page }) => {
//         await page.goto('/prihlaseni');
//     })
//
//     test('tag locators', async ({ page }) => {
//
//         // await page.goto('/prihlaseni');
//
//         /*
//         CSS Locators: tag
//         */
//         const formTagLocator = page.locator('form');
//         console.log(await formTagLocator.innerHTML());
//
//         const inputTagLocator = page.locator('input'); // resolves to 3 elements
//         console.log(await inputTagLocator.innerHTML());
//
//         const buttonTagLocator = page.locator('button');
//         console.log(await buttonTagLocator.innerHTML());
//
//
//         // /*
//         // CSS Locators: id
//         //  */
//         // const idEmailLocator = page.locator('#email');
//         // console.log(await idEmailLocator.innerHTML());
//         //
//         // const idPasswordLocator = page.locator('#password');
//         // console.log(await idPasswordLocator.innerHTML());
//
//     });
//
//     test('id locators', async ({ page }) => {
//
//         // await page.goto('/prihlaseni');
//
//         // /*
//         // CSS Locators: tag
//         // */
//         // const formTagLocator = page.locator('form');
//         // console.log(await formTagLocator.innerHTML());
//         //
//         // const inputTagLocator = page.locator('input'); // resolves to 3 elements
//         // console.log(await inputTagLocator.innerHTML());
//         //
//         // const buttonTagLocator = page.locator('button');
//         // console.log(await buttonTagLocator.innerHTML());
//
//
//         /*
//         CSS Locators: id
//          */
//         const idEmailLocator = page.locator('#email');
//         console.log(await idEmailLocator.innerHTML());
//
//         const idPasswordLocator = page.locator('#password');
//         console.log(await idPasswordLocator.innerHTML());
//
//     });
//
// })



