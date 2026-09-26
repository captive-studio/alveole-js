import { makeStyles, type Radius } from '@alveole/theme';

// La croix ne bouge jamais entre ses etats : son icone est centree sur les deux axes, et
// seul le fond du cercle change au survol. Des retraits calcules par etat la feraient
// sautiller d'un pixel des que le pointeur l'atteint.
const cercleDeLaCroix = (cote: number, rayon: Radius, ecart: number) => ({
  marginLeft: ecart,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  cursor: 'pointer' as const,
  // La croix vit dans la boite de contenu, donc a l'epaisseur de la bordure du bord
  // exterieur. On la ramene a fleur, comme le `translate(borderOffset, -borderOffset)` du
  // bouton de suppression de Primer. Un `transform` n'entre pas dans le calcul de largeur.
  transform: 'translateX(1px)',
  borderRadius: rayon,
  width: cote,
  height: cote,
});

export const useStyles = makeStyles(({ radius, text, color, pill }) => ({
  tagContainer: {
    display: 'block',
    // Sans largeur minimale nulle, un element flex refuse de retrecir sous la taille de son
    // contenu et l'ellipse du libelle ne se declenche jamais. Primer pose la meme chose sur
    // son conteneur de texte.
    minWidth: 0,
    maxWidth: '100%',
  },
  // `Pressable` de react-native-web pose `cursor: pointer` sur ce qu'il enveloppe. Ce
  // conteneur-ci ne sert qu'a capter le pointeur, l'etiquette n'est jamais cliquable :
  // le curseur revient a celui du texte, comme le `cursor: auto` d'un token Primer non
  // actionnable.
  zoneDeSurvol: {
    cursor: 'auto' as const,
  },
  // La croix faisant toute la hauteur, un retrait a sa droite la repousserait vers
  // l'interieur et desequilibrerait la pastille. Primer fait de meme.
  pastilleFermable: {
    paddingRight: 0,
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: radius('full'),
    borderWidth: 1,
    borderColor: color.light.border['default-grey'],
    color: color.light.text['mention-grey'],
    backgroundColor: color.light.background['contrast-grey'],
    // Une etiquette ne se plie pas sur deux lignes : elle se laisse couper. Primer pose
    // `white-space: nowrap` sur la pastille, `max-width: 100%` et une ellipse sur son
    // conteneur de texte. Un libelle long deformerait sinon la rangee qui la porte.
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  // Le survol seul fonce le libelle sans toucher la bordure : c'est la selection qui
  // apporte le contraste de bordure, et le survol d'une pastille deja selectionnee
  // n'ajoute donc rien (ADR 0020).
  tagSurvole: {
    color: color.light.text['default-grey'],
  },
  tagSelected: {
    borderColor: color.light.border['contrast-grey'],
    color: color.light.text['default-grey'],
  },

  // Crans de taille.
  // Aucun retrait vertical : la hauteur est fixee et le libelle centre par `alignItems`.
  // Un padding vertical en plus ne ferait que rouvrir la porte a une hauteur implicite.
  tagSm: {
    height: pill('sm').height,
    paddingLeft: pill('sm').paddingInline,
    paddingRight: pill('sm').paddingInline,
    ...text['Corps de texte'].XS.Bold,
  },
  tagMd: {
    height: pill('md').height,
    paddingLeft: pill('md').paddingInline,
    paddingRight: pill('md').paddingInline,
    ...text['Corps de texte'].SM.Bold,
  },

  // L'icone precede le libelle. L'ecart vit sur l'icone et non sur le texte : sans icone,
  // aucun espace parasite ne subsiste devant le libelle. Primer le porte de 4 a 6 px sur son
  // grand cran, notre md valant son large.
  iconeSm: {
    marginRight: 4,
  },
  iconeMd: {
    marginRight: 6,
  },
  croixSurvolee: {
    backgroundColor: color.light.background['transparent-hover'],
  },
  // La croix fait toute la hauteur de la pastille, comme chez Primer : son fond de survol
  // touche les bords au lieu de flotter, et la cible cliquable est la plus large possible.
  croixSm: cercleDeLaCroix(pill('sm').height, radius('full'), 4),
  croixMd: cercleDeLaCroix(pill('md').height, radius('full'), 6),
}));
