import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

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

const commun = ({ spacing, spacingValue, radius }: Theme) =>
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
      gap: spacing('050'),
      transitionProperty: 'all',
      transitionDuration: '150ms',
      transitionTimingFunction: 'ease',
    },
    buttonLoader: {
      position: 'absolute',
      right: spacingValue('075'),
    },
    title: {
      cursor: 'pointer',
      textAlign: 'center',
    },
  }) satisfies Table;

const tailles = ({ text, spacing, radius, control }: Theme) =>
  ({
    smContainer: {
      height: '100%',
      paddingLeft: spacing('3V'),
      paddingRight: spacing('3V'),

      borderTopLeftRadius: radius('sm'),
      borderBottomLeftRadius: radius('sm'),
      borderTopRightRadius: radius('sm'),
      borderBottomRightRadius: radius('sm'),
    },
    mdContainer: {
      height: '100%',
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
    },
    lgContainer: {
      height: '100%',
      paddingLeft: spacing('3W'),
      paddingRight: spacing('3W'),
    },
    // `sm` et `md` sont volontairement identiques : le Figma ne distingue pas les deux en mode
    // icone seule. Les garder separes laisse la porte ouverte sans changer l'apparence.
    smContainerIconOnly: {
      height: '100%',
      width: '100%',
    },
    mdContainerIconOnly: {
      height: '100%',
      width: '100%',
    },
    lgContainerIconOnly: {
      height: '100%',
      width: '100%',
    },

    // Litteraux dedies au Pressable : lui seul doit connaitre la hauteur en pixels, pour
    // l'absorber dans sa propre bordure via boxSizing. Le conteneur interieur, lui, se
    // contente de remplir cet espace (cf. smContainer et consorts, height: '100%').
    hauteurSm: { height: control('sm').height },
    hauteurMd: { height: control('md').height },
    hauteurLg: { height: control('lg').height },
    smTitle: text['Corps de texte'].SM.Medium,
    mdTitle: text['Corps de texte'].SM.Medium,
    lgTitle: text['Corps de texte'].MD.Medium,
  }) satisfies Table;

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

const primaire = ({ color }: Theme) =>
  ({
    primaryTitle: {
      color: color.light.text['inverted-primary'],
    },
    primaryContainer: {
      backgroundColor: color.light.background['action-high-primary'],
    },
    primaryTitleHover: {
      color: color.light.text['inverted-primary'],
    },
    primaryContainerHover: {
      backgroundColor: color.light.background['action-high-primary-hover'],
    },
    primaryContainerPressed: {
      backgroundColor: color.light.background['action-high-primary-hover'],
    },
    primaryTitleDisabled: {
      cursor: 'not-allowed',
      color: color.light.text['disabled-grey'],
    },
    primaryContainerDisabled: {
      cursor: 'not-allowed',
      backgroundColor: color.light.background['disabled-grey'],
    },
    primaryIcon: {
      color: color.light.text['inverted-primary'],
    },
    primaryIconHover: {
      color: color.light.text['inverted-primary'],
    },
    primaryIconDisabled: {
      color: color.light.text['disabled-grey'],
    },
  }) satisfies Table;

const secondaire = ({ color }: Theme) =>
  ({
    secondaryTitle: {
      color: color.light.text['action-high-grey'],
    },
    secondaryContainer: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: color.light.border['default-grey'],
      backgroundColor: color.light.background['default-grey'],
    },
    secondaryTitleHover: {
      color: color.light.text['action-high-grey'],
    },
    secondaryContainerHover: {
      borderColor: color.light.border['default-grey'],
      backgroundColor: color.light.background['transparent-hover'],
    },
    secondaryContainerPressed: {
      borderColor: color.light.border['default-grey'],
      backgroundColor: color.light.background['transparent-hover'],
    },
    secondaryTitleDisabled: {
      cursor: 'not-allowed',
      color: color.light.text['disabled-grey'],
    },
    secondaryContainerDisabled: {
      cursor: 'not-allowed',
      borderColor: color.light.border['disabled-grey'],
    },
    secondaryIcon: {
      color: color.light.text['action-high-grey'],
    },
    secondaryIconHover: {
      color: color.light.text['action-high-grey'],
    },
    secondaryIconDisabled: {
      color: color.light.text['disabled-grey'],
    },
  }) satisfies Table;

const tertiaire = ({ color }: Theme) =>
  ({
    tertiaryTitle: {
      color: color.light.text['action-high-grey'],
    },
    tertiaryContainer: {},
    tertiaryTitleHover: {
      color: color.light.text['action-high-grey'],
    },
    tertiaryContainerHover: {
      backgroundColor: color.light.background['transparent-hover'],
    },
    tertiaryContainerPressed: {
      backgroundColor: color.light.background['transparent-hover'],
    },
    tertiaryTitleDisabled: {
      cursor: 'not-allowed',
      color: color.light.text['disabled-grey'],
    },
    tertiaryContainerDisabled: {
      cursor: 'not-allowed',
    },
    tertiaryIcon: {
      color: color.light.text['action-high-grey'],
    },
    tertiaryIconHover: {
      color: color.light.text['action-high-grey'],
    },
    tertiaryIconDisabled: {
      color: color.light.text['disabled-grey'],
    },
  }) satisfies Table;

const dangereuse = ({ color }: Theme) =>
  ({
    dangerTitle: {
      color: color.light.text['inverted-grey'],
    },
    dangerContainer: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: color.light.border['plain-error'],
      backgroundColor: color.light.background['action-high-error'],
    },
    dangerTitleHover: {
      color: color.light.text['action-high-error'],
    },
    dangerContainerHover: {
      borderColor: color.light.border['default-grey'],
      backgroundColor: color.light.background['default-grey'],
    },
    dangerContainerPressed: {
      backgroundColor: color.alpha(color.light.background['action-high-error'], 0.8),
    },
    dangerTitleDisabled: {
      cursor: 'not-allowed',
      color: color.light.text['disabled-grey'],
    },
    dangerContainerDisabled: {
      cursor: 'not-allowed',
      backgroundColor: color.light.background['default-grey'],
      borderColor: color.light.border['disabled-grey'],
    },
    dangerIcon: {
      color: color.light.text['inverted-primary'],
    },
    dangerIconHover: {
      color: color.light.text['action-high-error'],
    },
    dangerIconDisabled: {
      color: color.light.text['disabled-grey'],
    },
  }) satisfies Table;

/** `link` n'a ni etat desactive de conteneur ni icone survolee : il emprunte ceux de `tertiary`. */
const lien = ({ color }: Theme) =>
  ({
    linkTitle: {
      color: color.text.link.default,
    },
    linkContainer: {
      backgroundColor: color.background.button.tertiary.default,
    },
    linkTitleHover: {
      color: color.text.link.hover,
    },
    linkContainerHover: {
      backgroundColor: color.background.button.tertiary.default,
    },
    linkContainerPressed: {
      backgroundColor: color.background.button.tertiary.default,
    },
    linkIcon: {
      color: color.text.link.default,
    },
    linkIconDisabled: {
      color: color.light.text['disabled-grey'],
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({
  ...commun(theme),
  ...tailles(theme),
  ...selection(theme),
  ...primaire(theme),
  ...secondaire(theme),
  ...tertiaire(theme),
  ...dangereuse(theme),
  ...lien(theme),
}));
