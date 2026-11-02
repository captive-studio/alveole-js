import { expect, test, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';
import { valeurCalculee } from './mesures';

// Le rendu de MarkdownDescription monté de jsdom au navigateur (ADR 0027) : la bordure de la
// citation et l'apparence des liens n'y valaient que ce que le style déclaré disait.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/MarkdownDescription');
});

const principal = (page: Page) => page.getByRole('main');

test('rend une citation avec une bordure gauche de 2px', async ({ page }) => {
  const citation = principal(page).locator('blockquote').first();

  expect(await citation.evaluate(e => window.getComputedStyle(e).borderLeftWidth)).toBe('2px');
});

// Même bleu que le lien du fil d'Ariane. Le soulignement est permanent au repos : la règle
// `link-in-text-block` (WCAG 1.4.1) exige qu'un lien noyé dans un paragraphe se distingue du
// texte par autre chose que sa couleur. Il disparaît au survol, où le curseur suffit.
test('souligne les liens au repos dans la couleur d information, et plus au survol', async ({ page }) => {
  const lien = principal(page).getByRole('link', { name: 'documentation Markdown' }).first();
  const attendue = await valeurCalculee(page, 'color', 'var(--text-default-info)');
  const rendu = () =>
    lien.evaluate(e => {
      const style = window.getComputedStyle(e);
      return { couleur: style.color, soulignement: style.textDecorationLine };
    });

  const repos = await rendu();
  await lien.hover();

  expect(repos).toEqual({ couleur: attendue, soulignement: 'underline' });
  await expect.poll(async () => (await rendu()).soulignement).toBe('none');
});

// jsdom ne calcule ni les largeurs intrinsèques d'un tableau ni son défilement.
for (const largeur of [390, 1280]) {
  test.describe(`tableau large à ${largeur}px`, () => {
    // Fixer la largeur avant openRoute : un redimensionnement après hydratation peut
    // remonter le contenu du catalogue entre l'attente de visibilité et la mesure.
    test.use({ viewport: { width: largeur, height: 844 } });

    test('fait défiler le tableau sans élargir la page', async ({ page }) => {
      const tableau = principal(page).getByRole('table').filter({ hasText: 'scheduled_tasks_create' });
      const conteneur = tableau.locator('..');

      await expect(conteneur).toBeVisible();
      // Une mesure ponctuelle peut lire 0 pendant un remontage du contenu. Attendre
      // la boîte rendue et son débordement, sans délai fixe ni retry du test entier.
      await expect.poll(() => conteneur.evaluate(e => e.clientWidth > 0 && e.scrollWidth > e.clientWidth)).toBe(true);
      await expect.poll(() => conteneur.evaluate(e => e.clientWidth)).toBeLessThanOrEqual(320);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(largeur);

      await conteneur.focus();
      await page.keyboard.press('ArrowRight');
      await expect.poll(() => conteneur.evaluate(e => e.scrollLeft)).toBeGreaterThan(0);

      await conteneur.evaluate(e => {
        e.scrollLeft = e.scrollWidth;
      });
      expect(await conteneur.evaluate(e => e.scrollLeft)).toBeGreaterThan(0);
      const derniereCellule = tableau.getByRole('cell', { name: "Redémarre l'application", exact: true });
      const cadre = await conteneur.boundingBox();
      const cellule = await derniereCellule.boundingBox();
      expect(cadre).not.toBeNull();
      expect(cellule).not.toBeNull();
      expect(cellule!.x + cellule!.width).toBeLessThanOrEqual(cadre!.x + cadre!.width);
    });
  });
}
