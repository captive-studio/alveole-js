import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { fireEvent, renderHookOnDesktop, renderOnDesktop } from '@/__tests__/helpers/renderWeb';
import { Tag } from './Tag';
import { useStyles } from './Tag.styles';

// La puce ne declarait aucune hauteur : elle tombait sur ce que la police lui laissait, et
// comme elle se rend `inline`, ce n'etait meme pas la hauteur de ligne mais la boite de
// contenu de la fonte (15 px en sm, 25 px en md, mesures navigateur). Un `Tag` et un `Badge`
// poses dans la meme cellule ne s'alignaient donc pas, et le moindre changement de metrique
// de fonte redimensionnait la puce sans que personne ne l'ait decide.
it('tient la hauteur du cran md de l echelle de puce', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.tagMd.height).toBe(24);
});

// Le `size` ne changeait que la police : les deux crans n'avaient aucun gabarit propre.
it('tient la hauteur du cran sm de l echelle de puce', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.tagSm.height).toBe(20);
});

// Pendant horizontal des deux tests ci-dessus : sans lui, la hauteur viendrait de l'echelle
// et le retrait d'un litteral, et les deux se desaccorderaient au premier ajustement. C'est
// la faute exacte relevee sur les boutons et les champs au chantier precedent.
it('creuse les deux crans selon l echelle de puce', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect({ sm: result.current.tagSm.paddingLeft, md: result.current.tagMd.paddingLeft }).toEqual({
    sm: 6,
    md: 8,
  });
});

// Declarer une hauteur ne suffit pas : un element `inline` l'ignore, et ses retraits
// verticaux debordent sur les lignes voisines au lieu de les ecarter. `inline-flex` plutot
// que `flex`, sinon la puce cesse d'epouser son libelle et s'etire sur toute la largeur
// disponible. C'est le choix de Primer pour `Label` et de Base pour `Tag`.
it('se rend en boite, sans quoi sa hauteur reste decorative', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.tag.display).toBe('inline-flex');
});

// Le survol est le seul etat que jsdom peut reellement exercer : il ne vient pas d'une
// pseudo-classe CSS, que jsdom n'evalue pas, mais de l'etat du `Pressable`, que
// react-native-web pilote en JS sur les evenements de pointeur. C'est aussi pour ca que le
// survol traverse la pastille : un `hoverStyle` Tamagui ne descendrait ni jusqu'au libelle
// ni jusqu'a la croix, qui doivent foncer ensemble.
const libelle = (container: HTMLElement) => elementDuType(container.querySelector('tag typography'), HTMLElement);
// La zone de survol est l'enfant direct de l'etiquette : le `Pressable` qui capte le
// pointeur. `mouseenter` ne remonte pas, viser l'etiquette elle-meme ne declencherait rien.
// On extrait des valeurs simples plutot que de rendre le `CSSStyleDeclaration` : compare
// deux declarations et Jest copie en profondeur un objet DOM cyclique pour afficher son
// diff, ce qui fait tomber le runner en memoire au lieu de rapporter l'echec.
const teinte = (container: HTMLElement) => {
  const { color, borderColor } = libelle(container).style;

  return { color, borderColor };
};
const survoler = (container: HTMLElement) => {
  fireEvent.mouseEnter(container.querySelector('tag')!.firstElementChild!);

  return teinte(container);
};
const auRepos = teinte;

const etiquette = (props: { selected?: boolean; interactive?: boolean; size?: 'sm' | 'md' } = {}) => {
  const { size = 'sm', ...reste } = props;

  return renderOnDesktop(
    <Tag size={size} {...reste}>
      Brouillon
    </Tag>,
  ).container;
};

// Second signal de l'ADR 0020, independant du premier : le survol fonce le libelle a lui
// seul, sans que l'etiquette soit selectionnee.
// ALV-53 exige le « meme traitement de survol » en md qu'en sm : les deux crans passent donc
// par la meme table. Sans elle, le survol n'etait exerce qu'en sm et la parite reposait sur
// le fait que le code n'en parle pas - un argument, pas une mesure.
it.each(['sm', 'md'] as const)('change la couleur du libelle au survol en %s', size => {
  const survolee = etiquette({ interactive: true, size });
  const couleurAuRepos = auRepos(survolee).color;

  expect(survoler(survolee).color).not.toBe(couleurAuRepos);
});

