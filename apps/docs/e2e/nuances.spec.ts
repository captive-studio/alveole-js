import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Le lien d'une nuance navigue cote client vers la page des tokens : jsdom ne prouve que son
// `href`, seul le navigateur montre que la ligne visee arrive a l'ecran (ADR 0027).
test('mene d une nuance a la ligne du token qui la cite', async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/theme/nuances');

  await page.getByRole('main').getByRole('link', { name: 'light.system.focus' }).click();

  await expect(page).toHaveURL(/\/theme\/tokens-semantiques#light\.system\.focus$/);
  await expect(page.locator('[id="light.system.focus"]')).toBeInViewport();
});
