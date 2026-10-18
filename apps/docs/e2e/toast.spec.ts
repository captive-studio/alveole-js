import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// Tamagui v3 remplace l'API impérative du Toast par une file globale : jsdom ne dit pas si la
// notification se dessine réellement à l'écran.
test('affiche la notification déclenchée depuis le catalogue', async ({ page }) => {
  await openRoute(page, '/components/Toast');

  await page.getByRole('button', { name: 'Success toast' }).press('Enter');

  await expect(page.getByText('Success', { exact: true })).toBeVisible();
});
