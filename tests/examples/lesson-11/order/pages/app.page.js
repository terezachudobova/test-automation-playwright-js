export class AppPage {
  constructor(page) {
    this.page = page;
    this.toast = this.page.locator(".toast-message");
  }

  get navbarLeft() { return this.page.locator(".navbar-nav"); }
  get mainContent() { return this.page.locator(".main_content"); }
  get pageHeader() { return this.page.locator("h1"); }
  get contentHeader() { return this.mainContent.locator("h3"); }

  async navbarSection(sectionText) {
    /*
        Jednodušší řešení by bylo použít:
        this.navbarLeft.filter({ hasText: sectionText }).click();

        Složitější řešení nám dává trochu více jistoty, že klikáme na správný odkaz.
         */

    await this.navbarLeft.locator(".dropdown").filter({ hasText: sectionText }).click();
  }

  async navbarItem(itemText) {
    /*
         Jednodušší řešení:
         this.navbarLeft.filter({ hasText: itemText}).click();
         */

    await this.navbarLeft.locator(".dropdown-item").filter({ hasText: itemText }).click(); // same
  }

  async navbar(sectionText, itemText) {
    await this.navbarSection(sectionText);
    await this.navbarItem(itemText);
  }
}
