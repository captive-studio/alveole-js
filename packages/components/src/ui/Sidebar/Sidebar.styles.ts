import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

// Titre de groupe et libellé d'item partent de la même verticale, comme chez Primer qui les
// aligne au pixel. L'item y arrive par trois retraits emboîtés : la marge de son conteneur,
// le padding de ce conteneur, puis celui de la pastille qui porte le texte. Le titre n'en a
// qu'un seul, d'où cette somme explicite : sans elle les deux dérivent au premier réglage.
const retraitDuContenu = (spacingValue: Theme['spacingValue']) =>
  spacingValue('075') + spacingValue('050') + spacingValue('050');

const coque = ({ color, spacing, spacingValue, isVariant }: Theme) =>
  ({
    sidebar: {
      backgroundColor: '#FFFFFF',
      borderRightWidth: 1,
      borderColor: color.light.border['default-grey'],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      alignSelf: 'stretch',
    },
    header: {},
    headerContent: {
      display: 'flex',
      flexDirection: 'row',
      padding: spacingValue('050'),
    },
    logo: {
      marginLeft: isVariant('mobile') || isVariant('tablet') ? spacing('150') : 0,
    },
    sidebarContent: {
      flex: 1,
      justifyContent: 'space-between',
      width: '100%',
    },
    scrollView: {
      flex: 1,
      paddingTop: spacing('100'),
      paddingBottom: spacing('100'),
      zIndex: 1000,
      backgroundColor: '#FFFFFF',
    },
  }) satisfies Table;

const groupe = ({ text, color, spacing, spacingValue }: Theme) =>
  ({
    // L'écart qui détache deux groupes appartient au groupe, pas à son titre : porté par le
    // titre, il le collerait à sa propre liste tout en le faisant flotter sous la précédente.
    groupDesktop: {
      // 8, et non 16 : le titre porte déjà 8 de padding haut. C'est la somme des deux qui fait
      // face à l'écart posé au-dessus du séparateur, et qui le laisse à égale distance des
      // deux groupes qu'il sépare.
      marginTop: spacing('050'),
    },
    // Le titre de groupe recule derrière ses items, et ne se signale que par deux dimensions à
    // la fois : ici le gris de mention et la graisse. Les références divergent sur lesquelles
    // (Primer prend graisse et taille à couleur égale, Atlassian la couleur), mais aucune ne
    // cumule couleur plus sombre et graisse supérieure à celles des items. Voir docs/adr/0010.
    groupTitleDesktop: {
      ...text['Corps de texte'].XS.Bold,
      color: color.light.text['mention-grey'],
      paddingLeft: retraitDuContenu(spacingValue),
      paddingTop: spacing('050'),
      paddingBottom: spacing('050'),
    },
    // Même rapport que sur bureau, décalé d'un cran vers le haut de l'échelle puisque les items
    // du tiroir sont plus grands : le titre se pose un cran sous eux, en gris et plus gras.
    // À corps et graisse égaux, il se lisait comme une entrée cliquable de plus.
    groupTitleMobile: {
      ...text['Corps de texte'].SM.Bold,
      color: color.light.text['mention-grey'],
      // `2W` et non `3V` : c'est le retrait de l'item du tiroir, et quatre pixels d'écart ne
      // se lisent ni comme une indentation voulue ni comme un alignement.
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      // Moins haut qu'un item : un libellé qui occupe la hauteur d'une cible tactile se lit
      // comme cliquable, et coûte cette hauteur à chaque groupe d'une liste qu'on fait défiler.
      paddingTop: spacing('3V'),
      paddingBottom: spacing('3V'),
    },
  }) satisfies Table;

const item = ({ color, spacing }: Theme) =>
  ({
    // 32px de haut en tout : 20 de hauteur de ligne plus 6 de part et d'autre, comme dans la
    // maquette. Le retrait horizontal reste à 8, c'est lui qui porte la verticale du contenu.
    sidebarItemDesktop: {
      borderRadius: spacing('050'),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing('050'),
      paddingTop: spacing('1,5V'),
      paddingBottom: spacing('1,5V'),
      paddingLeft: spacing('1W'),
      paddingRight: spacing('1W'),
      width: '100%',
      color: color.light.text['title-grey'],
      stroke: color.light.text['title-grey'],
    },

    sidebarItemMobile: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing('3V'),
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      paddingTop: spacing('2W'),
      paddingBottom: spacing('2W'),
      width: '100%',
      color: color.light.text['title-grey'],
      stroke: color.light.text['title-grey'],
    },
    sidebarItemHover: {
      backgroundColor: color.light.background['default-grey-hover'],
    },
  }) satisfies Table;

const etatDeLItem = ({ color, spacing, radius }: Theme) =>
  ({
    sidebarItemSelectedDesktop: {
      backgroundColor: color.light.background['contrast-grey'],
    },
    sidebarItemSelectedMobile: {
      borderRadius: radius('lg'),
      backgroundColor: color.light.background['alt-primary'],
    },
    sidebarItemContainerDesktop: {
      paddingLeft: spacing('050'),
      paddingRight: spacing('050'),
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      marginLeft: spacing('075'),
      marginRight: spacing('025'),
    },
    sidebarItemContainerMobile: {
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      paddingTop: spacing('2W'),
      paddingBottom: spacing('2W'),
      gap: spacing('3V'),
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      borderRadius: radius('md'),
      marginLeft: spacing('075'),
      marginRight: spacing('025'),
    },
  }) satisfies Table;

const titreDeLItem = ({ text, color }: Theme) =>
  ({
    sidebarItemTitleSelectedDesktop: {
      ...text['Corps de texte'].SM.Bold,
      color: color.light.text['default-grey'],
      stroke: color.light.text['default-grey'],
    },
    sidebarItemTitleSelectedMobile: {
      ...text['Corps de texte'].MD.Medium,
      color: color.light.text['default-grey'],
      stroke: color.light.text['mention-grey'],
    },
    sidebarItemTitleDesktop: {
      ...text['Corps de texte'].SM.Regular,
      color: color.light.text['default-grey'],
      stroke: color.light.text['default-grey'],
    },
    sidebarItemTitleMobile: {
      ...text['Corps de texte'].MD.Medium,
      color: color.light.text['default-grey'],
      stroke: color.light.text['default-grey'],
    },
    sidebarItemTitleCurrentHoverDesktop: {
      ...text['Corps de texte'].SM.Bold,
    },

    sidebarItemTitleCurrentHoverMobile: {
      ...text['Corps de texte'].MD.Medium,
      color: color.light.background['action-high-primary'],
    },
  }) satisfies Table;

const indicateur = ({ color, spacing, spacingValue }: Theme) =>
  ({
    sidebarItemSelectedIndicator: {
      height: '100%',
      width: spacingValue('025'),
      position: 'absolute',
      left: 0,
    },
    sidebarItemSelectedIndicatorContent: {
      width: '100%',
      minHeight: spacing('150'),
      backgroundColor: color.light.border['default-primary'],
      margin: 'auto',
      borderRadius: spacing('050'),
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({
  ...coque(theme),
  ...groupe(theme),
  ...item(theme),
  ...etatDeLItem(theme),
  ...titreDeLItem(theme),
  ...indicateur(theme),
}));
