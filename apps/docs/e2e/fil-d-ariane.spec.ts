import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';
import { bords } from './mesures';

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// En Tamagui v2, le libellé de la page courante, qui ne portait que sa couleur, recevait la
// hauteur de ligne par défaut du texte au lieu de celle du cran du fil : 23 px contre 20, et
// chaque fiche du catalogue descendait de 3 px.
test('aligne la page courante du fil d Ariane sur ses liens', async ({ page }) => {
  await openRoute(page, '/components/Divider');
  const fil = page.locator('breadcrumbs');

  const lien = await bords(fil.getByText('Components', { exact: true }));
  const courante = await bords(fil.getByText('Divider', { exact: true }));

  expect(courante).toEqual(lien);
});
