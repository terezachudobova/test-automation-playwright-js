import { expect } from "@playwright/test";

export class FieldErrorComponent {
  constructor(page) {
    this.page = page;
    this.fieldErrorMessage = page.locator(".invalid-feedback");
  }

  async assertFieldErrorMessage(message) {
    await expect(this.fieldErrorMessage).toHaveText(message);
  }
}
