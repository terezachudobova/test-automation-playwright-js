import { expect } from "@playwright/test";

export class ToastComponent {
  constructor(page) {
    this.page = page;
    this.toastMessage = page.locator(".toast-message");
  }

  async assertToastMessage(message) {
    await expect(this.toastMessage).toHaveText(message);
  }
}