// Le coeur de l'ADR 0020 : le survol ne touche pas la bordure. C'est ce qui garde les deux
// signaux lisibles cote a cote dans un groupe de filtres - si le survol foncait aussi la
// bordure, passer le pointeur sur une etiquette la ferait passer pour selectionnee.
it.each(['sm', 'md'] as const)('laisse la bordure intacte au survol en %s', size => {
  const survolee = etiquette({ interactive: true, size });
  const bordureAuRepos = auRepos(survolee).borderColor;

  expect(survoler(survolee).borderColor).toBe(bordureAuRepos);
});

// Les deux signaux foncent le libelle de la meme facon : il n'existe pas de troisieme gris,
// intermediaire ou plus sombre, reserve a l'un des deux.
it('fonce le libelle de la meme facon au survol et a la selection', () => {
  const selectionnee = etiquette({ selected: true });

  expect(survoler(etiquette({ interactive: true })).color).toBe(auRepos(selectionnee).color);
});

// La quatrieme combinaison de l'ADR 0020, la seule ou les deux signaux se superposent : le
// survol d'une etiquette deja selectionnee ne doit rien ajouter ni rien reprendre. Eprouve
// par mutation : faire toucher la bordure au survol fait tomber ce test.
it('ne change rien de plus au survol d une pastille deja selectionnee', () => {
  const selectionnee = etiquette({ selected: true });
  const avant = auRepos(selectionnee);

  expect(survoler(selectionnee)).toEqual(avant);
});

// jsdom ne synthetise pas le clic qu'un navigateur declenche sur Entree ou Espace : tirer
// un `keyDown` ici ne mesurerait que jsdom. Ce qui rend reellement la croix activable au
// clavier, c'est qu'elle soit un vrai `<button>` dans l'ordre de tabulation - et ca, ca
// s'observe. Un `<div role="button">` aurait le meme rendu et la meme annonce, mais
// n'obeirait ni a Entree ni a Espace sans code supplementaire.
it('fait de la croix un bouton natif atteignable au clavier', () => {
  const { container } = renderOnDesktop(
    <Tag size="sm" closable>
      Brouillon
    </Tag>,
  );
  const croix = container.querySelector('[role="button"]')!;

  expect({ element: croix.tagName, tabulation: croix.getAttribute('tabindex') }).toEqual({
    element: 'BUTTON',
    tabulation: '0',
  });
});

// La croix a sa propre cible de survol, distincte de celle de l'etiquette : c'est ce qui
// dit a l'utilisateur qu'il s'apprete a supprimer, et pas seulement a survoler l'etiquette.
// Le fond de l'etiquette, lui, ne bouge dans aucun etat.
it('pose un fond sur le cercle de la croix quand le pointeur l atteint, sans toucher l etiquette', () => {
  const { container } = renderOnDesktop(
    <Tag size="sm" closable>
      Brouillon
    </Tag>,
  );
  const croix = elementDuType(container.querySelector('[role="button"]'), HTMLElement);
  const fondDeLEtiquette = libelle(container).style.backgroundColor;

  fireEvent.mouseEnter(croix);

  expect({ croix: croix.style.backgroundColor, etiquette: libelle(container).style.backgroundColor }).toEqual({
    croix: 'var(--background-transparent-hover)',
    etiquette: fondDeLEtiquette,
  });
});

// La croix suit l'etat de l'etiquette, pas seulement sa propre cible de survol : survoler le
// libelle doit deja foncer la croix, sinon l'etiquette se retrouve a deux tons pendant tout
// le temps ou le pointeur est sur elle sans etre exactement sur la croix.
it('fonce la croix quand le pointeur survole l etiquette', () => {
  const { container } = renderOnDesktop(
    <Tag size="sm" closable>
      Brouillon
    </Tag>,
  );
  const trait = () => elementDuType(container.querySelector('[role="button"] svg'), SVGElement).style.stroke;
  const auRepos = trait();

  fireEvent.mouseEnter(container.querySelector('tag')!.firstElementChild!);

  expect(trait()).not.toBe(auRepos);
});

