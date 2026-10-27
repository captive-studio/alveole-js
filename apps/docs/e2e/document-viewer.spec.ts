import { expect, type Page, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// Tamagui v2 ne pose plus `position: relative` sur chaque vue : le panneau des enfants, rendu
// après la barre d'outils, ne couvrait plus le bouton de page suivante qui déborde sous lui, et
// ce bouton se dessinait par-dessus le contenu enfant.
test('garde le contenu enfant au-dessus de la barre d outils qui déborde', async ({ page }) => {
  await openRoute(page, '/components/DocumentViewer');
  const exemple = page.getByRole('main').locator('document-viewer-wrapper').filter({ hasText: 'Contenu enfant' });
  // La story prend toute la largeur disponible : à cette taille la barre peut tenir
  // sans déborder. On contraint le cadre pour reproduire le chevauchement à protéger.
  await exemple.evaluate(element => {
    element.style.width = '400px';
  });
  await exemple.locator('document-viewer-toolbar').scrollIntoViewIfNeeded();
  const bouton = await exemple.getByRole('button', { name: 'Page suivante' }).boundingBox();
  const panneau = await exemple.locator('document-viewer-children').boundingBox();
  expect(bouton).not.toBeNull();
  expect(panneau).not.toBeNull();
  const point = { x: bouton!.x + bouton!.width / 2, y: bouton!.y + bouton!.height / 2 };
  // Le point sondé doit réellement être dans la zone de chevauchement.
  expect(point.x).toBeGreaterThan(panneau!.x);
  expect(point.x).toBeLessThan(panneau!.x + panneau!.width);
  expect(point.y).toBeGreaterThan(panneau!.y);
  expect(point.y).toBeLessThan(panneau!.y + panneau!.height);

  const auDessus = await exemple.evaluate(
    (_racine, { x, y }) => document.elementFromPoint(x, y)?.closest('document-viewer-children')?.tagName ?? null,
    point,
  );

  expect(auDessus).toBe('DOCUMENT-VIEWER-CHILDREN');
});

const cadrePdf = (page: Page) =>
  page
    .getByRole('main')
    .locator('document-viewer-wrapper')
    .filter({ hasNotText: 'Contenu enfant' })
    .locator('document-viewer-pdf')
    .first();

// Le zoom ne se voit que sur une page réellement rendue : sans PDF chargé, le canvas reste à
// une taille nulle et agrandir zéro ne prouve rien.
test('zoome la page à Ctrl + molette, et laisse la molette seule faire défiler', async ({ page }) => {
  await openRoute(page, '/components/DocumentViewer');
  const cadre = cadrePdf(page);
  const canvas = cadre.locator('canvas');
  await cadre.scrollIntoViewIfNeeded();
  await expect.poll(async () => (await canvas.boundingBox())?.width ?? 0).toBeGreaterThan(50);
  const auRepos = (await canvas.boundingBox())!;

  await cadre.hover();
  await page.mouse.wheel(0, 100);
  await cadre.hover();
  expect((await canvas.boundingBox())!.width).toBeCloseTo(auRepos.width, 0);

  await page.keyboard.down('Control');
  await page.mouse.wheel(0, -100);
  await page.keyboard.up('Control');

  await expect.poll(async () => (await canvas.boundingBox())?.width ?? 0).toBeCloseTo(auRepos.width * 1.25, 0);
});

test('affiche le visualiseur en plein écran puis en sort', async ({ page }) => {
  await openRoute(page, '/components/DocumentViewer');
  const viewer = page.getByRole('main').locator('document-viewer').first();

  await viewer.getByRole('button', { name: 'Afficher en plein ecran' }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement?.tagName ?? null)).toBe('DOCUMENT-VIEWER');

  await viewer.getByRole('button', { name: 'Quitter le plein ecran' }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement)).toBeNull();
});
