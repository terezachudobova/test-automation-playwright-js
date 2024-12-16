import { createBdd, test as base } from "playwright-bdd";
import { ApplicationPages } from "../pages";
import {password, username} from "../../../fixtures/fixtures";

export const applicationFixture = base.extend({
    app: async ({ page }, use) => {
        const applicationPages = new ApplicationPages(page);
        await use(applicationPages);
    }
});

const { Given } = createBdd(applicationFixture);

Given("user is on the Czechitas login page", async ({ app }) => {
    await app.loginPage.open();
});

Given("user {string} is logged in", async ({ app }, fullName) => {
    await app.loginPage.login(username, password);
});
