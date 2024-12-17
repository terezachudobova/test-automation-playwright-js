import { expect } from "@playwright/test";

export class HeaderComponent {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole("heading", { level: 1 });
  }

  async assertHeading(heading) {
    await expect(this.heading).toHaveText(heading);
  }
}
