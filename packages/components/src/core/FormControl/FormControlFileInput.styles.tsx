import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  fileInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('050'),
    alignItems: 'center',
  },
  fileInputButton: {
    borderWidth: 1,
    borderColor: color.border['default-grey'],
    backgroundColor: color.background['alt-grey'],
    transition: 'background-color 0.1s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: spacing('050'),
    paddingRight: spacing('050'),
    paddingTop: spacing('0375'),
    paddingBottom: spacing('0375'),
  },
  fileInputButtonHovered: {
    backgroundColor: color.background['contrast-grey'],
  },
  fileInputButtonDisabled: {
    cursor: 'not-allowed',
    backgroundColor: color.background['disabled-grey'],
  },
  inputFileText: {
    ...text['Corps de texte'].XS.Regular,
    color: color.text['default-grey'],
  },
  placeholderText: {
    ...text['Corps de texte'].XS.Regular,
    color: color.text['default-grey'],
  },
}));
