import { expect, test, type Page } from '@playwright/test';
import { blockThirdParties, openRoute } from './audit';
import { bords, cadresAutourDe, separationEntre, tailleDeTexte } from './mesures';

// Les mesures de mise en page des écrans du catalogue, montées de jsdom au navigateur
// (ADR 0027). Le contrat de ces écrans (rôles, noms, interactions) reste dans les suites
// jsdom de `@alveole/storybook`.

test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
});

// La fiche Button porte tout ce qu'on mesure : une description, des tags, un lien Figma et
// des exemples. Un renommage ferait échouer l'ouverture, pas passer le test en silence.
const FICHE = '/components/Button';

test.describe('la fiche', () => {
  test.beforeEach(async ({ page }) => {
    await openRoute(page, FICHE);
  });

  const titre = (page: Page) => page.getByRole('heading', { level: 1 });
  const description = (page: Page) => page.getByText('Boutons de type Pressable');
  const lienFigma = (page: Page) => page.getByRole('link', { name: 'Ouvrir Figma' });

  // Ni Primer ni Atlassian n'encadrent le haut d'une fiche : la description y est du texte
  // courant, pas un aparté.
  test('laisse la description hors de tout cadre', async ({ page }) => {
    expect(await cadresAutourDe(description(page))).toBe(0);
  });

  // Le catalogue est un site de documentation : son titre se lit dans un autre registre que
  // le `PageHeader` des applications clientes.
  test('titre la fiche dans le registre du catalogue', async ({ page }) => {
    const { rendue, attendue } = await tailleDeTexte(titre(page), '--typography-titres-h1-xl-font-size');

    expect(rendue).toBe(attendue);
  });

  // Primer et Base posent la première phrase un cran au-dessus de leur texte courant.
  test('pose la première phrase un cran au-dessus du texte courant', async ({ page }) => {
    const { rendue, attendue } = await tailleDeTexte(
      description(page),
      '--typography-corps-de-texte-lg-regular-font-size',
    );

    expect(rendue).toBe(attendue);
  });

  // Sur la ligne de la description, le lien Figma lui prenait 99 px sur 690.
  test('ne pose pas le lien Figma sur la ligne de la description', async ({ page }) => {
    const { bas } = await bords(description(page));
    const { haut } = await bords(lienFigma(page));

    expect(haut).toBeGreaterThanOrEqual(bas);
  });

  // Chez Primer, les badges de statut tiennent sur une seule ligne.
  test('aligne tags et informations sur une seule rangée', async ({ page }) => {
    const panneau = page.getByRole('tabpanel');
    const tag = await bords(panneau.locator('tag').filter({ hasText: /^ui$/ }));
    const information = await bords(panneau.locator('tag').filter({ hasText: /^Figma$/ }));

    expect(information.haut).toBe(tag.haut);
  });

  // Primer, Atlassian et Uber laissent 55 à 75 px entre ce que la page annonce et ce qu'elle
  // montre.
  test('détache les onglets de ce que la fiche annonce', async ({ page }) => {
    const onglet = page.getByRole('tab', { name: 'Examples' });

    expect((await separationEntre(titre(page), onglet)).gap).toBe('48px');
  });

  // À 4 px, le fil d'Ariane se lisait comme un sous-titre collé au H1.
  test('détache le fil d ariane du titre', async ({ page }) => {
    const filDAriane = page.locator('breadcrumbs').first();

    expect((await separationEntre(filDAriane, titre(page))).gap).toBe('32px');
  });

  // Le premier exemple se détache de la barre d'onglets comme les exemples entre eux.
  test('détache le premier exemple de la barre d onglets', async ({ page }) => {
    const exemples = page.getByRole('tabpanel').locator('> *').first();

    expect(await exemples.evaluate(noeud => window.getComputedStyle(noeud).marginTop)).toBe('40px');
  });

  // Le titre d'un exemple appartient au document : seul ce qui est montré entre dans le cadre.
  // Il porte l'ancre que le sommaire vise, d'où sa sélection par `id`.
  test('laisse le titre de l exemple hors du cadre', async ({ page }) => {
    const titreDExemple = page.getByRole('tabpanel').locator('[id]').first();

    expect(await cadresAutourDe(titreDExemple)).toBe(0);
  });
});

test.describe('la liste des fiches', () => {
  const ouvrirLaListeEn = async (page: Page, width: number) => {
    await page.setViewportSize({ width, height: 900 });
    await openRoute(page, '/components');
  };

  /** Le haut des trois premières cartes de la grille. */
  const hautDesPremieresCartes = async (page: Page) => {
    const cartes = page.locator('main a[href^="/components/"]:not(nav a)');

    return Promise.all([0, 1, 2].map(async rang => (await bords(cartes.nth(rang))).haut));
  };

  // La largeur calculée par `largeurDeColonne` doit arriver jusqu'aux cartes : c'est ce qui
  // fait une grille plutôt qu'une colonne.
  test('partage la rangée en trois sur un écran large', async ({ page }) => {
    await ouvrirLaListeEn(page, 1400);

    const [premiere, deuxieme, troisieme] = await hautDesPremieresCartes(page);

    expect([deuxieme, troisieme]).toEqual([premiere, premiere]);
  });

  test('étale une seule fiche par rangée sur un écran étroit', async ({ page }) => {
    await ouvrirLaListeEn(page, 500);

    const [premiere, deuxieme] = await hautDesPremieresCartes(page);

    expect(deuxieme).toBeGreaterThan(premiere);
  });
});