// Une etiquette qui ne se ferme pas et qui n'appartient a aucun groupe de selection ne se
// manipule pas : la faire foncer au survol promettrait une interaction qui n'existe pas.
// C'est la regle de Primer, dont le `Token` descriptif est un `span` inerte et ne prend ses
// styles de survol que rendu en bouton ou dote d'un `onRemove`.
it('ne reagit pas au survol quand l etiquette est purement descriptive', () => {
  const descriptive = etiquette();
  const avant = auRepos(descriptive);

  expect(survoler(descriptive)).toEqual(avant);
});

// `Pressable` de react-native-web pose `cursor: pointer` sur tout ce qu'il enveloppe. Notre
// conteneur ne sert qu'a capter le pointeur : laisser ce curseur ferait passer chaque
// etiquette du catalogue pour un bouton. Primer traite le meme cas avec
// `data-cursor-is-interactive`, qui retombe sur `cursor: auto` quand le token n'est pas
// actionnable. L'etiquette ne l'est jamais : seule sa croix l'est.
// Le curseur est pose en style en ligne, sans quoi il ne surcharge pas la classe de
// react-native-web et n'est pas observable ici.
it('ne donne jamais le curseur de la main a l etiquette', () => {
  const container = etiquette({ interactive: true });

  expect(elementDuType(container.querySelector('tag')?.firstElementChild, HTMLElement).style.cursor).toBe('auto');
});

// Pendant du test ci-dessus : la croix, elle, est un vrai bouton, et doit l'annoncer aussi
// par le curseur.
it('donne le curseur de la main a la croix', () => {
  const { container } = renderOnDesktop(
    <Tag size="sm" closable>
      Brouillon
    </Tag>,
  );

  expect(elementDuType(container.querySelector('[role="button"]'), HTMLElement).style.cursor).toBe('pointer');
});

// Deux `Pressable` imbriques : react-native-web retire le survol du parent des que le
// pointeur entre dans l'enfant. Sans couture, passer du libelle a la croix faisait
// *eclaircir* l'etiquette, comme si on en etait sorti - alors qu'on s'apprete a la fermer.
// Mesure au navigateur avant correction : libelle a rgb(55,58,63) sur le libelle, retour a
// rgb(95,101,113) sur la croix, sur les cinq etiquettes fermables du catalogue.
it('garde l etiquette foncee quand le pointeur passe du libelle a la croix', () => {
  const { container } = renderOnDesktop(
    <Tag size="sm" closable>
      Brouillon
    </Tag>,
  );
  const zone = container.querySelector('tag')!.firstElementChild!;
  const croix = container.querySelector('[role="button"]')!;

  fireEvent.mouseEnter(zone);
  const surLeLibelle = libelle(container).style.color;
  fireEvent.mouseLeave(zone);
  fireEvent.mouseEnter(croix);

  expect(libelle(container).style.color).toBe(surLeLibelle);
});

// Primer interdit le retour a la ligne dans un token et coupe a l'ellipse :
// `.TokenBase { white-space: nowrap }`, `.Token { max-width: 100% }` et
// `.TokenTextContainer { overflow: hidden; text-overflow: ellipsis; white-space: nowrap }`.
// Sans ca, un libelle long casse la pastille en deux lignes et deforme la rangee qui la
// porte, au lieu de se laisser couper.
it('coupe un libelle trop long au lieu de le renvoyer a la ligne', () => {
  const container = etiquette();
  const { whiteSpace, overflow, textOverflow, maxWidth } = libelle(container).style;

  expect({ whiteSpace, overflow, textOverflow, maxWidth }).toEqual({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  });
});

// `max-width: 100%` ne suffit pas : un element flex refuse de rétrécir sous la taille de son
// contenu tant que sa largeur minimale est `auto`. Primer pose `min-width: 0` sur son
// conteneur de texte pour cette raison precise. Mesure au navigateur avant correction :
// pastille de 401 px dans un parent de 260, sans ellipse visible malgre le `text-overflow`.
it('laisse la pastille retrecir sous la taille de son libelle', () => {
  const container = etiquette();
  const boite = elementDuType(container.querySelector('tag'), HTMLElement);

  expect({ minWidth: boite.style.minWidth, maxWidth: boite.style.maxWidth }).toEqual({
    minWidth: '0px',
    maxWidth: '100%',
  });
});

