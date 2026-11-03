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

// Atteinte a la tabulation, la case montre un anneau ; Entree la selectionne comme un clic.
test('selectionne une nuance au clavier, avec un focus visible', async ({ page }) => {
  await caseFocus(page).focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');

  await expect(caseFocus(page)).toBeFocused();
  await expect(caseFocus(page)).not.toHaveCSS('outline-style', 'none');

  await page.keyboard.press('Enter');

  await expect(caseFocus(page)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('main').getByText('Focus 525')).toBeVisible();
});
