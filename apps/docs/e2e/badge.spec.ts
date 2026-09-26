import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// La taille de l'icône du badge montée de jsdom au navigateur (ADR 0027) : un attribut lu sur
// l'arbre rendu ne disait pas la place qu'elle prend à l'écran.
test('rend l icône d un badge sm à 12px', async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Badge');

  const icone = await page.getByRole('main').locator('badge svg').first().boundingBox();

  expect({ largeur: icone?.width, hauteur: icone?.height }).toEqual({ largeur: 12, hauteur: 12 });
});
