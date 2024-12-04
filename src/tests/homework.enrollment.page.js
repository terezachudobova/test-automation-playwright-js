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
      this.loggedUserLink = page.locator(".nav-item").filter({ hasText: "Přihlášen" }).locator("a.dropdown-toggle");
      this.alertMessage = page.getByRole("alert");
    }

    // Actions //
    async navigate() {
      await this.page.goto("/registrace");
    }

    async stripSpecialCharacters(text, isEmail = false) {
      if (isEmail) {
        return text.replace(/[^a-zA-Z0-9@.]/g, '');
      } else {
      return text.replace(/[^a-zA-Z0-9 ]/g, '');
      }
    }

    async generateRandomUser() {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      let randomName = `${firstName} ${lastName}`;
      let randomEmail = faker.internet.email();
      let randomPassword = faker.internet.password({pattern: /[a-zA-Z0-9]/});

      randomName = await this.stripSpecialCharacters(randomName);
      randomEmail = await this.stripSpecialCharacters(randomEmail, true);
      randomPassword = `${randomPassword}Aa1`;

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
      await expect(this.heading, `Page heading should have text: ${headingText}`).toHaveText(headingText);
    }

    async assertFormElements() {
      const elements = [
        this.fullnameInput,
        this.emailInput,
        this.passwordInput,
        this.submitButton
      ];

      for (const element of elements) {
        await expect(element).toBeVisible();
        await expect(element).toBeEnabled();
        await expect(element).toBeEditable();
      }
    }

    async assertUserIsLogged(name) {
      await expect(this.loggedUserLink, `Logged user's name should be: ${name}`).toHaveAttribute('title', name);
    }

    async assertAlertMessage(message) {
      await expect(this.alertMessage, `Alert message should be: ${message}`).toHaveText(message);
    }

    async assertAlertCount(count) {
      await expect(this.alertMessage,`Number of alert messages displayed should be: ${count}`).toHaveCount(count);
    }
}
