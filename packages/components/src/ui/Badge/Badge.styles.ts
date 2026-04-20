import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ radius, text, color, spacing }) => ({
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
    paddingLeft: spacing('1,5V'),
    paddingRight: spacing('1,5V'),
    gap: spacing('1V'),
    ...text['Corps de texte'].XS.CapsBold,
  },
  badgeMd: {
    paddingLeft: spacing('1W'),
    paddingRight: spacing('1W'),
    gap: spacing('1V'),
    ...text['Corps de texte'].SM.CapsBold,
  },
}));
