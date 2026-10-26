import { expect, test } from '@playwright/test';
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

// Le zoom au survol ne se voit que sur une page réellement rendue : sans PDF chargé, le canvas
// reste à une taille nulle et doubler zéro ne prouve rien.
test('agrandit la page rendue au survol du PDF', async ({ page }) => {
  await openRoute(page, '/components/DocumentViewer');
  const cadre = page
    .getByRole('main')
    .locator('document-viewer-wrapper')
    .filter({ hasNotText: 'Contenu enfant' })
    .locator('document-viewer-pdf')
    .first();
  const canvas = cadre.locator('canvas');
  await cadre.scrollIntoViewIfNeeded();
  await expect.poll(async () => (await canvas.boundingBox())?.width ?? 0).toBeGreaterThan(50);
  const auRepos = (await canvas.boundingBox())!;

  await cadre.hover();

  await expect.poll(async () => (await canvas.boundingBox())?.width ?? 0).toBeCloseTo(auRepos.width * 2, 0);
});
