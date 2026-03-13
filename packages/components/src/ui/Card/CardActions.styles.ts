import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing }) => ({
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('1W'),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));
