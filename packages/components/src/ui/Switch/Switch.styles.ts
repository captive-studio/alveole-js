import { focusRing, makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  switchContainer: {},
  switch: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('1W'),
    paddingRight: spacing('1W'),
  },
  switchButton: {
    borderColor: color.border['default-grey'],
    backgroundColor: color.background.default,
    cursor: 'pointer',
    padding: 1,
    minHeight: spacing('4W'),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  switchButtonChecked: {
    backgroundColor: color.background['default-active'],
  },
  switchButtonDisabled: {
    backgroundColor: color.background['disabled-grey'],
    cursor: 'not-allowed',
  },
  switchButtonFocused: focusRing('default'),
  switchThumb: {
    borderWidth: 1,
    borderColor: color.border['default-grey'],
    backgroundColor: color.background['default-active'],
  },
  switchThumbChecked: {
    backgroundColor: color.primary,
  },
  switchThumbDisabled: {
    backgroundColor: color.background['disabled-grey'],
    cursor: 'not-allowed',
    borderColor: '#FFFFFF',
  },
  switchLabel: {
    cursor: 'pointer',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 60,
    ...text['Corps de texte'].SM.Regular,
    color: color.text['label-grey'],
  },
  switchLabelChecked: {},
  switchLabelDisabled: {
    cursor: 'not-allowed',
  },
}));
