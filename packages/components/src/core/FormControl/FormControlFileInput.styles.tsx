import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ spacing }) => ({
  fileInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('100'),
  },
}));
