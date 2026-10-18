import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Les superpositions passent par le portail de Tamagui, que la v2 a refondu (setup-teleport) :
// elles doivent toujours s'ouvrir et se refermer depuis le catalogue (ALV-118).

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

test('ouvre un Popover au clic et le referme à Échap', async ({ page }) => {
  await openRoute(page, '/components/Popover');
  const contenu = page.getByText('Contenu du popover', { exact: true });

  await page.getByRole('main').getByRole('button', { name: 'bottom', exact: true }).click();
  await expect(contenu).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(contenu).toBeHidden();
});

// Les aperçus statiques de la fiche portent aussi un bouton de fermeture : la notification
// présentée est celle que le portail rend hors de la fiche.
test('présente un Toast au clic et le ferme par son bouton', async ({ page }) => {
  await openRoute(page, '/components/Toast');
  const fermer = page.locator('[aria-label="Fermer la notification"]:not(main *)');

  await page.getByRole('main').getByRole('button', { name: 'Success toast', exact: true }).click();
  await expect(fermer).toBeVisible();

  await fermer.click();
  await expect(fermer).toBeHidden();
});

// Chaque exemple monte sa feuille, fermée hors de l'écran avec son bouton : ouvrir le premier
// exemple fait entrer le sien dans la fenêtre, le fermer l'en fait sortir.
test('ouvre une BottomSheet au clic et la ferme par son bouton', async ({ page }) => {
  await openRoute(page, '/components/BottomSheet');
  const fermer = page.getByRole('button', { name: 'Fermer', exact: true }).first();
  await expect(fermer).not.toBeInViewport();

  await page.getByRole('main').getByRole('button', { name: 'Ouvrir la modal' }).first().click();
  await expect(fermer).toBeInViewport();

  await fermer.click();
  await expect(fermer).not.toBeInViewport();
});

// Tamagui v3 remplace le Frame du Sheet par un Container et un Background : la feuille
// ouverte doit garder son fond blanc et le voile qui assombrit la page.
test('ouvre une BottomSheet sur fond blanc derrière un voile', async ({ page }) => {
  await openRoute(page, '/components/BottomSheet');

  await page.getByRole('main').getByRole('button', { name: 'Ouvrir la modal' }).first().click();
  const feuille = page.getByRole('dialog', { name: 'Titre' }).first();
  await expect(feuille).toBeInViewport();

  await expect(feuille.locator('[data-sheet-background]')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  // Le voile ne porte aucun marqueur : c'est lui qui couvre le coin de la page.
  const fondDuCoin = () => page.evaluate(() => getComputedStyle(document.elementFromPoint(5, 5)!).backgroundColor);
  await expect.poll(fondDuCoin).toMatch(/^rgba\(.+, 0\.5\)$/);
});
