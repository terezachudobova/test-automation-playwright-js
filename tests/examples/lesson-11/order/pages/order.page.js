import { AppPage } from "./app.page";

export class OrderPage extends AppPage {
  constructor(page) {
    super(page);
    this._companyIdFieldId = "ico";
    this._clientFieldId = "client";
    this._addressFieldId = "address";
    this._substituteFieldId = "substitute";
    this._contactNameFieldId = "contact_name";
    this._contactPhoneFieldId = "contact_tel";
    this._contactEmailFieldId = "contact_mail";
    this._startDate1Id = "start_date_1";
    this._endDate1Id = "end_date_1";
  }

  get companyIdField() {
    return this.mainContent.locator(`#${this._companyIdFieldId}`);
  }
  get clientField() {
    return this.mainContent.locator(`#${this._clientFieldId}`);
  }
  get addressField() {
    return this.mainContent.locator(`#${this._addressFieldId}`);
  }
  get substituteField() {
    return this.mainContent.locator(`#${this._substituteFieldId}`);
  }
  get contactNameField() {
    return this.mainContent.locator(`#${this._contactNameFieldId}`);
  }
  get contactPhoneField() {
    return this.mainContent.locator(`#${this._contactPhoneFieldId}`);
  }
  get contactEmailField() {
    return this.mainContent.locator(`#${this._contactEmailFieldId}`);
  }
  get startDateField() {
    return this.mainContent.locator(`#${this._startDate1Id}`);
  }
  get endDateField() {
    return this.mainContent.locator(`#${this._endDate1Id}`);
  }
  get tabSelector() {
    return this.mainContent.locator("#nav-tab");
  }
  get submitButton() {
    return this.mainContent.getByRole("button", { name: "Uložit objednávku" });
  }
  get orderConfirmationText() {
    return this.page.locator(".card-body").locator("p");
  }
  get suburbanCampForm() {
    return new SuburbanCampForm(this.page);
  }

  async getFilledValues() {
    return {
      companyId: await this.companyIdField.inputValue(),
      client: await this.clientField.inputValue(),
      address: await this.addressField.inputValue(),
      substitute: await this.substituteField.inputValue(),
      contactName: await this.contactNameField.inputValue(),
      contactPhone: await this.contactPhoneField.inputValue(),
      contactEmail: await this.contactEmailField.inputValue(),
      startDate: await this.startDateField.inputValue(),
      endDate: await this.endDateField.inputValue(),
    };
  }

  async setCompanyId(value) {
    await this.companyIdField.fill(value);
    await this.page.keyboard.press("Enter");
  }

  async setClientName(value) {
    await this.clientField.fill(value);
  }

  async setAddress(value) {
    await this.addressField.fill(value);
  }

  async setSubstitute(value) {
    await this.substituteField.fill(value);
  }

  async setContactName(value) {
    await this.contactNameField.fill(value);
  }

  async setContactPhone(value) {
    await this.contactPhoneField.fill(value);
  }

  async setContactEmail(value) {
    await this.contactEmailField.fill(value);
  }

  async setStartDate(value) {
    await this.startDateField.fill(value);
  }

  async setEndDate(value) {
    await this.endDateField.fill(value);
  }

  async selectType(name) {
    await this.tabSelector.getByRole("tab", { name: name }).click();
  }

  async submit() {
    await this.submitButton.click();
  }
}

class SuburbanCampForm {
  constructor(page) {
    this.page = page;
  }

  get campDateSelector() {
    return this.page.locator("#camp-date_part");
  }
  get numberOfStudentsField() {
    return this.page.locator("#camp-students");
  }
  get numberStudentAgeField() {
    return this.page.locator("#camp-age");
  }
  get numberNumberOfAdultsField() {
    return this.page.locator("#camp-adults");
  }

  async setTerm(value) {
    await this.campDateSelector.selectOption({ label: value });
  }

  async setNumberOfStudents(value) {
    await this.numberOfStudentsField.fill(value);
  }

  async setStudentAge(value) {
    await this.numberStudentAgeField.fill(value);
  }

  async setNumberOfAdults(value) {
    await this.numberNumberOfAdultsField.fill(value);
  }
}
