import { expect, test, type Locator } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';
import { bords } from './mesures';

// Le gabarit de l'onglet monté de jsdom au navigateur (ADR 0027) : le retrait déclaré est
// tenu au niveau 1 (Tabs.styles.test.tsx) ; la hauteur qu'il produit ne se lit qu'ici.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

const hauteur = async (element: Locator) => {
  const { haut, bas } = await bords(element);
  return bas - haut;
};

// A '025'/'050', l'onglet inactif tombait sur la hauteur du contrôle sm (28) : à côté d'un
// bouton md il se lisait comme un cran plus petit que les autres commandes de la page.
test('pose l onglet inactif au gabarit d un bouton md', async ({ page }) => {
  await openRoute(page, '/components/Button');
  const bouton = await hauteur(page.getByRole('main').getByRole('button', { name: 'Bouton md' }));
  await openRoute(page, '/components/Tabs');
  // La pastille est l'enveloppe du libellé, premier enfant de l'onglet.
  const onglet = await hauteur(page.getByRole('main').getByRole('tab', { name: 'Onglet 3' }).locator('xpath=*[1]'));

  expect(bouton).toBeGreaterThan(0);
  expect(onglet).toBe(bouton);
});
