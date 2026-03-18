import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ radius, text, color, spacing }) => ({
  tagContainer: {
    display: 'block',
  },
  tag: {
    borderRadius: radius('full'),
  },

  // Colors
  tagDefault: {
    color: color.light.text['label-grey'],
    backgroundColor: color.light.background['contrast-grey'],
  },
  tagAction: {
    color: color.light.text['label-grey'],
    backgroundColor: color.light.background['action-low-primary'],
  },

  // Sizes
  tagSm: {
    paddingLeft: spacing('1W'),
    paddingRight: spacing('1W'),
    paddingTop: 0,
    paddingBottom: 0,
    ...text['Corps de texte'].XS.Bold,
  },
  tagMd: {
    paddingLeft: spacing('3V'),
    paddingRight: spacing('3V'),
    paddingTop: spacing('1V'),
    paddingBottom: spacing('1V'),
    ...text['Corps de texte'].SM.Bold,
  },
}));
