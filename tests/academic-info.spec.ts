import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { JadwalPage } from '../pages/JadwalPage';

test.describe('SIAKAD Polinema - Academic Information', () => {
  test('Mahasiswa berhasil melihat jadwal perkuliahan', async ({ page }) => {
    const username = process.env.SIAKAD_USERNAME;
    const password = process.env.SIAKAD_PASSWORD;

    test.skip(!username || !password, 'Kredensial pengujian belum dikonfigurasi');

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const jadwalPage = new JadwalPage(page);

    await loginPage.goto();
    await loginPage.login(username!, password!);

    await expect(dashboardPage.welcomeText).toBeVisible();

    await dashboardPage.openAcademicMenu();
    await jadwalPage.openJadwal();

    await expect(
      page.getByRole('heading', {
        name: /Tahun Akademik/
      })
    ).toBeVisible();

    await expect(jadwalPage.scheduleTable).toBeVisible();

    const courseRow = jadwalPage.getCourseRow(
      'Administrasi dan Keamanan Jaringan'
    );

    await expect(courseRow).toBeVisible();
    await expect(courseRow).toContainText('Senin');
    await expect(courseRow).toContainText('10:35 - 14:25');
  });
});