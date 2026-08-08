import { expect, test } from '@playwright/test';

test.describe('Navigation — homepage', () => {
  test('renders the hero heading and primary nav', async ({ page }) => {
    await page.goto('/en');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Lucas Morais'
    );
    await expect(
      page.getByRole('navigation', { name: 'Primary' })
    ).toBeVisible();
  });

  test('scrolls to a section when a nav link is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/en');

    await page.getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator('#projects')).toBeVisible();
  });

  test('opens and closes the mobile menu drawer', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en');

    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible();

    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(page.getByRole('dialog', { name: 'Menu' })).toHaveCount(0);
  });
});

test.describe('Navigation — article pages', () => {
  test('shows a not-found message and keeps the brand link home for an unknown slug', async ({
    page,
  }) => {
    await page.goto('/articles/this-slug-does-not-exist');

    await expect(page.getByText('Article not found.')).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'lucasheartcliff' })
    ).toHaveAttribute('href', '/');
  });
});
