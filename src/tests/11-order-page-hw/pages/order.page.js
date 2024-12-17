import { FieldErrorComponent } from "../components/fieldError.component";
import { HeaderComponent } from "../components/header.component";
import { NavigationComponent } from "../components/navigation.component";
import { ToastComponent } from "../components/toast.component";

export class OrderPage {
  constructor(page) {
    this.navigation = new NavigationComponent(page);
    this.header = new HeaderComponent(page);
    this.toast = new ToastComponent(page);
    this.fieldError = new FieldErrorComponent(page);

    this.page = page;
    this.orderForm = page.locator(".card-body").filter({ has: page.locator("form") });
    // Company details
    this.registrationNumberInput = page.getByLabel("IČO");
    this.customerInput = page.getByLabel("Odběratel");
    this.fullAddressInput = page.getByLabel("Úplná adresa");
    this.schoolRepresentativeInput = page.getByLabel("Zastoupena - ředitel(ka) školy");
    // Contact person
    this.fullnameInput = page.getByLabel("Jméno a příjmení");
    this.phoneNumberInput = page.getByLabel("Telefon");
    this.emailInput = page.getByLabel("Email");
    // Date of the event
    this.firstStartDateInput = page.locator("#start_date_1");
    this.firstEndDateInput = page.locator("#end_date_1");
    this.secondStartDateInput = page.locator("#start_date_2");
    this.secondEndDateInput = page.locator("#end_date_2");
    this.thirdStartDateInput = page.locator("#start_date_3");
    this.thirdEndDateInput = page.locator("#end_date_3");
    // Event details
    this.eventDaytimeSelect = page.locator("select#camp-date_part");
    this.pupilsCountInput = page.getByRole("spinbutton", { name: "Počet dětí" });
    this.pupilsAgeInput = page.getByRole("textbox", { name: "ve věku" });
    this.teachersCountInput = page.getByRole("spinbutton", { name: "Počet pedagogického doprovodu" });

    this.saveOrderButton = page.getByRole("button", { name: "Uložit objednávku" });
    this.confirmationText = page.getByRole("heading", { name: "Děkujeme za objednávku" });
  }

  async open() {
    await this.page.goto("/objednavka/pridat");
  }

  async fillRegistrationNumber(registrationNumber) {
    await this.registrationNumberInput.fill(registrationNumber);
    await this.page.keyboard.press("Tab");
    await this.waitForDataSearch();
  }

  async waitForDataSearch() {
    const searchMessages = await this.page.getByPlaceholder("Hledání v ARESu").all();
    for (const message of searchMessages) {
      await message.waitFor({ state: "detached" });
    }
  }

  async chooseEventType(eventType) {
    await this.page.getByRole("tab", { name: eventType }).click();
  }

  async selectEventDaytime(eventDatetime) {
    await this.eventDaytimeSelect.selectOption({ label: eventDatetime });
  }

  async fillSchoolDetails(registrationNumber, name, address, director, contactName, contactPhone, contactEmail) {
    await this.fillRegistrationNumber(registrationNumber);
    await this.customerInput.fill(name);
    await this.fullAddressInput.fill(address);
    await this.schoolRepresentativeInput.fill(director);
    await this.fullnameInput.fill(contactName);
    await this.phoneNumberInput.fill(contactPhone);
    await this.emailInput.fill(contactEmail);
  }

  async fillEventDates(startDate, endDate) {
    await this.firstStartDateInput.fill(startDate);
    await this.firstEndDateInput.fill(endDate);
  }

  async fillEventDetails(eventType, eventDatetime, pupilsCount, pupilsAge, teachersCount) {
    await this.chooseEventType(eventType);
    await this.selectEventDaytime(eventDatetime);
    await this.pupilsCountInput.fill(pupilsCount);
    await this.pupilsAgeInput.fill(pupilsAge);
    await this.teachersCountInput.fill(teachersCount);
  }

  async getFormattedCurrentDate(shift = 0) {
    const date = new Date();
    date.setDate(date.getDate() + shift);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
