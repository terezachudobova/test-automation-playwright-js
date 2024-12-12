import { HeaderComponent } from "../components/header.component";
import { NavigationComponent } from "../components/navigation.component";
import { ToastComponent } from "../components/toast.component";

export class HomePage {
  constructor(page) {
    this.navigation = new NavigationComponent(page);
    this.header = new HeaderComponent(page);
    this.toast = new ToastComponent(page);

    this.page = page;
  }

  // Akce
  async open() {
    await this.page.goto("/");
  }

  // Asserce
}
