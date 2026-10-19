import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// Tamagui v3 estompe sa case désactivée à 0.45 d'opacité, par-dessus les couleurs désactivées
// qu'Alveole pose déjà : la case cochée désactivée tombait à moitié de son gris.
test('ne double pas les couleurs désactivées d une opacité', async ({ page }) => {
  await openRoute(page, '/components/Checkbox');
  const caseDesactivee = page.getByRole('main').getByRole('checkbox', { disabled: true }).first();

  await expect(caseDesactivee).toHaveCSS('opacity', '1');
});
