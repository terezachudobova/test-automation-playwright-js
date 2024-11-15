import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class EnrollmentPage {

    constructor(page) {
      this.page = page;

      // Locators //
      this.heading = page.getByRole("heading", { level: 1 });
      this.fullnameInput = page.getByLabel("Jméno a příjmení");
      this.emailInput = page.getByLabel("Email");
      this.passwordInput = page.getByLabel("Heslo");
      this.confirmPasswordInput = page.getByLabel("Kontrola hesla");
      this.submitButton = page.getByRole("button", { name: "Zaregistrovat" });
      this.loggedUser = page.locator(".nav-item").filter({ hasText: "Přihlášen" }).locator("strong");
      this.alertMessage = page.getByRole("alert");
    }

    // Actions //
    async navigate() {
      await this.page.goto("/registrace");
    }

    async generateRandomUser() {
      const randomName = faker.person.fullName();
      const randomEmail = faker.internet.email();
      const randomPassword = faker.internet.password();

      return { randomName, randomEmail, randomPassword };
    }

    async generateRandomNumber() {
      return faker.number.int({ min: 100000 });
    }

    async register(name, email, password) {
      await this.fullnameInput.fill(name);
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.confirmPasswordInput.fill(password);
      await this.submitButton.click();
    }

    // Assertions //
    async assertPageHeading(headingText) {
      await expect(this.heading).toHaveText(headingText);
    }

    async assertFormElements() {
      const elements = [
        this.fullnameInput,
        this.emailInput,
        this.passwordInput,
        this.submitButton
      ];

      for (const element of elements) {
        await expect(element).toBeAttached();
        await expect(element).toBeVisible();
        await expect(element).toBeEnabled();
        await expect(element).toBeEditable();
      }
    }

    async assertUserIsLogged(name) {
      await expect(this.loggedUser).toHaveText(name);
    }

    async assertAlertMessage(message) {
      await expect(this.alertMessage).toHaveText(message);
    }

    async assertAlertCount(count) {
      await expect(this.alertMessage).toHaveCount(count);
    }
}