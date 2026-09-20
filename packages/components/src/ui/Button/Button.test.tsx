import { renderNative, RenderResult } from '@/__tests__/helpers/renderNative';
import { Button } from './Button';

// getByRole('button') renvoie la vue du Pressable, qui ne porte que les rayons.
// Les styles de variant (fond, paddings, bordures) vivent sur le Box qu'il enveloppe.
const conteneur = (view: RenderResult) => view.root?.queryAll(i => i.type === 'View')[0];

// Le libelle est le seul Text du bouton : le titre, que `Typography` rend.
const libelle = (view: RenderResult) => view.root?.queryAll(i => i.type === 'Text')[0];

it('expose un etat accessible desactive pendant le chargement', async () => {
  const { getByRole } = await renderNative(<Button variant="primary" title="Enregistrer" isLoading />);

  expect(getByRole('button').props.accessibilityState).toEqual(expect.objectContaining({ disabled: true }));
});

it('expose l etat deplie quand le bouton ouvre un menu', async () => {
  const { getByRole } = await renderNative(<Button variant="tertiary" title="Filtres" expanded />);

  expect(getByRole('button').props.accessibilityState).toEqual(expect.objectContaining({ expanded: true }));
});

// La taille est choisie par une chaine de ternaires imbriques sur `size`, dont aucune
// branche n'etait observee : la couverture de branches de ce fichier etait a 46 %.
// `md` est la taille par defaut, et sa hauteur est desormais l'ancre : depuis que les crans
// viennent de control (ADR 0013), c'est elle la valeur distinctive. Elle separe une table
// juste d'une table permutee, ce qu'une simple comparaison entre tailles ne ferait pas.
it('applique la hauteur de la taille md par defaut', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" />);

  expect(view.getByRole('button').props.style.height).toBe(32);
});

it('applique le rembourrage horizontal de la taille sm', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" size="sm" />);

  expect(conteneur(view)?.props.style.paddingLeft).toBe(8); // control('sm').paddingInline
});

it('applique le rembourrage horizontal de la taille lg', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" size="lg" />);

  expect(conteneur(view)?.props.style.paddingLeft).toBe(16); // control('lg').paddingInline
});

// Sans `title`, le bouton passe en mode icone seule : la chaine de ternaires sur `size`
// bascule sur une seconde famille de styles, qui pose une hauteur et une largeur egales
// (bouton carre) la ou le mode avec libelle pose des rembourrages asymetriques.
it('applique un cadre carre en mode icone seule', async () => {
  const view = await renderNative(<Button variant="primary" startIcon="Check" />);
  const style = view.getByRole('button').props.style;

  expect(style.height).toBe(32);
  expect(style.width).toBe(style.height);
});

// Le design prevoyait qu'une icone resserre le rembourrage de son cote. Ca n'a jamais
// fonctionne : les styles d'icone etaient poses en tete de l'objet puis ecrases par le
// style de taille, qui definit paddingLeft et paddingRight pour les quatre tailles. Le
// code qui les choisissait a donc ete supprime plutot que recopie a l'identique dans une
// table. Ce test fige l'apparence reelle, pas l'intention : la corriger changerait tous
// les boutons a icone de toutes les applications, et releve du design, pas du refactoring.
it('garde le rembourrage de la taille quand une icone precede le libelle', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" startIcon="Check" />);

  expect(conteneur(view)?.props.style.paddingLeft).toBe(12); // control('md').paddingInline
});

it('applique le style d appui quand le menu est deplie', async () => {
  const repos = await renderNative(<Button variant="primary" title="Filtres" />);
  const deplie = await renderNative(<Button variant="primary" title="Filtres" expanded />);

  expect(conteneur(deplie)?.props.style.backgroundColor).not.toBe(conteneur(repos)?.props.style.backgroundColor);
});

