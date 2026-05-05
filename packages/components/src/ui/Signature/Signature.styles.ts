import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, spacing, text }) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  pen: {
    color: color.text['default-grey'],
    backgroundColor: '#FFFFFF',
  },
  signatureWeb: {
    borderColor: color.border['default-grey'],
    borderWidth: 2,
    borderRadius: spacing('075'),
  },

  headerSignature: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  date: {
    ...text['Corps de texte'].XS.Regular,
  },
}));
