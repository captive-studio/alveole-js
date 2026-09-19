import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing }) => ({
  inputHeading: {
    display: 'flex',
    gap: spacing('1V'),
    flexDirection: 'column',
  },
}));
