import { expect, type Locator, type Page, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/theme/nuances');
});

/** La case de la bande Focus : l'echelle n'a qu'un cran cite par `light.system.focus`. */
const caseFocus = (page: Page) => page.getByRole('main').getByRole('button', { name: 'Focus 525' });

// Le lien d'une nuance navigue cote client vers la page des tokens : jsdom ne prouve que son
// `href`, seul le navigateur montre que la ligne visee arrive a l'ecran (ADR 0027).
test('mene d une nuance selectionnee a la souris a la ligne du token qui la cite', async ({ page }) => {
  await caseFocus(page).click();
  await page.getByRole('main').getByRole('link', { name: 'light.system.focus' }).click();

  await expect(page).toHaveURL(/\/theme\/tokens-semantiques#light\.system\.focus$/);
  await expect(page.locator('[id="light.system.focus"]')).toBeInViewport();
});

// Atteinte a la tabulation, la case montre un anneau avant toute selection : c'est le focus, pas
// le cerne de la nuance choisie. Entree la selectionne ensuite comme un clic.
test('selectionne une nuance au clavier, avec un focus visible', async ({ page }) => {
  await caseFocus(page).focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');

  await expect(caseFocus(page)).toBeFocused();
  await expect(caseFocus(page)).toHaveAttribute('aria-pressed', 'false');
  await expect(caseFocus(page)).not.toHaveCSS('outline-style', 'none');

  await page.keyboard.press('Enter');

  await expect(caseFocus(page)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('main').getByText('Focus 525')).toBeVisible();
});

// `position: sticky` n'existe pas en jsdom : seul le navigateur montre que le panneau suit le
// defilement jusqu'au bas de la grille.
test('garde le detail de la nuance selectionnee a l ecran pendant le defilement', async ({ page }) => {
  await caseFocus(page).click();
  await page.mouse.wheel(0, 100_000);

  await expect(page.getByRole('main').getByRole('table', { name: 'Échelle Focus' })).toBeInViewport();
});

/** La boite d'un element affiche : son absence fait echouer le test plutot que de le fausser. */
const boiteDe = async (locator: Locator) => {
  const boite = await locator.boundingBox();
  if (!boite) throw new Error('élément non affiché');
  return boite;
};

/** Ce qui deborde d'un element, en pixels : nul quand tout son contenu se voit. */
const debordementDe = (locator: Locator) => locator.evaluate(element => element.scrollWidth - element.clientWidth);

const parent = (locator: Locator) => locator.locator('xpath=..');

// La repartition flex des cases n'existe qu'au navigateur : jsdom ne calcule aucune largeur.
test('etale les cases d une echelle sur toute la ligne, chaque numero tenant dans sa case', async ({ page }) => {
  const cases = parent(page.getByRole('main').getByRole('button', { name: 'Neutre 50', exact: true }));
  const ligne = parent(cases);
  const nom = await boiteDe(ligne.locator('xpath=*').first());
  const horsBande = await boiteDe(ligne.locator('xpath=*').last());

  expect((await boiteDe(cases)).width).toBeGreaterThan(horsBande.x - (nom.x + nom.width) - 1);
  expect(await debordementDe(cases)).toBe(0);
  for (const caseDeNuance of await cases.locator('xpath=*').all()) expect(await debordementDe(caseDeNuance)).toBe(0);
});

// Le panneau suit le defilement a cote de la grille (US 8) : meme a 1280 px, il ne passe jamais dessous.
test('garde le panneau a droite de la grille a 1280 px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  const panneau = await boiteDe(page.getByRole('main').getByText('Sélectionnez une nuance'));
  const premiereLigne = await boiteDe(page.getByRole('main').getByText('GrisPolaire', { exact: true }));

  expect(panneau.x).toBeGreaterThan(premiereLigne.x + premiereLigne.width);
  expect(panneau.y).toBeLessThan(premiereLigne.y + premiereLigne.height);
});

/** La zone qui defile : le premier ancetre d'une case dont le debordement horizontal est `auto`. */
const zoneDeGrille = (page: Page) =>
  page
    .getByRole('main')
    .getByRole('button', { name: 'GrisPolaire 50', exact: true })
    .locator('xpath=ancestor::*[contains(@style, "overflow-x: auto")][1]');

// Faute de place, c'est la zone de grille qui defile, jamais le panneau qui descend.
test('fait defiler la grille a 1280 px et la montre entiere a 1440 px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  expect(await debordementDe(zoneDeGrille(page))).toBeGreaterThan(0);

  await page.setViewportSize({ width: 1440, height: 720 });
  expect(await debordementDe(zoneDeGrille(page))).toBe(0);
});
