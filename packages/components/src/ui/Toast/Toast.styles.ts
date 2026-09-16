import { makeStyles, StyleValue, useTheme } from '@alveole/theme';
import { Dimensions, Platform } from 'react-native';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const coque = ({ color, radius, spacing, shadows }: Theme) =>
  ({
    // Container
    tamaguiToastContainer: {
      padding: 0,
      width: Platform.OS === 'web' ? 384 : Dimensions.get('window').width,
      backgroundColor: 'transparent',
      borderRadius: 0,
      // Sur mobile, overflow:hidden sur container clippe le shadow iOS — on le pose ici
      ...(Platform.OS !== 'web' ? { borderRadius: radius('sm'), ...shadows(3) } : {}),
    },
    container: {
      backgroundColor: color.light.background['default-grey'],
      borderRadius: radius('sm'),
      display: 'flex',
      flexDirection: 'row',
      gap: spacing('1W'),
      overflow: 'hidden',
      width: '100%',
      maxWidth: 384,
      padding: 0,
      // Sur web, overflow:hidden ne clippe pas le shadow — on le pose ici pour avoir le bon borderRadius
      ...(Platform.OS === 'web' ? shadows(3) : {}),
    },
    contenu: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      gap: spacing('1W'),
      padding: spacing('100'),
    },
  }) satisfies Table;

const texte = ({ text, color }: Theme) =>
  ({
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    // Titre
    title: {
      ...text['Corps de texte'].SM.Bold,
      color: color.light.text['default-grey'],
    },
    // Message
    message: {
      ...text['Corps de texte'].SM.Regular,
      color: color.light.text['default-grey'],
    },
  }) satisfies Table;

const pastille = ({ color, spacing }: Theme) =>
  ({
    // Bloc icône (panel coloré pleine hauteur)
    iconBlock: {
      display: 'flex',
      alignSelf: 'stretch',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: spacing('3V'),
      paddingRight: spacing('3V'),
      paddingTop: spacing('2W'),
      paddingBottom: spacing('2W'),
    },
    iconBlockDefault: {
      backgroundColor: color.light.background['flat-info'],
    },
    iconBlockInfo: {
      backgroundColor: color.light.background['flat-info'],
    },
    iconBlockSuccess: {
      backgroundColor: color.light.background['flat-success'],
    },
    iconBlockError: {
      backgroundColor: color.light.background['flat-error'],
    },
    iconBlockWarning: {
      backgroundColor: color.light.background['flat-warning'],
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({ ...coque(theme), ...texte(theme), ...pastille(theme) }));
