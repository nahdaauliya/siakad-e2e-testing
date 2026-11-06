import { Page, Locator, expect } from '@playwright/test';

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
      const getMenuState = async () => {
        return await this.academicSubMenu.evaluate((element) => {
          const style = window.getComputedStyle(element);
          const parent = document.querySelector('#gm_akademik');
        
          return {
            parentClass: parent?.getAttribute('class'),
            inlineStyle: element.getAttribute('style'),
            display: style.display,
            visibility: style.visibility,
            height: style.height
          };
        });
      };
  
      console.log(
        'SEBELUM KLIK:',
        await getMenuState()
      );
  
      await this.academicMenu.click();
  
      console.log(
        'SESUDAH KLIK:',
        await getMenuState()
      );
  
      await expect(this.academicSubMenu).toBeVisible();
    }
}