import { makeStyles, MonospaceFont } from '@alveole/theme';

export const useStyles = makeStyles(({ color, radius }) => ({
  code: {
    ...MonospaceFont,
    color: color.light.text['default-error'],
    backgroundColor: 'rgba(135, 131, 120, 0.12)',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: radius('sm'),
  },
}));
