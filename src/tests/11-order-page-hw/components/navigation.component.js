import { expect } from "@playwright/test";

export class NavigationComponent {
  constructor(page) {
    this.page = page;
    this.navigationBar = page.getByRole("navigation");
    this.navigationTabs = this.navigationBar.locator("#navbarSupportedContent");
    this.navigationSubtabs = this.navigationTabs.locator(".submenu");
    this.loggedUserDropbox = page.locator(".navbar-right").locator('[data-toggle="dropdown"]');
    this.logoutButton = page.getByText("Odhlásit");
  }

  async openNavigationTab(tabName, subtabName = null) {
    const navigationTab = this.navigationTabs.getByText(tabName);
    await navigationTab.click();
    if (["Pro rodiče", "Pro učitelé"].includes(tabName)) {
      const navigationSubtab = this.navigationSubtabs.getByText(subtabName);
      await navigationSubtab.click();
    }
    await expect(navigationTab).toHaveClass(/active/);
  }

  async logout() {
    await this.loggedUserDropbox.click();
    await this.logoutButton.click();
  }

  async assertLoggedUser(username) {
    await expect(this.loggedUserDropbox).toHaveText(username);
  }

  async assertSubTab(tabName, subtabName) {
    const navigationTab = this.navigationTabs.getByText(tabName);
    await navigationTab.click();
    const navigationSubtab = this.navigationSubtabs.getByText(subtabName);
    await expect(navigationSubtab).toBeVisible();
  }
}
