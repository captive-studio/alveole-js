import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// La ligne étire ses colonnes à la hauteur de la plus haute ; sans que la carte, et le lien
// qui la porte, remplissent leur colonne, chaque carte gardait la hauteur de son contenu et
// une même ligne mêlait des cartes de tailles différentes. jsdom ne calcule pas de mise en
// page : seule une hauteur rendue le prouve (ADR 0027).
test('les cartes d’une même ligne ont la même hauteur', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await openRoute(page, '/components/Grid');

  const ligne = page.locator('grid-container').filter({ hasText: 'Carte cliquable' });
  const hauteurs = await ligne
    .locator('card')
    .evaluateAll(cartes => cartes.map(carte => Math.round(carte.getBoundingClientRect().height)));

  expect(hauteurs).toHaveLength(3);
  expect(new Set(hauteurs).size).toBe(1);
});

// Une fois les cartes à la même hauteur, leurs actions descendent en bas : sans quoi elles
// restaient sous le texte, à une hauteur différente d'une carte à l'autre.
test('les actions des cartes d’une même ligne sont alignées en bas', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await openRoute(page, '/components/Grid');

  const ligne = page.locator('grid-container').filter({ hasText: 'Carte cliquable' });
  const basDesActions = await ligne
    .locator('card-actions')
    .evaluateAll(actions => actions.map(action => Math.round(action.getBoundingClientRect().bottom)));

  expect(basDesActions).toHaveLength(2);
  expect(new Set(basDesActions).size).toBe(1);
});
