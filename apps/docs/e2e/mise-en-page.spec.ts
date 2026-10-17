import { expect, test, type Page } from '@playwright/test';
// L'entrée publique de `@alveole/theme` ne se charge pas sous Node (Playwright) : son `dist`
// est écrit pour Metro. Le fichier des largeurs n'importe rien, on le lit à sa source.
import { Grilles } from '../../../packages/theme/src/constants/Grille';
import { blockThirdParties, openRoute } from './audit';
import { hauteurEtLigneDuLibelle } from './mesures';

// La mise en page d'une fiche (`StoryLayout` dans `ScreenZone`), montée de jsdom au navigateur
// (ADR 0027) : une largeur, une marge ou un sens de rangée n'y valaient que ce que le style
// déclaré disait. Le retrait du sommaire sous la largeur bureau reste dans la suite jsdom.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// La fiche Button a des exemples, donc un sommaire.
const ouvrirLaFicheEn = async (page: Page, width: number) => {
  await page.setViewportSize({ width, height: 900 });
  await openRoute(page, '/components/Button');
};

/**
 * Les boîtes de la mise en page, relevées depuis le titre de la fiche : l'enveloppe (`main`)
 * porte les marges, la zone qu'elle centre porte la largeur, la rangée sert le sommaire et la
 * lecture. Le titre est dans la lecture, rendue à toutes les largeurs.
 */
const miseEnPage = (page: Page) =>
  page.getByRole('heading', { level: 1 }).evaluate(titre => {
    const style = (element: Element) => window.getComputedStyle(element);
    let rangee = titre.parentElement;
    while (rangee && style(rangee).flexDirection !== 'row-reverse') rangee = rangee.parentElement;
    if (!rangee) throw new Error('aucune rangée en row-reverse au-dessus du titre');

    const zone = rangee.parentElement!;
    const enveloppe = zone.parentElement!;
    const lecture = rangee.lastElementChild!;

    return {
      enveloppe: {
        tag: enveloppe.tagName.toLowerCase(),
        gauche: style(enveloppe).paddingLeft,
        droite: style(enveloppe).paddingRight,
        haut: style(enveloppe).paddingTop,
      },
      zone: {
        maxWidth: style(zone).maxWidth,
        // Le vide laissé de chaque côté de la zone, à l'intérieur des marges de l'enveloppe.
        videAGauche: Math.round(
          zone.getBoundingClientRect().left -
            enveloppe.getBoundingClientRect().left -
            parseFloat(style(enveloppe).paddingLeft),
        ),
        videADroite: Math.round(
          enveloppe.getBoundingClientRect().right -
            parseFloat(style(enveloppe).paddingRight) -
            zone.getBoundingClientRect().right,
        ),
      },
      rangee: { gap: style(rangee).gap, enfants: rangee.children.length },
      volet:
        rangee.children.length > 1
          ? {
              largeur: rangee.firstElementChild!.getBoundingClientRect().width,
              flexShrink: style(rangee.firstElementChild!).flexShrink,
            }
          : null,
      lecture: {
        flexGrow: style(lecture).flexGrow,
        flexShrink: style(lecture).flexShrink,
        minWidth: style(lecture).minWidth,
      },
      voletADroite:
        rangee.children.length > 1 &&
        rangee.firstElementChild!.getBoundingClientRect().left > lecture.getBoundingClientRect().left,
    };
  });

test.describe('sur un écran large', () => {
  // Primer et Atlassian laissent 55 à 66 px entre la navigation et le contenu, et 96 à 100
  // au-dessus du titre, avec un vide symétrique : la zone se centre.
  test('centre une zone de neuf colonnes dans des marges de page de documentation', async ({ page }) => {
    await ouvrirLaFicheEn(page, 1440);

    const { enveloppe, zone, rangee } = await miseEnPage(page);

    expect({ enveloppe, maxWidth: zone.maxWidth, gap: rangee.gap }).toEqual({
      enveloppe: { tag: 'main', gauche: '48px', droite: '48px', haut: '96px' },
      maxWidth: `${Grilles['9 colonnes']}px`,
      gap: '24px',
    });
    // Deux vides nuls seraient égaux aussi : la zone doit en laisser un, et le même des deux côtés.
    expect(zone.videAGauche).toBeGreaterThan(0);
    expect(zone.videADroite).toBe(zone.videAGauche);
  });

  // Le sommaire a deux colonnes et ne les cède pas ; il est déclaré avant le corps et rendu à
  // droite, comme chez Primer.
  test('sert au sommaire deux colonnes à droite de la lecture', async ({ page }) => {
    await ouvrirLaFicheEn(page, 1440);

    const { volet, voletADroite } = await miseEnPage(page);

    expect({ volet, aDroite: voletADroite }).toEqual({
      volet: { largeur: Grilles['2 colonnes'], flexShrink: '0' },
      aDroite: true,
    });
  });

  // React Native pose flexShrink: 0 par défaut, à l'inverse du CSS : sans le dire, la lecture
  // garde la largeur de son contenu et un bloc de code large déborde de la zone.
  test('donne à la lecture ce qui reste de la zone sans l empêcher de rétrécir', async ({ page }) => {
    await ouvrirLaFicheEn(page, 1440);

    const { lecture } = await miseEnPage(page);

    expect({ flexGrow: lecture.flexGrow, flexShrink: lecture.flexShrink, minWidth: lecture.minWidth }).toEqual({
      flexGrow: '1',
      flexShrink: '1',
      minWidth: '0px',
    });
  });
});

// 48 px de chaque côté sur un téléphone, c'est un quart de la page rendu au vide.
test('resserre les marges de la page sur un téléphone', async ({ page }) => {
  await ouvrirLaFicheEn(page, 375);

  const { enveloppe } = await miseEnPage(page);

  expect(enveloppe).toEqual({ tag: 'main', gauche: '24px', droite: '24px', haut: '48px' });
});

// Tamagui v2 remet la police de l'app sur chaque vue : le lien brut d'une entrée héritait
// ainsi d'une hauteur de ligne de 23 px, plus haute que celle de son libellé, et décalait
// le sommaire d'une fiche à l'autre.
test('cale chaque entrée du sommaire sur la hauteur de ligne de son libellé', async ({ page }) => {
  await ouvrirLaFicheEn(page, 1440);
  const entree = page.getByText('Sur cette page', { exact: true }).locator('..').locator('a').first();

  const { hauteur, ligne } = await hauteurEtLigneDuLibelle(entree);

  expect(hauteur).toBe(ligne);
});

// Le lien en flex rangeait son libellé en ligne, sans pouvoir le rétrécir sous la largeur de
// son contenu : un nom d'exemple long débordait de la colonne au lieu de passer à la ligne.
test('passe à la ligne une entrée du sommaire plus longue que sa colonne', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openRoute(page, '/components/Typography');
  const entree = page
    .getByText('Sur cette page', { exact: true })
    .locator('..')
    .locator('a[href="#typographypaddedwithcolor"]');

  const lien = await entree.boundingBox();
  const libelle = await entree.locator('typography').boundingBox();

  expect(libelle!.width).toBeLessThanOrEqual(lien!.width);
});
