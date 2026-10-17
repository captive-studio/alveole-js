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
  const pouce = await piste.locator('.is_SwitchThumb').boundingBox();

  expect({ largeur: boite?.width, hauteur: boite?.height }).toEqual({
    largeur: 2 * pouce!.width + 4,
    hauteur: pouce!.height + 4,
  });
});
