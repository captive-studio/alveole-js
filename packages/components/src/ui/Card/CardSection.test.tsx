import { renderNative, RenderResult } from '@/__tests__/helpers/renderNative';
import { CardSection } from './CardSection';

// La couleur demandee a `LucideIcon` ne ressort que sur le SVG, en `stroke` : c'est la seule
// trace observable de la teinte choisie pour chaque ligne.
const svg = (view: RenderResult) => view.root!.queryAll(i => String(i.type) === 'RNSVGSvgView')[0].props;

// Sans titre ni description, la section ne rend rien plutot qu'une boite vide : Card empile
// ses sections avec un `gap`, et une section vide y creerait un blanc sans contenu.
it('ne rend rien quand ni titre ni description ne sont fournis', async () => {
  const view = await renderNative(<CardSection />);

  expect(view.toJSON()).toBeNull();
});

// Le titre seul suffit a faire exister la section : c'est le cas d'usage le plus courant
// (une section d'intitule sans texte d'accompagnement).
it('affiche le titre seul', async () => {
  const { getByText } = await renderNative(<CardSection titre="Coordonnees" />);

  expect(getByText('Coordonnees')).toBeTruthy();
});

// La description seule fait exister la section sans ligne de titre : les deux lignes sont
// decidees par deux gardes independantes, et seule celle-ci observe la seconde.
it('affiche la description seule', async () => {
  const { getByText } = await renderNative(<CardSection description="Adresse de facturation" />);

  expect(getByText('Adresse de facturation')).toBeTruthy();
});

// L'icone porte la couleur de sa propre ligne : titre et description ont deux teintes de
// repos distinctes, et rien d'autre que le `stroke` ne les distingue au rendu.
it('teinte l icone du titre avec la couleur du titre', async () => {
  const view = await renderNative(<CardSection titre="Coordonnees" titreIcone="User" />);

  expect(svg(view).stroke).toBe('#151617'); // text['title-grey']
});

// La description a sa propre teinte de repos, plus claire que celle du titre : les deux
// tables sont independantes et peuvent se desynchroniser sans que rien ne le signale.
it('teinte l icone de la description avec la couleur de la description', async () => {
  const view = await renderNative(<CardSection description="Adresse" descriptionIcone="MapPin" />);

  expect(svg(view).stroke).toBe('#373A3F'); // text['default-grey']
});

// La variante desactivee ecrase la teinte de la ligne, texte comme icone. Sans cet ancrage,
// une icone restee a sa couleur de repos passerait inapercue sur un texte grise.
it('grise l icone quand la variante est disabled', async () => {
  const view = await renderNative(<CardSection variant="disabled" titre="Coordonnees" titreIcone="User" />);

  expect(svg(view).stroke).toBe('#8D97AC'); // text['disabled-grey']
});

// Le lien n'enveloppe la description que si les deux sont fournis : un `descriptionLink`
// sans texte ne doit pas produire de lien vide, cliquable et muet pour un lecteur d'ecran.
it('rend la description comme un lien quand descriptionLink est fourni', async () => {
  const { getByRole } = await renderNative(<CardSection description="Voir le detail" descriptionLink="/detail" />);

  expect(getByRole('link', { name: 'Voir le detail' })).toBeTruthy();
});
