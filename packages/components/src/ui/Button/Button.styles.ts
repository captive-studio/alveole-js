import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing, shadows, radius }) => ({
  container: {
    borderTopLeftRadius: radius('md'),
    borderBottomLeftRadius: radius('md'),
    borderTopRightRadius: radius('md'),
    borderBottomRightRadius: radius('md'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing('050'),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  buttonLoader: {
    position: 'absolute',
    right: spacing('075'),
  },
  title: {
    cursor: 'pointer',
    minWidth: spacing('200'),
    textAlign: 'center',
  },

  // Variants
  primaryTitle: {
    color: color.light.text['inverted-primary'],
  },
  primaryContainer: {
    backgroundColor: color.light.background['action-high-primary'],
    ...shadows(2),
  },
  primaryTitleHover: {
    color: color.light.text['inverted-primary'],
  },
  primaryContainerHover: {
    backgroundColor: color.light.background['action-high-primary-hover'],
  },

  secondaryTitle: {
    color: color.light.text['action-high-grey'],
  },
  secondaryContainer: {
    borderWidth: 1,
    borderColor: color.light.border['default-grey'],
    backgroundColor: color.light.background['default-grey'],
  },
  secondaryTitleHover: {
    color: color.light.text['action-high-grey'],
  },
  secondaryContainerHover: {
    borderColor: color.light.border['default-grey'],
    backgroundColor: color.light.background['transparent-hover'],
  },

  tertiaryTitle: {
    color: color.light.text['action-high-grey'],
  },
  tertiaryContainer: {},
  tertiaryTitleHover: {
    color: color.light.text['action-high-grey'],
  },
  tertiaryContainerHover: {
    backgroundColor: color.light.background['transparent-hover'],
  },

  linkTitle: {
    color: color.text.link.default,
  },
  linkContainer: {
    backgroundColor: color.background.button.tertiary.default,
  },
  linkTitleHover: {
    color: color.text.link.hover,
  },
  linkContainerHover: {
    backgroundColor: color.background.button.tertiary.default,
  },

  // Sizes
  xsContainer: {
    paddingLeft: spacing('075'),
    paddingRight: spacing('075'),
    paddingTop: spacing('050'),
    paddingBottom: spacing('050'),

    borderTopLeftRadius: radius('sm'),
    borderBottomLeftRadius: radius('sm'),
    borderTopRightRadius: radius('sm'),
    borderBottomRightRadius: radius('sm'),
  },
  smContainer: {
    paddingLeft: spacing('3V'),
    paddingRight: spacing('3V'),
    paddingTop: spacing('1,5V'),
    paddingBottom: spacing('1,5V'),

    borderTopLeftRadius: radius('sm'),
    borderBottomLeftRadius: radius('sm'),
    borderTopRightRadius: radius('sm'),
    borderBottomRightRadius: radius('sm'),
  },
  mdContainer: {
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    paddingTop: 10, // valeur mise en dure dans le Figma
    paddingBottom: 10, // valeur mise en dure dans le Figma
  },
  lgContainer: {
    paddingLeft: spacing('3W'),
    paddingRight: spacing('3W'),
    paddingTop: spacing('3V'),
    paddingBottom: spacing('3V'),
  },
  smContainerIconOnly: {
    padding: spacing('1W'),
  },
  mdContainerIconOnly: {
    padding: spacing('1W'),
  },
  lgContainerIconOnly: {
    padding: spacing('3V'),
  },
  xsTitle: text['Corps de texte'].XS.Regular,
  smTitle: text['Corps de texte'].SM.Medium,
  mdTitle: text['Corps de texte'].SM.Medium,
  lgTitle: text['Corps de texte'].MD.Medium,

  smContainerStartIcon: {
    paddingLeft: spacing('050'),
  },
  mdContainerStartIcon: {
    paddingLeft: spacing('075'),
  },
  lgContainerStartIcon: {
    paddingLeft: spacing('100'),
  },
  smContainerEndIcon: {
    paddingRight: spacing('050'),
  },
  mdContainerEndIcon: {
    paddingRight: spacing('075'),
  },
  lgContainerEndIcon: {
    paddingRight: spacing('100'),
  },

  // Disabled
  primaryTitleDisabled: {
    cursor: 'not-allowed',
    color: color.light.text['disabled-grey'],
  },
  primaryContainerDisabled: {
    cursor: 'not-allowed',
    backgroundColor: color.light.background['disabled-grey'],
  },
  secondaryTitleDisabled: {
    cursor: 'not-allowed',
    color: color.light.text['disabled-grey'],
  },
  secondaryContainerDisabled: {
    cursor: 'not-allowed',
  },
  tertiaryTitleDisabled: {
    cursor: 'not-allowed',
    color: color.light.text['disabled-grey'],
  },
  tertiaryContainerDisabled: {
    cursor: 'not-allowed',
  },

  // Icons
  primaryIcon: {
    color: color.light.text['inverted-primary'],
  },
  primaryIconHover: {
    color: color.light.text['inverted-primary'],
  },
  primaryIconDisabled: {
    color: color.light.text['disabled-grey'],
  },
  secondaryIcon: {
    color: color.light.text['action-high-grey'],
  },
  secondaryIconHover: {
    color: color.light.text['action-high-grey'],
  },
  secondaryIconDisabled: {
    color: color.light.text['disabled-grey'],
  },
  tertiaryIcon: {
    color: color.light.text['action-high-grey'],
  },
  tertiaryIconHover: {
    color: color.light.text['action-high-grey'],
  },
  tertiaryIconDisabled: {
    color: color.light.text['disabled-grey'],
  },
  linkIcon: {
    color: color.text.link.default,
  },
}));
