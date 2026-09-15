import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, radius, spacingValue }) => ({
  highlightContainer: {
    width: '100%',
  },
  highlight: {
    overflow: 'scroll',
    borderRadius: radius('md'),
    padding: spacingValue('2W'),
    width: '100%',
    backgroundColor: color.light.background['alt-grey'],
    borderWidth: 1,
    borderColor: color.light.border['default-grey'],
  },
}));
