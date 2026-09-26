import { expect, test, type Locator, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';

// Le rendu de Tag monté de jsdom au navigateur (ADR 0027) : jsdom n'évalue ni la mise en page
// ni un vrai survol. Les décisions de style sont tenues au niveau 1 (tagStyling.test.web.tsx) ;
// ici, on vérifie ce qu'elles donnent sous un vrai pointeur.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  await openRoute(page, '/components/Tag');
});

// La pastille est le `Typography` qui porte le libellé.
const pastille = (page: Page, libelle: string) => page.getByRole('main').getByText(libelle, { exact: true }).first();
const croix = (page: Page, libelle: string) =>
  page
    .getByRole('main')
    .getByRole('button', { name: `Retirer ${libelle}`, exact: true })
    .first();

const style = (element: Locator) =>
  element.evaluate(e => {
    const calcule = window.getComputedStyle(e);
    return { couleur: calcule.color, bordure: calcule.borderTopColor, curseur: calcule.cursor };
  });

const boite = async (element: Locator) => {
  const mesure = await element.boundingBox();

  if (!mesure) throw new Error('élément hors du rendu');

  return mesure;
};

// Sans hauteur déclarée, la puce tombait sur la boîte de contenu de la fonte : 15 px en sm,
// 25 px en md, et un Tag ne s'alignait pas sur un Badge voisin.
for (const [cran, hauteur] of [
  ['sm', 20],
  ['md', 24],
] as const) {
  test(`rend la pastille ${cran} à ${hauteur}px de haut`, async ({ page }) => {
    expect((await boite(pastille(page, `Tag ${cran}`))).height).toBe(hauteur);
  });
}

// ADR 0020 : le survol fonce le libellé d'une étiquette manipulable, sans toucher la bordure.
test('fonce le libellé d une étiquette interactive au survol, sans toucher sa bordure', async ({ page }) => {
  const etiquette = pastille(page, 'Au repos, dans un groupe');
  const repos = await style(etiquette);

  await etiquette.hover();

  await expect.poll(async () => (await style(etiquette)).couleur).not.toBe(repos.couleur);
  expect((await style(etiquette)).bordure).toBe(repos.bordure);
});

// Une étiquette descriptive ne se manipule pas : la faire foncer promettrait une interaction.
test('laisse inerte une étiquette descriptive au survol', async ({ page }) => {
  const etiquette = pastille(page, 'Descriptive, inerte');
  const repos = await style(etiquette);

  await etiquette.hover();

  expect(await style(etiquette)).toEqual(repos);
});

// L'étiquette n'est jamais cliquable, seule sa croix l'est : le curseur le dit.
test('ne donne le curseur de la main qu à la croix', async ({ page }) => {
  expect({
    etiquette: (await style(pastille(page, 'Fermable sm').locator('..'))).curseur,
    croix: (await style(croix(page, 'Fermable sm'))).curseur,
  }).toEqual({ etiquette: 'auto', croix: 'pointer' });
});

// Deux `Pressable` imbriqués : sans la couture, passer du libellé à la croix éclaircissait
// l'étiquette au moment où l'on s'apprête à la fermer.
test('garde l étiquette foncée quand le pointeur passe du libellé à la croix', async ({ page }) => {
  const etiquette = pastille(page, 'Fermable sm');
  const repos = (await style(etiquette)).couleur;
  await etiquette.hover({ position: { x: 4, y: 10 } });
  await expect.poll(async () => (await style(etiquette)).couleur).not.toBe(repos);
  const surLeLibelle = (await style(etiquette)).couleur;

  await croix(page, 'Fermable sm').hover();

  expect((await style(etiquette)).couleur).toBe(surLeLibelle);
});

// La croix fait toute la hauteur de la pastille et se pose à fleur de son bord droit : avant
// correction, elle s'arrêtait à 1 px du bord, l'épaisseur de la bordure.
for (const cran of ['sm', 'md'] as const) {
  test(`pose la croix ${cran} à fleur de la pastille, sur toute sa hauteur`, async ({ page }) => {
    const etiquette = await boite(pastille(page, `Fermable ${cran}`));
    const cercle = await boite(croix(page, `Fermable ${cran}`));

    expect({ hauteur: cercle.height, droite: cercle.x + cercle.width }).toEqual({
      hauteur: etiquette.height,
      droite: etiquette.x + etiquette.width,
    });
  });
}

// « La position de l'icône ne doit jamais varier entre états » (ALV-49).
test('ne déplace jamais la croix au survol', async ({ page }) => {
  const cible = croix(page, 'Fermable md');
  // Le survol fait défiler la page jusqu'à la croix : la position se lit dans la pastille.
  const position = async () => {
    const cercle = await boite(cible);
    const etiquette = await boite(pastille(page, 'Fermable md'));

    return { x: cercle.x - etiquette.x, y: cercle.y - etiquette.y, largeur: cercle.width, hauteur: cercle.height };
  };
  await cible.scrollIntoViewIfNeeded();
  const repos = await position();

  await cible.hover();

  expect(await position()).toEqual(repos);
});

// L'icône de tête reste à 16 px dans les deux crans ; celle de la croix grossit avec la
// pastille, 12 px en sm et 16 en md, comme chez Primer.
test('taille les icônes de l étiquette', async ({ page }) => {
  const largeur = async (element: Locator) => (await boite(element.locator('svg').first())).width;

  expect({
    tete: await largeur(pastille(page, 'Validé')),
    croixSm: await largeur(croix(page, 'Fermable sm')),
    croixMd: await largeur(croix(page, 'Fermable md')),
  }).toEqual({ tete: 16, croixSm: 12, croixMd: 16 });
});

// Un libellé trop long se coupe au lieu de déborder : avant correction, la pastille rendait
// 401 px dans un parent de 260.
test('coupe un libellé trop long dans la place disponible', async ({ page }) => {
  const etiquette = await boite(pastille(page, 'Un libellé beaucoup trop long pour la place disponible'));

  expect(etiquette.width).toBeLessThanOrEqual(260);
});
