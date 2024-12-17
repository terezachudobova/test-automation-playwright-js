import { event, school } from "./data/testData";
import { expect, test } from "./fixtures/fixtures";

test.describe("Navigation via menu", async () => {
  test("Navigation menu should contain link for school trip inquiry", async ({ homePage }) => {
    await expect(homePage.navigation.navigationTabs).toContainText("Pro učitelé");
    await homePage.navigation.assertSubTab("Pro učitelé", "Objednávka pro MŠ/ZŠ");
  });

  test("Order form should be accessible via menu", async ({ homePage, orderPage }) => {
    await homePage.navigation.openNavigationTab("Pro učitelé", "Objednávka pro MŠ/ZŠ");
    await expect(orderPage.orderForm).toBeVisible();
    await orderPage.header.assertHeading("Nová objednávka");
  });
});

test.describe("Order form", async () => {
  test.beforeEach(async ({ orderPage }) => {
    await orderPage.open();
    await orderPage.header.assertHeading("Nová objednávka");
  });

  test("Filling company registration number should not auto-fill data to the form", async ({ orderPage }) => {
    await orderPage.fillRegistrationNumber(school.registrationNumber);
    await orderPage.toast.assertToastMessage("Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně");
  });

  test("Valid order should be registered", async ({ orderPage }) => {
    await orderPage.fillSchoolDetails(
      school.registrationNumber,
      school.name,
      school.address,
      school.director,
      school.contactName,
      school.contactPhone,
      school.contactEmail
    );
    const currentDate = await orderPage.getFormattedCurrentDate();
    const currentDateShifted = await orderPage.getFormattedCurrentDate(14);
    await orderPage.fillEventDates(currentDate, currentDateShifted);
    await orderPage.fillEventDetails(event.type, event.daytime, event.pupilsCount, event.pupilsAge, event.teachersCount);
    await orderPage.saveOrderButton.click();

    await expect(orderPage.confirmationText).toBeVisible();
  });

  test("Empty order should not be registered", async ({ orderPage }) => {
    await orderPage.chooseEventType(event.type);
    await orderPage.saveOrderButton.click();
    await expect(orderPage.confirmationText).not.toBeVisible();
  });

  test("Invalid registration number should return validation error", async ({ orderPage }) => {
    await orderPage.fillRegistrationNumber("Invalid registration number");
    await orderPage.chooseEventType(event.type);
    await orderPage.saveOrderButton.click();

    await orderPage.toast.assertToastMessage("IČO nenalezeno, zkontrolujte jej prosím");
    await expect(orderPage.confirmationText).not.toBeVisible();
  });

  test("Invalid phone number should return validation error", async ({ orderPage }) => {
    await orderPage.fillSchoolDetails(
      school.registrationNumber,
      school.name,
      school.address,
      school.director,
      school.contactName,
      "Invalid phone",
      school.contactEmail
    );
    const currentDate = await orderPage.getFormattedCurrentDate();
    const currentDateShifted = await orderPage.getFormattedCurrentDate(14);
    await orderPage.fillEventDates(currentDate, currentDateShifted);
    await orderPage.fillEventDetails(event.type, event.daytime, event.pupilsCount, event.pupilsAge, event.teachersCount);
    await orderPage.saveOrderButton.click();

    await orderPage.toast.assertToastMessage("Některé pole obsahuje špatně zadanou hodnotu");
    await orderPage.fieldError.assertFieldErrorMessage("Telefon není ve správném formátu");
    await expect(orderPage.confirmationText).not.toBeVisible();
  });
});
