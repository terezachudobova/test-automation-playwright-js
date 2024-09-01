import { AppPage } from "./app.page";

export class OrderPage extends AppPage {
  constructor(page) {
    super(page);
    this.client = this.mainContent.locator("#client");
    this.address = this.mainContent.locator("#address");
  }

  get companyId() { return this.mainContent.locator("#ico"); }
  get substitute() { return this.mainContent.locator("#substitute"); }
  get contactName() { return this.mainContent.locator("#contact_name"); }
  get contactPhone() { return this.mainContent.locator("#contact_tel"); }
  get contactEmail() { return this.mainContent.locator("#contact_mail"); }
  get startDate() { return this.mainContent.locator("#start_date_1"); }
  get endDate() { return this.mainContent.locator("#end_date_1"); }
  get tabSelector() { return this.mainContent.locator("#nav-tab"); }
  get submitButton() { return this.mainContent.getByRole("button", { name: "Uložit objednávku" }); }
  get orderConfirmationText() { return this.page.locator(".card-body").locator("p"); }
  get suburbanCampForm() { return new SuburbanCampForm(this.page); }

  async setICO(ico) {
    await this.companyId.fill(ico);
    await this.page.keyboard.press("Enter");
    await this.toast.waitFor();
  }

  async selectType(name) {
    await this.tabSelector.getByRole("tab", { name: name }).click();
  }

  async submit() {
    await this.submitButton.click();
  }

  async setUrbanCamp(campDate, students, age, teachers) {
    await this.selectType("Příměstský tábor");
    await this.suburbanCampForm.setUrbanCamp(campDate, students, age, teachers);
  }

  async setOrder(substituteName, contactName, contactPhone, contactEmail, startDate, endDate) {
    await this.substitute.fill(substituteName);
    await this.contactName.fill(contactName);
    await this.contactPhone.fill(contactPhone);
    await this.contactEmail.fill(contactEmail);
    await this.startDate.fill(startDate);
    await this.endDate.fill(endDate);
  }

  async fillNameAndAddress(clientName, address) {
    await this.client.fill(clientName);
    await this.address.fill(address);
  }
}

class SuburbanCampForm {
  constructor(page) {
    this.page = page;
  }

  get campDateSelector() { return this.page.locator("#camp-date_part"); }
  get numberOfStudentsField() { return this.page.locator("#camp-students"); }
  get numberStudentAgeField() { return this.page.locator("#camp-age"); }
  get numberNumberOfAdultsField() { return this.page.locator("#camp-adults"); }

  async setUrbanCamp(campDate, students, age, teachers) {
    await this.campDateSelector.selectOption({ label: campDate });
    await this.numberOfStudentsField.fill(students);
    await this.numberStudentAgeField.fill(age);
    await this.numberNumberOfAdultsField.fill(teachers);
  }
}
