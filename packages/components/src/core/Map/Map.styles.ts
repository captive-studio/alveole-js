import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ radius }) => ({
  container: {
    width: '100%',
    height: '100%',
    minHeight: 240,
    borderRadius: radius('lg'),
    overflow: 'hidden',
  },
}));
