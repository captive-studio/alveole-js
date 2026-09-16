import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const rail = ({ color, radius }: Theme) =>
  ({
    determinate: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    progressTrack: {
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
    },
    remaining: {
      height: '100%',
      borderRadius: radius('sm'),
      backgroundColor: color.light.border['default-grey'],
    },
    remainingAbsolute: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      borderRadius: radius('sm'),
      backgroundColor: color.light.border['default-grey'],
    },
    noRadius: {
      borderRadius: 0,
    },
  }) satisfies Table;

const avancement = ({ text, color, spacing, radius }: Theme) =>
  ({
    progressed: {
      height: '100%',
      borderRadius: radius('sm'),
      backgroundColor: color.light.background['action-low-primary'],
    },
    progressedAbsolute: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      borderRadius: radius('sm'),
      backgroundColor: color.light.background['action-low-primary'],
    },
    progress: {
      backgroundColor: color.light.background['action-low-primary'],
      width: '100%',
      borderRadius: radius('sm'),
      overflow: 'hidden',
    },
    bar: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
      borderRadius: radius('sm'),
      backgroundColor: color.light.border['default-grey'],
    },
    indicator: {
      ...text['Corps de texte'].XS.Regular,
      color: color.light.artwork['major-primary'],
      marginTop: spacing('1W'),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({ ...rail(theme), ...avancement(theme) }));
