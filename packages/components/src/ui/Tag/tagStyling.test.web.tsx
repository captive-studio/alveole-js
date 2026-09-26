import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Tag.styles';
import {
  apparenceDeLaCroix,
  apparenceDeLaPastille,
  apparenceDeLIconeDeCroix,
  ecartDeLIcone,
  EtatDeLEtiquette,
  PointeurSurLEtiquette,
  reponseAuPointeur,
} from './tagStyling';

// Les decisions de style de l'etiquette, prises hors rendu (ADR 0027). jsdom n'evalue ni les
// pseudo-classes ni la mise en page : le survol reel et les gabarits rendus se verifient dans
// le navigateur (apps/docs/e2e/tag.spec.ts).
const styles = () => renderHookOnDesktop(() => useStyles()).result.current;

const pastille = (surcharge: Partial<EtatDeLEtiquette> = {}) =>
  apparenceDeLaPastille(styles(), { size: 'sm', survolee: false, selectionnee: false, fermable: false, ...surcharge });

const pointeur = (surcharge: Partial<PointeurSurLEtiquette> = {}) =>
  reponseAuPointeur({
    manipulable: true,
    pastilleSurvolee: false,
    croixSurvolee: false,
    selectionnee: false,
    ...surcharge,
  });

describe('la reponse au pointeur', () => {
  // Une etiquette qui ne se ferme pas et n'appartient a aucun groupe de selection ne se
  // manipule pas : la faire foncer au survol promettrait une interaction qui n'existe pas.
  // C'est la regle de Primer, dont le `Token` descriptif est un `span` inerte.
  test('laisse inerte une etiquette purement descriptive', () => {
    expect(pointeur({ manipulable: false, pastilleSurvolee: true }).survolee).toBe(false);
  });

  test('fonce une etiquette manipulable sous le pointeur', () => {
    expect(pointeur({ pastilleSurvolee: true }).survolee).toBe(true);
  });

  // Deux `Pressable` imbriques : react-native-web retire le survol du parent des que le
  // pointeur entre dans l'enfant. Sans couture, passer du libelle a la croix faisait
  // *eclaircir* l'etiquette, comme si on en etait sorti - alors qu'on s'apprete a la fermer.
  test('garde l etiquette foncee quand le pointeur passe du libelle a la croix', () => {
    expect(pointeur({ croixSurvolee: true }).survolee).toBe(true);
  });

  // La croix suit l'etat de l'etiquette, pas seulement sa propre cible de survol : sinon
  // l'etiquette reste a deux tons tant que le pointeur n'est pas exactement sur la croix.
  test('fonce la croix quand le pointeur survole l etiquette', () => {
    expect(pointeur({ pastilleSurvolee: true }).fonce).toBe(true);
  });

  test('fonce la croix d une etiquette selectionnee', () => {
    expect([pointeur({ selectionnee: true }).fonce, pointeur().fonce]).toEqual([true, false]);
  });
});

