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
