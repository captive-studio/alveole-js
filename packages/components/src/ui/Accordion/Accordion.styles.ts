import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const coque = ({ color }: Theme) =>
  ({
    accordion: {
      width: '100%',
      borderBottomWidth: 1,
    },
    accordionLight: {
      borderColor: 'white',
    },
    accordionDefault: {
      borderColor: color.border['default-grey'],
    },
    accordionRounded: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: color.border['default-grey'],
      overflow: 'hidden',
    },
  }) satisfies Table;

const entete = ({ spacing, color }: Theme) =>
  ({
    accordionItemTrigger: {
      borderWidth: 0,
      padding: 0,
    },
    accordionItemHeader: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: spacing('075'),
      paddingBottom: spacing('075'),
      paddingLeft: spacing('100'),
      paddingRight: spacing('100'),
      alignItems: 'flex-start',
      gap: spacing('075'),
      alignSelf: 'stretch',
      backgroundColor: '#FFFFFF',
      borderWidth: 0,
    },
    accordionItemHeaderAlt: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: spacing('075'),
      paddingBottom: spacing('075'),
      paddingLeft: spacing('100'),
      paddingRight: spacing('100'),
      alignItems: 'flex-start',
      gap: spacing('075'),
      alignSelf: 'stretch',
      backgroundColor: color.background['alt-grey'],
      borderWidth: 0,
    },
    accordionItemHeaderOutline: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: spacing('075'),
      paddingBottom: spacing('075'),
      paddingLeft: spacing('100'),
      paddingRight: spacing('100'),
      alignItems: 'flex-start',
      gap: spacing('075'),
      alignSelf: 'stretch',
      borderWidth: 0,
      backgroundColor: '#FFFFFF',
      outlineWidth: 1,
      outlineColor: color.border['default-grey'],
      outlineStyle: 'solid',
    },
    accordionItemHeaderOpen: {
      backgroundColor: color.background['default-active'],
    },
  }) satisfies Table;

const libelle = ({ color, text }: Theme) =>
  ({
    accordionItemLabel: {
      ...text['Corps de texte'].SM.Medium,
    },
    accordionAfterLabel: {
      width: '100%',
      borderBottomWidth: 1,
      borderColor: color.border['default-grey'],
    },
  }) satisfies Table;

const contenu = ({ spacing }: Theme) =>
  ({
    accordionItemContent: {
      padding: spacing('100'),
      paddingBottom: spacing('150'),
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({
  ...coque(theme),
  ...entete(theme),
  ...libelle(theme),
  ...contenu(theme),
}));