describe('la croix', () => {
  // Chez Primer, le bouton de suppression fait toute la hauteur du token : son fond de survol
  // touche les bords de la pastille, et la surface cliquable est aussi grande que possible.
  test.each(['sm', 'md'] as const)('fait toute la hauteur de la pastille en %s', size => {
    const { width, height } = apparenceDeLaCroix(styles(), size, false);

    expect({ width, height }).toEqual({ width: pastille({ size }).height, height: pastille({ size }).height });
  });

  // Primer decolle la croix du libelle : 4 px sur son cran medium (notre sm), 6 sur large
  // (notre md). Sans cet ecart, la croix touche la derniere lettre.
  test.each([
    ['sm', 4],
    ['md', 6],
  ] as const)('se decolle du libelle en %s', (size, ecart) => {
    expect(apparenceDeLaCroix(styles(), size, false).marginLeft).toBe(ecart);
  });

  // La croix est posee dans la boite de contenu, donc a l'epaisseur de la bordure du bord
  // exterieur. Primer compense par le meme decalage. Un `transform` plutot qu'une marge : il
  // n'entre pas dans le calcul de la largeur de la pastille.
  test('se ramene a fleur du bord de la pastille', () => {
    expect(apparenceDeLaCroix(styles(), 'sm', false).transform).toBe('translateX(1px)');
  });

  // Sa propre cible de survol dit a l'utilisateur qu'il s'apprete a supprimer, pas seulement
  // a survoler l'etiquette.
  test('pose un fond sur son cercle quand le pointeur l atteint', () => {
    expect(apparenceDeLaCroix(styles(), 'sm', true).backgroundColor).toBe('var(--background-transparent-hover)');
  });

  // « La position de l'icone ne doit jamais varier entre etats » (ALV-49). Formulee en negatif,
  // pour qu'un futur `padding` ou `margin` ajoute par megarde au survol tombe aussi.
  test('ne change que son fond entre le repos et le survol', () => {
    const { backgroundColor, ...survolee } = apparenceDeLaCroix(styles(), 'sm', true);

    expect({ fond: backgroundColor !== undefined, geometrie: survolee }).toEqual({
      fond: true,
      geometrie: apparenceDeLaCroix(styles(), 'sm', false),
    });
  });

  // La croix est un vrai bouton, et l'annonce aussi par le curseur.
  test('prend le curseur de la main', () => {
    expect(apparenceDeLaCroix(styles(), 'sm', false).cursor).toBe('pointer');
  });

  // Primer : `XIcon size={size === 'small' || size === 'medium' ? 12 : 16}`. Une icone de
  // 12 px dans un cercle de 24 px paraitrait perdue.
  test('grossit son icone avec la pastille', () => {
    expect([
      apparenceDeLIconeDeCroix(styles(), 'sm', false).size,
      apparenceDeLIconeDeCroix(styles(), 'md', false).size,
    ]).toEqual(['xs', 'sm']);
  });

  // Couleur explicite plutot que `currentColor` : React Native n'herite pas la couleur du
  // texte parent, et la croix resterait noire en natif quel que soit l'etat.
  test('fonce son icone avec l etiquette', () => {
    expect(apparenceDeLIconeDeCroix(styles(), 'sm', true).color).toBe(pastille({ survolee: true }).color);
  });

  test('garde au repos la teinte du libelle', () => {
    expect(apparenceDeLIconeDeCroix(styles(), 'sm', false).color).toBe(pastille().color);
  });
});

