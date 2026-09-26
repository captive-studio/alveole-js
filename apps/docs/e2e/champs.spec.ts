import { expect, test, type Locator, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';
import { BORDURE_DE_FOCUS, finDesTransitions } from './focus';
import { bords } from './mesures';

// Le rendu des champs de saisie monté de jsdom au navigateur (ADR 0027) : hauteurs, lignes
// et couleurs n'y valaient que ce que le style déclaré disait. Les règles de bordure sont
// tenues au niveau 1 (FormControl/textInputStyles.test.tsx, FormControl/otpTheme.test.web.tsx),
// la convention de focus commune dans focus.spec.ts ; ici, ce que seul le rendu établit.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

const dansLaFiche = (page: Page) => page.getByRole('main');

const hauteur = async (element: Locator) => {
  const { haut, bas } = await bords(element);
  return bas - haut;
};

// Le bouton est passé à `control('md').height` (32px) ; le champ était resté à 42px en dur.
// Un bouton posé à côté d'un champ ne s'alignait plus.
test('aligne la hauteur du champ texte sur celle du bouton md', async ({ page }) => {
  await openRoute(page, '/components/Button');
  const bouton = await hauteur(dansLaFiche(page).getByRole('button', { name: 'Bouton md' }));
  await openRoute(page, '/components/TextInput');
  const champ = await hauteur(dansLaFiche(page).getByLabel('Nom', { exact: true }).locator('xpath=..'));

  expect(bouton).toBeGreaterThan(0);
  expect(champ).toBe(bouton);
});

// L'input nombre est un élément DOM brut : React y lit une hauteur de ligne sans unité comme
// un multiple de la taille de police (20 x 14 = 280px), là où react-native-web ajoute `px`. Et
// le navigateur y pose 1px de retrait vertical, qui s'ajoute à la ligne.
test('pose la ligne du champ nombre en pixels, sans retrait vertical', async ({ page }) => {
  await openRoute(page, '/components/NumberInput');

  const style = await dansLaFiche(page)
    .getByLabel('Montant', { exact: true })
    .evaluate(champ => {
      const { lineHeight, paddingTop, paddingBottom } = window.getComputedStyle(champ);
      return { lineHeight, paddingTop, paddingBottom };
    });

  expect(style).toEqual({ lineHeight: '20px', paddingTop: '0px', paddingBottom: '0px' });
});

// Le navigateur donne à un input heure une boîte plus haute que sa ligne (22 pour 20) : ses
// sous-champs internes ont leur propre retrait. Le champ débordait alors de la hauteur de
// contrôle.
test('fige la hauteur du champ heure sur sa ligne', async ({ page }) => {
  await openRoute(page, '/components/TimeInput');

  expect(await hauteur(dansLaFiche(page).getByLabel('Heure', { exact: true }).first())).toBe(20);
});

// La bibliothèque OTP cache la vraie saisie derrière les cellules : c'est elle que le libellé
// désigne et qui prend le focus, les cellules ne font que le refléter.
const saisieOtp = (page: Page, libelle: string) => dansLaFiche(page).getByLabel(libelle, { exact: true });

const celluleOtp = async (page: Page, libelle: string, index = 0) => {
  await finDesTransitions(page);
  return saisieOtp(page, libelle).evaluate((saisie, rang) => {
    const racine = saisie.closest('form-control-otp-input')!;
    const style = window.getComputedStyle(racine.querySelectorAll('[data-testid="otp-input"]')[rang]!);
    return { couleur: style.borderTopColor, epaisseur: style.borderTopWidth };
  }, index);
};

// Pendant la saisie, c'est la cellule active qu'il faut pouvoir désigner sans ambiguïté ; le
// verdict de validation reprend la main au blur.
test('couvre la couleur d erreur de la cellule OTP active, puis la restitue', async ({ page }) => {
  await openRoute(page, '/components/OtpInput');
  const erreur = await celluleOtp(page, 'Avec erreur');

  await saisieOtp(page, 'Avec erreur').focus();
  const focus = await celluleOtp(page, 'Avec erreur');
  await saisieOtp(page, 'Avec erreur').blur();

  expect({ focus, apresBlur: await celluleOtp(page, 'Avec erreur') }).toEqual({
    focus: BORDURE_DE_FOCUS,
    apresBlur: erreur,
  });
  expect(erreur).not.toEqual(BORDURE_DE_FOCUS);
});

// Seule la cellule où l'on écrit s'allume : le déplacement automatique entre cellules
// resterait illisible si tout le champ changeait de couleur.
test('ne colore que la cellule OTP active', async ({ page }) => {
  await openRoute(page, '/components/OtpInput');
  const repos = await celluleOtp(page, 'Code de vérification', 1);

  await saisieOtp(page, 'Code de vérification').focus();

  expect({
    active: await celluleOtp(page, 'Code de vérification', 0),
    voisine: await celluleOtp(page, 'Code de vérification', 1),
  }).toEqual({ active: BORDURE_DE_FOCUS, voisine: repos });
});

// Désactivé, la bibliothèque refuse le focus à la saisie cachée : les cellules gardent en
// toutes circonstances leur apparence hors d'usage.
test('ne colore pas les cellules d un OTP désactivé', async ({ page }) => {
  await openRoute(page, '/components/OtpInput');
  const desactive = await celluleOtp(page, 'Désactivé');

  await saisieOtp(page, 'Désactivé').focus();

  expect(await celluleOtp(page, 'Désactivé')).toEqual(desactive);
});

const couleur = (element: Locator) => element.evaluate(noeud => window.getComputedStyle(noeud).color);

const libelle = (page: Page, texte: string) => dansLaFiche(page).locator(`label:text-is("${texte}")`);

// Comme chez Primer, Atlassian et Base : seule la légende porte l'état (ADR 0026). La fiche
// OTP pose côte à côte des FormControl neutre, en erreur et désactivé.
test('garde la couleur du libellé d un champ en erreur', async ({ page }) => {
  await openRoute(page, '/components/OtpInput');

  expect(await couleur(libelle(page, 'Avec erreur'))).toBe(await couleur(libelle(page, 'Code de vérification')));
});

test('grise le libellé d un champ désactivé', async ({ page }) => {
  await openRoute(page, '/components/OtpInput');

  expect(await couleur(libelle(page, 'Désactivé'))).not.toBe(await couleur(libelle(page, 'Code de vérification')));
});

test('grise l indice d un champ désactivé', async ({ page }) => {
  await openRoute(page, '/components/FormControl');
  const indice = (texte: string) => dansLaFiche(page).locator('form-control-hint').getByText(texte, { exact: true });

  expect(await couleur(indice('Texte desactive'))).not.toBe(await couleur(indice('Texte descriptif du champ')));
});

// Sans fond distinct, un champ désactivé ne se reconnaît qu'à son libellé pâli. La fiche
// NumberInput en montre un, sur le cadre commun à tous les champs de saisie (inputFrameStyle).
test('grise le fond d un champ désactivé', async ({ page }) => {
  await openRoute(page, '/components/NumberInput');

  const fond = await dansLaFiche(page)
    .getByLabel('Désactivé', { exact: true })
    .locator('xpath=..')
    .evaluate(cadre => window.getComputedStyle(cadre).backgroundColor);

  expect(fond).toBe('rgb(230, 234, 241)');
});
