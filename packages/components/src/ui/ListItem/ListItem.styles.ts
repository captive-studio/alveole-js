import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

// Le regroupement suit le decoupage du composant : la ligne pressable, le bloc de detail, et
// le visuel qui precede le titre. Trois fonctions plutot qu'un litteral de soixante-dix lignes.

/** La ligne elle-meme : sa boite, et sa teinte au survol quand elle est actionnable. */
const ligne = ({ color, radius, spacing }: Theme) =>
  ({
    container: {
      width: '100%',
    },

    item: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      alignItems: 'center',
      gap: spacing('3V'),
      alignSelf: 'stretch',
    },

    itemHover: {
      backgroundColor: color.alpha(color.light.background['alt-grey'], 0.75),
      borderRadius: radius('md'),
      cursor: 'pointer',
    },

    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color.primary,
    },
  }) satisfies Table;

/** Le bloc de texte, son filet de separation et la pile titre + description. */
const detail = ({ color, text, spacing }: Theme) =>
  ({
    detail: {
      paddingTop: spacing('1W'),
      paddingBottom: spacing('1W'),
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
      gap: spacing('1W'),
      position: 'relative',
    },

    // Pose en absolu sur le bord haut du detail, et non entre deux lignes : c'est ce qui lui
    // evite de compter dans la hauteur de la ligne.
    separateur: {
      left: 0,
      top: 0,
      position: 'absolute',
      width: '100%',
      height: 1,
      backgroundColor: color.light.border['default-grey'],
    },

    principal: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flex: 1,
    },

    title: {
      color: color.light.text['default-grey'],
      ...text['Corps de texte'].SM.Regular,
    },

    description: {
      color: color.light.text['mention-grey'],
      ...text['Corps de texte'].XS.Regular,
    },
  }) satisfies Table;

/** Ce qui precede le titre : la vignette, ou l'icone par defaut. */
const visuel = ({ color, spacing }: Theme) =>
  ({
    defaultIcon: {
      color: color.light.text['mention-grey'],
    },

    previewContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: spacing('0,5V'),
    },

    preview: {
      width: 40,
      height: 40,
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({ ...ligne(theme), ...detail(theme), ...visuel(theme) }));
