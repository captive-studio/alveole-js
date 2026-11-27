import { makeStyles, StyleValue, useTheme } from '@alveole/theme';

type Theme = ReturnType<typeof useTheme>;

// `satisfies` garde le typage contextuel de `makeStyles` sur chaque table.
type Table = Record<string, StyleValue>;

// Le lanceur, le cadre du panneau, le fil de messages et le compositeur.
const lanceur = ({ color, spacing, spacingValue, radius }: Theme) =>
  ({
    anchor: {
      position: 'absolute',
      right: spacingValue('2W'),
      bottom: spacingValue('2W'),
      zIndex: 100,
      alignItems: 'flex-end',
      gap: spacing('1,5V'),
    },
    inline: { position: 'relative', right: 0, bottom: 0 },
    badgeAnchor: { position: 'relative', overflow: 'visible' },
    badgePosition: { position: 'absolute', top: -spacingValue('1W'), right: -spacingValue('1W'), zIndex: 1 },
    tabUnreadDot: {
      position: 'absolute',
      top: -spacingValue('1V'),
      right: -spacingValue('1V'),
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: color.light.background['action-high-error'],
      borderWidth: 2,
      borderColor: color.light.background['default-grey'],
    },
    unreadBadge: {
      minWidth: 22,
      height: 22,
      borderRadius: 11,
      marginRight: 0,
      color: color.light.text['inverted-grey'],
      backgroundColor: color.light.background['action-high-error'],
      borderWidth: 2,
      borderColor: color.light.background['default-grey'],
    },
    unreadIcon: { color: color.light.text['default-error'] },
    launcher: {
      width: 52,
      height: 52,
      borderRadius: 26,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      borderBottomLeftRadius: 26,
      borderBottomRightRadius: 26,
    },
    tabPanel: { flex: 1, minHeight: 0 },
    panel: {
      width: 360,
      maxWidth: '100%',
      borderRadius: radius('lg'),
      overflow: 'hidden',
      backgroundColor: color.light.background['default-grey'],
      borderWidth: 1,
      borderColor: color.light.border['default-grey'],
      boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.18)',
    },
  }) satisfies Table;

const cadre = ({ color, text, spacing, spacingValue, radius }: Theme) =>
  ({
    bottomNav: {
      flexDirection: 'row',
    },
    bottomTab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing('0,5V'),
      paddingTop: spacing('1V'),
      paddingBottom: spacing('1V'),
      minHeight: 60,
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderTopWidth: 2,
      borderTopColor: 'transparent',
      borderStyle: 'solid',
      borderRadius: 0,
      appearance: 'none',
      cursor: 'pointer',
    },
    bottomTabSelected: { borderTopColor: color.light.border['default-primary'] },
    tabText: { ...text['Corps de texte'].XS.Regular, color: color.light.text['mention-grey'] },
    tabTextSelected: { ...text['Corps de texte'].XS.Bold, color: color.light.text['title-primary'] },
    headerAction: { width: spacingValue('4W'), alignItems: 'center', flexShrink: 0 },
    headerTitle: {
      ...text['Corps de texte'].SM.Bold,
      color: color.light.text['title-grey'],
      flex: 1,
      textAlign: 'center',
    },
    homeScroll: { flexGrow: 1 },
    home: { padding: spacing('3W'), gap: spacing('2W'), flexGrow: 1, justifyContent: 'center' },
    contactCard: {
      borderRadius: radius('lg'),
      cursor: 'pointer',
      textAlign: 'left',
      appearance: 'none',
      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
    },
    contactArrow: { color: color.light.text['title-primary'] },
    welcome: { ...text.Titres['H3 - MD'], color: color.light.text['title-grey'] },
    header: {
      paddingLeft: spacing('2W'),
      paddingRight: spacing('2W'),
      paddingTop: spacing('1V'),
      paddingBottom: spacing('1V'),
      borderBottomWidth: 1,
      borderColor: color.light.border['default-grey'],
    },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing('1V') },
  }) satisfies Table;

const fil = ({ color, text, spacing, spacingValue }: Theme) =>
  ({
    messages: { flex: 1 },
    conversation: { flex: 1, minHeight: 0, position: 'relative' },
    composerBottomMask: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: spacingValue('1W'),
      backgroundColor: color.light.background['default-grey'],
    },
    newConversationAction: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      alignItems: 'center',
      padding: spacing('2W'),
    },
    listWithAction: { paddingBottom: spacing('15W') },
    list: { padding: spacing('2W'), gap: spacing('2W'), flexGrow: 1 },
    messageRow: { flexDirection: 'row', alignItems: 'flex-end' },
    messageAvatar: { marginRight: 8, flexShrink: 0 },
    clientRow: { justifyContent: 'flex-end' },
    messageTime: { ...text['Corps de texte'].XS.Regular, color: color.light.text['mention-grey'] },
    messageDate: { ...text['Corps de texte'].XS.Regular, color: color.light.text['mention-grey'], textAlign: 'center' },
    clientMetadata: { alignItems: 'flex-end', gap: spacing('0,5V') },
    operatorMetadata: { paddingLeft: 44, gap: spacing('0,5V') },
    messageContent: { maxWidth: '82%', minWidth: 0, flexShrink: 1, alignItems: 'flex-start', gap: spacing('0,5V') },
    clientContent: { alignItems: 'flex-end' },
    messageAuthor: {
      ...text['Corps de texte'].XS.Regular,
      color: color.light.text['mention-grey'],
      paddingLeft: spacing('1,5V'),
    },
    messageImages: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing('1V'), maxWidth: '100%' },
    messageImage: {
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: color.light.border['default-grey'],
    },
    message: {
      position: 'relative',
      overflow: 'visible',
      paddingLeft: 11,
      paddingRight: 11,
      paddingTop: spacing('1V'),
      paddingBottom: spacing('1V'),
      borderRadius: 18,
      maxWidth: '100%',
    },
    clientMessage: { borderBottomRightRadius: 4, backgroundColor: color.light.background['contrast-info'] },
    operatorMessage: { borderBottomLeftRadius: 4, backgroundColor: color.light.background['contrast-grey'] },
    loader: { alignItems: 'center', padding: spacing('2W') },
    body: { ...text['Corps de texte'].SM.Regular, color: color.light.text['default-grey'] },
  }) satisfies Table;

const compositeur = ({ color, text, spacingValue, radius }: Theme) =>
  ({
    composerAnchor: {
      position: 'absolute',
      bottom: spacingValue('1W'),
      left: spacingValue('1W'),
      right: spacingValue('1W'),
    },
    composer: {
      padding: 8,
      gap: 4,
      borderWidth: 1,
      borderColor: color.light.border['default-grey'],
      borderRadius: radius('md'),
      backgroundColor: color.light.background['default-grey'],
      boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
    },
    composerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    resolvedStatus: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, flexShrink: 1 },
    resolvedText: { ...text['Corps de texte'].XS.Bold, color: color.light.text['default-success'] },
    sendAction: { flex: 1, minWidth: 0 },
    error: { ...text['Corps de texte'].XS.Regular, color: color.light.text['default-error'] },
    title: { ...text['Corps de texte'].MD.Bold, color: color.light.text['title-grey'] },
    hint: { ...text['Corps de texte'].XS.Regular, color: color.light.text['mention-grey'] },
  }) satisfies Table;

export const useStyles = makeStyles(theme => ({
  ...lanceur(theme),
  ...cadre(theme),
  ...fil(theme),
  ...compositeur(theme),
}));
