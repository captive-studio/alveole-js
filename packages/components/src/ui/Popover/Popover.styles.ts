import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, spacing, shadows, radius }) => ({
  content: {
    display: 'flex',
    padding: spacing('1W'),
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: radius('lg'),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.light.border['default-grey'],
    backgroundColor: color.light.background['active-inverted'],
    ...shadows('lifted'),
  },
}));
