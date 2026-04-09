import { Colors, makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing, isVariant, radius }) => ({
  sidebar: {
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderColor: color.light.border['default-grey'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  header: {},
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    padding: spacing('050'),
  },
  logo: {
    marginLeft: isVariant('mobile') || isVariant('tablet') ? spacing('150') : 0,
  },
  sidebarContent: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    paddingTop: spacing('100'),
    paddingBottom: spacing('100'),
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
  },
  groupTitleDesktop: {
    ...text['Corps de texte'].XS.SemiBold,
    paddingLeft: spacing('050'),
    paddingTop: spacing('100'),
  },
  groupTitleMobile: {
    ...text['Corps de texte'].MD.Medium,
    color: color.light.text['mention-grey'],
    paddingLeft: spacing('3V'),
    paddingRight: spacing('3V'),
    paddingTop: spacing('2W'),
    paddingBottom: spacing('2W'),
  },
  sidebarItemDesktop: {
    borderRadius: spacing('050'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('050'),
    padding: spacing('050'),
    width: '100%',
    color: color.light.text['title-grey'],
    stroke: color.light.text['title-grey'],
  },

  sidebarItemMobile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('3V'),
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    paddingTop: spacing('2W'),
    paddingBottom: spacing('2W'),
    width: '100%',
    color: color.light.text['title-grey'],
    stroke: color.light.text['title-grey'],
  },
  sidebarItemSelectedDesktop: {
    backgroundColor: color.background.badge.default,
  },
  sidebarItemSelectedMobile: {
    borderRadius: radius('lg'),
    backgroundColor: color.light.background['alt-primary'],
  },
  sidebarItemHover: {
    backgroundColor: color.light.background['default-grey-hover'],
  },
  sidebarItemCurrentHover: {
    backgroundColor: Colors.Neutre[950],
  },
  sidebarItemContainerDesktop: {
    paddingLeft: spacing('050'),
    paddingRight: spacing('050'),
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    marginLeft: spacing('075'),
    marginRight: spacing('025'),
  },
  sidebarItemContainerMobile: {
    paddingLeft: spacing('2W'),
    paddingRight: spacing('2W'),
    paddingTop: spacing('2W'),
    paddingBottom: spacing('2W'),
    gap: spacing('3V'),
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    borderRadius: radius('md'),
    marginLeft: spacing('075'),
    marginRight: spacing('025'),
  },
  sidebarItemTitleSelectedDesktop: {
    ...text['Corps de texte'].MD.SemiBold,
    color: color.light.text['default-grey'],
    stroke: color.light.text['default-grey'],
  },
  sidebarItemTitleSelectedMobile: {
    ...text['Corps de texte'].MD.Medium,
    color: color.light.text['default-grey'],
    stroke: color.light.text['mention-grey'],
  },
  sidebarItemTitleDesktop: {
    ...text['Corps de texte'].MD.Regular,
    color: color.light.text['title-grey'],
    stroke: color.light.text['title-grey'],
  },
  sidebarItemTitleMobile: {
    ...text['Corps de texte'].MD.Medium,
    color: color.light.text['default-grey'],
    stroke: color.light.text['default-grey'],
  },
  sidebarItemTitleCurrentHoverDesktop: {
    ...text['Corps de texte'].MD.SemiBold,
  },

  sidebarItemTitleCurrentHoverMobile: {
    ...text['Corps de texte'].MD.Medium,
    color: color.light.background['action-high-primary'],
  },
  sidebarItemSelectedIndicator: {
    height: '100%',
    width: spacing('025'),
    position: 'absolute',
    left: 0,
  },
  sidebarItemSelectedIndicatorContent: {
    width: '100%',
    minHeight: spacing('150'),
    backgroundColor: color.light.border['default-primary'],
    margin: 'auto',
    borderRadius: spacing('050'),
  },
}));
