import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('1W'),
  },
}));
