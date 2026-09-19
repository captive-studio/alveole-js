import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage contextuel
// que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une annotation, elle,
// effacerait les cles.
type Table = Record<string, StyleValue>;

// Le regroupement suit le decoupage du composant : la barre et ses variantes, le bloc qui
// identifie le dossier, et la zone d'actions.
const barre = ({ color, spacing }: Theme) =>
  ({
    toolbarContainer: {
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: spacing('1V'),
      paddingRight: spacing('1V'),
      paddingTop: spacing('1W'),
      paddingBottom: spacing('1W'),
    },
    compactLargetoolbarContainer: {
      paddingTop: spacing('3V'),
      paddingBottom: spacing('1W'),
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
    },
    largeToolbarContainer: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    toolbarInformationWithBorder: {
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderStyle: 'solid',
      borderColor: color.light.border['default-grey'],
    },
    toolbarNavigation: {
      display: 'flex',
      justifyContent: 'center',
      gap: spacing('3V'),
    },
  }) satisfies Table;

const information = ({ color, text, spacing }: Theme) =>
  ({
    toolbarInformation: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing('3V'),
      flex: 1,
    },
    toolbarInformationTitle: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flex: 1,
    },
    compactLargeInformations: {
      paddingBottom: 0,
      justifyContent: 'center',
    },
    toolbarInformationTitleText: {
      ...text['Corps de texte'].SM.SemiBold,
      color: color.light.text['title-grey'],
    },
    largeInformationTitleText: {
      ...text.Titres['H1 - XL'],
    },
    toolbarInformationTitleSubText: {
      ...text['Corps de texte'].XS.Regular,
      color: color.light.text['mention-grey'],
    },
    largeToolbarInformationTitleSubText: {
      ...text['Corps de texte'].SM.Regular,
    },
  }) satisfies Table;

const actions = () =>
  ({
    toolbarActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({ ...barre(theme), ...information(theme), ...actions() }));
