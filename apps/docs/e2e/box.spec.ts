import { expect, test, type Locator, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Sans tag, Box rend l'élément inconnu <box> (ADR 0024). jsdom ne calcule ni mise en page ni
// arbre d'accessibilité : seul le navigateur prouve qu'il vaut une div (ADR 0027).

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  await page.setViewportSize({ width: 1400, height: 900 });
  await openRoute(page, '/components/Box');
});

const sansTag = (page: Page) => page.locator('box-comparaison > box');
const enDiv = (page: Page) => page.locator('box-comparaison > div');

const boite = (box: Locator) =>
  box.evaluate(element => {
    const { width, height } = element.getBoundingClientRect();
    return { display: window.getComputedStyle(element).display, width: Math.round(width), height: Math.round(height) };
  });

test('une Box sans tag a la même boîte qu’une Box en div', async ({ page }) => {
  expect(await boite(sansTag(page))).toEqual(await boite(enDiv(page)));
});

test('une Box sans tag n’expose ni rôle ni nom accessible', async ({ page }) => {
  expect(await sansTag(page).ariaSnapshot()).toBe('- text: Box sans tag');
});

// Tamagui v3 rend `flex: 1` en base `0px` : dans un parent de hauteur indéfinie, la boîte tombait
// à zéro. jsdom ne met rien en page, seul le navigateur prouve la hauteur du contenu.
for (const source of ['prop', 'style', 'tableau']) {
  test(`flex: 1 en ${source} garde la hauteur de son contenu`, async ({ page }) => {
    const { height } = await boite(page.locator(`box-flex-en-${source}`));

    expect(height).toBeGreaterThan(0);
  });
}

// Un style en tableau imbriqué posé tel quel sur le DOM faisait tomber la page entière : jsdom,
// lui, perd seulement le style, seul le navigateur prouve que la page tient.
for (const forme of ['objet', 'tableau', 'imbrique']) {
  test(`un style ${forme} est appliqué`, async ({ page }) => {
    const paddingLeft = await page
      .locator(`box-style-${forme}`)
      .evaluate(element => window.getComputedStyle(element).paddingLeft);

    expect(paddingLeft).toBe('48px');
  });
}

// La correction de flex se fusionnait au style de l'appelant en perdant le reste d'un tableau.
test('garde le style de l appelant avec la correction de flex', async ({ page }) => {
  await expect(page.locator('box-flex-en-tableau')).toHaveCSS('padding-left', '48px');
});
