import { expect, test, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Le rendu de Link monté de jsdom au navigateur (ADR 0027) : le soulignement, la couleur et
// la mise en ligne n'y valaient que ce que le style déclaré disait. Les styles par état sont
// tenus au niveau 1 (Link.styles.test.web.tsx) ; ici, on vérifie qu'ils arrivent au lien rendu.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Link');
});

const lien = (page: Page) => page.getByRole('main').getByRole('link', { name: 'la documentation', exact: true });

const rendu = (page: Page) =>
  lien(page).evaluate(element => {
    const style = window.getComputedStyle(element);
    return { soulignement: style.textDecorationLine, display: style.display };
  });

// Un lien de texte vit au milieu d'une phrase : aucun de ses éléments ne doit la couper.
test('souligne le lien au repos, dans le fil du texte', async ({ page }) => {
  expect(await rendu(page)).toEqual({ soulignement: 'underline', display: 'inline' });
});

test('retire le soulignement au survol', async ({ page }) => {
  await lien(page).hover();

  await expect.poll(async () => (await rendu(page)).soulignement).toBe('none');
});
