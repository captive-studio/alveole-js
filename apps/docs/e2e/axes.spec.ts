import { expect, test, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Chaque valeur d'un axe de variante Figma a son exemple d'axe dans la fiche (ADR 0030) : le
// relevé des écarts de maquette le retrouve par son nom, sans table de correspondance.

// Une seule page pour tous les tests : ils ne la modifient pas, et chaque chargement de fiche
// coûte plusieurs secondes.
test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await blockThirdParties(page);
  await openRoute(page, '/components/Button');
});

test.afterAll(async () => {
  await page.close();
});

// `state=hover` n'a pas d'exemple propre : un survol ne se fige pas dans une fiche, le relevé
// le mesure en survolant l'exemple `Default`. `leading` et `trailing` sont des propriétés
// booléennes du composant Figma, pas des axes de variante : leur exemple est le bouton qui les
// active.
for (const [valeur, exemple] of [
  ['variant=primary', 'Primary'],
  ['variant=secondary', 'Secondary'],
  ['variant=tertiary', 'Tertiary'],
  ['variant=danger', 'Danger'],
  ['size=sm', 'Sm'],
  ['size=md', 'Md'],
  ['size=lg', 'Lg'],
  ['state=default', 'Default'],
  ['state=selected', 'Selected'],
  ['state=disabled', 'Disabled'],
  ['leading', 'Leading'],
  ['trailing', 'Trailing'],
] as const) {
  test(`donne un exemple à la valeur ${valeur} du Button`, async () => {
    await expect(page.getByRole('main').getByRole('button', { name: exemple, exact: true })).toHaveCount(1);
  });
}