// Les deux etats peuvent etre vrais ensemble, et `cleDEtat` tranche en faveur du desactive.
// Sans ce test, inverser cette priorite ne casse rien : aucun autre test ne les combine, et
// un bouton desactive prendrait alors l'apparence d'un bouton appuye, donc actionnable.
it('garde l apparence desactivee quand un menu deplie est aussi desactive', async () => {
  const desactive = await renderNative(<Button variant="primary" title="Filtres" disabled />);
  const lesDeux = await renderNative(<Button variant="primary" title="Filtres" disabled expanded />);

  expect(conteneur(lesDeux)?.props.style.backgroundColor).toBe(conteneur(desactive)?.props.style.backgroundColor);
});

// `selected` court-circuite la variante : un bouton selectionne porte le meme fond quelle
// que soit sa variante. Comparer deux variantes entre elles teste cette regle de priorite,
// la ou comparer un bouton selectionne a son propre repos ne ferait que constater qu'ils
// different.
it('donne le meme fond a deux variantes selectionnees', async () => {
  const primaire = await renderNative(<Button variant="primary" title="Filtres" selected />);
  const danger = await renderNative(<Button variant="danger" title="Filtres" selected />);

  expect(conteneur(danger)?.props.style.backgroundColor).toBe(conteneur(primaire)?.props.style.backgroundColor);
});
// Meme regle sur le libelle que sur le fond, mais elle est ecrite a un autre endroit du
// fichier : la selection y ecarte aussi la table de variante. Deux variantes suffisent a
// le prouver sans figer une couleur du theme.
it('donne la meme couleur de libelle a deux variantes selectionnees', async () => {
  const primaire = await renderNative(<Button variant="primary" title="Filtres" selected />);
  const danger = await renderNative(<Button variant="danger" title="Filtres" selected />);

  expect(libelle(danger)?.props.style.color).toBe(libelle(primaire)?.props.style.color);
});
// Une largeur automatique inclut la bordure dans sa mesure : si seuls `secondary` et
// `danger` en portent une, ils rendent 2 px plus larges que les variantes sans contour a
// contenu et rembourrage identiques. Toutes gardent donc la meme bordure structurelle ; sa
// couleur transparente la rend invisible sur les variantes pleines ou discretes.
it.each(['primary', 'secondary', 'tertiary', 'danger', 'link'] as const)(
  'reserve la meme bordure structurelle sur la variante %s',
  async variant => {
    const view = await renderNative(<Button variant={variant} title="Action" />);

    expect(view.getByRole('button').props.style.borderWidth).toBe(1);
  },
);

it('rend invisible la bordure structurelle du tertiary', async () => {
  const view = await renderNative(<Button variant="tertiary" title="Action" />);

  expect(view.getByRole('button').props.style.borderColor).toBe('transparent');
});
// Les rayons vivent sur le Pressable, pas sur le Box, et `sm` est la seule taille qui
// emprunte les siens a `smContainer` plutot qu'au conteneur commun.
it('donne a la taille sm un rayon plus petit qu aux autres tailles', async () => {
  const petit = await renderNative(<Button variant="primary" title="Enregistrer" size="sm" />);
  const moyen = await renderNative(<Button variant="primary" title="Enregistrer" />);

  expect(petit.getByRole('button').props.style.borderTopLeftRadius).toBeLessThan(
    moyen.getByRole('button').props.style.borderTopLeftRadius,
  );
});
// `borderNone` annule les rayons, et il doit le faire sur les deux vues : le Pressable
// rogne son contenu (`overflow: hidden`), donc un rayon oublie sur le Box se verrait
// quand meme, et un rayon oublie sur le Pressable rognerait un Box carre.
it('annule les rayons des deux vues quand borderNone est demande', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" borderNone />);

  expect(view.getByRole('button').props.style.borderTopLeftRadius).toBe(0);
  expect(conteneur(view)?.props.style.borderTopLeftRadius).toBe(0);
});
it('etale le bouton sur toute la largeur quand fullWidth est demande', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" fullWidth />);

  expect(view.getByRole('button').props.style.width).toBe('100%');
});
// `noPadding` doit annuler les quatre rembourrages, pas seulement ceux que la taille pose :
// il est applique apres le style de taille, et c'est ce qui lui donne le dernier mot.
it('annule les quatre rembourrages quand noPadding est demande', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" noPadding />);
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } = conteneur(view)?.props.style ?? {};

  expect([paddingTop, paddingBottom, paddingLeft, paddingRight]).toEqual([0, 0, 0, 0]);
});
it('aligne le contenu a gauche quand leftAlign est demande', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" leftAlign />);

  expect(conteneur(view)?.props.style.justifyContent).toBe('left');
});

