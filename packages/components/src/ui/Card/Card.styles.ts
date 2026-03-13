import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing, color, radius }) => ({
  card: {
    display: 'flex',
    width: '100%',
    gap: spacing('3V'),
    padding: spacing('3V'),
    backgroundColor: color.light.background['default-grey'],
    borderWidth: 1,
    borderColor: color.light.border['default-grey'],
    borderStyle: 'solid',
    boxSizing: 'border-box',
    borderRadius: radius('md'),
  },
}));
