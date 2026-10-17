import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// Tamagui v2 traduit `flex: 1` en `flex: 1 1 0px` sur le web, là où la v1 gardait une base
// `auto` : dans un parent sans hauteur fixée, l'écran tombait sous la hauteur de son contenu,
// qui débordait au-dessus et au-dessous.
test("contient tout l'écran de mise à jour dans sa boîte", async ({ page }) => {
  await openRoute(page, '/components/AppUpdateProvider');

  const { hauteur, contenu } = await page
    .locator('update-required')
    .first()
    .evaluate(ecran => ({ hauteur: ecran.clientHeight, contenu: ecran.scrollHeight }));

  expect(hauteur).toBeGreaterThanOrEqual(contenu);
});
