import { jetonsBouton, makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral, sans quoi
// `display: 'flex'` s'elargit en `string`. Une annotation, elle, effacerait les cles et avec
// elles `StyleKey`.
type Table = Record<string, StyleValue>;

// Le fichier etait une seule fonction de 229 lignes, decoupee par aspect : toutes les
// variantes ensemble, puis toutes les tailles, puis tous les etats desactives, puis toutes
// les icones. Une variante s'ecrivait donc en quatre endroits distincts. Le regroupement est
// desormais celui de `buttonVariants.ts` : une fonction par variante, qui tient tout ce qui
// change ensemble quand le design revoit cette variante.

const commun = ({ spacing, radius }: Theme) =>
  ({
    container: {
      // Reserve le meme contour sur chaque variante : avec une largeur automatique, une
      // bordure presente seulement sur secondary/danger ajouterait 2 px a leur gabarit.
      // Les variantes sans contour visible la gardent transparente, comme Primer.
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'transparent',
      borderTopLeftRadius: radius('md'),
      borderBottomLeftRadius: radius('md'),
      borderTopRightRadius: radius('md'),
      borderBottomRightRadius: radius('md'),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing('1W'),
      transitionProperty: 'all',
      transitionDuration: '150ms',
      transitionTimingFunction: 'ease',
    },
    title: {
      cursor: 'pointer',
      textAlign: 'center',
    },
    // Le spinner qui remplace le libelle se centre par-dessus lui, sans sortir le libelle du
    // flux : c'est ce dernier qui continue d'imposer la largeur du bouton. Primer obtient le
    // meme resultat en logeant les deux dans la meme cellule de sa grille.
    buttonLoader: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    /** Invisible mais toujours mesure : `display: none` ferait retrecir le bouton. */
    libelleMasque: {
      visibility: 'hidden',
    },
  }) satisfies Table;

const tailles = (theme: Theme) => {
  const { sm, md, lg } = jetonsBouton(theme).tailles;
  return {
    smContainer: {
      height: '100%',
      paddingLeft: sm.paddingInline,
      paddingRight: sm.paddingInline,

      borderTopLeftRadius: sm.rayon,
      borderBottomLeftRadius: sm.rayon,
      borderTopRightRadius: sm.rayon,
      borderBottomRightRadius: sm.rayon,
    },
    mdContainer: {
      height: '100%',
      paddingLeft: md.paddingInline,
      paddingRight: md.paddingInline,
    },
    lgContainer: {
      height: '100%',
      paddingLeft: lg.paddingInline,
      paddingRight: lg.paddingInline,
    },
    // Litteraux dedies au Pressable : lui seul doit connaitre la hauteur en pixels, pour
    // l'absorber dans sa propre bordure via boxSizing. Le conteneur interieur, lui, se
    // contente de remplir cet espace (cf. smContainer et consorts, height: '100%').
    hauteurSm: { height: sm.height },
    hauteurMd: { height: md.height },
    hauteurLg: { height: lg.height },
    smTitle: sm.typo,
    mdTitle: md.typo,
    lgTitle: lg.typo,
  } satisfies Table;
};

/** `selected` court-circuite la variante : ces styles valent pour les cinq. */
const selection = ({ color }: Theme) =>
  ({
    selectedContainer: {
      backgroundColor: color.light.background['alt-primary'],
      borderColor: color.light.border['default-primary'],
      borderWidth: 1,
    },
    selectedContainerHover: {},
    selectedTitle: {
      color: color.light.text['action-high-primary'],
    },
    selectedIcon: {
      color: color.light.text['action-high-primary'],
    },
  }) satisfies Table;

const primaire = (theme: Theme) => {
  const repos = jetonsBouton(theme).variantes.primary;
  return {
    primaryTitle: {
      color: repos.texte,
    },
    primaryContainer: {
      backgroundColor: repos.fond,
    },
    primaryTitleHover: {
      color: theme.color.light.text['inverted-primary'],
    },
    primaryContainerHover: {
      backgroundColor: theme.color.light.background['action-high-primary-hover'],
    },
    primaryContainerPressed: {
      backgroundColor: theme.color.light.background['action-high-primary-hover'],
    },
    primaryTitleDisabled: {
      cursor: 'not-allowed',
      color: theme.color.light.text['disabled-grey'],
    },
    primaryContainerDisabled: {
      cursor: 'not-allowed',
      backgroundColor: theme.color.light.background['disabled-grey'],
    },
    primaryIcon: {
      color: theme.color.light.text['inverted-primary'],
    },
    primaryIconHover: {
      color: theme.color.light.text['inverted-primary'],
    },
    primaryIconDisabled: {
      color: theme.color.light.text['disabled-grey'],
    },
  } satisfies Table;
};

const secondaire = (theme: Theme) => {
  const repos = jetonsBouton(theme).variantes.secondary;
  return {
    secondaryTitle: {
      color: repos.texte,
    },
    secondaryContainer: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: repos.bordure,
      backgroundColor: repos.fond,
    },
    secondaryTitleHover: {
      color: theme.color.light.text['action-high-grey'],
    },
    secondaryContainerHover: {
      borderColor: theme.color.light.border['default-grey'],
      backgroundColor: theme.color.light.background['transparent-hover'],
    },
    secondaryContainerPressed: {
      borderColor: theme.color.light.border['default-grey'],
      backgroundColor: theme.color.light.background['transparent-hover'],
    },
    secondaryTitleDisabled: {
      cursor: 'not-allowed',
      color: theme.color.light.text['disabled-grey'],
    },
    secondaryContainerDisabled: {
      cursor: 'not-allowed',
      borderColor: theme.color.light.border['disabled-grey'],
    },
    secondaryIcon: {
      color: theme.color.light.text['action-high-grey'],
    },
    secondaryIconHover: {
      color: theme.color.light.text['action-high-grey'],
    },
    secondaryIconDisabled: {
      color: theme.color.light.text['disabled-grey'],
    },
  } satisfies Table;
};

