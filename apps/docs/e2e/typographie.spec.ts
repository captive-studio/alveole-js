import { expect, test } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';
import { tailleDeTexte } from './mesures';

// Les crans typographiques montés de jsdom au navigateur (ADR 0027) : jsdom ne résout pas les
// variables CSS du thème, et un nom de jeton lu dans un style calculé ne prouvait pas la
// taille rendue.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// Le titre d'un en-tête d'application se lit dans le registre de l'application, pas dans celui
// d'un site de documentation. Atlassian pose le sien à 24, Primer à 20 par défaut : `H4 - SM`
// nous cale sur Atlassian, au-dessus du défaut de Primer.
test('titre une page dans le registre applicatif', async ({ page }) => {
  await openRoute(page, '/components/PageHeader');
  const titre = page.getByRole('main').getByText('Titre de la page', { exact: true }).first();

  const { rendue, attendue } = await tailleDeTexte(titre, '--typography-titres-h4-sm-font-size');

  expect(rendue).toBe(attendue);
});

// Le bouton d'effacement utilisait `size="xs"`, supprimée du design system : passé en `sm`,
// son libellé grossit de 12 à 14. L'écart est assumé, ce test l'enregistre.
test('affiche le libellé d effacement de Signature à la taille sm', async ({ page }) => {
  await openRoute(page, '/components/Signature');
  const libelle = page
    .getByRole('main')
    .getByRole('button', { name: 'Effacer', exact: true })
    .first()
    .getByText('Effacer');

  const { rendue, attendue } = await tailleDeTexte(libelle, '--typography-corps-de-texte-sm-medium-font-size');

  expect(rendue).toBe(attendue);
});

// Tamagui v2 remet la police de l'app sur chaque vue, hauteur de ligne comprise : un texte sans
// cran, comme le logo de la Sidebar, passait de la hauteur normale du navigateur aux 23 px de
// la police par défaut de l'app, et grandissait tout ce qui l'entoure.
test('laisse à un texte sans cran la hauteur de ligne normale', async ({ page }) => {
  await openRoute(page, '/components/Sidebar');
  const logo = page.getByRole('main').getByText('Mon Application', { exact: true }).first();

  const hauteur = await logo.evaluate(texte => window.getComputedStyle(texte).lineHeight);

  expect(hauteur).toBe('normal');
});

// Un `textAlign` à `undefined` écrasait celui du style, et les boutons alignés à gauche
// (`contentAlign="start"`) recentraient leur libellé.
test('garde l alignement du texte posé par le style', async ({ page }) => {
  await openRoute(page, '/components/Typography');

  await expect(page.getByRole('main').locator('typography-alignee-a-droite')).toHaveCSS('text-align', 'right');
});
