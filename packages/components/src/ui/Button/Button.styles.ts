import { makeStyles, paletteCssVar } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing, radius }) => ({
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
    transitionProperty: 'all',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease',
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
    color: paletteCssVar(color, 'light', 'text', 'inverted-primary'),
  },
  primaryContainer: {
    backgroundColor: paletteCssVar(color, 'light', 'background', 'action-high-primary'),
  },
  primaryTitleHover: {
    color: paletteCssVar(color, 'light', 'text', 'inverted-primary'),
  },
  primaryContainerHover: {
    backgroundColor: paletteCssVar(color, 'light', 'background', 'action-high-primary-hover'),
  },
  primaryContainerPressed: {
    backgroundColor: paletteCssVar(color, 'light', 'background', 'action-high-primary-hover'),
  },

  secondaryTitle: {
    color: paletteCssVar(color, 'light', 'text', 'action-high-grey'),
  },
  secondaryContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: paletteCssVar(color, 'light', 'border', 'default-grey'),
    backgroundColor: paletteCssVar(color, 'light', 'background', 'default-grey'),
  },
  secondaryTitleHover: {
    color: paletteCssVar(color, 'light', 'text', 'action-high-grey'),
  },
  secondaryContainerHover: {
    borderColor: paletteCssVar(color, 'light', 'border', 'default-grey'),
    backgroundColor: paletteCssVar(color, 'light', 'background', 'transparent-hover'),
  },
  secondaryContainerPressed: {
    borderColor: paletteCssVar(color, 'light', 'border', 'default-grey'),
    backgroundColor: paletteCssVar(color, 'light', 'background', 'transparent-hover'),
  },

  tertiaryTitle: {
    color: paletteCssVar(color, 'light', 'text', 'action-high-grey'),
  },
  tertiaryContainer: {},
  tertiaryTitleHover: {
    color: paletteCssVar(color, 'light', 'text', 'action-high-grey'),
  },
  tertiaryContainerHover: {
    backgroundColor: paletteCssVar(color, 'light', 'background', 'transparent-hover'),
  },
  tertiaryContainerPressed: {
    backgroundColor: paletteCssVar(color, 'light', 'background', 'transparent-hover'),
  },

  linkTitle: {
    color: paletteCssVar(color, 'text', 'link', 'default'),
  },
  linkContainer: {
    backgroundColor: paletteCssVar(color, 'background', 'button', 'tertiary', 'default'),
  },
  linkTitleHover: {
    color: paletteCssVar(color, 'text', 'link', 'hover'),
  },
  linkContainerHover: {
    backgroundColor: paletteCssVar(color, 'background', 'button', 'tertiary', 'default'),
  },
  linkContainerPressed: {
    backgroundColor: paletteCssVar(color, 'background', 'button', 'tertiary', 'default'),
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
    color: paletteCssVar(color, 'light', 'text', 'disabled-grey'),
  },
  primaryContainerDisabled: {
    cursor: 'not-allowed',
    backgroundColor: paletteCssVar(color, 'light', 'background', 'disabled-grey'),
  },
  secondaryTitleDisabled: {
    cursor: 'not-allowed',
    color: paletteCssVar(color, 'light', 'text', 'disabled-grey'),
  },
  secondaryContainerDisabled: {
    cursor: 'not-allowed',
    borderColor: paletteCssVar(color, 'light', 'border', 'disabled-grey'),
  },
  tertiaryTitleDisabled: {
    cursor: 'not-allowed',
    color: paletteCssVar(color, 'light', 'text', 'disabled-grey'),
  },
  tertiaryContainerDisabled: {
    cursor: 'not-allowed',
  },

  // Icons
  primaryIcon: {
    color: paletteCssVar(color, 'light', 'text', 'inverted-primary'),
  },
  primaryIconHover: {
    color: paletteCssVar(color, 'light', 'text', 'inverted-primary'),
  },
  primaryIconDisabled: {
    color: paletteCssVar(color, 'light', 'text', 'disabled-grey'),
  },
  secondaryIcon: {
    color: paletteCssVar(color, 'light', 'text', 'action-high-grey'),
  },
  secondaryIconHover: {
    color: paletteCssVar(color, 'light', 'text', 'action-high-grey'),
  },
  secondaryIconDisabled: {
    color: paletteCssVar(color, 'light', 'text', 'disabled-grey'),
  },
  tertiaryIcon: {
    color: paletteCssVar(color, 'light', 'text', 'action-high-grey'),
  },
  tertiaryIconHover: {
    color: paletteCssVar(color, 'light', 'text', 'action-high-grey'),
  },
  tertiaryIconDisabled: {
    color: paletteCssVar(color, 'light', 'text', 'disabled-grey'),
  },
  linkIcon: {
    color: paletteCssVar(color, 'text', 'link', 'default'),
  },
}));
