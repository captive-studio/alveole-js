import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(() => ({
  actionMenuItemContainerDesktop: {
    margin: 0,
    display: 'block', // bug : flex sur mobile prends toute la largeur
    flexDirection: undefined,
  },
}));
