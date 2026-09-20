import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ radius, text, color, pill }) => ({
  badge: {
    borderRadius: radius('sm'),
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Variants
  badgeInfo: {
    color: color.light.text['default-info'],
    backgroundColor: color.light.background['contrast-info'],
  },
  badgeSuccess: {
    color: color.light.text['default-success'],
    backgroundColor: color.light.background['contrast-success'],
  },
  badgeError: {
    color: color.light.text['default-error'],
    backgroundColor: color.light.background['contrast-error'],
  },
  badgeWarning: {
    color: color.light.text['default-warning'],
    backgroundColor: color.light.background['contrast-warning'],
  },
  badgeNew: {
    color: color.text.badge.new,
    backgroundColor: color.background.badge.new,
  },
  badgeDefault: {
    color: color.light.text['default-grey'],
    backgroundColor: color.light.background['contrast-grey'],
  },

  // Sizes
  badgeSm: {
    height: pill('sm').height,
    paddingLeft: pill('sm').paddingInline,
    paddingRight: pill('sm').paddingInline,
    gap: pill('sm').gap,
    ...text['Corps de texte'].XS.CapsBold,
  },
  badgeMd: {
    height: pill('md').height,
    paddingLeft: pill('md').paddingInline,
    paddingRight: pill('md').paddingInline,
    gap: pill('md').gap,
    ...text['Corps de texte'].SM.CapsBold,
  },
}));