// Avec une hauteur fixe, un rembourrage vertical ne fait que comprimer le contenu : le
// centrage du conteneur suffit a positionner libelle et icone.
it('ne pose pas de rembourrage vertical quand la hauteur est fixe', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" />);
  const style = conteneur(view)?.props.style;

  expect(view.getByRole('button').props.style.height).toBe(32);
  expect(style.paddingTop ?? 0).toBe(0);
  expect(style.paddingBottom ?? 0).toBe(0);
});

// `sm` avait le meme defaut que `md` avant lui : la hauteur etait derivee des rembourrages
// au lieu d'etre posee, ce qui produisait une echelle incoherente entre crans (ADR 0013).
it('applique la hauteur de la taille sm', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" size="sm" />);

  expect(view.getByRole('button').props.style.height).toBe(28);
});

// Meme correction que sur sm et md : la hauteur de lg etait une consequence des
// rembourrages, pas une valeur posee (ADR 0013).
it('applique la hauteur de la taille lg', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" size="lg" />);

  expect(view.getByRole('button').props.style.height).toBe(40);
});

// Les trois tailles d'icone seule rendaient toutes 30 px de hauteur (ADR 0002/0013) :
// meme padding uniforme, meme icone. La hauteur posee restaure l'echelle.
it('distingue les hauteurs en mode icone seule', async () => {
  const petit = await renderNative(<Button variant="primary" startIcon="Check" size="sm" />);
  const moyen = await renderNative(<Button variant="primary" startIcon="Check" />);
  const grand = await renderNative(<Button variant="primary" startIcon="Check" size="lg" />);

  expect(petit.getByRole('button').props.style.height).toBe(28);
  expect(moyen.getByRole('button').props.style.height).toBe(32);
  expect(grand.getByRole('button').props.style.height).toBe(40);
});

// Le Pressable (la coque visible) n'avait aucune hauteur posee : il s'auto-dimensionnait
// autour du Box interieur (32 px) plus sa propre bordure, ce qui rendait secondary et danger
// 2 px plus hauts que primary. La hauteur doit etre la meme quelle que soit la bordure.
// La hauteur declaree est la meme pour toutes les variantes, bordees ou non : comparer ces
// valeurs ne peut donc rien reveler par elle-meme. C'est boxSizing: 'border-box' qui absorbe
// la bordure dans cette hauteur au lieu de l'ajouter par-dessus au rendu.
it('pose une hauteur explicite qui absorbe sa bordure', async () => {
  const view = await renderNative(<Button variant="secondary" title="Annuler" />);
  const style = view.getByRole('button').props.style;

  expect(style.height).toBe(32);
  expect(style.boxSizing).toBe('border-box');
});

// Le Pressable porte desormais la hauteur autoritaire (boxSizing absorbe sa bordure
// dedans) : si le Box interieur portait sa propre valeur litterale, une variante bordee
// verrait sa zone de contenu reduite par la bordure (32 - 2*1 = 30) sans que le Box ne le
// sache, et deborderait de 2 px, rogne par overflow: hidden du Pressable. En remplissant a
// 100 %, il epouse exactement l espace restant, borde ou non.
it('remplit l espace laisse par le pressable plutot que de porter sa propre hauteur', async () => {
  const view = await renderNative(<Button variant="primary" title="Enregistrer" />);

  expect(conteneur(view)?.props.style.height).toBe('100%');
});
