import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { OrderPage } from "../pages/order.page";

export const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await use(homePage);
  },
  orderPage: async ({ page }, use) => {
    const orderPage = new OrderPage(page);
    await use(orderPage);
  },
});

export { expect } from "@playwright/test";
