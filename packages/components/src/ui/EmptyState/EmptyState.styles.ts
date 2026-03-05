import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing, radius }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing('150'),
    paddingTop: 0,
    paddingBottom: spacing('2W'),
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    textAlign: 'center',
    height: '100%',
    width: '100%',
  },
  contenu: {
    display: 'flex',
    gap: spacing('2W'),
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  media: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color.light.text['active-primary'],
    backgroundColor: color.light.background['alt-primary'],
    borderRadius: radius('full'),
    padding: spacing('075'),
  },
  messageEtDescription: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('2W'),
  },
  title: {
    color: color.light.text['title-grey'],
    ...text.Titres['H6 - XXS'],
  },
  description: {
    color: color.light.text['mention-grey'],
    ...text['Corps de texte'].SM.Regular,
  },
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('100'),
  },
}));
