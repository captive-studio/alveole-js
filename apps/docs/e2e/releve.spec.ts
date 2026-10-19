import { expect, test, type Page } from '@playwright/test';
import { ControlSizes } from '../../../packages/theme/src/constants/Control';
import { blockThirdParties } from './audit';
import { valeurCalculee } from './mesures';
import { releverExemple } from './releve';

// Le relevé des écarts de maquette (ADR 0030) compare un nœud Figma aux valeurs calculées d'un
// exemple d'axe. Ce spec prouve la partie mesure sur le bouton `variant=secondary` de la fiche
// Button : chaque propriété relevée vaut ce que le thème donne.

// Une seule page pour tous les tests : le relevé ne la modifie pas, et chaque chargement de
// fiche coûte plusieurs secondes.
test.describe.configure({ mode: 'serial' });

let page: Page;
let releve: Awaited<ReturnType<typeof releverExemple>>;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await blockThirdParties(page);
  releve = await releverExemple(page, 'Button', 'Secondary');
});

test.afterAll(async () => {
  await page.close();
});

const typographie = (propriete: 'family' | 'size' | 'weight') =>
  `var(--typography-corps-de-texte-sm-medium-font-${propriete})`;

test('relève la hauteur de l exemple', () => {
  expect(releve.hauteur).toBe(`${ControlSizes.desktop.md.height}px`);
});

test('relève les marges intérieures de l exemple', () => {
  expect(releve.margesInterieures).toBe(`0px ${ControlSizes.desktop.md.paddingInline}px`);
});

test('relève la police de l exemple', async () => {
  expect(releve.police).toEqual({
    famille: await valeurCalculee(page, 'fontFamily', typographie('family')),
    taille: await valeurCalculee(page, 'fontSize', typographie('size')),
  });
});

test('relève la graisse de l exemple', async () => {
  expect(releve.graisse).toBe(await valeurCalculee(page, 'fontWeight', typographie('weight')));
});

test('relève la couleur de l exemple', async () => {
  expect(releve.couleur).toEqual({
    texte: await valeurCalculee(page, 'color', 'var(--text-action-high-grey)'),
    fond: await valeurCalculee(page, 'backgroundColor', 'var(--background-default-grey)'),
  });
});

test('relève le rayon de l exemple', async () => {
  const coin = await valeurCalculee(page, 'borderTopLeftRadius', 'var(--radius-md)');

  expect(releve.rayon).toEqual({ hautGauche: coin, hautDroite: coin, basDroite: coin, basGauche: coin });
});

test('relève la bordure de l exemple', async () => {
  const cote = await valeurCalculee(page, 'borderTop', '1px solid var(--border-default-grey)');

  expect(releve.bordure).toEqual({ haut: cote, droite: cote, bas: cote, gauche: cote });
});
