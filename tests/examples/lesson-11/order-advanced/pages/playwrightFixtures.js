import { test as baseTest } from '@playwright/test';
import { OrderPage } from './order.page';

export const test = baseTest.extend({
    orderPage: async ({ page }, use) => {
        await page.goto("/");
        await use(new OrderPage(page));
    },
});

export { expect } from '@playwright/test';