import { expect, test } from '@playwright/test';

test('renders a non-empty title and description on the homepage', async ({
  page,
}) => {
  await page.goto('/en');

  await expect(page).toHaveTitle(/.+/);
  const description = await page
    .locator('head meta[name="description"]')
    .getAttribute('content');
  expect(description).toBeTruthy();
});

const cases: [locale: string, descriptionStart: string][] = [
  ['en', 'I am a Software Engineer'],
  ['pt', 'Sou Engenheiro de Software'],
  ['es', 'Soy Ingeniero de Software'],
  ['ja', '私はフルスタック開発に強みを持つ'],
];

for (const [locale, descriptionStart] of cases) {
  test(`sets og:locale and a translated description on /${locale}`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`);

    await expect(
      page.locator('head meta[property="og:locale"]')
    ).toHaveAttribute('content', locale);

    const description = await page
      .locator('head meta[name="description"]')
      .getAttribute('content');
    expect(description).toContain(descriptionStart);
  });
}
