import { focusRing, makeStyles, StyleValue, useTheme } from '@alveole/theme';
import { Platform } from 'react-native';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` plutot qu'une annotation de retour : il redonne a chaque table le typage
// contextuel que `makeStyles` fournissait quand tout tenait dans un seul litteral. Une
// annotation, elle, effacerait les cles.
type Table = Record<string, StyleValue>;

const groupe = ({ text, color, spacing, radius }: Theme) =>
  ({
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: spacing('1V'),
    },
    group: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
      flexDirection: 'column',
    },
    groupCard: {
      borderColor: color.border['default-grey'],
      borderRadius: radius('md'),
      borderWidth: 1,
      overflow: 'hidden',
    },
    groupItem: {
      gap: spacing('2W'),
    },
    label: {
      color: color.text['title-grey'],
      ...text['Corps de texte'].SM.Bold,
    },
  }) satisfies Table;

const ligne = ({ color, spacingValue }: Theme) =>
  ({
    itemContainer: {
      backgroundColor: '#FFFFFF',
      borderColor: color.light.border['action-high-primary'],
    },
    itemContainerSm: {
      height: spacingValue('100'),
      width: spacingValue('100'),
    },
    itemContainerMd: {
      height: spacingValue('150'),
      width: spacingValue('150'),
    },
    itemContainerActive: {
      borderColor: color.light.border['action-high-primary'],
    },
    itemContainerFocused: focusRing('default'),
    itemIndicator: {
      backgroundColor: color.light.background['action-high-primary'],
      height: 8,
      width: 8,
    },
  }) satisfies Table;

const carte = ({ text, color, spacing, radius }: Theme) =>
  ({
    card: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    itemCard: {
      padding: 0,
      width: '100%',
      height: undefined,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      cursor: 'pointer',
      transitionDuration: '0.1s',
      transitionTimingFunction: 'ease-in-out',
    },
    itemCardHover: {
      backgroundColor: color.background['default-hover'],
      borderRadius: radius('md'),
      boxShadow: undefined,
    },
    itemCardIcon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: color.text.mention,
    },
    itemCardSeparator: {
      borderTopWidth: Platform.OS === 'ios' ? 3 : 1,
      borderTopColor: color.light.border['default-grey'],
    },
    radioGroupCardContent: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100%',
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      gap: spacing('3V'),
    },
    radioGroupCardLabelContainer: {
      paddingTop: spacing('3V'),
      paddingBottom: spacing('3V'),
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      gap: spacing('1W'),
      flex: 1,
    },
    radioGroupCardLabel: {
      ...text['Corps de texte'].SM.Regular,
    },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({ ...groupe(theme), ...ligne(theme), ...carte(theme) }));
