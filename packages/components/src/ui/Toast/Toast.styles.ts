import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, radius, spacing, shadows }) => ({
  // Container
  container: {
    backgroundColor: '#FFFFFF',
    width: 384,
    padding: spacing('100'),
    borderRadius: radius('sm'),
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('050'),
    alignItems: 'flex-start',

    ...shadows(3),
  },

  contenu: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: spacing('050'),
  },

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: spacing('150'),
  },
  // Titre
  title: {
    ...text['Corps de texte'].SM.Bold,
    color: color.text['title-grey'],
  },

  // Icon
  icon: {
    paddingTop: spacing('025'),
  },
  iconDefault: {
    color: color.text['default-grey'],
  },
  iconInfo: {
    color: color.text['default-grey'],
  },
  iconSuccess: {
    color: color.text['default-success'],
  },
  iconError: {
    color: color.text['default-error'],
  },

  // Message
  message: {
    ...text['Corps de texte'].SM.Regular,
    color: color.text['default-grey'],
  },
}));
