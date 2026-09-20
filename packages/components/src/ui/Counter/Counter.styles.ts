import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, text, radius, pill }) => ({
  counter: {
    height: pill('sm').height,
    paddingRight: pill('sm').paddingInline,
    paddingLeft: pill('sm').paddingInline,
    backgroundColor: color.light.background['contrast-grey'],
    borderRadius: radius('full'),
    ...text['Corps de texte'].XS.Bold,
  },
  counterPrimary: {
    backgroundColor: color.light.background['action-high-primary'],
    color: color.light.text['inverted-primary'],
  },
}));
