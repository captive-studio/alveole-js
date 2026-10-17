import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// Tamagui v2 ne pose plus `position: relative` sur chaque vue : la barre animée du mode
// indéterminé, en `position: absolute` étirée de haut en bas, ne se rapportait plus à son rail
// mais à un ancêtre lointain, et couvrait toute la hauteur de la fiche.
test('garde chaque barre animée dans la hauteur de son rail', async ({ page }) => {
  await openRoute(page, '/components/ProgressBar');

  const hauteurs = await page
    .getByRole('main')
    .locator('*')
    .evaluateAll(elements =>
      elements
        .filter(
          element =>
            window.getComputedStyle(element).position === 'absolute' &&
            element.parentElement?.getBoundingClientRect().height === 8,
        )
        .map(element => element.getBoundingClientRect().height),
    );

  expect(hauteurs.length).toBeGreaterThan(0);
  expect(hauteurs.every(hauteur => hauteur === 8)).toBe(true);
});
