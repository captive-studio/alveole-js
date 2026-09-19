import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  item: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: spacing('1W'),
  },
  itemLabel: {
    cursor: 'pointer',
    color: color.text['default-grey'],
    ...text['Corps de texte'].SM.Regular,
  },
}));
