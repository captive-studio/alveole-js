import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Le fond d'une page est une surface du design system, pas un effet : un dégradé fait varier
// la couleur selon la hauteur, et aucun contenu posé dessus ne peut s'accorder à la palette.
// Monté de jsdom au navigateur (ADR 0027).
test('pose une surface unie, sans dégradé', async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Page');

  const degrades = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll('main *')).filter(element =>
        window.getComputedStyle(element).backgroundImage.includes('gradient'),
      ).length,
  );

  expect(degrades).toBe(0);
});
