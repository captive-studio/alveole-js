import { focusRing, makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const coque = ({ color, spacing }: Theme) =>
  ({
    container: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing('075'),
    },
    tabs: {
      flex: 1,
      minHeight: 0,
      flexDirection: 'column',
    },
    tabsList: {
      borderBottomLeftRadius: spacing('000'),
      borderBottomRightRadius: spacing('000'),
      gap: spacing('075'),
      boxSizing: 'border-box',
      borderColor: color.light.border['default-grey'],
      borderBottomWidth: 1,
      backgroundColor: 'transparent',
      overflowX: 'scroll', // On ajoute un scroll horizontal pour les petits écrans
    },
    tabsContent: {
      flex: 1,
      minHeight: 0,
      overflow: 'hidden',
    },
  }) satisfies Table;

const onglet = ({ color, spacing, radius }: Theme) =>
  ({
    tabsTab: {
      appearance: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      paddingTop: spacing('1W'),
      paddingBottom: spacing('1W'),
      paddingLeft: 0,
      paddingRight: 0,
      boxSizing: 'border-box',
      borderWidth: 0,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      gap: spacing('1W'),
    },
    tabsTabActive: {
      borderBottomColor: color.light.border['default-primary'],
      borderBottomWidth: 2,
    },
    // `tabsTab` (le bouton focalisable) n'a pas de rayon propre : sans `borderRadius` ici,
    // l'anneau dessinerait un rectangle sec autour de la zone de clic complete au lieu
    // d'epouser la pastille arrondie (`wrapper`, `radius('md')`) qu'il contient visuellement.
    tabsTabFocused: { ...focusRing('default'), borderRadius: radius('md') },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      transitionProperty: 'all',
      transitionDuration: '0.1s',
      transitionTimingFunction: 'ease-in-out',
      gap: spacing('1W'),
      // Meme gabarit qu'un bouton tertiaire md (`control('md')` : hauteur 32, paddingInline 12).
      // A '025'/'050', l'onglet inactif tombait sur la hauteur sm (28) : a cote d'un bouton md
      // il se lisait comme un cran plus petit que les autres commandes de la page.
      paddingTop: spacing('1,5V'),
      paddingBottom: spacing('1,5V'),
      paddingLeft: spacing('3V'),
      paddingRight: spacing('3V'),
      borderRadius: radius('md'),
    },
    wrapperHover: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.light.background['transparent-hover'],
    },
  }) satisfies Table;

const contenuDeLOnglet = ({ color, text }: Theme) =>
  ({
    tabIcon: {
      color: color.light.text['mention-grey'],
    },
    tabIconHover: {
      color: color.light.text['default-grey'],
    },
    tabsLabel: {
      ...text['Corps de texte'].SM.Regular,
    },
    tabsLabelActive: {
      ...text['Corps de texte'].SM.Bold,
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({ ...coque(theme), ...onglet(theme), ...contenuDeLOnglet(theme) }));
