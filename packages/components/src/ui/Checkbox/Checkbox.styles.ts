import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const coque = ({ spacing }: Theme) =>
  ({
    checkboxContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacing('050'),
    },
  }) satisfies Table;

const caseACocher = ({ color, spacingValue }: Theme) =>
  ({
    checkbox: {
      height: spacingValue('150'),
      width: spacingValue('150'),
      backgroundColor: 'transparent',
      borderColor: color.light.border['action-high-primary'],
      borderRadius: 6,
    },
    checkboxSm: {
      height: spacingValue('100'),
      width: spacingValue('100'),
      borderRadius: 4,
    },
    checkboxDisabled: {
      borderColor: color.border['disabled-grey'],
      backgroundColor: 'transparent',
    },
    checkboxError: {
      borderColor: color.border['plain-error'],
    },
    checkboxSuccess: {
      borderColor: color.border['plain-success'],
    },
    indicator: {
      height: spacingValue('150'),
      width: spacingValue('150'),
      backgroundColor: color.light.background['action-high-primary'],
      borderRadius: 6,
    },
    indicatorDisabled: {
      backgroundColor: color.background['disabled-grey'],
    },
  }) satisfies Table;

const libelle = ({ text, color }: Theme) =>
  ({
    label: {
      width: '100%',
      ...text['Corps de texte'].MD.Regular,
      cursor: 'pointer',
      color: color.text['label-grey'],
    },
    labelSm: {
      ...text['Corps de texte'].SM.Regular,
    },
    labelDisabled: {
      cursor: 'not-allowed',
      color: color.text['disabled-grey'],
    },
    labelError: {
      color: color.text['default-error'],
    },
    labelSuccess: {
      color: color.text['default-success'],
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({ ...coque(theme), ...caseACocher(theme), ...libelle(theme) }));
