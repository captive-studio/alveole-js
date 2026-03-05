import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, spacing, color }) => ({
  container: {
    display: 'flex',
    width: '100%',
  },
  containerWithBackground: {
    backgroundColor: color.background.default,
  },
  toolbarHaut: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: spacing('300'),
  },
  informations: {
    display: 'flex',
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    paddingBottom: spacing('050'),
  },
  compactLargeInformations: {
    paddingBottom: 0,
    minHeight: 60,
    justifyContent: 'center',
  },
  titre: {
    ...text.Titres['H1 - XL'],
    color: color.light.text['title-grey'],
  },
  sousTitre: {
    ...text['Corps de texte'].SM.Regular,
    color: color.light.text['mention-grey'],
  },
}));
