import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color }) => ({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: color.light.border['default-grey'],
  },
}));