describe('le gabarit de la pastille', () => {
  // La puce ne declarait aucune hauteur : elle tombait sur la boite de contenu de la fonte
  // (15 px en sm, 25 px en md, mesures navigateur), et un `Tag` pose a cote d'un `Badge` ne
  // s'alignait pas. Le retrait vient de la meme echelle, sans quoi les deux se desaccordent.
  test.each([
    ['sm', 20, 6],
    ['md', 24, 8],
  ] as const)('tient le cran %s de l echelle de puce', (size, hauteur, retrait) => {
    const { height, paddingLeft } = pastille({ size });

    expect({ height, paddingLeft }).toEqual({ height: hauteur, paddingLeft: retrait });
  });

  // Declarer une hauteur ne suffit pas : un element `inline` l'ignore. `inline-flex` plutot
  // que `flex`, sinon la puce s'etire sur toute la largeur. Le choix de Primer et de Base.
  test('se rend en boite, sans quoi sa hauteur reste decorative', () => {
    expect(pastille().display).toBe('inline-flex');
  });

  // ALV-52 et ALV-53 lient la typographie a des styles publies. On compare les deux crans
  // plutot que de figer une taille : ce qui compte, c'est qu'ils different.
  test('donne une typographie distincte a chaque cran', () => {
    const petite = pastille({ size: 'sm' });
    const grande = pastille({ size: 'md' });

    expect([petite.fontSize !== grande.fontSize, petite.lineHeight !== grande.lineHeight]).toEqual([true, true]);
  });

  // La bordure est le support du contraste que la selection vient foncer. Son epaisseur est
  // une valeur de maquette, figee ; sa couleur ne l'est pas, seules ses variations comptent.
  test('cerne la pastille d une bordure d un pixel', () => {
    expect(pastille().borderWidth).toBe(1);
  });

  // Primer : `[data-is-remove-btn='true'] { padding-right: 0 }`. La croix faisant toute la
  // hauteur, le retrait la repousserait vers l'interieur.
  test('supprime le retrait droit quand elle porte une croix', () => {
    expect([pastille({ fermable: true }).paddingRight, pastille().paddingRight]).toEqual([0, 6]);
  });

  // Primer interdit le retour a la ligne dans un token et coupe a l'ellipse : un libelle long
  // casserait sinon la pastille en deux lignes.
  test('coupe un libelle trop long au lieu de le renvoyer a la ligne', () => {
    const { whiteSpace, overflow, textOverflow, maxWidth } = pastille();

    expect({ whiteSpace, overflow, textOverflow, maxWidth }).toEqual({
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
    });
  });

  // `max-width: 100%` ne suffit pas : un element flex refuse de retrecir sous son contenu tant
  // que sa largeur minimale est `auto`. Mesure au navigateur avant correction : pastille de
  // 401 px dans un parent de 260, sans ellipse visible.
  test('laisse son conteneur retrecir sous la taille du libelle', () => {
    const { minWidth, maxWidth } = styles().tagContainer;

    expect({ minWidth, maxWidth }).toEqual({ minWidth: 0, maxWidth: '100%' });
  });

  // `Pressable` de react-native-web pose `cursor: pointer` sur ce qu'il enveloppe : laisser ce
  // curseur ferait passer chaque etiquette pour un bouton. Primer retombe sur `cursor: auto`.
  test('ne prend jamais le curseur de la main', () => {
    expect(styles().zoneDeSurvol.cursor).toBe('auto');
  });

  // L'ecart avant le libelle suit Primer (4, puis 6 px sur son grand cran). Il vit sur l'icone
  // et non sur le texte, pour qu'une etiquette sans icone n'herite d'aucun espace.
  test.each([
    ['sm', 4],
    ['md', 6],
  ] as const)('decolle l icone du libelle en %s', (size, ecart) => {
    expect(ecartDeLIcone(styles(), size).marginRight).toBe(ecart);
  });
});

describe('les etats de la pastille', () => {
  // Les deux signaux de l'ADR 0020, identiques dans les deux crans : la selection fonce la
  // bordure et le libelle.
  test.each(['sm', 'md'] as const)('fonce bordure et libelle a la selection en %s', size => {
    const repos = pastille({ size });
    const selectionnee = pastille({ size, selectionnee: true });

    expect([selectionnee.borderColor !== repos.borderColor, selectionnee.color !== repos.color]).toEqual([true, true]);
  });

  // Le coeur de l'ADR 0020 : le survol fonce le libelle sans toucher la bordure, sinon passer
  // le pointeur sur une etiquette la ferait passer pour selectionnee.
  test.each(['sm', 'md'] as const)('ne fonce que le libelle au survol en %s', size => {
    const repos = pastille({ size });
    const survolee = pastille({ size, survolee: true });

    expect({ libelle: survolee.color !== repos.color, bordure: survolee.borderColor }).toEqual({
      libelle: true,
      bordure: repos.borderColor,
    });
  });

  // Il n'existe pas de troisieme gris, reserve a l'un des deux signaux.
  test('fonce le libelle de la meme facon au survol et a la selection', () => {
    expect(pastille({ survolee: true }).color).toBe(pastille({ selectionnee: true }).color);
  });

  // La seule combinaison ou les deux signaux se superposent : le survol n'y ajoute rien.
  test('ne change rien de plus au survol d une pastille deja selectionnee', () => {
    expect(pastille({ selectionnee: true, survolee: true })).toEqual(pastille({ selectionnee: true }));
  });
});
