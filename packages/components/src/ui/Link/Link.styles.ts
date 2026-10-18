import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color }) => ({
  link: {
    color: color.light.text['action-high-info'],
  },
  icone: {
    verticalAlign: 'middle',
  },
}));
