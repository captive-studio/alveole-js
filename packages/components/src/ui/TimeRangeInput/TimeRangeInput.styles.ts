import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, color, text }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('2W'),
    padding: spacing('2W'),
  },
  titre: {
    ...text['Corps de texte'].SM.Medium,
    color: color.light.text['title-grey'],
  },
  heures: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing('1W'),
    borderTopWidth: 1,
    borderTopColor: color.light.border['default-grey'],
    paddingTop: spacing('2W'),
  },
  heure: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing('1W'),
  },
}));
