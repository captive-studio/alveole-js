import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, spacing, shadows, radius }) => ({
  content: {
    display: 'flex',
    paddingTop: spacing('1W'),
    paddingBottom: spacing('1W'),
    paddingLeft: spacing('1W'),
    paddingRight: spacing('1W'),
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderRadius: radius('lg'),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.light.border['default-grey'],
    backgroundColor: color.light.background['active-inverted'],
    ...shadows('lifted'),
  },
}));
