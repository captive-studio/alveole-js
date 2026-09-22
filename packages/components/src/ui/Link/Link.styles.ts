import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color }) => ({
  link: {
    color: color.light.text['action-high-info'],
    textDecoration: 'underline',
  },
  linkHover: {
    textDecoration: 'none',
  },
}));