// Exigence explicite de l'epic et d'ALV-49 : « la position de l'icone ne doit jamais varier
// entre etats ». Elle tenait, mais rien ne l'empechait de regresser. On compare toutes les
// proprietes de style de la croix entre repos et survol : seul le fond a le droit de bouger.
// Formulee en negatif plutot qu'en liste de proprietes, pour qu'un futur `padding` ou
// `margin` ajoute par megarde au survol tombe aussi.
it('ne deplace jamais la croix entre le repos et le survol', () => {
  const { container } = renderOnDesktop(
    <Tag size="sm" closable>
      Brouillon
    </Tag>,
  );
  const croix = elementDuType(container.querySelector('[role="button"]'), HTMLElement);
  const geometrie = () =>
    Object.fromEntries(
      Array.from(croix.style)
        .filter(nom => nom !== 'background-color')
        .map(nom => [nom, croix.style.getPropertyValue(nom)]),
    );
  const auRepos = geometrie();

  fireEvent.mouseEnter(croix);

  expect(geometrie()).toEqual(auRepos);
});

// L'ADR 0019 donne deux facons d'etre manipulable : porter une croix, ou appartenir a un
// groupe de selection. Seule la seconde etait exercee. Sans ce test, remplacer
// `!!closable || 'selected' in props` par le seul `'selected' in props` passerait inapercu :
// une etiquette fermable cesserait de repondre au survol, alors qu'elle est la plus
// manipulable des deux.
it('fonce le libelle au survol d une etiquette seulement fermable', () => {
  const { container } = renderOnDesktop(
    <Tag size="sm" closable>
      Brouillon
    </Tag>,
  );
  const couleurAuRepos = auRepos(container).color;

  fireEvent.mouseEnter(container.querySelector('tag')!.firstElementChild!);

  expect(libelle(container).style.color).not.toBe(couleurAuRepos);
});

// ALV-52 et ALV-53 lient la typographie a des styles publies : XS.Bold en sm, SM.Bold en md.
// Rien ne l'asservissait : un cran qui prendrait la police de l'autre passait inapercu. On
// compare les deux crans entre eux plutot que de figer une taille, pour que la regle survive
// a un ajustement de l'echelle typographique - ce qui compte, c'est qu'ils different.
it('donne une typographie distincte a chaque cran', () => {
  const petite = libelle(etiquette({ size: 'sm' })).style;
  const grande = libelle(etiquette({ size: 'md' })).style;

  expect({
    police: petite.fontSize !== grande.fontSize,
    interligne: petite.lineHeight !== grande.lineHeight,
  }).toEqual({ police: true, interligne: true });
});

// `interactive` declare qu'on peut agir sur l'etiquette autrement qu'en la fermant : elle
// appartient a un groupe ou l'on choisit. C'est le mot de Primer, dont `isTokenInteractive`
// commande exactement le meme retour au survol. Une prop explicite plutot qu'une presence de
// cle : `<Tag {...options} />` ne doit pas gagner ou perdre le survol selon que l'objet
// repandu porte ou non `selected`.
it('reagit au survol quand l etiquette est declaree interactive', () => {
  const groupe = etiquette({ interactive: true });
  const couleurAuRepos = auRepos(groupe).color;

  expect(survoler(groupe).color).not.toBe(couleurAuRepos);
});

// Pendant du test ci-dessus : `selected` ne decrit qu'un etat, il ne declare plus rien. On
// l'eprouve a `false`, car a `true` la selection et le survol foncent le libelle de la meme
// facon et le test ne pourrait pas echouer. C'est exactement le cas que l'ancienne regle
// - la presence de la cle - rendait manipulable a tort.
it('ne reagit pas au survol d une etiquette non selectionnee et non interactive', () => {
  const figee = etiquette({ selected: false });
  const avant = auRepos(figee);

  expect(survoler(figee)).toEqual(avant);
});
