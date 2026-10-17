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

// Tamagui v2 ne fait plus descendre un style de texte d'une vue à ses enfants : le libellé d'un
// badge à icône, qui héritait du cran posé sur le badge, perdait sa hauteur de ligne et
// remontait d'un pixel et demi.
test('donne au libellé d un badge à icône la hauteur de ligne de son cran', async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Badge');
  const libelle = page
    .getByRole('main')
    .locator('badge')
    .filter({ has: page.locator('svg') })
    .first()
    .locator('badge-text');

  const hauteurs = await libelle.evaluate(texte => {
    const sonde = document.createElement('span');
    sonde.style.lineHeight = 'var(--typography-corps-de-texte-xs-capsbold-line-height)';
    document.body.appendChild(sonde);
    const attendue = window.getComputedStyle(sonde).lineHeight;
    sonde.remove();

    return { rendue: window.getComputedStyle(texte).lineHeight, attendue };
  });

  expect(hauteurs.rendue).toBe(hauteurs.attendue);
});
