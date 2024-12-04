import { test } from "@playwright/test";
import { EnrollmentPage } from "./homework.enrollment.page";
import { password, username, userFullName } from "../fixtures/fixtures";

test.describe("Registration form", async () => {
    let enrollmentPage;
    test.beforeEach(async ({ page }) => {
        enrollmentPage = new EnrollmentPage(page);

        await enrollmentPage.navigate();
        await enrollmentPage.assertPageHeading("Registrace");
    });

    test("Registration form should be visible, enabled and editable", {
        annotation: {
            type: "test description",
            description: "Test který přejde na formulář registrace a zkontroluje, že se formulář správně zobrazil"
        }
    }, async () => {
        await enrollmentPage.assertFormElements();
    });

    test("New user should register", {
        annotation: {
            type: "test description",
            description: "Test který provede validní registraci uživatele"
        }
    }, async () => {
        const { randomName, randomEmail, randomPassword } = await enrollmentPage.generateRandomUser();

        await enrollmentPage.register(randomName, randomEmail, randomPassword);
        await enrollmentPage.assertPageHeading("Přihlášky");
        await enrollmentPage.assertUserIsLogged(randomName);
    });

    test("Existing user should not register", {
        annotation: {
            type: "test description",
            description: "Test, který provede registraci uživatele s již existujícím emailem"
        }
    }, async () => {
        await enrollmentPage.register(userFullName, username, password);
        await enrollmentPage.assertAlertMessage("Účet s tímto emailem již existuje");
        await enrollmentPage.assertAlertCount(1);
        await enrollmentPage.assertPageHeading("Registrace");
    });

    test("User with invalid password should not register", {
        annotation: {
            type: "test description",
            description: "Test, který provede registraci uživatele s nevalidním heslem (obsahující pouze čísla)"
        }
    }, async () => {
        const { randomName, randomEmail } = await enrollmentPage.generateRandomUser();
        const invalidPassword = (await enrollmentPage.generateRandomNumber()).toString();

        await enrollmentPage.register(randomName, randomEmail, invalidPassword);
        await enrollmentPage.assertAlertMessage("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");
        await enrollmentPage.assertAlertCount(1);
        await enrollmentPage.assertPageHeading("Registrace");
    });
});
