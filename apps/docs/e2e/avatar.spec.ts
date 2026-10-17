import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Un PNG transparent de 1 × 1 : la photo doit se charger, sans quoi Tamagui affiche le repli et
// la taille de l'image ne se mesure plus.
const PIXEL = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64',
);

// Régression montée de jsdom au navigateur (ADR 0027) : Tamagui lisait la taille numérique `xs`
// (20) comme le jeton $20, la photo s'étalait sur 284 px et le cercle n'en montrait qu'un coin.
test('dimensionne la photo de chaque taille d avatar', async ({ page }) => {
  await blockThirdParties(page);
  await page.route('https://picsum.photos/**', route => route.fulfill({ contentType: 'image/png', body: PIXEL }));
  await openRoute(page, '/components/Avatar');

  const photos = page.getByRole('main').locator('img');
  await expect(photos.first()).toBeVisible();

  // react-native-web enveloppe <img> (toujours à 100 %) dans le bloc qui porte la taille. Les
  // cinq premières photos sont celles de l'exemple Tailles, de xs à xl.
  const tailles = await photos.evaluateAll(images =>
    images.slice(0, 5).map(image => {
      const { width, height } = image.parentElement!.getBoundingClientRect();
      return { largeur: width, hauteur: height };
    }),
  );

  expect(tailles).toEqual([20, 24, 32, 40, 64].map(px => ({ largeur: px, hauteur: px })));
});

// Tamagui v2 rend un vrai <img>, là où react-native-web n'affichait jamais l'icône du navigateur :
// une photo injoignable se montrait cassée par-dessus le repli au lieu de le laisser seul.
test('cache la photo tant qu elle n est pas chargée', async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Avatar');

  const cassees = await page
    .getByRole('main')
    .locator('img')
    .evaluateAll(
      images =>
        images
          .filter((image): image is HTMLImageElement => image instanceof HTMLImageElement)
          .filter(image => image.naturalWidth === 0 && window.getComputedStyle(image).opacity !== '0').length,
    );

  expect(cassees).toBe(0);
});
