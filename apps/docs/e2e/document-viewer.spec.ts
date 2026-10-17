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
  await exemple.scrollIntoViewIfNeeded();
  const bouton = await exemple.getByRole('button', { name: 'Page suivante' }).boundingBox();

  const auDessus = await exemple.evaluate(
    (_racine, { x, y }) => document.elementFromPoint(x, y)?.closest('document-viewer-children')?.tagName ?? null,
    { x: bouton!.x + bouton!.width / 2, y: bouton!.y + bouton!.height / 2 },
  );

  expect(auDessus).toBe('DOCUMENT-VIEWER-CHILDREN');
});
