import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';
import { valeurCalculee } from './mesures';

// La story déclare `Map.styles` en `styleFn`, donc le catalogue l'affiche comme les styles du
// composant : la carte web posait pourtant son propre style en ligne, d'un rayon différent.
// Monté de jsdom au navigateur (ADR 0027). Le trafic tiers est coupé : la carte reste vide,
// mais son conteneur est rendu.
test('rend la carte sur le rayon lg du thème', async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Map');

  const attendu = await valeurCalculee(page, 'borderTopLeftRadius', 'var(--radius-lg)');
  // Le conteneur de la carte est l'unique enfant de la boîte de 400 px que pose la story.
  const rendus = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLElement>('main *'))
      .filter(element => element.parentElement?.style.height === '400px' && element.parentElement.children.length === 1)
      .map(carte => window.getComputedStyle(carte).borderTopLeftRadius),
  );

  expect(rendus.length).toBeGreaterThan(0);
  expect(new Set(rendus)).toEqual(new Set([attendu]));
});
