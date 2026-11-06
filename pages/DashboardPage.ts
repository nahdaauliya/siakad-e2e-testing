import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeText: Locator;
  readonly academicMenu: Locator;
  readonly academicSubMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    this.welcomeText = page.getByText('SELAMAT DATANG', {
      exact: true
    });

    this.academicMenu = page.locator('#gm_akademik > a');

    this.academicSubMenu = page.locator(
      '#gm_akademik > ul.sub-menu'
    );
  }

  async openAcademicMenu() {
    if (!(await this.academicSubMenu.isVisible())) {
      await this.academicMenu.click();
    }

    await this.academicSubMenu.waitFor({
      state: 'visible'
    });
  }
}