import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  pickerContainer: {},
  inputContainer: {
    width: '100%',
  },
  inputInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1W'),
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    minHeight: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.light.border['default-grey'],
    backgroundColor: color.light.background['default-grey'],
    width: '100%',
  },
  inputError: {
    borderColor: color.light.border['plain-error'],
  },
  inputSuccess: {
    borderColor: color.light.border['plain-success'],
  },
  inputDisabled: {
    borderColor: color.light.border['disabled-grey'],
  },
  /** Web uniquement : `cursor` n'appartient pas aux styles React Native. */
  inputCursor: {
    cursor: 'pointer',
  },
  inputCursorDisabled: {
    cursor: 'not-allowed',
  },
  /** Sur natif l'anneau de focus n'existe pas : on marque le focus par la bordure. */
  inputFocused: {
    borderColor: color.light.system.focus,
  },
  value: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['default-grey'],
    flex: 1,
  },
  valuePlaceholder: {
    color: color.light.text['mention-grey'],
  },
  valueDisabled: {
    color: color.light.text['disabled-grey'],
  },
}));
