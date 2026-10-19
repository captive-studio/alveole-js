import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// Tamagui v1 ajoutait 4 px à la piste, la place du padding et de la bordure qu'Alveole pose de
// chaque côté ; la v2 ne les compte plus, et le pouce débordait de sa piste.
test('loge le pouce dans sa piste, padding et bordure compris', async ({ page }) => {
  await openRoute(page, '/components/Switch');
  const piste = page.getByRole('main').getByRole('switch').first();

  const boite = await piste.boundingBox();
  const pouce = await piste.locator('[data-disable-theme]').boundingBox();

  expect({ largeur: boite?.width, hauteur: boite?.height }).toEqual({
    largeur: 2 * pouce!.width + 4,
    hauteur: pouce!.height + 4,
  });
});

// Tamagui v3 estompe sa piste désactivée à 0.45 d'opacité, par-dessus les couleurs désactivées
// qu'Alveole pose déjà.
test('ne double pas les couleurs désactivées d une opacité', async ({ page }) => {
  await openRoute(page, '/components/Switch');
  const piste = page.getByRole('main').getByRole('switch', { disabled: true }).first();

  await expect(piste).toHaveCSS('opacity', '1');
});

// Tamagui v3 ombre son pouce ; celui d'Alveole est plat, sa bordure suffit à le détacher.
test('garde au pouce son aplat, sans ombre', async ({ page }) => {
  await openRoute(page, '/components/Switch');
  const pouce = page.getByRole('main').getByRole('switch').first().locator('[data-disable-theme]');

  await expect(pouce).toHaveCSS('box-shadow', 'none');
});
