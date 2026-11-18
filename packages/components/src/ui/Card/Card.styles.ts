import { makeStyles, StyleValue, Theme } from '@alveole/theme';

/** Hors hook, pour la variante mail qui l'applique au theme brut. */
export const stylesCarte = ({ spacing, color, radius }: Theme) =>
  ({
    card: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: color.light.background['default-grey'],
      borderWidth: 1,
      borderColor: color.light.border['default-grey'],
      borderStyle: 'solid',
      boxSizing: 'border-box',
      borderRadius: radius('md'),
      overflow: 'hidden',
    },
    // Dans une `Grid.Column`, la carte prend la hauteur de la ligne.
    fill: {
      flexGrow: 1,
    },
    // Le contenu occupe la hauteur de la carte : quand elle est étirée, les actions
    // descendent en bas plutôt que de rester sous le texte.
    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing('3V'),
      padding: spacing('3V'),
    },
  }) satisfies Record<string, StyleValue>;

export const useStyles = makeStyles(stylesCarte);
