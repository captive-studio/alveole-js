import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const coque = ({ color, radius }: Theme) =>
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
      borderRadius: radius('lg'),
      borderWidth: 1,
      borderColor: color.border['default-grey'],
      overflow: 'hidden',
    },
  }) satisfies Table;

const entete = ({ spacing, color }: Theme) => {
  const enTete = {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing('3V'),
    paddingBottom: spacing('3V'),
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    alignItems: 'flex-start',
    gap: spacing('3V'),
    alignSelf: 'stretch',
    borderWidth: 0,
  } satisfies StyleValue;

  return {
    accordionItemTrigger: {
      borderWidth: 0,
      padding: 0,
    },
    accordionItemHeader: {
      ...enTete,
      backgroundColor: '#FFFFFF',
    },
    accordionItemHeaderAlt: {
      ...enTete,
      backgroundColor: color.background['alt-grey'],
    },
    accordionItemHeaderOutline: {
      ...enTete,
      backgroundColor: '#FFFFFF',
      outlineWidth: 1,
      outlineColor: color.border['default-grey'],
      outlineStyle: 'solid',
    },
    accordionItemHeaderOpen: {
      backgroundColor: color.background['default-active'],
    },
  } satisfies Table;
};

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
      padding: spacing('2W'),
      paddingBottom: spacing('3W'),
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({
  ...coque(theme),
  ...entete(theme),
  ...libelle(theme),
  ...contenu(theme),
}));
