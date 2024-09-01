export class AppPage {
  constructor(page) {
    this.page = page;
    this.toast = this.page.locator(".toast-message");
  }

  get navbarLeft() { return this.page.locator(".navbar-nav"); }

  get navbarSection() { return this.navbarLeft.locator(".dropdown"); }

  get navbarItem() { return this.navbarLeft.locator(".dropdown-item"); }

  get mainContent() { return this.page.locator(".main_content"); }

  get pageHeader() { return this.page.locator("h1"); }

  get contentHeader() { return this.mainContent.locator("h3"); }

  async navigate(sectionText, itemText) {
    await this.navbarSection.filter({ hasText: sectionText }).click();
    await this.navbarItem.filter({ hasText: itemText }).click();
  }
}
