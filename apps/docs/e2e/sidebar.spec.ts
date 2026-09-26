import { expect, test, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Le gabarit de la Sidebar monté de jsdom au navigateur (ADR 0027) : les retraits et les
// jetons de typographie sont tenus au niveau 1 (Sidebar.styles.test.web.tsx) ; la hauteur et
// l'alignement qu'ils produisent ne se lisent qu'ici, sur la colonne du catalogue, qui est une
// Sidebar du kit.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Sidebar');
});

const navigation = (page: Page) => page.locator('nav');

// 32px de haut en tout, comme dans la maquette : 20 de hauteur de ligne plus 6 de part et d'autre.
test('rend un item de 32px de haut', async ({ page }) => {
  const boite = await navigation(page).locator('sidebar-item').first().boundingBox();

  expect(boite?.height).toBe(32);
});

// Primer aligne titre de groupe et items sur la même verticale, au pixel. L'item y arrive par
// trois retraits emboîtés, le titre par un seul.
test('aligne le titre de groupe sur la verticale des libellés de ses items', async ({ page }) => {
  const debutDuTitre = await navigation(page)
    .locator('sidebar-group > :first-child')
    .first()
    .evaluate(titre => titre.getBoundingClientRect().x + parseFloat(window.getComputedStyle(titre).paddingLeft));
  const libelle = await navigation(page).locator('sidebar-item typography').first().boundingBox();

  expect(debutDuTitre).toBeGreaterThan(0);
  expect(libelle?.x).toBe(debutDuTitre);
});
