import { expect, type Page, test } from '@playwright/test';
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

// La repartition flex des cases n'existe qu'au navigateur : jsdom ne calcule aucune largeur.
test('etale les cases d une echelle sur toute la ligne, chaque numero tenant dans sa case', async ({ page }) => {
  const premiere = page.getByRole('main').getByRole('button', { name: 'Neutre 50' });
  const mesure = await premiere.evaluate(element => {
    const cases = element.parentElement as HTMLElement;
    const ligne = cases.parentElement as HTMLElement;
    const nom = ligne.firstElementChild as HTMLElement;
    const horsBande = ligne.lastElementChild as HTMLElement;
    const debordements = Array.from(cases.children).filter(
      caseDeNuance => caseDeNuance.scrollWidth > caseDeNuance.clientWidth,
    ).length;
    return {
      occupee: cases.getBoundingClientRect().width,
      contenu: cases.scrollWidth - cases.clientWidth,
      disponible: horsBande.getBoundingClientRect().left - nom.getBoundingClientRect().right,
      debordements,
    };
  });

  expect(mesure.occupee).toBeGreaterThan(mesure.disponible - 1);
  expect(mesure.contenu).toBe(0);
  expect(mesure.debordements).toBe(0);
});

// Le panneau suit le defilement a cote de la grille (US 8) : meme a 1280 px, il ne passe jamais dessous.
test('garde le panneau a droite de la grille a 1280 px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  const panneau = await page.getByRole('main').getByText('Sélectionnez une nuance').boundingBox();
  const premiereLigne = await page.getByRole('main').getByText('GrisPolaire', { exact: true }).boundingBox();

  expect(panneau?.x).toBeGreaterThan((premiereLigne?.x ?? 0) + (premiereLigne?.width ?? 0));
  expect(panneau?.y).toBeLessThan((premiereLigne?.y ?? 0) + (premiereLigne?.height ?? 0));
});

/** Ce qui deborde de la zone de grille, en pixels : nul quand tout se voit sans defiler. */
const debordementDeLaGrille = (page: Page) =>
  page
    .getByRole('main')
    .getByRole('region', { name: 'Échelles de nuances' })
    .evaluate(zone => zone.scrollWidth - zone.clientWidth);

// Faute de place, c'est la zone de grille qui defile, jamais le panneau qui descend.
test('fait defiler la grille a 1280 px et la montre entiere a 1440 px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  expect(await debordementDeLaGrille(page)).toBeGreaterThan(0);

  await page.setViewportSize({ width: 1440, height: 720 });
  expect(await debordementDeLaGrille(page)).toBe(0);
});
