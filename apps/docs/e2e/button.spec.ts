import { expect, test, type Locator, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Le rendu de Button et de ButtonIcon monté de jsdom au navigateur (ADR 0027) : hauteurs,
// bordures et libellé masqué n'y valaient que ce que le style déclaré disait. Les décisions
// sont tenues au niveau 1 (buttonStyling.test.tsx, buttonIconStyling.test.tsx,
// placeDuSpinner.test.ts) ; ici, on vérifie ce qu'elles donnent à l'écran.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Button');
});

const bouton = (page: Page, nom: string) => page.getByRole('main').getByRole('button', { name: nom, exact: true });

const boite = async (element: Locator) => {
  const mesure = await element.boundingBox();

  if (!mesure) throw new Error('élément hors du rendu');

  return mesure;
};

// Les crans de control (ADR 0013), mesurés sur des boutons bordés : sans boxSizing, la bordure
// s'ajoutait au-delà de la hauteur voulue.
for (const [taille, hauteur] of [
  ['sm', 28],
  ['md', 32],
  ['lg', 40],
] as const) {
  test(`rend le bouton ${taille} à ${hauteur}px de haut`, async ({ page }) => {
    expect((await boite(bouton(page, `Bouton ${taille}`))).height).toBe(hauteur);
  });
}

// La bordure structurelle est la même partout : une variante bordée n'est pas plus haute
// qu'une variante pleine.
test('donne la même hauteur aux variantes bordées et pleines', async ({ page }) => {
  const hauteurs = await Promise.all(
    ['Primary', 'Secondary', 'Tertiary', 'Danger'].map(async nom => (await boite(bouton(page, nom))).height),
  );

  expect(hauteurs).toEqual([32, 32, 32, 32]);
});

// Un menu déplié se rend comme un bouton appuyé.
test('donne au bouton déplié le fond de l appui', async ({ page }) => {
  const fond = (nom: string) =>
    bouton(page, nom).evaluate(e => window.getComputedStyle(e.firstElementChild!).backgroundColor);

  expect(await fond('Expanded')).not.toBe(await fond('Normal'));
});

for (const [taille, rang] of [
  ['sm', 0],
  ['md', 1],
  ['lg', 2],
] as const) {
  test(`rend le bouton-icône ${taille} carré`, async ({ page }) => {
    const { width, height } = await boite(
      page.getByRole('main').getByRole('button', { name: "Plus d'actions" }).nth(rang),
    );

    expect(width).toBe(height);
  });
}

// Le spinner prend la place de quelque chose, il ne s'ajoute jamais : faute d'icône, il
// recouvre le libellé, masqué sans quitter le flux, et le bouton garde sa largeur.
test('masque le libellé sous le spinner sans changer la largeur du bouton', async ({ page }) => {
  // Le libellé masqué sort du nom accessible : les éléments se saisissent donc avant le clic,
  // dans la story Loading, dernière de la fiche à porter ces libellés.
  const enregistrer = await bouton(page, 'Enregistrer').last().elementHandle();
  const libelle = await bouton(page, 'Enregistrer').last().getByText('Enregistrer', { exact: true }).elementHandle();
  const exporter = await bouton(page, 'Exporter').last().getByText('Exporter', { exact: true }).elementHandle();
  const visibilite = (element: typeof libelle) => element!.evaluate(e => window.getComputedStyle(e).visibility);
  const largeur = (await enregistrer!.boundingBox())!.width;

  await enregistrer!.click();

  await expect.poll(() => visibilite(libelle)).toBe('hidden');
  expect({ largeur: (await enregistrer!.boundingBox())!.width, exporter: await visibilite(exporter) }).toEqual({
    largeur,
    exporter: 'visible',
  });
});
