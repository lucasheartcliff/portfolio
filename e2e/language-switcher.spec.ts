import { expect, test } from '@playwright/test';

const LOCALES = ['en', 'pt', 'es', 'it', 'fr', 'de', 'zh', 'ru', 'ja', 'ko'];

test.describe('Language switcher — desktop nav', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('lists every supported locale in the dropdown', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: 'Change language' }).click();

    // eslint-disable-next-line no-restricted-syntax -- sequential checks read clearest here
    for (const code of LOCALES) {
      // eslint-disable-next-line no-await-in-loop -- each assertion depends on the shared dropdown state
      await expect(
        page.getByRole('option', { name: code, exact: true })
      ).toBeVisible();
    }
  });

  test('switches locale, updates the URL, and renders translated chrome', async ({
    page,
  }) => {
    await page.goto('/en');
    await expect(
      page.getByRole('link', { name: 'About', exact: true })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Change language' }).click();
    await page.getByRole('option', { name: 'es', exact: true }).click();

    await page.waitForURL('**/es/**');
    await expect(
      page.getByRole('button', { name: 'Change language' })
    ).toContainText('es');
    await expect(page.getByRole('link', { name: 'Sobre mí' })).toBeVisible();
  });

  test('switches into a non-Latin script locale and renders translated chrome', async ({
    page,
  }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: 'Change language' }).click();
    await page.getByRole('option', { name: 'ja', exact: true }).click();

    await page.waitForURL('**/ja/**');
    await expect(page.getByRole('link', { name: '自己紹介' })).toBeVisible();
  });
});

test.describe('Language switcher — mobile drawer', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('switches locale from the drawer, opening the dropdown upward without clipping or overflowing the drawer', async ({
    page,
  }) => {
    await page.goto('/en');
    await page.getByRole('button', { name: 'Open menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Menu' });
    await expect(dialog).toBeVisible();

    await page.getByRole('button', { name: 'Change language' }).click();
    const listbox = page.getByRole('listbox', { name: 'Language' });
    const koOption = page.getByRole('option', { name: 'ko', exact: true });
    await expect(koOption).toBeVisible();

    // The toggle button sits at the drawer's left edge, so the dropdown must
    // open toward the drawer's interior — not toward the backdrop outside it.
    const dialogBox = await dialog.boundingBox();
    const listboxBox = await listbox.boundingBox();
    expect(dialogBox).not.toBeNull();
    expect(listboxBox).not.toBeNull();
    expect(listboxBox!.x).toBeGreaterThanOrEqual(dialogBox!.x - 1);

    const box = await koOption.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(812);

    await koOption.click();
    await page.waitForURL('**/ko/**');
  });
});