const tertiaire = (theme: Theme) => {
  const repos = jetonsBouton(theme).variantes.tertiary;
  return {
    tertiaryTitle: {
      color: repos.texte,
    },
    tertiaryContainer: {},
    tertiaryTitleHover: {
      color: theme.color.light.text['action-high-grey'],
    },
    tertiaryContainerHover: {
      backgroundColor: theme.color.light.background['transparent-hover'],
    },
    tertiaryContainerPressed: {
      backgroundColor: theme.color.light.background['transparent-hover'],
    },
    tertiaryTitleDisabled: {
      cursor: 'not-allowed',
      color: theme.color.light.text['disabled-grey'],
    },
    tertiaryContainerDisabled: {
      cursor: 'not-allowed',
    },
    tertiaryIcon: {
      color: theme.color.light.text['action-high-grey'],
    },
    tertiaryIconHover: {
      color: theme.color.light.text['action-high-grey'],
    },
    tertiaryIconDisabled: {
      color: theme.color.light.text['disabled-grey'],
    },
  } satisfies Table;
};

const dangereuse = (theme: Theme) => {
  const repos = jetonsBouton(theme).variantes.danger;
  return {
    dangerTitle: {
      color: repos.texte,
    },
    dangerContainer: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: repos.bordure,
      backgroundColor: repos.fond,
    },
    dangerTitleHover: {
      color: theme.color.light.text['action-high-error'],
    },
    dangerContainerHover: {
      borderColor: theme.color.light.border['default-grey'],
      backgroundColor: theme.color.light.background['default-grey'],
    },
    dangerContainerPressed: {
      backgroundColor: theme.color.alpha(theme.color.light.background['action-high-error'], 0.8),
    },
    dangerTitleDisabled: {
      cursor: 'not-allowed',
      color: theme.color.light.text['disabled-grey'],
    },
    dangerContainerDisabled: {
      cursor: 'not-allowed',
      backgroundColor: theme.color.light.background['default-grey'],
      borderColor: theme.color.light.border['disabled-grey'],
    },
    dangerIcon: {
      color: theme.color.light.text['inverted-primary'],
    },
    dangerIconHover: {
      color: theme.color.light.text['action-high-error'],
    },
    dangerIconDisabled: {
      color: theme.color.light.text['disabled-grey'],
    },
  } satisfies Table;
};

export const useStyles = makeStyles(theme => ({
  ...commun(theme),
  ...tailles(theme),
  ...selection(theme),
  ...primaire(theme),
  ...secondaire(theme),
  ...tertiaire(theme),
  ...dangereuse(theme),
}));
