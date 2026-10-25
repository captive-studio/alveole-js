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
