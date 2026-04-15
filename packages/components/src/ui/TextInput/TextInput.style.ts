import { makeStyles } from '@alveole/theme';
import { Platform } from 'react-native';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  // Input
  inputContainer: {
    width: '100%',
  },
  inputInner: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('050'),
    padding: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.border['default-grey'],
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    width: '100%',
    minHeight: 42,
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    outline: 'none',
    color: color.text['default-grey'],
    fontFamily: text['Corps de texte'].SM.Regular.fontFamily,
    fontSize: text['Corps de texte'].SM.Regular.fontSize,
    marginTop: Platform.OS === 'web' ? spacing('050') : spacing('025'),
    marginBottom: Platform.OS === 'web' ? spacing('050') : spacing('025'),
    paddingLeft: spacing('100'),
    paddingRight: spacing('100'),
    minHeight: Platform.OS === 'web' ? undefined : 42,
    flex: 1,
  },
  inputDisabled: {
    borderColor: color.border['disabled-grey'],
  },
  inputFocused: {
    outlineStyle: 'solid',
    outlineWidth: 2,
    outlineColor: color.system.focus,
    outlineOffset: 2,
    borderColor: Platform.OS === 'ios' ? color.system.focus : undefined,
  },

  // Modal (multiline)
  modalInputContainer: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: color.border['default-grey'],
    backgroundColor: '#FFFFFF',
    minHeight: 200,
  },
  modalInput: {
    ...text['Corps de texte'].SM.Regular,
    color: color.text['default-grey'],
    paddingLeft: spacing('100'),
    paddingRight: spacing('100'),
    paddingTop: spacing('100'),
    paddingBottom: spacing('100'),
    minHeight: 180,
    flex: 1,
  },
}));
