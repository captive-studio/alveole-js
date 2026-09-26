import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// L'ancre est `opacity: 0` hors survol : atteinte au clavier, on se retrouvait sur un lien
// entièrement invisible. Monté de jsdom au navigateur (ADR 0027), où le focus vient
// réellement du clavier.
test('fait apparaître l ancre quand elle prend le focus au clavier', async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/AnchorHeading');
  const ancre = page
    .getByRole('main')
    .getByRole('link', { name: /Mon exemple de titre/ })
    .first();
  const opacite = () => ancre.evaluate(e => window.getComputedStyle(e).opacity);

  // Tab depuis l'élément qui précède l'ancre dans l'ordre de tabulation : le focus vient
  // alors vraiment du clavier, et non d'un `focus()` programmatique.
  await ancre.evaluate(e => {
    const avant = document.createElement('button');
    avant.id = 'avant-l-ancre';
    e.parentElement!.insertBefore(avant, e);
  });
  await page.locator('#avant-l-ancre').focus();
  await page.keyboard.press('Tab');

  await expect(ancre).toBeFocused();

  await expect.poll(opacite).toBe('1');
});
