import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color }) => ({
  skeleton: {
    overflow: 'hidden',
  },
  pulse: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: color.light.background['alt-grey'],
  },
}));
