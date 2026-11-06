import { Page, Locator, expect } from '@playwright/test';

export class JadwalPage {
  readonly page: Page;
  readonly jadwalMenu: Locator;
  readonly pageTitle: Locator;
  readonly scheduleTable: Locator;

  constructor(page: Page) {
    this.page = page;

    this.jadwalMenu = page.locator(
      '#gm_akademik a[title="Jadwal Perkuliahan"]'
    );

    this.pageTitle = page.locator('#portlet_caption_title');

    this.scheduleTable = page.locator('#mytable');
  }

    async openJadwal() {
      await this.jadwalMenu.waitFor({
        state: 'visible'
      });
  
      await this.jadwalMenu.click();
  
      await expect(this.pageTitle).toHaveText(
        'Jadwal Perkuliahan'
      );
  
      await expect(this.scheduleTable).toBeVisible();
    }

  getCourseRow(courseName: string) {
    return this.scheduleTable.getByRole('row').filter({
      has: this.page.getByRole('cell', {
        name: courseName,
        exact: true
      })
    });
  }
}