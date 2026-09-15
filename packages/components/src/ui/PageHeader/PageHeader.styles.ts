import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text, spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('1V'),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing('1V'),
  },
  title: {
    ...text.Titres['H3 - MD'],
    color: color.light.text['title-grey'],
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('1W'),
    flexShrink: 0,
  },
}));
