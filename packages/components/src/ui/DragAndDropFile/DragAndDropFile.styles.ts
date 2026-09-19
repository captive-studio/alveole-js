import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, spacing, spacingValue, radius }) => ({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: color.border['contrast-grey'],
    padding: spacing('200'),
    borderRadius: radius('lg'),
    backgroundColor: color.alpha(color.background['alt-grey'], 0.3),
    cursor: 'pointer',
  },
  containerHover: {
    borderStyle: 'solid',
    borderColor: color.border['disabled-grey'],
    backgroundColor: color.alpha(color.background['alt-grey'], 0.25),
  },
  containerMouseHover: {
    borderStyle: 'dashed',
    borderColor: color.border['contrast-grey'],
    backgroundColor: color.alpha(color.background['alt-grey'], 0.75),
  },
  containerError: {
    borderStyle: 'dashed',
    borderColor: color.alpha(color.border['plain-error'], 0.5),
    backgroundColor: color.alpha(color.background['alt-grey'], 0.25),
  },
  webError: {
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    color: color.text.mention,
    backgroundColor: color.background['alt-grey'],
    padding: spacing('100'),
    borderRadius: radius('lg'),
    width: spacingValue('200'),
    height: spacingValue('200'),
    marginBottom: spacing('100'),
  },
  fileName: {
    fontWeight: 'bold',
  },
}));
