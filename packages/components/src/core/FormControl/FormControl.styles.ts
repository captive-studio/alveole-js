import { makeStyles } from '@alveole/theme';
import { Platform } from 'react-native';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('025'),
    width: '100%',
  },

  // Label
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    ...text['Corps de texte'].SM.Medium,
    color: color.text['default-grey'],
  },
  labelDisabled: {
    color: color.text.inverse.muted,
  },

  // Hint
  hintContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hint: {
    ...text['Corps de texte'].XS.Regular,
    color: color.text.mention,
  },
  hintDisabled: {
    color: color.text['disabled-grey'],
  },

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
  inputError: {
    borderColor: color.border['plain-error'],
  },
  inputSuccess: {
    borderColor: color.border['plain-success'],
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
  inputFile: {
    margin: 0,
  },
  inputFileText: {
    color: color.text['default-grey'],
    ...text['Corps de texte'].SM.Regular,
  },
  inputFileClear: {
    position: 'absolute',
    right: 0,
  },
  inputWeb: {
    borderWidth: 0,
    borderStyle: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    lineHeight: 'auto',
    // width: '100%'
  },

  // Modal (multiline)
  modalOverlay: {
    flex: 1,
    backgroundColor: color.alpha(color.background['alt-grey'], 0.75),
  },
  modalSheet: {
    width: '100%',
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: spacing('150'),
    paddingTop: spacing('075'),
    paddingBottom: spacing('075'),
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing('100'),
  },
  modalHeaderLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeaderRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalFooter: {
    marginTop: spacing('100'),
  },

  // Caption
  caption: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('025'),
    alignItems: 'center',
    marginTop: spacing('050'),
  },
  captionText: {
    ...text['Corps de texte'].XS.Regular,
  },
  errorText: {
    color: color.danger,
  },
  successText: {
    color: color.success,
  },
}));
