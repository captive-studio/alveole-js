export declare const useStyles: () => {
  sidebar: {
    backgroundColor: '#FFFFFF';
    borderRightWidth: number;
    borderColor: '#DEE3EC';
    display: 'flex';
    flexDirection: 'column';
    alignItems: 'flex-start';
    alignSelf: 'stretch';
  };
  header: {};
  headerContent: {
    display: 'flex';
    flexDirection: 'row';
    padding: import('@alveole/theme').Spacing;
  };
  logo: {
    marginLeft: import('@alveole/theme').Spacing;
  };
  sidebarContent: {
    flex: number;
    justifyContent: 'space-between';
    width: '100%';
  };
  scrollView: {
    flex: number;
    paddingTop: import('@alveole/theme').Spacing;
    paddingBottom: import('@alveole/theme').Spacing;
    zIndex: number;
    backgroundColor: '#FFFFFF';
  };
  groupTitleDesktop: {
    paddingLeft: import('@alveole/theme').Spacing;
    paddingTop: import('@alveole/theme').Spacing;
    fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    fontSize: 12;
    lineHeight: 20;
    letterSpacing: 0;
  };
  groupTitleMobile: {
    color: '#5F6571';
    paddingLeft: import('@alveole/theme').Spacing;
    paddingRight: import('@alveole/theme').Spacing;
    paddingTop: import('@alveole/theme').Spacing;
    paddingBottom: import('@alveole/theme').Spacing;
    fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    fontSize: 16;
    lineHeight: 24;
    letterSpacing: 0;
  };
  sidebarItemDesktop: {
    borderRadius: import('@alveole/theme').Spacing;
    display: 'flex';
    flexDirection: 'row';
    alignItems: 'center';
    gap: import('@alveole/theme').Spacing;
    padding: import('@alveole/theme').Spacing;
    width: '100%';
    color: '#151617';
    stroke: '#151617';
  };
  sidebarItemMobile: {
    display: 'flex';
    flexDirection: 'row';
    alignItems: 'center';
    gap: import('@alveole/theme').Spacing;
    paddingLeft: import('@alveole/theme').Spacing;
    paddingRight: import('@alveole/theme').Spacing;
    paddingTop: import('@alveole/theme').Spacing;
    paddingBottom: import('@alveole/theme').Spacing;
    width: '100%';
    color: '#151617';
    stroke: '#151617';
  };
  sidebarItemSelectedDesktop: {
    backgroundColor: '#EFF1F6';
  };
  sidebarItemSelectedMobile: {
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
    backgroundColor: '#F2F9FF';
  };
  sidebarItemHover: {
    backgroundColor: '#F6F7F8';
  };
  sidebarItemCurrentHover: {
    backgroundColor: '#EFF1F6';
  };
  sidebarItemContainerDesktop: {
    paddingLeft: import('@alveole/theme').Spacing;
    paddingRight: import('@alveole/theme').Spacing;
    display: 'flex';
    flexDirection: 'row';
    cursor: 'pointer';
    marginLeft: import('@alveole/theme').Spacing;
    marginRight: import('@alveole/theme').Spacing;
  };
  sidebarItemContainerMobile: {
    paddingLeft: import('@alveole/theme').Spacing;
    paddingRight: import('@alveole/theme').Spacing;
    paddingTop: import('@alveole/theme').Spacing;
    paddingBottom: import('@alveole/theme').Spacing;
    gap: import('@alveole/theme').Spacing;
    display: 'flex';
    flexDirection: 'row';
    cursor: 'pointer';
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
    marginLeft: import('@alveole/theme').Spacing;
    marginRight: import('@alveole/theme').Spacing;
  };
  sidebarItemTitleSelectedDesktop: {
    color: '#373A3F';
    stroke: '#373A3F';
    fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    fontSize: 16;
    lineHeight: 24;
    letterSpacing: 0;
  };
  sidebarItemTitleSelectedMobile: {
    color: '#373A3F';
    stroke: '#5F6571';
    fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    fontSize: 16;
    lineHeight: 24;
    letterSpacing: 0;
  };
  sidebarItemTitleDesktop: {
    color: '#151617';
    stroke: '#151617';
    fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    fontSize: 16;
    lineHeight: 24;
    letterSpacing: 0;
  };
  sidebarItemTitleMobile: {
    color: '#373A3F';
    stroke: '#373A3F';
    fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    fontSize: 16;
    lineHeight: 24;
    letterSpacing: 0;
  };
  sidebarItemTitleCurrentHoverDesktop: {
    fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    fontSize: 16;
    lineHeight: 24;
    letterSpacing: 0;
  };
  sidebarItemTitleCurrentHoverMobile: {
    color: '#002764';
    fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    fontSize: 16;
    lineHeight: 24;
    letterSpacing: 0;
  };
  sidebarItemSelectedIndicator: {
    height: '100%';
    width: import('@alveole/theme').Spacing;
    position: 'absolute';
    left: number;
  };
  sidebarItemSelectedIndicatorContent: {
    width: '100%';
    minHeight: import('@alveole/theme').Spacing;
    backgroundColor: '#0264C7';
    margin: string;
    borderRadius: import('@alveole/theme').Spacing;
  };
};
//# sourceMappingURL=Sidebar.styles.d.ts.map
